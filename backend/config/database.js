const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const mongoURI = process.env.MONGODB_URI || process.env.MONGO_URI;
    
    if (!mongoURI) {
      throw new Error('MONGODB_URI environment variable is not defined');
    }

    const conn = await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    
    // Connection event handlers
    mongoose.connection.on('error', (err) => {
    });

    mongoose.connection.on('disconnected', () => {
    });

    mongoose.connection.on('reconnected', () => {
    });

    return conn;
  } catch (error) {
    throw error;
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
