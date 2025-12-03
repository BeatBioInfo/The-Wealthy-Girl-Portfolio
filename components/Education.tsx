import React, { useState, useEffect, useRef } from 'react';
import { EDUCATION } from '../constants';

const Education = () => {
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
      id="education" 
      ref={sectionRef}
      className={`py-24 relative transition-all duration-1000 ease-out transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}
    >
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
            <h2 className="font-serif text-3xl md:text-4xl text-white mb-4">Academic Background</h2>
            <div className="h-px w-full max-w-xs mx-auto bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {EDUCATION.map((edu, idx) => (
                <div key={idx} className="glass-panel p-8 rounded-xl flex flex-col items-center text-center group hover:bg-white/5 transition-all">
                    <div className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center mb-6 text-comet-300 group-hover:text-white group-hover:border-comet-500/50 transition-all">
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 14l9-5-9-5-9 5 9 5z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
                        </svg>
                    </div>
                    <h3 className="text-xl font-serif text-white mb-2">{edu.degree}</h3>
                    <p className="text-slate-400 font-light mb-1">{edu.institution}</p>
                    <div className="flex items-center space-x-2 text-xs font-mono text-slate-500 mt-4">
                        <span>{edu.location}</span>
                        <span>//</span>
                        <span>{edu.year}</span>
                    </div>
                </div>
            ))}
        </div>
      </div>
    </section>
  );
};

export default Education;