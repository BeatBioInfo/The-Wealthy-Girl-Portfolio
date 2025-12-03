
import React from 'react';
import NavBar from './components/NavBar';
import Hero from './components/Hero';
import Skills from './components/Skills';
import Experience from './components/Experience';
import Projects from './components/Projects';
import FunFacts from './components/FunFacts';
import Contact from './components/Contact';
import Footer from './components/Footer';

const App = () => {
  return (
    <div className="min-h-screen font-sans bg-space-950 selection:bg-comet-500/30 selection:text-white">
      <NavBar />
      <main>
        <Hero />
        <Skills />
        <Experience />
        <Projects />
        <FunFacts />
        <Contact />
      </main>
      <Footer />
    </div>
  );
};

export default App;
