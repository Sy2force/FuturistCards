import express from 'express';
import authController from '../controllers/authController.js';
import { protect, authorize, requireAdmin } from '../middleware/authMiddleware.js';
import { validate, authSchemas } from '../middleware/validation.js';

const router = express.Router();

// ================================
// AUTHENTICATION ROUTES
// ================================

// @route   POST /api/auth/register
// @desc    Register a new user
// @access  Public
router.post('/register', validate(authSchemas.register), authController.register);

// @route   POST /api/auth/login
// @desc    Login user
// @access  Public
router.post('/login', validate(authSchemas.login), authController.login);

// @route   GET /api/auth/profile
// @desc    Get user profile
// @access  Private
router.get('/profile', protect, authController.getProfile);

// @route   PUT /api/auth/profile
// @desc    Update user profile
// @access  Private
router.put('/profile', protect, authController.updateProfile);

// @route   POST /api/auth/change-password
// @desc    Change password
// @access  Private
router.post('/change-password', protect, validate(authSchemas.changePassword), authController.changePassword);

// @route   POST /api/auth/logout
// @desc    Logout user
// @access  Private
router.post('/logout', protect, authController.logout);

// ================================
// USER MANAGEMENT ROUTES
// ================================

// @route   GET /api/auth/users
// @desc    Get all users with filters and pagination
// @access  Admin only
router.get('/users', protect, requireAdmin, authController.getAllUsers);

// @route   GET /api/auth/users/stats
// @desc    Get user statistics
// @access  Admin only
router.get('/users/stats', protect, requireAdmin, authController.getUserStats);

// @route   GET /api/auth/users/:id
// @desc    Get user by ID
// @access  Private (own profile) or Admin
router.get('/users/:id', protect, authController.getUserById);

// @route   PUT /api/auth/users/:id
// @desc    Update user profile
// @access  Private (own profile) or Admin
router.put('/users/:id', protect, validate(authSchemas.updateProfile), authController.updateUser);

// @route   PATCH /api/auth/users/:id/role
// @desc    Change user role
// @access  Admin only
router.patch('/users/:id/role', protect, requireAdmin, validate(authSchemas.changeRole), authController.changeUserRole);

// @route   DELETE /api/auth/users/:id
// @desc    Delete user
// @access  Admin only
router.delete('/users/:id', protect, requireAdmin, authController.deleteUser);

// ================================
// ADMIN DASHBOARD ROUTES
// ================================

// @route   GET /api/auth/admin/stats
// @desc    Get system statistics for admin dashboard
// @access  Admin only
router.get('/admin/stats', protect, requireAdmin, async (req, res) => {
  try {
    // Mock statistics for development
    const stats = {
      users: {
        total: 156,
        active: 142,
        newThisMonth: 23,
        roles: {
          user: 134,
          business: 18,
          admin: 4
        }
      },
      cards: {
        total: 487,
        active: 456,
        public: 423,
        newThisMonth: 67,
        categories: {
          Technology: 189,
          Design: 124,
          Marketing: 89,
          Business: 85
        }
      },
      activity: {
        totalViews: 12456,
        totalLikes: 3421,
        averageViewsPerCard: 25.6,
        popularCards: [
          { id: '1', title: 'Senior React Developer', views: 234 },
          { id: '2', title: 'UX/UI Designer Expert', views: 198 },
          { id: '3', title: 'DevOps Architect', views: 187 }
        ]
      }
    };

    res.json({
      success: true,
      stats
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching statistics'
    });
  }
});

// @route   GET /api/auth/admin/health
// @desc    Get system health status
// @access  Admin only
router.get('/admin/health', protect, requireAdmin, async (req, res) => {
  try {
    const health = {
      status: 'healthy',
      uptime: process.uptime(),
      memory: process.memoryUsage(),
      timestamp: new Date().toISOString(),
      services: {
        database: 'connected',
        api: 'running',
        authentication: 'active'
      },
      version: '1.0.0',
      environment: process.env.NODE_ENV || 'development'
    };

    res.json({
      success: true,
      health
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error checking system health'
    });
  }
});

export default router;
