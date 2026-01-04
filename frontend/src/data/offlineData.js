// Offline mode - Demo data for FuturistCards
// Note: This file contains static demo data in English only.
export const offlineUsers = [
  {
    _id: 'demo_user_1',
    firstName: 'David',
    lastName: 'Cohen',
    email: 'david.cohen@example.com',
    role: 'business',
    isActive: true,
    createdAt: '2024-01-15T10:00:00.000Z'
  },
  {
    _id: 'demo_user_2',
    firstName: 'Rachel',
    lastName: 'Levy',
    email: 'rachel.levi@example.com',
    role: 'user',
    isActive: true,
    createdAt: '2024-02-10T14:30:00.000Z'
  },
  {
    _id: 'demo_user_3',
    firstName: 'System',
    lastName: 'Admin',
    email: 'admin@futuristcards.com',
    role: 'admin',
    isActive: true,
    createdAt: '2024-01-01T00:00:00.000Z'
  }
];

export const offlineCards = [
  {
    _id: 'demo_card_1',
    title: 'Advanced Tech Solutions',
    subtitle: 'Web & App Development',
    description: 'Expert in modern application development with React, Node.js and cloud technologies. Over a decade of experience creating innovative digital solutions.',
    phone: '+972-3-123-4567',
    email: 'contact@techsolutions.co.il',
    web: 'https://techsolutions.co.il',
    image: {
      url: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=400&h=200&fit=crop',
      alt: 'Modern office with computers'
    },
    address: {
      street: '123 Innovation Drive',
      city: 'New York',
      country: 'USA',
      houseNumber: '123'
    },
    category: 'technology',
    likes: 45,
    views: 320,
    user_id: 'demo_user_1',
    createdAt: '2024-01-15T10:00:00.000Z',
    updatedAt: '2024-12-24T19:46:00.000Z'
  },
  {
    _id: 'demo_card_2',
    title: 'Creative Design Studio',
    subtitle: 'UI/UX Design & Branding',
    description: 'Creative design studio specializing in user experience and visual identity. We create modern and intuitive interfaces for your digital projects.',
    phone: '+972-3-987-6543',
    email: 'hello@designstudio.co.il',
    web: 'https://designstudio.co.il',
    image: {
      url: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=400&h=200&fit=crop',
      alt: 'Design workspace'
    },
    address: {
      street: '456 Creative Boulevard',
      city: 'San Francisco',
      country: 'USA',
      houseNumber: '456'
    },
    category: 'design',
    likes: 67,
    views: 450,
    user_id: 'demo_user_1',
    createdAt: '2024-02-01T14:00:00.000Z',
    updatedAt: '2024-12-24T19:46:00.000Z'
  },
  {
    _id: 'demo_card_3',
    title: 'Digital Marketing Expert',
    subtitle: 'Growth Strategy & Marketing',
    description: 'Digital marketing consultant with expertise in SEO, SEM, social media and analytics. Personal guidance to enhance your online presence.',
    phone: '+972-3-555-4433',
    email: 'expert@marketing-digital.co.il',
    web: 'https://marketing-digital.co.il',
    image: {
      url: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=200&fit=crop',
      alt: 'Marketing graphics'
    },
    address: {
      street: '789 Market Street',
      city: 'Los Angeles',
      country: 'USA',
      houseNumber: '789'
    },
    category: 'marketing',
    likes: 89,
    views: 670,
    user_id: 'demo_user_2',
    createdAt: '2024-02-15T09:30:00.000Z',
    updatedAt: '2024-12-24T19:46:00.000Z'
  },
  {
    _id: 'demo_card_4',
    title: 'Business Strategy Consulting',
    subtitle: 'Digital Transformation',
    description: 'Consulting firm specializing in digital transformation of businesses. Strategic guidance to optimize your processes and accelerate growth.',
    phone: '+972-3-778-8990',
    email: 'contact@business-strategy.co.il',
    web: 'https://business-strategy.co.il',
    image: {
      url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=200&fit=crop',
      alt: 'Business meeting'
    },
    address: {
      street: '321 Business Plaza',
      city: 'Chicago',
      country: 'USA',
      houseNumber: '321'
    },
    category: 'business',
    likes: 34,
    views: 280,
    user_id: 'demo_user_1',
    createdAt: '2024-03-01T11:15:00.000Z',
    updatedAt: '2024-12-24T19:46:00.000Z'
  },
  {
    _id: 'demo_card_5',
    title: 'Finance & Investments',
    subtitle: 'Portfolio Management',
    description: 'Independent financial advisor specializing in investment portfolio management. Personalized solutions to optimize your savings and investments.',
    phone: '+972-3-665-5443',
    email: 'conseiller@finance-invest.co.il',
    web: 'https://finance-invest.co.il',
    image: {
      url: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=400&h=200&fit=crop',
      alt: 'Financial charts'
    },
    address: {
      street: '654 Wall Street',
      city: 'New York',
      country: 'USA',
      houseNumber: '654'
    },
    category: 'finance',
    likes: 56,
    views: 390,
    user_id: 'demo_user_2',
    createdAt: '2024-03-10T16:45:00.000Z',
    updatedAt: '2024-12-24T19:46:00.000Z'
  },
  {
    _id: 'demo_card_6',
    title: 'Modern Medical Clinic',
    subtitle: 'General Medicine',
    description: 'Medical clinic equipped with the latest technologies for comprehensive medical care. Medical consultations by appointment and telemedicine available.',
    phone: '+972-3-443-3221',
    email: 'cabinet@medecine-moderne.co.il',
    web: 'https://medecine-moderne.co.il',
    image: {
      url: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=400&h=200&fit=crop',
      alt: 'Modern medical office'
    },
    address: {
      street: '987 Health Avenue',
      city: 'Boston',
      country: 'USA',
      houseNumber: '987'
    },
    category: 'medical',
    likes: 78,
    views: 520,
    user_id: 'demo_user_1',
    createdAt: '2024-03-20T08:00:00.000Z',
    updatedAt: '2024-12-24T19:46:00.000Z'
  }
];

export const offlineFavorites = [
  {
    _id: 'fav_1',
    user_id: 'demo_user_2',
    card_id: 'demo_card_1',
    createdAt: '2024-12-20T10:00:00.000Z'
  },
  {
    _id: 'fav_2',
    user_id: 'demo_user_2',
    card_id: 'demo_card_2',
    createdAt: '2024-12-21T14:30:00.000Z'
  },
  {
    _id: 'fav_3',
    user_id: 'demo_user_1',
    card_id: 'demo_card_3',
    createdAt: '2024-12-22T09:15:00.000Z'
  }
];

// Statistiques pour le dashboard admin
export const offlineStats = {
  totalUsers: 3,
  totalCards: 6,
  totalFavorites: 3,
  totalViews: 2630,
  totalLikes: 369,
  categoriesStats: {
    technology: 1,
    design: 1,
    marketing: 1,
    business: 1,
    finance: 1,
    medical: 1
  },
  recentActivity: [
    {
      type: 'card_created',
      user: 'David Cohen',
      target: 'Modern Medical Clinic',
      timestamp: '2024-03-20T08:00:00.000Z'
    },
    {
      type: 'card_liked',
      user: 'Rachel Levy',
      target: 'Creative Design Studio',
      timestamp: '2024-12-21T14:30:00.000Z'
    },
    {
      type: 'user_registered',
      user: 'Rachel Levy',
      timestamp: '2024-02-10T14:30:00.000Z'
    }
  ]
};

// Configuration du mode hors ligne
export const offlineConfig = {
  isOfflineMode: true,
  lastSync: '2024-12-24T19:46:00.000Z',
  version: '1.0.0',
  features: {
    auth: true,
    cards: true,
    favorites: true,
    search: true,
    categories: true,
    admin: true
  }
};
