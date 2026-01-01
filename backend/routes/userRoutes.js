const express = require('express');
const jwt = require('jsonwebtoken');
const { protect, adminOnly } = require('../middleware/authMiddleware');
const User = require('../models/User');
const { mockUsers } = require('../data/mockData');
const { t } = require('../utils/i18n');

const router = express.Router();

// Routes publiques (AVANT les middlewares d'authentification)

// GET /api/users/demo-user - Connexion démo user (public)
router.get('/demo-user', async (req, res) => {
  try {
    // Find or create demo user
    let demoUser = await User.findOne({ email: 'testnormal@example.com' });
    
    if (!demoUser) {
      // Create user démo s'il n'existe pas
      const bcrypt = require('bcryptjs');
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash('TestPass123!', salt);
      
      demoUser = new User({
        name: 'User Démo',
        email: 'testnormal@example.com',
        password: hashedPassword,
        role: 'user',
        isActive: true
      });
      
      await demoUser.save();
    }

    // Générer JWT token
    const jwt = require('jsonwebtoken');
    const token = jwt.sign(
      { id: demoUser._id },
      process.env.JWT_SECRET,
      { expiresIn: '30d' }
    );

    res.json({
      success: true,
      message: t('users.demoLoginSuccess'),
      token,
      user: {
        id: demoUser._id,
        name: demoUser.name,
        email: demoUser.email,
        role: demoUser.role
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: t('users.demoLoginError'),
      error: error.message
    });
  }
});

// GET /api/users/demo-business - Connexion démo business (public)
router.get('/demo-business', async (req, res) => {
  try {
    // Find or create demo business user
    let demoBusiness = await User.findOne({ email: 'testpro@example.com' });
    
    if (!demoBusiness) {
      // Create user business démo s'il n'existe pas
      const bcrypt = require('bcryptjs');
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash('TestPass123!', salt);
      
      demoBusiness = new User({
        name: 'User Business',
        email: 'testpro@example.com',
        password: hashedPassword,
        role: 'business',
        isActive: true
      });
      
      await demoBusiness.save();
    }

    // Générer JWT token
    const jwt = require('jsonwebtoken');
    const token = jwt.sign(
      { id: demoBusiness._id },
      process.env.JWT_SECRET,
      { expiresIn: '30d' }
    );

    res.json({
      success: true,
      message: t('users.demoBusinessLoginSuccess'),
      token,
      user: {
        id: demoBusiness._id,
        name: demoBusiness.name,
        email: demoBusiness.email,
        role: demoBusiness.role
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: t('users.demoBusinessLoginError'),
      error: error.message
    });
  }
});

// Routes protégées (APRÈS les routes publiques)

// GET /api/users/stats/dashboard - Statistiques pour le dashboard admin (AVANT :id)
router.get('/stats/dashboard', protect, adminOnly, async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    const activeUsers = await User.countDocuments({ isActive: true });
    const businessUsers = await User.countDocuments({ role: 'business' });
    const adminUsers = await User.countDocuments({ role: 'admin' });
    
    // Statistiques par mois
    const monthlyStats = await User.aggregate([
      {
        $group: {
          _id: {
            year: { $year: '$createdAt' },
            month: { $month: '$createdAt' }
          },
          count: { $sum: 1 }
        }
      },
      { $sort: { '_id.year': -1, '_id.month': -1 } },
      { $limit: 12 }
    ]);
    
    res.json({
      success: true,
      stats: {
        totalUsers,
        activeUsers,
        businessUsers,
        adminUsers,
        monthlyRegistrations: monthlyStats
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: t('users.statsError'),
      error: error.message
    });
  }
});

// GET /api/users - Liste tous les users (admin seulement)
router.get('/', protect, adminOnly, async (req, res) => {
  try {
    const users = await User.find({}).select('-password');
    res.json({
      success: true,
      users
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: t('users.usersError'),
      error: error.message
    });
  }
});

// GET /api/users/:id - Récupérer un user spécifique (admin seulement)
router.get('/:id', protect, adminOnly, async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select('-password');
    if (!user) {
      return res.status(404).json({
        success: false,
        message: t('users.userNotFound')
      });
    }
    res.json({
      success: true,
      user
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: t('users.usersError'),
      error: error.message
    });
  }
});

// PUT /api/users/:id - Mettre à jour un user (admin seulement)
router.put('/:id', protect, adminOnly, async (req, res) => {
  try {
    const { name, email, role, isActive } = req.body;
    
    const user = await User.findByIdAndUpdate(
      req.params.id,
      { name, email, role, isActive },
      { new: true, runValidators: true }
    ).select('-password');
    
    if (!user) {
      return res.status(404).json({
        success: false,
        message: t('users.userNotFound')
      });
    }
    
    res.json({
      success: true,
      message: t('users.userUpdated'),
      user
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: t('auth.updateError'),
      error: error.message
    });
  }
});

// DELETE /api/users/:id - Supprimer un user (admin seulement)
router.delete('/:id', protect, adminOnly, async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    
    if (!user) {
      return res.status(404).json({
        success: false,
        message: t('users.userNotFound')
      });
    }
    
    // Empêcher l'admin de se supprimer lui-même
    if (user._id.toString() === req.user.id) {
      return res.status(400).json({
        success: false,
        message: t('users.cannotDeleteSelf')
      });
    }
    
    await User.findByIdAndDelete(req.params.id);
    
    res.json({
      success: true,
      message: t('users.userDeleted')
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: t('cards.deleteError'),
      error: error.message
    });
  }
});

// GET /api/users/me - Profil utilisateur actuel
router.get('/me', protect, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    if (!user) {
      return res.status(404).json({
        success: false,
        message: t('users.userNotFound')
      });
    }
    
    res.json({
      success: true,
      user
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: t('users.profileError'),
      error: error.message
    });
  }
});

// PUT /api/users/me - Mettre à jour le profil utilisateur
router.put('/me', protect, async (req, res) => {
  try {
    const { firstName, lastName, phone, address } = req.body;
    
    const user = await User.findByIdAndUpdate(
      req.user.id,
      { firstName, lastName, phone, address },
      { new: true, runValidators: true }
    ).select('-password');
    
    if (!user) {
      return res.status(404).json({
        success: false,
        message: t('users.userNotFound')
      });
    }
    
    res.json({
      success: true,
      message: t('users.profileUpdated'),
      user
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: t('auth.updateError'),
      error: error.message
    });
  }
});

// PUT /api/users/me/password - Changer le mot de passe
router.put('/me/password', protect, async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;
    
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: t('users.userNotFound')
      });
    }
    
    // Vérifier le mot de passe actuel
    const bcrypt = require('bcryptjs');
    const isMatch = await bcrypt.compare(currentPassword, user.password);
    if (!isMatch) {
      return res.status(400).json({
        success: false,
        message: t('auth.invalidPassword')
      });
    }
    
    // Hasher le nouveau mot de passe
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);
    
    await User.findByIdAndUpdate(req.user.id, { password: hashedPassword });
    
    res.json({
      success: true,
      message: t('users.passwordChanged')
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: t('auth.updateError'),
      error: error.message
    });
  }
});

// GET /api/users/me/activity - Historique d'activité
router.get('/me/activity', protect, async (req, res) => {
  try {
    const { limit = 20, offset = 0 } = req.query;
    
    // Pour l'instant, retourner des données mock
    // Dans une vraie application, on aurait une collection ActivityLog
    const mockActivity = [
      {
        id: '1',
        type: 'login',
        description: t('users.activity.login'),
        timestamp: new Date(),
        ip: req.ip
      },
      {
        id: '2',
        type: 'profile_update',
        description: t('users.activity.profileUpdate'),
        timestamp: new Date(Date.now() - 86400000), // 1 day ago
        ip: req.ip
      }
    ];
    
    res.json({
      success: true,
      activity: mockActivity.slice(offset, offset + parseInt(limit)),
      total: mockActivity.length
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: t('users.activityError'),
      error: error.message
    });
  }
});

// GET /api/users/me/preferences - Préférences utilisateur
router.get('/me/preferences', protect, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('preferences');
    if (!user) {
      return res.status(404).json({
        success: false,
        message: t('users.userNotFound')
      });
    }
    
    const defaultPreferences = {
      theme: 'light',
      language: 'fr',
      notifications: {
        email: true,
        push: false,
        marketing: false
      },
      privacy: {
        profileVisible: true,
        showEmail: false,
        showPhone: false
      }
    };
    
    res.json({
      success: true,
      preferences: { ...defaultPreferences, ...user.preferences }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: t('users.preferencesError'),
      error: error.message
    });
  }
});

// PUT /api/users/me/preferences - Mettre à jour les préférences
router.put('/me/preferences', protect, async (req, res) => {
  try {
    const preferences = req.body;
    
    const user = await User.findByIdAndUpdate(
      req.user.id,
      { preferences },
      { new: true, runValidators: true }
    ).select('preferences');
    
    if (!user) {
      return res.status(404).json({
        success: false,
        message: t('users.userNotFound')
      });
    }
    
    res.json({
      success: true,
      message: t('users.preferencesUpdated'),
      preferences: user.preferences
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: t('users.preferencesError'),
      error: error.message
    });
  }
});

// GET /api/users/me/notifications - Notifications utilisateur
router.get('/me/notifications', protect, async (req, res) => {
  try {
    const { limit = 10, unread } = req.query;
    
    // Mock notifications pour l'instant
    const mockNotifications = [
      {
        id: '1',
        type: 'like',
        title: t('notifications.cardLiked'),
        message: t('notifications.cardLikedMessage'),
        read: false,
        createdAt: new Date()
      },
      {
        id: '2',
        type: 'system',
        title: t('notifications.welcome'),
        message: t('notifications.welcomeMessage'),
        read: true,
        createdAt: new Date(Date.now() - 86400000)
      }
    ];
    
    let filteredNotifications = mockNotifications;
    if (unread === 'true') {
      filteredNotifications = mockNotifications.filter(n => !n.read);
    }
    
    res.json({
      success: true,
      notifications: filteredNotifications.slice(0, parseInt(limit)),
      unreadCount: mockNotifications.filter(n => !n.read).length
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: t('users.notificationsError'),
      error: error.message
    });
  }
});

// PUT /api/users/me/notifications/:id/read - Marquer notification comme lue
router.put('/me/notifications/:id/read', protect, async (req, res) => {
  try {
    // Dans une vraie app, on mettrait à jour la notification en DB
    res.json({
      success: true,
      message: t('notifications.marked')
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: t('users.notificationsError'),
      error: error.message
    });
  }
});

// DELETE /api/users/me - Supprimer son propre compte
router.delete('/me', protect, async (req, res) => {
  try {
    const { password } = req.body;
    
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: t('users.userNotFound')
      });
    }
    
    // Vérifier le mot de passe
    const bcrypt = require('bcryptjs');
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({
        success: false,
        message: t('auth.invalidPassword')
      });
    }
    
    await User.findByIdAndDelete(req.user.id);
    
    res.json({
      success: true,
      message: t('users.accountDeleted')
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: t('users.deleteError'),
      error: error.message
    });
  }
});

// GET /api/users/me/export - Exporter les données utilisateur
router.get('/me/export', protect, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    if (!user) {
      return res.status(404).json({
        success: false,
        message: t('users.userNotFound')
      });
    }
    
    // Dans une vraie app, on inclurait aussi les cartes, favoris, etc.
    const exportData = {
      profile: user,
      exportDate: new Date(),
      version: '1.0'
    };
    
    res.json({
      success: true,
      data: exportData
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: t('users.exportError'),
      error: error.message
    });
  }
});

// POST /api/users/verify-email - Vérifier l'email
router.post('/verify-email', async (req, res) => {
  try {
    const { token } = req.body;
    
    // Dans une vraie app, on vérifierait le token et mettrait à jour emailVerified
    res.json({
      success: true,
      message: t('users.emailVerified')
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: t('users.verificationError'),
      error: error.message
    });
  }
});

// POST /api/users/resend-verification - Renvoyer l'email de vérification
router.post('/resend-verification', protect, async (req, res) => {
  try {
    // Dans une vraie app, on enverrait un nouvel email de vérification
    res.json({
      success: true,
      message: t('users.verificationSent')
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: t('users.verificationError'),
      error: error.message
    });
  }
});

// GET /api/users/search - Rechercher des utilisateurs (admin seulement)
router.get('/search', protect, adminOnly, async (req, res) => {
  try {
    const { q, role, isActive, limit = 20, offset = 0 } = req.query;
    
    let query = {};
    
    if (q) {
      query.$or = [
        { firstName: { $regex: q, $options: 'i' } },
        { lastName: { $regex: q, $options: 'i' } },
        { email: { $regex: q, $options: 'i' } }
      ];
    }
    
    if (role) {
      query.role = role;
    }
    
    if (isActive !== undefined) {
      query.isActive = isActive === 'true';
    }
    
    const users = await User.find(query)
      .select('-password')
      .limit(parseInt(limit))
      .skip(parseInt(offset))
      .sort({ createdAt: -1 });
    
    const total = await User.countDocuments(query);
    
    res.json({
      success: true,
      users,
      total,
      hasMore: (parseInt(offset) + parseInt(limit)) < total
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: t('users.searchError'),
      error: error.message
    });
  }
});

module.exports = router;
