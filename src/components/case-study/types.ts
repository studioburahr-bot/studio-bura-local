// Content types for coded case study sections. The copy itself lives in src/data/projects.ts.

// A run of text inside a line; bold renders as <strong>.
export interface RichRun {
  text: string;
  bold?: boolean;
}

// One line of copy. Lines after the first are intentional breaks: each renders as <span class="block">,
// never <br>. A plain string is a line with no bold runs.
export type RichLine = string | RichRun[];

// One paragraph (<p>): one or more lines.
export type RichParagraph = RichLine[];

// A labelled block: small uppercase label, optional h3, then paragraphs.
export interface TextBlockContent {
  label: string;
  heading?: string;
  paragraphs: RichParagraph[];
}

export interface CaseStudyContent {
  // Project accent colours as HSL channels ("218 75.6% 46.7%"), set as --project-accent and
  // --project-accent-strong on the case study's page wrapper.
  accent: string;
  accentStrong: string;
  hero: RichLine[];
  statement: RichLine[];
  overview: {
    left: TextBlockContent[];
    right: TextBlockContent[];
  };
}
