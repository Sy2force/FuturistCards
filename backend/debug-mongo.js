import dotenv from 'dotenv';
import mongoose from 'mongoose';

// Charger les variables d'environnement
dotenv.config();

console.log('🔍 DIAGNOSTIC MONGODB CONNEXION');
console.log('================================');

// 1. Vérifier les variables d'environnement
console.log('\n📋 VARIABLES D\'ENVIRONNEMENT:');
console.log('MONGO_URI:', process.env.MONGO_URI ? process.env.MONGO_URI.replace(/:[^@]*@/, ':****@') : 'NON DÉFINIE');
console.log('NODE_ENV:', process.env.NODE_ENV || 'NON DÉFINIE');
console.log('PORT:', process.env.PORT || 'NON DÉFINIE');

if (!process.env.MONGO_URI) {
  console.log('❌ PROBLÈME: MONGO_URI non définie dans .env');
  process.exit(1);
}

// 2. Analyser l'URI MongoDB
console.log('\n🔗 ANALYSE URI MONGODB:');
try {
  const url = new URL(process.env.MONGO_URI);
  console.log('✅ URI syntaxiquement valide');
  console.log('  Protocol:', url.protocol);
  console.log('  Host:', url.hostname);
  console.log('  Database:', url.pathname.substring(1));
  console.log('  Username:', url.username);
  console.log('  Password:', url.password ? '****' : 'NON DÉFINI');
  
  if (!url.username || !url.password) {
    console.log('❌ PROBLÈME: Identifiants manquants dans l\'URI');
  }
} catch (error) {
  console.log('❌ URI INVALIDE:', error.message);
  process.exit(1);
}

// 3. Test de connexion détaillé
console.log('\n🔌 TEST DE CONNEXION:');
async function testConnection() {
  try {
    console.log('Tentative de connexion...');
    
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 10000,
      connectTimeoutMS: 10000
    });
    
    console.log('✅ CONNEXION RÉUSSIE!');
    console.log('Host:', conn.connection.host);
    console.log('Database:', conn.connection.name);
    console.log('ReadyState:', conn.connection.readyState);
    
    // Test ping
    const admin = conn.connection.db.admin();
    const pingResult = await admin.ping();
    console.log('✅ Ping réussi:', pingResult);
    
    await mongoose.disconnect();
    console.log('✅ Déconnexion propre');
    
  } catch (error) {
    console.log('❌ ÉCHEC DE CONNEXION');
    console.log('Message:', error.message);
    console.log('Code:', error.code || 'N/A');
    console.log('Name:', error.name || 'N/A');
    
    // Diagnostic détaillé selon le type d'erreur
    if (error.message.includes('bad auth')) {
      console.log('\n💡 DIAGNOSTIC: Erreur d\'authentification');
      console.log('- Vérifiez le nom d\'utilisateur et mot de passe');
      console.log('- Allez sur https://cloud.mongodb.com');
      console.log('- Database Access → Vérifiez l\'utilisateur S-User');
      console.log('- Réinitialisez le mot de passe si nécessaire');
    }
    
    if (error.message.includes('ENOTFOUND')) {
      console.log('\n💡 DIAGNOSTIC: Problème DNS/Réseau');
      console.log('- Vérifiez votre connexion internet');
      console.log('- Le cluster MongoDB Atlas est-il actif?');
    }
    
    if (error.message.includes('connection')) {
      console.log('\n💡 DIAGNOSTIC: Problème de connexion');
      console.log('- Network Access → Vérifiez les IP autorisées');
      console.log('- Ajoutez 0.0.0.0/0 pour autoriser toutes les IP');
    }
    
    process.exit(1);
  }
}

testConnection();
