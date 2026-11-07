import SectionGrid from "./SectionGrid";
import { RichLines } from "./RichText";
import type { RichLine } from "./types";

// Case study hero heading. Figma text style: Hero (64/80 from md, 40/48 below). Cols 1-8 from md.
const HeroSection = ({ lines, overlay }: { lines: RichLine[]; overlay?: string }) => (
  <SectionGrid data-section="hero" overlay={overlay}>
    <h2 className="col-span-12 text-balance text-hero font-bold text-ink md:col-span-8">
      <RichLines lines={lines} />
    </h2>
  </SectionGrid>
);

export default HeroSection;
