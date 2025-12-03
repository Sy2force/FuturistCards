import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    // Validation de MONGO_URI
    const mongoURI = process.env.MONGO_URI;
    
    if (!mongoURI) {
      console.error('❌ MONGO_URI n\'est pas défini');
      console.log('⚠️ Fonctionnement en mode MOCK (sans base de données)');
      return false;
    }
    
    console.log('\n🔌 === Connexion MongoDB Atlas ===');
    console.log(`📍 URI: ${mongoURI.replace(/\/\/([^:]+):([^@]+)@/, '//$1:****@')}`);
    
    // Options de connexion optimisées pour MongoDB Atlas
    const conn = await mongoose.connect(mongoURI, {
      serverSelectionTimeoutMS: 15000, // 15 secondes pour Atlas
      socketTimeoutMS: 45000,
      maxPoolSize: 10,
      minPoolSize: 2,
      retryWrites: true,
      w: 'majority'
    });

    console.log('✅ MongoDB Atlas connecté avec succès!');
    console.log(`📊 Cluster: ${conn.connection.host}`);
    console.log(`🗄️ Database: ${conn.connection.name || 'cardpro'}`);
    console.log(`🔗 État: Connecté (readyState: ${conn.connection.readyState})`);
    console.log('===================================\n');
    
    // Event listeners pour monitoring
    mongoose.connection.on('error', (err) => {
      console.error('❌ MongoDB erreur de connexion:', err.message);
    });
    
    mongoose.connection.on('disconnected', () => {
      console.log('⚠️ MongoDB déconnecté - Tentative de reconnexion...');
    });
    
    mongoose.connection.on('reconnected', () => {
      console.log('✅ MongoDB reconnecté avec succès');
    });
    
    // Monitoring de la connexion
    mongoose.connection.on('connected', () => {
      console.log('🔗 MongoDB: Connexion établie');
    });
    
    return true;
  } catch (error) {
    console.log('\n❌ === ERREUR CONNEXION MONGODB ===');
    console.error(`📍 Message: ${error.message}`);
    console.error(`📍 Code: ${error.code || 'N/A'}`);
    
    // Diagnostic détaillé selon le type d'erreur
    if (error.message.includes('ECONNREFUSED')) {
      console.log('\n💡 Diagnostic: MongoDB local non disponible');
      console.log('   → Vérifiez que MongoDB est démarré');
      console.log('   → Ou utilisez MongoDB Atlas');
    }
    else if (error.message.includes('authentication failed') || error.message.includes('bad auth')) {
      console.log('\n💡 Diagnostic: Échec d\'authentification MongoDB Atlas');
      console.log('   → Vérifiez le nom d\'utilisateur: S-User');
      console.log('   → Vérifiez le mot de passe: Sy2force');
      console.log('   → Réinitialisez le mot de passe sur MongoDB Atlas si nécessaire');
    }
    else if (error.message.includes('Invalid scheme') || error.message.includes('Invalid connection string')) {
      console.log('\n💡 Diagnostic: Format MONGO_URI invalide');
      console.log('   → Format attendu: mongodb+srv://user:pass@cluster.mongodb.net/database');
    }
    else if (error.message.includes('serverSelectionTimeoutMS') || error.message.includes('ETIMEDOUT')) {
      console.log('\n💡 Diagnostic: Impossible de joindre MongoDB Atlas');
      console.log('   → Vérifiez votre connexion internet');
      console.log('   → Vérifiez les IP autorisées sur Atlas (0.0.0.0/0 pour tout autoriser)');
      console.log('   → Vérifiez que le cluster est actif sur MongoDB Atlas');
    }
    else if (error.message.includes('ENOTFOUND')) {
      console.log('\n💡 Diagnostic: Nom du cluster MongoDB Atlas introuvable');
      console.log('   → Vérifiez l\'URL du cluster dans MongoDB Atlas');
      console.log('   → Format: cluster0.xxxxx.mongodb.net');
    }
    
    console.log('\n⚠️ Le serveur va fonctionner en MODE MOCK');
    console.log('   → Les données seront simulées');
    console.log('   → Aucune persistance des données');
    console.log('===================================\n');
    
    return false;
  }
};

export default connectDB;
