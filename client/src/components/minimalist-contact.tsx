import React, { useState, useRef, Suspense } from "react";
import { motion, useAnimation } from "framer-motion";
import { Send, Mail, MessageCircle, User, CheckCircle } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  projectType: z.string().min(1, "Please select a project type"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

type ContactForm = z.infer<typeof contactSchema>;

const projectTypes = [
  "Web Application",
  "Mobile App",
  "E-commerce",
  "Automation",
  "Consulting",
  "Other",
];

export default function MinimalistContact() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);
  const controls = useAnimation();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactForm>({
    resolver: zodResolver(contactSchema),
  });

  React.useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        setMousePosition({
          x: (e.clientX - rect.left) / rect.width,
          y: (e.clientY - rect.top) / rect.height,
        });
      }
    };

    const container = containerRef.current;
    if (container) {
      container.addEventListener("mousemove", handleMouseMove);
      return () => {
        if (container) {
          container.removeEventListener("mousemove", handleMouseMove);
        }
      };
    }
  }, []);

  const onSubmit = async (data: ContactForm) => {
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/contacts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        setIsSubmitted(true);
        reset();

        // Success animation
        controls.start({
          scale: [1, 1.05, 1],
          transition: { duration: 0.5, ease: "easeInOut" },
        });

        // Reset success state after 3 seconds
        setTimeout(() => {
          setIsSubmitted(false);
        }, 3000);
      }
    } catch (error) {
      console.error("Error sending message:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section
      ref={containerRef}
      className="py-32 bg-black relative overflow-hidden"
      style={{ position: "relative" }}
    >
      {/* Animated background */}
      <div className="absolute inset-0 opacity-20">
        <div
          className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-transparent to-violet-500/10"
          style={{
            transform: `translate(${mousePosition.x * 20}px, ${
              mousePosition.y * 20
            }px)`,
          }}
        />
      </div>

      <div className="container mx-auto px-8 lg:px-16">
        {/* Section header */}
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.25, 0.25, 0.25, 0.75] }}
        >
          <h2 className="text-4xl lg:text-6xl font-light text-white mb-6">
            Let's Create
            <motion.span
              className="block text-transparent bg-gradient-to-r from-blue-400 to-violet-400 bg-clip-text"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.8 }}
            >
              Something Amazing
            </motion.span>
          </h2>
          <motion.p
            className="text-xl text-gray-400 max-w-2xl mx-auto font-light"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            Ready to transform your ideas into reality? Let's discuss your next
            project.
          </motion.p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center max-w-6xl mx-auto">
          {/* Left side - 3D Spline scene */}
          <motion.div
            className="relative h-[500px] flex items-center justify-center"
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.25, 0.25, 0.25, 0.75] }}
          >
            <div className="relative w-full h-full">
              {/* Advanced floating envelope animation */}
              <div className="flex items-center justify-center h-full">
                <motion.div
                  className="relative"
                  animate={{
                    y: [0, -20, 0],
                    rotateY: [0, 360],
                  }}
                  transition={{
                    y: { duration: 4, repeat: Infinity, ease: "easeInOut" },
                    rotateY: { duration: 10, repeat: Infinity, ease: "linear" },
                  }}
                >
                  <div className="w-40 h-40 bg-gradient-to-br from-blue-500/20 to-violet-500/20 rounded-3xl border border-blue-400/30 flex items-center justify-center backdrop-blur-sm relative">
                    <Mail size={64} className="text-blue-400" />
                    {/* Orbiting particles */}
                    {[...Array(3)].map((_, i) => (
                      <motion.div
                        key={i}
                        className="absolute w-2 h-2 bg-blue-400 rounded-full"
                        animate={{
                          rotate: 360,
                        }}
                        style={{
                          transformOrigin: `${80 + i * 20}px center`,
                        }}
                        transition={{
                          duration: 3 + i,
                          repeat: Infinity,
                          ease: "linear",
                        }}
                      />
                    ))}
                  </div>
                </motion.div>
              </div>

              {/* Fallback floating envelope animation */}
              <motion.div
                className="absolute inset-0 flex items-center justify-center opacity-30"
                style={{
                  transform: `rotateY(${mousePosition.x * 20}deg) rotateX(${
                    mousePosition.y * 10
                  }deg)`,
                }}
              >
                <motion.div
                  className="w-32 h-32 bg-gradient-to-br from-blue-500/20 to-violet-500/20 rounded-2xl border border-blue-400/30 flex items-center justify-center backdrop-blur-sm"
                  animate={{
                    y: [0, -20, 0],
                    rotateZ: [0, 5, -5, 0],
                  }}
                  transition={{
                    duration: 6,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                >
                  <Mail size={48} className="text-blue-400" />
                </motion.div>
              </motion.div>
            </div>

            {/* Subtle glow effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 via-transparent to-violet-500/5 rounded-full blur-3xl" />
          </motion.div>

          {/* Right side - Floating contact form */}
          <motion.div
            className="relative"
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.25, 0.25, 0.25, 0.75] }}
            animate={controls}
          >
            <div className="bg-gray-900/50 border border-gray-800/50 rounded-3xl p-8 backdrop-blur-md relative overflow-hidden">
              {/* Success overlay */}
              {isSubmitted && (
                <motion.div
                  className="absolute inset-0 bg-emerald-500/10 backdrop-blur-sm flex items-center justify-center rounded-3xl z-10"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                >
                  <div className="text-center">
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{
                        type: "spring",
                        stiffness: 300,
                        delay: 0.2,
                      }}
                    >
                      <CheckCircle
                        size={48}
                        className="text-emerald-400 mx-auto mb-4"
                      />
                    </motion.div>
                    <h3 className="text-xl font-medium text-white mb-2">
                      Message Sent!
                    </h3>
                    <p className="text-gray-400">I'll get back to you soon.</p>
                  </div>
                </motion.div>
              )}

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                {/* Form header */}
                <div className="text-center mb-8">
                  <MessageCircle className="w-8 h-8 text-blue-400 mx-auto mb-3" />
                  <h3 className="text-2xl font-light text-white">
                    Start a Conversation
                  </h3>
                </div>

                {/* Name field */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-400 flex items-center gap-2">
                    <User size={16} />
                    Full Name
                  </label>
                  <input
                    {...register("name")}
                    type="text"
                    className="w-full px-4 py-3 bg-black/30 border border-gray-700/50 rounded-xl text-white placeholder-gray-500 focus:border-blue-400/50 focus:outline-none transition-all duration-300 backdrop-blur-sm"
                    placeholder="Your name"
                  />
                  {errors.name && (
                    <p className="text-red-400 text-sm">
                      {errors.name.message}
                    </p>
                  )}
                </div>

                {/* Email field */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-400 flex items-center gap-2">
                    <Mail size={16} />
                    Email Address
                  </label>
                  <input
                    {...register("email")}
                    type="email"
                    className="w-full px-4 py-3 bg-black/30 border border-gray-700/50 rounded-xl text-white placeholder-gray-500 focus:border-blue-400/50 focus:outline-none transition-all duration-300 backdrop-blur-sm"
                    placeholder="your.email@example.com"
                  />
                  {errors.email && (
                    <p className="text-red-400 text-sm">
                      {errors.email.message}
                    </p>
                  )}
                </div>

                {/* Project type */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-400">
                    Project Type
                  </label>
                  <select
                    {...register("projectType")}
                    className="w-full px-4 py-3 bg-black/30 border border-gray-700/50 rounded-xl text-white focus:border-blue-400/50 focus:outline-none transition-all duration-300 backdrop-blur-sm"
                  >
                    <option value="">Select a project type</option>
                    {projectTypes.map((type) => (
                      <option key={type} value={type} className="bg-gray-900">
                        {type}
                      </option>
                    ))}
                  </select>
                  {errors.projectType && (
                    <p className="text-red-400 text-sm">
                      {errors.projectType.message}
                    </p>
                  )}
                </div>

                {/* Message field */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-400">
                    Message
                  </label>
                  <textarea
                    {...register("message")}
                    rows={4}
                    className="w-full px-4 py-3 bg-black/30 border border-gray-700/50 rounded-xl text-white placeholder-gray-500 focus:border-blue-400/50 focus:outline-none transition-all duration-300 backdrop-blur-sm resize-none"
                    placeholder="Tell me about your project..."
                  />
                  {errors.message && (
                    <p className="text-red-400 text-sm">
                      {errors.message.message}
                    </p>
                  )}
                </div>

                {/* Submit button */}
                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 bg-gradient-to-r from-blue-500 to-violet-500 text-white font-medium rounded-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {isSubmitting ? (
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{
                        duration: 1,
                        repeat: Infinity,
                        ease: "linear",
                      }}
                      className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full"
                    />
                  ) : (
                    <>
                      <Send size={18} />
                      Send Message
                    </>
                  )}
                </motion.button>
              </form>

              {/* Decorative elements */}
              <div className="absolute top-6 right-6 w-20 h-20 bg-gradient-to-br from-blue-500/10 to-violet-500/10 rounded-full blur-xl" />
              <div className="absolute bottom-6 left-6 w-16 h-16 bg-gradient-to-br from-violet-500/10 to-blue-500/10 rounded-full blur-xl" />
            </div>
          </motion.div>
        </div>

        {/* Contact info */}
        <motion.div
          className="text-center mt-20"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6, duration: 0.8 }}
        >
          <div className="flex flex-col sm:flex-row items-center justify-center gap-8">
            <motion.a
              href="mailto:tushar.hiddenmindsolutions@gmail.com"
              className="flex items-center gap-3 text-gray-400 hover:text-blue-400 transition-colors duration-300"
              whileHover={{ scale: 1.05 }}
            >
              <Mail size={20} />
              contact@tusharvaghela.dev
            </motion.a>
            <div className="w-px h-6 bg-gray-700 hidden sm:block" />
            <motion.div
              className="flex items-center gap-3 text-gray-400"
              whileHover={{ scale: 1.05 }}
            >
              <MessageCircle size={20} />
              Available for new projects
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
