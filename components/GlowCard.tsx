
import React, { useState, useRef, MouseEvent } from 'react';

interface GlowCardProps {
  children: React.ReactNode;
  className?: string;
}

const GlowCard: React.FC<GlowCardProps> = ({ children, className = '' }) => {
  const divRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [opacity, setOpacity] = useState(0);

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!divRef.current) return;

    const rect = divRef.current.getBoundingClientRect();
    setPosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  const handleMouseEnter = () => {
    setOpacity(1);
  };

  const handleMouseLeave = () => {
    setOpacity(0);
  };

  return (
    <div
      ref={divRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`relative overflow-hidden rounded-xl border border-slate-800 bg-slate-900/50 backdrop-blur-sm transition-colors duration-300 hover:border-slate-700 group ${className}`}
    >
      {/* Glowing spotlight effect */}
      <div
        className="pointer-events-none absolute -inset-px transition-opacity duration-300"
        style={{
          opacity,
          background: `radial-gradient(600px circle at ${position.x}px ${position.y}px, rgba(168, 85, 247, 0.15), transparent 40%)`,
        }}
      />
      
      {/* Border Glow */}
       <div
        className="pointer-events-none absolute -inset-px rounded-xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background: `radial-gradient(600px circle at ${position.x}px ${position.y}px, rgba(168, 85, 247, 0.4), transparent 40%)`,
          maskImage: 'linear-gradient(black, black), linear-gradient(black, black)',
          maskClip: 'content-box, border-box',
          padding: '1px',
          maskComposite: 'exclude',
          WebkitMaskComposite: 'xor',
        }}
      />

      {/* Particle Effects (Simple CSS bubbles) */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden opacity-0 group-hover:opacity-100 transition-opacity duration-500">
         <div className="absolute bottom-0 left-1/4 w-1 h-1 bg-purple-400 rounded-full animate-particle" style={{ animationDelay: '0s', animationDuration: '2s' }}></div>
         <div className="absolute bottom-0 left-1/2 w-1.5 h-1.5 bg-indigo-400 rounded-full animate-particle" style={{ animationDelay: '0.5s', animationDuration: '3s' }}></div>
         <div className="absolute bottom-0 left-3/4 w-1 h-1 bg-purple-300 rounded-full animate-particle" style={{ animationDelay: '1s', animationDuration: '2.5s' }}></div>
      </div>

      <div className="relative h-full">
        {children}
      </div>
    </div>
  );
};

export default GlowCard;
