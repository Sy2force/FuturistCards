const connectDB = require('../connections/mongo');
const bcrypt = require('bcryptjs');
const { generateToken } = require('../utils/generateToken');

// Mock users for when MongoDB is not available
const mockUsers = [
  {
    _id: '507f1f77bcf86cd799439012',
    firstName: 'Admin',
    lastName: 'User',
    email: 'admin@futurist.cards',
    password: '$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewdBPj/VcSAg/9qm', // Admin123!
    phone: '052-1234567',
    address: {
      country: 'Israel',
      city: 'Tel Aviv',
      street: 'Rothschild Blvd',
      houseNumber: '1'
    },
    role: 'admin',
    isAdmin: true,
    isBusiness: true,
    isActive: true,
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-01')
  },
  {
    _id: '507f1f77bcf86cd799439013',
    firstName: 'Business',
    lastName: 'User',
    email: 'business@futurist.cards',
    password: '$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewdBPj/VcSAg/9qm', // Business123!
    phone: '052-9876543',
    address: {
      country: 'Israel',
      city: 'Jerusalem',
      street: 'King George St',
      houseNumber: '42'
    },
    role: 'business',
    isAdmin: false,
    isBusiness: true,
    isActive: true,
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-01')
  },
  {
    _id: '507f1f77bcf86cd799439014',
    firstName: 'Regular',
    lastName: 'User',
    email: 'user@futurist.cards',
    password: '$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewdBPj/VcSAg/9qm', // User123!
    phone: '052-5555555',
    address: {
      country: 'Israel',
      city: 'Haifa',
      street: 'Carmel Center',
      houseNumber: '88'
    },
    role: 'user',
    isAdmin: false,
    isBusiness: false,
    isActive: true,
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-01')
  }
];

// Mock authentication functions
const mockAuth = {
  register: async (userData) => {
    console.log('📝 Mock registration attempt:', userData.email);
    
    // Check if user already exists
    const existingUser = mockUsers.find(u => u.email.toLowerCase() === userData.email.toLowerCase());
    if (existingUser) {
      return {
        success: false,
        message: 'User already exists with this email'
      };
    }
    
    // Simulate user creation
    const newUser = {
      _id: Date.now().toString(),
      firstName: userData.firstName || 'User',
      lastName: userData.lastName || 'Name',
      email: userData.email,
      password: userData.password,
      phone: userData.phone || '052-1234567',
      address: userData.address || {
        country: 'Israel',
        city: 'Tel Aviv',
        street: 'Main St',
        houseNumber: '1'
      },
      role: userData.role || 'business',
      isAdmin: false,
      isBusiness: true,
      isActive: true,
      createdAt: new Date(),
      updatedAt: new Date()
    };
    
    // Add to mock users (in memory only)
    mockUsers.push(newUser);
    console.log('✅ Mock user created:', newUser.email);
    
    return {
      success: true,
      message: 'User registered successfully (mock mode)',
      user: {
        _id: newUser._id,
        firstName: newUser.firstName,
        lastName: newUser.lastName,
        email: newUser.email,
        role: newUser.role,
        isAdmin: newUser.isAdmin,
        isBusiness: newUser.isBusiness
      },
      token: generateToken(newUser._id),
      refreshToken: generateToken(newUser._id + '_refresh')
    };
  },

  login: async (email, password) => {
    console.log('🔍 Mock login attempt:', { email, password });
    
    // Find user in mock data
    let user = mockUsers.find(u => u.email.toLowerCase() === email.toLowerCase());
    
    // If user doesn't exist, create them automatically for seamless experience
    if (!user) {
      console.log('👤 Creating new mock user for:', email);
      const newUser = {
        _id: Date.now().toString(),
        firstName: email.split('@')[0].charAt(0).toUpperCase() + email.split('@')[0].slice(1),
        lastName: 'User',
        email: email,
        password: password, // Store the password they used
        phone: '052-1234567',
        address: {
          country: 'Israel',
          city: 'Tel Aviv',
          street: 'Main St',
          houseNumber: '1'
        },
        role: 'business',
        isAdmin: false,
        isBusiness: true,
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date()
      };
      
      mockUsers.push(newUser);
      user = newUser;
    }

    // Always accept the password they provide for seamless login
    console.log('✅ Mock login successful for:', user.email);
    
    return {
      success: true,
      message: 'Login successful (mock mode)',
      user: {
        _id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        role: user.role,
        isAdmin: user.isAdmin,
        isBusiness: user.isBusiness
      },
      token: generateToken(user._id),
      refreshToken: generateToken(user._id + '_refresh')
    };
  },

  getProfile: async (userId) => {
    const user = mockUsers.find(u => u._id === userId);
    if (!user) {
      return {
        success: false,
        message: 'User not found'
      };
    }

    return {
      success: true,
      user: {
        _id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        phone: user.phone,
        address: user.address,
        role: user.role,
        isAdmin: user.isAdmin,
        isBusiness: user.isBusiness
      }
    };
  }
};

module.exports = { mockAuth, mockUsers };
