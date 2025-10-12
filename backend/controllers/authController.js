const jwt = require('jsonwebtoken');
const fs = require('fs');
const path = require('path');

// Importar User apenas se MongoDB estiver conectado
let User = null;
try {
  if (process.env.MONGODB_URI && process.env.MONGODB_URI !== 'mongodb://localhost:27017/universo-historias') {
    User = require('../models/User');
  }
} catch (error) {
  console.log('Modelo User não carregado - modo desenvolvimento');
}

// Arquivo para persistir usuários mock
const mockUsersFile = path.join(__dirname, '../mock-users.json');

// Carregar usuários mock do arquivo
let mockUsers = [];
try {
  if (fs.existsSync(mockUsersFile)) {
    const data = fs.readFileSync(mockUsersFile, 'utf8');
    mockUsers = JSON.parse(data);
  } else {
    // Usuários mock iniciais
    mockUsers = [
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
    // Salvar arquivo inicial
    fs.writeFileSync(mockUsersFile, JSON.stringify(mockUsers, null, 2));
  }
} catch (error) {
  console.log('Erro ao carregar usuários mock:', error.message);
  mockUsers = [];
}

// Função para salvar usuários mock
const saveMockUsers = () => {
  try {
    fs.writeFileSync(mockUsersFile, JSON.stringify(mockUsers, null, 2));
  } catch (error) {
    console.log('Erro ao salvar usuários mock:', error.message);
  }
};

const isMongoDBConnected = () => {
  return process.env.MONGODB_URI && process.env.MONGODB_URI !== 'mongodb://localhost:27017/universo-historias';
};

const generateToken = (userId) => {
  return jwt.sign(
    { userId },
    process.env.JWT_SECRET || 'universo-historias-secret-key',
    { expiresIn: '7d' }
  );
};

const register = async (req, res) => {
  try {
    const { name, email, password, role = 'reader' } = req.body;

    // Validações básicas
    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Nome, email e senha são obrigatórios'
      });
    }

    if (password.length < 6) {
      return res.status(400).json({
        success: false,
        message: 'Senha deve ter pelo menos 6 caracteres'
      });
    }

    if (isMongoDBConnected()) {
      // Usar MongoDB
      const existingUser = await User.findOne({ email: email.toLowerCase() });
      if (existingUser) {
        return res.status(400).json({
          success: false,
          message: 'Email já cadastrado'
        });
      }

      const user = new User({
        name: name.trim(),
        email: email.toLowerCase().trim(),
        password,
        role
      });

      await user.save();

      const token = generateToken(user._id);

      return res.status(201).json({
        success: true,
        message: 'Usuário criado com sucesso',
        token,
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
          profile: user.profile,
          stats: user.stats
        }
      });
    } else {
      // Modo desenvolvimento - simular registro
      const existingUser = mockUsers.find(u => u.email === email.toLowerCase());
      if (existingUser) {
        return res.status(400).json({
          success: false,
          message: 'Email já cadastrado'
        });
      }

      const newUser = {
        _id: `mock-user-${Date.now()}`,
        name: name.trim(),
        email: email.toLowerCase().trim(),
        password: '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', // password123
        role,
        profile: { avatar: '', bio: '' },
        stats: { storiesRead: 0, storiesCreated: 0 }
      };

      mockUsers.push(newUser);
      saveMockUsers(); // Salvar no arquivo
      const token = generateToken(newUser._id);

      return res.status(201).json({
        success: true,
        message: 'Usuário criado com sucesso (modo desenvolvimento)',
        token,
        user: {
          id: newUser._id,
          name: newUser.name,
          email: newUser.email,
          role: newUser.role,
          profile: newUser.profile,
          stats: newUser.stats
        }
      });
    }

  } catch (error) {
    console.error('Erro no registro:', error);

    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map(err => err.message);
      return res.status(400).json({
        success: false,
        message: messages.join(', ')
      });
    }

    res.status(500).json({
      success: false,
      message: 'Erro interno do servidor'
    });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validações básicas
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Email e senha são obrigatórios'
      });
    }

    if (isMongoDBConnected()) {
      // Usar MongoDB
      const user = await User.findOne({ email: email.toLowerCase() }).select('+password');
      if (!user) {
        return res.status(401).json({
          success: false,
          message: 'Email ou senha incorretos'
        });
      }

      const isPasswordValid = await user.comparePassword(password);
      if (!isPasswordValid) {
        return res.status(401).json({
          success: false,
          message: 'Email ou senha incorretos'
        });
      }

      const token = generateToken(user._id);

      return res.json({
        success: true,
        message: 'Login realizado com sucesso',
        token,
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
          profile: user.profile,
          stats: user.stats
        }
      });
    } else {
      // Modo desenvolvimento - usar usuários mock
      const user = mockUsers.find(u => u.email === email.toLowerCase());
      if (!user || password !== 'password123') {
        return res.status(401).json({
          success: false,
          message: 'Email ou senha incorretos'
        });
      }

      const token = generateToken(user._id);

      return res.json({
        success: true,
        message: 'Login realizado com sucesso (modo desenvolvimento)',
        token,
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
          profile: user.profile,
          stats: user.stats
        }
      });
    }

  } catch (error) {
    console.error('Erro no login:', error);
    res.status(500).json({
      success: false,
      message: 'Erro interno do servidor'
    });
  }
};

const verify = async (req, res) => {
  try {
    // O middleware auth já verificou o token e colocou o usuário em req.user
    const user = req.user;

    if (isMongoDBConnected()) {
      // Usar dados do MongoDB
      return res.json({
        success: true,
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
          profile: user.profile,
          stats: user.stats
        }
      });
    } else {
      // Modo desenvolvimento - usar dados mock
      const mockUser = mockUsers.find(u => u._id === user._id) || user;
      return res.json({
        success: true,
        user: {
          id: mockUser._id,
          name: mockUser.name,
          email: mockUser.email,
          role: mockUser.role,
          profile: mockUser.profile,
          stats: mockUser.stats
        }
      });
    }

  } catch (error) {
    console.error('Erro na verificação:', error);
    res.status(500).json({
      success: false,
      message: 'Erro interno do servidor'
    });
  }
};

module.exports = {
  register,
  login,
  verify
};
