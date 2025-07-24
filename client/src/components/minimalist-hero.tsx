import { useEffect, useRef, useState, Suspense } from "react";
import { motion, useAnimation } from "framer-motion";
import { ArrowDown, Github, Mail } from "lucide-react";

export default function MinimalistHero() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHoveringCTA, setIsHoveringCTA] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const controls = useAnimation();

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        setMousePosition({
          x: (e.clientX - rect.left) / rect.width,
          y: (e.clientY - rect.top) / rect.height,
        });
      }
    };

    const container = containerRef.current;
    if (container) {
      container.addEventListener("mousemove", handleMouseMove);
      return () => container.removeEventListener("mousemove", handleMouseMove);
    }
  }, []);

  useEffect(() => {
    controls.start({
      opacity: 1,
      y: 0,
      transition: { duration: 1.2, ease: [0.25, 0.25, 0.25, 0.75] },
    });
  }, [controls]);

  const scrollToProjects = () => {
    const element = document.getElementById("projects");
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <section
      ref={containerRef}
      className="min-h-screen flex items-center justify-center relative overflow-hidden bg-black"
    >
      {/* Subtle animated background */}
      <div className="absolute inset-0 opacity-20">
        <div
          className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-transparent to-violet-500/10"
          style={{
            transform: `translate(${mousePosition.x * 10}px, ${
              mousePosition.y * 10
            }px)`,
          }}
        />
      </div>

      {/* Main content grid */}
      <div className="container mx-auto px-8 lg:px-16 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center z-10">
        {/* Left side - Typography-driven content */}
        <motion.div
          className="space-y-12"
          initial={{ opacity: 0, y: 40 }}
          animate={controls}
        >
          {/* Role title with subtle animation */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            <p className="text-sm font-medium tracking-wider text-gray-400 uppercase mb-4">
              Full-Stack Engineer
            </p>
          </motion.div>

          {/* Main heading with motion text */}
          <div className="space-y-6">
            <motion.h1
              className="text-5xl lg:text-7xl font-light leading-tight"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 1 }}
            >
              <span className="text-white block">Tushar</span>
              <motion.span
                className="block bg-gradient-to-r from-blue-400 via-violet-400 to-blue-400 bg-clip-text text-transparent"
                animate={{
                  backgroundPosition: ["0%", "100%", "0%"],
                }}
                transition={{
                  duration: 8,
                  repeat: Infinity,
                  ease: "linear",
                }}
                style={{ backgroundSize: "200%" }}
              >
                Vaghela
              </motion.span>
            </motion.h1>

            {/* Animated description */}
            <motion.p
              className="text-xl lg:text-2xl text-gray-300 leading-relaxed max-w-2xl font-light"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 1 }}
            >
              Crafting digital experiences with
              <motion.span
                className="text-blue-400 font-medium"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                {" "}
                MERN Stack
              </motion.span>
              ,
              <motion.span
                className="text-violet-400 font-medium"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                {" "}
                Next.js
              </motion.span>
              , and
              <motion.span
                className="text-blue-400 font-medium"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                {" "}
                cloud technologies and N8N Automation
              </motion.span>
              .
            </motion.p>
          </div>

          {/* CTA buttons with advanced hover effects */}
          <motion.div
            className="flex flex-col sm:flex-row gap-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 1 }}
          >
            <motion.button
              onClick={scrollToProjects}
              onHoverStart={() => setIsHoveringCTA(true)}
              onHoverEnd={() => setIsHoveringCTA(false)}
              className="group relative px-8 py-4 overflow-hidden rounded-full border border-blue-400/30 bg-blue-400/5 backdrop-blur-sm"
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-blue-500 to-violet-500 opacity-0"
                animate={{ opacity: isHoveringCTA ? 0.1 : 0 }}
                transition={{ duration: 0.3 }}
              />
              <span className="relative text-white font-medium flex items-center gap-2">
                View Projects
                <motion.div
                  animate={{ x: isHoveringCTA ? 4 : 0 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <ArrowDown size={18} className="rotate-[-90deg]" />
                </motion.div>
              </span>
            </motion.button>

            <div className="flex gap-4">
              <motion.a
                href="https://github.com/VTushar2003"
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 rounded-full border border-gray-600/50 bg-gray-800/30 backdrop-blur-sm flex items-center justify-center text-gray-400 hover:text-white hover:border-blue-400/50 transition-all duration-300"
                whileHover={{ scale: 1.1, y: -2 }}
                whileTap={{ scale: 0.9 }}
              >
                <Github size={18} />
              </motion.a>
              <motion.a
                href="mailto:tushar.hiddenmindsolutions@gmail.com"
                className="w-12 h-12 rounded-full border border-gray-600/50 bg-gray-800/30 backdrop-blur-sm flex items-center justify-center text-gray-400 hover:text-white hover:border-violet-400/50 transition-all duration-300"
                whileHover={{ scale: 1.1, y: -2 }}
                whileTap={{ scale: 0.9 }}
              >
                <Mail size={18} />
              </motion.a>
            </div>
          </motion.div>
        </motion.div>

        {/* Right side - Spline 3D Interactive Component */}
        <motion.div
          className="relative h-[600px] flex items-center justify-center"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{
            delay: 1.2,
            duration: 1.2,
            ease: [0.25, 0.25, 0.25, 0.75],
          }}
        >
          {/* Spline 3D Scene */}
          <div className="relative w-full h-full">
            {/* Advanced CSS 3D Animation */}
            <img src="/videos/me.svg" alt="Tushar Vaghela" />
          </div>

          {/* Subtle glow effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 via-transparent to-violet-500/10 rounded-full blur-3xl" />
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2, duration: 1 }}
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="w-6 h-10 border border-gray-600/50 rounded-full flex justify-center"
        >
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="w-1 h-3 bg-gradient-to-b from-blue-400 to-transparent rounded-full mt-2"
          />
        </motion.div>
      </motion.div>
    </section>
  );
}
