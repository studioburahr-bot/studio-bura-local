import type { Dispatch, KeyboardEvent, RefObject } from "react";
import { Textarea } from "@/components/ui/textarea";
import { nudge as copy } from "../data";
import type { Action, State } from "../state";
import { aiLabel, primaryButton, quietButton, secondaryButton } from "./buttons";

interface Props {
  state: State;
  dispatch: Dispatch<Action>;
  panelRef: RefObject<HTMLDivElement>;
  textareaRef: RefObject<HTMLTextAreaElement>;
  editButtonRef: RefObject<HTMLButtonElement>;
}

const message = "rounded-[6px] border px-[14px] py-3 text-[15px] font-medium leading-relaxed text-[color:var(--rp-text)]";

// The AI-drafted nudge, opened inline in the AI panel. Nothing is sent until the coordinator presses Send.
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
    <div ref={panelRef} tabIndex={-1} role="group" aria-label={copy.aiLabel} onKeyDown={onKeyDown}>
      <div className="mb-[10px] flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
        <span className={aiLabel}>{copy.aiLabel}</span>
        <span className="text-[13px] font-medium text-[color:var(--rp-muted)]">
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
          className={`${message} min-h-[170px] border-[color:var(--rp-border-strong)] bg-[var(--rp-surface)] focus:border-[color:var(--rp-blue)] focus-visible:ring-0 focus-visible:ring-offset-0`}
        />
      ) : (
        <p className={`${message} whitespace-pre-line border-[color:var(--rp-border)] bg-[var(--rp-subtle)]`}>
          {state.draft}
        </p>
      )}

      <div className="mt-[14px] flex flex-wrap items-center gap-2">
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

        <span className="flex-1" />

        <button type="button" disabled={sending} onClick={() => dispatch({ type: "CLOSE_DRAFT" })} className={quietButton}>
          {copy.actions.cancel}
        </button>
        <button
          type="button"
          // aria-disabled (not disabled) while sending, so keyboard focus stays on the button
          disabled={!canSend}
          aria-disabled={sending}
          aria-busy={sending}
          onClick={() => !sending && dispatch({ type: "SEND" })}
          className={`${primaryButton} aria-disabled:cursor-wait aria-disabled:opacity-70`}
        >
          {sending ? copy.actions.sending : copy.actions.send}
        </button>
      </div>
    </div>
  );
};

export default NudgePanel;
