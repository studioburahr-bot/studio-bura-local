import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

// The 56px accent square behind an icon (personas, outcomes). Figma draws it at 56.67 (personas) and
// 52 (outcomes), both with a radius of 11% of the side; both are 56 with the 4px radius here.
// Icons inside draw in currentColor, so they take the surface colour.
const IconSquare = ({ children, className }: { children: ReactNode; className?: string }) => (
  <div className={cn("flex size-14 shrink-0 items-center justify-center rounded bg-project-accent text-surface", className)}>
    {children}
  </div>
);

export default IconSquare;
