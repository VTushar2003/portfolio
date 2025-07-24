import { useProjects } from "@/hooks/use-projects";
import { Play, Github, Plus } from "lucide-react";
import { useState } from "react";

interface ProjectCardProps {
  project: any;
  onOpenModal: (project: any) => void;
}

function ProjectCard({ project, onOpenModal }: ProjectCardProps) {
  const getColorByCategory = (category: string) => {
    switch (category.toLowerCase()) {
      case 'automation':
        return 'hsl(180,100%,50%)';
      case 'full stack':
        return 'hsl(259,83%,67%)';
      case 'mobile':
        return 'hsl(199,89%,48%)';
      default:
        return 'hsl(180,100%,50%)';
    }
  };

  const color = getColorByCategory(project.category);

  return (
    <div 
      className={`glass-effect rounded-2xl overflow-hidden card-3d hover:border-[${color}] project-card cursor-pointer`}
      onClick={() => onOpenModal(project)}
    >
      <div className="relative h-48 overflow-hidden">
        <img 
          src={project.imageUrl} 
          alt={project.title}
          className="w-full h-full object-cover" 
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent"></div>
        <div className="absolute top-4 right-4">
          <span 
            className="px-3 py-1 rounded-full text-sm font-semibold text-black"
            style={{ backgroundColor: color }}
          >
            {project.category}
          </span>
        </div>
      </div>
      <div className="p-6">
        <h3 className="text-xl font-bold mb-3" style={{ color }}>
          {project.title}
        </h3>
        <p className="text-gray-300 mb-4">{project.description}</p>
        <div className="flex flex-wrap gap-2 mb-4">
          {project.technologies.slice(0, 3).map((tech: string) => (
            <span 
              key={tech}
              className="bg-glass px-2 py-1 rounded text-sm"
              style={{ color }}
            >
              {tech}
            </span>
          ))}
        </div>
        <div className="flex gap-3">
          <button 
            className="flex-1 py-2 px-4 rounded hover:bg-opacity-80 transition-all duration-300 font-semibold text-black flex items-center justify-center gap-2"
            style={{ backgroundColor: color }}
          >
            <Play size={16} />
            Live Demo
          </button>
          <button 
            className="py-2 px-4 rounded hover:bg-glass transition-all duration-300 border"
            style={{ borderColor: color, color }}
          >
            <Github size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}

export default function ProjectsSection() {
  const { data: projects, isLoading } = useProjects();
  const [selectedProject, setSelectedProject] = useState<any>(null);

  const handleOpenModal = (project: any) => {
    setSelectedProject(project);
    // This will be handled by the ProjectModal component
    const event = new CustomEvent('openProjectModal', { detail: project });
    window.dispatchEvent(event);
  };

  if (isLoading) {
    return (
      <section id="projects" className="py-20">
        <div className="container mx-auto px-6">
          <div className="text-center">Loading projects...</div>
        </div>
      </section>
    );
  }

  return (
    <section id="projects" className="py-20">
      <div className="container mx-auto px-6">
        <h2 className="text-4xl font-bold text-center mb-16 text-holographic">Featured Projects</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects?.filter((project: any) => project.featured).map((project: any) => (
            <ProjectCard 
              key={project.id} 
              project={project} 
              onOpenModal={handleOpenModal}
            />
          ))}
        </div>

        {/* More Projects Button */}
        <div className="text-center mt-12">
          <button className="glass-effect hover:animate-glow px-8 py-4 rounded-lg border border-[hsl(180,100%,50%)] text-[hsl(180,100%,50%)] font-semibold transition-all duration-300 hover:bg-[hsla(180,100%,50%,0.1)] flex items-center gap-2 mx-auto">
            <Plus size={20} />
            View All Projects
          </button>
        </div>
      </div>
    </section>
  );
}
