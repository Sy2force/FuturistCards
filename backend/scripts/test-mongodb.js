require('dotenv').config();
const mongoose = require('mongoose');

async function testMongoConnection() {
  if (!process.env.MONGO_URI) {
    return;
  }

  try {
    const mongoOptions = {
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
      family: 4,
      retryWrites: true,
      w: 'majority'
    };

    await mongoose.connect(process.env.MONGO_URI, mongoOptions);
    
    // Test d'écriture simple
    const testCollection = mongoose.connection.db.collection('test');
    await testCollection.insertOne({ test: true, timestamp: new Date() });
    
    // Nettoyer le test
    await testCollection.deleteOne({ test: true });
    
    await mongoose.disconnect();
    
  } catch (error) {
    // Erreur de connexion MongoDB
    if (error.code === 8000) {
      // Vérifiez les identifiants MongoDB Atlas
    }
    
    if (error.message.includes('IP')) {
      // Ajouter 0.0.0.0/0 dans Network Access sur MongoDB Atlas
    }
    
    if (error.message.includes('ENOTFOUND') || error.message.includes('timeout')) {
      // Vérifiez la connection internet et l'URI MongoDB Atlas
    }
    
    process.exit(1);
  }
}

if (require.main === module) {
  testMongoConnection();
}
