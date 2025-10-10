import { useState, useEffect } from 'react';
import { Reader } from '../types/reader';

const STORAGE_KEY = 'readers';

const mockReaders: Reader[] = [
  {
    id: 1,
    name: "João Silva",
    email: "joao@example.com",
    password: "password123",
    bio: "Leitor apaixonado por histórias de aventura e fantasia.",
    avatar: "https://randomuser.me/api/portraits/men/76.jpg",
    background: "nebula",
    badges: ["Leitor Ávido", "Crítico Literário", "Explorador de Mundos"],
    favoriteStories: [1, 2],
    readingHistory: [],
    joinedDate: new Date('2023-01-15'),
  },
  {
    id: 2,
    name: "Maria Santos",
    email: "maria@example.com",
    password: "password456",
    bio: "Leitora voraz de romances e mistérios.",
    favoriteStories: [3],
    readingHistory: [],
    joinedDate: new Date('2023-02-20'),
  },
];

const getReaders = (): Reader[] => {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (stored) {
    const parsed = JSON.parse(stored);
    return parsed.map((reader: any) => ({
      ...reader,
      joinedDate: new Date(reader.joinedDate),
      readingHistory: reader.readingHistory.map((item: any) => ({
        ...item,
        lastRead: new Date(item.lastRead),
      })),
    }));
  }
  return mockReaders; // Return mock data if no stored data
};

const saveReaders = (readers: Reader[]) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(readers));
};

export const useReaders = () => {
  const [readers, setReaders] = useState<Reader[]>([]);
  const [currentReader, setCurrentReader] = useState<Reader | null>(null);

  useEffect(() => {
    setReaders(getReaders());
    // Load current reader from localStorage
    const saved = localStorage.getItem('currentReader');
    if (saved) {
      setCurrentReader(JSON.parse(saved));
    }
  }, []);

  const register = (name: string, email: string, password: string, bio?: string): boolean => {
    const existing = readers.find(r => r.email === email);
    if (existing) return false;

    const newReader: Reader = {
      id: Date.now(),
      name,
      email,
      password,
      bio,
      favoriteStories: [],
      readingHistory: [],
      joinedDate: new Date(),
    };

    const updated = [...readers, newReader];
    setReaders(updated);
    saveReaders(updated);
    return true;
  };

  const login = (email: string, password: string): boolean => {
    const reader = readers.find(r => r.email === email && r.password === password);
    if (reader) {
      setCurrentReader(reader);
      localStorage.setItem('currentReader', JSON.stringify(reader)); // Save logged in reader to localStorage
      return true;
    }
    return false;
  };

  const logout = () => {
    setCurrentReader(null);
  };

  const updateReader = (id: number, updates: Partial<Reader>) => {
    const updated = readers.map(r => r.id === id ? { ...r, ...updates } : r);
    setReaders(updated);
    saveReaders(updated);
    if (currentReader?.id === id) {
      setCurrentReader({ ...currentReader, ...updates });
    }
  };

  const addToFavorites = (readerId: number, storyId: number) => {
    const reader = readers.find(r => r.id === readerId);
    if (reader && !reader.favoriteStories.includes(storyId)) {
      updateReader(readerId, {
        favoriteStories: [...reader.favoriteStories, storyId],
      });
    }
  };

  const removeFromFavorites = (readerId: number, storyId: number) => {
    const reader = readers.find(r => r.id === readerId);
    if (reader) {
      updateReader(readerId, {
        favoriteStories: reader.favoriteStories.filter(id => id !== storyId),
      });
    }
  };

  const updateReadingProgress = (readerId: number, storyId: number, chapterId: number) => {
    const reader = readers.find(r => r.id === readerId);
    if (reader) {
      const existingIndex = reader.readingHistory.findIndex(
        item => item.storyId === storyId
      );
      const newEntry = { storyId, chapterId, lastRead: new Date() };

      let newHistory;
      if (existingIndex >= 0) {
        newHistory = [...reader.readingHistory];
        newHistory[existingIndex] = newEntry;
      } else {
        newHistory = [...reader.readingHistory, newEntry];
      }

      updateReader(readerId, { readingHistory: newHistory });
    }
  };

  return {
    readers,
    currentReader,
    register,
    login,
    logout,
    updateReader,
    addToFavorites,
    removeFromFavorites,
    updateReadingProgress,
  };
};
