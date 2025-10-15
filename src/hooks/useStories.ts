import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Story, Chapter, Author } from "../types/story";
import { API_ENDPOINTS } from "../services/api";

const fetchStories = async (): Promise<Story[]> => {
  const response = await fetch(API_ENDPOINTS.STORIES);
  if (!response.ok) {
    throw new Error('Failed to fetch stories');
  }
  const data = await response.json();

  // Map backend stories to frontend format
  const mappedStories: Story[] = data.stories.map((story: any) => ({
    id: story._id ? story._id.toString() : 'unknown',
    title: typeof story.title === 'string' ? story.title : 'Título não disponível',
    description: typeof story.synopsis === 'string' ? story.synopsis : 'Descrição não disponível',
    image: typeof story.image === 'string' ? story.image : "https://via.placeholder.com/400x200?text=Capa",
    author: typeof story.author?.name === 'string' ? story.author.name : 'Autor Desconhecido',
    date: typeof story.createdAt === 'string' ? story.createdAt : new Date().toISOString(),
    chapters: [], // Not loaded here for performance
    genres: Array.isArray(story.genres) ? story.genres : [],
    tags: Array.isArray(story.tags) ? story.tags : [],
    ratings: typeof story.ratings === 'object' && story.ratings !== null ? story.ratings : { average: 0, count: 0 },
    comments: Array.isArray(story.comments) ? story.comments : [],
    popularity: typeof story.views === 'number' ? story.views : 0
  }));

  return mappedStories;
};

const useStories = () => {
  const queryClient = useQueryClient();

  const { data: stories = [], isLoading: loading, error } = useQuery({
    queryKey: ['stories'],
    queryFn: fetchStories,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });

  const addStory = (title: string, description: string, image: string, author: string, genres: string[], tags: string[], chapters: Chapter[]) => {
    // This is now handled by NewStory component directly via API
    // Invalidate and refetch stories after creation
    queryClient.invalidateQueries({ queryKey: ['stories'] });
  };

  const getRecommendations = (storyId: string | number, currentAuthor?: Author): Story[] => {
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
    queryClient.invalidateQueries({ queryKey: ['stories'] });
  };

  return { stories, loading, error, addStory, getRecommendations, getTopStories, refreshStories };
};

export default useStories;
