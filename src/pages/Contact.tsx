import React from 'react';
import { motion } from 'framer-motion';

const Contact: React.FC = () => {
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
            Contato
          </h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg md:text-xl mb-8 leading-relaxed"
          >
            Tem dúvidas, sugestões ou quer entrar em contato conosco? Estamos aqui para ajudar!
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="space-y-4 text-lg"
          >
            <p className="leading-relaxed">E-mail: contato@universodehistorias.com</p>
            <p className="leading-relaxed">Redes Sociais: Siga-nos no Twitter e Instagram @universodehistorias</p>
            <p className="leading-relaxed">Suporte: Para problemas técnicos, use o formulário abaixo.</p>
          </motion.div>
          <motion.form
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="max-w-md mx-auto mt-8 space-y-4"
          >
            <input
              type="text"
              placeholder="Seu Nome"
              className="w-full px-4 py-2 rounded bg-white/20 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-cyanSoft"
            />
            <input
              type="email"
              placeholder="Seu E-mail"
              className="w-full px-4 py-2 rounded bg-white/20 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-cyanSoft"
            />
            <textarea
              placeholder="Sua Mensagem"
              rows={4}
              className="w-full px-4 py-2 rounded bg-white/20 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-cyanSoft"
            ></textarea>
            <button
              type="submit"
              className="w-full bg-cyan-500 hover:bg-cyan-600 text-white font-bold py-2 px-4 rounded transition-colors"
            >
              Enviar Mensagem
            </button>
          </motion.form>
        </motion.div>
      </div>
    </div>
  );
};

export default Contact;
