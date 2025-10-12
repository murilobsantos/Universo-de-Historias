const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const app = express();
const PORT = 5001; // Porta diferente para evitar conflito

// Middleware
app.use(cors());
app.use(express.json());

// Dados em memória para testes
let users = [];
let stories = [
  {
    id: 1,
    title: "História de Teste",
    description: "Uma história para testar a API",
    image: "https://picsum.photos/seed/test/800/600",
    author: { username: "TestAuthor", _id: "author1" },
    chapters: [
      {
        id: 1,
        title: "Capítulo 1",
        content: "Conteúdo do capítulo de teste."
      }
    ],
    genres: ["Ficção Científica"],
    tags: ["teste"],
    ratings: { average: 4.5, count: 10 },
    comments: [],
    popularity: 100
  }
];

// Middleware de autenticação simples
const auth = (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');
  if (!token) {
    return res.status(401).json({ message: 'Token não fornecido' });
  }

  try {
    const decoded = jwt.verify(token, 'test-secret-key');
    req.user = users.find(u => u._id === decoded.userId);
    if (!req.user) {
      return res.status(401).json({ message: 'Usuário não encontrado' });
    }
    next();
  } catch (error) {
    res.status(401).json({ message: 'Token inválido' });
  }
};

// Rotas de autenticação
app.post('/api/auth/register', async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Verificar se usuário já existe
    const existingUser = users.find(u => u.email === email || u.username === username);
    if (existingUser) {
      return res.status(400).json({ message: 'Usuário já existe' });
    }

    // Criar usuário
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = {
      _id: Date.now().toString(),
      username,
      email,
      password: hashedPassword,
      role: 'reader',
      profile: { avatar: '', bio: '' },
      stats: { storiesRead: 0, storiesCreated: 0 }
    };

    users.push(user);

    // Gerar token
    const token = jwt.sign({ userId: user._id }, 'test-secret-key', { expiresIn: '7d' });

    res.status(201).json({
      message: 'Usuário criado com sucesso',
      token,
      user: { _id: user._id, username: user.username, profile: user.profile }
    });
  } catch (error) {
    res.status(500).json({ message: 'Erro interno' });
  }
});

app.post('/api/auth/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = users.find(u => u.email === email);

    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ message: 'Credenciais inválidas' });
    }

    const token = jwt.sign({ userId: user._id }, 'test-secret-key', { expiresIn: '7d' });

    res.json({
      message: 'Login realizado',
      token,
      user: { _id: user._id, username: user.username, profile: user.profile }
    });
  } catch (error) {
    res.status(500).json({ message: 'Erro interno' });
  }
});

// Rotas de histórias
app.get('/api/stories', (req, res) => {
  res.json({
    stories: stories.map(s => ({
      _id: s.id,
      title: s.title,
      description: s.description,
      image: s.image,
      author: s.author,
      genres: s.genres,
      tags: s.tags,
      ratings: s.ratings,
      popularity: s.popularity,
      chapterCount: s.chapters.length
    })),
    pagination: { page: 1, limit: 12, total: stories.length, pages: 1 }
  });
});

app.get('/api/stories/:id', (req, res) => {
  const story = stories.find(s => s.id == req.params.id);
  if (!story) {
    return res.status(404).json({ message: 'História não encontrada' });
  }
  res.json(story);
});

// Rota básica
app.get('/', (req, res) => {
  res.json({ message: 'API de Teste do Universo de Historias (Sem MongoDB)' });
});

// Middleware de erro
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Algo deu errado!' });
});

app.listen(PORT, () => {
  console.log(`Servidor de teste rodando na porta ${PORT} (sem MongoDB)`);
});
