import { useState, useEffect } from 'react';
import { useAuth } from './useAuth';

/**
 * Custom hook for API calls with loading, error, and data state management
 * @param {Function} apiCall - The API function to call
 * @param {Array} dependencies - Dependencies array for useEffect
 * @param {boolean} immediate - Whether to call the API immediately
 * @returns {Object} { data, loading, error, refetch }
 */
const useApi = (apiCall, dependencies = [], immediate = true) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(immediate);
  const [error, setError] = useState(null);
  const { logout } = useAuth();

  const execute = async (...args) => {
    try {
      setLoading(true);
      setError(null);
      const result = await apiCall(...args);
      setData(result);
      return result;
    } catch (err) {
      // Handle authentication errors
      if (err.response?.status === 401) {
        logout();
        return;
      }
      
      setError(err.response?.data?.message || err.message || 'Une erreur est survenue');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const refetch = () => execute();

  useEffect(() => {
    if (immediate) {
      execute();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, dependencies);

  return {
    data,
    loading,
    error,
    execute,
    refetch,
    setData,
    setError
  };
};

export default useApi;
