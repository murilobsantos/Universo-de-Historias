import React from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { useDarkMode } from '../contexts/DarkModeContext';
import useStories from '../hooks/useStories';
import StoryCard from '../components/StoryCard';

function SearchResults() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q') || '';
  const { stories } = useStories();
  const navigate = useNavigate();
  const { isDarkMode } = useDarkMode();

  const filteredStories = stories.filter(story =>
    story.title.toLowerCase().includes(query.toLowerCase()) ||
    story.author.toLowerCase().includes(query.toLowerCase()) ||
    story.genres.some(genre => genre.toLowerCase().includes(query.toLowerCase()))
  );

  if (!query) {
    return (
      <div className={`min-h-screen p-4 ${isDarkMode ? 'bg-cosmic-dark text-white' : 'bg-backgroundLight text-black'}`}>
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl font-bold mb-4">Busca</h1>
          <p className="text-lg">Digite algo para buscar histórias.</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen p-4 ${isDarkMode ? 'bg-cosmic-dark text-white' : 'bg-backgroundLight text-black'}`}>
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-4">Resultados para "{query}" ({filteredStories.length} histórias encontradas)</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredStories.length > 0 ? (
            filteredStories.map(story => (
              <StoryCard
                key={story.id}
                title={story.title}
                description={story.description}
                image={story.image}
                onClick={() => navigate(`/story/${story.id}`)}
              />
            ))
          ) : (
            <p className="col-span-full text-center text-xl py-8">Nenhuma história encontrada para "{query}".</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default SearchResults;
