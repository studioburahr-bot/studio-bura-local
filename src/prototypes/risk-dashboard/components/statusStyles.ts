import type { StepStatus } from "../data";

// How a step card looks per status. Done and Waiting are quiet; At risk is the one that stands out.
export const CARD_STYLES: Record<
  StepStatus,
  { card: string; title: string; detail: string; note: string; divider: string; when: string; date: string; meta: string }
> = {
  done: {
    card: "border-[color:var(--rp-border)] bg-[var(--rp-surface)]",
    title: "text-[18px] font-semibold tracking-[-.02em] text-[color:var(--rp-text-3)]",
    detail: "font-medium text-[color:var(--rp-muted)]",
    note: "bg-[var(--rp-subtle-2)] px-[10px] py-2 text-[13px] text-[color:var(--rp-muted)]",
    divider: "border-[color:var(--rp-divider)]",
    when: "text-[14px] font-semibold text-[color:var(--rp-muted)]",
    date: "font-medium text-[color:var(--rp-muted)]",
    meta: "font-medium text-[color:var(--rp-muted)]",
  },
  atrisk: {
    card: "border-[color:var(--rp-atrisk-border)] bg-[var(--rp-atrisk-surface)]",
    title: "text-[22px] font-extrabold tracking-[-.025em] text-[color:var(--rp-text)]",
    detail: "font-semibold text-[color:var(--rp-text-3)]",
    note: "bg-[var(--rp-atrisk-tint)] px-3 py-[10px] text-[15px] font-extrabold text-[color:var(--rp-atrisk-text)]",
    divider: "border-[color:var(--rp-atrisk-divider)]",
    when: "text-[15px] font-extrabold text-[color:var(--rp-text)]",
    date: "font-semibold text-[color:var(--rp-text-3)]",
    meta: "font-semibold text-[color:var(--rp-text-2)]",
  },
  waiting: {
    card: "border-dashed border-[color:var(--rp-waiting-border)] bg-[var(--rp-surface)]",
    title: "text-[18px] font-semibold tracking-[-.02em] text-[color:var(--rp-text-3)]",
    detail: "font-medium text-[color:var(--rp-muted)]",
    note: "border border-[color:var(--rp-border)] px-[10px] py-2 text-[13px] font-medium text-[color:var(--rp-muted)]",
    divider: "border-[color:var(--rp-divider)]",
    when: "text-[14px] font-semibold text-[color:var(--rp-text-3)]",
    date: "font-medium text-[color:var(--rp-muted)]",
    meta: "font-medium text-[color:var(--rp-muted)]",
  },
};

// Segment from one node to the next: green once the step is done, dashed for a time gate, grey otherwise.
// Drawn from the column's centre across the 24px grid gap to the next column's centre.
export const segmentClass = (status: StepStatus, isGate: boolean) =>
  `absolute left-1/2 top-1/2 -mt-px w-[calc(100%+24px)] ${
    isGate
      ? "border-t-2 border-dashed border-[color:var(--rp-faint)]"
      : `h-[2px] ${status === "done" ? "bg-[var(--rp-done)]" : "bg-[var(--rp-line)]"}`
  }`;

// Where the gate chip sits: halfway along that segment
export const GATE_POSITION = "absolute left-[calc(100%+12px)] top-1/2 z-[1] -translate-x-1/2 -translate-y-1/2";

// Same segment, drawn vertically for the route layout below 1024px
export const routeClass = (status: StepStatus, isGate: boolean) =>
  isGate
    ? "border-l-2 border-dashed border-[color:var(--rp-faint)]"
    : `w-[2px] ${status === "done" ? "bg-[var(--rp-done)]" : "bg-[var(--rp-line)]"}`;
