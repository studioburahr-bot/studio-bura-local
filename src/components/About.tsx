const About = () => {
  return (
    <section id="about" className="py-16 sm:py-24 md:py-32 bg-black text-white">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="max-w-container mx-auto">
          <h2 className="text-3xl/none sm:text-4xl/none md:text-5xl/none font-light mb-7 sm:mb-12 md:mb-16 tracking-tight">
            About
          </h2>
          <div className="max-w-[1100px] space-y-6 sm:space-y-8 text-base/relaxed sm:text-lg/relaxed md:text-xl/relaxed font-light text-pretty">
            <p>
              After studying industrial design at the School of Design in Zagreb, I spent my first years designing interiors, physical products and large retail environments. That work taught me to design inside real constraints: budgets, deadlines, building sites, and many people who each need something different.
            </p>
            <p>
              Today I bring that to digital products. I&apos;ve run user research and usability testing for an EU-funded web platform, designed an e-commerce system for an international brand, and developed case studies in B2B and AI-assisted products.
            </p>
            <p>
              Across all of it the approach is the same: watch how people actually work, then design the simplest thing that fits.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
