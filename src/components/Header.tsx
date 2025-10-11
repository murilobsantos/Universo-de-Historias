import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from "react-router-dom";
import { useDarkMode } from "../contexts/DarkModeContext";
import useAuthors from "../hooks/useAuthors";
import { useReaders } from "../hooks/useReaders";
import { Search } from 'lucide-react';

function Header() {
  const { isDarkMode, toggleDarkMode } = useDarkMode();
  const { currentAuthor, logout: authorLogout } = useAuthors();
  const { currentReader, logout: readerLogout } = useReaders();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

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

  const menuRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMobileMenuOpen(false);
      }
    };

    if (isMobileMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isMobileMenuOpen]);

  const handleLogout = () => {
    if (currentAuthor) {
      authorLogout();
    } else if (currentReader) {
      readerLogout();
    }
    setIsMobileMenuOpen(false);
    navigate('/');
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
          <form
            onSubmit={(e) => {
              e.preventDefault();
              if (searchQuery.trim()) {
                navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
                setSearchQuery('');
              }
            }}
            className="flex items-center space-x-2"
          >
            <input
              type="text"
              placeholder="Buscar histórias..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="px-3 py-1 rounded bg-white/20 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-cyanSoft"
            />
            <button className="p-1 hover:text-cyanSoft transition-colors">
              <Search size={20} />
            </button>
          </form>
          <button
            onClick={toggleDarkMode}
            className={`p-2 rounded-full ${isDarkMode ? 'bg-white/20 hover:bg-white/30' : 'bg-gray-200 hover:bg-gray-300'} transition-colors`}
            title={isDarkMode ? "Modo Claro" : "Modo Escuro"}
          >
            {isDarkMode ? (
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
            ) : (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
              </svg>
            )}
          </button>
          {isLoggedIn ? (
            <>
                  <motion.div whileHover={{ scale: 1.05, boxShadow: "0 0 10px rgba(59, 130, 246, 0.3)" }} transition={{ duration: 0.2 }}>
                    <Link to={profilePath} className="text-lg hover:text-cyanSoft transition-colors">Meu Perfil</Link>
                  </motion.div>
                  <motion.div whileHover={{ scale: 1.05, boxShadow: "0 0 10px rgba(59, 130, 246, 0.3)" }} transition={{ duration: 0.2 }}>
                    <Link to="/favorites" className="text-lg hover:text-cyanSoft transition-colors">Favoritos</Link>
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
              ref={menuRef}
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
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    if (searchQuery.trim()) {
                      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
                      setSearchQuery('');
                      setIsMobileMenuOpen(false);
                    }
                  }}
                  className="py-2"
                >
                  <input
                    type="text"
                    placeholder="Buscar histórias..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full px-3 py-2 rounded bg-white/20 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-cyanSoft"
                  />
                </form>
              </motion.div>
              {isLoggedIn ? (
                <>
                  <motion.div variants={mobileItemVariants} whileHover={{ x: 5, boxShadow: "0 0 10px rgba(59, 130, 246, 0.3)" }} transition={{ duration: 0.2 }}>
                    <Link to={profilePath} className="block py-2 hover:text-cyanSoft transition-colors" onClick={() => setIsMobileMenuOpen(false)}>
                      Meu Perfil
                    </Link>
                  </motion.div>
                  <motion.div variants={mobileItemVariants} whileHover={{ x: 5, boxShadow: "0 0 10px rgba(59, 130, 246, 0.3)" }} transition={{ duration: 0.2 }}>
                    <Link to="/favorites" className="block py-2 hover:text-cyanSoft transition-colors" onClick={() => setIsMobileMenuOpen(false)}>
                      Favoritos
                    </Link>
                  </motion.div>
                  <motion.div variants={mobileItemVariants} whileHover={{ x: 5, boxShadow: "0 0 10px rgba(59, 130, 246, 0.3)" }} transition={{ duration: 0.2 }}>
                    <button
                      onClick={() => {
                        toggleDarkMode();
                        setIsMobileMenuOpen(false);
                      }}
                      className="block py-2 w-full text-left hover:text-cyanSoft transition-colors"
                    >
                      {isDarkMode ? "Modo Claro" : "Modo Escuro"}
                    </button>
                  </motion.div>
                  <motion.div variants={mobileItemVariants} whileHover={{ x: 5, boxShadow: "0 0 10px rgba(239, 68, 68, 0.5)" }} transition={{ duration: 0.2 }}>
                    <button onClick={handleLogout} className="block py-2 text-left hover:text-red-400 transition-colors w-full">
                      Logout
                    </button>
                  </motion.div>
                </>
              ) : (
                <motion.div variants={mobileItemVariants} whileHover={{ x: 5, boxShadow: "0 0 10px rgba(59, 130, 246, 0.3)" }} transition={{ duration: 0.2 }}>
                  <Link to="/login" className="block py-2 hover:text-cyanSoft transition-colors" onClick={() => setIsMobileMenuOpen(false)}>
                    Login
                  </Link>
                </motion.div>
              )}
            </motion.div>
          )}
        </div>
      </div>
    </header>
  );
}

export default Header;
