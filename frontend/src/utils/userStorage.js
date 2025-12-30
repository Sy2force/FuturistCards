// Système de gestion des users avec localStorage
const USERS_KEY = 'futuristcards_users';
const CURRENT_USER_KEY = 'futuristcards_current_user';

// Users de test pré-enregistrés
const TEST_USERS = [
  {
    id: 'test-1',
    firstName: 'Jean',
    lastName: 'Dupont',
    email: 'jean.dupont@futuristcards.com',
    password: 'test123',
    bio: 'Développeur passionné avec 5 ans d\'expérience en React et Node.js',
    company: 'TechCorp',
    phone: '06 12 34 56 78',
    createdAt: new Date('2023-01-15').toISOString(),
    myCards: ['card-1', 'card-2'],
    favoriteCards: ['card-3']
  },
  {
    id: 'test-2',
    firstName: 'Marie',
    lastName: 'Martin',
    email: 'marie.martin@futuristcards.com',
    password: 'test123',
    bio: 'Designer UX/UI créative spécialisée dans les interfaces modernes',
    company: 'Design Studio',
    phone: '06 87 65 43 21',
    createdAt: new Date('2023-02-20').toISOString(),
    myCards: ['card-3'],
    favoriteCards: ['card-1', 'card-2']
  },
  {
    id: 'test-3',
    firstName: 'Pierre',
    lastName: 'Durand',
    email: 'pierre.durand@futuristcards.com',
    password: 'test123',
    bio: 'Chef de projet expérimenté dans le digital',
    company: 'Digital Agency',
    phone: '06 98 76 54 32',
    createdAt: new Date('2023-03-10').toISOString(),
    myCards: [],
    favoriteCards: ['card-1']
  },
  {
    id: 'test-4',
    firstName: 'Sophie',
    lastName: 'Bernard',
    email: 'sophie.bernard@futuristcards.com',
    password: 'test123',
    bio: 'Consultante en transformation digitale',
    company: 'Consulting Plus',
    phone: '06 11 22 33 44',
    createdAt: new Date('2023-04-05').toISOString(),
    myCards: ['card-4'],
    favoriteCards: []
  }
];

// Initialiser les comptes de test si pas déjà fait
export const initializeTestUsers = () => {
  const existingUsers = getStoredUsers();
  const testExists = TEST_USERS.some(testUser => 
    existingUsers.some(user => user.email === testUser.email)
  );
  
  if (!testExists) {
    const allUsers = [...existingUsers, ...TEST_USERS];
    localStorage.setItem(USERS_KEY, JSON.stringify(allUsers));
  }
};

// Récupérer tous les users stockés
export const getStoredUsers = () => {
  try {
    const users = localStorage.getItem(USERS_KEY);
    return users ? JSON.parse(users) : [];
  } catch (error) {
    return [];
  }
};

// Sauvegarder un nouvel user
export const saveUser = (userData) => {
  const users = getStoredUsers();
  const newUser = {
    id: `user_${Date.now()}`,
    ...userData,
    createdAt: new Date().toISOString(),
    profile: {
      bio: '',
      company: '',
      website: ''
    }
  };
  
  users.push(newUser);
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
  return newUser;
};

// Trouver un user par email
export const findUserByEmail = (email) => {
  const users = getStoredUsers();
  return users.find(user => user.email === email);
};

// Connecter un user
export const loginUser = (email, password) => {
  const user = findUserByEmail(email);
  
  if (user && user.password === password) {
    const userSession = {
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      bio: user.bio,
      company: user.company,
      phone: user.phone,
      createdAt: user.createdAt,
      myCards: user.myCards || [],
      favoriteCards: user.favoriteCards || []
    };
    
    localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(userSession));
    return userSession;
  }
  
  return null;
};

// Récupérer l'user connecté
export const getCurrentUser = () => {
  try {
    const user = localStorage.getItem(CURRENT_USER_KEY);
    return user ? JSON.parse(user) : null;
  } catch (error) {
    return null;
  }
};

// Déconnecter l'user
export const logoutUser = () => {
  localStorage.removeItem(CURRENT_USER_KEY);
  window.location.href = '/login';
};

// Supprimer l'user du localStorage
export const removeUser = () => {
  localStorage.removeItem(CURRENT_USER_KEY);
};

// Fonction pour empêcher la navigation accidentelle (sauf déconnexion volontaire)
export const setupNavigationProtection = () => {
  const handleBeforeUnload = (event) => {
    const user = getCurrentUser();
    if (user) {
      event.preventDefault();
      event.returnValue = '';
      return '';
    }
  };

  // Protection contre fermeture accidentelle
  window.addEventListener('beforeunload', handleBeforeUnload);
  
  return () => {
    window.removeEventListener('beforeunload', handleBeforeUnload);
  };
};

// Verify si un email existe déjà
export const emailExists = (email) => {
  return findUserByEmail(email) !== undefined;
};

// Mettre à jour le profil user
export const updateUserProfile = (profileData) => {
  const currentUser = getCurrentUser();
  if (!currentUser) return null;

  const users = getStoredUsers();
  const userIndex = users.findIndex(user => user.id === currentUser.id);
  
  if (userIndex !== -1) {
    // Mettre à jour l'user dans la liste complète
    users[userIndex] = { ...users[userIndex], ...profileData };
    localStorage.setItem(USERS_KEY, JSON.stringify(users));
    
    // Mettre à jour la session courante
    const updatedUser = { ...currentUser, ...profileData };
    localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(updatedUser));
    
    return updatedUser;
  }
  
  return null;
};

// Obtenir les statistiques des users
export const getUserStats = () => {
  const users = getStoredUsers();
  return {
    total: users.length,
    businessUsers: users.filter(user => user.role === 'business').length,
    regularUsers: users.filter(user => user.role === 'user').length,
    testUsers: TEST_USERS.length
  };
};
