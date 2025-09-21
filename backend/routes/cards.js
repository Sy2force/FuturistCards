const express = require('express');
const router = express.Router();
const { check } = require('express-validator');
const cardController = require('../controllers/cardController');
const { protect, authorize } = require('../middleware/authMiddleware');

// @route   GET /api/cards
// @desc    Get all cards
// @access  Public
router.get('/', cardController.getCards);

// @route   GET /api/cards/favorites
// @desc    Get user favorites
// @access  Private
router.get('/favorites', protect, cardController.getFavorites);

// @route   GET /api/cards/my-cards
// @desc    Get user's cards
// @access  Private
router.get('/my-cards', protect, cardController.getMyCards);

// @route   GET /api/cards/:id
// @desc    Get single card
// @access  Public
router.get('/:id', cardController.getCard);

// @route   POST /api/cards
// @desc    Create new card
// @access  Private (Business users only)
router.post('/', protect, [
  check('title', 'Title is required').not().isEmpty(),
  check('description', 'Description is required').not().isEmpty()
], cardController.createCard);

// @route   PUT /api/cards/:id
// @desc    Update card
// @access  Private (Owner or Admin)
router.put('/:id', protect, cardController.updateCard);

// @route   DELETE /api/cards/:id
// @desc    Delete card
// @access  Private (Owner or Admin)
router.delete('/:id', protect, cardController.deleteCard);

// @route   PATCH /api/cards/:id/like
// @desc    Like/Unlike card
// @access  Private
router.patch('/:id/like', protect, cardController.likeCard);

// @route   POST /api/cards/:id/favorite
// @desc    Toggle favorite card
// @access  Private
router.post('/:id/favorite', protect, cardController.toggleFavorite);

module.exports = router;
