require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const connectDB = require('./config/database');

const app = express();
const PORT = process.env.PORT || 3000;

// ✅ 1) Responder preflight OPTIONS antes de qualquer outra rota ou middleware
app.use((req, res, next) => {
  // Permitir múltiplas origens
  const allowedOrigins = [
    'https://thunderous-fenglisu-5d72ea.netlify.app',
    'http://localhost:5173',
    'http://localhost:3000',
    'https://universo-de-historias.netlify.app'
  ];

  const origin = req.headers.origin;
  if (allowedOrigins.includes(origin)) {
    res.header('Access-Control-Allow-Origin', origin);
  }

  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS, PATCH');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Requested-With, Accept, Origin');
  res.header('Access-Control-Allow-Credentials', 'true');

  if (req.method === 'OPTIONS') {
    return res.sendStatus(200);
  }

  next();
});

// ✅ 2) Middleware cors simples para compatibilidade extra
const cors = require('cors');
app.use(cors({
  origin: function (origin, callback) {
    const allowedOrigins = [
      'https://thunderous-fenglisu-5d72ea.netlify.app',
      'http://localhost:5173',
      'http://localhost:3000',
      'https://universo-de-historias.netlify.app'
    ];

    // Permitir requests sem origin (como mobile apps ou curl)
    if (!origin) return callback(null, true);

    if (allowedOrigins.includes(origin)) {
      return callback(null, true);
    } else {
      return callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true
}));

// ✅ 3) Middleware body-parser
app.use(bodyParser.json({ limit: '10mb' }));
app.use(bodyParser.urlencoded({ extended: true, limit: '10mb' }));

// Função para iniciar o servidor após conectar ao banco
const startServer = async () => {
  // Conectar ao banco de dados (apenas se MONGODB_URI estiver configurada)
  if (process.env.MONGODB_URI && process.env.MONGODB_URI !== 'mongodb://localhost:27017/universo-historias') {
    console.log('🔄 Conectando ao MongoDB...');
    await connectDB();
    console.log('✅ Conexão com MongoDB estabelecida.');
  } else {
    console.log('⚠️  MongoDB não configurado. Usando modo desenvolvimento sem banco de dados.');
    console.log('📝 Para configurar MongoDB Atlas, siga as instruções em MONGODB_SETUP.md');
  }

  // Importar rotas após conexão
  const authRoutes = require('./routes/auth');
  const userRoutes = require('./routes/users');
  const storyRoutes = require('./routes/stories');

  app.use(bodyParser.json({ limit: '10mb' }));
  app.use(bodyParser.urlencoded({ extended: true, limit: '10mb' }));

  // Middleware de logging
  app.use((req, res, next) => {
    console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
    next();
  });

  // Rotas da API
  app.use('/api/auth', authRoutes);
  app.use('/api/users', userRoutes);
  app.use('/api/stories', storyRoutes);

  // Rota de saúde
  app.get('/api/health', (req, res) => {
    res.json({
      success: true,
      message: 'API do Universo de Historias funcionando!',
      timestamp: new Date().toISOString(),
      environment: process.env.NODE_ENV || 'development'
    });
  });

  // Rota básica
  app.get('/', (req, res) => {
    res.json({
      message: 'API do Universo de Historias',
      version: '1.0.0',
      endpoints: {
        auth: '/api/auth',
        users: '/api/users',
        stories: '/api/stories',
        health: '/api/health'
      }
    });
  });

  // Middleware de tratamento de erros
  app.use((err, req, res, next) => {
    console.error('Erro não tratado:', err);

    // Erro de validação do Mongoose
    if (err.name === 'ValidationError') {
      const messages = Object.values(err.errors).map(e => e.message);
      return res.status(400).json({
        success: false,
        message: messages.join(', ')
      });
    }

    // Erro de ID inválido do MongoDB
    if (err.name === 'CastError') {
      return res.status(400).json({
        success: false,
        message: 'ID inválido'
      });
    }

    // Erro de duplicação (email já existe)
    if (err.code === 11000) {
      return res.status(400).json({
        success: false,
        message: 'Email já cadastrado'
      });
    }

    // Erro interno do servidor
    res.status(500).json({
      success: false,
      message: 'Erro interno do servidor'
    });
  });

  // Rota 404
  app.use('*', (req, res) => {
    res.status(404).json({
      success: false,
      message: 'Rota não encontrada'
    });
  });

  // Iniciar servidor
  app.listen(PORT, '0.0.0.0', () => {
    console.log(`🚀 Servidor rodando na porta ${PORT}`);
    console.log(`📱 Frontend: ${process.env.FRONTEND_URL || 'http://localhost:5173'}`);
    console.log(`🔗 API Health: http://localhost:${PORT}/api/health`);
  });
};

// Iniciar aplicação
startServer();
