export interface Reader {
  id: number;
  name: string;
  email: string;
  password?: string;
  bio?: string;
  avatar?: string;
  background?: string; // URL or color/theme
  badges?: string[]; // Array of badge names
  favoriteStories: number[];
  readingHistory: { storyId: number; chapterId: number; lastRead: Date }[];
  joinedDate: Date;
}
