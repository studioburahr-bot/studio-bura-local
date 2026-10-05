import type { Dispatch } from "react";
import { build } from "./data";
import type { Action, State } from "./state";
import DependencyChain from "./components/DependencyChain";
import PageHeader from "./components/PageHeader";
import RiskRail from "./components/RiskRail";

const Dot = () => (
  <span aria-hidden="true" className="text-[color:var(--rp-sep)]">
    ·
  </span>
);

// Page header, dependency chain, then the AI assessment panel (as in Dashboard v5).
const Dashboard = ({ state, dispatch }: { state: State; dispatch: Dispatch<Action> }) => {
  const [org, store] = build.org.split(" · ");
  return (
    <div className="flex flex-col gap-6">
      <PageHeader
        eyebrow={
          <span className="flex flex-wrap items-center gap-x-2">
            {org} <Dot /> {store} <Dot />
            <span className="rp-mono text-[12px]">{build.implementationId}</span>
          </span>
        }
        title={build.title}
      />
      <DependencyChain />
      <RiskRail state={state} dispatch={dispatch} />
    </div>
  );
};

export default Dashboard;
