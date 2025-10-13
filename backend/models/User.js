const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

// Sempre usar MongoDB
const userSchema = new mongoose.Schema({
    name: {
      type: String,
      required: [true, 'Nome é obrigatório'],
      trim: true,
      maxlength: [50, 'Nome não pode ter mais de 50 caracteres']
    },
    email: {
      type: String,
      required: [true, 'Email é obrigatório'],
      unique: true,
      lowercase: true,
      match: [
        /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
        'Por favor, insira um email válido'
      ]
    },
    password: {
      type: String,
      required: [true, 'Senha é obrigatória'],
      minlength: [6, 'Senha deve ter pelo menos 6 caracteres'],
      select: false // Não incluir senha nas consultas por padrão
    },
    role: {
      type: String,
      enum: ['reader', 'author'],
      default: 'reader'
    },
    profile: {
      avatar: {
        type: String,
        default: ''
      },
      bio: {
        type: String,
        default: '',
        maxlength: [500, 'Bio não pode ter mais de 500 caracteres']
      }
    },
    stats: {
      storiesRead: {
        type: Number,
        default: 0
      },
      storiesCreated: {
        type: Number,
        default: 0
      }
    }
  }, {
    timestamps: true
  });

  // Middleware para criptografar senha antes de salvar
  userSchema.pre('save', async function(next) {
    if (!this.isModified('password')) return next();

    try {
      const salt = await bcrypt.genSalt(10);
      this.password = await bcrypt.hash(this.password, salt);
      next();
    } catch (error) {
      next(error);
    }
  });

  // Método para comparar senha
  userSchema.methods.comparePassword = async function(candidatePassword) {
    return await bcrypt.compare(candidatePassword, this.password);
  };

  // Método para remover senha da resposta JSON
  userSchema.methods.toJSON = function() {
    const userObject = this.toObject();
    delete userObject.password;
    return userObject;
  };

  User = mongoose.model('User', userSchema);
}

module.exports = User;
