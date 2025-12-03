import React, { useState, useEffect, useRef } from 'react';
import { SKILL_CATEGORIES } from '../constants';
import { BugIcon, CodeIcon, ChartIcon, ToolIcon } from './Icons';

const iconMap = {
  code: CodeIcon,
  tool: ToolIcon,
  bug: BugIcon,
  chart: ChartIcon,
};

const Skills = () => {
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
      id="skills" 
      ref={sectionRef}
      className={`py-24 relative transition-all duration-1000 ease-out transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-20">
          <h2 className="font-serif text-4xl md:text-5xl text-white mb-6">Technical Expertise </h2>
          <div className="h-0.5 w-24 bg-comet-500/50"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {SKILL_CATEGORIES.map((category, idx) => {
            const Icon = iconMap[category.icon];
            return (
              <div key={idx} className="glass-panel rounded-xl p-8 hover:bg-white/5 transition-all duration-500 group">
                <div className="mb-6 opacity-60 group-hover:opacity-100 transition-opacity">
                  <Icon className="w-8 h-8 text-comet-300" />
                </div>
                <h3 className="text-xl font-serif italic text-white mb-6">{category.title}</h3>
                <div className="flex flex-wrap gap-2">
                  {category.skills.map((skill) => (
                    <span 
                      key={skill} 
                      className="inline-flex items-center px-3 py-1 rounded-full text-xs font-mono bg-white/5 text-slate-300 border border-white/5 hover:border-comet-500/30 transition-colors"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Skills;