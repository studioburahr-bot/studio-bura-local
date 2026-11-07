import SectionGrid from "./SectionGrid";
import { RichLines } from "./RichText";
import type { RichLine } from "./types";

// Case study hero heading. Figma text style: Hero (64/80 from md, 40/48 below). Full width (cols 1-12):
// its lines break at sentences, so it never runs too wide.
const HeroSection = ({ lines, overlay }: { lines: RichLine[]; overlay?: string }) => (
  <SectionGrid data-section="hero" overlay={overlay}>
    <h2 className="col-span-12 text-balance text-hero font-bold text-ink">
      <RichLines lines={lines} />
    </h2>
  </SectionGrid>
);

export default HeroSection;
