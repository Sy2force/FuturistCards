import React, { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { cards as cardsAPI } from '../api/cards';
import LoadingSpinner from '../components/LoadingSpinner';
import toast from 'react-hot-toast';
import {
  ArrowLeftIcon,
  PhoneIcon,
  TagIcon
} from '@heroicons/react/24/outline';

const EditCard = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [errors, setErrors] = useState({});

  const [formData, setFormData] = useState({
    title: '',
    subtitle: '',
    description: '',
    phone: '',
    email: '',
    web: '',
    image: { url: '', alt: '' },
    address: {
      state: '', country: '', city: '', street: '', houseNumber: '', zip: ''
    },
    category: 'Technology',
    tags: [],
    socialMedia: {
      facebook: '', twitter: '', linkedin: '', instagram: ''
    }
  });

  const loadCard = useCallback(async () => {
    try {
      setLoading(true);
      
      const response = await cardsAPI.getById(id);
      const cardData = response.card;
      
      if (cardData.user_id !== user._id) {
        toast.error('Vous n\'avez pas l\'autorisation de modifier cette carte');
        navigate('/my-cards');
        return;
      }
      
      setFormData({
        title: cardData.title || '',
        subtitle: cardData.subtitle || '',
        description: cardData.description || '',
        phone: cardData.phone || '',
        email: cardData.email || '',
        web: cardData.website || '',
        image: cardData.image?.url || '',
        country: cardData.address?.country || 'Israel',
        city: cardData.address?.city || 'Tel Aviv',
        street: cardData.address?.street || '',
        houseNumber: cardData.address?.houseNumber || '',
        category: cardData.category || 'Technology',
        tags: cardData.tags || [],
        socialMedia: {
          facebook: cardData.socialLinks?.facebook || '',
          twitter: cardData.socialLinks?.twitter || '',
          linkedin: cardData.socialLinks?.linkedin || '',
          instagram: cardData.socialLinks?.instagram || ''
        }
      });
    } catch (error) {
      // Error handled by toast
      toast.error('Erreur lors du chargement de la carte');
      navigate('/my-cards');
    } finally {
      setLoading(false);
    }
  }, [id, user._id, navigate]);

  useEffect(() => {
    if (id) loadCard();
  }, [id, loadCard]);


  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.title.trim()) newErrors.title = 'Le titre est requis';
    if (!formData.subtitle.trim()) newErrors.subtitle = 'Le sous-titre est requis';
    if (!formData.description.trim()) newErrors.description = 'La description est requise';
    if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Email invalide';
    }
    if (formData.phone && !/^[\d\s\-+()]+$/.test(formData.phone)) {
      newErrors.phone = 'Numéro de téléphone invalide';
    }
    if (formData.web && !/^https?:\/\/.+/.test(formData.web)) {
      newErrors.web = 'URL invalide (doit commencer par http:// ou https://)';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      toast.error('Veuillez corriger les erreurs dans le formulaire');
      return;
    }
    
    try {
      setSaving(true);
      await cardsAPI.update(id, formData);
      toast.success('Carte mise à jour avec succès');
      navigate('/my-cards');
    } catch (error) {
      toast.error('Erreur lors de la mise à jour');
    } finally {
      setSaving(false);
    }
  };

  const handleChange = (e) => {
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
    
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleTagsChange = (e) => {
    const tags = e.target.value.split(',').map(tag => tag.trim()).filter(Boolean);
    setFormData(prev => ({ ...prev, tags }));
  };

  const categories = [
    'Technology', 'Healthcare', 'Finance', 'Education', 'Retail',
    'Food & Beverage', 'Real Estate', 'Legal', 'Consulting',
    'Marketing', 'Design', 'Construction', 'Other'
  ];

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
        <LoadingSpinner preset="page" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-between mb-8"
        >
          <div className="flex items-center gap-4">
            <Link
              to="/my-cards"
              className="p-2 bg-white/10 hover:bg-white/20 border border-white/20 rounded-xl text-white transition-colors"
            >
              <ArrowLeftIcon className="w-5 h-5" />
            </Link>
            <div>
              <h1 className="text-3xl font-bold text-white">
                Modifier la Carte
              </h1>
              <p className="text-white/70">
                Mettez à jour les informations de votre carte de visite
              </p>
            </div>
          </div>
        </motion.div>

        {/* Form */}
        <motion.form
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          onSubmit={handleSubmit}
          className="space-y-8"
        >
          {/* Basic Information */}
          <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6">
            <h2 className="text-xl font-semibold text-white mb-6 flex items-center gap-2">
              <TagIcon className="w-5 h-5" />
              Informations de Base
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-white/80 text-sm font-medium mb-2">
                  Titre *
                </label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  className={`w-full bg-white/5 border rounded-xl px-4 py-3 text-white placeholder-white/40 focus:outline-none focus:bg-white/10 transition-all ${
                    errors.title ? 'border-red-500/50' : 'border-white/20 focus:border-blue-500/50'
                  }`}
                  placeholder="Nom de votre entreprise"
                />
                {errors.title && (
                  <p className="text-red-400 text-sm mt-1">{errors.title}</p>
                )}
              </div>
              
              <div>
                <label className="block text-white/80 text-sm font-medium mb-2">
                  Sous-titre *
                </label>
                <input
                  type="text"
                  name="subtitle"
                  value={formData.subtitle}
                  onChange={handleChange}
                  className={`w-full bg-white/5 border rounded-xl px-4 py-3 text-white placeholder-white/40 focus:outline-none focus:bg-white/10 transition-all ${
                    errors.subtitle ? 'border-red-500/50' : 'border-white/20 focus:border-blue-500/50'
                  }`}
                  placeholder="Votre fonction ou spécialité"
                />
                {errors.subtitle && (
                  <p className="text-red-400 text-sm mt-1">{errors.subtitle}</p>
                )}
              </div>
              
              <div className="md:col-span-2">
                <label className="block text-white/80 text-sm font-medium mb-2">
                  Description *
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  rows={4}
                  className={`w-full bg-white/5 border rounded-xl px-4 py-3 text-white placeholder-white/40 focus:outline-none focus:bg-white/10 transition-all resize-none ${
                    errors.description ? 'border-red-500/50' : 'border-white/20 focus:border-blue-500/50'
                  }`}
                  placeholder="Décrivez votre activité et vos services"
                />
                {errors.description && (
                  <p className="text-red-400 text-sm mt-1">{errors.description}</p>
                )}
              </div>
              
              <div>
                <label className="block text-white/80 text-sm font-medium mb-2">
                  Catégorie
                </label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className="w-full bg-white/5 border border-white/20 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500/50 focus:bg-white/10 transition-all"
                >
                  {categories.map(category => (
                    <option key={category} value={category} className="bg-slate-800">
                      {category}
                    </option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="block text-white/80 text-sm font-medium mb-2">
                  Tags (séparés par des virgules)
                </label>
                <input
                  type="text"
                  value={formData.tags.join(', ')}
                  onChange={handleTagsChange}
                  className="w-full bg-white/5 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-white/40 focus:outline-none focus:border-blue-500/50 focus:bg-white/10 transition-all"
                  placeholder="web design, marketing, consulting"
                />
              </div>
            </div>
          </div>

          {/* Contact Information */}
          <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6">
            <h2 className="text-xl font-semibold text-white mb-6 flex items-center gap-2">
              <PhoneIcon className="w-5 h-5" />
              Informations de Contact
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-white/80 text-sm font-medium mb-2">
                  Téléphone
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className={`w-full bg-white/5 border rounded-xl px-4 py-3 text-white placeholder-white/40 focus:outline-none focus:bg-white/10 transition-all ${
                    errors.phone ? 'border-red-500/50' : 'border-white/20 focus:border-blue-500/50'
                  }`}
                  placeholder="+33 1 23 45 67 89"
                />
                {errors.phone && (
                  <p className="text-red-400 text-sm mt-1">{errors.phone}</p>
                )}
              </div>
              
              <div>
                <label className="block text-white/80 text-sm font-medium mb-2">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`w-full bg-white/5 border rounded-xl px-4 py-3 text-white placeholder-white/40 focus:outline-none focus:bg-white/10 transition-all ${
                    errors.email ? 'border-red-500/50' : 'border-white/20 focus:border-blue-500/50'
                  }`}
                  placeholder="contact@exemple.com"
                />
                {errors.email && (
                  <p className="text-red-400 text-sm mt-1">{errors.email}</p>
                )}
              </div>
              
              <div className="md:col-span-2">
                <label className="block text-white/80 text-sm font-medium mb-2">
                  Site Web
                </label>
                <input
                  type="url"
                  name="web"
                  value={formData.web}
                  onChange={handleChange}
                  className={`w-full bg-white/5 border rounded-xl px-4 py-3 text-white placeholder-white/40 focus:outline-none focus:bg-white/10 transition-all ${
                    errors.web ? 'border-red-500/50' : 'border-white/20 focus:border-blue-500/50'
                  }`}
                  placeholder="https://www.exemple.com"
                />
                {errors.web && (
                  <p className="text-red-400 text-sm mt-1">{errors.web}</p>
                )}
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center justify-end gap-4">
            <Link
              to="/my-cards"
              className="px-6 py-3 bg-gray-500/20 hover:bg-gray-500/30 border border-gray-500/30 rounded-xl text-gray-300 font-medium transition-colors"
            >
              Annuler
            </Link>
            <button
              type="submit"
              disabled={saving}
              className="px-6 py-3 bg-blue-500/30 hover:bg-blue-500/40 border border-blue-500/50 rounded-xl text-white font-medium transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {saving ? 'Sauvegarde...' : 'Sauvegarder'}
            </button>
          </div>
        </motion.form>
      </div>
    </div>
  );
};

export default EditCard;
