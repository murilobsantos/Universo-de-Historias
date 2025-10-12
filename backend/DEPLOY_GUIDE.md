# 🚀 Guia de Deploy - Universo de Historias

## Configuração MongoDB Atlas

### 1. Criar conta e cluster
- Acesse: https://www.mongodb.com/atlas
- Crie conta gratuita
- Build a Cluster (plano M0 gratuito)
- Região: AWS us-east-1

### 2. Configurar acesso
- **Database Access**: Crie usuário com senha forte
- **Network Access**: Adicione IP `0.0.0.0/0` (todos IPs)

### 3. Obter connection string
- Clusters > Connect > Connect your application
- Copie a string: `mongodb+srv://user:pass@cluster.mongodb.net/dbname`

### 4. Atualizar .env
```env
MONGODB_URI=mongodb+srv://usuario:senha@cluster0.xxxxx.mongodb.net/universo-historias?retryWrites=true&w=majority
FRONTEND_URL=https://thunderous-fenglisu-5d72ea.netlify.app
```

## Deploy do Backend

### Opção 1: Railway (Recomendado)
1. Acesse: https://railway.app
2. Connect GitHub repo
3. Configure variáveis de ambiente
4. Deploy automático

### Opção 2: Render
1. Acesse: https://render.com
2. New > Web Service
3. Connect GitHub
4. Build Command: `npm install`
5. Start Command: `node server.js`

### Opção 3: Heroku
1. Instalar Heroku CLI
2. `heroku create nome-do-app`
3. `heroku config:set MONGODB_URI="sua_string"`
4. `git push heroku main`

## Integração Frontend ↔ Backend

### 1. Atualizar URLs no Frontend
No arquivo `src/services/api.js` ou similar:
```javascript
const API_BASE_URL = process.env.NODE_ENV === 'production'
  ? 'https://sua-api-railway.up.railway.app'
  : 'http://localhost:3000';
```

### 2. Configurar CORS
Backend já configurado para aceitar:
- Desenvolvimento: `http://localhost:5173`
- Produção: `https://thunderous-fenglisu-5d72ea.netlify.app`

### 3. Testar integração
```bash
# Health check
curl https://sua-api-url.com/api/health

# Teste de registro
curl -X POST https://sua-api-url.com/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"name":"Test","email":"test@netlify.app","password":"123456"}'
```

## Monitoramento

- **Railway/Render**: Logs em tempo real no dashboard
- **MongoDB Atlas**: Monitor de conexões e performance
- **Netlify**: Logs de deploy e funções

## Troubleshooting

### Erro de CORS
- Verifique `FRONTEND_URL` no .env
- Certifique-se que o domínio está correto

### Erro MongoDB
- Verifique string de conexão
- Confirme usuário e senha
- Verifique whitelist de IPs

### Erro JWT
- Mantenha `JWT_SECRET` consistente
- Tokens expiram em 7 dias por padrão

## URLs de Produção

Após deploy:
- **Frontend**: https://thunderous-fenglisu-5d72ea.netlify.app
- **Backend**: https://sua-api.up.railway.app
- **MongoDB**: cluster0.xxxxx.mongodb.net

## Próximos Passos

1. ✅ Configurar MongoDB Atlas
2. ✅ Deploy do backend
3. ✅ Testar integração
4. 🔄 Atualizar frontend para usar API de produção
5. 🔄 Testes end-to-end
6. 🔄 Monitoramento e otimização
