import { useEffect, useReducer, useRef } from "react";
import { Link, Navigate, Route, Routes, useNavigate } from "react-router-dom";
import { RotateCcw } from "lucide-react";
import { nudge as nudgeCopy, shell } from "./data";
import { createInitialState, reducer, simulatedTime } from "./state";
import { textButton } from "./components/buttons";
import Dashboard from "./Dashboard";
import Details from "./Details";
import "./prototype.css";

// Full-screen shell for the prototype: small top bar, content, disclaimer footer.
// No portfolio nav — this route sits outside ProjectsLayout.
// All state lives here, in memory only: a refresh (or Reset) starts over.
const RiskPrototype = () => {
  const [state, dispatch] = useReducer(reducer, undefined, createInitialState);
  const navigate = useNavigate();
  const rootRef = useRef<HTMLDivElement>(null);

  // Track how the person is navigating, so focus rings show for keyboard users only (see prototype.css)
  useEffect(() => {
    const setInput = (mode: "keyboard" | "pointer") => {
      if (rootRef.current) rootRef.current.dataset.input = mode;
    };
    const onKeyDown = (e: KeyboardEvent) => e.key === "Tab" && setInput("keyboard");
    const onPointerDown = () => setInput("pointer");
    window.addEventListener("keydown", onKeyDown, true);
    window.addEventListener("pointerdown", onPointerDown, true);
    return () => {
      window.removeEventListener("keydown", onKeyDown, true);
      window.removeEventListener("pointerdown", onPointerDown, true);
    };
  }, []);
  const { nudge, startedAt } = state;

  // Timers live here (not in the rail) so they keep running while Details is open:
  // "Sending…" for 1s, then Undo stays available for 5s
  useEffect(() => {
    if (nudge.kind === "sending") {
      const t = setTimeout(() => dispatch({ type: "SEND_DONE", at: simulatedTime(startedAt) }), nudgeCopy.sendingMs);
      return () => clearTimeout(t);
    }
    if (nudge.kind === "sent" && nudge.canUndo) {
      const t = setTimeout(() => dispatch({ type: "UNDO_EXPIRED" }), nudgeCopy.undoMs);
      return () => clearTimeout(t);
    }
  }, [nudge, startedAt]);

  // Reset starts the demo over, back on the dashboard
  const reset = () => {
    dispatch({ type: "RESET" });
    navigate(shell.dashboardPath);
  };

  return (
    <div ref={rootRef} data-input="pointer" className="risk-proto flex flex-col">
      <header className="border-b border-[color:var(--rp-border)] bg-[var(--rp-surface)]">
        {/* Mobile: Back + Reset on the first row, label below. From sm: Back · label · Reset */}
        <div className="mx-auto flex max-w-[1160px] flex-wrap items-center justify-between gap-x-6 gap-y-1 px-4 py-1 sm:px-9">
          <Link
            to={shell.caseStudyPath}
            className="order-1 inline-flex min-h-[44px] items-center text-[13px] font-semibold text-[color:var(--rp-muted)] hover:text-[color:var(--rp-text)]"
          >
            {shell.back}
          </Link>
          <span className="order-3 w-full pb-2 text-[12px] font-medium text-[color:var(--rp-muted)] sm:order-2 sm:ml-auto sm:w-auto sm:pb-0">
            {shell.label}
          </span>
          <button
            type="button"
            onClick={reset}
            className={`${textButton} order-2 gap-[6px] text-[12px] text-[color:var(--rp-text-2)] hover:text-[color:var(--rp-text)] sm:order-3`}
          >
            <RotateCcw size={13} strokeWidth={2} aria-hidden="true" />
            {nudgeCopy.reset}
          </button>
        </div>
      </header>

      {/* Screen readers hear the outcome of Send, Undo, Dismiss and Reset */}
      <div role="status" aria-live="polite" className="sr-only">
        {state.announcement}
      </div>

      <main className="flex-1">
        {/* Paths are relative to /projects/digital/risk-triage-tool/prototype (set in App.tsx) */}
        <Routes>
          <Route index element={<Dashboard state={state} dispatch={dispatch} />} />
          <Route path="details" element={<Details state={state} dispatch={dispatch} />} />
          <Route path="*" element={<Navigate to={shell.dashboardPath} replace />} />
        </Routes>
      </main>

      <footer className="px-4 py-6 text-center text-[12px] font-medium text-[color:var(--rp-muted)] sm:px-9">
        {shell.footer}
      </footer>
    </div>
  );
};

export default RiskPrototype;
