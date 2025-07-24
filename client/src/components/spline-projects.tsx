import { Suspense, useRef, useState } from "react";
import Spline from "@splinetool/react-spline";
import { useProjects } from "@/hooks/use-projects";
import { Play, Github, ExternalLink, Star, ArrowRight } from "lucide-react";

export default function SplineProjects() {
  const { data: projects, isLoading } = useProjects();
  const [selectedProject, setSelectedProject] = useState<any>(null);
  const splineRef = useRef<any>(null);

  const handleSplineLoad = (spline: any) => {
    splineRef.current = spline;
  };

  const handleProjectSelect = (project: any) => {
    setSelectedProject(project);
    // Trigger Spline animation for selected project
    if (splineRef.current) {
      try {
        splineRef.current.emitEvent('mouseHover', project.category);
      } catch (error) {
        console.log('Spline event not available');
      }
    }
  };

  const handleOpenModal = (project: any) => {
    const event = new CustomEvent('openProjectModal', { detail: project });
    window.dispatchEvent(event);
  };

  if (isLoading) {
    return (
      <section id="projects" className="py-20 bg-gradient-to-b from-black via-gray-900 to-black">
        <div className="container mx-auto px-6">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-cyan-400 mx-auto mb-4"></div>
            <p className="text-gray-400">Loading projects...</p>
          </div>
        </div>
      </section>
    );
  }

  const featuredProjects = projects?.filter((project: any) => project.featured) || [];

  return (
    <section id="projects" className="py-20 bg-gradient-to-b from-black via-gray-900 to-black relative overflow-hidden">
      
      {/* Background Elements */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-cyan-500/10 via-transparent to-purple-500/10"></div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold text-holographic mb-6">Featured Projects</h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Explore my latest innovations in full-stack development, automation, and mobile applications through interactive 3D showcases
          </p>
        </div>

        {/* Main Projects Display */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          
          {/* Interactive 3D Project Showcase */}
          <div className="relative">
            
            {/* Spline 3D Scene */}
            <div className="h-[600px] rounded-2xl overflow-hidden glass-effect relative">
              <Suspense fallback={
                <div className="flex items-center justify-center h-full">
                  <div className="text-center">
                    <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-cyan-400 mx-auto mb-4"></div>
                    <p className="text-cyan-400 text-lg">Loading 3D Projects...</p>
                    <p className="text-gray-400 text-sm mt-2">Interactive showcase initializing</p>
                  </div>
                </div>
              }>
                <Spline 
                  scene="https://prod.spline.design/wQr-wlgWKrm9-8FP/scene.splinecode"
                  onLoad={handleSplineLoad}
                  style={{ width: '100%', height: '100%' }}
                />
              </Suspense>

              {/* Project Navigation Overlay */}
              <div className="absolute bottom-6 left-6 right-6">
                <div className="glass-effect p-4 rounded-lg">
                  <div className="flex gap-2 justify-center">
                    {featuredProjects.map((project: any, index: number) => (
                      <button
                        key={project.id}
                        onClick={() => handleProjectSelect(project)}
                        className={`w-3 h-3 rounded-full transition-all duration-300 ${
                          selectedProject?.id === project.id 
                            ? 'bg-cyan-400 scale-125' 
                            : 'bg-gray-600 hover:bg-gray-400'
                        }`}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* 3D Scene Instructions */}
            <div className="mt-4 text-center">
              <p className="text-sm text-gray-400">
                Interactive 3D showcase • Click and drag to explore • Scroll to zoom
              </p>
            </div>
          </div>

          {/* Project Details Panel */}
          <div className="space-y-6">
            
            {selectedProject ? (
              <div className="space-y-6">
                
                {/* Selected Project Details */}
                <div className="glass-effect p-8 rounded-2xl border-2 border-cyan-400/30">
                  <div className="flex items-start justify-between mb-6">
                    <div>
                      <h3 className="text-3xl font-bold text-white mb-2">{selectedProject.title}</h3>
                      <div className="flex items-center gap-2 mb-4">
                        <span className="px-3 py-1 rounded-full text-sm font-semibold bg-gradient-to-r from-cyan-500 to-blue-500 text-black">
                          {selectedProject.category}
                        </span>
                        {selectedProject.featured && (
                          <div className="flex items-center gap-1 px-2 py-1 bg-yellow-500/20 rounded-full border border-yellow-400/50">
                            <Star size={12} className="text-yellow-400" />
                            <span className="text-yellow-400 text-xs">Featured</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  <p className="text-gray-300 leading-relaxed mb-6">
                    {selectedProject.longDescription || selectedProject.description}
                  </p>

                  {/* Tech Stack */}
                  <div className="mb-6">
                    <h4 className="text-lg font-semibold text-cyan-400 mb-3">Technologies Used</h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedProject.technologies.map((tech: string) => (
                        <span 
                          key={tech}
                          className="px-3 py-1 text-sm bg-gray-800/50 text-gray-300 rounded-full border border-gray-700/50 backdrop-blur-sm hover:border-cyan-400/50 transition-colors"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Key Features */}
                  {selectedProject.features && (
                    <div className="mb-6">
                      <h4 className="text-lg font-semibold text-purple-400 mb-3">Key Features</h4>
                      <ul className="space-y-2">
                        {selectedProject.features.slice(0, 3).map((feature: string, index: number) => (
                          <li key={index} className="flex items-start gap-2 text-gray-300">
                            <ArrowRight size={16} className="text-cyan-400 mt-0.5 flex-shrink-0" />
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Action Buttons */}
                  <div className="flex gap-3">
                    <button 
                      onClick={() => handleOpenModal(selectedProject)}
                      className="flex-1 py-3 px-6 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-semibold hover:shadow-lg hover:shadow-cyan-500/25 transition-all duration-300 flex items-center justify-center gap-2 hover:scale-105"
                    >
                      <Play size={18} />
                      View Details
                    </button>
                    <button 
                      onClick={() => window.open(selectedProject.liveUrl, '_blank')}
                      className="py-3 px-6 rounded-lg border border-purple-500/50 text-purple-400 hover:bg-purple-500/10 transition-all duration-300 flex items-center justify-center hover:scale-105"
                    >
                      <ExternalLink size={18} />
                    </button>
                    <button 
                      onClick={() => window.open(selectedProject.githubUrl, '_blank')}
                      className="py-3 px-6 rounded-lg border border-gray-600 text-gray-300 hover:border-gray-400 hover:text-white transition-all duration-300 flex items-center justify-center hover:scale-105"
                    >
                      <Github size={18} />
                    </button>
                  </div>
                </div>

              </div>
            ) : (
              <div className="glass-effect p-8 rounded-2xl text-center">
                <div className="w-20 h-20 bg-gradient-to-br from-gray-600 to-gray-700 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Play size={32} className="text-gray-400" />
                </div>
                <h3 className="text-2xl font-semibold text-gray-300 mb-4">Interactive Project Explorer</h3>
                <p className="text-gray-400 mb-6 leading-relaxed">
                  Navigate through my portfolio using the 3D interface on the left. Each project is represented as an interactive 3D object that you can explore in detail.
                </p>
                <div className="text-sm text-cyan-400">
                  Select a project to view detailed information, tech stack, and live demos
                </div>
              </div>
            )}

            {/* Quick Project Grid */}
            <div className="grid grid-cols-1 gap-3">
              {featuredProjects.map((project: any) => (
                <button
                  key={project.id}
                  onClick={() => handleProjectSelect(project)}
                  className={`glass-effect p-4 rounded-lg text-left hover:border-cyan-400/50 transition-all duration-300 group ${
                    selectedProject?.id === project.id ? 'border-cyan-400/50 bg-cyan-400/5' : ''
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <img 
                      src={project.imageUrl} 
                      alt={project.title}
                      className="w-16 h-16 rounded-lg object-cover"
                    />
                    <div className="flex-1">
                      <h4 className="font-semibold text-white group-hover:text-cyan-400 transition-colors">
                        {project.title}
                      </h4>
                      <p className="text-sm text-gray-400 line-clamp-1">
                        {project.description}
                      </p>
                    </div>
                    <ArrowRight size={16} className="text-gray-400 group-hover:text-cyan-400 transition-colors" />
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* All Projects CTA */}
        <div className="text-center">
          <button className="group relative px-8 py-4 overflow-hidden rounded-lg font-semibold text-white transition-all duration-300 hover:scale-105">
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-purple-500 transition-transform duration-300 group-hover:scale-110"></div>
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-purple-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className="relative flex items-center gap-2">
              <Star size={20} />
              View All Projects
            </div>
          </button>
        </div>
      </div>
    </section>
  );
}