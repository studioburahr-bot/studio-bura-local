import { Link } from "react-router-dom";
import { projects } from "@/data/projects";

const Projects = () => {
  return (
    <section id="projects" className="py-16 sm:py-24 md:py-32">
      <div className="container mx-auto px-4 sm:px-6">
        <h2 className="text-4xl sm:text-5xl md:text-7xl font-light mb-12 sm:mb-16 md:mb-24 tracking-tight">
          Projects
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 sm:gap-16 md:gap-24">
          {projects.map((project) => (
            <Link
              key={project.id}
              to={`/projects/${project.id}`}
              className="group cursor-pointer block"
            >
              <div className="h-auto bg-secondary mb-4 sm:mb-6 overflow-hidden flex items-center justify-center">
                {project.image ? (
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-auto max-w-full group-hover:scale-105 transition-transform duration-700"
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-muted to-accent transition-transform duration-500 group-hover:scale-102" />
                )}
              </div>

              <div className="space-y-1 sm:space-y-2">
                <h3 className="text-xl sm:text-2xl font-light">{project.title}</h3>
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

