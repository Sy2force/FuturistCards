const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const { 
  getProfile,
  updateProfile,
  deleteAccount,
  getUserProfile, 
  updateUserProfile, 
  getAllUsers, 
  updateUserRole, 
  updateUserStatus, 
  deleteUser,
  getPlatformStats
} = require('../controllers/userController');
const { protect, authorize } = require('../middleware/authMiddleware');

// Validation rules
const updateProfileValidation = [
  body('firstName')
    .optional()
    .trim()
    .isLength({ min: 2, max: 50 })
    .withMessage('First name must be between 2 and 50 characters'),
  body('lastName')
    .optional()
    .trim()
    .isLength({ min: 2, max: 50 })
    .withMessage('Last name must be between 2 and 50 characters'),
  body('phone')
    .optional()
    .matches(/^0[2-9]\d{7,8}$/)
    .withMessage('Please provide a valid Israeli phone number')
];

// User profile routes
router.get('/me', protect, getProfile);
router.put('/me', protect, updateProfileValidation, updateProfile);
router.delete('/me', protect, deleteAccount);

// Legacy routes
router.get('/profile', protect, getUserProfile);
router.put('/profile', protect, updateProfileValidation, updateUserProfile);

// Admin routes
router.get('/', protect, authorize('admin'), getAllUsers);
router.put('/:id/role', protect, authorize('admin'), updateUserRole);
router.put('/:id/status', protect, authorize('admin'), updateUserStatus);
router.delete('/:id', protect, authorize('admin'), deleteUser);
router.get('/stats', protect, authorize('admin'), getPlatformStats);

module.exports = router;
