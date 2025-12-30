const Card = require('../models/Card');
const User = require('../models/User');
const { mockCards, mockUsers } = require('../data/mockData');
const { t } = require('../utils/i18n');

// récupérer toutes les cartes publiques
const getAllCards = async (req, res) => {
  try {
    let cards;
    try {
      cards = await Card.find()
        .populate('user', 'name email')
        .sort({ createdAt: -1 });
    } catch (dbError) {
      // Utilisation des données de test en cas d'erreur de base de données
      cards = mockCards.map(card => ({
        ...card,
        user: mockUsers.find(u => u._id === card.userId)
      }));
    }

    res.json({
      success: true,
      cards
    });
  } catch (error) {
    res.status(500).json({ message: t('cards.cardsError') });
  }
};

// récupérer une carte par ID
const getCardById = async (req, res) => {
  try {
    const card = await Card.findById(req.params.id)
      .populate('user', 'name email');

    if (!card) {
      return res.status(404).json({ message: t('cards.cardNotFound') });
    }

    res.json({
      success: true,
      card
    });
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur' });
  }
};

// créer une nouvelle carte (business seulement ou anonyme)
const createCard = async (req, res) => {
  try {
    const { title, description, phone, email, website, address, company } = req.body;

    // Si utilisateur connecté, vérifier le rôle
    if (req.user) {
      const user = await User.findById(req.user.id);
      if (user.role !== 'business' && user.role !== 'admin') {
        return res.status(403).json({ 
          message: t('server.businessRequired') 
        });
      }

      const card = await Card.create({
        title: title || user.name,
        description: description || `Carte professionnelle de ${user.name}`,
        phone: phone || '',
        email: email || user.email,
        website,
        address,
        company,
        user: req.user.id,
        anonymous: false
      });

      const populatedCard = await Card.findById(card._id)
        .populate('user', 'name email');

      return res.json({
        success: true,
        message: t('cards.cardCreated'),
        card: populatedCard
      });
    }

    // Création anonyme (route /public)
    const card = await Card.create({
      title,
      description,
      phone,
      email,
      website,
      address,
      company,
      user: null,
      anonymous: true,
      createdAt: new Date()
    });

    res.json({
      success: true,
      message: t('cards.cardCreated'),
      card
    });
  } catch (error) {
    res.status(500).json({ message: t('cards.createError'), error: error.message });
  }
};

// mettre à jour une carte (propriétaire seulement)
const updateCard = async (req, res) => {
  try {
    const card = await Card.findById(req.params.id);

    if (!card) {
      return res.status(404).json({ message: 'Carte non trouvée' });
    }

    // vérifier que c'est bien le propriétaire
    if (card.user.toString() !== req.user.id) {
      return res.status(403).json({ message: t('cards.unauthorized') });
    }

    const updatedCard = await Card.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    ).populate('user', 'name email');

    res.json({
      success: true,
      message: t('cards.cardUpdated'),
      card: updatedCard
    });
  } catch (error) {
    res.status(500).json({ message: t('cards.updateError') });
  }
};

// supprimer une carte
const deleteCard = async (req, res) => {
  try {
    const card = await Card.findById(req.params.id);

    if (!card) {
      return res.status(404).json({ message: 'Carte non trouvée' });
    }

    // vérifier les permissions (propriétaire ou admin)
    const user = await User.findById(req.user.id);
    if (card.user.toString() !== req.user.id && user.role !== 'admin') {
      return res.status(403).json({ message: t('cards.unauthorized') });
    }

    await Card.findByIdAndDelete(req.params.id);

    res.json({
      success: true,
      message: t('cards.cardDeleted')
    });
  } catch (error) {
    res.status(500).json({ message: t('cards.deleteError') });
  }
};

// récupérer mes cartes
const getMyCards = async (req, res) => {
  try {
    // données mock pour les tests
    if (req.headers.authorization === 'Bearer test-token') {
      return res.json({
        success: true,
        cards: [
          {
            _id: 'mock1',
            title: 'John Doe',
            description: 'Développeur Web',
            email: 'john@test.com',
            phone: '+33123456789',
            website: 'https://johndoe.dev',
            company: 'Tech Corp',
            createdAt: new Date()
          },
          {
            _id: 'mock2',
            title: 'Jane Smith',
            description: 'Designer UI/UX',
            email: 'jane@test.com',
            phone: '+33987654321',
            website: 'https://janedesign.fr',
            company: 'Design Studio',
            createdAt: new Date()
          }
        ]
      });
    }

    let cards;
    try {
      cards = await Card.find({ user: req.user.id })
        .populate('user', 'name email')
        .sort({ createdAt: -1 });
    } catch (dbError) {
      // Utilisation des données de test si MongoDB indisponible
      cards = mockCards.filter(card => card.userId === req.user.id || card.userId === req.user._id).map(card => ({
        ...card,
        user: mockUsers.find(u => u._id === card.userId)
      }));
    }

    res.json({
      success: true,
      cards
    });
  } catch (error) {
    res.status(500).json({ 
      message: t('cards.cardsError'),
      error: error.message 
    });
  }
};

// toggle like (pas encore implémenté)
const toggleLike = async (req, res) => {
  try {
    res.json({
      success: true,
      message: 'תכונה תהיה זמינה בקרוב'
    });
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur' });
  }
};

// rechercher des cartes
const searchCards = async (req, res) => {
  try {
    const { q } = req.query;
    
    if (!q) {
      return res.json({
        success: true,
        cards: []
      });
    }

    const cards = await Card.find({
      $or: [
        { title: { $regex: q, $options: 'i' } },
        { description: { $regex: q, $options: 'i' } },
        { company: { $regex: q, $options: 'i' } }
      ]
    })
    .populate('user', 'name email')
    .sort({ createdAt: -1 });

    res.json({
      success: true,
      cards
    });
  } catch (error) {
    res.status(500).json({ message: t('server.serverError') });
  }
};

// cartes populaires (pas encore implémenté)
const getPopularCards = async (req, res) => {
  try {
    const cards = await Card.find()
      .populate('user', 'name email')
      .sort({ createdAt: -1 })
      .limit(10);

    res.json({
      success: true,
      cards
    });
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur' });
  }
};

module.exports = {
  getAllCards,
  getCardById,
  createCard,
  updateCard,
  deleteCard,
  getMyCards,
  toggleLike,
  searchCards,
  getPopularCards
};
