import { useState, useEffect, useRef, useCallback } from 'react';
import { useAuth } from '../context/AuthContext';
import apiService from '../services/api';

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
  const intervalRef = useRef(null);

  // Function to calculate real-time stats
  const calculateRealTimeStats = useCallback(async () => {
    try {
      if (!user) return;

      const response = await apiService.getStats();
      if (response && response.stats) {
        setStats(response.stats);
        if (response.recentActivities) {
          setRecentActivities(response.recentActivities);
        }
        return response.stats;
      }
    } catch (apiError) {
      console.warn('Failed to fetch stats from API', apiError);
    }
  }, [user]);

  // Listen to favorite events for immediate UI updates
  useEffect(() => {
    const handleFavoriteToggle = (event) => {
      // Refresh stats when a favorite is toggled
      calculateRealTimeStats();
    };

    window.addEventListener('favoriteToggled', handleFavoriteToggle);
    
    return () => {
      window.removeEventListener('favoriteToggled', handleFavoriteToggle);
    };
  }, [calculateRealTimeStats]);

  // Polling for real-time updates
  const initializeRealTimeConnection = useCallback(() => {
    setIsConnected(true);
    
    // Update stats every 30 seconds to avoid API overloading
    intervalRef.current = setInterval(() => {
      calculateRealTimeStats();
    }, 30000);
  }, [calculateRealTimeStats]);

  // Function to manually refresh (can be used for "simulate" actions if needed, but now just refreshes)
  const simulateActivity = (type, data) => {
    // In a real app, this would trigger an event or just refresh data
    // For now, we just refresh the data from the server
    calculateRealTimeStats();
  };

  useEffect(() => {
    if (user && user.role === 'admin') {
      // Initial calculation
      calculateRealTimeStats();
      
      // Initialize real-time connection
      initializeRealTimeConnection();
      
      return () => {
        if (intervalRef.current) {
          clearInterval(intervalRef.current);
        }
        setIsConnected(false);
      };
    }
  }, [user, calculateRealTimeStats, initializeRealTimeConnection]);

  // Cleanup on unmount
  useEffect(() => {
    const currentInterval = intervalRef.current;
    
    return () => {
      if (currentInterval) {
        clearInterval(currentInterval);
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
