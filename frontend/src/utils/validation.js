// Validation utilities for forms

export const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  
  if (!email) {
    return { isValid: false, error: 'Email is required' };
  }
  
  if (!emailRegex.test(email)) {
    return { isValid: false, error: 'Invalid email format' };
  }
  
  return { isValid: true };
};

/**
 * Validate password strength
 */
export const validatePassword = (password) => {
  if (!password) {
    return { isValid: false, error: 'Password is required' };
  }
  
  // Password requirements: ≥8 chars, 1 uppercase, 1 lowercase, 1 digit, 1 special char
  const minLength = 8;
  const uppercaseRegex = /[A-Z]/;
  const lowercaseRegex = /[a-z]/;
  const numberRegex = /\d/g;
  const specialCharRegex = /[!@%$#^&*\-_*]/;
  
  if (password.length < minLength) {
    return { isValid: false, error: `Password must be at least ${minLength} characters` };
  }
  
  if (!uppercaseRegex.test(password)) {
    return { isValid: false, error: 'Password must contain at least one uppercase letter' };
  }
  
  if (!lowercaseRegex.test(password)) {
    return { isValid: false, error: 'Password must contain at least one lowercase letter' };
  }
  
  const numberMatches = password.match(numberRegex);
  if (!numberMatches || numberMatches.length < 4) {
    return { isValid: false, error: 'Password must contain at least 4 digits' };
  }
  
  if (!specialCharRegex.test(password)) {
    return { isValid: false, error: 'Password must contain at least one special character (!@%$#^&*-_*)' };
  }
  
  return { isValid: true };
};

export const validateName = (name) => {
  if (!name) {
    return { isValid: false, error: 'Name is required' };
  }
  
  if (name.length < 2) {
    return { isValid: false, error: 'Name must be at least 2 characters' };
  }
  
  return { isValid: true };
};

export const validateRequired = (value, fieldName = 'This field') => {
  if (!value || value.trim() === '') {
    return { isValid: false, error: `${fieldName} is required` };
  }
  return { isValid: true };
};

export const validateLength = (value, minLength, fieldName = 'This field') => {
  if (!value || value.length < minLength) {
    return { isValid: false, error: `${fieldName} must be at least ${minLength} characters` };
  }
  return { isValid: true };
};

/**
 * Validate phone number
 */
export const validatePhone = (phone) => {
  if (!phone) {
    return { isValid: true }; // Optional field
  }
  
  const phoneRegex = /^[+]?[\d\s\-()]{8,20}$/;
  if (!phoneRegex.test(phone)) {
    return { isValid: false, error: 'Invalid phone format (8-20 characters, digits, spaces, +, -, () allowed)' };
  }
  
  return { isValid: true };
};

export const validateWebsite = (url) => {
  if (!url) {
    return { isValid: true }; // Optional field
  }
  
  try {
    const urlPattern = /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/;
    if (!urlPattern.test(url)) {
      return { isValid: false, error: 'Invalid URL format' };
    }
    return { isValid: true };
  } catch (error) {
    return { isValid: false, error: 'Invalid URL format' };
  }
};

export const validateCardTitle = (title) => {
  if (!title || title.trim() === '') {
    return { isValid: false, error: 'Title is required' };
  }
  
  if (title.length < 2) {
    return { isValid: false, error: 'Name must be at least 2 characters' };
  }
  
  if (title.length > 100) {
    return { isValid: false, error: 'Title must be less than 100 characters' };
  }
  
  return { isValid: true };
};

export const validateDescription = (description) => {
  if (!description) {
    return { isValid: true }; // Optional field
  }
  
  if (description.length > 500) {
    return { isValid: false, error: 'Description must be less than 500 characters' };
  }
  
  return { isValid: true };
};

export const isFormValid = (errors, formData, requiredFields = []) => {
  // Check if there are any errors
  if (Object.keys(errors).length > 0) {
    return false;
  }
  
  // Ensure requiredFields is an array
  if (!Array.isArray(requiredFields)) {
    return false;
  }
  
  // Check if all required fields are filled
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
