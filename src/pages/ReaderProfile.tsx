import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useReaders } from '../hooks/useReaders';
import useStories from '../hooks/useStories';
import { useDarkMode } from '../contexts/DarkModeContext';
import StoryCard from '../components/StoryCard';
import ThemeSelector from '../components/ThemeSelector';
import { Edit, BookOpen, Heart, Calendar, Trophy, Save, X, Users } from 'lucide-react';

function ReaderProfile() {
  const { id } = useParams<{ id: string }>();
  const { readers, currentReader, updateReader } = useReaders();
  const { stories } = useStories();
  const { isDarkMode } = useDarkMode();

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading time for data fetch
    const timer = setTimeout(() => setLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  const reader = readers.find(r => r.id === Number(id));
  const isCurrentReader = currentReader?.id === reader?.id;
  const favoriteStories = stories.filter(s => reader?.favoriteStories.includes(s.id));
  const totalRead = reader?.readingHistory.length || 0;

  const [editMode, setEditMode] = useState(false);
  const [editData, setEditData] = useState({
    bio: reader?.bio || '',
    avatar: reader?.avatar || '',
    background: reader?.background || 'cosmic',
    badges: reader?.badges?.join(', ') || '',
  });

  const handleSave = () => {
    if (reader) {
      const updates: Partial<typeof reader> = {
        bio: editData.bio,
        background: editData.background,
        badges: editData.badges.split(',').map(b => b.trim()).filter(b => b),
      };
      const avatarUpdate = editData.avatar.trim() ? editData.avatar : reader.avatar;
      updates.avatar = avatarUpdate;
      updateReader(reader.id, updates);
      setEditMode(false);
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
        <div className="relative -mt-32 px-6 pb-12">
          <div className="max-w-6xl mx-auto">
            {/* Skeleton for Reader Info Card */}
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 mb-8 shadow-2xl border border-white/20">
              <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
                <div className="w-32 h-32 rounded-full bg-white/10 animate-pulse"></div>
                <div className="flex-1 space-y-4">
                  <div className="h-8 w-64 bg-white/10 rounded animate-pulse"></div>
                  <div className="h-4 w-48 bg-white/10 rounded animate-pulse"></div>
                  <div className="h-4 w-32 bg-white/10 rounded animate-pulse"></div>
                </div>
              </div>
            </div>

            {/* Skeleton for Favorite Stories */}
            <div className="animate-fade-up">
              <div className="flex items-center justify-between mb-6">
                <div className="h-8 w-48 bg-white/10 rounded animate-pulse"></div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
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
              <div className="h-8 w-48 bg-white/10 rounded animate-pulse mb-6"></div>
              <div className="space-y-4">
                {Array.from({ length: 3 }).map((_, index) => (
                  <div key={index} className="bg-white/5 backdrop-blur-sm rounded-lg p-4 border border-white/10">
                    <div className="flex justify-between items-center">
                      <div className="space-y-2">
                        <div className="h-5 w-64 bg-white/10 rounded animate-pulse"></div>
                        <div className="h-4 w-48 bg-white/10 rounded animate-pulse"></div>
                      </div>
                      <div className="h-10 w-32 bg-white/10 rounded-full animate-pulse"></div>
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
      <div className={`relative h-64 ${isDarkMode ? 'bg-gradient-to-r from-primary/20 to-secondary/20' : 'bg-gradient-to-r from-blue-200 to-purple-200'}`}>
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-cosmic-dark to-transparent"></div>
      </div>

      <div className="relative -mt-32 px-6 pb-12">
        <div className="max-w-6xl mx-auto">
          {/* Reader Info Card */}
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 mb-8 shadow-2xl border border-white/20 animate-fade-up">
            <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
              <div className="relative w-32 h-32 rounded-full overflow-hidden shadow-lg border-4 border-white/20">
                {reader.avatar ? (
                  <img
                    src={reader.avatar}
                    alt={reader.name}
                    className="w-full h-full object-cover hidden-fallback"
                    loading="lazy"
                    onError={(e) => {
                      e.currentTarget.classList.add('hidden');
                      (e.currentTarget.nextElementSibling as HTMLElement)?.classList.remove('hidden');
                    }}
                  />
                ) : null}
                <div className={`w-full h-full bg-gradient-to-r from-primary to-secondary flex items-center justify-center text-4xl font-bold text-white ${reader.avatar ? 'hidden' : ''}`}>
                  {reader.name.charAt(0).toUpperCase()}
                </div>
              </div>

              <div className="flex-1">
                <div className="flex items-center gap-4 mb-2">
                  <h1 className="text-3xl font-bold">{reader.name}</h1>
                  {isCurrentReader && !editMode && (
                    <button
                      onClick={() => setEditMode(true)}
                      className="bg-primary/20 hover:bg-primary/30 text-primary px-4 py-2 rounded-full text-sm font-medium transition-colors duration-300 flex items-center gap-2"
                    >
                      <Edit size={16} />
                      Editar Perfil
                    </button>
                  )}
                  {editMode && (
                    <div className="flex gap-2">
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
                  <p className="text-textSecondary mb-4">{reader.bio || 'Leitor apaixonado por histórias incríveis.'}</p>
                )}

                <ThemeSelector />

                <div className="flex flex-wrap gap-6 text-sm text-textSecondary">
                  <div className="flex items-center gap-2">
                    <BookOpen size={16} />
                    <span>{totalRead} histórias lidas</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Heart size={16} />
                    <span>{favoriteStories.length} favoritos</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar size={16} />
                    <span>Membro desde {reader.joinedDate.toLocaleDateString('pt-BR')}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Trophy size={16} />
                    <span>Conquistas: {reader.badges && reader.badges.length > 0 ? reader.badges.join(', ') : 'Em breve'}</span>
                  </div>
              {/* Add icon for badges */}
              <div className="absolute top-0 right-0 flex space-x-1">
                {reader.badges && reader.badges.map((badge, index) => {
                  let icon;
                  switch (badge.toLowerCase()) {
                    case 'leitor ávido':
                      icon = <Edit size={12} />;
                      break;
                    case 'crítico literário':
                      icon = <BookOpen size={12} />;
                      break;
                    case 'explorador de mundos':
                      icon = <Users size={12} />;
                      break;
                    default:
                      icon = <Trophy size={12} />;
                  }
                  return (
                    <div key={index} className="bg-primary/70 rounded-full p-1 shadow-md text-xs font-semibold text-white flex items-center gap-1">
                      {icon}
                      <span>{badge}</span>
                    </div>
                  );
                })}
              </div>
                </div>
              </div>
            </div>
          </div>

          {/* Favorite Stories Section */}
          <div className="animate-fade-up" style={{animationDelay: '0.2s'}}>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold">Histórias Favoritas</h2>
            </div>

            {favoriteStories.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
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
              <div className="text-center py-16 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10">
                <div className="text-6xl mb-4">❤️</div>
                <h3 className="text-xl font-semibold mb-2">Nenhuma história favorita ainda</h3>
                <p className="text-textSecondary">Explore a biblioteca e marque suas histórias favoritas!</p>
              </div>
            )}
          </div>

          {/* Reading History Section */}
          <div className="animate-fade-up mt-12" style={{animationDelay: '0.4s'}}>
            <h2 className="text-2xl font-bold mb-6">Histórico de Leitura</h2>

            {reader.readingHistory.length > 0 ? (
              <div className="space-y-4">
                {reader.readingHistory.slice(0, 10).map((item, index) => {
                  const story = stories.find(s => s.id === item.storyId);
                  const chapter = story?.chapters.find(c => c.id === item.chapterId);
                  return (
                    <div key={index} className="bg-white/5 backdrop-blur-sm rounded-lg p-4 border border-white/10">
                      <div className="flex justify-between items-center">
                        <div>
                          <h3 className="font-semibold">{story?.title}</h3>
                          <p className="text-sm text-textSecondary">
                            Última leitura: {chapter?.title} • {item.lastRead.toLocaleDateString('pt-BR')}
                          </p>
                        </div>
                        <Link
                          to={`/reader/${story?.id}`}
                          className="bg-primary/20 hover:bg-primary/30 text-primary px-4 py-2 rounded-full text-sm font-medium transition-colors duration-300"
                        >
                          Continuar Lendo
                        </Link>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="text-center py-16 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10">
                <div className="text-6xl mb-4">📖</div>
                <h3 className="text-xl font-semibold mb-2">Nenhuma leitura registrada</h3>
                <p className="text-textSecondary">Comece a ler histórias e seu progresso será salvo automaticamente!</p>
              </div>
            )}
          </div>

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
    </div>
  );
}

export default ReaderProfile;
