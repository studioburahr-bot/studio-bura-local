import { useParams, Link, Navigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import {
  PROJECT_COLLECTIONS,
  getProjectById,
  getProjectPath,
  isProjectCollection,
} from "@/data/projects";
import FigmaPrototypeDevice from "@/components/FigmaPrototypeDevice";
// CHO7 project assets
import cho7Floorplan from "@/assets/projects/cho7-floorplan.png?webp";
import cho7Moodboard from "@/assets/projects/cho7-moodboard.png?webp";
import cho7Render1 from "@/assets/projects/cho7-render-1.png?webp";
import cho7Render2 from "@/assets/projects/cho7-render-2.png?webp";
import cho7Render3 from "@/assets/projects/cho7-render-3.jpg?webp";
import cho7Kitchen1 from "@/assets/projects/cho7-kitchen-1.jpg?webp";
import cho7Kitchen2 from "@/assets/projects/cho7-kitchen-2.jpg?webp";
import cho7Light1 from "@/assets/projects/cho7-light-1.png?webp";
import cho7Light2 from "@/assets/projects/cho7-light-2.png?webp";
import cho7Light3 from "@/assets/projects/cho7-light-3.png?webp";
import cho7Video from "@/assets/projects/cho7-video.mp4";
// MR90 project assets
import mr90Floorplan from "@/assets/projects/mr90-floorplan.png?webp";
import mr90Moodboard from "@/assets/projects/mr90-moodboard.png?webp";
import mr90Render1 from "@/assets/projects/mr90-render-1.jpg?webp";
import mr90Render2 from "@/assets/projects/mr90-render-2.jpg?webp";
import mr90Headboard1 from "@/assets/projects/mr90-headboard-1.jpg?webp";
import mr90Headboard2 from "@/assets/projects/mr90-headboard-2.jpg?webp";
import mr90Light1 from "@/assets/projects/mr90-light-1.jpg?webp";
import mr90Light2 from "@/assets/projects/mr90-light-2.jpg?webp";
import mr90Bathroom1 from "@/assets/projects/mr90-bathroom-1.jpg?webp";
import mr90Bathroom2 from "@/assets/projects/mr90-bathroom-2.jpg?webp";
import mr90Video from "@/assets/projects/mr90-video.mp4";
// MatchPoint project assets
import MP1 from "@/assets/projects/MP_1.webp";
import MP2 from "@/assets/projects/MP_2.webp";
import MP3 from "@/assets/projects/MP_3.webp";
import MP4 from "@/assets/projects/MP_4.webp";
import MP5 from "@/assets/projects/MP_5.webp";
import MP6 from "@/assets/projects/MP_6.webp";
import MP7 from "@/assets/projects/MP_7.webp";
// StravaUI project assets
import StravaUI_01 from "@/assets/projects/StravaUI_01.webp";
import StravaUI_02 from "@/assets/projects/StravaUI_02.webp";
import StravaUI_03 from "@/assets/projects/StravaUI_03.webp";
import StravaUI_04 from "@/assets/projects/StravaUI_04.webp";
import StravaUI_05 from "@/assets/projects/StravaUI_05.webp";
import StravaUI_06 from "@/assets/projects/StravaUI_06.webp";
// Retail store risk triage tool assets
import Risk_Dash_1 from "@/assets/projects/Risk_Dash_1.webp";
import Risk_Dash_2 from "@/assets/projects/Risk_Dash_2.webp";
import Risk_Dash_3 from "@/assets/projects/Risk_Dash_3.webp";
// Children's room project assets
import childrensRoomMain from "@/assets/projects/childrens-room-main.png?webp";
import childrensRoomZones from "@/assets/projects/childrens-room-zones.jpg?webp";
import childrensRoomNeuro1 from "@/assets/projects/childrens-room-neuro1.png?webp";
import childrensRoomNeuro2 from "@/assets/projects/childrens-room-neuro2.png?webp";
import childrensRoomHouse1 from "@/assets/projects/childrens-room-house1.png?webp";
import childrensRoomHouse2 from "@/assets/projects/childrens-room-house2.png?webp";
import childrensRoomActive from "@/assets/projects/childrens-room-active.png?webp";
import childrensRoomCalm from "@/assets/projects/childrens-room-calm.png?webp";
import childrensRoomLight1 from "@/assets/projects/childrens-room-light1.png?webp";
import childrensRoomLight2 from "@/assets/projects/childrens-room-light2.png?webp";
// Children's room 2 project assets
import childrensRoom2Main from "@/assets/projects/childrens-room2-main.png?webp";
import childrensRoom2Nature from "@/assets/projects/childrens-room2-nature.png?webp";
import childrensRoom2Climbing from "@/assets/projects/childrens-room2-climbing.png?webp";
import childrensRoom2Wall from "@/assets/projects/childrens-room2-wall.png?webp";
import childrensRoom2Storage from "@/assets/projects/childrens-room2-storage.png?webp";
// Yolks project assets
import { Eyes } from "@/components/Eyes";
import yolks_01 from "@/assets/projects/Yolks_01.webp?webp";
import yolks_02 from "@/assets/projects/Yolks_02.webp?webp";
import yolks_03 from "@/assets/projects/Yolks_03.webp?webp";
import yolks_04 from "@/assets/projects/Yolks_04.webp?webp";
import yolks_05 from "@/assets/projects/Yolks_05.webp?webp";
import yolks_06 from "@/assets/projects/Yolks_06.webp?webp";




const ProjectDetail = () => {
  const { collection, projectId } = useParams<{ collection: string; projectId: string }>();
  const project = projectId ? getProjectById(projectId) : undefined;

  if (!project || !isProjectCollection(collection)) {
    return (
      <div className="pt-32 pb-16 container mx-auto px-4 sm:px-6 text-center">
        <h1 className="text-4xl font-light mb-8">Project Not Found</h1>
        <Link
          to="/projects"
          className="text-muted-foreground hover:text-foreground transition-colors inline-flex items-center gap-2"
        >
          <ArrowLeft size={20} />
          Back to Projects
        </Link>
      </div>
    );
  }

  if (project.collection !== collection) {
    return <Navigate to={getProjectPath(project)} replace />;
  }

  const collectionTitle = PROJECT_COLLECTIONS[project.collection].title;

  return (
    <>
      {/* Hero Section */}
      <section className="pt-24 sm:pt-32 pb-12 sm:pb-16">
        <div className="container mx-auto px-4 sm:px-6">
          {/* Back Link */}
          <Link
            to={`/projects/${project.collection}`}
            className="inline-flex items-center gap-2 mb-12 sm:mb-16 text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft size={20} />
            Back to {collectionTitle}
          </Link>

          {/* Project Title */}
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-light mb-6 tracking-tight text-foreground">
            {project.subtitle}
          </h1>

          {/* Project Info */}
            <div className="space-y-1 text-sm sm:text-base text-muted-foreground">
              {project.info.map((item, index) => (
                <p key={index}>
                  {item.label}: {item.value}
                </p>
              ))}
            </div>

          {/* Tagline */}
          {project.tagline && (
            <p className="mt-8 text-sm opacity-70 text-muted-foreground">
              {project.tagline}
            </p>
          )}
        </div>
      </section>

      {/* Single Image - 5:4 aspect ratio (hidden for MatchPoint, Risk dashboard and StravUI) */}
      {project.image && project.id !== "matchpoint" && project.id !== "risk-dashboard" && project.id !== "stravaui" && project.id !== "yolks" && (
        <section className="pb-0">
          <div className="max-w-container mx-auto px-4 sm:px-6">
            <div className="aspect-[5/4] overflow-hidden">
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>
          </div>
        </section>
      )}

      {/* Risk dashboard Content */}
      {project.id === "risk-dashboard" && (
        <section className="-mt-8 sm:-mt-12">
          <div className="max-w-container mx-auto px-4 sm:px-6">
            <img src={Risk_Dash_1} className="w-full h-auto" />
            <img src={Risk_Dash_2} className="w-full h-auto" />
            <img src={Risk_Dash_3} className="w-full h-auto" />
          </div>
        </section>
      )}

      {/* About Project Section - only for CHO7 */}
      {project.id === "cho7" && (
        <section className="py-16 sm:py-24">
          <div className="max-w-container mx-auto px-4 sm:px-6 text-center">
            {/* About Project Title */}
            <h2 className="text-xs sm:text-sm uppercase tracking-[0.2em] text-muted-foreground mb-8 sm:mb-12">
              About project
            </h2>

            {/* First Paragraph */}
            <p className="text-sm sm:text-base leading-relaxed text-muted-foreground mb-6 sm:mb-8">
              The clients had a clear vision: a kitchen island for occasional meals, more natural light, an open and fluid layout, and a kitchen without upper cabinetry. They also wished for a cozy evening atmosphere, with neutral, warm tones and earthy colors that create a sense of calm and intimacy.
            </p>

            {/* Second Paragraph */}
            <p className="text-sm sm:text-base leading-relaxed text-muted-foreground">
              To meet their needs, the partition wall was removed to create a unified open-plan kitchen and living area. The entrance was repositioned to allow a more natural circulation flow, resulting in improved spatial logic, better light distribution, and a brighter atmosphere.
            </p>
          </div>

          {/* Floor Plan Image */}
          <div className="mt-16 sm:mt-24 max-w-container mx-auto px-4 sm:px-6">
            <img
              src={cho7Floorplan}
              alt="Floor plan before and after"
              className="w-full h-auto"
              loading="lazy"
            />
          </div>

          {/* Moodboard Title */}
          <h2 className="text-xs sm:text-sm uppercase tracking-[0.2em] text-muted-foreground mt-16 sm:mt-24 mb-8 sm:mb-12 text-center">
            Moodboard
          </h2>

          {/* Moodboard Image */}
          <div className="max-w-container mx-auto px-4 sm:px-6">
            <img
              src={cho7Moodboard}
              alt="Project moodboard"
              className="w-full h-auto"
              loading="lazy"
            />
          </div>

          {/* Values & Concept Title */}
          <h2 className="text-xs sm:text-sm uppercase tracking-[0.2em] text-muted-foreground mt-16 sm:mt-24 mb-8 sm:mb-12 text-center">
            Values & Concept
          </h2>

          {/* Values & Concept Text */}
          <div className="max-w-container mx-auto px-4 sm:px-6 text-center">
            <p className="text-sm sm:text-base leading-relaxed text-muted-foreground mb-6 sm:mb-8">
              The concept balances aesthetics, functionality, and environmental consciousness, focusing on how the space supports everyday life.
            </p>
            <p className="text-sm sm:text-base leading-relaxed text-muted-foreground">
              In the living area, a deep green centerpiece anchors the space, complemented by wood and anthracite elements for depth and contrast. Subtle details, like the Arigato wall lamps by local brand Grupa Studio, add rhythm and intimacy to evening routines while reinforcing the project's commitment to sustainability and local production. The timeless CH07 Shell Chair by Hans J. Wegner introduces an iconic design reference, elevating the interior with a piece that embodies both heritage and sculptural elegance.
            </p>
          </div>

          {/* Render Images */}
          <div className="mt-16 sm:mt-24 max-w-container mx-auto px-4 sm:px-6 space-y-8 sm:space-y-12">
            <img
              src={cho7Render1}
              alt="Living room render"
              className="w-full h-auto"
              loading="lazy"
            />
            <img
              src={cho7Render2}
              alt="Living room angle render"
              className="w-full h-auto"
              loading="lazy"
            />
            <img
              src={cho7Render3}
              alt="Kitchen and living area render"
              className="w-full h-auto"
              loading="lazy"
            />
          </div>

          {/* Kitchen Text */}
          <div className="mt-16 sm:mt-24 max-w-[800px] mx-auto px-4 sm:px-6 text-center">
            <p className="text-sm sm:text-base leading-relaxed text-muted-foreground">
              The kitchen island invites casual meals and conversation, while the open layout and absence of upper cabinetry maximize natural light and fluidity.
            </p>
          </div>

          {/* Kitchen Images Side by Side */}
          <div className="mt-12 sm:mt-16 max-w-container mx-auto px-4 sm:px-6 grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
            <img
              src={cho7Kitchen1}
              alt="Kitchen detail render"
              className="w-full h-auto"
              loading="lazy"
            />
            <img
              src={cho7Kitchen2}
              alt="Kitchen hood render"
              className="w-full h-auto"
              loading="lazy"
            />
          </div>

          {/* Light Title */}
          <h2 className="text-xs sm:text-sm uppercase tracking-[0.2em] text-muted-foreground mt-16 sm:mt-24 mb-8 sm:mb-12 text-center">
            Light
          </h2>

          {/* Light Images - Three in a row */}
          <div className="max-w-container mx-auto px-4 sm:px-6 grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
            <img
              src={cho7Light1}
              alt="Evening lighting render"
              className="w-full h-auto"
              loading="lazy"
            />
            <img
              src={cho7Light2}
              alt="Night lighting render"
              className="w-full h-auto"
              loading="lazy"
            />
            <img
              src={cho7Light3}
              alt="Daylight render"
              className="w-full h-auto"
              loading="lazy"
            />
          </div>

          {/* Closing Text */}
          <div className="mt-16 sm:mt-24 max-w-[800px] mx-auto px-4 sm:px-6 text-center">
            <p className="text-sm sm:text-base leading-relaxed text-muted-foreground">
              The result is a home that feels warm, fluid, and personal - a design that gently enhances daily rituals.
            </p>
          </div>

          {/* Video */}
          <div className="mt-16 sm:mt-24 max-w-container mx-auto px-4 sm:px-6">
            <video
              autoPlay
              muted
              loop
              playsInline
              className="w-full h-auto"
            >
              <source src={cho7Video} type="video/mp4" />
            </video>
          </div>
        </section>
      )}

      {/* MR90 Project Content */}
      {project.id === "mr90" && (
        <section className="py-16 sm:py-24">
          <div className="max-w-container mx-auto px-4 sm:px-6 text-center">
            {/* About Project Title */}
            <h2 className="text-xs sm:text-sm uppercase tracking-[0.2em] text-muted-foreground mb-8 sm:mb-12">
              About project
            </h2>

            {/* About Text */}
            <p className="text-sm sm:text-base leading-relaxed text-muted-foreground">
              The master bedroom is designed as a private retreat divided into three connected zones: the sleeping area, master bathroom, and walk-in closet. The concept emphasizes warm tones and the use of dark wood, which extends across the custom-made headboard that also functions as discreet storage.
            </p>
          </div>

          {/* Floor Plan Image */}
          <div className="mt-16 sm:mt-24 max-w-[1400px] mx-auto px-4 sm:px-6">
            <img
              src={mr90Floorplan}
              alt="Floor plan"
              className="w-full h-auto"
              loading="lazy"
            />
          </div>

          {/* Moodboard Title */}
          <h2 className="text-xs sm:text-sm uppercase tracking-[0.2em] text-muted-foreground mt-16 sm:mt-24 mb-8 sm:mb-12 text-center">
            Moodboard
          </h2>

          {/* Moodboard Image */}
          <div className="max-w-container mx-auto px-4 sm:px-6">
            <img
              src={mr90Moodboard}
              alt="Project moodboard"
              className="w-full h-auto"
              loading="lazy"
            />
          </div>

          {/* Values & Concept Title */}
          <h2 className="text-xs sm:text-sm uppercase tracking-[0.2em] text-muted-foreground mt-16 sm:mt-24 mb-8 sm:mb-12 text-center">
            Values & Concept
          </h2>

          {/* Values & Concept Text */}
          <div className="max-w-container mx-auto px-4 sm:px-6 text-center">
            <p className="text-sm sm:text-base leading-relaxed text-muted-foreground mb-6 sm:mb-8">
              The concept is guided by a sense of calm, balance, and intimacy, emphasizing how materiality and light shape the atmosphere of rest. A large glazed wall opens the room toward the surrounding forest, allowing natural light to flow in and blurring the boundary between interior and nature.
            </p>
            <p className="text-sm sm:text-base leading-relaxed text-muted-foreground">
              The timeless Barcelona Chair by Ludwig Mies van der Rohe introduces an iconic design reference, enhancing the interior with a piece that embodies modernist elegance and craftsmanship.
            </p>
          </div>

          {/* Render Images */}
          <div className="mt-16 sm:mt-24 max-w-container mx-auto px-4 sm:px-6 space-y-8 sm:space-y-12">
            <img
              src={mr90Render1}
              alt="Bedroom render with forest view"
              className="w-full h-auto"
              loading="lazy"
            />
            <img
              src={mr90Render2}
              alt="Bedroom render interior"
              className="w-full h-auto"
              loading="lazy"
            />
          </div>

          {/* Headboard Text */}
          <div className="mt-16 sm:mt-24 max-w-[800px] mx-auto px-4 sm:px-6 text-center">
            <p className="text-sm sm:text-base leading-relaxed text-muted-foreground">
              Crafted in dark wood, the custom-made headboard serves as both a visual and functional piece of the bedroom. Extending across the entire wall, it integrates upper storage compartments and discreet cabinets positioned at both ends beside the nightstands.
            </p>
          </div>

          {/* Headboard Images Side by Side */}
          <div className="mt-12 sm:mt-16 max-w-container mx-auto px-4 sm:px-6 grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
            <img
              src={mr90Headboard1}
              alt="Headboard detail"
              className="w-full h-auto"
              loading="lazy"
            />
            <img
              src={mr90Headboard2}
              alt="Headboard storage detail"
              className="w-full h-auto"
              loading="lazy"
            />
          </div>

          {/* Light Title */}
          <h2 className="text-xs sm:text-sm uppercase tracking-[0.2em] text-muted-foreground mt-16 sm:mt-24 mb-8 sm:mb-12 text-center">
            Light
          </h2>

          {/* Light Text */}
          <div className="max-w-container mx-auto px-4 sm:px-6 text-center">
            <p className="text-sm sm:text-base leading-relaxed text-muted-foreground mb-6 sm:mb-8">
              The String Light by Michael Anastassiades functions not only as illumination but also as an integral design element, visually accentuating the wall behind the bed.
            </p>
            <p className="text-sm sm:text-base leading-relaxed text-muted-foreground">
              At the end of the hallway, a full-height mirror extends across the wall, creating an illusion of greater depth and offering intriguing reflections when viewed from the bedroom.
            </p>
          </div>

          {/* Light Images Side by Side */}
          <div className="mt-12 sm:mt-16 max-w-container mx-auto px-4 sm:px-6 grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
            <img
              src={mr90Light1}
              alt="Hallway daylight view"
              className="w-full h-auto"
              loading="lazy"
            />
            <img
              src={mr90Light2}
              alt="Hallway evening view"
              className="w-full h-auto"
              loading="lazy"
            />
          </div>

          {/* Bathroom Title */}
          <h2 className="text-xs sm:text-sm uppercase tracking-[0.2em] text-muted-foreground mt-16 sm:mt-24 mb-8 sm:mb-12 text-center">
            Bathroom
          </h2>

          {/* Bathroom Text */}
          <div className="max-w-container mx-auto px-4 sm:px-6 text-center">
            <p className="text-sm sm:text-base leading-relaxed text-muted-foreground mb-6 sm:mb-8">
              The master bathroom combines warm ceramic tones with dark wood elements, visually linking it to the adjoining bedroom.
            </p>
            <p className="text-sm sm:text-base leading-relaxed text-muted-foreground">
              A bathtub replaces the shower, emphasizing the idea of relaxation and retreat — a hallmark of master bathrooms designed as personal wellness spaces rather than purely functional ones.
            </p>
          </div>

          {/* Bathroom Images Side by Side */}
          <div className="mt-12 sm:mt-16 max-w-container mx-auto px-4 sm:px-6 grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
            <img
              src={mr90Bathroom1}
              alt="Bathroom bathtub detail"
              className="w-full h-auto"
              loading="lazy"
            />
            <img
              src={mr90Bathroom2}
              alt="Bathroom vanity view"
              className="w-full h-auto"
              loading="lazy"
            />
          </div>

          {/* Closing Text */}
          <div className="mt-16 sm:mt-24 max-w-[800px] mx-auto px-4 sm:px-6 text-center">
            <p className="text-sm sm:text-base leading-relaxed text-muted-foreground">
              Every element - from the custom woodwork to the play of light and reflections, contributes to an atmosphere that feels calm, timeless, and deeply personal. The result is a home that gently supports everyday life.
            </p>
          </div>

          {/* Video */}
          <div className="mt-16 sm:mt-24 max-w-container mx-auto px-4 sm:px-6">
            <video
              autoPlay
              muted
              loop
              playsInline
              className="w-full h-auto"
            >
              <source src={mr90Video} type="video/mp4" />
            </video>
          </div>
        </section>

      )}

      {/* MatchPoint Project Content */}
      {project.id === "matchpoint" && (
  <section className="-mt-8 sm:-mt-12">
    <div className="max-w-container mx-auto px-4 sm:px-6">
      <img src={MP1} className="w-full h-auto" />
      <img src={MP2} className="w-full h-auto" />
      <img src={MP3} className="w-full h-auto" />
      <img src={MP4} className="w-full h-auto" />
      <img src={MP5} className="w-full h-auto" />
      <img src={MP6} className="w-full h-auto" />
      <div className="w-full bg-[#191919] py-16 sm:py-20 flex justify-center">
        <FigmaPrototypeDevice
          embedSrc="https://embed.figma.com/proto/ZavejYTUWAdyafT2j8iHkk/MP-wireframes?node-id=199-2106&p=f&scaling=scale-down&content-scaling=fixed&page-id=0%3A1&starting-point-node-id=54%3A522&embed-host=share"
          figmaUrl="https://www.figma.com/proto/ZavejYTUWAdyafT2j8iHkk/MP-wireframes"
          title="MatchPoint Figma prototype"
        />
      </div>
      <img src={MP7} className="w-full h-auto" />
    </div>
  </section>
)}

      {/* Children's Room About Project Section */}
      {project.id === "childrens-room" && (
        <section className="py-16 sm:py-24">
          <div className="max-w-container mx-auto px-4 sm:px-6 text-center">
            <h2 className="text-xs sm:text-sm uppercase tracking-[0.2em] text-muted-foreground mb-8 sm:mb-12">
              About project
            </h2>

            <p className="text-sm sm:text-base leading-relaxed text-muted-foreground mb-6 sm:mb-8">
              This children's room was designed as a sensory-oriented environment that grows with the child through play, movement, and imagination.
            </p>

            <p className="text-sm sm:text-base leading-relaxed text-muted-foreground">
              The project explores how spatial flow, sensory stimulation, and clear zoning can support a child's neurological, emotional, and motor development.
            </p>
          </div>
        </section>
      )}

      {/* Children's Room Zones Image & Text */}
      {project.id === "childrens-room" && (
        <section className="py-2 sm:py-4">
          <div className="max-w-container mx-auto px-4 sm:px-6">
            <img
              src={childrensRoomZones}
              alt="Children's room zones diagram"
              className="w-full h-auto mb-4 sm:mb-6"
            />

            <div className="max-w-container mx-auto text-center">
              <p className="text-sm sm:text-base leading-relaxed text-muted-foreground mb-6 sm:mb-8">
                The room is organized into distinct yet interconnected zones — a sensory wall, sensory activity equipment area, toy storage, sitting area, and sleeping area. This structure enables flexible use of space and intuitive movement, allowing the environment to adapt to the child's changing needs over time.
              </p>

              <p className="text-sm sm:text-base leading-relaxed text-muted-foreground">
                Through carefully designed sensory activities and predictable movement patterns, the room becomes more than a functional interior — it becomes a supportive framework for learning, exploration, and emotional regulation.
              </p>
            </div>
          </div>
        </section>
      )}

      {/* Children's Room Values & Concept Section */}
      {project.id === "childrens-room" && (
        <section className="py-16 sm:py-24">
          <div className="max-w-container mx-auto px-4 sm:px-6 text-center">
            <h2 className="text-xs sm:text-sm uppercase tracking-[0.2em] text-muted-foreground mb-8 sm:mb-12">
              Values & Concept
            </h2>

            <p className="text-sm sm:text-base leading-relaxed text-muted-foreground">
              The project is rooted in neurodesign principles, recognizing the connection between spatial design and the nervous system. Predictable circulation, clear zoning, and balanced sensory input help create a sense of safety, support self-regulation, and encourage sensory integration.
            </p>
          </div>

          <div className="max-w-container mx-auto px-4 sm:px-6 mt-16 sm:mt-24">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
              <img
                src={childrensRoomNeuro1}
                alt="Children's room sensory design"
                className="w-full h-auto"
              />
              <img
                src={childrensRoomNeuro2}
                alt="Children's room pegboard wall"
                className="w-full h-auto"
              />
            </div>
          </div>

          <div className="max-w-container mx-auto px-4 sm:px-6 text-center mt-16 sm:mt-24">
            <p className="text-sm sm:text-base leading-relaxed text-muted-foreground">
              The space is divided into active zones (play and movement) and calm zones (sitting and sleeping), connected through a clear and intuitive flow from the entrance toward the glass wall and terrace. This circulation supports natural transitions between activity and rest, helping the child move through the space with ease and confidence.
            </p>
          </div>

          {/* House images */}
          <div className="max-w-container mx-auto px-4 sm:px-6 mt-16 sm:mt-24">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
              <img
                src={childrensRoomHouse1}
                alt="Children's room storage house"
                className="w-full h-auto"
              />
              <img
                src={childrensRoomHouse2}
                alt="Children's room play house"
                className="w-full h-auto"
              />
            </div>
          </div>

          <div className="max-w-container mx-auto px-4 sm:px-6 text-center mt-16 sm:mt-24">
            <p className="text-sm sm:text-base leading-relaxed text-muted-foreground">
              Climbing elements, a swing, gymnastic rings, and soft balance forms create a dynamic sensory landscape. These elements encourage exploration through movement, touch, and balance, supporting both gross and fine motor development.
            </p>
          </div>

          {/* Active and calm zone images */}
          <div className="max-w-container mx-auto px-4 sm:px-6 mt-16 sm:mt-24">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
              <img
                src={childrensRoomActive}
                alt="Children's room active zone"
                className="w-full h-auto"
              />
              <img
                src={childrensRoomCalm}
                alt="Children's room calm zone"
                className="w-full h-auto"
              />
            </div>
          </div>

          <div className="max-w-container mx-auto px-4 sm:px-6 text-center mt-16 sm:mt-24">
            <p className="text-sm sm:text-base leading-relaxed text-muted-foreground">
              The sensory wall features a perforated system that allows elements to be rearranged, added, or removed. This enables the sensory activity area to expand or contract over time, ensuring the room evolves alongside the child.
            </p>
          </div>

          {/* Light images */}
          <div className="max-w-container mx-auto px-4 sm:px-6 mt-16 sm:mt-24">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
              <img
                src={childrensRoomLight1}
                alt="Children's room night lighting"
                className="w-full h-auto"
              />
              <img
                src={childrensRoomLight2}
                alt="Children's room sleep zone lighting"
                className="w-full h-auto"
              />
            </div>
          </div>

          <div className="max-w-container mx-auto px-4 sm:px-6 text-center mt-16 sm:mt-24">
            <p className="text-sm sm:text-base leading-relaxed text-muted-foreground">
              Soft, warm lighting supports nervous system regulation and gently prepares the body for rest and sleep.
            </p>
          </div>
        </section>
      )}

      {/* Children's Room 2 - About Project */}
      {project.id === "childrens-room-2" && (
        <section className="py-16 sm:py-24">
          <div className="max-w-container mx-auto px-4 sm:px-6 text-center">
            <h2 className="text-xs sm:text-sm uppercase tracking-[0.2em] text-muted-foreground mb-8 sm:mb-12">
              About project
            </h2>
            <p className="text-sm sm:text-base leading-relaxed text-muted-foreground">
              This children's room is part of a house surrounded by nature, where the landscape becomes an integral element of the interior experience. Natural light takes a leading role in the design, shaping the atmosphere and supporting sensory balance.
            </p>
            <p className="text-sm sm:text-base leading-relaxed text-muted-foreground mt-6">
              A large glass wall opens the room toward the outdoors, offering views of treetops, sky, and the changing play of light and shadow. These visual connections activate the visual system, reduce sensory overload, and have a calming effect on the nervous system.
            </p>
          </div>

          {/* Nature view image */}
          <div className="max-w-container mx-auto px-4 sm:px-6 mt-16 sm:mt-24">
            <img
              src={childrensRoom2Nature}
              alt="Children's room with nature view and climbing wall"
              className="w-full h-auto"
              loading="lazy"
            />
          </div>
        </section>
      )}

      {/* Children's Room 2 - Values & Concept */}
      {project.id === "childrens-room-2" && (
        <section className="py-16 sm:py-24">
          <div className="max-w-container mx-auto px-4 sm:px-6 text-center">
            <h2 className="text-xs sm:text-sm uppercase tracking-[0.2em] text-muted-foreground mb-8 sm:mb-12">
              Values & Concept
            </h2>
            <p className="text-sm sm:text-base leading-relaxed text-muted-foreground">
              The surrounding natural environment directly influenced the choice of materials, colors, and spatial atmosphere. Soft tones, natural textures, and warm materials were selected to reflect the outdoor context and create a sense of calm and continuity between inside and outside.
            </p>
            <p className="text-sm sm:text-base leading-relaxed text-muted-foreground mt-6">
              Designed through neurodesign principles, the space supports the child's nervous system by combining natural light, clear spatial organization, and balanced sensory input. The room encourages exploration and movement, while also offering moments of rest and regulation.
            </p>
          </div>

          {/* Climbing wall image */}
          <div className="max-w-container mx-auto px-4 sm:px-6 mt-16 sm:mt-24">
            <img
              src={childrensRoom2Climbing}
              alt="Children's room interior with climbing wall and wooden elements"
              className="w-full h-auto"
              loading="lazy"
            />
          </div>

          {/* Multifunctional wall text */}
          <div className="max-w-container mx-auto px-4 sm:px-6 text-center mt-16 sm:mt-24">
            <p className="text-sm sm:text-base leading-relaxed text-muted-foreground">
              The central element is a multifunctional wall that allows flexible integration of sensory and movement elements. A large lounging net, built-in storage, and a system with an integrated climbing wall create opportunities for play, rest, and physical activity within a single, adaptable structure.
            </p>
          </div>

          {/* Wall with shelves image */}
          <div className="max-w-container mx-auto px-4 sm:px-6 mt-16 sm:mt-24">
            <img
              src={childrensRoom2Wall}
              alt="Pegboard wall with modular shelving and toys"
              className="w-full h-auto"
              loading="lazy"
            />
          </div>

          {/* Storage image */}
          <div className="max-w-container mx-auto px-4 sm:px-6 mt-16 sm:mt-24">
            <img
              src={childrensRoom2Storage}
              alt="Storage cabinets and pegboard organization system"
              className="w-full h-auto"
              loading="lazy"
            />
          </div>

          {/* Final text */}
          <div className="max-w-container mx-auto px-4 sm:px-6 text-center mt-16 sm:mt-24">
            <p className="text-sm sm:text-base leading-relaxed text-muted-foreground">
              By integrating natural light, nature-inspired materials, and neurodesign principles, this children's room becomes a dynamic yet calming environment that supports healthy development, independence, and emotional balance.
            </p>
          </div>
        </section>
      )}

      {/* Strava feature Content */}
      {project.id === "stravaui" && (
  <section className="-mt-8 sm:-mt-12">
    <div className="max-w-container mx-auto px-4 sm:px-6">
      <img src={StravaUI_01} className="w-full h-auto" />
      <img src={StravaUI_02} className="w-full h-auto" />
      <img src={StravaUI_03} className="w-full h-auto" />
      <img src={StravaUI_04} className="w-full h-auto" />
      <img src={StravaUI_05} className="w-full h-auto" />
      <img src={StravaUI_06} className="w-full h-auto" />
    </div>
  </section>
)}

{/* Yolks Content */}
      {project.id === "yolks" && (
  <section className="-mt-8 sm:-mt-12">
    <div className="max-w-container mx-auto px-4 sm:px-6">
      {/* Eyes Component with Container */}
            <div className="w-full max-w-[2000px] bg-[#E0E0E0] py-16 flex justify-center">
              <Eyes />
            </div>
      <img src={yolks_01} className="w-full h-auto" />
      <img src={yolks_02} className="w-full h-auto" />
      <img src={yolks_03} className="w-full h-auto" />
      <img src={yolks_04} className="w-full h-auto" />
      <img src={yolks_05} className="w-full h-auto" />
      <img src={yolks_06} className="w-full h-auto" />
    </div>
  </section>
)}

      {/* Blank space */}
      <div className="py-24 sm:py-32" />
    </>
  );
};

export default ProjectDetail;
