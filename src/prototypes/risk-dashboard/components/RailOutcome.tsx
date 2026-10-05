import { useState, type Dispatch, type RefObject } from "react";
import { cn } from "@/lib/utils";
import { nudge as copy, DISMISS_REASONS } from "../data";
import type { Action, NudgeState } from "../state";
import { linkButton, secondaryButton } from "./buttons";

interface Props {
  nudge: Extract<NudgeState, { kind: "sent" } | { kind: "dismissed" }>;
  dispatch: Dispatch<Action>;
  outcomeRef: RefObject<HTMLDivElement>;
}

// Neutral box on purpose: a nudge or a dismiss is not a status change in the chain,
// so Paint's "At risk" chip never changes because of what happens here.
const box =
  "flex flex-wrap items-start justify-between gap-x-4 gap-y-2 rounded-[6px] border border-[color:var(--rp-border)] bg-[var(--rp-subtle)] px-[14px] py-3";
const title = "text-[14px] font-bold text-[color:var(--rp-text)]";
const line = "text-[13px] font-medium text-[color:var(--rp-text-3)]";

const CheckIcon = () => (
  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
    <path d="M2.5 6.3l2.3 2.3 4.7-5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

// What the AI panel shows after Send or Dismiss. Each state has a visible outcome and (where allowed) Undo.
const RailOutcome = ({ nudge, dispatch, outcomeRef }: Props) => {
  const [showMessage, setShowMessage] = useState(false);

  if (nudge.kind === "sent") {
    const edited = nudge.message !== copy.draft;
    return (
      <div ref={outcomeRef} tabIndex={-1} className={box}>
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true" className="mt-[3px] shrink-0">
          <path d="M14 2L7 9M14 2l-4.5 12-2.5-5-5-2.5L14 2z" stroke="var(--rp-blue)" strokeWidth="1.4" strokeLinejoin="round" strokeLinecap="round" />
        </svg>
        <div className="flex min-w-0 flex-1 basis-[180px] flex-col items-start gap-[2px]">
          <span className={title}>{copy.sent.status}</span>
          <span className={`${line} tabular-nums`}>{copy.sent.sentAt(nudge.at)}</span>
          <span className="mt-1 text-[13px] font-semibold text-[color:var(--rp-text-2)]">{copy.sent.stillAtRisk}</span>

          {/* The exact message that went out, collapsed by default */}
          <button
            type="button"
            aria-expanded={showMessage}
            aria-controls="rp-sent-message"
            onClick={() => setShowMessage((v) => !v)}
            className={`${linkButton} -ml-[10px]`}
          >
            {showMessage ? copy.sent.hideMessage : copy.sent.viewMessage}
          </button>
          {showMessage && (
            <div id="rp-sent-message" className="w-full">
              <p className="mb-[6px] text-[12px] font-medium text-[color:var(--rp-muted)]">
                {edited ? copy.sent.edited : copy.sent.unedited}
              </p>
              <p className="whitespace-pre-line rounded-[6px] border border-[color:var(--rp-border)] bg-[var(--rp-surface)] px-[14px] py-3 text-[14px] font-medium leading-relaxed text-[color:var(--rp-text-2)]">
                {nudge.message}
              </p>
            </div>
          )}
        </div>
        {nudge.canUndo && (
          <button type="button" onClick={() => dispatch({ type: "UNDO" })} className={linkButton}>
            {copy.actions.undo}
          </button>
        )}
      </div>
    );
  }

  return (
    <div ref={outcomeRef} tabIndex={-1} className={box}>
      <div className="flex min-w-0 flex-1 basis-[240px] flex-col items-start gap-[2px]">
        <span className={title}>
          {nudge.reason ? `${copy.dismissed.status} · ${nudge.reason}` : copy.dismissed.status}
        </span>
        <span className={line}>{copy.dismissed.stillAtRisk}</span>
        <div role="group" aria-label={copy.dismissed.reasonPrompt} className="mt-[10px] flex flex-col gap-2">
          <span className="text-[12px] font-medium text-[color:var(--rp-muted)]">{copy.dismissed.reasonPrompt}</span>
          <div className="flex flex-wrap gap-2">
            {DISMISS_REASONS.map((reason) => {
              const selected = nudge.reason === reason;
              return (
                <button
                  key={reason}
                  type="button"
                  aria-pressed={selected}
                  onClick={() => dispatch({ type: "SET_REASON", reason })}
                  className={cn(
                    secondaryButton,
                    "gap-[6px] text-[13px]",
                    selected &&
                      "border-[color:var(--rp-blue)] bg-[var(--rp-blue-tint)] text-[color:var(--rp-blue-active)] enabled:hover:border-[color:var(--rp-blue)]",
                  )}
                >
                  {selected && <CheckIcon />}
                  {reason}
                </button>
              );
            })}
          </div>
        </div>
      </div>
      <button type="button" onClick={() => dispatch({ type: "UNDO" })} className={linkButton}>
        {copy.actions.undo}
      </button>
    </div>
  );
};

export default RailOutcome;
