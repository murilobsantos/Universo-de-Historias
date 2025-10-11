import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import useStories from "../hooks/useStories";
import { useDarkMode } from "../contexts/DarkModeContext";
import Skeleton from "../components/Skeleton";
import { Story } from "../types/story";

function StoryDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { stories } = useStories();
  const { isDarkMode } = useDarkMode();
  const [story, setStory] = useState<Story | null>(null);
  const [loading, setLoading] = useState(true);
  const [showFullSynopsis, setShowFullSynopsis] = useState(false);

  useEffect(() => {
    if (!id) return;
    const storyId = Number(id);
    const foundStory = stories.find(s => s.id === storyId) || null;
    setStory(foundStory);
    setLoading(false);
    if (storyId) {
      localStorage.setItem('last-read-story', storyId.toString());
    }
  }, [id, stories]);

  const handleFavorite = () => {
    // Placeholder for favorite functionality
    console.log("Favorited story", story?.title);
  };

  const handleShare = () => {
    // Placeholder for share functionality
    console.log("Shared story", story?.title);
  };

  if (loading) {
    return (
      <div className={`min-h-screen ${isDarkMode ? 'bg-gradient-to-b from-cosmic-dark via-cosmic-deep to-cosmic-dark text-white' : 'bg-backgroundLight text-black'} p-4 md:p-8`}>
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            {/* Cover Image Skeleton */}
            <div className="md:col-span-1">
              <Skeleton className="w-full h-80 rounded-lg" />
            </div>
            {/* Info Section Skeleton */}
            <div className="md:col-span-2 space-y-4">
              <Skeleton className="h-12 w-3/4" />
              <Skeleton className="h-6 w-1/2" />
              <div className="flex space-x-4">
                <Skeleton className="h-4 w-20" />
                <Skeleton className="h-4 w-20" />
                <Skeleton className="h-4 w-20" />
              </div>
              <Skeleton className="h-6 w-32" />
              <Skeleton className="h-20 w-full" />
              <Skeleton className="h-10 w-32" />
            </div>
          </div>
          {/* Chapters Skeleton */}
          <div className="mb-8">
            <Skeleton className="h-8 w-32 mb-4" />
            <div className="flex space-x-2">
              {Array.from({ length: 5 }).map((_, i) => (
                <Skeleton key={i} className="h-10 w-24" />
              ))}
            </div>
          </div>
          {/* Related Stories Skeleton */}
          <div className="mt-16">
            <Skeleton className="h-8 w-48 mb-6" />
            <div className="grid md:grid-cols-3 gap-6">
              {Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="bg-gray-800 rounded-lg overflow-hidden">
                  <Skeleton className="w-full h-32" />
                  <div className="p-4">
                    <Skeleton className="h-6 mb-2" />
                    <Skeleton className="h-4 mb-2" />
                    <div className="flex justify-between">
                      <Skeleton className="h-3 w-16" />
                      <Skeleton className="h-3 w-12" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!story) {
    return <div className="p-8 max-w-4xl mx-auto">História não encontrada.</div>;
  }

  const synopsis = showFullSynopsis ? story.description : story.description.substring(0, 150) + "...";
  const chapters = story.chapters;

  const relatedStories = stories.filter(s => s.id !== story.id).slice(0, 3);

  return (
    <div className={`min-h-screen ${isDarkMode ? 'bg-gradient-to-b from-cosmic-dark via-cosmic-deep to-cosmic-dark text-white' : 'bg-backgroundLight text-black'} p-4 md:p-8`}>
      <button
        onClick={() => navigate(-1)}
        className="mb-4 px-4 py-2 bg-gray-600 rounded hover:bg-gray-700 transition-colors"
      >
        ← Voltar
      </button>

      {/* Header Section */}
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          {/* Cover Image */}
          <div className="md:col-span-1">
            <img
              src={story.image}
              alt={story.title}
              className="w-full h-80 object-cover rounded-lg shadow-lg hover:scale-105 transition-transform duration-300"
              loading="lazy"
            />
            <div className="flex justify-center space-x-4 mt-4">
              <button
                onClick={handleFavorite}
                className="p-2 hover:bg-gray-700 rounded-full transition-colors"
                title="Favoritar"
              >
                ❤️
              </button>
              <button
                onClick={handleShare}
                className="p-2 hover:bg-gray-700 rounded-full transition-colors"
                title="Compartilhar"
              >
                📤
              </button>
            </div>
          </div>

          {/* Info Section */}
          <div className="md:col-span-2 space-y-4">
            {/* Title */}
            <h1 className="text-4xl md:text-5xl font-bold text-center md:text-left">{story.title}</h1>

            {/* Subtitle/Tagline */}
            <p className="text-xl italic text-center md:text-left text-purple-300">
              {story.genres.join(" • ")} Aventura
            </p>

            {/* Metadata */}
            <div className="flex flex-wrap items-center justify-center md:justify-start space-x-4 text-sm">
              <span className="flex items-center">
                <span className="mr-1">👤</span> {story.author}
              </span>
              <span className="flex items-center">
                <span className="mr-1">📖</span> {chapters.length} capítulos
              </span>
              <span className="flex items-center">
                <span className="mr-1">⏳</span> Em Andamento
              </span>
              <span className="flex items-center">
                <span className="mr-1">📅</span> {story.date}
              </span>
              <span className="flex items-center">
                <span className="mr-1">🎯</span> 12+
              </span>
            </div>

            {/* Ratings */}
            <div className="flex items-center justify-center md:justify-start">
              <div className="flex text-yellow-400 mr-2">
                {[...Array(5)].map((_, i) => (
                  <span key={i}>⭐</span>
                ))}
              </div>
              <span>({story.ratings.average.toFixed(1)} / {story.ratings.count} avaliações)</span>
            </div>

            {/* Synopsis */}
            <div className="bg-gray-800 p-4 rounded-lg">
              <h3 className="font-semibold mb-2">Sinopse</h3>
              <p className="text-gray-300 leading-relaxed">
                {synopsis}
                {!showFullSynopsis && story.description.length > 150 && (
                  <button
                    onClick={() => setShowFullSynopsis(true)}
                    className="text-purple-400 hover:text-purple-300 ml-2"
                  >
                    ler mais
                  </button>
                )}
              </p>
            </div>

            {/* CTA */}
            <div className="flex justify-center md:justify-start">
              <button
                onClick={() => navigate(`/story/${story.id}/chapter/1`)}
                className="px-8 py-3 bg-purple-600 rounded-lg font-semibold hover:bg-purple-700 transition-colors text-lg"
              >
                Começar a Ler
              </button>
            </div>
          </div>
        </div>

        {/* Chapters Navigation */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-4">Capítulos</h2>
          <div className="flex overflow-x-auto space-x-2 pb-2">
            {chapters.map((chapter) => (
              <button
                key={chapter.id}
                onClick={() => navigate(`/story/${story.id}/chapter/${chapter.id}`)}
                className="px-4 py-2 rounded whitespace-nowrap transition-colors bg-gray-700 hover:bg-gray-600"
              >
                {chapter.title}
              </button>
            ))}
          </div>
        </div>

        {/* Related Stories */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold mb-6">Histórias Relacionadas</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {relatedStories.map((relStory) => (
              <div
                key={relStory.id}
                className="bg-gray-800 rounded-lg overflow-hidden hover:shadow-lg transition-shadow cursor-pointer"
                onClick={() => navigate(`/story/${relStory.id}`)}
              >
                <img src={relStory.image} alt={relStory.title} className="w-full h-32 object-cover" loading="lazy" />
                <div className="p-4">
                  <h3 className="font-semibold mb-1">{relStory.title}</h3>
                  <p className="text-sm text-gray-400 mb-2">{relStory.description.substring(0, 100)}...</p>
                  <div className="flex justify-between text-xs">
                    <span>{relStory.genres[0]}</span>
                    <span>⭐ {relStory.ratings.average.toFixed(1)}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default StoryDetail;
