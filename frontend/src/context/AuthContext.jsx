import React, { createContext, useContext, useState, useEffect } from 'react';
import { authAPI } from '../api/auth';
import toast from 'react-hot-toast';

const AuthContext = createContext();

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
  const [error, setError] = useState(null);

  // Check if user is logged in on app start
  useEffect(() => {
    const checkAuth = async () => {
      console.log('🔍 Checking auth on startup...');
      try {
        const token = localStorage.getItem('token');
        const savedUser = localStorage.getItem('user');
        
        console.log('📦 Found in localStorage:', { 
          hasToken: !!token, 
          hasUser: !!savedUser,
          token: token?.substring(0, 20) + '...',
          user: savedUser ? JSON.parse(savedUser).email : null
        });
        
        if (token && savedUser) {
          // Restore user from localStorage
          const userData = JSON.parse(savedUser);
          console.log('✅ Restoring user:', userData.email);
          setUser(userData);
          
          // Optionally verify token with backend (but don't fail if it doesn't work)
          try {
            const verifiedUser = await authAPI.verifyToken();
            if (verifiedUser) {
              console.log('🔄 Token verified, updating user data');
              setUser(verifiedUser);
              localStorage.setItem('user', JSON.stringify(verifiedUser));
            }
          } catch (verifyError) {
            // Keep the saved user even if verification fails - NEVER auto-logout
            console.log('⚠️ Token verification failed, using saved user data');
          }
        } else {
          console.log('❌ No saved auth data found');
        }
      } catch (error) {
        console.error('❌ Auth check failed:', error);
        // Don't remove tokens on error - keep user logged in
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  const login = async (email, password) => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await authAPI.login(email, password);
      
      // Store tokens and user data
      console.log('💾 Saving login data to localStorage:', response.user.email);
      localStorage.setItem('token', response.token);
      localStorage.setItem('user', JSON.stringify(response.user));
      if (response.refreshToken) {
        localStorage.setItem('refreshToken', response.refreshToken);
      }
      
      // Verify storage worked
      const savedToken = localStorage.getItem('token');
      const savedUser = localStorage.getItem('user');
      console.log('✅ Verification - Saved successfully:', { 
        hasToken: !!savedToken, 
        hasUser: !!savedUser 
      });
      
      setUser(response.user);
      toast.success(`Welcome ${response.user.firstName}!`);
      return response;
    } catch (error) {
      setError(error.message);
      toast.error(error.message || 'Connection error');
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const register = async (userData) => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await authAPI.register(userData);
      
      // Store tokens and user data
      console.log('💾 Saving registration data to localStorage:', response.user.email);
      localStorage.setItem('token', response.token);
      localStorage.setItem('user', JSON.stringify(response.user));
      if (response.refreshToken) {
        localStorage.setItem('refreshToken', response.refreshToken);
      }
      
      // Verify storage worked
      const savedToken = localStorage.getItem('token');
      const savedUser = localStorage.getItem('user');
      console.log('✅ Verification - Saved successfully:', { 
        hasToken: !!savedToken, 
        hasUser: !!savedUser 
      });
      
      setUser(response.user);
      toast.success('Compte créé avec succès !');
      return response;
    } catch (error) {
      setError(error.message);
      toast.error(error.message || 'Erreur lors de l\'inscription');
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      console.log('🚪 Logging out user:', user?.email);
      await authAPI.logout();
      toast.success('Logout successful');
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      // Clear local storage and state regardless of API call success
      console.log('🧹 Clearing localStorage and user state');
      localStorage.removeItem('token');
      localStorage.removeItem('refreshToken');
      localStorage.removeItem('user');
      setUser(null);
      setError(null);
    }
  };

  const updateProfile = async (profileData) => {
    try {
      setLoading(true);
      const updatedUser = await authAPI.updateProfile(profileData);
      setUser(updatedUser);
      toast.success('Profil mis à jour !');
      return updatedUser;
    } catch (error) {
      setError(error.message);
      toast.error(error.message || 'Erreur de mise à jour');
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const refreshToken = async () => {
    try {
      const refreshToken = localStorage.getItem('refreshToken');
      if (!refreshToken) {
        throw new Error('No refresh token available');
      }
      
      const response = await authAPI.refreshToken(refreshToken);
      localStorage.setItem('token', response.token);
      
      return response.token;
    } catch (error) {
      // If refresh fails, logout user
      logout();
      throw error;
    }
  };

  const value = {
    user,
    loading,
    error,
    login,
    register,
    logout,
    updateProfile,
    refreshToken,
    isAuthenticated: !!user,
    isAdmin: user?.role === 'admin',
    isBusiness: user?.role === 'business' || user?.role === 'admin',
    clearError: () => setError(null)
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
