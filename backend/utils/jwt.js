import jwt from 'jsonwebtoken';

// Generate JWT token
const generateToken = (user) => {
  return jwt.sign(
    { 
      id: user._id,
      _id: user._id,
      userId: user._id,
      role: user.role,
      isBusiness: user.isBusiness || user.role === 'business' || user.role === 'admin',
      isAdmin: user.isAdmin || user.role === 'admin'
    },
    process.env.JWT_SECRET || 'fallback_secret_key_for_development',
    { expiresIn: process.env.JWT_EXPIRES_IN || '30d' }
  );
};

// Verify JWT token
const verifyToken = (token) => {
  return jwt.verify(token, process.env.JWT_SECRET || 'fallback_secret_key_for_development');
};

export {
  generateToken,
  verifyToken
};
