import { useState, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Calendar, MapPin, Award, Code, Coffee, Zap } from "lucide-react";

interface TimelineItem {
  year: string;
  title: string;
  company: string;
  description: string;
  type: 'work' | 'education' | 'achievement';
  icon: any;
}

const timelineData: TimelineItem[] = [
  {
    year: "2024",
    title: "Senior Full-Stack Engineer",
    company: "HiddenMindSolutions",
    description: "Led development of enterprise-scale applications using MERN stack, implemented CI/CD pipelines, and mentored junior developers.",
    type: "work",
    icon: Code
  },
  {
    year: "2023",
    title: "Full-Stack Developer",
    company: "MyPay Communications",
    description: "Built scalable web applications with Next.js and Node.js, integrated payment systems, and optimized performance for 10k+ users.",
    type: "work",
    icon: Zap
  },
  {
    year: "2022",
    title: "MERN Stack Developer",
    company: "WebSenor",
    description: "Developed responsive web applications, implemented RESTful APIs, and collaborated with designers to enhance user experience.",
    type: "achievement",
    icon: Award
  },
  {
    year: "2021",
    title: "Frontend Developer",
    company: "WebSenor",
    description: "Specialized in React.js development, created responsive designs, and collaborated with UX/UI teams on user-centric applications.",
    type: "work",
    icon: Code
  },
  {
    year: "2020",
    title: "Computer Science Graduate",
    company: "Mohanlal Sukhadia University",
    description: "Bachelor's degree in Computer Science with focus on software engineering, algorithms, and database systems.",
    type: "education",
    icon: Award
  }
];

const stats = [
  { label: "Lines of Code", value: "100K+", icon: Code },
  { label: "Coffee Consumed", value: "∞", icon: Coffee },
  { label: "Projects Delivered", value: "15+", icon: Zap },
  { label: "Happy Clients", value: "10+", icon: Award }
];

export default function MinimalistAbout() {
  const [activeItem, setActiveItem] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
    layoutEffect: false
  });

  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'work': return 'blue';
      case 'education': return 'violet';
      case 'achievement': return 'emerald';
      default: return 'gray';
    }
  };

  const getTypeStyles = (type: string) => {
    const colors = {
      work: { bg: 'bg-blue-500/20', border: 'border-blue-500/50', text: 'text-blue-400' },
      education: { bg: 'bg-violet-500/20', border: 'border-violet-500/50', text: 'text-violet-400' },
      achievement: { bg: 'bg-emerald-500/20', border: 'border-emerald-500/50', text: 'text-emerald-400' }
    };
    return colors[type as keyof typeof colors] || colors.work;
  };

  return (
    <section ref={containerRef} className="py-32 bg-black relative overflow-hidden" style={{ position: 'relative' }}>
      
      {/* Parallax background */}
      <motion.div
        style={{ y, opacity }}
        className="absolute inset-0"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-transparent to-violet-500/5" />
        <div className="absolute top-1/4 left-1/4 w-px h-1/2 bg-gradient-to-b from-blue-400/20 to-transparent" />
        <div className="absolute top-1/3 right-1/3 w-px h-1/3 bg-gradient-to-b from-violet-400/20 to-transparent" />
      </motion.div>

      <div className="container mx-auto px-8 lg:px-16">
        
        {/* Section header */}
        <motion.div
          className="mb-20"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.25, 0.25, 0.25, 0.75] }}
        >
          <h2 className="text-4xl lg:text-6xl font-light text-white mb-6">
            About
            <motion.span
              className="block text-transparent bg-gradient-to-r from-blue-400 to-violet-400 bg-clip-text"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.8 }}
            >
              Journey
            </motion.span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          
          {/* Left side - Introduction */}
          <motion.div
            className="space-y-8"
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.25, 0.25, 0.25, 0.75] }}
          >
            {/* Role and location */}
            <div className="space-y-4">
              <motion.h3
                className="text-2xl font-light text-white"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3, duration: 0.8 }}
              >
                Building the future, one line at a time
              </motion.h3>
              
              <motion.div
                className="flex items-center gap-6 text-gray-400"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4, duration: 0.8 }}
              >
                <div className="flex items-center gap-2">
                  <MapPin size={16} />
                  <span className="text-sm">India</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar size={16} />
                  <span className="text-sm">Available for projects</span>
                </div>
              </motion.div>
            </div>

            {/* Description */}
            <motion.div
              className="space-y-6 text-gray-300 leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5, duration: 0.8 }}
            >
              <p>
                I'm a passionate full-stack engineer with 2+ years of experience crafting digital experiences 
                that matter. My journey began with curiosity about how things work on the web, and it has 
                evolved into a mission to build scalable, user-centric applications.
              </p>
              
              <p>
                Specializing in the <span className="text-blue-400 font-medium">MERN stack</span> and 
                <span className="text-violet-400 font-medium"> N8N Automations</span>, I've helped startups and 
                enterprises deliver robust solutions. I believe in writing clean, maintainable code and 
                staying current with emerging technologies.
              </p>

              <p>
                When I'm not coding, you'll find me exploring new frameworks, contributing to open source 
                projects, or automating workflows with <span className="text-emerald-400 font-medium">n8n</span>.
              </p>
            </motion.div>

            {/* Stats grid */}
            <motion.div
              className="grid grid-cols-2 gap-6 pt-8"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6, duration: 0.8 }}
            >
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  className="bg-gray-900/30 border border-gray-800/50 rounded-xl p-4 backdrop-blur-sm"
                  whileHover={{ 
                    y: -4,
                    boxShadow: "0 20px 40px rgba(0, 0, 0, 0.2)"
                  }}
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                >
                  <div className="flex items-center gap-3 mb-2">
                    <stat.icon size={20} className="text-blue-400" />
                    <span className="text-2xl font-light text-white">{stat.value}</span>
                  </div>
                  <p className="text-gray-400 text-sm">{stat.label}</p>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* Right side - Professional timeline */}
          <motion.div
            className="space-y-8"
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.25, 0.25, 0.25, 0.75] }}
          >
            <h3 className="text-2xl font-light text-white mb-8">Professional Timeline</h3>
            
            <div className="relative">
              {/* Timeline line */}
              <div className="absolute left-6 top-0 bottom-0 w-px bg-gradient-to-b from-blue-500/50 via-violet-500/50 to-transparent" />
              
              {/* Timeline items */}
              <div className="space-y-8">
                {timelineData.map((item, index) => {
                  const styles = getTypeStyles(item.type);
                  
                  return (
                    <motion.div
                      key={index}
                      className="relative flex gap-6 cursor-pointer"
                      initial={{ opacity: 0, x: 20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ 
                        delay: index * 0.1, 
                        duration: 0.6,
                        ease: [0.25, 0.25, 0.25, 0.75]
                      }}
                      onHoverStart={() => setActiveItem(index)}
                      onHoverEnd={() => setActiveItem(null)}
                    >
                      {/* Timeline node */}
                      <motion.div
                        className={`relative z-10 w-12 h-12 rounded-full ${styles.bg} ${styles.border} border backdrop-blur-sm flex items-center justify-center flex-shrink-0`}
                        whileHover={{ scale: 1.1 }}
                        transition={{ type: "spring", stiffness: 300 }}
                      >
                        <item.icon size={20} className={styles.text} />
                      </motion.div>

                      {/* Timeline content */}
                      <motion.div
                        className={`flex-1 pb-8 ${
                          activeItem === index ? 'transform translate-x-2' : ''
                        } transition-transform duration-300`}
                      >
                        <div className="flex items-center gap-3 mb-2">
                          <span className={`text-sm font-medium ${styles.text}`}>
                            {item.year}
                          </span>
                          <div className="w-2 h-2 rounded-full bg-gray-600" />
                          <span className="text-sm text-gray-400 uppercase tracking-wider">
                            {item.type}
                          </span>
                        </div>
                        
                        <h4 className="text-lg font-medium text-white mb-1">
                          {item.title}
                        </h4>
                        <p className={`text-sm ${styles.text} mb-3`}>
                          {item.company}
                        </p>
                        <p className="text-gray-300 text-sm leading-relaxed">
                          {item.description}
                        </p>

                        {/* Hover glow effect */}
                        <motion.div
                          className={`absolute inset-0 -mx-4 -my-2 rounded-xl ${styles.bg} opacity-0`}
                          animate={{ 
                            opacity: activeItem === index ? 0.1 : 0 
                          }}
                          transition={{ duration: 0.3 }}
                        />
                      </motion.div>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}