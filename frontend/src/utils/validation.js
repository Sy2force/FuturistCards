// Utilitaires de validation HackerU - Validation native JavaScript
// Regex email standard
export const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

// Regex téléphone israélien (050-0000000)
export const israeliPhoneRegex = /^0[5-9][0-9]-[0-9]{7}$/;

// Regex mot de passe simplifié: min 8 caractères, 1 majuscule, 1 minuscule, 1 chiffre
export const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;

// Fonctions de validation native JavaScript HackerU
export const validateEmail = (email) => {
  if (!email || email.trim() === '') {
    return { isValid: false, error: 'L\'email est obligatoire' };
  }
  if (!emailRegex.test(email)) {
    return { isValid: false, error: 'Format d\'email invalide' };
  }
  return { isValid: true, error: null };
};

export const validatePassword = (password) => {
  if (!password || password.trim() === '') {
    return { isValid: false, error: 'Le mot de passe est obligatoire' };
  }
  if (!passwordRegex.test(password)) {
    return { isValid: false, error: 'Le mot de passe doit contenir au moins 8 caractères, 1 majuscule, 1 minuscule et 1 chiffre' };
  }
  return { isValid: true, error: null };
};

export const validatePhone = (phone) => {
  if (phone && !israeliPhoneRegex.test(phone)) {
    return { isValid: false, error: 'Format téléphone israélien requis (050-0000000)' };
  }
  return { isValid: true, error: null };
};

export const validateRequired = (value, fieldName) => {
  if (!value || value.trim() === '') {
    return { isValid: false, error: `${fieldName} est obligatoire` };
  }
  return { isValid: true, error: null };
};

export const validateLength = (value, min, max, fieldName) => {
  if (value && value.length < min) {
    return { isValid: false, error: `${fieldName} doit contenir au moins ${min} caractères` };
  }
  if (value && value.length > max) {
    return { isValid: false, error: `${fieldName} ne peut pas dépasser ${max} caractères` };
  }
  return { isValid: true, error: null };
};

export const validateUrl = (url) => {
  if (url && url.trim() !== '') {
    try {
      new URL(url);
      return { isValid: true, error: null };
    } catch {
      return { isValid: false, error: 'Format d\'URL invalide' };
    }
  }
  return { isValid: true, error: null };
};

export const validateConfirmPassword = (password, confirmPassword) => {
  if (!confirmPassword || confirmPassword.trim() === '') {
    return { isValid: false, error: 'Veuillez confirmer votre mot de passe' };
  }
  if (password === confirmPassword) {
    return { isValid: true, error: null };
  }
  return { isValid: false, error: 'Les mots de passe ne correspondent pas' };
};

// Vérifier si le formulaire est valide
export const isFormValid = (errors, values, requiredFields) => {
  // Vérifier qu'il n'y a pas d'erreurs
  const hasErrors = Object.values(errors).some(error => error && error.length > 0);
  
  // Vérifier que tous les champs obligatoires sont remplis
  const hasAllRequiredFields = requiredFields.every(field => 
    values[field] && values[field].toString().trim().length > 0
  );
  
  return !hasErrors && hasAllRequiredFields;
};

// Classes CSS pour le feedback visuel HackerU
export const getFieldClasses = (isValid, hasError, isDirty) => {
  const baseClasses = `
    w-full px-4 py-3 rounded-lg border transition-all duration-300 
    focus:outline-none focus:ring-2 bg-white dark:bg-gray-800
    text-gray-900 dark:text-white
  `;
  
  if (!isDirty) {
    return `${baseClasses} border-gray-300 dark:border-gray-600 focus:ring-blue-500 focus:border-blue-500`;
  }
  
  if (hasError) {
    return `${baseClasses} border-red-400 focus:ring-red-500 focus:border-red-500 bg-red-50 dark:bg-red-900/20`;
  }
  
  if (isValid) {
    return `${baseClasses} border-green-400 focus:ring-green-500 focus:border-green-500 bg-green-50 dark:bg-green-900/20`;
  }
  
  return `${baseClasses} border-gray-300 dark:border-gray-600 focus:ring-blue-500 focus:border-blue-500`;
};

// Classes pour les messages d'erreur
export const getErrorClasses = () => `
  text-sm mt-1 text-red-600 dark:text-red-400 
  font-medium
`;

// Classes pour les messages de succès
export const getSuccessClasses = () => `
  text-sm mt-1 text-green-600 dark:text-green-400 
  font-medium
`;

// Classes pour les boutons submit
export const getSubmitButtonClasses = (isValid, isLoading) => {
  const baseClasses = `
    w-full py-3 px-6 rounded-lg font-semibold text-white
    transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2
  `;
  
  if (isLoading) {
    return `${baseClasses} bg-gray-400 cursor-not-allowed`;
  }
  
  if (!isValid) {
    return `${baseClasses} bg-gray-400 cursor-not-allowed opacity-60`;
  }
  
  return `${baseClasses} bg-blue-600 hover:bg-blue-700 focus:ring-blue-500 active:scale-95`;
};
