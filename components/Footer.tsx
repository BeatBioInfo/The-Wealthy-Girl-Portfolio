import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-black py-8 text-center border-t border-white/5">
      <p className="text-slate-600 font-mono text-xs tracking-wider">
        © {new Date().getFullYear()} Oluwakemisola Oshanimi
      </p>
    </footer>
  );
};

export default Footer;