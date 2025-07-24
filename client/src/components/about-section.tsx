export default function AboutSection() {
  return (
    <section id="about" className="py-20">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="animate-slide-up">
            <h2 className="text-4xl font-bold mb-6 text-holographic">About Me</h2>
            <p className="text-lg text-gray-300 mb-6">
              I'm a passionate full-stack engineer with a relentless drive for innovation. With 2+ years of experience building scalable applications, I specialize in creating seamless user experiences backed by robust, cloud-native architectures.
            </p>
            <p className="text-lg text-gray-300 mb-8">
              My expertise spans the entire development lifecycle - from crafting intuitive React frontends to architecting powerful Node.js backends, deploying on AWS, and automating workflows with cutting-edge tools.
            </p>
            
            {/* Experience Timeline */}
            <div className="space-y-6">
              <div className="glass-effect p-6 rounded-lg border-l-4 border-[hsl(180,100%,50%)]">
                <h3 className="text-xl font-semibold text-[hsl(180,100%,50%)]">Senior Full Stack Developer</h3>
                <p className="text-gray-400">2022 - Present</p>
                <p className="text-gray-300 mt-2">Leading development of scalable web applications using MERN stack and modern cloud technologies.</p>
              </div>
              <div className="glass-effect p-6 rounded-lg border-l-4 border-[hsl(259,83%,67%)]">
                <h3 className="text-xl font-semibold text-[hsl(259,83%,67%)]">Full Stack Developer</h3>
                <p className="text-gray-400">2021 - 2022</p>
                <p className="text-gray-300 mt-2">Developed and maintained multiple client projects using React, Node.js, and cloud services.</p>
              </div>
            </div>
          </div>
          
          <div className="relative">
            <div className="glass-effect rounded-2xl p-8 card-3d">
              <img 
                src="https://images.unsplash.com/photo-1461749280684-dccba630e2f6?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600" 
                alt="Modern developer setup with multiple monitors" 
                className="rounded-xl w-full h-auto" 
              />
              <div className="absolute inset-0 holographic rounded-2xl opacity-30"></div>
            </div>
            
            {/* Floating Tech Icons */}
            <div className="absolute -top-8 -right-8 w-16 h-16 bg-[hsla(180,100%,50%,0.2)] rounded-full flex items-center justify-center animate-float">
              <i className="fab fa-react text-2xl text-[hsl(180,100%,50%)]"></i>
            </div>
            <div className="absolute -bottom-8 -left-8 w-16 h-16 bg-[hsla(259,83%,67%,0.2)] rounded-full flex items-center justify-center animate-float" style={{animationDelay: '2s'}}>
              <i className="fab fa-node-js text-2xl text-[hsl(259,83%,67%)]"></i>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
