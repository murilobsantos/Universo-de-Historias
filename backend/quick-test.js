require('dotenv').config();
const mongoose = require('mongoose');

console.log('🔄 Testando conexão rápida...');
console.log('URI:', process.env.MONGODB_URI);

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log('✅ Conexão bem-sucedida!');
  return mongoose.connection.close();
})
.then(() => {
  console.log('🔌 Conexão fechada.');
  process.exit(0);
})
.catch((error) => {
  console.error('❌ Erro:', error.message);
  process.exit(1);
});
