require('dotenv').config();
const mongoose = require('mongoose');

async function cleanTestUsers() {
  try {
    console.log('🔄 Conectando ao MongoDB...');
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/universo-historias');
    console.log('✅ Conectado!');

    const User = require('./models/User');

    // Deletar usuários de teste
    const result = await User.deleteMany({
      $or: [
        { email: { $regex: /test/i } },
        { email: { $regex: /render/i } },
        { email: 'test@example.com' },
        { email: 'murilo@example.com' },
        { name: { $regex: /test/i } }
      ]
    });

    console.log(`🗑️  Deletados ${result.deletedCount} usuários de teste`);

    // Mostrar usuários restantes
    const remaining = await User.find({}, 'name email');
    console.log('👥 Usuários restantes:', remaining.map(u => ({ name: u.name, email: u.email })));

    await mongoose.connection.close();
    console.log('🔌 Conexão fechada.');
  } catch (error) {
    console.error('❌ Erro:', error.message);
  }
}

cleanTestUsers();
