import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import { useDarkMode } from "../contexts/DarkModeContext";

function Header() {
  const { isDarkMode, toggleDarkMode } = useDarkMode();
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`fixed top-0 w-full z-50 transition-all duration-300 ${
      isScrolled ? 'py-2 bg-white/10 backdrop-blur-md border-b border-white/20' : 'py-6 bg-gradient-to-r from-cosmic-purple via-cosmic-electric to-cosmic-soft'
    } text-white shadow-lg`}>
      <div className="container mx-auto flex justify-between items-center px-4">
        <Link to="/" className="flex items-center space-x-2 md:space-x-3 hover:opacity-80 transition-opacity">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={`transition-all duration-10000 ${isScrolled ? 'w-5 h-5 md:w-6 md:h-6' : 'w-6 h-6 md:w-8 md:h-8 animate-twinkle'}`}>
            <circle cx="12" cy="52" r="2" />
            <circle cx="24" cy="44" r="2" />
            <circle cx="36" cy="36" r="2" />
            <circle cx="48" cy="28" r="2" />
            <circle cx="60" cy="20" r="2" />
            <line x1="12" y1="52" x2="24" y2="44" />
            <line x1="24" y1="44" x2="36" y2="36" />
            <line x1="36" y1="36" x2="48" y2="28" />
            <line x1="48" y1="28" x2="60" y2="20" />
          </svg>
          <span className={`font-bold transition-all duration-300 ${isScrolled ? 'text-lg md:text-xl' : 'text-2xl md:text-3xl'}`}>Galáxia de Histórias</span>
        </Link>
        <nav className="hidden md:flex items-center space-x-6">
          <Link to="/" className="text-lg hover:text-cyanSoft transition-colors">Início</Link>
          <Link to="/home" className="text-lg hover:text-cyanSoft transition-colors">Histórias</Link>
          <Link to="/login" className="text-lg hover:text-cyanSoft transition-colors">Login</Link>
          <button
            onClick={toggleDarkMode}
            className="bg-white/20 px-3 py-1 rounded-full hover:bg-white/30 transition-colors"
          >
            {isDarkMode ? '☀️' : '🌙'}
          </button>
        </nav>
        <div className="md:hidden flex items-center space-x-2">
          <button
            onClick={toggleDarkMode}
            className="bg-white/20 px-2 py-1 rounded-full hover:bg-white/30 transition-colors text-sm"
          >
            {isDarkMode ? '☀️' : '🌙'}
          </button>
          <Link to="/login" className="text-sm bg-white/20 px-3 py-1 rounded-full hover:bg-white/30 transition-colors">Login</Link>
        </div>
      </div>
    </header>
  );
}

export default Header;
