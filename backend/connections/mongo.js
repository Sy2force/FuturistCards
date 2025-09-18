const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    console.log('🔄 Attempting MongoDB Atlas connection...');
    const conn = await mongoose.connect(process.env.MONGODB_URI);
    console.log(`✅ MongoDB Atlas Connected: ${conn.connection.host}`);
    return conn;
  } catch (error) {
    console.error('❌ MongoDB Atlas Connection Error:', error.message);
    
    // Try local MongoDB as fallback
    try {
      console.log('🔄 Attempting local MongoDB fallback...');
      const localConn = await mongoose.connect('mongodb://localhost:27017/futuristcards');
      console.log(`✅ Local MongoDB Connected: ${localConn.connection.host}`);
      return localConn;
    } catch (localError) {
      console.error('❌ Local MongoDB also failed:', localError.message);
      console.log('📝 Using mock data for development...');
      return null;
    }
  }
};

module.exports = connectDB;
