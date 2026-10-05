import { Fragment } from "react";
import { chainCopy, connectors, steps } from "../data";
import ProgressLine from "./ProgressLine";
import { GateChip, ProgressNode } from "./progressParts";
import StepCard from "./StepCard";
import { routeClass } from "./statusStyles";
import { useIsPhone } from "./useIsPhone";

// From 1024px: progress line and cards share one 4-column grid (24px gap), which keeps each node centred over its card.
// Below 1024px: a vertical route — cards stacked, with the line and one node per step running down the left,
// and the "+24h dry time" label on the dashed segment between Paint and Racking.
const DependencyChain = () => {
  const isPhone = useIsPhone();
  return (
    <section
      aria-labelledby="rp-chain-heading"
      className="rounded-[8px] border border-[color:var(--rp-border)] bg-[var(--rp-surface)] px-4 pb-[30px] pt-[26px] sm:px-7"
    >
      <h2 id="rp-chain-heading" className="rp-label mb-[22px]">
        {chainCopy.heading}
      </h2>

      <ProgressLine />

      <div className="grid items-stretch lg:grid-cols-4 lg:gap-6">
        {steps.map((step, i) => {
          const before = connectors[i - 1]; // segment coming into this step
          const after = connectors[i]; // segment leaving it
          const gate = after?.kind === "gate" ? after : null;
          // 480px and below: only the At risk step stays a full card; the others become compact rows
          const compact = isPhone && step.status !== "atrisk";
          return (
            <Fragment key={step.id}>
              <div className="relative max-lg:pl-10">
                {/* Route (below 1024px only): line in, node, line out. The line runs at x = 14px. */}
                <span aria-hidden="true" data-route className="lg:hidden">
                  {before && (
                    <span className={`absolute left-[13px] top-0 ${compact ? "h-[10px]" : "h-5"} ${routeClass(steps[i - 1].status, before.kind === "gate")}`} />
                  )}
                  <span className={`absolute left-0 flex w-7 justify-center ${compact ? "top-[10px]" : "top-5"}`}>
                    <ProgressNode status={step.status} />
                  </span>
                  {after && (
                    <span className={`absolute bottom-0 left-[13px] ${compact ? "top-[34px]" : "top-12"} ${routeClass(step.status, !!gate)}`} />
                  )}
                </span>
                <StepCard step={step} compact={compact} />
              </div>

              {/* Gap between two cards (below 1024px only), carrying the line and, for a time gate, its label */}
              {after && (
                <div aria-hidden="true" className={`relative lg:hidden ${gate ? "h-14" : "h-4"}`}>
                  <span className={`absolute inset-y-0 left-[13px] ${routeClass(step.status, !!gate)}`} />
                  {gate && (
                    <GateChip
                      duration={gate.duration}
                      caption={gate.caption}
                      className="absolute left-0 top-1/2 -translate-y-1/2"
                    />
                  )}
                </div>
              )}
            </Fragment>
          );
        })}
      </div>
    </section>
  );
};

export default DependencyChain;
