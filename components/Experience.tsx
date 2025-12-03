
import React, { useState, useEffect, useRef } from 'react';
import { EXPERIENCE } from '../constants';

const Experience = () => {
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

  return (
    <section 
      id="experience" 
      ref={sectionRef}
      className={`py-24 relative transition-all duration-1000 ease-out transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}
    >
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-20 text-right">
          <h2 className="font-serif text-4xl md:text-5xl text-white mb-6">Experience</h2>
           <div className="flex justify-end">
               <div className="h-0.5 w-24 bg-comet-500/50"></div>
           </div>
        </div>

        <div className="relative space-y-16">
            {/* Vertical Animated Dotted Line */}
            <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-px md:block hidden transform md:-translate-x-1/2">
                <div className="h-full w-0.5 dashed-line-vertical mx-auto opacity-50"></div>
            </div>

            {EXPERIENCE.map((job, idx) => (
                <div key={idx} className={`relative flex flex-col md:flex-row gap-8 md:gap-0 ${idx % 2 === 0 ? 'md:flex-row-reverse' : ''}`}>
                    
                    {/* Content Card */}
                    <div className="w-full md:w-1/2 md:px-12">
                        <div className="glass-panel p-8 rounded-xl relative hover:border-comet-500/30 transition-colors duration-500 group">
                            <div className="mb-6">
                                <h3 className="text-2xl font-serif text-white mb-1">{job.role}</h3>
                                <div className="flex justify-between items-center text-comet-300 text-sm font-medium">
                                    <span>{job.company}</span>
                                    <span className="font-mono text-xs opacity-70">{job.location}</span>
                                </div>
                            </div>
                            
                            <p className="text-slate-400 mb-6 leading-relaxed font-light">
                                {job.description}
                            </p>

                            <ul className="space-y-3 mb-6">
                                {job.achievements.slice(0, 3).map((achievement, i) => (
                                    <li key={i} className="flex items-start text-sm text-slate-300 font-light">
                                        <span className="mr-3 mt-1.5 w-1 h-1 bg-comet-500 rounded-full flex-shrink-0 group-hover:bg-comet-300 transition-colors"></span>
                                        {achievement}
                                    </li>
                                ))}
                            </ul>

                            <div className="flex flex-wrap gap-2 pt-4 border-t border-white/5">
                                {job.techStack.map(tech => (
                                    <span key={tech} className="text-xs font-mono text-slate-500">
                                        {tech}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Timeline Node */}
                    <div className="absolute left-0 md:left-1/2 transform -translate-x-1/2 w-4 h-4 rounded-full bg-space-950 border border-comet-500 shadow-[0_0_15px_rgba(20,184,166,0.5)] z-10 hidden md:block">
                        <div className="w-full h-full rounded-full bg-comet-500/20 animate-pulse"></div>
                    </div>
                    
                    {/* Date Label */}
                    <div className={`w-full md:w-1/2 md:px-12 flex items-center ${idx % 2 === 0 ? 'md:justify-start' : 'md:justify-end'}`}>
                         <span className="font-mono text-comet-300 text-sm tracking-widest opacity-80">
                            {job.period}
                         </span>
                    </div>
                </div>
            ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;
