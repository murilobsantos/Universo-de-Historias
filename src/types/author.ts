export interface Author {
  id: number;
  name: string;
  email: string;
  password: string; // Note: In production, hash passwords
  bio: string;
  avatar?: string;
  background?: string; // URL or color/theme
  badges?: string[]; // Array of badge names
  favorites: number[];
}
