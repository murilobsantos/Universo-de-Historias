const mongoose = require('mongoose');

const chapterSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Título do capítulo é obrigatório'],
    trim: true,
    maxlength: [100, 'Título não pode ter mais de 100 caracteres']
  },
  content: {
    type: String,
    required: [true, 'Conteúdo do capítulo é obrigatório'],
    minlength: [100, 'Conteúdo deve ter pelo menos 100 caracteres']
  },
  order: {
    type: Number,
    default: 1
  }
}, { timestamps: true });

const storySchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Título é obrigatório'],
    trim: true,
    maxlength: [100, 'Título não pode ter mais de 100 caracteres']
  },
  synopsis: {
    type: String,
    required: [true, 'Sinopse é obrigatória'],
    trim: true,
    maxlength: [500, 'Sinopse não pode ter mais de 500 caracteres']
  },
  content: {
    type: String,
    required: [true, 'Conteúdo é obrigatório'],
    minlength: [500, 'Conteúdo deve ter pelo menos 500 caracteres']
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'Autor é obrigatório']
  },
  chapters: [chapterSchema],
  genres: [{
    type: String,
    enum: ['Fantasia', 'Ficção Científica', 'Romance', 'Terror', 'Mistério', 'Aventura', 'Drama', 'Comédia'],
    required: true
  }],
  tags: [{
    type: String,
    trim: true,
    lowercase: true
  }],
  status: {
    type: String,
    enum: ['draft', 'published', 'completed'],
    default: 'draft'
  },
  ratings: {
    average: {
      type: Number,
      default: 0,
      min: 0,
      max: 5
    },
    count: {
      type: Number,
      default: 0
    }
  },
  comments: [{
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    content: {
      type: String,
      required: true,
      maxlength: [1000, 'Comentário não pode ter mais de 1000 caracteres']
    },
    rating: {
      type: Number,
      min: 1,
      max: 5
    },
    chapterIndex: {
      type: Number,
      default: -1 // -1 para comentários gerais da história
    }
  }],
  views: {
    type: Number,
    default: 0
  },
  likes: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }],
  image: {
    type: String,
    default: ''
  }
}, {
  timestamps: true
});

// Índices para melhor performance
storySchema.index({ title: 'text', synopsis: 'text', content: 'text' });
storySchema.index({ author: 1 });
storySchema.index({ genres: 1 });
storySchema.index({ status: 1 });
storySchema.index({ 'ratings.average': -1 });
storySchema.index({ views: -1 });
storySchema.index({ createdAt: -1 });

// Middleware para atualizar estatísticas do autor
storySchema.post('save', async function() {
  const User = mongoose.model('User');
  await User.findByIdAndUpdate(this.author, {
    $inc: { 'stats.storiesCreated': 1 }
  });
});

// Método para calcular rating médio
storySchema.methods.calculateAverageRating = function() {
  if (this.comments.length === 0) {
    this.ratings.average = 0;
    this.ratings.count = 0;
    return;
  }

  const ratings = this.comments
    .filter(comment => comment.rating)
    .map(comment => comment.rating);

  if (ratings.length === 0) {
    this.ratings.average = 0;
    this.ratings.count = 0;
    return;
  }

  this.ratings.average = ratings.reduce((sum, rating) => sum + rating, 0) / ratings.length;
  this.ratings.count = ratings.length;
};

module.exports = mongoose.model('Story', storySchema);
