
import React, { useState, useEffect, useRef } from 'react';
import { FUN_FACTS } from '../constants';
import { BookIcon, PaletteIcon, HeadphonesIcon } from './Icons';

const iconMap = {
  book: BookIcon,
  palette: PaletteIcon,
  headphones: HeadphonesIcon,
};

const FunFacts = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const handleRequestArt = (e: React.MouseEvent) => {
    e.preventDefault();
    const element = document.getElementById('contact');
    if (element) {
        const headerOffset = 85;
        const elementPosition = element.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.scrollY - headerOffset;

        window.scrollTo({
            top: offsetPosition,
            behavior: "smooth"
        });
        
        // Optionally fill the contact form subject line via URL params or local storage if we had that logic,
        // for now just taking them to contact is good.
    }
  };

  return (
    <section 
      id="fun-facts" 
      ref={sectionRef}
      className={`py-24 relative transition-all duration-1000 ease-out transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-16 text-center">
            <span className="font-mono text-comet-500 text-xs tracking-widest uppercase mb-2 block">System Logs // Personal</span>
            <h2 className="font-serif text-3xl md:text-4xl text-white">Offline Mode</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {FUN_FACTS.map((fact, idx) => {
                const Icon = iconMap[fact.icon];
                return (
                    <div key={idx} className="glass-panel p-8 rounded-xl relative overflow-hidden group hover:bg-white/5 transition-all duration-500 flex flex-col h-full">
                        {/* Decorative Code Background */}
                        <div className="absolute -right-4 -top-4 opacity-5 text-9xl font-serif rotate-12 pointer-events-none select-none">
                            {idx === 0 ? '?' : idx === 1 ? '&' : '#'}
                        </div>

                        <div className="relative z-10 flex flex-col h-full">
                            <div className="w-12 h-12 rounded-lg bg-comet-500/10 flex items-center justify-center mb-6 text-comet-300 group-hover:scale-110 transition-transform duration-500">
                                <Icon className="w-6 h-6" />
                            </div>
                            
                            <div className="flex items-center space-x-3 mb-4">
                                <span className="px-2 py-1 rounded text-[10px] font-mono bg-white/5 text-slate-400 uppercase tracking-wide border border-white/5">
                                    {fact.topic}
                                </span>
                            </div>

                            <h3 className="text-xl font-serif text-white mb-4">{fact.title}</h3>
                            
                            <p className="text-slate-400 font-light leading-relaxed mb-6 flex-grow">
                                {fact.description}
                            </p>

                            {fact.meta && (
                                <div className="mt-auto">
                                    <button 
                                        onClick={handleRequestArt}
                                        className="inline-flex items-center text-xs font-mono text-comet-300 hover:text-white transition-colors border-b border-comet-500/30 hover:border-comet-300 pb-0.5"
                                    >
                                        <span className="w-1.5 h-1.5 rounded-full bg-green-500 mr-2 animate-pulse"></span>
                                        {fact.meta}
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                );
            })}
        </div>
      </div>
    </section>
  );
};

export default FunFacts;
