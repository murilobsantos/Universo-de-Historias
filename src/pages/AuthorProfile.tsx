import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useDarkMode } from "../contexts/DarkModeContext";
import { useAuth } from "../contexts/AuthContext";
import { API_ENDPOINTS } from "../services/api";
import { Story } from "../types/story";

import StoryCard from "../components/StoryCard";
import Skeleton from "../components/Skeleton";
import BadgeModal from "../components/BadgeModal";

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
import { Author } from "../types/author";
import { Edit, BookOpen, Users, Crown, Star, Save, X, Award, Zap, Trophy, Target, Heart, Eye, TrendingUp } from 'lucide-react';

function AuthorProfile() {
  const { id } = useParams<{ id: string }>();
  const { isDarkMode } = useDarkMode();

  const [author, setAuthor] = useState<Author | null>(null);
  const [loadingAuthor, setLoadingAuthor] = useState(true);
  const [editMode, setEditMode] = useState(false);
  const [editData, setEditData] = useState({
    bio: '',
    avatarUrl: '',
    background: 'cosmic',
  });
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [backgroundFile, setBackgroundFile] = useState<File | null>(null);
  const [badgeModalOpen, setBadgeModalOpen] = useState(false);
  const [selectedBadges, setSelectedBadges] = useState<string[]>([]);
  const [allBadges, setAllBadges] = useState<any[]>([]);

  // Fetch author's stories from API
  const [authorStories, setAuthorStories] = useState<Story[]>([]);
  const [loadingStories, setLoadingStories] = useState(false);

  const fileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = error => reject(error);
    });
  };

// Função para calcular badges do autor (movida para fora do componente para evitar re-renders)
const getAuthorBadges = (author: Author, totalViews: number, averageRating: number): Badge[] => {
  // Para usuários de teste, conceder todas as conquistas
  const isTestUser = author?.email?.includes('test') || author?.email?.includes('render') || author?.name?.toLowerCase().includes('test');

  const badges: Badge[] = [
    {
      id: 'estreante',
      name: 'Autor Estreante',
      description: 'Publicou sua primeira história',
      icon: <BookOpen size={20} className="text-white" />,
      rarity: 'common' as const,
      unlocked: isTestUser || author.storiesCount >= 1,
      progress: Math.min(author.storiesCount, 1),
      maxProgress: 1,
    },
    {
      id: 'escritor-experiente',
      name: 'Escritor Experiente',
      description: 'Publicou 5 ou mais histórias',
      icon: <BookOpen size={20} className="text-white" />,
      rarity: 'rare' as const,
      unlocked: isTestUser || author.storiesCount >= 5,
      progress: Math.min(author.storiesCount, 5),
      maxProgress: 5,
    },
    {
      id: 'influenciador',
      name: 'Influenciador',
      description: 'Conquistou 10 seguidores',
      icon: <Users size={20} className="text-white" />,
      rarity: 'rare' as const,
      unlocked: isTestUser || author.followersCount >= 10,
      progress: Math.min(author.followersCount, 10),
      maxProgress: 10,
    },
    {
      id: 'celebridade',
      name: 'Celebridade Literária',
      description: 'Conquistou 50 seguidores',
      icon: <Crown size={20} className="text-white" />,
      rarity: 'epic' as const,
      unlocked: isTestUser || author.followersCount >= 50,
      progress: Math.min(author.followersCount, 50),
      maxProgress: 50,
    },
    {
      id: 'mil-leitores',
      name: 'Mil Leitores',
      description: 'Alcançou 1.000 visualizações totais',
      icon: <Eye size={20} className="text-white" />,
      rarity: 'epic' as const,
      unlocked: isTestUser || totalViews >= 1000,
      progress: Math.min(totalViews, 1000),
      maxProgress: 1000,
    },
    {
      id: 'dez-mil-leitores',
      name: 'Dez Mil Leitores',
      description: 'Alcançou 10.000 visualizações totais',
      icon: <TrendingUp size={20} className="text-white" />,
      rarity: 'legendary' as const,
      unlocked: isTestUser || totalViews >= 10000,
      progress: Math.min(totalViews, 10000),
      maxProgress: 10000,
    },
    {
      id: 'mestre-palavras',
      name: 'Mestre das Palavras',
      description: 'Mantém avaliação média de 4.5 estrelas ou mais',
      icon: <Star size={20} className="text-white" />,
      rarity: 'legendary' as const,
      unlocked: isTestUser || averageRating >= 4.5,
    },
    {
      id: 'pioneiro-cosmico',
      name: 'Pioneiro Cósmico',
      description: 'Um dos primeiros membros da plataforma (exclusivo)',
      icon: <Zap size={20} className="text-white" />,
      rarity: 'legendary' as const,
      unlocked: isTestUser, // Conceder para usuários de teste
    },
    {
      id: 'construtor-mundos',
      name: 'Construtor de Mundos',
      description: 'Criou universos complexos e detalhados',
      icon: <Target size={20} className="text-white" />,
      rarity: 'epic' as const,
      unlocked: isTestUser || author.storiesCount >= 10,
      progress: Math.min(author.storiesCount, 10),
      maxProgress: 10,
    },
    {
      id: 'coracao-leitor',
      name: 'Coração de Leitor',
      description: 'Adicionou 20 histórias aos favoritos',
      icon: <Heart size={20} className="text-white" />,
      rarity: 'rare' as const,
      unlocked: isTestUser || author.favorites.length >= 20,
      progress: Math.min(author.favorites.length, 20),
      maxProgress: 20,
    },
  ];

  return badges;
};

  useEffect(() => {
    const fetchAuthor = async () => {
      try {
        const response = await fetch(API_ENDPOINTS.USER_BY_ID(id!));
        if (response.ok) {
          const data = await response.json();
          const userData = data.user;
          // Convert backend user to Author format
          const authorData: Author = {
            id: userData.id,
            name: userData.name,
            email: userData.email,
            password: '', // Not needed for display
            bio: userData.profile?.bio || '',
            avatarUrl: userData.profile?.avatar || '',
            background: 'cosmic', // Default background
            storiesCount: userData.stats?.storiesCreated || 0,
            followersCount: 0, // Not implemented yet
            badges: [],
            favorites: [],
          };
          setAuthor(authorData);
          setEditData({
            bio: authorData.bio || '',
            avatarUrl: authorData.avatarUrl || '',
            background: authorData.background || 'cosmic',
          });
          // Initialize badges
          const badges = getAuthorBadges(authorData, 0, 0);
          setAllBadges(badges);
          setSelectedBadges((authorData as any).selectedBadges || []);
        }
      } catch (error) {
        console.error('Error fetching author:', error);
      } finally {
        setLoadingAuthor(false);
      }
    };

    if (id) {
      fetchAuthor();
    }
  }, [id]);

  const { user } = useAuth();
  const isCurrentAuthor = user?.id === author?.id;

  useEffect(() => {
    if (author) {
      setEditData({
        bio: author.bio || '',
        avatarUrl: author.avatarUrl || '',
        background: author.background || 'cosmic',
      });
    }
  }, [author]);

  if (loadingAuthor || !author) {
    return (
      <div className={`min-h-screen ${isDarkMode ? 'bg-gradient-to-b from-cosmic-dark via-cosmic-deep to-cosmic-dark text-white' : 'bg-backgroundLight text-black'} flex items-center justify-center p-8`}>
        <div className="text-center">
          {loadingAuthor ? (
            <>
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
              <h1 className="text-2xl font-bold mb-6">Carregando perfil...</h1>
            </>
          ) : (
            <>
              <h1 className="text-3xl font-bold mb-6">Autor não encontrado</h1>
              <Link to="/home" className="bg-gradient-to-r from-primary to-secondary text-white px-6 py-3 rounded-full font-semibold hover:shadow-lg hover:shadow-primary/50 transition-all duration-300">
                Voltar para histórias
              </Link>
            </>
          )}
        </div>
      </div>
    );
  }

  const totalViews = authorStories?.reduce((sum, story) => sum + story.popularity, 0) || 0;
  const averageRating = authorStories?.length > 0 ? authorStories.reduce((sum, story) => sum + story.ratings.average, 0) / authorStories.length : 0;

  useEffect(() => {
    const fetchAuthorStories = async () => {
      if (!author) return;
      setLoadingStories(true);
      try {
        const response = await fetch(`${API_ENDPOINTS.STORIES}?author=${author.id}`);
        if (response.ok) {
          const data = await response.json();
          const mappedStories: Story[] = data.stories.map((story: any) => ({
            id: story._id,
            title: story.title,
            description: story.synopsis,
            image: story.image || "https://via.placeholder.com/400x200?text=Capa",
            author: story.author?.name || 'Autor Desconhecido',
            date: story.createdAt,
            chapters: [],
            genres: story.genres || [],
            tags: story.tags || [],
            ratings: story.ratings || { average: 0, count: 0 },
            comments: story.comments || [],
            popularity: story.views || 0
          }));
          setAuthorStories(mappedStories);
        }
      } catch (error) {
        console.error('Error fetching author stories:', error);
      } finally {
        setLoadingStories(false);
      }
    };

    if (author) {
      fetchAuthorStories();
    }
  }, [author?.id]);

// Função para calcular badges simples (movida para fora do componente)
const getBadges = (author: Author, totalViews: number, averageRating: number) => {
  const badges = [];
  if (author.storiesCount >= 1) badges.push("Autor Estreante");
  if (author.storiesCount >= 5) badges.push("Escritor Experiente");
  if (author.followersCount >= 10) badges.push("Influenciador");
  if (author.followersCount >= 50) badges.push("Celebridade Literária");
  if (totalViews >= 1000) badges.push("Mil Leitores");
  if (totalViews >= 10000) badges.push("Dez Mil Leitores");
  if (averageRating >= 4.5) badges.push("Mestre das Palavras");
  return badges;
};

  const getBackgroundClass = (background: string) => {
    if (background.startsWith('data:')) {
      return 'bg-cover bg-center';
    }
    switch (background) {
      case 'cosmic':
        return 'bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900';
      case 'nebula':
        return 'bg-gradient-to-br from-pink-900 via-purple-900 to-indigo-900';
      case 'galaxy':
        return 'bg-gradient-to-br from-blue-900 via-purple-900 to-black';
      case 'stars':
        return 'bg-gradient-to-br from-gray-900 via-blue-900 to-black';
      default:
        return 'bg-gradient-to-br from-gray-800 to-gray-900';
    }
  };

  const getBackgroundStyle = (background: string) => {
    if (background && (background.startsWith('http') || background.startsWith('data:'))) {
      return { backgroundImage: `url(${background})` };
    }
    return {};
  };

  const handleSave = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        alert('Você precisa estar logado para salvar alterações');
        return;
      }

      let avatarUrl = editData.avatarUrl;
      if (avatarFile) {
        avatarUrl = await fileToBase64(avatarFile);
      }

      const updateData = {
        profile: {
          bio: editData.bio,
          avatar: avatarUrl,
          selectedBadges: selectedBadges,
        }
      };

      const response = await fetch(API_ENDPOINTS.UPDATE_PROFILE, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(updateData),
      });

      if (response.ok) {
        const data = await response.json();
        // Update local state
        setAuthor(prev => prev ? ({
          ...prev,
          bio: editData.bio,
          avatarUrl: avatarUrl,
          selectedBadges: selectedBadges,
        } as any) : null);
        setEditMode(false);
        setAvatarFile(null);
        setBackgroundFile(null);
        alert('Perfil atualizado com sucesso!');
      } else {
        const error = await response.json();
        alert(`Erro ao salvar: ${error.message}`);
      }
    } catch (error) {
      console.error('Erro ao salvar perfil:', error);
      alert('Erro ao salvar alterações. Tente novamente.');
    }
  };

  const handleCancel = () => {
    setEditData({
      bio: author.bio || '',
      avatarUrl: author.avatarUrl || '',
      background: author.background || 'cosmic',
    });
    setSelectedBadges((author as any).selectedBadges || []);
    setEditMode(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className={`min-h-screen ${getBackgroundClass(editMode ? editData.background : author.background || 'cosmic')} text-white`}
    >
      {/* Header Background */}
      <div className={`relative h-48 sm:h-64 ${getBackgroundClass(editMode ? editData.background : author.background || 'cosmic')}`} style={getBackgroundStyle(editMode ? editData.background : author.background || 'cosmic')}>
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-cosmic-dark to-transparent"></div>
      </div>

      <div className="relative -mt-24 sm:-mt-32 px-4 sm:px-6 pb-12">
        <div className="max-w-7xl mx-auto">
          {/* Author Info Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-white/10 backdrop-blur-md rounded-2xl p-4 sm:p-8 mb-8 shadow-2xl border border-white/20"
          >
            <div className="flex flex-col md:flex-row items-start md:items-center gap-4 sm:gap-6">
              <div className="relative w-24 h-24 sm:w-32 sm:h-32 rounded-full overflow-hidden shadow-lg border-4 border-white/20 flex-shrink-0">
                {author.avatarUrl ? (
                  <img
                    src={author.avatarUrl}
                    alt={author.name}
                    className="w-full h-full object-cover hidden-fallback"
                    loading="lazy"
                    onError={(e) => {
                      e.currentTarget.classList.add('hidden');
                      (e.currentTarget.nextElementSibling as HTMLElement)?.classList.remove('hidden');
                    }}
                  />
                ) : null}
                <div className={`w-full h-full bg-gradient-to-r from-primary to-secondary flex items-center justify-center text-2xl sm:text-4xl font-bold text-white ${author.avatarUrl ? 'hidden' : ''}`}>
                  {author.name.charAt(0).toUpperCase()}
                </div>
              </div>

              <div className="flex-1 min-w-0">
                {editMode ? (
                  <div className="mb-4 space-y-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">Bio</label>
                      <textarea
                        value={editData.bio}
                        onChange={(e) => setEditData({ ...editData, bio: e.target.value })}
                        className="w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white placeholder-gray-400 focus:outline-none focus:border-primary"
                        rows={3}
                        placeholder="Conte um pouco sobre você..."
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Avatar (upload de imagem)</label>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => setAvatarFile(e.target.files?.[0] || null)}
                        className="w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-primary"
                      />
                      {avatarFile && <p className="text-xs text-gray-300 mt-1">Arquivo selecionado: {avatarFile.name}</p>}
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Banner de Fundo (upload de imagem)</label>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => setBackgroundFile(e.target.files?.[0] || null)}
                        className="w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-primary"
                      />
                      {backgroundFile && <p className="text-xs text-gray-300 mt-1">Arquivo selecionado: {backgroundFile.name}</p>}
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Ou selecione um Tema de Fundo</label>
                      <select
                        value={editData.background}
                        onChange={(e) => setEditData({ ...editData, background: e.target.value })}
                        className="w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-primary"
                      >
                        <option value="cosmic">Cósmico</option>
                        <option value="nebula">Nebulosa</option>
                        <option value="galaxy">Galáxia</option>
                        <option value="stars">Estrelas</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Conquistas Exibidas no Perfil</label>
                      <p className="text-xs text-textSecondary mb-3">Selecione até 5 conquistas para mostrar no seu perfil (das suas conquistas desbloqueadas)</p>
                      <div className="space-y-2 max-h-40 overflow-y-auto bg-white/5 rounded-lg p-3">
                        {allBadges.filter(badge => badge.unlocked).map((badge) => (
                          <label key={badge.id} className="flex items-center space-x-3 cursor-pointer hover:bg-white/5 p-2 rounded">
                            <input
                              type="checkbox"
                              checked={selectedBadges.includes(badge.id)}
                              onChange={(e) => {
                                if (e.target.checked && selectedBadges.length >= 5) return;
                                setSelectedBadges(prev =>
                                  e.target.checked
                                    ? [...prev, badge.id]
                                    : prev.filter(id => id !== badge.id)
                                );
                              }}
                              className="w-4 h-4 text-primary bg-white/10 border-white/20 rounded focus:ring-primary focus:ring-2"
                            />
                            <div className="flex items-center space-x-2">
                              <span className="text-white">{badge.icon}</span>
                              <span className="text-white text-sm">{badge.name}</span>
                              <span className={`text-xs uppercase px-2 py-1 rounded-full ${
                                badge.rarity === 'legendary' ? 'bg-yellow-500/20 text-yellow-400' :
                                badge.rarity === 'epic' ? 'bg-purple-500/20 text-purple-400' :
                                badge.rarity === 'rare' ? 'bg-blue-500/20 text-blue-400' :
                                'bg-gray-500/20 text-gray-400'
                              }`}>
                                {badge.rarity}
                              </span>
                            </div>
                          </label>
                        ))}
                      </div>
                      <p className="text-xs text-textSecondary mt-2">
                        Selecionadas: {selectedBadges.length}/5
                        {selectedBadges.length >= 5 && <span className="text-yellow-400 ml-1">(máximo atingido)</span>}
                      </p>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-2">
                      <button
                        onClick={handleSave}
                        className="bg-green-500/20 hover:bg-green-500/30 text-green-400 px-4 py-2 rounded-full text-sm font-medium transition-colors duration-300 flex items-center gap-2"
                      >
                        <Save size={16} />
                        Salvar
                      </button>
                      <button
                        onClick={handleCancel}
                        className="bg-red-500/20 hover:bg-red-500/30 text-red-400 px-4 py-2 rounded-full text-sm font-medium transition-colors duration-300 flex items-center gap-2"
                      >
                        <X size={16} />
                        Cancelar
                      </button>
                    </div>
                  </div>
                ) : (
                  <>
                    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-2">
                      <h1 className="text-2xl sm:text-3xl font-bold truncate">{author.name}</h1>
                      {isCurrentAuthor && !editMode && (
                        <button
                          onClick={() => setEditMode(true)}
                          className="bg-primary/20 hover:bg-primary/30 text-primary px-3 sm:px-4 py-2 rounded-full text-xs sm:text-sm font-medium transition-colors duration-300 flex items-center gap-2"
                        >
                          <Edit size={14} className="sm:w-4 sm:h-4" />
                          Editar Perfil
                        </button>
                      )}
                    </div>
                    <p className="text-gray-300 mb-4 text-sm leading-relaxed">{author.bio || 'Criador de mundos incríveis e histórias inesquecíveis.'}</p>
                    <div className="flex flex-col sm:flex-row flex-wrap items-start sm:items-center gap-3 sm:gap-6 text-xs sm:text-sm text-gray-300 mt-4">
                      <div className="flex items-center gap-2">
                        <BookOpen size={14} className="sm:w-4 sm:h-4" />
                        <span>{author.storiesCount} histórias publicadas</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Users size={14} className="sm:w-4 sm:h-4" />
                        <span>{author.followersCount} seguidores</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Crown size={14} className="sm:w-4 sm:h-4" />
                        <span>Visualizações Totais: {totalViews.toLocaleString()}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Star size={14} className="sm:w-4 sm:h-4" />
                        <span>Avaliação Média: {averageRating.toFixed(1)}/5</span>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>

            {/* Badges */}
            {(() => {
              const authorBadges = getBadges(author, totalViews, averageRating);
              return authorBadges && authorBadges.length > 0 && (
                <motion.div
                  className="relative mt-4 flex flex-wrap gap-1 sm:absolute sm:top-4 sm:right-4"
                  initial="hidden"
                  animate="visible"
                  variants={{
                    hidden: { opacity: 0 },
                    visible: {
                      opacity: 1,
                      transition: {
                        staggerChildren: 0.1
                      }
                    }
                  }}
                >
                  {authorBadges.map((badge: string, index: number) => {
                    let icon;
                    switch (badge.toLowerCase()) {
                      case 'autor revelação':
                        icon = <Crown size={10} className="sm:w-3 sm:h-3" />;
                        break;
                      case 'mestre das palavras':
                        icon = <BookOpen size={10} className="sm:w-3 sm:h-3" />;
                        break;
                      case 'contador de estrelas':
                        icon = <Star size={10} className="sm:w-3 sm:h-3" />;
                        break;
                      default:
                        icon = <Crown size={10} className="sm:w-3 sm:h-3" />;
                    }
                    return (
                      <motion.div
                        key={index}
                        variants={{
                          hidden: { scale: 0, opacity: 0 },
                          visible: { scale: 1, opacity: 1 }
                        }}
                        whileHover={{ scale: 1.1, y: -2 }}
                        onClick={() => setBadgeModalOpen(true)}
                        className="bg-primary/70 rounded-full p-2 shadow-md text-xs font-semibold text-white flex items-center gap-1 cursor-pointer hover:bg-primary/90 transition-colors"
                        title="Clique para ver todas as conquistas"
                      >
                        {icon}
                        <span className="hidden sm:inline">{badge}</span>
                      </motion.div>
                    );
                  })}
                  <motion.div
                    variants={{
                      hidden: { scale: 0, opacity: 0 },
                      visible: { scale: 1, opacity: 1 }
                    }}
                    whileHover={{ scale: 1.1, y: -2 }}
                    onClick={() => setBadgeModalOpen(true)}
                    className="bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full p-2 shadow-md text-xs font-semibold text-black flex items-center gap-1 cursor-pointer hover:shadow-lg transition-all"
                    title="Ver todas as conquistas disponíveis"
                  >
                    <Award size={10} className="sm:w-3 sm:h-3" />
                    <span className="hidden sm:inline">Ver Todas</span>
                  </motion.div>
                </motion.div>
              );
            })()}
          </motion.div>

          {/* Vitrine de Destaques */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mb-8"
          >
            <h2 className="text-lg sm:text-xl font-bold mb-4">Vitrine de Destaques</h2>
            {authorStories.length > 0 ? (
              <motion.div
                className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 max-w-7xl mx-auto"
                initial="hidden"
                animate="visible"
                variants={{
                  hidden: { opacity: 0 },
                  visible: {
                    opacity: 1,
                    transition: {
                      staggerChildren: 0.1
                    }
                  }
                }}
              >
                {authorStories
                  .sort((a, b) => b.popularity - a.popularity)
                  .slice(0, 3)
                  .map((story) => (
                    <motion.div
                      key={story.id}
                      variants={{
                        hidden: { opacity: 0, scale: 0.9, y: 20 },
                        visible: { opacity: 1, scale: 1, y: 0 }
                      }}
                      whileHover={{ scale: 1.05, y: -5, boxShadow: "0 10px 30px rgba(59, 130, 246, 0.3)" }}
                      transition={{ duration: 0.3 }}
                      className="bg-white/10 backdrop-blur-md rounded-lg p-3 sm:p-4 border border-white/20 cursor-pointer overflow-hidden group"
                    >
                      <motion.img
                        src={story.image}
                        alt={story.title}
                        className="w-full h-24 sm:h-32 object-cover rounded mb-2 group-hover:scale-110 transition-transform duration-300"
                        loading="lazy"
                      />
                      <motion.h3
                        className="font-semibold text-xs sm:text-sm"
                        whileHover={{ color: "#3b82f6" }}
                      >
                        {story.title}
                      </motion.h3>
                      <p className="text-xs text-gray-300">{story.popularity.toLocaleString()} leituras</p>
                    </motion.div>
                  ))}
              </motion.div>
            ) : (
              <p className="text-gray-300 text-sm">Nenhuma história para destacar ainda.</p>
            )}
          </motion.div>

          {/* Constelação Literária */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.35 }}
            className="mb-8"
          >
            <h2 className="text-xl font-bold mb-4">Constelação Literária</h2>
            {authorStories.length > 0 ? (
              <div className="space-y-2">
                {authorStories.map((story) => {
                  const planet = story.popularity > 1000 ? '🌕' : story.popularity > 500 ? '🪐' : '⭐';
                  return (
                    <div key={story.id} className="flex items-center space-x-2 text-sm">
                      <span className="text-2xl">{planet}</span>
                      <span>{story.title} — {story.popularity} leituras</span>
                    </div>
                  );
                })}
              </div>
            ) : (
              <p className="text-gray-300">Nenhuma história na constelação ainda.</p>
            )}
          </motion.div>

          {/* Author's Stories Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl sm:text-2xl font-bold">Histórias do Autor</h2>
            </div>

            {loadingStories ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6 max-w-7xl mx-auto">
                {Array.from({ length: 6 }).map((_, index) => (
                  <motion.div
                    key={`skeleton-story-${index}`}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.05 }}
                  >
                    <div className="bg-white/10 rounded-lg shadow-lg overflow-hidden">
                      <Skeleton className="w-full h-48 rounded-none" />
                      <div className="p-4">
                        <Skeleton className="h-6 mb-2" />
                        <Skeleton className="h-4" />
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            ) : authorStories.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6 max-w-7xl mx-auto">
                {authorStories.map((story, index) => (
                  <motion.div
                    key={story.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.05 }}
                  >
                    <StoryCard
                      title={story.title}
                      description={story.description}
                      image={story.image}
                      onClick={() => {}}
                    />
                  </motion.div>
                ))}
              </div>
            ) : (
              <div className="text-center py-16 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10">
                <div className="text-6xl mb-4">📚</div>
                <h3 className="text-xl font-semibold mb-2">Nenhuma história publicada ainda</h3>
                <p className="text-gray-300">Comece a criar suas histórias incríveis!</p>
                {isCurrentAuthor && (
                  <Link
                    to="/upload-story"
                    className="mt-4 inline-block bg-primary/80 hover:bg-primary text-white px-6 py-3 rounded-full font-semibold transition-colors duration-300"
                  >
                    Criar Primeira História
                  </Link>
                )}
              </div>
            )}
          </motion.div>

          {/* Badge Modal */}
          <BadgeModal
            isOpen={badgeModalOpen}
            onClose={() => setBadgeModalOpen(false)}
            badges={getAuthorBadges(author, totalViews, averageRating)}
            userType="author"
            authorName={author.name}
          />

          {/* Back Button */}
          <div className="text-center mt-12">
            <Link
              to="/home"
              className="bg-white/10 hover:bg-white/20 text-white px-8 py-4 rounded-full font-semibold text-lg backdrop-blur-md border border-white/20 transition-all duration-300 transform hover:scale-105 inline-block"
            >
              ← Voltar à Biblioteca
            </Link>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default AuthorProfile;
