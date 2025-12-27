import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('user');
    try {
      return savedUser ? JSON.parse(savedUser) : null;
    } catch {
      return null;
    }
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const handleUserChanged = () => {
      const savedUser = localStorage.getItem('user');
      try {
        setUser(savedUser ? JSON.parse(savedUser) : null);
      } catch {
        setUser(null);
      }
    };

    window.addEventListener('userChanged', handleUserChanged);
    return () => window.removeEventListener('userChanged', handleUserChanged);
  }, []);


  const login = async (email, password) => {
    setLoading(true);
    try {
      if (!email || !password) {
        throw new Error('Email et mot de passe requis');
      }
      
      // Simple login simulation for tests
      let role = 'user';
      if (email.includes('admin')) {
        role = 'admin';
      } else if (email.includes('business') || email.includes('pro')) {
        role = 'business';
      }
      
      const userData = {
        id: '1',
        email: email,
        role: role,
        firstName: 'Test',
        lastName: 'User'
      };
      
      localStorage.setItem('token', 'fake-jwt-token');
      localStorage.setItem('user', JSON.stringify(userData));
      
      setUser(userData);
      
      window.dispatchEvent(new Event('userChanged'));
      
      return { success: true, user: userData };
    } catch (error) {
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const register = async (userData) => {
    setLoading(true);
    try {
      // Simple registration simulation
      return { success: true, user: userData };
    } catch (error) {
      throw error;
    } finally {
      setLoading(false);
    }
  };


  const logout = () => {
    setUser(null);
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    window.dispatchEvent(new Event('userChanged'));
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
    setLoading(true);
    try {
      const updatedUser = { ...user, ...profileData };
      setUser(updatedUser);
      localStorage.setItem('user', JSON.stringify(updatedUser));
      return { success: true };
    } catch (error) {
      throw error;
    } finally {
      setLoading(false);
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
    hasRole,
    hasAnyRole,
    canCreateCards,
    canAccessAdmin,
    canEditCard
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
