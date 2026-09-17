import { Outlet } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

const ProjectsLayout = () => {
  return (
    <div className="min-h-screen bg-background animate-fade-in flex flex-col">
      <Navigation />
      <div className="flex-1 flex flex-col">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};

export default ProjectsLayout;
