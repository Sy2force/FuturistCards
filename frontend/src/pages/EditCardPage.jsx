import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { useTranslation } from "../hooks/useTranslation";
import { toast } from 'react-hot-toast';
import { useAuth } from '../context/AuthContext';
import { useRoleTheme } from '../context/ThemeProvider';
import apiService from '../services/api';
import { UserIcon, EnvelopeIcon, PhoneIcon, GlobeAltIcon, MapPinIcon, PhotoIcon, DocumentCheckIcon, ArrowLeftIcon, XMarkIcon, PencilIcon, BuildingOfficeIcon } from '@heroicons/react/24/outline';

const EditCardPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { user } = useAuth();
  const { isDark } = useRoleTheme();
  const fileInputRef = useRef(null);
  
  const [formData, setFormData] = useState({
    name: '',
    title: '',
    company: '',
    email: '',
    phone: '',
    website: '',
    address: '',
    description: '',
    backgroundColor: '#1e293b',
    textColor: '#ffffff',
    accentColor: '#3b82f6',
    image: null
  });
  const [imagePreview, setImagePreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [cardLoading, setCardLoading] = useState(true);
  const [error, setError] = useState('');
  const [cardNotFound, setCardNotFound] = useState(false);
  
  const colorOptions = [
    { bg: '#1e293b', text: '#ffffff', accent: '#3b82f6', name: t('editCard.colors.darkBlue') },
    { bg: '#7c3aed', text: '#ffffff', accent: '#f59e0b', name: t('editCard.colors.purple') },
    { bg: '#059669', text: '#ffffff', accent: '#fbbf24', name: t('editCard.colors.green') },
    { bg: '#dc2626', text: '#ffffff', accent: '#60a5fa', name: t('editCard.colors.red') },
    { bg: '#0891b2', text: '#ffffff', accent: '#f97316', name: t('editCard.colors.turquoise') },
    { bg: '#be185d', text: '#ffffff', accent: '#34d399', name: t('editCard.colors.pink') }
  ];

  // Load card data on component mount
  useEffect(() => {
    if (id && user) {
      const userCards = JSON.parse(localStorage.getItem('userCards') || '[]');
      const card = userCards.find(c => c.id === id);
      
      if (card) {
        setFormData({
          name: card.name || '',
          title: card.title || '',
          company: card.company || '',
          email: card.email || '',
          phone: card.phone || '',
          website: card.website || '',
          address: card.address || '',
          description: card.description || '',
          backgroundColor: card.backgroundColor || '#1e293b',
          textColor: card.textColor || '#ffffff',
          accentColor: card.accentColor || '#3b82f6',
          image: card.image || null
        });
        if (card.image) {
          setImagePreview(card.image);
        }
      } else {
        setCardNotFound(true);
      }
    }
    setCardLoading(false);
  }, [id, user]);
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    setError('');
  };
  
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        toast.error(t('editCard.imageTooLarge'));
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
    
    try {
      const userCards = JSON.parse(localStorage.getItem('userCards') || '[]');
      const cardIndex = userCards.findIndex(c => c.id === id);
      
      if (cardIndex === -1) {
        throw new Error(t('editCard.cardNotFound'));
      }
      
      const updatedCard = {
        ...userCards[cardIndex],
        name: formData.name,
        title: formData.title,
        company: formData.company,
        email: formData.email,
        phone: formData.phone,
        website: formData.website,
        address: formData.address,
        description: formData.description,
        backgroundColor: formData.backgroundColor,
        textColor: formData.textColor,
        accentColor: formData.accentColor,
        image: imagePreview || formData.image,
        updatedAt: new Date().toISOString()
      };
      
      userCards[cardIndex] = updatedCard;
      localStorage.setItem('userCards', JSON.stringify(userCards));
      
      toast.success(t('editCard.updateSuccess'));
      navigate('/my-cards');
    } catch (error) {
      const errorMessage = error.message || t('editCard.updateError');
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };
  
  if (!user || (user.role !== 'business' && user.role !== 'admin')) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center px-4" dir="rtl">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-white mb-4">
            {t('editCard.accessDenied')}
          </h1>
          <p className="text-gray-300 mb-6">
            {t('editCard.businessAccountRequired')}
          </p>
          <button 
            onClick={() => navigate('/my-cards')}
            className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg"
          >
            {t('editCard.backToMyCards')}
          </button>
        </div>
      </div>
    );
  }
  
  if (cardLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center px-4" dir="rtl">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-gray-300">{t('common.loading')}</p>
        </div>
      </div>
    );
  }
  
  if (cardNotFound) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center px-4" dir="rtl">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-white mb-4">
            {t('editCard.cardNotFoundTitle')}
          </h2>
          <p className="text-gray-300 mb-6">
            {t('editCard.cardNotFoundMessage')}
          </p>
          <button 
            onClick={() => navigate('/my-cards')}
            className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg"
          >
            {t('editCard.backToMyCards')}
          </button>
        </div>
      </div>
    );
  }
  
  return (
    <>
      <Helmet>
        <title>{t('editCard.pageTitle')} - FuturistCards</title>
        <meta name="description" content={t('editCard.pageDescription')} />
        <html lang="he" dir="rtl" />
      </Helmet>
      
      <motion.div 
        className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 py-12"
        dir="rtl"
        lang="he"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="text-center mb-12"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.5 }}
          >
            <motion.div 
              className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl mb-6"
              whileHover={{ scale: 1.1 }}
            >
              <PencilIcon className="w-8 h-8 text-white" />
            </motion.div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent mb-4">
              {t('editCard.title')}
            </h1>
            <p className="text-lg text-gray-300 max-w-2xl mx-auto">
              {t('editCard.subtitle')}
            </p>
          </motion.div>

          <motion.div 
            className="grid grid-cols-1 lg:grid-cols-3 gap-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
          >
            {/* Preview */}
            <div className="lg:col-span-1">
              <div className="sticky top-8">
                <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
                  <PhotoIcon className="w-5 h-5 ml-2" />
                  {t('editCard.preview')}
                </h3>
                <motion.div 
                  className="rounded-2xl p-6 shadow-xl border border-white/10 backdrop-blur-lg"
                  style={{
                    background: `linear-gradient(135deg, ${formData.backgroundColor}20, ${formData.backgroundColor}40)`,
                    borderColor: `${formData.accentColor}40`
                  }}
                >
                  <div className="text-center">
                    <div className="relative inline-block mb-4">
                      {imagePreview ? (
                        <img
                          src={imagePreview}
                          alt={t('editCard.profileImage')}
                          className="w-24 h-24 rounded-full object-cover border-4"
                          style={{ borderColor: formData.accentColor }}
                        />
                      ) : (
                        <div 
                          className="w-24 h-24 rounded-full flex items-center justify-center"
                          style={{ background: `linear-gradient(135deg, ${formData.backgroundColor}, ${formData.accentColor})` }}
                        >
                          <UserIcon className="w-12 h-12" style={{ color: formData.textColor }} />
                        </div>
                      )}
                    </div>
                    <h4 className="text-xl font-bold mb-1" style={{ color: formData.textColor }}>
                      {formData.name || t('editCard.yourName')}
                    </h4>
                    <p className="font-medium mb-1" style={{ color: formData.accentColor }}>
                      {formData.title || t('editCard.yourTitle')}
                    </p>
                    <p className="text-sm mb-3" style={{ color: `${formData.textColor}80` }}>
                      {formData.company || t('editCard.yourCompany')}
                    </p>
                    <p className="text-sm mb-4" style={{ color: `${formData.textColor}90` }}>
                      {formData.description || t('editCard.yourDescription')}
                    </p>
                  </div>
                </motion.div>
              </div>
            </div>

            {/* Form */}
            <div className="lg:col-span-2">
              <motion.div className="bg-gray-800/50 backdrop-blur-lg rounded-2xl shadow-xl border border-white/10 p-8">
                <form onSubmit={handleSubmit} className="space-y-8">
                  {error && (
                    <div className="bg-red-900/20 border border-red-500/30 rounded-xl p-4">
                      <p className="text-red-400 text-sm font-medium">{error}</p>
                    </div>
                  )}

                  {/* Image Upload */}
                  <div className="text-center">
                    <label className="block text-sm font-medium text-gray-300 mb-4">
                      {t('editCard.profileImage')}
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
                            alt={t('editCard.previewAlt')}
                            className="w-32 h-32 rounded-full object-cover border-4 shadow-lg"
                            style={{ borderColor: formData.accentColor }}
                          />
                          <motion.button
                            type="button"
                            onClick={removeImage}
                            className="absolute -top-2 -right-2 bg-red-500 hover:bg-red-600 text-white rounded-full p-2 shadow-lg transition-colors"
                            whileHover={{ scale: 1.1 }}
                          >
                            <XMarkIcon className="w-4 h-4" />
                          </motion.button>
                        </div>
                      ) : (
                        <button
                          type="button"
                          onClick={() => fileInputRef.current?.click()}
                          className="w-32 h-32 rounded-full border-2 border-dashed border-gray-600 hover:border-blue-400 flex items-center justify-center bg-gray-700/50 hover:bg-blue-900/20 transition-all group"
                        >
                          <div className="text-center">
                            <PhotoIcon className="w-8 h-8 text-gray-400 group-hover:text-blue-400 mx-auto mb-2" />
                            <p className="text-xs text-gray-400 group-hover:text-blue-400">
                              {t('editCard.addImage')}
                            </p>
                          </div>
                        </button>
                      )}
                    </div>
                  </div>

                  {/* Form Fields */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        <UserIcon className="w-4 h-4 inline ml-1" />
                        {t('editCard.fullName')} *
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        placeholder={t('editCard.fullNamePlaceholder')}
                        className="w-full px-4 py-3 border border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gray-700/50 text-white placeholder-gray-400 transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        {t('editCard.jobTitle')} *
                      </label>
                      <input
                        type="text"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        required
                        placeholder={t('editCard.jobTitlePlaceholder')}
                        className="w-full px-4 py-3 border border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gray-700/50 text-white placeholder-gray-400 transition-all"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      <BuildingOfficeIcon className="w-4 h-4 inline ml-1" />
                      {t('editCard.company')} *
                    </label>
                    <input
                      type="text"
                      name="company"
                      value={formData.company}
                      onChange={handleChange}
                      required
                      placeholder={t('editCard.companyPlaceholder')}
                      className="w-full px-4 py-3 border border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gray-700/50 text-white placeholder-gray-400 transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      {t('editCard.description')}
                    </label>
                    <textarea
                      name="description"
                      value={formData.description}
                      onChange={handleChange}
                      rows={4}
                      placeholder={t('editCard.descriptionPlaceholder')}
                      className="w-full px-4 py-3 border border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gray-700/50 text-white placeholder-gray-400 transition-all resize-none"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        <EnvelopeIcon className="w-4 h-4 inline ml-1" />
                        {t('editCard.email')} *
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        placeholder="your@email.com"
                        className="w-full px-4 py-3 border border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gray-700/50 text-white placeholder-gray-400 transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        <PhoneIcon className="w-4 h-4 inline ml-1" />
                        {t('editCard.phone')} *
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        required
                        placeholder="050-123-4567"
                        className="w-full px-4 py-3 border border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gray-700/50 text-white placeholder-gray-400 transition-all"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      <GlobeAltIcon className="w-4 h-4 inline ml-1" />
                      {t('editCard.website')}
                    </label>
                    <input
                      type="url"
                      name="website"
                      value={formData.website}
                      onChange={handleChange}
                      placeholder="https://www.example.com"
                      className="w-full px-4 py-3 border border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gray-700/50 text-white placeholder-gray-400 transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      <MapPinIcon className="w-4 h-4 inline ml-1" />
                      {t('editCard.address')}
                    </label>
                    <input
                      type="text"
                      name="address"
                      value={formData.address}
                      onChange={handleChange}
                      placeholder={t('editCard.addressPlaceholder')}
                      className="w-full px-4 py-3 border border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gray-700/50 text-white placeholder-gray-400 transition-all"
                    />
                  </div>

                  {/* Color Selection */}
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-4">
                      {t('editCard.selectCardColors')}
                    </label>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                      {colorOptions.map((option, index) => (
                        <motion.button
                          key={index}
                          type="button"
                          onClick={() => setFormData(prev => ({
                            ...prev,
                            backgroundColor: option.bg,
                            textColor: option.text,
                            accentColor: option.accent
                          }))}
                          className={`p-4 rounded-xl border-2 transition-all ${
                            formData.backgroundColor === option.bg
                              ? 'border-blue-400 ring-2 ring-blue-400/20'
                              : 'border-gray-600 hover:border-gray-500'
                          }`}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          <div className="flex items-center space-x-3 space-x-reverse">
                            <div
                              className="w-8 h-8 rounded-full border-2"
                              style={{
                                backgroundColor: option.bg,
                                borderColor: option.accent
                              }}
                            />
                            <div className="text-right">
                              <p className="text-white text-sm font-medium">{option.name}</p>
                              <div className="flex space-x-1 space-x-reverse mt-1">
                                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: option.bg }} />
                                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: option.accent }} />
                              </div>
                            </div>
                          </div>
                        </motion.button>
                      ))}
                    </div>
                  </div>

                  {/* Buttons */}
                  <div className="flex justify-end space-x-4 space-x-reverse">
                    <motion.button
                      type="button"
                      onClick={() => navigate('/my-cards')}
                      className="px-6 py-3 bg-gray-700 text-gray-300 rounded-xl hover:bg-gray-600 transition-colors font-medium"
                      whileHover={{ scale: 1.02 }}
                    >
                      <ArrowLeftIcon className="w-5 h-5 ml-2 inline" />
                      {t('editCard.cancel')}
                    </motion.button>
                    <motion.button
                      type="submit"
                      disabled={loading}
                      className="px-8 py-3 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white rounded-xl font-medium shadow-lg hover:shadow-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
                      whileHover={{ scale: loading ? 1 : 1.02 }}
                    >
                      {loading ? (
                        <>
                          <motion.div 
                            className="rounded-full h-5 w-5 border-b-2 border-white ml-2"
                            animate={{ rotate: 360 }}
                            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                          />
                          {t('editCard.updating')}
                        </>
                      ) : (
                        <>
                          <DocumentCheckIcon className="w-5 h-5 ml-2" />
                          {t('editCard.saveChanges')}
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

export default EditCardPage;
