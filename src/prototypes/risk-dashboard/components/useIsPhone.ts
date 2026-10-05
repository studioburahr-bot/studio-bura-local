import { useSyncExternalStore } from "react";

// True at 480px and below — the same breakpoint the CSS uses (max-[480px]).
// Used only where the content itself changes on phones (compact chain rows, shorter labels);
// anything that is just styling uses CSS classes instead.
const query = "(max-width: 480px)";

const subscribe = (onChange: () => void) => {
  const mq = window.matchMedia(query);
  mq.addEventListener("change", onChange);
  return () => mq.removeEventListener("change", onChange);
};

export const useIsPhone = () => useSyncExternalStore(subscribe, () => window.matchMedia(query).matches);
