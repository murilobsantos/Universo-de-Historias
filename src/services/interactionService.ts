// Service for managing user interactions (likes, follows, comments)
// All data is stored in localStorage

interface Like {
  storyId: number;
  timestamp: number;
}

interface Follow {
  authorId: number;
  authorName: string;
  timestamp: number;
}

interface LocalComment {
  id: number;
  storyId: number;
  chapterId?: number; // For chapter-specific comments
  author: string;
  text: string;
  date: string;
  paragraphIndex?: number; // For paragraph-specific comments
}

const LIKES_KEY = 'story-likes';
const FOLLOWS_KEY = 'author-follows';
const COMMENTS_KEY = 'story-comments';

// Likes Management
export const getLikes = (): Like[] => {
  const likes = localStorage.getItem(LIKES_KEY);
  return likes ? JSON.parse(likes) : [];
};

export const isStoryLiked = (storyId: number): boolean => {
  const likes = getLikes();
  return likes.some(like => like.storyId === storyId);
};

export const addLike = (storyId: number): void => {
  const likes = getLikes();
  if (!isStoryLiked(storyId)) {
    likes.push({ storyId, timestamp: Date.now() });
    localStorage.setItem(LIKES_KEY, JSON.stringify(likes));
  }
};

export const removeLike = (storyId: number): void => {
  const likes = getLikes();
  const filtered = likes.filter(like => like.storyId !== storyId);
  localStorage.setItem(LIKES_KEY, JSON.stringify(filtered));
};

export const toggleLike = (storyId: number): boolean => {
  if (isStoryLiked(storyId)) {
    removeLike(storyId);
    decrementGlobalLikes(storyId);
    return false;
  } else {
    addLike(storyId);
    incrementGlobalLikes(storyId);
    return true;
  }
};

export const getLikeCount = (storyId: number): number => {
  // Returns the number of local likes for this story (0 or 1 for current user)
  const likes = getLikes();
  return likes.filter(like => like.storyId === storyId).length;
};

// Global counters (accumulated across all users/sessions)
const GLOBAL_LIKES_KEY = 'global-story-likes';
const GLOBAL_FOLLOWS_KEY = 'global-author-follows';

interface GlobalCounter {
  [key: number]: number;
}

export const getGlobalLikes = (): GlobalCounter => {
  const data = localStorage.getItem(GLOBAL_LIKES_KEY);
  return data ? JSON.parse(data) : {};
};

export const getGlobalLikeCount = (storyId: number): number => {
  const globalLikes = getGlobalLikes();
  return globalLikes[storyId] || 0;
};

export const incrementGlobalLikes = (storyId: number): void => {
  const globalLikes = getGlobalLikes();
  globalLikes[storyId] = (globalLikes[storyId] || 0) + 1;
  localStorage.setItem(GLOBAL_LIKES_KEY, JSON.stringify(globalLikes));
};

export const decrementGlobalLikes = (storyId: number): void => {
  const globalLikes = getGlobalLikes();
  if (globalLikes[storyId] && globalLikes[storyId] > 0) {
    globalLikes[storyId] -= 1;
  }
  localStorage.setItem(GLOBAL_LIKES_KEY, JSON.stringify(globalLikes));
};

export const getGlobalFollows = (): GlobalCounter => {
  const data = localStorage.getItem(GLOBAL_FOLLOWS_KEY);
  return data ? JSON.parse(data) : {};
};

export const getGlobalFollowCount = (authorId: number): number => {
  const globalFollows = getGlobalFollows();
  return globalFollows[authorId] || 0;
};

export const incrementGlobalFollows = (authorId: number): void => {
  const globalFollows = getGlobalFollows();
  globalFollows[authorId] = (globalFollows[authorId] || 0) + 1;
  localStorage.setItem(GLOBAL_FOLLOWS_KEY, JSON.stringify(globalFollows));
};

export const decrementGlobalFollows = (authorId: number): void => {
  const globalFollows = getGlobalFollows();
  if (globalFollows[authorId] && globalFollows[authorId] > 0) {
    globalFollows[authorId] -= 1;
  }
  localStorage.setItem(GLOBAL_FOLLOWS_KEY, JSON.stringify(globalFollows));
};

// Follows Management
export const getFollows = (): Follow[] => {
  const follows = localStorage.getItem(FOLLOWS_KEY);
  return follows ? JSON.parse(follows) : [];
};

export const isAuthorFollowed = (authorId: number): boolean => {
  const follows = getFollows();
  return follows.some(follow => follow.authorId === authorId);
};

export const addFollow = (authorId: number, authorName: string): void => {
  const follows = getFollows();
  if (!isAuthorFollowed(authorId)) {
    follows.push({ authorId, authorName, timestamp: Date.now() });
    localStorage.setItem(FOLLOWS_KEY, JSON.stringify(follows));
  }
};

export const removeFollow = (authorId: number): void => {
  const follows = getFollows();
  const filtered = follows.filter(follow => follow.authorId !== authorId);
  localStorage.setItem(FOLLOWS_KEY, JSON.stringify(filtered));
};

export const toggleFollow = (authorId: number, authorName: string): boolean => {
  if (isAuthorFollowed(authorId)) {
    removeFollow(authorId);
    decrementGlobalFollows(authorId);
    return false;
  } else {
    addFollow(authorId, authorName);
    incrementGlobalFollows(authorId);
    return true;
  }
};

export const getFollowCount = (authorId: number): number => {
  const follows = getFollows();
  return follows.filter(follow => follow.authorId === authorId).length;
};

// Comments Management
export const getComments = (storyId?: number, chapterId?: number): LocalComment[] => {
  const comments = localStorage.getItem(COMMENTS_KEY);
  const allComments: LocalComment[] = comments ? JSON.parse(comments) : [];

  let filtered = allComments;
  if (storyId !== undefined) {
    filtered = filtered.filter(comment => comment.storyId === storyId);
  }
  if (chapterId !== undefined) {
    filtered = filtered.filter(comment => comment.chapterId === chapterId);
  }

  return filtered;
};

export const getParagraphComments = (storyId: number, paragraphIndex: number): LocalComment[] => {
  const comments = getComments(storyId);
  return comments.filter(comment => comment.paragraphIndex === paragraphIndex);
};

export const addComment = (
  storyId: number,
  author: string,
  text: string,
  paragraphIndex?: number,
  chapterId?: number
): LocalComment => {
  const comments = getComments();
  const newComment: LocalComment = {
    id: Date.now(),
    storyId,
    chapterId,
    author,
    text,
    date: new Date().toISOString(),
    paragraphIndex
  };

  comments.push(newComment);
  localStorage.setItem(COMMENTS_KEY, JSON.stringify(comments));

  return newComment;
};

export const deleteComment = (commentId: number): void => {
  const comments = getComments();
  const filtered = comments.filter(comment => comment.id !== commentId);
  localStorage.setItem(COMMENTS_KEY, JSON.stringify(filtered));
};

export const getCommentCount = (storyId: number): number => {
  return getComments(storyId).length;
};

// Share functionality (copy to clipboard)
export const shareStory = (storyId: number, title: string): Promise<boolean> => {
  const url = `${window.location.origin}/story/${storyId}`;
  const text = `Confira esta história: ${title}`;
  
  if (navigator.share) {
    return navigator.share({
      title,
      text,
      url
    })
    .then(() => true)
    .catch(() => false);
  } else {
    // Fallback: copy to clipboard
    return navigator.clipboard.writeText(`${text}\n${url}`)
      .then(() => true)
      .catch(() => false);
  }
};
