const express = require('express');
const { protect } = require('../middleware/authMiddleware');
const Card = require('../models/Card');
const Like = require('../models/Like');
const { t } = require('../utils/i18n');

const router = express.Router();

// @route   POST /api/likes/:cardId/toggle
// @desc    Toggle like for a card (like/unlike)
// @access  Private
router.post('/:cardId/toggle', protect, async (req, res) => {
  try {
    const { cardId } = req.params;
    const userId = req.user.id;

    // In mock mode, find card in sample data
    const { sampleCards } = require('../data/sampleCards');
    const card = sampleCards.find(c => c._id === cardId);
    
    if (!card) {
      return res.status(404).json({ 
        success: false, 
        message: t('cards.cardNotFound') 
      });
    }

    // Toggle like using mock-compatible method
    const result = await Like.toggleLike(userId, cardId);
    
    // In mock mode, simulate likes count change
    let likesCount = card.likes;
    if (result.action === 'liked') {
      likesCount += 1;
    } else {
      likesCount = Math.max(0, likesCount - 1);
    }
    
    res.json({
      success: true,
      message: result.action === 'liked' ? t('likes.cardLiked') : t('likes.cardUnliked'),
      data: {
        isLiked: result.isLiked,
        action: result.action,
        likesCount: likesCount,
        cardId: cardId,
        userId: userId
      }
    });

  } catch (error) {
    res.status(500).json({ 
      success: false, 
      message: t('likes.likeError') 
    });
  }
});

// @route   GET /api/likes/:cardId/status
// @desc    Get like status for a card by current user
// @access  Private (optional - works without auth but returns false)
router.get('/:cardId/status', protect, async (req, res) => {
  try {
    const { cardId } = req.params;
    const userId = req.user.id; // Required auth for accurate like status

    // In mock mode, find card in sample data
    const { sampleCards } = require('../data/sampleCards');
    const card = sampleCards.find(c => c._id === cardId);
    
    if (!card) {
      return res.status(404).json({ 
        success: false, 
        message: t('cards.cardNotFound') 
      });
    }

    const isLiked = await Like.isLikedByUser(userId, cardId);
    const likesCount = card.likes;

    res.json({
      success: true,
      data: {
        isLiked,
        likesCount,
        cardId
      }
    });

  } catch (error) {
    res.status(500).json({ 
      success: false, 
      message: t('likes.likeStatusError') 
    });
  }
});

// @route   GET /api/likes/:cardId/users
// @desc    Get users who liked a card
// @access  Public
router.get('/:cardId/users', async (req, res) => {
  try {
    const { cardId } = req.params;
    const limit = parseInt(req.query.limit) || 10;

    // Check if card exists
    const card = await Card.findById(cardId);
    if (!card) {
      return res.status(404).json({ 
        success: false, 
        message: t('cards.cardNotFound') 
      });
    }

    const likes = await Like.find({ card_id: cardId })
      .populate('user_id', 'firstName lastName')
      .sort({ likedAt: -1 })
      .limit(limit);

    const users = likes.map(like => ({
      id: like.user_id._id,
      firstName: like.user_id.firstName,
      lastName: like.user_id.lastName,
      likedAt: like.likedAt
    }));

    res.json({
      success: true,
      data: {
        users,
        totalLikes: card.likes,
        cardId
      }
    });

  } catch (error) {
    res.status(500).json({ 
      success: false, 
      message: t('likes.likeStatusError') 
    });
  }
});

// @route   GET /api/likes/user/:userId
// @desc    Get cards liked by a user
// @access  Public
router.get('/user/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    const limit = parseInt(req.query.limit) || 10;

    const likes = await Like.getUserLikes(userId, limit);
    
    const likedCards = likes.map(like => ({
      card: like.card_id,
      likedAt: like.likedAt
    }));

    res.json({
      success: true,
      data: {
        likedCards,
        count: likes.length
      }
    });

  } catch (error) {
    res.status(500).json({ 
      success: false, 
      message: t('likes.likeStatusError') 
    });
  }
});

// @route   GET /api/likes/my-likes
// @desc    Get current user's liked cards
// @access  Private
router.get('/my-likes', protect, async (req, res) => {
  try {
    const userId = req.user.id;
    const limit = parseInt(req.query.limit) || 20;

    const likes = await Like.getUserLikes(userId, limit);
    
    const likedCards = likes.filter(like => like.card_id).map(like => ({
      ...like.card_id.toObject(),
      likedAt: like.likedAt
    }));

    res.json({
      success: true,
      data: {
        likedCards,
        count: likedCards.length
      }
    });

  } catch (error) {
    res.status(500).json({ 
      success: false, 
      message: t('likes.likeStatusError') 
    });
  }
});

module.exports = router;
