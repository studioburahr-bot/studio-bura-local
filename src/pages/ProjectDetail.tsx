import { useParams, Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { getProjectById } from "@/data/projects";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
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
import MP1 from "@/assets/projects/MP_1.png?webp";
import MP2 from "@/assets/projects/MP_2.png?webp";
import MP3 from "@/assets/projects/MP_3.png?webp";
import MP4 from "@/assets/projects/MP_4.png?webp";
import MP5 from "@/assets/projects/MP_5.png?webp";
import MP6 from "@/assets/projects/MP_6.png?webp";
// StravaUI project assets
import StravaUI_01 from "@/assets/projects/StravaUI_01.webp";
import StravaUI_02 from "@/assets/projects/StravaUI_02.webp";
import StravaUI_03 from "@/assets/projects/StravaUI_03.webp";
import StravaUI_04 from "@/assets/projects/StravaUI_04.webp";
import StravaUI_05 from "@/assets/projects/StravaUI_05.webp";
import StravaUI_06 from "@/assets/projects/StravaUI_06.webp";
// Flow project assets
import flowDetail from "@/assets/projects/flow-detail.jpg?webp";
import flowYoga1 from "@/assets/projects/flow-yoga-1.png?webp";
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
// Picture book project assets
import pictureBookCharacters from "@/assets/projects/picture-book-characters.png?webp";
import pictureBookKitchen from "@/assets/projects/picture-book-kitchen.jpg?webp";
import pictureBookPumpkin from "@/assets/projects/picture-book-pumpkin.jpg?webp";
import flowYoga2 from "@/assets/projects/flow-yoga-2.png?webp";
import flowYoga3 from "@/assets/projects/flow-yoga-3.png?webp";
import flowYoga4 from "@/assets/projects/flow-yoga-4.png?webp";
import flowProcess1 from "@/assets/projects/flow-process-1.png?webp";
import flowProcess2 from "@/assets/projects/flow-process-2.png?webp";
import flowProcess3 from "@/assets/projects/flow-process-3.png?webp";
import flowMoodboard from "@/assets/projects/flow-moodboard.png?webp";
import flowTypography from "@/assets/projects/flow-typography.png?webp";
import flowColours from "@/assets/projects/flow-colours.png?webp";
import flowGrid from "@/assets/projects/flow-grid.png?webp";
import flowLogo from "@/assets/projects/flow-logo.png?webp";
import flowLogoGrid from "@/assets/projects/flow-logo-grid.png?webp";
import flowTypography2 from "@/assets/projects/flow-typography2.png?webp";
import flowFinal from "@/assets/projects/flow-final.png?webp";
// Yolks project assets
import { Eyes } from "@/components/Eyes";
import yolks_01 from "@/assets/projects/yolks_01.webp?webp";
import yolks_02 from "@/assets/projects/yolks_02.webp?webp";
import yolks_03 from "@/assets/projects/yolks_03.webp?webp";
import yolks_04 from "@/assets/projects/yolks_04.webp?webp";


const ProjectDetail = () => {
  const { projectId } = useParams<{ projectId: string }>();
  const project = projectId ? getProjectById(projectId) : undefined;

  if (!project) {
    return (
      <div className="min-h-screen bg-background animate-fade-in">
        <Navigation />
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
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background animate-fade-in">
      <Navigation />

      {/* Hero Section */}
      <section className="pt-24 sm:pt-32 pb-12 sm:pb-16">
        <div className="container mx-auto px-4 sm:px-6">
          {/* Back Link */}
          <Link
            to="/projects"
            className="inline-flex items-center gap-2 mb-12 sm:mb-16 text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft size={20} />
            Back to Projects
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

      {/* Single Image - 5:4 aspect ratio (hidden for MatchPoint, Flow and StravUI) */}
      {project.image && project.id !== "matchpoint" && project.id !== "flow" && project.id !== "stravaui" && project.id !== "yolks" && (
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

      {/* Flow project detail image */}
      {project.id === "flow" && (
        <section className="pb-0">
          <div className="max-w-container mx-auto px-4 sm:px-6">
            <img
              src={flowDetail}
              alt="Flow - Yoga Studio project showcase"
              className="w-full h-auto"
              loading="lazy"
            />
          </div>
        </section>
      )}

      {/* Flow About Project Section */}
      {project.id === "flow" && (
        <section className="py-16 sm:py-24">
          <div className="max-w-container mx-auto px-4 sm:px-6 text-center">
            {/* About Project Title */}
            <h2 className="text-xs sm:text-sm uppercase tracking-[0.2em] text-muted-foreground mb-8 sm:mb-12">
              About project
            </h2>

            {/* About Text */}
            <p className="text-sm sm:text-base leading-relaxed text-muted-foreground">
              FLOW Yoga Studio is a web experience designed to connect users with a yoga community while evoking calmness and focus through design. The goal was to create a clean and intuitive landing page that reflects the studio's values - balance, movement, and harmony.
            </p>
          </div>

          {/* Four Images Grid */}
          <div className="mt-16 sm:mt-24 max-w-container mx-auto px-4 sm:px-6 grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
            <img
              src={flowYoga1}
              alt="Yoga pose 1"
              className="w-full h-auto"
              loading="lazy"
            />
            <img
              src={flowYoga2}
              alt="Yoga pose 2"
              className="w-full h-auto"
              loading="lazy"
            />
            <img
              src={flowYoga3}
              alt="Yoga pose 3"
              className="w-full h-auto"
              loading="lazy"
            />
            <img
              src={flowYoga4}
              alt="Yoga class meditation"
              className="w-full h-auto"
              loading="lazy"
            />
          </div>
        </section>
      )}

      {/* Flow Design Process Section */}
      {project.id === "flow" && (
        <section className="py-16 sm:py-24">
          <div className="max-w-container mx-auto px-4 sm:px-6">
            {/* Design Process Title */}
            <h2 className="text-xs sm:text-sm uppercase tracking-[0.2em] text-muted-foreground mb-12 sm:mb-16 text-center">
              Design Process
            </h2>

            {/* Process Steps */}
            <div className="space-y-8 sm:space-y-10">
              {/* Step 01 */}
              <div className="grid grid-cols-12 gap-4 items-start">
                <div className="col-span-2 text-sm text-muted-foreground">01/</div>
                <div className="col-span-2 text-sm text-foreground font-medium">Discover</div>
                <div className="col-span-8 text-sm text-muted-foreground leading-relaxed">
                  yoga studios research, user expectations, identifying a need for calm aesthetics, clear structure, and effortless booking
                </div>
              </div>

              {/* Step 02 */}
              <div className="grid grid-cols-12 gap-4 items-start">
                <div className="col-span-2 text-sm text-muted-foreground">02/</div>
                <div className="col-span-2 text-sm text-foreground font-medium">Define</div>
                <div className="col-span-8 text-sm text-muted-foreground leading-relaxed">
                  defining goals: intuitive navigation, minimal layout and clear CTAs creating personas and user flow to guide design decisions
                </div>
              </div>

              {/* Step 03 */}
              <div className="grid grid-cols-12 gap-4 items-start">
                <div className="col-span-2 text-sm text-muted-foreground">03/</div>
                <div className="col-span-2 text-sm text-foreground font-medium">Develop</div>
                <div className="col-span-8 text-sm text-muted-foreground leading-relaxed">
                  building wireframes and an interactive prototype in Figma exploring visual direction with soft tones, clean typography, and balanced composition
                </div>
              </div>

              {/* Step 04 */}
              <div className="grid grid-cols-12 gap-4 items-start">
                <div className="col-span-2 text-sm text-muted-foreground">04/</div>
                <div className="col-span-2 text-sm text-foreground font-medium">Deliver</div>
                <div className="col-span-8 text-sm text-muted-foreground leading-relaxed">
                  finalizing responsive UI design with subtle interactions conducting quick usability testing and refining CTA placement based on feedback
                </div>
              </div>
            </div>
          </div>

          {/* Three Process Images */}
          <div className="mt-16 sm:mt-24 max-w-container mx-auto px-4 sm:px-6 grid grid-cols-3 gap-4 sm:gap-6">
            <img
              src={flowProcess1}
              alt="Design process illustration 1"
              className="w-full h-auto"
              loading="lazy"
            />
            <img
              src={flowProcess2}
              alt="Design process illustration 2"
              className="w-full h-auto"
              loading="lazy"
            />
            <img
              src={flowProcess3}
              alt="Design process illustration 3"
              className="w-full h-auto"
              loading="lazy"
            />
          </div>
        </section>
      )}

      {/* Flow Information Architecture Section */}
      {project.id === "flow" && (
        <section className="py-16 sm:py-24">
          <div className="max-w-container mx-auto px-4 sm:px-6">
            {/* Information Architecture Title */}
            <h2 className="text-xs sm:text-sm uppercase tracking-[0.2em] text-muted-foreground mb-12 sm:mb-16 text-center">
              Information Architecture
            </h2>

            {/* Site Map Diagram */}
            <div className="relative flex items-center justify-center">
              <svg viewBox="0 0 800 700" className="w-full max-w-[800px] h-auto">
                {/* Curved Lines - FLOW to pages */}
                <path d="M 80 60 Q 150 60 220 60" fill="none" stroke="currentColor" strokeWidth="0.8" className="text-muted-foreground/40" />
                <path d="M 80 60 Q 120 120 220 180" fill="none" stroke="currentColor" strokeWidth="0.8" className="text-muted-foreground/40" />
                <path d="M 80 60 Q 90 200 220 340" fill="none" stroke="currentColor" strokeWidth="0.8" className="text-muted-foreground/40" />
                <path d="M 80 60 Q 70 350 220 480" fill="none" stroke="currentColor" strokeWidth="0.8" className="text-muted-foreground/40" />
                <path d="M 80 60 Q 50 450 220 600" fill="none" stroke="currentColor" strokeWidth="0.8" className="text-muted-foreground/40" />

                {/* Home to sub-items */}
                <path d="M 290 60 Q 420 20 520 20" fill="none" stroke="currentColor" strokeWidth="0.8" className="text-muted-foreground/40" />
                <path d="M 290 60 Q 400 35 520 40" fill="none" stroke="currentColor" strokeWidth="0.8" className="text-muted-foreground/40" />
                <path d="M 290 60 Q 390 50 520 60" fill="none" stroke="currentColor" strokeWidth="0.8" className="text-muted-foreground/40" />
                <path d="M 290 60 Q 390 70 520 80" fill="none" stroke="currentColor" strokeWidth="0.8" className="text-muted-foreground/40" />
                <path d="M 290 60 Q 400 90 520 100" fill="none" stroke="currentColor" strokeWidth="0.8" className="text-muted-foreground/40" />
                <path d="M 290 60 Q 420 105 520 120" fill="none" stroke="currentColor" strokeWidth="0.8" className="text-muted-foreground/40" />

                {/* About us to sub-items */}
                <path d="M 300 180 Q 420 155 520 160" fill="none" stroke="currentColor" strokeWidth="0.8" className="text-muted-foreground/40" />
                <path d="M 300 180 Q 410 175 520 180" fill="none" stroke="currentColor" strokeWidth="0.8" className="text-muted-foreground/40" />
                <path d="M 300 180 Q 410 195 520 200" fill="none" stroke="currentColor" strokeWidth="0.8" className="text-muted-foreground/40" />
                <path d="M 300 180 Q 420 210 520 220" fill="none" stroke="currentColor" strokeWidth="0.8" className="text-muted-foreground/40" />

                {/* Services to sub-items */}
                <path d="M 300 340 Q 420 300 520 300" fill="none" stroke="currentColor" strokeWidth="0.8" className="text-muted-foreground/40" />
                <path d="M 300 340 Q 410 320 520 320" fill="none" stroke="currentColor" strokeWidth="0.8" className="text-muted-foreground/40" />
                <path d="M 300 340 Q 410 355 520 340" fill="none" stroke="currentColor" strokeWidth="0.8" className="text-muted-foreground/40" />
                <path d="M 300 340 Q 420 375 520 360" fill="none" stroke="currentColor" strokeWidth="0.8" className="text-muted-foreground/40" />

                {/* Classes to sub-items */}
                <path d="M 290 480 Q 410 445 520 445" fill="none" stroke="currentColor" strokeWidth="0.8" className="text-muted-foreground/40" />
                <path d="M 290 480 Q 400 465 520 465" fill="none" stroke="currentColor" strokeWidth="0.8" className="text-muted-foreground/40" />
                <path d="M 290 480 Q 400 490 520 485" fill="none" stroke="currentColor" strokeWidth="0.8" className="text-muted-foreground/40" />
                <path d="M 290 480 Q 410 510 520 505" fill="none" stroke="currentColor" strokeWidth="0.8" className="text-muted-foreground/40" />

                {/* Contact us to sub-items */}
                <path d="M 310 600 Q 430 575 520 575" fill="none" stroke="currentColor" strokeWidth="0.8" className="text-muted-foreground/40" />
                <path d="M 310 600 Q 420 600 520 595" fill="none" stroke="currentColor" strokeWidth="0.8" className="text-muted-foreground/40" />
                <path d="M 310 600 Q 430 625 520 615" fill="none" stroke="currentColor" strokeWidth="0.8" className="text-muted-foreground/40" />

                {/* Main Labels */}
                <text x="40" y="65" className="fill-foreground" style={{ fontSize: '16px' }}>FLOW</text>
                <text x="230" y="65" className="fill-foreground" style={{ fontSize: '14px' }}>home</text>
                <text x="230" y="185" className="fill-foreground" style={{ fontSize: '14px' }}>about us</text>
                <text x="230" y="345" className="fill-foreground" style={{ fontSize: '14px' }}>services</text>
                <text x="230" y="485" className="fill-foreground" style={{ fontSize: '14px' }}>classes</text>
                <text x="230" y="605" className="fill-foreground" style={{ fontSize: '14px' }}>contact us</text>

                {/* Home sub-items */}
                <text x="530" y="25" className="fill-muted-foreground" style={{ fontSize: '14px' }}>introduction</text>
                <text x="530" y="45" className="fill-muted-foreground" style={{ fontSize: '14px' }}>what we offer</text>
                <text x="530" y="65" className="fill-muted-foreground" style={{ fontSize: '14px' }}>video highlights</text>
                <text x="530" y="85" className="fill-muted-foreground" style={{ fontSize: '14px' }}>customer feedback</text>
                <text x="530" y="105" className="fill-muted-foreground" style={{ fontSize: '14px' }}>latest from blog</text>
                <text x="530" y="125" className="fill-muted-foreground" style={{ fontSize: '14px' }}>get in touch</text>

                {/* About us sub-items */}
                <text x="530" y="165" className="fill-muted-foreground" style={{ fontSize: '14px' }}>our mission</text>
                <text x="530" y="185" className="fill-muted-foreground" style={{ fontSize: '14px' }}>studio philosophy</text>
                <text x="530" y="205" className="fill-muted-foreground" style={{ fontSize: '14px' }}>our team</text>
                <text x="530" y="225" className="fill-muted-foreground" style={{ fontSize: '14px' }}>FAQ</text>

                {/* Services sub-items */}
                <text x="530" y="305" className="fill-muted-foreground" style={{ fontSize: '14px' }}>group classes</text>
                <text x="530" y="325" className="fill-muted-foreground" style={{ fontSize: '14px' }}>private sessions</text>
                <text x="530" y="345" className="fill-muted-foreground" style={{ fontSize: '14px' }}>workshops & retreats</text>
                <text x="530" y="365" className="fill-muted-foreground" style={{ fontSize: '14px' }}>corporate yoga</text>

                {/* Classes sub-items */}
                <text x="530" y="450" className="fill-muted-foreground" style={{ fontSize: '14px' }}>our classes</text>
                <text x="530" y="470" className="fill-muted-foreground" style={{ fontSize: '14px' }}>schedule</text>
                <text x="530" y="490" className="fill-muted-foreground" style={{ fontSize: '14px' }}>prices</text>
                <text x="530" y="510" className="fill-muted-foreground" style={{ fontSize: '14px' }}>booking classes</text>

                {/* Contact us sub-items */}
                <text x="530" y="580" className="fill-muted-foreground" style={{ fontSize: '14px' }}>how to contact us?</text>
                <text x="530" y="600" className="fill-muted-foreground" style={{ fontSize: '14px' }}>where to find us?</text>
                <text x="530" y="620" className="fill-muted-foreground" style={{ fontSize: '14px' }}>working hours</text>
              </svg>
            </div>
          </div>
        </section>
      )}

      {/* Flow Problem & Objectives Section */}
      {project.id === "flow" && (
        <section className="py-16 sm:py-24">
          <div className="max-w-container mx-auto px-4 sm:px-6">
            <h2 className="text-xs sm:text-sm uppercase tracking-[0.2em] text-muted-foreground mb-12 sm:mb-16 text-center">
              Problem & Objectives
            </h2>

            <p className="text-sm sm:text-base leading-relaxed text-muted-foreground text-center mb-8">
              The challenge was to design a minimal yet engaging landing page that communicates the studio's philosophy and makes booking a class easy and straightforward.
            </p>

            <div className="space-y-4 text-sm sm:text-base text-muted-foreground text-center">
              <p>/ calm, breathable layout that mirrors the rhythm of yoga</p>
              <p>/ improve navigation and highlight core services</p>
              <p>/ encourage conversions through clear CTAs</p>
            </div>
          </div>
        </section>
      )}

      {/* Flow Moodboard Section */}
      {project.id === "flow" && (
        <section className="py-16 sm:py-24">
          <div className="max-w-container mx-auto px-4 sm:px-6">
            <h2 className="text-xs sm:text-sm uppercase tracking-[0.2em] text-muted-foreground mb-12 sm:mb-16 text-center">
              Moodboard
            </h2>
            <div className="flex justify-center">
              <img
                src={flowMoodboard}
                alt="Flow Yoga Studio Moodboard"
                className="w-full max-w-container h-auto"
              />
            </div>
          </div>
        </section>
      )}

      {/* Flow Typography Section */}
      {project.id === "flow" && (
        <section className="py-16 sm:py-24">
          <div className="max-w-container mx-auto px-4 sm:px-6">
            <h2 className="text-xs sm:text-sm uppercase tracking-[0.2em] text-muted-foreground mb-12 sm:mb-16 text-center">
              Typography
            </h2>
            <div className="flex justify-center">
              <img
                src={flowTypography}
                alt="Flow Typography - Montserrat and Playfair Display"
                className="w-full max-w-container h-auto"
              />
            </div>
          </div>
        </section>
      )}

      {/* Flow Colours Section */}
      {project.id === "flow" && (
        <section className="py-16 sm:py-24">
          <div className="max-w-container mx-auto px-4 sm:px-6">
            <h2 className="text-xs sm:text-sm uppercase tracking-[0.2em] text-muted-foreground mb-12 sm:mb-16 text-center">
              Colours
            </h2>
            <div className="flex justify-center">
              <img
                src={flowColours}
                alt="Flow Color Palette"
                className="w-full max-w-container h-auto"
              />
            </div>
          </div>
        </section>
      )}

      {/* Flow Grid System Section */}
      {project.id === "flow" && (
        <section className="py-16 sm:py-24">
          <div className="max-w-container mx-auto px-4 sm:px-6">
            <h2 className="text-xs sm:text-sm uppercase tracking-[0.2em] text-muted-foreground mb-12 sm:mb-16 text-center">
              Grid System
            </h2>
            <div className="flex justify-center">
              <img
                src={flowGrid}
                alt="Flow Grid System - Desktop and Mobile"
                className="w-full max-w-container h-auto"
              />
            </div>
          </div>
        </section>
      )}

      {/* Flow Logo Design Section */}
      {project.id === "flow" && (
        <section className="py-16 sm:py-24">
          <div className="max-w-container mx-auto px-4 sm:px-6">
            <h2 className="text-xs sm:text-sm uppercase tracking-[0.2em] text-muted-foreground mb-12 sm:mb-16 text-center">
              Logo Design
            </h2>

            <div className="text-sm sm:text-base leading-relaxed text-muted-foreground text-center space-y-6">
              <p>The logo for Flow Studio reflects the brand's essence — calm movement, balance, and fluidity.</p>
              <p>The rounded, organic typography embodies the natural flow of yoga poses, while the bold weight gives it a grounded and stable feel.</p>
              <p>The minimalist "studio" wordmark contrasts the playful main logo, creating a visual balance between energy and serenity.</p>
            </div>
          </div>
        </section>
      )}

      {/* Flow Logo Section */}
      {project.id === "flow" && (
        <section className="py-16 sm:py-24">
          <div className="max-w-container mx-auto px-4 sm:px-6">
            <h2 className="text-xs sm:text-sm uppercase tracking-[0.2em] text-muted-foreground mb-12 sm:mb-16 text-center">
              Logo
            </h2>
            <div className="flex justify-center">
              <img
                src={flowLogo}
                alt="Flow Studio Logo"
                className="w-full max-w-[600px] h-auto"
              />
            </div>
          </div>
        </section>
      )}

      {/* Flow Logo Grid System Section */}
      {project.id === "flow" && (
        <section className="py-16 sm:py-24">
          <div className="max-w-container mx-auto px-4 sm:px-6">
            <h2 className="text-xs sm:text-sm uppercase tracking-[0.2em] text-muted-foreground mb-12 sm:mb-16 text-center">
              Logo Grid System
            </h2>
            <div className="flex justify-center">
              <img
                src={flowLogoGrid}
                alt="Flow Studio Logo Grid System"
                className="w-full max-w-[600px] h-auto"
              />
            </div>
          </div>
        </section>
      )}

      {/* Flow Typography 2 Section */}
      {project.id === "flow" && (
        <section className="py-16 sm:py-24">
          <div className="max-w-container mx-auto px-4 sm:px-6">
            <h2 className="text-xs sm:text-sm uppercase tracking-[0.2em] text-muted-foreground mb-12 sm:mb-16 text-center">
              Typography
            </h2>
            <div className="flex justify-center">
              <img
                src={flowTypography2}
                alt="Flow Typography - Montserrat and Bagel Fat One"
                className="w-full max-w-container h-auto"
              />
            </div>
          </div>
        </section>
      )}

      {/* Flow Final Showcase Section */}
      {project.id === "flow" && (
        <section className="py-16 sm:py-24">
          <div className="max-w-container mx-auto px-4 sm:px-6">
            <div className="flex justify-center">
              <img
                src={flowFinal}
                alt="Flow Yoga Studio Final Design Showcase"
                className="w-full max-w-container h-auto"
              />
            </div>
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

      {/* Picture Book Detail Content */}
      {projectId === "picture-book" && (
        <section className="py-12 sm:py-16">
          {/* ABOUT PROJECT */}
          <div className="max-w-container mx-auto px-4 sm:px-6 text-center">
            <h2 className="text-lg sm:text-xl font-light mb-6 sm:mb-8 tracking-wide text-foreground">
              ABOUT PROJECT
            </h2>
            <p className="text-sm sm:text-base leading-relaxed text-muted-foreground">
              "How Did It Get to My Plate?" is an educational children's picture book created for preschool-aged children and published by Varaždin County.
            </p>
            <p className="text-sm sm:text-base leading-relaxed text-muted-foreground mt-4">
              The project was developed with the goal of introducing the youngest residents of Varaždin County to traditional local products that hold European protection status. Through storytelling, illustration, and playful activities, the book presents complex topics such as food origin and production in a simple, engaging, and age-appropriate way.
            </p>
          </div>

          {/* First image */}
          <div className="max-w-container mx-auto px-4 sm:px-6 mt-16 sm:mt-24">
            <img
              src={pictureBookCharacters}
              alt="Picture book spread showing Sunčica and Zelenko superhero characters"
              className="w-full h-auto"
              loading="lazy"
            />
          </div>

          {/* Story description */}
          <div className="max-w-container mx-auto px-4 sm:px-6 text-center mt-16 sm:mt-24">
            <p className="text-sm sm:text-base leading-relaxed text-muted-foreground">
              The story follows two little superheroes, Sunčica and Zelenko, who guide children through an adventure that encourages curiosity, learning through play, and creative exploration. Designed specifically for early childhood, the book supports independent thinking and helps children build an early connection with food, local heritage, and sustainability.
            </p>
          </div>

          {/* Kitchen scene image */}
          <div className="max-w-container mx-auto px-4 sm:px-6 mt-16 sm:mt-24">
            <img
              src={pictureBookKitchen}
              alt="Picture book spread showing kitchen baking scene with interactive activities"
              className="w-full h-auto"
              loading="lazy"
            />
          </div>

          {/* Educational content description */}
          <div className="max-w-container mx-auto px-4 sm:px-6 text-center mt-16 sm:mt-24">
            <p className="text-sm sm:text-base leading-relaxed text-muted-foreground">
              By combining educational content with a warm narrative and expressive illustrations, the project creates a meaningful learning experience tailored to young children.
            </p>
          </div>

          {/* Pumpkin field image */}
          <div className="max-w-container mx-auto px-4 sm:px-6 mt-16 sm:mt-24">
            <img
              src={pictureBookPumpkin}
              alt="Picture book spread showing pumpkin field and maze activity"
              className="w-full h-auto"
              loading="lazy"
            />
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
            <div className="w-full max-w-[2000px] bg-[#D7D7D7] py-16 flex justify-center">
              <Eyes />
            </div>
      <img src={yolks_01} className="w-full h-auto" />
      <img src={yolks_02} className="w-full h-auto" />
      <img src={yolks_03} className="w-full h-auto" />
      <img src={yolks_04} className="w-full h-auto" />
    </div>
  </section>
)}

      {/* Blank space */}
      <div className="py-24 sm:py-32" />

      <Footer />
    </div>
  );
};

export default ProjectDetail;
