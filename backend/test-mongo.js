import mongoose from 'mongoose';

async function testConnection(uri, name) {
  console.log(`\n🔍 ${name}`);
  console.log(`URI: ${uri.replace(/:[^@]*@/, ':****@')}`);
  
  try {
    const conn = await mongoose.connect(uri, { 
      useNewUrlParser: true, 
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 8000,
      connectTimeoutMS: 8000
    });
    
    console.log('✅ SUCCESS - MongoDB Connected!');
    console.log(`Database: ${conn.connection.name}`);
    console.log(`Host: ${conn.connection.host}`);
    
    // Test ping
    const admin = conn.connection.db.admin();
    const result = await admin.ping();
    console.log('✅ Ping successful:', result);
    
    await mongoose.disconnect();
    return uri;
  } catch (error) {
    console.log(`❌ FAILED: ${error.message}`);
    if (error.message.includes('bad auth')) {
      console.log('   → Authentication failed - check username/password');
    }
    return null;
  }
}

async function runTests() {
  console.log('🚀 Testing MongoDB Atlas connections...');
  
  const testUris = [
    'mongodb+srv://S-User:Sy2force@cluster0.lhvxveo.mongodb.net/cardpro',
    'mongodb+srv://cardpro-user:cardpro2024@cluster0.lhvxveo.mongodb.net/cardpro',
    'mongodb+srv://admin:admin123@cluster0.lhvxveo.mongodb.net/cardpro'
  ];
  
  let workingUri = null;
  
  for (let i = 0; i < testUris.length; i++) {
    workingUri = await testConnection(testUris[i], `Test ${i+1}`);
    if (workingUri) {
      console.log('\n🎉 WORKING CONNECTION FOUND!');
      console.log('Copy this URI to your .env file:');
      console.log(`MONGO_URI=${workingUri}`);
      break;
    }
    await new Promise(resolve => setTimeout(resolve, 1000));
  }
  
  if (!workingUri) {
    console.log('\n❌ No working connections found.');
    console.log('\n📋 Next steps:');
    console.log('1. Go to https://cloud.mongodb.com');
    console.log('2. Database Access → Reset password for existing user');
    console.log('3. Or create new user with Read/Write permissions');
    console.log('4. Network Access → Allow 0.0.0.0/0 (anywhere)');
    console.log('5. Update MONGO_URI in backend/.env');
  }
}

runTests().catch(console.error);
