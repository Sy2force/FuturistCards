import React, { createContext, useState, useContext, useEffect } from 'react';
import toast from 'react-hot-toast';
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

  // Fonction pour valider les tokens JWT réels
  const validateToken = async (token) => {
    if (!token) return null;
    
    try {
      // Vérifier le token avec l'API
      const response = await api.getProfile();
      if (response.success && response.user) {
        return response.user;
      }
      return null;
    } catch (error) {
      // Token validation failed
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      return null;
    }
  };

  useEffect(() => {
    const initAuth = async () => {
      // Récupérer le token au démarrage
      const savedToken = localStorage.getItem('token');
      
      if (savedToken) {
        setToken(savedToken);
        // Valider le token avec l'API MongoDB
        const validatedUser = await validateToken(savedToken);
        if (validatedUser) {
          setUser(validatedUser);
          localStorage.setItem('user', JSON.stringify(validatedUser));
        } else {
          // Token invalide, nettoyer le localStorage
          localStorage.removeItem('token');
          localStorage.removeItem('user');
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
      const response = await api.login({ email, password });
      
      if (response.success) {
        const { user: userData, token } = response;
        
        // Stocker les données réelles du backend
        localStorage.setItem('user', JSON.stringify(userData));
        localStorage.setItem('token', token);
        
        setUser(userData);
        setToken(token);
        
        toast.success('Connexion réussie !');
      } else {
        throw new Error(response.message || 'Erreur de connexion');
      }
      
    } catch (error) {
      const errorMessage = error.message || error.response?.data?.message || 'Erreur de connexion';
      toast.error(errorMessage);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const register = async (userData) => {
    setLoading(true);
    try {
      // Appel API MongoDB réel pour l'inscription
      const response = await api.register(userData);
      
      if (response.success) {
        toast.success('Compte créé avec succès ! Vous pouvez maintenant vous connecter.');
        return { success: true, user: response.user };
      } else {
        throw new Error(response.message || 'Erreur lors de la création du compte');
      }
    } catch (error) {
      const errorMessage = error.message || error.response?.data?.message || 'Erreur lors de la création du compte';
      toast.error(errorMessage);
      throw new Error(errorMessage);
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
      const response = await api.updateProfile(profileData);
      
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
      const errorMessage = error.response?.data?.message || error.message || 'Erreur lors de la mise à jour du profil';
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
