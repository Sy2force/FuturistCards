// Contrôleur des cartes - Version Mock + MongoDB
// import Card from '../models/Card.js';
// import User from '../models/User.js';

// Stockage temporaire des cartes en mémoire (remplace MongoDB pour le développement)
let cardsStorage = [];

// Mock data pour les cartes en mode développement
const mockCards = [
  {
    _id: '1',
    id: '1',
    title: 'John Doe - Développeur Full Stack',
    subtitle: 'Expert React & Node.js',
    description: 'Développeur passionné avec 5 ans d\'expérience en développement web moderne. Spécialisé en React, Node.js, et MongoDB.',
    phone: '+33 1 23 45 67 89',
    email: 'john.doe@example.com',
    web: 'https://johndoe.dev',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face',
    address: {
      state: 'Paris',
      country: 'France',
      city: 'Paris',
      street: '123 Rue de la Paix',
      houseNumber: '123',
      zip: '75001'
    },
    category: 'Technology',
    isPublic: true,
    isBusiness: true,
    bizNumber: 'B12345',
    user_id: 'mock-user-1',
    likes: [],
    likeCount: 15,
    views: 234,
    createdAt: new Date('2024-01-15'),
    updatedAt: new Date('2024-01-15')
  },
  {
    _id: '2', 
    id: '2',
    title: 'Sophie Martin - Designer UX/UI',
    subtitle: 'Créatrice d\'expériences digitales',
    description: 'Designer UX/UI passionnée par la création d\'interfaces intuitives et esthétiques. Portfolio riche de projets variés.',
    phone: '+33 1 98 76 54 32',
    email: 'sophie.martin@design.com',
    web: 'https://sophiedesign.fr',
    image: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400&h=400&fit=crop&crop=face',
    address: {
      state: 'Lyon',
      country: 'France', 
      city: 'Lyon',
      street: '456 Avenue des Arts',
      houseNumber: '456',
      zip: '69002'
    },
    category: 'Design',
    isPublic: true,
    isBusiness: true,
    bizNumber: 'B67890',
    user_id: 'mock-user-2',
    likes: [],
    likeCount: 28,
    views: 187,
    createdAt: new Date('2024-01-20'),
    updatedAt: new Date('2024-01-20')
  },
  {
    _id: '3',
    id: '3', 
    title: 'Pierre Dubois - Consultant Marketing',
    subtitle: 'Stratégie digitale & Growth Hacking',
    description: 'Consultant en marketing digital spécialisé dans la croissance des startups. Expert en SEO, SEM et stratégies d\'acquisition.',
    phone: '+33 1 45 67 89 01',
    email: 'pierre.dubois@marketing.fr',
    web: 'https://pierremarketing.com',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face',
    address: {
      state: 'Marseille',
      country: 'France',
      city: 'Marseille', 
      street: '789 Boulevard du Commerce',
      houseNumber: '789',
      zip: '13001'
    },
    category: 'Marketing',
    isPublic: true,
    isBusiness: true,
    bizNumber: 'B13579',
    user_id: 'mock-user-3',
    likes: [],
    likeCount: 42,
    views: 356,
    createdAt: new Date('2024-01-25'),
    updatedAt: new Date('2024-01-25')
  },
  {
    _id: '4',
    id: '4',
    title: 'Marie Laurent - Architecte',
    subtitle: 'Architecture moderne & éco-responsable', 
    description: 'Architecte spécialisée dans les constructions durables et l\'architecture moderne. Projets résidentiels et commerciaux.',
    phone: '+33 1 11 22 33 44',
    email: 'marie.laurent@archi.com',
    web: 'https://marie-architecte.fr',
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop&crop=face',
    address: {
      state: 'Nice',
      country: 'France',
      city: 'Nice',
      street: '321 Promenade des Anglais', 
      houseNumber: '321',
      zip: '06000'
    },
    category: 'Architecture',
    isPublic: true,
    isBusiness: true,
    bizNumber: 'B24680',
    user_id: 'mock-user-4',
    likes: [],
    likeCount: 19,
    views: 298,
    createdAt: new Date('2024-02-01'),
    updatedAt: new Date('2024-02-01')
  },
  {
    _id: '5',
    id: '5',
    title: 'Thomas Chen - Chef Cuisinier',
    subtitle: 'Cuisine fusion asiatique-française',
    description: 'Chef étoilé spécialisé dans la fusion culinaire. Restaurant gastronomique à Paris avec influences asiatiques.',
    phone: '+33 1 55 66 77 88',
    email: 'thomas.chen@restaurant.com',
    web: 'https://chefthomas.fr',
    image: 'https://images.unsplash.com/photo-1566492031773-4f4e44671d66?w=400&h=400&fit=crop&crop=face',
    address: {
      state: 'Paris',
      country: 'France',
      city: 'Paris',
      street: '159 Rue Gourmande',
      houseNumber: '159',
      zip: '75008'
    },
    category: 'Culinary',
    isPublic: true,
    isBusiness: true,
    bizNumber: 'B97531',
    user_id: 'mock-user-5',
    likes: [],
    likeCount: 73,
    views: 512,
    createdAt: new Date('2024-02-05'),
    updatedAt: new Date('2024-02-05')
  }
];

// Initialiser les cartes mock au démarrage
cardsStorage = [...mockCards];

// @desc    Get user's cards
// @route   GET /api/cards/user
// @access  Private
const getUserCards = async (req, res) => {
  try {
    console.log('getUserCards called');
    console.log('req.user:', req.user);
    console.log('cardsStorage length:', cardsStorage.length);
    
    // En mode mock, retourner les cartes de l'utilisateur connecté
    const userCards = cardsStorage.filter(card => {
      const matches = card.user_id === req.user?.id || 
                     card.user_id === req.user?.userId ||
                     card.user_id === req.user?._id;
      console.log(`Card ${card._id} user_id: ${card.user_id}, matches: ${matches}`);
      return matches;
    });

    console.log('Found user cards:', userCards.length);

    res.json({
      success: true,
      data: userCards,
      count: userCards.length
    });
  } catch (error) {
    console.error('Get user cards error:', error);
    res.status(500).json({
      success: false,
      message: 'Erreur lors de la récupération des cartes utilisateur'
    });
  }
};

// @desc    Get all cards
// @route   GET /api/cards
// @access  Public
const getCards = async (req, res) => {
  try {
    const { search, category, page = 1, limit = 10 } = req.query;
    
    // Mode mock - utiliser les données de test
    let filteredCards = [...cardsStorage];
    
    // Filtrer par catégorie
    if (category) {
      filteredCards = filteredCards.filter(card => 
        card.category.toLowerCase().includes(category.toLowerCase())
      );
    }
    
    // Filtrer par recherche
    if (search) {
      filteredCards = filteredCards.filter(card =>
        card.title.toLowerCase().includes(search.toLowerCase()) ||
        card.description.toLowerCase().includes(search.toLowerCase()) ||
        card.category.toLowerCase().includes(search.toLowerCase())
      );
    }
    
    // Pagination
    const startIndex = (parseInt(page) - 1) * parseInt(limit);
    const endIndex = startIndex + parseInt(limit);
    const paginatedCards = filteredCards.slice(startIndex, endIndex);
    
    // Récupération des cartes en mode mock
    
    res.json({
      success: true,
      count: paginatedCards.length,
      total: filteredCards.length,
      page: parseInt(page),
      pages: Math.ceil(filteredCards.length / parseInt(limit)),
      data: paginatedCards
    });
    
  } catch (error) {
    console.error('Get cards error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};

// @desc    Create new card
// @route   POST /api/cards
// @access  Private (Business/Admin only)
const createCard = async (req, res) => {
  try {
    const {
      title,
      subtitle,
      description,
      phone,
      email,
      website,
      address,
      category,
      image
    } = req.body;

    // Validation des champs requis
    if (!title || !description || !phone || !email) {
      return res.status(400).json({
        success: false,
        message: 'Titre, description, téléphone et email sont requis'
      });
    }

    // Créer une nouvelle carte en mode mock
    const newCard = {
      _id: Date.now().toString(),
      id: Date.now().toString(),
      title,
      subtitle: subtitle || '',
      description,
      phone,
      email,
      web: website || '',
      image: image || 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face',
      address: typeof address === 'object' ? address : {
        state: address?.split(',')[1]?.trim() || 'Paris',
        country: 'France',
        city: address?.split(',')[1]?.trim() || 'Paris',
        street: address?.split(',')[0]?.trim() || 'Rue inconnue',
        houseNumber: '1',
        zip: '75000'
      },
      category: category || 'technology',
      isPublic: true,
      isBusiness: true,
      bizNumber: `B${Date.now()}`,
      user_id: req.user?.id || req.user?.userId || 'mock-user',
      likes: [],
      likeCount: 0,
      views: 0,
      createdAt: new Date(),
      updatedAt: new Date()
    };

    // Ajouter la carte au stockage en mémoire
    cardsStorage.push(newCard);

    res.status(201).json({
      success: true,
      message: 'Carte créée avec succès',
      data: newCard
    });

  } catch (error) {
    console.error('Create card error:', error);
    res.status(400).json({
      success: false,
      message: error.message || 'Erreur lors de la création de la carte'
    });
  }
};

// @desc    Get single card
// @route   GET /api/cards/:id
// @access  Public
const getCard = async (req, res) => {
  try {
    // Mode mock - chercher dans les données de test
    const card = mockCards.find(c => c._id === req.params.id || c.id === req.params.id);
    
    if (!card) {
      return res.status(404).json({
        success: false,
        message: 'Card not found'
      });
    }
    
    // Simuler l'incrémentation des vues
    card.views += 1;
    
    // Récupération carte en mode mock
    
    res.json({
      success: true,
      data: card
    });
    
  } catch (error) {
    console.error('Get card error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};

// @desc    Search cards
// @route   GET /api/cards/search
// @access  Public
const searchCards = async (req, res) => {
  try {
    const { q: searchTerm, category } = req.query;
    
    if (!searchTerm) {
      return res.status(400).json({
        success: false,
        message: 'Terme de recherche requis'
      });
    }
    
    // Mode mock - recherche dans les données de test
    let results = mockCards.filter(card =>
      card.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      card.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      card.category.toLowerCase().includes(searchTerm.toLowerCase())
    );
    
    // Filtrer par catégorie si spécifiée
    if (category) {
      results = results.filter(card => 
        card.category.toLowerCase().includes(category.toLowerCase())
      );
    }
    
    // Recherche effectuée en mode mock
    
    res.json({
      success: true,
      count: results.length,
      data: results
    });
  } catch (error) {
    console.error('Search cards error:', error);
    res.status(500).json({
      success: false,
      message: 'Erreur serveur lors de la recherche'
    });
  }
};

// @desc    Delete card
// @route   DELETE /api/cards/:id
// @access  Private (Owner or Admin)
const deleteCard = async (req, res) => {
  try {
    const card = await Card.findById(req.params.id);
    
    if (!card) {
      return res.status(404).json({
        success: false,
        message: 'Card not found'
      });
    }
    
    // Check ownership or admin
    if (card.user_id.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to delete this card'
      });
    }
    
    await Card.findByIdAndDelete(req.params.id);
    
    // Carte supprimée de MongoDB
    
    res.json({
      success: true,
      message: 'Card deleted successfully'
    });
    
  } catch (error) {
    console.error('Delete card error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};

// @desc    Update card
// @route   PUT /api/cards/:id
// @access  Private (Owner or Admin)
const updateCard = async (req, res) => {
  try {
    const card = await Card.findById(req.params.id);
    
    if (!card) {
      return res.status(404).json({
        success: false,
        message: 'Card not found'
      });
    }
    
    // Check ownership or admin
    if (card.user_id.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to update this card'
      });
    }
    
    const updatedCard = await Card.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    
    // Carte mise à jour dans MongoDB
    
    res.json({
      success: true,
      message: 'Card updated successfully',
      data: updatedCard
    });
    
  } catch (error) {
    console.error('Update card error:', error);
    res.status(400).json({
      success: false,
      message: error.message || 'Error updating card'
    });
  }
};

// @desc    Get search suggestions
// @route   GET /api/cards/suggestions
// @access  Public
const getSearchSuggestions = async (req, res) => {
  try {
    const { q } = req.query;
    
    if (!q || q.length < 2) {
      return res.json({
        success: true,
        data: []
      });
    }
    
    const suggestions = await Card.aggregate([
      {
        $match: {
          $or: [
            { title: { $regex: q, $options: 'i' } },
            { description: { $regex: q, $options: 'i' } },
            { category: { $regex: q, $options: 'i' } }
          ]
        }
      },
      {
        $group: {
          _id: null,
          titles: { $addToSet: '$title' },
          categories: { $addToSet: '$category' }
        }
      }
    ]);
    
    const result = suggestions[0] || { titles: [], categories: [] };
    const allSuggestions = [...result.titles, ...result.categories]
      .filter(item => item && item.toLowerCase().includes(q.toLowerCase()))
      .slice(0, 10);
    
    res.json({
      success: true,
      data: allSuggestions
    });
    
  } catch (error) {
    console.error('Get suggestions error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};

// @desc    Like/Unlike card
// @route   PATCH /api/cards/:id/like
// @access  Private
const likeCard = async (req, res) => {
  try {
    const card = await Card.findById(req.params.id);
    
    if (!card) {
      return res.status(404).json({
        success: false,
        message: 'Card not found'
      });
    }
    
    const userId = req.user.id || req.user.userId;
    const hasLiked = card.likes && card.likes.includes(userId);
    
    let updatedCard;
    
    if (hasLiked) {
      // Unlike
      updatedCard = await Card.findByIdAndUpdate(
        req.params.id,
        {
          $pull: { likes: userId },
          $inc: { likeCount: -1 }
        },
        { new: true }
      );
    } else {
      // Like
      updatedCard = await Card.findByIdAndUpdate(
        req.params.id,
        {
          $addToSet: { likes: userId },
          $inc: { likeCount: 1 }
        },
        { new: true }
      );
    }
    
    // Carte likée/unlikée
    
    res.json({
      success: true,
      message: hasLiked ? 'Card unliked' : 'Card liked',
      data: {
        liked: !hasLiked,
        likeCount: updatedCard.likeCount || 0
      }
    });
    
  } catch (error) {
    console.error('Like card error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};

// @desc    Toggle favorite card
// @route   POST /api/cards/:id/favorite
// @access  Private
const toggleFavorite = async (req, res) => {
  try {
    const userId = req.user.id || req.user.userId;
    const cardId = req.params.id;
    
    // Vérifier si la carte existe
    const card = await Card.findById(cardId);
    if (!card) {
      return res.status(404).json({
        success: false,
        message: 'Card not found'
      });
    }
    
    // Vérifier si déjà en favoris
    const existingFavorite = await Favorite.findOne({
      userId: userId,
      cardId: cardId
    });
    
    let isFavorite;
    
    if (existingFavorite) {
      // Retirer des favoris
      await Favorite.findByIdAndDelete(existingFavorite._id);
      isFavorite = false;
      // Carte retirée des favoris
    } else {
      // Ajouter aux favoris
      const favorite = new Favorite({
        userId: userId,
        cardId: cardId
      });
      await favorite.save();
      isFavorite = true;
      // Carte ajoutée aux favoris
    }
    
    res.json({
      success: true,
      message: isFavorite ? 'Added to favorites' : 'Removed from favorites',
      data: {
        isFavorite: isFavorite
      }
    });
    
  } catch (error) {
    console.error('Toggle favorite error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};

// @desc    Update card business number (Admin only)
// @route   PATCH /api/cards/:id/biznumber
// @access  Admin only
const updateBizNumber = async (req, res) => {
  try {
    const { bizNumber } = req.body;
    
    const updatedCard = await Card.findByIdAndUpdate(
      req.params.id,
      { bizNumber },
      { new: true, runValidators: true }
    );
    
    if (!updatedCard) {
      return res.status(404).json({
        success: false,
        message: 'Card not found'
      });
    }
    
    // Numéro d'entreprise mis à jour par admin
    
    res.json({
      success: true,
      message: 'Business number updated successfully',
      data: updatedCard
    });
    
  } catch (error) {
    console.error('Update biz number error:', error);
    res.status(400).json({
      success: false,
      message: error.message || 'Error updating business number'
    });
  }
};

// Legacy function for backward compatibility
const getMyCards = getUserCards;

export { 
  getCards, 
  getUserCards,
  createCard, 
  getMyCards, 
  getCard, 
  searchCards, 
  deleteCard,
  updateCard,
  getSearchSuggestions,
  likeCard,
  toggleFavorite,
  updateBizNumber
};
