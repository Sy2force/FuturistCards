import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useOfflineMode } from '../../hooks/useOfflineMode';
import { useTheme } from '../../contexts/ThemeContext';

const OfflineBanner = () => {
  const { t } = useTranslation();
  const { isDark } = useTheme();
  const { isOffline, networkStatus, lastSync, toggleOfflineMode, refreshOfflineData, isOnline } = useOfflineMode();
  const [showBanner, setShowBanner] = useState(false);
  const [wasOffline, setWasOffline] = useState(false);
  const [networkError, setNetworkError] = useState(false);

  useEffect(() => {
    const handleNetworkError = (event) => {
      if (event.detail?.type === 'network') {
        setNetworkError(true);
        setShowBanner(true);
      }
    };

    window.addEventListener('api-error', handleNetworkError);
    return () => window.removeEventListener('api-error', handleNetworkError);
  }, []);

  useEffect(() => {
    if (isOffline && !wasOffline) {
      setShowBanner(true);
      setWasOffline(true);
      setNetworkError(false);
    } else if (isOnline && wasOffline) {
      // Show reconnection message briefly
      setShowBanner(true);
      setNetworkError(false);
      setTimeout(() => {
        setShowBanner(false);
        setWasOffline(false);
      }, 3000);
    }
  }, [isOffline, isOnline, wasOffline]);

  if (!showBanner && !isOffline && networkStatus === 'online' && !networkError) return null;

  const formatLastSync = (timestamp) => {
    if (!timestamp) return t('offline.neverSynced');
    const date = new Date(timestamp);
    return date.toLocaleTimeString();
  };

  const getBannerColor = () => {
    if (networkError || networkStatus === 'offline') {
      return isDark 
        ? 'bg-red-900/80 border-red-700 text-red-200'
        : 'bg-red-100 border-red-300 text-red-800';
    }
    if (isOnline && wasOffline) {
      return isDark
        ? 'bg-green-900/80 border-green-700 text-green-200'
        : 'bg-green-100 border-green-300 text-green-800';
    }
    return isDark
      ? 'bg-yellow-900/80 border-yellow-700 text-yellow-200'
      : 'bg-yellow-100 border-yellow-300 text-yellow-800';
  };

  const getIcon = () => {
    if (networkError || networkStatus === 'offline') {
      return (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18.364 5.636l-12.728 12.728m0 0L12 12m-6.364 6.364L12 12m6.364-6.364L12 12" />
        </svg>
      );
    }
    if (isOnline && wasOffline) {
      return (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
        </svg>
      );
    }
    return (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    );
  };

  const getMessage = () => {
    if (networkError) {
      return t('offline.networkError') || 'Erreur de connexion au serveur';
    }
    if (networkStatus === 'offline') {
      return t('offline.networkOffline');
    }
    if (isOnline && wasOffline) {
      return t('offline.reconnected') || 'Connexion rétablie';
    }
    return t('offline.demoMode');
  };

  return (
    <div className={`${getBannerColor()} border-b px-4 py-3 text-center text-sm font-medium backdrop-blur-sm`}>
      <div className="flex items-center justify-center gap-3 flex-wrap">
        <div className="flex items-center gap-2">
          {getIcon()}
          <span>{getMessage()}</span>
        </div>
        
        {lastSync && (
          <span className="text-xs opacity-75">
            {t('offline.lastSync')}: {formatLastSync(lastSync)}
          </span>
        )}
        
        <div className="flex items-center gap-2">
          {networkStatus === 'online' && (
            <button
              onClick={refreshOfflineData}
              className={`px-3 py-1 ${isDark ? 'bg-blue-600 hover:bg-blue-700' : 'bg-blue-500 hover:bg-blue-600'} text-white rounded text-xs transition-colors flex items-center gap-1`}
            >
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
              {t('offline.refresh')}
            </button>
          )}
          
          <button
            onClick={toggleOfflineMode}
            className={`px-3 py-1 ${isDark ? 'bg-gray-600 hover:bg-gray-700' : 'bg-gray-500 hover:bg-gray-600'} text-white rounded text-xs transition-colors`}
          >
            {isOffline ? t('offline.goOnline') : t('offline.goOffline')}
          </button>
        </div>
      </div>
    </div>
  );
};

export default OfflineBanner;
