const express = require('express');
const Story = require('../models/Story');
const { auth, optionalAuth, requireRole } = require('../middleware/auth');

const router = express.Router();

// Obter todas as histórias (com paginação e filtros)
router.get('/', optionalAuth, async (req, res) => {
  try {
    const {
      page = 1,
      limit = 12,
      genre,
      tag,
      author,
      sort = 'popularity',
      search
    } = req.query;

    const query = { status: 'published' };

    // Filtros
    if (genre) query.genres = genre;
    if (tag) query.tags = tag;
    if (author) query.author = author;
    if (search) {
      query.$text = { $search: search };
    }

    // Ordenação
    const sortOptions = {
      popularity: { popularity: -1 },
      rating: { 'ratings.average': -1 },
      recent: { createdAt: -1 },
      title: { title: 1 }
    };

    const stories = await Story.find(query)
      .populate('author', 'username profile.avatar')
      .sort(sortOptions[sort] || sortOptions.popularity)
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .select('title description image author genres tags ratings popularity chapterCount createdAt');

    const total = await Story.countDocuments(query);

    res.json({
      stories: stories.map(story => story.getPreview()),
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total,
        pages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    console.error('Erro ao buscar histórias:', error);
    res.status(500).json({ message: 'Erro interno do servidor' });
  }
});

// Obter história por ID
router.get('/:id', optionalAuth, async (req, res) => {
  try {
    const story = await Story.findById(req.params.id)
      .populate('author', 'username profile')
      .populate('comments.user', 'username profile.avatar');

    if (!story || story.status !== 'published') {
      return res.status(404).json({ message: 'História não encontrada' });
    }

    // Incrementar visualizações se não for o autor
    if (!req.user || req.user._id.toString() !== story.author._id.toString()) {
      story.views += 1;
      await story.save();
    }

    res.json(story);
  } catch (error) {
    console.error('Erro ao buscar história:', error);
    res.status(500).json({ message: 'Erro interno do servidor' });
  }
});

// Criar nova história (apenas autores)
router.post('/', auth, requireRole(['author', 'admin']), async (req, res) => {
  try {
    const story = new Story({
      ...req.body,
      author: req.user._id
    });

    await story.save();

    // Atualizar estatísticas do autor
    req.user.stats.storiesCreated += 1;
    await req.user.save();

    res.status(201).json(story);
  } catch (error) {
    console.error('Erro ao criar história:', error);
    res.status(500).json({ message: 'Erro interno do servidor' });
  }
});

// Atualizar história (apenas autor ou admin)
router.put('/:id', auth, async (req, res) => {
  try {
    const story = await Story.findById(req.params.id);

    if (!story) {
      return res.status(404).json({ message: 'História não encontrada' });
    }

    // Verificar permissões
    if (story.author.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Permissão insuficiente' });
    }

    Object.assign(story, req.body);
    await story.save();

    res.json(story);
  } catch (error) {
    console.error('Erro ao atualizar história:', error);
    res.status(500).json({ message: 'Erro interno do servidor' });
  }
});

// Deletar história (apenas autor ou admin)
router.delete('/:id', auth, async (req, res) => {
  try {
    const story = await Story.findById(req.params.id);

    if (!story) {
      return res.status(404).json({ message: 'História não encontrada' });
    }

    // Verificar permissões
    if (story.author.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Permissão insuficiente' });
    }

    await story.remove();

    // Atualizar estatísticas do autor
    req.user.stats.storiesCreated -= 1;
    await req.user.save();

    res.json({ message: 'História deletada com sucesso' });
  } catch (error) {
    console.error('Erro ao deletar história:', error);
    res.status(500).json({ message: 'Erro interno do servidor' });
  }
});

// Adicionar comentário
router.post('/:id/comments', auth, async (req, res) => {
  try {
    const { text, paragraphIndex = -1, rating } = req.body;
    const story = await Story.findById(req.params.id);

    if (!story) {
      return res.status(404).json({ message: 'História não encontrada' });
    }

    const comment = {
      user: req.user._id,
      text,
      paragraphIndex,
      rating: rating ? parseInt(rating) : undefined
    };

    story.comments.push(comment);

    // Atualizar rating médio se for comentário do capítulo
    if (paragraphIndex === -1 && rating) {
      story.updateAverageRating();
    }

    await story.save();

    // Popular comentário para resposta
    await story.populate('comments.user', 'username profile.avatar');

    const newComment = story.comments[story.comments.length - 1];

    res.status(201).json(newComment);
  } catch (error) {
    console.error('Erro ao adicionar comentário:', error);
    res.status(500).json({ message: 'Erro interno do servidor' });
  }
});

// Curtir/descurtir história
router.post('/:id/like', auth, async (req, res) => {
  try {
    const story = await Story.findById(req.params.id);

    if (!story) {
      return res.status(404).json({ message: 'História não encontrada' });
    }

    const userId = req.user._id;
    const isLiked = story.likes.includes(userId);

    if (isLiked) {
      story.likes.pull(userId);
      story.popularity -= 1;
    } else {
      story.likes.push(userId);
      story.popularity += 1;
    }

    await story.save();

    res.json({
      liked: !isLiked,
      likesCount: story.likes.length
    });
  } catch (error) {
    console.error('Erro ao curtir história:', error);
    res.status(500).json({ message: 'Erro interno do servidor' });
  }
});

// Adicionar aos favoritos
router.post('/:id/favorite', auth, async (req, res) => {
  try {
    const story = await Story.findById(req.params.id);

    if (!story) {
      return res.status(404).json({ message: 'História não encontrada' });
    }

    const userId = req.user._id;
    const isFavorited = story.favorites.includes(userId);

    if (isFavorited) {
      story.favorites.pull(userId);
    } else {
      story.favorites.push(userId);
    }

    await story.save();

    res.json({
      favorited: !isFavorited,
      favoritesCount: story.favorites.length
    });
  } catch (error) {
    console.error('Erro ao favoritar história:', error);
    res.status(500).json({ message: 'Erro interno do servidor' });
  }
});

module.exports = router;
