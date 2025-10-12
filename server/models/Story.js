const mongoose = require('mongoose');

const chapterSchema = new mongoose.Schema({
  id: {
    type: Number,
    required: true
  },
  title: {
    type: String,
    required: true,
    trim: true
  },
  content: {
    type: String,
    required: true
  }
});

const commentSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  text: {
    type: String,
    required: true
  },
  paragraphIndex: {
    type: Number,
    default: -1 // -1 para comentários do capítulo
  },
  rating: {
    type: Number,
    min: 1,
    max: 5
  },
  date: {
    type: Date,
    default: Date.now
  }
});

const storySchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
    maxlength: 200
  },
  description: {
    type: String,
    required: true,
    maxlength: 1000
  },
  image: {
    type: String,
    default: 'https://picsum.photos/seed/default/800/600'
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  chapters: [chapterSchema],
  genres: [{
    type: String,
    enum: ['Ficção Científica', 'Fantasia', 'Romance', 'Mistério', 'Aventura', 'Terror', 'Drama', 'Suspense']
  }],
  tags: [String],
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
  comments: [commentSchema],
  popularity: {
    type: Number,
    default: 0
  },
  status: {
    type: String,
    enum: ['draft', 'published', 'archived'],
    default: 'draft'
  },
  views: {
    type: Number,
    default: 0
  },
  likes: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }],
  favorites: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }]
}, {
  timestamps: true
});

// Índices para busca
storySchema.index({ title: 'text', description: 'text', tags: 'text' });
storySchema.index({ genres: 1 });
storySchema.index({ popularity: -1 });
storySchema.index({ 'ratings.average': -1 });
storySchema.index({ createdAt: -1 });

// Método para calcular rating médio
storySchema.methods.updateAverageRating = function() {
  const chapterComments = this.comments.filter(c => c.paragraphIndex === -1 && c.rating);
  if (chapterComments.length === 0) {
    this.ratings.average = 0;
    this.ratings.count = 0;
    return;
  }

  const sum = chapterComments.reduce((acc, comment) => acc + comment.rating, 0);
  this.ratings.average = sum / chapterComments.length;
  this.ratings.count = chapterComments.length;
};

// Método para obter preview
storySchema.methods.getPreview = function() {
  return {
    _id: this._id,
    title: this.title,
    description: this.description,
    image: this.image,
    author: this.author,
    genres: this.genres,
    tags: this.tags,
    ratings: this.ratings,
    popularity: this.popularity,
    chapterCount: this.chapters.length,
    createdAt: this.createdAt,
    updatedAt: this.updatedAt
  };
};

module.exports = mongoose.model('Story', storySchema);
