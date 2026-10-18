// Post-build step (runs after `vite build`, see "build" in package.json).
//
// Writes a static HTML entry for the project pages, so link previews (LinkedIn, Slack, iMessage...)
// get a 200 response with page-specific meta tags instead of GitHub Pages' 404:
//   dist/projects/index.html
//   dist/projects/<collection>/index.html
//   dist/projects/<collection>/<id>/index.html
// Each file is a copy of the built dist/index.html with only the meta tags swapped, so React boots
// exactly as it does from index.html or 404.html. dist/404.html is left alone and stays the fallback
// for every other route.
//
// Why a Vite SSR build: src/data/projects.ts imports its images through Vite (vite-imagetools turns
// them into hashed .webp files), so plain Node or tsx cannot load it. Compiling just that module with
// Vite's SSR build, using the project's own vite.config.ts, turns every image import into the same
// hashed /assets/... URL the client build wrote to dist. Every image URL is checked against dist.
//
// Preview images, first one available: the project's ogImage (used as is) -> a 1200x630 JPG made from
// its thumbnail -> its main image -> /og_image.png. A main image over 1 MB is replaced by a 1200x630
// JPG made the same way. The JPGs are made here by vite-imagetools: the whole picture fitted inside
// 1200x630 (fit: contain), on the site's background colour (--background in src/index.css).

import { build } from "vite";
import { copyFileSync, existsSync, mkdirSync, readFileSync, rmSync, statSync, writeFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const ROOT = fileURLToPath(new URL("..", import.meta.url));
const DIST = path.join(ROOT, "dist");

// The host GitHub Pages serves (CNAME). studiobura.com without www answers with a redirect to it.
const SITE_URL = `https://${readFileSync(path.join(ROOT, "CNAME"), "utf8").trim()}`;
const SITE_NAME = "Studio Bura";
const SITE_DESCRIPTION = "Product and user-centred design studio.";
const SITE_IMAGE = "/og_image.png";
const MAX_DESCRIPTION = 160;
const MAX_IMAGE_BYTES = 1_000_000;

// Descriptions for the listing pages. Pages without one use SITE_DESCRIPTION.
const LISTING_DESCRIPTIONS = {
  projects:
    "Digital product and interior design projects by Studio Bura, from B2B tools and AI-assisted apps to sensory children's rooms.",
  digital:
    "Digital product design case studies by Studio Bura: B2B tools, e-commerce, AI-assisted and mobile products, from research to tested interface.",
  interior:
    "Interior design projects by Studio Bura: residential spaces and sensory, neurodesign-based children's rooms.",
};

// The site's background colour as hex, from the :root --background (HSL) in src/index.css.
function siteBackgroundHex() {
  const css = readFileSync(path.join(ROOT, "src/index.css"), "utf8");
  const match = css.match(/:root\s*{[^}]*?--background:\s*([\d.]+)\s+([\d.]+)%\s+([\d.]+)%/);
  if (!match) throw new Error("src/index.css: no --background in :root");
  const [hue, saturation, lightness] = match.slice(1).map(Number);
  const a = (saturation / 100) * Math.min(lightness / 100, 1 - lightness / 100);
  const channel = (n) => {
    const k = (n + hue / 30) % 12;
    const value = lightness / 100 - a * Math.max(-1, Math.min(k - 3, 9 - k, 1));
    return Math.round(value * 255).toString(16).padStart(2, "0");
  };
  return `#${channel(0)}${channel(8)}${channel(4)}`;
}

// The 1200x630 link-preview JPG made from a thumbnail or an oversized main image.
const OG_JPG_QUERY = `w=1200&h=630&fit=contain&background=${encodeURIComponent(siteBackgroundHex())}&format=jpg`;

const warn = (message) => console.warn(`[og-pages] warning: ${message}`);

// --- Project data -------------------------------------------------------------------------------

// Only for this build: every image projects.ts uses as a `thumbnail` or main `image` gets a second
// import with OG_JPG_QUERY, and the module exports a map from that image's URL to its JPG's URL.
// The app's own bundle never sees this, so the site itself is unchanged.
function previewJpgsPlugin() {
  const dataFile = path.join(ROOT, "src/data/projects.ts");
  return {
    name: "og-preview-jpgs",
    enforce: "pre",
    transform(code, id) {
      if (id.split("?")[0] !== dataFile) return null;
      const names = new Set([...code.matchAll(/\b(?:thumbnail|image):\s*(\w+)/g)].map((match) => match[1]));
      const imports = [...code.matchAll(/^import\s+(\w+)\s+from\s+["']([^"'?]+)(?:\?[^"']*)?["'];?\s*$/gm)]
        .filter(([, name]) => names.has(name));
      const jpgImports = imports.map(([, , source], i) => `import __ogJpg${i} from "${source}?${OG_JPG_QUERY}";`);
      const entries = imports.map(([, name], i) => `[${name}, __ogJpg${i}]`);
      return `${code}\n${jpgImports.join("\n")}\nexport const __ogPreviewJpgs = new Map([${entries.join(", ")}]);\n`;
    },
  };
}

const SSR_OUT_DIR = path.join(ROOT, "node_modules/.cache/og-pages");

async function loadProjectData() {
  const outDir = SSR_OUT_DIR;
  await build({
    root: ROOT,
    configFile: path.join(ROOT, "vite.config.ts"),
    mode: "production",
    logLevel: "warn",
    plugins: [previewJpgsPlugin()],
    build: {
      ssr: "src/data/projects.ts",
      outDir,
      emptyOutDir: true,
      copyPublicDir: false,
      // Writes the preview JPGs; the ones a page uses are copied into dist/assets (previewJpg below).
      ssrEmitAssets: true,
      rollupOptions: { output: { entryFileNames: "projects.mjs" } },
    },
  });
  return import(pathToFileURL(path.join(outDir, "projects.mjs")).href);
}

// The preview JPG made from an image, copied into dist so the page can point to it.
function previewJpg(imageUrl, previewJpgs) {
  const jpgUrl = imageUrl && previewJpgs.get(imageUrl);
  if (!jpgUrl) return undefined;
  const target = path.join(DIST, jpgUrl);
  mkdirSync(path.dirname(target), { recursive: true });
  copyFileSync(path.join(SSR_OUT_DIR, jpgUrl), target);
  return jpgUrl;
}

// --- Images -------------------------------------------------------------------------------------

// Width and height from the file header (PNG, JPEG, WebP), so og:image:width/height are exact.
function readImageSize(buffer) {
  if (buffer.length > 24 && buffer.toString("ascii", 1, 4) === "PNG") {
    return { width: buffer.readUInt32BE(16), height: buffer.readUInt32BE(20) };
  }
  if (buffer.toString("ascii", 0, 4) === "RIFF" && buffer.toString("ascii", 8, 12) === "WEBP") {
    const chunk = buffer.toString("ascii", 12, 16);
    if (chunk === "VP8X") return { width: 1 + buffer.readUIntLE(24, 3), height: 1 + buffer.readUIntLE(27, 3) };
    if (chunk === "VP8 ") return { width: buffer.readUInt16LE(26) & 0x3fff, height: buffer.readUInt16LE(28) & 0x3fff };
    if (chunk === "VP8L") {
      const bits = buffer.readUInt32LE(21);
      return { width: (bits & 0x3fff) + 1, height: ((bits >> 14) & 0x3fff) + 1 };
    }
  }
  if (buffer[0] === 0xff && buffer[1] === 0xd8) {
    let offset = 2;
    while (offset + 9 < buffer.length && buffer[offset] === 0xff) {
      const marker = buffer[offset + 1];
      if (marker >= 0xc0 && marker <= 0xcf && ![0xc4, 0xc8, 0xcc].includes(marker)) {
        return { height: buffer.readUInt16BE(offset + 5), width: buffer.readUInt16BE(offset + 7) };
      }
      offset += 2 + buffer.readUInt16BE(offset + 2);
    }
  }
  return {};
}

// First candidate that exists in dist wins. Candidates are site-relative URLs such as /assets/x.webp.
function resolveImage(candidates, label) {
  for (const candidate of candidates) {
    if (!candidate?.url) continue;
    if (!candidate.url.startsWith("/")) {
      warn(`${label}: skipped image "${candidate.url.slice(0, 40)}" (not a file in dist)`);
      continue;
    }
    const file = path.join(DIST, decodeURIComponent(candidate.url.split(/[?#]/)[0]));
    if (!existsSync(file)) {
      warn(`${label}: image ${candidate.url} is not in dist, trying the next one`);
      continue;
    }
    const bytes = statSync(file).size;
    if (bytes > MAX_IMAGE_BYTES) warn(`${label}: og:image ${candidate.url} is ${(bytes / 1e6).toFixed(2)} MB`);
    return { url: SITE_URL + candidate.url, alt: candidate.alt, bytes, ...readImageSize(readFileSync(file)) };
  }
  throw new Error(`${label}: no usable og:image (the site image ${SITE_IMAGE} is missing from dist)`);
}

// --- HTML ---------------------------------------------------------------------------------------

const escapeHtml = (value) =>
  String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");

// Long descriptions are reported, never cut: the wording is approved copy.
function checkDescription(text, label) {
  const clean = text.replace(/\s+/g, " ").trim();
  if (clean.length > MAX_DESCRIPTION) warn(`${label}: description is ${clean.length} characters (aim for ${MAX_DESCRIPTION} or fewer)`);
  return clean;
}

// Tags this script owns. All of them are removed from the template first, so nothing is duplicated.
const MANAGED_TAGS = [
  /<title>[\s\S]*?<\/title>\s*/gi,
  /<meta\b[^>]*\bname=["']description["'][^>]*>\s*/gi,
  /<link\b[^>]*\brel=["']canonical["'][^>]*>\s*/gi,
  /<meta\b[^>]*\bproperty=["']og:[^"']*["'][^>]*>\s*/gi,
  /<meta\b[^>]*\bname=["']twitter:[^"']*["'][^>]*>\s*/gi,
];

function metaTags(page) {
  const { image } = page;
  const tags = [
    `<title>${escapeHtml(page.title)}</title>`,
    `<meta name="description" content="${escapeHtml(page.description)}" />`,
    `<link rel="canonical" href="${escapeHtml(page.url)}" />`,
    `<meta property="og:site_name" content="${escapeHtml(SITE_NAME)}" />`,
    `<meta property="og:type" content="${page.type}" />`,
    `<meta property="og:title" content="${escapeHtml(page.title)}" />`,
    `<meta property="og:description" content="${escapeHtml(page.description)}" />`,
    `<meta property="og:url" content="${escapeHtml(page.url)}" />`,
    `<meta property="og:image" content="${escapeHtml(image.url)}" />`,
  ];
  if (image.width && image.height) {
    tags.push(`<meta property="og:image:width" content="${image.width}" />`);
    tags.push(`<meta property="og:image:height" content="${image.height}" />`);
  }
  if (image.alt) tags.push(`<meta property="og:image:alt" content="${escapeHtml(image.alt)}" />`);
  tags.push(
    `<meta name="twitter:card" content="summary_large_image" />`,
    `<meta name="twitter:title" content="${escapeHtml(page.title)}" />`,
    `<meta name="twitter:description" content="${escapeHtml(page.description)}" />`,
    `<meta name="twitter:image" content="${escapeHtml(image.url)}" />`,
  );
  if (image.alt) tags.push(`<meta name="twitter:image:alt" content="${escapeHtml(image.alt)}" />`);
  return tags;
}

function renderPage(template, page) {
  let html = template;
  for (const pattern of MANAGED_TAGS) html = html.replace(pattern, "");
  const block = metaTags(page).join("\n    ");
  // Right after the viewport tag, so the title and tags come before the stylesheet and scripts.
  const viewport = html.match(/<meta\b[^>]*\bname=["']viewport["'][^>]*>\s*/i);
  if (viewport) {
    const at = viewport.index + viewport[0].length;
    return `${html.slice(0, at)}${block}\n\n    ${html.slice(at)}`;
  }
  return html.replace(/<\/head>/i, `    ${block}\n  </head>`);
}

function checkTemplate(template) {
  if (!/<script\b[^>]*\bsrc=["']\/assets\//i.test(template)) {
    throw new Error("dist/index.html: the app script is not loaded from an absolute /assets/ path; nested pages would not boot");
  }
  const relative = template.match(/\b(?:src|href)=["'](?:\.\/|assets\/)[^"']*["']/i);
  if (relative) throw new Error(`dist/index.html: relative asset path ${relative[0]}; nested pages would not load it`);
}

function checkPage(html, page) {
  const count = (pattern) => (html.match(pattern) || []).length;
  const expectOne = [
    [/<title>/gi, "<title>"],
    [/name="description"/g, "description"],
    [/rel="canonical"/g, "canonical"],
    [/property="og:title"/g, "og:title"],
    [/property="og:image"/g, "og:image"],
    [/name="twitter:card"/g, "twitter:card"],
  ];
  for (const [pattern, name] of expectOne) {
    if (count(pattern) !== 1) throw new Error(`${page.file}: expected one ${name}, found ${count(pattern)}`);
  }
}

// --- Pages --------------------------------------------------------------------------------------

const pageUrl = (sitePath) => `${SITE_URL}${sitePath}`;

const mainImageIsTooBig = (imageUrl) => {
  const file = imageUrl?.startsWith("/") && path.join(DIST, imageUrl);
  return Boolean(file && existsSync(file) && statSync(file).size > MAX_IMAGE_BYTES);
};

function listingPage(sitePath, title, description) {
  return {
    sitePath,
    title: `${title} — ${SITE_NAME}`,
    description: checkDescription(description ?? SITE_DESCRIPTION, sitePath),
    type: "website",
    image: resolveImage([{ url: SITE_IMAGE }], sitePath),
  };
}

function projectPage(project, previewJpgs) {
  // Trailing slash: GitHub Pages serves this form with 200 and redirects the form without it.
  const sitePath = `/projects/${project.collection}/${project.id}/`;
  return {
    sitePath,
    title: `${project.title} — ${SITE_NAME}`,
    description: checkDescription(
      project.seoDescription ?? `${project.title}. ${project.category} case study by ${SITE_NAME}.`,
      sitePath,
    ),
    type: "article",
    image: resolveImage(
      [
        { url: project.ogImage },
        { url: previewJpg(project.thumbnail, previewJpgs), alt: project.thumbnailAlt },
        { url: mainImageIsTooBig(project.image) ? previewJpg(project.image, previewJpgs) : project.image },
        { url: SITE_IMAGE },
      ],
      sitePath,
    ),
  };
}

async function main() {
  const templatePath = path.join(DIST, "index.html");
  if (!existsSync(templatePath)) throw new Error("dist/index.html not found: run vite build first");
  const template = readFileSync(templatePath, "utf8");
  checkTemplate(template);

  const { projects, PROJECT_COLLECTIONS, __ogPreviewJpgs } = await loadProjectData();

  const pages = [
    listingPage("/projects/", "Projects", LISTING_DESCRIPTIONS.projects),
    ...Object.values(PROJECT_COLLECTIONS).map((collection) =>
      listingPage(`/projects/${collection.slug}/`, collection.title, LISTING_DESCRIPTIONS[collection.slug]),
    ),
    ...projects.map((project) => projectPage(project, __ogPreviewJpgs)),
  ];
  rmSync(SSR_OUT_DIR, { recursive: true, force: true });

  for (const page of pages) {
    page.url = pageUrl(page.sitePath);
    page.file = path.join("dist", page.sitePath, "index.html");
    const html = renderPage(template, page);
    checkPage(html, page);
    mkdirSync(path.join(ROOT, path.dirname(page.file)), { recursive: true });
    writeFileSync(path.join(ROOT, page.file), html);
  }

  console.log(`[og-pages] wrote ${pages.length} pages:`);
  for (const { file, image } of pages) {
    const size = `${image.width}x${image.height}, ${Math.round(image.bytes / 1000)} kB`;
    console.log(`  ${file}  ->  ${image.url.replace(SITE_URL, "")}  (${size})`);
  }
}

main().catch((error) => {
  rmSync(SSR_OUT_DIR, { recursive: true, force: true });
  console.error(`[og-pages] ${error.message}`);
  process.exit(1);
});
