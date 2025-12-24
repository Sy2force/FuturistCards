import React, { useState } from 'react';
import { useNavigate, Navigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { useI18n } from '../contexts/I18nContext';
import { useTheme } from '../contexts/ThemeContext';

const CardCreatePage = () => {
  const navigate = useNavigate();
  const { user, loading: authLoading } = useAuth();
  const { t } = useI18n();
  const { isDark } = useTheme();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    subtitle: '',
    description: '',
    phone: '',
    email: '',
    website: '',
    address: '',
    image: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    
    // Validation côté client
    if (!formData.title.trim()) {
      setError(t('titleRequired'));
      setLoading(false);
      return;
    }
    
    try {
      // API call to create card
      const response = await fetch(`${import.meta.env.VITE_API_URL}/cards`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify(formData)
      });
      
      if (response.ok) {
        setSuccess(true);
        setTimeout(() => {
          navigate('/my-cards');
        }, 1500);
      } else {
        const errorData = await response.json();
        setError(errorData.message || t('cardCreationError'));
      }
    } catch (error) {
      // Error creating card - network error
      setError(t('networkError'));
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  if (authLoading) {
    return (
      <div className={`min-h-screen ${isDark ? 'bg-gray-900' : 'bg-gray-50'} flex items-center justify-center`}>
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" />;
  }

  if (user.role !== 'business' && user.role !== 'admin') {
    return <Navigate to="/unauthorized" />;
  }

  return (
    <div className={`min-h-screen ${isDark ? 'bg-gray-900' : 'bg-gray-50'} py-8`} data-testid="card-create-page">
      <div className="container mx-auto max-w-2xl px-4">
        <div className={`${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} rounded-xl shadow-md p-8 border backdrop-blur-sm`}>
          <div className="text-center mb-8">
            <h1 className={`text-3xl font-bold ${isDark ? 'text-white' : 'text-gray-900'} mb-2`}>{t('createNewCardTitle')}</h1>
            <p className={`${isDark ? 'text-gray-300' : 'text-gray-600'}`}>{t('fillCardInfo')}</p>
          </div>

          {/* Messages d'erreur et succès */}
          {error && (
            <div className="mb-6 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg" data-testid="card-create-error">
              {error}
            </div>
          )}

          {success && (
            <div className="mb-6 p-4 bg-green-100 border border-green-400 text-green-700 rounded-lg" data-testid="card-create-success">
              {t('cardCreatedSuccessfully')}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="title" className={`block text-sm font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'} mb-2`}>
                {t('titleRequired')}
              </label>
              <input
                type="text"
                id="title"
                name="title"
                data-testid="card-title-input"
                value={formData.title}
                onChange={handleChange}
                required
                className={`w-full px-4 py-3 border ${isDark ? 'border-gray-600 bg-gray-700 text-white placeholder-gray-400' : 'border-gray-300 bg-white text-gray-900 placeholder-gray-500'} rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors`}
                placeholder={t('titlePlaceholder')}
              />
            </div>

            <div>
              <label htmlFor="subtitle" className={`block text-sm font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'} mb-2`}>
                {t('subtitle')}
              </label>
              <input
                type="text"
                id="subtitle"
                name="subtitle"
                data-testid="card-subtitle-input"
                value={formData.subtitle}
                onChange={handleChange}
                className={`w-full px-4 py-3 border ${isDark ? 'border-gray-600 bg-gray-700 text-white placeholder-gray-400' : 'border-gray-300 bg-white text-gray-900 placeholder-gray-500'} rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors`}
                placeholder={t('subtitlePlaceholder')}
              />
            </div>

            <div>
              <label htmlFor="description" className={`block text-sm font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'} mb-2`}>
                {t('description')}
              </label>
              <textarea
                id="description"
                name="description"
                data-testid="card-description-input"
                value={formData.description}
                onChange={handleChange}
                rows={4}
                className={`w-full px-4 py-3 border ${isDark ? 'border-gray-600 bg-gray-700 text-white placeholder-gray-400' : 'border-gray-300 bg-white text-gray-900 placeholder-gray-500'} rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors`}
                placeholder={t('descriptionPlaceholder')}
              />
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="phone" className={`block text-sm font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'} mb-2`}>
                  {t('phone')}
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  data-testid="card-phone-input"
                  value={formData.phone}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 border ${isDark ? 'border-gray-600 bg-gray-700 text-white placeholder-gray-400' : 'border-gray-300 bg-white text-gray-900 placeholder-gray-500'} rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors`}
                  placeholder={t('phonePlaceholder')}
                />
              </div>

              <div>
                <label htmlFor="email" className={`block text-sm font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'} mb-2`}>
                  {t('email')}
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  data-testid="card-email-input"
                  value={formData.email}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 border ${isDark ? 'border-gray-600 bg-gray-700 text-white placeholder-gray-400' : 'border-gray-300 bg-white text-gray-900 placeholder-gray-500'} rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors`}
                  placeholder={t('emailPlaceholder')}
                />
              </div>
            </div>

            <div>
              <label htmlFor="website" className={`block text-sm font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'} mb-2`}>
                {t('website')}
              </label>
              <input
                type="url"
                id="website"
                name="website"
                data-testid="card-website-input"
                value={formData.website}
                onChange={handleChange}
                className={`w-full px-4 py-3 border ${isDark ? 'border-gray-600 bg-gray-700 text-white placeholder-gray-400' : 'border-gray-300 bg-white text-gray-900 placeholder-gray-500'} rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors`}
                placeholder={t('websitePlaceholder')}
              />
            </div>

            <div>
              <label htmlFor="address" className={`block text-sm font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'} mb-2`}>
                {t('address')}
              </label>
              <input
                type="text"
                id="address"
                name="address"
                data-testid="card-address-input"
                value={formData.address}
                onChange={handleChange}
                className={`w-full px-4 py-3 border ${isDark ? 'border-gray-600 bg-gray-700 text-white placeholder-gray-400' : 'border-gray-300 bg-white text-gray-900 placeholder-gray-500'} rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors`}
                placeholder={t('addressPlaceholder')}
              />
            </div>

            <div>
              <label htmlFor="image" className={`block text-sm font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'} mb-2`}>
                {t('imageUrl')}
              </label>
              <input
                type="url"
                id="image"
                name="image"
                data-testid="card-image-input"
                value={formData.image}
                onChange={handleChange}
                className={`w-full px-4 py-3 border ${isDark ? 'border-gray-600 bg-gray-700 text-white placeholder-gray-400' : 'border-gray-300 bg-white text-gray-900 placeholder-gray-500'} rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors`}
                placeholder={t('imagePlaceholder')}
              />
            </div>

            <div className="flex gap-4 pt-6">
              <button
                type="button"
                onClick={() => navigate('/cards')}
                data-testid="card-create-cancel"
                className={`flex-1 px-6 py-3 border ${isDark ? 'border-gray-600 text-gray-300 hover:bg-gray-700' : 'border-gray-300 text-gray-700 hover:bg-gray-50'} rounded-lg transition-all duration-200 font-medium hover:shadow-md`}
              >
                {t('cancel')}
              </button>
              <button
                type="submit"
                disabled={loading}
                data-testid="card-create-submit"
                className="flex-1 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-lg transition-all duration-200 font-medium disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-lg hover:-translate-y-0.5"
              >
                {loading ? t('creating') : t('createCardAction')}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CardCreatePage;
