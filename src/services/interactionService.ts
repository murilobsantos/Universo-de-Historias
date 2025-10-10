interface LocalComment {
  storyId: number;
  author: string;
  text: string;
  paragraphIndex: number;
  date: string;
  rating?: number;
}

const COMMENTS_KEY = "local-comments";

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

  deleteComment(commentId: number) {
    // Implementation for deleting comment by id (if needed)
  },

  getParagraphComments(storyId: number, paragraphIndex: number) {
    const comments = this.getComments(storyId);
    return comments.filter(c => c.paragraphIndex === paragraphIndex);
  },

  // Additional interaction methods (likes, follows, shares) can be added here
};

export default interactionService;
