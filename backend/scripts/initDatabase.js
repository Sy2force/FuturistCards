require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

// Import models
const User = require('../models/User');
const Card = require('../models/Card');

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb+srv://Futuristecard:Qwerty21@cluster0.lhvxveo.mongodb.net/futuristcards?retryWrites=true&w=majority&appName=Cluster0';

async function initDatabase() {
  try {
    console.log('🔄 Connecting to MongoDB...');
    await mongoose.connect(MONGODB_URI, {
      serverSelectionTimeoutMS: 30000,
      socketTimeoutMS: 45000,
      connectTimeoutMS: 30000,
      maxPoolSize: 10,
      retryWrites: true,
      w: 'majority'
    });
    console.log('✅ MongoDB connected successfully');

    // Clear existing data
    console.log('🧹 Clearing existing data...');
    await User.deleteMany({});
    await Card.deleteMany({});

    // Create test users
    console.log('👥 Creating test users...');
    const users = [
      {
        name: 'Admin User',
        email: 'admin@futuristcards.com',
        password: await bcrypt.hash('AdminPass123!', 12),
        role: 'admin'
      },
      {
        name: 'John Doe',
        email: 'john.doe@example.com',
        password: await bcrypt.hash('Password123!', 12),
        role: 'business'
      },
      {
        name: 'Sarah Cohen',
        email: 'sarah.cohen@example.com',
        password: await bcrypt.hash('Password123!', 12),
        role: 'business'
      },
      {
        name: 'Test User',
        email: 'test@example.com',
        password: await bcrypt.hash('TestPass123!', 12),
        role: 'user'
      }
    ];

    const createdUsers = await User.insertMany(users);
    console.log(`✅ Created ${createdUsers.length} users`);

    // Create sample cards
    console.log('💳 Creating sample cards...');
    const cards = [
      {
        title: 'Développeur Full-Stack',
        description: 'Spécialisé dans le développement d\'applications web modernes avec React, Node.js et MongoDB.',
        phone: '+33 6 12 34 56 78',
        email: 'john.doe@example.com',
        website: 'https://johndoe.dev',
        address: '123 Rue de la Tech, 75001 Paris, France',
        company: 'Tech Solutions',
        user: createdUsers[1]._id,
        likes: []
      },
      {
        title: 'Designer UI/UX',
        description: 'Conception d\'interfaces utilisateur modernes et intuitives pour applications web et mobile.',
        phone: '+33 6 98 76 54 32',
        email: 'sarah.cohen@example.com',
        website: 'https://sarahcohen.design',
        address: '456 Avenue du Design, 69001 Lyon, France',
        company: 'Creative Studio',
        user: createdUsers[2]._id,
        likes: []
      }
    ];

    const createdCards = await Card.insertMany(cards);
    console.log(`✅ Created ${createdCards.length} cards`);

    console.log('\n🎉 Database initialization completed successfully!');
    console.log('\n📊 Summary:');
    console.log(`👥 Users: ${createdUsers.length}`);
    console.log(`💳 Cards: ${createdCards.length}`);
    console.log('\n🔑 Test Accounts:');
    console.log('Admin: admin@futuristcards.com / AdminPass123!');
    console.log('Business: john.doe@example.com / Password123!');
    console.log('Business: sarah.cohen@example.com / Password123!');
    console.log('User: test@example.com / TestPass123!');

  } catch (error) {
    console.error('❌ Database initialization failed:', error);
    process.exit(1);
  } finally {
    await mongoose.disconnect();
    console.log('🔌 MongoDB disconnected');
    process.exit(0);
  }
}

if (require.main === module) {
  initDatabase();
}

module.exports = initDatabase;
