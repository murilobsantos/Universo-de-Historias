// Configuração da API para integração frontend/backend

const API_CONFIG = {
  // URL base da API
  BASE_URL: process.env.NODE_ENV === 'production'
    ? 'https://universo-historias-api.up.railway.app' // Substitua pela URL real do seu deploy
    : 'http://localhost:3000',

  // Endpoints
  ENDPOINTS: {
    AUTH: {
      REGISTER: '/api/auth/register',
      LOGIN: '/api/auth/login',
    },
    USERS: {
      ME: '/api/users/me',
      UPDATE: '/api/users/update',
      STATS: '/api/users/stats',
    },
    STORIES: {
      LIST: '/api/stories',
      CREATE: '/api/stories',
      GET_BY_ID: (id) => `/api/stories/${id}`,
      UPDATE: (id) => `/api/stories/${id}`,
      DELETE: (id) => `/api/stories/${id}`,
      USER_STORIES: '/api/stories/user',
    },
    HEALTH: '/api/health',
  },

  // Headers padrão
  DEFAULT_HEADERS: {
    'Content-Type': 'application/json',
  },

  // Timeout das requisições (ms)
  TIMEOUT: 10000,
};

// Função helper para obter token do localStorage
const getAuthToken = () => localStorage.getItem('token');

// Função helper para criar headers com autenticação
const getAuthHeaders = () => ({
  ...API_CONFIG.DEFAULT_HEADERS,
  Authorization: `Bearer ${getAuthToken()}`,
});

// Função helper para fazer requisições autenticadas
const apiRequest = async (url, options = {}) => {
  const config = {
    headers: options.auth ? getAuthHeaders() : API_CONFIG.DEFAULT_HEADERS,
    ...options,
  };

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), API_CONFIG.TIMEOUT);

  try {
    const response = await fetch(`${API_CONFIG.BASE_URL}${url}`, {
      ...config,
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      const error = await response.json().catch(() => ({ message: 'Erro na requisição' }));
      throw new Error(error.message || `HTTP ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    clearTimeout(timeoutId);

    if (error.name === 'AbortError') {
      throw new Error('Timeout: Requisição demorou muito para responder');
    }

    throw error;
  }
};

// API Methods
export const api = {
  // Health check
  health: () => apiRequest(API_CONFIG.ENDPOINTS.HEALTH),

  // Auth
  auth: {
    register: (userData) => apiRequest(API_CONFIG.ENDPOINTS.AUTH.REGISTER, {
      method: 'POST',
      body: JSON.stringify(userData),
    }),

    login: (credentials) => apiRequest(API_CONFIG.ENDPOINTS.AUTH.LOGIN, {
      method: 'POST',
      body: JSON.stringify(credentials),
    }),
  },

  // Users
  users: {
    getMe: () => apiRequest(API_CONFIG.ENDPOINTS.USERS.ME, { auth: true }),

    update: (userData) => apiRequest(API_CONFIG.ENDPOINTS.USERS.UPDATE, {
      method: 'PUT',
      auth: true,
      body: JSON.stringify(userData),
    }),

    getStats: () => apiRequest(API_CONFIG.ENDPOINTS.USERS.STATS, { auth: true }),
  },

  // Stories
  stories: {
    getAll: (params = {}) => {
      const queryString = new URLSearchParams(params).toString();
      const url = queryString ? `${API_CONFIG.ENDPOINTS.STORIES.LIST}?${queryString}` : API_CONFIG.ENDPOINTS.STORIES.LIST;
      return apiRequest(url);
    },

    getById: (id) => apiRequest(API_CONFIG.ENDPOINTS.STORIES.GET_BY_ID(id)),

    create: (storyData) => apiRequest(API_CONFIG.ENDPOINTS.STORIES.CREATE, {
      method: 'POST',
      auth: true,
      body: JSON.stringify(storyData),
    }),

    update: (id, storyData) => apiRequest(API_CONFIG.ENDPOINTS.STORIES.UPDATE(id), {
      method: 'PUT',
      auth: true,
      body: JSON.stringify(storyData),
    }),

    delete: (id) => apiRequest(API_CONFIG.ENDPOINTS.STORIES.DELETE(id), {
      method: 'DELETE',
      auth: true,
    }),

    getUserStories: () => apiRequest(API_CONFIG.ENDPOINTS.STORIES.USER_STORIES, { auth: true }),
  },
};

export default api;
