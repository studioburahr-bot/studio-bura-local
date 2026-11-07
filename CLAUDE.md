# Studio Bura site

## Case study sections

Case study pages (src/pages/ProjectDetail.tsx) are moving from exported Figma images to coded sections. The risk-triage-tool page is the reference implementation. Apply these rules to every coded section.

### Structure

- Components live in `src/components/case-study/`: `SectionGrid`, `SectionLabel`, `HeroSection`, `StatementSection`, `OverviewSection`, plus `RichText` and `types.ts`. Build new section types there so every case study can reuse them.
- Every section sits on `SectionGrid` (`grid grid-cols-12 gap-x-5`), inside the page's existing `max-w-container mx-auto px-4 sm:px-6`. This keeps the left edge in line with the top bar and the "Back to …" link.
- Grid spans from md up: hero heading cols 1–8, statement cols 1–7, left blocks cols 1–3, right blocks cols 8–12 (`md:col-start-8 md:col-span-5`). Below md every block is `col-span-12`, stacked in DOM order.
- All copy lives in the project's `caseStudy` entry in `src/data/projects.ts`, typed by `CaseStudyContent`. JSX only renders it.
- Project accent colours are HSL channels in `caseStudy.accent` / `accentStrong`, set as `--project-accent` / `--project-accent-strong` on the case study's page wrapper.
- The project header (title, Project, Type) is shared by all projects; leave it as it is.

### Values

- Figma CSS is reference only. Translate typography, colour, spacing, gap, padding and radius into Tailwind. Layout comes from the grid spans; position, left/top, fixed width/height, opacity and vector layers are left out.
- Colours: only the tokens `ink`, `ink-muted`, `surface`, `project-accent`, `project-accent-strong` (tailwind.config.ts). Text is `text-ink` or `text-ink-muted`, at full opacity.
- Text styles: only the fontSize tokens `hero`, `statement`, `heading-3`, `body`, `body-sm`, `label`. The first four switch size at md through CSS variables in src/index.css, so one class covers both sizes. Weight is a separate class (`font-bold`); "Body small bold" is `text-body-sm font-bold`. Load any new Poppins weight in the Google Fonts link in index.html (it loads 300–700); never rely on faux bold.
- Spacing uses the default Tailwind scale (Figma spacing is rounded to it). An arbitrary value is a last resort: add a comment saying why, and report it.
- Vertical rhythm: one section gap, 128px from md and 64px below (`gap-16 md:gap-32` on the stack of coded sections, the same as padding above the first and below the last). Apply it on the stack, not per element.
- An animation with built-in empty space gets a negative margin that removes that space, so the visible gap is still the section gap. For RiskHeroAnimation that is `-my-[6%]` (120 of 2000 viewBox units; percent margins follow the width).
- Inside a block: label, h3 and text are 12px apart (`gap-3`). Blocks in a column are 64px apart (`gap-16`). Paragraph gap = one line of that paragraph's style (`body` gap-7, `body-sm` gap-6).

### Text

- Each paragraph is its own `<p>`. An intentional line break is a new line in the copy data, rendered as `<span class="block">`; markup has no `<br>`.
- Headings use `text-balance`.
- Hierarchy: the page's only h1 is the project title in the header. Hero heading and statement are h2; headings inside blocks are h3. Labels (ROLE, THE PROBLEM, …) are `SectionLabel`, a `<p>`.

### Don't touch

- Only change the page you're working on. The top bar, RiskHeroAnimation and the other animation components, other projects, and ProjectDetail.tsx's shared layout stay as they are beyond what the page needs.
- When a coded section replaces an image, remove the image from the page but keep the file in the repo until the user says to delete it.

### Checking against Figma

- With the dev server running, `?overlay=1` draws the Figma exports over their sections at 50% (pass `overlay` to the section component). Exports live in `design-ref/` (gitignored), are served by the dev server by path and are never imported, so production builds don't include them. Keep it that way: a string path behind `import.meta.env.DEV`, never an `import`.
- Check at 1440 (the Figma width: 1352px content), 1280 and 390, then run `npm run build`.
