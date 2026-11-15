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
import type { CaseStudyContent } from "@/components/case-study/types";

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
  // Copy and accent colours for the coded case study sections (src/components/case-study).
  caseStudy?: CaseStudyContent;
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
    caseStudy: {
      accent: "218 75.6% 46.7%", // #1D5FD1
      accentStrong: "218.9 56.9% 12.7%", // #0E1B33
      hero: ["Every step looks late.", "Know which one to chase."],
      statement: [
        "Mid-build, several things go wrong at once.",
        "Which one do you fix first, when every fix",
        "moves something else down the line?",
      ],
      overview: {
        left: [
          {
            label: "ROLE",
            paragraphs: [
              [
                [{ text: "Self-initiated concept.", bold: true }],
                "Product strategy, UX/UI and a coded prototype, built on a background in architecture and hands-on work",
                "coordinating store builds.",
              ],
            ],
          },
          {
            label: "KEY DECISIONS",
            paragraphs: [
              [
                [
                  {
                    text: "Rank problems by how much they hold up the steps after them and the launch, not by how late they are.",
                    bold: true,
                  },
                ],
              ],
              [
                [{ text: "The AI drafts the nudge;", bold: true }],
                [{ text: "the coordinator makes the call.", bold: true }],
              ],
            ],
          },
          {
            label: "OUTCOME",
            paragraphs: [
              [
                [
                  {
                    text: "A clickable coded prototype of the core flow. Designed so the coordinator stops walking the floor to find out what’s stuck.",
                    bold: true,
                  },
                ],
              ],
            ],
          },
        ],
        right: [
          {
            label: "THE PROBLEM",
            heading: "The plan was never the problem.",
            paragraphs: [
              [
                "A store rebuild is planned down to the shift. Once it starts, several steps slip at once. The updates land in different chats and emails, and none of them says what it holds up. So the coordinator walks the floor to see what’s really done, and works out alone which slip to chase first. Existing tools track that status but don’t triage consequence.",
              ],
            ],
          },
          {
            label: "APPROACH",
            paragraphs: [
              [
                "The research was the job.",
                "I’ve run these builds, sequencing trades, chasing handoffs, absorbing the gaps myself.",
              ],
              [
                "Field-ops tools track compliance across many stores; construction schedulers assume everyone watches the plan. Neither weighs what one slipped step costs the steps after it.",
              ],
            ],
          },
        ],
      },
      dots: {
        count: 12,
        raisedSlot: 4,
        description: "One blocked step holds up every step after it.",
      },
      personas: {
        label: "PERSONAS",
        items: [
          {
            icon: "coordinator",
            text: [
              [
                { text: "Coordinator", bold: true },
                { text: " runs the build and needs to know which problem to fix first when several land at once." },
              ],
            ],
          },
          {
            icon: "sales",
            text: [
              [
                { text: "Sales", bold: true },
                { text: " does the physical work and confirms each step, but rarely reads email or formal channels." },
              ],
            ],
          },
        ],
      },
      question:
        "How might we help a coordinator decide which problem to fix first, using signals the team already produces, without adding work for the people on the floor?",
      chainIntro: {
        heading: "First, map how a build actually chains",
        paragraphs: [
          [
            "Before any screen, I mapped the real dependency chain;",
            "what waits on what, what resolves itself, what needs a human.",
            "That map is what the tool reasons over and what the AI later reads for risk.",
          ],
        ],
      },
      chain: {
        label: "Dependency chain diagram",
        steps: [
          { title: "Clear-out", owner: "Facilities" },
          { title: "Wall", owner: "Carpentry" },
          { title: "Paint / Graphics", owner: "Carpentry / Graphics team" },
        ],
        dependencyNote: ["Dependency, not a checklist item.", "One step can’t start until the one before it clears."],
        ownerNote: ["Owner is a position, not a person.", "Whoever’s on that shift picks it up."],
        gate: "+24h dry time",
        gateDecision: [
          { kind: "dropped", label: "DROPPED", lines: ["Drying as a step someone confirms"] },
          {
            kind: "chose",
            label: "CHOSE",
            lines: [
              "A time gate, not a task.",
              "Nobody works the dry time",
              "but nothing downstream starts until it clears.",
            ],
          },
        ],
        liftedStep: { title: "Racking", owner: "Sales / Floor" },
        addStep: "+ Add step",
        unplaced: {
          label: "UNPLACED",
          steps: [
            { title: "Electrical", owner: "Electrician" },
            { title: "Assembly", owner: "Assembly team", tag: "System-read · AssemblyHub" },
          ],
          note: [
            "Most steps need a one-tap confirm from the floor.",
            "This one’s status is read from an existing system instead.",
          ],
        },
      },
      boardIntro: {
        heading: "One build, one board",
        paragraphs: [
          ["Every step leads with its state, so the board answers “where are we” before anyone asks."],
          ["Below the chain, the AI flags the one step worth chasing.", "It gets its own section further down."],
        ],
      },
      board: {
        decision: [
          { kind: "dropped", label: "DROPPED", lines: ["A board of every build in the store"] },
          {
            kind: "chose",
            label: "CHOSE",
            lines: ["A coordinator runs one build at a time.", "Crews shared across builds are a manager’s call."],
          },
        ],
        annotation: "Where a system already knows (AssemblyHub), the board reads it.",
        caption:
          "Where no system can, it takes one tap from the floor. Paint is checked on site; racking is confirmed from the floor.",
        boardAlt:
          "Build board for one store rebuild: a dependency chain with Assembly done, Paint at risk before a 24-hour dry time, and Racking and Signage waiting, with a status card for each step.",
        aiAlt:
          "AI assessment card recommending a nudge on tomorrow’s paint, because a slip would cost the June 18 launch its only buffer day, with Details, Dismiss risk and Nudge actions.",
      },
      floorIntro: {
        // Non-breaking space: text-balance never splits "the floor"
        heading: "The confirmation the\u00A0floor will actually send",
        paragraphs: [
          ["The same loop from the other side of the glass:", "what the coordinator nudges lands here as one light task."],
          [
            "Confirming costs one tap, so people who never answer email still send the signal back: a tap when it’s done, a reason when it isn’t.",
          ],
        ],
      },
      floor: {
        alts: {
          unclaimed: "Floor app task: Racking, unclaimed, due today at 6:00 PM, with an “I’ll take this” button.",
          claimed: "The task claimed by you at 3:10 PM, with a “Mark done” button and a “Not ready” link.",
          done: "The task marked done by Sales floor at 5:42 PM.",
          notReady:
            "A sheet asking “Why isn’t this ready?”: Paint isn’t finished, Racking not on site, Not enough people this shift, Something else.",
          blocked: "The task blocked, reason “Paint isn’t finished”, flagged by Sales floor at 4:15 PM.",
        },
        captions: {
          claimed: "One tap makes it yours, and the coordinator sees who has it.",
          done: "Closed and auditable; full trail from claim to done.",
        },
        unclaimedDecision: [
          { kind: "dropped", label: "DROPPED", lines: ["A manager assigns it to a name"] },
          {
            kind: "chose",
            label: "CHOSE",
            lines: ["The task hangs on the shift-position, not a name.", "Anyone on shift can take it."],
          },
        ],
        claimedEdges: [
          {
            kind: "edge",
            label: "EDGE",
            lines: [
              "Offline on the floor, the tap queues locally; the coordinator sees green only after sync.",
              "The UI never shows a state it can’t back up.",
            ],
          },
          {
            kind: "edge",
            label: "EDGE",
            lines: ["A claimed task can be handed to another position, with a trace of who passed it to whom."],
          },
        ],
        blockedDecision: [
          { kind: "dropped", label: "DROPPED", lines: ["A chat thread nobody actually reads"] },
          { kind: "chose", label: "CHOSE", lines: ["A structured reason with a clear next step."] },
        ],
        arrows: {
          claim: "Tap “I’ll take this”",
          markDone: "Tap “Mark done”",
          notReady: "Tap “Not ready”",
          reason: "Pick a reason",
        },
        altPathLabel: "If it isn’t ready",
        takeaway: ["Effort rises only where the signal is worth more:", "done is one tap, a problem is one extra screen."],
      },
      aiIntro: {
        heading: "Late isn’t the same as at risk",
        paragraphs: [
          [
            "Several steps look late at once, so a coordinator either chases all of them or misses the one that matters. The AI reads the live chain and ranks the steps by what hangs on them and puts the one that can still cost the launch on top.",
          ],
          ["It drafts the nudge; it never sends it."],
          ["The call stays the coordinator’s."],
        ],
      },
      aiPanel: [
        {
          screen: "assessed",
          alt: "AI assessment marking paint at risk: booked for Jun 14 but not confirmed, with a “Nudge Carpentry team” button.",
          note: ["The risky step isn’t late yet.", "Paint is booked, but nobody has confirmed it."],
        },
        {
          screen: "next",
          alt: "What happens next, projected by AI: if paint is done tomorrow the launch keeps its buffer; if it slips a day the buffer is gone.",
          decision: [
            { kind: "dropped", label: "DROPPED", lines: ["Rank by deadline"] },
            { kind: "chose", label: "CHOSE", lines: ["Rank by what the delay costs the launch.", "Both outcomes are spelled out."] },
          ],
        },
        {
          screen: "chain",
          alt: "Where paint sits in the chain: Assembly done, Paint at risk, a 24-hour dry time, then Racking, Signage and the locked Jun 18 launch, with the cost of a slip.",
          note: ["A checklist can’t show racking and signage frozen behind paint. The chain can."],
        },
        {
          screen: "signage",
          alt: "Why Signage isn’t flagged: its delivery is late, but it isn’t installed until Jun 16, so it blocks nothing before then.",
          note: [
            "The late step is explained, not hidden.",
            "Signage slipped but blocks nothing before Jun 16, so it stays off the list.",
          ],
        },
        {
          screen: "evidence",
          alt: "Evidence list with a source for each line: paint not confirmed (on-site check), Assembly closed Jun 11 (AssemblyHub), 24-hour dry time (chain setup), launch Jun 18 (locked).",
          note: [
            "Every line names its source: read from a system, checked on site, or set in the plan.",
            "The AI’s own judgement is labelled as the AI’s.",
          ],
        },
      ],
    },
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
