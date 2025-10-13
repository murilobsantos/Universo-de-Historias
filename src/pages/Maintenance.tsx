import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useDarkMode } from "../contexts/DarkModeContext";

function Maintenance() {
  const { isDarkMode } = useDarkMode();
  const [timeLeft, setTimeLeft] = useState(3600); // 1 hour in seconds

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const maintenanceTasks = [
    "🚀 Implementando novas funcionalidades",
    "🔧 Otimizando performance do sistema",
    "🎨 Melhorando a experiência do usuário",
    "📱 Aprimorando versão mobile",
    "🔒 Fortalecendo segurança dos dados",
    "⚡ Atualizando tecnologias e dependências"
  ];

  return (
    <div className={`min-h-screen flex items-center justify-center px-4 ${
      isDarkMode
        ? 'bg-gradient-to-br from-cosmic-dark via-cosmic-deep to-cosmic-purple'
        : 'bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50'
    }`}>
      <div className="max-w-2xl mx-auto text-center">
        {/* Animated Logo/Icon */}
        <motion.div
          className="mb-8"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.6, type: "spring", bounce: 0.4 }}
        >
          <div className="relative">
            <motion.div
              className="w-24 h-24 mx-auto rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center"
              animate={{
                rotate: 360,
                scale: [1, 1.1, 1]
              }}
              transition={{
                rotate: { duration: 20, repeat: Infinity, ease: "linear" },
                scale: { duration: 2, repeat: Infinity, ease: "easeInOut" }
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 64 64"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="w-12 h-12 text-white"
              >
                <circle cx="32" cy="32" r="8" />
                <circle cx="16" cy="16" r="4" />
                <circle cx="48" cy="16" r="4" />
                <circle cx="16" cy="48" r="4" />
                <circle cx="48" cy="48" r="4" />
                <line x1="32" y1="8" x2="32" y2="16" />
                <line x1="32" y1="48" x2="32" y2="56" />
                <line x1="8" y1="32" x2="16" y2="32" />
                <line x1="48" y1="32" x2="56" y2="32" />
              </svg>
            </motion.div>

            {/* Floating particles */}
            <motion.div
              className="absolute top-0 left-0 w-2 h-2 bg-cyan-400 rounded-full"
              animate={{
                y: [-10, 10, -10],
                opacity: [0.5, 1, 0.5]
              }}
              transition={{ duration: 3, repeat: Infinity }}
            />
            <motion.div
              className="absolute top-0 right-0 w-1.5 h-1.5 bg-purple-400 rounded-full"
              animate={{
                y: [-8, 8, -8],
                opacity: [0.7, 1, 0.7]
              }}
              transition={{ duration: 2.5, repeat: Infinity, delay: 0.5 }}
            />
            <motion.div
              className="absolute bottom-0 left-1/4 w-1 h-1 bg-pink-400 rounded-full"
              animate={{
                y: [-6, 6, -6],
                opacity: [0.6, 1, 0.6]
              }}
              transition={{ duration: 2, repeat: Infinity, delay: 1 }}
            />
          </div>
        </motion.div>

        {/* Title */}
        <motion.h1
          className={`text-4xl md:text-6xl font-bold mb-4 ${
            isDarkMode ? 'text-white' : 'text-gray-900'
          }`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          Em Manutenção
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          className={`text-xl md:text-2xl mb-8 ${
            isDarkMode ? 'text-gray-300' : 'text-gray-600'
          }`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          Estamos trabalhando para melhorar sua experiência
        </motion.p>

        {/* Countdown Timer */}
        <motion.div
          className={`inline-block px-8 py-4 rounded-2xl mb-8 ${
            isDarkMode
              ? 'bg-white/10 backdrop-blur-sm border border-white/20'
              : 'bg-white/80 backdrop-blur-sm border border-gray-200 shadow-lg'
          }`}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <div className={`text-2xl font-mono font-bold ${
            isDarkMode ? 'text-white' : 'text-gray-900'
          }`}>
            {formatTime(timeLeft)}
          </div>
          <div className={`text-sm ${
            isDarkMode ? 'text-gray-400' : 'text-gray-600'
          }`}>
            Tempo estimado
          </div>
        </motion.div>

        {/* Progress Bar */}
        <motion.div
          className="w-full max-w-md mx-auto mb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <div className={`w-full h-2 rounded-full ${
            isDarkMode ? 'bg-white/20' : 'bg-gray-200'
          } overflow-hidden`}>
            <motion.div
              className="h-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"
              initial={{ width: "0%" }}
              animate={{ width: "75%" }}
              transition={{ duration: 2, delay: 1, ease: "easeInOut" }}
            />
          </div>
          <div className={`text-sm mt-2 ${
            isDarkMode ? 'text-gray-400' : 'text-gray-600'
          }`}>
            Progresso: 75% concluído
          </div>
        </motion.div>

        {/* Maintenance Tasks */}
        <motion.div
          className="text-left max-w-lg mx-auto mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1 }}
        >
          <h3 className={`text-lg font-semibold mb-4 ${
            isDarkMode ? 'text-white' : 'text-gray-900'
          }`}>
            O que estamos fazendo:
          </h3>
          <ul className="space-y-2">
            {maintenanceTasks.map((task, index) => (
              <motion.li
                key={index}
                className={`flex items-center space-x-3 ${
                  isDarkMode ? 'text-gray-300' : 'text-gray-700'
                }`}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: 1.2 + index * 0.1 }}
              >
                <motion.div
                  className="w-2 h-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Infinity, delay: index * 0.2 }}
                />
                <span>{task}</span>
              </motion.li>
            ))}
          </ul>
        </motion.div>

        {/* Contact Info */}
        <motion.div
          className={`p-6 rounded-2xl ${
            isDarkMode
              ? 'bg-white/5 backdrop-blur-sm border border-white/10'
              : 'bg-white/60 backdrop-blur-sm border border-gray-200'
          }`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.8 }}
        >
          <h3 className={`text-lg font-semibold mb-2 ${
            isDarkMode ? 'text-white' : 'text-gray-900'
          }`}>
            Precisa de ajuda?
          </h3>
          <p className={`text-sm mb-4 ${
            isDarkMode ? 'text-gray-300' : 'text-gray-600'
          }`}>
            Entre em contato conosco se tiver alguma urgência.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a
              href="mailto:suporte@universodehistorias.com"
              className="px-4 py-2 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-lg font-medium hover:shadow-lg transition-all duration-300"
            >
              📧 Email de Suporte
            </a>
            <a
              href="https://discord.gg/universodehistorias"
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-lg font-medium hover:shadow-lg transition-all duration-300"
            >
              💬 Discord Community
            </a>
          </div>
        </motion.div>

        {/* Footer */}
        <motion.div
          className={`mt-8 text-sm ${
            isDarkMode ? 'text-gray-400' : 'text-gray-500'
          }`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 2 }}
        >
          <p>© 2024 Universo de Histórias. Todos os direitos reservados.</p>
        </motion.div>
      </div>
    </div>
  );
}

export default Maintenance;
