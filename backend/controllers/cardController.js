const Card = require('../models/Card');
const User = require('../models/User');
const { validationResult } = require('express-validator');
const mongoose = require('mongoose');

// @desc    Get all cards
// @route   GET /api/cards
// @access  Public
const getCards = async (req, res) => {
  try {
    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 10;
    const startIndex = (page - 1) * limit;
    
    const { category, search, featured, userId } = req.query;
    
    let query = { isActive: true };
    
    if (category && category !== 'all') {
      query.category = category;
    }
    
    if (userId) {
      query.user_id = userId;
    }
    
    if (featured === 'true') {
      query.featured = true;
    }
    
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { subtitle: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
        { tags: { $in: [new RegExp(search, 'i')] } }
      ];
    }
    
    const cards = await Card.find(query)
      .populate('user_id', 'firstName lastName email')
      .sort({ createdAt: -1 })
      .limit(limit * 1)
      .skip(startIndex);
    
    const total = await Card.countDocuments(query);
    
    res.status(200).json({
      success: true,
      count: cards.length,
      total,
      pagination: {
        page,
        pages: Math.ceil(total / limit),
        limit
      },
      data: cards
    });
  } catch (error) {
    console.error('Get cards error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error getting cards'
    });
  }
};

// @desc    Get single card
// @route   GET /api/cards/:id
// @access  Public
const getCard = async (req, res) => {
  try {
    const card = await Card.findById(req.params.id)
      .populate('user_id', 'firstName lastName email phone');
    
    if (!card || !card.isActive) {
      return res.status(404).json({
        success: false,
        message: 'Card not found'
      });
    }
    
    await card.incrementViews();
    
    res.status(200).json({
      success: true,
      data: card
    });
  } catch (error) {
    console.error('Get card error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error getting card'
    });
  }
};

// @desc    Create new card
// @route   POST /api/cards
// @access  Private (Business/Admin)
const createCard = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: errors.array()
      });
    }
    
    // Check if MongoDB is connected, use mock if not
    if (!mongoose.connection.readyState) {
      const mockCard = {
        _id: Date.now().toString(),
        ...req.body,
        user_id: req.user.id,
        bizNumber: Math.floor(Math.random() * 9000000) + 1000000,
        slug: req.body.title.toLowerCase().replace(/\s+/g, '-') + '-' + Date.now(),
        views: 0,
        likes: [],
        likesCount: 0,
        isActive: true,
        isPublic: true,
        createdAt: new Date(),
        updatedAt: new Date()
      };
      
      return res.status(201).json({
        success: true,
        message: 'Card created successfully (mock mode)',
        data: mockCard
      });
    }
    
    req.body.user_id = req.user.id;
    
    const card = await Card.create(req.body);
    
    await card.populate('user_id', 'firstName lastName email');
    
    res.status(201).json({
      success: true,
      data: card
    });
  } catch (error) {
    console.error('Create card error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error creating card'
    });
  }
};

// @desc    Update card
// @route   PUT /api/cards/:id
// @access  Private (Owner/Admin)
const updateCard = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: errors.array()
      });
    }
    
    let card = await Card.findById(req.params.id);
    
    if (!card) {
      return res.status(404).json({
        success: false,
        message: 'Card not found'
      });
    }
    
    if (card.user_id.toString() !== req.user.id && !req.user.isAdmin) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to update this card'
      });
    }
    
    card = await Card.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    }).populate('user_id', 'firstName lastName email');
    
    res.status(200).json({
      success: true,
      data: card
    });
  } catch (error) {
    console.error('Update card error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error updating card'
    });
  }
};

// @desc    Delete card
// @route   DELETE /api/cards/:id
// @access  Private (Owner/Admin)
const deleteCard = async (req, res) => {
  try {
    const card = await Card.findById(req.params.id);
    
    if (!card) {
      return res.status(404).json({
        success: false,
        message: 'Card not found'
      });
    }
    
    if (card.user_id.toString() !== req.user.id && !req.user.isAdmin) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to delete this card'
      });
    }
    
    await Card.findByIdAndDelete(req.params.id);
    
    res.status(200).json({
      success: true,
      message: 'Card deleted successfully'
    });
  } catch (error) {
    console.error('Delete card error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error deleting card'
    });
  }
};

// @desc    Like/Unlike card
// @route   POST /api/cards/:id/like
// @access  Private
const toggleLike = async (req, res) => {
  try {
    const card = await Card.findById(req.params.id);
    
    if (!card || !card.isActive) {
      return res.status(404).json({
        success: false,
        message: 'Card not found'
      });
    }
    
    await card.toggleLike(req.user.id);
    const isLiked = card.isLikedBy(req.user.id);
    
    res.status(200).json({
      success: true,
      message: isLiked ? 'Card liked' : 'Card unliked',
      data: {
        liked: isLiked,
        likesCount: card.likesCount
      }
    });
  } catch (error) {
    console.error('Toggle like error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error toggling like'
    });
  }
};

// @desc    Get nearby cards
// @route   GET /api/cards/nearby
// @access  Public
const getNearbyCards = async (req, res) => {
  try {
    const { longitude, latitude, maxDistance = 10000 } = req.query;
    
    if (!longitude || !latitude) {
      return res.status(400).json({
        success: false,
        message: 'Longitude and latitude are required'
      });
    }
    
    const cards = await Card.findNearby(
      parseFloat(longitude),
      parseFloat(latitude),
      parseInt(maxDistance)
    ).populate('user_id', 'firstName lastName email');
    
    res.status(200).json({
      success: true,
      count: cards.length,
      data: cards
    });
  } catch (error) {
    console.error('Get nearby cards error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error getting nearby cards'
    });
  }
};

// @desc    Search cards
// @route   GET /api/cards/search
// @access  Public
const searchCards = async (req, res) => {
  try {
    const { q, category, userId } = req.query;
    
    if (!q) {
      return res.status(400).json({
        success: false,
        message: 'Search query is required'
      });
    }
    
    const cards = await Card.searchCards(q, { category, userId })
      .populate('user_id', 'firstName lastName email');
    
    res.status(200).json({
      success: true,
      count: cards.length,
      data: cards
    });
  } catch (error) {
    console.error('Search cards error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error searching cards'
    });
  }
};

// @desc    Get categories
// @route   GET /api/cards/categories
// @access  Public
const getCategories = async (req, res) => {
  try {
    const categories = await Card.distinct('category', { isActive: true });
    
    res.status(200).json({
      success: true,
      data: categories
    });
  } catch (error) {
    console.error('Get categories error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error getting categories'
    });
  }
};

module.exports = {
  getCards,
  getCard,
  createCard,
  updateCard,
  deleteCard,
  toggleLike,
  getNearbyCards,
  searchCards,
  getCategories
};
