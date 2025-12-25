const Card = require('../models/Card');
const User = require('../models/User');
<<<<<<< HEAD
const { mockCards, mockUsers } = require('../data/mockData');

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
=======

// Données de test pour le développement
const testCards = new Map([
    ['test_card_1', {
    _id: 'test_card_1',
    title: 'Tech Solutions Inc',
    subtitle: 'Développement Logiciel',
    description: 'Fournisseur leader de solutions logicielles innovantes pour les entreprises du monde entier.',
    phone: '+33-1-23-45-67-89',
    email: 'contact@techsolutions.fr',
    web: 'https://techsolutions.fr',
    image: {
      url: 'https://via.placeholder.com/400x200/1a1a2e/16213e?text=Tech+Solutions',
      alt: 'Carte de visite Tech Solutions'
    },
    address: {
      city: 'Paris',
      country: 'France',
      street: 'Rue de la Tech',
      houseNumber: '123'
    },
    category: 'technology',
    likes: 15,
    views: 120,
    user_id: 'test_user_1',
    createdAt: new Date('2024-01-15'),
    updatedAt: new Date('2024-01-15')
  }],
  ['test_card_2', {
    _id: 'test_card_2',
    title: 'Green Garden Restaurant',
    subtitle: 'Expérience Gastronomique',
    description: 'Cuisine authentique avec des ingrédients frais et locaux dans un cadre magnifique.',
    phone: '+33-1-98-76-54-32',
    email: 'info@greengarden.fr',
    web: 'https://greengarden.fr',
    image: {
      url: 'https://via.placeholder.com/400x200/2d5a27/4a7c59?text=Green+Garden',
      alt: 'Carte restaurant Green Garden'
    },
    address: {
      city: 'Lyon',
      country: 'France',
      street: 'Avenue du Jardin',
      houseNumber: '456'
    },
    category: 'restaurant',
    likes: 28,
    views: 85,
    user_id: 'test_user_2',
    createdAt: new Date('2024-02-10'),
    updatedAt: new Date('2024-02-10')
  }]
]);

/**
 * Utilitaire pour vérifier le mode mock
 */
const isMockMode = () => {
  return process.env.NODE_ENV === 'development' || !process.env.MONGODB_URI;
};

/**
 * Valider les données d'une carte
 */
const validateCardData = (data) => {
  const { title, subtitle, description, phone, email } = data;
  const errors = [];

  if (!title || title.trim().length < 2) {
    errors.push('Le titre doit contenir au moins 2 caractères');
>>>>>>> 1ca665d3f5f764417ada1cdd89a898f39ac3dccd
  }

  if (!subtitle || subtitle.trim().length < 2) {
    errors.push('Le sous-titre doit contenir au moins 2 caractères');
  }

  if (!description || description.trim().length < 10) {
    errors.push('La description doit contenir au moins 10 caractères');
  }

  if (!phone || phone.trim().length < 8) {
    errors.push('Le numéro de téléphone est requis');
  }

  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    errors.push('Email invalide');
  }

  return errors;
};

<<<<<<< HEAD
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
=======
/**
 * Obtenir toutes les cartes avec filtres et pagination
 */
const getAllCards = async (req, res) => {
  try {
    const { 
      page = 1, 
      limit = 12, 
      search = '', 
      category = '', 
      sortBy = 'createdAt',
      sortOrder = 'desc' 
    } = req.query;

    if (isMockMode()) {
      let cards = Array.from(testCards.values());

      // Filtrage par recherche
      if (search) {
        const searchLower = search.toLowerCase();
        cards = cards.filter(card => 
          card.title.toLowerCase().includes(searchLower) ||
          card.subtitle.toLowerCase().includes(searchLower) ||
          card.description.toLowerCase().includes(searchLower)
        );
      }

      // Filtrage par catégorie
      if (category) {
        cards = cards.filter(card => card.category === category);
      }

      // Tri
      cards.sort((a, b) => {
        const aValue = a[sortBy];
        const bValue = b[sortBy];
        
        if (sortOrder === 'desc') {
          return new Date(bValue) - new Date(aValue);
        }
        return new Date(aValue) - new Date(bValue);
      });

      // Pagination
      const startIndex = (page - 1) * limit;
      const endIndex = startIndex + parseInt(limit);
      const paginatedCards = cards.slice(startIndex, endIndex);

      return res.json({
        success: true,
        count: paginatedCards.length,
        total: cards.length,
        totalPages: Math.ceil(cards.length / limit),
        currentPage: parseInt(page),
        cards: paginatedCards
      });
    }

    // Construction de la requête MongoDB
    const query = {};
    
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { subtitle: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } }
      ];
    }

    if (category) {
      query.category = category;
    }
>>>>>>> 1ca665d3f5f764417ada1cdd89a898f39ac3dccd

    const sortOptions = {};
    sortOptions[sortBy] = sortOrder === 'desc' ? -1 : 1;

    const cards = await Card.find(query)
      .populate('user_id', 'firstName lastName email')
      .sort(sortOptions)
      .limit(limit * 1)
      .skip((page - 1) * limit);

    const total = await Card.countDocuments(query);

    res.json({
      success: true,
<<<<<<< HEAD
      message: 'Carte créée avec succès',
      card: populatedCard
=======
      count: cards.length,
      total,
      totalPages: Math.ceil(total / limit),
      currentPage: parseInt(page),
      cards
>>>>>>> 1ca665d3f5f764417ada1cdd89a898f39ac3dccd
    });
  } catch (error) {
<<<<<<< HEAD
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
=======
    // Erreur gérée par errorHandler
    res.status(500).json({
      success: false,
      message: 'Erreur serveur lors de la récupération des cartes'
    });
  }
};

/**
 * Obtenir une carte par son ID
 */
const getCardById = async (req, res) => {
  try {
    const { id } = req.params;

    if (isMockMode()) {
      const card = testCards.get(id);
      if (!card) {
        return res.status(404).json({
          success: false,
          message: 'Carte non trouvée'
        });
      }

      // Incrémenter les vues
      card.views = (card.views || 0) + 1;
      testCards.set(id, card);

      return res.json({
        success: true,
        card
      });
    }

    const card = await Card.findById(id).populate('user_id', 'firstName lastName email');
    
    if (!card) {
      return res.status(404).json({
        success: false,
        message: 'Carte non trouvée'
      });
    }

    // Incrémenter les vues
    card.views = (card.views || 0) + 1;
    await card.save();

    res.json({
      success: true,
      card
    });

  } catch (error) {
    // Erreur gérée par errorHandler
    res.status(500).json({
      success: false,
      message: 'Erreur serveur lors de la récupération de la carte'
    });
  }
};

/**
 * Créer une nouvelle carte (business seulement)
 */
const createCard = async (req, res) => {
  try {
    const userId = req.user.id;
    const cardData = req.body;

    // Vérifier que l'utilisateur est business
    if (!req.user.isBusiness && !req.user.isAdmin) {
      return res.status(403).json({
        success: false,
        message: 'Seuls les comptes business peuvent créer des cartes'
      });
    }

    // Validation des données
    const validationErrors = validateCardData(cardData);
    if (validationErrors.length > 0) {
      return res.status(400).json({
        success: false,
        message: 'Données invalides',
        errors: validationErrors
      });
    }

    if (isMockMode()) {
      const newCard = {
        _id: 'test_card_' + Date.now(),
        ...cardData,
        user_id: userId,
        likes: 0,
        views: 0,
        createdAt: new Date(),
        updatedAt: new Date()
      };

      testCards.set(newCard._id, newCard);

      return res.status(201).json({
        success: true,
        message: 'Carte créée avec succès (mode test)',
        card: newCard
      });
    }

    const newCard = await Card.create({
      ...cardData,
      user_id: userId
    });

    const populatedCard = await Card.findById(newCard._id).populate('user_id', 'firstName lastName email');

    res.status(201).json({
      success: true,
      message: 'Carte créée avec succès',
      card: populatedCard
    });

  } catch (error) {
    // Erreur gérée par errorHandler
    res.status(500).json({
      success: false,
      message: 'Erreur serveur lors de la création de la carte'
    });
  }
};

/**
 * Mettre à jour une carte
 */
const updateCard = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;
    const updateData = req.body;

    // Validation des données
    const validationErrors = validateCardData(updateData);
    if (validationErrors.length > 0) {
      return res.status(400).json({
        success: false,
        message: 'Données invalides',
        errors: validationErrors
      });
    }

    if (isMockMode()) {
      const card = testCards.get(id);
      if (!card) {
        return res.status(404).json({
          success: false,
          message: 'Carte non trouvée'
        });
      }

      // Vérifier que l'utilisateur est propriétaire ou admin
      if (card.user_id !== userId && !req.user.isAdmin) {
        return res.status(403).json({
          success: false,
          message: 'Non autorisé à modifier cette carte'
        });
      }

      const updatedCard = {
        ...card,
        ...updateData,
        updatedAt: new Date()
      };

      testCards.set(id, updatedCard);

      return res.json({
        success: true,
        message: 'Carte mise à jour avec succès (mode test)',
        card: updatedCard
      });
    }

    const card = await Card.findById(id);
    if (!card) {
      return res.status(404).json({
        success: false,
        message: 'Carte non trouvée'
      });
    }

    // Vérifier que l'utilisateur est propriétaire ou admin
    if (card.user_id.toString() !== userId && !req.user.isAdmin) {
      return res.status(403).json({
        success: false,
        message: 'Non autorisé à modifier cette carte'
      });
    }

    const updatedCard = await Card.findByIdAndUpdate(
      id,
      { ...updateData, updatedAt: new Date() },
      { new: true, runValidators: true }
    ).populate('user_id', 'firstName lastName email');

    res.json({
      success: true,
      message: 'Carte mise à jour avec succès',
      card: updatedCard
    });

  } catch (error) {
    // Erreur gérée par errorHandler
    res.status(500).json({
      success: false,
      message: 'Erreur serveur lors de la mise à jour de la carte'
    });
  }
};

/**
 * Supprimer une carte
 */
const deleteCard = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;

    if (isMockMode()) {
      const card = testCards.get(id);
      if (!card) {
        return res.status(404).json({
          success: false,
          message: 'Carte non trouvée'
        });
      }

      // Vérifier que l'utilisateur est propriétaire ou admin
      if (card.user_id !== userId && !req.user.isAdmin) {
        return res.status(403).json({
          success: false,
          message: 'Non autorisé à supprimer cette carte'
        });
      }

      testCards.delete(id);

      return res.json({
        success: true,
        message: 'Carte supprimée avec succès (mode test)'
      });
    }

    const card = await Card.findById(id);
    if (!card) {
      return res.status(404).json({
        success: false,
        message: 'Carte non trouvée'
      });
    }

    // Empêcher la suppression des cartes de démonstration
    if (card.isDemo) {
      return res.status(403).json({
        success: false,
        message: 'Impossible de supprimer une carte de démonstration'
      });
    }

    // Vérifier que l'utilisateur est propriétaire ou admin
    if (card.user_id.toString() !== userId && !req.user.isAdmin) {
      return res.status(403).json({
        success: false,
        message: 'Non autorisé à supprimer cette carte'
      });
    }

    await Card.findByIdAndDelete(id);

    res.json({
      success: true,
      message: 'Carte supprimée avec succès'
    });

  } catch (error) {
    // Erreur gérée par errorHandler
    res.status(500).json({
      success: false,
      message: 'Erreur serveur lors de la suppression de la carte'
    });
  }
};

/**
 * Obtenir les cartes de l'utilisateur connecté
 */
const getMyCards = async (req, res) => {
  try {
    const userId = req.user.id;
    const { page = 1, limit = 12 } = req.query;

    if (isMockMode()) {
      const userCards = Array.from(testCards.values())
        .filter(card => card.user_id === userId)
        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

      const startIndex = (page - 1) * limit;
      const endIndex = startIndex + parseInt(limit);
      const paginatedCards = userCards.slice(startIndex, endIndex);

      if (paginatedCards.length === 0) {
        return res.json({
          success: true,
          count: 0,
          total: 0,
          totalPages: 0,
          currentPage: parseInt(page),
          cards: [],
          message: "Aucune carte trouvée pour cet utilisateur"
        });
      }

      return res.json({
        success: true,
        count: paginatedCards.length,
        total: userCards.length,
        totalPages: Math.ceil(userCards.length / limit),
        currentPage: parseInt(page),
        cards: paginatedCards
      });
    }

    const cards = await Card.find({ user_id: userId })
      .sort({ createdAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit);

    const total = await Card.countDocuments({ user_id: userId });

    res.json({
      success: true,
      count: cards.length,
      total,
      totalPages: Math.ceil(total / limit),
      currentPage: parseInt(page),
      cards
    });

  } catch (error) {
    // Erreur gérée par errorHandler
    res.status(404).json({
      success: false,
      message: 'Carte non trouvée'
    });
  }
};

/**
 * Liker/Unliker une carte
 */
const toggleLike = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;

    if (isMockMode()) {
      const card = testCards.get(id);
      if (!card) {
        return res.status(404).json({
          success: false,
          message: 'Carte non trouvée'
        });
      }

      // Simuler le toggle like
      card.likes = (card.likes || 0) + (Math.random() > 0.5 ? 1 : -1);
      if (card.likes < 0) card.likes = 0;
      
      testCards.set(id, card);

      return res.json({
        success: true,
        message: 'Like mis à jour (mode test)',
        likes: card.likes
      });
    }

    const card = await Card.findById(id);
    if (!card) {
      return res.status(404).json({
        success: false,
        message: 'Carte non trouvée'
      });
    }

    // Incrémenter ou décrémenter les likes
    card.likes = (card.likes || 0) + 1;
    await card.save();

    res.json({
      success: true,
      message: 'Like ajouté avec succès',
      likes: card.likes
    });

  } catch (error) {
    // Erreur gérée par errorHandler
    res.status(500).json({
      success: false,
      message: 'Erreur serveur lors de la mise à jour du like'
    });
  }
};

// Stockage des favoris en mode mock
const userFavorites = new Map();

/**
 * Ajouter/Retirer une carte des favoris
 */
const toggleFavorite = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;

    if (isMockMode()) {
      const card = testCards.get(id);
      if (!card) {
        return res.status(404).json({
          success: false,
          message: 'Carte non trouvée'
        });
      }

      // Gérer les favoris en mode mock
      if (!userFavorites.has(userId)) {
        userFavorites.set(userId, new Set());
      }

      const favorites = userFavorites.get(userId);
      const isFavorite = favorites.has(id);

      if (isFavorite) {
        favorites.delete(id);
      } else {
        favorites.add(id);
      }

      return res.json({
        success: true,
        message: isFavorite ? 'Carte retirée des favoris' : 'Carte ajoutée aux favoris',
        isFavorite: !isFavorite
      });
    }

    // Mode production avec MongoDB
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'Utilisateur non trouvé'
      });
    }

    const card = await Card.findById(id);
    if (!card) {
      return res.status(404).json({
        success: false,
        message: 'Carte non trouvée'
      });
    }

    const favorites = user.favoriteCards || [];
    const isFavorite = favorites.includes(id);

    if (isFavorite) {
      user.favoriteCards = favorites.filter(favId => favId.toString() !== id);
    } else {
      user.favoriteCards = [...favorites, id];
    }

    await user.save();

    res.json({
      success: true,
      message: isFavorite ? 'Carte retirée des favoris' : 'Carte ajoutée aux favoris',
      isFavorite: !isFavorite
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Erreur serveur lors de la mise à jour des favoris'
    });
  }
};

/**
 * Obtenir les cartes favorites de l'utilisateur
 */
const getFavorites = async (req, res) => {
  try {
    const userId = req.user.id;

    if (isMockMode()) {
      const favorites = userFavorites.get(userId) || new Set();
      const favoriteCards = Array.from(favorites)
        .map(cardId => testCards.get(cardId))
        .filter(card => card !== undefined);

      return res.json({
        success: true,
        count: favoriteCards.length,
        cards: favoriteCards
      });
    }

    const user = await User.findById(userId).populate({
      path: 'favoriteCards',
      populate: {
        path: 'user_id',
        select: 'firstName lastName email'
      }
    });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'Utilisateur non trouvé'
      });
>>>>>>> 1ca665d3f5f764417ada1cdd89a898f39ac3dccd
    }

    res.json({
      success: true,
<<<<<<< HEAD
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

=======
      count: user.favoriteCards.length,
      cards: user.favoriteCards
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Erreur serveur lors de la récupération des favoris'
    });
  }
};

/**
 * Vérifier si une carte est dans les favoris
 */
const checkFavorite = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;

    if (isMockMode()) {
      const favorites = userFavorites.get(userId) || new Set();
      const isFavorite = favorites.has(id);

      return res.json({
        success: true,
        isFavorite
      });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'Utilisateur non trouvé'
      });
    }

    const isFavorite = user.favoriteCards && user.favoriteCards.includes(id);

    res.json({
      success: true,
      isFavorite
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Erreur serveur lors de la vérification des favoris'
    });
  }
};

/**
 * Rechercher des cartes
 */
const searchCards = async (req, res) => {
  try {
    const { q, category, limit = 10 } = req.query;

    // Mode test pour développement
    if (process.env.NODE_ENV === 'development' || !process.env.MONGODB_URI) {
      let results = Array.from(testCards.values());

      if (q) {
        const query = q.toLowerCase();
        results = results.filter(card => 
          card.title.toLowerCase().includes(query) ||
          card.subtitle.toLowerCase().includes(query) ||
          card.description.toLowerCase().includes(query)
        );
      }

      if (category) {
        results = results.filter(card => card.category === category);
      }

      results = results.slice(0, parseInt(limit));

      return res.json({
        success: true,
        cards: results,
        total: results.length
      });
    }

    let query = {};
    
    if (q) {
      query.$text = { $search: q };
    }
    
    if (category) {
      query.category = category;
    }

    const cards = await Card.find(query)
      .populate('user_id', 'firstName lastName')
      .limit(parseInt(limit))
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      cards,
      total: cards.length
    });

  } catch (error) {
    // Erreur gérée par errorHandler
    res.status(500).json({
      success: false,
      message: 'Erreur serveur lors de la recherche'
    });
  }
};

/**
 * Obtenir les cartes populaires
 */
const getPopularCards = async (req, res) => {
  try {
    const { limit = 6 } = req.query;

    // Mode test pour développement
    if (process.env.NODE_ENV === 'development' || !process.env.MONGODB_URI) {
      const results = Array.from(testCards.values())
        .sort((a, b) => b.likes - a.likes)
        .slice(0, parseInt(limit));

      return res.json({
        success: true,
        cards: results,
        total: results.length
      });
    }

    const cards = await Card.find()
      .populate('user_id', 'firstName lastName')
      .sort({ likes: -1, views: -1 })
      .limit(parseInt(limit));

    res.json({
      success: true,
      cards,
      total: cards.length
    });

  } catch (error) {
    // Erreur gérée par errorHandler
    res.status(500).json({
      success: false,
      message: 'Erreur serveur lors de la récupération des cartes populaires'
    });
  }
};

>>>>>>> 1ca665d3f5f764417ada1cdd89a898f39ac3dccd
module.exports = {
  getAllCards,
  getCardById,
  createCard,
  updateCard,
  deleteCard,
  getMyCards,
  toggleLike,
<<<<<<< HEAD
=======
  toggleFavorite,
  getFavorites,
  checkFavorite,
>>>>>>> 1ca665d3f5f764417ada1cdd89a898f39ac3dccd
  searchCards,
  getPopularCards
};
