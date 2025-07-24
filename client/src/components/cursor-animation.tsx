import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface CursorProps {
  x: number;
  y: number;
  isHovering: boolean;
  hoverText?: string;
}

export default function CursorAnimation() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [hoverText, setHoverText] = useState("");
  const [trail, setTrail] = useState<Array<{ x: number; y: number; id: number }>>([]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
      
      // Add to trail
      setTrail(prev => {
        const newTrail = [...prev, { x: e.clientX, y: e.clientY, id: Date.now() }];
        return newTrail.slice(-8); // Keep last 8 positions
      });
    };

    const handleMouseEnter = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      
      // Add null checks for safety
      if (!target || !target.tagName) return;
      
      // Check for interactive elements
      if (
        target.tagName === 'BUTTON' ||
        target.tagName === 'A' ||
        (target.classList && target.classList.contains('cursor-pointer')) ||
        target.closest('button') ||
        target.closest('a')
      ) {
        setIsHovering(true);
        
        // Get hover text if available
        const hoverElement = target.closest('[data-cursor-text]') as HTMLElement;
        if (hoverElement && hoverElement.dataset) {
          setHoverText(hoverElement.dataset.cursorText || "");
        }
      }
    };

    const handleMouseLeave = () => {
      setIsHovering(false);
      setHoverText("");
    };

    // Add event listeners
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseenter', handleMouseEnter, true);
    document.addEventListener('mouseleave', handleMouseLeave, true);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseenter', handleMouseEnter, true);
      document.removeEventListener('mouseleave', handleMouseLeave, true);
    };
  }, []);

  return (
    <>
      {/* Hide default cursor */}
      <style dangerouslySetInnerHTML={{
        __html: `
          * {
            cursor: none !important;
          }
        `
      }} />

      {/* Custom cursor */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-50 mix-blend-difference"
        animate={{
          x: mousePosition.x - 10,
          y: mousePosition.y - 10,
        }}
        transition={{
          type: "spring",
          damping: 30,
          stiffness: 400,
          mass: 0.5,
        }}
      >
        <motion.div
          className="w-5 h-5 bg-white rounded-full"
          animate={{
            scale: isHovering ? 1.5 : 1,
          }}
          transition={{
            type: "spring",
            damping: 20,
            stiffness: 300,
          }}
        />
      </motion.div>

      {/* Cursor ring */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-49"
        animate={{
          x: mousePosition.x - 20,
          y: mousePosition.y - 20,
        }}
        transition={{
          type: "spring",
          damping: 15,
          stiffness: 200,
          mass: 0.8,
        }}
      >
        <motion.div
          className="w-10 h-10 border border-white/30 rounded-full mix-blend-difference"
          animate={{
            scale: isHovering ? 2 : 1,
            opacity: isHovering ? 0.8 : 0.4,
          }}
          transition={{
            type: "spring",
            damping: 20,
            stiffness: 300,
          }}
        />
      </motion.div>

      {/* Hover text */}
      <AnimatePresence>
        {isHovering && hoverText && (
          <motion.div
            className="fixed pointer-events-none z-48 bg-black/80 text-white px-3 py-1 rounded-full text-sm backdrop-blur-sm border border-white/10"
            initial={{ opacity: 0, scale: 0.8, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 10 }}
            style={{
              left: mousePosition.x + 20,
              top: mousePosition.y - 40,
            }}
            transition={{
              type: "spring",
              damping: 20,
              stiffness: 300,
            }}
          >
            {hoverText}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Cursor trail */}
      {trail.map((point, index) => (
        <motion.div
          key={point.id}
          className="fixed top-0 left-0 pointer-events-none z-48"
          initial={{ opacity: 0.6, scale: 1 }}
          animate={{
            opacity: (index / trail.length) * 0.3,
            scale: (index / trail.length) * 0.5,
            x: point.x - 2,
            y: point.y - 2,
          }}
          transition={{
            duration: 0.5,
            ease: "easeOut",
          }}
        >
          <div className="w-1 h-1 bg-blue-400 rounded-full mix-blend-screen" />
        </motion.div>
      ))}
    </>
  );
}