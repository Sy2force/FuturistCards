// User management system with localStorage
const USERS_KEY = 'futuristcards_users';
const CURRENT_USER_KEY = 'futuristcards_current_user';

// Pre-registered test users
const TEST_USERS = [
  {
    id: 'test-1',
    firstName: 'Jean',
    lastName: 'Dupont',
    email: 'jean.dupont@futuristcards.com',
    password: 'test123',
    bio: 'Passionate developer with 5 years of experience in React and Node.js',
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
    bio: 'Creative UX/UI designer specializing in modern interfaces',
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
    bio: 'Experienced project manager in digital fields',
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
    bio: 'Digital transformation consultant',
    company: 'Consulting Plus',
    phone: '06 11 22 33 44',
    createdAt: new Date('2023-04-05').toISOString(),
    myCards: ['card-4'],
    favoriteCards: []
  }
];

// Initialize test accounts if not already done
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

// Get all stored users
export const getStoredUsers = () => {
  try {
    const users = localStorage.getItem(USERS_KEY);
    return users ? JSON.parse(users) : [];
  } catch (error) {
    return [];
  }
};

// Save a new user
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

// Find user by email
export const findUserByEmail = (email) => {
  const users = getStoredUsers();
  return users.find(user => user.email === email);
};

// Login user
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

// Get current logged-in user
export const getCurrentUser = () => {
  try {
    const user = localStorage.getItem(CURRENT_USER_KEY);
    return user ? JSON.parse(user) : null;
  } catch (error) {
    return null;
  }
};

// Logout user
export const logoutUser = () => {
  localStorage.removeItem(CURRENT_USER_KEY);
  window.location.href = '/login';
};

// Remove user from localStorage
export const removeUser = () => {
  localStorage.removeItem(CURRENT_USER_KEY);
};

// Function to prevent accidental navigation (except voluntary logout)
export const setupNavigationProtection = () => {
  const handleBeforeUnload = (event) => {
    const user = getCurrentUser();
    if (user) {
      event.preventDefault();
      event.returnValue = '';
      return '';
    }
  };

  // Protection against accidental closure
  window.addEventListener('beforeunload', handleBeforeUnload);
  
  return () => {
    window.removeEventListener('beforeunload', handleBeforeUnload);
  };
};

// Verify if email already exists
export const emailExists = (email) => {
  return findUserByEmail(email) !== undefined;
};

// Update user profile
export const updateUserProfile = (profileData) => {
  const currentUser = getCurrentUser();
  if (!currentUser) return null;

  const users = getStoredUsers();
  const userIndex = users.findIndex(user => user.id === currentUser.id);
  
  if (userIndex !== -1) {
    // Update user in full list
    users[userIndex] = { ...users[userIndex], ...profileData };
    localStorage.setItem(USERS_KEY, JSON.stringify(users));
    
    // Update current session
    const updatedUser = { ...currentUser, ...profileData };
    localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(updatedUser));
    
    return updatedUser;
  }
  
  return null;
};

// Get user statistics
export const getUserStats = () => {
  const users = getStoredUsers();
  return {
    total: users.length,
    businessUsers: users.filter(user => user.role === 'business').length,
    regularUsers: users.filter(user => user.role === 'user').length,
    testUsers: TEST_USERS.length
  };
};
