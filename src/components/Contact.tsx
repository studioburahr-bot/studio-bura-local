import { Instagram, Linkedin, Mail } from "lucide-react";
import contactPhoto from "@/assets/contact-photo.jpg?webp";

const Contact = () => {
  return (
    <section id="contact" className="py-16 sm:py-24 md:py-32">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="max-w-container mx-auto">
          <div className="grid md:grid-cols-2 gap-8 sm:gap-12">
            {/* Contact Photo: first on mobile, right column on desktop */}
            <img
              src={contactPhoto}
              alt="Dora Ernoić - founder of Studio Bura design studio in Zagreb, Croatia"
              className="w-full aspect-[3/4] object-cover rounded-lg md:order-2"
              loading="lazy"
            />

            {/* Contact Info: heading at the top, details pinned to the bottom of the photo on desktop */}
            <div className="flex flex-col md:justify-between md:order-1">
              <div>
                <h2 className="text-3xl/none sm:text-4xl/none md:text-5xl/none font-light mb-6 sm:mb-8 tracking-tight">
                  Contact
                </h2>
                <p className="text-sm sm:text-base md:text-lg font-light leading-relaxed">
                  Open to product design roles and freelance projects.
                </p>
              </div>

              <div className="space-y-3 sm:space-y-4 text-sm sm:text-base md:text-lg font-light leading-relaxed">
                {/* Location & Phone */}
                <address className="pt-6 sm:pt-8 space-y-1 text-base sm:text-lg not-italic">
                 <p>Zagreb, Croatia</p>
                 <p>
                   <a href="tel:+38598582307" className="hover:opacity-60 transition-opacity">
                     +385 98 582 307
                   </a>
                 </p>
                </address>


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
