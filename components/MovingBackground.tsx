
import React, { useEffect, useState } from 'react';

const MovingBackground = () => {
  const [particles, setParticles] = useState<Array<{ id: number; left: string; top: string; size: string; duration: string; delay: string }>>([]);

  useEffect(() => {
    // Generate static particles on the client to avoid hydration mismatch
    const newParticles = Array.from({ length: 30 }).map((_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      size: `${Math.random() * 2 + 1}px`,
      duration: `${Math.random() * 20 + 20}s`,
      delay: `${Math.random() * -20}s`,
    }));
    setParticles(newParticles);
  }, []);

  return (
    <div className="fixed inset-0 -z-50 overflow-hidden pointer-events-none bg-space-950">
      {/* Moving Mesh Gradients */}
      <div className="absolute top-[-10%] left-[-10%] w-[60%] h-[60%] rounded-full bg-comet-900/10 blur-[120px] animate-float opacity-50"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full bg-purple-900/10 blur-[100px] animate-reverse-spin opacity-30" style={{ animationDuration: '40s' }}></div>
      <div className="absolute top-[30%] right-[10%] w-[40%] h-[40%] rounded-full bg-comet-700/5 blur-[100px] animate-pulse-slow"></div>

      {/* Grid Pattern overlay */}
      <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(circle, #fff 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>

      {/* Drifting Particles */}
      {particles.map((p) => (
        <div
          key={p.id}
          className="absolute rounded-full bg-white/20"
          style={{
            left: p.left,
            top: p.top,
            width: p.size,
            height: p.size,
            animation: `drift ${p.duration} linear infinite`,
            animationDelay: p.delay,
          }}
        />
      ))}

      <style>{`
        @keyframes drift {
          0% {
            transform: translate(0, 0);
            opacity: 0;
          }
          10% {
            opacity: 1;
          }
          90% {
            opacity: 1;
          }
          100% {
            transform: translate(100px, -100px);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
};

export default MovingBackground;
