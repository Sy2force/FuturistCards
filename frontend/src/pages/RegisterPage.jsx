import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useTranslation } from "../hooks/useTranslation";
import { useRoleTheme } from '../context/ThemeProvider';

const RegisterPage = () => {
  const navigate = useNavigate();
  const { register, loading, error, clearError } = useAuth();
  const { t } = useTranslation();
  const { isDark } = useRoleTheme();
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

  const handleChange = (e) => {
    clearError();
    setValidationError('');
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const validateForm = () => {
    if (!formData.firstName || !formData.lastName || !formData.email || !formData.password || !formData.confirmPassword) {
      setValidationError(t('validation.required'));
      return false;
    }

    // Email validation (simplified - accept any email format)
    if (!formData.email || !formData.email.includes('@')) {
      setValidationError(t('validation.emailInvalid'));
      return false;
    }

    // Phone validation - optional field, validate format if provided
    if (formData.phone && formData.phone.trim() !== '') {
      const phoneRegex = /^[\+]?[0-9\s\-\(\)]{8,15}$/;
      if (!phoneRegex.test(formData.phone.trim())) {
        setValidationError(t('validation.phoneFormat'));
        return false;
      }
    }

    // Password validation - HackerU requirements: 1 uppercase, 1 lowercase, 1 digit, 1 special char, min 8 chars
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*_-])[A-Za-z\d!@#$%^&*_-]{8,}$/;
    if (!passwordRegex.test(formData.password)) {
      setValidationError(t('validation.passwordRequirements'));
      return false;
    }

    if (formData.password !== formData.confirmPassword) {
      setValidationError(t('validation.passwordsNotMatch'));
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
        setSuccess(t('validation.registerSuccess'));
        setTimeout(() => {
          navigate('/cards');
        }, 1500);
      }
    } catch (err) {
      // Error handled by AuthContext
    }
  };

  const displayError = validationError || error;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex" data-testid="register-page">
      {/* Left side - Form */}
      <div className="w-full lg:w-3/4 flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8 xl:px-20">
        <div className="mx-auto w-full max-w-md lg:max-w-lg xl:max-w-xl">
          <div className="text-center mb-8">
            <h2 className="text-4xl font-bold text-white mb-4 animate-float">
              {t('auth.register')}
            </h2>
            <p className="text-lg text-indigo-200">
              {t('auth.createNewAccount')}
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
                    {t('auth.firstName')}
                  </label>
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-white/30 bg-white/10 text-white placeholder-white/60 hover:bg-white/20 focus:ring-blue-400 rounded-lg focus:ring-2 focus:border-transparent transition-all duration-200 backdrop-blur-sm"
                    placeholder={t('auth.firstNamePlaceholder')}
                    required
                    data-testid="register-firstName"
                  />
                </div>

                <div>
                  <label htmlFor="lastName" className="block text-sm font-medium text-white mb-2">
                    {t('auth.lastName')}
                  </label>
                  <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-white/30 bg-white/10 text-white placeholder-white/60 hover:bg-white/20 focus:ring-blue-400 rounded-lg focus:ring-2 focus:border-transparent transition-all duration-200 backdrop-blur-sm"
                    placeholder={t('auth.lastNamePlaceholder')}
                    required
                    data-testid="register-lastName"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-white mb-2">
                  {t('auth.email')}
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-white/30 bg-white/10 text-white placeholder-white/60 hover:bg-white/20 focus:ring-blue-400 rounded-lg focus:ring-2 focus:border-transparent transition-all duration-200 backdrop-blur-sm"
                  placeholder={t('auth.emailPlaceholder')}
                  required
                  data-testid="register-email"
                />
              </div>

              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-white mb-2">
                  {t('auth.phone')} <span className="text-gray-400 text-xs">({t('auth.optional')})</span>
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-white/30 bg-white/10 text-white placeholder-white/60 hover:bg-white/20 focus:ring-blue-400 rounded-lg focus:ring-2 focus:border-transparent transition-all duration-200 backdrop-blur-sm"
                  placeholder={t('auth.phonePlaceholder')}
                  data-testid="register-phone"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="password" className="block text-sm font-medium text-white mb-2">
                    {t('auth.password')}
                  </label>
                  <input
                    type="password"
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-white/30 bg-white/10 text-white placeholder-white/60 hover:bg-white/20 focus:ring-blue-400 rounded-lg focus:ring-2 focus:border-transparent transition-all duration-200 backdrop-blur-sm"
                    placeholder={t('auth.passwordPlaceholder')}
                    required
                    data-testid="register-password"
                  />
                </div>

                <div>
                  <label htmlFor="confirmPassword" className="block text-sm font-medium text-white mb-2">
                    {t('auth.confirmPassword')}
                  </label>
                  <input
                    type="password"
                    id="confirmPassword"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-white/30 bg-white/10 text-white placeholder-white/60 hover:bg-white/20 focus:ring-blue-400 rounded-lg focus:ring-2 focus:border-transparent transition-all duration-200 backdrop-blur-sm"
                    placeholder={t('auth.confirmPasswordPlaceholder')}
                    required
                    data-testid="register-confirmPassword"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="role" className="block text-sm font-medium text-white mb-2">
                  {t('auth.accountType')}
                </label>
                <select
                  id="role"
                  name="role"
                  value={formData.role}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-white/30 bg-white/10 text-white hover:bg-white/20 focus:ring-blue-400 rounded-lg focus:ring-2 focus:border-transparent transition-all duration-200 backdrop-blur-sm"
                  data-testid="register-role"
                >
                  <option value="user" className="bg-gray-800 text-white">{t('auth.userAccount')}</option>
                  <option value="business" className="bg-gray-800 text-white">{t('auth.businessAccount')}</option>
                  <option value="admin" className="bg-gray-800 text-white">{t('auth.adminAccount')}</option>
                </select>
                <p className="mt-2 text-xs text-white/70">
                  {formData.role === 'user' && t('auth.userAccountDesc')}
                  {formData.role === 'business' && t('auth.businessAccountDesc')}
                  {formData.role === 'admin' && t('auth.adminAccountDesc')}
                </p>
              </div>

              <div>
                <button
                  type="submit"
                  className="btn-primary w-full flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-400"
                  disabled={loading}
                  data-testid="register-submit-button"
                >
                  {loading ? (
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                  ) : (
                    t('auth.signUp')
                  )}
                </button>
              </div>
            </form>

            <div className="mt-6 text-center">
              <p className="text-sm text-white/80">
                {t('auth.alreadyHaveAccount')} {' '}
                <Link 
                  to="/login" 
                  className="font-medium text-blue-300 hover:text-blue-200 transition-colors"
                  data-testid="login-link"
                >
                  {t('auth.signIn')}
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
            alt={t('auth.registerImageAlt')}
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
              {t('auth.joinFutureCommunity')}
            </h3>
            <p className="text-sm lg:text-base text-white/95 leading-relaxed backdrop-blur-sm bg-black/20 rounded-lg p-3 border border-white/20">
              {t('auth.registerDescription')}
            </p>
          </div>
        </div>
        
        {/* Border accent */}
        <div className="absolute top-0 right-0 w-1 h-full bg-gradient-to-b from-purple-400/60 via-pink-400/40 to-transparent"></div>
      </div>
    </div>
  );
};

export default RegisterPage;
