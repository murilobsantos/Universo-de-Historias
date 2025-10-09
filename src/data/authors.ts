import { Author } from "../types/author";

export const mockAuthors: Author[] = [
  {
    id: 1,
    name: "João Silva",
    email: "joao@example.com",
    password: "password123", // Note: In production, hash passwords
    bio: "Escritor apaixonado por ficção científica e aventuras épicas.",
    favorites: [1, 7]
  },
  {
    id: 2,
    name: "Maria Santos",
    email: "maria@example.com",
    password: "password123",
    bio: "Especialista em histórias de mistério e suspense.",
    favorites: [2, 8]
  },
  {
    id: 3,
    name: "Pedro Oliveira",
    email: "pedro@example.com",
    password: "password123",
    bio: "Explorador de mundos alternativos e viagens no tempo.",
    favorites: [3]
  },
  {
    id: 4,
    name: "Ana Costa",
    email: "ana@example.com",
    password: "password123",
    bio: "Contadora de fábulas e lendas encantadas.",
    favorites: [4]
  },
  {
    id: 5,
    name: "Carlos Ferreira",
    email: "carlos@example.com",
    password: "password123",
    bio: "Hacker de palavras, especialista em thrillers tecnológicos.",
    favorites: [5]
  },
  {
    id: 6,
    name: "Luisa Pereira",
    email: "luisa@example.com",
    password: "password123",
    bio: "Cavaleira das letras, mestre em fantasia medieval.",
    favorites: [6]
  },
];
