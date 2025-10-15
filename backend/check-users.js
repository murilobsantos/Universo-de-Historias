require('dotenv').config();
const mongoose = require('mongoose');

async function checkUsers() {
  try {
    console.log('🔄 Verificando usuários no banco...');
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/universo-historias');
    console.log('✅ Conectado!');

    const User = require('./models/User');

    const users = await User.find({}, 'name email role createdAt');
    console.log('👥 Usuários encontrados:', users.length);
    users.forEach(user => {
      console.log(`- ${user.name} (${user.email}) - ${user.role} - ${user.createdAt}`);
    });

    await mongoose.connection.close();
    console.log('🔌 Conexão fechada.');
  } catch (error) {
    console.error('❌ Erro:', error.message);
  }
}

checkUsers();
