import { createContext, useContext, useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import apiService from '../services/api';

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

  // Fonction pour valider les tokens JWT réels
  const validateToken = async (token) => {
    if (!token) return null;
    
    try {
      // Vérifier le token avec l'API
      const response = await apiService.getProfile();
      if (response.success && response.user) {
        return response.user;
      }
      return null;
    } catch (error) {
      // Token validation failed - clear invalid data
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      return null;
    }
  };

  useEffect(() => {
    const initAuth = async () => {
      const savedToken = localStorage.getItem('token');
      
      if (savedToken) {
        try {
          // Valider le token avec l'API
          const userData = await validateToken(savedToken);
          if (userData) {
            setUser(userData);
            setToken(savedToken);
            localStorage.setItem('user', JSON.stringify(userData));
          } else {
            // Token invalide - nettoyer
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            setUser(null);
            setToken(null);
          }
        } catch (error) {
          // Erreur de validation - nettoyer
          localStorage.removeItem('token');
          localStorage.removeItem('user');
          setUser(null);
          setToken(null);
        }
      }
      setLoading(false);
    };

    initAuth();
  }, []);


  // Fonction de connexion - API MongoDB réelle
  const login = async (email, password) => {
    setLoading(true);
    try {
      // Validation email et mot de passe
      if (!email || !password) {
        throw new Error('Email et mot de passe requis');
      }
      
      // Appel API MongoDB réel
      const response = await apiService.login({ email, password });
      
      if (response.success) {
        // Le backend retourne les données dans response.data
        const userData = response.data?.user || response.user;
        const token = response.data?.token || response.token;
        
        if (!userData || !token) {
          throw new Error('Données de connexion incomplètes');
        }
        
        // Stocker les données réelles du backend
        localStorage.setItem('user', JSON.stringify(userData));
        localStorage.setItem('token', token);
        
        setUser(userData);
        setToken(token);
        
        toast.success('Connexion réussie !');
        return { success: true, user: userData };
      } else {
        throw new Error(response.message || 'Erreur de connexion');
      }
      
    } catch (error) {
      // Enhanced error handling with network detection
      let errorMessage = 'Erreur de connexion';
      
      if (error.code === 'NETWORK_ERROR' || error.message?.includes('Network Error')) {
        errorMessage = 'Impossible de se connecter au serveur. Vérifiez votre connexion internet.';
      } else if (error.response?.status === 401) {
        errorMessage = 'Email ou mot de passe incorrect';
      } else if (error.response?.status === 429) {
        errorMessage = 'Trop de tentatives de connexion. Veuillez réessayer plus tard.';
      } else if (error.response?.data?.message) {
        errorMessage = error.response.data.message;
      } else if (error.message) {
        errorMessage = error.message;
      }
      
      toast.error(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const register = async (userData) => {
    setLoading(true);
    try {
      // Appel API MongoDB réel pour l'inscription
      const response = await apiService.register(userData);
      
      if (response.success) {
        toast.success('Compte créé avec succès ! Vous pouvez maintenant vous connecter.');
        return { success: true, user: response.data?.user || response.user };
      } else {
        throw new Error(response.message || 'Erreur lors de la création du compte');
      }
    } catch (error) {
      // Enhanced error handling for registration
      let errorMessage = 'Erreur lors de la création du compte';
      
      if (error.code === 'NETWORK_ERROR' || error.message?.includes('Network Error')) {
        errorMessage = 'Impossible de se connecter au serveur. Vérifiez votre connexion internet.';
      } else if (error.response?.status === 409) {
        errorMessage = 'Un compte avec cet email existe déjà';
      } else if (error.response?.status === 400) {
        errorMessage = error.response.data?.message || 'Données invalides';
      } else if (error.response?.data?.message) {
        errorMessage = error.response.data.message;
      } else if (error.message) {
        errorMessage = error.message;
      }
      
      toast.error(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  // Connexion démo rapide
  const loginDemo = async (userType = 'business') => {
    setLoading(true);
    try {
      const demoCredentials = {
        business: {
          email: 'testpro@example.com',
          password: 'TestPass123!'
        },
        user: {
          email: 'testnormal@example.com', 
          password: 'TestPass123!'
        }
      };

      const credentials = demoCredentials[userType];
      if (!credentials) {
        throw new Error('Type d\'utilisateur démo invalide');
      }

      const result = await login(credentials.email, credentials.password);
      toast.success(`Connecté en mode démo ${userType === 'business' ? 'Pro' : 'Utilisateur'} !`);
      return result;
    } catch (error) {
      toast.error('Erreur de connexion démo: ' + error.message);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('token');
    localStorage.removeItem('user');
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
      // Mise à jour réelle via l'API backend MongoDB
      const response = await apiService.updateProfile(profileData);
      
      if (response.success) {
        const updatedUser = { ...user, ...response.user };
        setUser(updatedUser);
        localStorage.setItem('user', JSON.stringify(updatedUser));
        
        toast.success('Profil mis à jour avec succès !');
        return { success: true };
      } else {
        throw new Error(response.message || 'Erreur lors de la mise à jour du profil');
      }
    } catch (error) {
      // Enhanced error handling for profile update
      let errorMessage = 'Erreur lors de la mise à jour du profil';
      
      if (error.code === 'NETWORK_ERROR' || error.message?.includes('Network Error')) {
        errorMessage = 'Impossible de se connecter au serveur. Vérifiez votre connexion internet.';
      } else if (error.response?.status === 401) {
        errorMessage = 'Session expirée. Veuillez vous reconnecter.';
        // Auto logout on 401
        logout();
      } else if (error.response?.status === 400) {
        errorMessage = error.response.data?.message || 'Données invalides';
      } else if (error.response?.data?.message) {
        errorMessage = error.response.data.message;
      } else if (error.message) {
        errorMessage = error.message;
      }
      
      toast.error(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const value = {
    user,
    loading,
    login,
    loginDemo,
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
