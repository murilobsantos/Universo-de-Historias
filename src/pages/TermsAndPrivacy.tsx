import React from 'react';
import { motion } from 'framer-motion';

const TermsAndPrivacy: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-cosmic-purple via-cosmic-electric to-cosmic-soft dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 text-white">
      <div className="container mx-auto px-4 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto"
        >
          <h1 className="text-4xl md:text-6xl font-bold mb-8 text-center text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400">
            Termos de Uso e Política de Privacidade
          </h1>

          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mb-12"
          >
            <h2 className="text-2xl md:text-3xl font-semibold mb-4">Termos de Uso</h2>
            <p className="text-lg mb-4 leading-relaxed">
              Ao acessar e usar o Universo de Histórias, você concorda com estes termos de uso. Este site é dedicado à compartilhamento de histórias criadas por usuários. Você é responsável pelo conteúdo que publica e deve respeitar os direitos autorais e as leis aplicáveis.
            </p>
            <p className="text-lg mb-4 leading-relaxed">
              Não é permitido publicar conteúdo ofensivo, ilegal ou que viole os direitos de terceiros. Reservamo-nos o direito de remover qualquer conteúdo que considere inadequado e suspender contas que violem estas regras.
            </p>
            <p className="text-lg leading-relaxed">
              O uso do site é gratuito, mas podemos alterar estes termos a qualquer momento. Recomendamos revisar periodicamente.
            </p>
          </motion.section>

          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mb-12"
          >
            <h2 className="text-2xl md:text-3xl font-semibold mb-4">Política de Privacidade</h2>
            <p className="text-lg mb-4 leading-relaxed">
              Respeitamos sua privacidade. Coletamos informações pessoais apenas quando você se registra ou interage conosco, como nome, e-mail e preferências de leitura. Usamos essas informações para melhorar sua experiência e enviar comunicações relevantes.
            </p>
            <p className="text-lg mb-4 leading-relaxed">
              Não compartilhamos suas informações pessoais com terceiros sem seu consentimento, exceto quando exigido por lei. Utilizamos cookies para melhorar a navegação e analisar o uso do site.
            </p>
            <p className="text-lg leading-relaxed">
              Você pode solicitar a exclusão de seus dados a qualquer momento. Para mais detalhes, entre em contato conosco.
            </p>
          </motion.section>

          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <h2 className="text-2xl md:text-3xl font-semibold mb-4">Contato</h2>
            <p className="text-lg leading-relaxed">
              Se você tiver dúvidas sobre estes termos ou nossa política de privacidade, entre em contato através do e-mail: contato@universodehistorias.com
            </p>
          </motion.section>
        </motion.div>
      </div>
    </div>
  );
};

export default TermsAndPrivacy;
