import type { Connector } from "../data";

// Arrow head; rotated to point down when the chain is vertical (below 1024px)
const ArrowHead = () => (
  <svg width="9" height="10" viewBox="0 0 9 10" fill="none" aria-hidden="true" className="shrink-0 rotate-90 lg:rotate-0">
    <path d="M1 1l6 4-6 4z" fill="var(--rp-line)" />
  </svg>
);

const Line = ({ dashed }: { dashed?: boolean }) => (
  <div className="flex flex-col items-center lg:w-full lg:flex-row">
    <span className={`rp-line ${dashed ? "rp-line--dashed" : ""} h-6 w-[1.5px] lg:h-[1.5px] lg:w-auto lg:flex-1`} />
    <ArrowHead />
  </div>
);

const GateChip = ({ duration }: { duration: string }) => (
  <span className="inline-flex items-center gap-[5px] rounded-full bg-[var(--rp-waiting-bg)] px-[10px] py-1">
    <svg width="11" height="11" viewBox="0 0 12 12" fill="none" aria-hidden="true">
      <circle cx="6" cy="6" r="4.4" stroke="var(--rp-muted)" strokeWidth="1.2" />
      <path d="M6 3.8V6l1.6 1" stroke="var(--rp-muted)" strokeWidth="1.2" strokeLinecap="round" />
    </svg>
    <span className="rp-mono text-[12px] font-medium text-[color:var(--rp-text-2)]">{duration}</span>
  </span>
);

const GateCaption = ({ caption }: { caption: string }) => (
  <span className="text-[10px] font-bold uppercase tracking-[.09em] text-[color:var(--rp-muted)]">{caption}</span>
);

const ChainConnector = ({ connector }: { connector: Connector }) => {
  if (connector.kind === "plain") {
    return (
      <div aria-hidden="true" className="flex items-center justify-center py-1 lg:px-[10px] lg:py-0">
        <Line />
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center lg:px-[10px]">
      {/* Read once by screen readers; the visuals below are decorative */}
      <span className="sr-only">{connector.srText}</span>

      {/* Desktop: chip above the dashed line, caption below */}
      <div aria-hidden="true" className="hidden w-full flex-col items-center gap-2 lg:flex">
        <GateChip duration={connector.duration} />
        <Line dashed />
        <GateCaption caption={connector.caption} />
      </div>

      {/* Mobile: dashed line down the middle, chip and caption beside it */}
      <div aria-hidden="true" className="grid w-full grid-cols-[1fr_auto_1fr] items-center gap-3 py-1 lg:hidden">
        <span />
        <Line dashed />
        <div className="flex items-center gap-2">
          <GateChip duration={connector.duration} />
          <GateCaption caption={connector.caption} />
        </div>
      </div>
    </div>
  );
};

export default ChainConnector;
