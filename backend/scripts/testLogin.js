const mongoose = require('mongoose');
const User = require('../models/User');
const bcrypt = require('bcryptjs');

async function testLogin() {
  try {
    await mongoose.connect('mongodb://127.0.0.1:27017/futuristcards');
    
    const user = await User.findOne({ email: 'user@demo.com' }).select('+password');
    console.log('User found:', !!user);
    console.log('Password field:', user ? user.password.substring(0, 20) + '...' : 'N/A');
    
    if (user) {
      const isValid = await bcrypt.compare('Demo1234!', user.password);
      console.log('Password valid:', isValid);
    }
    
    process.exit(0);
  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  }
}

testLogin();
