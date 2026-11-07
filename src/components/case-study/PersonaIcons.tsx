import type { SVGProps } from "react";
import type { PersonaIconName } from "./types";

// Persona icons from src/assets/icons/Persona1.svg and Persona2.svg, without their background square
// (PersonaCard draws that). Each viewBox is cropped to the icon's frame in Figma (30.16 of the 56.67
// square, i.e. the glyph plus its built-in padding), so both icons share one scale and position.
// Strokes use currentColor and stay 1.5px at any size (non-scaling-stroke).
const strokeProps = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.5,
  strokeLinecap: "round",
  strokeLinejoin: "round",
  vectorEffect: "non-scaling-stroke",
} as const;

const CoordinatorIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg viewBox="19.6 19.6 44.6 44.6" aria-hidden="true" focusable="false" {...props}>
    <g {...strokeProps}>
      <path d="M40.0529 33.7323C40.0529 36.8124 37.556 39.3093 34.4759 39.3093C31.3958 39.3093 28.8989 36.8124 28.8989 33.7323C28.8989 30.6522 31.3958 28.1553 34.4759 28.1553C37.556 28.1553 40.0529 30.6522 40.0529 33.7323Z" />
      <path d="M25.4041 51.5788C25.4041 49.1727 26.3598 46.8653 28.0612 45.1639C29.7625 43.4626 32.0699 42.5068 34.476 42.5068C36.882 42.5068 39.1895 43.4626 40.8908 45.1639C42.5921 46.8653 43.5479 49.1727 43.5479 51.5788" />
      <path d="M53.6609 30.7578C53.6609 32.3184 52.3958 33.5835 50.8352 33.5835C49.2746 33.5835 48.0095 32.3184 48.0095 30.7578C48.0095 29.1972 49.2746 27.9321 50.8352 27.9321C52.3958 27.9321 53.6609 29.1972 53.6609 30.7578Z" />
      <path d="M53.6609 41.9121C53.6609 43.4727 52.3958 44.7378 50.8352 44.7378C49.2746 44.7378 48.0095 43.4727 48.0095 41.9121C48.0095 40.3515 49.2746 39.0864 50.8352 39.0864C52.3958 39.0864 53.6609 40.3515 53.6609 41.9121Z" />
      <path d="M61.8406 53.0659C61.8406 54.6265 60.5755 55.8916 59.0149 55.8916C57.4543 55.8916 56.1892 54.6265 56.1892 53.0659C56.1892 51.5053 57.4543 50.2402 59.0149 50.2402C60.5755 50.2402 61.8406 51.5053 61.8406 53.0659Z" />
      <path d="M50.8352 33.5835V39.0861" />
      <path d="M50.8352 44.7378V53.0661H56.1891" />
    </g>
  </svg>
);

const SalesIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg viewBox="20.28 20.28 45.96 45.96" aria-hidden="true" focusable="false" {...props}>
    <g {...strokeProps}>
      <path d="M41.3487 34.8363C41.3487 38.0098 38.7761 40.5823 35.6027 40.5823C32.4293 40.5823 29.8567 38.0098 29.8567 34.8363C29.8567 31.6629 32.4293 29.0903 35.6027 29.0903C38.7761 29.0903 41.3487 31.6629 41.3487 34.8363Z" />
      <path d="M26.2559 53.2233C26.2559 50.7444 27.2406 48.367 28.9935 46.6141C30.7464 44.8612 33.1238 43.8765 35.6027 43.8765C38.0816 43.8765 40.459 44.8612 42.2119 46.6141C43.9648 48.367 44.9495 50.7444 44.9495 53.2233" />
      <path d="M61.9577 54.6026C61.9577 58.4954 58.802 61.6511 54.9093 61.6511C51.0165 61.6511 47.8608 58.4954 47.8608 54.6026C47.8608 50.7099 51.0165 47.5542 54.9093 47.5542C58.802 47.5542 61.9577 50.7099 61.9577 54.6026Z" />
      <path d="M51.998 54.7559L54.2964 57.0543L58.5868 52.4575" />
    </g>
  </svg>
);

const ICONS: Record<PersonaIconName, typeof CoordinatorIcon> = {
  coordinator: CoordinatorIcon,
  sales: SalesIcon,
};

const PersonaIcon = ({ name, ...props }: { name: PersonaIconName } & SVGProps<SVGSVGElement>) => {
  const Icon = ICONS[name];
  return <Icon {...props} />;
};

export default PersonaIcon;
