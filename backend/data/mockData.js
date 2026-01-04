// Mock data for development and testing
const mockUsers = [
  {
    _id: '507f1f77bcf86cd799439011',
    firstName: 'Admin',
    lastName: 'User',
    name: 'Admin User',
    email: 'admin@futuristcards.com',
    password: '$2b$10$GsEjba83agRV3/qZpu101OHTvmibK/r.dcAXlBX/BtNXM1bUj8/1u', // admin123
    phone: '+33123456789',
    role: 'admin',
    isActive: true,
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-01')
  },
  {
    _id: '507f1f77bcf86cd799439012',
    firstName: 'John',
    lastName: 'Doe',
    name: 'John Doe',
    email: 'john.doe@example.com',
    password: '$2b$10$GsEjba83agRV3/qZpu101OHTvmibK/r.dcAXlBX/BtNXM1bUj8/1u', // admin123
    phone: '+33987654321',
    role: 'business',
    isActive: true,
    createdAt: new Date('2024-01-02'),
    updatedAt: new Date('2024-01-02')
  },
  {
    _id: '507f1f77bcf86cd799439013',
    firstName: 'Test',
    lastName: 'User',
    name: 'Test User',
    email: 'test@example.com',
    password: '$2b$10$GsEjba83agRV3/qZpu101OHTvmibK/r.dcAXlBX/BtNXM1bUj8/1u', // admin123
    phone: '+33555666777',
    role: 'user',
    isActive: true,
    createdAt: new Date('2024-01-03'),
    updatedAt: new Date('2024-01-03')
  }
];

const mockCards = [
  {
    _id: '507f1f77bcf86cd799439021',
    title: 'Full-Stack Developer',
    subtitle: 'React & Node.js Expert',
    description: 'Passionate about modern technologies and digital innovation',
    phone: '+1234567890',
    email: 'john.doe@example.com',
    web: 'https://johndoe.dev',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400',
    address: {
      street: '123 Tech Street',
      city: 'New York',
      state: 'NY',
      zip: '10001',
      country: 'USA'
    },
    bizNumber: '123456789',
    user: '507f1f77bcf86cd799439012',
    likes: [],
    createdAt: new Date('2024-01-02'),
    updatedAt: new Date('2024-01-02')
  }
];

module.exports = {
  mockUsers,
  mockCards
};
