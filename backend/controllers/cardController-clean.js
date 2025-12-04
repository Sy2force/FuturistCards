const Card = require('../models/Card-clean');
const User = require('../models/User-clean');

// @desc    Obtenir toutes les cartes publiques
// @route   GET /api/cards
// @access  Public
const getAllCards = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;
    const search = req.query.search || '';

    let query = { isPublic: true, isActive: true };

    // Recherche si un terme est fourni
    if (search) {
      const searchRegex = new RegExp(search, 'i');
      query.$or = [
        { title: searchRegex },
        { subtitle: searchRegex },
        { description: searchRegex },
        { company: searchRegex },
        { position: searchRegex },
        { tags: { $in: [searchRegex] } }
      ];
    }

    const cards = await Card.find(query)
      .populate('user', 'firstName lastName avatar')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    const total = await Card.countDocuments(query);

    res.status(200).json({
      success: true,
      data: {
        cards: cards.map(card => card.getPublicData()),
        pagination: {
          page,
          limit,
          total,
          pages: Math.ceil(total / limit)
        }
      }
    });

  } catch (error) {
    console.error('Erreur lors de la récupération des cartes:', error);
    res.status(500).json({
      success: false,
      message: 'Erreur interne du serveur'
    });
  }
};

// @desc    Obtenir une carte par ID
// @route   GET /api/cards/:id
// @access  Public
const getCardById = async (req, res) => {
  try {
    const card = await Card.findById(req.params.id)
      .populate('user', 'firstName lastName avatar');

    if (!card) {
      return res.status(404).json({
        success: false,
        message: 'Carte non trouvée'
      });
    }

    // Vérifier si la carte est publique ou si l'utilisateur est le propriétaire
    if (!card.isPublic && (!req.user || card.user._id.toString() !== req.user.id)) {
      return res.status(403).json({
        success: false,
        message: 'Accès non autorisé à cette carte'
      });
    }

    // Incrémenter les vues si ce n'est pas le propriétaire
    if (!req.user || card.user._id.toString() !== req.user.id) {
      await card.incrementViews();
    }

    res.status(200).json({
      success: true,
      data: {
        card: card.getPublicData()
      }
    });

  } catch (error) {
    console.error('Erreur lors de la récupération de la carte:', error);
    res.status(500).json({
      success: false,
      message: 'Erreur interne du serveur'
    });
  }
};

// @desc    Créer une nouvelle carte
// @route   POST /api/cards
// @access  Private
const createCard = async (req, res) => {
  try {
    const {
      title,
      subtitle,
      description,
      email,
      phone,
      website,
      company,
      position,
      address,
      image,
      isPublic,
      tags,
      theme
    } = req.body;

    // Validation des champs requis
    if (!title || !email) {
      return res.status(400).json({
        success: false,
        message: 'Le titre et l\'email sont requis'
      });
    }

    // Créer la carte
    const card = await Card.create({
      title,
      subtitle,
      description,
      email,
      phone,
      website,
      company,
      position,
      address,
      image,
      isPublic: isPublic !== undefined ? isPublic : true,
      tags: tags || [],
      theme: theme || {},
      user: req.user.id
    });

    const populatedCard = await Card.findById(card._id)
      .populate('user', 'firstName lastName avatar');

    res.status(201).json({
      success: true,
      message: 'Carte créée avec succès',
      data: {
        card: populatedCard.getPublicData()
      }
    });

  } catch (error) {
    console.error('Erreur lors de la création de la carte:', error);
    
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map(err => err.message);
      return res.status(400).json({
        success: false,
        message: 'Erreur de validation',
        errors: messages
      });
    }

    res.status(500).json({
      success: false,
      message: 'Erreur interne du serveur'
    });
  }
};

// @desc    Mettre à jour une carte
// @route   PUT /api/cards/:id
// @access  Private
const updateCard = async (req, res) => {
  try {
    const card = await Card.findById(req.params.id);

    if (!card) {
      return res.status(404).json({
        success: false,
        message: 'Carte non trouvée'
      });
    }

    // Vérifier que l'utilisateur est le propriétaire
    if (card.user.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: 'Non autorisé à modifier cette carte'
      });
    }

    const {
      title,
      subtitle,
      description,
      email,
      phone,
      website,
      company,
      position,
      address,
      image,
      isPublic,
      tags,
      theme
    } = req.body;

    // Mettre à jour les champs fournis
    if (title !== undefined) card.title = title;
    if (subtitle !== undefined) card.subtitle = subtitle;
    if (description !== undefined) card.description = description;
    if (email !== undefined) card.email = email;
    if (phone !== undefined) card.phone = phone;
    if (website !== undefined) card.website = website;
    if (company !== undefined) card.company = company;
    if (position !== undefined) card.position = position;
    if (address !== undefined) card.address = address;
    if (image !== undefined) card.image = image;
    if (isPublic !== undefined) card.isPublic = isPublic;
    if (tags !== undefined) card.tags = tags;
    if (theme !== undefined) card.theme = { ...card.theme, ...theme };

    await card.save();

    const updatedCard = await Card.findById(card._id)
      .populate('user', 'firstName lastName avatar');

    res.status(200).json({
      success: true,
      message: 'Carte mise à jour avec succès',
      data: {
        card: updatedCard.getPublicData()
      }
    });

  } catch (error) {
    console.error('Erreur lors de la mise à jour de la carte:', error);
    
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map(err => err.message);
      return res.status(400).json({
        success: false,
        message: 'Erreur de validation',
        errors: messages
      });
    }

    res.status(500).json({
      success: false,
      message: 'Erreur interne du serveur'
    });
  }
};

// @desc    Supprimer une carte
// @route   DELETE /api/cards/:id
// @access  Private
const deleteCard = async (req, res) => {
  try {
    const card = await Card.findById(req.params.id);

    if (!card) {
      return res.status(404).json({
        success: false,
        message: 'Carte non trouvée'
      });
    }

    // Vérifier que l'utilisateur est le propriétaire
    if (card.user.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: 'Non autorisé à supprimer cette carte'
      });
    }

    await Card.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      message: 'Carte supprimée avec succès'
    });

  } catch (error) {
    console.error('Erreur lors de la suppression de la carte:', error);
    res.status(500).json({
      success: false,
      message: 'Erreur interne du serveur'
    });
  }
};

// @desc    Obtenir les cartes de l'utilisateur connecté
// @route   GET /api/cards/my-cards
// @access  Private
const getMyCards = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const cards = await Card.find({ user: req.user.id })
      .populate('user', 'firstName lastName avatar')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    const total = await Card.countDocuments({ user: req.user.id });

    res.status(200).json({
      success: true,
      data: {
        cards: cards.map(card => card.getPublicData()),
        pagination: {
          page,
          limit,
          total,
          pages: Math.ceil(total / limit)
        }
      }
    });

  } catch (error) {
    console.error('Erreur lors de la récupération des cartes utilisateur:', error);
    res.status(500).json({
      success: false,
      message: 'Erreur interne du serveur'
    });
  }
};

// @desc    Liker/Unliker une carte
// @route   POST /api/cards/:id/like
// @access  Private
const toggleLike = async (req, res) => {
  try {
    const card = await Card.findById(req.params.id);

    if (!card) {
      return res.status(404).json({
        success: false,
        message: 'Carte non trouvée'
      });
    }

    if (!card.isPublic) {
      return res.status(403).json({
        success: false,
        message: 'Impossible de liker une carte privée'
      });
    }

    const wasLiked = card.isLikedBy(req.user.id);
    await card.toggleLike(req.user.id);

    res.status(200).json({
      success: true,
      message: wasLiked ? 'Like retiré' : 'Carte likée',
      data: {
        liked: !wasLiked,
        likesCount: card.likesCount
      }
    });

  } catch (error) {
    console.error('Erreur lors du like/unlike:', error);
    res.status(500).json({
      success: false,
      message: 'Erreur interne du serveur'
    });
  }
};

// @desc    Rechercher des cartes
// @route   GET /api/cards/search
// @access  Public
const searchCards = async (req, res) => {
  try {
    const { q: query, page = 1, limit = 10 } = req.query;

    if (!query) {
      return res.status(400).json({
        success: false,
        message: 'Terme de recherche requis'
      });
    }

    const skip = (parseInt(page) - 1) * parseInt(limit);

    const cards = await Card.search(query, {
      skip,
      limit: parseInt(limit)
    });

    res.status(200).json({
      success: true,
      data: {
        cards: cards.map(card => card.getPublicData()),
        query,
        pagination: {
          page: parseInt(page),
          limit: parseInt(limit)
        }
      }
    });

  } catch (error) {
    console.error('Erreur lors de la recherche:', error);
    res.status(500).json({
      success: false,
      message: 'Erreur interne du serveur'
    });
  }
};

// @desc    Obtenir les cartes populaires
// @route   GET /api/cards/popular
// @access  Public
const getPopularCards = async (req, res) => {
  try {
    const limit = parseInt(req.query.limit) || 10;
    const cards = await Card.getPopular(limit);

    res.status(200).json({
      success: true,
      data: {
        cards: cards.map(card => card.getPublicData())
      }
    });

  } catch (error) {
    console.error('Erreur lors de la récupération des cartes populaires:', error);
    res.status(500).json({
      success: false,
      message: 'Erreur interne du serveur'
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
