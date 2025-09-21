// Password validation regex - at least 8 chars, 1 uppercase, 1 lowercase, 1 number, 1 special char from !@#$%^&*_-
const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*_-])[A-Za-z\d!@#$%^&*_-]{8,}$/;

// Email validation regex
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Phone validation regex
const phoneRegex = /^[\d\s\-\+\(\)]+$/;

const validatePassword = (password) => {
  if (!password || password.length < 8) {
    return 'Password must be at least 8 characters long';
  }
  if (!passwordRegex.test(password)) {
    return 'Password must contain uppercase, lowercase, number and special character';
  }
  return null;
};

const validateEmail = (email) => {
  if (!email || !emailRegex.test(email)) {
    return 'Please provide a valid email address';
  }
  return null;
};

const validatePhone = (phone) => {
  if (phone && !phoneRegex.test(phone)) {
    return 'Please provide a valid phone number';
  }
  return null;
};

module.exports = {
  passwordRegex,
  emailRegex,
  phoneRegex,
  validatePassword,
  validateEmail,
  validatePhone
};
