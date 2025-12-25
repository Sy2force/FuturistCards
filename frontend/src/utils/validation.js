/**
 * Validation utilities for forms and data
 */

// Email validation regex
export const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

// Password validation regex (at least 8 chars, 1 uppercase, 1 lowercase, 1 number, 1 special char)
export const PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

// Phone validation regex (international format)
export const PHONE_REGEX = /^[+]?[1-9][\d]{0,15}$/;

// URL validation regex
export const URL_REGEX = /^https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)$/;

/**
 * Validate email format
 */
export const validateEmail = (email) => {
  if (!email) return { isValid: false, error: 'Email is required' };
  if (!EMAIL_REGEX.test(email)) return { isValid: false, error: 'Invalid email format' };
  return { isValid: true };
};

/**
 * Validate password strength
 */
export const validatePassword = (password) => {
  if (!password) return { isValid: false, error: 'Password is required' };
  if (password.length < 8) return { isValid: false, error: 'Password must be at least 8 characters' };
  if (!PASSWORD_REGEX.test(password)) {
    return { 
      isValid: false, 
      error: 'Password must contain uppercase, lowercase, number and special character' 
    };
  }
  return { isValid: true };
};

/**
 * Validate phone number
 */
export const validatePhone = (phone) => {
  if (!phone) return { isValid: false, error: 'Phone number is required' };
  if (!PHONE_REGEX.test(phone)) return { isValid: false, error: 'Invalid phone format' };
  return { isValid: true };
};

/**
 * Validate URL format
 */
export const validateUrl = (url) => {
  if (!url) return { isValid: true }; // URL is optional
  if (!URL_REGEX.test(url)) return { isValid: false, error: 'Invalid URL format' };
  return { isValid: true };
};

/**
 * Validate required field
 */
export const validateRequired = (value, fieldName) => {
  if (!value || value.toString().trim() === '') {
    return { isValid: false, error: `${fieldName} is required` };
  }
  return { isValid: true };
};

/**
 * Validate string length
 */
export const validateLength = (value, min, max, fieldName) => {
  if (!value) return { isValid: false, error: `${fieldName} is required` };
  if (value.length < min) {
    return { isValid: false, error: `${fieldName} must be at least ${min} characters` };
  }
  if (value.length > max) {
    return { isValid: false, error: `${fieldName} must be less than ${max} characters` };
  }
  return { isValid: true };
};

/**
 * Validate card form data
 */
export const validateCardForm = (formData) => {
  const errors = {};

  // Title validation
  const titleValidation = validateLength(formData.title, 2, 256, 'Title');
  if (!titleValidation.isValid) errors.title = titleValidation.error;

  // Subtitle validation
  const subtitleValidation = validateLength(formData.subtitle, 2, 256, 'Subtitle');
  if (!subtitleValidation.isValid) errors.subtitle = subtitleValidation.error;

  // Description validation
  const descriptionValidation = validateLength(formData.description, 2, 1024, 'Description');
  if (!descriptionValidation.isValid) errors.description = descriptionValidation.error;

  // Phone validation
  const phoneValidation = validatePhone(formData.phone);
  if (!phoneValidation.isValid) errors.phone = phoneValidation.error;

  // Email validation
  const emailValidation = validateEmail(formData.email);
  if (!emailValidation.isValid) errors.email = emailValidation.error;

  // Web URL validation (optional)
  if (formData.web) {
    const webValidation = validateUrl(formData.web);
    if (!webValidation.isValid) errors.web = webValidation.error;
  }

  // Image URL validation (optional)
  if (formData.image?.url) {
    const imageValidation = validateUrl(formData.image.url);
    if (!imageValidation.isValid) errors.imageUrl = imageValidation.error;
  }

  // Address validation
  if (formData.address) {
    const stateValidation = validateRequired(formData.address.state, 'State');
    if (!stateValidation.isValid) errors.state = stateValidation.error;

    const countryValidation = validateRequired(formData.address.country, 'Country');
    if (!countryValidation.isValid) errors.country = countryValidation.error;

    const cityValidation = validateRequired(formData.address.city, 'City');
    if (!cityValidation.isValid) errors.city = cityValidation.error;

    const streetValidation = validateRequired(formData.address.street, 'Street');
    if (!streetValidation.isValid) errors.street = streetValidation.error;

    const houseNumberValidation = validateRequired(formData.address.houseNumber, 'House Number');
    if (!houseNumberValidation.isValid) errors.houseNumber = houseNumberValidation.error;

    const zipValidation = validateRequired(formData.address.zip, 'ZIP Code');
    if (!zipValidation.isValid) errors.zip = zipValidation.error;
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
};

/**
 * Validate user registration form
 */
export const validateRegistrationForm = (formData) => {
  const errors = {};

  // First name validation
  const firstNameValidation = validateLength(formData.firstName, 2, 50, 'First Name');
  if (!firstNameValidation.isValid) errors.firstName = firstNameValidation.error;

  // Last name validation
  const lastNameValidation = validateLength(formData.lastName, 2, 50, 'Last Name');
  if (!lastNameValidation.isValid) errors.lastName = lastNameValidation.error;

  // Email validation
  const emailValidation = validateEmail(formData.email);
  if (!emailValidation.isValid) errors.email = emailValidation.error;

  // Password validation
  const passwordValidation = validatePassword(formData.password);
  if (!passwordValidation.isValid) errors.password = passwordValidation.error;

  // Confirm password validation
  if (formData.password !== formData.confirmPassword) {
    errors.confirmPassword = 'Passwords do not match';
  }

  // Role validation
  const validRoles = ['user', 'business', 'admin'];
  if (!validRoles.includes(formData.role)) {
    errors.role = 'Invalid role selected';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
};

/**
 * Validate login form
 */
export const validateLoginForm = (formData) => {
  const errors = {};

  // Email validation
  const emailValidation = validateEmail(formData.email);
  if (!emailValidation.isValid) errors.email = emailValidation.error;

  // Password validation (just required, not strength)
  const passwordValidation = validateRequired(formData.password, 'Password');
  if (!passwordValidation.isValid) errors.password = passwordValidation.error;

  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
};

export default {
  validateEmail,
  validatePassword,
  validatePhone,
  validateUrl,
  validateRequired,
  validateLength,
  validateCardForm,
  validateRegistrationForm,
  validateLoginForm,
  EMAIL_REGEX,
  PASSWORD_REGEX,
  PHONE_REGEX,
  URL_REGEX
};
