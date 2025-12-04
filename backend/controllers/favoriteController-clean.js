const User = require('../models/User-clean');
const Card = require('../models/Card-clean');

// @desc    Obtenir les cartes favorites de l'utilisateur
// @route   GET /api/favorites
// @access  Private
const getFavorites = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const user = await User.findById(req.user.id)
      .populate({
        path: 'favoriteCards',
        populate: {
          path: 'user',
          select: 'firstName lastName avatar'
        },
        options: {
          skip,
          limit,
          sort: { createdAt: -1 }
        }
      });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'Utilisateur non trouvé'
      });
    }

    const totalFavorites = user.favoriteCards.length;
    const favorites = user.favoriteCards.slice(skip, skip + limit);

    res.status(200).json({
      success: true,
      data: {
        favorites: favorites.map(card => card.getPublicData()),
        pagination: {
          page,
          limit,
          total: totalFavorites,
          pages: Math.ceil(totalFavorites / limit)
        }
      }
    });

  } catch (error) {
    console.error('Erreur lors de la récupération des favoris:', error);
    res.status(500).json({
      success: false,
      message: 'Erreur interne du serveur'
    });
  }
};

// @desc    Ajouter une carte aux favoris
// @route   POST /api/favorites/:cardId
// @access  Private
const addToFavorites = async (req, res) => {
  try {
    const { cardId } = req.params;

    // Vérifier que la carte existe
    const card = await Card.findById(cardId);
    if (!card) {
      return res.status(404).json({
        success: false,
        message: 'Carte non trouvée'
      });
    }

    // Vérifier que la carte est publique
    if (!card.isPublic) {
      return res.status(403).json({
        success: false,
        message: 'Impossible d\'ajouter une carte privée aux favoris'
      });
    }

    // Vérifier que l'utilisateur n'ajoute pas sa propre carte
    if (card.user.toString() === req.user.id) {
      return res.status(400).json({
        success: false,
        message: 'Vous ne pouvez pas ajouter votre propre carte aux favoris'
      });
    }

    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'Utilisateur non trouvé'
      });
    }

    // Vérifier si la carte est déjà dans les favoris
    if (user.favoriteCards.includes(cardId)) {
      return res.status(400).json({
        success: false,
        message: 'Cette carte est déjà dans vos favoris'
      });
    }

    // Ajouter aux favoris
    user.favoriteCards.push(cardId);
    await user.save();

    res.status(200).json({
      success: true,
      message: 'Carte ajoutée aux favoris avec succès'
    });

  } catch (error) {
    console.error('Erreur lors de l\'ajout aux favoris:', error);
    res.status(500).json({
      success: false,
      message: 'Erreur interne du serveur'
    });
  }
};

// @desc    Retirer une carte des favoris
// @route   DELETE /api/favorites/:cardId
// @access  Private
const removeFromFavorites = async (req, res) => {
  try {
    const { cardId } = req.params;

    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'Utilisateur non trouvé'
      });
    }

    // Vérifier si la carte est dans les favoris
    if (!user.favoriteCards.includes(cardId)) {
      return res.status(400).json({
        success: false,
        message: 'Cette carte n\'est pas dans vos favoris'
      });
    }

    // Retirer des favoris
    user.favoriteCards = user.favoriteCards.filter(
      id => id.toString() !== cardId
    );
    await user.save();

    res.status(200).json({
      success: true,
      message: 'Carte retirée des favoris avec succès'
    });

  } catch (error) {
    console.error('Erreur lors de la suppression des favoris:', error);
    res.status(500).json({
      success: false,
      message: 'Erreur interne du serveur'
    });
  }
};

// @desc    Vérifier si une carte est dans les favoris
// @route   GET /api/favorites/:cardId/check
// @access  Private
const checkFavorite = async (req, res) => {
  try {
    const { cardId } = req.params;

    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'Utilisateur non trouvé'
      });
    }

    const isFavorite = user.favoriteCards.includes(cardId);

    res.status(200).json({
      success: true,
      data: {
        isFavorite
      }
    });

  } catch (error) {
    console.error('Erreur lors de la vérification des favoris:', error);
    res.status(500).json({
      success: false,
      message: 'Erreur interne du serveur'
    });
  }
};

// @desc    Obtenir le nombre de favoris
// @route   GET /api/favorites/count
// @access  Private
const getFavoritesCount = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'Utilisateur non trouvé'
      });
    }

    const count = user.favoriteCards.length;

    res.status(200).json({
      success: true,
      data: {
        count
      }
    });

  } catch (error) {
    console.error('Erreur lors du comptage des favoris:', error);
    res.status(500).json({
      success: false,
      message: 'Erreur interne du serveur'
    });
  }
};

module.exports = {
  getFavorites,
  addToFavorites,
  removeFromFavorites,
  checkFavorite,
  getFavoritesCount
};
