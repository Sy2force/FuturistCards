import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import { generateToken } from '../utils/jwt.js';
import logger from '../middleware/logger.js';
import { recordFailedAttempt, recordSuccessfulLogin, isBlocked } from '../middleware/accountSecurity.js';

// @desc    Register user
// @route   POST /api/auth/register
// @access  Public
const register = async (req, res) => {
  try {
    const { email, password, firstName, lastName, phone, role, isBusiness } = req.body;

    // Basic validation (detailed validation in middleware)
    if (!email || !password || !firstName || !lastName) {
      return res.status(400).json({
        success: false,
        message: 'Tous les champs requis doivent être remplis'
      });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email: email.toLowerCase() });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: 'Un utilisateur avec cet email existe déjà'
      });
    }

    // Create user with MongoDB
    const userData = {
      firstName,
      lastName,
      email: email.toLowerCase(),
      password,
      phone: phone || '',
      isBusiness: isBusiness || false,
      isAdmin: role === 'admin' || false,
      role: role || 'user'
    };

    const user = new User(userData);
    await user.save();

    console.log('✅ Nouvel utilisateur créé:', {
      id: user._id,
      email: user.email,
      role: user.role,
      firstName: user.firstName,
      lastName: user.lastName
    });

    // Generate token
    const token = generateToken({
      id: user._id,
      _id: user._id,
      userId: user._id,
      role: user.role,
      isBusiness: user.isBusiness,
      isAdmin: user.isAdmin
    });

    res.status(201).json({
      success: true,
      message: 'Utilisateur créé avec succès',
      user: {
        id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        role: user.role,
        isBusiness: user.isBusiness,
        isAdmin: user.isAdmin
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

    // Vérifier si l'IP est bloquée avant de traiter la requête
    const blockStatus = isBlocked(req, email);
    if (blockStatus.blocked) {
      return res.status(429).json({
        success: false,
        message: 'Trop de tentatives échouées. Votre IP est temporairement bloquée.',
        blocked: true,
        remainingTime: Math.ceil(blockStatus.remainingTime / 60000),
        retryAfter: Math.ceil(blockStatus.remainingTime / 1000)
      });
    }

    // Find user in MongoDB database
    const user = await User.findOne({ email: email.toLowerCase() });
    
    if (!user) {
      // Record failed attempt and check if IP should be blocked
      const shouldBlock = recordFailedAttempt(req, email);
      
      if (shouldBlock) {
        return res.status(429).json({
          success: false,
          message: 'Trop de tentatives échouées. Votre IP a été temporairement bloquée.',
          blocked: true,
          retryAfter: 15
        });
      }
      
      return res.status(401).json({
        success: false,
        message: 'Email ou mot de passe invalide'
      });
    }

    // Validate password with bcrypt
    const isPasswordValid = await user.matchPassword(password);
    
    if (!isPasswordValid) {
      // Record failed attempt and check if IP should be blocked
      const shouldBlock = recordFailedAttempt(req, email);
      
      if (shouldBlock) {
        return res.status(429).json({
          success: false,
          message: 'Trop de tentatives échouées. Votre IP a été temporairement bloquée.',
          blocked: true,
          retryAfter: 15
        });
      }
      
      return res.status(401).json({
        success: false,
        message: 'Email ou mot de passe invalide'
      });
    }

    // Update last login
    user.lastLogin = new Date();
    user.loginCount = (user.loginCount || 0) + 1;
    await user.save();
    
    console.log('✅ Connexion utilisateur réussie:', {
      id: user._id,
      email: user.email,
      role: user.role,
      firstName: user.firstName,
      lastName: user.lastName
    });

    // Enregistrer la connexion réussie
    recordSuccessfulLogin(req, email, user.role);

    // Generate token
    const token = generateToken({
      id: user._id,
      _id: user._id,
      userId: user._id,
      role: user.role,
      isBusiness: user.isBusiness,
      isAdmin: user.isAdmin
    });

    res.json({
      success: true,
      message: 'Connexion réussie',
      user: {
        id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        role: user.role,
        isBusiness: user.isBusiness,
        isAdmin: user.isAdmin
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
    // Get user from MongoDB database
    const user = await User.findById(req.user.id || req.user.userId).select('-password -refreshToken');
    
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'Utilisateur non trouvé'
      });
    }
    
    console.log('✅ Profil utilisateur récupéré:', {
      id: user._id,
      email: user.email,
      role: user.role
    });
    
    res.json({
      success: true,
      message: 'Profil récupéré avec succès',
      user: user.getPublicProfile()
    });

  } catch (error) {
    console.error('Get profile error:', error);
    res.status(500).json({
      success: false,
      message: 'Erreur serveur lors de la récupération du profil'
    });
  }
};

// @desc    Update user profile
// @route   PUT /api/auth/profile
// @access  Private
const updateProfile = async (req, res) => {
  try {
    const { firstName, lastName, phone, preferences } = req.body;

    // Find and update user in MongoDB
    const user = await User.findById(req.user.id || req.user.userId);
    
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'Utilisateur non trouvé'
      });
    }

    // Update user fields if provided
    if (firstName) user.firstName = firstName;
    if (lastName) user.lastName = lastName;
    if (phone) user.phone = phone;
    if (preferences) user.preferences = { ...user.preferences, ...preferences };

    await user.save();
    
    console.log('✅ Profil utilisateur mis à jour:', {
      id: user._id,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName
    });

    res.json({
      success: true,
      message: 'Profil mis à jour avec succès',
      user: user.getPublicProfile()
    });

  } catch (error) {
    console.error('Update profile error:', error);
    res.status(500).json({
      success: false,
      message: 'Erreur serveur lors de la mise à jour du profil'
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

    // Get user from MongoDB
    const user = await User.findById(req.user.id || req.user.userId);
    
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'Utilisateur non trouvé'
      });
    }

    // Verify current password
    const isCurrentPasswordValid = await user.matchPassword(currentPassword);
    if (!isCurrentPasswordValid) {
      return res.status(400).json({
        success: false,
        message: 'Mot de passe actuel incorrect'
      });
    }

    // Update password
    user.password = newPassword;
    await user.save();

    res.json({
      success: true,
      message: 'Mot de passe modifié avec succès'
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

// User management functions (fusionné depuis userController)

// Obtenir tous les utilisateurs (admin uniquement)
export const getAllUsers = async (req, res) => {
  try {
    const { page = 1, limit = 10, role, search } = req.query;
    const query = {};
    
    if (role && ['user', 'business', 'admin'].includes(role)) {
      query.role = role;
    }
    
    if (search) {
      query.$or = [
        { firstName: { $regex: search, $options: 'i' } },
        { lastName: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } }
      ];
    }
    
    const users = await User.find(query)
      .select('-password')
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .sort({ createdAt: -1 });
      
    const total = await User.countDocuments(query);
    
    res.json({
      success: true,
      data: users,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total,
        pages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({
      success: false,
      message: 'Erreur lors de la récupération des utilisateurs'
    });
  }
};

// Obtenir un utilisateur par ID
export const getUserById = async (req, res) => {
  try {
    const { id } = req.params;
    
    if (req.user.id !== id && req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Non autorisé à accéder à ce profil'
      });
    }
    
    const user = await User.findById(id).select('-password');
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'Utilisateur non trouvé'
      });
    }
    
    res.json({
      success: true,
      data: user
    });
  } catch (error) {
    console.error('Error fetching user:', error);
    res.status(500).json({
      success: false,
      message: 'Erreur lors de la récupération de l\'utilisateur'
    });
  }
};

// Changer le rôle d'un utilisateur (admin uniquement)
export const changeUserRole = async (req, res) => {
  try {
    const { id } = req.params;
    const { role } = req.body;
    
    if (!role || !['user', 'business', 'admin'].includes(role)) {
      return res.status(400).json({
        success: false,
        message: 'Rôle invalide. Doit être: user, business ou admin'
      });
    }

    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'Utilisateur non trouvé'
      });
    }

    if (req.user.id === id && req.user.role === 'admin' && role !== 'admin') {
      return res.status(400).json({
        success: false,
        message: 'Vous ne pouvez pas retirer votre propre rôle admin'
      });
    }

    const oldRole = user.role;
    user.role = role;
    user.isBusiness = role === 'business';
    user.isAdmin = role === 'admin';
    
    await user.save();

    res.json({
      success: true,
      message: `Rôle mis à jour de ${oldRole} vers ${role}`,
      data: {
        id: user._id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        role: user.role,
        isBusiness: user.isBusiness,
        isAdmin: user.isAdmin
      }
    });
  } catch (error) {
    console.error('Error changing user role:', error);
    res.status(500).json({
      success: false,
      message: 'Erreur lors du changement de rôle'
    });
  }
};

// Supprimer un utilisateur (admin uniquement)
export const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    
    if (req.user.id === id) {
      return res.status(400).json({
        success: false,
        message: 'Vous ne pouvez pas supprimer votre propre compte'
      });
    }
    
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'Utilisateur non trouvé'
      });
    }

    await User.findByIdAndDelete(id);

    res.json({
      success: true,
      message: `Utilisateur ${user.email} supprimé avec succès`
    });
  } catch (error) {
    console.error('Error deleting user:', error);
    res.status(500).json({
      success: false,
      message: 'Erreur lors de la suppression'
    });
  }
};

// Obtenir les statistiques des utilisateurs (admin uniquement)
export const getUserStats = async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    const usersByRole = await User.aggregate([
      { $group: { _id: '$role', count: { $sum: 1 } } }
    ]);
    
    const recentUsers = await User.find()
      .select('firstName lastName email role createdAt')
      .sort({ createdAt: -1 })
      .limit(5);
    
    const stats = {
      total: totalUsers,
      byRole: usersByRole.reduce((acc, item) => {
        acc[item._id] = item.count;
        return acc;
      }, {}),
      recent: recentUsers
    };
    
    res.json({
      success: true,
      data: stats
    });
  } catch (error) {
    console.error('Error fetching user stats:', error);
    res.status(500).json({
      success: false,
      message: 'Erreur lors de la récupération des statistiques'
    });
  }
};

// Alias updateUser to updateProfile for route compatibility
const updateUser = updateProfile;

export default {
  register,
  login,
  getProfile,
  updateProfile,
  updateUser,
  changePassword,
  logout,
  getAllUsers,
  getUserById,
  changeUserRole,
  deleteUser,
  getUserStats
};
