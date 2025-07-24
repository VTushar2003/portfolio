import { Laptop, Server, Cloud } from "lucide-react";

interface SkillItemProps {
  name: string;
  percentage: number;
  color: string;
}

function SkillItem({ name, percentage, color }: SkillItemProps) {
  return (
    <div className="skill-item">
      <div className="flex justify-between mb-2">
        <span>{name}</span>
        <span className={`text-[${color}]`}>{percentage}%</span>
      </div>
      <div className="w-full bg-gray-800 rounded-full h-2 skill-bar">
        <div 
          className={`bg-gradient-to-r from-[${color}] to-[hsl(199,89%,48%)] h-2 rounded-full`}
          style={{ width: `${percentage}%` }}
        ></div>
      </div>
    </div>
  );
}

export default function SkillsSection() {
  const frontendSkills = [
    { name: "React.js", percentage: 95, color: "hsl(180,100%,50%)" },
    { name: "Next.js", percentage: 90, color: "hsl(180,100%,50%)" },
    { name: "React Native", percentage: 85, color: "hsl(180,100%,50%)" },
  ];

  const backendSkills = [
    { name: "Node.js", percentage: 92, color: "hsl(259,83%,67%)" },
    { name: "Nest.js", percentage: 88, color: "hsl(259,83%,67%)" },
    { name: "MongoDB", percentage: 90, color: "hsl(259,83%,67%)" },
  ];

  const cloudSkills = [
    { name: "AWS", percentage: 87, color: "hsl(199,89%,48%)" },
    { name: "Docker", percentage: 85, color: "hsl(199,89%,48%)" },
    { name: "Firebase", percentage: 90, color: "hsl(199,89%,48%)" },
  ];

  const techIcons = [
    { icon: "fab fa-react", color: "hsl(180,100%,50%)" },
    { icon: "fab fa-node-js", color: "hsl(259,83%,67%)" },
    { icon: "fab fa-aws", color: "hsl(199,89%,48%)" },
    { icon: "fab fa-docker", color: "hsl(180,100%,50%)" },
    { icon: "fab fa-js-square", color: "hsl(259,83%,67%)" },
    { icon: "fab fa-python", color: "hsl(199,89%,48%)" },
  ];

  return (
    <section id="skills" className="py-20">
      <div className="container mx-auto px-6">
        <h2 className="text-4xl font-bold text-center mb-16 text-holographic">Technical Arsenal</h2>
        
        {/* Skills Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Frontend Skills */}
          <div className="glass-effect p-8 rounded-2xl card-3d hover:border-[hsl(180,100%,50%)]">
            <div className="text-center mb-6">
              <Laptop className="w-12 h-12 text-[hsl(180,100%,50%)] mb-4 mx-auto" />
              <h3 className="text-2xl font-bold text-[hsl(180,100%,50%)]">Frontend</h3>
            </div>
            <div className="space-y-4">
              {frontendSkills.map((skill) => (
                <SkillItem key={skill.name} {...skill} />
              ))}
            </div>
          </div>

          {/* Backend Skills */}
          <div className="glass-effect p-8 rounded-2xl card-3d hover:border-[hsl(259,83%,67%)]">
            <div className="text-center mb-6">
              <Server className="w-12 h-12 text-[hsl(259,83%,67%)] mb-4 mx-auto" />
              <h3 className="text-2xl font-bold text-[hsl(259,83%,67%)]">Backend</h3>
            </div>
            <div className="space-y-4">
              {backendSkills.map((skill) => (
                <SkillItem key={skill.name} {...skill} />
              ))}
            </div>
          </div>

          {/* Cloud & DevOps Skills */}
          <div className="glass-effect p-8 rounded-2xl card-3d hover:border-[hsl(199,89%,48%)]">
            <div className="text-center mb-6">
              <Cloud className="w-12 h-12 text-[hsl(199,89%,48%)] mb-4 mx-auto" />
              <h3 className="text-2xl font-bold text-[hsl(199,89%,48%)]">Cloud & DevOps</h3>
            </div>
            <div className="space-y-4">
              {cloudSkills.map((skill) => (
                <SkillItem key={skill.name} {...skill} />
              ))}
            </div>
          </div>
        </div>

        {/* Tech Stack Icons */}
        <div className="mt-16">
          <h3 className="text-2xl font-bold text-center mb-8 text-gray-300">Technologies I Work With</h3>
          <div className="flex flex-wrap justify-center gap-8">
            {techIcons.map((tech, index) => (
              <div 
                key={index}
                className="glass-effect p-4 rounded-lg hover:border-[hsl(180,100%,50%)] transition-all duration-300 card-3d"
              >
                <i className={`${tech.icon} text-3xl`} style={{ color: tech.color }}></i>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
