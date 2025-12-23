const mongoose = require('mongoose');

let isConnected = false;

const connectDB = async () => {
  try {
    // Try local MongoDB first
    const mongoURI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/futuristcards';
    
    // Attempting MongoDB connection
    
    const conn = await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 5000, // 5 second timeout
      connectTimeoutMS: 5000,
    });
    
    isConnected = true;
    // MongoDB connected successfully
    
    // Connection event handlers
    mongoose.connection.on('error', (err) => {
      // MongoDB error handled silently
      isConnected = false;
    });

    mongoose.connection.on('disconnected', () => {
      // MongoDB disconnected
      isConnected = false;
    });

    mongoose.connection.on('reconnected', () => {
      // MongoDB reconnected
      isConnected = true;
    });

    return conn;
  } catch (error) {
    // MongoDB unavailable - server will continue in fallback mode
    isConnected = false;
    return null;
  }
};

const disconnectDB = async () => {
  try {
    if (isConnected) {
      await mongoose.connection.close();
      // MongoDB disconnected gracefully
    }
  } catch (error) {
    // Error during MongoDB disconnection - handled silently
  }
};

const getConnectionStatus = () => {
  return {
    isConnected,
    readyState: mongoose.connection.readyState,
    status: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected'
  };
};

module.exports = {
  connectDB,
  disconnectDB,
  getConnectionStatus
};
