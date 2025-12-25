import { createContext, useState, useEffect } from 'react';
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
        } else {
          // Pas d'utilisateur sauvegardé, s'assurer que user est null
          setUser(null);
        }
      } catch (error) {
        // Auth initialization error handled silently
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    // Use setTimeout to ensure this runs after initial render
    const timer = setTimeout(() => {
      initializeAuth();
    }, 0);

    return () => clearTimeout(timer);
  }, []);

  const login = async (email, password) => {
    try {
      setError(null);
      setLoading(true);

      const response = await axios.post(`${AUTH_CONFIG.API_URL}/auth/login`, {
        email,
        password
      }, {
        timeout: 10000 // 10 seconds timeout
      });

      if (response.data.success) {
        // Créer les données utilisateur avec le rôle correct
        const userData = {
          id: response.data.user?.id || 'user-id',
          email: response.data.user?.email || email,
          firstName: response.data.user?.firstName || 'Test',
          lastName: response.data.user?.lastName || 'User',
          role: response.data.user?.role || 'user', // CRITIQUE: S'assurer que le rôle est défini
          token: response.data.token
        };

        // Sauvegarder dans localStorage
        safeSetItem(AUTH_CONFIG.STORAGE_KEY, userData);
        
        // Configurer le token axios
        axios.defaults.headers.common['Authorization'] = `Bearer ${userData.token}`;
        
        // CRITIQUE: Mettre à jour l'état React IMMÉDIATEMENT avec force update
        const userWithTimestamp = { ...userData, _timestamp: Date.now() };
        setUser(userWithTimestamp);
        
        // Force un re-render supplémentaire pour garantir la mise à jour
        setTimeout(() => setUser(prev => ({ ...prev, _forceUpdate: Date.now() })), 50);
        
        return { success: true, user: userData };
      }

      throw new Error(response.data.message || 'Erreur de connexion');
    } catch (error) {
      let errorMessage;
      if (error.code === 'ECONNABORTED' || error.message.includes('timeout')) {
        errorMessage = 'Délai d\'attente dépassé. Vérifiez votre connexion internet.';
      } else if (!error.response) {
        errorMessage = 'Erreur de connexion au serveur. Vérifiez votre connexion internet.';
      } else {
        errorMessage = handleAuthError(error);
      }
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

      const response = await axios.post(`${AUTH_CONFIG.API_URL}/auth/register`, userData, {
        timeout: 10000 // 10 seconds timeout
      });

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
      let errorMessage;
      if (error.code === 'ECONNABORTED' || error.message.includes('timeout')) {
        errorMessage = 'Délai d\'attente dépassé. Vérifiez votre connexion internet.';
      } else if (!error.response) {
        errorMessage = 'Erreur de connexion au serveur. Vérifiez votre connexion internet.';
      } else {
        errorMessage = handleAuthError(error);
      }
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
      
      return { success: true };
    } catch (error) {
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
