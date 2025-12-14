const express = require('express');
const {
  getFavorites,
  addToFavorites,
  removeFromFavorites,
  checkFavorite,
  getFavoritesCount
} = require('../controllers/favoriteController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

// Toutes les routes des favoris sont protégées
router.get('/', protect, getFavorites);
router.get('/count', protect, getFavoritesCount);
router.get('/:cardId/check', protect, checkFavorite);
router.post('/:cardId', protect, addToFavorites);
router.delete('/:cardId', protect, removeFromFavorites);

module.exports = router;
