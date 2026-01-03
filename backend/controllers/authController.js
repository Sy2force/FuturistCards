const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { validationResult } = require('express-validator');
const mongoose = require('mongoose');
const { mockUsers } = require('../data/mockData');
const { t } = require('../utils/i18n');

// Generate JWT token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '30d' });
};

// User registration
const register = async (req, res) => {
  try {
    const { firstName, lastName, name, email, password, role } = req.body;

    // Combine firstName and lastName or use name
    const fullName = name || `${firstName} ${lastName}`.trim();
    
    if (!fullName || fullName.length < 2) {
      return res.status(400).json({ message: t('auth.nameRequired') });
    }

    // Check if email already exists (simplified - allow any email format)
    let existingUser;
    try {
      existingUser = await User.findOne({ email });
    } catch (dbError) {
      // If MongoDB is unavailable, skip duplicate check
      existingUser = null;
    }
    
    if (existingUser) {
      return res.status(400).json({ message: t('auth.emailExists') });
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create the user
    const user = await User.create({
      name: fullName,
      email,
      password: hashedPassword,
      role: role || 'user'
    });

    const token = generateToken(user._id);

    res.status(201).json({
      success: true,
      message: t('auth.accountCreated'),
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    });
  } catch (error) {
    res.status(500).json({ message: t('auth.registrationError'), error: error.message });
  }
};

// User login
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    let user;
    try {
      // Check if user already exists in MongoDB
      user = await User.findOne({ email });
    } catch (dbError) {
      // Fallback to mock users if MongoDB is unavailable
      user = mockUsers.find(u => u.email === email);
    }
    
    if (!user) {
      return res.status(401).json({ message: t('auth.invalidCredentials') });
    }

    // Verify password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: t('auth.invalidCredentials') });
    }

    const token = generateToken(user._id);

    res.json({
      success: true,
      message: t('auth.loginSuccess'),
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    });
  } catch (error) {
    res.status(500).json({ message: t('auth.loginError'), error: error.message });
  }
};

// get le profil
const getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    res.json({ user });
  } catch (error) {
    res.status(500).json({ message: t('server.serverError'), error: error.message });
  }
};

// Update le profil
const updateProfile = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    
    const user = await User.findByIdAndUpdate(
      req.user.id,
      { name, email, password },
      { name, email },
      { new: true }
    ).select('-password');

    res.json({ 
      success: true,
      message: t('auth.profileUpdated'),
      user 
    });
  } catch (error) {
    res.status(500).json({ message: t('auth.updateError'), error: error.message });
  }
};

// Change password
const changePassword = async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;
    
    let user;
    try {
      // Check if user already exists in MongoDB
      user = await User.findOne({ email: req.user.email });
    } catch (dbError) {
      // Fallback to mock users if MongoDB is unavailable
      user = mockUsers.find(u => u.email === req.user.email);
    }
    
    // Verify current password
    const isMatch = await bcrypt.compare(currentPassword, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: t('auth.wrongCurrentPassword') });
    }

    // Hash new password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);

    await User.findByIdAndUpdate(req.user.id, { password: hashedPassword });

    res.json({ 
      success: true,
      message: t('auth.passwordChanged') 
    });
  } catch (error) {
    res.status(500).json({ message: t('auth.passwordChangeError'), error: error.message });
  }
};

// déconnexion (côté client surtout)
const logout = (req, res) => {
  res.json({ 
    success: true,
    message: t('auth.logoutSuccess') 
  });
};

module.exports = {
  register,
  login,
  getProfile,
  updateProfile,
  changePassword,
  logout
};
