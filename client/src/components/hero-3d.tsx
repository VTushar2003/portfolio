import { useEffect, useRef, useState, Suspense } from "react";
import { gsap } from "gsap";
import Typed from "typed.js";
import { Rocket, Download, Code2, Zap, Cpu, Sparkles } from "lucide-react";

// Dynamic Spline import to avoid bundle issues
const Spline = ({ scene, onLoad, onError, className }: any) => {
  const [SplineComponent, setSplineComponent] = useState<any>(null);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    const loadSpline = async () => {
      try {
        const { default: SplineLib } = await import("@splinetool/react-spline");
        setSplineComponent(() => SplineLib);
      } catch (error) {
        console.log("Spline not available, using CSS 3D fallback");
        setHasError(true);
        if (onError) onError();
      }
    };
    loadSpline();
  }, [onError]);

  if (hasError || !SplineComponent) return null;

  return (
    <SplineComponent 
      scene={scene} 
      onLoad={onLoad}
      onError={() => {
        setHasError(true);
        if (onError) onError();
      }}
      className={className}
    />
  );
};

export default function Hero3D() {
  const containerRef = useRef<HTMLDivElement>(null);
  const cubeRef = useRef<HTMLDivElement>(null);
  const typedRef = useRef<HTMLSpanElement>(null);
  const particlesRef = useRef<HTMLDivElement>(null);
  const orbitRef = useRef<HTMLDivElement>(null);
  const [useSpline, setUseSpline] = useState(true);
  const [splineLoaded, setSplineLoaded] = useState(false);

  useEffect(() => {
    // Initialize Typed.js for the hero text
    if (typedRef.current) {
      const typed = new Typed(typedRef.current, {
        strings: [
          "Full Stack Engineer",
          "Innovation Architect", 
          "Cloud Solutions Expert",
          "Automation Specialist"
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
    // GSAP animations for 3D hologram cube
    if (cubeRef.current) {
      gsap.to(cubeRef.current, {
        rotationY: 360,
        duration: 20,
        repeat: -1,
        ease: "none"
      });

      gsap.to(cubeRef.current, {
        rotationX: 15,
        duration: 4,
        repeat: -1,
        yoyo: true,
        ease: "power2.inOut"
      });
    }

    // Floating tech orbit animation
    if (orbitRef.current) {
      const techIcons = orbitRef.current.querySelectorAll('.tech-icon');
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

    // Animated particles
    if (particlesRef.current) {
      const particles = particlesRef.current.querySelectorAll('.particle');
      particles.forEach((particle, index) => {
        gsap.to(particle, {
          y: -100,
          x: Math.random() * 200 - 100,
          opacity: 0,
          duration: 3 + Math.random() * 2,
          repeat: -1,
          delay: index * 0.5,
          ease: "power2.out"
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
    <section className="min-h-screen flex items-center justify-center relative overflow-hidden bg-gradient-to-br from-black via-gray-900 to-black">
      {/* Matrix Background */}
      <div className="absolute inset-0 opacity-10">
        <div className="matrix-bg"></div>
      </div>

      {/* Floating Particles */}
      <div ref={particlesRef} className="absolute inset-0">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="particle absolute w-1 h-1 bg-cyan-400 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              bottom: '0px',
              opacity: Math.random() * 0.8 + 0.2
            }}
          />
        ))}
      </div>

      {/* Main Content */}
      <div ref={containerRef} className="container mx-auto px-6 text-center z-10 relative">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          {/* Left Side - Text Content */}
          <div className="space-y-8">
            <div className="space-y-4">
              <h1 className="text-6xl md:text-8xl font-bold">
                <span className="text-holographic">Tushar</span>
                <br />
                <span className="text-white">Vaghela</span>
              </h1>
              
              <div className="text-2xl md:text-3xl text-cyan-400 h-12">
                <span ref={typedRef}></span>
              </div>
              
              <p className="text-lg text-gray-300 max-w-2xl mx-auto leading-relaxed">
                Crafting cutting-edge digital experiences with 2+ years of expertise in 
                <span className="text-cyan-400"> MERN Stack</span>, 
                <span className="text-purple-400"> Next.js</span>, 
                <span className="text-blue-400"> React Native</span>, and 
                <span className="text-cyan-400"> cloud technologies</span>.
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <button 
                onClick={scrollToProjects}
                className="group relative px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-lg font-semibold text-black transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-cyan-500/50"
              >
                <div className="flex items-center gap-2">
                  <Rocket size={20} />
                  Explore Projects
                </div>
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-blue-400 rounded-lg opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
              </button>
              
              <button className="group relative px-8 py-4 border-2 border-purple-500 text-purple-400 rounded-lg font-semibold transition-all duration-300 hover:bg-purple-500 hover:text-black hover:scale-105">
                <div className="flex items-center gap-2">
                  <Download size={20} />
                  Download Resume
                </div>
              </button>
            </div>
          </div>

          {/* Right Side - 3D Hologram with Spline Enhancement */}
          <div className="relative">
            {/* Enhanced 3D Display Container */}
            <div className="relative w-80 h-80 mx-auto perspective-1000">
              
              {/* Spline 3D Scene (Progressive Enhancement) */}
              {useSpline && (
                <div className="absolute inset-0 z-20">
                  <Suspense fallback={
                    <div className="flex items-center justify-center h-full">
                      <div className="text-center">
                        <Sparkles className="w-8 h-8 text-cyan-400 animate-spin mx-auto mb-2" />
                        <p className="text-cyan-400 text-sm">Loading 3D Experience...</p>
                      </div>
                    </div>
                  }>
                    <Spline
                      scene="https://prod.spline.design/6Wq1Q7YGyM-iab9i/scene.splinecode"
                      onLoad={() => setSplineLoaded(true)}
                      onError={() => setUseSpline(false)}
                      className="w-full h-full"
                    />
                  </Suspense>
                </div>
              )}

              {/* CSS 3D Fallback (Always Available) */}
              <div className={`relative w-full h-full transform-gpu ${splineLoaded ? 'opacity-20' : 'opacity-100'} transition-opacity duration-1000`}>
                {/* Main Hologram Cube */}
                <div 
                  ref={cubeRef}
                  className="relative w-full h-full transform-gpu"
                  style={{ transformStyle: "preserve-3d" }}
                >
                  {/* Enhanced Cube Faces with Better Gradients */}
                  {[
                    { transform: "translateZ(40px)", gradient: "from-cyan-500/30 to-purple-500/30", border: "border-cyan-400/70", shadow: "shadow-cyan-400/30" },
                    { transform: "rotateY(90deg) translateZ(40px)", gradient: "from-purple-500/30 to-blue-500/30", border: "border-purple-400/70", shadow: "shadow-purple-400/30" },
                    { transform: "rotateY(180deg) translateZ(40px)", gradient: "from-blue-500/30 to-cyan-500/30", border: "border-blue-400/70", shadow: "shadow-blue-400/30" },
                    { transform: "rotateY(-90deg) translateZ(40px)", gradient: "from-cyan-500/30 to-purple-500/30", border: "border-cyan-400/70", shadow: "shadow-cyan-400/30" },
                    { transform: "rotateX(90deg) translateZ(40px)", gradient: "from-purple-500/30 to-blue-500/30", border: "border-purple-400/70", shadow: "shadow-purple-400/30" },
                    { transform: "rotateX(-90deg) translateZ(40px)", gradient: "from-blue-500/30 to-cyan-500/30", border: "border-blue-400/70", shadow: "shadow-blue-400/30" }
                  ].map((face, index) => (
                    <div
                      key={index}
                      className={`absolute inset-0 bg-gradient-to-br ${face.gradient} ${face.border} border rounded-lg backdrop-blur-sm shadow-lg ${face.shadow}`}
                      style={{ transform: face.transform }}
                    />
                  ))}
                  
                  {/* Enhanced Profile Image in Center */}
                  <div className="absolute inset-4 flex items-center justify-center">
                    <div className="w-48 h-48 rounded-full bg-gradient-to-br from-cyan-400/40 to-purple-400/40 border-2 border-cyan-400/80 flex items-center justify-center backdrop-blur-md shadow-2xl shadow-cyan-400/50 animate-pulse">
                      <div className="w-40 h-40 rounded-full bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center border border-cyan-400/50 shadow-inner">
                        <span className="text-4xl font-bold text-holographic">TV</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Enhanced Orbiting Tech Icons */}
                <div ref={orbitRef} className="absolute inset-0">
                  {[
                    { icon: Code2, color: "text-cyan-400", delay: 0, radius: 180, name: "Frontend" },
                    { icon: Zap, color: "text-purple-400", delay: 60, radius: 180, name: "Backend" },
                    { icon: Cpu, color: "text-blue-400", delay: 120, radius: 180, name: "Cloud" },
                    { icon: Rocket, color: "text-green-400", delay: 180, radius: 180, name: "Mobile" },
                  ].map((item, index) => (
                    <div
                      key={index}
                      className={`tech-icon absolute w-14 h-14 ${item.color} rounded-full border-2 border-current/70 bg-current/20 backdrop-blur-sm flex items-center justify-center transform-gpu cursor-pointer hover:scale-110 transition-all duration-300 shadow-lg`}
                      style={{
                        left: "50%",
                        top: "50%",
                        transform: `translate(-50%, -50%) rotate(${item.delay}deg) translateX(${item.radius}px) rotate(-${item.delay}deg)`,
                        filter: `drop-shadow(0 0 10px currentColor)`
                      }}
                      title={item.name}
                    >
                      <item.icon size={28} />
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Enhanced Holographic Grid Lines */}
            <div className="absolute inset-0 opacity-40 pointer-events-none">
              <div className="absolute top-0 left-1/2 w-px h-full bg-gradient-to-b from-cyan-400 via-cyan-400/50 to-transparent animate-pulse"></div>
              <div className="absolute left-0 top-1/2 w-full h-px bg-gradient-to-r from-transparent via-cyan-400/50 to-transparent animate-pulse"></div>
              <div className="absolute top-1/4 left-1/4 w-px h-1/2 bg-gradient-to-b from-purple-400/30 to-transparent"></div>
              <div className="absolute top-1/4 right-1/4 w-px h-1/2 bg-gradient-to-b from-blue-400/30 to-transparent"></div>
            </div>

            {/* 3D Technology Indicator */}
            <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2">
              <div className="px-4 py-2 bg-black/80 border border-cyan-400/50 rounded-full backdrop-blur-sm">
                <p className="text-cyan-400 text-xs font-medium flex items-center gap-2">
                  <Sparkles size={12} />
                  {splineLoaded ? "Enhanced 3D Mode" : "CSS 3D Hologram"}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scan Lines Effect */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="scan-lines"></div>
      </div>
    </section>
  );
}