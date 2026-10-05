import { Link } from "react-router-dom";
import { shell } from "../data";

const item =
  "flex items-center gap-[11px] rounded-[6px] px-3 py-[10px] text-[14px] max-lg:min-h-[44px] max-lg:gap-2 max-lg:px-[10px] max-lg:py-0";

const BuildsIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
    <rect x="2" y="2" width="5" height="5" rx="1" stroke="currentColor" strokeWidth="1.5" />
    <rect x="9" y="2" width="5" height="5" rx="1" stroke="currentColor" strokeWidth="1.5" />
    <rect x="2" y="9" width="5" height="5" rx="1" stroke="currentColor" strokeWidth="1.5" />
    <rect x="9" y="9" width="5" height="5" rx="1" stroke="currentColor" strokeWidth="1.5" />
  </svg>
);

const INERT_ICONS = [
  // Setup
  <svg key="setup" width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
    <path d="M3 4h10M3 8h10M3 12h10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    <circle cx="6" cy="4" r="1.6" fill="var(--rp-navy)" stroke="currentColor" strokeWidth="1.5" />
    <circle cx="10.5" cy="8" r="1.6" fill="var(--rp-navy)" stroke="currentColor" strokeWidth="1.5" />
    <circle cx="5" cy="12" r="1.6" fill="var(--rp-navy)" stroke="currentColor" strokeWidth="1.5" />
  </svg>,
  // Activity
  <svg key="activity" width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
    <path d="M1.5 8.5h3l2-5 3 9 2-4h3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>,
];

// Dark navy app navigation: a 220px sidebar from 1024px up, a slim bar across the top below that.
// Builds is the only real destination (the dashboard).
// Setup and Activity are plain text: not links, not focusable, and announced as unavailable.
const Sidebar = () => (
  <aside className="rp-sidebar flex shrink-0 items-center gap-3 bg-[var(--rp-navy)] px-4 py-1 lg:w-[220px] lg:flex-col lg:items-stretch lg:gap-7 lg:px-[14px] lg:py-[22px]">
    {/* Decorative mark only — the tool deliberately has no product name */}
    <div className="lg:px-[10px]">
      <svg width="30" height="30" className="max-lg:h-[26px] max-lg:w-[26px]" viewBox="0 0 30 30" fill="none" aria-hidden="true">
        <rect x="1" y="1" width="28" height="28" rx="7" stroke="#fff" strokeWidth="2" />
        <path d="M9 10h12M9 15h8M9 20h12" stroke="#fff" strokeWidth="2" strokeLinecap="round" />
      </svg>
    </div>

    <nav aria-label={shell.nav.label}>
      <ul className="flex gap-[2px] lg:flex-col">
        <li>
          <Link
            to={shell.dashboardPath}
            aria-current="page"
            className={`${item} bg-[var(--rp-blue)] font-bold text-white hover:bg-[var(--rp-blue-hover)]`}
          >
            <BuildsIcon />
            {shell.nav.builds}
          </Link>
        </li>
        {shell.nav.inert.map((label, i) => (
          <li key={label} className={`${item} cursor-default font-semibold text-[color:var(--rp-nav-text)]`}>
            {/* Icons are dropped on phones so the bar stays on one row */}
            <span className="max-sm:hidden">{INERT_ICONS[i]}</span>
            {label}
            <span className="sr-only">, {shell.nav.inertNote}</span>
          </li>
        ))}
      </ul>
    </nav>
  </aside>
);

export default Sidebar;
