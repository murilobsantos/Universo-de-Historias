import { Story } from '../types/story';

const STORAGE_KEY = 'local-stories';

export function saveStory(story: Story): void {
  const localStories = getLocalStories();
  localStories.push(story);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(localStories));
}

export function getLocalStories(): Story[] {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (stored) {
    try {
      return JSON.parse(stored);
    } catch {
      return [];
    }
  }
  return [];
}

export function updateStory(id: number, updatedStory: Partial<Story>): void {
  const localStories = getLocalStories();
  const index = localStories.findIndex(story => story.id === id);
  if (index !== -1) {
    localStories[index] = { ...localStories[index], ...updatedStory };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(localStories));
  }
}

export function deleteStory(id: number): void {
  const localStories = getLocalStories();
  const filtered = localStories.filter(story => story.id !== id);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
}
