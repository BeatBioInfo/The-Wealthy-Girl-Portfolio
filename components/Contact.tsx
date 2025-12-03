
import React, { useState, useEffect, useRef } from 'react';
import { SOCIAL_LINKS } from '../constants';
import { GithubIcon, LinkedinIcon, MailIcon, PhoneIcon, PaperPlaneIcon, CheckCircleIcon } from './Icons';

const iconMap = {
  linkedin: LinkedinIcon,
  github: GithubIcon,
  email: MailIcon,
  phone: PhoneIcon,
};

const Contact = () => {
    const [isVisible, setIsVisible] = useState(false);
    const sectionRef = useRef<HTMLElement>(null);
    const [formState, setFormState] = useState({
        email: '',
        summary: '',
        severity: 'Critical',
        description: ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

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

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        // Basic validation
        if (!formState.email || !formState.summary || !formState.description) return;

        setIsSubmitting(true);
        
        try {
            const response = await fetch("https://formsubmit.co/ajax/oshanimioluwakemi@gmail.com", {
                method: "POST",
                headers: { 
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                },
                body: JSON.stringify({
                    email: formState.email,
                    _subject: `Portfolio Inquiry: ${formState.summary}`,
                    priority: formState.severity,
                    message: formState.description,
                    // Include summary in body as well
                    subject_line: formState.summary
                })
            });

            if (response.ok) {
                setIsSuccess(true);
                setFormState({ email: '', summary: '', severity: 'Standard', description: '' });
                setTimeout(() => setIsSuccess(false), 3000);
            } else {
                console.error("Submission failed");
            }
        } catch (error) {
            console.error("Error submitting form", error);
        } finally {
            setIsSubmitting(false);
        }
    };

  return (
    <section 
      id="contact" 
      ref={sectionRef}
      className={`py-24 relative bg-black/20 transition-all duration-1000 ease-out transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            
            {/* Contact Info */}
            <div>
                <h2 className="font-serif text-4xl text-white mb-6">Initialize Contact</h2>
                <p className="text-slate-400 text-lg mb-12 font-light">
                    I am available for new opportunities. Let's connect
                    <span className="inline-flex ml-1">
                        <span className="animate-blink" style={{ animationDelay: '0ms' }}>.</span>
                        <span className="animate-blink" style={{ animationDelay: '200ms' }}>.</span>
                        <span className="animate-blink" style={{ animationDelay: '400ms' }}>.</span>
                    </span>
                </p>

                <div className="space-y-4">
                    {SOCIAL_LINKS.map((link, idx) => {
                        const Icon = iconMap[link.icon];
                        return (
                            <a 
                                key={idx} 
                                href={link.url}
                                className="flex items-center p-4 glass-panel rounded-lg hover:bg-white/5 transition-colors group"
                            >
                                <div className="p-2 mr-4 text-slate-400 group-hover:text-comet-300 transition-colors">
                                    <Icon className="w-5 h-5" />
                                </div>
                                <div>
                                    <p className="text-xs text-slate-500 font-mono mb-0.5 uppercase tracking-wider">{link.platform}</p>
                                    <p className="text-base text-slate-200">{link.platform === 'Email' || link.platform === 'Phone' ? link.url.replace('mailto:', '').replace('tel:', '') : 'Connect'}</p>
                                </div>
                            </a>
                        );
                    })}
                </div>
            </div>

            {/* Form */}
            <div className="glass-panel p-8 rounded-2xl relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-comet-900 via-comet-500 to-comet-900 opacity-50"></div>
                
                <h3 className="text-xl font-serif text-white mb-8">Send Message</h3>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label className="block text-xs font-mono text-slate-500 mb-2 uppercase tracking-wide">Reporter (Email)</label>
                        <input 
                            type="email" 
                            className="w-full px-4 py-3 rounded-lg bg-black/40 border border-white/10 text-white placeholder-slate-600 focus:border-comet-500/50 focus:ring-1 focus:ring-comet-500/50 outline-none transition-all"
                            placeholder="recruiter@company.com"
                            value={formState.email}
                            onChange={(e) => setFormState({...formState, email: e.target.value})}
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-xs font-mono text-slate-500 mb-2 uppercase tracking-wide">Subject</label>
                        <input 
                            type="text" 
                            className="w-full px-4 py-3 rounded-lg bg-black/40 border border-white/10 text-white placeholder-slate-600 focus:border-comet-500/50 focus:ring-1 focus:ring-comet-500/50 outline-none transition-all"
                            placeholder="Regarding QA Opportunity"
                            value={formState.summary}
                            onChange={(e) => setFormState({...formState, summary: e.target.value})}
                            required
                        />
                    </div>
                    
                    <div>
                        <label className="block text-xs font-mono text-slate-500 mb-2 uppercase tracking-wide">Priority</label>
                        <div className="flex space-x-2">
                            {['Standard', 'High', 'Critical'].map((level) => (
                                <button
                                    type="button"
                                    key={level}
                                    onClick={() => setFormState({...formState, severity: level})}
                                    className={`px-4 py-2 rounded-md text-xs font-mono transition-all border ${
                                        formState.severity === level 
                                        ? 'bg-comet-500/20 border-comet-500/50 text-comet-300'
                                        : 'bg-transparent border-white/10 text-slate-500 hover:border-white/20'
                                    }`}
                                >
                                    {level}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div>
                        <label className="block text-xs font-mono text-slate-500 mb-2 uppercase tracking-wide">Message</label>
                        <textarea 
                            rows={4}
                            className="w-full px-4 py-3 rounded-lg bg-black/40 border border-white/10 text-white placeholder-slate-600 focus:border-comet-500/50 focus:ring-1 focus:ring-comet-500/50 outline-none transition-all"
                            value={formState.description}
                            onChange={(e) => setFormState({...formState, description: e.target.value})}
                            required
                        ></textarea>
                    </div>

                    <button 
                        type="submit" 
                        disabled={isSubmitting || isSuccess}
                        className={`group w-full font-medium py-4 rounded-lg transition-all shadow-lg shadow-white/5 flex items-center justify-center gap-2 disabled:cursor-not-allowed ${
                            isSuccess 
                                ? 'bg-comet-500 text-white hover:bg-comet-500' 
                                : 'bg-white text-space-950 hover:bg-slate-200'
                        }`}
                    >
                        {isSuccess ? (
                            <>
                                <CheckCircleIcon className="w-5 h-5 animate-bounce" />
                                <span>Transmission Complete</span>
                            </>
                        ) : isSubmitting ? (
                            <>
                                <div className="w-4 h-4 border-2 border-space-950/30 border-t-space-950 rounded-full animate-spin"></div>
                                <span>Transmitting...</span>
                            </>
                        ) : (
                            <>
                                <span>Transmit</span>
                                <PaperPlaneIcon className="w-4 h-4 transition-transform duration-500 group-hover:translate-x-1 group-hover:-translate-y-1" />
                            </>
                        )}
                    </button>
                </form>
            </div>

        </div>
      </div>
    </section>
  );
};

export default Contact;
