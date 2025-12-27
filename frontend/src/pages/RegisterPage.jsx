import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { useI18n } from '../hooks/useI18n';
import { useTheme } from '../context/ThemeContext';

const RegisterPage = () => {
  const navigate = useNavigate();
  const { register, loading, error, clearError } = useAuth();
  const { t, isRTL } = useI18n();
  const { isDark } = useTheme();
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
    role: 'user' // Default role
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

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setValidationError(t('validation.invalidEmail'));
      return false;
    }

    // Phone validation (optional but if provided must be valid)
    if (formData.phone && formData.phone.trim()) {
      const phoneRegex = /^[+]?[1-9][\d]{0,15}$/;
      if (!phoneRegex.test(formData.phone.replace(/[\s\-()]/g, ''))) {
        setValidationError(t('validation.invalidPhone'));
        return false;
      }
    }

    // Password validation: 8+ chars, 1 uppercase, 1 lowercase, 1 number, 1 special char
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?])[A-Za-z\d!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]{8,}$/;
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
      // Erreur gérée par AuthContext
    }
  };

  const displayError = validationError || error;

  return (
    <div className={`min-h-screen ${isDark ? 'dark-gradient' : 'primary-gradient'} flex flex-col justify-center py-12 px-4 ${isRTL ? 'rtl' : 'ltr'}`} data-testid="register-page" dir={isRTL ? 'rtl' : 'ltr'}>
      <div className="w-full max-w-md mx-auto">
        <div className="text-center mb-8">
          <h2 className={`text-4xl font-bold ${isDark ? 'text-white' : 'text-white'} mb-4 animate-float`}>
            {t('auth.registerTitle')}
          </h2>
          <p className={`text-lg ${isDark ? 'text-gray-300' : 'text-indigo-200'}`}>
            {t('auth.registerSubtitle')}
          </p>
        </div>

        <div className={`${isDark ? 'bg-gray-800/80 backdrop-blur-lg border border-gray-700' : 'bg-white/10 backdrop-blur-lg border border-white/20'} rounded-2xl p-8 shadow-2xl w-full max-w-md`}>
          {displayError && (
            <div className={`mb-6 p-4 ${isDark ? 'bg-red-900/30 border border-red-700/50' : 'bg-red-500/20 border border-red-400/30'} rounded-lg backdrop-blur-sm`}>
              <p className={`text-sm ${isDark ? 'text-red-300' : 'text-red-200'} font-medium`}>{displayError}</p>
            </div>
          )}

          {success && (
            <div className={`mb-6 p-4 ${isDark ? 'bg-green-900/30 border border-green-700/50' : 'bg-green-500/20 border border-green-400/30'} rounded-lg backdrop-blur-sm`}>
              <p className={`text-sm ${isDark ? 'text-green-300' : 'text-green-200'} font-medium`}>{success}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5" data-testid="register-form">
            <div>
              <label htmlFor="firstName" className={`block text-sm font-medium ${isDark ? 'text-gray-200' : 'text-white'} mb-2`}>
                {t('auth.firstName')}
              </label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                className={`w-full px-4 py-3 border ${isDark ? 'border-gray-600 bg-gray-700/50 text-white placeholder-gray-400 hover:bg-gray-600/50 focus:ring-blue-500' : 'border-white/30 bg-white/10 text-white placeholder-white/60 hover:bg-white/20 focus:ring-blue-400'} rounded-lg focus:ring-2 focus:border-transparent transition-all duration-200 backdrop-blur-sm`}
                placeholder={t('auth.firstNamePlaceholder')}
                required
                data-testid="register-firstName"
              />
            </div>

            <div>
              <label htmlFor="lastName" className={`block text-sm font-medium ${isDark ? 'text-gray-200' : 'text-white'} mb-2`}>
                {t('auth.lastName')}
              </label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                className={`w-full px-4 py-3 border ${isDark ? 'border-gray-600 bg-gray-700/50 text-white placeholder-gray-400 hover:bg-gray-600/50 focus:ring-blue-500' : 'border-white/30 bg-white/10 text-white placeholder-white/60 hover:bg-white/20 focus:ring-blue-400'} rounded-lg focus:ring-2 focus:border-transparent transition-all duration-200 backdrop-blur-sm`}
                placeholder={t('auth.lastNamePlaceholder')}
                required
                data-testid="register-lastName"
              />
            </div>

            <div>
              <label htmlFor="phone" className={`block text-sm font-medium ${isDark ? 'text-gray-200' : 'text-white'} mb-2`}>
                {t('auth.phone')} <span className="text-gray-400 text-xs">({t('validation.optional')})</span>
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className={`w-full px-4 py-3 border ${isDark ? 'border-gray-600 bg-gray-700/50 text-white placeholder-gray-400 hover:bg-gray-600/50 focus:ring-blue-500' : 'border-white/30 bg-white/10 text-white placeholder-white/60 hover:bg-white/20 focus:ring-blue-400'} rounded-lg focus:ring-2 focus:border-transparent transition-all duration-200 backdrop-blur-sm`}
                placeholder={t('auth.phonePlaceholder')}
                data-testid="register-phone"
              />
            </div>

            <div>
              <label htmlFor="email" className={`block text-sm font-medium ${isDark ? 'text-gray-200' : 'text-white'} mb-2`}>
                {t('auth.email')}
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className={`w-full px-4 py-3 border ${isDark ? 'border-gray-600 bg-gray-700/50 text-white placeholder-gray-400 hover:bg-gray-600/50 focus:ring-blue-500' : 'border-white/30 bg-white/10 text-white placeholder-white/60 hover:bg-white/20 focus:ring-blue-400'} rounded-lg focus:ring-2 focus:border-transparent transition-all duration-200 backdrop-blur-sm`}
                placeholder={t('auth.emailPlaceholder')}
                required
                data-testid="register-email"
              />
            </div>

            <div>
              <label htmlFor="password" className={`block text-sm font-medium ${isDark ? 'text-gray-200' : 'text-white'} mb-2`}>
                {t('auth.password')}
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className={`w-full px-4 py-3 border ${isDark ? 'border-gray-600 bg-gray-700/50 text-white placeholder-gray-400 hover:bg-gray-600/50 focus:ring-blue-500' : 'border-white/30 bg-white/10 text-white placeholder-white/60 hover:bg-white/20 focus:ring-blue-400'} rounded-lg focus:ring-2 focus:border-transparent transition-all duration-200 backdrop-blur-sm`}
                placeholder={t('auth.passwordPlaceholder')}
                required
                data-testid="register-password"
              />
            </div>

            <div>
              <label htmlFor="confirmPassword" className={`block text-sm font-medium ${isDark ? 'text-gray-200' : 'text-white'} mb-2`}>
                {t('auth.confirmPassword')}
              </label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                className={`w-full px-4 py-3 border ${isDark ? 'border-gray-600 bg-gray-700/50 text-white placeholder-gray-400 hover:bg-gray-600/50 focus:ring-blue-500' : 'border-white/30 bg-white/10 text-white placeholder-white/60 hover:bg-white/20 focus:ring-blue-400'} rounded-lg focus:ring-2 focus:border-transparent transition-all duration-200 backdrop-blur-sm`}
                placeholder={t('auth.confirmPasswordPlaceholder')}
                required
                data-testid="register-confirmPassword"
              />
            </div>

            <div>
              <label htmlFor="role" className={`block text-sm font-medium ${isDark ? 'text-gray-200' : 'text-white'} mb-2`}>
{t('auth.accountType')}
              </label>
              <select
                id="role"
                name="role"
                value={formData.role}
                onChange={handleChange}
                className={`w-full px-4 py-3 border ${isDark ? 'border-gray-600 bg-gray-700/50 text-white hover:bg-gray-600/50 focus:ring-blue-500' : 'border-white/30 bg-white/10 text-white hover:bg-white/20 focus:ring-blue-400'} rounded-lg focus:ring-2 focus:border-transparent transition-all duration-200 backdrop-blur-sm`}
                data-testid="register-role"
              >
                <option value="user" className="bg-gray-800 text-white">{t('auth.userAccount')}</option>
                <option value="business" className="bg-gray-800 text-white">{t('auth.businessAccount')}</option>
                <option value="admin" className="bg-gray-800 text-white">{t('auth.adminAccount')}</option>
              </select>
              <p className={`mt-2 text-xs ${isDark ? 'text-gray-400' : 'text-white/70'}`}>
                {formData.role === 'user' && t('validation.userAccountDesc')}
                {formData.role === 'business' && t('validation.businessAccountDesc')}
                {formData.role === 'admin' && t('validation.adminAccountDesc')}
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
                  t('validation.registerSubmit')
                )}
              </button>
            </div>
          </form>

          <div className="mt-6 text-center">
            <p className={`text-sm ${isDark ? 'text-gray-300' : 'text-white/80'}`}>
              {t('validation.haveAccount')} {' '}
              <Link 
                to="/login" 
                className={`font-medium ${isDark ? 'text-blue-400 hover:text-blue-300' : 'text-blue-300 hover:text-blue-200'} transition-colors`}
                data-testid="login-link"
              >
                {t('auth.loginButton')}
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
