// ==========================================
// EXEMPLOS DE USO DA API NO FRONTEND
// ==========================================

// Configuração base
const API_BASE_URL = 'http://localhost:3000/api';

// ==========================================
// 1. REGISTRO DE USUÁRIO
// ==========================================
async function registerUser(userData) {
  try {
    const response = await fetch(`${API_BASE_URL}/auth/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(userData)
    });

    const data = await response.json();

    if (data.success) {
      // Salvar token no localStorage
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));
      console.log('✅ Usuário registrado com sucesso!');
      return data;
    } else {
      console.error('❌ Erro no registro:', data.message);
      throw new Error(data.message);
    }
  } catch (error) {
    console.error('❌ Erro de rede:', error);
    throw error;
  }
}

// Exemplo de uso:
// registerUser({
//   name: 'João Silva',
//   email: 'joao@email.com',
//   password: 'senha123'
// });

// ==========================================
// 2. LOGIN DE USUÁRIO
// ==========================================
async function loginUser(credentials) {
  try {
    const response = await fetch(`${API_BASE_URL}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(credentials)
    });

    const data = await response.json();

    if (data.success) {
      // Salvar token no localStorage
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));
      console.log('✅ Login realizado com sucesso!');
      return data;
    } else {
      console.error('❌ Erro no login:', data.message);
      throw new Error(data.message);
    }
  } catch (error) {
    console.error('❌ Erro de rede:', error);
    throw error;
  }
}

// Exemplo de uso:
// loginUser({
//   email: 'joao@email.com',
//   password: 'senha123'
// });

// ==========================================
// 3. FUNÇÃO HELPER PARA REQUISIÇÕES AUTENTICADAS
// ==========================================
async function authenticatedFetch(url, options = {}) {
  const token = localStorage.getItem('token');

  if (!token) {
    throw new Error('Token não encontrado. Faça login primeiro.');
  }

  const defaultOptions = {
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
      ...options.headers
    }
  };

  const response = await fetch(url, { ...options, ...defaultOptions });
  const data = await response.json();

  if (!data.success) {
    throw new Error(data.message);
  }

  return data;
}

// ==========================================
// 4. BUSCAR DADOS DO USUÁRIO LOGADO
// ==========================================
async function getCurrentUser() {
  try {
    const data = await authenticatedFetch(`${API_BASE_URL}/users/me`);
    console.log('✅ Dados do usuário:', data.user);
    return data.user;
  } catch (error) {
    console.error('❌ Erro ao buscar usuário:', error);
    throw error;
  }
}

// ==========================================
// 5. CRIAR UMA NOVA HISTÓRIA
// ==========================================
async function createStory(storyData) {
  try {
    const data = await authenticatedFetch(`${API_BASE_URL}/stories`, {
      method: 'POST',
      body: JSON.stringify(storyData)
    });

    console.log('✅ História criada com sucesso!');
    return data.story;
  } catch (error) {
    console.error('❌ Erro ao criar história:', error);
    throw error;
  }
}

// Exemplo de uso:
// createStory({
//   title: 'A Jornada Épica',
//   synopsis: 'Uma aventura incrível através de mundos desconhecidos...',
//   content: 'Era uma vez, em um reino distante, um jovem herói chamado...',
//   genres: ['Fantasia', 'Aventura'],
//   tags: ['magia', 'heróis', 'dragões'],
//   image: 'https://exemplo.com/imagem.jpg'
// });

// ==========================================
// 6. LISTAR HISTÓRIAS PÚBLICAS
// ==========================================
async function getStories(page = 1, filters = {}) {
  try {
    const queryParams = new URLSearchParams({
      page: page.toString(),
      ...filters
    });

    const response = await fetch(`${API_BASE_URL}/stories?${queryParams}`);
    const data = await response.json();

    if (data.success) {
      console.log('✅ Histórias encontradas:', data.stories.length);
      console.log('📄 Paginação:', data.pagination);
      return data;
    } else {
      throw new Error(data.message);
    }
  } catch (error) {
    console.error('❌ Erro ao buscar histórias:', error);
    throw error;
  }
}

// Exemplos de uso:
// getStories(1); // Primeira página
// getStories(1, { genre: 'Fantasia' }); // Filtrar por gênero
// getStories(1, { search: 'dragão' }); // Busca por texto
// getStories(1, { sort: 'popular' }); // Ordenar por popularidade

// ==========================================
// 7. BUSCAR HISTÓRIA ESPECÍFICA
// ==========================================
async function getStory(storyId) {
  try {
    const response = await fetch(`${API_BASE_URL}/stories/${storyId}`);
    const data = await response.json();

    if (data.success) {
      console.log('✅ História encontrada:', data.story.title);
      return data.story;
    } else {
      throw new Error(data.message);
    }
  } catch (error) {
    console.error('❌ Erro ao buscar história:', error);
    throw error;
  }
}

// ==========================================
// 8. LISTAR HISTÓRIAS DO USUÁRIO LOGADO
// ==========================================
async function getUserStories(page = 1) {
  try {
    const data = await authenticatedFetch(`${API_BASE_URL}/stories/user/me?page=${page}`);
    console.log('✅ Histórias do usuário:', data.stories.length);
    return data;
  } catch (error) {
    console.error('❌ Erro ao buscar histórias do usuário:', error);
    throw error;
  }
}

// ==========================================
// 9. ATUALIZAR HISTÓRIA
// ==========================================
async function updateStory(storyId, updates) {
  try {
    const data = await authenticatedFetch(`${API_BASE_URL}/stories/${storyId}`, {
      method: 'PUT',
      body: JSON.stringify(updates)
    });

    console.log('✅ História atualizada com sucesso!');
    return data.story;
  } catch (error) {
    console.error('❌ Erro ao atualizar história:', error);
    throw error;
  }
}

// ==========================================
// 10. EXCLUIR HISTÓRIA
// ==========================================
async function deleteStory(storyId) {
  try {
    const data = await authenticatedFetch(`${API_BASE_URL}/stories/${storyId}`, {
      method: 'DELETE'
    });

    console.log('✅ História excluída com sucesso!');
    return true;
  } catch (error) {
    console.error('❌ Erro ao excluir história:', error);
    throw error;
  }
}

// ==========================================
// 11. ATUALIZAR PERFIL DO USUÁRIO
// ==========================================
async function updateUserProfile(updates) {
  try {
    const data = await authenticatedFetch(`${API_BASE_URL}/users/me`, {
      method: 'PUT',
      body: JSON.stringify(updates)
    });

    // Atualizar dados no localStorage
    localStorage.setItem('user', JSON.stringify(data.user));

    console.log('✅ Perfil atualizado com sucesso!');
    return data.user;
  } catch (error) {
    console.error('❌ Erro ao atualizar perfil:', error);
    throw error;
  }
}

// ==========================================
// 12. FAZER LOGOUT
// ==========================================
function logout() {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
  console.log('✅ Logout realizado com sucesso!');
}

// ==========================================
// 13. VERIFICAR SE USUÁRIO ESTÁ LOGADO
// ==========================================
function isLoggedIn() {
  const token = localStorage.getItem('token');
  const user = localStorage.getItem('user');
  return !!(token && user);
}

// ==========================================
// 14. OBTEM USUÁRIO DO LOCALSTORAGE
// ==========================================
function getStoredUser() {
  const user = localStorage.getItem('user');
  return user ? JSON.parse(user) : null;
}

// ==========================================
// EXEMPLO COMPLETO DE USO
// ==========================================
async function exemploCompleto() {
  try {
    // 1. Registrar usuário
    console.log('🔄 Registrando usuário...');
    await registerUser({
      name: 'João Silva',
      email: 'joao@email.com',
      password: 'senha123'
    });

    // 2. Criar uma história
    console.log('🔄 Criando história...');
    const story = await createStory({
      title: 'Minha Primeira História',
      synopsis: 'Uma jornada épica de descoberta...',
      content: 'Era uma vez, em um mundo distante...',
      genres: ['Fantasia'],
      tags: ['aventura', 'magia']
    });

    // 3. Listar histórias públicas
    console.log('🔄 Buscando histórias...');
    const stories = await getStories(1);

    // 4. Buscar dados do usuário
    console.log('🔄 Buscando dados do usuário...');
    const user = await getCurrentUser();

    console.log('🎉 Fluxo completo executado com sucesso!');

  } catch (error) {
    console.error('❌ Erro no fluxo completo:', error);
  }
}

// ==========================================
// EXPORTAR FUNÇÕES PARA USO EM OUTROS ARQUIVOS
// ==========================================
module.exports = {
  registerUser,
  loginUser,
  authenticatedFetch,
  getCurrentUser,
  createStory,
  getStories,
  getStory,
  getUserStories,
  updateStory,
  deleteStory,
  updateUserProfile,
  logout,
  isLoggedIn,
  getStoredUser,
  exemploCompleto
};

// ==========================================
// INSTRUÇÕES PARA USO NO FRONTEND
// ==========================================
/*
1. Copie este arquivo para seu projeto frontend
2. Importe as funções necessárias
3. Use as funções nos seus componentes React

Exemplo em React:

import { registerUser, loginUser, getStories } from './api.js';

function LoginComponent() {
  const handleLogin = async (credentials) => {
    try {
      const result = await loginUser(credentials);
      // Redirecionar ou atualizar estado
    } catch (error) {
      // Mostrar erro
    }
  };

  // ... resto do componente
}

4. Para usar em componentes com hooks:

import { useState, useEffect } from 'react';
import { getStories, isLoggedIn } from './api.js';

function StoriesList() {
  const [stories, setStories] = useState([]);

  useEffect(() => {
    if (isLoggedIn()) {
      getStories().then(data => setStories(data.stories));
    }
  }, []);

  // ... resto do componente
}
*/
