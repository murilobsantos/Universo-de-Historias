const express = require('express');
const router = express.Router();
const {
  createStory,
  getStories,
  getStory,
  getUserStories,
  updateStory,
  deleteStory
} = require('../controllers/storyController');
const auth = require('../middleware/auth');

// GET /api/stories - Listar histórias públicas
router.get('/', getStories);

// GET /api/stories/:id - Obter história específica
router.get('/:id', getStory);

// Rotas protegidas (requerem autenticação)
router.use(auth);

// POST /api/stories - Criar nova história
router.post('/', createStory);

// GET /api/stories/user/me - Obter histórias do usuário logado
router.get('/user/me', getUserStories);

// PUT /api/stories/:id - Atualizar história
router.put('/:id', updateStory);

// DELETE /api/stories/:id - Excluir história
router.delete('/:id', deleteStory);

module.exports = router;
