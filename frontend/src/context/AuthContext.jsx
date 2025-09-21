import React, { createContext, useContext, useState, useEffect } from 'react';

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
    // Restore user from localStorage on app start
    const savedUser = localStorage.getItem('user');
    const savedToken = localStorage.getItem('token');
    
    if (savedUser && savedToken) {
      try {
        setUser(JSON.parse(savedUser));
        setToken(savedToken);
      } catch (error) {
        // User logged in successfully
        localStorage.removeItem('user');
        localStorage.removeItem('token');
      }
    }
    setLoading(false);
  }, []);

  const login = async (email) => {
    try {
      // Mode mock : créer différents utilisateurs selon l'email
      let mockUser;
      if (email.includes('admin')) {
        mockUser = {
          id: 'mock-admin-001',
          firstName: 'Admin',
          lastName: 'Demo',
          email: 'admin@futuristcards.com',
          role: 'admin',
          createdAt: new Date().toISOString()
        };
      } else if (email.includes('business')) {
        mockUser = {
          id: 'mock-business-001',
          firstName: 'Business',
          lastName: 'User',
          email: 'business@futuristcards.com',
          role: 'business',
          createdAt: new Date().toISOString()
        };
      } else {
        mockUser = {
          id: 'mock-user-001',
          firstName: 'Regular',
          lastName: 'User',
          email: 'user@futuristcards.com',
          role: 'user',
          createdAt: new Date().toISOString()
        };
      }

      const mockToken = `mock-jwt-token-${mockUser.role}`;
      
      setUser(mockUser);
      setToken(mockToken);
      localStorage.setItem('token', mockToken);
      localStorage.setItem('user', JSON.stringify(mockUser));
      
      return { success: true, user: mockUser };
    } catch (error) {
      return { 
        success: false, 
        message: 'Login failed' 
      };
    }
  };

  const register = async (userData) => {
    try {
      // Mode mock : créer un utilisateur basé sur les données fournies
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
  };

  const value = {
    user,
    loading,
    login,
    register,
    logout,
    isAuthenticated: !!user,
    isAdmin: user?.role === 'admin',
    isBusiness: user?.role === 'business' || user?.role === 'admin'
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
