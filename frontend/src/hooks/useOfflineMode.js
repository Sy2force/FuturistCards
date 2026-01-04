import React, { useState, useEffect, createContext, useContext } from 'react';
import offlineService from '../services/offlineService';
import { t } from '../utils/translations';

const OfflineModeContext = createContext();

export const useOfflineMode = () => {
  const context = useContext(OfflineModeContext);
  if (!context) {
    throw new Error(t('common.contextError'));
  }
  return context;
};

export const OfflineModeProvider = ({ children }) => {
  const [isOffline, setIsOffline] = useState(false);
  const [offlineData, setOfflineData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [networkStatus, setNetworkStatus] = useState('online');
  const [lastSync, setLastSync] = useState(null);

  useEffect(() => {
    const handleOnline = () => {
      setNetworkStatus('online');
      setIsOffline(false);
      syncOfflineData();
    };

    const handleOffline = () => {
      setNetworkStatus('offline');
      setIsOffline(true);
    };

    const setupListeners = () => {
      window.addEventListener('online', handleOnline);
      window.addEventListener('offline', handleOffline);
      setNetworkStatus(navigator.onLine ? 'online' : 'offline');
      setIsOffline(!navigator.onLine);
    };

    initializeOfflineMode();
    setupListeners();
    
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);


  const initializeOfflineMode = async () => {
    try {
      setLoading(true);
      
      const config = offlineService.getOfflineConfig();
      const cachedData = offlineService.getCachedData();
      
      setOfflineData(cachedData);
      setLastSync(config.lastSync || null);
      
      if (!navigator.onLine) {
        setIsOffline(true);
        setNetworkStatus('offline');
      } else {
        const healthCheck = await offlineService.healthCheck();
        if (healthCheck.success) {
          setIsOffline(false);
          setNetworkStatus('online');
        }
      }
      
    } catch (error) {
      setIsOffline(true);
      setNetworkStatus('offline');
    } finally {
      setLoading(false);
    }
  };

  const syncOfflineData = async () => {
    try {
      const result = await offlineService.syncData();
      if (result.success) {
        setLastSync(new Date().toISOString());
        setOfflineData(result.data);
      }
    } catch (error) {
      // Sync failed silently
    }
  };

  const toggleOfflineMode = async () => {
    const newOfflineState = !isOffline;
    setIsOffline(newOfflineState);
    
    if (newOfflineState) {
      // Switching to offline mode
      await offlineService.cacheCurrentData();
    } else {
      // Switching to online mode
      await syncOfflineData();
    }
  };

  const refreshOfflineData = async () => {
    if (isOffline) {
      const cachedData = offlineService.getCachedData();
      setOfflineData(cachedData);
    } else {
      await syncOfflineData();
    }
  };

  const clearOfflineData = () => {
    offlineService.clearCache();
    setOfflineData(null);
    setLastSync(null);
  };

  const value = {
    isOffline,
    offlineData,
    loading,
    networkStatus,
    lastSync,
    toggleOfflineMode,
    refreshOfflineData,
    clearOfflineData,
    syncOfflineData,
    offlineService
  };

  return React.createElement(
    OfflineModeContext.Provider,
    { value: value },
    children
  );
};

export default useOfflineMode;
