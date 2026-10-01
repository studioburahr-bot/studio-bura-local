import { MapPin, Smartphone, Truck } from "lucide-react";
import type { ChainStep, SourceKind } from "../data";
import StatusPill from "./StatusPill";
import { STATUS_STYLES } from "./statusStyles";

const MonitorIcon = () => (
  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true" className="shrink-0">
    <rect x="1.2" y="2" width="9.6" height="7" rx="1.2" stroke="currentColor" strokeWidth="1.2" />
    <path d="M4 10.4h4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
  </svg>
);

const SourceIcon = ({ kind }: { kind: SourceKind }) => {
  if (kind === "system") return <MonitorIcon />;
  if (kind === "field") return <Smartphone size={12} strokeWidth={1.8} aria-hidden="true" className="shrink-0" />;
  if (kind === "onsite") return <MapPin size={12} strokeWidth={1.8} aria-hidden="true" className="shrink-0" />;
  return <Truck size={12} strokeWidth={1.8} aria-hidden="true" className="shrink-0" />;
};

const StepNoteBox = ({ step }: { step: ChainStep }) => {
  const s = STATUS_STYLES[step.status];
  const box = `rounded-lg px-[11px] py-[9px] text-[13px] font-semibold text-pretty ${s.bg} ${s.text}`;
  const note = step.note;

  if (note.kind === "system") {
    return (
      <div className={`flex items-center gap-[7px] ${box}`}>
        <MonitorIcon />
        <span className="rp-mono font-medium">{note.system}</span>
      </div>
    );
  }

  if (note.kind === "reschedule") {
    // Late but confirmed: always neutral, never the at-risk colour
    return (
      <div className={box}>
        {/* Label and dates wrap as whole units, never mid-date */}
        <div className="flex flex-wrap gap-x-[5px] tabular-nums">
          <span>{note.label}</span>
          <span className="whitespace-nowrap">
            <s className="font-medium text-[color:var(--rp-muted)]">{note.was}</s>
            <span aria-hidden="true"> → </span>
            <span className="sr-only">, moved to </span>
            {note.now}
          </span>
        </div>
        <div className="mt-1 text-[11px] font-medium text-[color:var(--rp-muted)]">{note.confirmation}</div>
      </div>
    );
  }

  return <div className={box}>{note.text}</div>;
};

const StepCard = ({ step }: { step: ChainStep }) => {
  const isAtRisk = step.status === "atrisk";
  const isWaiting = step.status === "waiting";

  return (
    <article
      aria-label={step.name}
      className={`flex h-full flex-col gap-4 rounded-[14px] border bg-[var(--rp-surface)] px-5 py-[18px] ${
        isAtRisk ? "border-[color:var(--rp-atrisk-border)]" : "border-[color:var(--rp-border)]"
      }`}
    >
      <div>
        <StatusPill status={step.status} />
      </div>

      <div>
        <h3
          className={`text-[20px] font-bold tracking-[-.022em] ${
            isWaiting ? "text-[color:var(--rp-text-2)]" : "text-[color:var(--rp-text)]"
          }`}
        >
          {step.name}
        </h3>
        <p
          className={`mt-1 text-[13px] text-[color:var(--rp-muted)] ${isWaiting ? "font-normal" : "font-medium"}`}
        >
          {step.detail}
        </p>
      </div>

      <StepNoteBox step={step} />

      <div className="mt-auto flex flex-col gap-[3px] border-t border-[color:var(--rp-divider)] pt-[14px]">
        <span
          className={`text-[14px] font-bold ${isAtRisk ? "text-[color:var(--rp-text)]" : "text-[color:var(--rp-text-2)]"}`}
        >
          {step.when.label}{" "}
          <span className="text-[12px] font-medium tabular-nums text-[color:var(--rp-muted)]">{step.when.date}</span>
        </span>
        {/* Who owns the step, and where its status comes from */}
        <span className="text-[11px] font-medium text-[color:var(--rp-muted)]">{step.owner}</span>
        <span className="text-[11px] font-medium text-[color:var(--rp-muted)]">
          <span className="inline-flex items-center gap-[4px]">
            <SourceIcon kind={step.source.kind} />
            <span className="sr-only">Source: </span>
            {step.source.label}
          </span>
        </span>
      </div>
    </article>
  );
};

export default StepCard;
