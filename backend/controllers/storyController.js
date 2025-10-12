const Story = require('../models/Story');
const User = require('../models/User');

const createStory = async (req, res) => {
  try {
    const { title, synopsis, content, genres, tags, image } = req.body;
    const authorId = req.user._id;

    // Validações básicas
    if (!title || !synopsis || !content) {
      return res.status(400).json({
        success: false,
        message: 'Título, sinopse e conteúdo são obrigatórios'
      });
    }

    if (!genres || !Array.isArray(genres) || genres.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'Pelo menos um gênero deve ser selecionado'
      });
    }

    // Criar nova história
    const story = new Story({
      title: title.trim(),
      synopsis: synopsis.trim(),
      content: content.trim(),
      author: authorId,
      genres,
      tags: tags || [],
      image: image || ''
    });

    await story.save();

    // Buscar a história com dados do autor populados
    const savedStory = await Story.findById(story._id).populate('author', 'name email profile');

    res.status(201).json({
      success: true,
      message: 'História criada com sucesso',
      story: savedStory
    });

  } catch (error) {
    console.error('Erro ao criar história:', error);

    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map(err => err.message);
      return res.status(400).json({
        success: false,
        message: messages.join(', ')
      });
    }

    res.status(500).json({
      success: false,
      message: 'Erro interno do servidor'
    });
  }
};

const getStories = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 12;
    const skip = (page - 1) * limit;

    // Filtros
    const filter = { status: 'published' };

    if (req.query.genre) {
      filter.genres = req.query.genre;
    }

    if (req.query.search) {
      filter.$text = { $search: req.query.search };
    }

    // Ordenação
    let sort = { createdAt: -1 }; // Mais recentes primeiro
    if (req.query.sort === 'popular') {
      sort = { views: -1 };
    } else if (req.query.sort === 'rating') {
      sort = { 'ratings.average': -1 };
    }

    const stories = await Story.find(filter)
      .populate('author', 'name profile')
      .sort(sort)
      .skip(skip)
      .limit(limit)
      .select('-comments'); // Excluir comentários para performance

    const total = await Story.countDocuments(filter);

    res.json({
      success: true,
      stories,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      }
    });

  } catch (error) {
    console.error('Erro ao buscar histórias:', error);
    res.status(500).json({
      success: false,
      message: 'Erro interno do servidor'
    });
  }
};

const getStory = async (req, res) => {
  try {
    const { id } = req.params;

    const story = await Story.findById(id)
      .populate('author', 'name email profile')
      .populate('comments.user', 'name profile');

    if (!story) {
      return res.status(404).json({
        success: false,
        message: 'História não encontrada'
      });
    }

    // Incrementar visualizações se não for o autor
    if (req.user && req.user._id.toString() !== story.author._id.toString()) {
      await Story.findByIdAndUpdate(id, { $inc: { views: 1 } });
    }

    res.json({
      success: true,
      story
    });

  } catch (error) {
    console.error('Erro ao buscar história:', error);

    if (error.name === 'CastError') {
      return res.status(400).json({
        success: false,
        message: 'ID da história inválido'
      });
    }

    res.status(500).json({
      success: false,
      message: 'Erro interno do servidor'
    });
  }
};

const getUserStories = async (req, res) => {
  try {
    const authorId = req.user._id;
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const stories = await Story.find({ author: authorId })
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .select('-comments'); // Excluir comentários para performance

    const total = await Story.countDocuments({ author: authorId });

    res.json({
      success: true,
      stories,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      }
    });

  } catch (error) {
    console.error('Erro ao buscar histórias do usuário:', error);
    res.status(500).json({
      success: false,
      message: 'Erro interno do servidor'
    });
  }
};

const updateStory = async (req, res) => {
  try {
    const { id } = req.params;
    const authorId = req.user._id;
    const updates = req.body;

    // Verificar se a história existe e pertence ao usuário
    const story = await Story.findOne({ _id: id, author: authorId });

    if (!story) {
      return res.status(404).json({
        success: false,
        message: 'História não encontrada ou você não tem permissão para editá-la'
      });
    }

    // Campos que podem ser atualizados
    const allowedUpdates = ['title', 'synopsis', 'content', 'genres', 'tags', 'image', 'status'];
    const updateFields = {};

    Object.keys(updates).forEach(key => {
      if (allowedUpdates.includes(key)) {
        updateFields[key] = updates[key];
      }
    });

    const updatedStory = await Story.findByIdAndUpdate(
      id,
      updateFields,
      { new: true, runValidators: true }
    ).populate('author', 'name profile');

    res.json({
      success: true,
      message: 'História atualizada com sucesso',
      story: updatedStory
    });

  } catch (error) {
    console.error('Erro ao atualizar história:', error);

    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map(err => err.message);
      return res.status(400).json({
        success: false,
        message: messages.join(', ')
      });
    }

    res.status(500).json({
      success: false,
      message: 'Erro interno do servidor'
    });
  }
};

const deleteStory = async (req, res) => {
  try {
    const { id } = req.params;
    const authorId = req.user._id;

    // Verificar se a história existe e pertence ao usuário
    const story = await Story.findOneAndDelete({ _id: id, author: authorId });

    if (!story) {
      return res.status(404).json({
        success: false,
        message: 'História não encontrada ou você não tem permissão para excluí-la'
      });
    }

    // Atualizar estatísticas do autor
    await User.findByIdAndUpdate(authorId, {
      $inc: { 'stats.storiesCreated': -1 }
    });

    res.json({
      success: true,
      message: 'História excluída com sucesso'
    });

  } catch (error) {
    console.error('Erro ao excluir história:', error);
    res.status(500).json({
      success: false,
      message: 'Erro interno do servidor'
    });
  }
};

module.exports = {
  createStory,
  getStories,
  getStory,
  getUserStories,
  updateStory,
  deleteStory
};
