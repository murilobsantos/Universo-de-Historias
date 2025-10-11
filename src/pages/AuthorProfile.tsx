import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import useAuthors from "../hooks/useAuthors";
import useStories from "../hooks/useStories";
import { useDarkMode } from "../contexts/DarkModeContext";
import ThemeSelector from "../components/ThemeSelector";
import StoryCard from "../components/StoryCard";
import Skeleton from "../components/Skeleton";
import { Author } from "../types/author";
import { Edit, BookOpen, Users, Crown, Star, Save, X } from 'lucide-react';

function AuthorProfile() {
  const { id } = useParams<{ id: string }>();
  const { authors, currentAuthor, updateAuthor } = useAuthors();
  const { stories, loading } = useStories();
  const { isDarkMode } = useDarkMode();

  const [editMode, setEditMode] = useState(false);
  const [editData, setEditData] = useState({
    bio: '',
    avatarUrl: '',
    background: 'cosmic',
  });

  const authorId = Number(id);
  const author = authors.find((a: Author) => a.id === authorId);

  const isCurrentAuthor = currentAuthor?.id === authorId;

  useEffect(() => {
    if (author) {
      setEditData({
        bio: author.bio || '',
        avatarUrl: author.avatarUrl || '',
        background: author.background || 'cosmic',
      });
    }
  }, [author]);

  if (!author) {
    return (
      <div className={`min-h-screen ${isDarkMode ? 'bg-gradient-to-b from-cosmic-dark via-cosmic-deep to-cosmic-dark text-white' : 'bg-backgroundLight text-black'} flex items-center justify-center p-8`}>
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-6">Autor não encontrado</h1>
          <Link to="/home" className="bg-gradient-to-r from-primary to-secondary text-white px-6 py-3 rounded-full font-semibold hover:shadow-lg hover:shadow-primary/50 transition-all duration-300">
            Voltar para histórias
          </Link>
        </div>
      </div>
    );
  }

  const authorStories = stories.filter(s => s.author === author.name);
  const totalViews = authorStories.reduce((sum, story) => sum + story.popularity, 0);
  const averageRating = authorStories.length > 0 ? authorStories.reduce((sum, story) => sum + story.ratings.average, 0) / authorStories.length : 0;

  const getBadges = (author: Author) => {
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

  const authorBadges = getBadges(author);

  const getBackgroundClass = (background: string) => {
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

  const handleSave = () => {
    const updatedAuthor = {
      ...author,
      bio: editData.bio,
      avatarUrl: editData.avatarUrl,
      background: editData.background,
    };
    updateAuthor(updatedAuthor);
    setEditMode(false);
  };

  const handleCancel = () => {
    setEditData({
      bio: author.bio || '',
      avatarUrl: author.avatarUrl || '',
      background: author.background || 'cosmic',
    });
    setEditMode(false);
  };

  return (
    <motion.div
      key={editMode ? editData.background : author.background || 'cosmic'}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className={`min-h-screen ${getBackgroundClass(editMode ? editData.background : author.background || 'cosmic')} text-white`}
    >
      {/* Header Background */}
      <div key={`header-${editMode ? editData.background : author.background || 'cosmic'}`} className={`relative h-48 sm:h-64 ${getBackgroundClass(editMode ? editData.background : author.background || 'cosmic')}`}>
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
                      <label className="block text-sm font-medium mb-2">Avatar URL</label>
                      <input
                        type="url"
                        value={editData.avatarUrl}
                        onChange={(e) => setEditData({ ...editData, avatarUrl: e.target.value })}
                        className="w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white placeholder-gray-400 focus:outline-none focus:border-primary"
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
            {authorBadges && authorBadges.length > 0 && (
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
                      className="bg-primary/70 rounded-full p-1 sm:p-1.5 shadow-md text-xs font-semibold text-white flex items-center gap-1 cursor-pointer"
                    >
                      {icon}
                      <span className="hidden sm:inline">{badge}</span>
                    </motion.div>
                  );
                })}
              </motion.div>
            )}
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

            {loading ? (
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
