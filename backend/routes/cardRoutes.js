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

// Routes publiques
router.get('/', getAllCards);
router.get('/search', searchCards);
router.get('/popular', getPopularCards);

// Routes protégées - IMPORTANT: routes spécifiques AVANT routes avec paramètres
router.get('/user', protect, getMyCards);
router.get('/user/my-cards', protect, getMyCards);
router.post('/', protect, validateCard, createCard);
router.put('/:id', protect, validateCard, updateCard);
router.delete('/:id', protect, deleteCard);
router.post('/:id/like', protect, toggleLike);

// Route avec paramètre - DOIT être en dernier
router.get('/:id', optionalAuth, getCardById);

module.exports = router;
