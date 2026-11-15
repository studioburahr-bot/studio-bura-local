import { cn } from "@/lib/utils";
import SectionGrid from "./SectionGrid";
import SectionLabel from "./SectionLabel";
import { RichParagraphs } from "./RichText";
import type { TextBlockContent } from "./types";

// One labelled block: label, optional h3, paragraphs, 12px apart (Figma gap 12).
// The h3 uses the statement text style (24/32, 32/48 from md), not heading-3, which is 24/32 everywhere.
// small: Body small (16/24, paragraph gap 24) for the left column; otherwise Body (paragraph gap 28).
const TextBlock = ({ block, small }: { block: TextBlockContent; small?: boolean }) => (
  <div className="flex flex-col gap-3">
    <SectionLabel>{block.label}</SectionLabel>
    {block.heading && <h3 className="text-balance text-statement font-bold text-ink">{block.heading}</h3>}
    <RichParagraphs
      paragraphs={block.paragraphs}
      className={cn("text-ink", small ? "gap-6 text-body-sm" : "gap-7 text-body")}
    />
  </div>
);

// Overview: Role / Key decisions / Outcome on the left (cols 1-3), The problem / Approach on the right
// (cols 8-12). Blocks in each column are 64px apart (Figma gap 64). Below md both columns span all
// 12 columns and stack, with the same 64px between them.
const OverviewSection = ({
  left,
  right,
}: {
  left: TextBlockContent[];
  right: TextBlockContent[];
}) => (
  <SectionGrid data-section="overview" className="gap-y-16">
    <div className="col-span-12 flex flex-col gap-16 md:col-span-3">
      {left.map((block) => (
        <TextBlock key={block.label} block={block} small />
      ))}
    </div>
    <div className="col-span-12 flex flex-col gap-16 md:col-span-5 md:col-start-8">
      {right.map((block) => (
        <TextBlock key={block.label} block={block} />
      ))}
    </div>
  </SectionGrid>
);

export default OverviewSection;
