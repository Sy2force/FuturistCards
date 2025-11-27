import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    // Use local MongoDB if no MONGO_URI provided
    const mongoURI = process.env.MONGO_URI || 'mongodb://localhost:27017/fCardPro';
    
    console.log('🔌 Tentative de connexion à MongoDB...');
    console.log(`📍 URI: ${mongoURI.replace(/\/\/([^:]+):([^@]+)@/, '//$1:****@')}`); // Hide password in logs
    
    const conn = await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 5000, // Timeout after 5s instead of 30s
    });

    console.log('✅ MongoDB connecté avec succès !');
    console.log(`✅ Host: ${conn.connection.host}`);
    console.log(`✅ Database: ${conn.connection.name}`);
    console.log(`✅ État: ${conn.connection.readyState === 1 ? 'Connecté' : 'Déconnecté'}`);
    return true;
  } catch (error) {
    console.log('❌ ERREUR DE CONNEXION MONGODB ❌');
    console.error(`❌ Message: ${error.message}`);
    console.error(`❌ Code: ${error.code || 'N/A'}`);
    
    if (error.message.includes('ECONNREFUSED')) {
      console.log('💡 Solution: Vérifiez que MongoDB est démarré localement ou utilisez MongoDB Atlas');
    }
    if (error.message.includes('authentication')) {
      console.log('💡 Solution: Vérifiez vos identifiants MongoDB Atlas');
    }
    if (error.message.includes('Invalid scheme')) {
      console.log('💡 Solution: Vérifiez le format de votre MONGO_URI');
    }
    
    console.log('⚠️  Fonctionnement en mode mock sans base de données');
    return false;
  }
};

export default connectDB;
