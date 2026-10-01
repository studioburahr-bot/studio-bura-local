import type { Dispatch, KeyboardEvent, RefObject } from "react";
import { Textarea } from "@/components/ui/textarea";
import { nudge as copy } from "../data";
import type { Action, State } from "../state";
import SparkIcon from "./SparkIcon";
import { primaryButton, secondaryButton, textButton } from "./buttons";

interface Props {
  state: State;
  dispatch: Dispatch<Action>;
  panelRef: RefObject<HTMLDivElement>;
  textareaRef: RefObject<HTMLTextAreaElement>;
  editButtonRef: RefObject<HTMLButtonElement>;
}

// The AI-drafted nudge, opened inline in the rail. Nothing is sent until the coordinator presses Send.
const NudgePanel = ({ state, dispatch, panelRef, textareaRef, editButtonRef }: Props) => {
  const editing = state.nudge.kind === "drafting" && state.nudge.editing;
  const sending = state.nudge.kind === "sending";
  const canSend = state.draft.trim().length > 0;

  // Escape steps back: first out of editing, then closes the draft
  const onKeyDown = (e: KeyboardEvent) => {
    if (e.key !== "Escape" || sending) return;
    dispatch(editing ? { type: "TOGGLE_EDIT" } : { type: "CLOSE_DRAFT" });
  };

  return (
    <div
      ref={panelRef}
      tabIndex={-1}
      role="group"
      aria-label={copy.aiLabel}
      onKeyDown={onKeyDown}
      className="rounded-xl border border-[color:var(--rp-border)] bg-[var(--rp-bg)] p-4 sm:p-5"
    >
      <div className="mb-3 flex flex-wrap items-center justify-between gap-x-4 gap-y-1">
        <span className="inline-flex items-center gap-2 text-[12px] font-bold tracking-[.02em] text-[color:var(--rp-ai)]">
          <SparkIcon size={13} />
          {copy.aiLabel}
        </span>
        <span className="text-[12px] font-medium text-[color:var(--rp-muted)]">
          {copy.toLabel}: <span className="font-semibold text-[color:var(--rp-text-2)]">{copy.recipient}</span>
        </span>
      </div>

      {editing ? (
        <Textarea
          ref={textareaRef}
          aria-label={copy.editorLabel}
          value={state.draft}
          onChange={(e) => dispatch({ type: "EDIT_DRAFT", text: e.target.value })}
          rows={6}
          onFocus={(e) => {
            const end = e.currentTarget.value.length;
            e.currentTarget.setSelectionRange(end, end);
          }}
          className="min-h-[170px] rounded-[10px] border-[color:var(--rp-border-strong)] bg-[var(--rp-surface)] px-4 py-3 text-[15px] leading-relaxed text-[color:var(--rp-text)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color:var(--rp-focus)] focus-visible:ring-0 focus-visible:ring-offset-0"
        />
      ) : (
        <p className="whitespace-pre-line rounded-[10px] border border-[color:var(--rp-border)] bg-[var(--rp-surface)] px-4 py-3 text-[15px] font-medium leading-relaxed text-[color:var(--rp-text)]">
          {state.draft}
        </p>
      )}

      <div className="mt-4 flex flex-wrap items-center gap-3">
        <button
          ref={editButtonRef}
          type="button"
          aria-pressed={editing}
          disabled={sending}
          onClick={() => dispatch({ type: "TOGGLE_EDIT" })}
          className={secondaryButton}
        >
          {editing ? copy.actions.doneEditing : copy.actions.edit}
        </button>

        <span className="hidden flex-1 sm:block" />

        <button
          type="button"
          disabled={sending}
          onClick={() => dispatch({ type: "CLOSE_DRAFT" })}
          className={`${textButton} text-[color:var(--rp-muted)] enabled:hover:text-[color:var(--rp-text)]`}
        >
          {copy.actions.cancel}
        </button>
        <button
          type="button"
          // aria-disabled (not disabled) while sending, so keyboard focus stays on the button
          disabled={!canSend}
          aria-disabled={sending}
          aria-busy={sending}
          onClick={() => !sending && dispatch({ type: "SEND" })}
          className={`${primaryButton} max-[480px]:order-last max-[480px]:w-full aria-disabled:cursor-wait aria-disabled:opacity-70`}
        >
          {sending ? copy.actions.sending : copy.actions.send}
        </button>
      </div>
    </div>
  );
};

export default NudgePanel;
