# Configuração MongoDB Atlas

## Passos para configurar o MongoDB Atlas:

### 1. Criar conta no MongoDB Atlas
- Acesse: https://www.mongodb.com/atlas
- Crie uma conta gratuita

### 2. Criar um novo cluster
- Clique em "Build a Cluster"
- Escolha o plano gratuito (M0)
- Selecione região (recomendado: AWS / us-east-1)

### 3. Configurar usuário e IP
- Vá para "Database Access" > "Add New Database User"
- Crie um usuário com senha forte
- Vá para "Network Access" > "Add IP Address"
- Adicione `0.0.0.0/0` para permitir acesso de qualquer IP (ou seu IP específico)

### 4. Obter string de conexão
- Vá para "Clusters" > "Connect"
- Escolha "Connect your application"
- Copie a string de conexão

### 5. Atualizar arquivo .env
Edite o arquivo `backend/.env` e substitua a linha MONGODB_URI:

```
MONGODB_URI=mongodb+srv://SEU_USUARIO:SUA_SENHA@cluster0.xxxxx.mongodb.net/universo-historias?retryWrites=true&w=majority
```

### 6. Reiniciar o servidor
```bash
cd backend
node server.js
```

## Exemplo de string de conexão:
```
mongodb+srv://admin:password123@cluster0.abcde.mongodb.net/universo-historias?retryWrites=true&w=majority
```

## Testando a conexão:
Após configurar, teste com:
```bash
curl -X GET http://localhost:3000/api/health
```

Se funcionar, você verá uma resposta JSON confirmando a conexão.
