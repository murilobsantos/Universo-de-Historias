import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import useAuthors from '../hooks/useAuthors';
import useStories from '../hooks/useStories';
import StoryCard from '../components/StoryCard';
import { Edit, BookOpen, Users, Calendar, Save, X, Trophy } from 'lucide-react';

function AuthorProfile() {
  const { id } = useParams<{ id: string }>();
  const { authors, updateAuthor } = useAuthors();
  const { stories } = useStories();

  const author = authors.find(a => a.id === Number(id));
  const authorStories = stories.filter(s => s.author === author?.name);

  const [editMode, setEditMode] = useState(false);
  const [editData, setEditData] = useState({
    bio: author?.bio || '',
    avatar: author?.avatar || '',
    background: author?.background || 'cosmic',
    badges: author?.badges?.join(', ') || '',
  });

  const handleSave = () => {
    if (author) {
      updateAuthor(author.id, {
        bio: editData.bio,
        avatar: editData.avatar,
        background: editData.background,
        badges: editData.badges.split(',').map(b => b.trim()).filter(b => b),
      });
      setEditMode(false);
    }
  };

  const handleCancel = () => {
    setEditData({
      bio: author?.bio || '',
      avatar: author?.avatar || '',
      background: author?.background || 'cosmic',
      badges: author?.badges?.join(', ') || '',
    });
    setEditMode(false);
  };

  if (!author) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-cosmic-dark via-cosmic-deep to-cosmic-dark text-white flex items-center justify-center">
        <div className="text-center animate-fade-up">
          <div className="text-6xl mb-4">🌌</div>
          <h1 className="text-2xl font-bold mb-2">Autor não encontrado</h1>
          <p className="text-textSecondary mb-4">O autor que você procura não existe.</p>
          <Link
            to="/home"
            className="bg-gradient-to-r from-primary to-secondary text-white px-6 py-3 rounded-full font-semibold hover:shadow-lg hover:shadow-primary/50 transition-all duration-300"
          >
            ← Voltar às histórias
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-cosmic-dark via-cosmic-deep to-cosmic-dark text-white">
      {/* Header Background */}
      <div className="relative h-64 bg-gradient-to-r from-primary/20 to-secondary/20">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-cosmic-dark to-transparent"></div>
      </div>

      <div className="relative -mt-32 px-6 pb-12">
        <div className="max-w-6xl mx-auto">
          {/* Author Info Card */}
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 mb-8 shadow-2xl border border-white/20 animate-fade-up">
            <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
              {author.avatar ? (
                <img
                  src={author.avatar}
                  alt={author.name}
                  className="w-32 h-32 rounded-full object-cover shadow-lg border-4 border-white/20"
                />
              ) : (
                <div className="w-32 h-32 rounded-full bg-gradient-to-r from-primary to-secondary flex items-center justify-center text-4xl font-bold text-white shadow-lg">
                  {author.name.charAt(0).toUpperCase()}
                </div>
              )}
              {/* Add icon for badges */}
              <div className="absolute top-0 right-0 flex space-x-1">
                {author.badges && author.badges.map((badge, index) => {
                  let icon;
                  switch (badge.toLowerCase()) {
                    case 'escritor ávido':
                      icon = <Edit size={12} />;
                      break;
                    case 'mestre da ficção':
                      icon = <BookOpen size={12} />;
                      break;
                    case 'contador de histórias':
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

              <div className="flex-1">
                <div className="flex items-center gap-4 mb-2">
                  <h1 className="text-3xl font-bold">{author.name}</h1>
                  {author.id === 1 && !editMode && ( // Assuming current user check
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
                        placeholder="Escritor Ávido, Mestre da Ficção, etc."
                      />
                    </div>
                  </div>
                ) : (
                  <p className="text-textSecondary mb-4">{author.bio || 'Autor apaixonado por contar histórias incríveis.'}</p>
                )}

                <div className="flex flex-wrap gap-6 text-sm text-textSecondary">
                  <div className="flex items-center gap-2">
                    <BookOpen size={16} />
                    <span>{authorStories.length} histórias publicadas</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Trophy size={16} />
                    <span>Conquistas: {author.badges && author.badges.length > 0 ? author.badges.join(', ') : 'Em breve'}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Stories Section */}
          <div className="animate-fade-up" style={{animationDelay: '0.2s'}}>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold">Histórias de {author.name}</h2>
              {author.id === 1 && ( // Assuming current user check
                <Link
                  to="/nova"
                  className="bg-gradient-to-r from-primary to-secondary text-white px-6 py-3 rounded-full font-semibold hover:shadow-lg hover:shadow-primary/50 transition-all duration-300"
                >
                  + Nova História
                </Link>
              )}
            </div>

            {authorStories.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {authorStories.map((story, index) => (
                  <div key={story.id} className="animate-fade-up" style={{animationDelay: `${index * 0.05}s`}}>
                    <div className="hover:scale-105 transition-transform duration-300">
                      <StoryCard
                        id={story.id}
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
                <div className="text-6xl mb-4">📚</div>
                <h3 className="text-xl font-semibold mb-2">Nenhuma história ainda</h3>
                <p className="text-textSecondary">Este autor ainda não publicou nenhuma história.</p>
              </div>
            )}
          </div>

          {/* Back Button */}
          <div className="text-center mt-12">
            <Link
              to="/home"
              className="bg-white/10 hover:bg-white/20 text-white px-8 py-4 rounded-full font-semibold text-lg backdrop-blur-md border border-white/20 transition-all duration-300 transform hover:scale-105 inline-block"
            >
              ← Voltar às histórias
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AuthorProfile;
