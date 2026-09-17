import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";
import {
  PROJECT_COLLECTIONS,
  type ProjectCollection,
} from "@/data/projects";

const collectionOrder: ProjectCollection[] = ["digital", "interior"];

const ProjectsIndex = () => {
  return (
    <div className="pt-20 flex-1">
      <section className="py-16 sm:py-24 md:py-32">
        <div className="mx-auto max-w-[1400px] px-4 sm:px-6">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-light mb-12 sm:mb-16 md:mb-24 tracking-tight">
            Projects
          </h1>

          <div className="flex flex-col items-start">
            {collectionOrder.map((slug) => {
              const collection = PROJECT_COLLECTIONS[slug];

              return (
                <Link
                  key={slug}
                  to={`/projects/${slug}`}
                  className="group inline-flex w-fit items-center gap-2 py-6 sm:py-8 hover:opacity-60 transition-opacity"
                >
                  <h2 className="text-xl sm:text-2xl md:text-3xl font-light tracking-[0.18em] uppercase">
                    {collection.title}
                  </h2>
                  <ChevronRight
                    size={24}
                    strokeWidth={1.5}
                    className="shrink-0 text-foreground"
                    aria-hidden="true"
                  />
                </Link>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
};

export default ProjectsIndex;
