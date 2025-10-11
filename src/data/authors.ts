import { Author } from "../types/author";

export const mockAuthors: Author[] = [
  {
    id: 1,
    name: "João Silva",
    email: "joao@example.com",
    password: "password123", // Note: In production, hash passwords
    bio: "Escritor apaixonado por ficção científica e aventuras épicas.",
    avatarUrl: "https://picsum.photos/100/200?random=1",
    background: "https://picsum.photos/800/200?random=1",
    storiesCount: 5,
    followersCount: 120,
    favorites: [1, 7]
  },
  {
    id: 2,
    name: "Maria Santos",
    email: "maria@example.com",
    password: "password123",
    bio: "Especialista em histórias de mistério e suspense.",
    avatarUrl: "https://via.placeholder.com/100/E94B3C/FFFFFF?text=MS",
    background: "https://via.placeholder.com/800x200/E94B3C/FFFFFF?text=Background+2",
    storiesCount: 3,
    followersCount: 85,
    favorites: [2, 8]
  },
  {
    id: 3,
    name: "Pedro Oliveira",
    email: "pedro@example.com",
    password: "password123",
    bio: "Explorador de mundos alternativos e viagens no tempo.",
    avatarUrl: "https://via.placeholder.com/100/50E3C2/FFFFFF?text=PO",
    background: "https://via.placeholder.com/800x200/50E3C2/FFFFFF?text=Background+3",
    storiesCount: 7,
    followersCount: 200,
    favorites: [3]
  },
  {
    id: 4,
    name: "Ana Costa",
    email: "ana@example.com",
    password: "password123",
    bio: "Contadora de fábulas e lendas encantadas.",
    avatarUrl: "https://via.placeholder.com/100/F5A623/FFFFFF?text=AC",
    background: "https://via.placeholder.com/800x200/F5A623/FFFFFF?text=Background+4",
    storiesCount: 4,
    followersCount: 95,
    favorites: [4]
  },
  {
    id: 5,
    name: "Carlos Ferreira",
    email: "carlos@example.com",
    password: "password123",
    bio: "Hacker de palavras, especialista em thrillers tecnológicos.",
    avatarUrl: "https://via.placeholder.com/100/BD10E0/FFFFFF?text=CF",
    background: "https://via.placeholder.com/800x200/BD10E0/FFFFFF?text=Background+5",
    storiesCount: 6,
    followersCount: 150,
    favorites: [5]
  },
  {
    id: 6,
    name: "Luisa Pereira",
    email: "luisa@example.com",
    password: "password123",
    bio: "Cavaleira das letras, mestre em fantasia medieval.",
    avatarUrl: "https://via.placeholder.com/100/7ED321/FFFFFF?text=LP",
    background: "https://via.placeholder.com/800x200/7ED321/FFFFFF?text=Background+6",
    storiesCount: 8,
    followersCount: 300,
    favorites: [6]
  },
];
