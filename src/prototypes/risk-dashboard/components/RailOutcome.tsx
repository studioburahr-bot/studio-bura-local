import { useState, type Dispatch, type ReactNode, type RefObject } from "react";
import { Check, Send } from "lucide-react";
import { DISMISS_REASONS, nudge as copy } from "../data";
import type { Action, NudgeState } from "../state";
import { secondaryButton, textButton } from "./buttons";

interface Props {
  nudge: Extract<NudgeState, { kind: "sent" } | { kind: "dismissed" }>;
  dispatch: Dispatch<Action>;
  outcomeRef: RefObject<HTMLDivElement>;
}

const box =
  "flex flex-wrap items-center justify-between gap-x-6 gap-y-3 rounded-xl border border-[color:var(--rp-border)] bg-[var(--rp-bg)] p-4 sm:px-5";

// Neutral chip on purpose: a nudge or a dismiss is not a status change in the chain
const Chip = ({ children }: { children: ReactNode }) => (
  <span className="inline-flex items-center gap-[7px] rounded-full bg-[var(--rp-waiting-bg)] py-[5px] pl-[10px] pr-[12px] text-[12px] font-bold tracking-[.02em] text-[color:var(--rp-text-2)]">
    {children}
  </span>
);

// What the rail shows after Send or Dismiss. Each state has a visible outcome and (where allowed) Undo.
const RailOutcome = ({ nudge, dispatch, outcomeRef }: Props) => {
  const [showMessage, setShowMessage] = useState(false);

  if (nudge.kind === "sent") {
    const edited = nudge.message !== copy.draft;
    return (
      <div ref={outcomeRef} tabIndex={-1} className={box}>
        <div className="flex min-w-0 flex-1 basis-[260px] flex-col items-start gap-2">
          <Chip>
            <Send size={12} strokeWidth={2} aria-hidden="true" />
            {copy.sent.status}
          </Chip>
          <p className="text-[13px] font-medium text-[color:var(--rp-muted)]">
            <span className="tabular-nums">{copy.sent.sentAt(nudge.at)}</span>
          </p>
          <p className="text-[13px] font-semibold text-[color:var(--rp-text-2)]">{copy.sent.stillAtRisk}</p>

          {/* The exact message that went out, collapsed by default */}
          <button
            type="button"
            aria-expanded={showMessage}
            aria-controls="rp-sent-message"
            onClick={() => setShowMessage((v) => !v)}
            className={`${textButton} -ml-2 text-[color:var(--rp-text-2)] underline underline-offset-2 hover:text-[color:var(--rp-text)]`}
          >
            {showMessage ? copy.sent.hideMessage : copy.sent.viewMessage}
          </button>
          {showMessage && (
            <div id="rp-sent-message" className="w-full">
              <p className="mb-2 text-[12px] font-medium text-[color:var(--rp-muted)]">
                {edited ? copy.sent.edited : copy.sent.unedited}
              </p>
              <p className="whitespace-pre-line rounded-[10px] border border-[color:var(--rp-border)] bg-[var(--rp-surface)] px-4 py-3 text-[14px] font-medium leading-relaxed text-[color:var(--rp-text-2)]">
                {nudge.message}
              </p>
            </div>
          )}
        </div>
        {nudge.canUndo && (
          <button type="button" onClick={() => dispatch({ type: "UNDO" })} className={secondaryButton}>
            {copy.actions.undo}
          </button>
        )}
      </div>
    );
  }

  return (
    <div ref={outcomeRef} tabIndex={-1} className={box}>
      <div className="flex min-w-0 flex-1 basis-[260px] flex-col items-start gap-3">
        <Chip>{nudge.reason ? `${copy.dismissed.status} · ${nudge.reason}` : copy.dismissed.status}</Chip>
        <p className="text-[13px] font-semibold text-[color:var(--rp-text-2)]">{copy.dismissed.stillAtRisk}</p>
        <div role="group" aria-label={copy.dismissed.reasonPrompt} className="flex flex-col gap-2">
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
                  className={`${secondaryButton} gap-[6px] px-4 ${
                    selected ? "border-[color:var(--rp-text)] bg-[var(--rp-waiting-bg)]" : ""
                  }`}
                >
                  {selected && <Check size={13} strokeWidth={2.5} aria-hidden="true" />}
                  {reason}
                </button>
              );
            })}
          </div>
        </div>
      </div>
      <button type="button" onClick={() => dispatch({ type: "UNDO" })} className={secondaryButton}>
        {copy.actions.undo}
      </button>
    </div>
  );
};

export default RailOutcome;
