const express = require('express');
const User = require('../models/User');
const Story = require('../models/Story');
const { auth, requireRole } = require('../middleware/auth');

const router = express.Router();

// Obter perfil do usuário atual
router.get('/profile', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user._id)
      .populate('profile.followers', 'username profile.avatar')
      .populate('profile.following', 'username profile.avatar');

    res.json(user.getPublicProfile());
  } catch (error) {
    console.error('Erro ao buscar perfil:', error);
    res.status(500).json({ message: 'Erro interno do servidor' });
  }
});

// Atualizar perfil
router.put('/profile', auth, async (req, res) => {
  try {
    const allowedFields = ['profile.bio', 'profile.theme', 'profile.avatar'];
    const updates = {};

    Object.keys(req.body).forEach(key => {
      if (allowedFields.includes(key)) {
        updates[key] = req.body[key];
      }
    });

    const user = await User.findByIdAndUpdate(
      req.user._id,
      updates,
      { new: true, runValidators: true }
    );

    res.json(user.getPublicProfile());
  } catch (error) {
    console.error('Erro ao atualizar perfil:', error);
    res.status(500).json({ message: 'Erro interno do servidor' });
  }
});

// Obter perfil público de usuário
router.get('/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id)
      .populate('profile.followers', 'username profile.avatar')
      .populate('profile.following', 'username profile.avatar');

    if (!user) {
      return res.status(404).json({ message: 'Usuário não encontrado' });
    }

    res.json(user.getPublicProfile());
  } catch (error) {
    console.error('Erro ao buscar usuário:', error);
    res.status(500).json({ message: 'Erro interno do servidor' });
  }
});

// Obter histórias do usuário
router.get('/:id/stories', async (req, res) => {
  try {
    const { page = 1, limit = 10, status = 'published' } = req.query;

    const query = { author: req.params.id };
    if (status !== 'all') {
      query.status = status;
    }

    const stories = await Story.find(query)
      .sort({ createdAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .select('title description image genres tags ratings popularity chapterCount createdAt status');

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
    console.error('Erro ao buscar histórias do usuário:', error);
    res.status(500).json({ message: 'Erro interno do servidor' });
  }
});

// Seguir usuário
router.post('/:id/follow', auth, async (req, res) => {
  try {
    if (req.params.id === req.user._id.toString()) {
      return res.status(400).json({ message: 'Não é possível seguir a si mesmo' });
    }

    const targetUser = await User.findById(req.params.id);
    if (!targetUser) {
      return res.status(404).json({ message: 'Usuário não encontrado' });
    }

    const isFollowing = req.user.profile.following.includes(req.params.id);

    if (isFollowing) {
      // Deixar de seguir
      req.user.profile.following.pull(req.params.id);
      targetUser.profile.followers.pull(req.user._id);
    } else {
      // Seguir
      req.user.profile.following.push(req.params.id);
      targetUser.profile.followers.push(req.user._id);
    }

    await req.user.save();
    await targetUser.save();

    res.json({
      following: !isFollowing,
      followersCount: targetUser.profile.followers.length
    });
  } catch (error) {
    console.error('Erro ao seguir usuário:', error);
    res.status(500).json({ message: 'Erro interno do servidor' });
  }
});

// Obter estatísticas do usuário
router.get('/:id/stats', async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: 'Usuário não encontrado' });
    }

    // Calcular estatísticas baseadas nas histórias
    const storiesStats = await Story.aggregate([
      { $match: { author: user._id, status: 'published' } },
      {
        $group: {
          _id: null,
          totalStories: { $sum: 1 },
          totalViews: { $sum: '$views' },
          totalLikes: { $sum: { $size: '$likes' } },
          averageRating: { $avg: '$ratings.average' }
        }
      }
    ]);

    const stats = storiesStats[0] || {
      totalStories: 0,
      totalViews: 0,
      totalLikes: 0,
      averageRating: 0
    };

    res.json({
      ...user.stats,
      ...stats,
      followersCount: user.profile.followers.length,
      followingCount: user.profile.following.length
    });
  } catch (error) {
    console.error('Erro ao buscar estatísticas:', error);
    res.status(500).json({ message: 'Erro interno do servidor' });
  }
});

// Admin: Listar todos os usuários
router.get('/admin/users', auth, requireRole(['admin']), async (req, res) => {
  try {
    const { page = 1, limit = 20, search } = req.query;

    const query = {};
    if (search) {
      query.$or = [
        { username: new RegExp(search, 'i') },
        { email: new RegExp(search, 'i') }
      ];
    }

    const users = await User.find(query)
      .select('username email role isActive createdAt')
      .sort({ createdAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit);

    const total = await User.countDocuments(query);

    res.json({
      users,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total,
        pages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    console.error('Erro ao listar usuários:', error);
    res.status(500).json({ message: 'Erro interno do servidor' });
  }
});

// Admin: Atualizar status do usuário
router.put('/admin/users/:id', auth, requireRole(['admin']), async (req, res) => {
  try {
    const { isActive, role } = req.body;

    const user = await User.findByIdAndUpdate(
      req.params.id,
      { isActive, role },
      { new: true, runValidators: true }
    );

    if (!user) {
      return res.status(404).json({ message: 'Usuário não encontrado' });
    }

    res.json(user.getPublicProfile());
  } catch (error) {
    console.error('Erro ao atualizar usuário:', error);
    res.status(500).json({ message: 'Erro interno do servidor' });
  }
});

module.exports = router;
