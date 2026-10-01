import type { ReactNode } from "react";
import { Lock } from "lucide-react";
import { build, steps, STATUS_LABEL } from "../data";
import { STATUS_STYLES } from "./statusStyles";

const Eyebrow = ({ children }: { children: ReactNode }) => (
  <div className="mb-[5px] text-[11px] font-bold uppercase tracking-[.09em] text-[color:var(--rp-muted)]">
    {children}
  </div>
);

const Divider = () => <div aria-hidden="true" className="hidden w-px self-stretch bg-[var(--rp-border)] sm:block" />;

// Readiness summary, e.g. "Assembly done · Paint at risk · …", built from the chain data
const readinessSummary = steps.map((s) => `${s.name} ${STATUS_LABEL[s.status].toLowerCase()}`).join(" · ");

const BuildHeader = () => (
  <header className="flex flex-wrap items-center justify-between gap-x-9 gap-y-6 rounded-2xl border border-[color:var(--rp-border)] bg-[var(--rp-surface)] px-4 py-6 sm:px-7">
    <div className="min-w-0">
      <div className="mb-2 flex flex-wrap items-center gap-x-[10px] gap-y-1">
        <span className="text-[11px] font-bold uppercase tracking-[.09em] text-[color:var(--rp-muted)]">
          {build.org}
        </span>
        <span aria-hidden="true" className="hidden h-3 w-px bg-[var(--rp-border)] sm:block" />
        <span className="whitespace-nowrap text-[11px] font-medium text-[color:var(--rp-muted)]">
          {build.implementationLabel} <span className="rp-mono">{build.implementationId}</span>
        </span>
      </div>
      <h1 className="text-[24px] font-bold leading-[1.12] tracking-[-.025em] text-[color:var(--rp-text)] sm:text-[28px]">
        {build.title}
      </h1>
    </div>

    <div className="flex flex-wrap items-center gap-x-8 gap-y-5">
      <div>
        <Eyebrow>{build.today.label}</Eyebrow>
        <div className="whitespace-nowrap text-[19px] font-bold tabular-nums tracking-[-.02em] text-[color:var(--rp-text)]">
          {build.today.value}
        </div>
      </div>

      <div>
        <Eyebrow>{build.launch.label}</Eyebrow>
        <div className="whitespace-nowrap text-[19px] font-bold tabular-nums tracking-[-.02em] text-[color:var(--rp-text)]">
          {build.launch.value}
        </div>
        <div className="mt-[3px] inline-flex items-center gap-1 text-[11px] font-medium text-[color:var(--rp-muted)]">
          <Lock size={11} strokeWidth={2} aria-hidden="true" />
          {build.launch.note}
        </div>
      </div>

      <Divider />

      <div>
        <div className="text-[22px] font-extrabold tracking-[-.028em] text-[color:var(--rp-text)]">
          {build.readiness}
        </div>
        <div className="mt-[7px] flex flex-wrap items-center gap-2">
          <div aria-hidden="true" className="flex gap-[3px]">
            {steps.map((s) => (
              <span key={s.id} className={`h-1 w-[22px] rounded-sm ${STATUS_STYLES[s.status].bar}`} />
            ))}
          </div>
          <span className="text-[12px] font-medium text-[color:var(--rp-muted)]">{readinessSummary}</span>
        </div>
      </div>
    </div>
  </header>
);

export default BuildHeader;
