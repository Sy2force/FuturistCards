require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const Card = require('../models/Card');

const seedData = async () => {
  try {
    console.log('🌱 Démarrage du seed de la base de données...');
    
    // Connexion à MongoDB
    await mongoose.connect(process.env.MONGO_URI);
    console.log('✅ Connexion MongoDB établie');

    // Supprimer les données existantes
    await User.deleteMany({});
    await Card.deleteMany({});
    console.log('🗑️ Données existantes supprimées');

    // Créer des utilisateurs de test
    const hashedPassword = await bcrypt.hash('TestPass123!', 12);
    
    const users = await User.create([
      {
        name: 'Utilisateur Test',
        email: 'testnormal@example.com',
        password: hashedPassword,
        role: 'user'
      },
      {
        name: 'Business Test',
        email: 'testpro@example.com',
        password: hashedPassword,
        role: 'business'
      },
      {
        name: 'Admin Test',
        email: 'admin@example.com',
        password: hashedPassword,
        role: 'admin'
      },
      {
        name: 'Shaï Acoca',
        email: 'shay@futuristcards.com',
        password: hashedPassword,
        role: 'business'
      }
    ]);

    console.log('👥 Utilisateurs créés:', users.length);

    // Créer des cartes de démonstration
    const businessUser = users.find(u => u.email === 'testpro@example.com');
    const devUser = users.find(u => u.email === 'shay@futuristcards.com');
    
    const cards = await Card.create([
      {
        title: 'Business Test',
        subtitle: 'Entrepreneur Digital',
        company: 'TechCorp',
        email: 'testpro@example.com',
        phone: '+33 1 23 45 67 89',
        website: 'https://techcorp.example.com',
        description: 'Expert en transformation digitale et innovation technologique.',
        userId: businessUser._id,
        isPublic: true,
        tags: ['tech', 'business', 'innovation']
      },
      {
        title: 'Shaï Acoca',
        subtitle: 'Développeur Full-Stack & CTO',
        company: 'FuturistCards',
        email: 'shay@futuristcards.com',
        phone: '+33 6 12 34 56 78',
        website: 'https://shayacoca.dev',
        description: 'Passionné par les technologies modernes, spécialisé en React, Node.js et architecture cloud.',
        userId: devUser._id,
        isPublic: true,
        tags: ['react', 'nodejs', 'fullstack', 'cto']
      },
      {
        title: 'Marie Dupont',
        subtitle: 'Designer UX/UI',
        company: 'Creative Studio',
        email: 'marie@creative.com',
        phone: '+33 1 98 76 54 32',
        website: 'https://mariedupont.design',
        description: 'Créatrice d\'expériences utilisateur exceptionnelles.',
        userId: businessUser._id,
        isPublic: true,
        tags: ['design', 'ux', 'ui', 'creative']
      },
      {
        title: 'Jean Martin',
        subtitle: 'Expert Marketing Digital',
        company: 'Growth Agency',
        email: 'jean@growth.com',
        phone: '+33 2 11 22 33 44',
        website: 'https://growth-agency.com',
        description: 'Spécialiste en croissance et acquisition digitale.',
        userId: businessUser._id,
        isPublic: true,
        tags: ['marketing', 'growth', 'digital']
      },
      {
        title: 'Sophie Laurent',
        subtitle: 'Consultante Data Science',
        company: 'Data Insights',
        email: 'sophie@datainsights.com',
        phone: '+33 3 55 44 33 22',
        website: 'https://datainsights.com',
        description: 'Transformation des données en insights stratégiques.',
        userId: businessUser._id,
        isPublic: true,
        tags: ['data', 'ai', 'analytics', 'consulting']
      }
    ]);

    console.log('💳 Cartes créées:', cards.length);
    console.log('✨ Seed terminé avec succès!');
    
    console.log('\n📊 Résumé:');
    console.log(`- ${users.length} utilisateurs créés`);
    console.log(`- ${cards.length} cartes créées`);
    console.log('\n🔐 Comptes de test:');
    console.log('- User: testnormal@example.com / TestPass123!');
    console.log('- Business: testpro@example.com / TestPass123!');
    console.log('- Admin: admin@example.com / TestPass123!');
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Erreur during seed:', error);
    process.exit(1);
  }
};

seedData();
