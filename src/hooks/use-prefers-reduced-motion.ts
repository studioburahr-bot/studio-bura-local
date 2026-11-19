import { useEffect, useState } from "react";

const QUERY = "(prefers-reduced-motion: reduce)";

// True while the visitor's system asks for reduced motion; follows changes while the page is open.
export const usePrefersReducedMotion = () => {
  const [reduced, setReduced] = useState(() => window.matchMedia(QUERY).matches);

  useEffect(() => {
    const mq = window.matchMedia(QUERY);
    const onChange = () => setReduced(mq.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  return reduced;
};
