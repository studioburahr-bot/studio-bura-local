import type { HTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils";

interface SectionGridProps extends HTMLAttributes<HTMLElement> {
  children: ReactNode;
  // Dev only: a Figma export drawn over the section at 50% (see ProjectDetail, ?overlay=1).
  // Never rendered in production builds.
  overlay?: string;
}

// The 12-column grid every case study section sits on. It goes inside the page's existing
// max-w-container (with px-4 sm:px-6), so its left edge lines up with the top bar and the back link.
// Below md, children should span all 12 columns (col-span-12) and stack in DOM order.
const SectionGrid = ({ children, overlay, className, ...rest }: SectionGridProps) => (
  <section className={cn("relative grid grid-cols-12 gap-x-5", className)} {...rest}>
    {children}
    {import.meta.env.DEV && overlay && (
      <img
        src={overlay}
        alt=""
        aria-hidden="true"
        // Dev-only overlay: the Figma frame is 1352px wide (the container's content width at 1440)
        className="pointer-events-none absolute left-0 top-0 z-10 w-[1352px] max-w-none opacity-50"
      />
    )}
  </section>
);

export default SectionGrid;
