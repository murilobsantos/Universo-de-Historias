import { useState, useMemo } from "react";
import { useParams } from "react-router-dom";
import StoryGrid from "../components/StoryGrid";
import Modal from "../components/Modal";
import useStories from "../hooks/useStories";
import { Story } from "../types/story";

function Category() {
  const { genre } = useParams<{ genre: string }>();
  const { stories } = useStories();
  const [selectedStory, setSelectedStory] = useState<Story | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [visibleCount, setVisibleCount] = useState(12);

  const categoryStories = useMemo(() => {
    if (!genre) return [];
    return stories.filter((story: Story) =>
      story.genres.some((g: string) => g.toLowerCase() === genre.toLowerCase())
    );
  }, [stories, genre]);

  const handleCardClick = (story: Story) => {
    setSelectedStory(story);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedStory(null);
  };

  const handleLoadMore = () => {
    setVisibleCount(prev => prev + 12);
  };

  return (
    <main className="flex flex-col items-center justify-center py-10 px-4 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      <h2 className="text-2xl font-semibold mb-4">Histórias de {genre}</h2>
      <p className="mb-8 text-center">Explore todas as histórias nesta categoria.</p>

      <StoryGrid
        stories={categoryStories}
        onCardClick={handleCardClick}
        visibleCount={visibleCount}
        onLoadMore={handleLoadMore}
      />
      <Modal
        story={selectedStory}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </main>
  );
}

export default Category;
