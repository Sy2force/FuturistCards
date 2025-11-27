// Contrôleur des cartes - Version MongoDB exclusive
import Card from '../models/Card.js';
import User from '../models/User.js';
import Favorite from '../models/Favorite.js';

// @desc    Get all cards
// @route   GET /api/cards
// @access  Public
const getCards = async (req, res) => {
  try {
    const { search, category, page = 1, limit = 10 } = req.query;
    
    const options = {
      search,
      category,
      page: parseInt(page),
      limit: parseInt(limit),
      sortBy: 'recent'
    };
    
    const cards = await Card.findPublicCards(options);
    
    console.log(`✅ Récupération de ${cards.length} cartes depuis MongoDB`);
    
    res.json({
      success: true,
      count: cards.length,
      total: cards.length,
      page: parseInt(page),
      pages: Math.ceil(cards.length / limit),
      data: cards
    });
    
  } catch (error) {
    console.error('Get cards error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};

// @desc    Create new card
// @route   POST /api/cards
// @access  Private (Business/Admin)
const createCard = async (req, res) => {
  try {
    const cardData = {
      ...req.body,
      user_id: req.user.id || req.user.userId
    };
    
    const card = new Card(cardData);
    await card.save();
    
    console.log('✅ Nouvelle carte créée dans MongoDB:', {
      id: card._id,
      title: card.title,
      user: card.user_id
    });
    
    res.status(201).json({
      success: true,
      message: 'Carte créée avec succès',
      card
    });
  } catch (error) {
    console.error('Erreur création carte:', error);
    res.status(400).json({
      success: false,
      message: error.message || 'Erreur lors de la création de la carte'
    });
  }
};

// @desc    Get user's cards
// @route   GET /api/cards/my-cards
// @access  Private
const getMyCards = async (req, res) => {
  try {
    const cards = await Card.findByUser(req.user.id || req.user.userId);
    
    console.log(`✅ Récupération de ${cards.length} cartes utilisateur depuis MongoDB`);
    
    res.json({
      success: true,
      count: cards.length,
      data: cards
    });
  } catch (error) {
    console.error('Get my cards error:', error);
    res.status(500).json({
      success: false,
      message: 'Erreur serveur lors de la récupération des cartes'
    });
  }
};

// @desc    Get single card
// @route   GET /api/cards/:id
// @access  Public
const getCard = async (req, res) => {
  try {
    const card = await Card.findById(req.params.id).populate('user_id', 'name email');
    
    if (!card) {
      return res.status(404).json({
        success: false,
        message: 'Card not found'
      });
    }
    
    // Increment views
    await Card.findByIdAndUpdate(req.params.id, { $inc: { views: 1 } });
    
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

// @desc    Search cards
// @route   GET /api/cards/search
// @access  Public
const searchCards = async (req, res) => {
  try {
    const { q: searchTerm, category } = req.query;
    
    if (!searchTerm) {
      return res.status(400).json({
        success: false,
        message: 'Terme de recherche requis'
      });
    }
    
    const options = { category };
    const cards = await Card.searchCards(searchTerm, options);
    
    console.log(`✅ Recherche '${searchTerm}': ${cards.length} résultats depuis MongoDB`);
    
    res.json({
      success: true,
      count: cards.length,
      data: cards
    });
  } catch (error) {
    console.error('Search cards error:', error);
    res.status(500).json({
      success: false,
      message: 'Erreur serveur lors de la recherche'
    });
  }
};

// @desc    Delete card
// @route   DELETE /api/cards/:id
// @access  Private (Owner or Admin)
const deleteCard = async (req, res) => {
  try {
    const card = await Card.findById(req.params.id);
    
    if (!card) {
      return res.status(404).json({
        success: false,
        message: 'Card not found'
      });
    }
    
    // Check ownership or admin
    if (card.user_id.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to delete this card'
      });
    }
    
    await Card.findByIdAndDelete(req.params.id);
    
    console.log('✅ Carte supprimée de MongoDB:', req.params.id);
    
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

// @desc    Update card
// @route   PUT /api/cards/:id
// @access  Private (Owner or Admin)
const updateCard = async (req, res) => {
  try {
    const card = await Card.findById(req.params.id);
    
    if (!card) {
      return res.status(404).json({
        success: false,
        message: 'Card not found'
      });
    }
    
    // Check ownership or admin
    if (card.user_id.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to update this card'
      });
    }
    
    const updatedCard = await Card.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    
    console.log('✅ Carte mise à jour dans MongoDB:', updatedCard._id);
    
    res.json({
      success: true,
      message: 'Card updated successfully',
      data: updatedCard
    });
    
  } catch (error) {
    console.error('Update card error:', error);
    res.status(400).json({
      success: false,
      message: error.message || 'Error updating card'
    });
  }
};

// @desc    Get search suggestions
// @route   GET /api/cards/suggestions
// @access  Public
const getSearchSuggestions = async (req, res) => {
  try {
    const { q } = req.query;
    
    if (!q || q.length < 2) {
      return res.json({
        success: true,
        data: []
      });
    }
    
    const suggestions = await Card.aggregate([
      {
        $match: {
          $or: [
            { title: { $regex: q, $options: 'i' } },
            { description: { $regex: q, $options: 'i' } },
            { category: { $regex: q, $options: 'i' } }
          ]
        }
      },
      {
        $group: {
          _id: null,
          titles: { $addToSet: '$title' },
          categories: { $addToSet: '$category' }
        }
      }
    ]);
    
    const result = suggestions[0] || { titles: [], categories: [] };
    const allSuggestions = [...result.titles, ...result.categories]
      .filter(item => item && item.toLowerCase().includes(q.toLowerCase()))
      .slice(0, 10);
    
    res.json({
      success: true,
      data: allSuggestions
    });
    
  } catch (error) {
    console.error('Get suggestions error:', error);
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
    const card = await Card.findById(req.params.id);
    
    if (!card) {
      return res.status(404).json({
        success: false,
        message: 'Card not found'
      });
    }
    
    const userId = req.user.id || req.user.userId;
    const hasLiked = card.likes && card.likes.includes(userId);
    
    let updatedCard;
    
    if (hasLiked) {
      // Unlike
      updatedCard = await Card.findByIdAndUpdate(
        req.params.id,
        {
          $pull: { likes: userId },
          $inc: { likeCount: -1 }
        },
        { new: true }
      );
    } else {
      // Like
      updatedCard = await Card.findByIdAndUpdate(
        req.params.id,
        {
          $addToSet: { likes: userId },
          $inc: { likeCount: 1 }
        },
        { new: true }
      );
    }
    
    console.log(`✅ Carte ${hasLiked ? 'unlikée' : 'likée'}:`, req.params.id);
    
    res.json({
      success: true,
      message: hasLiked ? 'Card unliked' : 'Card liked',
      data: {
        liked: !hasLiked,
        likeCount: updatedCard.likeCount || 0
      }
    });
    
  } catch (error) {
    console.error('Like card error:', error);
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
    const userId = req.user.id || req.user.userId;
    const cardId = req.params.id;
    
    // Vérifier si la carte existe
    const card = await Card.findById(cardId);
    if (!card) {
      return res.status(404).json({
        success: false,
        message: 'Card not found'
      });
    }
    
    // Vérifier si déjà en favoris
    const existingFavorite = await Favorite.findOne({
      userId: userId,
      cardId: cardId
    });
    
    let isFavorite;
    
    if (existingFavorite) {
      // Retirer des favoris
      await Favorite.findByIdAndDelete(existingFavorite._id);
      isFavorite = false;
      console.log('✅ Carte retirée des favoris:', cardId);
    } else {
      // Ajouter aux favoris
      const favorite = new Favorite({
        userId: userId,
        cardId: cardId
      });
      await favorite.save();
      isFavorite = true;
      console.log('✅ Carte ajoutée aux favoris:', cardId);
    }
    
    res.json({
      success: true,
      message: isFavorite ? 'Added to favorites' : 'Removed from favorites',
      data: {
        isFavorite: isFavorite
      }
    });
    
  } catch (error) {
    console.error('Toggle favorite error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};

// @desc    Update card business number (Admin only)
// @route   PATCH /api/cards/:id/biznumber
// @access  Admin only
const updateBizNumber = async (req, res) => {
  try {
    const { bizNumber } = req.body;
    
    const updatedCard = await Card.findByIdAndUpdate(
      req.params.id,
      { bizNumber },
      { new: true, runValidators: true }
    );
    
    if (!updatedCard) {
      return res.status(404).json({
        success: false,
        message: 'Card not found'
      });
    }
    
    console.log('✅ Numéro d\'entreprise mis à jour par admin:', req.params.id);
    
    res.json({
      success: true,
      message: 'Business number updated successfully',
      data: updatedCard
    });
    
  } catch (error) {
    console.error('Update biz number error:', error);
    res.status(400).json({
      success: false,
      message: error.message || 'Error updating business number'
    });
  }
};

export { 
  getCards, 
  createCard, 
  getMyCards, 
  getCard, 
  searchCards, 
  deleteCard,
  updateCard,
  getSearchSuggestions,
  likeCard,
  toggleFavorite,
  updateBizNumber
};
