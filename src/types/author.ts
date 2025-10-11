export interface Author {
  id: number;
  name: string;
  email: string;
  password: string; // Note: In production, hash passwords
  bio: string;
  avatarUrl?: string;
  background?: string;
  badges?: string[];
  storiesCount: number;
  followersCount: number;
  favorites: number[];
}
