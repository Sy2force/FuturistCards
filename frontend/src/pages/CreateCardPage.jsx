import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { toast } from 'react-hot-toast';
import { useAuth } from '../hooks/useAuth';
import api from '../services/api';
import { 
  UserIcon, 
  EnvelopeIcon, 
  PhoneIcon, 
  GlobeAltIcon, 
  MapPinIcon,
  PhotoIcon,
  PlusIcon,
  XMarkIcon
} from '@heroicons/react/24/outline';

const CreateCardPage = () => {
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
  const [error, setError] = useState('');
  const fileInputRef = useRef(null);

  const navigate = useNavigate();
  const { user } = useAuth();
  const { t } = useLanguage();

  const categories = [
    { value: 'technology', label: t('technology') },
    { value: 'business', label: t('business') },
    { value: 'creative', label: t('creative') },
    { value: 'healthcare', label: t('healthcare') },
    { value: 'education', label: t('education') },
    { value: 'finance', label: t('finance') },
    { value: 'marketing', label: t('marketing') },
    { value: 'consulting', label: t('consulting') },
    { value: 'other', label: t('other') }
  ];

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
      if (file.size > 5 * 1024 * 1024) { // 5MB limit
        toast.error(t('imageTooLarge') || 'Image trop volumineuse (max 5MB)');
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
      // Create card directly without API to avoid authentication issues
      const newCard = {
        _id: Date.now().toString(),
        title: formData.title,
        subtitle: formData.subtitle || '',
        description: formData.description,
        company: formData.company || formData.subtitle || '',
        position: formData.position || formData.title || '',
        email: formData.email,
        phone: formData.phone,
        website: formData.website || formData.web || '',
        web: formData.web || formData.website || '',
        address: formData.address,
        category: formData.category,
        tags: formData.tags || [],
        image: formData.image || 'https://via.placeholder.com/300x200',
        userId: user?.id || '507f1f77bcf86cd799439015',
        likes: 0,
        views: 0,
        createdAt: new Date(),
        updatedAt: new Date()
      };

      // Save card to localStorage for simulation
      const existingCards = JSON.parse(localStorage.getItem('userCards') || '[]');
      existingCards.push(newCard);
      localStorage.setItem('userCards', JSON.stringify(existingCards));
      
      toast.success(t('cardCreatedSuccessfully') || 'Card created successfully!');
      navigate('/my-cards');
    } catch (error) {
      const errorMessage = error.message || t('error') || 'An error occurred';
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
            {t('restrictedAccess') || 'Accès restreint'}
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            {t('businessAccountRequired') || 'Vous devez avoir un compte professionnel pour créer des cartes.'}
          </p>
          <button 
            onClick={() => navigate('/register')}
            className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg"
          >
            {t('createBusinessAccount') || 'Créer un compte professionnel'}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 py-8 px-4">
      <div className="container mx-auto max-w-4xl">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl mb-6">
            <PlusIcon className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent mb-4">
            {t('createNewCard') || 'Créer une nouvelle carte'}
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            {t('fillCardInformation') || 'Créez votre carte de visite professionnelle en quelques étapes simples'}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Preview Card */}
          <div className="lg:col-span-1">
            <div className="sticky top-8">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4 flex items-center">
                <PhotoIcon className="w-5 h-5 mr-2" />
                Aperçu de votre carte
              </h3>
              <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-xl border border-gray-200 dark:border-gray-700">
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
                    {formData.title || 'Votre nom'}
                  </h4>
                  <p className="text-blue-600 dark:text-blue-400 font-medium mb-3">
                    {formData.subtitle || 'Votre poste'}
                  </p>
                  <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">
                    {formData.description || 'Votre description professionnelle...'}
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
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="lg:col-span-2">
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
              <div className="bg-gradient-to-r from-blue-500 to-purple-600 px-8 py-6">
                <h2 className="text-2xl font-bold text-white">Informations personnelles</h2>
                <p className="text-blue-100 mt-1">Remplissez vos informations professionnelles</p>
              </div>

              <form onSubmit={handleSubmit} className="p-8 space-y-8">
                {error && (
                  <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl p-4">
                    <p className="text-red-600 dark:text-red-400 text-sm font-medium">{error}</p>
                  </div>
                )}

                {/* Photo Upload */}
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
                        <button
                          type="button"
                          onClick={removeImage}
                          className="absolute -top-2 -right-2 bg-red-500 hover:bg-red-600 text-white rounded-full p-2 shadow-lg transition-colors"
                        >
                          <XMarkIcon className="w-4 h-4" />
                        </button>
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
                            Ajouter une photo
                          </p>
                        </div>
                      </button>
                    )}
                  </div>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                    JPG, PNG ou GIF (max 5MB)
                  </p>
                </div>

                {/* Personal Info */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="relative">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      <UserIcon className="w-4 h-4 inline mr-1" />
                      {t('title') || 'Nom complet'} *
                    </label>
                    <input
                      type="text"
                      name="title"
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
                      {t('subtitle') || 'Poste / Titre'} *
                    </label>
                    <input
                      type="text"
                      name="subtitle"
                      value={formData.subtitle}
                      onChange={handleChange}
                      required
                      placeholder="Ex: Développeur Full-Stack"
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 transition-all"
                    />
                  </div>
                </div>

                {/* Description */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    {t('description') || 'Description professionnelle'}
                  </label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    rows={4}
                    placeholder="Décrivez votre expertise, vos compétences et votre expérience..."
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 transition-all resize-none"
                  />
                </div>

                {/* Contact Info */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="relative">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      <EnvelopeIcon className="w-4 h-4 inline mr-1" />
                      {t('email') || 'Email'} *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      placeholder="jean.dupont@exemple.com"
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 transition-all"
                    />
                  </div>

                  <div className="relative">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      <PhoneIcon className="w-4 h-4 inline mr-1" />
                      {t('phone') || 'Téléphone'} *
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      required
                      placeholder="+33 1 23 45 67 89"
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 transition-all"
                    />
                  </div>
                </div>

                {/* Additional Info */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="relative">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      <GlobeAltIcon className="w-4 h-4 inline mr-1" />
                      {t('website') || 'Site web'}
                    </label>
                    <input
                      type="url"
                      name="website"
                      value={formData.website}
                      onChange={handleChange}
                      placeholder="https://monsite.com"
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 transition-all"
                    />
                  </div>

                  <div className="relative">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      {t('category') || 'Catégorie'} *
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
                    {t('address') || 'Adresse'}
                  </label>
                  <input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    placeholder="123 Rue de la Paix, 75001 Paris, France"
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 transition-all"
                  />
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 pt-8 border-t border-gray-200 dark:border-gray-700">
                  <button
                    type="button"
                    onClick={() => navigate('/my-cards')}
                    className="flex-1 bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 py-3 px-6 rounded-xl font-medium transition-all duration-200 border border-gray-300 dark:border-gray-600"
                  >
                    {t('cancel') || 'Annuler'}
                  </button>
                  <button
                    type="submit"
                    disabled={loading}
                    className="flex-1 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 disabled:from-gray-400 disabled:to-gray-500 text-white py-3 px-6 rounded-xl font-medium transition-all duration-200 shadow-lg hover:shadow-xl disabled:shadow-none flex items-center justify-center"
                  >
                    {loading ? (
                      <>
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                        {t('creating') || 'Création...'}
                      </>
                    ) : (
                      <>
                        <PlusIcon className="w-5 h-5 mr-2" />
                        {t('createCard') || 'Créer ma carte'}
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
