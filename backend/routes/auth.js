const express = require('express');
const router = express.Router();
const { register, login, verify } = require('../controllers/authController');
const auth = require('../middleware/auth');

// POST /api/auth/register
router.post('/register', register);

// POST /api/auth/login
router.post('/login', login);

// GET /api/auth/verify - Verificar token (requer autenticação)
router.get('/verify', auth, verify);

module.exports = router;
