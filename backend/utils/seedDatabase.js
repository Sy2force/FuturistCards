const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const dotenv = require('dotenv');
const path = require('path');

// Load environment variables
dotenv.config({ path: path.join(__dirname, '../.env') });

const User = require('../models/User');
const Card = require('../models/Card');
const Favorite = require('../models/Favorite');
const connectDB = require('../connections/mongo');

// Sample users data
const sampleUsers = [
  {
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@example.com',
    password: 'Password123!',
    phone: '0501234567',
    isBusiness: true,
    isAdmin: false,
    bio: 'Experienced software developer with expertise in full-stack development.',
    website: 'https://johndoe.dev',
    socialLinks: {
      linkedin: 'https://linkedin.com/in/johndoe',
      github: 'https://github.com/johndoe',
      twitter: 'https://twitter.com/johndoe'
    },
    address: {
      country: 'Israel',
      city: 'Tel Aviv',
      street: 'Rothschild Blvd',
      houseNumber: '1',
      zip: '6688101'
    }
  },
  {
    firstName: 'Sarah',
    lastName: 'Cohen',
    email: 'sarah.cohen@example.com',
    password: 'Password123!',
    phone: '0507654321',
    isBusiness: true,
    isAdmin: false,
    bio: 'Creative designer specializing in UI/UX and brand identity.',
    website: 'https://sarahcohen.design',
    socialLinks: {
      linkedin: 'https://linkedin.com/in/sarahcohen',
      instagram: 'https://instagram.com/sarahcohen',
      facebook: 'https://facebook.com/sarahcohen'
    },
    address: {
      country: 'Israel',
      city: 'Jerusalem',
      street: 'King George St',
      houseNumber: '15',
      zip: '9426208'
    }
  },
  {
    firstName: 'David',
    lastName: 'Levi',
    email: 'david.levi@example.com',
    password: 'Password123!',
    phone: '0523456789',
    isBusiness: true,
    isAdmin: false,
    bio: 'Marketing consultant helping businesses grow their digital presence.',
    website: 'https://davidlevi.marketing',
    socialLinks: {
      linkedin: 'https://linkedin.com/in/davidlevi',
      twitter: 'https://twitter.com/davidlevi',
      youtube: 'https://youtube.com/davidlevi'
    },
    address: {
      country: 'Israel',
      city: 'Haifa',
      street: 'Herzl St',
      houseNumber: '42',
      zip: '3310102'
    }
  },
  {
    firstName: 'Admin',
    lastName: 'User',
    email: 'admin@futuristcards.com',
    password: 'AdminPass123!',
    phone: '0501111111',
    isBusiness: true,
    isAdmin: true,
    bio: 'FuturistCards platform administrator.',
    address: {
      country: 'Israel',
      city: 'Tel Aviv',
      street: 'Admin St',
      houseNumber: '1',
      zip: '1234567'
    }
  },
  {
    firstName: 'Test',
    lastName: 'User',
    email: 'test@example.com',
    password: 'TestPass123!',
    phone: '0509999999',
    isBusiness: false,
    isAdmin: false,
    bio: 'Regular user for testing purposes.',
    address: {
      country: 'Israel',
      city: 'Netanya',
      street: 'Test St',
      houseNumber: '99',
      zip: '4200000'
    }
  }
];

// Sample cards data (will be created after users)
const sampleCards = [
  {
    title: 'Full Stack Developer',
    subtitle: 'React & Node.js Specialist',
    description: 'Experienced developer creating modern web applications with cutting-edge technologies. Specializing in React, Node.js, and MongoDB.',
    category: 'technology',
    phone: '0501234567',
    email: 'john.doe@example.com',
    website: 'https://johndoe.dev',
    socialLinks: {
      linkedin: 'https://linkedin.com/in/johndoe',
      github: 'https://github.com/johndoe'
    },
    image: {
      url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face',
      alt: 'John Doe - Full Stack Developer'
    },
    tags: ['react', 'nodejs', 'mongodb', 'javascript', 'fullstack'],
    address: {
      country: 'Israel',
      city: 'Tel Aviv',
      street: 'Rothschild Blvd',
      houseNumber: '1',
      zip: '6688101'
    }
  },
  {
    title: 'UI/UX Designer',
    subtitle: 'Creative Digital Solutions',
    description: 'Passionate designer creating beautiful and functional user experiences. Expert in Figma, Adobe Creative Suite, and user research.',
    category: 'creative',
    phone: '0507654321',
    email: 'sarah.cohen@example.com',
    website: 'https://sarahcohen.design',
    socialLinks: {
      linkedin: 'https://linkedin.com/in/sarahcohen',
      instagram: 'https://instagram.com/sarahcohen'
    },
    image: {
      url: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400&h=400&fit=crop&crop=face',
      alt: 'Sarah Cohen - UI/UX Designer'
    },
    tags: ['design', 'ui', 'ux', 'figma', 'adobe'],
    address: {
      country: 'Israel',
      city: 'Jerusalem',
      street: 'King George St',
      houseNumber: '15',
      zip: '9426208'
    }
  },
  {
    title: 'Digital Marketing Consultant',
    subtitle: 'Growth & Strategy Expert',
    description: 'Helping businesses scale through data-driven marketing strategies. Specializing in SEO, SEM, social media, and conversion optimization.',
    category: 'marketing',
    phone: '0523456789',
    email: 'david.levi@example.com',
    website: 'https://davidlevi.marketing',
    socialLinks: {
      linkedin: 'https://linkedin.com/in/davidlevi',
      twitter: 'https://twitter.com/davidlevi'
    },
    image: {
      url: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face',
      alt: 'David Levi - Marketing Consultant'
    },
    tags: ['marketing', 'seo', 'sem', 'analytics', 'growth'],
    address: {
      country: 'Israel',
      city: 'Haifa',
      street: 'Herzl St',
      houseNumber: '42',
      zip: '3310102'
    }
  },
  {
    title: 'Business Consultant',
    subtitle: 'Strategic Planning & Operations',
    description: 'Experienced consultant helping startups and SMEs optimize their operations and achieve sustainable growth.',
    category: 'consulting',
    phone: '0501234567',
    email: 'john.doe@example.com',
    website: 'https://johndoe.dev',
    socialLinks: {
      linkedin: 'https://linkedin.com/in/johndoe'
    },
    image: {
      url: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&h=400&fit=crop&crop=face',
      alt: 'Business Consultant'
    },
    tags: ['consulting', 'strategy', 'operations', 'business'],
    address: {
      country: 'Israel',
      city: 'Tel Aviv',
      street: 'Business St',
      houseNumber: '10',
      zip: '6688101'
    }
  },
  {
    title: 'Graphic Designer',
    subtitle: 'Brand Identity & Visual Design',
    description: 'Creative professional specializing in brand identity, logo design, and visual communication for modern businesses.',
    category: 'creative',
    phone: '0507654321',
    email: 'sarah.cohen@example.com',
    website: 'https://sarahcohen.design',
    socialLinks: {
      instagram: 'https://instagram.com/sarahcohen',
      facebook: 'https://facebook.com/sarahcohen'
    },
    image: {
      url: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop&crop=face',
      alt: 'Graphic Designer'
    },
    tags: ['design', 'branding', 'logo', 'visual', 'creative'],
    address: {
      country: 'Israel',
      city: 'Jerusalem',
      street: 'Art St',
      houseNumber: '25',
      zip: '9426208'
    }
  }
];

const seedDatabase = async () => {
  try {
    console.log('🌱 Starting database seeding...');

    // Connect to database
    await connectDB();

    // Clear existing data
    console.log('🧹 Clearing existing data...');
    await User.deleteMany({});
    await Card.deleteMany({});
    await Favorite.deleteMany({});

    // Create users
    console.log('👥 Creating users...');
    const createdUsers = [];
    
    for (const userData of sampleUsers) {
      const hashedPassword = await bcrypt.hash(userData.password, 12);
      const user = new User({
        ...userData,
        password: hashedPassword
      });
      const savedUser = await user.save();
      createdUsers.push(savedUser);
      console.log(`✅ Created user: ${userData.firstName} ${userData.lastName}`);
    }

    // Create cards
    console.log('🃏 Creating cards...');
    const createdCards = [];
    
    for (let i = 0; i < sampleCards.length; i++) {
      const cardData = sampleCards[i];
      const userIndex = i % createdUsers.length; // Distribute cards among users
      
      const card = new Card({
        ...cardData,
        user_id: createdUsers[userIndex]._id
      });
      
      const savedCard = await card.save();
      createdCards.push(savedCard);
      console.log(`✅ Created card: ${cardData.title}`);
    }

    // Create some favorites
    console.log('⭐ Creating favorites...');
    const favoritePromises = [];
    
    // User 0 likes cards 1 and 2
    favoritePromises.push(
      new Favorite({
        user: createdUsers[0]._id,
        card: createdCards[1]._id
      }).save()
    );
    
    favoritePromises.push(
      new Favorite({
        user: createdUsers[0]._id,
        card: createdCards[2]._id
      }).save()
    );

    // User 1 likes cards 0 and 3
    favoritePromises.push(
      new Favorite({
        user: createdUsers[1]._id,
        card: createdCards[0]._id
      }).save()
    );
    
    favoritePromises.push(
      new Favorite({
        user: createdUsers[1]._id,
        card: createdCards[3]._id
      }).save()
    );

    // User 4 (test user) likes multiple cards
    favoritePromises.push(
      new Favorite({
        user: createdUsers[4]._id,
        card: createdCards[0]._id
      }).save()
    );
    
    favoritePromises.push(
      new Favorite({
        user: createdUsers[4]._id,
        card: createdCards[1]._id
      }).save()
    );
    
    favoritePromises.push(
      new Favorite({
        user: createdUsers[4]._id,
        card: createdCards[2]._id
      }).save()
    );

    await Promise.all(favoritePromises);
    console.log('✅ Created favorites');

    // Add some likes to cards
    console.log('👍 Adding likes to cards...');
    await Card.findByIdAndUpdate(createdCards[0]._id, {
      $push: { likes: { $each: [createdUsers[1]._id, createdUsers[2]._id, createdUsers[4]._id] } }
    });
    
    await Card.findByIdAndUpdate(createdCards[1]._id, {
      $push: { likes: { $each: [createdUsers[0]._id, createdUsers[3]._id, createdUsers[4]._id] } }
    });
    
    await Card.findByIdAndUpdate(createdCards[2]._id, {
      $push: { likes: { $each: [createdUsers[0]._id, createdUsers[4]._id] } }
    });

    // Add some views to cards
    console.log('👀 Adding views to cards...');
    await Card.findByIdAndUpdate(createdCards[0]._id, { views: 45 });
    await Card.findByIdAndUpdate(createdCards[1]._id, { views: 32 });
    await Card.findByIdAndUpdate(createdCards[2]._id, { views: 28 });
    await Card.findByIdAndUpdate(createdCards[3]._id, { views: 15 });
    await Card.findByIdAndUpdate(createdCards[4]._id, { views: 8 });

    console.log('🎉 Database seeding completed successfully!');
    console.log('\n📊 Summary:');
    console.log(`👥 Users created: ${createdUsers.length}`);
    console.log(`🃏 Cards created: ${createdCards.length}`);
    console.log(`⭐ Favorites created: ${favoritePromises.length}`);
    
    console.log('\n🔐 Test Accounts:');
    console.log('Admin: admin@futuristcards.com / AdminPass123!');
    console.log('Business: john.doe@example.com / Password123!');
    console.log('Business: sarah.cohen@example.com / Password123!');
    console.log('Business: david.levi@example.com / Password123!');
    console.log('User: test@example.com / TestPass123!');

    process.exit(0);

  } catch (error) {
    console.error('❌ Error seeding database:', error);
    process.exit(1);
  }
};

// Run seeding if called directly
if (require.main === module) {
  seedDatabase();
}

module.exports = seedDatabase;
