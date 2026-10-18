import cho7Main from "@/assets/projects/cho7-main.png?webp";
import mr90Main from "@/assets/projects/mr90-main.png?webp";
import matchpointMain from "@/assets/projects/matchpoint-main.png?webp";
import Risk_Dash_main from "@/assets/projects/Risk_Dash_main.webp";
import NordicPaws_main from "@/assets/projects/NordicPaws_main.webp";
import childrensRoomMain from "@/assets/projects/childrens-room-main.png?webp";
import childrensRoom2Main from "@/assets/projects/childrens-room2-main.png?webp";
import StravaUI_main from "@/assets/projects/StravaUI_main.png?webp";
import yolks_main from "@/assets/projects/yolks_main.png";
import riskTriageThumb from "@/assets/projects/risk-triage-thumb.webp";
import ecommerceThumb from "@/assets/projects/ecommerce-thumb.webp";
import parentingThumb from "@/assets/projects/parenting-thumb.webp";

export type ProjectCollection = "digital" | "interior";

export const PROJECT_COLLECTIONS: Record<
  ProjectCollection,
  { slug: ProjectCollection; title: string }
> = {
  digital: { slug: "digital", title: "Digital Design" },
  interior: { slug: "interior", title: "Interior Design" },
};

export interface ProjectInfo {
  label: string;
  value: string;
}

export interface Project {
  id: string;
  title: string;
  subtitle: string;
  category: string;
  collection: ProjectCollection;
  project: string;
  image?: string;
  // 4:3 thumbnail (1280x960) for the Selected work cards on the home page. A grey placeholder shows until it is set.
  thumbnail?: string;
  thumbnailAlt?: string;
  // Link previews (scripts/generate-og-pages.mjs). Description: about 160 characters at most.
  // ogImage: 1200x630; until it is set the preview uses the thumbnail, then the main image.
  seoDescription?: string;
  ogImage?: string;
  info: ProjectInfo[];
  tagline?: string;
  gallery: string[];
  prototype?: {
    src: string;
    title: string;
    aspectRatio: string;
    align?: "center" | "right";
    frame?: "screen" | "none";
    cropX?: number;
    cropY?: number;
  };
}

export const projects: Project[] = [
  {
    id: "risk-triage-tool",
    title: "Retail build risk triage",
    subtitle: "Retail build risk triage",
    category: "B2B product design",
    collection: "digital",
    project: "Concept",
    image: Risk_Dash_main,
    thumbnail: riskTriageThumb,
    thumbnailAlt: "Risk triage web app on a laptop flagging a paint step at risk, with the task view on a phone",
    seoDescription:
      "B2B concept for retail store builds: a web app that separates late steps from blocked ones and drafts an AI nudge, while the coordinator makes the call.",
    info: [
      { label: "Project", value: "Concept" },
      { label: "Type", value: "Web app" },
    ],
    gallery: [],
  },
  {
    id: "e-commerce-design-system",
    title: "E-commerce design system",
    subtitle: "E-commerce design system",
    category: "B2C product design",
    collection: "digital",
    project: "Nordic Paws · Client work",
    image: NordicPaws_main,
    thumbnail: ecommerceThumb,
    thumbnailAlt: "Pet food online shop on a laptop with product recommendation cards, and a product page on a phone",
    seoDescription:
      "Design task concept: an e-commerce design system and responsive shop for a fictional pet food brand, for desktop and mobile.",
    info: [
      { label: "Project", value: "Nordic Paws · Client work" },
      { label: "Type", value: "Responsive web" },
    ],
    gallery: [],
    prototype: {
      src: "https://embed.figma.com/proto/J9icfPMBsmmUjowFwNm00y/NP_TT_Dora_Ernoic?page-id=24842%3A12164&node-id=28748-10457&starting-point-node-id=28748%3A10457&embed-host=share&hide-ui=1&hotspot-hints=false&scaling=fit-width&content-scaling=fixed&footer=false&device-frame=false",
      title: "Nordic Paws – interactive prototype",
      aspectRatio: "1440 / 900",
      align: "right",
      frame: "screen",
    },
  },
  {
    id: "yolks",
    title: "Parenting activity guidance",
    subtitle: "Parenting activity guidance",
    category: "AI product design",
    collection: "digital",
    project: "Yolks · Concept",
    image: yolks_main,
    thumbnail: parentingThumb,
    thumbnailAlt: "Parenting app dashboard on a laptop showing today's focus, a suggested activity and zone buttons",
    seoDescription:
      "Yolks, an AI-assisted concept web app that suggests activities for parents based on how their child feels: active, calm or overwhelmed. Grounded in neurodesign.",
    info: [
      { label: "Project", value: "Yolks · Concept" },
      { label: "Type", value: "Web app" },
    ],
    tagline: "Neurodesign | Child development | Activity guidance",
    gallery: [],
  },
  {
    id: "matchpoint",
    title: "Tennis partner matching",
    subtitle: "Tennis partner matching",
    category: "Mobile product design",
    collection: "digital",
    project: "MatchPoint · Concept",
    image: matchpointMain,
    seoDescription:
      "MatchPoint, a mobile app concept for finding tennis partners at your level, booking courts and staying motivated through light gamification.",
    info: [
      { label: "Project", value: "MatchPoint · Concept" },
      { label: "Type", value: "Mobile App" },
    ],
    tagline: "Tennis matching | Court booking | Gamification",
    gallery: [],
  },
  {
    id: "stravaui",
    title: "Strava in-run coaching",
    subtitle: "Strava in-run coaching",
    category: "Feature design",
    collection: "digital",
    project: "Concept · Not affiliated with Strava",
    image: StravaUI_main,
    seoDescription:
      "In-run coaching feature concept for Strava, shaped by behavioural insight and interaction design. An independent concept, not affiliated with Strava.",
    info: [
      { label: "Project", value: "Concept · Not affiliated with Strava" },
      { label: "Type", value: "Mobile app" },
    ],
    tagline: "UX concept | Interaction design | Behavioural insight",
    gallery: [],
  },
  {
    id: "cho7",
    title: "CH07",
    subtitle: "Conceptual interior design of a residential space",
    category: "Interior design",
    collection: "interior",
    project: "2025",
    image: cho7Main,
    seoDescription:
      "Residential interior concept: an open-plan kitchen and living area with an island, more natural light and warm, earthy tones, around Wegner's CH07 Shell Chair.",
    info: [
      { label: "Project", value: "2025" },
      { label: "Type", value: "Private apartment" },
    ],
    tagline: "CHO7 - Shell Chair - 1963 - Hans J. Wegner",
    gallery: [],
  },
  {
    id: "mr90",
    title: "MR90",
    subtitle: "Conceptual interior design of a residential space",
    category: "Interior design",
    collection: "interior",
    project: "2025",
    image: mr90Main,
    seoDescription:
      "Master bedroom suite concept: sleeping area, bathroom and walk-in closet in warm tones and dark wood, opening onto the forest, with the Barcelona Chair.",
    info: [
      { label: "Project", value: "2025" },
      { label: "Type", value: "Private housing" },
    ],
    tagline: "MR90 - armchair Barcelona - 1929 - Mies van der Rohe",
    gallery: [],
  },
  {
    id: "childrens-room",
    title: "Children's room",
    subtitle: "Interior design",
    category: "Interior design",
    collection: "interior",
    project: "2025",
    image: childrensRoomMain,
    seoDescription:
      "A sensory-oriented children's room that grows with the child: clear active and calm zones, a sensory wall and movement equipment, based on neurodesign.",
    info: [
      { label: "Project", value: "2025" },
      { label: "Type", value: "Private housing" },
    ],
    tagline: "Sensory-oriented children's environment",
    gallery: [], 
  },
  {
    id: "childrens-room-2",
    title: "Children's room",
    subtitle: "Interior design",
    category: "Interior design",
    collection: "interior",
    project: "2025",
    image: childrensRoom2Main,
    seoDescription:
      "A children's room in a house surrounded by nature: natural light, a large glass wall, natural materials and a climbing wall, guided by neurodesign.",
    info: [
      { label: "Project", value: "2025" },
      { label: "Type", value: "Private housing" },
    ],
    tagline: "Nature-inspired neurodesign space",
    gallery: [],
  },
];

export const isProjectCollection = (
  value: string | undefined,
): value is ProjectCollection => {
  return value === "digital" || value === "interior";
};

export const getProjectsByCollection = (
  collection: ProjectCollection,
): Project[] => {
  return projects.filter((project) => project.collection === collection);
};

export const getProjectById = (id: string): Project | undefined => {
  return projects.find((project) => project.id === id);
};

export const getProjectPath = (project: Project): string => {
  return `/projects/${project.collection}/${project.id}`;
};
