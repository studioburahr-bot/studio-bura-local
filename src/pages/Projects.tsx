import Navigation from "@/components/Navigation";
import ProjectsSection from "@/components/Projects";
import Footer from "@/components/Footer";

const ProjectsPage = () => {
  return (
    <div className="min-h-screen bg-background animate-page-turn" style={{ perspective: "1000px" }}>
      <Navigation />
      <div className="pt-20">
        <ProjectsSection />
      </div>
      <Footer />
    </div>
  );
};

export default ProjectsPage;
