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
