import { useState, useCallback } from 'react';
import axiosInstance from '../services/api';
import { useAuth } from '../context/AuthContext';

/**
 * Hook personnalisé pour les appels API avec gestion d'état
 * Fournit loading, error, et success states automatiquement
 */
export const useApi = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);
  const { logout } = useAuth();

  // Wrapper pour les appels API avec gestion automatique des erreurs
  const apiCall = useCallback(async (apiFunction, ...args) => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await apiFunction(...args);
      setData(response.data);
      return response.data;
    } catch (err) {
      const errorMessage = err.response?.data?.message || err.message || 'Une erreur est survenue';
      
      // Déconnexion automatique si token expiré
      if (err.response?.status === 401) {
        logout();
      }
      
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [logout]);

  // Méthodes HTTP spécialisées
  const get = useCallback(async (url, config = {}) => {
    return apiCall(axiosInstance.get, url, config);
  }, [apiCall]);

  const post = useCallback(async (url, data = {}, config = {}) => {
    return apiCall(axiosInstance.post, url, data, config);
  }, [apiCall]);

  const put = useCallback(async (url, data = {}, config = {}) => {
    return apiCall(axiosInstance.put, url, data, config);
  }, [apiCall]);

  const del = useCallback(async (url, config = {}) => {
    return apiCall(axiosInstance.delete, url, config);
  }, [apiCall]);

  // Méthodes utilitaires
  const clearError = useCallback(() => {
    setError(null);
  }, []);

  const clearData = useCallback(() => {
    setData(null);
  }, []);

  const reset = useCallback(() => {
    setLoading(false);
    setError(null);
    setData(null);
  }, []);

  return {
    // États
    loading,
    error,
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
  };
};

export default useApi;
