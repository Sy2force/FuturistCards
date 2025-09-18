const User = require('../models/User');
const Card = require('../models/Card');
const Favorite = require('../models/Favorite');

// @desc    Get platform analytics
// @route   GET /api/analytics/platform
// @access  Admin
const getPlatformAnalytics = async (req, res) => {
  try {
    // Get date range from query params (default: last 30 days)
    const { startDate, endDate } = req.query;
    const start = startDate ? new Date(startDate) : new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);
    const end = endDate ? new Date(endDate) : new Date();

    // User statistics
    const totalUsers = await User.countDocuments();
    const businessUsers = await User.countDocuments({ isBusiness: true });
    const adminUsers = await User.countDocuments({ isAdmin: true });
    const newUsers = await User.countDocuments({
      createdAt: { $gte: start, $lte: end }
    });

    // Card statistics
    const totalCards = await Card.countDocuments();
    const activeCards = await Card.countDocuments({ isActive: true });
    const publicCards = await Card.countDocuments({ isPublic: true });
    const newCards = await Card.countDocuments({
      createdAt: { $gte: start, $lte: end }
    });

    // Engagement statistics
    const totalViews = await Card.aggregate([
      { $group: { _id: null, total: { $sum: '$views' } } }
    ]);
    
    const totalLikes = await Card.aggregate([
      { $group: { _id: null, total: { $sum: { $size: '$likes' } } } }
    ]);

    const totalFavorites = await Favorite.countDocuments();

    // Category distribution
    const categoryStats = await Card.aggregate([
      { $match: { isActive: true } },
      { $group: { _id: '$category', count: { $sum: 1 } } },
      { $sort: { count: -1 } }
    ]);

    // Top cards by views
    const topCardsByViews = await Card.find({ isActive: true })
      .sort({ views: -1 })
      .limit(10)
      .select('title views likes user_id')
      .populate('user_id', 'firstName lastName');

    // Top cards by likes
    const topCardsByLikes = await Card.aggregate([
      { $match: { isActive: true } },
      { $addFields: { likesCount: { $size: '$likes' } } },
      { $sort: { likesCount: -1 } },
      { $limit: 10 },
      { $lookup: { from: 'users', localField: 'user_id', foreignField: '_id', as: 'user' } },
      { $project: { title: 1, likesCount: 1, views: 1, 'user.firstName': 1, 'user.lastName': 1 } }
    ]);

    // User growth over time (last 12 months)
    const userGrowth = await User.aggregate([
      {
        $match: {
          createdAt: { $gte: new Date(Date.now() - 365 * 24 * 60 * 60 * 1000) }
        }
      },
      {
        $group: {
          _id: {
            year: { $year: '$createdAt' },
            month: { $month: '$createdAt' }
          },
          count: { $sum: 1 }
        }
      },
      { $sort: { '_id.year': 1, '_id.month': 1 } }
    ]);

    // Card creation over time (last 12 months)
    const cardGrowth = await Card.aggregate([
      {
        $match: {
          createdAt: { $gte: new Date(Date.now() - 365 * 24 * 60 * 60 * 1000) }
        }
      },
      {
        $group: {
          _id: {
            year: { $year: '$createdAt' },
            month: { $month: '$createdAt' }
          },
          count: { $sum: 1 }
        }
      },
      { $sort: { '_id.year': 1, '_id.month': 1 } }
    ]);

    res.status(200).json({
      success: true,
      data: {
        users: {
          total: totalUsers,
          business: businessUsers,
          admin: adminUsers,
          new: newUsers
        },
        cards: {
          total: totalCards,
          active: activeCards,
          public: publicCards,
          new: newCards
        },
        engagement: {
          totalViews: totalViews[0]?.total || 0,
          totalLikes: totalLikes[0]?.total || 0,
          totalFavorites
        },
        categoryStats,
        topCards: {
          byViews: topCardsByViews,
          byLikes: topCardsByLikes
        },
        growth: {
          users: userGrowth,
          cards: cardGrowth
        },
        dateRange: { start, end }
      }
    });

  } catch (error) {
    console.error('Get platform analytics error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error getting platform analytics'
    });
  }
};

// @desc    Get user analytics
// @route   GET /api/analytics/user/:userId
// @access  Private (own data) / Admin (any user)
const getUserAnalytics = async (req, res) => {
  try {
    const { userId } = req.params;
    
    // Check if user can access this data
    if (req.user.id !== userId && !req.user.isAdmin) {
      return res.status(403).json({
        success: false,
        message: 'Access denied'
      });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    // User's cards statistics
    const userCards = await Card.find({ user_id: userId });
    const totalCards = userCards.length;
    const activeCards = userCards.filter(card => card.isActive).length;
    const publicCards = userCards.filter(card => card.isPublic).length;

    // Views and likes on user's cards
    const totalViews = userCards.reduce((sum, card) => sum + card.views, 0);
    const totalLikes = userCards.reduce((sum, card) => sum + card.likes.length, 0);

    // User's favorites
    const userFavorites = await Favorite.countDocuments({ user: userId });

    // Cards by category
    const cardsByCategory = userCards.reduce((acc, card) => {
      acc[card.category] = (acc[card.category] || 0) + 1;
      return acc;
    }, {});

    // Most viewed cards
    const mostViewedCards = userCards
      .sort((a, b) => b.views - a.views)
      .slice(0, 5)
      .map(card => ({
        id: card._id,
        title: card.title,
        views: card.views,
        likes: card.likes.length
      }));

    // Most liked cards
    const mostLikedCards = userCards
      .sort((a, b) => b.likes.length - a.likes.length)
      .slice(0, 5)
      .map(card => ({
        id: card._id,
        title: card.title,
        views: card.views,
        likes: card.likes.length
      }));

    // Activity over time (last 6 months)
    const sixMonthsAgo = new Date(Date.now() - 6 * 30 * 24 * 60 * 60 * 1000);
    const cardActivity = await Card.aggregate([
      {
        $match: {
          user_id: user._id,
          createdAt: { $gte: sixMonthsAgo }
        }
      },
      {
        $group: {
          _id: {
            year: { $year: '$createdAt' },
            month: { $month: '$createdAt' }
          },
          count: { $sum: 1 }
        }
      },
      { $sort: { '_id.year': 1, '_id.month': 1 } }
    ]);

    res.status(200).json({
      success: true,
      data: {
        user: {
          id: user._id,
          name: `${user.firstName} ${user.lastName}`,
          email: user.email,
          isBusiness: user.isBusiness,
          joinDate: user.createdAt
        },
        cards: {
          total: totalCards,
          active: activeCards,
          public: publicCards,
          byCategory: cardsByCategory
        },
        engagement: {
          totalViews,
          totalLikes,
          averageViewsPerCard: totalCards > 0 ? Math.round(totalViews / totalCards) : 0,
          averageLikesPerCard: totalCards > 0 ? Math.round(totalLikes / totalCards) : 0
        },
        favorites: userFavorites,
        topCards: {
          mostViewed: mostViewedCards,
          mostLiked: mostLikedCards
        },
        activity: cardActivity
      }
    });

  } catch (error) {
    console.error('Get user analytics error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error getting user analytics'
    });
  }
};

// @desc    Track card view
// @route   POST /api/analytics/track/view
// @access  Public
const trackCardView = async (req, res) => {
  try {
    const { cardId } = req.body;

    if (!cardId) {
      return res.status(400).json({
        success: false,
        message: 'Card ID is required'
      });
    }

    const card = await Card.findById(cardId);
    if (!card) {
      return res.status(404).json({
        success: false,
        message: 'Card not found'
      });
    }

    // Increment view count
    await Card.findByIdAndUpdate(cardId, { $inc: { views: 1 } });

    res.status(200).json({
      success: true,
      message: 'View tracked successfully'
    });

  } catch (error) {
    console.error('Track card view error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error tracking view'
    });
  }
};

// @desc    Get card analytics
// @route   GET /api/analytics/card/:cardId
// @access  Private (card owner) / Admin
const getCardAnalytics = async (req, res) => {
  try {
    const { cardId } = req.params;

    const card = await Card.findById(cardId).populate('user_id', 'firstName lastName');
    if (!card) {
      return res.status(404).json({
        success: false,
        message: 'Card not found'
      });
    }

    // Check if user can access this data
    if (card.user_id._id.toString() !== req.user.id && !req.user.isAdmin) {
      return res.status(403).json({
        success: false,
        message: 'Access denied'
      });
    }

    // Get favorites count for this card
    const favoritesCount = await Favorite.countDocuments({ card: cardId });

    // Get view history (simulated - in real app you'd track this)
    const viewHistory = [];
    const now = new Date();
    for (let i = 29; i >= 0; i--) {
      const date = new Date(now.getTime() - i * 24 * 60 * 60 * 1000);
      const views = Math.floor(Math.random() * (card.views / 30)) + Math.floor(card.views / 30);
      viewHistory.push({
        date: date.toISOString().split('T')[0],
        views: i === 0 ? card.views % 30 : views
      });
    }

    res.status(200).json({
      success: true,
      data: {
        card: {
          id: card._id,
          title: card.title,
          category: card.category,
          owner: `${card.user_id.firstName} ${card.user_id.lastName}`,
          createdAt: card.createdAt,
          isActive: card.isActive,
          isPublic: card.isPublic
        },
        metrics: {
          views: card.views,
          likes: card.likes.length,
          favorites: favoritesCount,
          tags: card.tags?.length || 0
        },
        engagement: {
          likeRate: card.views > 0 ? ((card.likes.length / card.views) * 100).toFixed(2) : 0,
          favoriteRate: card.views > 0 ? ((favoritesCount / card.views) * 100).toFixed(2) : 0
        },
        viewHistory
      }
    });

  } catch (error) {
    console.error('Get card analytics error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error getting card analytics'
    });
  }
};

module.exports = {
  getPlatformAnalytics,
  getUserAnalytics,
  trackCardView,
  getCardAnalytics
};
