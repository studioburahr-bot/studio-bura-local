// Button styles shared across the prototype. All targets are at least 44px tall.
const base =
  "inline-flex min-h-[44px] items-center justify-center rounded-full transition-colors disabled:cursor-not-allowed disabled:opacity-50";

// The single primary (black) button. Only used in the AI rail.
export const primaryButton = `${base} border border-[color:var(--rp-primary)] bg-[var(--rp-primary)] px-[26px] text-[14px] font-bold tracking-[-.01em] text-white enabled:hover:border-[color:var(--rp-primary-hover)] enabled:hover:bg-[var(--rp-primary-hover)] enabled:active:bg-black`;

export const secondaryButton = `${base} border border-[color:var(--rp-border-strong)] bg-[var(--rp-surface)] px-[22px] text-[13px] font-semibold text-[color:var(--rp-text)] enabled:hover:border-[color:var(--rp-text)]`;

// Text-only button (Details, Cancel). Still 44px tall for touch.
export const textButton = `${base} px-2 text-[13px] font-semibold`;
