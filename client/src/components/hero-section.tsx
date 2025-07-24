import { Rocket, Download } from "lucide-react";

export default function HeroSection() {
  const scrollToProjects = () => {
    const element = document.getElementById('projects');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <section className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 opacity-20">
        <img 
          src="https://images.unsplash.com/photo-1518709268805-4e9042af2176?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&h=1080" 
          alt="Futuristic tech workspace" 
          className="w-full h-full object-cover" 
        />
      </div>
      
      {/* Animated particles background */}
      <div className="absolute inset-0">
        <div className="w-2 h-2 bg-[hsl(180,100%,50%)] rounded-full absolute top-1/4 left-1/4 animate-float"></div>
        <div className="w-1 h-1 bg-[hsl(259,83%,67%)] rounded-full absolute top-3/4 left-3/4 animate-float" style={{animationDelay: '2s'}}></div>
        <div className="w-3 h-3 bg-[hsl(199,89%,48%)] rounded-full absolute top-1/2 right-1/4 animate-float" style={{animationDelay: '4s'}}></div>
      </div>
      
      <div className="container mx-auto px-6 text-center z-10">
        <div className="animate-slide-up">
          <h1 className="text-5xl md:text-7xl font-bold mb-6">
            <span className="text-holographic">Tushar Vaghela</span>
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-gray-300">
            Full Stack Engineer & Innovation Architect
          </p>
          <p className="text-lg mb-12 max-w-3xl mx-auto text-gray-400">
            Crafting cutting-edge digital experiences with 2+ years of expertise in MERN Stack, Next.js, React Native, and cloud technologies. Transforming ideas into scalable, futuristic solutions.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button 
              onClick={scrollToProjects}
              className="glass-effect hover:animate-glow px-8 py-4 rounded-lg border border-[hsl(180,100%,50%)] text-[hsl(180,100%,50%)] font-semibold transition-all duration-300 hover:bg-[hsla(180,100%,50%,0.1)] flex items-center justify-center gap-2"
            >
              <Rocket size={20} />
              Explore Projects
            </button>
            <button className="glass-effect hover:bg-[hsl(259,83%,67%)] hover:text-black px-8 py-4 rounded-lg border border-[hsl(259,83%,67%)] text-[hsl(259,83%,67%)] font-semibold transition-all duration-300 flex items-center justify-center gap-2">
              <Download size={20} />
              Download Resume
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
