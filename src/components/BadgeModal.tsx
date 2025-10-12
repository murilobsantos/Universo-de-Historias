import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Crown, BookOpen, Users, Star, Award, Zap, Trophy, Target, Heart } from 'lucide-react';

interface Badge {
  id: string;
  name: string;
  description: string;
  icon: React.ReactNode;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
  unlocked: boolean;
  progress?: number;
  maxProgress?: number;
}

interface BadgeModalProps {
  isOpen: boolean;
  onClose: () => void;
  badges: Badge[];
  authorName: string;
}

const BadgeModal: React.FC<BadgeModalProps> = ({ isOpen, onClose, badges, authorName }) => {
  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case 'common': return 'from-gray-400 to-gray-600';
      case 'rare': return 'from-blue-400 to-blue-600';
      case 'epic': return 'from-purple-400 to-purple-600';
      case 'legendary': return 'from-yellow-400 to-yellow-600';
      default: return 'from-gray-400 to-gray-600';
    }
  };

  const getRarityTextColor = (rarity: string) => {
    switch (rarity) {
      case 'common': return 'text-gray-400';
      case 'rare': return 'text-blue-400';
      case 'epic': return 'text-purple-400';
      case 'legendary': return 'text-yellow-400';
      default: return 'text-gray-400';
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="bg-gradient-to-br from-cosmic-dark via-cosmic-deep to-cosmic-dark rounded-2xl p-6 max-w-4xl w-full max-h-[80vh] overflow-y-auto border border-white/20"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-2xl font-bold text-white mb-2">🏆 Conquistas de {authorName}</h2>
                <p className="text-gray-300">Explore todas as conquistas e badges desbloqueadas</p>
              </div>
              <button
                onClick={onClose}
                className="text-gray-400 hover:text-white transition-colors"
              >
                <X size={24} />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {badges.map((badge, index) => (
                <motion.div
                  key={badge.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className={`relative p-4 rounded-xl border transition-all duration-300 ${
                    badge.unlocked
                      ? `bg-gradient-to-br ${getRarityColor(badge.rarity)} shadow-lg hover:shadow-xl`
                      : 'bg-gray-800/50 border-gray-600 hover:border-gray-500'
                  }`}
                >
                  {badge.unlocked && (
                    <div className="absolute -top-2 -right-2 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                      <Award size={12} className="text-white" />
                    </div>
                  )}

                  <div className="flex items-center space-x-3 mb-3">
                    <div className={`p-2 rounded-lg ${badge.unlocked ? 'bg-white/20' : 'bg-gray-700'}`}>
                      {badge.icon}
                    </div>
                    <div className="flex-1">
                      <h3 className={`font-semibold ${badge.unlocked ? 'text-white' : 'text-gray-400'}`}>
                        {badge.name}
                      </h3>
                      <span className={`text-xs uppercase tracking-wide ${getRarityTextColor(badge.rarity)}`}>
                        {badge.rarity}
                      </span>
                    </div>
                  </div>

                  <p className={`text-sm mb-3 ${badge.unlocked ? 'text-gray-200' : 'text-gray-500'}`}>
                    {badge.description}
                  </p>

                  {!badge.unlocked && badge.progress !== undefined && badge.maxProgress && (
                    <div className="space-y-2">
                      <div className="flex justify-between text-xs text-gray-400">
                        <span>Progresso</span>
                        <span>{badge.progress}/{badge.maxProgress}</span>
                      </div>
                      <div className="w-full bg-gray-700 rounded-full h-2">
                        <div
                          className="bg-gradient-to-r from-primary to-secondary h-2 rounded-full transition-all duration-500"
                          style={{ width: `${(badge.progress / badge.maxProgress) * 100}%` }}
                        ></div>
                      </div>
                    </div>
                  )}

                  {badge.unlocked && (
                    <div className="flex items-center text-xs text-green-400 mt-2">
                      <Trophy size={12} className="mr-1" />
                      Conquistado!
                    </div>
                  )}
                </motion.div>
              ))}
            </div>

            <div className="mt-6 p-4 bg-white/5 rounded-lg">
              <h3 className="text-lg font-semibold text-white mb-2">💎 Badges Exclusivas para Membros Fundadores</h3>
              <p className="text-gray-300 text-sm mb-3">
                Os primeiros usuários que se registraram recebem badges especiais que nunca mais serão concedidas.
              </p>
              <div className="flex flex-wrap gap-2">
                <span className="bg-gradient-to-r from-yellow-400 to-orange-500 text-black px-3 py-1 rounded-full text-xs font-semibold">
                  🏆 Pioneiro Cósmico
                </span>
                <span className="bg-gradient-to-r from-purple-400 to-pink-500 text-white px-3 py-1 rounded-full text-xs font-semibold">
                  🌟 Construtor de Mundos
                </span>
                <span className="bg-gradient-to-r from-blue-400 to-cyan-500 text-white px-3 py-1 rounded-full text-xs font-semibold">
                  🚀 Viajante Original
                </span>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default BadgeModal;
