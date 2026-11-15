import SectionGrid from "./SectionGrid";
import { RichLines } from "./RichText";
import type { RichLine } from "./types";

// Opening statement. Figma text style: Statement (32/48 from md, 24/32 below). Cols 1-7 from md.
const StatementSection = ({ lines, overlay }: { lines: RichLine[]; overlay?: string }) => (
  <SectionGrid data-section="statement" overlay={overlay}>
    <h2 className="col-span-12 text-balance text-statement font-bold text-ink md:col-span-7">
      <RichLines lines={lines} />
    </h2>
  </SectionGrid>
);

export default StatementSection;
