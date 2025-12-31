require('dotenv').config();
const mongoose = require('mongoose');

async function testMongoConnection() {
  const mongoURI = process.env.MONGODB_URI || process.env.MONGO_URI;
  
  if (!mongoURI) {
    console.log('❌ No MongoDB URI found in environment variables');
    console.log('💡 Add MONGODB_URI to your .env file');
    return;
  }

  console.log('🔄 Testing MongoDB connection...');
  console.log('📍 URI format check:', mongoURI.startsWith('mongodb+srv://') ? '✅ Atlas URI' : '⚠️  Local URI');

  try {
    const mongoOptions = {
      serverSelectionTimeoutMS: 10000,
      socketTimeoutMS: 45000,
      family: 4,
      retryWrites: true,
      w: 'majority'
    };

    await mongoose.connect(mongoURI, mongoOptions);
    console.log('✅ MongoDB connection successful!');
    
    // Test database operations
    console.log('🧪 Testing database operations...');
    const testCollection = mongoose.connection.db.collection('test');
    await testCollection.insertOne({ test: true, timestamp: new Date() });
    console.log('✅ Write operation successful');
    
    // Clean up test
    await testCollection.deleteOne({ test: true });
    console.log('✅ Delete operation successful');
    
    await mongoose.disconnect();
    console.log('🎉 MongoDB test completed successfully!');
    
  } catch (error) {
    console.log('❌ MongoDB Connection Error:', error.message);
    
    if (error.code === 8000) {
      console.log('💡 Solution: Check MongoDB Atlas credentials (username/password)');
    }
    
    if (error.message.includes('IP') || error.message.includes('not authorized')) {
      console.log('💡 Solution: Add 0.0.0.0/0 to Network Access in MongoDB Atlas');
    }
    
    if (error.message.includes('ENOTFOUND') || error.message.includes('timeout')) {
      console.log('💡 Solution: Check internet connection and MongoDB Atlas URI format');
      console.log('📋 Expected format: mongodb+srv://username:password@cluster.mongodb.net/database');
    }
    
    if (error.message.includes('querySrv')) {
      console.log('💡 Solution: Verify cluster name and region in MongoDB Atlas');
    }
    
    process.exit(1);
  }
}

if (require.main === module) {
  testMongoConnection();
}
