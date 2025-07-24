import React, { useState, useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  AnimatePresence,
} from "framer-motion";

import { Github, Link, Play, X } from "lucide-react";
import { sampleProjects } from "@/lib/projects";

interface ProjectModalProps {
  project: any;
  isOpen: boolean;
  onClose: () => void;
}

function ProjectModal({ project, isOpen, onClose }: ProjectModalProps) {
  if (!project) return null;
  const videoRef = useRef<HTMLVideoElement>(null);
  const videoContainerRef = useRef<HTMLDivElement>(null);

  const handleFullscreen = () => {
    if (videoContainerRef.current) {
      if (document.fullscreenElement) {
        document.exitFullscreen();
      } else {
        videoContainerRef.current.requestFullscreen().catch((e) => {
          console.warn("Fullscreen failed:", e);
        });
      }
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 "
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {/* Backdrop */}
          <motion.div
            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* Modal Content */}
          <motion.div
            className="relative w-full max-w-4xl max-h-[90vh] overflow-auto bg-gray-900/95 border border-gray-700/50 rounded-2xl backdrop-blur-md "
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          >
            {/* Close button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-black/50 border border-gray-600/50 backdrop-blur-sm flex items-center justify-center text-gray-400 hover:text-white hover:border-gray-400/50 transition-all duration-300"
            >
              <X size={18} />
            </button>

            <div className="grid grid-cols-1 lg:grid-cols-2 h-full">
              {/* Left side - Project media */}
              <div
                ref={videoContainerRef}
                className="relative bg-black/50 flex items-center justify-center p-8"
              >
                {project.videoUrl ? (
                  <>
                    <video
                      ref={videoRef}
                      src={project.videoUrl}
                      autoPlay
                      muted
                      loop
                      playsInline
                      className="w-full h-full object-cover rounded-lg"
                    />
                    {/* Fullscreen Button */}
                    <button
                      onClick={handleFullscreen}
                      className="absolute bottom-4 right-4 z-10 bg-black/50 border border-gray-600/50 text-white px-3 py-1 text-sm rounded-lg hover:bg-black/70 transition-all"
                    >
                      Fullscreen
                    </button>
                  </>
                ) : (
                  <img
                    src={project.imageUrl}
                    alt={project.title}
                    className="w-full h-full object-cover rounded-lg"
                  />
                )}

                {/* CSS 3D overlay for enhanced experience */}
                <div className="absolute inset-0 opacity-20 pointer-events-none flex items-center justify-center">
                  <motion.div
                    className="w-32 h-32 border border-blue-400/20 rounded-xl"
                    animate={{
                      rotateY: [0, 180, 360],
                      rotateX: [0, 180, 360],
                      scale: [1, 1.1, 1],
                    }}
                    transition={{
                      duration: 8,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                  />
                </div>
              </div>

              {/* Right side - Project details */}
              <div className="p-8 space-y-6 overflow-y-auto">
                <div>
                  <h3 className="text-3xl font-light text-white mb-2">
                    {project.title}
                  </h3>
                  <p className="text-blue-400 font-medium">
                    {project.category}
                  </p>
                </div>

                <p className="text-gray-300 leading-relaxed">
                  {project.longDescription || project.description}
                </p>

                {/* Tech stack with glow effect */}
                <div>
                  <h4 className="text-lg font-medium text-white mb-3">
                    Tech Stack
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.map((tech: string) => (
                      <motion.span
                        key={tech}
                        className="px-3 py-1 text-sm bg-blue-500/10 text-blue-400 border border-blue-500/20 rounded-full backdrop-blur-sm cursor-pointer"
                        whileHover={{
                          scale: 1.05,
                          boxShadow: "0 0 20px rgba(59, 130, 246, 0.3)",
                        }}
                        transition={{ type: "spring", stiffness: 300 }}
                      >
                        {tech}
                      </motion.span>
                    ))}
                  </div>
                </div>

                {/* Key features */}
                {project.features && (
                  <div>
                    <h4 className="text-lg font-medium text-white mb-3">
                      Key Features
                    </h4>
                    <ul className="space-y-2">
                      {project.features
                        .slice(0, 4)
                        .map((feature: string, index: number) => (
                          <motion.li
                            key={index}
                            className="flex items-start gap-3 text-gray-300"
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.1 }}
                          >
                            <div className="w-1.5 h-1.5 rounded-full bg-blue-400 mt-2 flex-shrink-0" />
                            {feature}
                          </motion.li>
                        ))}
                    </ul>
                  </div>
                )}

                {/* Action buttons */}
                <div className="flex gap-4 pt-4">
                  {project.liveUrl && (
                    <motion.a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="py-3 px-6 border border-gray-600/50 text-gray-300 font-medium rounded-lg flex items-center justify-center gap-2 hover:border-gray-400/50 hover:text-white transition-all duration-300"
                      whileHover={{ scale: 1.02, y: -1 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Link size={18} />
                      Live Preview
                    </motion.a>
                  )}
                  {project.githubUrl && (
                    <motion.a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="py-3 px-6 border border-gray-600/50 text-gray-300 font-medium rounded-lg flex items-center justify-center gap-2 hover:border-gray-400/50 hover:text-white transition-all duration-300"
                      whileHover={{ scale: 1.02, y: -1 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Github size={18} />
                      Code
                    </motion.a>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default function MinimalistProjects() {
  const [selectedProject, setSelectedProject] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
    layoutEffect: false,
  });

  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);

  const openModal = (project: any) => {
    setSelectedProject(project);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setTimeout(() => setSelectedProject(null), 300);
  };

  // if (isLoading) {
  //   return (
  //     <section className="py-32 bg-black">
  //       <div className="container mx-auto px-8 lg:px-16">
  //         <div className="flex justify-center">
  //           <motion.div
  //             animate={{ rotate: 360 }}
  //             transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
  //             className="w-8 h-8 border-2 border-blue-400/30 border-t-blue-400 rounded-full"
  //           />
  //         </div>
  //       </div>
  //     </section>
  //   );
  // }

  return (
    <>
      <section
        id="projects"
        ref={containerRef}
        className="py-32 bg-black relative overflow-hidden"
        style={{ position: "relative" }}
      >
        {/* Subtle parallax background */}
        <motion.div style={{ y }} className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 via-transparent to-violet-500/20" />
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
              Selected
              <motion.span
                className="block text-transparent bg-gradient-to-r from-blue-400 to-violet-400 bg-clip-text"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2, duration: 0.8 }}
              >
                Projects
              </motion.span>
            </h2>
            <motion.p
              className="text-xl text-gray-400 max-w-2xl font-light"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4, duration: 0.8 }}
            >
              A curated collection of projects showcasing modern web
              development, automation, and user experience design.
            </motion.p>
          </motion.div>

          {/* Projects grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {sampleProjects?.map((project: any, index: number) => (
              <motion.div
                key={index}
                className="group cursor-pointer"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  delay: index * 0.1,
                  duration: 0.8,
                  ease: [0.25, 0.25, 0.25, 0.75],
                }}
                onClick={() => openModal(project)}
              >
                <div className="relative overflow-hidden rounded-2xl bg-gray-900/50 border border-gray-800/50 backdrop-blur-sm">
                  {/* Project image with hover zoom */}
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <motion.img
                      src={project.imageUrl}
                      alt={project.title}
                      className="w-full h-full object-cover"
                      whileHover={{ scale: 1.1 }}
                      transition={{
                        duration: 0.6,
                        ease: [0.25, 0.25, 0.25, 0.75],
                      }}
                    />

                    {/* Gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                    {/* Play button overlay */}
                    <motion.div
                      className="absolute inset-0 flex items-center justify-center"
                      initial={{ opacity: 0 }}
                      whileHover={{ opacity: 1 }}
                      transition={{ duration: 0.3 }}
                    >
                      <motion.div
                        className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-sm border border-white/30 flex items-center justify-center"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        <Play size={24} className="text-white ml-1" />
                      </motion.div>
                    </motion.div>
                  </div>

                  {/* Project info */}
                  <div className="p-6 space-y-4">
                    <div>
                      <h3 className="text-xl font-medium text-white mb-2 group-hover:text-blue-400 transition-colors duration-300">
                        {project.title}
                      </h3>
                      <p className="text-sm text-gray-400 mb-3">
                        {project.category}
                      </p>
                      <p className="text-gray-300 text-sm leading-relaxed line-clamp-3">
                        {project.description}
                      </p>
                    </div>

                    {/* Tech stack preview */}
                    <div className="flex flex-wrap gap-2">
                      {project.technologies.slice(0, 3).map((tech: string) => (
                        <span
                          key={tech}
                          className="px-2 py-1 text-xs bg-blue-500/10 text-blue-400 border border-blue-500/20 rounded-full"
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
                  </div>

                  {/* 3D tilt effect on hover */}
                  <motion.div
                    className="absolute inset-0 rounded-2xl"
                    whileHover={{
                      rotateX: 5,
                      rotateY: 5,
                      z: 50,
                    }}
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    style={{ transformStyle: "preserve-3d" }}
                  />
                </div>
              </motion.div>
            ))}
          </div>

          {/* View all projects CTA */}
          <motion.div
            className="text-center mt-20"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6, duration: 0.8 }}
          >
            <motion.button
              className="px-8 py-4 border border-gray-600/50 text-gray-300 rounded-full font-medium hover:border-blue-400/50 hover:text-blue-400 transition-all duration-300"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              View All Projects
            </motion.button>
          </motion.div>
        </div>
      </section>

      {/* Project Modal */}
      <ProjectModal
        project={selectedProject}
        isOpen={isModalOpen}
        onClose={closeModal}
      />
    </>
  );
}
