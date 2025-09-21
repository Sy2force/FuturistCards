const mongoose = require('mongoose');

// MongoDB connection configuration
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/futuristcards', {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    // MongoDB Connected
  } catch (error) {
    // MongoDB connection error
    process.exit(1);
  }
};

// JWT configuration
const jwtConfig = {
  secret: process.env.JWT_SECRET || 'your-super-secret-jwt-key-change-this-in-production',
  expiresIn: '7d'
};

module.exports = {
  connectDB,
  jwtConfig
};
