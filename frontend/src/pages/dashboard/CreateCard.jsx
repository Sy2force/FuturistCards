import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { toast } from 'react-hot-toast';
import { useAuth } from '../../context/AuthContext';
import { useRoleTheme } from '../../context/ThemeProvider';
import { useTranslation } from 'react-i18next';
import apiService from '../../services/api';

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
  const { isDark } = useRoleTheme();

  // Auto-fill with user information
  useEffect(() => {
    if (user) {
      setFormData(prev => ({
        ...prev,
        email: user.email || prev.email,
        title: user.name || prev.title,
      }));
    }
  }, [user]);

  const categoryOptions = [
    { value: 'technology', label: 'developer' },
    { value: 'design', label: 'creative' },
    { value: 'business', label: 'business' },
    { value: 'creative', label: 'creative' },
    { value: 'healthcare', label: 'health' },
    { value: 'education', label: 'education' },
    { value: 'finance', label: 'finance' },
    { value: 'marketing', label: 'marketing' },
    { value: 'consulting', label: 'consulting' },
    { value: 'retail', label: 'retail' },
    { value: 'other', label: 'other' }
  ];

  // Simple validation
  const validateField = (name, value) => {
    const errors = { ...validationErrors };
    
    switch (name) {
      case 'title':
        if (!value || value.trim().length < 2) {
          errors[name] = 'name Min Length';
        } else {
          delete errors[name];
        }
        break;
      case 'email':
        if (value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
          errors[name] = 'invalid Email';
        } else {
          delete errors[name];
        }
        break;
      default:
        delete errors[name];
    }
    
    setValidationErrors(errors);
    return !errors[name];
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
        toast.error('image Too Large');
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

    // Simplified validation: only name and basic fields required
    const errors = {};
    
    // Required field: full name
    if (!formData.title?.trim()) {
      errors.title = 'full Name Required';
    }
    if (!formData.phone?.trim() || formData.phone.trim().length < 8) {
      errors.phone = 'phone Min Length';
    }
    if (!formData.description?.trim() || formData.description.trim().length < 10) {
      errors.description = 'description Min Length';
    }
    
    // If errors, display them and stop
    if (Object.keys(errors).length > 0) {
      setValidationErrors(errors);
      const firstError = Object.values(errors)[0];
      toast.error(firstError);
      setLoading(false);
      return;
    }
    
    // Reset errors if everything is valid
    setValidationErrors({});

    try {
      // Prepare card data according to backend schema
      const cardData = {
        title: formData.title,
        subtitle: formData.subtitle || formData.position || '',
        description: formData.description || t('createCard.defaultDescription', { company: formData.company || 'default Company' }),
        email: formData.email,
        phone: formData.phone || '',
        website: formData.website || '',
        company: formData.company || '',
        position: formData.position || formData.subtitle || '',
        address: formData.address || '',
        isPublic: true
      };

      const response = await apiService.createCard(cardData);
      
      if (response.success) {
        toast.success('success Message');
        navigate('/my-cards');
      } else {
        throw new Error(response.message || 'error Message');
      }
    } catch (error) {
      let errorMessage = 'general Error';
      
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-blue-900 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl mb-6 hover:scale-110 transition-transform">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
            </div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent mb-4">
              {'title'}
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              {'description'}
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Preview Card */}
          <div className="lg:col-span-1">
            <div className="sticky top-8">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4 flex items-center">
                <svg className="w-5 h-5 mr-2 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                {'preview'}
              </h3>
                <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-xl border border-gray-200 dark:border-gray-700">
                <div className="text-center">
                  <div className="relative inline-block mb-4">
                    {imagePreview ? (
                      <img
                        src={imagePreview}
                        alt={'preview'}
                        className="w-24 h-24 rounded-full object-cover border-4 border-blue-200 dark:border-blue-800"
                      />
                    ) : (
                      <div className="w-24 h-24 rounded-full bg-gradient-to-r from-blue-400 to-purple-500 flex items-center justify-center">
                        <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                      </div>
                    )}
                  </div>
                  <h4 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-1">
                    {formData.title || 'name'}
                  </h4>
                  <p className="text-blue-600 dark:text-blue-400 font-medium mb-3">
                    {formData.subtitle || 'position'}
                  </p>
                  <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">
                    {formData.description || 'description'}
                  </p>
                  <div className="space-y-2 text-sm">
                    {formData.email && (
                      <div className="flex items-center justify-center text-gray-600 dark:text-gray-400">
                        <svg className="w-4 h-4 mr-2 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                        {formData.email}
                      </div>
                    )}
                    {formData.phone && (
                      <div className="flex items-center justify-center text-gray-600 dark:text-gray-400">
                        <svg className="w-4 h-4 mr-2 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a1 1 0 001-1V4a1 1 0 00-1-1H8a1 1 0 00-1 1v16a1 1 0 001 1z" />
                        </svg>
                        {formData.phone}
                      </div>
                    )}
                  </div>
                </div>
                </div>
              </div>
            </div>

          {/* Form */}
          <div className="lg:col-span-2">
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 p-8">
              <div className="bg-gradient-to-r from-blue-500 via-purple-600 to-pink-500 px-8 py-6 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600/90 to-purple-700/90" />
                <div className="relative z-10">
                  <div className="flex items-center mb-2">
                    <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center mr-3">
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                      </svg>
                    </div>
                    <h2 className="text-3xl font-bold text-white">{'title'}</h2>
                  </div>
                  <p className="text-xl text-white opacity-90">{'subtitle'}</p>
                  <div className="flex items-center mt-3 text-sm text-blue-200">
                    <span className="inline-flex items-center mr-4">
                      <span className="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse"></span>
                      {'unlimited Creation'}
                    </span>
                    <span className="inline-flex items-center">
                      <span className="w-2 h-2 bg-yellow-400 rounded-full mr-2 animate-pulse"></span>
                      {'instant Publication'}
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
                    {'profile Photo'}
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
                          alt={'preview'}
                          className="w-32 h-32 rounded-full object-cover border-4 border-blue-200 dark:border-blue-800 shadow-lg"
                        />
                        <button
                          type="button"
                          onClick={removeImage}
                          className="absolute -top-2 -right-2 bg-red-500 hover:bg-red-600 text-white rounded-full p-2 shadow-lg transition-all hover:scale-110"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        </button>
                      </div>
                    ) : (
                      <button
                        type="button"
                        onClick={() => fileInputRef.current?.click()}
                        className="w-32 h-32 rounded-full border-2 border-dashed border-gray-300 dark:border-gray-600 hover:border-blue-500 dark:hover:border-blue-400 flex items-center justify-center bg-gray-50 dark:bg-gray-700 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-all group"
                      >
                        <div className="text-center">
                          <svg className="w-8 h-8 text-gray-400 group-hover:text-blue-500 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                          </svg>
                          <p className="text-xs text-gray-500 dark:text-gray-400 group-hover:text-blue-500">
                            {'add Photo'}
                          </p>
                        </div>
                      </button>
                    )}
                  </div>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                    {'file Formats'}
                  </p>
                </div>

                {/* Personal Info */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="relative">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      <svg className="w-4 h-4 inline mr-1 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                      {'full Name'} *
                    </label>
                    <input
                      type="text"
                      name="title"
                      data-testid="input-title"
                      value={formData.title}
                      onChange={handleChange}
                      required
                      placeholder={'name Placeholder'}
                      className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 transition-all ${
                        validationErrors.title 
                          ? 'border-red-500 dark:border-red-400' 
                          : 'border-gray-300 dark:border-gray-600'
                      }`}
                    />
                    {validationErrors.title && (
                      <p className="text-red-500 text-xs mt-1">{validationErrors.title}</p>
                    )}
                  </div>

                  <div className="relative">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      <svg className="w-4 h-4 inline mr-1 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2-2v2m8 0H8m8 0v2a2 2 0 01-2 2H10a2 2 0 01-2-2V6m8 0H8" />
                      </svg>
                      {'title Position'}
                    </label>
                    <input
                      type="text"
                      name="subtitle"
                      data-testid="input-position"
                      value={formData.subtitle}
                      onChange={handleChange}
                      placeholder={'role Placeholder'}
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 transition-all"
                    />
                  </div>
                </div>

                {/* Company & Position Fields */}
                <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-xl p-6 border border-blue-200 dark:border-blue-800">
                  <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4 flex items-center">
                    <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center mr-3">
                      <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2-2v2m8 0H8m8 0v2a2 2 0 01-2 2H10a2 2 0 01-2-2V6m8 0H8" />
                      </svg>
                    </div>
{'professional Details'}
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        <svg className="w-4 h-4 inline mr-1 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                        </svg>
{'company'}
                      </label>
                      <input
                        type="text"
                        name="company"
                        data-testid="input-company"
                        value={formData.company}
                        onChange={handleChange}
                        placeholder={'company Placeholder'}
                        className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        <svg className="w-4 h-4 inline mr-1 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2-2v2m8 0H8m8 0v2a2 2 0 01-2 2H10a2 2 0 01-2-2V6m8 0H8" />
                        </svg>
                        {'position'}
                      </label>
                      <input
                        type="text"
                        name="position"
                        data-testid="input-position-detail"
                        value={formData.position}
                        onChange={handleChange}
                        placeholder={'position Placeholder'}
                        className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 transition-all"
                      />
                    </div>
                  </div>
                </div>

                {/* Description */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    {'description'}
                  </label>
                  <textarea
                    name="description"
                    data-testid="input-description"
                    value={formData.description}
                    onChange={handleChange}
                    rows={4}
                    placeholder={'description Placeholder'}
                    className={`w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 transition-all resize-none ${
                      validationErrors.description 
                        ? 'border-red-500 dark:border-red-400' 
                        : ''
                    }`}
                  />
                  {validationErrors.description && (
                    <p className="text-red-500 text-xs mt-1">{validationErrors.description}</p>
                  )}
                </div>

                {/* Contact Info */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="relative">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      <svg className="w-4 h-4 inline mr-1 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                      {'email'}
                    </label>
                    <input
                      type="email"
                      name="email"
                      data-testid="input-email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder={'email Placeholder'}
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
                      <svg className="w-4 h-4 inline mr-1 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a1 1 0 001-1V4a1 1 0 00-1-1H8a1 1 0 00-1 1v16a1 1 0 001 1z" />
                      </svg>
                      {'phone'}
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      data-testid="input-phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder={'phone Placeholder'}
                      className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 transition-all ${
                        validationErrors.phone 
                          ? 'border-red-500 dark:border-red-400' 
                          : 'border-gray-300 dark:border-gray-600'
                      }`}
                    />
                    {validationErrors.phone && (
                      <p className="text-red-500 text-xs mt-1">{validationErrors.phone}</p>
                    )}
                  </div>
                </div>

                {/* Additional Info */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="relative">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      <svg className="w-4 h-4 inline mr-1 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                      </svg>
                      {'website'}
                    </label>
                    <input
                      type="url"
                      name="website"
                      value={formData.website}
                      onChange={handleChange}
                      placeholder={'website Placeholder'}
                      className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 transition-all ${
                        validationErrors.website 
                          ? 'border-red-500 dark:border-red-400' 
                          : 'border-gray-300 dark:border-gray-600'
                      }`}
                    />
                    {validationErrors.website && (
                      <p className="text-red-500 text-xs mt-1">{validationErrors.website}</p>
                    )}
                  </div>

                  <div className="relative">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      {'category'}
                    </label>
                    <select
                      name="category"
                      value={formData.category}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 transition-all"
                    >
                      {categoryOptions.map(category => (
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
                    <span className="mr-1">📍</span>
                    {'address'}
                  </label>
                  <input
                    type="text"
                    name="address"
                    data-testid="input-address"
                    value={formData.address}
                    onChange={handleChange}
                    placeholder={'address Placeholder'}
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 transition-all"
                  />
                </div>

                {/* Submit Button */}
                <div className="flex justify-end space-x-4">
                  <button
                    type="button"
                    onClick={() => navigate('/cards')}
                    className="px-6 py-3 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-xl hover:bg-gray-300 dark:hover:bg-gray-600 transition-all hover:scale-105 font-medium"
                  >
                    <span className="mr-2">←</span>
                    {'Cancel'}
                  </button>
                  <button
                    type="submit"
                    data-testid="submit-button"
                    disabled={loading}
                    className="px-8 py-3 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white rounded-xl font-medium shadow-lg hover:shadow-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center hover:scale-105"
                  >
                    {loading ? (
                      <>
                        <div className="rounded-full h-5 w-5 border-b-2 border-white mr-2 animate-spin"></div>
{'creating In Progress'}
                      </>
                    ) : (
                      <>
                        <span className="mr-2">✓</span>
                        {'Create'}
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateCardPage;
