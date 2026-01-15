import cho7Main from "@/assets/projects/cho7-main.png?webp";
import mr90Main from "@/assets/projects/mr90-main.png?webp";
import matchpointMain from "@/assets/projects/matchpoint-main.jpg?webp";
import flowMain from "@/assets/projects/flow-main.png?webp";
import childrensRoomMain from "@/assets/projects/childrens-room-main.png?webp";
import childrensRoom2Main from "@/assets/projects/childrens-room2-main.png?webp";
import pictureBookMain from "@/assets/projects/picture-book-main.png?webp";
import StravaUI_main2 from "@/assets/projects/StravaUI_main2.webp";

export interface ProjectInfo {
  label: string;
  value: string;
}

export interface Project {
  id: string;
  title: string;
  subtitle: string;
  category: string;
  year?: string;
  image?: string;
  info: ProjectInfo[];
  tagline?: string;
  gallery: string[];
}

export const projects: Project[] = [
  {
    id: "cho7",
    title: "CH07",
    subtitle: "Conceptual interior design of a residential space",
    category: "Interior Design",
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
    category: "Interior Design",
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
    id: "matchpoint",
    title: "MatchPoint",
    subtitle: "UX/UI Design",
    category: "UX/UI Design",
    year: "2024",
    image: matchpointMain,
    info: [
      { label: "Year", value: "2024" },
      { label: "Type", value: "Mobile App" },
    ],
    tagline: "MatchPoint - Tennis app case study",
    gallery: [],
  },
  {
   id: "stravaui",
    title: "Strava - Feature concept",
    subtitle: "Product Feature Concept",
    category: "Human behaviour case study",
    year: "2025",
    image: StravaUI_main2,
    info: [
      { label: "Year", value: "2025" },
      { label: "Type", value: "UX Concept | Interaction Design | Behavioural Insight" },
    ],
    tagline: "Run Flow - Decision-minimized in-run guidance",
    gallery: [],
  },
  {
    id: "childrens-room",
    title: "Children's room",
    subtitle: "Interior design",
    category: "Interior Design",
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
    category: "Interior Design",
    year: "2025",
    image: childrensRoom2Main,
    info: [
      { label: "Year", value: "2025" },
      { label: "Type", value: "Private housing" },
    ],
    tagline: "Nature-inspired neurodesign space",
    gallery: [],
  },
  {
    id: "picture-book",
    title: "Educational picture book",
    subtitle: "Digital illustration and storytelling",
    category: "Illustration",
    year: "2025",
    image: pictureBookMain,
    info: [
      { label: "Year", value: "2025" },
      { label: "Type", value: "Educational children's picture book for Varaždin County" },
    ],
    tagline: "Kako je to došlo na moj tanjur?/How did it get to my plate?",
    gallery: [],
  },
  {
    id: "flow",
    title: "Flow",
    subtitle: "UX/UI Design",
    category: "UX/UI Design",
    year: "2025",
    image: flowMain,
    info: [
      { label: "Year", value: "2025" },
      { label: "Type", value: "web | landing page | logo" },
    ],
    tagline: "Flow - Yoga Studio",
    gallery: [],
    },
];

export const getProjectById = (id: string): Project | undefined => {
  return projects.find((project) => project.id === id);
};
