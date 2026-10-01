import { Fragment } from "react";
import { chainCopy, connectors, steps } from "../data";
import StepCard from "./StepCard";
import ChainConnector from "./ChainConnector";

// Desktop (lg, 1024px+): one row, cards and connectors in alternating grid columns.
// Below that: one column, cards stacked with connectors pointing down.
const DESKTOP_COLUMNS =
  "lg:grid-cols-[minmax(0,1fr)_56px_minmax(0,1fr)_108px_minmax(0,1fr)_56px_minmax(0,1fr)]";

const DependencyChain = () => (
  <section
    aria-labelledby="rp-chain-heading"
    className="rounded-2xl border border-[color:var(--rp-border)] bg-[var(--rp-surface)] px-4 pb-[30px] pt-[26px] sm:px-7"
  >
    <h2
      id="rp-chain-heading"
      className="mb-[22px] text-[11px] font-bold uppercase tracking-[.11em] text-[color:var(--rp-muted)]"
    >
      {chainCopy.heading}
    </h2>

    <div className={`flex flex-col lg:grid lg:items-stretch ${DESKTOP_COLUMNS}`}>
      {steps.map((step, i) => (
        <Fragment key={step.id}>
          <StepCard step={step} />
          {connectors[i] && <ChainConnector connector={connectors[i]} />}
        </Fragment>
      ))}
    </div>
  </section>
);

export default DependencyChain;
