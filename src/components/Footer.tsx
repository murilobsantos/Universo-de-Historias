import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useDarkMode } from '../contexts/DarkModeContext';

const Footer: React.FC = () => {
  const { isDarkMode } = useDarkMode();

  return (
    <footer className={`w-full py-8 ${isDarkMode ? 'bg-gray-900 border-t border-gray-700' : 'bg-gray-100 border-t border-gray-300'} text-center`}>
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap justify-center items-center space-x-6 space-y-4 mb-4">
          <motion.div whileHover={{ scale: 1.05 }} transition={{ duration: 0.2 }}>
            <Link to="/about" className={`hover:text-cyan-500 transition-colors ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              Sobre
            </Link>
          </motion.div>
          <motion.div whileHover={{ scale: 1.05 }} transition={{ duration: 0.2 }}>
            <Link to="/support" className={`hover:text-cyan-500 transition-colors ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              Apoiar
            </Link>
          </motion.div>
          <motion.div whileHover={{ scale: 1.05 }} transition={{ duration: 0.2 }}>
            <Link to="/founders" className={`hover:text-cyan-500 transition-colors ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              Fundadores
            </Link>
          </motion.div>
          <motion.div whileHover={{ scale: 1.05 }} transition={{ duration: 0.2 }}>
            <Link to="/terms" className={`hover:text-cyan-500 transition-colors ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              Termos e Privacidade
            </Link>
          </motion.div>
          <motion.div whileHover={{ scale: 1.05 }} transition={{ duration: 0.2 }}>
            <Link to="/contact" className={`hover:text-cyan-500 transition-colors ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              Contato
            </Link>
          </motion.div>
        </div>
        <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
          © 2025 Galáxia de Histórias. Todos os direitos reservados.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
