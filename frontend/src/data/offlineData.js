// Offline mode - Demo data for FuturistCards
// Note: This file contains static demo data. For full i18n support, 
// consider implementing dynamic translation keys for card content.
export const offlineUsers = [
  {
    _id: 'demo_user_1',
    firstName: 'דוד',
    lastName: 'כהן',
    email: 'david.cohen@example.com',
    role: 'business',
    isActive: true,
    createdAt: '2024-01-15T10:00:00.000Z'
  },
  {
    _id: 'demo_user_2',
    firstName: 'רחל',
    lastName: 'לוי',
    email: 'rachel.levi@example.com',
    role: 'user',
    isActive: true,
    createdAt: '2024-02-10T14:30:00.000Z'
  },
  {
    _id: 'demo_user_3',
    firstName: 'מנהל',
    lastName: 'מערכת',
    email: 'admin@futuristcards.com',
    role: 'admin',
    isActive: true,
    createdAt: '2024-01-01T00:00:00.000Z'
  }
];

export const offlineCards = [
  {
    _id: 'demo_card_1',
    title: 'פתרונות טכנולוגיים מתקדמים',
    subtitle: 'פיתוח אתרים ואפליקציות',
    description: 'מומחה בפיתוח אפליקציות מודרניות עם React, Node.js וטכנולוגיות ענן. למעלה מעשור ניסיון ביצירת פתרונות דיגיטליים חדשניים.',
    phone: '+972-3-123-4567',
    email: 'contact@techsolutions.co.il',
    web: 'https://techsolutions.co.il',
    image: {
      url: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=400&h=200&fit=crop',
      alt: 'Bureau moderne avec ordinateurs'
    },
    address: {
      street: 'רחוב הרצל 123',
      city: 'תל אביב',
      country: 'ישראל',
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
    title: 'סטודיו עיצוב יצירתי',
    subtitle: 'עיצוב UI/UX ומיתוג',
    description: 'סטודיו עיצוב יצירתי המתמחה בחוויית משתמש וזהות חזותית. אנו יוצרים ממשקים מודרניים ואינטואיטיביים לפרויקטים הדיגיטליים שלכם.',
    phone: '+972-3-987-6543',
    email: 'hello@designstudio.co.il',
    web: 'https://designstudio.co.il',
    image: {
      url: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=400&h=200&fit=crop',
      alt: 'Espace de travail design'
    },
    address: {
      street: 'שדרות רוטשילד 456',
      city: 'תל אביב',
      country: 'ישראל',
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
    title: 'מומחה שיווק דיגיטלי',
    subtitle: 'אסטרטגיה ושיווק צמיחה',
    description: 'יועץ שיווק דיגיטלי עם מומחיות ב-SEO, SEM, רשתות חברתיות ואנליטיקס. ליווי אישי להגברת הנוכחות המקוונת שלכם.',
    phone: '+972-3-555-4433',
    email: 'expert@marketing-digital.co.il',
    web: 'https://marketing-digital.co.il',
    image: {
      url: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=200&fit=crop',
      alt: 'Graphiques marketing'
    },
    address: {
      street: 'שדרות בן גוריון 789',
      city: 'תל אביב',
      country: 'ישראל',
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
    title: 'ייעוץ אסטרטגיה עסקית',
    subtitle: 'טרנספורמציה דיגיטלית',
    description: 'משרד ייעוץ המתמחה בטרנספורמציה דיגיטלית של עסקים. ליווי אסטרטגי לייעול התהליכים והאצת הצמיחה שלכם.',
    phone: '+972-3-778-8990',
    email: 'contact@business-strategy.co.il',
    web: 'https://business-strategy.co.il',
    image: {
      url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=200&fit=crop',
      alt: 'Réunion d\'affaires'
    },
    address: {
      street: 'רחוב דיזנגוף 321',
      city: 'תל אביב',
      country: 'ישראל',
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
    title: 'כספים והשקעות',
    subtitle: 'ניהול תיק השקעות',
    description: 'יועץ פיננסי עצמאי המתמחה בניהול תיק השקעות והשקעות. פתרונות מותאמים אישית לייעול החיסכון וההשקעות שלכם.',
    phone: '+972-3-665-5443',
    email: 'conseiller@finance-invest.co.il',
    web: 'https://finance-invest.co.il',
    image: {
      url: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=400&h=200&fit=crop',
      alt: 'Graphiques financiers'
    },
    address: {
      street: 'רחוב השלום 654',
      city: 'תל אביב',
      country: 'ישראל',
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
    title: 'מרפאה רפואית מודרנית',
    subtitle: 'רפואה כללית',
    description: 'מרפאה רפואית המצוידת בטכנולוגיות החדישות ביותר למעקב רפואי מלא. ייעוץ רפואי בתיאום מראש וטלה-רפואה זמינים.',
    phone: '+972-3-443-3221',
    email: 'cabinet@medecine-moderne.co.il',
    web: 'https://medecine-moderne.co.il',
    image: {
      url: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=400&h=200&fit=crop',
      alt: 'Cabinet médical moderne'
    },
    address: {
      street: 'שדרות ויקטור הוגו 987',
      city: 'תל אביב',
      country: 'ישראל',
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
      user: 'דוד כהן',
      target: 'מרפאה רפואית מודרנית',
      timestamp: '2024-03-20T08:00:00.000Z'
    },
    {
      type: 'card_liked',
      user: 'רחל לוי',
      target: 'סטודיו עיצוב יצירתי',
      timestamp: '2024-12-21T14:30:00.000Z'
    },
    {
      type: 'user_registered',
      user: 'רחל לוי',
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
