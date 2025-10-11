interface LocalComment {
  storyId: number;
  author: string;
  text: string;
  paragraphIndex: number;
  date: string;
  rating?: number;
}

const COMMENTS_KEY = "local-comments";
const RATINGS_KEY = "story-ratings";
const LIKE_COUNTS_KEY = "like-counts";
const FOLLOW_COUNTS_KEY = "follow-counts";

const interactionService = {
  getComments(storyId: number): LocalComment[] {
    const comments = localStorage.getItem(COMMENTS_KEY);
    if (!comments) return [];
    const allComments: LocalComment[] = JSON.parse(comments);
    return allComments.filter(c => c.storyId === storyId);
  },

  addComment(storyId: number, author: string, text: string, paragraphIndex: number, rating?: number) {
    const comments = localStorage.getItem(COMMENTS_KEY);
    const allComments: LocalComment[] = comments ? JSON.parse(comments) : [];
    const newComment: LocalComment = {
      storyId,
      author,
      text,
      paragraphIndex,
      date: new Date().toISOString(),
      rating,
    };
    allComments.push(newComment);
    localStorage.setItem(COMMENTS_KEY, JSON.stringify(allComments));
  },

  getParagraphComments(storyId: number, paragraphIndex: number) {
    const comments = this.getComments(storyId);
    return comments.filter(c => c.paragraphIndex === paragraphIndex);
  },

  getFavorites(): number[] {
    const favorites = localStorage.getItem('favorites');
    return favorites ? JSON.parse(favorites) : [];
  },

  addFavorite(storyId: number) {
    const favorites = this.getFavorites();
    if (!favorites.includes(storyId)) {
      favorites.push(storyId);
      localStorage.setItem('favorites', JSON.stringify(favorites));
    }
  },

  removeFavorite(storyId: number) {
    const favorites = this.getFavorites();
    const updated = favorites.filter(id => id !== storyId);
    localStorage.setItem('favorites', JSON.stringify(updated));
  },

  isFavorite(storyId: number): boolean {
    const favorites = this.getFavorites();
    return favorites.includes(storyId);
  },

  getLikeCount(storyId: number): number {
    const counts = localStorage.getItem(LIKE_COUNTS_KEY);
    const allCounts = counts ? JSON.parse(counts) : {};
    return allCounts[storyId] || 0;
  },

  getFollowCount(authorId: number): number {
    const counts = localStorage.getItem(FOLLOW_COUNTS_KEY);
    const allCounts = counts ? JSON.parse(counts) : {};
    return allCounts[authorId] || 0;
  },

  addLike(storyId: number) {
    const likes = this.getLikes();
    if (!likes.includes(storyId)) {
      likes.push(storyId);
      localStorage.setItem('likes', JSON.stringify(likes));
      // Update count
      const counts = localStorage.getItem(LIKE_COUNTS_KEY);
      const allCounts = counts ? JSON.parse(counts) : {};
      allCounts[storyId] = (allCounts[storyId] || 0) + 1;
      localStorage.setItem(LIKE_COUNTS_KEY, JSON.stringify(allCounts));
    }
  },

  removeLike(storyId: number) {
    const likes = this.getLikes();
    const updated = likes.filter(id => id !== storyId);
    localStorage.setItem('likes', JSON.stringify(updated));
    // Update count
    const counts = localStorage.getItem(LIKE_COUNTS_KEY);
    const allCounts = counts ? JSON.parse(counts) : {};
    allCounts[storyId] = Math.max((allCounts[storyId] || 0) - 1, 0);
    localStorage.setItem(LIKE_COUNTS_KEY, JSON.stringify(allCounts));
  },

  addFollow(authorId: number, authorName: string) {
    const follows = this.getFollows();
    if (!follows.includes(authorId)) {
      follows.push(authorId);
      localStorage.setItem('follows', JSON.stringify(follows));
      // Update count
      const counts = localStorage.getItem(FOLLOW_COUNTS_KEY);
      const allCounts = counts ? JSON.parse(counts) : {};
      allCounts[authorId] = (allCounts[authorId] || 0) + 1;
      localStorage.setItem(FOLLOW_COUNTS_KEY, JSON.stringify(allCounts));
    }
  },

  removeFollow(authorId: number) {
    const follows = this.getFollows();
    const updated = follows.filter(id => id !== authorId);
    localStorage.setItem('follows', JSON.stringify(updated));
    // Update count
    const counts = localStorage.getItem(FOLLOW_COUNTS_KEY);
    const allCounts = counts ? JSON.parse(counts) : {};
    allCounts[authorId] = Math.max((allCounts[authorId] || 0) - 1, 0);
    localStorage.setItem(FOLLOW_COUNTS_KEY, JSON.stringify(allCounts));
  },

  getRatings(storyId: number): number[] {
    const ratings = localStorage.getItem(RATINGS_KEY);
    const allRatings = ratings ? JSON.parse(ratings) : {};
    return allRatings[storyId] || [];
  },

  addRating(storyId: number, rating: number) {
    const ratings = localStorage.getItem(RATINGS_KEY);
    const allRatings = ratings ? JSON.parse(ratings) : {};
    if (!allRatings[storyId]) {
      allRatings[storyId] = [];
    }
    allRatings[storyId].push(rating);
    localStorage.setItem(RATINGS_KEY, JSON.stringify(allRatings));
  },

  getAverageRating(storyId: number): number {
    const ratings = this.getRatings(storyId);
    if (ratings.length === 0) return 0;
    const sum = ratings.reduce((a, b) => a + b, 0);
    return sum / ratings.length;
  },

  getLikes(): number[] {
    const likes = localStorage.getItem('likes');
    return likes ? JSON.parse(likes) : [];
  },

  isStoryLiked(storyId: number): boolean {
    const likes = this.getLikes();
    return likes.includes(storyId);
  },

  toggleLike(storyId: number) {
    if (this.isStoryLiked(storyId)) {
      this.removeLike(storyId);
    } else {
      this.addLike(storyId);
    }
  },

  getFollows(): number[] {
    const follows = localStorage.getItem('follows');
    return follows ? JSON.parse(follows) : [];
  },

  isAuthorFollowed(authorId: number): boolean {
    const follows = this.getFollows();
    return follows.includes(authorId);
  },

  toggleFollow(authorId: number, authorName: string) {
    if (this.isAuthorFollowed(authorId)) {
      this.removeFollow(authorId);
    } else {
      this.addFollow(authorId, authorName);
    }
  },

  // Additional interaction methods (likes, follows, shares) can be added here
};

export default interactionService;
