import { useState, useCallback, useEffect } from 'react';
import axiosInstance from '../services/api';
import { useAuth } from '../context/AuthContext';

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

  const execute = useCallback(async (...args) => {
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
      }
      
      setError(err.response?.data?.message || err.message || 'Une erreur est survenue');
      throw err;
    } finally {
      setLoading(false);
    }
  }, [apiCall, logout]);

  const refetch = useCallback(() => execute(), [execute]);

  const clearError = useCallback(() => setError(null), []);
  const clearData = useCallback(() => setData(null), []);
  const reset = useCallback(() => {
    setData(null);
    setError(null);
    setLoading(false);
  }, []);

  // HTTP methods
  const get = useCallback(async (url, config = {}) => {
    return execute(() => axiosInstance.get(url, config));
  }, [execute]);

  const post = useCallback(async (url, data, config = {}) => {
    return execute(() => axiosInstance.post(url, data, config));
  }, [execute]);

  const put = useCallback(async (url, data, config = {}) => {
    return execute(() => axiosInstance.put(url, data, config));
  }, [execute]);

  const del = useCallback(async (url, config = {}) => {
    return execute(() => axiosInstance.delete(url, config));
  }, [execute]);

  useEffect(() => {
    if (immediate && apiCall) {
      execute();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [immediate, apiCall, execute, ...dependencies]);

  return {
    data,
    loading,
    error,
    refetch,
    
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
    execute
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
  };
};

export default useApi;
