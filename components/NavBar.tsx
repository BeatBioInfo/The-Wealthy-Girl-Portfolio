
import React, { useState } from 'react';
import { BugIcon } from './Icons';

const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  // Replaced Education with Projects
  const navItems = ['Profile', 'Skills', 'Experience', 'Projects', 'Contact'];

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    setIsOpen(false); // Close mobile menu if open

    const element = document.getElementById(id);
    if (element) {
      // Calculate offset to account for fixed header (h-20 = 80px)
      const headerOffset = 85; 
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.scrollY - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-space-950/80 border-b border-white/5">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo */}
          <div className="flex items-center space-x-2 z-50">
            <a 
              href="#profile" 
              onClick={(e) => handleNavClick(e, 'profile')}
              className="font-serif italic text-2xl tracking-tight text-white cursor-pointer hover:text-comet-300 transition-colors"
            >
              The Wealthy Girl
            </a>
          </div>
          
          {/* Desktop Menu */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              {navItems.map((item) => (
                <a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  onClick={(e) => handleNavClick(e, item.toLowerCase())}
                  className="px-3 py-2 rounded-md text-sm font-light text-slate-300 hover:text-white hover:bg-white/5 transition-all tracking-wide hover:tracking-wider duration-300"
                >
                  {item}
                </a>
              ))}
            </div>
          </div>
          
          {/* Icons and Mobile Menu Button */}
          <div className="flex items-center gap-4">
             <a 
               href="#contact" 
               onClick={(e) => handleNavClick(e, 'contact')}
               className="p-2 text-slate-400 hover:text-comet-300 transition-colors cursor-pointer" 
               aria-label="Contact"
             >
                <BugIcon className="w-5 h-5" />
             </a>

             {/* Mobile Menu Button */}
             <div className="md:hidden">
               <button 
                 onClick={toggleMenu} 
                 className="text-slate-300 hover:text-white focus:outline-none p-2"
               >
                 <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                   {isOpen ? (
                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                   ) : (
                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                   )}
                 </svg>
               </button>
             </div>
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <div className={`md:hidden absolute top-20 left-0 w-full bg-space-950/95 border-b border-white/5 backdrop-blur-xl transition-all duration-300 ease-in-out ${isOpen ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4 pointer-events-none'}`}>
        <div className="px-4 pt-2 pb-6 space-y-1">
          {navItems.map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase()}`}
              onClick={(e) => handleNavClick(e, item.toLowerCase())}
              className="block px-3 py-4 rounded-md text-base font-medium text-slate-300 hover:text-white hover:bg-white/5 transition-colors border-b border-white/5 last:border-0"
            >
              {item}
            </a>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
