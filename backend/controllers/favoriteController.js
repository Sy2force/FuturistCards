const Favorite = require('../models/Favorite');
const Card = require('../models/Card');
const { mockFavorites, mockCards } = require('../data/mockData');

// récupérer les favoris de l'utilisateur
const getFavorites = async (req, res) => {
  try {
    let favorites;
    try {
      favorites = await Favorite.find({ user: req.user.id })
        .populate('card')
        .sort({ createdAt: -1 });
    } catch (dbError) {
      // Fallback to mock data if MongoDB is unavailable
      const userFavorites = mockFavorites.filter(f => f.userId === req.user.id);
      favorites = userFavorites.map(fav => ({
        ...fav,
        card: mockCards.find(c => c._id === fav.cardId)
      }));
    }
    
    res.json({
      success: true,
      data: favorites
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Erreur serveur',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

// ajouter aux favoris
const addToFavorites = async (req, res) => {
  try {
    const { cardId } = req.params;
    
    // vérifier si la carte existe
    const card = await Card.findById(cardId);
    if (!card) {
      return res.status(404).json({
        success: false,
        message: 'Carte non trouvée'
      });
    }
    
    // vérifier si déjà en favoris
    const existingFavorite = await Favorite.findOne({
      user: req.user.id,
      card: cardId
    });
    
    if (existingFavorite) {
      return res.status(400).json({
        success: false,
        message: 'Déjà en favoris'
      });
    }
    
    const favorite = await Favorite.create({
      user: req.user.id,
      card: cardId
    });
    
    res.status(201).json({
      success: true,
      data: favorite
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Erreur serveur'
    });
  }
};

// retirer des favoris
const removeFromFavorites = async (req, res) => {
  try {
    const { cardId } = req.params;
    
    const favorite = await Favorite.findOneAndDelete({
      user: req.user.id,
      card: cardId
    });
    
    if (!favorite) {
      return res.status(404).json({
        success: false,
        message: 'Favori non trouvé'
      });
    }
    
    res.json({
      success: true,
      message: 'Retiré des favoris'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Erreur serveur'
    });
  }
};

// vérifier si en favoris
const checkFavorite = async (req, res) => {
  try {
    const { cardId } = req.params;
    
    const favorite = await Favorite.findOne({
      user: req.user.id,
      card: cardId
    });
    
    res.json({
      success: true,
      isFavorite: !!favorite
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Erreur serveur'
    });
  }
};

// nombre de favoris
const getFavoritesCount = async (req, res) => {
  try {
    const count = await Favorite.countDocuments({ user: req.user.id });
    
    res.json({
      success: true,
      count
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Erreur serveur'
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
