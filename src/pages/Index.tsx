import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import SelectedWork from "@/components/SelectedWork";
import Neurodesign from "@/components/Neurodesign";
import Projects from "@/components/Projects";
import About from "@/components/About";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background animate-fade-in">
      <Navigation />
      <Hero />
      <SelectedWork />
      <Neurodesign />
      <About />
      <Contact />
      <Footer />
    </div>
  );
};

export default Index;
