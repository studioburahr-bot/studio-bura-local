import { useEffect, useRef, type Dispatch } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { rail, shell } from "../data";
import type { Action, State } from "../state";
import NudgePanel from "./NudgePanel";
import RailOutcome from "./RailOutcome";
import AiBlock from "./AiBlock";
import { aiLabel, linkButton, primaryButton, quietButton } from "./buttons";

interface Props {
  state: State;
  dispatch: Dispatch<Action>;
}

// Where to put focus when arriving back from the Details view
export type RailFocus = "details" | "draft";

// The AI assessment panel: the single ranked risk, with Details, Dismiss risk and the blue Nudge button.
// The draft, Nudged and Dismissed states open inside the same box.
// Timers for Sending / Undo live in RiskPrototype, so they keep running while Details is open.
const RiskRail = ({ state, dispatch }: Props) => {
  const { risk } = rail;
  const { nudge } = state;
  const location = useLocation();
  const navigate = useNavigate();

  const railRef = useRef<HTMLElement>(null);
  const detailsLinkRef = useRef<HTMLAnchorElement>(null);
  const nudgeButtonRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const editButtonRef = useRef<HTMLButtonElement>(null);
  const outcomeRef = useRef<HTMLDivElement>(null);

  // Arriving from Details: return focus to where the coordinator left off
  useEffect(() => {
    const focus = (location.state as { railFocus?: RailFocus } | null)?.railFocus;
    if (focus === "details") detailsLinkRef.current?.focus();
    if (focus === "draft") panelRef.current?.focus();
    // Use the note once, then clear it, so a page refresh doesn't move focus again
    if (focus) navigate(location.pathname, { replace: true, state: null });
    // Only on arrival
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Focus follows the flow, so keyboard and screen-reader users land on the new content.
  // Only moves focus if it was already in the rail (or lost because a button disappeared).
  const editing = nudge.kind === "drafting" && nudge.editing;
  const canUndo = nudge.kind === "sent" && nudge.canUndo;
  const wasEditing = useRef(false);
  const isFirstRender = useRef(true);
  useEffect(() => {
    const leftEditing = wasEditing.current && !editing;
    wasEditing.current = editing;
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    const active = document.activeElement;
    const focusIsHere = !active || active === document.body || railRef.current?.contains(active);
    if (!focusIsHere) return;

    if (nudge.kind === "idle") nudgeButtonRef.current?.focus();
    if (nudge.kind === "drafting") {
      if (editing) textareaRef.current?.focus();
      else if (leftEditing) editButtonRef.current?.focus();
      else panelRef.current?.focus();
    }
    if (nudge.kind === "sent" || nudge.kind === "dismissed") outcomeRef.current?.focus();
  }, [nudge.kind, editing, canUndo]);

  const draftOpen = nudge.kind === "drafting" || nudge.kind === "sending";

  return (
    <AiBlock
      ref={railRef}
      labelledBy="rp-rail-heading"
      strip={
        <>
          <h2 id="rp-rail-heading" className={aiLabel}>
            {rail.aiLabel}
          </h2>
          <span className="flex-1" />
          <span className="text-[12px] font-medium text-[color:var(--rp-muted)]">{rail.meta}</span>
        </>
      }
    >
      <div className="px-4 pb-6 pt-5 sm:px-7">
        <div className="grid grid-cols-1 items-center gap-x-4 gap-y-3 rounded-[6px] border border-[color:var(--rp-border)] px-4 py-5 max-[480px]:border-0 max-[480px]:p-0 sm:px-[22px] lg:grid-cols-[minmax(0,1fr)_auto]">
          <div className="min-w-0">
            {/* Dismissed: the recommendation goes quiet (muted, regular weight) so "Recommendation dismissed"
                is the strongest text on the card. Size and position don't change. Dashboard only —
                the Details headline is a fact about the step, still true, and stays as it is. */}
            <p
              className={`text-pretty text-[19px] tracking-[-.02em] ${
                nudge.kind === "dismissed"
                  ? "font-normal text-[color:var(--rp-muted)]"
                  : "font-bold text-[color:var(--rp-text)]"
              }`}
            >
              {risk.headline}
            </p>
            <p className="mt-[6px] text-pretty text-[13px] font-medium text-[color:var(--rp-muted)]">
              {risk.evidence.join(" · ")}
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-end gap-2 lg:pl-4">
            <Link ref={detailsLinkRef} to={shell.detailsPath} className={linkButton}>
              {rail.actions.details}
            </Link>
            {nudge.kind === "idle" && (
              <>
                <button type="button" onClick={() => dispatch({ type: "DISMISS" })} className={quietButton}>
                  {rail.actions.dismiss}
                </button>
                <button
                  ref={nudgeButtonRef}
                  type="button"
                  onClick={() => dispatch({ type: "OPEN_DRAFT" })}
                  className={`${primaryButton} max-[480px]:w-full`}
                >
                  {rail.actions.nudge}
                </button>
              </>
            )}
          </div>

          {/* Draft or outcome, under the headline */}
          {draftOpen && (
            <div className="col-span-full border-t border-[color:var(--rp-border)] pt-4">
              <NudgePanel
                state={state}
                dispatch={dispatch}
                panelRef={panelRef}
                textareaRef={textareaRef}
                editButtonRef={editButtonRef}
              />
            </div>
          )}
          {(nudge.kind === "sent" || nudge.kind === "dismissed") && (
            <div className="col-span-full">
              <RailOutcome nudge={nudge} dispatch={dispatch} outcomeRef={outcomeRef} />
            </div>
          )}
        </div>
      </div>
    </AiBlock>
  );
};

export default RiskRail;
