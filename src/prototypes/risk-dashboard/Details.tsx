import { Fragment, useEffect, useRef, type Dispatch } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Lock, Send } from "lucide-react";
import { details as copy, nudge as nudgeCopy, shell, steps, STATUS_LABEL } from "./data";
import type { Action, State } from "./state";
import type { RailFocus } from "./components/RiskRail";
import StatusPill from "./components/StatusPill";
import { secondaryButton } from "./components/buttons";

interface Props {
  state: State;
  dispatch: Dispatch<Action>;
}

const eyebrow = "text-[11px] font-bold uppercase tracking-[.11em] text-[color:var(--rp-muted)]";
const card = "rounded-2xl border border-[color:var(--rp-border)] bg-[var(--rp-surface)]";

const Arrow = ({ dashed }: { dashed?: boolean }) => (
  <svg width="20" height="11" viewBox="0 0 20 11" fill="none" aria-hidden="true" className="shrink-0">
    <path d="M0 5.5h14" stroke="var(--rp-line)" strokeWidth="1.6" strokeDasharray={dashed ? "3 3" : undefined} />
    <path d="M13 1l5 4.5-5 4.5z" fill="var(--rp-line)" />
  </svg>
);

// Compact version of the chain: Paint highlighted, the dry gate on the edge after it, launch at the end.
// Each arrow is grouped with the step it points to, so a line break never leaves an arrow hanging.
const ChainStrip = () => {
  const pill = "flex items-center gap-2 rounded-xl border bg-[var(--rp-surface)] px-3 py-[10px] text-[14px] font-bold";
  const date = "text-[12px] font-medium tabular-nums text-[color:var(--rp-muted)]";
  return (
    <ol aria-label={copy.chain.heading} className="flex flex-wrap items-center gap-x-[6px] gap-y-3">
      {steps.map((step, i) => {
        const afterGate = steps[i - 1]?.id === "paint";
        return (
          <li key={step.id} className="flex items-center gap-[6px]">
            {i > 0 && !afterGate && <Arrow />}
            {afterGate && (
              <>
                <Arrow dashed />
                <span className="rp-mono rounded-full bg-[var(--rp-waiting-bg)] px-[10px] py-1 text-[12px] font-medium text-[color:var(--rp-text-2)]">
                  {copy.chain.gate}
                </span>
                <Arrow dashed />
              </>
            )}
            <span
              className={`${pill} ${
                step.status === "atrisk"
                  ? "border-[color:var(--rp-atrisk)] text-[color:var(--rp-atrisk-text)]"
                  : "border-[color:var(--rp-border)] text-[color:var(--rp-text)]"
              }`}
            >
              {step.name}
              <span className={date}>{step.when.date.replace("· ", "")}</span>
              <span className="sr-only">, {STATUS_LABEL[step.status]}</span>
            </span>
          </li>
        );
      })}
      <li className="flex items-center gap-[6px]">
        <Arrow />
        <span className={`${pill} border-[color:var(--rp-border)] text-[color:var(--rp-text)]`}>
          <Lock size={13} strokeWidth={2} aria-hidden="true" />
          {copy.chain.launch.name}
          <span className={date}>{copy.chain.launch.date}</span>
        </span>
      </li>
    </ol>
  );
};

const EVIDENCE_DOT = {
  atrisk: <circle cx="6" cy="6" r="4.2" fill="none" stroke="var(--rp-atrisk)" strokeWidth="1.8" />,
  done: <circle cx="6" cy="6" r="4.6" fill="var(--rp-done)" />,
  neutral: <circle cx="6" cy="6" r="4.6" fill="var(--rp-faint)" />,
};

// Why this step: the full reasoning behind the one ranked risk on the dashboard
const Details = ({ state, dispatch }: Props) => {
  const navigate = useNavigate();
  const headingRef = useRef<HTMLHeadingElement>(null);
  const { nudge } = state;

  // New view: move focus to its heading so screen readers start here
  useEffect(() => {
    headingRef.current?.focus();
  }, []);

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

  return (
    <div className="mx-auto flex w-full max-w-[1060px] flex-col gap-[22px] px-4 pb-16 pt-6 sm:px-9 sm:pt-9">
      {/* Breadcrumb */}
      <nav aria-label="Breadcrumb" className="flex flex-wrap items-center gap-x-[10px] gap-y-1 text-[13px] font-medium">
        <Link
          to={shell.dashboardPath}
          state={{ railFocus: "details" satisfies RailFocus }}
          className="inline-flex min-h-[44px] items-center gap-[7px] text-[color:var(--rp-muted)] hover:text-[color:var(--rp-text)]"
        >
          <svg width="7" height="12" viewBox="0 0 9 15" fill="none" aria-hidden="true">
            <path d="M7.4 1.4L1.6 7.5l5.8 6.1" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          {copy.breadcrumbBack}
        </Link>
        <span aria-hidden="true" className="text-[color:var(--rp-line)]">
          /
        </span>
        <span aria-current="page" className="font-semibold text-[color:var(--rp-text)]">
          {copy.breadcrumbCurrent}
        </span>
        <span className="flex-1" />
        <span className="rp-mono text-[11px] text-[color:var(--rp-muted)]">{copy.ref}</span>
      </nav>

      {/* Status + summary */}
      <section className={`${card} px-4 py-[26px] sm:px-7`}>
        <div className="mb-[14px] flex flex-wrap items-center gap-3">
          <StatusPill status="atrisk" />
          <span className="text-[12px] font-medium text-[color:var(--rp-muted)]">{copy.hero.meta}</span>
        </div>
        <h1
          ref={headingRef}
          tabIndex={-1}
          className="text-[22px] font-medium tracking-[-.02em] text-[color:var(--rp-text)]"
        >
          {copy.hero.title}
        </h1>
        <p className="mt-[10px] max-w-[62ch] text-pretty text-[16px] font-medium leading-normal text-[color:var(--rp-muted)]">
          {copy.hero.body}
        </p>

        <div className="mt-[22px] flex flex-wrap items-center gap-3">
          {nudge.kind === "idle" && (
            <button type="button" onClick={openDraft} className={secondaryButton}>
              {copy.hero.nudge}
            </button>
          )}
          {(nudge.kind === "drafting" || nudge.kind === "sending") && (
            <button type="button" onClick={() => backTo("draft")} className={secondaryButton}>
              {copy.hero.backToDraft}
            </button>
          )}
          {nudge.kind === "sent" && (
            <>
              <span className="inline-flex items-center gap-[7px] rounded-full bg-[var(--rp-waiting-bg)] py-[5px] pl-[10px] pr-[12px] text-[12px] font-bold tracking-[.02em] text-[color:var(--rp-text-2)]">
                <Send size={12} strokeWidth={2} aria-hidden="true" />
                {nudgeCopy.sent.status}
              </span>
              <span className="text-[13px] font-medium tabular-nums text-[color:var(--rp-muted)]">
                {nudgeCopy.sent.sentAt(nudge.at)}
              </span>
            </>
          )}
          {nudge.kind === "dismissed" && (
            <span className="inline-flex items-center rounded-full bg-[var(--rp-waiting-bg)] px-3 py-[5px] text-[12px] font-bold tracking-[.02em] text-[color:var(--rp-text-2)]">
              {nudge.reason ? `${nudgeCopy.dismissed.status} · ${nudge.reason}` : nudgeCopy.dismissed.status}
            </span>
          )}
        </div>
      </section>

      {/* What happens next */}
      <section aria-labelledby="rp-next-heading">
        <h2 id="rp-next-heading" className={`mb-[14px] ${eyebrow}`}>
          {copy.next.heading}
        </h2>
        <div className="grid gap-4 sm:grid-cols-2">
          {copy.next.cards.map((c) => (
            <article key={c.tag} className={`${card} px-6 py-[22px]`}>
              <div className="inline-flex items-center rounded-full bg-[var(--rp-waiting-bg)] px-[11px] py-[5px] text-[11px] font-bold uppercase tracking-[.05em] text-[color:var(--rp-text-3)]">
                {c.tag}
              </div>
              <h3 className="mt-[14px] text-[20px] font-bold tracking-[-.022em] text-[color:var(--rp-text)]">{c.title}</h3>
              <p className="mt-2 text-pretty text-[14px] font-medium leading-normal text-[color:var(--rp-muted)]">{c.body}</p>
            </article>
          ))}
        </div>
      </section>

      {/* Where it sits in the chain: upstream, the gate, what it freezes, cost to launch */}
      <section aria-labelledby="rp-chain-detail-heading" className={`${card} px-4 pb-[30px] pt-7 sm:px-[30px]`}>
        <h2 id="rp-chain-detail-heading" className="text-[21px] font-bold tracking-[-.024em] text-[color:var(--rp-text)]">
          {copy.chain.heading}
        </h2>
        <div className="mb-6 mt-[22px]">
          <ChainStrip />
        </div>
        <dl className="grid gap-x-6 gap-y-3 sm:grid-cols-[140px_minmax(0,1fr)]">
          {copy.chain.facts.map((f) => (
            <Fragment key={f.label}>
              <dt className="text-[12px] font-bold uppercase tracking-[.06em] text-[color:var(--rp-muted)] sm:pt-[3px]">
                {f.label}
              </dt>
              <dd className="max-sm:mb-2 text-pretty text-[15px] font-medium leading-normal text-[color:var(--rp-text-2)]">
                {f.text}
              </dd>
            </Fragment>
          ))}
        </dl>
      </section>

      {/* The decoy: late, but not the risk. Neutral on purpose — never the at-risk colour. */}
      <section
        aria-labelledby="rp-not-flagged-heading"
        className="rounded-2xl border border-[color:var(--rp-border)] bg-[var(--rp-waiting-bg)] px-4 py-5 sm:px-6"
      >
        <h2 id="rp-not-flagged-heading" className="text-[15px] font-bold text-[color:var(--rp-text)]">
          {copy.notFlagged.heading}
        </h2>
        <p className="mt-1 max-w-[76ch] text-pretty text-[15px] font-medium leading-normal text-[color:var(--rp-text-3)]">
          {copy.notFlagged.body}
        </p>
      </section>

      <div aria-hidden="true" className="mt-[6px] h-px bg-[var(--rp-border)]" />

      {/* Evidence: observable facts only */}
      <section aria-labelledby="rp-evidence-heading">
        <h2 id="rp-evidence-heading" className={`mb-[14px] ${eyebrow}`}>
          {copy.evidence.heading}
        </h2>
        <ul className={`${card} divide-y divide-[color:var(--rp-divider)] overflow-hidden`}>
          {copy.evidence.items.map((item) => (
            <li
              key={item.text}
              className="grid grid-cols-[22px_minmax(0,1fr)] items-baseline gap-x-[14px] gap-y-1 px-4 py-[18px] sm:grid-cols-[22px_minmax(0,1fr)_auto] sm:px-[22px]"
            >
              <svg width="11" height="11" viewBox="0 0 12 12" aria-hidden="true" className="mt-[5px]">
                {EVIDENCE_DOT[item.tone as keyof typeof EVIDENCE_DOT]}
              </svg>
              <span className="text-pretty text-[15px] font-semibold text-[color:var(--rp-text)]">{item.text}</span>
              <span className="col-start-2 text-[12px] font-medium text-[color:var(--rp-muted)] sm:col-start-3 sm:whitespace-nowrap">
                {item.source}
              </span>
            </li>
          ))}
        </ul>
      </section>

      {/* History */}
      <section aria-labelledby="rp-history-heading">
        <h2 id="rp-history-heading" className={`mb-[14px] ${eyebrow}`}>
          {copy.history.heading}
        </h2>
        <ol className="flex flex-col gap-3">
          {[...copy.history.items, ...liveHistory.map((text) => ({ date: "Jun 13", text }))].map((item, i, all) => {
            const latest = i === all.length - 1;
            return (
              <li key={item.text} className="grid grid-cols-[62px_10px_minmax(0,1fr)] items-baseline gap-x-[14px]">
                <span className={`rp-mono text-[12px] ${latest ? "text-[color:var(--rp-text-2)]" : "text-[color:var(--rp-muted)]"}`}>
                  {item.date}
                </span>
                <svg width="9" height="9" viewBox="0 0 10 10" aria-hidden="true" className="mt-[5px]">
                  <circle cx="5" cy="5" r="3.4" fill="var(--rp-border-strong)" />
                </svg>
                <span
                  className={`text-pretty text-[14px] ${
                    latest ? "font-semibold text-[color:var(--rp-text-2)]" : "font-medium text-[color:var(--rp-muted)]"
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
