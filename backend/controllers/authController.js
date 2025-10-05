import bcrypt from 'bcryptjs';
import User from '../models/User.js';
import { generateToken } from '../utils/jwt.js';
// Validation functions moved to middleware/validation.js

// @desc    Register user
// @route   POST /api/auth/register
// @access  Public
const register = async (req, res) => {
  try {
    const { email, password, firstName, lastName, phone, role } = req.body;

    // Basic validation (detailed validation in middleware)
    if (!email || !password || !firstName || !lastName || !phone) {
      return res.status(400).json({
        success: false,
        message: 'Tous les champs sont requis'
      });
    }

    // Mock mode - create user without database
    const mockUser = {
      _id: '507f1f77bcf86cd799439014',
      firstName,
      lastName,
      email,
      role: role || 'user',
      phone: phone || '',
      createdAt: new Date()
    };

    // Generate token
    const token = generateToken(mockUser._id, mockUser.role);

    res.status(201).json({
      success: true,
      message: 'User registered successfully (mock mode)',
      user: {
        id: mockUser._id,
        firstName: mockUser.firstName,
        lastName: mockUser.lastName,
        email: mockUser.email,
        role: mockUser.role
      },
      token
    });

  } catch (error) {
    console.error('Register error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error during registration'
    });
  }
};

// @desc    Login user
// @route   POST /api/auth/login
// @access  Public
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Basic email validation
    if (!email || !email.includes('@')) {
      return res.status(400).json({
        success: false,
        message: 'Valid email is required'
      });
    }

    if (!password) {
      return res.status(400).json({
        success: false,
        message: 'Password is required'
      });
    }

    // Mock login - determine role based on email
    let mockUser;
    if (email.includes('admin')) {
      mockUser = {
        _id: '507f1f77bcf86cd799439016',
        firstName: 'Admin',
        lastName: 'System',
        email: email,
        role: 'admin',
        lastLogin: new Date(),
        loginCount: 1
      };
    } else if (email.includes('business')) {
      mockUser = {
        _id: '507f1f77bcf86cd799439015',
        firstName: 'Business',
        lastName: 'Owner',
        email: email,
        role: 'business',
        lastLogin: new Date(),
        loginCount: 1
      };
    } else {
      mockUser = {
        _id: '507f1f77bcf86cd799439014',
        firstName: 'Test',
        lastName: 'User',
        email: email,
        role: 'user',
        lastLogin: new Date(),
        loginCount: 1
      };
    }

    // Generate token
    const token = generateToken(mockUser._id, mockUser.role);

    res.json({
      success: true,
      message: 'Login successful (mock mode)',
      user: {
        id: mockUser._id,
        firstName: mockUser.firstName,
        lastName: mockUser.lastName,
        email: mockUser.email,
        role: mockUser.role
      },
      token
    });

  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error during login'
    });
  }
};

// @desc    Get user profile
// @route   GET /api/auth/profile
// @access  Private
const getProfile = async (req, res) => {
  try {
    // Mock mode - return mock user data
    const mockUser = {
      _id: req.user.id || req.user.userId,
      firstName: 'Test',
      lastName: 'User',
      email: req.user.email || 'test@example.com',
      role: req.user.role || 'user',
      phone: '',
      createdAt: new Date(),
      lastLogin: new Date(),
      loginCount: 1
    };

    res.json({
      success: true,
      user: {
        id: mockUser._id,
        firstName: mockUser.firstName,
        lastName: mockUser.lastName,
        email: mockUser.email,
        role: mockUser.role,
        phone: mockUser.phone,
        createdAt: mockUser.createdAt,
        lastLogin: mockUser.lastLogin,
        loginCount: mockUser.loginCount
      }
    });

  } catch (error) {
    console.error('Get profile error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};

// @desc    Update user profile
// @route   PUT /api/auth/profile
// @access  Private
const updateProfile = async (req, res) => {
  try {
    const { firstName, lastName, phone } = req.body;

    // Mock mode - simulate profile update
    const mockUser = {
      _id: req.user.id || req.user.userId,
      firstName: firstName || 'Test',
      lastName: lastName || 'User',
      email: req.user.email || 'test@example.com',
      role: req.user.role || 'user',
      phone: phone || ''
    };

    res.json({
      success: true,
      message: 'Profile updated successfully (mock mode)',
      user: {
        id: mockUser._id,
        firstName: mockUser.firstName,
        lastName: mockUser.lastName,
        email: mockUser.email,
        role: mockUser.role,
        phone: mockUser.phone
      }
    });

  } catch (error) {
    console.error('Update profile error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};

// @desc    Change password
// @route   POST /api/auth/change-password
// @access  Private
const changePassword = async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;

    // Validate new password
    if (!newPassword || newPassword.length < 6) {
      return res.status(400).json({
        success: false,
        message: 'Password must be at least 6 characters long'
      });
    }

    // Mock mode - simulate password change
    res.json({
      success: true,
      message: 'Password changed successfully (mock mode)'
    });

  } catch (error) {
    console.error('Change password error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};

// @desc    Logout user
// @route   POST /api/auth/logout
// @access  Private
const logout = async (req, res) => {
  try {
    res.json({
      success: true,
      message: 'Logout successful'
    });
  } catch (error) {
    console.error('Logout error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};

export default {
  register,
  login,
  getProfile,
  updateProfile,
  changePassword,
  logout
};
