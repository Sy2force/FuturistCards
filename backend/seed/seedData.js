import bcrypt from 'bcryptjs';
import mongoose from 'mongoose';
import User from '../models/User.js';
import Card from '../models/Card.js';
import connectDB from '../config/db.js';

/**
 * Seed data pour CardPro
 * Création de 3 utilisateurs (user, business, admin) + 3 cartes
 */

// Données des utilisateurs de test
const seedUsers = [
  {
    _id: new mongoose.Types.ObjectId('507f1f77bcf86cd799439014'),
    firstName: 'Jean',
    lastName: 'Dupont',
    email: 'user@test.com',
    password: 'User123!',
    phone: '052-123-4567',
    role: 'user',
    isActive: true,
    lastLogin: new Date(),
    loginCount: 5,
    profileCompleted: true
  },
  {
    _id: new mongoose.Types.ObjectId('507f1f77bcf86cd799439015'),
    firstName: 'Marie',
    lastName: 'Martin',
    email: 'business@test.com',
    password: 'Business123!',
    phone: '054-987-6543',
    role: 'business',
    isActive: true,
    lastLogin: new Date(),
    loginCount: 12,
    profileCompleted: true,
    company: 'TechStart Solutions',
    position: 'CEO & Founder'
  },
  {
    _id: new mongoose.Types.ObjectId('507f1f77bcf86cd799439016'),
    firstName: 'Admin',
    lastName: 'System',
    email: 'admin@test.com',
    password: 'Admin123!',
    phone: '050-555-0000',
    role: 'admin',
    isActive: true,
    lastLogin: new Date(),
    loginCount: 50,
    profileCompleted: true,
    company: 'CardPro',
    position: 'System Administrator'
  }
];

// Données des cartes de visite
const seedCards = [
  {
    _id: new mongoose.Types.ObjectId('607f1f77bcf86cd799439001'),
    title: 'Jean Dupont',
    subtitle: 'Développeur Full-Stack Senior',
    description: 'Spécialiste React.js, Node.js et MongoDB avec 5+ années d\'expérience. Expert en architecture microservices et développement d\'applications web modernes.',
    category: 'technology',
    phone: '052-123-4567',
    email: 'user@test.com',
    website: 'https://jeandupont.dev',
    socialLinks: {
      linkedin: 'https://linkedin.com/in/jeandupont'
    },
    address: {
      street: 'Rue de la Technologie',
      houseNumber: '123',
      city: 'Tel Aviv',
      zip: '12345'
    },
    image: {
      url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=300&fit=crop&crop=face',
      alt: 'Photo de profil de Jean Dupont'
    },
    user_id: new mongoose.Types.ObjectId('507f1f77bcf86cd799439014'),
    likes: [],
    views: 127,
    createdAt: new Date('2024-01-15'),
    updatedAt: new Date()
  },
  {
    _id: new mongoose.Types.ObjectId('607f1f77bcf86cd799439002'),
    title: 'Marie Martin',
    subtitle: 'Consultante UX/UI & Product Design',
    description: 'Designer experte en expérience utilisateur et interfaces modernes. Accompagnement startups et entreprises dans leur transformation digitale.',
    category: 'creative',
    phone: '054-987-6543',
    email: 'business@test.com',
    website: 'https://mariemartin-design.com',
    socialLinks: {
      linkedin: 'https://linkedin.com/in/mariemartin'
    },
    address: {
      street: 'Avenue du Design',
      houseNumber: '456',
      city: 'Jerusalem',
      zip: '67890'
    },
    image: {
      url: 'https://images.unsplash.com/photo-1494790108755-2616b612b4c4?w=400&h=300&fit=crop&crop=face',
      alt: 'Photo de profil de Marie Martin'
    },
    user_id: new mongoose.Types.ObjectId('507f1f77bcf86cd799439015'),
    likes: [],
    views: 89,
    createdAt: new Date('2024-02-10'),
    updatedAt: new Date()
  },
  {
    _id: new mongoose.Types.ObjectId('607f1f77bcf86cd799439003'),
    title: 'Admin System',
    subtitle: 'Expert DevOps & Cloud Architecture',
    description: 'Architecte cloud spécialisé AWS/Azure avec expertise en conteneurisation, CI/CD et monitoring. Optimisation infrastructure et sécurité.',
    category: 'technology',
    phone: '050-555-0000',
    email: 'admin@test.com',
    website: 'https://cloudexpert.tech',
    socialLinks: {
      linkedin: 'https://linkedin.com/in/admincloud'
    },
    address: {
      street: 'Tech Valley',
      houseNumber: '789',
      city: 'Haifa',
      zip: '54321'
    },
    image: {
      url: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=300&fit=crop&crop=face',
      alt: 'Photo de profil Admin System'
    },
    user_id: new mongoose.Types.ObjectId('507f1f77bcf86cd799439016'),
    likes: [],
    views: 156,
    createdAt: new Date('2024-03-05'),
    updatedAt: new Date()
  }
];

/**
 * Hash passwords for seed users
 */
async function hashPasswords(users) {
  const salt = await bcrypt.genSalt(12);
  
  for (const user of users) {
    user.password = await bcrypt.hash(user.password, salt);
  }
  
  return users;
}

/**
 * Seed the database with initial data
 */
export async function seedDatabase() {
  try {
    console.log('🌱 Starting database seeding...');
    
    // Connect to database if not connected
    if (mongoose.connection.readyState !== 1) {
      await connectDB();
    }

    // Clear existing data (only in development)
    if (process.env.NODE_ENV !== 'production') {
      console.log('🧹 Clearing existing data...');
      await User.deleteMany({});
      await Card.deleteMany({});
    }

    // Hash passwords for users
    console.log('🔐 Hashing passwords...');
    const usersWithHashedPasswords = await hashPasswords([...seedUsers]);

    // Insert users
    console.log('👥 Creating users...');
    const createdUsers = await User.insertMany(usersWithHashedPasswords);
    console.log(`✅ Created ${createdUsers.length} users`);

    // Insert cards
    console.log('🃏 Creating cards...');
    const createdCards = await Card.insertMany(seedCards);
    console.log(`✅ Created ${createdCards.length} cards`);

    // Log success
    console.log('✅ Database seeded successfully:', {
      users: createdUsers.length,
      cards: createdCards.length,
      timestamp: new Date().toISOString()
    });

    console.log('🎉 Database seeding completed successfully!');
    console.log('\n📊 Seed Summary:');
    console.log(`   • Users: ${createdUsers.length}`);
    console.log(`   • Cards: ${createdCards.length}`);
    console.log('\n🔑 Test Credentials:');
    console.log('   • User: user@test.com / User123!');
    console.log('   • Business: business@test.com / Business123!');
    console.log('   • Admin: admin@test.com / Admin123!');

    return {
      success: true,
      users: createdUsers.length,
      cards: createdCards.length
    };

  } catch (error) {
    console.error('❌ Database seeding failed:', error);
    
    return {
      success: false,
      error: error.message
    };
  }
}

/**
 * Reset database (development only)
 */
export async function resetDatabase() {
  if (process.env.NODE_ENV === 'production') {
    throw new Error('Cannot reset database in production environment');
  }

  try {
    console.log('🔄 Resetting database...');
    
    await User.deleteMany({});
    await Card.deleteMany({});
    
    console.log('✅ Database reset completed');
    
    return { success: true };
    
  } catch (error) {
    console.error('❌ Database reset failed:', error);
    
    return {
      success: false,
      error: error.message
    };
  }
}

/**
 * Get seed statistics
 */
export async function getSeedStats() {
  try {
    const userCount = await User.countDocuments();
    const cardCount = await Card.countDocuments();
    
    return {
      success: true,
      users: userCount,
      cards: cardCount,
      seeded: userCount > 0 && cardCount > 0
    };
  } catch (error) {
    return {
      success: false,
      error: error.message
    };
  }
}

// Export seed data for tests
export { seedUsers, seedCards };

export default {
  seedDatabase,
  resetDatabase,
  getSeedStats,
  seedUsers,
  seedCards
};
