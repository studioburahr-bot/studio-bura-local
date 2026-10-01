import { STATUS_LABEL, type StepStatus } from "../data";
import { STATUS_STYLES } from "./statusStyles";

const StatusIcon = ({ status }: { status: StepStatus }) => {
  if (status === "done") {
    return (
      <svg width="13" height="13" viewBox="0 0 14 14" fill="none" aria-hidden="true">
        <circle cx="7" cy="7" r="6" fill="var(--rp-done)" />
        <path d="M4.3 7.2l1.9 1.9 3.5-3.9" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    );
  }
  if (status === "atrisk") {
    return (
      <svg width="13" height="13" viewBox="0 0 14 14" fill="none" aria-hidden="true">
        <path d="M7 1.4l5.8 10.2H1.2L7 1.4z" fill="var(--rp-atrisk)" />
        <path d="M7 5.7v2.5" stroke="#fff" strokeWidth="1.4" strokeLinecap="round" />
        <circle cx="7" cy="10" r=".85" fill="#fff" />
      </svg>
    );
  }
  return (
    <svg width="13" height="13" viewBox="0 0 14 14" fill="none" aria-hidden="true">
      <circle cx="7" cy="7" r="5.3" stroke="var(--rp-muted)" strokeWidth="1.5" strokeDasharray="2.6 2.2" />
    </svg>
  );
};

const StatusPill = ({ status }: { status: StepStatus }) => {
  const s = STATUS_STYLES[status];
  return (
    <span className={`inline-flex items-center gap-[7px] rounded-full py-[5px] pl-[9px] pr-[11px] ${s.bg}`}>
      <StatusIcon status={status} />
      <span className={`text-[12px] font-bold tracking-[.02em] ${s.text}`}>{STATUS_LABEL[status]}</span>
    </span>
  );
};

export default StatusPill;
