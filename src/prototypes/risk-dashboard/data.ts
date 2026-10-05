// All mock data and UI copy for the prototype lives here, so it can be reviewed and edited in one place.
// "Today" is Fri Jun 13. Timeline: Paint Jun 14 → 24h dry → Racking Jun 15 → Signage Jun 16
// → Jun 17 is the only buffer day → Launch Wed Jun 18 (locked).
// The chain is deterministic setup data, not AI output.

export type StepStatus = "done" | "atrisk" | "waiting";
export type SourceKind = "system" | "field" | "onsite" | "supplier";

// The note box in the middle of each step card
export type StepNote =
  | { kind: "system"; system: string } // system the status was read from
  | { kind: "text"; text: string }
  | { kind: "reschedule"; label: string; was: string; now: string; confirmation: string };

export interface ChainStep {
  id: string;
  name: string;
  detail: string;
  status: StepStatus;
  source: { kind: SourceKind; label: string };
  note: StepNote;
  when: { label: string; date: string };
  owner: string;
}

// Link between two neighbouring steps. A gate is a time wait on the edge, not a step.
export type Connector =
  | { kind: "plain" }
  | { kind: "gate"; duration: string; caption: string; srText: string };

export const STATUS_LABEL: Record<StepStatus, string> = {
  done: "Done",
  atrisk: "At risk",
  waiting: "Waiting",
};

// Prototype frame (top bar and footer)
export const shell = {
  caseStudyPath: "/projects/digital/risk-triage-tool",
  dashboardPath: "/projects/digital/risk-triage-tool/prototype",
  detailsPath: "/projects/digital/risk-triage-tool/prototype/details",
  back: "← Back to case study",
  label: "Interactive prototype · actions are simulated",
  footer: "Data shown is illustrative and does not reflect real client figures.",
  // App sidebar. Only Builds is real; Setup and Activity are shown for context and go nowhere.
  nav: {
    label: "Main",
    builds: "Builds",
    inert: ["Setup", "Activity"],
    inertNote: "not available in this prototype",
  },
};

export const build = {
  org: "Nordhaus Interiors · Store 041, Bramfeld",
  implementationId: "IMP-2214",
  title: "Kitchen display rebuild — Range 4",
  today: { label: "Today", value: "Fri, Jun 13" },
  launch: { label: "Launch", value: "Wed, Jun 18", note: "locked" },
};

export const chainCopy = {
  heading: "Dependency chain",
};

export const steps: ChainStep[] = [
  {
    id: "assembly",
    name: "Assembly",
    detail: "Carcasses set, doors hung",
    status: "done",
    source: { kind: "system", label: "System-read" },
    note: { kind: "system", system: "AssemblyHub" },
    when: { label: "Closed Wed", date: "· Jun 11" },
    owner: "Carpentry team",
  },
  {
    id: "paint",
    name: "Paint",
    detail: "Two coats, back wall",
    status: "atrisk",
    source: { kind: "onsite", label: "On-site check" },
    note: { kind: "text", text: "Not confirmed for tomorrow" },
    when: { label: "Tomorrow", date: "Jun 14" },
    owner: "Carpentry team",
  },
  {
    id: "racking",
    name: "Racking",
    detail: "Shelving delivered + set to plan",
    status: "waiting",
    source: { kind: "field", label: "Field tap" },
    note: { kind: "text", text: "Waiting on paint + dry" },
    when: { label: "In 2 days", date: "Jun 15" },
    owner: "Sales",
  },
  {
    id: "signage",
    name: "Signage",
    detail: "Wayfinding + price boards",
    status: "waiting",
    source: { kind: "supplier", label: "External" },
    note: {
      kind: "reschedule",
      label: "Delivery",
      was: "Jun 13",
      now: "Jun 14",
      confirmation: "Supplier confirmed",
    },
    when: { label: "In 3 days", date: "Jun 16" },
    owner: "Sign supplier",
  },
];

// connectors[i] sits between steps[i] and steps[i + 1]
export const connectors: Connector[] = [
  { kind: "plain" },
  { kind: "gate", duration: "+24h", caption: "Dry time", srText: "then 24 hours dry time before" },
  { kind: "plain" },
];

// AI assessment panel: the single ranked risk. Signage is deliberately not here.
export const rail = {
  aiLabel: "AI assessment",
  meta: "Ranked by cost to launch · updated 09:12",
  risk: {
    stepId: "paint",
    headline: "Nudge paint for tomorrow — if it slips, the Jun 18 launch loses its only buffer day.",
    evidence: ["Not confirmed for tomorrow", "24h dry gate before racking", "Launch date locked"],
  },
  actions: { details: "Details", dismiss: "Dismiss risk", nudge: "Nudge" },
};

// Nudge flow. The AI drafts; the coordinator decides. Sending never changes Paint's status.
export const DISMISS_REASONS = ["Handled offline", "Not a real risk", "Check later"] as const;
export type DismissReason = (typeof DISMISS_REASONS)[number];

export const nudge = {
  aiLabel: "Drafted by AI · you decide",
  toLabel: "To",
  recipient: "Carpentry team · morning shift",
  draft:
    "Hi team — can you confirm paint on the back wall is going ahead tomorrow, Jun 14? Racking starts Jun 15 after the 24h dry time, and the Jun 18 launch date is locked, so a slip would use up our only buffer day. A quick yes, or a heads-up if anything is in the way, is all I need. Thanks!",
  editorLabel: "Edit the drafted message",
  actions: {
    edit: "Edit",
    doneEditing: "Done editing",
    cancel: "Cancel",
    send: "Send",
    sending: "Sending…",
    undo: "Undo",
  },
  // Simulated clock: starts at the rail's "updated 09:12" and moves with real minutes
  clockStart: { hours: 9, minutes: 12 },
  sendingMs: 1000,
  undoMs: 5000,
  sent: {
    status: "Nudged · awaiting reply",
    sentAt: (time: string) => `Sent ${time} to Carpentry team · morning shift`,
    stillAtRisk: "Paint stays at risk until the team confirms.",
    viewMessage: "View message",
    hideMessage: "Hide message",
    edited: "Edited by you before sending",
    unedited: "Sent as drafted by AI",
  },
  dismissed: {
    status: "Recommendation dismissed",
    stillAtRisk: "Paint still shows as at risk in the chain.",
    reasonPrompt: "Add a reason (optional)",
  },
  reset: "Reset prototype",
  // Read out by screen readers (aria-live)
  announce: {
    sending: "Sending nudge…",
    sent: "Nudge sent to Carpentry team, morning shift. Paint is still at risk until they confirm.",
    undoSend: "Nudge cancelled. The draft is open again.",
    dismissed: "Risk dismissed. You can add a reason or undo.",
    reason: (reason: string) => `Reason added: ${reason}.`,
    undoDismiss: "Dismiss undone. The risk is back in the list.",
    reset: "Prototype reset.",
  },
};

// Details view: why Paint is the one ranked risk. Follows Details v1.
export const details = {
  breadcrumbCurrent: "Paint at risk",
  ref: "IMP-2214 · Store 041",
  hero: {
    aiLabel: "Assessed by AI",
    meta: "Carpentry team · not confirmed",
    title: "Paint for tomorrow isn't confirmed yet",
    body: "Paint is booked for Jun 14 and needs 24h to dry before racking can start on Jun 15. Nobody has confirmed it's going ahead.",
    nudge: "Nudge Carpentry team",
    backToDraft: "Back to the draft",
  },
  next: {
    heading: "What happens next",
    aiLabel: "Projected by AI",
    cards: [
      {
        tag: "If paint is done tomorrow",
        title: "Launch keeps its buffer",
        body: "Dry by Jun 15, racking Jun 15, signage Jun 16. Jun 17 stays free as the only buffer before launch.",
      },
      {
        tag: "If paint slips a day",
        title: "The buffer day is gone",
        body: "Racking moves to Jun 16 and signage to Jun 17. Launch still holds, but nothing else can slip. A second day would miss Jun 18.",
      },
    ],
  },
  chain: {
    heading: "Where it sits in the chain",
    launch: { name: "Launch", date: "Jun 18" },
    facts: [
      { label: "Upstream", text: "Assembly is done (closed Jun 11, read from AssemblyHub). Nothing stops paint from starting." },
      { label: "Gate", text: "24h dry time after paint, before racking can start." },
      { label: "Freezes", text: "Racking (Jun 15) and Signage (Jun 16) are waiting on paint." },
      { label: "Cost to launch", text: "One day's slip uses up Jun 17, the only buffer. Two days miss the locked Jun 18 launch." },
    ],
  },
  notFlagged: {
    heading: "Why Signage isn't flagged",
    body: "Signage is late, but the supplier confirmed delivery for Jun 14 and it isn't installed until Jun 16, so it doesn't block anything before then.",
  },
  evidence: {
    heading: "Evidence",
    items: [
      { tone: "atrisk", text: "No confirmation logged for paint tomorrow.", source: "Carpentry team · on-site check" },
      { tone: "done", text: "Assembly closed Jun 11.", source: "AssemblyHub · system-read" },
      { tone: "neutral", text: "24h dry time required between paint and racking.", source: "Chain setup" },
      { tone: "neutral", text: "Launch date Jun 18 announced to customers.", source: "Launch · locked" },
    ],
  },
  history: {
    heading: "History",
    items: [
      // tone picks the dot colour: done = green, atrisk = orange (and bold), neutral = grey
      { date: "Jun 11", text: "Assembly closed in AssemblyHub.", tone: "done" },
      { date: "Jun 12", text: "Paint booked for Jun 14 with the carpentry team.", tone: "neutral" },
      { date: "Jun 13", text: "Sign supplier moved delivery to Jun 14 and confirmed.", tone: "neutral" },
      { date: "Jun 13", text: "No paint confirmation logged for tomorrow.", tone: "atrisk" },
    ],
    // Added live from what the coordinator did in the prototype
    nudged: (time: string) => `You nudged Carpentry team · morning shift at ${time}.`,
    dismissed: (reason: string | null) => `You dismissed this risk${reason ? ` · ${reason}` : ""}.`,
  },
};
