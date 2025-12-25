<<<<<<< HEAD
import { useState, useCallback } from 'react';
import axiosInstance from '../services/api';
import { useAuth } from '../context/AuthContext';
=======
import { useState, useEffect } from 'react';
import { useAuth } from './useAuth';
>>>>>>> 1ca665d3f5f764417ada1cdd89a898f39ac3dccd

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
<<<<<<< HEAD
=======
        return;
>>>>>>> 1ca665d3f5f764417ada1cdd89a898f39ac3dccd
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
<<<<<<< HEAD
    data,
    
    // Méthodes HTTP
    get,
    post,
    put,
    delete: del,
    
    // Méthodes utilitaires
    clearError,
    clearData,
    reset,
    
    // Appel API générique
    apiCall
  };
};

/**
 * Hook spécialisé pour les appels API avec pagination
 */
export const useApiPagination = (initialPage = 1, initialLimit = 12) => {
  const [page, setPage] = useState(initialPage);
  const [limit, setLimit] = useState(initialLimit);
  const [totalPages, setTotalPages] = useState(1);
  const [total, setTotal] = useState(0);
  
  const api = useApi();

  const fetchPage = useCallback(async (url, additionalParams = {}) => {
    const params = {
      page,
      limit,
      ...additionalParams
    };

    const result = await api.get(url, { params });
    
    if (result && result.pagination) {
      setTotalPages(result.pagination.totalPages || 1);
      setTotal(result.pagination.total || 0);
    }
    
    return result;
  }, [api, page, limit]);

  const nextPage = useCallback(() => {
    if (page < totalPages) {
      setPage(prev => prev + 1);
    }
  }, [page, totalPages]);

  const prevPage = useCallback(() => {
    if (page > 1) {
      setPage(prev => prev - 1);
    }
  }, [page]);

  const goToPage = useCallback((newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setPage(newPage);
    }
  }, [totalPages]);

  const changeLimit = useCallback((newLimit) => {
    setLimit(newLimit);
    setPage(1); // Reset to first page
  }, []);

  return {
    ...api,
    
    // Pagination state
    page,
    limit,
    totalPages,
    total,
    
    // Pagination methods
    fetchPage,
    nextPage,
    prevPage,
    goToPage,
    changeLimit,
    
    // Pagination utilities
    hasNextPage: page < totalPages,
    hasPrevPage: page > 1,
    isFirstPage: page === 1,
    isLastPage: page === totalPages
  };
};

/**
 * Hook pour les opérations CRUD sur une ressource
 */
export const useCrud = (resourceEndpoint) => {
  const api = useApi();

  const getAll = useCallback(async (params = {}) => {
    return api.get(resourceEndpoint, { params });
  }, [api, resourceEndpoint]);

  const getById = useCallback(async (id) => {
    return api.get(`${resourceEndpoint}/${id}`);
  }, [api, resourceEndpoint]);

  const create = useCallback(async (data) => {
    return api.post(resourceEndpoint, data);
  }, [api, resourceEndpoint]);

  const update = useCallback(async (id, data) => {
    return api.put(`${resourceEndpoint}/${id}`, data);
  }, [api, resourceEndpoint]);

  const remove = useCallback(async (id) => {
    return api.delete(`${resourceEndpoint}/${id}`);
  }, [api, resourceEndpoint]);

  return {
    ...api,
    getAll,
    getById,
    create,
    update,
    remove
=======
    execute,
    refetch,
    setData,
    setError
>>>>>>> 1ca665d3f5f764417ada1cdd89a898f39ac3dccd
  };
};

export default useApi;
