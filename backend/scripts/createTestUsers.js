const bcrypt = require('bcrypt');
const User = require('../models/User');
const { connectDB } = require('../config/db');

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

const createTestUsers = async () => {
  try {
    await connectDB();
    // console.log('Connected to MongoDB');

    for (const userData of testUsers) {
      // Check if user already exists
      const existingUser = await User.findOne({ email: userData.email });
      
      if (!existingUser) {
        // Hash password
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(userData.password, saltRounds);
        
        // Create user
        const user = new User({
          ...userData,
          password: hashedPassword
        });
        
        await user.save();
        // console.log(`✅ Created test user: ${userData.email} (${userData.role})`);
      } else {
        // console.log(`⚠️  User already exists: ${userData.email}`);
      }
    }
    
    // console.log('✅ Test users creation completed');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error creating test users:', error);
    process.exit(1);
  }
};

if (require.main === module) {
  createTestUsers();
}

module.exports = createTestUsers;
