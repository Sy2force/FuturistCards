import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { useAuth } from '../context/AuthContext';
import { useDocumentTitle } from '../hooks/useDocumentTitle';
import {
  UserIcon,
  EnvelopeIcon,
  PhoneIcon,
  BuildingOfficeIcon,
  GlobeAltIcon,
  MapPinIcon,
  PlusIcon,
  PhotoIcon
} from '@heroicons/react/24/outline';

const CreateCardPage = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  
  // Set document title
  useDocumentTitle('Create Card | FuturistCards');
  
  const [formData, setFormData] = useState({
    name: '',
    title: '',
    company: '',
    email: '',
    phone: '',
    website: '',
    address: '',
    description: '',
    image: null,
    backgroundColor: '#1e293b',
    textColor: '#ffffff',
    accentColor: '#3b82f6'
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData(prev => ({
        ...prev,
        image: file
      }));
      
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Simuler la création de la carte
      const newCard = {
        id: Date.now().toString(),
        ...formData,
        userId: user?.id,
        createdAt: new Date().toISOString(),
        views: 0,
        likes: 0
      };

      // Sauvegarder dans localStorage pour la démo
      const existingCards = JSON.parse(localStorage.getItem('userCards') || '[]');
      existingCards.push(newCard);
      localStorage.setItem('userCards', JSON.stringify(existingCards));

      // Rediriger vers la page des cartes
      navigate('/my-cards');
    } catch (error) {
      // Error handled silently in production
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Helmet>
        <title>{'title'} - FuturistCards</title>
        <meta name="description" content={'meta Description'} />
      </Helmet>

      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 pt-20" dir={language === 'he' ? 'rtl' : 'ltr'}>
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-4xl mx-auto">
            {/* Header */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center mb-8"
            >
              <h1 className="text-4xl font-bold text-white mb-4">
                {'title'}
              </h1>
              <p className="text-xl text-gray-300">
                {'subtitle'}
              </p>
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Form */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="bg-black/20 border border-white/20 rounded-2xl p-6 backdrop-blur-sm"
              >
                <h2 className="text-2xl font-bold text-white mb-6">{'card Details'}</h2>
                
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Image Upload */}
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-300">
                      {'profile Image'}
                    </label>
                    <div className="flex items-center space-x-4 space-x-reverse">
                      <div className="w-20 h-20 bg-gray-700 rounded-full flex items-center justify-center overflow-hidden">
                        {imagePreview ? (
                          <img src={imagePreview} alt={'image Preview'} className="w-full h-full object-cover" />
                        ) : (
                          <PhotoIcon className="w-8 h-8 text-gray-400" />
                        )}
                      </div>
                      <label className="cursor-pointer bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors">
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleImageChange}
                          className="hidden"
                        />
                        {'select Image'}
                      </label>
                    </div>
                  </div>

                  {/* Name */}
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-300">
                      {'full Name'} *
                    </label>
                    <div className="relative">
                      <UserIcon className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                        className="w-full pr-10 pl-4 py-3 bg-black/20 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder={'full Name Placeholder'}
                      />
                    </div>
                  </div>

                  {/* Title */}
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-300">
                      {'job Title'} *
                    </label>
                    <input
                      type="text"
                      name="title"
                      value={formData.title}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 bg-black/20 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder={'job Title Placeholder'}
                    />
                  </div>

                  {/* Company */}
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-300">
                      {'company'}
                    </label>
                    <div className="relative">
                      <BuildingOfficeIcon className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                      <input
                        type="text"
                        name="company"
                        value={formData.company}
                        onChange={handleInputChange}
                        className="w-full pr-10 pl-4 py-3 bg-black/20 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder={'company Placeholder'}
                      />
                    </div>
                  </div>

                  {/* Email */}
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-300">
                      {'email'} *
                    </label>
                    <div className="relative">
                      <EnvelopeIcon className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        className="w-full pr-10 pl-4 py-3 bg-black/20 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder={'email Placeholder'}
                      />
                    </div>
                  </div>

                  {/* Phone */}
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-300">
                      {'phone'}
                    </label>
                    <div className="relative">
                      <PhoneIcon className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className="w-full pr-10 pl-4 py-3 bg-black/20 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder={'phone Placeholder'}
                      />
                    </div>
                  </div>

                  {/* Website */}
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-300">
                      {'website'}
                    </label>
                    <div className="relative">
                      <GlobeAltIcon className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                      <input
                        type="url"
                        name="website"
                        value={formData.website}
                        onChange={handleInputChange}
                        className="w-full pr-10 pl-4 py-3 bg-black/20 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder={'website Placeholder'}
                      />
                    </div>
                  </div>

                  {/* Address */}
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-300">
                      {'address'}
                    </label>
                    <div className="relative">
                      <MapPinIcon className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                      <input
                        type="text"
                        name="address"
                        value={formData.address}
                        onChange={handleInputChange}
                        className="w-full pr-10 pl-4 py-3 bg-black/20 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder={'address Placeholder'}
                      />
                    </div>
                  </div>

                  {/* Description */}
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-300">
                      {'description'}
                    </label>
                    <textarea
                      name="description"
                      value={formData.description}
                      onChange={handleInputChange}
                      rows={3}
                      className="w-full px-4 py-3 bg-black/20 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                      placeholder={'description Placeholder'}
                    />
                  </div>

                  {/* Color Customization */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-white">{'card Design'}</h3>
                    <div className="grid grid-cols-3 gap-4">
                      <div className="space-y-2">
                        <label className="block text-sm font-medium text-gray-300">
                          {'background Color'}
                        </label>
                        <input
                          type="color"
                          name="backgroundColor"
                          value={formData.backgroundColor}
                          onChange={handleInputChange}
                          className="w-full h-10 rounded-lg border border-white/20"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="block text-sm font-medium text-gray-300">
                          {'text Color'}
                        </label>
                        <input
                          type="color"
                          name="textColor"
                          value={formData.textColor}
                          onChange={handleInputChange}
                          className="w-full h-10 rounded-lg border border-white/20"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="block text-sm font-medium text-gray-300">
                          {'accent Color'}
                        </label>
                        <input
                          type="color"
                          name="accentColor"
                          value={formData.accentColor}
                          onChange={handleInputChange}
                          className="w-full h-10 rounded-lg border border-white/20"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Submit Button */}
                  <motion.button
                    type="submit"
                    disabled={isSubmitting}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? (
                      <div className="flex items-center justify-center">
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white ml-2"></div>
                        {'creating'}
                      </div>
                    ) : (
                      <div className="flex items-center justify-center">
                        <PlusIcon className="w-5 h-5 ml-2" />
                        {'create Button'}
                      </div>
                    )}
                  </motion.button>
                </form>
              </motion.div>

              {/* Preview */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="bg-black/20 border border-white/20 rounded-2xl p-6 backdrop-blur-sm"
              >
                <h2 className="text-2xl font-bold text-white mb-6">{'preview'}</h2>
                
                {/* Card Preview */}
                <div className="relative">
                  <div 
                    className="w-full max-w-sm mx-auto rounded-2xl p-6 shadow-2xl"
                    style={{ backgroundColor: formData.backgroundColor }}
                  >
                    <div className="text-center">
                      {/* Profile Image */}
                      <div className="w-20 h-20 mx-auto mb-4 rounded-full overflow-hidden bg-gray-300">
                        {imagePreview ? (
                          <img src={imagePreview} alt={'profile Image'} className="w-full h-full object-cover" />
                        ) : (
                          <div className="w-full h-full bg-gray-400 flex items-center justify-center">
                            <UserIcon className="w-8 h-8 text-gray-600" />
                          </div>
                        )}
                      </div>

                      {/* Name */}
                      <h3 
                        className="text-xl font-bold mb-1"
                        style={{ color: formData.textColor }}
                      >
                        {formData.name || 'full Name Preview'}
                      </h3>

                      {/* Title */}
                      <p 
                        className="text-sm mb-2"
                        style={{ color: formData.accentColor }}
                      >
                        {formData.title || 'job Title Preview'}
                      </p>

                      {/* Company */}
                      {formData.company && (
                        <p 
                          className="text-sm mb-4"
                          style={{ color: formData.textColor, opacity: 0.8 }}
                        >
                          {formData.company}
                        </p>
                      )}

                      {/* Contact Info */}
                      <div className="space-y-2 text-sm">
                        {formData.email && (
                          <div 
                            className="flex items-center justify-center"
                            style={{ color: formData.textColor }}
                          >
                            <EnvelopeIcon className="w-4 h-4 ml-2" />
                            {formData.email}
                          </div>
                        )}
                        {formData.phone && (
                          <div 
                            className="flex items-center justify-center"
                            style={{ color: formData.textColor }}
                          >
                            <PhoneIcon className="w-4 h-4 ml-2" />
                            {formData.phone}
                          </div>
                        )}
                        {formData.website && (
                          <div 
                            className="flex items-center justify-center"
                            style={{ color: formData.textColor }}
                          >
                            <GlobeAltIcon className="w-4 h-4 ml-2" />
                            {formData.website}
                          </div>
                        )}
                      </div>

                      {/* Description */}
                      {formData.description && (
                        <p 
                          className="text-xs mt-4 leading-relaxed"
                          style={{ color: formData.textColor, opacity: 0.9 }}
                        >
                          {formData.description}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CreateCardPage;
