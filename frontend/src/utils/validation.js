// Validation utilities for forms

export const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  
  if (!email) {
    return { isValid: false, error: 'L\'email est requis' };
  }
  
  if (!emailRegex.test(email)) {
    return { isValid: false, error: 'Format d\'email invalide' };
  }
  
  return { isValid: true };
};

export const validatePassword = (password) => {
  if (!password) {
    return { isValid: false, error: 'Le mot de passe est requis' };
  }
  
  if (password.length < 6) {
    return { isValid: false, error: 'Le mot de passe doit contenir au moins 6 caractères' };
  }
  
  return { isValid: true };
};

export const validateName = (name) => {
  if (!name) {
    return { isValid: false, error: 'Le nom est requis' };
  }
  
  if (name.length < 2) {
    return { isValid: false, error: 'Le nom doit contenir au moins 2 caractères' };
  }
  
  return { isValid: true };
};

export const validateRequired = (value, fieldName = 'Ce champ') => {
  if (!value || value.trim() === '') {
    return { isValid: false, error: `${fieldName} est requis` };
  }
  return { isValid: true };
};

export const validateLength = (value, minLength, fieldName = 'Ce champ') => {
  if (!value || value.length < minLength) {
    return { isValid: false, error: `${fieldName} doit contenir au moins ${minLength} caractères` };
  }
  return { isValid: true };
};

export const validatePhone = (phone) => {
  if (!phone) {
    return { isValid: true }; // Optional field
  }
  
  const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
  if (!phoneRegex.test(phone.replace(/[\s\-\(\)]/g, ''))) {
    return { isValid: false, error: 'Format de téléphone invalide' };
  }
  
  return { isValid: true };
};

export const isFormValid = (formData, requiredFields = []) => {
  return requiredFields.every(field => formData[field] && formData[field].trim() !== '');
};

// CSS classes for form fields
export const getFieldClasses = (error, touched) => {
  const baseClasses = 'w-full px-4 py-2 rounded-lg border transition-colors duration-200 focus:outline-none focus:ring-2';
  
  if (error && touched) {
    return `${baseClasses} border-red-500 focus:border-red-500 focus:ring-red-500`;
  }
  
  return `${baseClasses} border-gray-300 focus:border-blue-500 focus:ring-blue-500`;
};

export const getErrorClasses = () => {
  return 'text-red-500 text-sm mt-1';
};

export const getSuccessClasses = () => {
  return 'text-green-500 text-sm mt-1';
};

export const getSubmitButtonClasses = (disabled = false) => {
  const baseClasses = 'w-full py-3 px-4 rounded-lg font-medium transition-colors duration-200';
  
  if (disabled) {
    return `${baseClasses} bg-gray-400 text-gray-200 cursor-not-allowed`;
  }
  
  return `${baseClasses} bg-blue-600 hover:bg-blue-700 text-white`;
};
