const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Mock users for development
const mockUsers = new Map();

// Store in global for access from authMiddleware
global.mockUsers = mockUsers;

/**
 * Generate secure JWT token
 */
const generateToken = (id, expiresIn = '30d') => {
  return jwt.sign({ id }, process.env.JWT_SECRET || 'fallback_secret_key_2024', {
    expiresIn,
  });
};

/**
 * Generate refresh token
 */
const generateRefreshToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_REFRESH_SECRET || 'refresh_secret_key_2024', {
    expiresIn: '7d',
  });
};

/**
 * Validate registration data
 */
const validateRegistrationData = (data) => {
  const { firstName, lastName, email, password } = data;
  const errors = [];

  if (!firstName || firstName.trim().length < 2) {
    errors.push('First name must be at least 2 characters');
  }

  if (!lastName || lastName.trim().length < 2) {
    errors.push('Last name must be at least 2 characters');
  }

  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    errors.push('Invalid email');
  }

  if (!password || password.length < 8) {
    errors.push('Password must be at least 8 characters');
  }

  return errors;
};

/**
 * Register new user
 */
const register = async (req, res) => {
  try {
    const { firstName, lastName, email, password, role = 'user' } = req.body;

    // Data validation
    const validationErrors = validateRegistrationData(req.body);
    if (validationErrors.length > 0) {
      return res.status(400).json({
        success: false,
        message: 'Invalid data',
        errors: validationErrors
      });
    }

    // Mock mode for development
    if (process.env.NODE_ENV === 'development' || !process.env.MONGODB_URI) {
      // Check if email already exists in mock mode
      const existingUser = Array.from(mockUsers.values()).find(user => user.email === email);
      if (existingUser) {
        return res.status(400).json({
          success: false,
          message: 'User with this email already exists'
        });
      }

      const mockUser = {
        _id: 'mock_' + Date.now(),
        firstName: firstName.trim(),
        lastName: lastName.trim(),
        email: email.toLowerCase(),
        role,
        isAdmin: role === 'admin',
        isBusiness: role === 'business',
        favoriteCards: [],
        createdAt: new Date(),
        updatedAt: new Date()
      };
      
      mockUsers.set(mockUser._id, mockUser);
      
      const token = generateToken(mockUser._id);
      const refreshToken = generateRefreshToken(mockUser._id);
      
      return res.status(201).json({
        success: true,
        message: 'User registered successfully (mock mode)',
        token,
        refreshToken,
        user: {
          id: mockUser._id,
          firstName: mockUser.firstName,
          lastName: mockUser.lastName,
          email: mockUser.email,
          role: mockUser.role,
          isAdmin: mockUser.isAdmin,
          isBusiness: mockUser.isBusiness
        }
      });
    }

    // Check if user already exists
    const userExists = await User.findOne({ email: email.toLowerCase() });
    if (userExists) {
      return res.status(400).json({
        success: false,
        message: 'User with this email already exists'
      });
    }

    // Hash password
    const salt = await bcrypt.genSalt(12);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create user
    const user = await User.create({
      firstName: firstName.trim(),
      lastName: lastName.trim(),
      email: email.toLowerCase(),
      password: hashedPassword,
      role,
      isAdmin: role === 'admin',
      isBusiness: role === 'business'
    });

    const token = generateToken(user._id);
    const refreshToken = generateRefreshToken(user._id);

    res.status(201).json({
      success: true,
      message: 'User registered successfully',
      token,
      refreshToken,
      user: {
        id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        role: user.role,
        isAdmin: user.isAdmin,
        isBusiness: user.isBusiness
      }
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error during registration'
    });
  }
};

/**
 * User login
 */
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Email and password required'
      });
    }

    // Mock mode for development - skip for now, use real DB
    if (false && (process.env.NODE_ENV === 'development' || !process.env.MONGODB_URI)) {
      const mockUser = Array.from(mockUsers.values()).find(user => user.email === email.toLowerCase());
      
      if (!mockUser) {
        return res.status(401).json({
          success: false,
          message: 'Invalid email or password'
        });
      }

      // In mock mode, accept any password to simplify testing
      const token = generateToken(mockUser._id);
      const refreshToken = generateRefreshToken(mockUser._id);

      return res.json({
        success: true,
        message: 'Login successful (mock mode)',
        token,
        refreshToken,
        user: {
          id: mockUser._id,
          firstName: mockUser.firstName,
          lastName: mockUser.lastName,
          email: mockUser.email,
          role: mockUser.role,
          isAdmin: mockUser.isAdmin,
          isBusiness: mockUser.isBusiness
        }
      });
    }

    // Check if user exists
    const user = await User.findOne({ email: email.toLowerCase() }).select('+password');
    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password'
      });
    }

    // Verify password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password'
      });
    }

    const token = generateToken(user._id);
    const refreshToken = generateRefreshToken(user._id);

    res.json({
      success: true,
      message: 'Login successful',
      token,
      refreshToken,
      user: {
        id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        role: user.role,
        isAdmin: user.isAdmin,
        isBusiness: user.isBusiness
      }
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error during login'
    });
  }
};

/**
 * Refresh token with refresh token
 */
const refreshToken = async (req, res) => {
  try {
    const { refreshToken } = req.body;

    if (!refreshToken) {
      return res.status(401).json({
        success: false,
        message: 'Refresh token required'
      });
    }

    const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET || 'refresh_secret_key_2024');
    const newToken = generateToken(decoded.id);
    const newRefreshToken = generateRefreshToken(decoded.id);

    res.json({
      success: true,
      token: newToken,
      refreshToken: newRefreshToken
    });

  } catch (error) {
    res.status(401).json({
      success: false,
      message: 'Invalid refresh token'
    });
  }
};

/**
 * Get current user profile
 */
const getProfile = async (req, res) => {
  try {
    const userId = req.user.id;

    // Mock mode for development
    if (process.env.NODE_ENV === 'development' || !process.env.MONGODB_URI) {
      const mockUser = mockUsers.get(userId);
      if (!mockUser) {
        return res.status(404).json({
          success: false,
          message: 'User not found'
        });
      }

      return res.json({
        success: true,
        user: {
          id: mockUser._id,
          firstName: mockUser.firstName,
          lastName: mockUser.lastName,
          email: mockUser.email,
          role: mockUser.role,
          isAdmin: mockUser.isAdmin,
          isBusiness: mockUser.isBusiness,
          favoriteCards: mockUser.favoriteCards
        }
      });
    }

    const user = await User.findById(userId).populate('favoriteCards');
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    res.json({
      success: true,
      user: {
        id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        role: user.role,
        isAdmin: user.isAdmin,
        isBusiness: user.isBusiness,
        favoriteCards: user.favoriteCards,
        lastLogin: user.lastLogin,
        loginCount: user.loginCount
      }
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error retrieving profile'
    });
  }
};

/**
 * Update user profile
 */
const updateProfile = async (req, res) => {
  try {
    const userId = req.user.id;
    const { firstName, lastName } = req.body;

    // Validation des données
    if (!firstName || firstName.trim().length < 2) {
      return res.status(400).json({
        success: false,
        message: 'Le prénom doit contenir au moins 2 caractères'
      });
    }

    if (!lastName || lastName.trim().length < 2) {
      return res.status(400).json({
        success: false,
        message: 'Le nom doit contenir au moins 2 caractères'
      });
    }

    // Mode mock pour développement
    if (process.env.NODE_ENV === 'development' || !process.env.MONGODB_URI) {
      const mockUser = mockUsers.get(userId);
      if (!mockUser) {
        return res.status(404).json({
          success: false,
          message: 'Utilisateur non trouvé'
        });
      }

      mockUser.firstName = firstName.trim();
      mockUser.lastName = lastName.trim();
      mockUser.updatedAt = new Date();

      return res.json({
        success: true,
        message: 'Profil mis à jour avec succès (mode mock)',
        user: {
          id: mockUser._id,
          firstName: mockUser.firstName,
          lastName: mockUser.lastName,
          email: mockUser.email,
          role: mockUser.role,
          isAdmin: mockUser.isAdmin,
          isBusiness: mockUser.isBusiness
        }
      });
    }

    const user = await User.findByIdAndUpdate(
      userId,
      {
        firstName: firstName.trim(),
        lastName: lastName.trim(),
        updatedAt: new Date()
      },
      { new: true }
    );

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'Utilisateur non trouvé'
      });
    }

    res.json({
      success: true,
      message: 'Profil mis à jour avec succès',
      user: {
        id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        role: user.role,
        isAdmin: user.isAdmin,
        isBusiness: user.isBusiness
      }
    });

  } catch (error) {
    // Erreur gérée par errorHandler
    res.status(500).json({
      success: false,
      message: 'Erreur serveur lors de la mise à jour du profil'
    });
  }
};

/**
 * Changer le mot de passe
 */
const changePassword = async (req, res) => {
  try {
    const userId = req.user.id;
    const { currentPassword, newPassword } = req.body;

    if (!currentPassword || !newPassword) {
      return res.status(400).json({
        success: false,
        message: 'Mot de passe actuel et nouveau mot de passe requis'
      });
    }

    if (newPassword.length < 8) {
      return res.status(400).json({
        success: false,
        message: 'Le nouveau mot de passe doit contenir au moins 8 caractères'
      });
    }

    // Mode mock pour développement
    if (process.env.NODE_ENV === 'development' || !process.env.MONGODB_URI) {
      return res.json({
        success: true,
        message: 'Mot de passe changé avec succès (mode mock)'
      });
    }

    const user = await User.findById(userId).select('+password');
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'Utilisateur non trouvé'
      });
    }

    // Vérifier le mot de passe actuel
    const isCurrentPasswordValid = await bcrypt.compare(currentPassword, user.password);
    if (!isCurrentPasswordValid) {
      return res.status(400).json({
        success: false,
        message: 'Mot de passe actuel incorrect'
      });
    }

    // Hasher le nouveau mot de passe
    const salt = await bcrypt.genSalt(12);
    const hashedNewPassword = await bcrypt.hash(newPassword, salt);

    user.password = hashedNewPassword;
    user.updatedAt = new Date();
    await user.save();

    res.json({
      success: true,
      message: 'Mot de passe changé avec succès'
    });

  } catch (error) {
    // Erreur gérée par errorHandler
    res.status(500).json({
      success: false,
      message: 'Erreur serveur lors du changement de mot de passe'
    });
  }
};

/**
 * Déconnexion utilisateur
 */
const logout = async (req, res) => {
  try {
    res.json({
      success: true,
      message: 'Déconnexion réussie'
    });
  } catch (error) {
    // Erreur gérée par errorHandler
    res.status(500).json({
      success: false,
      message: 'Erreur serveur lors de la déconnexion'
    });
  }
};

/**
 * Vérifier la validité du token
 */
const verifyToken = async (req, res) => {
  try {
    res.json({
      success: true,
      message: 'Token valide',
      user: req.user
    });
  } catch (error) {
    // Erreur gérée par errorHandler
    res.status(500).json({
      success: false,
      message: 'Erreur serveur lors de la vérification du token'
    });
  }
};

module.exports = {
  register,
  login,
  refreshToken,
  getProfile,
  updateProfile,
  changePassword,
  logout,
  verifyToken,
  generateToken,
  generateRefreshToken
};
