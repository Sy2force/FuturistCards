// Auth utility functions and constants
export const AUTH_CONFIG = {
  API_URL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:5001/api',
  STORAGE_KEY: 'futuristcards_user'
};

export const createUserData = (responseUser, fallbackData = {}) => ({
  id: responseUser?.id || 'user-id',
  email: responseUser?.email || fallbackData.email,
  firstName: responseUser?.firstName || fallbackData.firstName || 'משתמש',
  lastName: responseUser?.lastName || fallbackData.lastName || 'בדיקה',
  role: responseUser?.role || fallbackData.role || 'user',
  token: responseUser?.token || fallbackData.token
});

export const handleAuthError = (error) => {
  return error.response?.data?.message || error.message || 'שגיאת אימות';
};
