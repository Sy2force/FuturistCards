// Contrôleur des cartes - Version corrigée avec favorites et views
const mongoose = require('mongoose');
const Card = require('../models/Card');
const Favorite = require('../models/Favorite');

// Données simulées avec viewCount et favoris
const mockCards = [
  {
    _id: '507f1f77bcf86cd799439011',
    title: 'Tech Innovator',
    description: 'Full-stack developer specializing in React and Node.js',
    company: 'TechCorp',
    position: 'Senior Developer',
    email: 'john@techcorp.com',
    phone: '+1-555-0123',
    website: 'https://johndoe.dev',
    address: 'San Francisco, CA',
    category: 'Technology',
    tags: ['React', 'Node.js', 'JavaScript'],
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=200&fit=crop',
    userId: '507f1f77bcf86cd799439014',
    likes: 15,
    views: 120,
    viewCount: 120,
    isFavorite: false,
    createdAt: new Date('2024-01-15'),
    updatedAt: new Date('2024-01-15')
  },
  {
    _id: '507f1f77bcf86cd799439012',
    title: 'Creative Designer',
    description: 'UI/UX Designer with passion for modern interfaces',
    company: 'DesignStudio',
    position: 'Lead Designer',
    email: 'sarah@designstudio.com',
    phone: '+1-555-0124',
    website: 'https://sarahdesigns.com',
    address: 'New York, NY',
    category: 'Design',
    tags: ['UI/UX', 'Figma', 'Adobe'],
    image: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=300&h=200&fit=crop',
    userId: '507f1f77bcf86cd799439015',
    likes: 28,
    views: 200,
    viewCount: 200,
    isFavorite: true,
    createdAt: new Date('2024-01-20'),
    updatedAt: new Date('2024-01-20')
  },
  {
    _id: '507f1f77bcf86cd799439013',
    title: 'Marketing Expert',
    description: 'Digital marketing strategist with 10+ years experience',
    company: 'MarketPro',
    position: 'Marketing Director',
    email: 'mike@marketpro.com',
    phone: '+1-555-0125',
    website: 'https://mikemarketing.com',
    address: 'Los Angeles, CA',
    category: 'Marketing',
    tags: ['SEO', 'Social Media', 'Analytics'],
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&h=200&fit=crop',
    userId: '507f1f77bcf86cd799439016',
    likes: 42,
    views: 350,
    viewCount: 350,
    isFavorite: false,
    createdAt: new Date('2024-01-25'),
    updatedAt: new Date('2024-01-25')
  },
  {
    _id: '507f1f77bcf86cd799439014',
    title: 'Business Consultant',
    description: 'Strategic business advisor for startups and enterprises',
    company: 'ConsultCorp',
    position: 'Senior Consultant',
    email: 'emma@consultcorp.com',
    phone: '+1-555-0126',
    website: 'https://emmaconsults.com',
    address: 'Chicago, IL',
    category: 'Business',
    tags: ['Strategy', 'Growth', 'Analytics'],
    image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=300&h=200&fit=crop',
    userId: '507f1f77bcf86cd799439017',
    likes: 33,
    views: 280,
    viewCount: 280,
    isFavorite: true,
    createdAt: new Date('2024-02-01'),
    updatedAt: new Date('2024-02-01')
  },
  {
    _id: '507f1f77bcf86cd799439015',
    title: 'Data Scientist',
    description: 'Machine learning engineer and data analytics expert',
    company: 'DataTech',
    position: 'Lead Data Scientist',
    email: 'alex@datatech.com',
    phone: '+1-555-0127',
    website: 'https://alexdata.com',
    address: 'Seattle, WA',
    category: 'Technology',
    tags: ['Python', 'Machine Learning', 'AI'],
    image: 'https://images.unsplash.com/photo-1507591064344-4c6ce005b128?w=300&h=200&fit=crop',
    userId: '507f1f77bcf86cd799439018',
    likes: 67,
    views: 450,
    viewCount: 450,
    isFavorite: false,
    createdAt: new Date('2024-02-05'),
    updatedAt: new Date('2024-02-05')
  },
  {
    _id: '507f1f77bcf86cd799439016',
    title: 'Photographer',
    description: 'Professional photographer specializing in portraits and events',
    company: 'PhotoStudio Pro',
    position: 'Creative Director',
    email: 'lisa@photostudio.com',
    phone: '+1-555-0128',
    website: 'https://lisaphotos.com',
    address: 'Miami, FL',
    category: 'Creative',
    tags: ['Photography', 'Portraits', 'Events'],
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=300&h=200&fit=crop',
    userId: '507f1f77bcf86cd799439019',
    likes: 89,
    views: 520,
    createdAt: new Date('2024-02-10'),
    updatedAt: new Date('2024-02-10')
  }
];

// @desc    Get all cards
// @route   GET /api/cards
// @access  Public
const getCards = async (req, res) => {
  try {
    const { search, category, page = 1, limit = 10 } = req.query;
    
    let filteredCards = [...mockCards];
    
    // Filter by search
    if (search) {
      filteredCards = filteredCards.filter(card => 
        card.title.toLowerCase().includes(search.toLowerCase()) ||
        card.description.toLowerCase().includes(search.toLowerCase()) ||
        card.company.toLowerCase().includes(search.toLowerCase())
      );
    }
    
    // Filter by category
    if (category) {
      filteredCards = filteredCards.filter(card => 
        card.category.toLowerCase() === category.toLowerCase()
      );
    }
    
    // Pagination
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    const paginatedCards = filteredCards.slice(startIndex, endIndex);
    
    res.json({
      success: true,
      count: paginatedCards.length,
      total: filteredCards.length,
      page: parseInt(page),
      pages: Math.ceil(filteredCards.length / limit),
      data: paginatedCards
    });
    
  } catch (error) {
    console.error('Get cards error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};

// @desc    Get single card
// @route   GET /api/cards/:id
// @access  Public
const getCard = async (req, res) => {
  try {
    const card = mockCards.find(c => c._id === req.params.id);
    
    if (!card) {
      return res.status(404).json({
        success: false,
        message: 'Card not found'
      });
    }
    
    // Increment views
    card.views += 1;
    
    res.json({
      success: true,
      data: card
    });
    
  } catch (error) {
    console.error('Get card error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};

// @desc    Create new card
// @route   POST /api/cards
// @access  Private (Business users only)
const createCard = async (req, res) => {
  try {
    const {
      title,
      subtitle,
      description,
      company,
      position,
      email,
      phone,
      web,
      website,
      address,
      category,
      tags,
      image
    } = req.body;
    
    // Check if user is business or admin
    if (req.user.role !== 'business' && req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Only business users can create cards'
      });
    }
    
    const newCard = {
      _id: Date.now().toString(),
      title,
      subtitle: subtitle || '',
      description,
      company: company || subtitle || '',
      position: position || title || '',
      email,
      phone,
      website: website || web || '',
      web: web || website || '',
      address,
      category,
      tags: tags || [],
      image: image || 'https://via.placeholder.com/300x200',
      userId: req.user.id,
      likes: 0,
      views: 0,
      createdAt: new Date(),
      updatedAt: new Date()
    };
    
    mockCards.push(newCard);
    
    res.status(201).json({
      success: true,
      message: 'Card created successfully',
      data: newCard
    });
    
  } catch (error) {
    console.error('Create card error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};

// @desc    Update card
// @route   PUT /api/cards/:id
// @access  Private (Owner or Admin)
const updateCard = async (req, res) => {
  try {
    const cardIndex = mockCards.findIndex(c => c._id === req.params.id);
    
    if (cardIndex === -1) {
      return res.status(404).json({
        success: false,
        message: 'Card not found'
      });
    }
    
    const card = mockCards[cardIndex];
    
    // Check ownership or admin
    if (card.userId !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to update this card'
      });
    }
    
    // Update card
    const updatedCard = {
      ...card,
      ...req.body,
      updatedAt: new Date()
    };
    
    mockCards[cardIndex] = updatedCard;
    
    res.json({
      success: true,
      message: 'Card updated successfully',
      data: updatedCard
    });
    
  } catch (error) {
    console.error('Update card error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};

// @desc    Delete card
// @route   DELETE /api/cards/:id
// @access  Private (Owner or Admin)
const deleteCard = async (req, res) => {
  try {
    const cardIndex = mockCards.findIndex(c => c._id === req.params.id);
    
    if (cardIndex === -1) {
      return res.status(404).json({
        success: false,
        message: 'Card not found'
      });
    }
    
    const card = mockCards[cardIndex];
    
    // Check ownership or admin
    if (card.userId !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to delete this card'
      });
    }
    
    mockCards.splice(cardIndex, 1);
    
    res.json({
      success: true,
      message: 'Card deleted successfully'
    });
    
  } catch (error) {
    console.error('Delete card error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};

// @desc    Like/Unlike card
// @route   PATCH /api/cards/:id/like
// @access  Private
const likeCard = async (req, res) => {
  try {
    const card = mockCards.find(c => c._id === req.params.id);
    
    if (!card) {
      return res.status(404).json({
        success: false,
        message: 'Card not found'
      });
    }
    
    // Toggle like (simplified - in real app would track user likes)
    card.likes += 1;
    
    res.json({
      success: true,
      message: 'Card liked successfully',
      likes: card.likes
    });
    
  } catch (error) {
    console.error('Like card error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};

// @desc    Get user's cards
// @route   GET /api/cards/my-cards
// @access  Private
const getMyCards = async (req, res) => {
  try {
    const userCards = mockCards.filter(card => card.userId === req.user.id);
    
    res.json({
      success: true,
      count: userCards.length,
      data: userCards
    });
    
  } catch (error) {
    console.error('Get my cards error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};

// @desc    Get user favorites
// @route   GET /api/cards/favorites
// @access  Private
const getFavorites = async (req, res) => {
  try {
    // Retourne les cartes marquées comme favorites
    const userFavorites = mockCards.filter(card => card.isFavorite === true);
    
    res.json({
      success: true,
      count: userFavorites.length,
      data: userFavorites
    });
    
  } catch (error) {
    console.error('Get favorites error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};

// @desc    Toggle favorite card
// @route   POST /api/cards/:id/favorite
// @access  Private
const toggleFavorite = async (req, res) => {
  try {
    const card = mockCards.find(c => c._id === req.params.id);
    
    if (!card) {
      return res.status(404).json({
        success: false,
        message: 'Card not found'
      });
    }
    
    // Toggle favorite status
    card.isFavorite = !card.isFavorite;
    
    res.json({
      success: true,
      message: card.isFavorite ? 'Card added to favorites' : 'Card removed from favorites',
      isFavorite: card.isFavorite
    });
    
  } catch (error) {
    console.error('Toggle favorite error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};

module.exports = {
  getCards,
  getCard,
  createCard,
  updateCard,
  deleteCard,
  likeCard,
  getMyCards,
  getFavorites,
  toggleFavorite
};
