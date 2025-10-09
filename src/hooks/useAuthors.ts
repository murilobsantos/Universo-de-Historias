import { useState, useEffect } from "react";
import { Author } from "../types/author";

const STORAGE_KEY = 'authors';

const mockAuthors: Author[] = [
  {
    id: 1,
    name: "Alice Johnson",
    email: "alice@example.com",
    password: "password123",
    bio: "Author of fantasy and sci-fi stories.",
    favorites: [],
  },
  {
    id: 2,
    name: "Bob Smith",
    email: "bob@example.com",
    password: "password456",
    bio: "Loves writing mystery and thriller novels.",
    favorites: [],
  },
  {
    id: 3,
    name: "João Silva",
    email: "joao@example.com",
    password: "password789",
    bio: "Escritor apaixonado por histórias de aventura e fantasia.",
    avatar: "https://randomuser.me/api/portraits/men/75.jpg",
    background: "nebula",
    badges: ["Escritor Ávido", "Mestre da Ficção", "Contador de Histórias"],
    favorites: [],
  },
];

const getAuthors = (): Author[] => {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (stored) {
    return JSON.parse(stored);
  }
  return mockAuthors;
};

const saveAuthors = (authors: Author[]) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(authors));
};

function useAuthors() {
  const [authors, setAuthors] = useState<Author[]>([]);
  const [currentAuthor, setCurrentAuthor] = useState<Author | null>(null);

  useEffect(() => {
    setAuthors(getAuthors());
  }, []);

  const login = (email: string, password: string) => {
    const author = authors.find((a) => a.email === email && a.password === password);
    if (author) {
      setCurrentAuthor(author);
      return true;
    }
    return false;
  };

  const register = (name: string, email: string, password: string, bio: string) => {
    if (authors.some((a) => a.email === email)) {
      return false;
    }
    const newAuthor: Author = {
      id: Date.now(),
      name,
      email,
      password,
      bio,
      favorites: [],
    };
    const updated = [...authors, newAuthor];
    setAuthors(updated);
    saveAuthors(updated);
    setCurrentAuthor(newAuthor);
    return true;
  };

  const logout = () => {
    setCurrentAuthor(null);
  };

  const updateAuthor = (id: number, updates: Partial<Author>) => {
    const updated = authors.map(a => a.id === id ? { ...a, ...updates } : a);
    setAuthors(updated);
    saveAuthors(updated);
    if (currentAuthor?.id === id) {
      setCurrentAuthor({ ...currentAuthor, ...updates });
    }
  };

  return { authors, currentAuthor, login, register, logout, updateAuthor };
}

export default useAuthors;
