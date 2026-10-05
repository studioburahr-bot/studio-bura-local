// Button and label styles shared across the prototype. Rectangular (6px radius), at least 44px tall for touch.
const base =
  "inline-flex min-h-[44px] items-center justify-center rounded-[6px] text-[14px] transition-colors disabled:cursor-not-allowed disabled:opacity-50";

// Blue primary: Nudge, Send
export const primaryButton = `${base} border border-[color:var(--rp-blue)] bg-[var(--rp-blue)] px-[26px] font-bold text-white enabled:hover:border-[color:var(--rp-blue-hover)] enabled:hover:bg-[var(--rp-blue-hover)] enabled:active:bg-[var(--rp-blue-active)]`;

// Outlined: Edit, reason chips
export const secondaryButton = `${base} border border-[color:var(--rp-border-strong)] bg-[var(--rp-surface)] px-4 font-semibold text-[color:var(--rp-text)] enabled:hover:border-[color:var(--rp-faint)]`;

// Text-only, no colour of its own (callers add one)
export const textButton = `${base} px-[10px] font-semibold`;

// Blue text link-button: Details, Undo, View message
export const linkButton = `${textButton} text-[color:var(--rp-blue)] hover:bg-[var(--rp-blue-tint)]`;

// Grey text button: Dismiss risk, Cancel
export const quietButton = `${textButton} text-[color:var(--rp-text-3)] enabled:hover:bg-[var(--rp-blue-tint)] enabled:hover:text-[color:var(--rp-text)]`;

// The navy uppercase label that marks AI-authored content (used inside AiBlock strips and on the draft)
export const aiLabel = "rp-label !text-[color:var(--rp-navy)]";
