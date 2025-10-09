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
  comments: Comment[];
}

export interface Story {
  id: number;
  title: string;
  description: string;
  image: string;
  author: string;
  date: string;
  chapters: Chapter[];
  genres: string[];
  tags: string[];
  ratings: { average: number; count: number };
  comments: Comment[];
  popularity: number;
}
