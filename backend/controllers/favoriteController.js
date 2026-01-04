const Favorite = require('../models/Favorite');
const Card = require('../models/Card');
const { mockFavorites, mockCards } = require('../data/mockData');
// Removed i18n dependency - using English only

// Get user favorites
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
      message: 'Server error occurred. Please try again.',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

// Add to favorites
const addToFavorites = async (req, res) => {
  try {
    const { cardId } = req.params;
    
    // Verify that the card exists
    const card = await Card.findById(cardId);
    if (!card) {
      return res.status(404).json({
        success: false,
        message: 'Card not found'
      });
    }
    
    // Check if already in favorites
    const existingFavorite = await Favorite.findOne({
      user: req.user.id,
      card: cardId
    });
    
    if (existingFavorite) {
      return res.status(400).json({
        success: false,
        message: 'Card is already in favorites'
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
      message: 'Server error occurred. Please try again.'
    });
  }
};

// Remove from favorites
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
        message: 'Favorite not found'
      });
    }
    
    res.json({
      success: true,
      message: 'Removed from favorites successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error occurred. Please try again.'
    });
  }
};

// Check if in favorites
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
      message: 'Server error occurred. Please try again.'
    });
  }
};

// Get favorites count
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
      message: 'Server error occurred. Please try again.'
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
