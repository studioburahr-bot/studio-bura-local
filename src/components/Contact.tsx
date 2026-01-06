import { Instagram, Linkedin, Mail } from "lucide-react";
import contactPhoto from "@/assets/contact-photo.jpg?webp";

const Contact = () => {
  return (
    <section id="contact" className="py-16 sm:py-24 md:py-32">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8 sm:gap-12 items-start">
            {/* Left - Contact Photo */}
            <img
              src={contactPhoto}
              alt="Dora Ernoić - Studio Bura founder"
              className="w-full aspect-[3/4] object-cover rounded-lg"
              loading="lazy"
            />

            {/* Right - Contact Info */}
            <div>
              <h2 className="text-4xl sm:text-5xl md:text-7xl font-light mb-6 sm:mb-8 tracking-tight">
                Contact
              </h2>
              <div className="space-y-3 sm:space-y-4 text-sm sm:text-base md:text-lg font-light leading-relaxed">
                <p>
                  My name is Dora Ernoić, founder of Studio Bura. I work at the intersection of architecture, industrial design, and user experience, using design as a tool to solve spatial, functional, and experiential challenges.
                </p>
                <p>
                  With a background in architecture and industrial design, I approach each project through human-centered thinking, combining spatial logic with an understanding of behavior, perception, and use.
                </p>
                <p>
                  I develop intuitive environments and interactions — from wayfinding and user flows to installations and immersive visualizations that help people understand a space before it even exists.
                </p>
                <p>
                  In my free time, you can catch me running or cooking, exploring either new places or new food.
                </p>

                {/* Location & Phone */}
                <div className="pt-6 sm:pt-8 space-y-1 text-base sm:text-lg">
                  <p>Zagreb, Croatia</p>
                  <p>+385 98 582 307</p>
                </div>

                {/* Contact Links */}
                <div className="pt-4 sm:pt-6 space-y-4 sm:space-y-6">
                  <div>
                    <h3 className="text-xs sm:text-sm uppercase tracking-wider text-muted-foreground mb-2 sm:mb-3">
                      Email
                    </h3>
                    <a
                      href="mailto:info@studiobura.com"
                      className="text-sm sm:text-base md:text-lg hover:opacity-60 transition-opacity inline-flex items-center gap-2"
                    >
                      <Mail className="w-4 h-4 sm:w-5 sm:h-5" />
                      info@studiobura.com
                    </a>
                  </div>
                  <div>
                    <h3 className="text-xs sm:text-sm uppercase tracking-wider text-muted-foreground mb-2 sm:mb-3">
                      Social
                    </h3>
                    <div className="flex gap-4 sm:gap-6">
                      <a
                        href="https://www.instagram.com/studio_bura/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm sm:text-base hover:opacity-60 transition-opacity inline-flex items-center gap-2"
                      >
                        <Instagram className="w-4 h-4 sm:w-5 sm:h-5" />
                        Instagram
                      </a>
                      <a
                        href="https://www.linkedin.com/in/dora-ernoic/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm sm:text-base hover:opacity-60 transition-opacity inline-flex items-center gap-2"
                      >
                        <Linkedin className="w-4 h-4 sm:w-5 sm:h-5" />
                        LinkedIn
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
