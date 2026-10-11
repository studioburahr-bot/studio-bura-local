import neurodesignWorkshop from "@/assets/neurodesign-workshop.jpg?webp";

const Neurodesign = () => {
  return (
    <section id="neurodesign" className="py-16 sm:py-24 md:py-32">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-start">
          <div className="aspect-square bg-secondary rounded-sm overflow-hidden">
            <img
              src={neurodesignWorkshop}
              alt="Sketching at a workshop table with sticky notes - Neurodesign & Play"
              className="w-full h-full object-cover"
              loading="lazy"
            />
          </div>

          <div>
            <h2 className="text-3xl lg:text-5xl font-light tracking-tight text-foreground leading-none">
              <span className="block leading-none">Neurodesign</span>
              <span className="block leading-none">&amp; Play</span>
            </h2>

            <div className="mt-8 lg:mt-12 space-y-4 lg:space-y-6 text-base/[1.45] lg:text-xl/[1.45] font-light tracking-tight text-foreground/80">
              <p>
                Neurodesign starts from how the brain actually takes in the world: what draws attention, what overloads it, and what makes a choice feel easy. I use it as a working method, whether I&apos;m designing children&apos;s spaces or an interface.
              </p>
              <p>
                In digital products that means fewer decisions per screen, clear feedback and a pace that respects attention. In spaces and products for children it means designing for play, sensory balance and growth.
              </p>
              <p>
                I also co-teach an online course on neurodesign for educators and parents.{" "}
                <a
                  href="https://www.kohopedagogija.com/edukacija/neurodizajn-u-vrtickoj-praksi"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="whitespace-nowrap text-foreground border-b border-foreground hover:opacity-60 transition-opacity"
                >
                  View the course →
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Neurodesign;
