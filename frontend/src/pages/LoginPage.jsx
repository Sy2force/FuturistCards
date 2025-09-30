import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { useLanguage } from '../context/LanguageContext';

const LoginPageSimple = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const navigate = useNavigate();
  const { login } = useAuth();
  const { t } = useLanguage();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      await login(formData.email, formData.password);
      navigate('/');
    } catch (error) {
      setError(error.message || t('loginError'));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center px-4">
      <div className="max-w-md w-full space-y-8">
        {/* En-tête */}
        <div className="text-center">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mb-2">
            {t('login')}
          </h1>
          <p className="text-gray-600 dark:text-gray-400 text-lg">
            {t('accessYourAccount')}
          </p>
        </div>

        {/* Formulaire */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg">
          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-3">
                <p className="text-red-600 dark:text-red-400 text-sm">{error}</p>
              </div>
            )}

            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                {t('emailAddress')}
              </label>
              <input
                type="email"
                name="email"
                id="email"
                value={formData.email}
                onChange={handleChange}
                required
                placeholder={t('emailPlaceholder')}
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
              />
            </div>

            {/* Mot de passe */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                {t('password')}
              </label>
              <input
                type="password"
                name="password"
                id="password"
                value={formData.password}
                onChange={handleChange}
                required
                placeholder={t('passwordPlaceholder')}
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
              />
            </div>

            {/* Bouton de connexion */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-500 hover:bg-blue-600 disabled:bg-blue-300 text-white py-3 px-4 rounded-lg font-medium transition-colors"
            >
              {loading ? t('loggingIn') : t('signIn')}
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-gray-600 dark:text-gray-400">
              {t('noAccount')}{' '}
              <Link 
                to="/register" 
                className="text-blue-500 hover:text-blue-600 font-medium"
              >
                {t('signUp')}
              </Link>
            </p>
          </div>
        </div>

        {/* Compte de démonstration */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4 text-center">
            {t('demoAccount')}
          </h3>
          <div className="space-y-2 text-sm text-center">
            <div>
              <span className="text-gray-600 dark:text-gray-400">{t('email')} : </span>
              <span className="text-blue-500 font-mono">demo@futuristcards.com</span>
            </div>
            <div>
              <span className="text-gray-600 dark:text-gray-400">{t('password')} : </span>
              <span className="text-green-500 font-mono">Demo123!</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPageSimple;
