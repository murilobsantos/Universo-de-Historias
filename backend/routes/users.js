const express = require('express');
const router = express.Router();
const { getUser, updateUser, getUserStats } = require('../controllers/userController');
const auth = require('../middleware/auth');

// GET /api/users/me - Obter dados do usuário logado
router.get('/me', auth, getUser);

// PUT /api/users/me - Atualizar dados do usuário logado
router.put('/me', auth, updateUser);

// GET /api/users/me/stats - Obter estatísticas do usuário logado
router.get('/me/stats', auth, getUserStats);

module.exports = router;
