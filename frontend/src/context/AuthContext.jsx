import { createContext, useContext, useState, useEffect } from 'react';
import { t } from '../utils/translations';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth חייב להיות בשימוש בתוך AuthProvider');
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
  const [error, setError] = useState('');

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


  const clearError = () => {
    setError('');
  };

  const login = async (email, password) => {
    setLoading(true);
    setError('');
    try {
      if (!email || !password) {
        throw new Error(t('auth.emailPasswordRequired'));
      }
      
      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || 'Login failed');
      }

      if (data.success && data.user && data.token) {
        // Transform API user data to match frontend expectations
        const transformedUser = {
          ...data.user,
          firstName: data.user.name?.split(' ')[0] || data.user.firstName || 'User',
          lastName: data.user.name?.split(' ').slice(1).join(' ') || data.user.lastName || ''
        };
        
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(transformedUser));
        
        setUser(transformedUser);
        window.dispatchEvent(new Event('userChanged'));
        
        return { success: true, user: transformedUser };
      } else {
        throw new Error(data.message || 'Login failed');
      }
    } catch (error) {
      setError(error.message || 'Login failed');
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const register = async (userData) => {
    setLoading(true);
    setError('');
    try {
      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || 'Registration failed');
      }

      if (data.success && data.user && data.token) {
        // Transform API user data to match frontend expectations
        const transformedUser = {
          ...data.user,
          firstName: data.user.name?.split(' ')[0] || userData.firstName || 'User',
          lastName: data.user.name?.split(' ').slice(1).join(' ') || userData.lastName || ''
        };
        
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(transformedUser));
        
        setUser(transformedUser);
        window.dispatchEvent(new Event('userChanged'));
        
        return { success: true, user: transformedUser };
      } else {
        throw new Error(data.message || 'Registration failed');
      }
    } catch (error) {
      setError(error.message || 'Registration failed');
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

  // Utility functions to check permissions
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
    error,
    clearError,
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
