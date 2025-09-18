const express = require('express');
const {
  toggleFavorite,
  getFavorites,
  removeFavorite,
  checkFavorite,
  getFavoriteCount,
  clearAllFavorites,
  getFavoriteStats
} = require('../controllers/favoriteController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

// Protected routes
router.get('/stats', protect, getFavoriteStats);
router.post('/:cardId', protect, toggleFavorite);
router.get('/', protect, getFavorites);
router.delete('/', protect, clearAllFavorites);
router.delete('/:cardId', protect, removeFavorite);
router.get('/:cardId/check', protect, checkFavorite);

// Public routes
router.get('/count/:cardId', getFavoriteCount);

module.exports = router;
