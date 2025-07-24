import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import Typed from "typed.js";
import { Rocket, Download } from "lucide-react";

export default function SplineHero() {
  const typedRef = useRef<HTMLSpanElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const cubeRef = useRef<HTMLDivElement>(null);
  const orbitRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typedRef.current) {
      const typed = new Typed(typedRef.current, {
        strings: [
          "Full Stack Engineer",
          "Innovation Architect", 
          "Cloud Solutions Expert",
          "Automation Specialist",
          "3D Web Developer"
        ],
        typeSpeed: 50,
        backSpeed: 30,
        backDelay: 2000,
        loop: true,
        showCursor: true,
        cursorChar: "_"
      });

      return () => typed.destroy();
    }
  }, []);

  useEffect(() => {
    if (contentRef.current) {
      gsap.fromTo(contentRef.current.children,
        { opacity: 0, y: 50 },
        { 
          opacity: 1, 
          y: 0, 
          duration: 0.8, 
          stagger: 0.2, 
          ease: "power3.out",
          delay: 1 
        }
      );
    }

    // 3D Cube Animation
    if (cubeRef.current) {
      gsap.to(cubeRef.current, {
        rotationY: 360,
        duration: 20,
        repeat: -1,
        ease: "none"
      });
    }

    // Orbiting Icons Animation
    if (orbitRef.current) {
      const techIcons = orbitRef.current.querySelectorAll('.tech-orbit-icon');
      techIcons.forEach((icon, index) => {
        gsap.to(icon, {
          rotation: 360,
          duration: 15 + index * 2,
          repeat: -1,
          ease: "none",
          transformOrigin: "center center"
        });
      });
    }
  }, []);

  const scrollToProjects = () => {
    const element = document.getElementById('projects');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <section className="min-h-screen flex items-center relative overflow-hidden bg-black">
      {/* CSS 3D Background */}
      <div className="absolute inset-0 z-0">
        <div className="flex items-center justify-center h-full">
          <div className="relative w-80 h-80 transform-gpu" style={{ transformStyle: "preserve-3d" }}>
            {/* Animated 3D Cube */}
            <div 
              ref={cubeRef}
              className="relative w-full h-full transform-gpu"
              style={{ transformStyle: "preserve-3d" }}
            >
              {/* Cube Faces */}
              {[
                { transform: "translateZ(140px)", gradient: "from-cyan-500/20 to-blue-500/20", border: "border-cyan-400/50" },
                { transform: "rotateY(90deg) translateZ(140px)", gradient: "from-purple-500/20 to-pink-500/20", border: "border-purple-400/50" },
                { transform: "rotateY(180deg) translateZ(140px)", gradient: "from-blue-500/20 to-indigo-500/20", border: "border-blue-400/50" },
                { transform: "rotateY(-90deg) translateZ(140px)", gradient: "from-green-500/20 to-teal-500/20", border: "border-green-400/50" },
                { transform: "rotateX(90deg) translateZ(140px)", gradient: "from-yellow-500/20 to-orange-500/20", border: "border-yellow-400/50" },
                { transform: "rotateX(-90deg) translateZ(140px)", gradient: "from-red-500/20 to-pink-500/20", border: "border-red-400/50" }
              ].map((face, index) => (
                <div
                  key={index}
                  className={`absolute inset-0 bg-gradient-to-br ${face.gradient} ${face.border} border rounded-lg backdrop-blur-sm`}
                  style={{ transform: face.transform }}
                />
              ))}

              {/* Center Logo */}
              <div className="absolute inset-8 flex items-center justify-center">
                <div className="w-48 h-48 rounded-full bg-gradient-to-br from-cyan-400/30 to-purple-400/30 border-2 border-cyan-400/70 flex items-center justify-center backdrop-blur-md">
                  <span className="text-4xl font-bold text-holographic">TV</span>
                </div>
              </div>
            </div>

            {/* Orbiting Tech Icons */}
            <div ref={orbitRef} className="absolute inset-0">
              {[
                { icon: "⚛️", name: "React", angle: 0, radius: 200, color: "text-cyan-400" },
                { icon: "⚡", name: "Node.js", angle: 72, radius: 200, color: "text-green-400" },
                { icon: "🚀", name: "Next.js", angle: 144, radius: 200, color: "text-white" },
                { icon: "📱", name: "React Native", angle: 216, radius: 200, color: "text-blue-400" },
                { icon: "☁️", name: "AWS", angle: 288, radius: 200, color: "text-orange-400" }
              ].map((tech, index) => (
                <div
                  key={tech.name}
                  className={`tech-orbit-icon absolute w-16 h-16 ${tech.color} rounded-full border border-current/50 bg-current/10 backdrop-blur-sm flex items-center justify-center text-2xl font-bold transform-gpu cursor-pointer hover:scale-110 transition-transform duration-300`}
                  style={{
                    left: "50%",
                    top: "50%",
                    transform: `translate(-50%, -50%) rotate(${tech.angle}deg) translateX(${tech.radius}px) rotate(-${tech.angle}deg)`
                  }}
                  title={tech.name}
                >
                  {tech.icon}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Dark overlay for better text readability */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-black/80 z-10"></div>

      {/* Content */}
      <div className="container mx-auto px-6 relative z-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          {/* Left Side - Text Content */}
          <div ref={contentRef} className="space-y-8">
            <div className="space-y-6">
              <h1 className="text-6xl md:text-8xl font-bold leading-tight">
                <span className="text-holographic block">Tushar</span>
                <span className="text-white block">Vaghela</span>
              </h1>
              
              <div className="text-2xl md:text-3xl text-cyan-400 h-12 font-light">
                <span ref={typedRef}></span>
              </div>
              
              <p className="text-lg text-gray-300 max-w-2xl leading-relaxed">
                Crafting cutting-edge digital experiences with 2+ years of expertise in 
                <span className="text-cyan-400 font-medium"> MERN Stack</span>, 
                <span className="text-purple-400 font-medium"> Next.js</span>, 
                <span className="text-blue-400 font-medium"> React Native</span>, and 
                <span className="text-cyan-400 font-medium"> cloud technologies</span>.
              </p>
            </div>

            {/* Enhanced CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <button 
                onClick={scrollToProjects}
                className="group relative px-8 py-4 overflow-hidden rounded-lg font-semibold text-black transition-all duration-300 hover:scale-105"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-blue-500 transition-transform duration-300 group-hover:scale-110"></div>
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-blue-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="relative flex items-center gap-2">
                  <Rocket size={20} />
                  Explore Projects
                </div>
              </button>
              
              <button className="group relative px-8 py-4 border-2 border-purple-500/50 text-purple-400 rounded-lg font-semibold transition-all duration-300 hover:scale-105 backdrop-blur-sm">
                <div className="absolute inset-0 bg-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg"></div>
                <div className="relative flex items-center gap-2">
                  <Download size={20} />
                  Download Resume
                </div>
              </button>
            </div>

            {/* Tech Stats */}
            <div className="grid grid-cols-3 gap-4 pt-8 border-t border-gray-800">
              <div className="text-center">
                <div className="text-2xl font-bold text-cyan-400">2+</div>
                <div className="text-sm text-gray-400">Years Experience</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-400">10+</div>
                <div className="text-sm text-gray-400">Technologies</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-400">5+</div>
                <div className="text-sm text-gray-400">Major Projects</div>
              </div>
            </div>
          </div>

          {/* Right Side - Additional 3D Elements */}
          <div className="relative lg:block hidden">
            <div className="w-full h-96 relative">
              {/* Interactive floating elements */}
              <div className="absolute inset-0">
                {[
                  { x: "20%", y: "20%", delay: 0, color: "cyan" },
                  { x: "80%", y: "30%", delay: 1, color: "purple" },
                  { x: "60%", y: "70%", delay: 2, color: "blue" },
                  { x: "30%", y: "80%", delay: 3, color: "cyan" },
                ].map((item, index) => (
                  <div
                    key={index}
                    className={`absolute w-4 h-4 bg-${item.color}-400 rounded-full opacity-80 animate-float`}
                    style={{
                      left: item.x,
                      top: item.y,
                      animationDelay: `${item.delay}s`,
                      filter: `drop-shadow(0 0 10px rgb(${item.color === 'cyan' ? '0 255 255' : item.color === 'purple' ? '138 43 226' : '0 150 255'}))`
                    }}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scan Lines Effect */}
      <div className="absolute inset-0 pointer-events-none z-30">
        <div className="scan-lines opacity-20"></div>
      </div>
    </section>
  );
}