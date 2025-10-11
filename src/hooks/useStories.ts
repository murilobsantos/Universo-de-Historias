import { useEffect, useState } from "react";
import { Story, Chapter } from "../types/story";
import { mockStories } from "../data/stories";
import storyService from "../services/storyService";

export default function useStories() {
  const [stories, setStories] = useState<Story[]>([]);

  useEffect(() => {
    // Load stories from localStorage, default to mock if none
    const localStories = storyService.getLocalStories();
    if (localStories.length > 0) {
      setStories(localStories);
    } else {
      setStories(mockStories);
      // Save mock to localStorage
      mockStories.forEach(story => storyService.saveStory(story));
    }
  }, []);

  const addStory = (title: string, description: string, image: string, author: string, genres: string[], tags: string[], chapters: Chapter[]) => {
    const newStory: Story = {
      id: Date.now(), // simple id generation
      title,
      description,
      image,
      author,
      date: new Date().toISOString(),
      chapters,
      genres,
      tags,
      ratings: { average: 0, count: 0 },
      comments: [],
      popularity: 0
    };
    storyService.saveStory(newStory);
    setStories(prev => [...prev, newStory]);
  };

  const getRecommendations = (storyId: number): Story[] => {
    const story = stories.find(s => s.id === storyId);
    if (!story) return [];
    const matchingGenres = story.genres || [];
    const matchingTags = story.tags || [];
    const recommended = stories
      .filter(s => s.id !== storyId && (
        s.genres?.some(g => matchingGenres.includes(g)) ||
        s.tags?.some(t => matchingTags.includes(t))
      ))
      .sort((a, b) => b.popularity - a.popularity)
      .slice(0, 4);
    return recommended;
  };

  const getTopStories = (): Story[] => {
    return stories
      .sort((a, b) => b.popularity - a.popularity)
      .slice(0, 4);
  };

  return { stories, addStory, getRecommendations, getTopStories };
}
