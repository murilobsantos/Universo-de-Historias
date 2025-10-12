const User = require('../models/User');

const getUser = async (req, res) => {
  try {
    // O usuário já está disponível em req.user devido ao middleware de autenticação
    const user = req.user;

    res.json({
      success: true,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        profile: user.profile,
        stats: user.stats,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt
      }
    });

  } catch (error) {
    console.error('Erro ao buscar usuário:', error);
    res.status(500).json({
      success: false,
      message: 'Erro interno do servidor'
    });
  }
};

const updateUser = async (req, res) => {
  try {
    const { name, profile } = req.body;
    const userId = req.user._id;

    // Campos que podem ser atualizados
    const updateFields = {};

    if (name) {
      updateFields.name = name.trim();
    }

    if (profile) {
      if (profile.avatar !== undefined) {
        updateFields['profile.avatar'] = profile.avatar;
      }
      if (profile.bio !== undefined) {
        updateFields['profile.bio'] = profile.bio.trim();
      }
    }

    // Atualizar usuário
    const user = await User.findByIdAndUpdate(
      userId,
      updateFields,
      { new: true, runValidators: true }
    );

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'Usuário não encontrado'
      });
    }

    res.json({
      success: true,
      message: 'Usuário atualizado com sucesso',
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        profile: user.profile,
        stats: user.stats,
        updatedAt: user.updatedAt
      }
    });

  } catch (error) {
    console.error('Erro ao atualizar usuário:', error);

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

const getUserStats = async (req, res) => {
  try {
    const userId = req.user._id;

    // Buscar estatísticas do usuário
    const user = await User.findById(userId).select('stats');

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'Usuário não encontrado'
      });
    }

    res.json({
      success: true,
      stats: user.stats
    });

  } catch (error) {
    console.error('Erro ao buscar estatísticas:', error);
    res.status(500).json({
      success: false,
      message: 'Erro interno do servidor'
    });
  }
};

module.exports = {
  getUser,
  updateUser,
  getUserStats
};
