import { useEffect, useRef, useState } from "react";
import { useInView } from "@/hooks/use-in-view";
import "./RiskHeroAnimation.css";

// How long the finished animation holds its end state before it plays again.
const HOLD_END_STATE_MS = 2500;

// Vertical crop. The source canvas is 2000 x 930 but the artwork only fills the middle band,
// so the viewBox is cut down to the artwork plus equal space above and below.
// Only the viewBox changes: no element is moved, scaled or retimed.
// Tallest resting state: block 2 at 1.2x, i.e. 288 units tall around the centre line y = 465.
const ARTWORK_TOP = 321; // 465 - 144
const ARTWORK_BOTTOM = 609; // 465 + 144
// Empty space kept above and below the artwork, in viewBox units. Adjust this one value.
const SPACE_ABOVE_AND_BELOW = 120;
const VIEW_TOP = ARTWORK_TOP - SPACE_ABOVE_AND_BELOW;
const VIEW_HEIGHT = ARTWORK_BOTTOM - ARTWORK_TOP + 2 * SPACE_ABOVE_AND_BELOW;

// Hero animation for the risk triage case study: five blocks appear, light up in turn,
// then one stays solid while the rest become outlines.
// The SVG and its keyframes come from src/assets/projects/Hero_animation.dc.html (see the CSS file).
// The source plays once; the loop is added here, outside the keyframes: when every animation has
// finished, the end state is held for HOLD_END_STATE_MS and the SVG is re-mounted, which restarts it
// from the beginning (the same thing the source's "Replay" button did).
// It only runs, and only loops, while on screen. Under reduced motion the source's own rule applies:
// no animation, end state shown.
const RiskHeroAnimation = () => {
  const { ref, inView } = useInView<HTMLDivElement>();
  const svgRef = useRef<SVGSVGElement>(null);
  const [run, setRun] = useState(0); // changing this re-mounts the SVG
  const [ended, setEnded] = useState(false);
  const holdLeft = useRef(HOLD_END_STATE_MS);

  // Wait for this run's animations to finish. Paused time (off screen) does not count,
  // because the animations themselves are paused.
  useEffect(() => {
    const animations = svgRef.current?.getAnimations({ subtree: true }) ?? [];
    if (animations.length === 0) return; // reduced motion: nothing is animating, so nothing to loop

    let stale = false;
    Promise.all(animations.map((animation) => animation.finished))
      .then(() => {
        if (!stale) setEnded(true);
      })
      .catch(() => {
        // Animations were cancelled because the SVG was re-mounted or removed
      });
    return () => {
      stale = true;
    };
  }, [run]);

  // Hold the end state, then restart. The hold only counts down while on screen.
  useEffect(() => {
    if (!ended || !inView) return;

    const startedAt = performance.now();
    let restarted = false;
    const timer = window.setTimeout(() => {
      restarted = true;
      holdLeft.current = HOLD_END_STATE_MS;
      setEnded(false);
      setRun((n) => n + 1);
    }, holdLeft.current);

    return () => {
      window.clearTimeout(timer);
      if (!restarted) holdLeft.current = Math.max(0, holdLeft.current - (performance.now() - startedAt));
    };
  }, [ended, inView]);

  return (
    <div ref={ref} className="rt-hero w-full" data-playing={inView}>
      <svg
        key={run}
        ref={svgRef}
        viewBox={`0 ${VIEW_TOP} 2000 ${VIEW_HEIGHT}`}
        className="block h-auto w-full"
        style={{ aspectRatio: `2000 / ${VIEW_HEIGHT}` }}
        aria-hidden="true"
      >
        <rect width="2000" height="930" fill="#FFFFFF"></rect>
        <line id="rt-hero-link-1" x1="424" y1="465" x2="532" y2="465"></line>
        <line id="rt-hero-link-2" x1="772" y1="465" x2="880" y2="465"></line>
        <line id="rt-hero-link-3" x1="1120" y1="465" x2="1228" y2="465"></line>
        <line id="rt-hero-link-4" x1="1468" y1="465" x2="1576" y2="465"></line>
        <rect id="rt-hero-block-1" className="rt-hero-block" x="184" y="345" width="240" height="240" rx="32"></rect>
        <rect id="rt-hero-block-2" className="rt-hero-block" x="532" y="345" width="240" height="240" rx="32"></rect>
        <g id="rt-hero-block-3" className="rt-hero-block">
          <rect className="rt-hero-fill" x="880" y="345" width="240" height="240" rx="32"></rect>
          <rect className="rt-hero-outline" x="881.5" y="346.5" width="237" height="237" rx="30.5"></rect>
        </g>
        <g id="rt-hero-block-4" className="rt-hero-block">
          <rect className="rt-hero-fill" x="1228" y="345" width="240" height="240" rx="32"></rect>
          <rect className="rt-hero-outline" x="1229.5" y="346.5" width="237" height="237" rx="30.5"></rect>
        </g>
        <g id="rt-hero-block-5" className="rt-hero-block">
          <rect className="rt-hero-fill" x="1576" y="345" width="240" height="240" rx="32"></rect>
          <rect className="rt-hero-outline" x="1577.5" y="346.5" width="237" height="237" rx="30.5"></rect>
        </g>
      </svg>
    </div>
  );
};

export default RiskHeroAnimation;
