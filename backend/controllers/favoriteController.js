const Favorite = require('../models/Favorite');
const Card = require('../models/Card');
const User = require('../models/User');
const mongoose = require('mongoose');

// @desc    Toggle favorite card
// @route   POST /api/favorites/toggle
// @access  Private
const toggleFavorite = async (req, res) => {
  try {
    const { cardId } = req.body;
    const userId = req.user.id;

    // Validate cardId format
    if (!mongoose.Types.ObjectId.isValid(cardId)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid card ID format',
      });
    }

    const card = await Card.findById(cardId);
    if (!card || !card.isActive) {
      return res.status(404).json({
        success: false,
        message: 'Card not found',
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
        (id) => id.toString() !== cardId.toString()
      );
    }
    await user.save();

    res.status(200).json({
      success: true,
      message:
        result.action === 'added'
          ? 'Card added to favorites'
          : 'Card removed from favorites',
      data: {
        action: result.action,
        favorite: result.favorite,
      },
    });
  } catch (error) {
    console.error('Toggle favorite error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error toggling favorite',
    });
  }
};

// @desc    Get user favorites
// @route   GET /api/favorites
// @access  Private
const getFavorites = async (req, res) => {
  try {
    const userId = req.user.id;
    const { page = 1, limit = 10, search, category, sortBy } = req.query;

    const startIndex = (page - 1) * limit;

    // Mock data for testing when MongoDB is disconnected
    if (!mongoose.connection.readyState) {
      let favorites = [
        {
          _id: 'fav-1',
          user: userId,
          card: {
            _id: 'card-1',
            title: 'Design Studio Pro',
            subtitle: 'Creative Solutions',
            description: 'Studio de design créatif spécialisé dans l\'identité visuelle',
            category: 'Design',
            image: { url: 'https://images.unsplash.com/photo-1558655146-9f40138edfeb?w=400', alt: 'Design Studio' },
            views: 156,
            likesCount: 23,
            isActive: true,
            user_id: { firstName: 'John', lastName: 'Doe' }
          },
          createdAt: new Date().toISOString()
        },
        {
          _id: 'fav-2',
          user: userId,
          card: {
            _id: 'card-2',
            title: 'Tech Innovators',
            subtitle: 'Solutions Technologiques',
            description: 'Développement d\'applications mobiles et web',
            category: 'Technology',
            image: { url: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=400', alt: 'Tech Company' },
            views: 89,
            likesCount: 15,
            isActive: true,
            user_id: { firstName: 'Jane', lastName: 'Smith' }
          },
          createdAt: new Date(Date.now() - 86400000).toISOString()
        }
      ];

      // Apply search filter
      if (search) {
        favorites = favorites.filter(
          fav =>
            fav.card.title.toLowerCase().includes(search.toLowerCase()) ||
            fav.card.description.toLowerCase().includes(search.toLowerCase()) ||
            fav.card.category.toLowerCase().includes(search.toLowerCase())
        );
      }

      // Apply category filter
      if (category) {
        favorites = favorites.filter(
          fav => fav.card.category === category
        );
      }

      // Apply sorting
      if (sortBy) {
        switch (sortBy) {
          case 'alphabetical':
            favorites.sort((a, b) =>
              a.card.title.localeCompare(b.card.title)
            );
            break;
          case 'category':
            favorites.sort((a, b) =>
              a.card.category.localeCompare(b.card.category)
            );
            break;
          case 'oldest':
            favorites.sort(
              (a, b) => new Date(a.createdAt) - new Date(b.createdAt)
            );
            break;
          default: // 'recent'
            favorites.sort(
              (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
            );
        }
      }

      const total = favorites.length;
      const paginatedFavorites = favorites.slice(startIndex, startIndex + parseInt(limit));

      return res.status(200).json({
        success: true,
        count: paginatedFavorites.length,
        total,
        pagination: {
          page: parseInt(page),
          pages: Math.ceil(total / limit),
          limit: parseInt(limit),
        },
        data: paginatedFavorites,
      });
    }

    // MongoDB connecté - utiliser la base de données
    let query = { user: userId };

    const favorites = await Favorite.find(query)
      .populate({
        path: 'card',
        match: { isActive: true },
        populate: {
          path: 'user_id',
          select: 'firstName lastName',
        },
      })
      .sort({ createdAt: -1 })
      .limit(limit * 1)
      .skip(startIndex);

    // Filter out favorites where card is null (deleted cards)
    let validFavorites = favorites.filter((fav) => fav.card !== null);

    // Apply search filter
    if (search) {
      validFavorites = validFavorites.filter(
        (fav) =>
          fav.card.title.toLowerCase().includes(search.toLowerCase()) ||
          fav.card.description.toLowerCase().includes(search.toLowerCase()) ||
          fav.card.category.toLowerCase().includes(search.toLowerCase())
      );
    }

    // Apply category filter
    if (category) {
      validFavorites = validFavorites.filter(
        (fav) => fav.card.category === category
      );
    }

    // Apply sorting
    if (sortBy) {
      switch (sortBy) {
        case 'alphabetical':
          validFavorites.sort((a, b) =>
            a.card.title.localeCompare(b.card.title)
          );
          break;
        case 'category':
          validFavorites.sort((a, b) =>
            a.card.category.localeCompare(b.card.category)
          );
          break;
        case 'oldest':
          validFavorites.sort(
            (a, b) => new Date(a.createdAt) - new Date(b.createdAt)
          );
          break;
        default: // 'recent'
          validFavorites.sort(
            (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
          );
      }
    }

    const total = validFavorites.length;
    const paginatedFavorites = validFavorites.slice(startIndex, startIndex + parseInt(limit));

    res.status(200).json({
      success: true,
      count: paginatedFavorites.length,
      total,
      pagination: {
        page: parseInt(page),
        pages: Math.ceil(total / limit),
        limit: parseInt(limit),
      },
      data: paginatedFavorites,
    });
  } catch (error) {
    console.error('Get favorites error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error getting favorites',
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
        message: 'Favorite not found',
      });
    }

    await Favorite.deleteOne({ user: userId, card: cardId });

    const user = await User.findById(userId);
    user.favoriteCards = user.favoriteCards.filter(
      (id) => id.toString() !== cardId.toString()
    );
    await user.save();

    res.status(200).json({
      success: true,
      message: 'Card removed from favorites',
    });
  } catch (error) {
    console.error('Remove favorite error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error removing favorite',
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
        isFavorited: !!isFavorited,
      },
    });
  } catch (error) {
    console.error('Check favorite error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error checking favorite',
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
        count,
      },
    });
  } catch (error) {
    console.error('Get favorite count error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error getting favorite count',
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
      message: 'All favorites cleared successfully',
    });
  } catch (error) {
    console.error('Clear all favorites error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error clearing favorites',
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
          as: 'cardData',
        },
      },
      { $unwind: '$cardData' },
      { $match: { 'cardData.isActive': true } },
      {
        $group: {
          _id: '$cardData.category',
          count: { $sum: 1 },
        },
      },
      { $sort: { count: -1 } },
    ]);

    const recentFavorites = await Favorite.find({ user: userId })
      .populate({
        path: 'card',
        match: { isActive: true },
        select: 'title category createdAt',
      })
      .sort({ createdAt: -1 })
      .limit(5);

    res.status(200).json({
      success: true,
      data: {
        totalFavorites,
        categoryStats,
        recentFavorites: recentFavorites.filter((fav) => fav.card !== null),
      },
    });
  } catch (error) {
    console.error('Get favorite stats error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error getting favorite statistics',
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
  getFavoriteStats,
};
