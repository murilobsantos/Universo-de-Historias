# 🌌 Universo de Histórias

Uma plataforma completa de compartilhamento e leitura de histórias, construída com React, TypeScript, Node.js e MongoDB.

## 📋 Visão Geral

O **Universo de Histórias** é uma aplicação web full-stack que permite aos usuários criar, compartilhar e ler histórias de forma interativa. O projeto foi desenvolvido como um exercício completo de desenvolvimento web moderno, abrangendo desde o design de UI/UX até a implementação de backend com banco de dados.

## 🚀 Tecnologias Utilizadas

### Frontend
- **React 18** - Biblioteca para construção da interface
- **TypeScript** - Tipagem estática para maior robustez
- **Vite** - Build tool rápido e moderno
- **Tailwind CSS** - Framework CSS utilitário
- **Framer Motion** - Animações e transições
- **React Router** - Roteamento SPA
- **Lucide React** - Ícones modernos

### Backend
- **Node.js** - Runtime JavaScript
- **Express.js** - Framework web minimalista
- **MongoDB Atlas** - Banco de dados NoSQL na nuvem
- **Mongoose** - ODM para MongoDB
- **JWT** - Autenticação baseada em tokens
- **bcryptjs** - Hashing de senhas

### DevOps & Tools
- **ESLint** - Linting de código
- **PostCSS** - Processamento CSS
- **Autoprefixer** - Prefixos CSS automáticos

## 🏗️ Arquitetura do Projeto

```
universo-de-historias/
├── src/                          # Código fonte frontend
│   ├── components/               # Componentes reutilizáveis
│   ├── pages/                    # Páginas da aplicação
│   ├── contexts/                 # Contextos React (Auth, Theme)
│   ├── hooks/                    # Hooks customizados
│   ├── services/                 # Serviços (API, interações)
│   ├── types/                    # Definições TypeScript
│   ├── data/                     # Dados mock
│   └── assets/                   # Imagens e ícones
├── backend/                      # Código fonte backend
│   ├── controllers/              # Controladores da API
│   ├── models/                   # Modelos Mongoose
│   ├── routes/                   # Rotas da API
│   ├── middleware/               # Middlewares customizados
│   └── config/                   # Configurações
├── public/                       # Assets estáticos
└── dist/                         # Build de produção
```

## ✨ Funcionalidades Implementadas

### 👤 Sistema de Autenticação
- **Registro de Autores e Leitores** com validação
- **Login seguro** com JWT
- **Verificação automática** de tokens
- **Redirecionamento inteligente** baseado no papel do usuário

### 📚 Gestão de Histórias
- **Criação de histórias** com capítulos
- **Leitura interativa** com comentários por parágrafo
- **Sistema de comentários** colapsável
- **Avaliação por estrelas** para capítulos
- **Favoritos e interações**

### 🎨 Interface do Usuário
- **Design responsivo** para desktop e mobile
- **Modo escuro/claro** com persistência
- **Animações suaves** com Framer Motion
- **Leitura contínua** sem interrupções visuais
- **Navegação intuitiva**

### 🔧 Backend API
- **RESTful API** completa
- **Autenticação JWT** em todas as rotas protegidas
- **Validação de dados** com Mongoose
- **Tratamento de erros** consistente
- **Documentação de endpoints**

## 🚀 Como Executar o Projeto

### Pré-requisitos
- Node.js 18+
- npm ou yarn
- Conta MongoDB Atlas (ou MongoDB local)

### Instalação e Execução

1. **Clone o repositório**
   ```bash
   git clone <repository-url>
   cd universo-de-historias
   ```

2. **Configure o Backend**
   ```bash
   cd backend
   npm install
   cp .env.example .env
   # Edite .env com suas configurações MongoDB
   npm start
   ```

3. **Configure o Frontend**
   ```bash
   cd ..
   npm install
   npm run dev
   ```

4. **Acesse a aplicação**
   - Frontend: http://localhost:5173
   - Backend: http://localhost:3000

## 📱 Componentes Principais

### Frontend Components
- **Header**: Navegação principal com autenticação
- **ChapterReader**: Leitor de capítulos com comentários
- **StoryCard**: Card de exibição de histórias
- **AuthContext**: Gerenciamento global de autenticação
- **Modal**: Componente reutilizável para diálogos

### Backend Models
- **User**: Modelo de usuário (author/reader)
- **Story**: Modelo de história com capítulos
- **Comment**: Sistema de comentários

## 🔗 API Endpoints

### Autenticação
- `POST /api/auth/register` - Registro de usuário
- `POST /api/auth/login` - Login
- `GET /api/auth/verify` - Verificação de token

### Histórias
- `GET /api/stories` - Listar histórias
- `POST /api/stories` - Criar história
- `GET /api/stories/:id` - Detalhes da história
- `PUT /api/stories/:id` - Atualizar história
- `DELETE /api/stories/:id` - Deletar história

### Usuários
- `GET /api/users/profile` - Perfil do usuário
- `PUT /api/users/profile` - Atualizar perfil

## 🎯 Melhorias Recentes

### v1.2.0 - UX/UI Enhancements
- ✅ **Leitura Contínua**: Removido bordas e espaçamento entre parágrafos
- ✅ **Comentários Colapsáveis**: Toggle para mostrar/ocultar comentários
- ✅ **Autenticação Refatorada**: AuthContext global com redirecionamentos corretos
- ✅ **Histórias Expandidas**: 5 capítulos completos por história mock

### v1.1.0 - Backend Integration
- ✅ **MongoDB Atlas**: Integração completa com banco na nuvem
- ✅ **JWT Authentication**: Sistema seguro de autenticação
- ✅ **API RESTful**: Endpoints completos para CRUD
- ✅ **Deploy Ready**: Configurado para produção

## 📈 Status do Projeto

### ✅ Concluído
- Interface responsiva e moderna
- Sistema de autenticação completo
- Leitura interativa de histórias
- Backend com MongoDB
- Deploy em produção

### 🚧 Em Desenvolvimento
- Sistema de notificações
- Funcionalidades sociais (seguir usuários)
- Moderação de conteúdo
- Analytics e métricas

### 📋 Próximos Passos
- Implementar testes automatizados
- Otimização de performance
- Funcionalidades avançadas de busca
- Mobile app com React Native

## 🤝 Contribuição

Este projeto foi desenvolvido como um estudo completo de desenvolvimento web moderno. Para contribuir:

1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📄 Licença

Este projeto é distribuído sob a licença MIT. Veja o arquivo `LICENSE` para mais detalhes.

## 🙏 Agradecimentos

- **React Community** pela documentação excepcional
- **MongoDB Atlas** pelo banco de dados gratuito
- **Tailwind CSS** pelo framework incrível
- **Vite** pela experiência de desenvolvimento rápida

---

**Desenvolvido com ❤️ por Murilo santos**

*Última atualização: outubro de 2025*
