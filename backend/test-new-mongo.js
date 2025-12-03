import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const testNewMongoDB = async () => {
  console.log('🧪 TEST NOUVELLE CONFIGURATION MONGODB');
  console.log('=====================================');
  
  if (!process.env.MONGO_URI) {
    console.log('❌ MONGO_URI non définie');
    return;
  }
  
  console.log('URI:', process.env.MONGO_URI.replace(/:[^@]*@/, ':****@'));
  
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 10000
    });
    
    console.log('✅ CONNEXION RÉUSSIE!');
    console.log('Host:', conn.connection.host);
    console.log('Database:', conn.connection.name);
    
    // Test ping
    const pingResult = await mongoose.connection.db.admin().ping();
    console.log('✅ Ping:', pingResult);
    
    // Test collections
    const collections = await mongoose.connection.db.listCollections().toArray();
    console.log(`✅ Collections: ${collections.length}`);
    
    // Test écriture
    const testDoc = await mongoose.connection.db.collection('test').insertOne({
      message: 'Test nouvelle configuration',
      timestamp: new Date()
    });
    console.log('✅ Test écriture:', testDoc.insertedId);
    
    // Nettoyage
    await mongoose.connection.db.collection('test').deleteOne({ _id: testDoc.insertedId });
    console.log('✅ Nettoyage effectué');
    
    await mongoose.disconnect();
    console.log('🎉 MONGODB PARFAITEMENT CONFIGURÉ!');
    
  } catch (error) {
    console.log('❌ ERREUR:', error.message);
  }
};

testNewMongoDB();
