const express = require('express');
const {
  register,
  login,
  getProfile,
  updateProfile,
  changePassword,
  logout
} = require('../controllers/authController');
const { protect } = require('../middleware/authMiddleware');
const { validateRegistration, validateLogin } = require('../middleware/validation');

const router = express.Router();

// Routes publiques
router.post('/register', validateRegistration, register);
router.post('/login', validateLogin, login);

// Routes protégées
router.get('/profile', protect, getProfile);
router.put('/profile', protect, updateProfile);
router.put('/change-password', protect, changePassword);
router.post('/logout', protect, logout);

module.exports = router;
