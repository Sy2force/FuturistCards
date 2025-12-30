const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const { t } = require('../utils/i18n');

// Get user profile
router.get('/profile', protect, async (req, res) => {
  try {
    // In mock mode, return user data from token
    const user = {
      id: req.user.id,
      firstName: req.user.firstName || 'Test',
      lastName: req.user.lastName || 'User',
      email: req.user.email || 'test@example.com',
      role: req.user.role || 'user',
      avatar: req.user.avatar || null,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    res.json({
      success: true,
      user
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: t('server.serverError')
    });
  }
});

// Update user profile
router.put('/profile', protect, async (req, res) => {
  try {
    const { firstName, lastName, avatar } = req.body;

    // In mock mode, return updated user data
    const updatedUser = {
      id: req.user.id,
      firstName: firstName || req.user.firstName,
      lastName: lastName || req.user.lastName,
      email: req.user.email,
      role: req.user.role,
      avatar: avatar || req.user.avatar,
      createdAt: req.user.createdAt || new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    res.json({
      success: true,
      message: t('users.profileUpdated'),
      user: updatedUser
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: t('server.serverError')
    });
  }
});

// Get all users (admin only)
router.get('/admin/users', protect, async (req, res) => {
  try {
    // Check if user is admin
    if (req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: t('server.adminRequired')
      });
    }

    // Mock users data
    const users = [
      {
        id: 'mock_user_1',
        firstName: 'John',
        lastName: 'Doe',
        email: 'john@example.com',
        role: 'user',
        createdAt: '2024-01-15T00:00:00.000Z',
        updatedAt: '2024-01-15T00:00:00.000Z'
      },
      {
        id: 'mock_user_2',
        firstName: 'Jane',
        lastName: 'Smith',
        email: 'jane@example.com',
        role: 'business',
        createdAt: '2024-02-10T00:00:00.000Z',
        updatedAt: '2024-02-10T00:00:00.000Z'
      }
    ];

    res.json({
      success: true,
      count: users.length,
      users
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: t('server.serverError')
    });
  }
});

// Delete user (admin only)
router.delete('/admin/users/:id', protect, async (req, res) => {
  try {
    // Check if user is admin
    if (req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: t('server.adminRequired')
      });
    }

    const { id } = req.params;

    // Prevent admin from deleting themselves
    if (id === req.user.id) {
      return res.status(400).json({
        success: false,
        message: t('users.cannotDeleteSelf')
      });
    }

    res.json({
      success: true,
      message: t('users.userDeleted') + ' (מצב דמו)'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: t('server.serverError')
    });
  }
});

module.exports = router;
