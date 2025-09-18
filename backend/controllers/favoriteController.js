const Favorite = require('../models/Favorite');
const Card = require('../models/Card');
const User = require('../models/User');

// @desc    Toggle favorite card
// @route   POST /api/favorites/:cardId
// @access  Private
const toggleFavorite = async (req, res) => {
  try {
    const { cardId } = req.params;
    const userId = req.user.id;

    const card = await Card.findById(cardId);
    if (!card || !card.isActive) {
      return res.status(404).json({
        success: false,
        message: 'Card not found'
      });
    }

    const result = await Favorite.toggleFavorite(userId, cardId);

    const user = await User.findById(userId);
    if (result.action === 'added') {
      if (!user.favoriteCards.includes(cardId)) {
        user.favoriteCards.push(cardId);
      }
    } else {
      user.favoriteCards = user.favoriteCards.filter(
        id => id.toString() !== cardId.toString()
      );
    }
    await user.save();

    res.status(200).json({
      success: true,
      message: result.action === 'added' ? 'Card added to favorites' : 'Card removed from favorites',
      data: {
        action: result.action,
        favorite: result.favorite
      }
    });
  } catch (error) {
    console.error('Toggle favorite error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error toggling favorite'
    });
  }
};

// @desc    Get user's favorite cards
// @route   GET /api/favorites
// @access  Private
const getFavorites = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const startIndex = (page - 1) * limit;
    const { search, category, sortBy } = req.query;

    // Handle both ObjectId and string user IDs for mock compatibility
    let userId = req.user.id;
    if (typeof userId === 'string' && userId.length !== 24) {
      // For mock users with non-ObjectId IDs, use string comparison
      const favorites = [];
      return res.status(200).json({
        success: true,
        count: 0,
        total: 0,
        pagination: {
          page,
          pages: 0,
          limit
        },
        data: favorites
      });
    }

    let query = { user: userId };
    
    const favorites = await Favorite.find(query)
      .populate({
        path: 'card',
        match: { isActive: true },
        populate: {
          path: 'user_id',
          select: 'firstName lastName'
        }
      })
      .sort({ createdAt: -1 })
      .limit(limit * 1)
      .skip(startIndex);

    // Filter out favorites where card is null (deleted cards)
    let validFavorites = favorites.filter(fav => fav.card !== null);

    // Apply search filter
    if (search) {
      validFavorites = validFavorites.filter(fav => 
        fav.card.title.toLowerCase().includes(search.toLowerCase()) ||
        fav.card.subtitle.toLowerCase().includes(search.toLowerCase()) ||
        fav.card.description.toLowerCase().includes(search.toLowerCase())
      );
    }

    // Apply category filter
    if (category && category !== 'all') {
      validFavorites = validFavorites.filter(fav => 
        fav.card.category === category
      );
    }

    // Apply sorting
    if (sortBy) {
      switch (sortBy) {
        case 'alphabetical':
          validFavorites.sort((a, b) => a.card.title.localeCompare(b.card.title));
          break;
        case 'category':
          validFavorites.sort((a, b) => a.card.category.localeCompare(b.card.category));
          break;
        case 'oldest':
          validFavorites.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
          break;
        default: // 'recent'
          validFavorites.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      }
    }

    const total = await Favorite.countDocuments(query);

    res.status(200).json({
      success: true,
      count: validFavorites.length,
      total,
      pagination: {
        page,
        pages: Math.ceil(total / limit),
        limit
      },
      data: validFavorites
    });
  } catch (error) {
    console.error('Get favorites error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error getting favorites'
    });
  }
};

// @desc    Remove favorite card
// @route   DELETE /api/favorites/:cardId
// @access  Private
const removeFavorite = async (req, res) => {
  try {
    const { cardId } = req.params;
    const userId = req.user.id;

    const favorite = await Favorite.findOne({ user: userId, card: cardId });
    
    if (!favorite) {
      return res.status(404).json({
        success: false,
        message: 'Favorite not found'
      });
    }

    await Favorite.deleteOne({ user: userId, card: cardId });

    const user = await User.findById(userId);
    user.favoriteCards = user.favoriteCards.filter(
      id => id.toString() !== cardId.toString()
    );
    await user.save();

    res.status(200).json({
      success: true,
      message: 'Card removed from favorites'
    });
  } catch (error) {
    console.error('Remove favorite error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error removing favorite'
    });
  }
};

// @desc    Check if card is favorited by user
// @route   GET /api/favorites/:cardId/check
// @access  Private
const checkFavorite = async (req, res) => {
  try {
    const { cardId } = req.params;
    const userId = req.user.id;

    const isFavorited = await Favorite.isFavorited(userId, cardId);

    res.status(200).json({
      success: true,
      data: {
        isFavorited: !!isFavorited
      }
    });
  } catch (error) {
    console.error('Check favorite error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error checking favorite'
    });
  }
};

// @desc    Get favorite count for a card
// @route   GET /api/favorites/count/:cardId
// @access  Public
const getFavoriteCount = async (req, res) => {
  try {
    const { cardId } = req.params;

    const count = await Favorite.getFavoriteCount(cardId);

    res.status(200).json({
      success: true,
      data: {
        count
      }
    });
  } catch (error) {
    console.error('Get favorite count error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error getting favorite count'
    });
  }
};

// @desc    Clear all favorites for user
// @route   DELETE /api/favorites
// @access  Private
const clearAllFavorites = async (req, res) => {
  try {
    const userId = req.user.id;

    await Favorite.deleteMany({ user: userId });

    const user = await User.findById(userId);
    user.favoriteCards = [];
    await user.save();

    res.status(200).json({
      success: true,
      message: 'All favorites cleared successfully'
    });
  } catch (error) {
    console.error('Clear all favorites error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error clearing favorites'
    });
  }
};

// @desc    Get favorite statistics
// @route   GET /api/favorites/stats
// @access  Private
const getFavoriteStats = async (req, res) => {
  try {
    const userId = req.user.id;

    const totalFavorites = await Favorite.countDocuments({ user: userId });
    
    const categoryStats = await Favorite.aggregate([
      { $match: { user: userId } },
      {
        $lookup: {
          from: 'cards',
          localField: 'card',
          foreignField: '_id',
          as: 'cardData'
        }
      },
      { $unwind: '$cardData' },
      { $match: { 'cardData.isActive': true } },
      {
        $group: {
          _id: '$cardData.category',
          count: { $sum: 1 }
        }
      },
      { $sort: { count: -1 } }
    ]);

    const recentFavorites = await Favorite.find({ user: userId })
      .populate({
        path: 'card',
        match: { isActive: true },
        select: 'title category createdAt'
      })
      .sort({ createdAt: -1 })
      .limit(5);

    res.status(200).json({
      success: true,
      data: {
        totalFavorites,
        categoryStats,
        recentFavorites: recentFavorites.filter(fav => fav.card !== null)
      }
    });
  } catch (error) {
    console.error('Get favorite stats error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error getting favorite statistics'
    });
  }
};

module.exports = {
  toggleFavorite,
  getFavorites,
  removeFavorite,
  checkFavorite,
  getFavoriteCount,
  clearAllFavorites,
  getFavoriteStats
};
