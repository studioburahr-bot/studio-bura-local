import { connectors, steps } from "../data";
import { GateChip, ProgressNode } from "./progressParts";
import { GATE_POSITION, segmentClass } from "./statusStyles";

// One node per step, drawn on the same 4-column grid as the cards below,
// so each node sits exactly above the horizontal centre of its card.
const ProgressLine = () => (
  <>
    {/* The line is a picture of what the cards already say; screen readers only need the gate */}
    {connectors.map(
      (c, i) =>
        c.kind === "gate" && (
          <p key={i} className="sr-only">
            {steps[i].name} {c.srText} {steps[i + 1].name}: {c.duration} {c.caption}.
          </p>
        ),
    )}
    <div aria-hidden="true" data-progress className="mb-[18px] hidden grid-cols-4 gap-6 lg:grid">
      {steps.map((step, i) => {
        const connector = connectors[i];
        const gate = connector?.kind === "gate" ? connector : null;
        return (
          <div key={step.id} className="relative flex h-11 items-center justify-center">
            {connector && <span className={segmentClass(step.status, !!gate)} />}
            <ProgressNode status={step.status} />
            {gate && <GateChip duration={gate.duration} caption={gate.caption} className={GATE_POSITION} />}
          </div>
        );
      })}
    </div>
  </>
);

export default ProgressLine;
