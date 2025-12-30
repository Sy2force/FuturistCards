const express = require('express');
const jwt = require('jsonwebtoken');
const { protect, adminOnly } = require('../middleware/authMiddleware');
const User = require('../models/User');
const { mockUsers } = require('../data/mockData');
const { t } = require('../utils/i18n');

const router = express.Router();

// Routes publiques (AVANT les middlewares d'authentification)

// GET /api/users/demo-user - Connexion démo utilisateur (public)
router.get('/demo-user', async (req, res) => {
  try {
    // Trouver ou créer un utilisateur démo
    let demoUser = await User.findOne({ email: 'testnormal@example.com' });
    
    if (!demoUser) {
      // Créer utilisateur démo s'il n'existe pas
      const bcrypt = require('bcryptjs');
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash('TestPass123!', salt);
      
      demoUser = new User({
        name: 'Utilisateur Démo',
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
    // Trouver ou créer un utilisateur business démo
    let demoBusiness = await User.findOne({ email: 'testpro@example.com' });
    
    if (!demoBusiness) {
      // Créer utilisateur business démo s'il n'existe pas
      const bcrypt = require('bcryptjs');
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash('TestPass123!', salt);
      
      demoBusiness = new User({
        name: 'Utilisateur Business',
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

// GET /api/users - Liste tous les utilisateurs (admin seulement)
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

// GET /api/users/:id - Récupérer un utilisateur spécifique (admin seulement)
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

// PUT /api/users/:id - Mettre à jour un utilisateur (admin seulement)
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

// DELETE /api/users/:id - Supprimer un utilisateur (admin seulement)
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

module.exports = router;
