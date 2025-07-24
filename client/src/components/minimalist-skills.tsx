import { useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface Skill {
  name: string;
  level: number;
  category: string;
  color: string;
  description: string;
}

const skillsData: Skill[] = [
  { name: "React.js", level: 95, category: "Frontend", color: "blue", description: "Advanced React development with hooks and performance optimization" },
  { name: "Next.js", level: 90, category: "Frontend", color: "violet", description: "Full-stack React framework with SSR and API routes" },
  { name: "Node.js", level: 92, category: "Backend", color: "green", description: "Server-side JavaScript with Express and microservices" },
  { name: "NestJS", level: 88, category: "Backend", color: "red", description: "Enterprise-grade Node.js framework with TypeScript" },
  { name: "React Native", level: 85, category: "Mobile", color: "cyan", description: "Cross-platform mobile app development" },
  { name: "MongoDB", level: 90, category: "Database", color: "emerald", description: "NoSQL database design and optimization" },
  { name: "AWS", level: 87, category: "Cloud", color: "orange", description: "Cloud infrastructure and serverless architecture" },
  { name: "Docker", level: 85, category: "DevOps", color: "blue", description: "Containerization and microservices deployment" },
  { name: "Firebase", level: 90, category: "Cloud", color: "yellow", description: "Real-time databases and authentication" },
  { name: "n8n", level: 88, category: "Automation", color: "purple", description: "Workflow automation and API integrations" },
];

const categories = ["All", "Frontend", "Backend", "Mobile", "Cloud", "Database", "DevOps", "Automation"];

export default function MinimalistSkills() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [hoveredSkill, setHoveredSkill] = useState<Skill | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
    layoutEffect: false
  });

  const y = useTransform(scrollYProgress, [0, 1], [50, -50]);
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]);

  const filteredSkills = selectedCategory === "All" 
    ? skillsData 
    : skillsData.filter(skill => skill.category === selectedCategory);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = 300;
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  const getColorClasses = (color: string, type: 'bg' | 'text' | 'border') => {
    const colorMap = {
      blue: { bg: 'bg-blue-500', text: 'text-blue-400', border: 'border-blue-500' },
      violet: { bg: 'bg-violet-500', text: 'text-violet-400', border: 'border-violet-500' },
      green: { bg: 'bg-green-500', text: 'text-green-400', border: 'border-green-500' },
      red: { bg: 'bg-red-500', text: 'text-red-400', border: 'border-red-500' },
      cyan: { bg: 'bg-cyan-500', text: 'text-cyan-400', border: 'border-cyan-500' },
      emerald: { bg: 'bg-emerald-500', text: 'text-emerald-400', border: 'border-emerald-500' },
      orange: { bg: 'bg-orange-500', text: 'text-orange-400', border: 'border-orange-500' },
      yellow: { bg: 'bg-yellow-500', text: 'text-yellow-400', border: 'border-yellow-500' },
      purple: { bg: 'bg-purple-500', text: 'text-purple-400', border: 'border-purple-500' },
    };
    return colorMap[color as keyof typeof colorMap]?.[type] || colorMap.blue[type];
  };

  return (
    <section ref={containerRef} className="py-32 bg-black relative overflow-hidden" style={{ position: 'relative' }}>
      
      {/* Subtle parallax background */}
      <motion.div
        style={{ y, opacity }}
        className="absolute inset-0"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 via-transparent to-violet-500/5" />
      </motion.div>

      <div className="container mx-auto px-8 lg:px-16">
        
        {/* Section header */}
        <motion.div
          className="mb-16"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.25, 0.25, 0.25, 0.75] }}
        >
          <h2 className="text-4xl lg:text-6xl font-light text-white mb-6">
            Technical
            <motion.span
              className="block text-transparent bg-gradient-to-r from-blue-400 to-violet-400 bg-clip-text"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.8 }}
            >
              Proficiency
            </motion.span>
          </h2>
        </motion.div>

        {/* Category filters */}
        <motion.div
          className="mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.8 }}
        >
          <div className="flex flex-wrap gap-3 justify-center lg:justify-start">
            {categories.map((category) => (
              <motion.button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                  selectedCategory === category
                    ? 'bg-blue-500/20 text-blue-400 border border-blue-500/50'
                    : 'bg-gray-800/30 text-gray-400 border border-gray-700/50 hover:border-gray-600/50 hover:text-gray-300'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {category}
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Skills timeline container */}
        <div className="relative">
          
          {/* Navigation buttons */}
          <div className="absolute left-0 top-1/2 -translate-y-1/2 z-10">
            <motion.button
              onClick={() => scroll('left')}
              className="w-12 h-12 rounded-full bg-black/80 border border-gray-700/50 backdrop-blur-sm flex items-center justify-center text-gray-400 hover:text-white hover:border-gray-600/50 transition-all duration-300"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <ChevronLeft size={20} />
            </motion.button>
          </div>

          <div className="absolute right-0 top-1/2 -translate-y-1/2 z-10">
            <motion.button
              onClick={() => scroll('right')}
              className="w-12 h-12 rounded-full bg-black/80 border border-gray-700/50 backdrop-blur-sm flex items-center justify-center text-gray-400 hover:text-white hover:border-gray-600/50 transition-all duration-300"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <ChevronRight size={20} />
            </motion.button>
          </div>

          {/* Horizontal scrollable skills timeline */}
          <div
            ref={scrollRef}
            className="overflow-x-auto scrollbar-hide px-16"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            <div className="flex gap-8 pb-6" style={{ width: 'max-content' }}>
              {filteredSkills.map((skill, index) => (
                <motion.div
                  key={skill.name}
                  className="relative flex-shrink-0 w-48"
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ 
                    delay: index * 0.1, 
                    duration: 0.6,
                    ease: [0.25, 0.25, 0.25, 0.75]
                  }}
                  onHoverStart={() => setHoveredSkill(skill)}
                  onHoverEnd={() => setHoveredSkill(null)}
                >
                  {/* Skill card */}
                  <motion.div
                    className="bg-gray-900/50 border border-gray-800/50 rounded-2xl p-6 backdrop-blur-sm cursor-pointer h-full"
                    whileHover={{ 
                      y: -8,
                      boxShadow: `0 20px 40px rgba(0, 0, 0, 0.3)`
                    }}
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  >
                    {/* Skill header */}
                    <div className="mb-4">
                      <h3 className="text-lg font-medium text-white mb-1">{skill.name}</h3>
                      <p className={`text-sm ${getColorClasses(skill.color, 'text')}`}>
                        {skill.category}
                      </p>
                    </div>

                    {/* Proficiency circle */}
                    <div className="relative w-16 h-16 mx-auto mb-4">
                      <svg className="w-16 h-16 transform -rotate-90" viewBox="0 0 64 64">
                        <circle
                          cx="32"
                          cy="32"
                          r="28"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="4"
                          className="text-gray-800"
                        />
                        <motion.circle
                          cx="32"
                          cy="32"
                          r="28"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="4"
                          strokeLinecap="round"
                          className={getColorClasses(skill.color, 'text')}
                          initial={{ strokeDasharray: "0 175.929" }}
                          whileInView={{ 
                            strokeDasharray: `${(skill.level / 100) * 175.929} 175.929`
                          }}
                          transition={{ delay: index * 0.1 + 0.5, duration: 1 }}
                          viewport={{ once: true }}
                        />
                      </svg>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-white text-sm font-semibold">{skill.level}%</span>
                      </div>
                    </div>

                    {/* Skill description */}
                    <p className="text-gray-400 text-sm text-center leading-relaxed">
                      {skill.description}
                    </p>

                    {/* Hover glow effect */}
                    <motion.div
                      className={`absolute inset-0 rounded-2xl opacity-0 ${getColorClasses(skill.color, 'bg')}/5`}
                      animate={{ 
                        opacity: hoveredSkill?.name === skill.name ? 1 : 0 
                      }}
                      transition={{ duration: 0.3 }}
                    />
                  </motion.div>

                  {/* Timeline connector */}
                  {index < filteredSkills.length - 1 && (
                    <div className="absolute top-1/2 -right-4 w-8 h-px bg-gradient-to-r from-gray-700 to-transparent" />
                  )}
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Skills summary */}
        <motion.div
          className="mt-16 text-center"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6, duration: 0.8 }}
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-2xl mx-auto">
            <div>
              <div className="text-3xl font-light text-blue-400 mb-2">10+</div>
              <div className="text-gray-400 text-sm">Technologies</div>
            </div>
            <div>
              <div className="text-3xl font-light text-violet-400 mb-2">2+</div>
              <div className="text-gray-400 text-sm">Years Experience</div>
            </div>
            <div>
              <div className="text-3xl font-light text-blue-400 mb-2">5+</div>
              <div className="text-gray-400 text-sm">Major Projects</div>
            </div>
            <div>
              <div className="text-3xl font-light text-violet-400 mb-2">100+</div>
              <div className="text-gray-400 text-sm">Commits</div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}