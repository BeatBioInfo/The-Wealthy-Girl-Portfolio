


import React, { useState, useEffect } from 'react';
import { PROFILE } from '../constants';
import { DownloadIcon } from './Icons';

const Hero = () => {
  const [imgSrc, setImgSrc] = useState(PROFILE.avatar);
  const [bgParticles, setBgParticles] = useState<Array<{id: number, left: string, top: string, size: string, duration: string, delay: string, opacity: number}>>([]);
  const [isDownloading, setIsDownloading] = useState(false);
  const [downloadMessage, setDownloadMessage] = useState('');

  // Generate background particles on mount
  useEffect(() => {
    const particles = Array.from({ length: 40 }).map((_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      size: `${Math.random() * 3 + 1}px`,
      duration: `${Math.random() * 15 + 10}s`, // 10-25s duration
      delay: `${Math.random() * 5}s`,
      opacity: Math.random() * 0.4 + 0.1,
    }));
    setBgParticles(particles);
  }, []);

  const handleScrollToProjects = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const element = document.getElementById('projects');
    if (element) {
        const headerOffset = 85;
        const elementPosition = element.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.scrollY - headerOffset;

        window.scrollTo({
            top: offsetPosition,
            behavior: "smooth"
        });
    }
  };

  const handleDownloadCV = (e: React.MouseEvent) => {
      // We don't preventDefault here, so the link opens naturally in a new tab.
      // We just use the click to show the status message.
      setIsDownloading(true);
      setDownloadMessage('Connecting to secure cloud storage...');

      // Reset state after the user has likely been redirected
      setTimeout(() => {
          setIsDownloading(false);
          setDownloadMessage('Document access granted.');
          
          setTimeout(() => setDownloadMessage(''), 3000);
      }, 2000);
  };

  const handleImageError = () => {
      setImgSrc("https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=800");
  };

  return (
    <div id="profile" className="relative min-h-screen flex flex-col justify-start items-center overflow-hidden pt-44 md:pt-52">
        
        {/* === Background Design === */}
        
        {/* Base Texture */}
        <div className="absolute inset-0 z-0 opacity-[0.05] pointer-events-none mix-blend-overlay" style={{ backgroundImage: "url('https://grainy-gradients.vercel.app/noise.svg')" }}></div>
        
        {/* Moving Gradient Orbs */}
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-comet-900/20 rounded-full blur-[100px] pointer-events-none animate-pulse-slow"></div>
        <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-purple-900/10 rounded-full blur-[80px] pointer-events-none animate-float" style={{ animationDelay: '2s' }}></div>

        {/* Motion Particles (Background Dust) */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
          {bgParticles.map(p => (
            <div 
                key={p.id}
                className="absolute rounded-full bg-white"
                style={{
                    left: p.left,
                    top: p.top,
                    width: p.size,
                    height: p.size,
                    opacity: p.opacity,
                    animation: `float ${p.duration} infinite ease-in-out alternate`,
                    animationDelay: p.delay,
                    boxShadow: `0 0 ${parseInt(p.size) * 2}px rgba(255,255,255,0.5)`
                }}
            />
          ))}
        </div>

        {/* === Main Content === */}
        <div className="relative z-10 flex flex-col items-center text-center max-w-4xl px-4">
            
            <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl text-slate-100 tracking-tight leading-tight mb-8 drop-shadow-2xl animate-float" style={{ animationDuration: '8s' }}>
                {PROFILE.name.split(" ")[0]}
            </h1>
            
            <p className="font-sans text-slate-400 text-lg md:text-xl tracking-wide uppercase letter-spacing-2 mb-12">
                {PROFILE.role}
            </p>

            {/* Profile Image Container with Sand Dust Effect */}
            <div className="relative w-64 h-64 md:w-80 md:h-80 lg:w-96 lg:h-96 mb-12 group perspective-1000">
                
                {/* Glow effect */}
                <div className="absolute inset-0 bg-gradient-to-tr from-comet-500/10 to-amber-500/10 rounded-full blur-2xl group-hover:blur-3xl transition-all duration-700"></div>
                
                {/* Sand Dust - Outer Ring (Dashed) */}
                <div className="absolute -inset-4 border border-dashed border-white/10 rounded-full animate-spin-slow pointer-events-none group-hover:scale-105 transition-transform duration-700 opacity-60"></div>
                
                {/* Sand Dust - Inner Ring (Dotted) */}
                <div className="absolute -inset-8 border-2 border-dotted border-comet-500/20 rounded-full animate-reverse-spin pointer-events-none group-hover:scale-105 transition-transform duration-700 opacity-40"></div>

                {/* Sand Particles Ring */}
                <div className="absolute inset-0 animate-spin-slower pointer-events-none z-0">
                    {[...Array(12)].map((_, i) => (
                        <div
                            key={i}
                            className={`absolute w-1.5 h-1.5 rounded-full ${i % 2 === 0 ? 'bg-amber-200/60' : 'bg-comet-300/40'}`}
                            style={{
                                top: '50%',
                                left: '50%',
                                transform: `rotate(${i * 30}deg) translateY(-55%) translateX(160px)`, // Pushes particles out to a radius
                                marginTop: '-3px',
                                marginLeft: '-3px',
                            }}
                        />
                    ))}
                </div>

                {/* Second Offset Particle Ring */}
                <div className="absolute inset-0 animate-reverse-spin pointer-events-none z-0" style={{ animationDuration: '30s' }}>
                   {[...Array(8)].map((_, i) => (
                        <div
                            key={`outer-${i}`}
                            className="absolute w-1 h-1 bg-white/20 rounded-full"
                            style={{
                                top: '50%',
                                left: '50%',
                                transform: `rotate(${i * 45 + 15}deg) translateY(-50%) translateX(130px)`, 
                            }}
                        />
                    ))}
                </div>
                
                {/* The Image Frame */}
                <div className="relative w-full h-full rounded-full border border-white/10 p-2 backdrop-blur-sm bg-white/5 transition-transform duration-700 group-hover:scale-[1.02] z-10">
                    <div className="w-full h-full rounded-full overflow-hidden relative shadow-2xl bg-space-950">
                        <img 
                            src={imgSrc} 
                            alt={PROFILE.name} 
                            onError={handleImageError}
                            className="w-full h-full object-cover transition-transform duration-700 scale-110 group-hover:scale-[1.35]" 
                        />
                        
                        {/* Strong Vignette Overlay */}
                        <div className="absolute inset-0 shadow-[inset_0_0_60px_rgba(3,7,18,0.9)] rounded-full pointer-events-none z-10"></div>
                        
                        {/* Texture Overlay on Image */}
                        <div className="absolute inset-0 opacity-[0.1] mix-blend-overlay pointer-events-none" style={{ backgroundImage: "url('https://grainy-gradients.vercel.app/noise.svg')" }}></div>

                        {/* Bottom Gradient Fade */}
                        <div className="absolute inset-0 bg-gradient-to-t from-space-950 via-transparent to-transparent opacity-80 pointer-events-none z-10"></div>
                    </div>
                </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col md:flex-row gap-4 mb-8">
                <a 
                    href="#projects" 
                    onClick={handleScrollToProjects}
                    className="group relative inline-flex items-center justify-center bg-white/5 backdrop-blur-md border border-white/10 rounded-full px-8 py-4 transition-all duration-300 hover:bg-white/10 hover:border-comet-500/30 hover:shadow-[0_0_20px_rgba(20,184,166,0.2)] cursor-pointer w-full md:w-auto min-w-[200px]"
                >
                    <span className="text-white font-medium mr-3 tracking-wide">View Portfolio</span>
                    <span className="flex items-center justify-center w-8 h-8 rounded-full bg-white text-space-950 transition-transform duration-300 group-hover:translate-x-1">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                        </svg>
                    </span>
                </a>

                {/* Replaced button with Anchor tag for accessibility and robust external linking */}
                <a
                    href={PROFILE.resumeUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={handleDownloadCV}
                    className={`group relative inline-flex items-center justify-center bg-comet-500/10 backdrop-blur-md border border-comet-500/50 rounded-full px-8 py-4 transition-all duration-300 hover:bg-comet-500/20 hover:shadow-[0_0_20px_rgba(20,184,166,0.2)] cursor-pointer w-full md:w-auto min-w-[200px] ${isDownloading ? 'pointer-events-none' : ''}`}
                >
                    <span className="text-comet-300 font-medium mr-3 tracking-wide group-hover:text-white transition-colors">
                        {isDownloading ? 'Accessing...' : 'View CV'}
                    </span>
                    <span className={`flex items-center justify-center w-8 h-8 rounded-full bg-comet-500/20 text-comet-300 transition-all duration-300 ${isDownloading ? 'animate-pulse' : 'group-hover:bg-comet-500 group-hover:text-white'}`}>
                       {isDownloading ? (
                           <div className="w-4 h-4 border-2 border-comet-300/30 border-t-comet-300 rounded-full animate-spin"></div>
                       ) : (
                           <DownloadIcon className="w-4 h-4" />
                       )}
                    </span>
                </a>
            </div>
            
            {/* Download Status Message */}
            <div className={`h-6 mb-8 transition-all duration-500 ${downloadMessage ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2'}`}>
                <p className="text-comet-300 text-sm font-mono flex items-center gap-2">
                    {downloadMessage.includes('granted') && <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>}
                    {downloadMessage}
                </p>
            </div>

            <p className="max-w-xl text-slate-400/80 font-light leading-relaxed mb-8">
                {PROFILE.summary}
            </p>

            <div className="flex items-center space-x-2 text-xs font-mono text-slate-600">
                <span>SCROLL TO EXPLORE</span>
                <svg className="w-3 h-3 animate-bounce" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                </svg>
            </div>
        </div>
    </div>
  );
};

export default Hero;
