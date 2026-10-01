import type { Dispatch } from "react";
import type { Action, State } from "./state";
import BuildHeader from "./components/BuildHeader";
import DependencyChain from "./components/DependencyChain";
import RiskRail from "./components/RiskRail";

// Desktop: header, chain, rail (as in Dashboard.dc.html).
// 480px and below: the rail moves above the chain — the answer before the evidence.
const Dashboard = ({ state, dispatch }: { state: State; dispatch: Dispatch<Action> }) => (
  <div className="mx-auto flex w-full max-w-[1160px] flex-col gap-[22px] px-4 pb-16 pt-6 sm:px-9 sm:pt-11">
    <BuildHeader />
    <div className="max-[480px]:order-3">
      <DependencyChain />
    </div>
    <div className="max-[480px]:order-2">
      <RiskRail state={state} dispatch={dispatch} />
    </div>
  </div>
);

export default Dashboard;
