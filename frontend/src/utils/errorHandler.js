// Global error handler for production debugging
export const logError = (error, context = '') => {
  const errorInfo = {
    message: error.message,
    stack: error.stack,
    context,
    timestamp: new Date().toISOString(),
    url: window.location.href,
    userAgent: navigator.userAgent
  };
  
  // Always log to console for debugging
  console.error('Application Error:', errorInfo);
  
  // In production, you could send to error tracking service
  if (import.meta.env.PROD) {
    // Could integrate with Sentry, LogRocket, etc.
    console.error('PROD ERROR:', JSON.stringify(errorInfo, null, 2));
  }
};

// API error handler
export const handleApiError = (error, context = '') => {
  const apiError = {
    status: error.response?.status,
    statusText: error.response?.statusText,
    data: error.response?.data,
    message: error.message,
    context,
    timestamp: new Date().toISOString()
  };
  
  console.error('API Error:', apiError);
  
  // Return user-friendly message
  if (error.response?.status === 401) {
    return 'Authentication required. Please log in again.';
  } else if (error.response?.status === 403) {
    return 'Access denied. You do not have permission for this action.';
  } else if (error.response?.status === 404) {
    return 'Resource not found.';
  } else if (error.response?.status >= 500) {
    return 'Server error. Please try again later.';
  } else if (error.code === 'NETWORK_ERROR') {
    return 'Network error. Please check your connection.';
  }
  
  return error.response?.data?.message || error.message || 'An unexpected error occurred.';
};

// Global error event listener
window.addEventListener('error', (event) => {
  logError(event.error, 'Global Error Handler');
});

window.addEventListener('unhandledrejection', (event) => {
  logError(event.reason, 'Unhandled Promise Rejection');
});
