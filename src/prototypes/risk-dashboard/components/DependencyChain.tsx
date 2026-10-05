import { chainCopy, steps } from "../data";
import ProgressLine from "./ProgressLine";
import StepCard from "./StepCard";

// Progress line and cards share one 4-column grid (24px gap), which is what keeps each node centred over its card.
const DependencyChain = () => (
  <section
    aria-labelledby="rp-chain-heading"
    className="rounded-[8px] border border-[color:var(--rp-border)] bg-[var(--rp-surface)] px-4 pb-[30px] pt-[26px] sm:px-7"
  >
    <h2 id="rp-chain-heading" className="rp-label mb-[22px]">
      {chainCopy.heading}
    </h2>

    <ProgressLine />

    <div className="grid items-stretch gap-6 lg:grid-cols-4">
      {steps.map((step) => (
        <StepCard key={step.id} step={step} />
      ))}
    </div>
  </section>
);

export default DependencyChain;
