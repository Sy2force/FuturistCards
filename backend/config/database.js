const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const mongoURI = process.env.MONGO_URI;
    
    if (!mongoURI) {
      throw new Error('MONGO_URI environment variable is not defined');
    }

    const conn = await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    // MongoDB Connected successfully
    
    // Connection event handlers
    mongoose.connection.on('error', (err) => {
      // MongoDB connection error - handle gracefully
    });

    mongoose.connection.on('disconnected', () => {
      // MongoDB disconnected
    });

    mongoose.connection.on('reconnected', () => {
      // MongoDB reconnected
    });

    return conn;
  } catch (error) {
    // MongoDB connection failed
    throw error;
  }
};

const disconnectDB = async () => {
  try {
    await mongoose.connection.close();
    // MongoDB connection closed
  } catch (error) {
    // Error closing MongoDB connection
  }
};

module.exports = {
  connectDB,
  disconnectDB
};
