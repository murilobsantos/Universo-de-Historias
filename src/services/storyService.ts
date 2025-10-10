import { Story } from "../types/story";

const LOCAL_STORIES_KEY = "local-stories";

const storyService = {
  getLocalStories(): Story[] {
    const stories = localStorage.getItem(LOCAL_STORIES_KEY);
    if (!stories) return [];
    return JSON.parse(stories);
  },

  saveStory(story: Story) {
    const stories = this.getLocalStories();
    const existingIndex = stories.findIndex(s => s.id === story.id);
    if (existingIndex >= 0) {
      stories[existingIndex] = story;
    } else {
      stories.push(story);
    }
    localStorage.setItem(LOCAL_STORIES_KEY, JSON.stringify(stories));
  },

  updateStory(id: number, updatedStory: Story) {
    const stories = this.getLocalStories();
    const index = stories.findIndex(s => s.id === id);
    if (index >= 0) {
      stories[index] = updatedStory;
      localStorage.setItem(LOCAL_STORIES_KEY, JSON.stringify(stories));
    }
  },

  deleteStory(id: number) {
    const stories = this.getLocalStories();
    const filtered = stories.filter(s => s.id !== id);
    localStorage.setItem(LOCAL_STORIES_KEY, JSON.stringify(filtered));
  },
};

export default storyService;
