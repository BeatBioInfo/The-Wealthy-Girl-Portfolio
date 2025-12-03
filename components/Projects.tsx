
import React, { useState, useEffect, useRef } from 'react';
import { PROJECTS } from '../constants';
import { GithubIcon, BitbucketIcon, WorkflowIcon } from './Icons';

const iconMap = {
  github: GithubIcon,
  bitbucket: BitbucketIcon,
  n8n: WorkflowIcon,
};

const Projects = () => {
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
      id="projects" 
      ref={sectionRef}
      className={`py-24 relative transition-all duration-1000 ease-out transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-20">
          <h2 className="font-serif text-4xl md:text-5xl text-white mb-6">Test Suites & Projects</h2>
          <div className="h-0.5 w-24 bg-comet-500/50"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {PROJECTS.map((project, idx) => {
            const Icon = iconMap[project.type];
            return (
              <div key={idx} className="glass-panel p-8 rounded-xl group hover:border-comet-500/30 hover:scale-[1.02] hover:shadow-[0_20px_40px_-15px_rgba(20,184,166,0.15)] transition-all duration-300 flex flex-col h-full">
                <div className="flex items-start justify-between mb-6">
                    <div className="p-3 bg-white/5 rounded-lg text-comet-300 group-hover:text-white group-hover:bg-comet-500/20 transition-all">
                        <Icon className="w-6 h-6" />
                    </div>
                    <a 
                      href={project.link} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className={`text-slate-500 hover:text-white transition-colors ${project.link === '#' ? 'pointer-events-none opacity-50' : ''}`}
                      aria-label="View Code"
                    >
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                        </svg>
                    </a>
                </div>

                <h3 className="text-xl font-serif text-white mb-3 group-hover:text-comet-300 transition-colors">
                    {project.title}
                </h3>
                
                <p className="text-slate-400 font-light mb-6 flex-grow leading-relaxed">
                    {project.description}
                </p>

                {/* Project Stats */}
                {project.stats && (
                    <div className="grid grid-cols-2 gap-4 mb-6">
                        {project.stats.map((stat, i) => (
                            <div key={i} className="bg-white/5 rounded-lg p-3 text-center border border-white/5">
                                <div className="text-[10px] text-slate-500 font-mono uppercase tracking-wider mb-1">{stat.label}</div>
                                <div className="text-lg text-comet-300 font-serif font-medium">{stat.value}</div>
                            </div>
                        ))}
                    </div>
                )}

                <div className="flex flex-wrap gap-2 pt-4 border-t border-white/5">
                    {project.techStack.map(tech => (
                        <span key={tech} className="text-xs font-mono text-slate-500 bg-space-950/50 px-2 py-1 rounded">
                            {tech}
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

export default Projects;
