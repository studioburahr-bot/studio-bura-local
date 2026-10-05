import { STATUS_LABEL, type StepStatus } from "../data";

// Status marker. At risk is a filled orange rectangular chip; Done and Waiting are a small icon and a grey label.
const StatusChip = ({ status }: { status: StepStatus }) => {
  if (status === "atrisk") {
    return (
      <span
        data-status={status}
        className="inline-flex h-[26px] items-center gap-[6px] rounded-[4px] bg-[var(--rp-atrisk)] pl-2 pr-[10px]"
      >
        <svg width="13" height="13" viewBox="0 0 14 14" fill="none" aria-hidden="true">
          <path d="M7 1.4l5.8 10.2H1.2L7 1.4z" fill="#fff" />
          <path d="M7 5.6v2.6" stroke="var(--rp-atrisk)" strokeWidth="1.4" strokeLinecap="round" />
          <circle cx="7" cy="10" r=".85" fill="var(--rp-atrisk)" />
        </svg>
        <span className="text-[12px] font-extrabold text-white">{STATUS_LABEL[status]}</span>
      </span>
    );
  }

  return (
    <span data-status={status} className="inline-flex h-[26px] items-center gap-[7px]">
      {status === "done" ? (
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
          <circle cx="7" cy="7" r="6.5" fill="var(--rp-done)" />
          <path d="M4.2 7.2l1.9 1.9 3.6-4" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      ) : (
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
          <circle cx="7" cy="7" r="5.8" stroke="var(--rp-faint)" strokeWidth="1.5" />
        </svg>
      )}
      <span className="text-[12px] font-semibold text-[color:var(--rp-muted)]">{STATUS_LABEL[status]}</span>
    </span>
  );
};

export default StatusChip;
