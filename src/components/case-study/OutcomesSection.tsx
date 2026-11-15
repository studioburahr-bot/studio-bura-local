import SectionGrid from "./SectionGrid";
import SectionLabel from "./SectionLabel";
import IconSquare from "./IconSquare";
import OutcomeIcon from "./OutcomeIcons";
import { RichLines } from "./RichText";
import type { OutcomeItem, OutcomesContent } from "./types";

// Icon square, h3 (heading-3) and body text, 12px apart.
const Outcome = ({ item }: { item: OutcomeItem }) => (
  <div className="flex flex-col gap-3">
    <IconSquare>
      <OutcomeIcon name={item.icon} className="size-full" />
    </IconSquare>
    <h3 className="text-balance text-heading-3 font-bold text-ink">
      <RichLines lines={item.heading} breakFrom="xl" />
    </h3>
    <p className="text-body text-ink">{item.text}</p>
  </div>
);

// The closing section, the same pattern as Personas / How might we.
// From xl: the label (the section's h2) and three outcomes in cols 1-5, label to first item 12px,
// items 64px apart; the closing statement in cols 8-12, top-aligned with the label; the disclaimer
// 64px under the last item, cols 1-5.
// Below xl: label, outcomes, statement, disclaimer, full width, 64px apart, in DOM order.
// Intentional breaks (headings, statement) apply from xl only.
const OutcomesSection = ({ outcomes, overlay }: { outcomes: OutcomesContent; overlay?: string }) => (
  <SectionGrid data-section="outcomes" className="items-start gap-y-16" overlay={overlay}>
    <div className="col-span-12 flex flex-col gap-3 xl:col-span-5 xl:col-start-1 xl:row-start-1">
      <SectionLabel as="h2">{outcomes.label}</SectionLabel>
      <div className="flex flex-col gap-16">
        {outcomes.items.map((item) => (
          <Outcome key={item.icon} item={item} />
        ))}
      </div>
    </div>
    {/* A closing line, not a heading: a <p> in the statement style. */}
    <p className="col-span-12 text-pretty text-statement font-bold text-ink xl:col-span-5 xl:col-start-8 xl:row-start-1">
      <RichLines lines={outcomes.statement} breakFrom="xl" />
    </p>
    <p className="col-span-12 text-annotation text-ink-muted xl:col-span-5 xl:col-start-1 xl:row-start-2">
      {outcomes.disclaimer}
    </p>
  </SectionGrid>
);

export default OutcomesSection;
