import { clsx, type ClassValue } from "clsx";
import { extendTailwindMerge } from "tailwind-merge";

// tailwind-merge only knows Tailwind's default font sizes, so it reads the custom ones
// (tailwind.config.ts fontSize: text-body, text-annotation, ...) as colours and drops them when a colour
// class like text-ink sits next to them. Registering them as font sizes keeps both.
const twMerge = extendTailwindMerge({
  extend: {
    classGroups: {
      "font-size": [
        {
          text: ["hero", "statement", "heading-3", "body", "body-sm", "label", "annotation", "diagram", "diagram-mono"],
        },
      ],
    },
  },
});

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
