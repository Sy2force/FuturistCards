import { useState, useEffect, useRef, useCallback } from 'react';
import { useAuth } from '../context/AuthContext';

export const useRealTimeStats = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalCards: 0,
    businessUsers: 0,
    regularUsers: 0,
    adminUsers: 0,
    activeUsers: 0,
    totalLikes: 0,
    totalViews: 0,
    cardsToday: 0,
    usersToday: 0,
    likesToday: 0
  });
  const [recentActivities, setRecentActivities] = useState([]);
  const [isConnected, setIsConnected] = useState(false);
  const wsRef = useRef(null);
  const intervalRef = useRef(null);

  // Fonction pour calculer les statistiques en temps réel
  const calculateRealTimeStats = useCallback(() => {
    try {
      // Récupérer les données du localStorage
      const localCards = JSON.parse(localStorage.getItem('userCards') || '[]');
      const registeredUsers = JSON.parse(localStorage.getItem('registeredUsers') || '[]');
      const allFavorites = JSON.parse(localStorage.getItem('allFavorites') || '{}');
      
      // Calculer les statistiques
      const today = new Date().toDateString();
      const cardsToday = localCards.filter(card => 
        new Date(card.createdAt || Date.now()).toDateString() === today
      ).length;
      
      const usersToday = registeredUsers.filter(user => 
        new Date(user.createdAt || Date.now()).toDateString() === today
      ).length;
      
      // Compter les likes totaux
      let totalLikes = 0;
      let likesToday = 0;
      Object.values(allFavorites).forEach(userFavorites => {
        if (Array.isArray(userFavorites)) {
          totalLikes += userFavorites.length;
          // Pour les likes d'aujourd'hui, on simule avec un pourcentage
          likesToday += Math.floor(userFavorites.length * 0.1);
        }
      });
      
      // Compter les utilisateurs par rôle
      const businessUsers = registeredUsers.filter(u => u.role === 'business').length;
      const adminUsers = registeredUsers.filter(u => u.role === 'admin').length;
      const regularUsers = registeredUsers.filter(u => u.role === 'user').length;
      
      // Simuler les vues totales
      const totalViews = localCards.reduce((sum, card) => sum + (card.views || Math.floor(Math.random() * 100)), 0);
      
      // Utilisateurs actifs (simulation basée sur les données récentes)
      const activeUsers = Math.floor(registeredUsers.length * 0.6);

      const newStats = {
        totalUsers: registeredUsers.length,
        totalCards: localCards.length,
        businessUsers,
        regularUsers,
        adminUsers,
        activeUsers,
        totalLikes,
        totalViews,
        cardsToday,
        usersToday,
        likesToday
      };

      setStats(newStats);
      return newStats;
    } catch (error) {
      return stats;
    }
  }, [stats]);

  // Fonction pour générer des activités récentes
  const generateRecentActivities = useCallback(() => {
    try {
      const localCards = JSON.parse(localStorage.getItem('userCards') || '[]');
      const registeredUsers = JSON.parse(localStorage.getItem('registeredUsers') || '[]');
      
      const activities = [];
      
      // Ajouter les cartes récentes
      localCards.slice(-5).forEach(card => {
        activities.push({
          id: `card-${card.id}`,
          type: 'card_created',
          message: `New card created: ${card.name || card.title || 'Untitled card'}`,
          timestamp: new Date(card.createdAt || Date.now()),
          user: card.createdBy || 'User',
          icon: 'card'
        });
      });
      
      // Ajouter les utilisateurs récents
      registeredUsers.slice(-3).forEach(user => {
        activities.push({
          id: `user-${user.id}`,
          type: 'user_registered',
          message: `New user registered: ${user.firstName} ${user.lastName}`,
          timestamp: new Date(user.createdAt || Date.now()),
          user: `${user.firstName} ${user.lastName}`,
          icon: 'user'
        });
      });
      
      // Simuler quelques likes récents
      for (let i = 0; i < 3; i++) {
        activities.push({
          id: `like-${Date.now()}-${i}`,
          type: 'card_liked',
          message: `Card received a new like`,
          timestamp: new Date(Date.now() - Math.random() * 3600000),
          user: 'User',
          icon: 'like'
        });
      }
      
      // Trier par timestamp (plus récent en premier)
      activities.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
      
      setRecentActivities(activities.slice(0, 10));
    } catch (error) {
      // Erreur lors de la génération des activités
    }
  }, []);

  // Écouter les événements de favoris
  useEffect(() => {
    const handleFavoriteToggle = (event) => {
      const { cardId, userId, isLiked, timestamp } = event.detail;
      
      // Ajouter l'activité à la liste des activités récentes
      setRecentActivities(prev => {
        const newActivity = {
          id: Date.now(),
          type: isLiked ? 'like' : 'unlike',
          cardId,
          userId,
          timestamp,
          message: isLiked ? 'Card added to favorites' : 'Card removed from favorites'
        };
        
        return [newActivity, ...prev.slice(0, 9)];
      });
      
      calculateRealTimeStats();
    };

    window.addEventListener('favoriteToggled', handleFavoriteToggle);
    
    return () => {
      window.removeEventListener('favoriteToggled', handleFavoriteToggle);
    };
  }, [calculateRealTimeStats]);

  // Simuler WebSocket pour les mises à jour en temps réel
  const initializeRealTimeConnection = useCallback(() => {
    setIsConnected(true);
    
    // Mettre à jour les statistiques toutes les 5 secondes
    intervalRef.current = setInterval(() => {
      calculateRealTimeStats();
      generateRecentActivities();
    }, 5000);
  }, [calculateRealTimeStats, generateRecentActivities]);

  // Fonction pour simuler une nouvelle activité
  const simulateActivity = (type, data) => {
    const activity = {
      id: `${type}-${Date.now()}`,
      type,
      message: data.message,
      timestamp: new Date(),
      user: data.user || 'User',
      icon: data.icon || type
    };
    
    setRecentActivities(prev => [activity, ...prev.slice(0, 9)]);
    calculateRealTimeStats();
  };

  useEffect(() => {
    if (user && user.role === 'admin') {
      // Calcul initial
      calculateRealTimeStats();
      generateRecentActivities();
      
      // Initialiser la connexion temps réel
      initializeRealTimeConnection();
      
      return () => {
        if (intervalRef.current) {
          clearInterval(intervalRef.current);
        }
        setIsConnected(false);
      };
    }
  }, [user, calculateRealTimeStats, generateRecentActivities, initializeRealTimeConnection]);

  // Nettoyer lors du démontage
  useEffect(() => {
    const currentInterval = intervalRef.current;
    const currentWs = wsRef.current;
    
    return () => {
      if (currentInterval) {
        clearInterval(currentInterval);
      }
      if (currentWs) {
        currentWs.close();
      }
    };
  }, []);

  return {
    stats,
    recentActivities,
    isConnected,
    simulateActivity,
    refreshStats: calculateRealTimeStats
  };
};

export default useRealTimeStats;
