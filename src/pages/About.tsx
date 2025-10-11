import React from 'react';
import { motion } from 'framer-motion';

const About: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-cosmic-purple via-cosmic-electric to-cosmic-soft dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 text-white">
      <div className="container mx-auto px-4 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto text-center"
        >
          <h1 className="text-4xl md:text-6xl font-bold mb-8 text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400">
            Sobre o Universo de Histórias
          </h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg md:text-xl mb-8 leading-relaxed"
          >
            Bem-vindo ao Universo de Histórias, um espaço dedicado à imaginação e à criatividade. Aqui, autores e leitores se encontram para compartilhar e descobrir narrativas fascinantes que exploram mundos infinitos, desde aventuras épicas em galáxias distantes até histórias íntimas de amor e redenção.
          </motion.p>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-lg md:text-xl mb-8 leading-relaxed"
          >
            Nossa missão é promover a leitura e a escrita, conectando pessoas através de histórias que inspiram, emocionam e provocam reflexão. Seja você um autor aspirante ou um leitor ávido, este é o lugar onde suas histórias ganham vida.
          </motion.p>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="text-lg md:text-xl leading-relaxed"
          >
            Explore, crie e compartilhe. O universo das histórias é vasto e espera por você.
          </motion.p>
        </motion.div>
      </div>
    </div>
  );
};

export default About;
