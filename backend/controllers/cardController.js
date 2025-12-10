const Card = require('../models/Card');
const User = require('../models/User');

// récupérer toutes les cartes publiques
const getAllCards = async (req, res) => {
  try {
    const cards = await Card.find()
      .populate('user', 'name email')
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      cards
    });
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la récupération des cartes' });
  }
};

// récupérer une carte par ID
const getCardById = async (req, res) => {
  try {
    const card = await Card.findById(req.params.id)
      .populate('user', 'name email');

    if (!card) {
      return res.status(404).json({ message: 'Carte non trouvée' });
    }

    res.json({
      success: true,
      card
    });
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur' });
  }
};

// créer une nouvelle carte (business seulement)
const createCard = async (req, res) => {
  try {
    const { title, description, phone, email, website, address, company } = req.body;

    // vérifier que l'utilisateur est business ou admin
    const user = await User.findById(req.user.id);
    if (user.role !== 'business' && user.role !== 'admin') {
      return res.status(403).json({ 
        message: 'Seuls les comptes business peuvent créer des cartes' 
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
      user: req.user.id
    });

    const populatedCard = await Card.findById(card._id)
      .populate('user', 'name email');

    res.status(201).json({
      success: true,
      message: 'Carte créée avec succès',
      card: populatedCard
    });
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la création', error: error.message });
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
      return res.status(403).json({ message: 'Pas autorisé à modifier cette carte' });
    }

    const updatedCard = await Card.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    ).populate('user', 'name email');

    res.json({
      success: true,
      message: 'Carte mise à jour',
      card: updatedCard
    });
  } catch (error) {
    res.status(500).json({ message: 'Erreur de mise à jour' });
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
      return res.status(403).json({ message: 'Pas autorisé' });
    }

    await Card.findByIdAndDelete(req.params.id);

    res.json({
      success: true,
      message: 'Carte supprimée'
    });
  } catch (error) {
    res.status(500).json({ message: 'Erreur de suppression' });
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

    const cards = await Card.find({ user: req.user.id })
      .populate('user', 'name email')
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      cards
    });
  } catch (error) {
    res.status(500).json({ 
      message: 'Impossible de charger vos cartes',
      error: error.message 
    });
  }
};

// toggle like (pas encore implémenté)
const toggleLike = async (req, res) => {
  try {
    res.json({
      success: true,
      message: 'Fonctionnalité bientôt disponible'
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
    res.status(500).json({ message: 'Erreur de recherche' });
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
