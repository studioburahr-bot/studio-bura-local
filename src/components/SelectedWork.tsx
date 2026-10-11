import { useRef, type MouseEvent } from "react";
import { Link } from "react-router-dom";
import { getProjectById, getProjectPath, type Project } from "@/data/projects";
import "./SelectedWork.css";

// The three case studies shown on the home page, in this order.
const SELECTED_PROJECT_IDS = ["risk-triage-tool", "e-commerce-design-system", "yolks"];

const selectedProjects = SELECTED_PROJECT_IDS
  .map((id) => getProjectById(id))
  .filter((project): project is Project => project !== undefined);

const SelectedWorkCard = ({ project }: { project: Project }) => {
  const cursorRef = useRef<HTMLSpanElement>(null);

  // Moves the circle with the pointer. Written straight to the element so the card never re-renders.
  const followPointer = (event: MouseEvent<HTMLDivElement>) => {
    const cursor = cursorRef.current;
    if (!cursor) return;
    const bounds = event.currentTarget.getBoundingClientRect();
    cursor.style.setProperty("--cursor-x", `${event.clientX - bounds.left}px`);
    cursor.style.setProperty("--cursor-y", `${event.clientY - bounds.top}px`);
  };

  return (
    <Link to={getProjectPath(project)} className="block">
      <div
        className="selected-work-media relative aspect-[4/3] bg-secondary mb-4 md:mb-6"
        onMouseEnter={followPointer}
        onMouseMove={followPointer}
      >
        {project.thumbnail ? (
          <img
            src={project.thumbnail}
            alt={project.thumbnailAlt ?? `${project.title} project by Studio Bura`}
            width={1280}
            height={960}
            className="w-full h-full object-contain"
            loading="lazy"
          />
        ) : (
          // Grey placeholder for a project without a 4:3 thumbnail (1280x960) in src/data/projects.ts
          <div className="w-full h-full flex items-center justify-center px-4 text-center" aria-hidden="true">
            <span className="text-sm text-muted-foreground">{project.title}</span>
          </div>
        )}
        <span ref={cursorRef} className="selected-work-cursor" aria-hidden="true">
          <span>View case</span>
          <span>study</span>
          <span>→</span>
        </span>
      </div>

      <div className="space-y-1 md:space-y-2">
        <div className="flex items-start justify-between gap-4">
          <h3 className="text-xl lg:text-2xl font-light">{project.title}</h3>
          <span className="md:hidden text-xl" aria-hidden="true">→</span>
        </div>
        <div className="text-xs md:text-sm text-muted-foreground">
          <span>{project.category}</span>
        </div>
      </div>
    </Link>
  );
};

const SelectedWork = () => {
  return (
    <section id="selected-work" className="pt-12 md:pt-16">
      <div className="container mx-auto px-4 sm:px-6">
        <h2 className="text-xs md:text-sm uppercase tracking-wider text-muted-foreground">
          Selected work
        </h2>

        {/* "work-cards": the grid fades in as one after the hero headline and intro (see Hero.css) */}
        <div className="work-cards grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8 mt-7 md:mt-8">
          {selectedProjects.map((project) => (
            <SelectedWorkCard key={project.id} project={project} />
          ))}
        </div>

        <Link
          to="/projects/digital"
          className="inline-block mt-8 md:mt-12 text-base md:text-xl font-light tracking-tight border-b border-foreground hover:opacity-60 transition-opacity"
        >
          View case studies →
        </Link>
      </div>
    </section>
  );
};

export default SelectedWork;
