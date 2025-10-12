# 🚀 Deploy Backend no Render - Guia Rápido

## 📋 Pré-requisitos
- Conta no [Render.com](https://render.com) (grátis)
- Conta no [MongoDB Atlas](https://mongodb.com/atlas) (já configurada)
- Repositório no GitHub

## ⚡ Deploy em 5 Minutos

### Passo 1: Preparar arquivos
✅ `render.yaml` - Criado automaticamente
✅ `.env.example` - Template de variáveis
✅ `package.json` - Scripts configurados

### Passo 2: Deploy no Render
1. Acesse [render.com](https://render.com)
2. Clique **New > Blueprint**
3. **Connect** seu repositório GitHub
4. Selecione `Universo de Historias`
5. **Service Group Name**: `universo-historias-backend`
6. **Branch**: `main`
7. Render detectará o `render.yaml` automaticamente

### Passo 3: Configurar Environment Variables
No dashboard do Render, aba **Environment**:

```
MONGODB_URI=mongodb+srv://murilobsantos12_db_user:f9HUsgZqmIqyPMrG@galaxiahistorias.ng2kdle.mongodb.net/
JWT_SECRET=universo-historias-jwt-secret-2024-super-secreto
NODE_ENV=production
```

### Passo 4: Deploy
- Clique **Create Web Service**
- Render fará build automático (~2-3 minutos)
- ✅ **URL gerada**: `https://universo-historias-backend.onrender.com`

## 🧪 Testar Backend

### Health Check
```bash
curl https://universo-historias-backend.onrender.com/api/health
```

### Registrar Usuário
```bash
curl -X POST https://universo-historias-backend.onrender.com/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"name":"Test","email":"test@render.com","password":"123456"}'
```

### Login
```bash
curl -X POST https://universo-historias-backend.onrender.com/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@render.com","password":"123456"}'
```

## 🔗 Próximos Passos

### 1. Deploy Frontend no Netlify
```bash
# Build do frontend
npm run build

# Deploy no Netlify (arrastar pasta dist)
```

### 2. Conectar Frontend ao Backend
No arquivo `src/services/api.js` (ou similar):
```javascript
const API_BASE_URL = process.env.NODE_ENV === 'production'
  ? 'https://universo-historias-backend.onrender.com'
  : 'http://localhost:3000';
```

### 3. Configurar CORS (já feito)
Backend aceita requisições do Netlify automaticamente.

## 📊 Monitoramento

- **Render Dashboard**: Logs em tempo real
- **MongoDB Atlas**: Conexões ativas e performance
- **Uptime**: Render oferece 750h/mês grátis

## 🚨 Troubleshooting

### Erro: "Build failed"
- Verifique se `render.yaml` está na raiz do `backend/`
- Confirme que `package.json` tem `"start": "node server.js"`

### Erro: "MongoDB connection failed"
- Verifique `MONGODB_URI` (não esqueça `/database` no final)
- Confirme usuário/senha no Atlas
- IP whitelist: `0.0.0.0/0`

### Erro: "Port already in use"
- Render usa porta 10000 automaticamente
- Não precisa configurar PORT manualmente

## 💰 Custos

- **Render**: 750h/mês grátis, depois $7/mês
- **MongoDB Atlas**: 512MB grátis (suficiente)
- **Netlify**: Sempre grátis para frontend

## 🎯 Resultado Final

Após deploy:
- ✅ **Backend**: `https://universo-historias-backend.onrender.com`
- ✅ **Frontend**: `https://universo-historias.netlify.app`
- ✅ **Banco**: MongoDB Atlas
- ✅ **100% Funcional**: Registro, login, comentários, histórias

**Seu site estará 100% online e funcional! 🚀**
