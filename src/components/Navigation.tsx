import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";

const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const isHomePage = location.pathname === "/";

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    if (!isHomePage) {
      navigate("/");
      setTimeout(() => {
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        }
      }, 100);
    } else {
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled ? "bg-background/95 backdrop-blur-sm border-b border-border" : "bg-transparent"
        }`}
      >
        <div className="container mx-auto px-4 sm:px-6 py-3 sm:py-4">
          <div className="flex items-center justify-between">
            {/* Hamburger menu for mobile */}
            <button
              onClick={() => setIsMobileMenuOpen(true)}
              className="md:hidden text-foreground hover:opacity-60 transition-all duration-500"
              aria-label="Open menu"
              style={{ transform: 'rotateY(0deg)' }}
            >
              <Menu size={24} strokeWidth={1.5} className="animate-[rotateY_0.5s_ease-in-out]" />
            </button>

            {/* Desktop navigation links */}
            <div className="hidden md:flex items-center gap-4 sm:gap-6 md:gap-8">
              <button
                onClick={() => scrollToSection("home")}
                className="text-xs sm:text-sm font-light tracking-wider hover:opacity-60 transition-opacity"
              >
                Welcome
              </button>
              <button
                onClick={() => scrollToSection("about")}
                className="text-xs sm:text-sm font-light tracking-wider hover:opacity-60 transition-opacity"
              >
                About
              </button>
              <Link
                to="/projects"
                className="text-xs sm:text-sm font-light tracking-wider hover:opacity-60 transition-opacity"
              >
                Projects
              </Link>
              <button
                onClick={() => scrollToSection("contact")}
                className="text-xs sm:text-sm font-light tracking-wider hover:opacity-60 transition-opacity"
              >
                Contact
              </button>
            </div>

            {/* Centered logo */}
            <div className="absolute left-1/2 -translate-x-1/2">
              <Link
                to="/"
                className="text-base sm:text-xl md:text-2xl font-semibold tracking-wide hover:opacity-60 transition-opacity"
              >
                STUDIO BURA
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile full-screen overlay menu */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 z-[100] bg-white md:hidden transition-opacity duration-300"
          style={{ animation: "fadeInSubtle 0.25s ease-out forwards" }}
        >
          {/* Close button */}
          <button
            onClick={() => setIsMobileMenuOpen(false)}
            className="absolute top-4 left-4 text-black hover:opacity-60 transition-all duration-300 z-10"
            aria-label="Close menu"
          >
            <X size={24} strokeWidth={1.5} />
          </button>

          {/* Menu items centered */}
          <div className="flex flex-col items-center gap-6 text-black pt-16 w-full">
            <button
              onClick={() => scrollToSection("home")}
              className="text-2xl font-light tracking-wider hover:opacity-60 transition-opacity"
            >
              Welcome
            </button>
            <button
              onClick={() => scrollToSection("about")}
              className="text-2xl font-light tracking-wider hover:opacity-60 transition-opacity"
            >
              About
            </button>
            <Link
              to="/projects"
              className="text-2xl font-light tracking-wider hover:opacity-60 transition-opacity"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Projects
            </Link>
            <button
              onClick={() => scrollToSection("contact")}
              className="text-2xl font-light tracking-wider hover:opacity-60 transition-opacity"
            >
              Contact
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Navigation;
