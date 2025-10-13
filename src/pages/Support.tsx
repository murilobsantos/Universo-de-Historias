import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useDarkMode } from '../contexts/DarkModeContext';
import { Coffee, Crown, Star, Zap, Heart, Users, Award, Gift, CheckCircle, Lock, Sparkles, Rocket } from 'lucide-react';

interface FounderPackage {
  id: string;
  name: string;
  price: number;
  currency: string;
  benefits: string[];
  icon: React.ReactNode;
  color: string;
  bgColor: string;
  textColor: string;
  available: number;
  total: number;
  popular?: boolean;
  limited?: boolean;
}

function Support() {
  const { isDarkMode } = useDarkMode();
  const [selectedPackage, setSelectedPackage] = useState<string | null>(null);

  const founderPackages: FounderPackage[] = [
    {
      id: 'cafe-basico',
      name: 'Café Básico',
      price: 3,
      currency: 'USD',
      benefits: [
        'Acesso antecipado a capítulos de histórias selecionadas',
        'Agradecimento público no site',
        'Suporte ao desenvolvimento da plataforma'
      ],
      icon: <Coffee size="24" className="text-amber-600" />,
      color: 'border-amber-200 bg-amber-50 text-amber-800',
      bgColor: 'bg-amber-500',
      textColor: 'text-amber-600',
      available: -1, // Unlimited
      total: -1
    },
    {
      id: 'fundador-bronze',
      name: 'Fundador Bronze',
      price: 10,
      currency: 'USD',
      benefits: [
        'Todos os benefícios do Café Básico',
        'Badge exclusivo de fundador no perfil',
        'Acesso a grupos privados da comunidade',
        'Prioridade no suporte',
        'Acesso antecipado a novas histórias'
      ],
      icon: <Award size="24" className="text-amber-700" />,
      color: 'border-amber-300 bg-amber-100 text-amber-900',
      bgColor: 'bg-amber-600',
      textColor: 'text-amber-700',
      available: 50, // Limited
      total: 50,
      limited: true
    },
    {
      id: 'fundador-prata',
      name: 'Fundador Prata',
      price: 25,
      currency: 'USD',
      benefits: [
        'Todos os benefícios do Bronze',
        'Voto em histórias que entram em destaque',
        'Acesso antecipado a novos recursos (beta)',
        'Participação em decisões de comunidade',
        'Badge especial de prata no perfil'
      ],
      icon: <Star size="24" className="text-slate-600" />,
      color: 'border-slate-300 bg-slate-100 text-slate-900',
      bgColor: 'bg-slate-500',
      textColor: 'text-slate-600',
      available: 25,
      total: 100,
      limited: true,
      popular: true
    },
    {
      id: 'fundador-ouro',
      name: 'Fundador Ouro',
      price: 50,
      currency: 'USD',
      benefits: [
        'Todos os benefícios da Prata',
        'Nome na página de fundadores do site',
        'Participação em decisões de gamificação',
        'Recursos VIP iniciais',
        'Gift digital exclusivo (arte/wallpaper)',
        'Badge dourado premium no perfil'
      ],
      icon: <Crown size="24" className="text-yellow-600" />,
      color: 'border-yellow-300 bg-yellow-100 text-yellow-900',
      bgColor: 'bg-yellow-500',
      textColor: 'text-yellow-600',
      available: 10,
      total: 50,
      limited: true
    },
    {
      id: 'fundador-platinum',
      name: 'Fundador Platinum',
      price: 100,
      currency: 'USD',
      benefits: [
        'Todos os benefícios do Ouro',
        'Convite para webinar exclusivo de criação',
        'Acesso vitalício a VIP no lançamento',
        'Conteúdo exclusivo para download',
        'Badge platinum lendário',
        'Influência direta no roadmap',
        'Acesso a betas exclusivas'
      ],
      icon: <Sparkles size="24" className="text-purple-600" />,
      color: 'border-purple-300 bg-purple-100 text-purple-900',
      bgColor: 'bg-purple-500',
      textColor: 'text-purple-600',
      available: 3,
      total: 10,
      limited: true
    }
  ];

  const handleSupport = (packageId: string) => {
    // TODO: Implementar integração com sistema de pagamento (Stripe, PayPal, etc.)
    const pkg = founderPackages.find(p => p.id === packageId);
    alert(`Funcionalidade de pagamento será implementada em breve!\n\nPacote selecionado: ${pkg?.name}\nValor: $${pkg?.price}\n\nEntre em contato conosco para apoiar este pacote.`);
  };

  const handleApoiaSeRedirect = () => {
    // Link direto para a página do apoia.se (ajuda adicional)
    window.open('https://apoia.se/universodehistorias', '_blank');
  };

  return (
    <div className={`min-h-screen ${isDarkMode ? 'bg-gradient-to-b from-cosmic-dark via-cosmic-deep to-cosmic-dark text-white' : 'bg-backgroundLight text-black'}`}>
      {/* Header */}
      <div className="relative h-64 sm:h-80 bg-gradient-to-br from-primary via-secondary to-accent overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center text-white"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mb-4"
            >
              <Heart size={64} className="mx-auto text-pink-300" />
            </motion.div>
            <h1 className="text-4xl sm:text-5xl font-bold mb-4">Apoie o Universo de Historias</h1>
            <p className="text-xl text-gray-200 max-w-2xl mx-auto">
              Seja parte da nossa jornada cósmica! Seu apoio nos ajuda a criar a melhor plataforma de histórias interativas.
            </p>
          </motion.div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        {/* Introduction */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-center mb-12"
        >
          <h2 className="text-2xl sm:text-3xl font-bold mb-6">Por que Apoiar?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            <div className="bg-white/10 backdrop-blur-md rounded-lg p-6 border border-white/20">
              <Rocket size={32} className="mx-auto mb-4 text-primary" />
              <h3 className="font-semibold mb-2">Inovação Constante</h3>
              <p className="text-sm text-gray-300">Seu apoio nos permite investir em novas funcionalidades e melhorar a experiência.</p>
            </div>
            <div className="bg-white/10 backdrop-blur-md rounded-lg p-6 border border-white/20">
              <Users size={32} className="mx-auto mb-4 text-secondary" />
              <h3 className="font-semibold mb-2">Comunidade Exclusiva</h3>
              <p className="text-sm text-gray-300">Junte-se a uma comunidade de apaixonados por histórias e criatividade.</p>
            </div>
            <div className="bg-white/10 backdrop-blur-md rounded-lg p-6 border border-white/20">
              <Gift size={32} className="mx-auto mb-4 text-accent" />
              <h3 className="font-semibold mb-2">Benefícios Exclusivos</h3>
              <p className="text-sm text-gray-300">Acesse recursos especiais e seja reconhecido como um verdadeiro apoiador.</p>
            </div>
          </div>
        </motion.div>

        {/* Packages */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mb-12"
        >
          <h2 className="text-2xl sm:text-3xl font-bold text-center mb-8">Pacotes de Apoio</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {founderPackages.map((pkg, index) => (
              <motion.div
                key={pkg.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 * index }}
                className={`relative bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20 hover:border-white/40 transition-all duration-300 ${
                  pkg.popular ? 'ring-2 ring-secondary shadow-lg shadow-secondary/20' : ''
                } ${selectedPackage === pkg.id ? 'ring-2 ring-primary' : ''}`}
                onClick={() => setSelectedPackage(pkg.id)}
              >
                {pkg.popular && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <span className="bg-secondary text-white px-3 py-1 rounded-full text-xs font-semibold">
                      Mais Popular
                    </span>
                  </div>
                )}

                {pkg.limited && pkg.available !== -1 && (
                  <div className="absolute top-3 right-3">
                    <span className="bg-red-500/20 text-red-400 px-2 py-1 rounded-full text-xs font-semibold flex items-center gap-1">
                      <Lock size={12} />
                      {pkg.available}/{pkg.total}
                    </span>
                  </div>
                )}

                <div className="text-center mb-4">
                  <div className={`inline-flex items-center justify-center w-12 h-12 rounded-full ${pkg.color} mb-3`}>
                    {pkg.icon}
                  </div>
                  <h3 className="text-xl font-bold mb-2">{pkg.name}</h3>
                  <div className="text-3xl font-bold text-primary mb-1">
                    ${pkg.price}
                  </div>
                  <div className="text-sm text-gray-400">único</div>
                </div>

                <ul className="space-y-2 mb-6">
                  {pkg.benefits.map((benefit, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-sm">
                      <CheckCircle size={16} className="text-green-400 mt-0.5 flex-shrink-0" />
                      <span>{benefit}</span>
                    </li>
                  ))}
                </ul>

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleSupport(pkg.id);
                  }}
                  className={`w-full py-3 px-4 rounded-lg font-semibold transition-all duration-300 ${
                    pkg.available === 0
                      ? 'bg-gray-500 cursor-not-allowed text-gray-300'
                      : `bg-gradient-to-r ${pkg.bgColor} hover:opacity-90 text-white hover:shadow-lg`
                  }`}
                  disabled={pkg.available === 0}
                >
                  {pkg.available === 0 ? 'Esgotado' : `Apoiar com $${pkg.price}`}
                </button>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* FAQ */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mb-12"
        >
          <h2 className="text-2xl sm:text-3xl font-bold text-center mb-8">Perguntas Frequentes</h2>
          <div className="max-w-3xl mx-auto space-y-4">
            <div className="bg-white/10 backdrop-blur-md rounded-lg p-6 border border-white/20">
              <h3 className="font-semibold mb-2">Como funciona o sistema de fundadores?</h3>
              <p className="text-sm text-gray-300">Os pacotes Fundador são limitados e exclusivos para os primeiros apoiadores. Uma vez esgotados, não serão mais oferecidos.</p>
            </div>
            <div className="bg-white/10 backdrop-blur-md rounded-lg p-6 border border-white/20">
              <h3 className="font-semibold mb-2">Quando recebo meus benefícios?</h3>
              <p className="text-sm text-gray-300">Os benefícios são ativados imediatamente após a confirmação do pagamento. Badges e acessos são aplicados automaticamente.</p>
            </div>
            <div className="bg-white/10 backdrop-blur-md rounded-lg p-6 border border-white/20">
              <h3 className="font-semibold mb-2">Posso cancelar ou reembolsar?</h3>
              <p className="text-sm text-gray-300">Como são doações únicas, não oferecemos reembolso. Mas seu apoio é vital para o crescimento da plataforma!</p>
            </div>
          </div>
        </motion.div>

        {/* Additional Support Options */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mb-12"
        >
          <h2 className="text-2xl sm:text-3xl font-bold text-center mb-8">Outras Formas de Apoiar</h2>
          <div className="max-w-2xl mx-auto">
            <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20">
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full mb-4">
                  <Heart size={32} className="text-white" />
                </div>
                <h3 className="text-xl font-bold mb-2">Doação Pontual</h3>
                <p className="text-gray-300 mb-4">
                  Faça uma doação única através do nosso apoia.se. Toda contribuição ajuda no desenvolvimento da plataforma!
                </p>
                <motion.button
                  onClick={handleApoiaSeRedirect}
                  className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold rounded-lg transition-all duration-300 hover:shadow-lg"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Heart size={20} className="mr-2" />
                  Apoiar no apoia.se
                </motion.button>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="text-center"
        >
          <div className="bg-gradient-to-r from-primary/20 to-secondary/20 backdrop-blur-md rounded-2xl p-8 border border-white/20">
            <h2 className="text-2xl font-bold mb-4">Obrigado pelo Interesse!</h2>
            <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
              Cada contribuição, por menor que seja, nos ajuda a criar uma experiência incrível para todos os amantes de histórias.
              Você será parte fundamental da nossa comunidade cósmica!
            </p>
            <div className="text-sm text-gray-400">
              💝 Junte-se a {Math.floor(Math.random() * 50) + 20} apoiadores incríveis
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default Support;
