import express from 'express';
import favoriteController from '../controllers/favoriteController.js';
import { authMiddleware } from '../middleware/authMiddleware.js';

const router = express.Router();

// Protected routes - all require authentication
router.get('/stats', authMiddleware, favoriteController.getFavoriteStats);
router.post('/toggle', authMiddleware, favoriteController.toggleFavorite);
router.get('/', authMiddleware, favoriteController.getFavorites);
router.delete('/', authMiddleware, favoriteController.clearAllFavorites);
router.delete('/:cardId', authMiddleware, favoriteController.removeFavorite);
router.get('/:cardId/check', authMiddleware, favoriteController.checkFavorite);

// Public routes
router.get('/count/:cardId', favoriteController.getFavoriteCount);

export default router;
