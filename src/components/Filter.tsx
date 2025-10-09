

interface FilterProps {
  allGenres: string[];
  selectedGenres: string[];
  onGenreChange: (genres: string[]) => void;
  allTags: string[];
  selectedTags: string[];
  onTagChange: (tags: string[]) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  searchOptions: string[];
  minPopularity: number;
  onMinPopularityChange: (popularity: number) => void;
  sortByDate: 'newest' | 'oldest' | null;
  onSortByDateChange: (sort: 'newest' | 'oldest' | null) => void;
}

import { useState } from 'react';

function Filter({
  allGenres,
  selectedGenres,
  onGenreChange,
  allTags,
  selectedTags,
  onTagChange,
  searchQuery,
  onSearchChange,
  searchOptions,
  minPopularity,
  onMinPopularityChange,
  sortByDate,
  onSortByDateChange
}: FilterProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleCheckboxChange = (genre: string, checked: boolean) => {
    if (checked) {
      onGenreChange([...selectedGenres, genre]);
    } else {
      onGenreChange(selectedGenres.filter(g => g !== genre));
    }
  };

  const handleTagChange = (tag: string, checked: boolean) => {
    if (checked) {
      onTagChange([...selectedTags, tag]);
    } else {
      onTagChange(selectedTags.filter(t => t !== tag));
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md mb-6">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Filtros</h3>
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="text-blue-500 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
        >
          {isExpanded ? 'Ocultar' : 'Mostrar'} Filtros Avançados
        </button>
      </div>

      {/* Search Input */}
      <div className="mb-4">
        <label className="block text-sm font-medium mb-1 text-gray-900 dark:text-gray-100">Buscar por título</label>
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Digite o título..."
          className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
          list="search-options"
        />
        <datalist id="search-options">
          {searchOptions.map(option => (
            <option key={option} value={option} />
          ))}
        </datalist>
      </div>

      {isExpanded && (
        <>

      {/* Genres */}
      <div className="mb-4">
        <h4 className="text-md font-medium mb-2 text-gray-900 dark:text-gray-100">Gêneros</h4>
        <div className="flex flex-wrap gap-4">
          {allGenres.map(genre => (
            <label key={genre} className="flex items-center text-gray-900 dark:text-gray-100">
              <input
                type="checkbox"
                checked={selectedGenres.includes(genre)}
                onChange={(e) => handleCheckboxChange(genre, e.target.checked)}
                className="mr-2"
              />
              {genre}
            </label>
          ))}
        </div>
      </div>

      {/* Tags */}
      <div className="mb-4">
        <h4 className="text-md font-medium mb-2 text-gray-900 dark:text-gray-100">Tags</h4>
        <div className="flex flex-wrap gap-4">
          {allTags.map(tag => (
            <label key={tag} className="flex items-center text-gray-900 dark:text-gray-100">
              <input
                type="checkbox"
                checked={selectedTags.includes(tag)}
                onChange={(e) => handleTagChange(tag, e.target.checked)}
                className="mr-2"
              />
              {tag}
            </label>
          ))}
        </div>
      </div>

      {/* Popularity */}
      <div className="mb-4">
        <label className="block text-sm font-medium mb-1 text-gray-900 dark:text-gray-100">Popularidade mínima: {minPopularity}</label>
        <input
          type="range"
          min="0"
          max="200"
          value={minPopularity}
          onChange={(e) => onMinPopularityChange(Number(e.target.value))}
          className="w-full"
        />
      </div>

      {/* Date Sort */}
      <div className="mb-4">
        <h4 className="text-md font-medium mb-2 text-gray-900 dark:text-gray-100">Ordenar por data</h4>
        <div className="flex gap-2">
          <button
            onClick={() => onSortByDateChange(sortByDate === 'newest' ? null : 'newest')}
            className={`px-3 py-1 rounded ${sortByDate === 'newest' ? 'bg-blue-500 text-white' : 'bg-gray-200 dark:bg-gray-600 text-gray-900 dark:text-gray-100'}`}
          >
            Mais recente
          </button>
          <button
            onClick={() => onSortByDateChange(sortByDate === 'oldest' ? null : 'oldest')}
            className={`px-3 py-1 rounded ${sortByDate === 'oldest' ? 'bg-blue-500 text-white' : 'bg-gray-200 dark:bg-gray-600 text-gray-900 dark:text-gray-100'}`}
          >
            Mais antigo
          </button>
        </div>
      </div>

          {(selectedGenres.length > 0 || selectedTags.length > 0 || searchQuery || minPopularity > 0 || sortByDate) && (
            <button
              onClick={() => {
                onGenreChange([]);
                onTagChange([]);
                onSearchChange('');
                onMinPopularityChange(0);
                onSortByDateChange(null);
              }}
              className="mt-4 bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 dark:bg-gray-600 dark:hover:bg-gray-700"
            >
              Limpar Todos os Filtros
            </button>
          )}
        </>
      )}
    </div>
  );
}

export default Filter;
