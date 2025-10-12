const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

export const API_ENDPOINTS = {
  // Auth
  REGISTER: `${API_BASE_URL}/api/auth/register`,
  LOGIN: `${API_BASE_URL}/api/auth/login`,
  VERIFY: `${API_BASE_URL}/api/auth/verify`,

  // Users
  USERS: `${API_BASE_URL}/api/users`,
  USER_BY_ID: (id: string) => `${API_BASE_URL}/api/users/${id}`,
  PROFILE: `${API_BASE_URL}/api/users/profile`,

  // Stories
  STORIES: `${API_BASE_URL}/api/stories`,
  STORY_BY_ID: (id: string) => `${API_BASE_URL}/api/stories/${id}`,

  // Health
  HEALTH: `${API_BASE_URL}/api/health`,
};

export default API_BASE_URL;
