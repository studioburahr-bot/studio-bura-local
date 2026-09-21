import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { getProjectPath, projects, type Project } from "@/data/projects";

interface ProjectsProps {
  items?: Project[];
  title?: string;
  backTo?: { href: string; label: string };
}

const Projects = ({ items = projects, title = "Selected Projects", backTo }: ProjectsProps) => {
  return (
    <section id="projects" className="py-16 sm:py-24 md:py-32">
      <div className="mx-auto max-w-[1400px] px-4 sm:px-6">
        {backTo && (
          <Link
            to={backTo.href}
            className="inline-flex items-center gap-2 mb-12 sm:mb-16 text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft size={20} />
            {backTo.label}
          </Link>
        )}

        <h1 className="text-3xl sm:text-4xl md:text-5xl font-light mb-12 sm:mb-16 md:mb-24 tracking-tight">
          {title}
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-y-12 sm:gap-y-16 md:gap-y-24 md:gap-x-8">
          {items.map((project) => (
            <Link
              key={project.id}
              to={getProjectPath(project)}
              className="group cursor-pointer block"
            >
              <div className="h-auto bg-secondary mb-4 sm:mb-6 overflow-hidden flex items-center justify-center">
                {project.image ? (
                  <img
                    src={project.image}
                    alt={`${project.title} project by Studio Bura`}
                    className="w-full h-auto max-w-full group-hover:scale-105 transition-transform duration-700"
                    loading="lazy"
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-muted to-accent transition-transform duration-500 group-hover:scale-102" />
                )}
              </div>

              <div className="space-y-1 sm:space-y-2">
                <h3 className="text-xl sm:text-2xl font-light">
                  {project.title}
                </h3>
                <div className="text-xs sm:text-sm text-muted-foreground">
                  <span>{project.category}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
