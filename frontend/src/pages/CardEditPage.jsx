import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { useI18n } from '../hooks/useI18n';
import { useTheme } from '../contexts/ThemeContext';

const CardEditPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { user } = useAuth();
  const { t, dir } = useI18n();
  const { isDark } = useTheme();
  const [loading, setLoading] = useState(false);
  const [cardLoading, setCardLoading] = useState(true);
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

  useEffect(() => {
    const fetchCard = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/cards/${id}`, {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        });
        
        if (response.ok) {
          const card = await response.json();
          setFormData({
            title: card.title || '',
            subtitle: card.subtitle || '',
            description: card.description || '',
            phone: card.phone || '',
            email: card.email || '',
            website: card.website || '',
            address: card.address || '',
            image: card.image || ''
          });
        }
      } catch (error) {
        // Error handling for card fetching
      } finally {
        setCardLoading(false);
      }
    };

    if (id) {
      fetchCard();
    }
  }, [id]);

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
      const response = await fetch(`${import.meta.env.VITE_API_URL}/cards/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify(formData)
      });
      
      if (response.ok) {
        setSuccess(true);
        setTimeout(() => {
          navigate(`/cards/${id}`);
        }, 1500);
      } else {
        const errorData = await response.json();
        setError(errorData.message || t('cardUpdateError'));
      }
    } catch (error) {
      // Error updating card - network error
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

  if (!user) {
    return (
      <div className={`min-h-screen flex items-center justify-center ${isDark ? 'bg-gray-900' : 'bg-gray-50'}`} data-testid="card-edit-unauthorized" dir={dir}>
        <div className="text-center">
          <h2 className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'} mb-4`}>{t('cardEdit.unauthorized')}</h2>
          <p className={`${isDark ? 'text-gray-300' : 'text-gray-600'} mb-6`}>{t('cardEdit.loginRequired')}</p>
          <button 
            onClick={() => navigate('/login')}
            className="btn-primary"
          >
            {t('auth.login')}
          </button>
        </div>
      </div>
    );
  }

  if (cardLoading) {
    return (
      <div className={`min-h-screen flex items-center justify-center ${isDark ? 'bg-gray-900' : 'bg-gray-50'}`} data-testid="card-edit-loading" dir={dir}>
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className={`${isDark ? 'text-gray-300' : 'text-gray-600'}`}>{t('cardEdit.loading')}</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen ${isDark ? 'bg-gray-900' : 'bg-gray-50'} py-8`} data-testid="card-edit-page" dir={dir}>
      <div className="container mx-auto max-w-2xl px-4">
        <div className={`${isDark ? 'bg-gray-800/80 backdrop-blur-lg border border-gray-700' : 'bg-white/80 backdrop-blur-lg border border-white/20'} rounded-xl shadow-xl p-8`}>
          <div className="text-center mb-8">
            <h1 className={`text-3xl font-bold ${isDark ? 'text-white' : 'text-gray-900'} mb-2`}>{t('editCard')}</h1>
            <p className={`${isDark ? 'text-gray-300' : 'text-gray-600'}`}>{t('updateCardInfo')}</p>
          </div>

          {/* Messages d'erreur et succès */}
          {error && (
            <div className="mb-6 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg" data-testid="card-edit-error">
              {error}
            </div>
          )}

          {success && (
            <div className="mb-6 p-4 bg-green-100 border border-green-400 text-green-700 rounded-lg" data-testid="card-edit-success">
              {t('cardUpdatedSuccessfully')}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="title" className={`block text-sm font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'} mb-2`}>
                {t('cardEdit.form.title')} *
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
                placeholder={t('cardEdit.form.titlePlaceholder')}
              />
            </div>

            <div>
              <label htmlFor="subtitle" className={`block text-sm font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'} mb-2`}>
                {t('cardEdit.form.subtitle')}
              </label>
              <input
                type="text"
                id="subtitle"
                name="subtitle"
                data-testid="card-subtitle-input"
                value={formData.subtitle}
                onChange={handleChange}
                className={`w-full px-4 py-3 border ${isDark ? 'border-gray-600 bg-gray-700 text-white placeholder-gray-400' : 'border-gray-300 bg-white text-gray-900 placeholder-gray-500'} rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors`}
                placeholder={t('cardEdit.form.subtitlePlaceholder')}
              />
            </div>

            <div>
              <label htmlFor="description" className={`block text-sm font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'} mb-2`}>
                {t('cardEdit.form.description')}
              </label>
              <textarea
                id="description"
                name="description"
                data-testid="card-description-input"
                value={formData.description}
                onChange={handleChange}
                rows={4}
                className={`w-full px-4 py-3 border ${isDark ? 'border-gray-600 bg-gray-700 text-white placeholder-gray-400' : 'border-gray-300 bg-white text-gray-900 placeholder-gray-500'} rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors`}
                placeholder={t('cardEdit.form.descriptionPlaceholder')}
              />
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="phone" className={`block text-sm font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'} mb-2`}>
                  {t('cardEdit.form.phone')}
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  data-testid="card-phone-input"
                  value={formData.phone}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 border ${isDark ? 'border-gray-600 bg-gray-700 text-white placeholder-gray-400' : 'border-gray-300 bg-white text-gray-900 placeholder-gray-500'} rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors`}
                  placeholder={t('cardEdit.form.phonePlaceholder')}
                />
              </div>

              <div>
                <label htmlFor="email" className={`block text-sm font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'} mb-2`}>
                  {t('cardEdit.form.email')}
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  data-testid="card-email-input"
                  value={formData.email}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 border ${isDark ? 'border-gray-600 bg-gray-700 text-white placeholder-gray-400' : 'border-gray-300 bg-white text-gray-900 placeholder-gray-500'} rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors`}
                  placeholder={t('cardEdit.form.emailPlaceholder')}
                />
              </div>
            </div>

            <div>
              <label htmlFor="website" className={`block text-sm font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'} mb-2`}>
                {t('cardEdit.form.website')}
              </label>
              <input
                type="url"
                id="website"
                name="website"
                data-testid="card-website-input"
                value={formData.website}
                onChange={handleChange}
                className={`w-full px-4 py-3 border ${isDark ? 'border-gray-600 bg-gray-700 text-white placeholder-gray-400' : 'border-gray-300 bg-white text-gray-900 placeholder-gray-500'} rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors`}
                placeholder={t('cardEdit.form.websitePlaceholder')}
              />
            </div>

            <div>
              <label htmlFor="address" className={`block text-sm font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'} mb-2`}>
                {t('cardEdit.form.address')}
              </label>
              <input
                type="text"
                id="address"
                name="address"
                data-testid="card-address-input"
                value={formData.address}
                onChange={handleChange}
                className={`w-full px-4 py-3 border ${isDark ? 'border-gray-600 bg-gray-700 text-white placeholder-gray-400' : 'border-gray-300 bg-white text-gray-900 placeholder-gray-500'} rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors`}
                placeholder={t('cardEdit.form.addressPlaceholder')}
              />
            </div>

            <div>
              <label htmlFor="image" className={`block text-sm font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'} mb-2`}>
                {t('cardEdit.form.image')}
              </label>
              <input
                type="url"
                id="image"
                name="image"
                data-testid="card-image-input"
                value={formData.image}
                onChange={handleChange}
                className={`w-full px-4 py-3 border ${isDark ? 'border-gray-600 bg-gray-700 text-white placeholder-gray-400' : 'border-gray-300 bg-white text-gray-900 placeholder-gray-500'} rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors`}
                placeholder={t('cardEdit.form.imagePlaceholder')}
              />
            </div>

            <div className="flex gap-4 pt-6">
              <button
                type="button"
                onClick={() => navigate(`/cards/${id}`)}
                data-testid="card-edit-cancel"
                className={`flex-1 px-6 py-3 border ${isDark ? 'border-gray-600 text-gray-300 hover:bg-gray-700' : 'border-gray-300 text-gray-700 hover:bg-gray-50'} rounded-lg transition-all duration-300 font-medium`}
              >
                {t('common.cancel')}
              </button>
              <button
                type="submit"
                disabled={loading}
                data-testid="card-edit-submit"
                className="btn-primary flex-1 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
              >
                {loading ? t('cardEdit.updating') : t('cardEdit.update')}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CardEditPage;
