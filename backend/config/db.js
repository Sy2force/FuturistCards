const mongoose = require('mongoose');

let isConnected = false;

const connectDB = async () => {
  try {
    // Try MongoDB Atlas first, then local fallback
    const mongoURI = process.env.MONGODB_URI || process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/futuristcards';
    
    // Connecting to MongoDB...
    
    const conn = await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 10000, // 10 second timeout
      connectTimeoutMS: 10000,
      maxPoolSize: 10,
      bufferCommands: false,
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
