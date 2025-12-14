const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('./models/User');
const Card = require('./models/Card');
require('dotenv').config();

const seedUsers = async () => {
  try {
    // Connexion à MongoDB
    await mongoose.connect(process.env.MONGO_URI);
    console.log('MongoDB connected for seeding...');

    // Supprimer les utilisateurs existants (seulement les comptes test)
    await User.deleteMany({
      email: {
        $in: ['testpro@example.com', 'testnormal@example.com', 'admin@example.com']
      }
    });

    // Supprimer les cartes des utilisateurs test
    await Card.deleteMany({
      userId: { $in: [] } // On supprimera après avoir créé les utilisateurs
    });

    // Hasher les mots de passe
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash('TestPass123!', salt);

    // Créer les utilisateurs de test
    const testUsers = [
      {
        name: 'Utilisateur Business',
        email: 'testpro@example.com',
        password: hashedPassword,
        role: 'business',
        isActive: true
      },
      {
        name: 'Utilisateur Normal',
        email: 'testnormal@example.com', 
        password: hashedPassword,
        role: 'user',
        isActive: true
      },
      {
        name: 'Admin Système',
        email: 'admin@example.com',
        password: hashedPassword,
        role: 'admin',
        isActive: true
      }
    ];

    const createdUsers = await User.insertMany(testUsers);
    console.log('✅ Utilisateurs de test créés:', createdUsers.length);

    // Créer quelques cartes de démonstration pour l'utilisateur business
    const businessUser = createdUsers.find(u => u.role === 'business');
    const demoCards = [
      {
        title: 'Jean Dupont',
        email: 'jean.dupont@exemple.com',
        phone: '+33 6 12 34 56 78',
        company: 'Tech Solutions SARL',
        description: 'Développeur Full Stack spécialisé en React et Node.js',
        website: 'https://jeandupont.dev',
        address: '123 Rue de la Tech, 75001 Paris',
        user: businessUser._id,
        isPublic: true,
        tags: ['développement', 'tech', 'javascript']
      },
      {
        title: 'Marie Martin',
        email: 'marie.martin@marketing.com',
        phone: '+33 6 98 76 54 32',
        company: 'Creative Agency',
        description: 'Spécialiste en marketing digital et stratégie de marque',
        website: 'https://creative-agency.fr',
        address: '456 Avenue du Marketing, 69000 Lyon',
        user: businessUser._id,
        isPublic: true,
        tags: ['marketing', 'créativité', 'stratégie']
      }
    ];

    const createdCards = await Card.insertMany(demoCards);
    console.log('✅ Cartes de démonstration créées:', createdCards.length);

    console.log('\n🎯 COMPTES DE TEST DISPONIBLES:');
    console.log('1. Business: testpro@example.com / TestPass123!');
    console.log('2. Utilisateur: testnormal@example.com / TestPass123!');
    console.log('3. Admin: admin@example.com / TestPass123!');
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Erreur lors du seeding:', error);
    process.exit(1);
  }
};

// Exécuter le seeding si le fichier est appelé directement
if (require.main === module) {
  seedUsers();
}

module.exports = seedUsers;
