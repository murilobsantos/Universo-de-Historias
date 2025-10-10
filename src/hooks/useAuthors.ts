import { useEffect, useState } from "react";
import { Author } from "../types/story";

const mockAuthors: Author[] = [
  {
    id: 1,
    name: "João Silva",
    email: "joao@example.com",
    password: "password123",
    bio: "Escritor apaixonado por ficção científica e aventuras épicas.",
    avatarUrl: "/images/joaosilva.jpg",
    storiesCount: 5,
    followersCount: 120,
    theme: "cosmic",
    badges: ["Autor Revelação"],
    background: "cosmic",
  },
  {
    id: 2,
    name: "Maria Santos",
    email: "maria@example.com",
    password: "password123",
    bio: "Especialista em histórias de mistério e suspense.",
    avatarUrl: "/images/mariasantos.jpg",
    storiesCount: 3,
    followersCount: 85,
    theme: "nebula",
    badges: ["Mestre das Palavras"],
    background: "nebula",
  },
  {
    id: 3,
    name: "Pedro Oliveira",
    email: "pedro@example.com",
    password: "password123",
    bio: "Explorador de mundos alternativos e viagens no tempo.",
    avatarUrl: "/images/pedrooliveira.jpg",
    storiesCount: 4,
    followersCount: 95,
    theme: "galaxy",
    badges: ["Contador de Estrelas"],
    background: "galaxy",
  },
  {
    id: 4,
    name: "Ana Costa",
    email: "ana@example.com",
    password: "password123",
    bio: "Contadora de fábulas e lendas encantadas.",
    avatarUrl: "/images/anacosta.jpg",
    storiesCount: 2,
    followersCount: 60,
    theme: "stars",
    badges: ["Autor Revelação"],
    background: "stars",
  },
  {
    id: 5,
    name: "Carlos Ferreira",
    email: "carlos@example.com",
    password: "password123",
    bio: "Hacker de palavras, especialista em thrillers tecnológicos.",
    avatarUrl: "/images/carlosferreira.jpg",
    storiesCount: 6,
    followersCount: 150,
    theme: "cosmic",
    badges: ["Mestre das Palavras"],
    background: "cosmic",
  },
  {
    id: 6,
    name: "Luisa Pereira",
    email: "luisa@example.com",
    password: "password123",
    bio: "Cavaleira das letras, mestre em fantasia medieval.",
    avatarUrl: "/images/luisapereira.jpg",
    storiesCount: 4,
    followersCount: 110,
    theme: "nebula",
    badges: ["Contador de Estrelas"],
    background: "nebula",
  },
];

export default function useAuthors() {
  const [authors, setAuthors] = useState<Author[]>([]);
  const [currentAuthor, setCurrentAuthor] = useState<Author | null>(null);

  useEffect(() => {
    // Load authors from localStorage, default to mock if none
    const savedAuthors = localStorage.getItem("authors");
    if (savedAuthors) {
      setAuthors(JSON.parse(savedAuthors));
    } else {
      setAuthors(mockAuthors);
      localStorage.setItem("authors", JSON.stringify(mockAuthors));
    }
    // Load current author from localStorage
    const saved = localStorage.getItem("current-author");
    if (saved) {
      setCurrentAuthor(JSON.parse(saved));
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
      theme: "default",
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
