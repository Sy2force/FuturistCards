import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    // Use local MongoDB if no MONGO_URI provided
    const mongoURI = process.env.MONGO_URI || 'mongodb://localhost:27017/fCardPro';
    
    console.log('🔌 Tentative de connexion à MongoDB:', mongoURI);
    
    const conn = await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 5000, // Timeout after 5s instead of 30s
    });

    console.log('✅ MongoDB connecté avec succès:', conn.connection.host);
    return true;
  } catch (error) {
    console.error('❌ Erreur de connexion MongoDB:', error.message);
    console.log('⚠️ Fonctionnement en mode mock sans base de données');
    return false;
  }
};

export default connectDB;
