const express = require('express');
const {
  getAllCards,
  getCardById,
  createCard,
  updateCard,
  deleteCard,
  getMyCards,
  toggleLike,
  searchCards,
  getPopularCards
} = require('../controllers/cardController-clean');
const { protect, optionalAuth } = require('../middleware/authMiddleware-clean');
const { validateCard } = require('../middleware/validation-clean');

const router = express.Router();

// Routes publiques
router.get('/', getAllCards);
router.get('/search', searchCards);
router.get('/popular', getPopularCards);
router.get('/:id', optionalAuth, getCardById);

// Routes protégées
router.post('/', protect, validateCard, createCard);
router.put('/:id', protect, validateCard, updateCard);
router.delete('/:id', protect, deleteCard);
router.get('/user/my-cards', protect, getMyCards);
router.post('/:id/like', protect, toggleLike);

module.exports = router;
