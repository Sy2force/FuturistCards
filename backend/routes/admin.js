const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Card = require('../models/Card');
const Favorite = require('../models/Favorite');
const { protect } = require('../middleware/authMiddleware');
const { roleGuard } = require('../middleware/roleGuard');

// Middleware pour vérifier les permissions admin
router.use(protect);
router.use(roleGuard(['admin']));

// GET /api/admin/stats - Récupérer les statistiques générales
router.get('/stats', async (req, res) => {
  try {
    const [userCount, cardCount, favoriteCount] = await Promise.all([
      User.countDocuments(),
      Card.countDocuments(),
      Favorite.countDocuments()
    ]);

    // Statistiques par rôle
    const usersByRole = await User.aggregate([
      { $group: { _id: '$role', count: { $sum: 1 } } }
    ]);

    // Statistiques par catégorie de cartes
    const cardsByCategory = await Card.aggregate([
      { $group: { _id: '$category', count: { $sum: 1 } } }
    ]);

    // Cartes créées ce mois
    const thisMonth = new Date();
    thisMonth.setDate(1);
    thisMonth.setHours(0, 0, 0, 0);
    
    const cardsThisMonth = await Card.countDocuments({
      createdAt: { $gte: thisMonth }
    });

    // Utilisateurs actifs (connectés dans les 30 derniers jours)
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
    
    const activeUsers = await User.countDocuments({
      lastLogin: { $gte: thirtyDaysAgo }
    });

    res.json({
      totalUsers: userCount,
      totalCards: cardCount,
      totalFavorites: favoriteCount,
      usersByRole: usersByRole.reduce((acc, item) => {
        acc[item._id] = item.count;
        return acc;
      }, {}),
      cardsByCategory: cardsByCategory.reduce((acc, item) => {
        acc[item._id] = item.count;
        return acc;
      }, {}),
      cardsThisMonth,
      activeUsers
    });
  } catch (error) {
    console.error('Erreur lors de la récupération des statistiques:', error);
    res.status(500).json({ message: 'Erreur serveur lors de la récupération des statistiques' });
  }
});

// GET /api/admin/users - Récupérer tous les utilisateurs
router.get('/users', async (req, res) => {
  try {
    const { page = 1, limit = 20, search, role } = req.query;
    const skip = (page - 1) * limit;

    // Construire le filtre de recherche
    let filter = {};
    if (search) {
      filter.$or = [
        { firstName: { $regex: search, $options: 'i' } },
        { lastName: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } }
      ];
    }
    if (role && role !== 'all') {
      filter.role = role;
    }

    const users = await User.find(filter)
      .select('-password')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(parseInt(limit));

    const total = await User.countDocuments(filter);

    res.json({
      users,
      pagination: {
        current: parseInt(page),
        pages: Math.ceil(total / limit),
        total
      }
    });
  } catch (error) {
    console.error('Erreur lors de la récupération des utilisateurs:', error);
    res.status(500).json({ message: 'Erreur serveur lors de la récupération des utilisateurs' });
  }
});

// GET /api/admin/cards - Récupérer toutes les cartes
router.get('/cards', async (req, res) => {
  try {
    const { page = 1, limit = 20, search, category } = req.query;
    const skip = (page - 1) * limit;

    // Construire le filtre de recherche
    let filter = {};
    if (search) {
      filter.$or = [
        { title: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
        { company: { $regex: search, $options: 'i' } }
      ];
    }
    if (category && category !== 'all') {
      filter.category = category;
    }

    const cards = await Card.find(filter)
      .populate('userId', 'firstName lastName email')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(parseInt(limit));

    const total = await Card.countDocuments(filter);

    res.json({
      cards,
      pagination: {
        current: parseInt(page),
        pages: Math.ceil(total / limit),
        total
      }
    });
  } catch (error) {
    console.error('Erreur lors de la récupération des cartes:', error);
    res.status(500).json({ message: 'Erreur serveur lors de la récupération des cartes' });
  }
});

// DELETE /api/admin/users/:id - Supprimer un utilisateur
router.delete('/users/:id', async (req, res) => {
  try {
    const { id } = req.params;

    // Vérifier que l'utilisateur existe
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ message: 'Utilisateur non trouvé' });
    }

    // Empêcher la suppression de son propre compte
    if (user._id.toString() === req.user.id) {
      return res.status(400).json({ message: 'Vous ne pouvez pas supprimer votre propre compte' });
    }

    // Supprimer toutes les cartes de l'utilisateur
    await Card.deleteMany({ userId: id });

    // Supprimer tous les favoris de l'utilisateur
    await Favorite.deleteMany({ userId: id });

    // Supprimer l'utilisateur
    await User.findByIdAndDelete(id);

    res.json({ message: 'Utilisateur supprimé avec succès' });
  } catch (error) {
    console.error('Erreur lors de la suppression de l\'utilisateur:', error);
    res.status(500).json({ message: 'Erreur serveur lors de la suppression de l\'utilisateur' });
  }
});

// DELETE /api/admin/cards/:id - Supprimer une carte
router.delete('/cards/:id', async (req, res) => {
  try {
    const { id } = req.params;

    // Vérifier que la carte existe
    const card = await Card.findById(id);
    if (!card) {
      return res.status(404).json({ message: 'Carte non trouvée' });
    }

    // Supprimer tous les favoris liés à cette carte
    await Favorite.deleteMany({ cardId: id });

    // Supprimer la carte
    await Card.findByIdAndDelete(id);

    res.json({ message: 'Carte supprimée avec succès' });
  } catch (error) {
    console.error('Erreur lors de la suppression de la carte:', error);
    res.status(500).json({ message: 'Erreur serveur lors de la suppression de la carte' });
  }
});

// PUT /api/admin/users/:id/role - Mettre à jour le rôle d'un utilisateur
router.put('/users/:id/role', async (req, res) => {
  try {
    const { id } = req.params;
    const { role } = req.body;

    // Valider le rôle
    const validRoles = ['user', 'business', 'admin'];
    if (!validRoles.includes(role)) {
      return res.status(400).json({ message: 'Rôle invalide' });
    }

    // Vérifier que l'utilisateur existe
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ message: 'Utilisateur non trouvé' });
    }

    // Empêcher la modification de son propre rôle
    if (user._id.toString() === req.user.id) {
      return res.status(400).json({ message: 'Vous ne pouvez pas modifier votre propre rôle' });
    }

    // Mettre à jour le rôle
    user.role = role;
    await user.save();

    res.json({ 
      message: 'Rôle mis à jour avec succès',
      user: {
        id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        role: user.role
      }
    });
  } catch (error) {
    console.error('Erreur lors de la mise à jour du rôle:', error);
    res.status(500).json({ message: 'Erreur serveur lors de la mise à jour du rôle' });
  }
});

// PUT /api/admin/users/:id/status - Activer/désactiver un utilisateur
router.put('/users/:id/status', async (req, res) => {
  try {
    const { id } = req.params;
    const { isActive } = req.body;

    // Vérifier que l'utilisateur existe
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ message: 'Utilisateur non trouvé' });
    }

    // Empêcher la modification de son propre statut
    if (user._id.toString() === req.user.id) {
      return res.status(400).json({ message: 'Vous ne pouvez pas modifier votre propre statut' });
    }

    // Mettre à jour le statut
    user.isActive = isActive;
    await user.save();

    res.json({ 
      message: `Utilisateur ${isActive ? 'activé' : 'désactivé'} avec succès`,
      user: {
        id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        isActive: user.isActive
      }
    });
  } catch (error) {
    console.error('Erreur lors de la modification du statut:', error);
    res.status(500).json({ message: 'Erreur serveur lors de la modification du statut' });
  }
});

// GET /api/admin/logs - Récupérer les logs d'activité (simulation)
router.get('/logs', async (req, res) => {
  try {
    const { limit = 50 } = req.query;

    // Pour l'instant, on simule des logs
    // Dans une vraie application, vous auriez une collection de logs
    const mockLogs = [
      {
        id: 1,
        action: 'USER_LOGIN',
        userId: 'user123',
        userEmail: 'john@example.com',
        timestamp: new Date(),
        details: 'Connexion réussie'
      },
      {
        id: 2,
        action: 'CARD_CREATED',
        userId: 'user456',
        userEmail: 'jane@example.com',
        timestamp: new Date(Date.now() - 3600000),
        details: 'Nouvelle carte créée: Développeur Web'
      },
      {
        id: 3,
        action: 'USER_REGISTERED',
        userId: 'user789',
        userEmail: 'bob@example.com',
        timestamp: new Date(Date.now() - 7200000),
        details: 'Nouvel utilisateur enregistré'
      }
    ];

    res.json({
      logs: mockLogs.slice(0, parseInt(limit)),
      total: mockLogs.length
    });
  } catch (error) {
    console.error('Erreur lors de la récupération des logs:', error);
    res.status(500).json({ message: 'Erreur serveur lors de la récupération des logs' });
  }
});

// GET /api/admin/metrics - Récupérer les métriques de performance
router.get('/metrics', async (req, res) => {
  try {
    // Métriques simulées - dans une vraie app, vous collecteriez ces données
    const metrics = {
      responseTime: {
        average: 120,
        p95: 250,
        p99: 500
      },
      requests: {
        total: 15420,
        successful: 14890,
        failed: 530,
        rate: 45.2 // requests per minute
      },
      database: {
        connections: 12,
        queries: 8934,
        averageQueryTime: 15
      },
      memory: {
        used: 256,
        total: 512,
        percentage: 50
      },
      uptime: 86400 // seconds
    };

    res.json(metrics);
  } catch (error) {
    console.error('Erreur lors de la récupération des métriques:', error);
    res.status(500).json({ message: 'Erreur serveur lors de la récupération des métriques' });
  }
});

module.exports = router;
