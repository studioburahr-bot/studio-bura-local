const About = () => {
  return (
    <section id="about" className="py-16 sm:py-24 md:py-32 bg-black text-white">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="max-w-container mx-auto">
          <h2 className="text-4xl sm:text-5xl md:text-7xl font-light mb-8 sm:mb-12 md:mb-16 tracking-tight">
            About
          </h2>
          <div className="space-y-6 sm:space-y-8 text-base sm:text-lg md:text-xl font-light leading-relaxed">
            <p>
              At BURA, design is a problem-solving process grounded in observation, research, and human behavior, turning complex contexts into meaningful solutions.
            </p>
            <p>
              Our projects range from interior solutions and digital design concepts to workshops
              with educational character.
            </p>
            <div className="pt-8">
              <h3 className="font-normal mb-4 text-base sm:text-lg md:text-xl">
              On this page, you&apos;ll find:
            </h3>
              <ul className="space-y-3 pl-6">
                <li className="flex items-start">
                  <span className="mr-4">◦</span>
                  <span>Projects and case studies</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-4">◦</span>
                  <span>Insights into neurodesign and sensory design</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-4">◦</span>
                  <span>News about our workshops and events</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;