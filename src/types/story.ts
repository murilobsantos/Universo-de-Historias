export interface Rating {
  average: number;
  count: number;
}

export interface Comment {
  id: number;
  author: string;
  text: string;
  date: string;
}

export interface Chapter {
  id: number;
  title: string;
  content: string;
}

export interface Story {
  id: string | number;
  title: string;
  description: string;
  image: string;
  author: string;
  date: string;
  chapters: Chapter[];
  genres: string[];
  tags: string[];
  ratings: Rating;
  comments: Comment[];
  popularity: number;
}

export interface Author {
  id: number;
  name: string;
  email: string;
  password: string;
  bio: string;
  avatarUrl?: string;
  storiesCount: number;
  followersCount: number;
  theme?: string;
  badges?: string[];
  background?: string;
}
