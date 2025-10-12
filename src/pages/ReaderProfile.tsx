import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import useStories from '../hooks/useStories';
import { useDarkMode } from '../contexts/DarkModeContext';
import { useAuth } from '../contexts/AuthContext';
import { API_ENDPOINTS } from '../services/api';
import StoryCard from '../components/StoryCard';
import ThemeSelector from '../components/ThemeSelector';
import BadgeModal from '../components/BadgeModal';
import { Edit, BookOpen, Heart, Calendar, Trophy, Save, X, Users, Award, Star, Eye, Clock, Target } from 'lucide-react';

function ReaderProfile() {
  const { id } = useParams<{ id: string }>();
  const { stories } = useStories();
  const { isDarkMode } = useDarkMode();

  const [reader, setReader] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReader = async () => {
      try {
        const response = await fetch(API_ENDPOINTS.USER_BY_ID(id!));
        if (response.ok) {
          const data = await response.json();
          const userData = data.user;
          // Convert backend user to Reader format
          const readerData = {
            id: userData.id,
            name: userData.name,
            email: userData.email,
            bio: userData.profile?.bio || '',
            avatar: userData.profile?.avatar || '',
            background: 'cosmic', // Default background
            badges: [],
            favoriteStories: [], // Not implemented yet
            readingHistory: [], // Not implemented yet
            joinedDate: new Date(userData.createdAt),
          };
          setReader(readerData);
        }
      } catch (error) {
        console.error('Error fetching reader:', error);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchReader();
    }
  }, [id]);

  const { user } = useAuth();
  const isCurrentReader = user?.id === reader?.id;
  const favoriteStories = stories.filter(s => reader?.favoriteStories?.includes(s.id) || false);
  const totalRead = reader?.readingHistory?.length || 0;

  const [editMode, setEditMode] = useState(false);
  const [badgeModalOpen, setBadgeModalOpen] = useState(false);
  const [editData, setEditData] = useState({
    bio: reader?.bio || '',
    avatar: reader?.avatar || '',
    background: reader?.background || 'cosmic',
    badges: reader?.badges?.join(', ') || '',
  });

  const handleSave = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        alert('Você precisa estar logado para salvar alterações');
        return;
      }

      let avatarUrl = editData.avatar;
      if (avatarFile) {
        avatarUrl = await fileToBase64(avatarFile);
      }

      const updateData = {
        profile: {
          bio: editData.bio,
          avatar: avatarUrl,
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
        setReader(prev => prev ? ({
          ...prev,
          bio: editData.bio,
          avatar: avatarUrl,
        }) : null);
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
      bio: reader?.bio || '',
      avatar: reader?.avatar || '',
      background: reader?.background || 'cosmic',
      badges: reader?.badges?.join(', ') || '',
    });
    setEditMode(false);
  };

  if (loading) {
    return (
      <div className={`min-h-screen ${isDarkMode ? 'bg-gradient-to-b from-cosmic-dark via-cosmic-deep to-cosmic-dark text-white' : 'bg-backgroundLight text-black'}`}>
        <div className="relative -mt-24 sm:-mt-32 px-4 sm:px-6 pb-12">
          <div className="max-w-7xl mx-auto">
            {/* Skeleton for Reader Info Card */}
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 sm:p-8 mb-8 shadow-2xl border border-white/20">
              <div className="flex flex-col md:flex-row items-start md:items-center gap-4 sm:gap-6">
                <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-full bg-white/10 animate-pulse"></div>
                <div className="flex-1 space-y-4">
                  <div className="h-6 sm:h-8 w-48 sm:w-64 bg-white/10 rounded animate-pulse"></div>
                  <div className="h-4 w-32 sm:w-48 bg-white/10 rounded animate-pulse"></div>
                  <div className="h-4 w-24 sm:w-32 bg-white/10 rounded animate-pulse"></div>
                </div>
              </div>
            </div>

            {/* Skeleton for Favorite Stories */}
            <div className="animate-fade-up">
              <div className="flex items-center justify-between mb-6">
                <div className="h-6 sm:h-8 w-32 sm:w-48 bg-white/10 rounded animate-pulse"></div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6 max-w-7xl mx-auto">
                {Array.from({ length: 4 }).map((_, index) => (
                  <div key={index} className="bg-white/10 rounded-lg shadow-lg overflow-hidden">
                    <div className="w-full h-48 bg-white/10 rounded-t-lg animate-pulse"></div>
                    <div className="p-4">
                      <div className="h-6 mb-2 bg-white/10 rounded animate-pulse"></div>
                      <div className="h-4 bg-white/10 rounded animate-pulse"></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Skeleton for Reading History */}
            <div className="animate-fade-up mt-12">
              <div className="h-6 sm:h-8 w-32 sm:w-48 bg-white/10 rounded animate-pulse mb-6"></div>
              <div className="space-y-4">
                {Array.from({ length: 3 }).map((_, index) => (
                  <div key={index} className="bg-white/5 backdrop-blur-sm rounded-lg p-4 border border-white/10">
                    <div className="flex justify-between items-center">
                      <div className="space-y-2">
                        <div className="h-4 sm:h-5 w-48 sm:w-64 bg-white/10 rounded animate-pulse"></div>
                        <div className="h-4 w-32 sm:w-48 bg-white/10 rounded animate-pulse"></div>
                      </div>
                      <div className="h-8 sm:h-10 w-24 sm:w-32 bg-white/10 rounded-full animate-pulse"></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!reader) {
    return (
      <div className={`min-h-screen ${isDarkMode ? 'bg-gradient-to-b from-cosmic-dark via-cosmic-deep to-cosmic-dark text-white' : 'bg-backgroundLight text-black'} flex items-center justify-center`}>
        <div className="text-center animate-fade-up">
          <div className="text-6xl mb-4">🌌</div>
          <h1 className="text-2xl font-bold mb-2">Leitor não encontrado</h1>
          <p className={`${isDarkMode ? 'text-textSecondary' : 'text-gray-600'} mb-4`}>O leitor que você procura não existe.</p>
          <Link
            to="/home"
            className="bg-gradient-to-r from-primary to-secondary text-white px-6 py-3 rounded-full font-semibold hover:shadow-lg hover:shadow-primary/50 transition-all duration-300"
          >
            ← Voltar à Biblioteca
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen ${isDarkMode ? 'bg-gradient-to-b from-cosmic-dark via-cosmic-deep to-cosmic-dark text-white' : 'bg-backgroundLight text-black'}`}>
      {/* Header Background */}
      <div className={`relative h-48 sm:h-64 ${isDarkMode ? 'bg-gradient-to-r from-primary/20 to-secondary/20' : 'bg-gradient-to-r from-blue-200 to-purple-200'}`}>
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-cosmic-dark to-transparent"></div>
      </div>

      <div className="relative -mt-24 sm:-mt-32 px-4 sm:px-6 pb-12">
        <div className="max-w-7xl mx-auto">
          {/* Reader Info Card */}
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 sm:p-8 mb-8 shadow-2xl border border-white/20 animate-fade-up">
            <div className="flex flex-col md:flex-row items-start md:items-center gap-4 sm:gap-6">
              <div className="relative w-24 h-24 sm:w-32 sm:h-32 rounded-full overflow-hidden shadow-lg border-4 border-white/20 flex-shrink-0">
                {reader.avatar ? (
                  <img
                    src={reader.avatar}
                    alt={reader.name || 'Avatar'}
                    className="w-full h-full object-cover hidden-fallback"
                    loading="lazy"
                    onError={(e) => {
                      e.currentTarget.classList.add('hidden');
                      (e.currentTarget.nextElementSibling as HTMLElement)?.classList.remove('hidden');
                    }}
                  />
                ) : null}
                <div className={`w-full h-full bg-gradient-to-r from-primary to-secondary flex items-center justify-center text-2xl sm:text-4xl font-bold text-white ${reader.avatar ? 'hidden' : ''}`}>
                  {(reader.name || 'U').charAt(0).toUpperCase()}
                </div>
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-2">
                  <h1 className="text-2xl sm:text-3xl font-bold truncate">{reader.name || 'Nome desconhecido'}</h1>
                  {isCurrentReader && !editMode && (
                    <button
                      onClick={() => setEditMode(true)}
                      className="bg-primary/20 hover:bg-primary/30 text-primary px-3 sm:px-4 py-2 rounded-full text-xs sm:text-sm font-medium transition-colors duration-300 flex items-center gap-2"
                    >
                      <Edit size={14} className="sm:w-4 sm:h-4" />
                      Editar Perfil
                    </button>
                  )}
                  {editMode && (
                    <div className="flex flex-col sm:flex-row gap-2">
                      <button
                        onClick={handleSave}
                        className="bg-green-500/20 hover:bg-green-500/30 text-green-400 px-3 sm:px-4 py-2 rounded-full text-xs sm:text-sm font-medium transition-colors duration-300 flex items-center gap-2"
                      >
                        <Save size={14} className="sm:w-4 sm:h-4" />
                        Salvar
                      </button>
                      <button
                        onClick={handleCancel}
                        className="bg-red-500/20 hover:bg-red-500/30 text-red-400 px-3 sm:px-4 py-2 rounded-full text-xs sm:text-sm font-medium transition-colors duration-300 flex items-center gap-2"
                      >
                        <X size={14} className="sm:w-4 sm:h-4" />
                        Cancelar
                      </button>
                    </div>
                  )}
                </div>

                {editMode ? (
                  <div className="mb-4 space-y-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">Bio</label>
                      <textarea
                        value={editData.bio}
                        onChange={(e) => setEditData({ ...editData, bio: e.target.value })}
                        className="w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white placeholder-textSecondary focus:outline-none focus:border-primary"
                        rows={3}
                        placeholder="Conte um pouco sobre você..."
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Avatar URL</label>
                      <input
                        type="url"
                        value={editData.avatar}
                        onChange={(e) => setEditData({ ...editData, avatar: e.target.value })}
                        className="w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white placeholder-textSecondary focus:outline-none focus:border-primary"
                        placeholder="https://exemplo.com/avatar.jpg"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Tema de Fundo</label>
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
                      <label className="block text-sm font-medium mb-2">Conquistas (separadas por vírgula)</label>
                      <input
                        type="text"
                        value={editData.badges}
                        onChange={(e) => setEditData({ ...editData, badges: e.target.value })}
                        className="w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white placeholder-textSecondary focus:outline-none focus:border-primary"
                        placeholder="Leitor Ávido, Crítico Literário, etc."
                      />
                    </div>
                  </div>
                ) : (
                  <p className="text-textSecondary mb-4 text-sm leading-relaxed">{reader.bio || 'Leitor apaixonado por histórias incríveis.'}</p>
                )}

                <ThemeSelector />

                <div className="flex flex-col sm:flex-row flex-wrap items-start sm:items-center gap-3 sm:gap-6 text-xs sm:text-sm text-textSecondary">
                  <div className="flex items-center gap-2">
                    <BookOpen size={14} className="sm:w-4 sm:h-4" />
                    <span>{totalRead} histórias lidas</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Heart size={14} className="sm:w-4 sm:h-4" />
                    <span>{favoriteStories.length} favoritos</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar size={14} className="sm:w-4 sm:h-4" />
                    <span>Membro desde {reader.joinedDate ? reader.joinedDate.toLocaleDateString('pt-BR') : 'N/A'}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Trophy size={14} className="sm:w-4 sm:h-4" />
                    <span>Conquistas: {reader.badges && reader.badges.length > 0 ? reader.badges.join(', ') : 'Em breve'}</span>
                  </div>
              </div>
              {/* Reader Badges Section */}
              <div className="mt-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold">Conquistas do Leitor</h3>
                  <button
                    onClick={() => setBadgeModalOpen(true)}
                    className="bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 transform hover:scale-105 flex items-center gap-2"
                  >
                    <Trophy size={16} />
                    Ver Todas
                  </button>
                </div>

                <div className="flex flex-wrap gap-2">
                  {getReaderBadges(reader).filter(badge => badge.unlocked).slice(0, 4).map((badge, index) => (
                    <div
                      key={badge.id}
                      className={`bg-gradient-to-r ${
                        badge.rarity === 'legendary' ? 'from-yellow-400 to-orange-500' :
                        badge.rarity === 'epic' ? 'from-purple-400 to-pink-500' :
                        badge.rarity === 'rare' ? 'from-blue-400 to-cyan-500' :
                        'from-gray-400 to-gray-500'
                      } rounded-full p-2 shadow-lg cursor-pointer hover:scale-110 transition-transform duration-300 flex items-center gap-2`}
                      onClick={() => setBadgeModalOpen(true)}
                    >
                      {badge.icon}
                      <span className="text-white text-sm font-medium hidden sm:inline">{badge.name}</span>
                    </div>
                  ))}
                  {getReaderBadges(reader).filter(badge => badge.unlocked).length === 0 && (
                    <div className="text-textSecondary text-sm italic">
                      Nenhuma conquista desbloqueada ainda. Continue lendo para ganhar badges!
                    </div>
                  )}
                </div>
              </div>
              </div>
            </div>
          </div>

          {/* Favorite Stories Section */}
          <div className="animate-fade-up" style={{animationDelay: '0.2s'}}>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl sm:text-2xl font-bold">Histórias Favoritas</h2>
            </div>

            {favoriteStories.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6 max-w-7xl mx-auto">
                {favoriteStories.map((story, index) => (
                  <div key={story.id} className="animate-fade-up" style={{animationDelay: `${index * 0.05}s`}}>
                    <div className="hover:scale-105 transition-transform duration-300">
                      <StoryCard
                        title={story.title}
                        description={story.description}
                        image={story.image}
                        onClick={() => {}}
                      />
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12 sm:py-16 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10">
                <div className="text-4xl sm:text-6xl mb-4">❤️</div>
                <h3 className="text-lg sm:text-xl font-semibold mb-2">Nenhuma história favorita ainda</h3>
                <p className="text-textSecondary text-sm">Explore a biblioteca e marque suas histórias favoritas!</p>
              </div>
            )}
          </div>

          {/* Reading History Section */}
          <div className="animate-fade-up mt-12" style={{animationDelay: '0.4s'}}>
            <h2 className="text-xl sm:text-2xl font-bold mb-6">Histórico de Leitura</h2>

            {reader.readingHistory && reader.readingHistory.length > 0 ? (
              <div className="space-y-3 sm:space-y-4">
                {reader.readingHistory.slice(0, 10).map((item, index) => {
                  const story = stories.find(s => s.id === item.storyId);
                  const chapter = story?.chapters?.find(c => c.id === item.chapterId);
                  return (
                    <div key={index} className="bg-white/5 backdrop-blur-sm rounded-lg p-3 sm:p-4 border border-white/10">
                      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 sm:gap-0">
                        <div>
                          <h3 className="font-semibold text-sm sm:text-base">{story?.title || 'História desconhecida'}</h3>
                          <p className="text-xs sm:text-sm text-textSecondary">
                            Última leitura: {chapter?.title || 'Capítulo desconhecido'} • {item.lastRead ? item.lastRead.toLocaleDateString('pt-BR') : 'Data desconhecida'}
                          </p>
                        </div>
                        {story?.id && (
                          <Link
                            to={`/reader/${story.id}`}
                            className="bg-primary/20 hover:bg-primary/30 text-primary px-3 sm:px-4 py-2 rounded-full text-xs sm:text-sm font-medium transition-colors duration-300"
                          >
                            Continuar Lendo
                          </Link>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="text-center py-12 sm:py-16 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10">
                <div className="text-4xl sm:text-6xl mb-4">📖</div>
                <h3 className="text-lg sm:text-xl font-semibold mb-2">Nenhuma leitura registrada</h3>
                <p className="text-textSecondary text-sm">Comece a ler histórias e seu progresso será salvo automaticamente!</p>
              </div>
            )}
          </div>

          {/* Badge Modal */}
          <BadgeModal
            isOpen={badgeModalOpen}
            onClose={() => setBadgeModalOpen(false)}
            badges={getReaderBadges(reader)}
            userType="reader"
          />

          {/* Back Button */}
          <div className="text-center mt-12">
            <Link
              to="/home"
              className="bg-white/10 hover:bg-white/20 text-white px-6 sm:px-8 py-4 rounded-full font-semibold text-base sm:text-lg backdrop-blur-md border border-white/20 transition-all duration-300 transform hover:scale-105 inline-block"
            >
              ← Voltar à Biblioteca
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ReaderProfile;
