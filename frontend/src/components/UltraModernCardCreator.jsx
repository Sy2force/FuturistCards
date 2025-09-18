import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  XMarkIcon,
  PhotoIcon,
  SparklesIcon,
  CheckIcon,
  PhoneIcon,
  MapPinIcon,
  EnvelopeIcon,
  GlobeAltIcon
} from '@heroicons/react/24/outline';
import { useLanguage } from '../context/LanguageContext';

const UltraModernCardCreator = ({ isOpen, onClose, onSubmit, initialData = null }) => {
  const { t, isRTL } = useLanguage();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    title: '',
    subtitle: '',
    description: '',
    phone: '',
    email: '',
    web: '',
    image: { url: '', alt: '' },
    address: {
      street: '', 
      houseNumber: ''
    },
    category: 'Technology',
    ...initialData
  });

  const steps = [
    { id: 1, name: t('basicInfo') || 'Infos de base', icon: SparklesIcon },
    { id: 2, name: t('contact') || 'Contact', icon: PhoneIcon },
    { id: 3, name: t('media') || 'Média', icon: PhotoIcon },
    { id: 4, name: t('location') || 'Localisation', icon: MapPinIcon }
  ];

  const categories = [
    'Technology', 'Healthcare', 'Finance', 'Education', 'Retail',
    'Food & Beverage', 'Real Estate', 'Legal', 'Consulting', 'Marketing'
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      setFormData(prev => ({
        ...prev,
        [parent]: { ...prev[parent], [child]: value }
      }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await onSubmit(formData);
    onClose();
  };

  const nextStep = () => setCurrentStep(prev => Math.min(prev + 1, 4));
  const prevStep = () => setCurrentStep(prev => Math.max(prev - 1, 1));

  if (!isOpen) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/60 backdrop-blur-lg z-50 flex items-center justify-center p-4"
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.9, opacity: 0, y: 20 }}
        className={`w-full max-w-4xl glass border border-white/20 rounded-3xl overflow-hidden ${isRTL ? 'rtl' : 'ltr'}`}
      >
        {/* Header */}
        <div className="relative p-8 bg-gradient-to-r from-purple-600/20 to-blue-600/20 border-b border-white/20">
          <button
            onClick={onClose}
            className="absolute top-6 right-6 text-white/60 hover:text-white transition-colors"
          >
            <XMarkIcon className="h-6 w-6" />
          </button>
          
          <div className="text-center">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2 }}
              className="w-16 h-16 bg-gradient-to-r from-purple-500 to-blue-500 rounded-2xl mx-auto mb-4 flex items-center justify-center"
            >
              <SparklesIcon className="h-8 w-8 text-white" />
            </motion.div>
            <h2 className="text-3xl font-bold text-white mb-2">
              {initialData ? t('editCard') : t('createCard')}
            </h2>
            <p className="text-white/70">
              {t('createCardDescription') || 'Créez une carte de visite moderne et professionnelle'}
            </p>
          </div>

          {/* Progress Steps */}
          <div className="flex justify-center mt-8">
            <div className="flex space-x-4">
              {steps.map((step) => {
                const Icon = step.icon;
                return (
                  <div key={step.id} className="flex items-center">
                    <motion.div
                      whileHover={{ scale: 1.1 }}
                      className={`
                        w-12 h-12 rounded-xl flex items-center justify-center transition-all
                        ${currentStep >= step.id 
                          ? 'bg-gradient-to-r from-purple-500 to-blue-500 text-white' 
                          : 'bg-white/10 text-white/60'
                        }
                      `}
                    >
                      {currentStep > step.id ? (
                        <CheckIcon className="h-5 w-5" />
                      ) : (
                        <Icon className="h-5 w-5" />
                      )}
                    </motion.div>
                    {step.id < steps.length && (
                      <div className={`w-8 h-0.5 mx-2 ${currentStep > step.id ? 'bg-gradient-to-r from-purple-500 to-blue-500' : 'bg-white/20'}`} />
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Form Content */}
        <form onSubmit={handleSubmit} className="p-8">
          <AnimatePresence mode="wait">
            {/* Step 1: Basic Info */}
            {currentStep === 1 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="block text-white/80 font-medium">{t('cardTitle')} *</label>
                    <input
                      type="text"
                      name="title"
                      value={formData.title}
                      onChange={handleInputChange}
                      required
                      className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      placeholder={t('companyName') || 'Nom de l\'entreprise'}
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="block text-white/80 font-medium">{t('cardSubtitle')} *</label>
                    <input
                      type="text"
                      name="subtitle"
                      value={formData.subtitle}
                      onChange={handleInputChange}
                      required
                      className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      placeholder={t('yourPosition') || 'Votre poste'}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="block text-white/80 font-medium">{t('category')} *</label>
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleInputChange}
                    required
                    className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                  >
                    {categories.map(cat => (
                      <option key={cat} value={cat} className="bg-gray-800">{cat}</option>
                    ))}
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="block text-white/80 font-medium">{t('cardDescription')} *</label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    required
                    rows={4}
                    className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-purple-500 resize-none"
                    placeholder={t('businessDescription') || 'Description de votre activité'}
                  />
                </div>
              </motion.div>
            )}

            {/* Step 2: Contact */}
            {currentStep === 2 && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="flex items-center space-x-2 text-white/80 font-medium">
                      <PhoneIcon className="h-4 w-4" />
                      <span>{t('phone')} *</span>
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      required
                      className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-purple-500"
                      placeholder="0501234567"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="flex items-center space-x-2 text-white/80 font-medium">
                      <EnvelopeIcon className="h-4 w-4" />
                      <span>{t('email')} *</span>
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-purple-500"
                      placeholder="contact@exemple.com"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="flex items-center space-x-2 text-white/80 font-medium">
                    <GlobeAltIcon className="h-4 w-4" />
                    <span>{t('website')}</span>
                  </label>
                  <input
                    type="url"
                    name="web"
                    value={formData.web}
                    onChange={handleInputChange}
                    className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    placeholder="https://www.exemple.com"
                  />
                </div>
              </motion.div>
            )}

            {/* Step 3: Media */}
            {currentStep === 3 && (
              <motion.div
                key="step3"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="flex items-center space-x-2 text-white/80 font-medium">
                      <PhotoIcon className="h-4 w-4" />
                      <span>{t('imageUrl')} *</span>
                    </label>
                    <input
                      type="url"
                      name="image.url"
                      value={formData.image.url}
                      onChange={handleInputChange}
                      required
                      className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-purple-500"
                      placeholder="https://exemple.com/image.jpg"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="block text-white/80 font-medium">{t('imageDescription')} *</label>
                    <input
                      type="text"
                      name="image.alt"
                      value={formData.image.alt}
                      onChange={handleInputChange}
                      required
                      className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-purple-500"
                      placeholder={t('imageDescription') || 'Description de l\'image'}
                    />
                  </div>
                </div>

                {/* Image Preview */}
                {formData.image.url && (
                  <div className="mt-6">
                    <label className="block text-white/80 font-medium mb-3">{t('preview') || 'Aperçu'}</label>
                    <div className="relative w-full h-48 bg-white/5 rounded-xl overflow-hidden border border-white/20">
                      <img
                        src={formData.image.url}
                        alt={formData.image.alt}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.target.style.display = 'none';
                        }}
                      />
                    </div>
                  </div>
                )}
              </motion.div>
            )}

            {/* Step 4: Location */}
            {currentStep === 4 && (
              <motion.div
                key="step4"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="space-y-2">
                    <label className="block text-white/80 font-medium">{t('city')} *</label>
                    <input
                      type="text"
                      name="address.city"
                      value={formData.address.city}
                      onChange={handleInputChange}
                      required
                      className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-purple-500"
                      placeholder="Tel Aviv"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="block text-white/80 font-medium">{t('street')} *</label>
                    <input
                      type="text"
                      name="address.street"
                      value={formData.address.street}
                      onChange={handleInputChange}
                      required
                      className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-purple-500"
                      placeholder="Rothschild Blvd"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="block text-white/80 font-medium">{t('number')} *</label>
                    <input
                      type="text"
                      name="address.houseNumber"
                      value={formData.address.houseNumber}
                      onChange={handleInputChange}
                      required
                      className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-purple-500"
                      placeholder="123"
                    />
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Navigation */}
          <div className="flex justify-between mt-8 pt-6 border-t border-white/20">
            <motion.button
              type="button"
              onClick={prevStep}
              disabled={currentStep === 1}
              whileHover={{ scale: currentStep === 1 ? 1 : 1.02 }}
              whileTap={{ scale: currentStep === 1 ? 1 : 0.98 }}
              className={`
                px-6 py-3 rounded-xl font-medium transition-all
                ${currentStep === 1 
                  ? 'bg-white/5 text-white/40 cursor-not-allowed' 
                  : 'bg-white/10 text-white hover:bg-white/20'
                }
              `}
            >
              {t('previous') || 'Précédent'}
            </motion.button>

            <div className="flex space-x-3">
              {currentStep < 4 ? (
                <motion.button
                  type="button"
                  onClick={nextStep}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="px-6 py-3 bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-xl font-medium hover:from-purple-600 hover:to-blue-600 transition-all"
                >
                  {t('next') || 'Suivant'}
                </motion.button>
              ) : (
                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="px-8 py-3 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-xl font-medium hover:from-green-600 hover:to-emerald-600 transition-all flex items-center space-x-2"
                >
                  <CheckIcon className="h-5 w-5" />
                  <span>{initialData ? t('updateCard') : t('createCard')}</span>
                </motion.button>
              )}
            </div>
          </div>
        </form>
      </motion.div>
    </motion.div>
  );
};

export default UltraModernCardCreator;
