import { useEffect, useState } from "react";
import { Author } from "../types/author";

const mockAuthors: Author[] = [
  {
    id: 1,
    name: "João Silva",
    email: "joao@example.com",
    password: "password123",
    bio: "Escritor apaixonado por ficção científica e aventuras épicas.",
    avatarUrl: "https://ui-avatars.com/api/?name=JS&size=50&background=6b5cff&color=fff",
    storiesCount: 5,
    followersCount: 120,
    badges: ["Autor Revelação"],
    background: "cosmic",
    favorites: [],
  },
  {
    id: 2,
    name: "Maria Santos",
    email: "maria@example.com",
    password: "password123",
    bio: "Especialista em histórias de mistério e suspense.",
    avatarUrl: "https://ui-avatars.com/api/?name=MS&size=50&background=ff8a3c&color=fff",
    storiesCount: 3,
    followersCount: 85,
    badges: ["Mestre das Palavras"],
    background: "nebula",
    favorites: [],
  },
  {
    id: 3,
    name: "Pedro Oliveira",
    email: "pedro@example.com",
    password: "password123",
    bio: "Explorador de mundos alternativos e viagens no tempo.",
    avatarUrl: "https://ui-avatars.com/api/?name=PO&size=50&background=0ff&color=000",
    storiesCount: 4,
    followersCount: 95,
    badges: ["Contador de Estrelas"],
    background: "galaxy",
    favorites: [],
  },
  {
    id: 4,
    name: "Ana Costa",
    email: "ana@example.com",
    password: "password123",
    bio: "Contadora de fábulas e lendas encantadas.",
    avatarUrl: "https://ui-avatars.com/api/?name=AC&size=50&background=080808&color=fff",
    storiesCount: 2,
    followersCount: 60,
    badges: ["Autor Revelação"],
    background: "stars",
    favorites: [],
  },
  {
    id: 5,
    name: "Carlos Ferreira",
    email: "carlos@example.com",
    password: "password123",
    bio: "Hacker de palavras, especialista em thrillers tecnológicos.",
    avatarUrl: "https://ui-avatars.com/api/?name=CF&size=50&background=6b5cff&color=fff",
    storiesCount: 6,
    followersCount: 150,
    badges: ["Mestre das Palavras"],
    background: "cosmic",
    favorites: [],
  },
  {
    id: 6,
    name: "Luisa Pereira",
    email: "luisa@example.com",
    password: "password123",
    bio: "Cavaleira das letras, mestre em fantasia medieval.",
    avatarUrl: "https://ui-avatars.com/api/?name=LP&size=50&background=ff8a3c&color=fff",
    storiesCount: 4,
    followersCount: 110,
    badges: ["Contador de Estrelas"],
    background: "nebula",
    favorites: [],
  },
];

export default function useAuthors() {
  const [authors, setAuthors] = useState<Author[]>([]);
  const [currentAuthor, setCurrentAuthor] = useState<Author | null>(null);

  useEffect(() => {
    const dataMigrated = localStorage.getItem("dataMigrated");
    // Load authors from localStorage, default to mock if none
    const savedAuthors = localStorage.getItem("authors");
    let loadedAuthors: Author[] = [];
    if (savedAuthors) {
      try {
        const parsedAuthors = JSON.parse(savedAuthors);
        if (!dataMigrated) {
          // Migrate old data to new structure
          loadedAuthors = parsedAuthors.map((oldAuthor: any) => ({
            id: oldAuthor.id,
            name: oldAuthor.name,
            email: oldAuthor.email,
            password: oldAuthor.password,
            bio: oldAuthor.bio || '',
            avatarUrl: oldAuthor.avatarUrl || oldAuthor.avatar || '',
            background: oldAuthor.background || 'cosmic',
            badges: oldAuthor.badges || [],
            storiesCount: oldAuthor.storiesCount || 0,
            followersCount: oldAuthor.followersCount || 0,
            favorites: oldAuthor.favorites || [],
          }));
          localStorage.setItem("authors", JSON.stringify(loadedAuthors));
          localStorage.setItem("dataMigrated", "true");
        } else {
          loadedAuthors = parsedAuthors;
        }
      } catch (e) {
        console.error("Error loading authors:", e);
        loadedAuthors = mockAuthors;
      }
    } else {
      loadedAuthors = mockAuthors;
      localStorage.setItem("authors", JSON.stringify(loadedAuthors));
      localStorage.setItem("dataMigrated", "true");
    }
    setAuthors(loadedAuthors);

    // Load current author from localStorage
    const saved = localStorage.getItem("current-author");
    if (saved) {
      try {
        const parsedCurrent = JSON.parse(saved);
        if (!dataMigrated) {
          const migratedCurrent: Author = {
            id: parsedCurrent.id,
            name: parsedCurrent.name,
            email: parsedCurrent.email,
            password: parsedCurrent.password,
            bio: parsedCurrent.bio || '',
            avatarUrl: parsedCurrent.avatarUrl || parsedCurrent.avatar || '',
            background: parsedCurrent.background || 'cosmic',
            badges: parsedCurrent.badges || [],
            storiesCount: parsedCurrent.storiesCount || 0,
            followersCount: parsedCurrent.followersCount || 0,
            favorites: parsedCurrent.favorites || [],
          };
          localStorage.setItem("current-author", JSON.stringify(migratedCurrent));
          localStorage.setItem("dataMigrated", "true");
          setCurrentAuthor(migratedCurrent);
        } else {
          setCurrentAuthor(parsedCurrent);
        }
      } catch (e) {
        console.error("Error loading current author:", e);
      }
    }
  }, []);

  const login = (email: string, password: string): Author | null => {
    const author = authors.find(a => a.email === email && a.password === password);
    if (author) {
      setCurrentAuthor(author);
      localStorage.setItem("current-author", JSON.stringify(author));
      return author;
    }
    return null;
  };

  const logout = () => {
    setCurrentAuthor(null);
    localStorage.removeItem("current-author");
  };

  const createAuthor = (name: string, email: string, password: string, bio: string, avatarUrl?: string) => {
    const existing = authors.find(a => a.email === email);
    if (existing) return false;

    const newAuthor: Author = {
      id: Date.now(), // simple id generation
      name,
      email,
      password,
      bio,
      avatarUrl,
      storiesCount: 0,
      followersCount: 0,
      background: "cosmic",
      badges: [],
      favorites: [],
    };
    const updatedAuthors = [...authors, newAuthor];
    setAuthors(updatedAuthors);
    localStorage.setItem("authors", JSON.stringify(updatedAuthors));
    login(email, password);
    return true;
  };

  const updateAuthor = (updatedAuthor: Author) => {
    const updatedAuthors = authors.map(author =>
      author.id === updatedAuthor.id ? updatedAuthor : author
    );
    setAuthors(updatedAuthors);
    localStorage.setItem("authors", JSON.stringify(updatedAuthors));
    if (currentAuthor && currentAuthor.id === updatedAuthor.id) {
      setCurrentAuthor(updatedAuthor);
      localStorage.setItem("current-author", JSON.stringify(updatedAuthor));
    }
  };

  return { authors, currentAuthor, login, logout, createAuthor, updateAuthor };
}
