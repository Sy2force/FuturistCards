import jwt from 'jsonwebtoken';

// Generate JWT token
const generateToken = (userId, role) => {
  return jwt.sign(
    { id: userId, userId, role },
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
