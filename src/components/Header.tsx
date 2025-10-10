import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from "react-router-dom";
import { useDarkMode } from "../contexts/DarkModeContext";
import useAuthors from "../hooks/useAuthors";
import { useReaders } from "../hooks/useReaders";

function Header() {
  const { isDarkMode, toggleDarkMode } = useDarkMode();
  const { currentAuthor, logout: authorLogout } = useAuthors();
  const { currentReader, logout: readerLogout } = useReaders();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const mobileMenuVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const mobileItemVariants = {
    hidden: { opacity: 0, x: -10 },
    visible: { opacity: 1, x: 0 }
  };

  const handleLogout = () => {
    if (currentAuthor) {
      authorLogout();
    } else if (currentReader) {
      readerLogout();
    }
    setIsMobileMenuOpen(false);
  };

  const isLoggedIn = !!currentAuthor || !!currentReader;
  const profilePath = currentAuthor ? `/profile/author/${currentAuthor.id}` : currentReader ? `/profile/reader/${currentReader.id}` : '/login';

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`fixed top-0 w-full z-50 transition-all duration-300 ${
      isScrolled ? `py-2 ${isDarkMode ? 'bg-white/10 backdrop-blur-md border-b border-white/20' : 'bg-gray-100/80 backdrop-blur-md border-b border-gray-300'}` : `py-6 ${isDarkMode ? 'bg-gradient-to-r from-cosmic-purple via-cosmic-electric to-cosmic-soft' : 'bg-white'}`
    } ${isDarkMode ? 'text-white' : 'text-black'} shadow-lg`}>
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
          <motion.div whileHover={{ scale: 1.05, boxShadow: "0 0 10px rgba(59, 130, 246, 0.3)" }} transition={{ duration: 0.2 }}>
            <Link to="/" className="text-lg hover:text-cyanSoft transition-colors">Início</Link>
          </motion.div>
          <motion.div whileHover={{ scale: 1.05, boxShadow: "0 0 10px rgba(59, 130, 246, 0.3)" }} transition={{ duration: 0.2 }}>
            <Link to="/home" className="text-lg hover:text-cyanSoft transition-colors">Histórias</Link>
          </motion.div>
          {isLoggedIn ? (
            <>
              <motion.div whileHover={{ scale: 1.05, boxShadow: "0 0 10px rgba(59, 130, 246, 0.3)" }} transition={{ duration: 0.2 }}>
                <Link to={profilePath} className="text-lg hover:text-cyanSoft transition-colors">Meu Perfil</Link>
              </motion.div>
              <motion.button
                onClick={handleLogout}
                className="text-lg hover:text-red-400 transition-colors"
                whileHover={{ scale: 1.05, boxShadow: "0 0 10px rgba(239, 68, 68, 0.5)" }}
                transition={{ duration: 0.2 }}
              >
                Logout
              </motion.button>
            </>
          ) : (
            <motion.div whileHover={{ scale: 1.05, boxShadow: "0 0 10px rgba(59, 130, 246, 0.3)" }} transition={{ duration: 0.2 }}>
              <Link to="/login" className="text-lg hover:text-cyanSoft transition-colors">Login</Link>
            </motion.div>
          )}
          <motion.button
            onClick={toggleDarkMode}
            className="bg-white/20 px-3 py-1 rounded-full hover:bg-white/30 transition-colors"
            whileHover={{ scale: 1.1, boxShadow: "0 0 15px rgba(59, 130, 246, 0.5)" }}
            transition={{ duration: 0.2 }}
          >
            {isDarkMode ? '☀️' : '🌙'}
          </motion.button>
        </nav>
        <div className="md:hidden flex items-center space-x-2 relative">
          <motion.button
            onClick={toggleDarkMode}
            className="bg-white/20 px-2 py-1 rounded-full hover:bg-white/30 transition-colors text-sm"
            whileHover={{ scale: 1.1, boxShadow: "0 0 15px rgba(59, 130, 246, 0.5)" }}
            transition={{ duration: 0.2 }}
          >
            {isDarkMode ? '☀️' : '🌙'}
          </motion.button>
          <motion.button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="text-2xl"
            whileHover={{ scale: 1.1, boxShadow: "0 0 10px rgba(59, 130, 246, 0.5)" }}
            transition={{ duration: 0.2 }}
          >
            ☰
          </motion.button>
          {isMobileMenuOpen && (
            <motion.div
              className="absolute top-full left-0 right-0 bg-white/10 backdrop-blur-md border-t border-white/20 rounded-b-lg p-4 space-y-4 mt-2"
              variants={mobileMenuVariants}
              initial="hidden"
              animate="visible"
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              <motion.div variants={mobileItemVariants} whileHover={{ x: 5, boxShadow: "0 0 10px rgba(59, 130, 246, 0.3)" }} transition={{ duration: 0.2 }}>
                <Link to="/" className="block py-2 hover:text-cyanSoft transition-colors" onClick={() => setIsMobileMenuOpen(false)}>
                  Início
                </Link>
              </motion.div>
              <motion.div variants={mobileItemVariants} whileHover={{ x: 5, boxShadow: "0 0 10px rgba(59, 130, 246, 0.3)" }} transition={{ duration: 0.2 }}>
                <Link to="/home" className="block py-2 hover:text-cyanSoft transition-colors" onClick={() => setIsMobileMenuOpen(false)}>
                  Histórias
                </Link>
              </motion.div>
              <motion.div variants={mobileItemVariants} whileHover={{ x: 5, boxShadow: "0 0 10px rgba(59, 130, 246, 0.3)" }} transition={{ duration: 0.2 }}>
                <Link to="/login" className="block py-2 hover:text-cyanSoft transition-colors" onClick={() => setIsMobileMenuOpen(false)}>
                  Login
                </Link>
              </motion.div>
            </motion.div>
          )}
        </div>
      </div>
    </header>
  );
}

export default Header;
