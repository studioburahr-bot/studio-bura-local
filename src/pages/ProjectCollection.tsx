import { Navigate, useParams } from "react-router-dom";
import ProjectsSection from "@/components/Projects";
import {
  PROJECT_COLLECTIONS,
  getProjectById,
  getProjectPath,
  getProjectsByCollection,
  isProjectCollection,
} from "@/data/projects";
import NotFound from "@/pages/NotFound";

const ProjectCollection = () => {
  const { collection } = useParams<{ collection: string }>();

  if (!isProjectCollection(collection)) {
    const project = collection ? getProjectById(collection) : undefined;
    if (project) {
      return <Navigate to={getProjectPath(project)} replace />;
    }
    return <NotFound />;
  }

  const collectionMeta = PROJECT_COLLECTIONS[collection];
  const items = getProjectsByCollection(collection);

  return (
    <div className="pt-20">
      <ProjectsSection
        items={items}
        title={collectionMeta.title}
        backTo={{ href: "/projects", label: "Back to Projects" }}
      />
    </div>
  );
};

export default ProjectCollection;
