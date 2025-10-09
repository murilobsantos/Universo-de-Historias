import React, { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import StoryCard from "../components/StoryCard";
import Modal from "../components/Modal";
import Filter from "../components/Filter";
import useStories from "../hooks/useStories";
import { Story } from "../types/story";

function Home() {
  const { stories } = useStories();
  const [selectedStory, setSelectedStory] = useState<Story | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedGenres, setSelectedGenres] = useState<string[]>([]);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  // Extract all genres and tags from stories for filter options
  const allGenres = useMemo(() => {
    const genresSet = new Set<string>();
    stories?.forEach(story => {
      story.genres?.forEach(genre => genresSet.add(genre));
    });
    return Array.from(genresSet);
  }, [stories]);

  const allTags = useMemo(() => {
    const tagsSet = new Set<string>();
    stories?.forEach(story => {
      story.tags?.forEach(tag => tagsSet.add(tag));
    });
    return Array.from(tagsSet);
  }, [stories]);

  const filteredStories = useMemo(() => {
    if (!stories) return [];

    return stories.filter((story) => {
      const matchesSearch = story.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           story.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           story.author.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesGenres = selectedGenres.length === 0 || selectedGenres.some(genre => story.genres?.includes(genre));
      const matchesTags = selectedTags.length === 0 || selectedTags.some(tag => story.tags?.includes(tag));

      return matchesSearch && matchesGenres && matchesTags;
    });
  }, [stories, searchTerm, selectedGenres, selectedTags]);

  const handleCardClick = (story: Story) => {
    setSelectedStory(story);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedStory(null);
  };

  const handleSearchChange = (term: string) => {
    setSearchTerm(term);
  };

  const handleGenreChange = (genres: string[]) => {
    setSelectedGenres(genres);
  };

  const handleTagChange = (tags: string[]) => {
    setSelectedTags(tags);
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-cosmic-dark via-cosmic-deep to-cosmic-dark text-white pt-24">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-bold mb-4 animate-fade-up">
            Biblioteca Cósmica
          </h1>
          <p className="text-xl text-textSecondary animate-fade-up" style={{animationDelay: '0.2s'}}>
            Explore nossa coleção de histórias incríveis
          </p>
        </div>

        {/* Search and Filters */}
        <div className="mb-8 animate-fade-up" style={{animationDelay: '0.4s'}}>
          <Filter
            allGenres={allGenres}
            allTags={allTags}
            searchQuery={searchTerm}
            onSearchChange={handleSearchChange}
            onGenreChange={handleGenreChange}
            onTagChange={handleTagChange}
            selectedGenres={selectedGenres}
            selectedTags={selectedTags}
            searchOptions={stories?.map(s => s.title) || []}
            minPopularity={0}
            onMinPopularityChange={() => {}}
            sortByDate={null}
            onSortByDateChange={() => {}}
          />
        </div>

        {/* Stories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredStories.map((story, index) => (
            <div key={story.id} className="animate-fade-up" style={{animationDelay: `${index * 0.05}s`}}>
              <div className="hover:scale-105 transition-transform duration-300">
                <StoryCard
                  id={story.id}
                  title={story.title}
                  description={story.description}
                  image={story.image}
                  onClick={() => handleCardClick(story)}
                />
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredStories.length === 0 && (
          <div className="text-center py-16 animate-fade-up">
            <div className="text-6xl mb-4">🌌</div>
            <h3 className="text-2xl font-semibold mb-2">Nenhuma história encontrada</h3>
            <p className="text-textSecondary">Tente ajustar seus filtros de busca</p>
          </div>
        )}

        {/* Back to Welcome */}
        <div className="text-center mt-12">
          <Link
            to="/welcome"
            className="bg-gradient-to-r from-primary to-secondary text-white px-8 py-4 rounded-full font-semibold text-lg hover:shadow-lg hover:shadow-primary/50 transition-all duration-300 transform hover:scale-105 inline-block"
          >
            ← Voltar ao Início
          </Link>
        </div>
      </div>

      <Modal
        story={selectedStory}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </main>
  );
}

export default Home;
