import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useRoleTheme } from '../context/ThemeProvider';
import { Helmet } from 'react-helmet-async';

const RegisterPage = () => {
  const navigate = useNavigate();
  const { register, loading, error, clearError, user, getRedirectPath } = useAuth();
  const { isDark } = useRoleTheme();

  // Redirect if already logged in
  useEffect(() => {
    if (user) {
      navigate(getRedirectPath(user.role), { replace: true });
    }
  }, [user, navigate, getRedirectPath]);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    address: '',
    city: '',
    country: '',
    role: 'user' // Default role - user type
  });
  const [validationError, setValidationError] = useState('');
  const [success, setSuccess] = useState('');
  const [fieldErrors, setFieldErrors] = useState({});
  const [fieldValid, setFieldValid] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    clearError();
    setValidationError('');
    setFormData({
      ...formData,
      [name]: value
    });
    
    // Real-time validation
    validateField(name, value);
  };

  const validateField = (name, value) => {
    let error = '';
    let isValid = false;

    switch (name) {
      case 'firstName':
      case 'lastName':
        isValid = value.trim().length >= 2;
        error = isValid ? '' : 'Must be at least 2 characters';
        break;
      
      case 'email':
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        isValid = emailRegex.test(value);
        error = isValid ? '' : 'Invalid email address';
        break;
      
      case 'phone':
        if (value.trim() === '') {
          isValid = true; // Optional field
          error = '';
        } else {
          const phoneRegex = /^[\+]?[0-9\s\-\(\)]{8,15}$/;
          isValid = phoneRegex.test(value.trim());
          error = isValid ? '' : 'Invalid phone format';
        }
        break;
      
      case 'password':
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*_-])[A-Za-z\d!@#$%^&*_-]{8,}$/;
        isValid = passwordRegex.test(value);
        error = isValid ? '' : 'Password must contain at least 8 characters, uppercase, lowercase, number and special character';
        break;
      
      case 'confirmPassword':
        isValid = value === formData.password && value.length > 0;
        error = isValid ? '' : 'Passwords do not match';
        break;
      
      default:
        isValid = value.trim().length > 0;
        break;
    }

    setFieldErrors(prev => ({ ...prev, [name]: error }));
    setFieldValid(prev => ({ ...prev, [name]: isValid }));
  };

  const validateForm = () => {
    if (!formData.firstName || !formData.lastName || !formData.email || !formData.password || !formData.confirmPassword) {
      setValidationError('All required fields must be filled');
      return false;
    }

    // Email validation (strict)
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setValidationError('Invalid email address');
      return false;
    }

    // Phone validation - Israeli format if provided
    if (formData.phone && formData.phone.trim() !== '') {
      const israeliPhoneRegex = /^(\+972|0)([23489]|5[0248]|77)[0-9]{7}$/;
      const generalPhoneRegex = /^[\+]?[0-9\s\-\(\)]{8,15}$/;
      if (!israeliPhoneRegex.test(formData.phone.replace(/[\s\-\(\)]/g, '')) && !generalPhoneRegex.test(formData.phone.trim())) {
        setValidationError('Invalid phone format');
        return false;
      }
    }

    // Password validation: 1 uppercase, 1 lowercase, 1 digit, 1 special char, min 8 chars
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*_-])[A-Za-z\d!@#$%^&*_-]{8,}$/;
    if (!passwordRegex.test(formData.password)) {
      setValidationError('Password must contain at least 8 characters, uppercase, lowercase, number and special character');
      return false;
    }

    if (formData.password !== formData.confirmPassword) {
      setValidationError('Passwords do not match');
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    try {
      setSuccess('');
      const userData = {
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        phone: formData.phone,
        password: formData.password,
        address: formData.address,
        city: formData.city,
        country: formData.country,
        role: formData.role
      };
      const result = await register(userData);
      
      if (result.success) {
        setSuccess('Registration successful! Redirecting...');
        setTimeout(() => {
          navigate(getRedirectPath(result.user.role));
        }, 1500);
      }
    } catch (err) {
      // Error handled by AuthContext
    }
  };

  const isFormValid = () => {
    const requiredFields = ['firstName', 'lastName', 'email', 'password', 'confirmPassword'];
    const allRequiredValid = requiredFields.every(field => fieldValid[field] === true);
    const noErrors = Object.values(fieldErrors).every(error => !error);
    return allRequiredValid && noErrors;
  };

  const displayError = validationError || error;

  return (
    <>
      <Helmet>
        <title>Register | FuturistCards</title>
        <meta name="description" content="Create your FuturistCards account and start building professional digital business cards" />
      </Helmet>

      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex" data-testid="register-page">
      {/* Left side - Form */}
      <div className="w-full lg:w-3/4 flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8 xl:px-20">
        <div className="mx-auto w-full max-w-md lg:max-w-lg xl:max-w-xl">
          <div className="text-center mb-8">
            <h2 className="text-4xl font-bold text-white mb-4 animate-float">
              Create Account
            </h2>
            <p className="text-lg text-indigo-200">
              Join FuturistCards today and start creating amazing business cards
            </p>
          </div>

          <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-8 shadow-2xl">
            {displayError && (
              <div className="mb-6 p-4 bg-red-500/20 border border-red-400/30 rounded-lg backdrop-blur-sm">
                <p className="text-sm text-red-200 font-medium">{displayError}</p>
              </div>
            )}

            {success && (
              <div className="mb-6 p-4 bg-green-500/20 border border-green-400/30 rounded-lg backdrop-blur-sm">
                <p className="text-sm text-green-200 font-medium">{success}</p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5" data-testid="register-form">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="firstName" className="block text-sm font-medium text-white mb-2">
                    First Name
                  </label>
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 border bg-white/10 text-white placeholder-white/60 hover:bg-white/20 focus:ring-2 focus:border-transparent transition-all duration-200 backdrop-blur-sm rounded-lg ${
                      fieldValid.firstName === true ? 'border-green-400 focus:ring-green-400' : 
                      fieldErrors.firstName ? 'border-red-400 focus:ring-red-400' : 
                      'border-white/30 focus:ring-blue-400'
                    }`}
                    placeholder="Enter your first name"
                    required
                    data-testid="register-firstName"
                  />
                  {fieldErrors.firstName && (
                    <p className="mt-1 text-sm text-red-300 flex items-center">
                      <span className="mr-1">❌</span> {fieldErrors.firstName}
                    </p>
                  )}
                  {fieldValid.firstName && !fieldErrors.firstName && (
                    <p className="mt-1 text-sm text-green-300 flex items-center">
                      <span className="mr-1">✅</span> Valid
                    </p>
                  )}
                </div>

                <div>
                  <label htmlFor="lastName" className="block text-sm font-medium text-white mb-2">
                    Last Name
                  </label>
                  <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 border bg-white/10 text-white placeholder-white/60 hover:bg-white/20 focus:ring-2 focus:border-transparent transition-all duration-200 backdrop-blur-sm rounded-lg ${
                      fieldValid.lastName === true ? 'border-green-400 focus:ring-green-400' : 
                      fieldErrors.lastName ? 'border-red-400 focus:ring-red-400' : 
                      'border-white/30 focus:ring-blue-400'
                    }`}
                    placeholder="Enter your last name"
                    required
                    data-testid="register-lastName"
                  />
                  {fieldErrors.lastName && (
                    <p className="mt-1 text-sm text-red-300 flex items-center">
                      <span className="mr-1">❌</span> {fieldErrors.lastName}
                    </p>
                  )}
                  {fieldValid.lastName && !fieldErrors.lastName && (
                    <p className="mt-1 text-sm text-green-300 flex items-center">
                      <span className="mr-1">✅</span> Valid
                    </p>
                  )}
                </div>
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-white mb-2">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 border bg-white/10 text-white placeholder-white/60 hover:bg-white/20 focus:ring-2 focus:border-transparent transition-all duration-200 backdrop-blur-sm rounded-lg ${
                    fieldValid.email === true ? 'border-green-400 focus:ring-green-400' : 
                    fieldErrors.email ? 'border-red-400 focus:ring-red-400' : 
                    'border-white/30 focus:ring-blue-400'
                  }`}
                  placeholder="Enter your email"
                  required
                  data-testid="register-email"
                />
                {fieldErrors.email && (
                  <p className="mt-1 text-sm text-red-300 flex items-center">
                    <span className="mr-1">❌</span> {fieldErrors.email}
                  </p>
                )}
                {fieldValid.email && !fieldErrors.email && (
                  <p className="mt-1 text-sm text-green-300 flex items-center">
                    <span className="mr-1">✅</span> Valid email
                  </p>
                )}
              </div>

              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-white mb-2">
                  Phone <span className="text-gray-400 text-xs">(Optional)</span>
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 border bg-white/10 text-white placeholder-white/60 hover:bg-white/20 focus:ring-2 focus:border-transparent transition-all duration-200 backdrop-blur-sm rounded-lg ${
                    fieldValid.phone === true ? 'border-green-400 focus:ring-green-400' : 
                    fieldErrors.phone ? 'border-red-400 focus:ring-red-400' : 
                    'border-white/30 focus:ring-blue-400'
                  }`}
                  placeholder="Enter your phone number"
                  data-testid="register-phone"
                />
                {fieldErrors.phone && (
                  <p className="mt-1 text-sm text-red-300 flex items-center">
                    <span className="mr-1">❌</span> {fieldErrors.phone}
                  </p>
                )}
                {fieldValid.phone && !fieldErrors.phone && formData.phone.trim() !== '' && (
                  <p className="mt-1 text-sm text-green-300 flex items-center">
                    <span className="mr-1">✅</span> Valid phone
                  </p>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="password" className="block text-sm font-medium text-white mb-2">
                    Password
                  </label>
                  <input
                    type="password"
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 border bg-white/10 text-white placeholder-white/60 hover:bg-white/20 focus:ring-2 focus:border-transparent transition-all duration-200 backdrop-blur-sm rounded-lg ${
                      fieldValid.password === true ? 'border-green-400 focus:ring-green-400' : 
                      fieldErrors.password ? 'border-red-400 focus:ring-red-400' : 
                      'border-white/30 focus:ring-blue-400'
                    }`}
                    placeholder="Enter your password"
                    required
                    data-testid="register-password"
                  />
                  {fieldErrors.password && (
                    <p className="mt-1 text-sm text-red-300 flex items-center">
                      <span className="mr-1">❌</span> {fieldErrors.password}
                    </p>
                  )}
                  {fieldValid.password && !fieldErrors.password && (
                    <p className="mt-1 text-sm text-green-300 flex items-center">
                      <span className="mr-1">✅</span> Strong password
                    </p>
                  )}
                </div>

                <div>
                  <label htmlFor="confirmPassword" className="block text-sm font-medium text-white mb-2">
                    Confirm Password
                  </label>
                  <input
                    type="password"
                    id="confirmPassword"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 border bg-white/10 text-white placeholder-white/60 hover:bg-white/20 focus:ring-2 focus:border-transparent transition-all duration-200 backdrop-blur-sm rounded-lg ${
                      fieldValid.confirmPassword === true ? 'border-green-400 focus:ring-green-400' : 
                      fieldErrors.confirmPassword ? 'border-red-400 focus:ring-red-400' : 
                      'border-white/30 focus:ring-blue-400'
                    }`}
                    placeholder="Confirm your password"
                    required
                    data-testid="register-confirmPassword"
                  />
                  {fieldErrors.confirmPassword && (
                    <p className="mt-1 text-sm text-red-300 flex items-center">
                      <span className="mr-1">❌</span> {fieldErrors.confirmPassword}
                    </p>
                  )}
                  {fieldValid.confirmPassword && !fieldErrors.confirmPassword && (
                    <p className="mt-1 text-sm text-green-300 flex items-center">
                      <span className="mr-1">✅</span> Passwords match
                    </p>
                  )}
                </div>
              </div>

              <div>
                <label htmlFor="role" className="block text-sm font-medium text-white mb-2">
                  Account Type
                </label>
                <select
                  id="role"
                  name="role"
                  value={formData.role}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-white/30 bg-white/10 text-white hover:bg-white/20 focus:ring-blue-400 rounded-lg focus:ring-2 focus:border-transparent transition-all duration-200 backdrop-blur-sm"
                  data-testid="register-role"
                >
                  <option value="user" className="bg-gray-800 text-white">User</option>
                  <option value="business" className="bg-gray-800 text-white">Business</option>
                  <option value="admin" className="bg-gray-800 text-white">Admin</option>
                </select>
                <p className="mt-2 text-xs text-white/70">
                  {formData.role === 'user' && 'Create and manage your personal digital business cards'}
                  {formData.role === 'business' && 'Create, manage and share multiple business cards for your company'}
                  {formData.role === 'admin' && 'Full administrative access to manage users and content'}
                </p>
              </div>

              <div>
                <button
                  type="submit"
                  className="btn-primary w-full flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-400"
                  disabled={loading || !isFormValid()}
                  data-testid="register-submit-button"
                >
                  {loading ? (
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                  ) : (
                    'Sign Up'
                  )}
                </button>
              </div>
            </form>

            <div className="mt-6 text-center">
              <p className="text-sm text-white/80">
                Already have an account? {' '}
                <Link 
                  to="/login" 
                  className="font-medium text-blue-300 hover:text-blue-200 transition-colors"
                  data-testid="login-link"
                >
                  Sign In
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Right side - Inspiring Image */}
      <div className="hidden lg:block relative w-1/4 h-screen overflow-hidden">
        {/* Animated gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-purple-600/30 via-pink-600/25 to-blue-600/20 backdrop-blur-sm animate-pulse"></div>
        
        {/* Main image with enhanced effects */}
        <div className="absolute inset-0 transform hover:scale-105 transition-all duration-700 ease-out">
          <img 
            src="/images/register-hero.jpg" 
            alt="Register hero image"
            className="h-full w-full object-cover"
            onError={(e) => {
              e.target.style.display = 'none';
              e.target.nextSibling.style.display = 'block';
            }}
          />
          <div className="h-full w-full bg-gradient-to-br from-purple-600 via-pink-600 to-blue-600 opacity-90" style={{display: 'none'}}></div>
          <div className="absolute inset-0 opacity-30" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.15'%3E%3Cpolygon points='30,15 45,30 30,45 15,30'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
          }}></div>
        </div>
        
        {/* Enhanced gradient overlays for depth */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/10"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-purple-500/15 to-pink-500/25"></div>
        
        {/* Floating particles effect */}
        <div className="absolute inset-0 opacity-40">
          <div className="absolute top-24 right-12 w-2 h-2 bg-white/70 rounded-full animate-bounce" style={{animationDelay: '0.5s', animationDuration: '3.5s'}}></div>
          <div className="absolute top-44 left-14 w-1 h-1 bg-purple-300/80 rounded-full animate-bounce" style={{animationDelay: '1.5s', animationDuration: '4.5s'}}></div>
          <div className="absolute bottom-28 right-18 w-1.5 h-1.5 bg-pink-300/70 rounded-full animate-bounce" style={{animationDelay: '2.5s', animationDuration: '5.5s'}}></div>
        </div>
        
        {/* Content with enhanced styling */}
        <div className="absolute bottom-0 left-0 right-0 p-6 lg:p-8 bg-gradient-to-t from-black/85 via-black/50 to-transparent">
          <div className="text-white transform hover:translate-y-[-2px] transition-all duration-300">
            <h3 className="text-xl lg:text-2xl font-bold mb-3 text-white drop-shadow-lg">
              Join Our Community
            </h3>
            <p className="text-sm lg:text-base text-white/95 leading-relaxed backdrop-blur-sm bg-black/20 rounded-lg p-3 border border-white/20">
              Start creating stunning digital business cards with advanced features and cutting-edge design
            </p>
          </div>
        </div>
        
        {/* Border accent */}
        <div className="absolute top-0 right-0 w-1 h-full bg-gradient-to-b from-purple-400/60 via-pink-400/40 to-transparent"></div>
      </div>
    </div>
    </>
  );
};

export default RegisterPage;
