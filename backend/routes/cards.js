import express from 'express';
import { check } from 'express-validator';
import { protect, authMiddleware } from '../middleware/authMiddleware.js';
import { requireRole, requireOwnership, requireRoleOrOwnership } from '../middleware/requireRole.js';
import cardController from '../controllers/cardController.js';

const router = express.Router();

// @route   GET /api/cards
// @desc    Get all cards
// @access  Public
router.get('/', cardController.getCards);

// @route   GET /api/cards/search
// @desc    Search cards with filters
// @access  Public
router.get('/search', cardController.searchCards);

// @route   GET /api/cards/suggestions
// @desc    Get search suggestions
// @access  Public
router.get('/suggestions', cardController.getSearchSuggestions);

// @route   GET /api/cards/my-cards
// @desc    Get user's cards
// @access  Private
router.get('/my-cards', authMiddleware, cardController.getMyCards);

// @route   GET /api/cards/:id
// @desc    Get single card
// @access  Public
router.get('/:id', cardController.getCard);

// @route   POST /api/cards
// @desc    Create new card
// @access  Private (Business/Admin only)
router.post('/', authMiddleware, requireRole(['business', 'admin']), [
  check('title', 'Title is required').not().isEmpty(),
  check('description', 'Description is required').not().isEmpty(),
  check('category', 'Category is required').not().isEmpty()
], cardController.createCard);

// @route   PUT /api/cards/:id
// @desc    Update card
// @access  Private (Owner or Admin)
router.put('/:id', authMiddleware, requireRoleOrOwnership(['admin'], 'owner'), cardController.updateCard);

// @route   DELETE /api/cards/:id
// @desc    Delete card
// @access  Private (Owner or Admin)
router.delete('/:id', authMiddleware, requireRoleOrOwnership(['admin'], 'owner'), cardController.deleteCard);

// @route   PATCH /api/cards/:id/like
// @desc    Like/Unlike card
// @access  Private
router.patch('/:id/like', protect, cardController.likeCard);

// @route   POST /api/cards/:id/favorite
// @desc    Toggle favorite card
// @access  Private
router.post('/:id/favorite', protect, cardController.toggleFavorite);

// @route   GET /api/cards/search
// @desc    Search cards with filters
// @access  Public
router.get('/search', cardController.searchCards);

// @route   GET /api/cards/suggestions
// @desc    Get search suggestions
// @access  Public
router.get('/suggestions', cardController.getSearchSuggestions);

export default router;
