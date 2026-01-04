const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { validationResult } = require('express-validator');
const mongoose = require('mongoose');
const { mockUsers } = require('../data/mockData');
// Removed i18n dependency - using English only

// Generate JWT token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '30d' });
};

// User registration
const register = async (req, res) => {
  try {
    const { firstName, lastName, name, email, phone, password, role } = req.body;

    // Combine firstName and lastName or use name
    const fullName = name || `${firstName} ${lastName}`.trim();
    
    if (!fullName || fullName.length < 2) {
      return res.status(400).json({ message: 'Name is required and must be at least 2 characters' });
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
      return res.status(400).json({ message: 'Email already exists. Please use a different email address.' });
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create the user (with MongoDB fallback)
    let user;
    try {
      user = await User.create({
        name: fullName,
        email,
        phone: phone || '',
        password: hashedPassword,
        role: role || 'user'
      });
    } catch (dbError) {
      // MongoDB fallback - create mock user
      user = {
        _id: new Date().getTime().toString(),
        name: fullName,
        email,
        phone: phone || '',
        password: hashedPassword,
        role: role || 'user',
        createdAt: new Date()
      };
    }

    const token = generateToken(user._id);

    res.status(201).json({
      success: true,
      message: 'Account created successfully! Welcome to FuturistCards.',
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    });
  } catch (error) {
    res.status(500).json({ message: 'Registration failed. Please try again.', error: error.message });
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
      if (!user) {
        // Fallback to mock users if not found in MongoDB
        user = mockUsers.find(u => u.email === email);
      }
    } catch (dbError) {
      // Fallback to mock users if MongoDB is unavailable
      user = mockUsers.find(u => u.email === email);
    }
    
    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    // Verify password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    const token = generateToken(user._id);

    res.json({
      success: true,
      message: 'Login successful! Welcome back.',
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    });
  } catch (error) {
    res.status(500).json({ message: 'Login failed. Please try again.', error: error.message });
  }
};

// Get user profile
const getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    res.json({ user });
  } catch (error) {
    res.status(500).json({ message: 'Server error occurred. Please try again.', error: error.message });
  }
};

// Update user profile
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
      message: 'Profile updated successfully',
      user 
    });
  } catch (error) {
    res.status(500).json({ message: 'Profile update failed. Please try again.', error: error.message });
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
      return res.status(400).json({ message: 'Current password is incorrect' });
    }

    // Hash new password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);

    await User.findByIdAndUpdate(req.user.id, { password: hashedPassword });

    res.json({ 
      success: true,
      message: 'Password changed successfully' 
    });
  } catch (error) {
    res.status(500).json({ message: 'Password change failed. Please try again.', error: error.message });
  }
};

// Logout (mainly client-side)
const logout = (req, res) => {
  res.json({ 
    success: true,
    message: 'Logout successful' 
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
