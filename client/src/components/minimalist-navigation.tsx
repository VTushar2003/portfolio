import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Github, Mail, ExternalLink } from "lucide-react";

const navItems = [
  { name: "About", href: "#about" },
  { name: "Skills", href: "#skills" },
  { name: "Projects", href: "#projects" },
  { name: "Contact", href: "#contact" },
];

export default function MinimalistNavigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);

      // Update active section based on scroll position
      const sections = navItems.map((item) => item.href.substring(1));
      const currentSection = sections.find((section) => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 100 && rect.bottom >= 100;
        }
        return false;
      });

      if (currentSection) {
        setActiveSection(currentSection);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (href: string) => {
    const element = document.getElementById(href.substring(1));
    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
        block: "start",
        inline: "nearest",
      });
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      {/* Main navigation */}
      <motion.nav
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ${
          isScrolled
            ? "bg-black/80 backdrop-blur-md border-b border-gray-800/50"
            : "bg-transparent"
        }`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, ease: [0.25, 0.25, 0.25, 0.75] }}
      >
        <div className="container mx-auto px-8 lg:px-16">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <motion.div
              className="text-2xl font-light text-white cursor-pointer"
              whileHover={{ scale: 1.05 }}
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            >
              <span className="text-transparent bg-gradient-to-r from-blue-400 to-violet-400 bg-clip-text">
                TV
              </span>
            </motion.div>

            {/* Desktop navigation */}
            <div className="hidden md:flex items-center space-x-8">
              {navItems.map((item) => (
                <motion.button
                  key={item.name}
                  onClick={() => scrollToSection(item.href)}
                  className={`text-sm font-medium transition-colors duration-300 relative ${
                    activeSection === item.href.substring(1)
                      ? "text-blue-400"
                      : "text-gray-400 hover:text-white"
                  }`}
                  whileHover={{ y: -2 }}
                  data-cursor-text={`Go to ${item.name}`}
                >
                  {item.name}
                  {activeSection === item.href.substring(1) && (
                    <motion.div
                      className="absolute -bottom-2 left-0 right-0 h-px bg-gradient-to-r from-blue-400 to-violet-400"
                      layoutId="activeIndicator"
                      transition={{
                        type: "spring",
                        stiffness: 300,
                        damping: 30,
                      }}
                    />
                  )}
                </motion.button>
              ))}
            </div>

            {/* Social links */}
            <div className="hidden md:flex items-center space-x-4">
              <motion.a
                href="https://github.com/VTushar2003"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full border border-gray-700/50 bg-gray-800/30 backdrop-blur-sm flex items-center justify-center text-gray-400 hover:text-white hover:border-blue-400/50 transition-all duration-300"
                whileHover={{ scale: 1.1, y: -2 }}
                data-cursor-text="GitHub"
              >
                <Github size={16} />
              </motion.a>
              <motion.a
                href="mailto:tushar.hiddenmindsolutions@gmail.com"
                className="w-10 h-10 rounded-full border border-gray-700/50 bg-gray-800/30 backdrop-blur-sm flex items-center justify-center text-gray-400 hover:text-white hover:border-violet-400/50 transition-all duration-300"
                whileHover={{ scale: 1.1, y: -2 }}
                data-cursor-text="Email"
              >
                <Mail size={16} />
              </motion.a>
            </div>

            {/* Mobile menu button */}
            <motion.button
              className="md:hidden w-10 h-10 rounded-full border border-gray-700/50 bg-gray-800/30 backdrop-blur-sm flex items-center justify-center text-gray-400"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              {isMobileMenuOpen? <X size={18} /> : <Menu size={18} />}
            </motion.button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile menu overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            className="fixed inset-0 z-50 md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {/* Backdrop */}
            <motion.div
              className="absolute inset-0 bg-black/80 backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
            />

            {/* Menu content */}
            <motion.div
              className="absolute top-0 right-0 w-80 h-full bg-gray-900/95 border-l border-gray-800/50 backdrop-blur-md"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            >
              <div className="p-8">
                {/* Close button */}
                <div className="flex justify-end mb-8">
                  <button
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="w-10 h-10 rounded-full border border-gray-700/50 bg-gray-800/30 flex items-center justify-center text-gray-400"
                  >
                    <X size={18} />
                  </button>
                </div>

                {/* Navigation items */}
                <div className="space-y-6 mb-8">
                  {navItems.map((item, index) => (
                    <motion.button
                      key={item.name}
                      onClick={() => scrollToSection(item.href)}
                      className="block w-full text-left text-xl font-light text-gray-300 hover:text-blue-400 transition-colors duration-300"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      {item.name}
                    </motion.button>
                  ))}
                </div>

                {/* Social links */}
                <div className="flex space-x-4 pt-8 border-t border-gray-800/50">
                  <motion.a
                    href="https://github.com/tusharvaghela"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 text-gray-400 hover:text-white transition-colors duration-300"
                    whileHover={{ x: 4 }}
                  >
                    <Github size={20} />
                    <span>GitHub</span>
                  </motion.a>
                  <motion.a
                    href="mailto:contact@tusharvaghela.dev"
                    className="flex items-center gap-3 text-gray-400 hover:text-white transition-colors duration-300"
                    whileHover={{ x: 4 }}
                  >
                    <Mail size={20} />
                    <span>Email</span>
                  </motion.a>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
