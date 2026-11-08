import { cn } from "@/lib/utils";
import { RichLines } from "./RichText";
import type { DecisionRow } from "./types";

// What was dropped and what was chosen instead: rows of label, dash, text, 8px apart.
// Label column 64px (w-16), dash column 28px (w-7), so every row's text starts 92px in.
// Labels: label style, ink-muted. Text: annotation style. DROPPED is ink-muted and struck through;
// CHOSE and EDGE are ink. The dash is decorative (aria-hidden); the <dl> pairs each label with its text.
const DecisionNote = ({ rows, className }: { rows: DecisionRow[]; className?: string }) => (
  <dl className={cn("flex flex-col gap-2", className)}>
    {rows.map((row) => (
      <div key={row.label} className="flex items-start">
        <dt className="w-16 shrink-0 text-label text-ink-muted">{row.label}</dt>
        <dd className="flex items-start">
          <span aria-hidden="true" className="w-7 shrink-0 text-center text-label text-ink-muted">
            —
          </span>
          <span className={cn("text-annotation", row.kind === "dropped" ? "text-ink-muted line-through" : "text-ink")}>
            <RichLines lines={row.lines} />
          </span>
        </dd>
      </div>
    ))}
  </dl>
);

export default DecisionNote;
