import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { toast } from 'react-hot-toast';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../context/AuthContext';
import api from '../services/api';
import { 
  UserIcon, 
  EnvelopeIcon, 
  PhoneIcon, 
  GlobeAltIcon, 
  MapPinIcon,
  PhotoIcon,
  PlusIcon,
  XMarkIcon,
  DocumentCheckIcon,
  ArrowLeftIcon
} from '@heroicons/react/24/outline';

const CreateCardPage = () => {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    title: '',
    subtitle: '',
    company: '',
    position: '',
    description: '',
    email: '',
    phone: '',
    website: '',
    address: '',
    category: 'technology',
    image: null
  });
  const [imagePreview, setImagePreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [validationErrors, setValidationErrors] = useState({});
  const fileInputRef = useRef(null);

  const navigate = useNavigate();
  const { user } = useAuth();

  // Auto-fill user data if available
  React.useEffect(() => {
    if (user) {
      setFormData(prev => ({
        ...prev,
        email: user.email || prev.email,
        title: user.name || prev.title,
      }));
    }
  }, [user]);

  const categories = [
    { value: 'technology', label: t('technology') },
    { value: 'business', label: t('business') },
    { value: 'creative', label: t('creative') },
    { value: 'healthcare', label: t('healthcare') },
    { value: 'education', label: t('education') },
    { value: 'finance', label: t('finance') },
    { value: 'marketing', label: t('marketing') },
    { value: 'consulting', label: t('consulting') },
    { value: 'retail', label: t('retail') },
    { value: 'other', label: t('other') }
  ];

  // Real-time validation
  const validateField = (name, value) => {
    const errors = { ...validationErrors };
    
    switch (name) {
      case 'email':
        if (value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
          errors.email = t('invalidEmail');
        } else {
          delete errors.email;
        }
        break;
      case 'phone':
        if (value && !/^[\+]?[1-9][\d]{0,15}$/.test(value.replace(/\s/g, ''))) {
          errors.phone = t('invalidPhone');
        } else {
          delete errors.phone;
        }
        break;
      case 'website':
        if (value && !/^https?:\/\/.+\..+/.test(value)) {
          errors.website = t('invalidWebsite');
        } else {
          delete errors.website;
        }
        break;
      default:
        break;
    }
    
    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    setError('');
    
    // Real-time validation
    validateField(name, value);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) { // 5MB limit
        toast.error(t('createCard.imageTooLarge'));
        return;
      }
      
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target.result);
        setFormData(prev => ({
          ...prev,
          image: file
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => {
    setImagePreview(null);
    setFormData(prev => ({
      ...prev,
      image: null
    }));
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    // Validation des champs requis
    if (!formData.title || !formData.email) {
      toast.error('Le nom complet et l\'email sont obligatoires');
      setLoading(false);
      return;
    }

    try {
      // Préparer les données de la carte selon le schéma backend
      const cardData = {
        title: formData.title,
        subtitle: formData.subtitle || formData.position || '',
        description: formData.description || `Carte professionnelle de ${formData.title}${formData.company ? ' chez ' + formData.company : ''}`,
        email: formData.email,
        phone: formData.phone || '',
        website: formData.website || '',
        company: formData.company || '',
        position: formData.position || formData.subtitle || '',
        address: formData.address || '',
        isPublic: true
      };

      console.log('Création carte avec données:', cardData);
      const response = await api.createCard(cardData);
      
      if (response.success) {
        toast.success('🎉 Votre carte a été créée avec succès !');
        navigate('/my-cards');
      } else {
        throw new Error(response.message || 'Erreur lors de la création');
      }
    } catch (error) {
      console.error('Erreur création carte:', error);
      let errorMessage = 'Une erreur est survenue lors de la création de votre carte';
      
      if (error.response?.data?.message) {
        errorMessage = error.response.data.message;
      } else if (error.message) {
        errorMessage = error.message;
      }
      
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };


  // Toujours permettre l'accès au formulaire de création
  // if (!user) {
  //   return (
  //     <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center px-4">
  //       <div className="text-center">
  //         <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">
  //           {t('accessRestricted')}
  //         </h1>
  //         <p className="text-gray-600 dark:text-gray-400 mb-6">
  //           {t('needAccount')}
  //         </p>
  //         <button 
  //           onClick={() => navigate('/login')}
  //           className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg mr-4"
  //         >
  //           {t('login')}
  //         </button>
  //         <button 
  //           onClick={() => navigate('/register')}
  //           className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-lg"
  //         >
  //           {t('register')}
  //         </button>
  //       </div>
  //     </div>
  //   );
  // }

  return (
    <>
      <Helmet>
        <title>{t('createNewCardTitle')} - CardPro</title>
        <meta name="description" content={t('createCardDescription')} />
      </Helmet>
      
      <motion.div 
        className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-blue-900 py-12"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <motion.div 
            className="text-center mb-12"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.5 }}
          >
            <motion.div 
              className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl mb-6"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <PlusIcon className="w-8 h-8 text-white" />
            </motion.div>
            <motion.h1 
              className="text-4xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent mb-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              {t('createNewCard')}
            </motion.h1>
            <motion.p 
              className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
            >
              {t('createCardSubtitle')}
            </motion.p>
          </motion.div>

          <motion.div 
            className="grid grid-cols-1 lg:grid-cols-3 gap-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
          >
          {/* Preview Card */}
          <div className="lg:col-span-1">
            <div className="sticky top-8">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4 flex items-center">
                <PhotoIcon className="w-5 h-5 mr-2" />
                {t('cardPreview')}
              </h3>
                <motion.div 
                  className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-xl border border-gray-200 dark:border-gray-700"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.6, duration: 0.5 }}
                >
                <div className="text-center">
                  <div className="relative inline-block mb-4">
                    {imagePreview ? (
                      <img
                        src={imagePreview}
                        alt="Profile"
                        className="w-24 h-24 rounded-full object-cover border-4 border-blue-200 dark:border-blue-800"
                      />
                    ) : (
                      <div className="w-24 h-24 rounded-full bg-gradient-to-r from-blue-400 to-purple-500 flex items-center justify-center">
                        <UserIcon className="w-12 h-12 text-white" />
                      </div>
                    )}
                  </div>
                  <h4 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-1">
                    {formData.title || t('yourName')}
                  </h4>
                  <p className="text-blue-600 dark:text-blue-400 font-medium mb-3">
                    {formData.subtitle || t('yourPosition')}
                  </p>
                  <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">
                    {formData.description || t('yourDescription')}
                  </p>
                  <div className="space-y-2 text-sm">
                    {formData.email && (
                      <div className="flex items-center justify-center text-gray-600 dark:text-gray-400">
                        <EnvelopeIcon className="w-4 h-4 mr-2" />
                        {formData.email}
                      </div>
                    )}
                    {formData.phone && (
                      <div className="flex items-center justify-center text-gray-600 dark:text-gray-400">
                        <PhoneIcon className="w-4 h-4 mr-2" />
                        {formData.phone}
                      </div>
                    )}
                  </div>
                </div>
                </motion.div>
              </div>
            </div>

          {/* Form */}
          <div className="lg:col-span-2">
            <motion.div 
              className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 p-8"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5, duration: 0.5 }}
            >
              <div className="bg-gradient-to-r from-blue-500 via-purple-600 to-pink-500 px-8 py-6 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600/90 to-purple-700/90" />
                <div className="relative z-10">
                  <h2 className="text-3xl font-bold text-white mb-2">✨ Créer ma carte professionnelle</h2>
                  <p className="text-blue-100 text-lg">Remplissez vos informations pour créer une carte professionnelle moderne et élégante</p>
                  <div className="flex items-center mt-3 text-sm text-blue-200">
                    <span className="inline-flex items-center mr-4">
                      <span className="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse"></span>
                      Création illimitée
                    </span>
                    <span className="inline-flex items-center">
                      <span className="w-2 h-2 bg-yellow-400 rounded-full mr-2 animate-pulse"></span>
                      Publication instantanée
                    </span>
                  </div>
                </div>
              </div>

              <form onSubmit={handleSubmit} className="space-y-8">
                {error && (
                  <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl p-4">
                    <p className="text-red-600 dark:text-red-400 text-sm font-medium">{error}</p>
                  </div>
                )}

                {/* Photo Upload */}
                <div className="text-center">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-4">
                    {t('profilePhoto')}
                  </label>
                  <div className="relative inline-block">
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                      className="hidden"
                    />
                    {imagePreview ? (
                      <div className="relative">
                        <img
                          src={imagePreview}
                          alt="Preview"
                          className="w-32 h-32 rounded-full object-cover border-4 border-blue-200 dark:border-blue-800 shadow-lg"
                        />
                        <motion.button
                          type="button"
                          onClick={removeImage}
                          className="absolute -top-2 -right-2 bg-red-500 hover:bg-red-600 text-white rounded-full p-2 shadow-lg transition-colors"
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                        >
                          <XMarkIcon className="w-4 h-4" />
                        </motion.button>
                      </div>
                    ) : (
                      <button
                        type="button"
                        onClick={() => fileInputRef.current?.click()}
                        className="w-32 h-32 rounded-full border-2 border-dashed border-gray-300 dark:border-gray-600 hover:border-blue-500 dark:hover:border-blue-400 flex items-center justify-center bg-gray-50 dark:bg-gray-700 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-all group"
                      >
                        <div className="text-center">
                          <PhotoIcon className="w-8 h-8 text-gray-400 group-hover:text-blue-500 mx-auto mb-2" />
                          <p className="text-xs text-gray-500 dark:text-gray-400 group-hover:text-blue-500">
                            {t('addPhoto')}
                          </p>
                        </div>
                      </button>
                    )}
                  </div>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                    {t('imageFormats')}
                  </p>
                </div>

                {/* Personal Info */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="relative">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      <UserIcon className="w-4 h-4 inline mr-1" />
                      Nom complet *
                    </label>
                    <input
                      type="text"
                      name="title"
                      data-testid="input-title"
                      value={formData.title}
                      onChange={handleChange}
                      required
                      placeholder="Ex: Jean Dupont"
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 transition-all"
                    />
                  </div>

                  <div className="relative">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      <UserIcon className="w-4 h-4 inline mr-1" />
                      Titre/Poste *
                    </label>
                    <input
                      type="text"
                      name="subtitle"
                      data-testid="input-position"
                      value={formData.subtitle}
                      onChange={handleChange}
                      required
                      placeholder="Ex: Développeur Full Stack"
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 transition-all"
                    />
                  </div>
                </div>

                {/* Company & Position Fields */}
                <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-xl p-6 border border-blue-200 dark:border-blue-800">
                  <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4 flex items-center">
                    <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center mr-3">
                      <UserIcon className="w-4 h-4 text-white" />
                    </div>
                    {t('professionalDetails')}
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        🏢 {t('company')} *
                      </label>
                      <input
                        type="text"
                        name="company"
                        data-testid="input-company"
                        value={formData.company}
                        onChange={handleChange}
                        required
                        placeholder={t('companyPlaceholderDetailed')}
                        className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        💼 {t('position')} *
                      </label>
                      <input
                        type="text"
                        name="position"
                        data-testid="input-position-detail"
                        value={formData.position}
                        onChange={handleChange}
                        required
                        placeholder={t('positionPlaceholderDetailed')}
                        className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 transition-all"
                      />
                    </div>
                  </div>
                </div>

                {/* Description */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    {t('description')}
                  </label>
                  <textarea
                    name="description"
                    data-testid="input-description"
                    value={formData.description}
                    onChange={handleChange}
                    rows={4}
                    placeholder={t('descriptionPlaceholder')}
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 transition-all resize-none"
                  />
                </div>

                {/* Contact Info */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="relative">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      <EnvelopeIcon className="w-4 h-4 inline mr-1" />
                      {t('email')} *
                    </label>
                    <input
                      type="email"
                      name="email"
                      data-testid="input-email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      placeholder={t('emailPlaceholder')}
                      className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 transition-all ${
                        validationErrors.email 
                          ? 'border-red-500 dark:border-red-400' 
                          : 'border-gray-300 dark:border-gray-600'
                      }`}
                    />
                    {validationErrors.email && (
                      <p className="text-red-500 text-xs mt-1">{validationErrors.email}</p>
                    )}
                  </div>

                  <div className="relative">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      <PhoneIcon className="w-4 h-4 inline mr-1" />
                      {t('phone')} *
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      data-testid="input-phone"
                      value={formData.phone}
                      onChange={handleChange}
                      required
                      placeholder={t('phonePlaceholder')}
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 transition-all"
                    />
                  </div>
                </div>

                {/* Additional Info */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="relative">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      <GlobeAltIcon className="w-4 h-4 inline mr-1" />
                      {t('website')}
                    </label>
                    <input
                      type="url"
                      name="website"
                      value={formData.website}
                      onChange={handleChange}
                      placeholder={t('websitePlaceholder')}
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 transition-all"
                    />
                  </div>

                  <div className="relative">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      {t('category')} *
                    </label>
                    <select
                      name="category"
                      value={formData.category}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 transition-all"
                    >
                      {categories.map(category => (
                        <option key={category.value} value={category.value}>
                          {category.label}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Address */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    <MapPinIcon className="w-4 h-4 inline mr-1" />
                    {t('address')}
                  </label>
                  <input
                    type="text"
                    name="address"
                    data-testid="input-address"
                    value={formData.address}
                    onChange={handleChange}
                    placeholder={t('addressPlaceholder')}
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 transition-all"
                  />
                </div>

                {/* Submit Button */}
                <div className="flex justify-end space-x-4">
                  <motion.button
                    type="button"
                    onClick={() => navigate('/cards')}
                    className="px-6 py-3 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-xl hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors font-medium"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <ArrowLeftIcon className="w-5 h-5 mr-2 inline" />
                    {t('cancel')}
                  </motion.button>
                  <motion.button
                    type="submit"
                    data-testid="submit-button"
                    disabled={loading}
                    className="px-8 py-3 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white rounded-xl font-medium shadow-lg hover:shadow-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
                    whileHover={{ scale: loading ? 1 : 1.02 }}
                    whileTap={{ scale: loading ? 1 : 0.98 }}
                  >
                    {loading ? (
                      <>
                        <motion.div 
                          className="rounded-full h-5 w-5 border-b-2 border-white mr-2"
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                        ></motion.div>
                        {t('creating')}...
                      </>
                    ) : (
                      <>
                        <DocumentCheckIcon className="w-5 h-5 mr-2" />
                        {t('createCard')}
                      </>
                    )}
                  </motion.button>
                </div>
              </form>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </>
  );
};

export default CreateCardPage;
