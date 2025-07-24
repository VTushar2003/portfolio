import { Suspense, useState, useRef } from "react";
import Spline from "@splinetool/react-spline";
import { Code, Database, Cloud, Smartphone, Settings, Zap } from "lucide-react";

interface SkillData {
  name: string;
  level: number;
  category: string;
  icon: any;
  description: string;
}

const skillsData: SkillData[] = [
  { 
    name: "React.js", 
    level: 95, 
    category: "Frontend", 
    icon: Code, 
    description: "Advanced React development with hooks, context, and performance optimization" 
  },
  { 
    name: "Next.js", 
    level: 90, 
    category: "Frontend", 
    icon: Code, 
    description: "Full-stack React framework with SSR, SSG, and API routes" 
  },
  { 
    name: "React Native", 
    level: 85, 
    category: "Mobile", 
    icon: Smartphone, 
    description: "Cross-platform mobile app development with Expo integration" 
  },
  { 
    name: "Node.js", 
    level: 92, 
    category: "Backend", 
    icon: Database, 
    description: "Server-side JavaScript with Express, GraphQL, and microservices" 
  },
  { 
    name: "NestJS", 
    level: 88, 
    category: "Backend", 
    icon: Database, 
    description: "Enterprise-grade Node.js framework with TypeScript and decorators" 
  },
  { 
    name: "MongoDB", 
    level: 90, 
    category: "Database", 
    icon: Database, 
    description: "NoSQL database design, aggregation pipelines, and indexing strategies" 
  },
  { 
    name: "AWS", 
    level: 87, 
    category: "Cloud", 
    icon: Cloud, 
    description: "Cloud infrastructure with EC2, S3, Lambda, and containerization" 
  },
  { 
    name: "Docker", 
    level: 85, 
    category: "DevOps", 
    icon: Settings, 
    description: "Containerization, Docker Compose, and microservices deployment" 
  },
  { 
    name: "Firebase", 
    level: 90, 
    category: "Cloud", 
    icon: Cloud, 
    description: "Real-time databases, authentication, and serverless functions" 
  },
  { 
    name: "n8n", 
    level: 88, 
    category: "Automation", 
    icon: Zap, 
    description: "Workflow automation, API integrations, and business process optimization" 
  }
];

export default function SplineSkills() {
  const [selectedSkill, setSelectedSkill] = useState<SkillData | null>(null);
  const [hoveredCategory, setHoveredCategory] = useState<string | null>(null);
  const splineRef = useRef<any>(null);

  const categories = [
    { name: "Frontend", color: "from-cyan-500 to-blue-500", count: skillsData.filter(s => s.category === "Frontend").length },
    { name: "Backend", color: "from-purple-500 to-pink-500", count: skillsData.filter(s => s.category === "Backend").length },
    { name: "Mobile", color: "from-green-500 to-teal-500", count: skillsData.filter(s => s.category === "Mobile").length },
    { name: "Cloud", color: "from-blue-500 to-indigo-500", count: skillsData.filter(s => s.category === "Cloud").length },
    { name: "Database", color: "from-orange-500 to-red-500", count: skillsData.filter(s => s.category === "Database").length },
    { name: "DevOps", color: "from-yellow-500 to-orange-500", count: skillsData.filter(s => s.category === "DevOps").length },
    { name: "Automation", color: "from-emerald-500 to-cyan-500", count: skillsData.filter(s => s.category === "Automation").length }
  ].filter(cat => cat.count > 0);

  const handleSplineLoad = (spline: any) => {
    splineRef.current = spline;
  };

  const handleSkillHover = (skill: SkillData) => {
    setSelectedSkill(skill);
    // Trigger Spline animation based on skill category
    if (splineRef.current) {
      try {
        splineRef.current.emitEvent('mouseHover', skill.category);
      } catch (error) {
        console.log('Spline event not available');
      }
    }
  };

  return (
    <section id="skills" className="py-20 bg-gradient-to-b from-black via-gray-900 to-black relative overflow-hidden">
      <div className="container mx-auto px-6">
        
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold text-holographic mb-6">Technical Arsenal</h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Explore my interactive 3D skill constellation powered by cutting-edge technologies
          </p>
        </div>

        {/* Main 3D Skills Display */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
          
          {/* Spline 3D Scene */}
          <div className="relative h-[500px] lg:h-[600px] rounded-2xl overflow-hidden glass-effect">
            <Suspense fallback={
              <div className="flex items-center justify-center h-full">
                <div className="text-center">
                  <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-cyan-400 mx-auto mb-4"></div>
                  <p className="text-cyan-400 text-lg">Loading 3D Skills...</p>
                  <p className="text-gray-400 text-sm mt-2">Interactive constellation initializing</p>
                </div>
              </div>
            }>
              <Spline 
                scene="https://prod.spline.design/zJyNsNPdXBmKK1RO/scene.splinecode"
                onLoad={handleSplineLoad}
                style={{ width: '100%', height: '100%' }}
              />
            </Suspense>
            
            {/* Overlay for better interaction */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none"></div>
          </div>

          {/* Skills Information Panel */}
          <div className="space-y-6">
            
            {/* Selected Skill Details */}
            {selectedSkill ? (
              <div className="glass-effect p-8 rounded-2xl border-2 border-cyan-400/30 animate-slide-up">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-cyan-500 to-purple-500 rounded-full flex items-center justify-center">
                    <selectedSkill.icon size={24} className="text-white" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-white">{selectedSkill.name}</h3>
                    <p className="text-cyan-400">{selectedSkill.category}</p>
                  </div>
                </div>
                
                <div className="mb-4">
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span className="text-gray-300">Proficiency</span>
                    <span className="text-white font-bold">{selectedSkill.level}%</span>
                  </div>
                  <div className="w-full h-3 bg-gray-800 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-cyan-500 to-purple-500 rounded-full transition-all duration-1000"
                      style={{ width: `${selectedSkill.level}%` }}
                    />
                  </div>
                </div>
                
                <p className="text-gray-300 leading-relaxed">{selectedSkill.description}</p>
              </div>
            ) : (
              <div className="glass-effect p-8 rounded-2xl text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-gray-600 to-gray-700 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Zap size={24} className="text-gray-400" />
                </div>
                <h3 className="text-xl font-semibold text-gray-300 mb-2">Interactive Skills Exploration</h3>
                <p className="text-gray-400 mb-4">
                  Hover over skills in the 3D scene or click on categories below to explore my technical expertise
                </p>
                <div className="text-sm text-cyan-400">
                  Powered by Spline 3D Technology
                </div>
              </div>
            )}

            {/* Skills Grid */}
            <div className="grid grid-cols-2 gap-3">
              {skillsData.map((skill) => (
                <button
                  key={skill.name}
                  className="glass-effect p-4 rounded-lg text-left hover:border-cyan-400/50 transition-all duration-300 group"
                  onMouseEnter={() => handleSkillHover(skill)}
                  onMouseLeave={() => setSelectedSkill(null)}
                >
                  <div className="flex items-center gap-3">
                    <skill.icon size={20} className="text-cyan-400 group-hover:text-white transition-colors" />
                    <div>
                      <div className="text-sm font-medium text-white group-hover:text-cyan-400 transition-colors">
                        {skill.name}
                      </div>
                      <div className="text-xs text-gray-400">{skill.level}%</div>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Category Overview */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
          {categories.map((category) => (
            <div 
              key={category.name} 
              className="glass-effect p-6 rounded-xl text-center hover:border-cyan-400/50 transition-all duration-300 cursor-pointer group"
              onMouseEnter={() => setHoveredCategory(category.name)}
              onMouseLeave={() => setHoveredCategory(null)}
            >
              <div className={`w-12 h-12 mx-auto mb-3 rounded-full bg-gradient-to-br ${category.color} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                <div className="w-6 h-6 bg-white/20 rounded-full"></div>
              </div>
              <h3 className="text-sm font-semibold text-white mb-1 group-hover:text-cyan-400 transition-colors">
                {category.name}
              </h3>
              <div className="text-xs text-gray-400">
                {category.count} {category.count === 1 ? 'Skill' : 'Skills'}
              </div>
              {hoveredCategory === category.name && (
                <div className="absolute inset-0 bg-cyan-400/10 rounded-xl animate-pulse"></div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Background Grid Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="grid-background"></div>
      </div>
    </section>
  );
}