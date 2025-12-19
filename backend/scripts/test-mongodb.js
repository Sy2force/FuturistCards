require('dotenv').config();
const mongoose = require('mongoose');

async function testMongoConnection() {
  console.log('🧪 Test de connexion MongoDB...');
  console.log('📍 MONGO_URI présent:', !!process.env.MONGO_URI);
  
  if (!process.env.MONGO_URI) {
    console.log('❌ MONGO_URI non configuré');
    return;
  }

  // Masquer le mot de passe pour les logs
  const maskedURI = process.env.MONGO_URI.replace(/:([^:@]+)@/, ':****@');
  console.log('🔗 URI (masqué):', maskedURI);

  try {
    const mongoOptions = {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 10000, // 10 secondes
      socketTimeoutMS: 45000,
      family: 4, // IPv4 seulement
      maxPoolSize: 10,
      retryWrites: true,
      w: 'majority'
    };

    console.log('⚡ Tentative de connexion...');
    await mongoose.connect(process.env.MONGO_URI, mongoOptions);
    
    console.log('✅ Connexion MongoDB réussie!');
    console.log('🔗 Database:', mongoose.connection.name);
    console.log('🌐 Host:', mongoose.connection.host);
    console.log('📊 État:', mongoose.connection.readyState);
    
    // Test d'écriture simple
    const testCollection = mongoose.connection.db.collection('test');
    await testCollection.insertOne({ test: true, timestamp: new Date() });
    console.log('✅ Test d\'écriture réussi');
    
    // Nettoyer le test
    await testCollection.deleteOne({ test: true });
    console.log('✅ Test de suppression réussi');
    
    await mongoose.disconnect();
    console.log('✅ Déconnexion propre');
    
  } catch (error) {
    console.log('❌ Erreur de connexion MongoDB:');
    console.log('📝 Message:', error.message);
    console.log('🔍 Code:', error.code);
    
    if (error.message.includes('bad auth')) {
      console.log('🚨 PROBLÈME D\'AUTHENTIFICATION:');
      console.log('   - Vérifiez le nom d\'utilisateur et mot de passe');
      console.log('   - Vérifiez que l\'utilisateur a les droits sur la DB');
      console.log('   - Vérifiez l\'IP whitelist sur MongoDB Atlas');
    }
    
    if (error.message.includes('ENOTFOUND') || error.message.includes('timeout')) {
      console.log('🚨 PROBLÈME DE RÉSEAU:');
      console.log('   - Vérifiez la connection internet');
      console.log('   - Vérifiez l\'URI MongoDB Atlas');
    }
    
    process.exit(1);
  }
}

testMongoConnection();
