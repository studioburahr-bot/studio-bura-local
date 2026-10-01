import { nudge as copy, type DismissReason } from "./data";

// Everything that can change in the prototype. The chain (step statuses) is not here:
// it is static data, so no action — including Send — can mark Paint as resolved.
export type NudgeState =
  | { kind: "idle" }
  | { kind: "drafting"; editing: boolean }
  | { kind: "sending" }
  | { kind: "sent"; at: string; message: string; canUndo: boolean }
  | { kind: "dismissed"; reason: DismissReason | null };

export interface State {
  nudge: NudgeState;
  draft: string;
  announcement: string; // text for the aria-live region
  startedAt: number; // when the prototype was opened or reset; drives the simulated clock
}

export type Action =
  | { type: "OPEN_DRAFT" }
  | { type: "CLOSE_DRAFT" }
  | { type: "TOGGLE_EDIT" }
  | { type: "EDIT_DRAFT"; text: string }
  | { type: "SEND" }
  | { type: "SEND_DONE"; at: string }
  | { type: "UNDO_EXPIRED" }
  | { type: "UNDO" }
  | { type: "DISMISS" }
  | { type: "SET_REASON"; reason: DismissReason }
  | { type: "RESET" };

export const createInitialState = (): State => ({
  nudge: { kind: "idle" },
  draft: copy.draft,
  announcement: "",
  startedAt: Date.now(),
});

// Simulated clock: the rail's "updated 09:12" plus the real minutes since the prototype opened
export const simulatedTime = (startedAt: number) => {
  const { hours, minutes } = copy.clockStart;
  const total = hours * 60 + minutes + Math.floor((Date.now() - startedAt) / 60000);
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${pad(Math.floor(total / 60) % 24)}:${pad(total % 60)}`;
};

export function reducer(state: State, action: Action): State {
  const { nudge } = state;

  switch (action.type) {
    case "OPEN_DRAFT":
      return nudge.kind === "idle" ? { ...state, nudge: { kind: "drafting", editing: false } } : state;

    case "CLOSE_DRAFT":
      return nudge.kind === "drafting" ? { ...state, nudge: { kind: "idle" } } : state;

    case "TOGGLE_EDIT":
      return nudge.kind === "drafting" ? { ...state, nudge: { kind: "drafting", editing: !nudge.editing } } : state;

    case "EDIT_DRAFT":
      return { ...state, draft: action.text };

    case "SEND":
      return nudge.kind === "drafting" && state.draft.trim()
        ? { ...state, nudge: { kind: "sending" }, announcement: copy.announce.sending }
        : state;

    case "SEND_DONE":
      return nudge.kind === "sending"
        ? {
            ...state,
            // Keep the exact text that went out, so the edited version is what the rail shows
            nudge: { kind: "sent", at: action.at, message: state.draft, canUndo: true },
            announcement: copy.announce.sent,
          }
        : state;

    case "UNDO_EXPIRED":
      return nudge.kind === "sent" ? { ...state, nudge: { ...nudge, canUndo: false } } : state;

    case "UNDO":
      // Undo send reopens the draft (edits kept); undo dismiss restores the risk
      if (nudge.kind === "sent" && nudge.canUndo) {
        return { ...state, nudge: { kind: "drafting", editing: false }, announcement: copy.announce.undoSend };
      }
      if (nudge.kind === "dismissed") {
        return { ...state, nudge: { kind: "idle" }, announcement: copy.announce.undoDismiss };
      }
      return state;

    case "DISMISS":
      // From the rail item (idle) or while a draft is open
      return nudge.kind === "idle" || nudge.kind === "drafting"
        ? { ...state, nudge: { kind: "dismissed", reason: null }, announcement: copy.announce.dismissed }
        : state;

    case "SET_REASON":
      return nudge.kind === "dismissed"
        ? { ...state, nudge: { kind: "dismissed", reason: action.reason }, announcement: copy.announce.reason(action.reason) }
        : state;

    case "RESET":
      return { ...createInitialState(), announcement: copy.announce.reset };
  }
}
