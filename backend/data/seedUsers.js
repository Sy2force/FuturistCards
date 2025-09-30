// Seed data pour les comptes de test - FuturistCards HackerU 2025
// 6 comptes prêts à l'emploi pour tester les rôles

import bcrypt from 'bcryptjs';

/**
 * Comptes de test pour validation des rôles
 * 3 rôles différents avec 2 comptes chacun
 */
export const seedUsers = [
  // COMPTES USER (consultation uniquement)
  {
    firstName: 'Simple',
    lastName: 'User',
    email: 'user@futuristcards.com',
    password: 'User123!',
    role: 'user',
    isActive: true,
  },
  {
    firstName: 'Test',
    lastName: 'Utilisateur',
    email: 'testuser@futuristcards.com',
    password: 'TestUser123!',
    role: 'user',
    isActive: true,
  },
  
  // COMPTES BUSINESS (CRUD cartes)
  {
    firstName: 'Business',
    lastName: 'Owner',
    email: 'business@futuristcards.com',
    password: 'Business123!',
    role: 'business',
    isActive: true
  },
  {
    firstName: 'Demo',
    lastName: 'Business',
    email: 'demo@futuristcards.com',
    password: 'Demo123!',
    role: 'business',
    isActive: true
  },
  
  // COMPTES ADMIN (toutes permissions)
  {
    firstName: 'Super',
    lastName: 'Admin',
    email: 'admin@futuristcards.com',
    password: 'Admin123!',
    role: 'admin',
    isActive: true
  },
  {
    firstName: 'System',
    lastName: 'Administrator',
    email: 'superadmin@futuristcards.com',
    password: 'SuperAdmin123!',
    role: 'admin',
    isActive: true
  }
];

/**
 * Fonction pour hasher les mots de passe avant insertion
 */
const hashPasswords = async (users) => {
  const hashedUsers = [];
  
  for (const user of users) {
    const hashedPassword = await bcrypt.hash(user.password, 12);
    hashedUsers.push({
      ...user,
      password: hashedPassword
    });
  }
  
  return hashedUsers;
};

/**
 * Fonction pour obtenir les informations de connexion
 */
export const getLoginCredentials = () => {
  return {
    user: {
      email: 'user@futuristcards.com',
      password: 'User123!',
      role: 'user',
      permissions: ['view_cards', 'add_favorites', 'view_profile']
    },
    business: {
      email: 'business@futuristcards.com', 
      password: 'Test123!',
      role: 'business',
      permissions: ['view_cards', 'add_favorites', 'view_profile', 'create_cards', 'edit_own_cards', 'delete_own_cards']
    },
    admin: {
      email: 'admin@futuristcards.com',
      password: 'Test123!',
      role: 'admin',
      permissions: ['all_permissions', 'manage_users', 'view_admin_dashboard', 'edit_any_card', 'delete_any_card']
    }
  };
};

export default { seedUsers, hashSeedPasswords, getLoginCredentials };
