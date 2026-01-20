import heroImage from "@/assets/hero-image.jpg?webp";
import mockupImage from "@/assets/mockup2.jpg?webp";
import heroVideo from "@/assets/projects/cho7-video.mp4";
import neurodesignChild from "@/assets/neurodesign-child.jpg?webp";
import neurodesignCity from "@/assets/neurodesign-city.jpg?webp";

const Hero = () => {
  return (
    <section id="home" className="min-h-screen flex items-center justify-center pt-16 sm:pt-20 px-4 sm:px-6">
  <h1 className="sr-only">
    Studio Bura | Design Studio in Zagreb, Croatia
  </h1>
     <div className="container mx-auto px-4 sm:px-6">
        <div className="aspect-[16/9] bg-secondary rounded-sm overflow-hidden">
          <img
            src={heroImage}
            alt="Studio Bura - Design Studio"
            className="w-full h-full object-cover"
          />
        </div>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-light mt-8 sm:mt-12 md:mt-16 tracking-tight text-foreground">
          Between people and space, there is experience.
        </h1>
        <p className="text-base sm:text-lg md:text-xl font-light mt-4 sm:mt-6 tracking-tight text-foreground/80 max-w-hero">
          BURA is a design studio focused on spatial and digital solutions, guided by the belief that design is more than aesthetics — it is a tool for activating the senses, connecting with emotions, and creating meaningful experiences.
        </p>

        <p className="text-3xl sm:text-4xl md:text-5xl font-light mt-16 sm:mt-20 md:mt-24 tracking-tight text-foreground">
          From physical environments to digital.
        </p>
        <p className="text-base sm:text-lg md:text-xl font-light mt-4 sm:mt-6 tracking-tight text-foreground/80 max-w-hero">
          With an architecture background, we translate the same human-centered principles from physical environments into digital spaces, applying UX thinking to shape intuitive and meaningful user journeys.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 mt-8 sm:mt-12">
          <div className="aspect-[3/4] bg-secondary rounded-sm overflow-hidden">
            <img
              src={mockupImage}
              alt="Design mockup"
              className="w-full h-full object-cover"
              loading="lazy"
            />
          </div>
          <div className="aspect-[3/4] bg-secondary rounded-sm overflow-hidden">
            <video
              src={heroVideo}
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        <p className="text-base sm:text-lg md:text-xl font-light mt-8 sm:mt-12 tracking-tight text-foreground/80 max-w-hero">
          Traces of daily life shape the character of every environment — books on a shelf, marks on the floor, a favourite chair, or the way a room smells. Each of these holds emotional data about our routines, values, and the way we experience life.
        </p>

        <div className="mt-16 sm:mt-20 md:mt-24 text-center">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-light tracking-tight text-foreground leading-none">
            <span className="block leading-none">Neurodesign</span>
            <span className="block leading-none">&amp; Play</span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 mt-8 sm:mt-12 max-w-hero mx-auto">
            <div className="aspect-[3/4] bg-secondary rounded-sm overflow-hidden">
              <img
                src={neurodesignCity}
                alt="Urban environment - Neurodesign"
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>
            <div className="aspect-[3/4] bg-secondary rounded-sm overflow-hidden">
              <img
                src={neurodesignChild}
                alt="Child playing - Neurodesign & Play"
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>
          </div>

          <p className="text-base sm:text-lg md:text-xl font-light mt-8 sm:mt-12 tracking-tight text-foreground/80 max-w-hero mx-auto">
            Neuroscience in design explores methodologies for analysing human activities, considering them as the starting point for design — understanding human behavior from spatial experience to digital interaction.
          </p>
          <p className="text-base sm:text-lg md:text-xl font-light mt-4 tracking-tight text-foreground/80 max-w-hero mx-auto mb-16 sm:mb-20 md:mb-24">
            When talking about Neurodesign & Play, our work focuses on designing spaces and products that grow with the child — built around play, adaptability, and sensory integration principles to support learning, well-being, and overall development.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Hero;
