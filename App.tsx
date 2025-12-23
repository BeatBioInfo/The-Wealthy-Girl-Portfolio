

import React from 'react';
import NavBar from './components/NavBar';
import Hero from './components/Hero';
import Skills from './components/Skills';
// Experience removed from UI as requested
import Projects from './components/Projects';
import FunFacts from './components/FunFacts';
import Contact from './components/Contact';
import Footer from './components/Footer';
import ChatBot from './components/ChatBot';

const App = () => {
  return (
    <div className="min-h-screen font-sans bg-space-950 selection:bg-comet-500/30 selection:text-white">
      <NavBar />
      <main>
        <Hero />
        <Skills />
        {/* Experience section removed */}
        <Projects />
        <FunFacts />
        <Contact />
      </main>
      <Footer />
      <ChatBot />
    </div>
  );
};

export default App;
