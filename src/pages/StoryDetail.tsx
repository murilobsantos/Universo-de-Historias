import React, { useState, useEffect, useMemo } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import useStories from "../hooks/useStories";
import useAuthors from "../hooks/useAuthors";
import { useDarkMode } from "../contexts/DarkModeContext";
import Skeleton from "../components/Skeleton";
import { Story, Chapter } from "../types/story";

function StoryDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { stories } = useStories();
  const { authors } = useAuthors();
  const { isDarkMode } = useDarkMode();
  const [story, setStory] = useState<Story | null>(null);
  const [loading, setLoading] = useState(true);
  const [showFullSynopsis, setShowFullSynopsis] = useState(false);
  const [readingStatus, setReadingStatus] = useState('Quero ler');
  const [chapterOrder, setChapterOrder] = useState('desc');
  const [searchQuery, setSearchQuery] = useState('');

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

  type ExtendedChapter = Chapter & {
    date: string;
    views: number;
    comments: number;
    likes: number;
  };

  const extendedChapters: ExtendedChapter[] = useMemo(() => {
    return story?.chapters.map((ch, index) => ({
      ...ch,
      date: new Date(Date.now() - index * 24 * 60 * 60 * 1000).toLocaleDateString(),
      views: Math.floor(Math.random() * 10000) + 1000,
      comments: Math.floor(Math.random() * 100),
      likes: Math.floor(Math.random() * 500),
    })) || [];
  }, [story]);

  const filteredChapters = useMemo(() => {
    let filtered = extendedChapters.filter(ch => ch.title.toLowerCase().includes(searchQuery.toLowerCase()));
    if (chapterOrder === 'asc') {
      filtered = filtered.sort((a, b) => a.id - b.id);
    } else {
      filtered = filtered.sort((a, b) => b.id - a.id);
    }
    return filtered;
  }, [extendedChapters, searchQuery, chapterOrder]);

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

  const author = authors.find(a => a.name === story.author);
  const relatedStories = stories.filter(s => s.id !== story.id).slice(0, 3);

  const synopsis = showFullSynopsis ? story.description : story.description.substring(0, 150) + "...";

  return (
    <div className={`min-h-screen ${isDarkMode ? 'bg-gradient-to-b from-cosmic-dark via-cosmic-deep to-cosmic-dark text-white' : 'bg-backgroundLight text-black'} p-4 sm:p-6 md:p-8`}>
      <button
        onClick={() => navigate(-1)}
        className="mb-4 px-4 py-2 bg-gray-600 rounded hover:bg-gray-700 transition-colors text-sm sm:text-base"
      >
        ← Voltar
      </button>

      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Content */}
        <div className="lg:col-span-2">
          {/* Title */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">{story.title}</h1>

          {/* Synopsis */}
          <div className="mb-8">
            <h2 className="text-2xl font-semibold mb-2">Sinopse</h2>
            <p className="text-justify leading-relaxed">
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

          {/* Chapters */}
          <div>
            <h2 className="text-2xl font-semibold mb-4">Capítulos</h2>
            {/* Filter and Search */}
            <div className="flex flex-col sm:flex-row gap-4 mb-4">
              <select
                value={chapterOrder}
                onChange={(e) => setChapterOrder(e.target.value)}
                className="p-2 rounded bg-gray-700 text-white"
              >
                <option value="desc">Mais recentes primeiro</option>
                <option value="asc">Mais antigos primeiro</option>
              </select>
              <input
                type="text"
                placeholder="Buscar capítulo..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="p-2 rounded bg-gray-700 text-white flex-1"
              />
            </div>
            {/* Chapters List */}
            <div className="space-y-2">
              {filteredChapters.map((chapter) => (
                <div
                  key={chapter.id}
                  className="flex justify-between items-center p-4 bg-gray-800 rounded hover:bg-gray-700 cursor-pointer"
                  onClick={() => navigate(`/story/${story.id}/chapter/${chapter.id}`)}
                >
                  <div>
                    <h3 className="font-semibold">{chapter.title}</h3>
                    <p className="text-sm text-gray-400">{chapter.date}</p>
                  </div>
                  <div className="flex items-center space-x-4 text-sm">
                    <span>👁 {chapter.views}</span>
                    <span>💬 {chapter.comments}</span>
                    <span>❤️ {chapter.likes}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Sidebar */}
        <div className="lg:col-span-1">
          {/* Cover Image */}
          <img
            src={story.image}
            alt={story.title}
            className="w-full h-64 sm:h-80 object-cover rounded-lg shadow-lg mb-4"
            loading="lazy"
          />

          {/* Metadata */}
          <div className="mb-4 space-y-2 text-sm relative">
            <div>
              <strong>Publicado por:</strong> {author ? (
                <div className="inline-block relative group">
                  <Link
                    to={`/profile/author/${author.id}`}
                    className="text-purple-400 hover:text-purple-300 underline"
                  >
                    {story.author}
                  </Link>
                  <div className="absolute top-0 left-full ml-2 p-4 bg-gray-800 rounded-lg shadow-lg z-10 w-64 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                    {author.background && (
                      <img src={author.background} alt="Background" className="w-full h-20 object-cover rounded-t-lg" />
                    )}
                    <div className="p-2">
                      {author.avatarUrl && (
                        <img src={author.avatarUrl} alt={author.name} className="w-12 h-12 rounded-full float-left mr-3" />
                      )}
                      <h3 className="font-bold">{author.name}</h3>
                      <p className="text-sm text-gray-300 mt-1">{author.bio}</p>
                      <div className="mt-2 text-xs">
                        <span>📚 {author.storiesCount} histórias</span> • <span>👥 {author.followersCount} seguidores</span>
                      </div>
                    </div>
                  </div>
                </div>
              ) : story.author}
            </div>
            <div><strong>Data:</strong> {story.date}</div>
            <div><strong>Gêneros:</strong> {story.genres.join(", ")}</div>
            <div><strong>Avaliação:</strong> ⭐ {story.ratings.average.toFixed(1)} ({story.ratings.count} avaliações)</div>
            <div><strong>Capítulos:</strong> {story.chapters.length}</div>
          </div>

          {/* Button */}
          <button
            onClick={() => {
              // Find the last read chapter or start from chapter 1
              const lastReadChapterId = localStorage.getItem(`last-read-chapter-${story.id}`);
              const chapterToRead = lastReadChapterId ? Number(lastReadChapterId) : 1;
              navigate(`/story/${story.id}/chapter/${chapterToRead}`);
            }}
            className="w-full px-6 py-3 bg-purple-600 rounded-lg font-semibold hover:bg-purple-700 transition-colors mb-4"
          >
            Continuar Lendo
          </button>

          {/* Status Dropdown */}
          <select
            value={readingStatus}
            onChange={(e) => setReadingStatus(e.target.value)}
            className="w-full p-2 rounded bg-gray-700 text-white"
          >
            <option value="Quero ler">Quero ler</option>
            <option value="Lendo">Lendo</option>
            <option value="Completo">Completo</option>
            <option value="Dropei">Dropei</option>
          </select>
        </div>
      </div>

      {/* Related Stories */}
      <div className="max-w-6xl mx-auto mt-16">
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
  );
}

export default StoryDetail;
