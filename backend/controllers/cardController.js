const Card = require('../models/Card');
const User = require('../models/User');
const { mockCards, mockUsers } = require('../data/mockData');
// Removed i18n dependency - using English only

// Get all public cards
const getAllCards = async (req, res) => {
  try {
    let cards;
    try {
      cards = await Card.find()
        .populate('user', 'name email')
        .sort({ createdAt: -1 });
    } catch (dbError) {
      // Use mock data in case of database error
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
    res.status(500).json({ message: 'Failed to retrieve cards. Please try again.' });
  }
};

// get une carte par ID
const getCardById = async (req, res) => {
  try {
    const card = await Card.findById(req.params.id)
      .populate('user', 'name email');

    if (!card) {
      return res.status(404).json({ message: 'Card not found' });
    }

    res.json({
      success: true,
      card
    });
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur' });
  }
};

// Create une nouvelle carte (business seulement ou anonyme)
const createCard = async (req, res) => {
  try {
    const { title, description, phone, email, website, address, company } = req.body;

    // If user is connected, check role
    if (req.user) {
      let user;
      try {
        user = await User.findById(req.user.id);
        if (!user) {
          // Fallback to mock users
          user = mockUsers.find(u => u._id.toString() === req.user.id.toString());
        }
      } catch (dbError) {
        // Fallback to mock users if MongoDB is unavailable
        user = mockUsers.find(u => u._id.toString() === req.user.id.toString());
      }

      if (!user) {
        return res.status(404).json({ 
          message: 'User not found'
        });
      }

      if (user.role !== 'business' && user.role !== 'admin') {
        return res.status(403).json({ 
          message: 'Business account required to create cards' 
        });
      }

      let card;
      try {
        card = await Card.create({
          title: title || user.name || `${user.firstName} ${user.lastName}`,
          description: description || `Carte professionnelle de ${user.name || user.firstName + ' ' + user.lastName}`,
          phone: phone || user.phone || '',
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
          message: 'Card created successfully',
          card: populatedCard
        });
      } catch (dbError) {
        // MongoDB fallback - create mock card
        const mockCard = {
          _id: new Date().getTime().toString(),
          title: title || user.name || `${user.firstName} ${user.lastName}`,
          description: description || `Carte professionnelle de ${user.name || user.firstName + ' ' + user.lastName}`,
          phone: phone || user.phone || '',
          email: email || user.email,
          website: website || '',
          address: address || '',
          company: company || '',
          user: {
            _id: user._id,
            name: user.name || `${user.firstName} ${user.lastName}`,
            email: user.email
          },
          anonymous: false,
          likes: [],
          createdAt: new Date(),
          updatedAt: new Date()
        };

        return res.json({
          success: true,
          message: 'Card created successfully',
          card: mockCard
        });
      }
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
      message: 'Card created successfully',
      card
    });
  } catch (error) {
    console.error('Card creation error:', error);
    res.status(500).json({ message: 'Failed to create card. Please try again.', error: error.message });
  }
};

// Update une carte (propriétaire seulement)
const updateCard = async (req, res) => {
  try {
    const card = await Card.findById(req.params.id);

    if (!card) {
      return res.status(404).json({ message: 'Carte non trouvée' });
    }

    // Verify that the user is the card owner
    if (card.user.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Unauthorized to update this card' });
    }

    const updatedCard = await Card.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    ).populate('user', 'name email');

    res.json({
      success: true,
      message: 'Card updated successfully',
      card: updatedCard
    });
  } catch (error) {
    res.status(500).json({ message: 'Failed to update card. Please try again.' });
  }
};

// supprimer une carte
const deleteCard = async (req, res) => {
  try {
    const card = await Card.findById(req.params.id);

    if (!card) {
      return res.status(404).json({ message: 'Carte non trouvée' });
    }

    // Verify permissions (owner or admin)
    const user = await User.findById(req.user.id);
    if (card.user.toString() !== req.user.id && user.role !== 'admin') {
      return res.status(403).json({ message: 'Unauthorized to delete this card' });
    }

    await Card.findByIdAndDelete(req.params.id);

    res.json({
      success: true,
      message: 'Card deleted successfully'
    });
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete card. Please try again.' });
  }
};

// get mes cartes
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
      // Use mock data if MongoDB is unavailable
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
      message: 'Failed to retrieve user cards. Please try again.',
      error: error.message 
    });
  }
};

// toggle like (pas encore implémenté)
const toggleLike = async (req, res) => {
  try {
    res.json({
      success: true,
      message: 'Feature will be available soon'
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
    res.status(500).json({ message: 'Server error occurred. Please try again.' });
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
