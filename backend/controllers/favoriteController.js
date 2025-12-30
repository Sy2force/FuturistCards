const Favorite = require('../models/Favorite');
const Card = require('../models/Card');
const { mockFavorites, mockCards } = require('../data/mockData');
const { t } = require('../utils/i18n');

// get les favoris de l'user
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
      message: t('server.serverError'),
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

// ajouter aux favoris
const addToFavorites = async (req, res) => {
  try {
    const { cardId } = req.params;
    
    // Verify si la carte existe
    const card = await Card.findById(cardId);
    if (!card) {
      return res.status(404).json({
        success: false,
        message: t('cards.cardNotFound')
      });
    }
    
    // Verify si déjà en favoris
    const existingFavorite = await Favorite.findOne({
      user: req.user.id,
      card: cardId
    });
    
    if (existingFavorite) {
      return res.status(400).json({
        success: false,
        message: 'כבר במועדפים'
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
      message: t('server.serverError')
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
        message: 'מועדף לא נמצא'
      });
    }
    
    res.json({
      success: true,
      message: 'הוסר מהמועדפים'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: t('server.serverError')
    });
  }
};

// Verify si en favoris
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
      message: t('server.serverError')
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
      message: t('server.serverError')
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
