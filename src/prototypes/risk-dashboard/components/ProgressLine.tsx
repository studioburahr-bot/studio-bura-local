import { connectors, steps, type ChainStep } from "../data";

// One node per step, drawn on the same 4-column grid as the cards below,
// so each node sits exactly above the horizontal centre of its card.
const Node = ({ status }: { status: ChainStep["status"] }) => {
  if (status === "done") {
    return (
      <span data-node className="relative flex h-6 w-6 items-center justify-center rounded-full bg-[var(--rp-done)] shadow-[0_0_0_5px_var(--rp-done-ring)]">
        <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
          <path d="M2.8 6.2l2.1 2.1 4.2-4.6" stroke="#fff" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </span>
    );
  }
  if (status === "atrisk") {
    return (
      <span data-node className="relative flex h-7 w-7 items-center justify-center rounded-full bg-[var(--rp-atrisk)]">
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
          <path d="M7 1.6l5.6 9.9H1.4L7 1.6z" fill="#fff" />
          <path d="M7 5.6v2.6" stroke="var(--rp-atrisk)" strokeWidth="1.4" strokeLinecap="round" />
          <circle cx="7" cy="9.9" r=".8" fill="var(--rp-atrisk)" />
        </svg>
      </span>
    );
  }
  return <span data-node className="relative h-6 w-6 rounded-full border-2 border-[color:var(--rp-sep)] bg-[var(--rp-surface)]" />;
};

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
            {/* Segment to the next node: from this column's centre across the 24px gap to the next centre */}
            {connector && (
              <span
                className={`absolute left-1/2 top-1/2 -mt-px w-[calc(100%+24px)] ${
                  gate
                    ? "border-t-2 border-dashed border-[color:var(--rp-faint)]"
                    : `h-[2px] ${step.status === "done" ? "bg-[var(--rp-done)]" : "bg-[var(--rp-line)]"}`
                }`}
              />
            )}
            <Node status={step.status} />
            {/* The time gate sits on the dashed segment, halfway between the two nodes */}
            {gate && (
              <span data-gate className="absolute left-[calc(100%+12px)] top-1/2 z-[1] flex -translate-x-1/2 -translate-y-1/2 items-center gap-[7px] whitespace-nowrap rounded-[4px] border border-[color:var(--rp-border-strong)] bg-[var(--rp-surface)] px-[11px] py-[5px]">
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                  <circle cx="6" cy="6" r="4.4" stroke="var(--rp-text-3)" strokeWidth="1.2" />
                  <path d="M6 3.8V6l1.6 1" stroke="var(--rp-text-3)" strokeWidth="1.2" strokeLinecap="round" />
                </svg>
                <span className="rp-mono text-[12px] font-medium text-[color:var(--rp-text-2)]">{gate.duration}</span>
                <span className="text-[10px] font-bold uppercase tracking-[.09em] text-[color:var(--rp-text-3)]">
                  {gate.caption}
                </span>
              </span>
            )}
          </div>
        );
      })}
    </div>
  </>
);

export default ProgressLine;
