import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import useStories from "../hooks/useStories";
import useAuthors from "../hooks/useAuthors";
import { useDarkMode } from "../contexts/DarkModeContext";
import StoryCard from "../components/StoryCard";
import Skeleton from "../components/Skeleton";

function Home() {
  const { stories, loading, getRecommendations, getTopStories } = useStories();
  const { currentAuthor } = useAuthors();
  const { isDarkMode } = useDarkMode();
  const navigate = useNavigate();

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

  const lastReadId = localStorage.getItem('last-read-story');
  const lastReadNum = lastReadId ? Number(lastReadId) : null;
  const recommendations = lastReadNum ? getRecommendations(lastReadNum, currentAuthor || undefined) : getTopStories();

  return (
    <main className={`min-h-screen ${isDarkMode ? 'bg-gradient-to-b from-cosmic-dark via-cosmic-deep to-cosmic-dark text-white' : 'bg-backgroundLight text-black'} p-4 sm:p-8`}>
      {/* Support Banner */}
      <motion.div
        className="mb-12 max-w-4xl mx-auto"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className={`rounded-2xl p-6 ${isDarkMode ? 'bg-gradient-to-r from-purple-900/50 to-blue-900/50 border border-purple-500/30' : 'bg-gradient-to-r from-purple-100 to-blue-100 border border-purple-200'}`}>
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="mb-4 md:mb-0 md:mr-6">
              <h2 className={`text-2xl font-bold mb-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                Apoie o Universo de Histórias
              </h2>
              <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'} max-w-md`}>
                Junte-se aos nossos fundadores e ajude a manter nossa comunidade de histórias crescendo.
                Cada contribuição faz a diferença!
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3">
              <motion.a
                href="/founders"
                className={`inline-flex items-center px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                  isDarkMode
                    ? 'bg-purple-600 hover:bg-purple-700 text-white'
                    : 'bg-purple-600 hover:bg-purple-700 text-white'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="mr-2">👑</span>
                Ver Fundadores
              </motion.a>
              <motion.a
                href="/support"
                className={`inline-flex items-center px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                  isDarkMode
                    ? 'bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white border border-yellow-400/30'
                    : 'bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="mr-2">💝</span>
                Apoiar Projeto
              </motion.a>
            </div>
          </div>
        </div>
      </motion.div>

      <h1 className="text-3xl sm:text-4xl font-bold mb-8 text-center">Explorar Histórias</h1>
      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 sm:gap-6 md:gap-8 max-w-7xl mx-auto"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <AnimatePresence mode="popLayout">
          {(loading
            ? Array.from({ length: 8 }).map((_, index) => (
                <motion.div
                  key={`skeleton-${index}`}
                  variants={childVariants}
                  exit={{ opacity: 0, scale: 0.95 }}
                >
                  <div className="bg-white/10 rounded-lg shadow-lg overflow-hidden">
                    <Skeleton className="w-full h-48 rounded-none" />
                    <div className="p-4">
                      <Skeleton className="h-6 mb-2" />
                      <Skeleton className="h-4" />
                    </div>
                  </div>
                </motion.div>
              ))
            : stories.map((story) => (
                <motion.div
                  key={`story-${story.id.toString()}`}
                  variants={childVariants}
                  exit={{ opacity: 0, scale: 0.95 }}
                >
                  <StoryCard
                    title={story.title}
                    description={story.description}
                    image={story.image}
                    storyId={story.id}
                    onClick={() => navigate(`/story/${story.id}`)}
                  />
                </motion.div>
              ))
          )}
        </AnimatePresence>
      </motion.div>

      {/* Recommendations Section */}
      <motion.section
        className="mt-16"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <h2 className="text-3xl font-bold mb-8 text-center">Recomendações para Você</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 sm:gap-6 md:gap-8 max-w-7xl mx-auto">
          <AnimatePresence>
            {recommendations.map((story) => (
                <motion.div
                  key={`rec-${story.id.toString()}`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
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
          </AnimatePresence>
        </div>
      </motion.section>

      {/* Em Alta Section */}
      <motion.section
        className="mt-16"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
      >
        <h2 className="text-3xl font-bold mb-8 text-center">Histórias em Alta</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 sm:gap-6 md:gap-8 max-w-7xl mx-auto">
          <AnimatePresence>
            {(loading
              ? Array.from({ length: 4 }).map((_, index) => (
                  <motion.div
                    key={`skeleton-trending-${index}`}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="bg-white/10 rounded-lg shadow-lg overflow-hidden">
                      <Skeleton className="w-full h-48 rounded-none" />
                      <div className="p-4">
                        <Skeleton className="h-6 mb-2" />
                        <Skeleton className="h-4" />
                      </div>
                    </div>
                  </motion.div>
                ))
              : getTopStories().map((story) => (
                  <motion.div
                    key={`trending-${story.id.toString()}`}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                  >
                    <StoryCard
                      title={story.title}
                      description={story.description}
                      image={story.image}
                      storyId={story.id}
                      onClick={() => navigate(`/story/${story.id}`)}
                    />
                  </motion.div>
                ))
            )}
          </AnimatePresence>
        </div>
      </motion.section>
    </main>
  );
}

export default Home;
