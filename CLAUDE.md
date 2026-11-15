# Studio Bura site

## Case study sections

Case study pages (src/pages/ProjectDetail.tsx) are being converted from exported Figma images to coded sections. The risk-triage-tool page is fully coded and is the reference implementation. Apply these rules to every coded section.

### Structure

- Components live in `src/components/case-study/`. Build new section types there so every case study can reuse them.
  - Layout and text: `SectionGrid`, `SectionLabel`, `RichText`, `types.ts`.
  - Sections: `HeroSection`, `StatementSection`, `OverviewSection`, `DotsChain`, `PersonasSection`, `CapabilityIntro`, `OutcomesSection`.
  - Parts: `DecisionNote`, `CaseImage`, `IconSquare`, `PersonaIcons`, `OutcomeIcons`.
  - Blocks built for risk triage, reusable where the pattern fits: `ChainDiagram`, `BoardBlock`, `FloorFlow`, `AiPanel`, `DecisionBlock`.
- Every section sits on `SectionGrid` (`grid grid-cols-12 gap-x-5`), inside the page's existing `max-w-container mx-auto px-4 sm:px-6`, so its left edge lines up with the top bar and the "Back to …" link.
- The DOM follows the stacked (mobile) order at every width; wider layouts place items with explicit grid positions, so screen readers get one sequence at every width. Give every item placed on a row an explicit start column too, or auto-placement adds columns past 12.
- Each section switches from stacked to columns at one breakpoint: md for the text sections, xl for the screenshot and diagram blocks and the outcomes. Below it every block is `col-span-12`, stacked in DOM order.
- All copy lives in the project's `caseStudy` entry in `src/data/projects.ts`, typed by `CaseStudyContent`. JSX only renders it. Images are imported by the page and passed in with their `width`/`height`.
- Project accent colours are HSL channels in `caseStudy.accent` / `accentStrong`, set as `--project-accent` / `--project-accent-strong` on the case study's page wrapper.
- The project header (title, Project, Type) is shared by all projects; leave it as it is.

### Sections

- Column spans from md: hero heading cols 1–12 (its lines break at sentences), statement cols 1–7, capability intro cols 1–6, dots cols 2–11, Overview left and Personas cols 1–3, Overview right and How might we cols 8–12 (`md:col-start-8 md:col-span-5`). Left and right blocks in one section are top-aligned.
- Board block (`BoardBlock`): DecisionNote cols 1–4 and the screenshot cols 6–12, top-aligned; caption 12px under the screenshot in cols 8–10; the second screenshot 20px under the caption, cols 6–12. The figure is a subgrid (`grid-cols-subgrid grid-rows-subgrid`) so its caption sits on page columns. The side annotation (text cols 3–4, leader across col 5, centred at a percentage of the screenshot's height) starts at xl; between md and xl it sits under the screenshot in cols 6–7, because the DecisionNote can grow into its spot.
- Floor flow (`FloorFlow`): below xl one left-aligned column in DOM order; from xl its own 5-column grid inside the content width, `[phone 16rem] [arrow 1fr] [phone] [arrow 1fr] [phone]` (phone 1 starts on col 1, phone 3 ends on col 12). It needs 3 × 256 + 2 × 152 (the widest arrow label plus breathing room) = 1072px of content, so xl (1280) is the first breakpoint where it fits. Captions get their own row (captioned phones are subgrids over rows 1–2), so all phones start on one line. A note that belongs to a phone sits in that phone's cell, so a taller neighbour can't push it down. The takeaway is a `<p>` in the statement style, exactly cols 1–4: its cell spans the whole flow row and holds a 12-column grid, with `pointer-events-none` on the cell and `pointer-events-auto` on the text.
- AI panel (`AiPanel`): screenshot blocks stacked 16px apart (`xl:gap-y-4`) so they read as one panel, images cols 6–12, one grid row per block from xl. Each note uses the board annotation pattern: text cols 3–4 and a 1px `line` leader across col 5 to the image. A DecisionNote spans cols 1–4 (it needs its label column), with its right edge and leader in the same place. The note's cell stretches over the row, and the note is centred on `noteAt` of the block's height (default 50%; the page passes it next to the image, e.g. 25% where the leader points at the chain timeline). Below xl: images full width, each note 12px under its image without a leader, 32px from a note to the next image.
- Decision block (`DecisionBlock`): a DecisionNote beside captioned screenshots of the outcomes it leads to. From xl: DecisionNote cols 1–4 and the screenshots cols 6–12, stacked, top-aligned (the note's first line and the first caption share a line). Each caption sits 16px above its screenshot (`captionPosition="top"`, `captionClassName="mb-4"`), and a screenshot to the next caption is 16px. Below xl: note, 32px, then captions and screenshots full width.
- Outcomes (`OutcomesSection`), the closing section, the same pattern as Personas / How might we: from xl, the label (the section's h2) and three outcomes in cols 1–5 (label to first item 12px, items 64px apart); each outcome is an `IconSquare`, an h3 in `heading-3` and `body` text, 12px apart. The closing statement is a `<p>` in the statement style with `text-pretty`, cols 8–12, top-aligned with the label. The disclaimer (`annotation`, `ink-muted`) sits 64px under the last item, cols 1–5. Below xl: label, outcomes, statement, disclaimer, full width, 64px apart.
- Wide diagrams (`ChainDiagram`): fixed card sizes from Figma rounded to the scale, left-aligned, fitting at 1280 (the risk chain row is 1072px with 160px cards, so it fits from a 1120px viewport up). Card text wraps inside the card and must fit the card's height; it never overflows or runs into the padding. Where they don't fit, the diagram scrolls sideways in its own container (`overflow-x-auto`, `snap-x snap-mandatory`, `snap-start` on the cards, `role="region"` with an `aria-label` and `tabIndex={0}`), bleeding into the page gutters (`-mx-4 px-4 sm:-mx-6 sm:px-6`) so the next card shows partly at the screen edge. Text never shrinks. Parts meant to animate later take CSS variables (the lifted card: `--lift-x`, `--lift-y`, `--tilt`).
- Dots (`DotsChain`): one rule at every width, dot size = gap = row width / (2 × count − 1), so the row always fits on one line. The raised dot sits `--dot-raise` diameters above its empty slot (1 at rest), ready to animate. The row is `aria-hidden` with an `sr-only` sentence from the copy data.

### Spacing

- Spacing uses the default Tailwind scale (Figma spacing is rounded to it). An arbitrary value is a last resort: add a comment saying why, and report it.
- Section gap: 128px from md, 64px below. Coded sections sit in stacks (`flex flex-col gap-16 md:gap-32`); apply the gap on the stack, not per element.
- Header to hero: from md, `pt-32` on the first stack. Below md the header already ends in 48px of padding, so the stack gets `pt-1.5` (64px from the header's last text line to the hero text).
- Between stacks and the blocks that aren't coded sections (animations, the screen recording), the stacks carry the section gap as padding: `pt-16 md:pt-32` after such a block, `pb-16 md:pb-32` before one. Those blocks have no margin of their own.
- An animation with built-in empty space gets a negative margin that removes it, so the visible gap is still the section gap. For RiskHeroAnimation that is `-my-[6%]` (120 of 2000 viewBox units; percent margins follow the width).
- The last coded section has no bottom padding: the page's shared blank space before the footer (`py-24 sm:py-32`) sets that gap.
- Inside a block: label, h3 and text are 12px apart (`gap-3`). Blocks in a column are 64px apart (`gap-16`). Paragraph gap = one line of that paragraph's style (`body` gap-7, `body-sm` gap-6).

### Values

- Figma CSS is reference only. Translate typography, colour, spacing, gap, padding and radius into Tailwind. Layout comes from the grid spans; position, left/top, fixed width/height, opacity and vector layers are left out. Layer names in exported CSS are often stale; take copy from the brief and line positions from the export.
- Colours: only the tokens `ink`, `ink-muted`, `surface`, `surface-muted`, `project-accent`, `project-accent-strong`, `line` (tailwind.config.ts; Figma variables ink, muted, surface, surface-muted, accent, accent-strong, line). Text is `text-ink` or `text-ink-muted` on light backgrounds, `text-surface` or `text-surface-muted` on `project-accent`, always at full opacity.
- `surface-muted` (#E2E3E7) is light text and borders on `project-accent`, and the grey background behind `ink-muted` text (ghost slots, the UNPLACED box). It's set so both reach 4.5:1; keep it there if it changes. `line` (#A7A7A7) is only for decorative 1px leader lines, which are `aria-hidden`. Diagram connectors are `ink-muted`.
- Text styles: only the fontSize tokens `hero`, `statement`, `heading-3` (24/32), `body`, `body-sm`, `label`, `annotation` (14/20), `diagram` (12/16, diagram card text) and `diagram-mono` (10/12, with `font-mono`, the system monospace stack; no web mono font). `hero`, `statement` and `body` switch size at md through CSS variables in src/index.css, so one class covers both sizes; the others are the same at every width. Weight is a separate class (`font-bold`); "Body small bold" is `text-body-sm font-bold`. Load any new Poppins weight in the Google Fonts link in index.html (it loads 300–700); never rely on faux bold.
- A new fontSize token must also go in the `font-size` list in src/lib/utils.ts. Otherwise `cn()` (tailwind-merge) reads it as a colour and drops it when a colour class like `text-ink` sits next to it.
- Annotations: `annotation` style in `ink-muted`. Where a layout has columns they hang off the element they describe with a 1px `line` leader; where it stacks they go under the element, without a leader.
- Decisions (`DecisionNote`): a `<dl>` of rows, label (DROPPED / CHOSE / EDGE, label style, `ink-muted`) in a 64px column (EDGE too, though Figma's is 36), an `aria-hidden` dash in a 28px column, so the text starts 92px in. The text is `annotation` style: DROPPED is `ink-muted` and struck through; CHOSE and EDGE are `ink`. Rows are 8px apart.
- Screenshots (`CaseImage`): a `<figure>` with alt text from the copy data, `width`/`height` from the file, lazy loading, and an optional figcaption (annotation style, 12px below, or 12px above with `captionPosition="top"`; `captionClassName` changes the gap or colour). Captions are `ink-muted` unless the section says otherwise (the floor flow's are `ink`). `imgClassName` styles the image itself.
- Screenshot files: WebP in `src/assets/projects/`, made with sharp (`webp({ quality: 90, alphaQuality: 100, effort: 6 })`). Wide screenshots about 2x their widest display width (cols 6–12 is 780px at 1440, so about 1560–1600px; keep an export's native width when it's close). Cropped tight: no shadow or margin, transparent rounded corners and every border intact; check all four edges before converting.
- Phone screenshots: 256px wide (`w-64`, or the content width if narrower), `rounded-3xl` with the `shadow-phone` token (tailwind.config.ts, Figma's phone shadow). The files are cropped to the phone with transparent corners and no baked-in shadow or margin, 512px wide.
- Flow arrows: the label (the tap that leads on, annotation style, `ink-muted`) is a real `<p>`; the 1px `line` and its 6px filled head are `aria-hidden`. 96px long on desktop, 48px pointing down when stacked.
- Icon squares (`IconSquare`): 56px (`size-14`), `rounded`, `bg-project-accent`, `text-surface`, shared by personas and outcomes (Figma draws them at 56.67 and 52).
- Icons are inline SVG, `aria-hidden`, coloured with tokens: white → `currentColor` (`text-surface` from the square), dark dots → `project-accent-strong`, ghost outlines → `surface-muted`. Draw coloured backgrounds as divs with tokens, not inside the SVG. Strokes use `vector-effect: non-scaling-stroke`: 1.5 for small UI icons (personas, 28px in the square); 1 for illustrative icons that fill their square (outcomes, whose viewBox is the whole Figma frame).

### Text

- Copy uses curly quotes and apostrophes (“ ” ’), never straight ones.
- Each paragraph is its own `<p>`. An intentional line break is a new line in the copy data, rendered by `RichLines` as `<span class="block">`; markup has no `<br>`. Where a break only suits the wide layout, pass `breakFrom="xl"`: the lines are `xl:block` spans joined by a space, and below xl the text wraps naturally (the outcomes headings and closing statement).
- Headings use `text-balance`. To keep a phrase together (e.g. “the floor”), put a non-breaking space in the copy data (` `), never a manual break. A hyphenated word that must not split (“at‑risk”) takes a non-breaking hyphen (`‑`); Poppins has the glyph.
- Statement-style paragraphs that aren't headings (takeaways, the closing statement) use `text-pretty`, so the last line is never one short word.
- Hierarchy: the page's only h1 is the project title in the header. Hero heading, statement, How might we and capability intro headings are h2; headings inside blocks are h3, whatever their size (the Overview's “The plan was never the problem.” is an h3 in the `statement` style). Labels (ROLE, THE PROBLEM, …) are `SectionLabel`, a `<p>`; where a label is the section's only heading (WHAT IT’S DESIGNED TO CHANGE), it's `SectionLabel as="h2"`.

### Don't touch

- Only change the page you're working on. The top bar, RiskHeroAnimation and the other animation components, other projects, and ProjectDetail.tsx's shared layout stay as they are beyond what the page needs.
- When a coded section replaces an image, remove the image from the page but keep the file in the repo until the user says to delete it.

### Checking against Figma

- The dev overlay draws a Figma export over its section at 50%, 1352px wide (the content width at 1440), from the section's top-left. To use it on a case study:
  1. Export each Figma frame as PNG (any scale; it's drawn 1352px wide) to `design-ref/design/<project>/`. `design-ref/` is gitignored and served by the dev server by path.
  2. In ProjectDetail.tsx, add an entry for the project id to `DEV_OVERLAYS`: a name for each export and its string path (`"/design-ref/design/<project>/<file>.png"`).
  3. Pass `overlay={overlays?.<name>}` to the section the export starts at. `HeroSection`, `StatementSection`, `CapabilityIntro` and `OutcomesSection` take it; any other section can, by forwarding it to `SectionGrid`. If the export starts above or below the section's top edge, also pass `overlayOffset` (e.g. `"-56px"`).
  4. Run `npm run dev` and open the page at 1440 wide with `?overlay=1` (e.g. `/projects/digital/risk-triage-tool?overlay=1`).
- Keep the overlay out of production: string paths behind `import.meta.env.DEV`, never an `import`, and the overlay image's width and offset as inline styles, not classes. Production builds then contain no design-ref paths and no overlay image, and `npm run build` works without `design-ref/`. That matters: the site deploys from GitHub Actions (.github/workflows/deploy.yml), which runs `npm ci` and `npm run build` on a clean checkout of main at every push and publishes `dist` to the gh-pages branch, and that checkout has no `design-ref/`.
- Check at 1440 (the Figma width: 1352px content), 1280, 390 and 320, then run `npm run build`. For a section with its own breakpoint, also check both sides of it (FloorFlow: 1280 and 1024). For a section that scrolls sideways, confirm it fits at 1280 and that at 390 and 320 only its container scrolls, not the page.
