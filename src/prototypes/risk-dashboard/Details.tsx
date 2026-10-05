import { useEffect, useRef, type Dispatch } from "react";
import { Link, useNavigate } from "react-router-dom";
import { build, connectors, details as copy, shell, steps, STATUS_LABEL } from "./data";
import type { Action, State } from "./state";
import AiBlock from "./components/AiBlock";
import PageHeader from "./components/PageHeader";
import RailOutcome from "./components/RailOutcome";
import type { RailFocus } from "./components/RiskRail";
import StatusChip from "./components/StatusChip";
import { aiLabel, primaryButton, secondaryButton } from "./components/buttons";
import { GateChip, LaunchNode, ProgressNode } from "./components/progressParts";
import { GATE_POSITION, segmentClass } from "./components/statusStyles";

interface Props {
  state: State;
  dispatch: Dispatch<Action>;
}

const card = "rounded-[8px] border border-[color:var(--rp-border)] bg-[var(--rp-surface)]";
const listHeading = "rp-label border-b border-[color:var(--rp-border)] px-4 py-[14px] sm:px-7";

const Slash = () => (
  <span aria-hidden="true" className="text-[color:var(--rp-sep)]">
    /
  </span>
);

const DOT = {
  atrisk: "bg-[var(--rp-atrisk)]",
  done: "bg-[var(--rp-done)]",
  neutral: "bg-[var(--rp-faint)]",
  hollow: "border-2 border-[color:var(--rp-faint)]",
  action: "bg-[var(--rp-text-2)]",
};

// The chain with Paint highlighted, the dry-time gate after it and the locked launch at the end.
// Setup facts, not AI — so no navy marking.
const ChainPosition = () => {
  const label = "text-center max-lg:text-left";
  return (
    <ol className="grid gap-x-6 gap-y-3 lg:grid-cols-5">
      {steps.map((step, i) => {
        const connector = connectors[i];
        const gate = connector?.kind === "gate" ? connector : null;
        const atRisk = step.status === "atrisk";
        return (
          <li key={step.id} className="flex items-center gap-3 lg:flex-col">
            <div aria-hidden="true" className="relative flex h-9 items-center justify-center lg:w-full">
              {/* Last step connects on to Launch */}
              <span className={`max-lg:hidden ${segmentClass(step.status, !!gate)}`} />
              <ProgressNode status={step.status} />
              {gate && (
                <GateChip duration={gate.duration} caption={gate.caption} className={`max-lg:hidden ${GATE_POSITION}`} />
              )}
            </div>
            <div className={label}>
              <div
                className={
                  atRisk
                    ? "text-[16px] font-extrabold text-[color:var(--rp-atrisk-text)]"
                    : "text-[15px] font-semibold text-[color:var(--rp-text-3)]"
                }
              >
                {step.name}
                <span className="sr-only">, {STATUS_LABEL[step.status]}</span>
              </div>
              <div
                className={`mt-[2px] text-[12px] tabular-nums ${
                  atRisk ? "font-semibold text-[color:var(--rp-text-2)]" : "font-medium text-[color:var(--rp-muted)]"
                }`}
              >
                {step.when.date.replace("· ", "")}
                {gate && (
                  <span className="lg:sr-only">
                    {" "}
                    · then {gate.duration} {gate.caption.toLowerCase()}
                  </span>
                )}
              </div>
            </div>
          </li>
        );
      })}
      <li className="flex items-center gap-3 lg:flex-col">
        <div aria-hidden="true" className="relative flex h-9 items-center justify-center lg:w-full">
          <LaunchNode />
        </div>
        <div className={label}>
          <div className="text-[15px] font-bold text-[color:var(--rp-text)]">{copy.chain.launch.name}</div>
          <div className="mt-[2px] text-[12px] font-medium tabular-nums text-[color:var(--rp-muted)]">
            {copy.chain.launch.date} · {build.launch.note}
          </div>
        </div>
      </li>
    </ol>
  );
};

// Why this step: the full reasoning behind the one ranked risk on the dashboard.
// AI-authored blocks (the assessment and "What happens next") carry the navy marking; chain, evidence and history are facts.
const Details = ({ state, dispatch }: Props) => {
  const navigate = useNavigate();
  const titleRef = useRef<HTMLHeadingElement>(null);
  const statusRef = useRef<HTMLElement>(null);
  const actionRef = useRef<HTMLButtonElement>(null);
  const outcomeRef = useRef<HTMLDivElement>(null);
  const { nudge } = state;

  // New view: move focus to its title so screen readers start here
  useEffect(() => {
    titleRef.current?.focus();
  }, []);

  // After Undo (or when Undo times out) the control that had focus disappears:
  // move focus to what replaced it, but only if focus was in this block.
  const canUndo = nudge.kind === "sent" && nudge.canUndo;
  const isFirstRender = useRef(true);
  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    const active = document.activeElement;
    if (active && active !== document.body && !statusRef.current?.contains(active)) return;
    if (nudge.kind === "sent" || nudge.kind === "dismissed") outcomeRef.current?.focus();
    else actionRef.current?.focus();
  }, [nudge.kind, canUndo]);

  const backTo = (railFocus: RailFocus) => navigate(shell.dashboardPath, { state: { railFocus } });

  const openDraft = () => {
    dispatch({ type: "OPEN_DRAFT" });
    backTo("draft");
  };

  // History grows with what the coordinator did in the prototype
  const liveHistory =
    nudge.kind === "sent"
      ? [copy.history.nudged(nudge.at)]
      : nudge.kind === "dismissed"
        ? [copy.history.dismissed(nudge.reason)]
        : [];
  const history = [...copy.history.items, ...liveHistory.map((text) => ({ date: "Jun 13", text, tone: "action" }))];

  return (
    <div className="flex flex-col gap-6">
      <PageHeader
        titleRef={titleRef}
        title={copy.breadcrumbCurrent}
        eyebrow={
          // "Builds" is plain text; the build name is the way back to the dashboard
          <nav aria-label="Breadcrumb">
            <ol className="flex flex-wrap items-center gap-x-2">
              <li className="flex items-center gap-2">
                {shell.nav.builds} <Slash />
              </li>
              <li className="flex items-center gap-2">
                <Link
                  to={shell.dashboardPath}
                  state={{ railFocus: "details" satisfies RailFocus }}
                  className="inline-flex items-center rounded-[4px] text-[color:var(--rp-text-3)] hover:text-[color:var(--rp-blue)] [@media(pointer:coarse)]:min-h-[44px]"
                >
                  {build.title}
                </Link>{" "}
                <Slash />
              </li>
              <li aria-current="page" className="font-semibold text-[color:var(--rp-text)]">
                {copy.breadcrumbCurrent}
              </li>
            </ol>
          </nav>
        }
        sub={
          <p className="mt-[6px] flex gap-2 text-[13px] font-medium text-[color:var(--rp-muted)]">
            <span className="rp-mono text-[12px]">{build.implementationId}</span>
            <span aria-hidden="true" className="text-[color:var(--rp-sep)]">
              ·
            </span>
            <span>{copy.ref.split(" · ")[1]}</span>
          </p>
        }
      />

      {/* Status block: the AI's assessment, and what the coordinator did about it */}
      <AiBlock
        ref={statusRef}
        labelledBy="rp-status-heading"
        strip={<span className={aiLabel}>{copy.hero.aiLabel}</span>}
      >
        <div className="flex flex-col gap-[14px] px-4 pb-7 pt-6 sm:px-7">
          {/* Stays "At risk" whatever the coordinator does: nudging or dismissing doesn't confirm the paint */}
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
            <StatusChip status="atrisk" />
            <span className="text-[13px] font-medium text-[color:var(--rp-text-3)]">{copy.hero.meta}</span>
          </div>
          <h2
            id="rp-status-heading"
            className="mt-1 text-[26px] font-extrabold leading-[1.2] tracking-[-.025em] text-[color:var(--rp-text)]"
          >
            {copy.hero.title}
          </h2>
          <p className="max-w-[680px] text-pretty text-[16px] font-medium leading-[1.55] text-[color:var(--rp-text-3)]">
            {copy.hero.body}
          </p>

          <div className="mt-[6px]">
            {nudge.kind === "idle" && (
              <button ref={actionRef} type="button" onClick={openDraft} className={`${primaryButton} !px-[22px]`}>
                {copy.hero.nudge}
              </button>
            )}
            {(nudge.kind === "drafting" || nudge.kind === "sending") && (
              <button ref={actionRef} type="button" onClick={() => backTo("draft")} className={secondaryButton}>
                {copy.hero.backToDraft}
              </button>
            )}
            {/* Same block as on the dashboard: Undo, reason chips and View message behave identically */}
            {(nudge.kind === "sent" || nudge.kind === "dismissed") && (
              <RailOutcome nudge={nudge} dispatch={dispatch} outcomeRef={outcomeRef} />
            )}
          </div>
        </div>
      </AiBlock>

      {/* What happens next: also AI */}
      <AiBlock
        labelledBy="rp-next-heading"
        strip={
          <>
            <h2 id="rp-next-heading" className="rp-label !text-[color:var(--rp-text-2)]">
              {copy.next.heading}
            </h2>
            <span className="flex-1" />
            <span className={aiLabel}>{copy.next.aiLabel}</span>
          </>
        }
      >
        <div className="grid sm:grid-cols-2">
          {copy.next.cards.map((c, i) => (
            <div
              key={c.tag}
              className={`flex flex-col items-start gap-[10px] px-4 pb-[26px] pt-[22px] sm:px-7 ${
                i === 0 ? "border-[color:var(--rp-border)] max-sm:border-b sm:border-r" : ""
              }`}
            >
              <span className="rounded-[4px] border border-[color:var(--rp-border)] bg-[var(--rp-waiting-bg)] px-2 py-1 text-[11px] font-bold uppercase tracking-[.09em] text-[color:var(--rp-text-2)]">
                {c.tag}
              </span>
              <h3 className="mt-1 text-[20px] font-bold tracking-[-.02em] text-[color:var(--rp-text)]">{c.title}</h3>
              <p className="text-pretty text-[14px] font-medium leading-[1.55] text-[color:var(--rp-text-3)]">{c.body}</p>
            </div>
          ))}
        </div>
      </AiBlock>

      {/* Where it sits in the chain */}
      <section aria-labelledby="rp-chain-detail-heading" className={`${card} px-4 pb-7 pt-[26px] sm:px-7`}>
        <h2
          id="rp-chain-detail-heading"
          className="mb-[26px] text-[20px] font-bold tracking-[-.02em] text-[color:var(--rp-text)]"
        >
          {copy.chain.heading}
        </h2>
        <ChainPosition />
        <dl className="mt-7 border-t border-[color:var(--rp-border)]">
          {copy.chain.facts.map((f, i) => {
            const last = i === copy.chain.facts.length - 1;
            return (
              <div
                key={f.label}
                className={`grid gap-x-4 py-[14px] sm:grid-cols-[200px_minmax(0,1fr)] ${
                  last ? "pb-0" : "border-b border-[color:var(--rp-row)]"
                }`}
              >
                <dt className="rp-label !tracking-[.09em] leading-[22px]">{f.label}</dt>
                <dd
                  className={`text-pretty text-[15px] leading-[22px] text-[color:var(--rp-text)] ${
                    last ? "font-semibold" : "font-medium"
                  }`}
                >
                  {f.text}
                </dd>
              </div>
            );
          })}
        </dl>
      </section>

      {/* The decoy: late, but not the risk. Neutral grey on purpose — never the at-risk colour. */}
      <section
        aria-labelledby="rp-not-flagged-heading"
        className="flex items-start gap-[14px] rounded-[8px] border border-[color:var(--rp-border)] bg-[var(--rp-row)] px-4 py-5 sm:px-7"
      >
        <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true" className="mt-[2px] shrink-0">
          <circle cx="9" cy="9" r="7.3" stroke="var(--rp-muted)" strokeWidth="1.4" />
          <path d="M9 8v4.5" stroke="var(--rp-muted)" strokeWidth="1.5" strokeLinecap="round" />
          <circle cx="9" cy="5.5" r=".9" fill="var(--rp-muted)" />
        </svg>
        <div>
          <h2 id="rp-not-flagged-heading" className="mb-1 text-[15px] font-bold text-[color:var(--rp-text)]">
            {copy.notFlagged.heading}
          </h2>
          <p className="max-w-[760px] text-pretty text-[14px] font-medium leading-[1.55] text-[color:var(--rp-text-3)]">
            {copy.notFlagged.body}
          </p>
        </div>
      </section>

      {/* Evidence: observable facts only */}
      <section aria-labelledby="rp-evidence-heading" className={`${card} overflow-hidden`}>
        <h2 id="rp-evidence-heading" className={listHeading}>
          {copy.evidence.heading}
        </h2>
        <ul>
          {copy.evidence.items.map((item) => (
            <li
              key={item.text}
              className="grid grid-cols-[10px_minmax(0,1fr)] items-center gap-x-4 gap-y-[2px] border-b border-[color:var(--rp-row)] px-4 py-[15px] last:border-b-0 sm:grid-cols-[10px_minmax(0,1fr)_auto] sm:px-7"
            >
              <span
                aria-hidden="true"
                className={`h-[10px] w-[10px] rounded-full ${DOT[item.tone === "neutral" ? "hollow" : (item.tone as "atrisk" | "done")]}`}
              />
              <span
                className={`text-pretty text-[15px] text-[color:var(--rp-text)] ${
                  item.tone === "atrisk" ? "font-bold" : "font-medium"
                }`}
              >
                {item.text}
              </span>
              <span className="col-start-2 text-[13px] font-medium text-[color:var(--rp-muted)] sm:col-start-3 sm:text-right">
                {item.source}
              </span>
            </li>
          ))}
        </ul>
      </section>

      {/* History */}
      <section aria-labelledby="rp-history-heading" className={`${card} overflow-hidden`}>
        <h2 id="rp-history-heading" className={listHeading}>
          {copy.history.heading}
        </h2>
        <ol>
          {history.map((item) => {
            const strong = item.tone === "atrisk";
            return (
              <li
                key={item.text}
                className="grid grid-cols-[64px_10px_minmax(0,1fr)] items-center gap-x-4 border-b border-[color:var(--rp-row)] px-4 py-[13px] last:border-b-0 sm:px-7"
              >
                <span className={`rp-mono text-[13px] ${strong ? "text-[color:var(--rp-text-2)]" : "text-[color:var(--rp-muted)]"}`}>
                  {item.date}
                </span>
                <span aria-hidden="true" className={`h-2 w-2 rounded-full ${DOT[item.tone as keyof typeof DOT]}`} />
                <span
                  className={`text-pretty text-[14px] ${
                    strong ? "font-bold text-[color:var(--rp-text)]" : "font-medium text-[color:var(--rp-text-3)]"
                  }`}
                >
                  {item.text}
                </span>
              </li>
            );
          })}
        </ol>
      </section>
    </div>
  );
};

export default Details;
