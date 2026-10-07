import { useEffect, useRef, useState } from "react";

// Reports whether an element is on screen, for things that should only run while visible.
// Turns on once at least `threshold` of the element is visible (40% by default),
// and off again only when it has left the viewport completely.
export const useInView = <T extends Element>(threshold = 0.4) => {
  const ref = useRef<T>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.intersectionRatio >= threshold) setInView(true);
        else if (!entry.isIntersecting) setInView(false);
        // In between (partly visible, under the threshold): keep the current state
      },
      { threshold: [0, threshold] },
    );
    observer.observe(element);
    return () => observer.disconnect();
  }, [threshold]);

  return { ref, inView };
};
