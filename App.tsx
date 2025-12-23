
import React from 'react';
import NavBar from './components/NavBar';
import Hero from './components/Hero';
import Skills from './components/Skills';
import Projects from './components/Projects';
import FunFacts from './components/FunFacts';
import Contact from './components/Contact';
import Footer from './components/Footer';
import ChatBot from './components/ChatBot';
import MovingBackground from './components/MovingBackground';

const App = () => {
  return (
    <div className="relative min-h-screen font-sans bg-transparent selection:bg-comet-500/30 selection:text-white">
      <MovingBackground />
      <NavBar />
      <main>
        <Hero />
        <Skills />
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
