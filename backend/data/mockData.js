// Données mock pour FuturistCards - Mode fallback
const bcrypt = require('bcryptjs');

const mockUsers = [
  {
    _id: '674dc8e1234567890abcdef1',
    name: 'User Test',
    email: 'testnormal@example.com',
    password: '$2a$12$.cjug7wY.s47GKXiY598yu6awDRbriEpu7.JhsCbMR7UUHp92NKDa', // TestPass123!
    role: 'user',
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    _id: '674dc8e1234567890abcdef2',
    name: 'Business Test',
    email: 'testpro@example.com',
    password: '$2a$12$.cjug7wY.s47GKXiY598yu6awDRbriEpu7.JhsCbMR7UUHp92NKDa', // TestPass123!
    role: 'business',
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    _id: '674dc8e1234567890abcdef3',
    name: 'Admin Test',
    email: 'admin@example.com',
    password: '$2a$12$.cjug7wY.s47GKXiY598yu6awDRbriEpu7.JhsCbMR7UUHp92NKDa', // TestPass123!
    role: 'admin',
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    _id: '674dc8e1234567890abcdef4',
    name: 'Shaï Acoca',
    email: 'shay@futuristcards.com',
    password: '$2a$12$.cjug7wY.s47GKXiY598yu6awDRbriEpu7.JhsCbMR7UUHp92NKDa', // TestPass123!
    role: 'business',
    createdAt: new Date(),
    updatedAt: new Date()
  }
];

const mockCards = [
  {
    _id: '674dc8e1234567890abcdef5',
    title: 'Business Test',
    subtitle: 'Entrepreneur Digital',
    company: 'TechCorp',
    email: 'testpro@example.com',
    phone: '+33 1 23 45 67 89',
    website: 'https://techcorp.example.com',
    description: 'Expert en transformation digitale et innovation technologique.',
    userId: '674dc8e1234567890abcdef2',
    isPublic: true,
    tags: ['tech', 'business', 'innovation'],
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    _id: '674dc8e1234567890abcdef6',
    title: 'Shaï Acoca',
    subtitle: 'Développeur Full-Stack & CTO',
    company: 'FuturistCards',
    email: 'shay@futuristcards.com',
    phone: '+33 6 12 34 56 78',
    website: 'https://shayacoca.dev',
    description: 'Passionné par les technologies modernes, spécialisé en React, Node.js et architecture cloud. Créateur de FuturistCards.',
    userId: '674dc8e1234567890abcdef4',
    isPublic: true,
    tags: ['react', 'nodejs', 'fullstack', 'cto'],
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    _id: '674dc8e1234567890abcdef7',
    title: 'Marie Dupont',
    subtitle: 'Designer UX/UI Senior',
    company: 'Creative Studio',
    email: 'marie@creative.com',
    phone: '+33 1 98 76 54 32',
    website: 'https://mariedupont.design',
    description: 'Créatrice d\'expériences user exceptionnelles avec 8 ans d\'expérience.',
    userId: '674dc8e1234567890abcdef2',
    isPublic: true,
    tags: ['design', 'ux', 'ui', 'creative'],
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    _id: '674dc8e1234567890abcdef8',
    title: 'Jean Martin',
    subtitle: 'Expert Marketing Digital',
    company: 'Growth Agency',
    email: 'jean@growth.com',
    phone: '+33 2 11 22 33 44',
    website: 'https://growth-agency.com',
    description: 'Spécialiste en croissance et acquisition digitale. ROI garanti.',
    userId: '674dc8e1234567890abcdef2',
    isPublic: true,
    tags: ['marketing', 'growth', 'digital'],
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    _id: '674dc8e1234567890abcdef9',
    title: 'Sophie Laurent',
    subtitle: 'Consultante Data Science',
    company: 'Data Insights',
    email: 'sophie@datainsights.com',
    phone: '+33 3 55 44 33 22',
    website: 'https://datainsights.com',
    description: 'Transformation des données en insights stratégiques pour entreprises Fortune 500.',
    userId: '674dc8e1234567890abcdef2',
    isPublic: true,
    tags: ['data', 'ai', 'analytics', 'consulting'],
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    _id: '674dc8e1234567890abcdefA',
    title: 'Thomas Moreau',
    subtitle: 'DevOps Engineer',
    company: 'Cloud Solutions',
    email: 'thomas@cloudsolutions.com',
    phone: '+33 4 77 88 99 00',
    website: 'https://thomasmoreau.tech',
    description: 'Spécialiste en infrastructure cloud et automatisation CI/CD.',
    userId: '674dc8e1234567890abcdef4',
    isPublic: true,
    tags: ['devops', 'cloud', 'kubernetes', 'aws'],
    createdAt: new Date(),
    updatedAt: new Date()
  }
];

const mockFavorites = [
  {
    _id: '674dc8e1234567890abcdefB',
    userId: '674dc8e1234567890abcdef1',
    cardId: '674dc8e1234567890abcdef6',
    createdAt: new Date()
  },
  {
    _id: '674dc8e1234567890abcdefC',
    userId: '674dc8e1234567890abcdef1',
    cardId: '674dc8e1234567890abcdef7',
    createdAt: new Date()
  }
];

module.exports = {
  mockUsers,
  mockCards,
  mockFavorites
};
