import type { ReactNode } from "react";

// Small uppercase label above a block (ROLE, THE PROBLEM, ...). Figma text style: Label.
// The copy is in sentence case ("The problem"); CSS makes it uppercase, so screen readers read words,
// not letters.
// A <p> by default; as="h2" where the label is the section's only heading (the outcomes section).
const SectionLabel = ({ children, as: Tag = "p" }: { children: ReactNode; as?: "p" | "h2" }) => (
  <Tag className="text-label uppercase text-ink-muted">{children}</Tag>
);

export default SectionLabel;
