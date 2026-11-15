import SectionGrid from "./SectionGrid";
import CaseImage from "./CaseImage";
import DecisionNote from "./DecisionNote";
import type { DecideScreen, DecisionBlockContent } from "./types";

interface ImageFile {
  src: string;
  width: number;
  height: number;
}

// A decision beside the outcomes it leads to: a DecisionNote and captioned screenshots, stacked.
// Each caption (annotation style, ink-muted) sits 16px above its screenshot; a screenshot to the next
// caption is 16px too.
//
// From xl: DecisionNote cols 1-4, screenshots cols 6-12, top-aligned (the note's first line and the
// first caption start on the same line).
// Below xl: the note, then 32px to the first caption, everything full width, in DOM order.
const DecisionBlock = ({ block, images }: { block: DecisionBlockContent; images: Record<DecideScreen, ImageFile> }) => (
  <SectionGrid data-section="decision-block" className="items-start">
    <DecisionNote rows={block.decision} className="col-span-12 xl:col-span-4 xl:col-start-1 xl:row-start-1" />
    <div className="col-span-12 mt-8 flex flex-col gap-4 xl:col-span-7 xl:col-start-6 xl:row-start-1 xl:mt-0">
      {block.cards.map((card) => (
        <CaseImage
          key={card.screen}
          {...images[card.screen]}
          alt={card.alt}
          caption={card.caption}
          captionPosition="top"
          captionClassName="mb-4"
        />
      ))}
    </div>
  </SectionGrid>
);

export default DecisionBlock;
