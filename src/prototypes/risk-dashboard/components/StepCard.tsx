import type { ChainStep, SourceKind } from "../data";
import StatusChip from "./StatusChip";
import { CARD_STYLES } from "./statusStyles";

const SourceIcon = ({ kind }: { kind: SourceKind }) => {
  const common = { fill: "none", "aria-hidden": true, className: "shrink-0" } as const;
  if (kind === "system") {
    return (
      <svg width="12" height="12" viewBox="0 0 12 12" {...common}>
        <rect x="1.2" y="2" width="9.6" height="7" rx="1.2" stroke="currentColor" strokeWidth="1.2" />
        <path d="M4 10.4h4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
      </svg>
    );
  }
  if (kind === "onsite") {
    return (
      <svg width="12" height="12" viewBox="0 0 12 12" {...common}>
        <path d="M6 10.8s3.6-3.2 3.6-5.8a3.6 3.6 0 00-7.2 0c0 2.6 3.6 5.8 3.6 5.8z" stroke="currentColor" strokeWidth="1.2" />
        <circle cx="6" cy="5" r="1.3" stroke="currentColor" strokeWidth="1.2" />
      </svg>
    );
  }
  if (kind === "field") {
    return (
      <svg width="12" height="12" viewBox="0 0 12 12" {...common}>
        <rect x="3" y="1.2" width="6" height="9.6" rx="1.2" stroke="currentColor" strokeWidth="1.2" />
      </svg>
    );
  }
  return (
    <svg width="13" height="12" viewBox="0 0 13 12" {...common}>
      <path d="M1 3h7v5H1zM8 5h2.4L12 6.8V8H8" stroke="currentColor" strokeWidth="1.1" strokeLinejoin="round" />
      <circle cx="3.2" cy="9" r="1.1" stroke="currentColor" strokeWidth="1.1" />
      <circle cx="9.8" cy="9" r="1.1" stroke="currentColor" strokeWidth="1.1" />
    </svg>
  );
};

const NoteBox = ({ step }: { step: ChainStep }) => {
  const box = `rounded-[4px] text-pretty ${CARD_STYLES[step.status].note}`;
  const note = step.note;

  if (note.kind === "system") {
    return (
      <div className={`flex items-center gap-[7px] ${box}`}>
        <span className="text-[color:var(--rp-faint)]">
          <SourceIcon kind="system" />
        </span>
        <span className="rp-mono">{note.system}</span>
      </div>
    );
  }

  if (note.kind === "reschedule") {
    // Late but confirmed: always neutral grey, never the at-risk colour
    return (
      <div className={`flex flex-col gap-[3px] ${box}`}>
        <span>{note.label}</span>
        <span className="flex items-center gap-[6px] tabular-nums text-[color:var(--rp-text-3)]">
          <s className="text-[color:var(--rp-muted)]">{note.was}</s>
          <span
            aria-hidden="true"
            className="flex h-[18px] w-[18px] items-center justify-center rounded-[4px] border border-[color:var(--rp-border)] bg-[var(--rp-waiting-bg)]"
          >
            <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
              <path d="M1.5 5h6.5M5.8 2.6L8.2 5 5.8 7.4" stroke="var(--rp-muted)" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </span>
          <span className="sr-only">moved to</span>
          <span className="font-semibold">{note.now}</span>
        </span>
        <span className="text-[12px]">{note.confirmation}</span>
      </div>
    );
  }

  return <div className={box}>{note.text}</div>;
};

const StepCard = ({ step }: { step: ChainStep }) => {
  const s = CARD_STYLES[step.status];

  return (
    <article aria-label={step.name} className={`flex h-full flex-col gap-4 rounded-[6px] border p-5 ${s.card}`}>
      <div className="flex">
        <StatusChip status={step.status} />
      </div>

      <div>
        <h3 className={s.title}>{step.name}</h3>
        <p className={`mt-1 text-[13px] ${s.detail}`}>{step.detail}</p>
      </div>

      <NoteBox step={step} />

      <div className={`mt-auto flex flex-col gap-1 border-t pt-[14px] ${s.divider}`}>
        <span className={s.when}>
          {step.when.label} <span className={`text-[12px] tabular-nums ${s.date}`}>{step.when.date}</span>
        </span>
        {/* Who owns the step, and where its status comes from */}
        <span className={`text-[12px] ${s.meta}`}>{step.owner}</span>
        <span className={`flex items-center gap-[5px] text-[12px] ${s.meta}`}>
          <SourceIcon kind={step.source.kind} />
          <span className="sr-only">Source: </span>
          {step.source.label}
        </span>
      </div>
    </article>
  );
};

export default StepCard;
