import SectionGrid from "./SectionGrid";
import SectionLabel from "./SectionLabel";
import { RichLines } from "./RichText";
import PersonaIcon from "./PersonaIcons";
import IconSquare from "./IconSquare";
import type { PersonaContent } from "./types";

// 56px accent square with a 28px icon (surface colour), then the description 12px below.
// Figma text style: Body small; the role name is a bold run in the copy.
const PersonaCard = ({ persona }: { persona: PersonaContent }) => (
  <div className="flex flex-col gap-3">
    <IconSquare>
      <PersonaIcon name={persona.icon} className="size-7" />
    </IconSquare>
    <p className="text-body-sm text-ink">
      <RichLines lines={persona.text} />
    </p>
  </div>
);

// Personas (cols 1-3) and the "How might we" question (cols 8-12), top-aligned. Label to first card
// 12px, between cards 64px. Below md both span all 12 columns and stack, 64px apart.
const PersonasSection = ({
  label,
  personas,
  question,
}: {
  label: string;
  personas: PersonaContent[];
  question: string;
}) => (
  <SectionGrid data-section="personas" className="items-start gap-y-16">
    <div className="col-span-12 flex flex-col gap-3 md:col-span-3">
      <SectionLabel>{label}</SectionLabel>
      <div className="flex flex-col gap-16">
        {personas.map((persona) => (
          <PersonaCard key={persona.icon} persona={persona} />
        ))}
      </div>
    </div>
    <h2 className="col-span-12 text-balance text-statement font-bold text-ink md:col-span-5 md:col-start-8">
      {question}
    </h2>
  </SectionGrid>
);

export default PersonasSection;
