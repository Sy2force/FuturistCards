import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  MapPinIcon, 
  GlobeAltIcon,
  ExclamationTriangleIcon,
  CheckCircleIcon
} from '@heroicons/react/24/outline';

const GeolocationSystem = ({ onLocationUpdate, showMap = false }) => {
  const [location, setLocation] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [permission, setPermission] = useState('prompt');

  useEffect(() => {
    checkGeolocationPermission();
  }, []);

  const checkGeolocationPermission = async () => {
    if ('permissions' in navigator) {
      try {
        const result = await navigator.permissions.query({ name: 'geolocation' });
        setPermission(result.state);
        
        result.addEventListener('change', () => {
          setPermission(result.state);
        });
      } catch (error) {
        console.log('Permission API not supported');
      }
    }
  };

  const getCurrentLocation = () => {
    if (!navigator.geolocation) {
      setError('La géolocalisation n\'est pas supportée par ce navigateur');
      return;
    }

    setLoading(true);
    setError(null);

    const options = {
      enableHighAccuracy: true,
      timeout: 10000,
      maximumAge: 300000 // 5 minutes
    };

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        
        try {
          // Get address from coordinates using reverse geocoding
          const address = await reverseGeocode(latitude, longitude);
          
          const locationData = {
            latitude,
            longitude,
            accuracy: position.coords.accuracy,
            address,
            timestamp: new Date().toISOString()
          };
          
          setLocation(locationData);
          onLocationUpdate?.(locationData);
          setLoading(false);
        } catch (geocodeError) {
          const locationData = {
            latitude,
            longitude,
            accuracy: position.coords.accuracy,
            address: 'Adresse non disponible',
            timestamp: new Date().toISOString()
          };
          
          setLocation(locationData);
          onLocationUpdate?.(locationData);
          setLoading(false);
        }
      },
      (error) => {
        setLoading(false);
        switch (error.code) {
          case error.PERMISSION_DENIED:
            setError('Permission de géolocalisation refusée');
            break;
          case error.POSITION_UNAVAILABLE:
            setError('Position non disponible');
            break;
          case error.TIMEOUT:
            setError('Délai d\'attente dépassé');
            break;
          default:
            setError('Erreur de géolocalisation inconnue');
            break;
        }
      },
      options
    );
  };

  const reverseGeocode = async (latitude, longitude) => {
    // Mock reverse geocoding - replace with real service like Google Maps API
    const mockAddresses = [
      'Tel Aviv, Israel',
      'Jerusalem, Israel',
      'Haifa, Israel',
      'Eilat, Israel',
      'Netanya, Israel'
    ];
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    return mockAddresses[Math.floor(Math.random() * mockAddresses.length)];
  };

  const clearLocation = () => {
    setLocation(null);
    setError(null);
    onLocationUpdate?.(null);
  };

  const getPermissionIcon = () => {
    switch (permission) {
      case 'granted':
        return <CheckCircleIcon className="h-5 w-5 text-green-400" />;
      case 'denied':
        return <ExclamationTriangleIcon className="h-5 w-5 text-red-400" />;
      default:
        return <MapPinIcon className="h-5 w-5 text-yellow-400" />;
    }
  };

  const getPermissionText = () => {
    switch (permission) {
      case 'granted':
        return 'Géolocalisation autorisée';
      case 'denied':
        return 'Géolocalisation refusée';
      default:
        return 'Permission en attente';
    }
  };

  return (
    <div className="space-y-4">
      {/* Location Status */}
      <div className="glass border border-white/20 rounded-xl p-4">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-2">
            {getPermissionIcon()}
            <span className="text-white/80 text-sm">{getPermissionText()}</span>
          </div>
          <GlobeAltIcon className="h-5 w-5 text-white/60" />
        </div>

        {/* Current Location Display */}
        {location && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-3 p-3 bg-white/5 rounded-lg"
          >
            <div className="flex items-start justify-between">
              <div>
                <p className="text-white font-medium text-sm">{location.address}</p>
                <p className="text-white/60 text-xs mt-1">
                  {location.latitude.toFixed(6)}, {location.longitude.toFixed(6)}
                </p>
                <p className="text-white/40 text-xs">
                  Précision: ±{Math.round(location.accuracy)}m
                </p>
              </div>
              <button
                onClick={clearLocation}
                className="text-white/60 hover:text-red-400 transition-colors"
              >
                <ExclamationTriangleIcon className="h-4 w-4" />
              </button>
            </div>
          </motion.div>
        )}

        {/* Error Display */}
        {error && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-3 p-3 bg-red-500/10 border border-red-500/30 rounded-lg"
          >
            <p className="text-red-400 text-sm">{error}</p>
          </motion.div>
        )}

        {/* Action Buttons */}
        <div className="flex space-x-2">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={getCurrentLocation}
            disabled={loading || permission === 'denied'}
            className={`
              flex-1 flex items-center justify-center space-x-2 py-2 px-4 rounded-lg transition-colors
              ${loading 
                ? 'bg-white/10 text-white/40 cursor-not-allowed' 
                : permission === 'denied'
                ? 'bg-red-500/20 text-red-400 cursor-not-allowed'
                : 'bg-blue-500/20 text-blue-400 hover:bg-blue-500/30'
              }
            `}
          >
            {loading ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-400"></div>
                <span className="text-sm">Localisation...</span>
              </>
            ) : (
              <>
                <MapPinIcon className="h-4 w-4" />
                <span className="text-sm">
                  {location ? 'Actualiser' : 'Obtenir ma position'}
                </span>
              </>
            )}
          </motion.button>

          {location && (
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={clearLocation}
              className="px-4 py-2 bg-white/10 text-white/60 rounded-lg hover:bg-white/20 transition-colors"
            >
              Effacer
            </motion.button>
          )}
        </div>
      </div>

      {/* Map Placeholder */}
      {showMap && location && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 200 }}
          className="glass border border-white/20 rounded-xl p-4"
        >
          <div className="h-full flex items-center justify-center border-2 border-dashed border-white/20 rounded-lg">
            <div className="text-center">
              <MapPinIcon className="h-8 w-8 text-white/40 mx-auto mb-2" />
              <p className="text-white/60 text-sm">Carte interactive</p>
              <p className="text-white/40 text-xs">Integration Google Maps à venir</p>
            </div>
          </div>
        </motion.div>
      )}

      {/* Location Sharing Options */}
      {location && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass border border-white/20 rounded-xl p-4"
        >
          <h3 className="text-white font-medium mb-3">Options de partage</h3>
          <div className="space-y-2">
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                className="rounded border-white/20 bg-white/10 text-blue-500 focus:ring-blue-500 focus:ring-offset-0"
                defaultChecked
              />
              <span className="text-white/80 text-sm">Afficher la ville sur ma carte</span>
            </label>
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                className="rounded border-white/20 bg-white/10 text-blue-500 focus:ring-blue-500 focus:ring-offset-0"
              />
              <span className="text-white/80 text-sm">Partager ma position exacte</span>
            </label>
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                className="rounded border-white/20 bg-white/10 text-blue-500 focus:ring-blue-500 focus:ring-offset-0"
                defaultChecked
              />
              <span className="text-white/80 text-sm">Permettre la recherche par proximité</span>
            </label>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default GeolocationSystem;
