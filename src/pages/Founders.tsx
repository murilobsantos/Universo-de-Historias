import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Heart, Crown, Star, Award, Sparkles, Users, Trophy, Coffee } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';

interface Founder {
  id: string;
  name: string;
  supportLevel: number;
  isPatron: boolean;
  joinedDate: string;
  totalDonated: number;
  avatar?: string;
}

const Founders: React.FC = () => {
  const { theme } = useTheme();
  const [founders, setFounders] = useState<Founder[]>([]);
  const [loading, setLoading] = useState(true);

  // Mock data - será substituído por dados reais da API
  useEffect(() => {
    const mockFounders: Founder[] = [
      {
        id: '1',
        name: 'João Silva',
        supportLevel: 5,
        isPatron: true,
        joinedDate: '2024-01-15',
        totalDonated: 500,
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=João'
      },
      {
        id: '2',
        name: 'Maria Santos',
        supportLevel: 4,
        isPatron: true,
        joinedDate: '2024-01-20',
        totalDonated: 250,
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Maria'
      },
      {
        id: '3',
        name: 'Pedro Oliveira',
        supportLevel: 4,
        isPatron: false,
        joinedDate: '2024-02-01',
        totalDonated: 50,
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Pedro'
      },
      {
        id: '4',
        name: 'Ana Costa',
        supportLevel: 3,
        isPatron: true,
        joinedDate: '2024-02-10',
        totalDonated: 75,
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Ana'
      },
      {
        id: '5',
        name: 'Carlos Ferreira',
        supportLevel: 3,
        isPatron: false,
        joinedDate: '2024-02-15',
        totalDonated: 25,
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Carlos'
      },
      {
        id: '6',
        name: 'Beatriz Lima',
        supportLevel: 2,
        isPatron: true,
        joinedDate: '2024-03-01',
        totalDonated: 30,
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Beatriz'
      },
      {
        id: '7',
        name: 'Rafael Souza',
        supportLevel: 2,
        isPatron: false,
        joinedDate: '2024-03-05',
        totalDonated: 10,
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Rafael'
      },
      {
        id: '8',
        name: 'Camila Rodrigues',
        supportLevel: 1,
        isPatron: false,
        joinedDate: '2024-03-10',
        totalDonated: 3,
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Camila'
      }
    ];

    setTimeout(() => {
      setFounders(mockFounders);
      setLoading(false);
    }, 1000);
  }, []);

  const getSupportLevelInfo = (level: number) => {
    const levels = {
      1: { name: 'Apoiador', icon: Heart, color: 'text-red-500', bgColor: 'bg-red-50 dark:bg-red-900/20' },
      2: { name: 'Fundador Bronze', icon: Award, color: 'text-amber-600', bgColor: 'bg-amber-50 dark:bg-amber-900/20' },
      3: { name: 'Fundador Prata', icon: Star, color: 'text-slate-400', bgColor: 'bg-slate-50 dark:bg-slate-900/20' },
      4: { name: 'Fundador Ouro', icon: Crown, color: 'text-yellow-500', bgColor: 'bg-yellow-50 dark:bg-yellow-900/20' },
      5: { name: 'Fundador Platinum', icon: Sparkles, color: 'text-purple-500', bgColor: 'bg-purple-50 dark:bg-purple-900/20' }
    };
    return levels[level as keyof typeof levels] || levels[1];
  };

  const getTotalStats = () => {
    const totalFounders = founders.length;
    const totalDonated = founders.reduce((sum, founder) => sum + founder.totalDonated, 0);
    const patrons = founders.filter(f => f.isPatron).length;
    return { totalFounders, totalDonated, patrons };
  };

  const stats = getTotalStats();

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-50 dark:from-gray-900 dark:via-purple-900 dark:to-indigo-900">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto"></div>
            <p className="mt-4 text-gray-600 dark:text-gray-400">Carregando fundadores...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-50 dark:from-gray-900 dark:via-purple-900 dark:to-indigo-900">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="flex items-center justify-center mb-4">
            <Trophy className="w-12 h-12 text-yellow-500 mr-3" />
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white">
              Nossos Fundadores
            </h1>
          </div>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Conheça os heróis que tornam o Universo de Historias possível.
            Cada apoiador contribui para manter nossa comunidade crescendo e inovando.
          </p>
        </motion.div>

        {/* Stats Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12"
        >
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 text-center">
            <Users className="w-8 h-8 text-blue-500 mx-auto mb-2" />
            <div className="text-3xl font-bold text-gray-900 dark:text-white">{stats.totalFounders}</div>
            <div className="text-gray-600 dark:text-gray-400">Fundadores</div>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 text-center">
            <Heart className="w-8 h-8 text-red-500 mx-auto mb-2" />
            <div className="text-3xl font-bold text-gray-900 dark:text-white">${stats.totalDonated}</div>
            <div className="text-gray-600 dark:text-gray-400">Total Doado</div>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 text-center">
            <Coffee className="w-8 h-8 text-purple-500 mx-auto mb-2" />
            <div className="text-3xl font-bold text-gray-900 dark:text-white">{stats.patrons}</div>
            <div className="text-gray-600 dark:text-gray-400">Patronos</div>
          </div>
        </motion.div>

        {/* Founders Grid */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
        >
          {founders.map((founder, index) => {
            const levelInfo = getSupportLevelInfo(founder.supportLevel);
            const IconComponent = levelInfo.icon;

            return (
              <motion.div
                key={founder.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.1 * index }}
                className={`bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 hover:shadow-xl transition-all duration-300 ${levelInfo.bgColor}`}
              >
                <div className="text-center">
                  {/* Avatar */}
                  <div className="relative mb-4">
                    <img
                      src={founder.avatar}
                      alt={founder.name}
                      className="w-20 h-20 rounded-full mx-auto border-4 border-white dark:border-gray-700 shadow-lg"
                    />
                    {founder.isPatron && (
                      <div className="absolute -top-2 -right-2 bg-purple-500 text-white rounded-full p-1">
                        <Coffee className="w-4 h-4" />
                      </div>
                    )}
                  </div>

                  {/* Name */}
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                    {founder.name}
                  </h3>

                  {/* Support Level Badge */}
                  <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${levelInfo.color} ${levelInfo.bgColor} border`}>
                    <IconComponent className="w-4 h-4 mr-1" />
                    {levelInfo.name}
                  </div>

                  {/* Stats */}
                  <div className="mt-4 space-y-2 text-sm text-gray-600 dark:text-gray-400">
                    <div className="flex justify-between">
                      <span>Total doado:</span>
                      <span className="font-semibold text-green-600 dark:text-green-400">${founder.totalDonated}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Membro desde:</span>
                      <span>{new Date(founder.joinedDate).toLocaleDateString('pt-BR')}</span>
                    </div>
                    {founder.isPatron && (
                      <div className="text-center">
                        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200">
                          <Coffee className="w-3 h-3 mr-1" />
                          Patrono
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="text-center mt-12"
        >
          <div className="bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl p-8 text-white">
            <Heart className="w-12 h-12 mx-auto mb-4" />
            <h2 className="text-2xl font-bold mb-4">Junte-se aos nossos fundadores!</h2>
            <p className="text-purple-100 mb-6 max-w-2xl mx-auto">
              Sua contribuição ajuda a manter o Universo de Historias vivo e crescendo.
              Seja reconhecido como um dos pilares da nossa comunidade.
            </p>
            <a
              href="/support"
              className="inline-flex items-center px-6 py-3 bg-white text-purple-600 font-semibold rounded-lg hover:bg-gray-50 transition-colors duration-200"
            >
              <Heart className="w-5 h-5 mr-2" />
              Apoiar o Projeto
            </a>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Founders;
