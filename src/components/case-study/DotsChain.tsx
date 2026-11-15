import type { CSSProperties } from "react";
import SectionGrid from "./SectionGrid";

interface DotsChainProps {
  // Number of slots in the row, including the empty one under the raised dot.
  count: number;
  // 1-based slot whose dot is raised above the row (the slot itself stays empty).
  raisedSlot: number;
  // Screen reader sentence; the row itself is decorative.
  description: string;
  // How far the raised dot sits above its slot, in dot diameters: 1 = resting just above the row,
  // 0 = back in its slot. Exposed as --dot-raise so it can be animated later.
  raise?: number;
}

// A row of dots with one raised above the rest. Spans cols 2-11 from md, full width below.
// One rule at every width: dot size = gap = row width / (2 x count - 1), so for 12 slots, 1/23.
// The dots are flex-1 squares and the gap is that share of the row (--dot-share), so 12 dots plus
// 11 gaps fill the row exactly. The top padding is the same share (percent padding follows the width),
// which leaves exactly one diameter of room for the raised dot.
const DotsChain = ({ count, raisedSlot, description, raise = 1 }: DotsChainProps) => (
  <SectionGrid data-section="dots">
    <div className="col-span-12 md:col-span-10 md:col-start-2">
      <div
        aria-hidden="true"
        className="flex items-start gap-x-[--dot-share] pt-[--dot-share]"
        style={{ "--dot-share": `${100 / (2 * count - 1)}%`, "--dot-raise": raise } as CSSProperties}
      >
        {Array.from({ length: count }, (_, i) =>
          i + 1 === raisedSlot ? (
            // Empty slot; the raised dot is drawn from it, moved up by --dot-raise diameters
            <div key={i} className="relative aspect-square flex-1">
              <div className="absolute inset-0 translate-y-[calc(var(--dot-raise)*-100%)] rounded-full bg-project-accent-strong" />
            </div>
          ) : (
            <div key={i} className="aspect-square flex-1 rounded-full bg-project-accent" />
          ),
        )}
      </div>
      <p className="sr-only">{description}</p>
    </div>
  </SectionGrid>
);

export default DotsChain;
