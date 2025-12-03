import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

// Forcer la connexion avec différentes approches
const forceConnect = async () => {
  console.log('🚀 FORCE CONNEXION MONGODB');
  console.log('==========================');
  
  const uris = [
    // URI actuelle
    process.env.MONGO_URI,
    // URI avec options supplémentaires
    process.env.MONGO_URI + '?retryWrites=true&w=majority',
    // URI avec authSource
    process.env.MONGO_URI + '?authSource=admin',
    // URI avec SSL désactivé pour test
    process.env.MONGO_URI + '?ssl=false',
    // URI avec timeout plus long
    process.env.MONGO_URI + '?serverSelectionTimeoutMS=30000'
  ];
  
  for (let i = 0; i < uris.length; i++) {
    const uri = uris[i];
    console.log(`\n🔍 Test ${i + 1}: ${uri.replace(/:[^@]*@/, ':****@')}`);
    
    try {
      // Fermer toute connexion existante
      if (mongoose.connection.readyState !== 0) {
        await mongoose.disconnect();
      }
      
      const conn = await mongoose.connect(uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        serverSelectionTimeoutMS: 15000,
        connectTimeoutMS: 15000,
        socketTimeoutMS: 15000,
        maxPoolSize: 5,
        retryWrites: true,
        authSource: 'admin'
      });
      
      console.log('✅ CONNEXION FORCÉE RÉUSSIE!');
      console.log(`Host: ${conn.connection.host}`);
      console.log(`Database: ${conn.connection.name}`);
      console.log(`ReadyState: ${conn.connection.readyState}`);
      
      // Test d'opérations
      console.log('\n📊 Test des opérations:');
      
      // Ping
      const pingResult = await mongoose.connection.db.admin().ping();
      console.log('✅ Ping:', pingResult);
      
      // Lister les collections
      const collections = await mongoose.connection.db.listCollections().toArray();
      console.log(`✅ Collections trouvées: ${collections.length}`);
      collections.forEach(col => console.log(`  - ${col.name}`));
      
      // Test d'écriture simple
      try {
        const testCollection = mongoose.connection.db.collection('test');
        const insertResult = await testCollection.insertOne({ 
          test: true, 
          timestamp: new Date(),
          message: 'Test de connexion forcée'
        });
        console.log('✅ Test d\'écriture réussi:', insertResult.insertedId);
        
        // Nettoyer le test
        await testCollection.deleteOne({ _id: insertResult.insertedId });
        console.log('✅ Nettoyage effectué');
        
      } catch (writeError) {
        console.log('⚠️ Écriture échouée (lecture seule?):', writeError.message);
      }
      
      console.log('\n🎉 MONGODB CONNECTÉ ET FONCTIONNEL!');
      console.log('URI de travail:', uri.replace(/:[^@]*@/, ':****@'));
      
      return uri;
      
    } catch (error) {
      console.log('❌ Échec:', error.message);
      
      if (error.message.includes('bad auth')) {
        console.log('  → Problème d\'authentification');
      } else if (error.message.includes('ENOTFOUND')) {
        console.log('  → Problème de résolution DNS');
      } else if (error.message.includes('timeout')) {
        console.log('  → Timeout de connexion');
      }
    }
  }
  
  console.log('\n❌ Aucune connexion forcée n\'a fonctionné');
  return null;
};

// Test avec différentes configurations mongoose
const testConfigurations = async () => {
  console.log('\n🔧 TEST CONFIGURATIONS MONGOOSE');
  console.log('================================');
  
  const configs = [
    {
      name: 'Configuration standard',
      options: {
        useNewUrlParser: true,
        useUnifiedTopology: true
      }
    },
    {
      name: 'Configuration avec auth explicite',
      options: {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        authSource: 'admin',
        authMechanism: 'SCRAM-SHA-1'
      }
    },
    {
      name: 'Configuration avec timeouts étendus',
      options: {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        serverSelectionTimeoutMS: 30000,
        connectTimeoutMS: 30000,
        socketTimeoutMS: 30000
      }
    }
  ];
  
  for (const config of configs) {
    console.log(`\n🔍 ${config.name}`);
    try {
      if (mongoose.connection.readyState !== 0) {
        await mongoose.disconnect();
      }
      
      const conn = await mongoose.connect(process.env.MONGO_URI, config.options);
      console.log('✅ Succès avec cette configuration!');
      return config;
    } catch (error) {
      console.log('❌ Échec:', error.message);
    }
  }
  
  return null;
};

// Exécuter les tests
(async () => {
  try {
    const workingUri = await forceConnect();
    if (!workingUri) {
      await testConfigurations();
    }
  } catch (error) {
    console.error('Erreur générale:', error);
  } finally {
    if (mongoose.connection.readyState !== 0) {
      await mongoose.disconnect();
    }
    process.exit(0);
  }
})();
