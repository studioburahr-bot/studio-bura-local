import cho7Main from "@/assets/projects/cho7-main.png?webp";
import mr90Main from "@/assets/projects/mr90-main.png?webp";
import matchpointMain from "@/assets/projects/matchpoint-main.jpg?webp";
import flowMain from "@/assets/projects/flow-main.png?webp";
import childrensRoomMain from "@/assets/projects/childrens-room-main.png?webp";
import childrensRoom2Main from "@/assets/projects/childrens-room2-main.png?webp";
import StravaUI_main2 from "@/assets/projects/StravaUI_main2.webp";
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
  year?: string;
  image?: string;
  info: ProjectInfo[];
  tagline?: string;
  gallery: string[];
}

export const projects: Project[] = [
  {
    id: "yolks",
    title: "Yolks",
    subtitle: "Web product design",
    category: "Web product case study",
    collection: "digital",
    year: "2026",
    image: yolks_main,
    info: [
      { label: "Year", value: "2026" },
      { label: "Type", value: "Web app" },
    ],
    tagline: "Neurodesign | Child development | Activity guidance",
    gallery: [],
  },
  {
    id: "flow",
    title: "Flow",
    subtitle: "Logo design & landing page",
    category: "Web & visual design project",
    collection: "digital",
    year: "2025",
    image: flowMain,
    info: [
      { label: "Year", value: "2025" },
      { label: "Type", value: "Flow - Yoga studio landing page" },
    ],
    tagline: "Brand identity | layout | UX/UI design",
    gallery: [],
  },
  {
    id: "matchpoint",
    title: "MatchPoint",
    subtitle: "UX/UI case study",
    category: "UX/UI case study",
    collection: "digital",
    year: "2024",
    image: matchpointMain,
    info: [
      { label: "Year", value: "2024" },
      { label: "Type", value: "Mobile App" },
    ],
    tagline: "Tennis matching | Court booking | Gamification",
    gallery: [],
  },
  {
    id: "stravaui",
    title: "Strava - Feature concept",
    subtitle: "Product feature concept",
    category: "Human behaviour case study",
    collection: "digital",
    year: "2025",
    image: StravaUI_main2,
    info: [
      { label: "Year", value: "2025" },
      { label: "Type", value: "Run Flow - Decision-minimized in-run guidance" },
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
    year: "2025",
    image: cho7Main,
    info: [
      { label: "Year", value: "2025" },
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
    year: "2025",
    image: mr90Main,
    info: [
      { label: "Year", value: "2025" },
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
    year: "2025",
    image: childrensRoomMain,
    info: [
      { label: "Year", value: "2025" },
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
    year: "2025",
    image: childrensRoom2Main,
    info: [
      { label: "Year", value: "2025" },
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
