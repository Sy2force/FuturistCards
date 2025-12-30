const express = require('express');
const { protect, adminOnly } = require('../middleware/authMiddleware');
const User = require('../models/User');
const Card = require('../models/Card');
const asyncHandler = require('express-async-handler');
const { t } = require('../utils/i18n');

const router = express.Router();

// Toutes les routes admin nécessitent une authentification et le rôle admin
router.use(protect);
router.use(adminOnly);

/**
 * @desc    Get all users (admin only)
 * @route   GET /api/admin/users
 * @access  Private/Admin
 */
router.get('/users', asyncHandler(async (req, res) => {
  // Mode mock pour développement
  if (process.env.NODE_ENV === 'development' || !process.env.MONGODB_URI) {
    const mockUsers = global.mockUsers || new Map();
    const users = Array.from(mockUsers.values()).map(user => ({
      id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      role: user.role,
      isAdmin: user.isAdmin,
      isBusiness: user.isBusiness,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt
    }));

    return res.json({
      success: true,
      count: users.length,
      users
    });
  }

  const users = await User.find({}).select('-password').sort({ createdAt: -1 });
  
  res.json({
    success: true,
    count: users.length,
    users
  });
}));

/**
 * @desc    Get user by ID (admin only)
 * @route   GET /api/admin/users/:id
 * @access  Private/Admin
 */
router.get('/users/:id', asyncHandler(async (req, res) => {
  const userId = req.params.id;

  // Mode mock pour développement
  if (process.env.NODE_ENV === 'development' || !process.env.MONGODB_URI) {
    const mockUsers = global.mockUsers || new Map();
    const user = mockUsers.get(userId);
    
    if (!user) {
      return res.status(404).json({
        success: false,
        message: t('users.userNotFound')
      });
    }

    return res.json({
      success: true,
      user: {
        id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        role: user.role,
        isAdmin: user.isAdmin,
        isBusiness: user.isBusiness,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt
      }
    });
  }

  const user = await User.findById(userId).select('-password');
  
  if (!user) {
    return res.status(404).json({
      success: false,
      message: 'User not found'
    });
  }

  res.json({
    success: true,
    user
  });
}));

/**
 * @desc    Update user role (admin only)
 * @route   PUT /api/admin/users/:id/role
 * @access  Private/Admin
 */
router.put('/users/:id/role', asyncHandler(async (req, res) => {
  const userId = req.params.id;
  const { role } = req.body;

  if (!['user', 'business', 'admin'].includes(role)) {
    return res.status(400).json({
      success: false,
      message: t('admin.invalidRole')
    });
  }

  // Mode mock pour développement
  if (process.env.NODE_ENV === 'development' || !process.env.MONGODB_URI) {
    const mockUsers = global.mockUsers || new Map();
    const user = mockUsers.get(userId);
    
    if (!user) {
      return res.status(404).json({
        success: false,
        message: t('users.userNotFound')
      });
    }

    user.role = role;
    user.isAdmin = role === 'admin';
    user.isBusiness = role === 'business' || role === 'admin';
    user.updatedAt = new Date();

    return res.json({
      success: true,
      message: t('admin.roleUpdatedMock'),
      user: {
        id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        role: user.role,
        isAdmin: user.isAdmin,
        isBusiness: user.isBusiness
      }
    });
  }

  const user = await User.findByIdAndUpdate(
    userId,
    {
      role,
      isAdmin: role === 'admin',
      isBusiness: role === 'business' || role === 'admin',
      updatedAt: new Date()
    },
    { new: true }
  ).select('-password');

  if (!user) {
    return res.status(404).json({
      success: false,
      message: 'User not found'
    });
  }

  res.json({
    success: true,
    message: t('admin.roleUpdated'),
    user
  });
}));

/**
 * @desc    Delete user (admin only)
 * @route   DELETE /api/admin/users/:id
 * @access  Private/Admin
 */
router.delete('/users/:id', asyncHandler(async (req, res) => {
  const userId = req.params.id;

  // Empêcher la suppression de son propre compte
  if (userId === req.user.id) {
    return res.status(400).json({
      success: false,
      message: t('users.cannotDeleteSelf')
    });
  }

  // Mode mock pour développement
  if (process.env.NODE_ENV === 'development' || !process.env.MONGODB_URI) {
    const mockUsers = global.mockUsers || new Map();
    const user = mockUsers.get(userId);
    
    if (!user) {
      return res.status(404).json({
        success: false,
        message: t('users.userNotFound')
      });
    }

    mockUsers.delete(userId);

    return res.json({
      success: true,
      message: t('users.userDeleted') + ' (מצב דמו)'
    });
  }

  const user = await User.findById(userId);
  
  if (!user) {
    return res.status(404).json({
      success: false,
      message: 'User not found'
    });
  }

  await User.findByIdAndDelete(userId);

  res.json({
    success: true,
    message: t('users.userDeleted')
  });
}));

/**
 * @desc    Get all cards (admin only)
 * @route   GET /api/admin/cards
 * @access  Private/Admin
 */
router.get('/cards', asyncHandler(async (req, res) => {
  // Mode mock pour développement
  if (process.env.NODE_ENV === 'development' || !process.env.MONGODB_URI) {
    const { sampleCards } = require('../data/sampleCards');
    
    return res.json({
      success: true,
      count: sampleCards.length,
      cards: sampleCards
    });
  }

  const cards = await Card.find({}).populate('userId', 'firstName lastName email').sort({ createdAt: -1 });
  
  res.json({
    success: true,
    count: cards.length,
    cards
  });
}));

/**
 * @desc    Delete card (admin only)
 * @route   DELETE /api/admin/cards/:id
 * @access  Private/Admin
 */
router.delete('/cards/:id', asyncHandler(async (req, res) => {
  const cardId = req.params.id;

  // Mode mock pour développement
  if (process.env.NODE_ENV === 'development' || !process.env.MONGODB_URI) {
    return res.json({
      success: true,
      message: t('cards.cardDeletedMock')
    });
  }

  const card = await Card.findById(cardId);
  
  if (!card) {
    return res.status(404).json({
      success: false,
      message: t('cards.cardNotFound')
    });
  }

  await Card.findByIdAndDelete(cardId);

  res.json({
    success: true,
    message: t('cards.cardDeleted')
  });
}));

/**
 * @desc    Get system statistics (admin only)
 * @route   GET /api/admin/stats
 * @access  Private/Admin
 */
router.get('/stats', asyncHandler(async (req, res) => {
  // Mode mock pour développement
  if (process.env.NODE_ENV === 'development' || !process.env.MONGODB_URI) {
    const mockUsers = global.mockUsers || new Map();
    const { sampleCards } = require('../data/sampleCards');
    
    const userStats = {
      total: mockUsers.size,
      users: Array.from(mockUsers.values()).filter(u => u.role === 'user').length,
      business: Array.from(mockUsers.values()).filter(u => u.role === 'business').length,
      admin: Array.from(mockUsers.values()).filter(u => u.role === 'admin').length
    };

    return res.json({
      success: true,
      stats: {
        users: userStats,
        cards: {
          total: sampleCards.length,
          published: sampleCards.length,
          draft: 0
        },
        system: {
          uptime: process.uptime(),
          memory: process.memoryUsage(),
          version: process.version
        }
      }
    });
  }

  const [totalUsers, totalCards, usersByRole] = await Promise.all([
    User.countDocuments(),
    Card.countDocuments(),
    User.aggregate([
      {
        $group: {
          _id: '$role',
          count: { $sum: 1 }
        }
      }
    ])
  ]);

  const roleStats = usersByRole.reduce((acc, item) => {
    acc[item._id] = item.count;
    return acc;
  }, {});

  res.json({
    success: true,
    stats: {
      users: {
        total: totalUsers,
        user: roleStats.user || 0,
        business: roleStats.business || 0,
        admin: roleStats.admin || 0
      },
      cards: {
        total: totalCards,
        published: totalCards,
        draft: 0
      },
      system: {
        uptime: process.uptime(),
        memory: process.memoryUsage(),
        version: process.version
      }
    }
  });
}));

module.exports = router;
