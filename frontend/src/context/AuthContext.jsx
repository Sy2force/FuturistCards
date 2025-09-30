import React, { createContext, useState, useContext, useEffect } from 'react';
import api from '../services/api';

const AuthContext = createContext();

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [, setToken] = useState(localStorage.getItem('token'));

  useEffect(() => {
    // Retrieve user from localStorage on startup
    const savedUser = localStorage.getItem('user');
    const savedToken = localStorage.getItem('token');
    const tokenExpiry = localStorage.getItem('tokenExpiry');
    
    if (savedUser && savedToken) {
      try {
        // Check if token is not expired
        if (tokenExpiry && Date.now() < parseInt(tokenExpiry)) {
          setUser(JSON.parse(savedUser));
          setToken(savedToken);
        } else {
          // Token expired, clean up
          localStorage.removeItem('user');
          localStorage.removeItem('token');
          localStorage.removeItem('tokenExpiry');
        }
      } catch (error) {
        // If it doesn't work, clean up
        localStorage.removeItem('user');
        localStorage.removeItem('token');
        localStorage.removeItem('tokenExpiry');
      }
    }
    setLoading(false);
  }, []);

  // Simplified login function for development
  const login = async (email, password) => {
    setLoading(true);
    try {
      // Basic validation
      if (!email || !password) {
        throw new Error('Email and password are required');
      }

      // Email format validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        throw new Error('Invalid email format');
      }

      // Password length validation
      if (password.length < 6) {
        throw new Error('Password must be at least 6 characters long');
      }

      // Create mock user based on email
      const userData = {
        id: '507f1f77bcf86cd799439015',
        email: email,
        firstName: email.split('@')[0].charAt(0).toUpperCase() + email.split('@')[0].slice(1),
        lastName: 'User',
        role: userData.role || 'user'
      };

      // Create simple token for development
      const mockToken = `mock-jwt-token-${userData.role}`;
      
      // Save to localStorage
      localStorage.setItem('token', mockToken);
      localStorage.setItem('user', JSON.stringify(userData));
      localStorage.setItem('tokenExpiry', (Date.now() + (30 * 24 * 60 * 60 * 1000)).toString()); // 30 days
      
      setUser(userData);
      setToken(mockToken);
      
      return { user: userData, token: mockToken };
    } catch (error) {
      throw new Error(error.message || 'Login error');
    } finally {
      setLoading(false);
    }
  };

  const register = async (userData) => {
    try {
      // Mock mode: create user based on provided data
      const mockUser = {
        id: `mock-${userData.role || 'user'}-${Date.now()}`,
        firstName: userData.firstName || 'New',
        lastName: userData.lastName || 'User',
        email: userData.email,
        role: userData.role || 'user',
        createdAt: new Date().toISOString()
      };

      const mockToken = `mock-jwt-token-${mockUser.role}`;
      
      setUser(mockUser);
      setToken(mockToken);
      localStorage.setItem('token', mockToken);
      localStorage.setItem('user', JSON.stringify(mockUser));
      
      return { success: true, user: mockUser };
    } catch (error) {
      return { 
        success: false, 
        message: 'Registration failed' 
      };
    }
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('tokenExpiry');
  };

  // Fonctions utilitaires pour vérifier les permissions
  const hasRole = (requiredRole) => user?.role === requiredRole;
  const hasAnyRole = (roles) => roles.includes(user?.role);
  const canCreateCards = () => hasAnyRole(['business', 'admin']);
  const canAccessAdmin = () => hasRole('admin');
  const canEditCard = (cardUserId) => {
    if (!user) return false;
    if (user.role === 'admin') return true;
    return user.id === cardUserId;
  };

  const updateProfile = async (profileData) => {
    try {
      const updatedUser = { ...user, ...profileData };
      setUser(updatedUser);
      localStorage.setItem('user', JSON.stringify(updatedUser));
      return { success: true };
    } catch (error) {
      throw new Error('Profile update failed');
    }
  };

  const value = {
    user,
    loading,
    login,
    register,
    logout,
    updateProfile,
    isAuthenticated: !!user,
    isAdmin: user?.role === 'admin',
    isBusiness: user?.role === 'business' || user?.role === 'admin',
    isUser: user?.role === 'user',
    // Fonctions utilitaires
    hasRole,
    hasAnyRole,
    canCreateCards,
    canAccessAdmin,
    canEditCard,
    // Permissions par rôle
    permissions: {
      canViewCards: true,
      canAddFavorites: !!user,
      canCreateCards: canCreateCards(),
      canAccessAdmin: canAccessAdmin(),
      canEditAnyCard: hasRole('admin'),
      canDeleteAnyCard: hasRole('admin')
    }
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
