// Script para testar conexão com MongoDB Atlas
require('dotenv').config();
const mongoose = require('mongoose');

const testConnection = async () => {
  try {
    console.log('🔄 Testando conexão com MongoDB Atlas...');
    console.log('📋 URI sendo usada:', process.env.MONGODB_URI || 'mongodb://localhost:27017/universo-historias');

    const conn = await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/universo-historias', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log('✅ Conexão bem-sucedida!');
    console.log(`📍 Conectado a: ${conn.connection.host}`);
    console.log(`🗄️  Banco: ${conn.connection.name}`);

    // Testar criação de uma coleção simples
    const Test = mongoose.model('Test', new mongoose.Schema({
      message: String,
      timestamp: { type: Date, default: Date.now }
    }));

    const testDoc = new Test({ message: 'Teste de conexão MongoDB Atlas' });
    await testDoc.save();

    console.log('✅ Teste de escrita bem-sucedido!');

    // Limpar teste
    await Test.deleteMany({});
    console.log('🧹 Dados de teste removidos.');

    // Fechar conexão
    await mongoose.connection.close();
    console.log('🔌 Conexão fechada.');

    console.log('\n🎉 MongoDB Atlas configurado com sucesso!');
    console.log('🚀 Você pode iniciar o servidor: node server.js');

  } catch (error) {
    console.error('❌ Erro na conexão:', error.message);

    if (error.message.includes('authentication failed')) {
      console.log('\n💡 Dica: Verifique usuário e senha no MongoDB Atlas');
    } else if (error.message.includes('getaddrinfo ENOTFOUND')) {
      console.log('\n💡 Dica: Verifique a string de conexão e acesso à internet');
    } else if (error.message.includes('not authorized')) {
      console.log('\n💡 Dica: Verifique as permissões do usuário no Database Access');
    }

    process.exit(1);
  }
};

// Executar teste
testConnection();
