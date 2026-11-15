import type { CSSProperties } from "react";
import SectionGrid from "./SectionGrid";
import CaseImage from "./CaseImage";
import DecisionNote from "./DecisionNote";
import type { DecisionRow } from "./types";

interface ImageFile {
  src: string;
  alt: string;
  width: number;
  height: number;
}

interface BoardBlockProps {
  decision: DecisionRow[];
  board: ImageFile;
  // Note about one spot on the board, and how far down the board that spot is (e.g. "57%").
  annotation: string;
  annotationAt: string;
  caption: string;
  ai: ImageFile;
}

// A decision next to a screenshot, with notes on it, then a second screenshot below.
// From md: DecisionNote cols 1-4 and the board cols 6-12, top-aligned; the caption sits 12px under the
// board in cols 8-10 (the figure is a subgrid of cols 6-12, so the caption lines up with the page grid);
// the second image is 20px under the caption, cols 6-12.
// The annotation: from xl, text in cols 3-4 and a leader line across col 5 to the board, centred at
// annotationAt of the board's height (it stretches over the board's grid row). Between md and xl the
// DecisionNote can grow into that spot, so the annotation sits under the board in cols 6-7, next to the
// caption. Below md everything stacks in DOM order, notes under the board, no leader line.
const BoardBlock = ({ decision, board, annotation, annotationAt, caption, ai }: BoardBlockProps) => (
  <SectionGrid data-section="board" className="items-start">
    <DecisionNote rows={decision} className="col-span-12 md:col-span-4 md:col-start-1 md:row-start-1" />
    <CaseImage
      {...board}
      caption={caption}
      className="col-span-12 mt-16 md:col-span-7 md:col-start-6 md:row-span-2 md:row-start-1 md:mt-0 md:grid md:grid-cols-subgrid md:grid-rows-subgrid md:self-stretch"
      captionClassName="md:col-span-3 md:col-start-3"
    />
    <div className="col-span-12 mt-3 md:col-span-2 md:col-start-6 md:row-start-2 xl:relative xl:col-span-3 xl:col-start-3 xl:row-start-1 xl:mt-0 xl:self-stretch">
      <div
        className="xl:absolute xl:inset-x-0 xl:top-[--annotation-at] xl:grid xl:-translate-y-1/2 xl:grid-cols-3 xl:items-center xl:gap-x-5"
        style={{ "--annotation-at": annotationAt } as CSSProperties}
      >
        <p className="text-annotation text-ink-muted xl:col-span-2">{annotation}</p>
        <div aria-hidden="true" className="hidden h-px bg-line xl:block" />
      </div>
    </div>
    <CaseImage {...ai} className="col-span-12 mt-5 md:col-span-7 md:col-start-6 md:row-start-3" />
  </SectionGrid>
);

export default BoardBlock;
