import { useState, useEffect } from "react";
import { X, ExternalLink, Github, Play } from "lucide-react";

export default function ProjectModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [project, setProject] = useState<any>(null);

  useEffect(() => {
    const handleOpenModal = (event: any) => {
      setProject(event.detail);
      setIsOpen(true);
      document.body.style.overflow = 'hidden';
    };

    window.addEventListener('openProjectModal', handleOpenModal);
    
    return () => {
      window.removeEventListener('openProjectModal', handleOpenModal);
    };
  }, []);

  const closeModal = () => {
    setIsOpen(false);
    document.body.style.overflow = 'auto';
  };

  if (!isOpen || !project) return null;

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
    <div className="fixed inset-0 z-50 modal-backdrop">
      <div className="flex items-center justify-center min-h-screen p-4">
        <div className="glass-effect rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
          <div className="p-8">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-3xl font-bold text-holographic">{project.title}</h2>
              <button 
                onClick={closeModal}
                className="text-gray-400 hover:text-white text-2xl"
              >
                <X size={24} />
              </button>
            </div>
            
            {/* Project Video Demo */}
            <div className="mb-8 relative">
              <div className="bg-gray-800 rounded-lg aspect-video flex items-center justify-center">
                <img 
                  src={project.imageUrl} 
                  alt={project.title}
                  className="w-full h-full object-cover rounded-lg" 
                />
                <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center rounded-lg">
                  <button className="bg-[hsl(180,100%,50%)] text-black p-4 rounded-full hover:bg-opacity-80 transition-all duration-300">
                    <Play size={24} />
                  </button>
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-semibold mb-4 text-[hsl(180,100%,50%)]">Project Overview</h3>
                <p className="text-gray-300 mb-6">
                  {project.longDescription || project.description}
                </p>
                
                <h3 className="text-xl font-semibold mb-4 text-[hsl(259,83%,67%)]">Key Features</h3>
                <ul className="text-gray-300 space-y-2 mb-6">
                  {project.features?.map((feature: string, index: number) => (
                    <li key={index}>
                      <i className="fas fa-check text-[hsl(180,100%,50%)] mr-2"></i>
                      {feature}
                    </li>
                  )) || (
                    <>
                      <li><i className="fas fa-check text-[hsl(180,100%,50%)] mr-2"></i>Advanced user authentication system</li>
                      <li><i className="fas fa-check text-[hsl(180,100%,50%)] mr-2"></i>Real-time data synchronization</li>
                      <li><i className="fas fa-check text-[hsl(180,100%,50%)] mr-2"></i>Responsive design across all devices</li>
                      <li><i className="fas fa-check text-[hsl(180,100%,50%)] mr-2"></i>Performance optimized architecture</li>
                    </>
                  )}
                </ul>
              </div>
              
              <div>
                <h3 className="text-xl font-semibold mb-4 text-[hsl(199,89%,48%)]">Technical Stack</h3>
                <div className="flex flex-wrap gap-2 mb-6">
                  {project.technologies.map((tech: string) => (
                    <span 
                      key={tech}
                      className="bg-glass px-3 py-1 rounded-full text-sm"
                      style={{ color }}
                    >
                      {tech}
                    </span>
                  ))}
                </div>
                
                <h3 className="text-xl font-semibold mb-4 text-[hsl(180,100%,50%)]">Project Links</h3>
                <div className="space-y-3">
                  {project.liveUrl && (
                    <a 
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center space-x-3 glass-effect p-3 rounded-lg hover:border-[hsl(180,100%,50%)] transition-all duration-300"
                    >
                      <ExternalLink className="text-[hsl(180,100%,50%)]" size={20} />
                      <span>Live Demo</span>
                    </a>
                  )}
                  {project.githubUrl && (
                    <a 
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center space-x-3 glass-effect p-3 rounded-lg hover:border-[hsl(259,83%,67%)] transition-all duration-300"
                    >
                      <Github className="text-[hsl(259,83%,67%)]" size={20} />
                      <span>Source Code</span>
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
