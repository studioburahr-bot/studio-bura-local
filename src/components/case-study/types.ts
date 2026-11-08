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

// Icons drawn by PersonaIcons.tsx.
export type PersonaIconName = "coordinator" | "sales";

export interface PersonaContent {
  icon: PersonaIconName;
  // The role name is a bold run at the start ("Coordinator" runs the build ...).
  text: RichLine[];
}

// An h2 introducing a capability, then paragraphs (CapabilityIntro).
export interface CapabilityIntroContent {
  heading: string;
  paragraphs: RichParagraph[];
}

// One row of a DecisionNote. kind sets the style: dropped is struck through in ink-muted, chose and
// edge are ink. The label (DROPPED, CHOSE, EDGE) is copy.
export interface DecisionRow {
  kind: "dropped" | "chose" | "edge";
  label: string;
  lines: RichLine[];
}

// A step card in a diagram: bold title, owner below.
export interface StepCard {
  title: string;
  owner: string;
  // Small mono tag under the owner ("System-read · AssemblyHub").
  tag?: string;
}

// The risk triage dependency chain (ChainDiagram).
export interface ChainDiagramContent {
  // Accessible name for the diagram's scroll region.
  label: string;
  // Placed steps, in order; the gate sits after the last one.
  steps: StepCard[];
  // Note above the connector between the first two steps.
  dependencyNote: RichLine[];
  // Note below the second step.
  ownerNote: RichLine[];
  // Time gate after the last placed step, with its decision below.
  gate: string;
  gateDecision: DecisionRow[];
  // The step lifted above its empty slot, after the gate.
  liftedStep: StepCard;
  addStep: string;
  unplaced: {
    label: string;
    steps: StepCard[];
    note: RichLine[];
  };
}

// Board block: decision on the left, board screenshot with an annotation and caption, AI screenshot.
export interface BoardBlockContent {
  decision: DecisionRow[];
  annotation: string;
  caption: string;
  boardAlt: string;
  aiAlt: string;
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
  // Dot row (DotsChain): slot count, 1-based raised slot, screen reader sentence.
  dots: {
    count: number;
    raisedSlot: number;
    description: string;
  };
  personas: {
    label: string;
    items: PersonaContent[];
  };
  question: string;
  chainIntro: CapabilityIntroContent;
  chain: ChainDiagramContent;
  boardIntro: CapabilityIntroContent;
  board: BoardBlockContent;
}
