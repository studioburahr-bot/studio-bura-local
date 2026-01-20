import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import Projects from "@/components/Projects";
import About from "@/components/About";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background animate-page-turn-left" style={{ perspective: "1000px" }}>
      <Navigation />
      <Hero />
      <About />
      <Contact />
      <Footer />
    </div>
  );
};

export default Index;
