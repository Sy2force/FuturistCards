import { useState, useCallback } from 'react';

let toastId = 0;

const useToast = () => {
  const [toasts, setToasts] = useState([]);

  const addToast = useCallback((message, type = 'info', duration = 5000, position = 'top-right') => {
    const id = ++toastId;
    const toast = {
      id,
      message,
      type,
      duration,
      position
    };

    setToasts(prev => [...prev, toast]);
    return id;
  }, []);

  const removeToast = useCallback((id) => {
    setToasts(prev => prev.filter(toast => toast.id !== id));
  }, []);

  const success = useCallback((message, options = {}) => {
    return addToast(message, 'success', options.duration, options.position);
  }, [addToast]);

  const error = useCallback((message, options = {}) => {
    return addToast(message, 'error', options.duration || 7000, options.position);
  }, [addToast]);

  const warning = useCallback((message, options = {}) => {
    return addToast(message, 'warning', options.duration, options.position);
  }, [addToast]);

  const info = useCallback((message, options = {}) => {
    return addToast(message, 'info', options.duration, options.position);
  }, [addToast]);

  const clearAll = useCallback(() => {
    setToasts([]);
  }, []);

  return {
    toasts,
    addToast,
    removeToast,
    success,
    error,
    warning,
    info,
    clearAll
  };
};

export default useToast;
