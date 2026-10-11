import { Fragment, useEffect, useRef, type CSSProperties } from "react";
import "./Hero.css";

interface HeadlineWord {
  text: string;
  // Position in the stagger (0 to 9), starting offset in px and starting rotation in degrees.
  // All values are the approved prototype's.
  i: number;
  dx: number;
  dy: number;
  rot: number;
}

// The headline: 10 words across 3 lines.
const HEADLINE: HeadlineWord[][] = [
  [
    { text: "Product", i: 0, dx: 2, dy: -3, rot: -2 },
    { text: "designer", i: 1, dx: -3, dy: 2, rot: 1.5 },
    { text: "turning", i: 2, dx: 1, dy: -2, rot: -2.5 },
    { text: "messy", i: 3, dx: -2, dy: 3, rot: 1 },
  ],
  [
    { text: "real-world", i: 4, dx: 3, dy: -1, rot: 3 },
    { text: "processes", i: 5, dx: -1, dy: 2, rot: -1.5 },
    { text: "into", i: 6, dx: 2, dy: -3, rot: 2 },
  ],
  [
    { text: "clear", i: 7, dx: -2, dy: 1, rot: -1 },
    { text: "digital", i: 8, dx: 1, dy: 3, rot: 2.5 },
    { text: "products.", i: 9, dx: 3, dy: -2, rot: -3 },
  ],
];

const LAST_WORD_INDEX = 9;

const wordStyle = (word: HeadlineWord) =>
  ({
    "--i": word.i,
    "--dx": `${word.dx}px`,
    "--dy": `${word.dy}px`,
    "--rot": `${word.rot}deg`,
  }) as CSSProperties;

const Hero = () => {
  const sectionRef = useRef<HTMLElement>(null);

  // Starts the motion (Hero.css) by adding "motion-ready" to <html>. As in the prototype: wait for the
  // fonts (1500ms at most), wait 300ms more, then play only while the tab is visible.
  // One addition: the page wrapper in Index.tsx runs its own fade-in on load, so the start also waits
  // for that to finish and the two movements never overlap.
  useEffect(() => {
    const root = document.documentElement;
    let cancelled = false;
    let fontTimer = 0;
    let waitTimer = 0;
    let frame = 0;

    const go = () => {
      frame = requestAnimationFrame(() => {
        frame = requestAnimationFrame(() => {
          if (!cancelled) root.classList.add("motion-ready");
        });
      });
    };

    const whenVisible = () => {
      if (cancelled) return;
      if (document.visibilityState === "visible") go();
      else document.addEventListener("visibilitychange", whenVisible, { once: true });
    };

    const wrapperFadeDone = () => {
      const wrapper = sectionRef.current?.closest(".animate-fade-in");
      const running = wrapper?.getAnimations?.() ?? [];
      return Promise.all(running.map((animation) => animation.finished.catch(() => undefined)));
    };

    Promise.race([
      document.fonts.ready,
      new Promise((resolve) => {
        fontTimer = window.setTimeout(resolve, 1500);
      }),
    ]).then(() => {
      if (cancelled) return;
      waitTimer = window.setTimeout(() => {
        wrapperFadeDone().then(whenVisible);
      }, 300);
    });

    // Leaving the home page resets the gate, so the motion plays again (after the wrapper) on return.
    return () => {
      cancelled = true;
      window.clearTimeout(fontTimer);
      window.clearTimeout(waitTimer);
      cancelAnimationFrame(frame);
      document.removeEventListener("visibilitychange", whenVisible);
      root.classList.remove("motion-ready");
    };
  }, []);

  return (
    <section ref={sectionRef} id="home" className="pt-28 md:pt-40">
      <div className="container mx-auto px-4 sm:px-6">
        <h1 className="text-4xl/[1.125] sm:text-5xl/[1.125] lg:text-6xl/[1.125] font-medium tracking-tight text-foreground">
          {HEADLINE.map((line, lineIndex) => (
            <span key={lineIndex} className="lg:block">
              {line.map((word) => (
                <Fragment key={word.text}>
                  <span className="hero-word" style={wordStyle(word)}>
                    {word.text}
                  </span>
                  {word.i === LAST_WORD_INDEX ? null : " "}
                </Fragment>
              ))}
            </span>
          ))}
        </h1>
        <p className="hero-paragraph text-base/[1.45] sm:text-lg/[1.45] md:text-xl/[1.45] font-light mt-4 md:mt-6 tracking-tight text-foreground/80 max-w-hero">
          I&apos;m Dora. I design B2B tools, e-commerce and AI-assisted products end to end, from research to tested interface. Before screens I designed spaces and physical products, so I start from how people actually work.
        </p>
      </div>
    </section>
  );
};

export default Hero;
