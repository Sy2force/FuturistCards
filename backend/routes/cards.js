import express from 'express';
import { protect, authMiddleware, authorize, requireBusiness, requireAdmin } from '../middleware/authMiddleware.js';
import { 
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
} from '../controllers/cardController.js';
import { validate, cardSchemas } from '../middleware/validation.js';

const router = express.Router();

// @route   GET /api/cards
// @desc    Get all cards
// @access  Public
router.get('/', getCards);

// @route   GET /api/cards/search
// @desc    Search cards with filters
// @access  Public
router.get('/search', searchCards);

// @route   GET /api/cards/suggestions
// @desc    Get search suggestions
// @access  Public
router.get('/suggestions', getSearchSuggestions);

// @route   GET /api/cards/my-cards
// @desc    Get user's cards
// @access  Private
router.get('/my-cards', authMiddleware, getMyCards);

// @route   GET /api/cards/:id
// @desc    Get single card
// @access  Public
router.get('/:id', getCard);

// @route   POST /api/cards
// @desc    Create new card
// @access  Private (Business/Admin only)
router.post('/', authMiddleware, requireBusiness, validate(cardSchemas.createCard), createCard);

// @route   PUT /api/cards/:id
// @desc    Update card
// @access  Private (Owner or Admin)
router.put('/:id', authMiddleware, validate(cardSchemas.updateCard), updateCard);

// @route   DELETE /api/cards/:id
// @desc    Delete card
// @access  Private (Owner or Admin)
router.delete('/:id', authMiddleware, deleteCard);

// @route   PATCH /api/cards/:id/like
// @desc    Like/Unlike card
// @access  Private
router.patch('/:id/like', authMiddleware, likeCard);

// @route   POST /api/cards/:id/favorite
// @desc    Toggle favorite card
// @access  Private
router.post('/:id/favorite', authMiddleware, toggleFavorite);

// @route   PATCH /api/cards/:id/biznumber
// @desc    Update card business number (Admin only)
// @access  Admin only
router.patch('/:id/biznumber', authMiddleware, requireAdmin, validate(cardSchemas.updateBizNumber), updateBizNumber);

export default router;
