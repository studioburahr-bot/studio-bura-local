import type { StepStatus } from "../data";

// Colour per status = loop state (done / at risk / waiting), never alarm level.
export const STATUS_STYLES: Record<StepStatus, { text: string; bg: string; bar: string }> = {
  done: {
    text: "text-[color:var(--rp-done-text)]",
    bg: "bg-[var(--rp-done-bg)]",
    bar: "bg-[var(--rp-done)]",
  },
  atrisk: {
    text: "text-[color:var(--rp-atrisk-text)]",
    bg: "bg-[var(--rp-atrisk-bg)]",
    bar: "bg-[var(--rp-atrisk)]",
  },
  waiting: {
    text: "text-[color:var(--rp-waiting-text)]",
    bg: "bg-[var(--rp-waiting-bg)]",
    bar: "bg-[var(--rp-line)]",
  },
};
