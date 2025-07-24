import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";

export default function Navigation() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    setIsMobileMenuOpen(false);
  };

  useEffect(() => {
    const handleScroll = () => {
      const nav = document.querySelector('nav');
      if (nav) {
        if (window.scrollY > 100) {
          nav.classList.add('nav-scrolled');
        } else {
          nav.classList.remove('nav-scrolled');
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 glass-effect">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="text-2xl font-bold text-holographic">TV</div>
            <div className="hidden md:flex space-x-8">
              <button 
                onClick={() => scrollToSection('about')} 
                className="hover:text-[hsl(180,100%,50%)] transition-colors duration-300"
              >
                About
              </button>
              <button 
                onClick={() => scrollToSection('projects')} 
                className="hover:text-[hsl(180,100%,50%)] transition-colors duration-300"
              >
                Projects
              </button>
              <button 
                onClick={() => scrollToSection('skills')} 
                className="hover:text-[hsl(180,100%,50%)] transition-colors duration-300"
              >
                Skills
              </button>
              <button 
                onClick={() => scrollToSection('contact')} 
                className="hover:text-[hsl(180,100%,50%)] transition-colors duration-300"
              >
                Contact
              </button>
            </div>
            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden text-[hsl(180,100%,50%)]"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div className={`fixed inset-0 z-40 glass-effect transform transition-transform duration-300 md:hidden ${
        isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
      }`}>
        <div className="flex flex-col items-center justify-center h-full space-y-8">
          <button 
            onClick={() => scrollToSection('about')} 
            className="text-2xl hover:text-[hsl(180,100%,50%)] transition-colors duration-300"
          >
            About
          </button>
          <button 
            onClick={() => scrollToSection('projects')} 
            className="text-2xl hover:text-[hsl(180,100%,50%)] transition-colors duration-300"
          >
            Projects
          </button>
          <button 
            onClick={() => scrollToSection('skills')} 
            className="text-2xl hover:text-[hsl(180,100%,50%)] transition-colors duration-300"
          >
            Skills
          </button>
          <button 
            onClick={() => scrollToSection('contact')} 
            className="text-2xl hover:text-[hsl(180,100%,50%)] transition-colors duration-300"
          >
            Contact
          </button>
        </div>
      </div>
    </>
  );
}
