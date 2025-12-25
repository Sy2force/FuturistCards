// Mode hors ligne - Données de démonstration pour FuturistCards
export const offlineUsers = [
  {
    _id: 'demo_user_1',
    firstName: 'Jean',
    lastName: 'Dupont',
    email: 'jean.dupont@example.com',
    role: 'business',
    isActive: true,
    createdAt: '2024-01-15T10:00:00.000Z'
  },
  {
    _id: 'demo_user_2',
    firstName: 'Marie',
    lastName: 'Martin',
    email: 'marie.martin@example.com',
    role: 'user',
    isActive: true,
    createdAt: '2024-02-10T14:30:00.000Z'
  },
  {
    _id: 'demo_user_3',
    firstName: 'Admin',
    lastName: 'System',
    email: 'admin@futuristcards.com',
    role: 'admin',
    isActive: true,
    createdAt: '2024-01-01T00:00:00.000Z'
  }
];

export const offlineCards = [
  {
    _id: 'demo_card_1',
    title: 'Tech Solutions Pro',
    subtitle: 'Développement Web & Mobile',
    description: 'Spécialiste en développement d\'applications modernes avec React, Node.js et technologies cloud. Plus de 10 ans d\'expérience dans la création de solutions digitales innovantes.',
    phone: '+33 1 23 45 67 89',
    email: 'contact@techsolutions.fr',
    web: 'https://techsolutions.fr',
    image: {
      url: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=400&h=200&fit=crop',
      alt: 'Bureau moderne avec ordinateurs'
    },
    address: {
      street: '123 Avenue des Champs-Élysées',
      city: 'Paris',
      country: 'France',
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
    title: 'Design Studio Creative',
    subtitle: 'UI/UX Design & Branding',
    description: 'Studio de design créatif spécialisé dans l\'expérience utilisateur et l\'identité visuelle. Nous créons des interfaces modernes et intuitives pour vos projets digitaux.',
    phone: '+33 1 98 76 54 32',
    email: 'hello@designstudio.fr',
    web: 'https://designstudio.fr',
    image: {
      url: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=400&h=200&fit=crop',
      alt: 'Espace de travail design'
    },
    address: {
      street: '456 Rue de Rivoli',
      city: 'Paris',
      country: 'France',
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
    title: 'Marketing Digital Expert',
    subtitle: 'Stratégie & Growth Hacking',
    description: 'Consultant en marketing digital avec expertise en SEO, SEM, réseaux sociaux et analytics. Accompagnement personnalisé pour booster votre présence en ligne.',
    phone: '+33 1 55 44 33 22',
    email: 'expert@marketing-digital.fr',
    web: 'https://marketing-digital.fr',
    image: {
      url: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=200&fit=crop',
      alt: 'Graphiques marketing'
    },
    address: {
      street: '789 Boulevard Saint-Germain',
      city: 'Paris',
      country: 'France',
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
    title: 'Conseil Business Strategy',
    subtitle: 'Transformation Digitale',
    description: 'Cabinet de conseil spécialisé dans la transformation digitale des entreprises. Accompagnement stratégique pour optimiser vos processus et accélérer votre croissance.',
    phone: '+33 1 77 88 99 00',
    email: 'contact@business-strategy.fr',
    web: 'https://business-strategy.fr',
    image: {
      url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=200&fit=crop',
      alt: 'Réunion d\'affaires'
    },
    address: {
      street: '321 Avenue Montaigne',
      city: 'Paris',
      country: 'France',
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
    title: 'Finance & Investment',
    subtitle: 'Gestion de Patrimoine',
    description: 'Conseiller financier indépendant spécialisé dans la gestion de patrimoine et les investissements. Solutions personnalisées pour optimiser votre épargne et vos placements.',
    phone: '+33 1 66 55 44 33',
    email: 'conseiller@finance-invest.fr',
    web: 'https://finance-invest.fr',
    image: {
      url: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=400&h=200&fit=crop',
      alt: 'Graphiques financiers'
    },
    address: {
      street: '654 Rue de la Paix',
      city: 'Paris',
      country: 'France',
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
    title: 'Cabinet Médical Moderne',
    subtitle: 'Médecine Générale',
    description: 'Cabinet médical équipé des dernières technologies pour un suivi médical complet. Consultations sur rendez-vous et téléconsultations disponibles.',
    phone: '+33 1 44 33 22 11',
    email: 'cabinet@medecine-moderne.fr',
    web: 'https://medecine-moderne.fr',
    image: {
      url: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=400&h=200&fit=crop',
      alt: 'Cabinet médical moderne'
    },
    address: {
      street: '987 Avenue Victor Hugo',
      city: 'Paris',
      country: 'France',
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
      user: 'Jean Dupont',
      target: 'Cabinet Médical Moderne',
      timestamp: '2024-03-20T08:00:00.000Z'
    },
    {
      type: 'card_liked',
      user: 'Marie Martin',
      target: 'Design Studio Creative',
      timestamp: '2024-12-21T14:30:00.000Z'
    },
    {
      type: 'user_registered',
      user: 'Marie Martin',
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
