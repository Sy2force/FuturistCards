const Card = require('../models/Card');
const User = require('../models/User');

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
      count: cards.length,
      total,
      totalPages: Math.ceil(total / limit),
      currentPage: parseInt(page),
      cards
    });

  } catch (error) {
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
    res.status(500).json({
      success: false,
      message: 'Erreur serveur lors de la récupération de vos cartes'
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
