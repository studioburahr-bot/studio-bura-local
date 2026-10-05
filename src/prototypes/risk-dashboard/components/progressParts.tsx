import type { StepStatus } from "../data";

// Pieces shared by the dashboard's progress line and the chain on the Details view.

export const ProgressNode = ({ status }: { status: StepStatus }) => {
  if (status === "done") {
    return (
      <span
        data-node
        className="relative flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[var(--rp-done)] shadow-[0_0_0_5px_var(--rp-done-ring)]"
      >
        <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
          <path d="M2.8 6.2l2.1 2.1 4.2-4.6" stroke="#fff" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </span>
    );
  }
  if (status === "atrisk") {
    return (
      <span data-node className="relative flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[var(--rp-atrisk)]">
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
          <path d="M7 1.6l5.6 9.9H1.4L7 1.6z" fill="#fff" />
          <path d="M7 5.6v2.6" stroke="var(--rp-atrisk)" strokeWidth="1.4" strokeLinecap="round" />
          <circle cx="7" cy="9.9" r=".8" fill="var(--rp-atrisk)" />
        </svg>
      </span>
    );
  }
  return (
    <span
      data-node
      className="relative h-6 w-6 shrink-0 rounded-full border-2 border-[color:var(--rp-sep)] bg-[var(--rp-surface)]"
    />
  );
};

// End of the chain: the locked launch date
export const LaunchNode = () => (
  <span
    data-node
    className="relative flex h-7 w-7 shrink-0 items-center justify-center rounded-[6px] border-2 border-[color:var(--rp-text-3)] bg-[var(--rp-surface)]"
  >
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
      <rect x="2" y="5.2" width="8" height="5.6" rx="1" stroke="var(--rp-text-2)" strokeWidth="1.3" />
      <path d="M3.8 5.2V3.8a2.2 2.2 0 014.4 0v1.4" stroke="var(--rp-text-2)" strokeWidth="1.3" />
    </svg>
  </span>
);

// The time gate between two steps ("+24h DRY TIME"). The caller positions it on the dashed segment.
export const GateChip = ({ duration, caption, className = "" }: { duration: string; caption: string; className?: string }) => (
  <span
    data-gate
    className={`flex items-center gap-[7px] whitespace-nowrap rounded-[4px] border border-[color:var(--rp-border-strong)] bg-[var(--rp-surface)] px-[11px] py-[5px] ${className}`}
  >
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
      <circle cx="6" cy="6" r="4.4" stroke="var(--rp-text-3)" strokeWidth="1.2" />
      <path d="M6 3.8V6l1.6 1" stroke="var(--rp-text-3)" strokeWidth="1.2" strokeLinecap="round" />
    </svg>
    <span className="rp-mono text-[12px] font-medium text-[color:var(--rp-text-2)]">{duration}</span>
    <span className="text-[10px] font-bold uppercase tracking-[.09em] text-[color:var(--rp-text-3)]">{caption}</span>
  </span>
);
