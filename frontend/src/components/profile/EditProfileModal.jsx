import { useState } from 'react';
import { useI18n } from '../../hooks/useI18n';
import { useTheme } from '../../contexts/ThemeContext';

const EditProfileModal = ({ isOpen, onClose, user, onSave }) => {
  const { t } = useI18n();
  const { isDark } = useTheme();
  
  const [formData, setFormData] = useState({
    firstName: user?.firstName || '',
    lastName: user?.lastName || '',
    email: user?.email || '',
    phone: user?.phone || '',
    bio: user?.bio || ''
  });
  
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.firstName.trim()) {
      newErrors.firstName = t('common.firstNameRequired');
    }
    
    if (!formData.lastName.trim()) {
      newErrors.lastName = t('common.lastNameRequired');
    }
    
    if (!formData.email.trim()) {
      newErrors.email = t('validation.emailRequired');
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = t('validation.emailInvalid');
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setLoading(true);
    try {
      await onSave(formData);
      onClose();
    } catch (error) {
      // Error updating profile
      setErrors({ general: t('common.updateError') });
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className={`${isDark ? 'bg-gray-800/90 border-gray-700' : 'bg-white/90 border-gray-200'} backdrop-blur-lg rounded-2xl p-6 w-full max-w-md shadow-3d border`}>
        <div className="flex justify-between items-center mb-6">
          <h2 className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
            {t('common.editProfile')}
          </h2>
          <button
            onClick={onClose}
            className={`p-2 rounded-lg ${isDark ? 'hover:bg-gray-700' : 'hover:bg-gray-100'} transition-colors`}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {errors.general && (
            <div className="p-3 bg-red-500/20 border border-red-500/50 rounded-lg text-red-400 text-sm">
              {errors.general}
            </div>
          )}

          <div>
            <label className={`block text-sm font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'} mb-2`}>
              {t('common.firstName')}
            </label>
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              className={`w-full px-4 py-3 rounded-lg border ${
                errors.firstName 
                  ? 'border-red-500 focus:border-red-500' 
                  : isDark 
                    ? 'border-gray-600 focus:border-blue-500 bg-gray-700/50 text-white' 
                    : 'border-gray-300 focus:border-blue-500 bg-white text-gray-900'
              } focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-colors`}
              placeholder={t('common.firstNamePlaceholder')}
            />
            {errors.firstName && (
              <p className="mt-1 text-sm text-red-400">{errors.firstName}</p>
            )}
          </div>

          <div>
            <label className={`block text-sm font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'} mb-2`}>
              {t('common.lastName')}
            </label>
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              className={`w-full px-4 py-3 rounded-lg border ${
                errors.lastName 
                  ? 'border-red-500 focus:border-red-500' 
                  : isDark 
                    ? 'border-gray-600 focus:border-blue-500 bg-gray-700/50 text-white' 
                    : 'border-gray-300 focus:border-blue-500 bg-white text-gray-900'
              } focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-colors`}
              placeholder={t('common.lastNamePlaceholder')}
            />
            {errors.lastName && (
              <p className="mt-1 text-sm text-red-400">{errors.lastName}</p>
            )}
          </div>

          <div>
            <label className={`block text-sm font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'} mb-2`}>
              {t('common.email')}
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={`w-full px-4 py-3 rounded-lg border ${
                errors.email 
                  ? 'border-red-500 focus:border-red-500' 
                  : isDark 
                    ? 'border-gray-600 focus:border-blue-500 bg-gray-700/50 text-white' 
                    : 'border-gray-300 focus:border-blue-500 bg-white text-gray-900'
              } focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-colors`}
              placeholder={t('auth.emailPlaceholder')}
            />
            {errors.email && (
              <p className="mt-1 text-sm text-red-400">{errors.email}</p>
            )}
          </div>

          <div>
            <label className={`block text-sm font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'} mb-2`}>
              {t('common.phone')} ({t('common.optional')})
            </label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className={`w-full px-4 py-3 rounded-lg border ${
                isDark 
                  ? 'border-gray-600 focus:border-blue-500 bg-gray-700/50 text-white' 
                  : 'border-gray-300 focus:border-blue-500 bg-white text-gray-900'
              } focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-colors`}
              placeholder={t('common.phonePlaceholder')}
            />
          </div>

          <div>
            <label className={`block text-sm font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'} mb-2`}>
              {t('common.bio')} ({t('common.optional')})
            </label>
            <textarea
              name="bio"
              value={formData.bio}
              onChange={handleChange}
              rows={3}
              className={`w-full px-4 py-3 rounded-lg border ${
                isDark 
                  ? 'border-gray-600 focus:border-blue-500 bg-gray-700/50 text-white' 
                  : 'border-gray-300 focus:border-blue-500 bg-white text-gray-900'
              } focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-colors resize-none`}
              placeholder={t('common.bioPlaceholder')}
            />
          </div>

          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className={`flex-1 px-4 py-3 rounded-lg font-semibold ${
                isDark 
                  ? 'bg-gray-700 hover:bg-gray-600 text-white border border-gray-600' 
                  : 'bg-gray-100 hover:bg-gray-200 text-gray-900 border border-gray-300'
              } transition-colors`}
            >
              {t('common.cancel')}
            </button>
            <button
              type="submit"
              disabled={loading}
              className="btn-primary flex-1 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? t('common.saving') : t('common.saveChanges')}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditProfileModal;
