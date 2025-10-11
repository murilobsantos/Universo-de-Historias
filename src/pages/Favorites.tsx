import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import useStories from '../hooks/useStories';
import { useDarkMode } from '../contexts/DarkModeContext';
import StoryCard from '../components/StoryCard';
import interactionService from '../services/interactionService';

function Favorites() {
  const { stories } = useStories();
  const { isDarkMode } = useDarkMode();
  const navigate = useNavigate();

  const favoriteIds = interactionService.getFavorites();
  const favoriteStories = stories.filter(story => favoriteIds.includes(story.id));

  const containerVariants = {
    hidden: { opacity: 1 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const childVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <main className={`min-h-screen ${isDarkMode ? 'bg-gradient-to-b from-cosmic-dark via-cosmic-deep to-cosmic-dark text-white' : 'bg-backgroundLight text-black'} p-4 sm:p-8`}>
      <h1 className="text-3xl sm:text-4xl font-bold mb-8 text-center">Minhas Histórias Favoritas</h1>
      {favoriteStories.length === 0 ? (
        <div className="text-center">
          <p className="text-lg mb-4">Você ainda não favoritou nenhuma história.</p>
          <button
            onClick={() => navigate('/home')}
            className="px-6 py-2 bg-cosmic-purple text-white rounded-lg hover:bg-cosmic-electric transition-colors"
          >
            Explorar Histórias
          </button>
        </div>
      ) : (
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-8"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {favoriteStories.map((story) => (
            <motion.div
              key={`favorite-${story.id}`}
              variants={childVariants}
            >
              <StoryCard
                title={story.title}
                description={story.description}
                image={story.image}
                storyId={story.id}
                onClick={() => navigate(`/story/${story.id}`)}
              />
            </motion.div>
          ))}
        </motion.div>
      )}
    </main>
  );
}

export default Favorites;
