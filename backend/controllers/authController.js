const User = require('../models/User');
const jwt = require('jsonwebtoken');
<<<<<<< HEAD
const bcrypt = require('bcryptjs');
const { validationResult } = require('express-validator');
const mongoose = require('mongoose');
const { mockUsers } = require('../data/mockData');

// créer un token JWT
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '30d' });
};

// inscription
const register = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    // vérifier si l'email existe déjà
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'Cet email est déjà utilisé' });
    }

    // hasher le mot de passe
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // créer l'utilisateur
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      role: role || 'user'
    });

    const token = generateToken(user._id);

    res.status(201).json({
      success: true,
      message: 'Compte créé avec succès',
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
=======
const User = require('../models/User');

// Mock users for development
const mockUsers = new Map();

// Store in global for access from authMiddleware
global.mockUsers = mockUsers;

// Initialize test users for Playwright tests
const initializeTestUsers = () => {
  const testUsers = [
    {
      _id: 'test-user-id',
      firstName: 'Test',
      lastName: 'User',
      email: 'user@demo.com',
      role: 'user',
      isAdmin: false,
      isBusiness: false
    },
    {
      _id: 'test-business-id',
      firstName: 'Business',
      lastName: 'User',
      email: 'business@demo.com',
      role: 'business',
      isAdmin: false,
      isBusiness: true
    },
    {
      _id: 'test-admin-id',
      firstName: 'Admin',
      lastName: 'User',
      email: 'admin@demo.com',
      role: 'admin',
      isAdmin: true,
      isBusiness: true
    }
  ];

  testUsers.forEach(user => {
    mockUsers.set(user.email, user);
    mockUsers.set(user._id, user);
  });
};

// Initialize test users on module load
initializeTestUsers();

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

  if (!email || email.trim().length < 3) {
    errors.push('Email must be at least 3 characters');
  }

  if (!password || password.length < 4) {
    errors.push('Password must be at least 4 characters');
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

    // Mock mode for development - ACCEPTER TOUTE ADRESSE EMAIL
    if (process.env.NODE_ENV === 'development' || !process.env.MONGODB_URI) {
      // En mode développement, permettre la création de comptes avec n'importe quelle adresse
      // Ne pas vérifier si l'email existe déjà pour faciliter les tests

      const mockUser = {
        _id: 'mock_' + Date.now(),
        firstName: firstName.trim(),
        lastName: lastName.trim(),
        email: email.toLowerCase(),
        role,
        isAdmin: role === 'admin',
        isBusiness: role === 'business' || role === 'admin',
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
      isBusiness: role === 'business' || role === 'admin'
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
>>>>>>> 1ca665d3f5f764417ada1cdd89a898f39ac3dccd
      }
    });
  } catch (error) {
<<<<<<< HEAD
    res.status(500).json({ message: 'Erreur lors de l\'inscription', error: error.message });
  }
};

// connexion
=======
    res.status(500).json({
      success: false,
      message: 'Server error during registration'
    });
  }
};

/**
 * User login
 */
>>>>>>> 1ca665d3f5f764417ada1cdd89a898f39ac3dccd
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

<<<<<<< HEAD
    let user;
    try {
      // trouver l'utilisateur dans MongoDB
      user = await User.findOne({ email });
    } catch (dbError) {
      // Fallback to mock users if MongoDB is unavailable
      user = mockUsers.find(u => u.email === email);
    }
    
    if (!user) {
      return res.status(401).json({ message: 'Email ou mot de passe incorrect' });
    }

    // vérifier le mot de passe
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Email ou mot de passe incorrect' });
    }

    const token = generateToken(user._id);

    res.json({
      success: true,
      message: 'Connexion réussie',
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
=======
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Email and password required'
      });
    }

    // Mock mode for development
    if (process.env.NODE_ENV === 'development' || !process.env.MONGODB_URI) {
      // Find user by email (not by ID for login)
      let mockUser = null;
      for (let [key, user] of mockUsers.entries()) {
        if (user.email === email.toLowerCase()) {
          mockUser = user;
          break;
        }
      }
      
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
>>>>>>> 1ca665d3f5f764417ada1cdd89a898f39ac3dccd
      }
    });
  } catch (error) {
<<<<<<< HEAD
    res.status(500).json({ message: 'Erreur de connexion', error: error.message });
  }
};

// récupérer le profil
const getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    res.json({ user });
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur', error: error.message });
  }
};

// mettre à jour le profil
const updateProfile = async (req, res) => {
  try {
    const { name, email } = req.body;
    
    const user = await User.findByIdAndUpdate(
      req.user.id,
      { name, email },
      { new: true }
    ).select('-password');

    res.json({ 
      success: true,
      message: 'Profil mis à jour',
      user 
    });
  } catch (error) {
    res.status(500).json({ message: 'Erreur de mise à jour', error: error.message });
  }
};

// changer le mot de passe
const changePassword = async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;
    
    const user = await User.findById(req.user.id);
    
    // vérifier l'ancien mot de passe
    const isMatch = await bcrypt.compare(currentPassword, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Mot de passe actuel incorrect' });
    }

    // hasher le nouveau mot de passe
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);

    await User.findByIdAndUpdate(req.user.id, { password: hashedPassword });

    res.json({ 
      success: true,
      message: 'Mot de passe modifié avec succès' 
    });
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors du changement de mot de passe', error: error.message });
  }
};

// déconnexion (côté client surtout)
const logout = (req, res) => {
  res.json({ 
    success: true,
    message: 'Déconnexion réussie' 
  });
=======
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
      // Try to find user by ID first, then by email
      let mockUser = mockUsers.get(userId);
      if (!mockUser) {
        // If not found by ID, try to find by email (fallback)
        for (let [key, user] of mockUsers.entries()) {
          if (user._id === userId) {
            mockUser = user;
            break;
          }
        }
      }
      
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

    if (newPassword.length < 4) {
      return res.status(400).json({
        success: false,
        message: 'Le nouveau mot de passe doit contenir au moins 4 caractères'
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
>>>>>>> 1ca665d3f5f764417ada1cdd89a898f39ac3dccd
};

module.exports = {
  register,
  login,
<<<<<<< HEAD
  getProfile,
  updateProfile,
  changePassword,
  logout
=======
  refreshToken,
  getProfile,
  updateProfile,
  changePassword,
  logout,
  verifyToken,
  generateToken,
  generateRefreshToken
>>>>>>> 1ca665d3f5f764417ada1cdd89a898f39ac3dccd
};
