import { cn } from "@/lib/utils";
import type { RichLine, RichParagraph } from "./types";

const renderLine = (line: RichLine) =>
  typeof line === "string"
    ? line
    : line.map((run, i) => (run.bold ? <strong key={i} className="font-bold">{run.text}</strong> : run.text));

// Each line is its own block, so an intentional break never needs a <br>.
export const RichLines = ({ lines }: { lines: RichLine[] }) => (
  <>
    {lines.map((line, i) => (
      <span key={i} className="block">
        {renderLine(line)}
      </span>
    ))}
  </>
);

// Paragraphs, each its own <p>. The gap between paragraphs is one line of the paragraph's text style,
// so the caller passes the matching gap (body-sm: gap-6 = 24px, body: gap-7 = 28px).
export const RichParagraphs = ({ paragraphs, className }: { paragraphs: RichParagraph[]; className?: string }) => (
  <div className={cn("flex flex-col", className)}>
    {paragraphs.map((paragraph, i) => (
      <p key={i}>
        <RichLines lines={paragraph} />
      </p>
    ))}
  </div>
);
