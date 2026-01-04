const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const mongoURI = process.env.MONGODB_URI || process.env.MONGO_URI;
    
    if (!mongoURI) {
      return null;
    }

    // Set connection timeout to 5 seconds
    const conn = await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      connectTimeoutMS: 5000,
    });

    // Connection event handlers
    mongoose.connection.on('error', (err) => {
      // MongoDB connection error handled silently
    });

    mongoose.connection.on('disconnected', () => {
      // MongoDB disconnected - handled silently
    });

    mongoose.connection.on('reconnected', () => {
      // MongoDB reconnected - handled silently
    });

    return conn;
  } catch (error) {
    return null;
  }
};

const disconnectDB = async () => {
  try {
    await mongoose.connection.close();
  } catch (error) {
  }
};

module.exports = {
  connectDB,
  disconnectDB
};
