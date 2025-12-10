import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { useAuth } from '../hooks/useAuth';
import { toast } from 'react-hot-toast';
import { UserIcon, EnvelopeIcon, PhoneIcon, GlobeAltIcon, MapPinIcon, PhotoIcon, DocumentCheckIcon, ArrowLeftIcon, XMarkIcon, PencilIcon } from '@heroicons/react/24/outline';

const EditCardPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const fileInputRef = useRef(null);
  
  const [formData, setFormData] = useState({
    title: '',
    subtitle: '',
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
  const [cardLoading, setCardLoading] = useState(true);
  const [error, setError] = useState('');
  const [cardNotFound, setCardNotFound] = useState(false);
  
  const categories = [
    { value: 'technology', label: 'categories.technology' },
    { value: 'business', label: 'categories.business' },
    { value: 'creative', label: 'categories.creative' },
    { value: 'healthcare', label: 'categories.healthcare' },
    { value: 'education', label: 'categories.education' },
    { value: 'finance', label: 'categories.finance' },
    { value: 'marketing', label: 'categories.marketing' },
    { value: 'consulting', label: 'categories.consulting' },
    { value: 'other', label: 'categories.other' }
  ];

  // Load card data on component mount
  useEffect(() => {
    if (id && user) {
      const userCards = JSON.parse(localStorage.getItem('userCards') || '[]');
      const card = userCards.find(c => c._id === id && c.userId === user.id);
      
      if (card) {
        setFormData({
          title: card.title || '',
          subtitle: card.subtitle || '',
          description: card.description || '',
          email: card.email || '',
          phone: card.phone || '',
          website: card.website || card.web || '',
          address: card.address || '',
          category: card.category || 'technology',
          image: card.image || null
        });
        if (card.image && card.image !== 'https://via.placeholder.com/300x200') {
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
        toast.error('editCard.imageTooLarge');
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
    e.preventDefaul;
    setLoading(true);
    setError('');
    
    try {
      const userCards = JSON.parse(localStorage.getItem('userCards') || '[]');
      const cardIndex = userCards.findIndex(c => c._id === id && c.userId === user.id);
      
      if (cardIndex === -1) {
        throw new Error('editCard.cardNotFound');
      }
      
      const updatedCard = {
        ...userCards[cardIndex],
        title: formData.title,
        subtitle: formData.subtitle,
        description: formData.description,
        email: formData.email,
        phone: formData.phone,
        website: formData.website,
        web: formData.website,
        address: formData.address,
        category: formData.category,
        image: formData.image || imagePreview || 'https://via.placeholder.com/300x200',
        updatedAt: new Date()
      };
      
      userCards[cardIndex] = updatedCard;
      localStorage.setItem('userCards', JSON.stringify(userCards));
      
      toast.success('editCard.updateSuccess');
      navigate('/my-cards');
    } catch (error) {
      const errorMessage = error.message || 'editCard.updateError';
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };
  
  if (!user || (user.role !== 'business' && user.role !== 'admin')) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center px-4">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">
            Accès refusé
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            Un compte professionnel est requis pour modifier des cartes
          </p>
          <button 
            onClick={() => navigate('/my-cards')}
            className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg"
          >
            Retour à mes cartes
          </button>
        </div>
      </div>
    );
  }
  
  if (cardLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center px-4">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400">Chargement...</p>
        </div>
      </div>
    );
  }
  
  if (cardNotFound) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center px-4">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Carte non trouvée
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            La carte que vous essayez de modifier n'existe pas ou vous n'avez pas les permissions nécessaires.
          </p>
          <button 
            onClick={() => navigate('/my-cards')}
            className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg"
          >
            Retour à mes cartes
          </button>
        </div>
      </div>
    );
  }
  
  return (
    <>
      <Helmet>
        <title>Modifier ma carte</title>
        <meta name="description" content="Modifiez votre carte professionnelle" />
      </Helmet>
      
      <motion.div 
        className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-blue-900 py-12"
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
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent mb-4">
              Modifier ma carte
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Mettez à jour les informations de votre carte professionnelle
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
                <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4 flex items-center">
                  <PhotoIcon className="w-5 h-5 mr-2" />
                  Aperçu de la carte
                </h3>
                <motion.div 
                  className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-xl border border-gray-200 dark:border-gray-700"
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
                      {formData.title || 'editCard.yourName'}
                    </h4>
                    <p className="text-blue-600 dark:text-blue-400 font-medium mb-3">
                      {formData.subtitle || 'editCard.yourPosition'}
                    </p>
                    <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">
                      {formData.description || 'editCard.yourDescription'}
                    </p>
                  </div>
                </motion.div>
              </div>
            </div>

            {/* Form */}
            <div className="lg:col-span-2">
              <motion.div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 p-8">
                <form onSubmit={handleSubmit} className="space-y-8">
                  {error && (
                    <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl p-4">
                      <p className="text-red-600 dark:text-red-400 text-sm font-medium">{error}</p>
                    </div>
                  )}

                  {/* Image Upload */}
                  <div className="text-center">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-4">
                      Photo de profil
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
                              Changer la photo
                            </p>
                          </div>
                        </button>
                      )}
                    </div>
                  </div>

                  {/* Form Fields */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        <UserIcon className="w-4 h-4 inline mr-1" />
                        {'editCard.fullName'} *
                      </label>
                      <input
                        type="text"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        required
                        data-testid="input-title"
                        className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        {'editCard.position'} *
                      </label>
                      <input
                        type="text"
                        name="subtitle"
                        value={formData.subtitle}
                        onChange={handleChange}
                        required
                        data-testid="input-position"
                        className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 transition-all"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      {'editCard.description'}
                    </label>
                    <textarea
                      name="description"
                      value={formData.description}
                      onChange={handleChange}
                      rows={4}
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 transition-all resize-none"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        <EnvelopeIcon className="w-4 h-4 inline mr-1" />
                        {'editCard.email'} *
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        <PhoneIcon className="w-4 h-4 inline mr-1" />
                        {'editCard.phone'} *
                      </label>
                      <input
                        type="tel"
                        placeholder={'editCard.phonePlaceholder'}
                        value={formData.phone}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 transition-all"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        <GlobeAltIcon className="w-4 h-4 inline mr-1" />
                        {'editCard.website'}
                      </label>
                      <input
                        type="url"
                        placeholder={'editCard.websitePlaceholder'}
                        value={formData.website}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        {'editCard.category'} *
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

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      <MapPinIcon className="w-4 h-4 inline mr-1" />
                      {'editCard.address'}
                    </label>
                    <input
                      type="text"
                      placeholder={'editCard.addressPlaceholder'}
                      value={formData.address}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 transition-all"
                    />
                  </div>

                  {/* Buttons */}
                  <div className="flex justify-end space-x-4">
                    <motion.button
                      type="button"
                      onClick={() => navigate('/my-cards')}
                      className="px-6 py-3 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-xl hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors font-medium"
                      whileHover={{ scale: 1.02 }}
                    >
                      <ArrowLeftIcon className="w-5 h-5 mr-2 inline" />
                      {'editCard.cancel'}
                    </motion.button>
                    <motion.button
                      type="submit"
                      disabled={loading}
                      data-testid="submit-button"
                      className="px-8 py-3 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white rounded-xl font-medium shadow-lg hover:shadow-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
                      whileHover={{ scale: loading ? 1 : 1.02 }}
                    >
                      {loading ? (
                        <>
                          <motion.div 
                            className="rounded-full h-5 w-5 border-b-2 border-white mr-2"
                            animate={{ rotate: 360 }}
                            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                          />
                          {'editCard.updating'}
                        </>
                      ) : (
                        <>
                          <DocumentCheckIcon className="w-5 h-5 mr-2" />
                          {'editCard.save'}
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
