require('dotenv').config();
console.log('🔧 Carregando variáveis de ambiente...');
console.log('MONGODB_URI:', process.env.MONGODB_URI ? 'Configurada' : 'Não configurada');
console.log('PORT:', process.env.PORT || '3000 (padrão)');
console.log('FRONTEND_URL:', process.env.FRONTEND_URL || 'http://localhost:5173 (padrão)');

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const connectDB = require('./config/database');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware CORS - aplicado imediatamente
app.use((req, res, next) => {
  const origin = req.headers.origin;

  // Sempre definir os headers CORS
  res.header('Access-Control-Allow-Origin', origin || '*');
  res.header('Access-Control-Allow-Credentials', 'true');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS, PATCH');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization, Cache-Control, X-Access-Token, Access-Control-Request-Method, Access-Control-Request-Headers');

  console.log('CORS Request:', {
    origin: origin,
    method: req.method,
    path: req.path,
    headers: req.headers['access-control-request-headers']
  });

  if (req.method === 'OPTIONS') {
    console.log('Responding to OPTIONS preflight request');
    res.sendStatus(200);
    return;
  }

  next();
});

// Configuração adicional do CORS para compatibilidade
app.use(cors({
  origin: true, // Permitir todas as origens
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'PATCH'],
  allowedHeaders: ['Origin', 'X-Requested-With', 'Content-Type', 'Accept', 'Authorization', 'Cache-Control', 'X-Access-Token', 'Access-Control-Request-Method', 'Access-Control-Request-Headers']
}));

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
