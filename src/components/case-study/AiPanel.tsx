import type { CSSProperties } from "react";
import { cn } from "@/lib/utils";
import SectionGrid from "./SectionGrid";
import CaseImage from "./CaseImage";
import DecisionNote from "./DecisionNote";
import { RichLines } from "./RichText";
import type { AiPanelRow, AiScreen } from "./types";

interface PanelImage {
  src: string;
  width: number;
  height: number;
  // Where the note's leader meets the screenshot, as a share of its height (e.g. "25%"). Default: centred.
  noteAt?: string;
}

// Grid rows from xl, one per block. Written out so Tailwind sees every class.
const ROW = ["xl:row-start-1", "xl:row-start-2", "xl:row-start-3", "xl:row-start-4", "xl:row-start-5"];

// Screenshot blocks of the AI panel, stacked 16px apart so they read as one panel, each with a note.
//
// From xl: each block is one grid row, its image in cols 6-12. The note sits to the left, the same
// pattern as the board block's annotation: text in cols 3-4 and a 1px leader across col 5 to the image.
// A DecisionNote needs its label column, so it spans cols 1-4, with the leader in the same place.
// The note's cell stretches over the row and the note is centred on noteAt of the row's height
// (default 50%), so the leader points at the same spot in the screenshot at any width.
//
// Below xl: images full width, stacked in DOM order; each note 12px under its image, no leader, and
// 32px from a note to the next image.
const AiPanel = ({ rows, images }: { rows: AiPanelRow[]; images: Record<AiScreen, PanelImage> }) => (
  <SectionGrid data-section="ai-panel" className="items-start xl:gap-y-4">
    {rows.map((row, i) => {
      const { noteAt, ...image } = images[row.screen];
      const decision = !!row.decision;
      return [
        <CaseImage
          key={`${row.screen}-image`}
          {...image}
          alt={row.alt}
          className={cn("col-span-12 xl:col-span-7 xl:col-start-6 xl:mt-0", ROW[i], i > 0 && "mt-8")}
        />,
        <div
          key={`${row.screen}-note`}
          className={cn(
            "col-span-12 mt-3 xl:relative xl:mt-0 xl:self-stretch",
            decision ? "xl:col-span-5 xl:col-start-1" : "xl:col-span-3 xl:col-start-3",
            ROW[i],
          )}
        >
          <div
            className={cn(
              "xl:absolute xl:inset-x-0 xl:top-[--note-at] xl:grid xl:-translate-y-1/2 xl:items-center xl:gap-x-5",
              decision ? "xl:grid-cols-5" : "xl:grid-cols-3",
            )}
            style={{ "--note-at": noteAt ?? "50%" } as CSSProperties}
          >
            {row.decision ? (
              <DecisionNote rows={row.decision} className="xl:col-span-4" />
            ) : (
              <p className="text-annotation text-ink-muted xl:col-span-2">
                <RichLines lines={row.note ?? []} />
              </p>
            )}
            <div aria-hidden="true" className="hidden h-px bg-line xl:block" />
          </div>
        </div>,
      ];
    })}
  </SectionGrid>
);

export default AiPanel;
