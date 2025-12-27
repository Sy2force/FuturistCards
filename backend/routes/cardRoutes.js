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
} = require('../controllers/cardController');
const { protect, optionalAuth } = require('../middleware/authMiddleware');
const { validateCard } = require('../middleware/validation');

const router = express.Router();

// routes ouvertes
router.get('/', getAllCards);
router.get('/search', searchCards);
router.get('/popular', getPopularCards);

// routes connectées - attention: routes spécifiques avant celles avec :id
router.get('/user', protect, getMyCards);
router.get('/user/my-cards', protect, getMyCards);
router.post('/', protect, validateCard, createCard);
router.put('/:id', protect, validateCard, updateCard);
router.delete('/:id', protect, deleteCard);
router.post('/:id/like', protect, toggleLike);

// cette route doit être en dernier (sinon elle catch tout)
router.get('/:id', optionalAuth, getCardById);

module.exports = router;
