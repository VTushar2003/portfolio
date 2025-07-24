import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { Code, Database, Cloud, Smartphone, Settings, Zap } from "lucide-react";

interface Skill {
  name: string;
  level: number;
  category: string;
  icon: any;
  color: string;
  x: number;
  y: number;
  z: number;
}

const skills: Skill[] = [
  { name: "React.js", level: 95, category: "Frontend", icon: Code, color: "#00FFFF", x: 100, y: 50, z: 0 },
  { name: "Next.js", level: 90, category: "Frontend", icon: Code, color: "#00FFFF", x: -100, y: -50, z: 50 },
  { name: "React Native", level: 85, category: "Mobile", icon: Smartphone, color: "#8A2BE2", x: 50, y: 100, z: -30 },
  { name: "Node.js", level: 92, category: "Backend", icon: Database, color: "#3CB9FF", x: -50, y: -100, z: 20 },
  { name: "NestJS", level: 88, category: "Backend", icon: Database, color: "#3CB9FF", x: 120, y: -20, z: -40 },
  { name: "MongoDB", level: 90, category: "Database", icon: Database, color: "#8A2BE2", x: -120, y: 80, z: 10 },
  { name: "AWS", level: 87, category: "Cloud", icon: Cloud, color: "#00FFFF", x: 0, y: -80, z: 60 },
  { name: "Docker", level: 85, category: "DevOps", icon: Settings, color: "#3CB9FF", x: 80, y: 0, z: -20 },
  { name: "Firebase", level: 90, category: "Cloud", icon: Cloud, color: "#8A2BE2", x: -80, y: 40, z: 40 },
  { name: "n8n", level: 88, category: "Automation", icon: Zap, color: "#00FFFF", x: 40, y: -60, z: -50 }
];

export default function Skills3D() {
  const containerRef = useRef<HTMLDivElement>(null);
  const orbitRef = useRef<HTMLDivElement>(null);
  const [selectedSkill, setSelectedSkill] = useState<Skill | null>(null);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    if (!orbitRef.current) return;

    const skillElements = orbitRef.current.querySelectorAll('.skill-node');
    
    // Create the 3D orbit animation
    const tl = gsap.timeline({ repeat: -1 });
    
    skillElements.forEach((element, index) => {
      const skill = skills[index];
      
      // Initial positioning in 3D space
      gsap.set(element, {
        x: skill.x,
        y: skill.y,
        z: skill.z,
        rotationX: Math.random() * 360,
        rotationY: Math.random() * 360,
      });

      // Continuous rotation and floating
      gsap.to(element, {
        rotationY: "+=360",
        duration: 15 + index,
        repeat: -1,
        ease: "none"
      });

      gsap.to(element, {
        y: skill.y + Math.sin(index) * 20,
        duration: 3 + index * 0.5,
        repeat: -1,
        yoyo: true,
        ease: "power2.inOut"
      });
    });

    // Orbit container rotation
    gsap.to(orbitRef.current, {
      rotationY: 360,
      duration: 30,
      repeat: -1,
      ease: "none"
    });

  }, []);

  const getSkillColor = (category: string) => {
    switch (category) {
      case 'Frontend': return 'from-cyan-500 to-blue-500';
      case 'Backend': return 'from-purple-500 to-pink-500';
      case 'Mobile': return 'from-green-500 to-teal-500';
      case 'Cloud': return 'from-blue-500 to-indigo-500';
      case 'Database': return 'from-orange-500 to-red-500';
      case 'DevOps': return 'from-yellow-500 to-orange-500';
      case 'Automation': return 'from-emerald-500 to-cyan-500';
      default: return 'from-gray-500 to-gray-600';
    }
  };

  return (
    <section id="skills" className="py-20 bg-gradient-to-b from-black via-gray-900 to-black relative overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold text-holographic mb-6">Technical Arsenal</h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Explore my 3D skill constellation - hover over each technology to see proficiency levels and experience details
          </p>
        </div>

        <div className="relative">
          {/* 3D Skills Orbit */}
          <div className="flex justify-center">
            <div 
              ref={containerRef}
              className="relative w-96 h-96 perspective-1000"
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              <div 
                ref={orbitRef}
                className="relative w-full h-full transform-gpu"
                style={{ 
                  transformStyle: "preserve-3d",
                  animationPlayState: isHovered ? 'paused' : 'running'
                }}
              >
                {skills.map((skill, index) => (
                  <div
                    key={skill.name}
                    className="skill-node absolute w-20 h-20 cursor-pointer transform-gpu"
                    style={{
                      transformStyle: "preserve-3d",
                      left: "50%",
                      top: "50%",
                      marginLeft: "-40px",
                      marginTop: "-40px"
                    }}
                    onMouseEnter={() => setSelectedSkill(skill)}
                    onMouseLeave={() => setSelectedSkill(null)}
                  >
                    {/* Skill Node */}
                    <div className={`w-full h-full rounded-full bg-gradient-to-br ${getSkillColor(skill.category)} border-2 border-white/30 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 flex items-center justify-center backdrop-blur-sm`}>
                      <skill.icon 
                        size={32} 
                        className="text-white drop-shadow-lg" 
                      />
                    </div>

                    {/* Skill Level Ring */}
                    <div className="absolute inset-0 rounded-full border-4 border-transparent">
                      <svg className="w-full h-full -rotate-90 absolute inset-0">
                        <circle
                          cx="50%"
                          cy="50%"
                          r="36"
                          fill="none"
                          stroke="rgba(255,255,255,0.2)"
                          strokeWidth="2"
                        />
                        <circle
                          cx="50%"
                          cy="50%"
                          r="36"
                          fill="none"
                          stroke={skill.color}
                          strokeWidth="3"
                          strokeLinecap="round"
                          strokeDasharray={`${2 * Math.PI * 36}`}
                          strokeDashoffset={`${2 * Math.PI * 36 * (1 - skill.level / 100)}`}
                          className="transition-all duration-1000"
                        />
                      </svg>
                    </div>

                    {/* Glow Effect */}
                    <div 
                      className="absolute inset-0 rounded-full opacity-0 hover:opacity-100 transition-opacity duration-300"
                      style={{
                        boxShadow: `0 0 30px ${skill.color}`,
                        background: `radial-gradient(circle, ${skill.color}20 0%, transparent 70%)`
                      }}
                    />
                  </div>
                ))}
              </div>

              {/* Center Core */}
              <div className="absolute inset-1/2 w-8 h-8 -ml-4 -mt-4 bg-gradient-to-br from-cyan-400 to-purple-400 rounded-full shadow-lg z-10">
                <div className="w-full h-full rounded-full bg-gradient-to-br from-white/30 to-transparent animate-pulse" />
              </div>
            </div>
          </div>

          {/* Skill Detail Panel */}
          {selectedSkill && (
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20 pointer-events-none">
              <div className="glass-effect p-6 rounded-xl border border-cyan-400/50 min-w-64 text-center animate-slide-up">
                <h3 className="text-2xl font-bold text-white mb-2">{selectedSkill.name}</h3>
                <p className="text-cyan-400 mb-3">{selectedSkill.category}</p>
                <div className="flex items-center justify-center gap-2 mb-3">
                  <div className="flex-1 h-2 bg-gray-700 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-cyan-500 to-purple-500 rounded-full transition-all duration-1000"
                      style={{ width: `${selectedSkill.level}%` }}
                    />
                  </div>
                  <span className="text-white font-bold">{selectedSkill.level}%</span>
                </div>
                <p className="text-gray-300 text-sm">
                  {selectedSkill.level >= 90 ? "Expert Level" : 
                   selectedSkill.level >= 80 ? "Advanced" : "Intermediate"}
                </p>
              </div>
            </div>
          )}

          {/* Background Grid */}
          <div className="absolute inset-0 opacity-10">
            <div className="grid-background"></div>
          </div>
        </div>

        {/* Skill Categories */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6">
          {['Frontend', 'Backend', 'Mobile', 'Cloud'].map((category) => (
            <div key={category} className="glass-effect p-6 rounded-xl text-center hover:border-cyan-400/50 transition-all duration-300">
              <h3 className="text-lg font-semibold text-white mb-2">{category}</h3>
              <div className="text-sm text-gray-400">
                {skills.filter(skill => skill.category === category).length} Technologies
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}