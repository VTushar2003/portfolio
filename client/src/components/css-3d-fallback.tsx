import { useEffect, useRef } from "react";
import { gsap } from "gsap";

export function CSS3DHero() {
  const cubeRef = useRef<HTMLDivElement>(null);
  const orbitRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (cubeRef.current) {
      gsap.to(cubeRef.current, {
        rotationY: 360,
        duration: 20,
        repeat: -1,
        ease: "none"
      });
    }

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

  return (
    <div className="relative w-full h-[600px] flex items-center justify-center perspective-1000">
      {/* Holographic Grid Background */}
      <div className="absolute inset-0 opacity-20">
        <div className="w-full h-full" style={{
          backgroundImage: `
            linear-gradient(rgba(0,255,255,0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0,255,255,0.1) 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px'
        }} />
      </div>

      {/* Main 3D Cube */}
      <div 
        ref={cubeRef}
        className="relative w-80 h-80 transform-gpu"
        style={{ transformStyle: "preserve-3d" }}
      >
        {/* Cube Faces */}
        {[
          { transform: "translateZ(140px)", gradient: "from-cyan-500/30 to-blue-500/30", border: "border-cyan-400/70" },
          { transform: "rotateY(90deg) translateZ(140px)", gradient: "from-purple-500/30 to-pink-500/30", border: "border-purple-400/70" },
          { transform: "rotateY(180deg) translateZ(140px)", gradient: "from-blue-500/30 to-indigo-500/30", border: "border-blue-400/70" },
          { transform: "rotateY(-90deg) translateZ(140px)", gradient: "from-green-500/30 to-teal-500/30", border: "border-green-400/70" },
          { transform: "rotateX(90deg) translateZ(140px)", gradient: "from-yellow-500/30 to-orange-500/30", border: "border-yellow-400/70" },
          { transform: "rotateX(-90deg) translateZ(140px)", gradient: "from-red-500/30 to-pink-500/30", border: "border-red-400/70" }
        ].map((face, index) => (
          <div
            key={index}
            className={`absolute inset-0 bg-gradient-to-br ${face.gradient} ${face.border} border rounded-lg backdrop-blur-sm`}
            style={{ transform: face.transform }}
          />
        ))}

        {/* Center Profile Image */}
        <div className="absolute inset-8 flex items-center justify-center">
          <div className="w-48 h-48 rounded-full bg-gradient-to-br from-cyan-400/40 to-purple-400/40 border-2 border-cyan-400/80 flex items-center justify-center backdrop-blur-md animate-pulse">
            <div className="w-40 h-40 rounded-full bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center border border-cyan-400/50">
              <span className="text-4xl font-bold text-holographic">TV</span>
            </div>
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

      {/* Floating Particles */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-cyan-400 rounded-full animate-float opacity-60"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${3 + Math.random() * 4}s`
            }}
          />
        ))}
      </div>
    </div>
  );
}

export function CSS3DSkills() {
  const skillsData = [
    { name: "React", level: 95, x: 150, y: 100, color: "cyan" },
    { name: "Node.js", level: 92, x: -150, y: 50, color: "green" },
    { name: "Next.js", level: 90, x: 100, y: -120, color: "white" },
    { name: "AWS", level: 87, x: -100, y: -80, color: "orange" },
    { name: "MongoDB", level: 90, x: 0, y: 150, color: "purple" },
    { name: "Docker", level: 85, x: -50, y: -150, color: "blue" }
  ];

  return (
    <div className="relative w-full h-[500px] flex items-center justify-center perspective-1000">
      <div className="relative w-96 h-96" style={{ transformStyle: "preserve-3d" }}>
        {skillsData.map((skill, index) => (
          <div
            key={skill.name}
            className="absolute w-20 h-20 transform-gpu animate-float hover:scale-110 transition-transform duration-300 cursor-pointer"
            style={{
              left: "50%",
              top: "50%",
              marginLeft: "-40px",
              marginTop: "-40px",
              transform: `translate3d(${skill.x}px, ${skill.y}px, ${Math.sin(index) * 50}px)`,
              animationDelay: `${index * 0.5}s`
            }}
          >
            <div className={`w-full h-full rounded-full bg-gradient-to-br from-${skill.color}-500/30 to-${skill.color}-600/30 border-2 border-${skill.color}-400/70 backdrop-blur-sm flex flex-col items-center justify-center text-white shadow-lg`}>
              <div className="text-xs font-bold">{skill.name}</div>
              <div className="text-xs opacity-80">{skill.level}%</div>
            </div>
            <div className="absolute inset-0 rounded-full opacity-0 hover:opacity-100 transition-opacity duration-300" style={{
              boxShadow: `0 0 20px rgb(${skill.color === 'cyan' ? '0 255 255' : skill.color === 'green' ? '0 255 0' : skill.color === 'white' ? '255 255 255' : skill.color === 'orange' ? '255 165 0' : skill.color === 'purple' ? '128 0 128' : '0 0 255'})`
            }} />
          </div>
        ))}
      </div>
    </div>
  );
}