import type { CSSProperties, ReactNode } from "react";
import { cn } from "@/lib/utils";
import SectionGrid from "./SectionGrid";
import SectionLabel from "./SectionLabel";
import DecisionNote from "./DecisionNote";
import { RichLines } from "./RichText";
import type { ChainDiagramContent, StepCard as StepCardContent } from "./types";

// The risk triage dependency chain, coded. Figma's diagram is an 8pt layout scaled by 1.352; every
// value here is that layout rounded to the spacing scale, with the card text at the diagram text style.
//
// Row (fixed widths, left-aligned, 1072px): step 160 | connector 56 | step | connector | step |
// gate 128 | lifted step over its slot 160 | 64 | add slot 128. Cards are 80 tall.
// It fits from a 1120px viewport up (1072 + the 24px gutters). Where it doesn't, the row and its notes scroll sideways inside their own
// container (scroll-snap on the cards); the cards keep their size, so the next one shows partly at the
// edge. The container bleeds into the page gutters so cards scroll to the screen edge.
// Notes hang off the element they describe, with 1px leader lines (line colour, aria-hidden):
// above the first connector, below the second step, below the gate (a DecisionNote).

// A step: title (bold, surface) over owner (surface-muted), 4px apart, 8px padding; optional mono tag
// 12px below the owner. Text wraps inside the card: in a 160px card "Carpentry / Graphics team" takes
// two lines, which still fit the 80px height (8 + 16 + 4 + 32 + 8 = 68).
const StepCard = ({ step, className, style }: { step: StepCardContent; className?: string; style?: CSSProperties }) => (
  <div
    className={cn("flex flex-col gap-1 rounded bg-project-accent p-2 text-diagram", className)}
    style={style}
  >
    <p className="font-bold text-surface">{step.title}</p>
    <p className="text-surface-muted">{step.owner}</p>
    {step.tag && (
      <p className="mt-2 self-start rounded border border-surface-muted px-1.5 py-1 font-mono text-diagram-mono text-surface-muted">
        {step.tag}
      </p>
    )}
  </div>
);

// Solid connector between two steps: 56px gap, 40px line at the cards' centre line.
const Connector = ({ children }: { children?: ReactNode }) => (
  <div aria-hidden="true" className="relative h-20 w-14 shrink-0">
    <div className="absolute inset-x-2 top-1/2 h-px bg-ink-muted" />
    {children}
  </div>
);

// Vertical leader line under an element: starts 16px below it, 96px long, centred.
const LeaderDown = () => <div aria-hidden="true" className="mt-4 h-24 w-px self-center bg-line" />;

interface ChainDiagramProps {
  chain: ChainDiagramContent;
  // Where the lifted step sits relative to its slot. Exposed as CSS variables (--lift-x, --lift-y,
  // --tilt) on the slot so the lift can be animated later; 0 / 0 / 0deg puts it back in the slot.
  lift?: { x: string; y: string; tilt: string };
}

const ChainDiagram = ({ chain, lift = { x: "24px", y: "-48px", tilt: "-1.7deg" } }: ChainDiagramProps) => {
  const [first, second, ...rest] = chain.steps;
  return (
    <SectionGrid data-section="chain">
      <div className="col-span-12">
        {/* Scrolls sideways only when the row doesn't fit. Focusable so keyboard users can scroll it. */}
        <div
          role="region"
          aria-label={chain.label}
          tabIndex={0}
          className="-mx-4 snap-x snap-mandatory scroll-px-4 overflow-x-auto px-4 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink sm:-mx-6 sm:scroll-px-6 sm:px-6"
        >
          <div className="w-max">
            {/* 64px from this note to the row (mt-16); its leader spans that gap */}
            <p className="pl-6 text-annotation text-ink-muted">
              <RichLines lines={chain.dependencyNote} />
            </p>
            <div className="mt-16 flex items-start">
              <StepCard step={first} className="h-20 w-40 shrink-0 snap-start" />
              <Connector>
                {/* Leader from the note above: the full 64px gap, from its text to the top of the row */}
                <div className="absolute -top-16 left-1/2 h-16 w-px bg-line" />
              </Connector>
              <div className="flex w-40 shrink-0 snap-start flex-col">
                <StepCard step={second} className="h-20" />
                <LeaderDown />
                {/* Starts under the connector's centre, 28px left of the card */}
                <p className="-ml-7 mt-3 w-max text-annotation text-ink-muted">
                  <RichLines lines={chain.ownerNote} />
                </p>
              </div>
              {rest.map((step) => (
                <div key={step.title} className="flex shrink-0 items-start">
                  <Connector />
                  <StepCard step={step} className="h-20 w-40 shrink-0 snap-start" />
                </div>
              ))}
              {/* Time gate: dashed line across a 128px gap, the pill 20px under the centre line,
                  the decision below. The DecisionNote's text column (92px in) starts 4px left of the leader. */}
              <div className="flex w-32 shrink-0 flex-col">
                <div className="relative h-20">
                  <div aria-hidden="true" className="absolute inset-x-1 top-1/2 border-t border-dashed border-ink-muted" />
                  <p className="absolute left-1/2 top-1/2 mt-5 -translate-x-1/2 whitespace-nowrap rounded border border-project-accent bg-surface px-5 py-2 font-mono text-diagram-mono text-ink-muted">
                    {chain.gate}
                  </p>
                </div>
                <LeaderDown />
                <DecisionNote rows={chain.gateDecision} className="relative left-1/2 -ml-24 mt-3 w-max" />
              </div>
              {/* The lifted step over its empty slot */}
              <div
                className="relative h-20 w-40 shrink-0 snap-start"
                style={{ "--lift-x": lift.x, "--lift-y": lift.y, "--tilt": lift.tilt } as CSSProperties}
              >
                <div aria-hidden="true" className="absolute inset-0 rounded bg-surface-muted" />
                <StepCard
                  step={chain.liftedStep}
                  className="absolute inset-0 translate-x-[--lift-x] translate-y-[--lift-y] rotate-[--tilt] shadow-md"
                />
              </div>
              <p className="ml-16 h-20 w-32 shrink-0 snap-start rounded border border-dashed border-project-accent px-4 py-2 text-diagram text-ink-muted">
                {chain.addStep}
              </p>
            </div>
          </div>
        </div>

        {/* Unplaced steps, 36px under the notes (248px under the row in Figma). From lg the note sits to
            the right, joined by a 48px leader; below lg it stacks under the box, 12px down, no leader.
            Below md the two cards wrap inside the box. */}
        <div className="mt-9 flex flex-col items-start gap-3 lg:flex-row lg:items-center lg:gap-0">
          <div className="flex max-w-full flex-col gap-4 rounded bg-surface-muted px-3 pb-7 pt-4">
            <SectionLabel>{chain.unplaced.label}</SectionLabel>
            <div className="flex flex-wrap gap-7">
              {chain.unplaced.steps.map((step) => (
                <StepCard key={step.title} step={step} className="h-24 w-52" />
              ))}
            </div>
          </div>
          <div aria-hidden="true" className="ml-4 mr-3 hidden h-px w-12 shrink-0 bg-line lg:block" />
          <p className="text-annotation text-ink-muted">
            <RichLines lines={chain.unplaced.note} />
          </p>
        </div>
      </div>
    </SectionGrid>
  );
};

export default ChainDiagram;
