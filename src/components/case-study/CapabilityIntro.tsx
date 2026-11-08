import SectionGrid from "./SectionGrid";
import { RichParagraphs } from "./RichText";
import type { CapabilityIntroContent } from "./types";

// Introduces a capability: h2 (Statement) and Body paragraphs, 12px apart (Figma gap 12, the same as
// the Overview's heading-to-body gap). Cols 1-6 from md, full width below.
const CapabilityIntro = ({ intro, overlay }: { intro: CapabilityIntroContent; overlay?: string }) => (
  <SectionGrid data-section="capability-intro" overlay={overlay}>
    <div className="col-span-12 flex flex-col gap-3 md:col-span-6">
      <h2 className="text-balance text-statement font-bold text-ink">{intro.heading}</h2>
      <RichParagraphs paragraphs={intro.paragraphs} className="gap-7 text-body text-ink" />
    </div>
  </SectionGrid>
);

export default CapabilityIntro;
