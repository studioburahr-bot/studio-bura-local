import { useEffect, useRef, useState, type CSSProperties } from "react";
import "@fontsource/inter/latin-400.css";
import "@fontsource/inter/latin-500.css";
import "@fontsource/inter/latin-700.css";
import { useInView } from "@/hooks/use-in-view";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";
import { cn } from "@/lib/utils";
import radioChecked from "@/assets/projects/nordicpaws-subscribe/radio-checked.svg";
import inStockIcon from "@/assets/projects/nordicpaws-subscribe/in-stock.svg";
import checkmarkIcon from "@/assets/projects/nordicpaws-subscribe/checkmark.svg";
import chevronIcon from "@/assets/projects/nordicpaws-subscribe/chevron.svg";
import calendarIcon from "@/assets/projects/nordicpaws-subscribe/calendar.svg";
import cursorIcon from "@/assets/projects/nordicpaws-subscribe/cursor.svg";
import "./SubscribeSaveDemo.css";

// The Figma frame ("one-time-anim" / "subscribe-anim"). Everything inside is laid out at this size
// and the whole frame is scaled to the width it is given, so it matches the case study image around it.
const FRAME_WIDTH = 740;
const FRAME_HEIGHT = 450;
// With a caption the frame grows by this much: the caption sits under the open cards (which end at 410)
const CAPTION_SPACE = 30;

// Demo timeline (ms), from the Jitter motion spec. It loops every LOOP_MS.
const CURSOR_ARRIVES = 200;
const CLICK = 800;
const CLICK_RELEASE = 850;
const SWITCH_BACK = 3400;
const LOOP_MS = 4000;

type Choice = "subscribe" | "one-time";
type CursorPhase = "hidden" | "arrive" | "press" | "release" | "leave";
// demo: plays the loop. paused: the visitor's pointer is over it. manual: the visitor has chosen an option.
type Mode = "demo" | "paused" | "manual";

type SubscribeSaveDemoProps = {
  // A note under the cards, in the case study's annotation colour. It scales with the frame,
  // like the text in the case study image around it.
  caption?: string;
  className?: string;
  style?: CSSProperties;
};

// The Nordic Paws purchase options, working: choosing Subscribe & save opens its card and the headline
// price follows the choice. On screen it demonstrates itself (a cursor picks Subscribe, holds, switches
// back); it stops for good once the visitor picks an option, and pauses while the pointer is over it.
// Under reduced motion there is no demo and no motion: it shows the Subscribe state and stays clickable.
const SubscribeSaveDemo = ({ caption, className, style }: SubscribeSaveDemoProps) => {
  const frameHeight = caption ? FRAME_HEIGHT + CAPTION_SPACE : FRAME_HEIGHT;
  const { ref, inView } = useInView<HTMLDivElement>(0.35);
  const reducedMotion = usePrefersReducedMotion();
  const [scale, setScale] = useState(0);
  const [choice, setChoice] = useState<Choice>(() =>
    window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "subscribe" : "one-time",
  );
  const [changed, setChanged] = useState(false);
  const [cursor, setCursor] = useState<CursorPhase>("hidden");
  const [mode, setMode] = useState<Mode>("demo");
  const subscribed = choice === "subscribe";

  // Scale the fixed-size frame to the width this block gets
  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    const observer = new ResizeObserver(([entry]) => setScale(entry.contentRect.width / FRAME_WIDTH));
    observer.observe(element);
    return () => observer.disconnect();
  }, [ref]);

  // The demo loop. Runs only on screen, without reduced motion, until the visitor takes over.
  useEffect(() => {
    if (!inView || reducedMotion || mode !== "demo") return;

    const timers: number[] = [];
    const at = (ms: number, fn: () => void) => timers.push(window.setTimeout(fn, ms));
    const select = (next: Choice) => {
      setChoice(next);
      setChanged(true);
    };

    const runLoop = () => {
      setCursor("hidden");
      select("one-time");
      at(CURSOR_ARRIVES, () => setCursor("arrive"));
      at(CLICK, () => {
        setCursor("press");
        select("subscribe");
      });
      at(CLICK_RELEASE, () => setCursor("release"));
      at(SWITCH_BACK, () => {
        setCursor("leave");
        select("one-time");
      });
      at(LOOP_MS, runLoop);
    };
    runLoop();

    return () => {
      timers.forEach((timer) => window.clearTimeout(timer));
      // Let a visible cursor fade out instead of vanishing
      setCursor((phase) => (phase === "hidden" ? "hidden" : "leave"));
    };
  }, [inView, reducedMotion, mode]);

  const choose = (next: Choice) => {
    setMode("manual");
    setChoice(next);
    setChanged(true);
  };

  return (
    <div
      ref={ref}
      role="group"
      aria-label="Working example of the purchase options: choose Subscribe & save or One-time purchase"
      className={cn("relative", className)}
      style={{ aspectRatio: `${FRAME_WIDTH} / ${frameHeight}`, ...style }}
      onPointerEnter={(event) => {
        if (event.pointerType === "mouse") setMode((m) => (m === "demo" ? "paused" : m));
      }}
      onPointerLeave={(event) => {
        if (event.pointerType === "mouse") setMode((m) => (m === "paused" ? "demo" : m));
      }}
    >
      <div
        className="ssd absolute left-0 top-0 origin-top-left bg-white"
        data-changed={changed}
        style={{
          width: FRAME_WIDTH,
          height: frameHeight,
          transform: `scale(${scale})`,
          visibility: scale ? "visible" : "hidden",
        }}
      >
        {/* Headline price: follows the chosen option */}
        <p className="absolute right-[651px] top-[54px] whitespace-nowrap text-[14px] leading-5 text-[var(--ssd-muted)] line-through">
          <span className="sr-only">Regular price </span>€32,40
        </p>
        <div className="absolute right-[546px] top-10 h-9 text-[30px] leading-9 text-[var(--ssd-sale)]">
          <p className="ssd-price absolute right-0 top-0 whitespace-nowrap" data-state={subscribed ? "out" : "in"} aria-hidden={subscribed}>
            €25,92
          </p>
          <p className="ssd-price absolute right-0 top-0 whitespace-nowrap" data-state={subscribed ? "in" : "out"} aria-hidden={!subscribed}>
            €23,33
          </p>
        </div>
        {mode === "manual" && (
          <p className="sr-only" aria-live="polite">
            Price {subscribed ? "€23,33 with Subscribe & save" : "€25,92 for a one-time purchase"}
          </p>
        )}

        <p className="absolute left-[619px] top-[46px] flex items-center gap-1 whitespace-nowrap text-[16px] leading-6">
          <img src={inStockIcon} alt="" width={16} height={16} />
          In stock
        </p>

        {/* Options */}
        <div className="absolute left-10 top-[108px] flex w-[659px] flex-col gap-2">
          <label
            className="ssd-card ssd-sub relative block cursor-pointer overflow-hidden rounded-[12px] bg-white px-[23px] pt-[23px]"
            data-selected={subscribed}
          >
            <input
              type="radio"
              name="ssd-purchase"
              className="sr-only"
              checked={subscribed}
              onChange={() => choose("subscribe")}
            />
            <span className="flex h-6 items-center">
              <Radio />
              <span className="ml-4 text-[14px] font-bold leading-5">
                Subscribe to NordicPaws Salmon Delight &amp; <span className="text-[var(--ssd-sale)]">save 10% always</span>
              </span>
              <span className="ml-auto text-[16px] font-medium leading-6 text-[var(--ssd-sale)]">€23,33</span>
            </span>

            <span className="ssd-details mt-4 flex flex-col gap-2" aria-hidden={!subscribed}>
              {["Never run out of stock", "Change delivery frequency & cancel anytime"].map((line) => (
                <span key={line} className="flex h-5 items-center gap-1 text-[14px] leading-5">
                  <img src={checkmarkIcon} alt="" width={16} height={16} />
                  {line}
                </span>
              ))}
            </span>

            <span
              className="ssd-details mt-4 grid grid-cols-2 gap-3"
              style={{ "--ssd-delay": "350ms" } as CSSProperties}
              aria-hidden={!subscribed}
            >
              <FakeField label="Delivery frequency" value="Every 3 weeks" icon={chevronIcon} iconSize={16} />
              <FakeField label="Date for 2nd delivery" value="25/07/2026" icon={calendarIcon} iconSize={24} />
            </span>
          </label>

          <label
            className="ssd-card flex h-[72px] cursor-pointer items-center rounded-[12px] bg-white px-[23px]"
            data-selected={!subscribed}
          >
            <input
              type="radio"
              name="ssd-purchase"
              className="sr-only"
              checked={!subscribed}
              onChange={() => choose("one-time")}
            />
            <Radio />
            <span className="ml-4 text-[14px] font-bold leading-5">One-time purchase</span>
            <span className="ml-auto text-[16px] leading-6">€25,92</span>
          </label>
        </div>

        {caption && (
          <p className="absolute left-10 top-[436px] w-[659px] font-sans text-[20px] leading-7 text-ink-muted">{caption}</p>
        )}

        {/* Demo cursor: its tip rests on the lower right edge of the Subscribe radio, so the dot stays visible */}
        <img
          src={cursorIcon}
          alt=""
          aria-hidden
          width={23}
          height={23}
          className="ssd-cursor pointer-events-none absolute left-[69px] top-[150px]"
          data-phase={cursor}
        />
      </div>
    </div>
  );
};

// Radio from the design system: grey ring; the selected dot scales in over it
const Radio = () => (
  <span className="relative block size-4 shrink-0 rounded-full border border-[var(--ssd-border)] bg-white">
    <img src={radioChecked} alt="" width={16} height={16} className="ssd-radio-dot absolute -inset-px" />
  </span>
);

// Dropdown / date field from the design system, shown for its look only (not a working control)
const FakeField = ({ label, value, icon, iconSize }: { label: string; value: string; icon: string; iconSize: number }) => (
  <span className="flex flex-col gap-1.5">
    <span className="text-[14px] font-medium leading-5">{label}</span>
    <span className="flex h-11 items-center justify-between rounded-[12px] border border-[var(--ssd-border)] bg-white px-4 text-[16px] leading-6">
      {value}
      <img src={icon} alt="" width={iconSize} height={iconSize} />
    </span>
  </span>
);

export default SubscribeSaveDemo;
