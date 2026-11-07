import type { ReactNode } from "react";

// Small uppercase label above a block (ROLE, THE PROBLEM, ...). Figma text style: Label.
const SectionLabel = ({ children }: { children: ReactNode }) => (
  <p className="text-label text-ink-muted">{children}</p>
);

export default SectionLabel;
