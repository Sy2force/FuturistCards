const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// @desc    Register user
// @route   POST /api/auth/register
// @access  Public
const register = async (req, res) => {
  try {
    const { email, password, firstName, lastName, phone, role, isBusiness } = req.body;

    // Basic validation
    if (!email || !password || !firstName || !lastName) {
      return res.status(400).json({
        success: false,
        message: 'Tous les champs requis doivent être remplis'
      });
    }

    // Mock mode - simulate user creation
    const mockUser = {
      _id: Date.now().toString(),
      firstName,
      lastName,
      email: email.toLowerCase(),
      phone: phone || '',
      isBusiness: role === 'business' || isBusiness || false,
      isAdmin: role === 'admin' || false,
      role: role || 'user'
    };

    // Nouvel utilisateur créé (mode mock)

    // Generate token
    const token = generateToken({
      id: mockUser._id,
      _id: mockUser._id,
      userId: mockUser._id,
      role: mockUser.role,
      isBusiness: mockUser.isBusiness,
      isAdmin: mockUser.isAdmin
    });

    res.status(201).json({
      success: true,
      message: 'Utilisateur créé avec succès',
      user: {
        id: mockUser._id,
        firstName: mockUser.firstName,
        lastName: mockUser.lastName,
        email: mockUser.email,
        role: mockUser.role,
        isBusiness: mockUser.isBusiness,
        isAdmin: mockUser.isAdmin
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

    // Mock mode - simulate login
    // Pour le login, on utilise l'email pour déterminer le rôle (mode demo)
    // En production, ces données viendraient de la base de données
    const emailLower = email.toLowerCase();
    const isAdmin = emailLower.includes('admin');
    const isBusiness = emailLower.includes('business') || isAdmin;
    const role = isAdmin ? 'admin' : isBusiness ? 'business' : 'user';
    
    const mockUser = {
      _id: Date.now().toString(),
      firstName: isAdmin ? 'Admin' : isBusiness ? 'Business' : 'Demo',
      lastName: 'User',
      email: emailLower,
      role: role,
      isBusiness: isBusiness,
      isAdmin: isAdmin
    };

    // Connexion réussie (mode mock)

    // Generate token
    const token = generateToken({
      id: mockUser._id,
      _id: mockUser._id,
      userId: mockUser._id,
      role: mockUser.role,
      isBusiness: mockUser.isBusiness,
      isAdmin: mockUser.isAdmin
    });

    res.json({
      success: true,
      message: 'Connexion réussie',
      user: {
        id: mockUser._id,
        firstName: mockUser.firstName,
        lastName: mockUser.lastName,
        email: mockUser.email,
        role: mockUser.role,
        isBusiness: mockUser.isBusiness,
        isAdmin: mockUser.isAdmin
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

// @desc    Get current user
// @route   GET /api/auth/me
// @access  Private  
const getMe = async (req, res) => {
  try {
    // Mock mode - return mock user data
    const mockUser = {
      _id: req.user?.id || Date.now().toString(),
      firstName: 'Demo',
      lastName: 'User', 
      email: req.user?.email || 'demo@test.com',
      role: req.user?.role || 'user',
      isBusiness: req.user?.isBusiness || false,
      isAdmin: req.user?.isAdmin || false
    };

    res.json({
      success: true,
      user: mockUser
    });
  } catch (error) {
    console.error('Get me error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};

export { register, login, getMe };
