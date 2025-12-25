const express = require('express');
const {
  register,
  login,
  getProfile,
  updateProfile,
  changePassword,
<<<<<<< HEAD
  logout
=======
  logout,
  verifyToken
>>>>>>> 1ca665d3f5f764417ada1cdd89a898f39ac3dccd
} = require('../controllers/authController');
const { protect } = require('../middleware/authMiddleware');
const { validateRegistration, validateLogin } = require('../middleware/validation');

const router = express.Router();

// routes ouvertes à tous
router.post('/register', validateRegistration, register);
router.post('/login', validateLogin, login);

<<<<<<< HEAD
// routes qui nécessitent d'être connecté
=======
// Routes protégées
router.get('/verify', protect, verifyToken);
router.get('/me', protect, getProfile);
>>>>>>> 1ca665d3f5f764417ada1cdd89a898f39ac3dccd
router.get('/profile', protect, getProfile);
router.put('/profile', protect, updateProfile);
router.put('/change-password', protect, changePassword);
router.post('/logout', protect, logout);

module.exports = router;
