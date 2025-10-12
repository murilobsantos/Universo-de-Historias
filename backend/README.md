# Backend - Universo de Historias

API REST completa para o sistema de histórias "Universo de Historias", construída com Node.js, Express, MongoDB e JWT.

## 🚀 Funcionalidades

- **Autenticação JWT**: Registro e login de usuários
- **Gerenciamento de Usuários**: Perfil e estatísticas
- **Sistema de Histórias**: CRUD completo de histórias
- **Comentários e Avaliações**: Sistema de feedback
- **Gêneros e Tags**: Categorização de conteúdo
- **Middleware de Segurança**: Validação e proteção de rotas

## 📋 Pré-requisitos

- Node.js (v14 ou superior)
- MongoDB (local ou MongoDB Atlas)
- npm ou yarn

## 🛠️ Instalação

1. **Instalar dependências:**
   ```bash
   cd backend
   npm install
   ```

2. **Configurar variáveis de ambiente:**
   - Copie o arquivo `.env` e ajuste as configurações
   - Configure a URL do MongoDB

3. **Iniciar MongoDB:**
   - Local: `mongod` (porta padrão 27017)
   - Ou configure MongoDB Atlas no `.env`

4. **Iniciar servidor:**
   ```bash
   npm start
   # ou para desenvolvimento:
   npm run dev
   ```

O servidor estará rodando em `http://localhost:3000`

## 📚 Estrutura do Projeto

```
backend/
├── config/
│   └── database.js          # Conexão MongoDB
├── controllers/
│   ├── authController.js    # Autenticação
│   ├── userController.js    # Usuários
│   └── storyController.js   # Histórias
├── middleware/
│   └── auth.js              # JWT Middleware
├── models/
│   ├── User.js              # Modelo de Usuário
│   └── Story.js             # Modelo de História
├── routes/
│   ├── auth.js              # Rotas de auth
│   ├── users.js             # Rotas de usuários
│   └── stories.js           # Rotas de histórias
├── .env                     # Variáveis de ambiente
├── package.json
├── server.js                # Arquivo principal
└── README.md
```

## 🔗 Endpoints da API

### Autenticação

#### `POST /api/auth/register`
Registra um novo usuário.

**Body:**
```json
{
  "name": "João Silva",
  "email": "joao@email.com",
  "password": "senha123"
}
```

**Resposta:**
```json
{
  "success": true,
  "message": "Usuário criado com sucesso",
  "token": "jwt_token_aqui",
  "user": {
    "id": "...",
    "name": "João Silva",
    "email": "joao@email.com",
    "role": "reader"
  }
}
```

#### `POST /api/auth/login`
Faz login do usuário.

**Body:**
```json
{
  "email": "joao@email.com",
  "password": "senha123"
}
```

### Usuários (Rotas Protegidas)

#### `GET /api/users/me`
Retorna dados do usuário logado.

**Headers:**
```
Authorization: Bearer jwt_token_aqui
```

**Resposta:**
```json
{
  "success": true,
  "user": {
    "id": "...",
    "name": "João Silva",
    "email": "joao@email.com",
    "role": "reader",
    "profile": { "avatar": "", "bio": "" },
    "stats": { "storiesRead": 0, "storiesCreated": 0 }
  }
}
```

### Histórias

#### `GET /api/stories`
Lista histórias públicas com paginação.

**Query Params:**
- `page`: Página (padrão: 1)
- `limit`: Itens por página (padrão: 12)
- `genre`: Filtrar por gênero
- `search`: Busca por texto
- `sort`: Ordenação (recent, popular, rating)

#### `GET /api/stories/:id`
Retorna detalhes de uma história específica.

#### `POST /api/stories` (Protegida)
Cria uma nova história.

**Headers:**
```
Authorization: Bearer jwt_token_aqui
```

**Body:**
```json
{
  "title": "Minha História",
  "synopsis": "Uma breve sinopse...",
  "content": "Conteúdo completo da história...",
  "genres": ["Fantasia", "Aventura"],
  "tags": ["magia", "dragões"],
  "image": "url_da_imagem"
}
```

## 🎯 Exemplos de Uso no Frontend

### 1. Registro de Usuário

```javascript
const registerUser = async (userData) => {
  try {
    const response = await fetch('http://localhost:3000/api/auth/register', {
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
      console.log('Usuário registrado:', data.user);
    } else {
      console.error('Erro:', data.message);
    }
  } catch (error) {
    console.error('Erro de rede:', error);
  }
};

// Uso:
registerUser({
  name: 'João Silva',
  email: 'joao@email.com',
  password: 'senha123'
});
```

### 2. Login

```javascript
const loginUser = async (credentials) => {
  try {
    const response = await fetch('http://localhost:3000/api/auth/login', {
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
      console.log('Login realizado:', data.user);
    } else {
      console.error('Erro:', data.message);
    }
  } catch (error) {
    console.error('Erro de rede:', error);
  }
};

// Uso:
loginUser({
  email: 'joao@email.com',
  password: 'senha123'
});
```

### 3. Buscar Dados do Usuário

```javascript
const getUserData = async () => {
  try {
    const token = localStorage.getItem('token');

    const response = await fetch('http://localhost:3000/api/users/me', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });

    const data = await response.json();

    if (data.success) {
      console.log('Dados do usuário:', data.user);
    } else {
      console.error('Erro:', data.message);
    }
  } catch (error) {
    console.error('Erro de rede:', error);
  }
};
```

### 4. Criar História

```javascript
const createStory = async (storyData) => {
  try {
    const token = localStorage.getItem('token');

    const response = await fetch('http://localhost:3000/api/stories', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(storyData)
    });

    const data = await response.json();

    if (data.success) {
      console.log('História criada:', data.story);
    } else {
      console.error('Erro:', data.message);
    }
  } catch (error) {
    console.error('Erro de rede:', error);
  }
};

// Uso:
createStory({
  title: 'A Jornada Épica',
  synopsis: 'Uma aventura incrível através de mundos desconhecidos...',
  content: 'Era uma vez, em um reino distante...',
  genres: ['Fantasia', 'Aventura'],
  tags: ['magia', 'heróis'],
  image: 'https://exemplo.com/imagem.jpg'
});
```

### 5. Listar Histórias

```javascript
const getStories = async (page = 1, genre = null) => {
  try {
    let url = `http://localhost:3000/api/stories?page=${page}`;

    if (genre) {
      url += `&genre=${genre}`;
    }

    const response = await fetch(url);
    const data = await response.json();

    if (data.success) {
      console.log('Histórias:', data.stories);
      console.log('Paginação:', data.pagination);
    } else {
      console.error('Erro:', data.message);
    }
  } catch (error) {
    console.error('Erro de rede:', error);
  }
};
```

## 🔐 Middleware de Autenticação

Todas as rotas protegidas requerem um token JWT válido no header `Authorization`:

```
Authorization: Bearer seu_jwt_token_aqui
```

O token é obtido no login/registro e deve ser armazenado no `localStorage` do navegador.

## 📊 Modelos de Dados

### User
```javascript
{
  name: String,
  email: String (único),
  password: String (criptografado),
  role: String (reader/author),
  profile: {
    avatar: String,
    bio: String
  },
  stats: {
    storiesRead: Number,
    storiesCreated: Number
  }
}
```

### Story
```javascript
{
  title: String,
  synopsis: String,
  content: String,
  author: ObjectId (ref: User),
  genres: [String],
  tags: [String],
  status: String (draft/published/completed),
  ratings: {
    average: Number,
    count: Number
  },
  comments: [{
    user: ObjectId (ref: User),
    content: String,
    rating: Number,
    chapterIndex: Number
  }],
  views: Number,
  likes: [ObjectId],
  image: String
}
```

## 🧪 Testes

Para testar a API, você pode usar ferramentas como:
- **Postman**: Interface gráfica para testar endpoints
- **Insomnia**: Alternativa ao Postman
- **Thunder Client**: Extensão do VS Code
- **curl**: Linha de comando

## 🚀 Deploy

Para produção:
1. Configure variáveis de ambiente seguras
2. Use uma chave JWT forte e única
3. Configure MongoDB Atlas ou servidor MongoDB dedicado
4. Use HTTPS em produção
5. Configure CORS para o domínio do frontend

## 📝 Licença

Este projeto está sob a licença MIT.
