import { useEffect } from "react";

export default function ParticlesBackground() {
  useEffect(() => {
    const createParticle = () => {
      const colors = ['hsl(180,100%,50%)', 'hsl(259,83%,67%)', 'hsl(199,89%,48%)'];
      const particle = document.createElement('div');
      particle.className = 'fixed w-1 h-1 rounded-full pointer-events-none z-0';
      particle.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
      particle.style.left = Math.random() * window.innerWidth + 'px';
      particle.style.top = window.innerHeight + 'px';
      particle.style.opacity = (Math.random() * 0.5 + 0.2).toString();
      
      document.body.appendChild(particle);
      
      const animation = particle.animate([
        { transform: 'translateY(0px)', opacity: particle.style.opacity },
        { transform: `translateY(-${window.innerHeight + 100}px)`, opacity: '0' }
      ], {
        duration: Math.random() * 3000 + 2000,
        easing: 'linear'
      });
      
      animation.addEventListener('finish', () => {
        particle.remove();
      });
    };
    
    // Create particles periodically
    const interval = setInterval(createParticle, 500);
    
    return () => clearInterval(interval);
  }, []);

  return null;
}
