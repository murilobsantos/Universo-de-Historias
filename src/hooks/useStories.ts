import { useEffect, useState } from "react";
import { Story, Chapter, Author } from "../types/story";
import { API_ENDPOINTS } from "../services/api";

export default function useStories() {
  const [stories, setStories] = useState<Story[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchStories = async () => {
    try {
      const response = await fetch(API_ENDPOINTS.STORIES);
      if (response.ok) {
        const data = await response.json();
        // Map backend stories to frontend format
        const mappedStories: Story[] = data.stories.map((story: any) => ({
          id: story._id,
          title: story.title,
          description: story.synopsis,
          image: story.image || "https://via.placeholder.com/400x200?text=Capa",
          author: story.author?.name || 'Autor Desconhecido',
          date: story.createdAt,
          chapters: [], // Not loaded here for performance
          genres: story.genres || [],
          tags: story.tags || [],
          ratings: story.ratings || { average: 0, count: 0 },
          comments: story.comments || [],
          popularity: story.views || 0
        }));
        setStories(mappedStories);
      } else {
        console.error('Failed to fetch stories');
        setStories([]);
      }
    } catch (error) {
      console.error('Error fetching stories:', error);
      setStories([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStories();
  }, []);

  const addStory = (title: string, description: string, image: string, author: string, genres: string[], tags: string[], chapters: Chapter[]) => {
    // This is now handled by NewStory component directly via API
    // Refresh stories after creation
    fetchStories();
  };

  const getRecommendations = (storyId: string, currentAuthor?: Author): Story[] => {
    const story = stories.find(s => s.id === storyId);
    if (!story) return [];
    const matchingGenres = story.genres || [];
    const matchingTags = story.tags || [];
    let recommended = stories
      .filter(s => s.id !== storyId && (
        s.genres?.some(g => matchingGenres.includes(g)) ||
        s.tags?.some(t => matchingTags.includes(t))
      ))
      .sort((a, b) => b.popularity - a.popularity);

    return recommended.slice(0, 4);
  };

  const getTopStories = (): Story[] => {
    return stories
      .sort((a, b) => b.popularity - a.popularity)
      .slice(0, 4);
  };

  const refreshStories = () => {
    fetchStories();
  };

  return { stories, loading, addStory, getRecommendations, getTopStories, refreshStories };
}
