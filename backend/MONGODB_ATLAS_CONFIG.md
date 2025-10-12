# 🚀 Configuração MongoDB Atlas - Passo a Passo

## Passo 1: Criar Conta no MongoDB Atlas

1. Acesse: https://www.mongodb.com/atlas
2. Clique em "Try Free" (plano gratuito)
3. Preencha seus dados:
   - Email
   - Senha
   - Primeiro nome
   - Último nome
4. Verifique seu email e confirme a conta

## Passo 2: Criar um Cluster Gratuito

1. No dashboard, clique em "Build a Cluster"
2. Escolha o plano **FREE** (M0 Sandbox)
3. Selecione provedor: **AWS**
4. Região: **us-east-1** (Norte da Virgínia) - mais rápido
5. Nome do cluster: `universo-historias-cluster`
6. Clique em "Create Cluster" (leva alguns minutos)

## Passo 3: Configurar Usuário de Banco

1. Vá para **Database Access** (menu lateral esquerdo)
2. Clique em **"Add New Database User"**
3. Método de autenticação: **Password**
4. Username: `universo_admin`
5. Password: `Universo123!` (ou senha forte de sua escolha)
6. Database User Privileges: **Read and write to any database**
7. Clique em **"Add User"**

## Passo 4: Configurar Acesso IP

1. Vá para **Network Access** (menu lateral esquerdo)
2. Clique em **"Add IP Address"**
3. Escolha **"Allow Access from Anywhere"** (0.0.0.0/0)
4. Confirme com **"Confirm"**

## Passo 5: Obter String de Conexão

1. Vá para **Clusters** (menu lateral esquerdo)
2. Clique em **"Connect"** no seu cluster
3. Escolha **"Connect your application"**
4. Driver: **Node.js**
5. Version: **4.1 or later**
6. Copie a string de conexão que aparece

### String de Conexão Exemplo:
```
mongodb+srv://universo_admin:Universo123!@universo-historias-cluster.xxxxx.mongodb.net/?retryWrites=true&w=majority
```

## Passo 6: Atualizar Arquivo .env

Edite o arquivo `backend/.env` e substitua a linha MONGODB_URI:

```env
MONGODB_URI=mongodb+srv://universo_admin:Universo123!@universo-historias-cluster.xxxxx.mongodb.net/universo-historias?retryWrites=true&w=majority
```

**IMPORTANTE:** Substitua `xxxxx` pela parte real da sua string de conexão.

## Passo 7: Testar Conexão

Após configurar, reinicie o servidor:

```bash
cd backend
node server.js
```

Teste a conexão:
```bash
curl http://localhost:3000/api/health
```

Se funcionar, você verá uma resposta JSON confirmando a conexão com MongoDB.

## 📋 Checklist de Configuração

- [ ] Conta criada no MongoDB Atlas
- [ ] Cluster gratuito criado (M0)
- [ ] Usuário `universo_admin` criado
- [ ] Acesso IP configurado (0.0.0.0/0)
- [ ] String de conexão copiada
- [ ] Arquivo `.env` atualizado
- [ ] Servidor reiniciado
- [ ] Conexão testada com sucesso

## 🔧 Troubleshooting

### Erro: "Authentication failed"
- Verifique se o usuário e senha estão corretos
- Certifique-se que o usuário tem permissões "Read and write"

### Erro: "IP not allowed"
- Vá para Network Access e adicione 0.0.0.0/0

### Erro: "Cluster not found"
- Aguarde alguns minutos após criar o cluster
- Verifique se o nome do cluster está correto na string

### Erro: "Connection timed out"
- Verifique sua conexão com internet
- Tente uma região diferente (us-east-2)

## 💡 Dicas de Segurança

- **Para produção:** Restrinja o IP para apenas o servidor de produção
- **Mude a senha:** Use uma senha mais forte e única
- **Backup:** Configure backups automáticos no Atlas
- **Monitoramento:** Ative alertas de uso

## 🎯 Próximo Passo

Após configurar o MongoDB Atlas, você pode:
1. Testar todos os endpoints da API
2. Fazer deploy do backend no Railway/Render
3. Integrar com o frontend no Netlify

**String de conexão pronta para uso:**
```
mongodb+srv://universo_admin:Universo123!@universo-historias-cluster.xxxxx.mongodb.net/universo-historias?retryWrites=true&w=majority
