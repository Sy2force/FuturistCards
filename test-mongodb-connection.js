const mongoose = require('mongoose');

// Test différentes chaînes de connexion MongoDB
const testConnections = [
  {
    name: "Identifiants actuels",
    uri: "mongodb+srv://S-User:Sy2force@cluster0.lhvxveo.mongodb.net/cardpro"
  },
  {
    name: "Tentative avec mot de passe encodé",
    uri: "mongodb+srv://S-User:Sy2force@cluster0.lhvxveo.mongodb.net/cardpro?retryWrites=true&w=majority"
  },
  {
    name: "Test avec utilisateur différent",
    uri: "mongodb+srv://cardpro-user:cardpro2024@cluster0.lhvxveo.mongodb.net/cardpro"
  }
];

async function testConnection(config) {
  console.log(`\n🔍 Test: ${config.name}`);
  console.log(`URI: ${config.uri.replace(/:[^@]*@/, ':****@')}`);
  
  try {
    const conn = await mongoose.connect(config.uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 5000
    });
    
    console.log('✅ Connexion réussie !');
    console.log(`Database: ${conn.connection.name}`);
    console.log(`Host: ${conn.connection.host}`);
    
    // Test simple query
    const collections = await conn.connection.db.listCollections().toArray();
    console.log(`Collections: ${collections.length}`);
    
    await mongoose.disconnect();
    return true;
  } catch (error) {
    console.log('❌ Échec de connexion');
    console.log(`Erreur: ${error.message}`);
    return false;
  }
}

async function runTests() {
  console.log('🚀 Test de connexion MongoDB Atlas\n');
  
  for (const config of testConnections) {
    const success = await testConnection(config);
    if (success) {
      console.log('\n🎉 Connexion trouvée ! Utilisez cette URI dans votre .env');
      break;
    }
    
    // Attendre un peu entre les tests
    await new Promise(resolve => setTimeout(resolve, 1000));
  }
  
  console.log('\n📋 Instructions:');
  console.log('1. Si aucune connexion ne fonctionne, vérifiez MongoDB Atlas');
  console.log('2. Database Access → Reset password pour S-User');
  console.log('3. Network Access → Autoriser 0.0.0.0/0');
  console.log('4. Copier la nouvelle URI dans backend/.env');
}

runTests().catch(console.error);
