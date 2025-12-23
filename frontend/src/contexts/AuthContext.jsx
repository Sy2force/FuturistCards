import React, { createContext, useState, useEffect } from 'react';
import { safeGetItem, safeSetItem, safeRemoveItem } from '../utils/safeStorage';
import { AUTH_CONFIG, createUserData, handleAuthError } from '../utils/auth.helpers';
import axios from 'axios';

const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const initializeAuth = async () => {
      try {
        setLoading(true);
        
        // Charger l'utilisateur depuis le localStorage au démarrage
        const savedUser = safeGetItem(AUTH_CONFIG.STORAGE_KEY);
        if (savedUser?.token) {
          // Vérifier que le token est valide et décoder le rôle
          try {
            const tokenPayload = JSON.parse(atob(savedUser.token.split('.')[1]));
            const userData = {
              ...savedUser,
              role: tokenPayload.role || savedUser.role,
              id: tokenPayload.id || savedUser.id
            };
            
            setUser(userData);
            // Configurer le token axios
            axios.defaults.headers.common['Authorization'] = `Bearer ${savedUser.token}`;
          } catch (tokenError) {
            // Token invalide, supprimer
            safeRemoveItem(AUTH_CONFIG.STORAGE_KEY);
            setUser(null);
          }
        }
      } catch (error) {
        // Auth initialization error handled silently
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    initializeAuth();
  }, []);

  const login = async (email, password) => {
    try {
      setError(null);
      setLoading(true);

      const response = await axios.post(`${AUTH_CONFIG.API_URL}/auth/login`, {
        email,
        password
      });

      if (response.data.success) {
        const userData = createUserData(response.data.user, { email, token: response.data.token });

        // Sauvegarder dans localStorage
        safeSetItem(AUTH_CONFIG.STORAGE_KEY, userData);
        
        // Configurer le token axios
        axios.defaults.headers.common['Authorization'] = `Bearer ${userData.token}`;
        
        setUser(userData);
        return { success: true, user: userData };
      }

      throw new Error(response.data.message || 'Erreur de connexion');
    } catch (error) {
      const errorMessage = handleAuthError(error);
      setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setLoading(false);
    }
  };

  const register = async (userData) => {
    try {
      setError(null);
      setLoading(true);

      const response = await axios.post(`${AUTH_CONFIG.API_URL}/auth/register`, userData);

      if (response.data.success) {
        const newUser = createUserData(response.data.user, { ...userData, token: response.data.token });

        // Auto-login après inscription
        safeSetItem(AUTH_CONFIG.STORAGE_KEY, newUser);
        axios.defaults.headers.common['Authorization'] = `Bearer ${newUser.token}`;
        setUser(newUser);

        return { success: true, user: newUser };
      }

      throw new Error(response.data.message || 'Erreur d\'inscription');
    } catch (error) {
      const errorMessage = handleAuthError(error);
      setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    try {
      // Supprimer le token axios
      delete axios.defaults.headers.common['Authorization'];
      
      // Supprimer du localStorage
      safeRemoveItem(AUTH_CONFIG.STORAGE_KEY);
      
      // Reset immédiat de l'état
      setUser(null);
      setError(null);
      setLoading(false);
      
      // 🔥 REDIRECTION FORCÉE ET IMMÉDIATE
      window.location.href = "/";
      
      return { success: true };
    } catch (error) {
      // Même en cas d'erreur, forcer la redirection
      window.location.href = "/";
      return { success: false, error: 'Erreur de déconnexion' };
    }
  };

  const updateUser = (updatedUserData) => {
    try {
      const updatedUser = { ...user, ...updatedUserData };
      safeSetItem(AUTH_CONFIG.STORAGE_KEY, updatedUser);
      setUser(updatedUser);
      return { success: true, user: updatedUser };
    } catch (error) {
      setError('Erreur lors de la mise à jour du profil');
      return { success: false, error: 'Erreur de mise à jour' };
    }
  };

  const clearError = () => {
    setError(null);
  };

  const value = {
    user,
    loading,
    error,
    login,
    register,
    logout,
    updateUser,
    clearError,
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

export { AuthProvider };
export default AuthContext;
