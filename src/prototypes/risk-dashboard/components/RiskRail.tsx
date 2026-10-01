import { useEffect, useRef, type Dispatch } from "react";
import { Link, useLocation } from "react-router-dom";
import { rail, shell } from "../data";
import type { Action, State } from "../state";
import NudgePanel from "./NudgePanel";
import RailOutcome from "./RailOutcome";
import SparkIcon from "./SparkIcon";
import { primaryButton, textButton } from "./buttons";

interface Props {
  state: State;
  dispatch: Dispatch<Action>;
}

// Where to put focus when arriving back from the Details view
export type RailFocus = "details" | "draft";

// The AI rail: the only place the indigo accent is used, and home of the only primary button.
// Timers for Sending / Undo live in RiskPrototype, so they keep running while Details is open.
const RiskRail = ({ state, dispatch }: Props) => {
  const { risk } = rail;
  const { nudge } = state;
  const location = useLocation();

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
  const dismissed = nudge.kind === "dismissed";

  return (
    <section
      ref={railRef}
      aria-labelledby="rp-rail-heading"
      className="rounded-2xl border border-[color:var(--rp-border)] bg-[var(--rp-surface)] px-4 pb-7 pt-[26px] sm:px-7"
    >
      <div className="mb-5 flex flex-wrap items-center gap-x-3 gap-y-1">
        <SparkIcon />
        <h2
          id="rp-rail-heading"
          className="text-[11px] font-bold uppercase tracking-[.11em] text-[color:var(--rp-ai)]"
        >
          {rail.heading}
        </h2>
        <span aria-hidden="true" className="hidden h-px flex-1 bg-[var(--rp-divider)] sm:block" />
        <span className="text-[12px] font-medium text-[color:var(--rp-muted)]">{rail.meta}</span>
      </div>

      <ol className="flex flex-col gap-3">
        <li className="grid grid-cols-[28px_minmax(0,1fr)] items-center gap-x-4 gap-y-4 rounded-[14px] border border-[color:var(--rp-border)] bg-[var(--rp-surface)] px-4 py-[18px] sm:grid-cols-[28px_minmax(0,1fr)_auto] sm:px-5">
          <span className="rp-mono self-start pt-1 text-[12px] font-medium text-[color:var(--rp-ai)]">
            {risk.rank}
          </span>

          <div className="min-w-0">
            <p
              className={`text-pretty text-[18px] font-bold tracking-[-.02em] ${
                dismissed ? "text-[color:var(--rp-muted)]" : "text-[color:var(--rp-text)]"
              }`}
            >
              {risk.headline}
            </p>
            <p className="mt-[6px] text-pretty text-[13px] font-medium text-[color:var(--rp-muted)]">
              {risk.evidence.join(" · ")}
            </p>
          </div>

          <div className="col-span-2 flex flex-wrap items-center justify-end gap-x-4 gap-y-2 sm:col-span-1 sm:pl-[10px]">
            <Link
              ref={detailsLinkRef}
              to={shell.detailsPath}
              className={`${textButton} text-[color:var(--rp-ai)] hover:text-[color:var(--rp-ai-hover)]`}
            >
              {rail.actions.details}
            </Link>
            {nudge.kind === "idle" && (
              <>
                <button
                  type="button"
                  onClick={() => dispatch({ type: "DISMISS" })}
                  className={`${textButton} text-[color:var(--rp-muted)] hover:text-[color:var(--rp-text)]`}
                >
                  {rail.actions.dismiss}
                </button>
                <button
                  ref={nudgeButtonRef}
                  type="button"
                  onClick={() => dispatch({ type: "OPEN_DRAFT" })}
                  className={`${primaryButton} max-[480px]:flex-1`}
                >
                  {rail.actions.nudge}
                </button>
              </>
            )}
          </div>

          {/* Draft or outcome: full width on mobile, under the headline from sm up */}
          {draftOpen && (
            <div className="col-span-full sm:col-span-2 sm:col-start-2">
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
            <div className="col-span-full sm:col-span-2 sm:col-start-2">
              <RailOutcome nudge={nudge} dispatch={dispatch} outcomeRef={outcomeRef} />
            </div>
          )}
        </li>
      </ol>
    </section>
  );
};

export default RiskRail;
