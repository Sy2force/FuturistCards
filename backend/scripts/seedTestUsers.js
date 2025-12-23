const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('../models/User');
require('dotenv').config();

const testUsers = [
  {
    firstName: 'Test',
    lastName: 'User',
    email: 'user@demo.com',
    password: 'Demo1234!',
    role: 'user'
  },
  {
    firstName: 'Business',
    lastName: 'User',
    email: 'business@demo.com',
    password: 'Demo1234!',
    role: 'business'
  },
  {
    firstName: 'Admin',
    lastName: 'User',
    email: 'admin@demo.com',
    password: 'Demo1234!',
    role: 'admin'
  }
];

async function seedTestUsers() {
  try {
    await mongoose.connect(process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/futuristcards');
    console.log('Connected to MongoDB');

    // Clear existing test users
    await User.deleteMany({ email: { $in: testUsers.map(u => u.email) } });
    console.log('Cleared existing test users');

    // Create new test users
    for (const userData of testUsers) {
      const salt = await bcrypt.genSalt(12);
      const hashedPassword = await bcrypt.hash(userData.password, salt);
      const user = new User({
        firstName: userData.firstName,
        lastName: userData.lastName,
        email: userData.email.toLowerCase(),
        password: hashedPassword,
        role: userData.role,
        isAdmin: userData.role === 'admin',
        isBusiness: userData.role === 'business'
      });
      await user.save();
      console.log(`Created test user: ${userData.email} (${userData.role})`);
    }

    console.log('Test users seeded successfully');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding test users:', error);
    process.exit(1);
  }
}

seedTestUsers();
