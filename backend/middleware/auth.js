const jwt = require('jsonwebtoken');

// Importar User apenas se MongoDB estiver conectado
let User = null;
try {
  if (process.env.MONGODB_URI && process.env.MONGODB_URI !== 'mongodb://localhost:27017/universo-historias') {
    User = require('../models/User');
  }
} catch (error) {
  console.log('Modelo User não carregado no middleware - modo desenvolvimento');
}

// Usuários mock para desenvolvimento sem banco
const mockUsers = [
  {
    _id: 'mock-user-1',
    name: 'Test User',
    email: 'test@example.com',
    password: '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', // password123
    role: 'reader',
    profile: { avatar: '', bio: 'Usuário de teste' },
    stats: { storiesRead: 0, storiesCreated: 0 }
  },
  {
    _id: 'mock-user-2',
    name: 'Test Author',
    email: 'author@example.com',
    password: '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', // password123
    role: 'author',
    profile: { avatar: '', bio: 'Autor de teste' },
    stats: { storiesRead: 0, storiesCreated: 0 }
  }
];

const isMongoDBConnected = () => {
  return process.env.MONGODB_URI && process.env.MONGODB_URI !== 'mongodb://localhost:27017/universo-historias';
};

const auth = async (req, res, next) => {
  try {
    // Verificar se o token foi enviado no header Authorization
    const token = req.header('Authorization')?.replace('Bearer ', '');

    if (!token) {
      return res.status(401).json({
        success: false,
        message: 'Token de autenticação não fornecido'
      });
    }

    // Verificar e decodificar o token
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'universo-historias-secret-key');

    if (isMongoDBConnected()) {
      // Buscar o usuário no banco de dados
      const user = await User.findById(decoded.userId);

      if (!user) {
        return res.status(401).json({
          success: false,
          message: 'Usuário não encontrado'
        });
      }

      // Adicionar usuário à requisição
      req.user = user;
    } else {
      // Modo desenvolvimento - usar usuários mock
      const user = mockUsers.find(u => u._id === decoded.userId);

      if (!user) {
        return res.status(401).json({
          success: false,
          message: 'Usuário não encontrado'
        });
      }

      // Adicionar usuário mock à requisição
      req.user = user;
    }

    next();

  } catch (error) {
    if (error.name === 'JsonWebTokenError') {
      return res.status(401).json({
        success: false,
        message: 'Token inválido'
      });
    }

    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({
        success: false,
        message: 'Token expirado'
      });
    }

    console.error('Erro no middleware de autenticação:', error);
    res.status(500).json({
      success: false,
      message: 'Erro interno do servidor'
    });
  }
};

module.exports = auth;
