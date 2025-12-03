#!/usr/bin/env node

import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Load environment variables
dotenv.config({ path: join(__dirname, '.env') });

console.log('\n🔧 === TEST CONNEXION MONGODB ATLAS ===\n');

// Get MongoDB URI from environment
const MONGO_URI = process.env.MONGO_URI || process.argv[2];

if (!MONGO_URI) {
  console.error('❌ ERREUR: MONGO_URI non défini');
  console.log('\nUtilisation:');
  console.log('  node test-mongodb.js');
  console.log('  ou');
  console.log('  node test-mongodb.js "mongodb+srv://user:pass@cluster.mongodb.net/database"');
  process.exit(1);
}

console.log(`📍 Test de connexion à: ${MONGO_URI.replace(/\/\/([^:]+):([^@]+)@/, '//$1:****@')}`);
console.log('⏳ Connexion en cours...\n');

async function testConnection() {
  try {
    // Connect to MongoDB
    const conn = await mongoose.connect(MONGO_URI, {
      serverSelectionTimeoutMS: 10000,
      socketTimeoutMS: 45000,
    });

    console.log('✅ CONNEXION RÉUSSIE!');
    console.log(`📊 Cluster: ${conn.connection.host}`);
    console.log(`🗄️ Database: ${conn.connection.name}`);
    console.log(`🔗 ReadyState: ${conn.connection.readyState}`);
    
    // Test ping
    console.log('\n🏓 Test PING...');
    await conn.connection.db.admin().ping();
    console.log('✅ Ping réussi!');
    
    // List collections
    console.log('\n📋 Collections disponibles:');
    const collections = await conn.connection.db.listCollections().toArray();
    if (collections.length > 0) {
      collections.forEach(col => {
        console.log(`   - ${col.name}`);
      });
    } else {
      console.log('   (aucune collection trouvée)');
    }
    
    // Test write permission
    console.log('\n✍️ Test d\'écriture...');
    const TestModel = mongoose.model('TestConnection', new mongoose.Schema({
      message: String,
      timestamp: Date
    }));
    
    const testDoc = await TestModel.create({
      message: 'Test de connexion Render',
      timestamp: new Date()
    });
    console.log('✅ Document créé:', testDoc._id);
    
    // Clean up test document
    await TestModel.deleteOne({ _id: testDoc._id });
    console.log('🧹 Document de test supprimé');
    
    console.log('\n🎉 TOUS LES TESTS RÉUSSIS!');
    console.log('\n📌 Configuration recommandée pour Render:');
    console.log('   MONGO_URI=' + MONGO_URI);
    console.log('   NODE_ENV=production');
    console.log('   PORT=10000');
    
  } catch (error) {
    console.error('\n❌ ÉCHEC DE CONNEXION\n');
    console.error('Message:', error.message);
    
    // Diagnostic détaillé
    if (error.message.includes('authentication failed') || error.message.includes('bad auth')) {
      console.log('\n💡 Problème d\'authentification détecté:');
      console.log('   1. Vérifiez le nom d\'utilisateur et le mot de passe');
      console.log('   2. Sur MongoDB Atlas: Security → Database Access');
      console.log('   3. Réinitialisez le mot de passe si nécessaire');
      console.log('   4. Assurez-vous que l\'utilisateur a les permissions "readWrite"');
    } else if (error.message.includes('ECONNREFUSED') || error.message.includes('ETIMEDOUT')) {
      console.log('\n💡 Problème de connexion réseau:');
      console.log('   1. Vérifiez votre connexion internet');
      console.log('   2. Sur MongoDB Atlas: Network Access');
      console.log('   3. Ajoutez 0.0.0.0/0 pour autoriser toutes les IPs');
      console.log('   4. Vérifiez que le cluster est actif (pas en pause)');
    } else if (error.message.includes('ENOTFOUND')) {
      console.log('\n💡 Cluster introuvable:');
      console.log('   1. Vérifiez l\'URL du cluster');
      console.log('   2. Format attendu: cluster0.xxxxx.mongodb.net');
    }
  } finally {
    // Disconnect
    await mongoose.disconnect();
    console.log('\n🔌 Déconnexion effectuée');
    process.exit(0);
  }
}

// Run the test
testConnection();
