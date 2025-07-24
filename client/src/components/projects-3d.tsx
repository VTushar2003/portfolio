import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { useProjects } from "@/hooks/use-projects";
import { Play, Github, ExternalLink, Zap, Star } from "lucide-react";

interface Project3DProps {
  project: any;
  index: number;
  onOpenModal: (project: any) => void;
}

function Project3DCard({ project, index, onOpenModal }: Project3DProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    if (!cardRef.current) return;

    const card = cardRef.current;
    
    // Initial animation on mount
    gsap.fromTo(card, 
      { 
        opacity: 0, 
        y: 100, 
        rotationX: -15,
        scale: 0.9 
      },
      { 
        opacity: 1, 
        y: 0, 
        rotationX: 0,
        scale: 1,
        duration: 0.8,
        delay: index * 0.2,
        ease: "power3.out"
      }
    );

    // Hover animations
    const handleMouseEnter = () => {
      setIsHovered(true);
      gsap.to(card, {
        y: -20,
        rotationY: 5,
        rotationX: 5,
        scale: 1.05,
        duration: 0.4,
        ease: "power2.out"
      });
    };

    const handleMouseLeave = () => {
      setIsHovered(false);
      gsap.to(card, {
        y: 0,
        rotationY: 0,
        rotationX: 0,
        scale: 1,
        duration: 0.4,
        ease: "power2.out"
      });
    };

    card.addEventListener('mouseenter', handleMouseEnter);
    card.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      card.removeEventListener('mouseenter', handleMouseEnter);
      card.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [index]);

  const getColorByCategory = (category: string) => {
    switch (category.toLowerCase()) {
      case 'automation': return { primary: 'cyan', gradient: 'from-cyan-500 to-blue-500' };
      case 'full stack': return { primary: 'purple', gradient: 'from-purple-500 to-pink-500' };
      case 'mobile': return { primary: 'emerald', gradient: 'from-emerald-500 to-teal-500' };
      default: return { primary: 'cyan', gradient: 'from-cyan-500 to-blue-500' };
    }
  };

  const colors = getColorByCategory(project.category);

  return (
    <div 
      ref={cardRef}
      className="relative group cursor-pointer transform-gpu"
      style={{ transformStyle: "preserve-3d" }}
      onClick={() => onOpenModal(project)}
    >
      {/* Card Container */}
      <div className="relative bg-gradient-to-br from-gray-900/80 to-black/80 backdrop-blur-md border border-gray-700/50 rounded-2xl overflow-hidden shadow-2xl">
        
        {/* Holographic Border Effect */}
        <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500">
          <div className={`absolute inset-0 bg-gradient-to-r ${colors.gradient} opacity-20 rounded-2xl`} />
          <div className="absolute inset-[1px] bg-gradient-to-br from-gray-900/90 to-black/90 rounded-2xl" />
        </div>

        {/* Project Image */}
        <div className="relative h-48 overflow-hidden">
          <img 
            src={project.imageUrl} 
            alt={project.title}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
          />
          
          {/* Overlay Gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
          
          {/* Category Badge */}
          <div className="absolute top-4 right-4">
            <span className={`px-3 py-1 rounded-full text-xs font-semibold bg-gradient-to-r ${colors.gradient} text-white shadow-lg`}>
              {project.category}
            </span>
          </div>

          {/* Featured Badge */}
          {project.featured && (
            <div className="absolute top-4 left-4">
              <div className="flex items-center gap-1 px-2 py-1 bg-yellow-500/20 backdrop-blur-sm rounded-full border border-yellow-400/50">
                <Star size={12} className="text-yellow-400" />
                <span className="text-yellow-400 text-xs font-medium">Featured</span>
              </div>
            </div>
          )}

          {/* Play Button Overlay */}
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <div className={`w-16 h-16 rounded-full bg-gradient-to-r ${colors.gradient} flex items-center justify-center shadow-lg transform scale-90 group-hover:scale-100 transition-transform duration-300`}>
              <Play size={24} className="text-white ml-1" />
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="relative p-6 space-y-4">
          <div>
            <h3 className={`text-xl font-bold text-${colors.primary}-400 mb-2 group-hover:text-white transition-colors duration-300`}>
              {project.title}
            </h3>
            <p className="text-gray-300 text-sm leading-relaxed line-clamp-3">
              {project.description}
            </p>
          </div>

          {/* Tech Stack */}
          <div className="flex flex-wrap gap-2">
            {project.technologies.slice(0, 3).map((tech: string) => (
              <span 
                key={tech}
                className="px-2 py-1 text-xs bg-gray-800/50 text-gray-300 rounded-md border border-gray-700/50 backdrop-blur-sm"
              >
                {tech}
              </span>
            ))}
            {project.technologies.length > 3 && (
              <span className="px-2 py-1 text-xs text-gray-400">
                +{project.technologies.length - 3} more
              </span>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 pt-2">
            <button 
              className={`flex-1 py-2 px-4 rounded-lg bg-gradient-to-r ${colors.gradient} text-white font-medium text-sm hover:shadow-lg hover:shadow-${colors.primary}-500/25 transition-all duration-300 flex items-center justify-center gap-2 transform hover:scale-105`}
              onClick={(e) => {
                e.stopPropagation();
                window.open(project.liveUrl, '_blank');
              }}
            >
              <ExternalLink size={16} />
              Live Demo
            </button>
            <button 
              className="py-2 px-4 rounded-lg border border-gray-600 text-gray-300 hover:border-gray-400 hover:text-white transition-all duration-300 flex items-center justify-center transform hover:scale-105"
              onClick={(e) => {
                e.stopPropagation();
                window.open(project.githubUrl, '_blank');
              }}
            >
              <Github size={16} />
            </button>
          </div>
        </div>

        {/* Animated Background Particles */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {isHovered && [...Array(5)].map((_, i) => (
            <div
              key={i}
              className={`absolute w-1 h-1 bg-${colors.primary}-400 rounded-full animate-bounce`}
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${i * 0.2}s`,
                animationDuration: `${1 + Math.random()}s`
              }}
            />
          ))}
        </div>
      </div>

      {/* 3D Shadow */}
      <div 
        className="absolute inset-0 bg-black/20 rounded-2xl blur-xl -z-10 transform translate-y-4"
        style={{ transform: "translateY(20px) rotateX(85deg) scale(0.9)" }}
      />
    </div>
  );
}

export default function Projects3D() {
  const { data: projects, isLoading } = useProjects();
  const containerRef = useRef<HTMLDivElement>(null);
  const [selectedProject, setSelectedProject] = useState<any>(null);

  useEffect(() => {
    if (containerRef.current) {
      // Animate container on load
      gsap.fromTo(containerRef.current,
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 1, ease: "power3.out" }
      );
    }
  }, []);

  const handleOpenModal = (project: any) => {
    setSelectedProject(project);
    const event = new CustomEvent('openProjectModal', { detail: project });
    window.dispatchEvent(event);
  };

  if (isLoading) {
    return (
      <section id="projects" className="py-20 bg-gradient-to-b from-black via-gray-900 to-black">
        <div className="container mx-auto px-6">
          <div className="text-center">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-cyan-400"></div>
            <p className="text-gray-400 mt-4">Loading projects...</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="projects" className="py-20 bg-gradient-to-b from-black via-gray-900 to-black relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500 rounded-full blur-3xl animate-pulse" style={{animationDelay: '2s'}} />
      </div>

      <div ref={containerRef} className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold text-holographic mb-6">Featured Projects</h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Discover my latest innovations in full-stack development, automation, and mobile applications
          </p>
        </div>
        
        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {projects?.filter((project: any) => project.featured).map((project: any, index: number) => (
            <Project3DCard 
              key={project.id} 
              project={project} 
              index={index}
              onOpenModal={handleOpenModal}
            />
          ))}
        </div>

        {/* All Projects Button */}
        <div className="text-center">
          <button className="group relative px-8 py-4 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-lg font-semibold text-white transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-cyan-500/25">
            <div className="flex items-center gap-2">
              <Zap size={20} />
              View All Projects
            </div>
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-purple-400 rounded-lg opacity-0 group-hover:opacity-20 transition-opacity duration-300" />
          </button>
        </div>
      </div>
    </section>
  );
}