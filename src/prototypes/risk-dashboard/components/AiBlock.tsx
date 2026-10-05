import { forwardRef, type ReactNode } from "react";

interface Props {
  labelledBy: string; // id of the heading inside `strip`
  strip: ReactNode; // contents of the header strip: the AI label, plus anything beside it
  children: ReactNode;
}

// How AI-authored content is marked everywhere: 3px dark navy left border and a tinted header strip
// carrying a navy label. Facts from setup and sources never use this.
const AiBlock = forwardRef<HTMLElement, Props>(({ labelledBy, strip, children }, ref) => (
  <section
    ref={ref}
    aria-labelledby={labelledBy}
    className="overflow-hidden rounded-[8px] border border-l-[3px] border-[color:var(--rp-border-strong)] border-l-[color:var(--rp-navy)] bg-[var(--rp-surface)]"
  >
    <div className="flex flex-wrap items-center gap-x-3 gap-y-1 border-b border-[color:var(--rp-ai-strip-border)] bg-[var(--rp-ai-strip)] px-4 py-3 sm:px-7">
      {strip}
    </div>
    {children}
  </section>
));
AiBlock.displayName = "AiBlock";

export default AiBlock;
