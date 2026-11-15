import { Fragment } from "react";
import { cn } from "@/lib/utils";
import type { RichLine, RichParagraph } from "./types";

const renderLine = (line: RichLine) =>
  typeof line === "string"
    ? line
    : line.map((run, i) => (run.bold ? <strong key={i} className="font-bold">{run.text}</strong> : run.text));

// Each line is its own block, so an intentional break never needs a <br>.
// breakFrom="xl": the breaks apply from xl only. Below that the lines are inline, joined by a space,
// and the text wraps naturally. (The space between two blocks is ignored, so it never shows.)
export const RichLines = ({ lines, breakFrom }: { lines: RichLine[]; breakFrom?: "xl" }) => (
  <>
    {lines.map((line, i) => (
      <Fragment key={i}>
        {breakFrom && i > 0 && " "}
        <span className={breakFrom ? "xl:block" : "block"}>{renderLine(line)}</span>
      </Fragment>
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
