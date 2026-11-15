import { cn } from "@/lib/utils";
import SectionGrid from "./SectionGrid";
import CaseImage from "./CaseImage";
import DecisionNote from "./DecisionNote";
import { RichLines } from "./RichText";
import type { FloorFlowContent, FloorScreen } from "./types";

interface ImageFile {
  src: string;
  width: number;
  height: number;
}

// An arrow between two screens: its label (the tap that leads on, real text) and an aria-hidden line
// with a 6px filled head, in the line colour.
// Stacked layout: label, then a 48px arrow pointing down, centred on the 256px phone column.
// Desktop flow (xl): "across" puts the label above a 96px arrow pointing right, centred in its column;
// "down" keeps it vertical, 96px, with the label under the arrow.
const FlowArrow = ({ label, down, className }: { label: string; down?: boolean; className?: string }) => (
  <div
    className={cn(
      "flex w-full max-w-64 flex-col items-center gap-2",
      down ? "xl:flex-col-reverse" : "xl:w-auto xl:max-w-none",
      "xl:justify-self-center",
      className,
    )}
  >
    <p className="whitespace-nowrap text-annotation text-ink-muted">{label}</p>
    <div
      aria-hidden="true"
      className={cn("flex h-12 w-1.5 flex-col items-center text-line", down ? "xl:h-24" : "xl:h-1.5 xl:w-24 xl:flex-row")}
    >
      <div className={cn("w-px flex-1 bg-line", !down && "xl:h-px xl:w-auto")} />
      <svg viewBox="0 0 6 6" className={cn("size-1.5 shrink-0 rotate-90 fill-current", !down && "xl:rotate-0")}>
        <path d="M0 0L6 3L0 6Z" />
      </svg>
    </div>
  </div>
);

interface FloorFlowProps {
  flow: FloorFlowContent;
  images: Record<FloorScreen, ImageFile>;
}

// The floor app flow: five phone screens joined by arrows, with captions, notes and a takeaway.
// The DOM is in the stacked (mobile) order at every width, so screen readers read one sequence:
// screen, notes, the tap that leads on, next screen.
//
// Stacked (below xl): one column, left-aligned. Phones are 256px (w-64), or the content width if
// that's narrower. Phone to its notes 12px, arrows 24px from what's above and below, the alternative
// path's label 48px under phone 3, the takeaway 64px under the last note.
//
// Desktop flow (xl, 1280 up): its own 5-column grid inside the content width,
// [phone 256] [arrow 1fr] [phone 256] [arrow 1fr] [phone 256], so phone 1 starts on col 1 and phone 3
// ends on col 12. It fits from a 1120px viewport (3 x 256 + 2 x 152 for the widest arrow label), so xl
// is the first Tailwind breakpoint where it fits. Rows:
//   1 captions (12px above their phones; phones 2 and 3 are subgrids over rows 1-2, so all phones
//     start on the same line whatever the caption heights)
//   2 phones 1-3; arrows 192px below the phone tops
//   3 phone 2's EDGE notes, 12px under it, across its phone and arrow columns. Phone 1's note sits in
//     phone 1's cell (rows 2-3), 12px under it, also across its phone and arrow columns.
//   4 the vertical arrow in phone 2's column: 48px under the notes, 96px, label 8px under it,
//     24px to phone 4
//   5 the takeaway (cols 1-4 of the page grid), phone 4, an arrow 256px below the phone tops, phone 5
//   Phone 5's note sits in phone 5's cell, 12px under it, phone-wide.
const FloorFlow = ({ flow, images }: FloorFlowProps) => {
  const phone = (screen: FloorScreen) => ({ ...images[screen], alt: flow.alts[screen], imgClassName: "rounded-3xl shadow-phone" });
  // Phones 2 and 3 carry a caption above the image: on xl the figure is a subgrid over rows 1-2.
  const captioned = "xl:row-span-2 xl:row-start-1 xl:grid xl:grid-cols-1 xl:grid-rows-subgrid xl:self-stretch";
  return (
    <SectionGrid data-section="floor-flow">
      {/* 16rem = w-64, the phone width; the arrow columns share the rest. */}
      <div className="col-span-12 flex flex-col items-start xl:grid xl:grid-cols-[16rem_1fr_16rem_1fr_16rem] xl:items-start">
        {/* Phone 1 and its note in one cell, so the note sits 12px under this phone rather than under the
            tallest phone of the row. It spans rows 2-3 so it doesn't push the EDGE row down. */}
        <div className="flex w-full flex-col xl:col-span-2 xl:col-start-1 xl:row-span-2 xl:row-start-2">
          <CaseImage {...phone("unclaimed")} className="w-full max-w-64" />
          <DecisionNote rows={flow.unclaimedDecision} className="mt-3" />
        </div>
        <FlowArrow label={flow.arrows.claim} className="mt-6 xl:col-start-2 xl:row-start-2 xl:mt-0 xl:pt-48" />

        <CaseImage
          {...phone("claimed")}
          caption={flow.captions.claimed}
          captionPosition="top"
          captionClassName="text-ink"
          className={cn("mt-6 w-full max-w-64 xl:col-start-3 xl:mt-0", captioned)}
        />
        <DecisionNote rows={flow.claimedEdges} className="mt-3 xl:col-span-2 xl:col-start-3 xl:row-start-3" />
        <FlowArrow label={flow.arrows.markDone} className="mt-6 xl:col-start-4 xl:row-start-2 xl:mt-0 xl:pt-48" />

        <CaseImage
          {...phone("done")}
          caption={flow.captions.done}
          captionPosition="top"
          captionClassName="text-ink"
          className={cn("mt-6 w-full max-w-64 xl:col-start-5 xl:mt-0", captioned)}
        />

        {/* The alternative path. Its marker is only needed when the flow is one column; the desktop
            layout shows the branch, so there it's for screen readers only. */}
        <p className="mt-12 text-annotation text-ink-muted xl:sr-only">{flow.altPathLabel}</p>
        <FlowArrow label={flow.arrows.notReady} down className="mt-3 xl:col-start-3 xl:row-start-4 xl:mb-6 xl:mt-12" />
        <CaseImage {...phone("notReady")} className="mt-6 w-full max-w-64 xl:col-start-3 xl:row-start-5 xl:mt-0" />
        <FlowArrow label={flow.arrows.reason} className="mt-6 xl:col-start-4 xl:row-start-5 xl:mt-0 xl:pt-64" />
        {/* Phone 5 and its note in one cell, for the same reason as phone 1 (phone 4 is taller). */}
        <div className="mt-6 flex w-full flex-col xl:col-start-5 xl:row-start-5 xl:mt-0">
          <CaseImage {...phone("blocked")} className="w-full max-w-64" />
          <DecisionNote rows={flow.blockedDecision} className="mt-3" />
        </div>

        {/* Takeaway: a <p> in the statement style. On xl it shares row 5 with phone 4, top-aligned, and
            is exactly cols 1-4 of the page grid: its cell spans the whole flow row and holds a 12-column
            grid. That cell overlaps the phones, so it lets clicks through except on the text. text-pretty
            keeps "more:" from ending up alone on a line where cols 1-4 are narrow (1280). */}
        <div className="mt-16 grid w-full grid-cols-12 gap-x-5 xl:pointer-events-none xl:col-span-5 xl:col-start-1 xl:row-start-5 xl:mt-0">
          <p className="col-span-12 text-pretty text-statement font-bold text-ink xl:pointer-events-auto xl:col-span-4">
            <RichLines lines={flow.takeaway} />
          </p>
        </div>
      </div>
    </SectionGrid>
  );
};

export default FloorFlow;
