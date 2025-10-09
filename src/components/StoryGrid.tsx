import { useEffect, useRef } from "react";
import StoryCard from "./StoryCard";
import useStories from "../hooks/useStories";
import { Story } from "../types/story";

interface StoryGridProps {
  stories?: Story[];
  onCardClick?: (story: Story) => void;
  visibleCount?: number;
  onLoadMore?: () => void;
}

function StoryGrid({ stories, onCardClick, visibleCount, onLoadMore }: StoryGridProps) {
  const { stories: allStories } = useStories();
  const displayStories = stories || allStories;
  const visibleStories = visibleCount ? displayStories.slice(0, visibleCount) : displayStories;

  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-8 px-6">
        {visibleStories.map((story) => (
          <StoryCard
            key={story.id}
            {...story}
            onClick={() => onCardClick?.(story)}
          />
        ))}
      </div>
      {visibleCount && displayStories.length > visibleCount && (
        <div className="text-center mt-8">
          <button
            onClick={onLoadMore}
            className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700"
          >
            Carregar Mais
          </button>
        </div>
      )}
    </div>
  );
}

export default StoryGrid;
