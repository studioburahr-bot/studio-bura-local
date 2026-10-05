import type { ReactNode, Ref } from "react";
import { build } from "../data";

interface Props {
  eyebrow: ReactNode; // line above the title: build context, or a breadcrumb
  title: string;
  sub?: ReactNode; // optional line under the title
  titleRef?: Ref<HTMLHeadingElement>;
}

const LockIcon = () => (
  <svg width="11" height="11" viewBox="0 0 12 12" fill="none" aria-hidden="true">
    <rect x="2" y="5.2" width="8" height="5.6" rx="1" stroke="currentColor" strokeWidth="1.2" />
    <path d="M3.8 5.2V3.8a2.2 2.2 0 014.4 0v1.4" stroke="currentColor" strokeWidth="1.2" />
  </svg>
);

// Page header: title on the left, Today and Launch on the right. Sits directly on the page, not in a card.
const PageHeader = ({ eyebrow, title, sub, titleRef }: Props) => (
  <header className="flex flex-wrap items-end justify-between gap-x-8 gap-y-4 pb-1">
    <div className="min-w-0">
      <div className="mb-2 text-[13px] font-medium text-[color:var(--rp-muted)]">{eyebrow}</div>
      <h1
        ref={titleRef}
        tabIndex={-1}
        className="text-[24px] font-bold leading-[1.15] tracking-[-.025em] text-[color:var(--rp-text)] sm:text-[28px]"
      >
        {title}
      </h1>
      {sub}
    </div>

    <dl className="flex gap-8">
      <div>
        <dt className="rp-label mb-1 !tracking-[.09em]">{build.today.label}</dt>
        <dd className="text-[16px] font-bold tabular-nums text-[color:var(--rp-text)]">{build.today.value}</dd>
      </div>
      <div>
        <dt className="rp-label mb-1 !tracking-[.09em]">{build.launch.label}</dt>
        <dd className="flex items-center gap-[6px] whitespace-nowrap text-[16px] font-bold tabular-nums text-[color:var(--rp-text)]">
          {build.launch.value}
          <span className="flex items-center gap-1 text-[13px] font-medium text-[color:var(--rp-muted)]">
            · <LockIcon />
            {build.launch.note}
          </span>
        </dd>
      </div>
    </dl>
  </header>
);

export default PageHeader;
