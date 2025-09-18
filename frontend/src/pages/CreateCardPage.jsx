import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  PhotoIcon, 
  PlusIcon, 
  XMarkIcon,
  EyeIcon,
  CheckIcon,
  ArrowLeftIcon
} from '@heroicons/react/24/outline';
import { useAuth } from '../context/AuthContext';
import { cardService } from '../api/cardService';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const CreateCardPage = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [previewMode, setPreviewMode] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);

  const [formData, setFormData] = useState({
    title: '',
    subtitle: '',
    description: '',
    category: 'business',
    email: user?.email || '',
    phone: user?.phone || '',
    website: '',
    address: {
      street: user?.address?.street || '',
      city: user?.address?.city || '',
      country: user?.address?.country || 'Israel',
      zip: user?.address?.zip || ''
    },
    socialLinks: {
      linkedin: '',
      twitter: '',
      instagram: '',
      facebook: '',
      github: '',
      youtube: ''
    },
    image: {
      url: '',
      alt: ''
    },
    tags: [],
    isPublic: true
  });

  const [currentTag, setCurrentTag] = useState('');
  const [errors, setErrors] = useState({});

  const categories = [
    { value: 'technology', label: 'Technologie' },
    { value: 'business', label: 'Business' },
    { value: 'creative', label: 'Créatif' },
    { value: 'healthcare', label: 'Santé' },
    { value: 'education', label: 'Éducation' },
    { value: 'finance', label: 'Finance' },
    { value: 'marketing', label: 'Marketing' },
    { value: 'consulting', label: 'Conseil' },
    { value: 'other', label: 'Autre' }
  ];

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      setFormData(prev => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: type === 'checkbox' ? checked : value
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: type === 'checkbox' ? checked : value
      }));
    }

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) { // 5MB limit
        toast.error('L\'image ne doit pas dépasser 5MB');
        return;
      }

      const reader = new FileReader();
      reader.onload = (e) => {
        const imageUrl = e.target.result;
        setImagePreview(imageUrl);
        setFormData(prev => ({
          ...prev,
          image: {
            url: imageUrl,
            alt: formData.title || 'Card image'
          }
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddTag = () => {
    if (currentTag.trim() && !formData.tags.includes(currentTag.trim())) {
      setFormData(prev => ({
        ...prev,
        tags: [...prev.tags, currentTag.trim()]
      }));
      setCurrentTag('');
    }
  };

  const handleRemoveTag = (tagToRemove) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove)
    }));
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.title.trim()) {
      newErrors.title = 'Le titre est requis';
    }

    if (!formData.subtitle.trim()) {
      newErrors.subtitle = 'Le sous-titre est requis';
    }

    if (!formData.description.trim()) {
      newErrors.description = 'La description est requise';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'L\'email est requis';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Email invalide';
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Le téléphone est requis';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      toast.error('Veuillez corriger les erreurs du formulaire');
      return;
    }

    try {
      setLoading(true);
      const response = await cardService.createCard(formData);
      toast.success('Carte créée avec succès !');
      navigate('/cards');
    } catch (error) {
      console.error('Error creating card:', error);
      toast.error('Erreur lors de la création de la carte');
    } finally {
      setLoading(false);
    }
  };

  const CardPreview = () => (
    <div className="card-glass max-w-sm mx-auto">
      {/* Image */}
      <div className="relative h-48 mb-4 rounded-xl overflow-hidden bg-gradient-to-br from-blue-500/20 to-purple-500/20">
        {formData.image.url ? (
          <img
            src={formData.image.url}
            alt={formData.image.alt}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <PhotoIcon className="w-16 h-16 text-white/40" />
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
        
        {/* Category Badge */}
        <div className="absolute bottom-3 left-3">
          <span className="px-3 py-1 bg-blue-500/30 backdrop-blur-sm rounded-full text-xs text-white font-medium">
            {categories.find(cat => cat.value === formData.category)?.label}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="space-y-3">
        <div>
          <h3 className="text-xl font-bold text-white">
            {formData.title || 'Titre de la carte'}
          </h3>
          <p className="text-blue-300 text-sm font-medium">
            {formData.subtitle || 'Sous-titre'}
          </p>
        </div>

        <p className="text-white/70 text-sm">
          {formData.description || 'Description de la carte...'}
        </p>

        {/* Contact Info */}
        <div className="space-y-2">
          {formData.email && (
            <p className="text-white/60 text-sm flex items-center gap-2">
              <span>📧</span> {formData.email}
            </p>
          )}
          {formData.phone && (
            <p className="text-white/60 text-sm flex items-center gap-2">
              <span>📱</span> {formData.phone}
            </p>
          )}
          {formData.website && (
            <p className="text-white/60 text-sm flex items-center gap-2">
              <span>🌐</span> {formData.website}
            </p>
          )}
        </div>

        {/* Tags */}
        {formData.tags.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {formData.tags.map(tag => (
              <span key={tag} className="px-2 py-1 bg-white/10 rounded-full text-xs text-white">
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="glass-card p-12 text-center max-w-md">
          <h2 className="text-2xl font-bold text-white mb-4">
            Login Required
          </h2>
          <p className="text-white/60 mb-6">
            You must be logged in to create a card.
          </p>
          <button className="btn-glass btn-primary">
            Sign In
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-4 mb-6">
            <button
              onClick={() => navigate(-1)}
              className="p-2 hover:bg-white/10 rounded-lg transition-colors"
            >
              <ArrowLeftIcon className="w-6 h-6 text-white" />
            </button>
            <div>
              <h1 className="text-3xl font-bold gradient-text">
                Créer une nouvelle carte
              </h1>
              <p className="text-white/60">
                Créez votre carte de visite numérique personnalisée
              </p>
            </div>
          </div>

          {/* Preview Toggle */}
          <div className="flex justify-center mb-6">
            <div className="flex bg-white/5 rounded-lg p-1">
              <button
                onClick={() => setPreviewMode(false)}
                className={`px-4 py-2 rounded-md transition-colors ${
                  !previewMode 
                    ? 'bg-blue-500/30 text-white' 
                    : 'text-white/60 hover:text-white'
                }`}
              >
                Édition
              </button>
              <button
                onClick={() => setPreviewMode(true)}
                className={`px-4 py-2 rounded-md transition-colors flex items-center gap-2 ${
                  previewMode 
                    ? 'bg-blue-500/30 text-white' 
                    : 'text-white/60 hover:text-white'
                }`}
              >
                <EyeIcon className="w-4 h-4" />
                Aperçu
              </button>
            </div>
          </div>
        </div>

        {previewMode ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex justify-center"
          >
            <CardPreview />
          </motion.div>
        ) : (
          <motion.form
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            onSubmit={handleSubmit}
            className="grid grid-cols-1 lg:grid-cols-2 gap-8"
          >
            {/* Left Column - Basic Info */}
            <div className="space-y-6">
              <div className="glass-card p-6">
                <h2 className="text-xl font-bold text-white mb-4">
                  Informations de base
                </h2>

                <div className="space-y-4">
                  <div>
                    <label className="form-label">Titre *</label>
                    <input
                      type="text"
                      name="title"
                      value={formData.title}
                      onChange={handleInputChange}
                      className={`form-input ${errors.title ? 'border-red-500' : ''}`}
                      placeholder="Ex: John Doe"
                    />
                    {errors.title && <p className="form-error">{errors.title}</p>}
                  </div>

                  <div>
                    <label className="form-label">Sous-titre *</label>
                    <input
                      type="text"
                      name="subtitle"
                      value={formData.subtitle}
                      onChange={handleInputChange}
                      className={`form-input ${errors.subtitle ? 'border-red-500' : ''}`}
                      placeholder="Ex: Développeur Full Stack"
                    />
                    {errors.subtitle && <p className="form-error">{errors.subtitle}</p>}
                  </div>

                  <div>
                    <label className="form-label">Catégorie</label>
                    <select
                      name="category"
                      value={formData.category}
                      onChange={handleInputChange}
                      className="form-input"
                    >
                      {categories.map(category => (
                        <option key={category.value} value={category.value}>
                          {category.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="form-label">Description *</label>
                    <textarea
                      name="description"
                      value={formData.description}
                      onChange={handleInputChange}
                      rows={4}
                      className={`form-input ${errors.description ? 'border-red-500' : ''}`}
                      placeholder="Décrivez votre activité, vos compétences..."
                    />
                    {errors.description && <p className="form-error">{errors.description}</p>}
                  </div>
                </div>
              </div>

              {/* Image Upload */}
              <div className="glass-card p-6">
                <h2 className="text-xl font-bold text-white mb-4">
                  Image de la carte
                </h2>

                <div className="space-y-4">
                  <div className="border-2 border-dashed border-white/20 rounded-lg p-6 text-center">
                    {imagePreview ? (
                      <div className="relative">
                        <img
                          src={imagePreview}
                          alt="Preview"
                          className="w-full h-48 object-cover rounded-lg"
                        />
                        <button
                          type="button"
                          onClick={() => {
                            setImagePreview(null);
                            setFormData(prev => ({ ...prev, image: { url: '', alt: '' } }));
                          }}
                          className="absolute top-2 right-2 p-1 bg-red-500/80 rounded-full hover:bg-red-500"
                        >
                          <XMarkIcon className="w-4 h-4 text-white" />
                        </button>
                      </div>
                    ) : (
                      <div>
                        <PhotoIcon className="w-12 h-12 text-white/40 mx-auto mb-4" />
                        <p className="text-white/60 mb-4">
                          Ajoutez une image à votre carte
                        </p>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleImageChange}
                          className="hidden"
                          id="image-upload"
                        />
                        <label
                          htmlFor="image-upload"
                          className="btn-glass btn-primary cursor-pointer inline-flex items-center gap-2"
                        >
                          <PlusIcon className="w-4 h-4" />
                          Choisir une image
                        </label>
                      </div>
                    )}
                  </div>

                  <div>
                    <label className="form-label">Texte alternatif</label>
                    <input
                      type="text"
                      name="image.alt"
                      value={formData.image.alt}
                      onChange={handleInputChange}
                      className="form-input"
                      placeholder="Description de l'image"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column - Contact & Additional Info */}
            <div className="space-y-6">
              {/* Contact Info */}
              <div className="glass-card p-6">
                <h2 className="text-xl font-bold text-white mb-4">
                  Informations de contact
                </h2>

                <div className="space-y-4">
                  <div>
                    <label className="form-label">Email *</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className={`form-input ${errors.email ? 'border-red-500' : ''}`}
                      placeholder="john@example.com"
                    />
                    {errors.email && <p className="form-error">{errors.email}</p>}
                  </div>

                  <div>
                    <label className="form-label">Téléphone *</label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className={`form-input ${errors.phone ? 'border-red-500' : ''}`}
                      placeholder="052-1234567"
                    />
                    {errors.phone && <p className="form-error">{errors.phone}</p>}
                  </div>

                  <div>
                    <label className="form-label">Site web</label>
                    <input
                      type="url"
                      name="website"
                      value={formData.website}
                      onChange={handleInputChange}
                      className="form-input"
                      placeholder="https://monsite.com"
                    />
                  </div>
                </div>
              </div>

              {/* Address */}
              <div className="glass-card p-6">
                <h2 className="text-xl font-bold text-white mb-4">
                  Adresse
                </h2>

                <div className="grid grid-cols-2 gap-4">
                  <div className="col-span-2">
                    <label className="form-label">Rue</label>
                    <input
                      type="text"
                      name="address.street"
                      value={formData.address.street}
                      onChange={handleInputChange}
                      className="form-input"
                      placeholder="123 Rue Example"
                    />
                  </div>

                  <div>
                    <label className="form-label">Ville</label>
                    <input
                      type="text"
                      name="address.city"
                      value={formData.address.city}
                      onChange={handleInputChange}
                      className="form-input"
                      placeholder="Tel Aviv"
                    />
                  </div>

                  <div>
                    <label className="form-label">Code postal</label>
                    <input
                      type="text"
                      name="address.zip"
                      value={formData.address.zip}
                      onChange={handleInputChange}
                      className="form-input"
                      placeholder="12345"
                    />
                  </div>

                  <div className="col-span-2">
                    <label className="form-label">Pays</label>
                    <input
                      type="text"
                      name="address.country"
                      value={formData.address.country}
                      onChange={handleInputChange}
                      className="form-input"
                      placeholder="Israel"
                    />
                  </div>
                </div>
              </div>

              {/* Social Links */}
              <div className="glass-card p-6">
                <h2 className="text-xl font-bold text-white mb-4">
                  Réseaux sociaux
                </h2>

                <div className="space-y-4">
                  <div>
                    <label className="form-label">LinkedIn</label>
                    <input
                      type="url"
                      name="socialLinks.linkedin"
                      value={formData.socialLinks.linkedin}
                      onChange={handleInputChange}
                      className="form-input"
                      placeholder="https://linkedin.com/in/username"
                    />
                  </div>

                  <div>
                    <label className="form-label">Twitter</label>
                    <input
                      type="url"
                      name="socialLinks.twitter"
                      value={formData.socialLinks.twitter}
                      onChange={handleInputChange}
                      className="form-input"
                      placeholder="https://twitter.com/username"
                    />
                  </div>

                  <div>
                    <label className="form-label">GitHub</label>
                    <input
                      type="url"
                      name="socialLinks.github"
                      value={formData.socialLinks.github}
                      onChange={handleInputChange}
                      className="form-input"
                      placeholder="https://github.com/username"
                    />
                  </div>
                </div>
              </div>

              {/* Tags */}
              <div className="glass-card p-6">
                <h2 className="text-xl font-bold text-white mb-4">
                  Tags
                </h2>

                <div className="space-y-4">
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={currentTag}
                      onChange={(e) => setCurrentTag(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddTag())}
                      className="form-input flex-1"
                      placeholder="Ajouter un tag..."
                    />
                    <button
                      type="button"
                      onClick={handleAddTag}
                      className="btn-glass btn-primary"
                    >
                      <PlusIcon className="w-4 h-4" />
                    </button>
                  </div>

                  {formData.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {formData.tags.map(tag => (
                        <span
                          key={tag}
                          className="px-3 py-1 bg-blue-500/20 rounded-full text-sm text-white flex items-center gap-2"
                        >
                          {tag}
                          <button
                            type="button"
                            onClick={() => handleRemoveTag(tag)}
                            className="hover:text-red-400"
                          >
                            <XMarkIcon className="w-3 h-3" />
                          </button>
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Visibility */}
              <div className="glass-card p-6">
                <h2 className="text-xl font-bold text-white mb-4">
                  Visibilité
                </h2>

                <label className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    name="isPublic"
                    checked={formData.isPublic}
                    onChange={handleInputChange}
                    className="w-4 h-4 text-blue-500 rounded focus:ring-blue-500 focus:ring-2"
                  />
                  <span className="text-white">
                    Rendre cette carte publique
                  </span>
                </label>
                <p className="text-white/60 text-sm mt-2">
                  Les cartes publiques peuvent être vues par tous les utilisateurs
                </p>
              </div>
            </div>

            {/* Submit Buttons */}
            <div className="lg:col-span-2 flex justify-center gap-4 pt-6">
              <button
                type="button"
                onClick={() => navigate(-1)}
                className="btn-glass px-8 py-3"
              >
                Annuler
              </button>
              <button
                type="submit"
                disabled={loading}
                className="btn-glass btn-primary px-8 py-3 flex items-center gap-2"
              >
                {loading ? (
                  <div className="spinner w-4 h-4"></div>
                ) : (
                  <CheckIcon className="w-4 h-4" />
                )}
                {loading ? 'Création...' : 'Créer la carte'}
              </button>
            </div>
          </motion.form>
        )}
      </div>
    </div>
  );
};

export default CreateCardPage;
