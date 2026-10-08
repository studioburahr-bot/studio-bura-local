import cho7Main from "@/assets/projects/cho7-main.png?webp";
import mr90Main from "@/assets/projects/mr90-main.png?webp";
import matchpointMain from "@/assets/projects/matchpoint-main.png?webp";
import Risk_Dash_main from "@/assets/projects/Risk_Dash_main.webp";
import NordicPaws_main from "@/assets/projects/NordicPaws_main.webp";
import childrensRoomMain from "@/assets/projects/childrens-room-main.png?webp";
import childrensRoom2Main from "@/assets/projects/childrens-room2-main.png?webp";
import StravaUI_main from "@/assets/projects/StravaUI_main.png?webp";
import yolks_main from "@/assets/projects/yolks_main.png";

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
