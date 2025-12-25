<<<<<<< HEAD
import { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import {
  ArrowLeftIcon,
  HeartIcon,
  ShareIcon,
  PhoneIcon,
  EnvelopeIcon,
  GlobeAltIcon,
  MapPinIcon
} from '@heroicons/react/24/outline';
import { HeartIcon as HeartSolidIcon } from '@heroicons/react/24/solid';
import { useAuth } from '../context/AuthContext';
import LoadingSpinner from '../components/common/LoadingSpinner';
import { api } from '../services/api';
import toast from 'react-hot-toast';
=======
import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { useI18n } from '../hooks/useI18n';
import { useTheme } from '../contexts/ThemeContext';
import LikeButton from '../components/ui/LikeButton';
import axios from 'axios';
>>>>>>> 1ca665d3f5f764417ada1cdd89a898f39ac3dccd

const CardDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
<<<<<<< HEAD
=======
  const { t } = useI18n();
  const { isDark } = useTheme();
>>>>>>> 1ca665d3f5f764417ada1cdd89a898f39ac3dccd
  const { user } = useAuth();
  const [card, setCard] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isFavorite, setIsFavorite] = useState(false);
<<<<<<< HEAD

  const fetchCard = useCallback(async () => {
    try {
      setLoading(true);
      const response = await api.get(`/cards/${id}`);
      setCard(response.data);
    } catch (error) {
      toast.error('Erreur lors du chargement de la carte');
      navigate('/cards');
    } finally {
      setLoading(false);
=======
  const [favoriteLoading, setFavoriteLoading] = useState(false);

  useEffect(() => {
    // Simuler un chargement
    setTimeout(() => {
      const mockCard = {
        _id: '12345',
        title: 'Mock Card Title',
        subtitle: 'Mock Card Subtitle',
        image: {
          url: 'https://example.com/image.jpg',
          alt: 'Mock Card Image'
        },
        email: 'mock@example.com',
        phone: '123-456-7890',
        address: {
          city: 'Mock City',
          country: 'Mock Country'
        },
        web: 'https://example.com'
      };
      setCard(mockCard);
      setLoading(false);
    }, 500);
  }, [id]);

  // Check if card is in favorites on component mount
  useEffect(() => {
    const checkFavoriteStatus = async () => {
      if (card && user) {
        try {
          const token = localStorage.getItem('token');
          const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/cards/${card._id}/favorite`, {
            headers: { Authorization: `Bearer ${token}` }
          });
          setIsFavorite(response.data.isFavorite);
        } catch (error) {
          // Error checking favorite status - fallback to localStorage
          const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
          setIsFavorite(favorites.includes(card._id));
        }
      }
    };

    checkFavoriteStatus();
  }, [card, user]);

  const handleToggleFavorite = async () => {
    if (!user) {
      navigate('/login');
      return;
>>>>>>> 1ca665d3f5f764417ada1cdd89a898f39ac3dccd
    }

    setFavoriteLoading(true);
    
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/api/cards/${card._id}/favorite`, {}, {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      setIsFavorite(response.data.isFavorite);
    } catch (error) {
      // Error toggling favorite - fallback to localStorage
      const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
      let updatedFavorites;
      
      if (isFavorite) {
        updatedFavorites = favorites.filter(id => id !== card._id);
      } else {
        updatedFavorites = [...favorites, card._id];
      }
      
      localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
      setIsFavorite(!isFavorite);
    } finally {
      setFavoriteLoading(false);
    }
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: card.title,
        text: card.subtitle,
        url: window.location.href,
      });
    } else {
      // Fallback: copier l'URL
      navigator.clipboard.writeText(window.location.href);
      // Vous pourriez ajouter une notification ici
    }
  };

  const checkIfFavorite = useCallback(async () => {
    try {
      const response = await api.get('/favorites');
      const favoriteCard = response.data.find(fav => fav.card._id === id);
      setIsFavorite(!!favoriteCard);
    } catch (error) {
      // Erreur favoris - continue sans favoris
    }
  }, [id]);

  useEffect(() => {
    fetchCard();
    if (user) {
      checkIfFavorite();
    }
  }, [fetchCard, checkIfFavorite, user]);

  const handleToggleFavorite = async () => {
    if (!user) {
      toast.error('Vous devez être connecté pour ajouter aux favoris');
      return;
    }

    try {
      if (isFavorite) {
        await api.delete(`/favorites/${id}`);
        setIsFavorite(false);
        toast.success('Retiré des favoris');
      } else {
        await api.post('/favorites', { cardId: id });
        setIsFavorite(true);
        toast.success('Ajouté aux favoris');
      }
    } catch (error) {
      toast.error('Erreur lors de la gestion des favoris');
    }
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `${card.fullName} - FuturistCards`,
          text: `Découvrez la carte de visite de ${card.fullName}`,
          url: window.location.href,
        });
      } catch (error) {
        // Erreur partage - continue
      }
    } else {
      // Fallback: copier l'URL
      navigator.clipboard.writeText(window.location.href);
      toast.success('Lien copié dans le presse-papiers');
    }
  };

  if (loading) {
    return (
<<<<<<< HEAD
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <LoadingSpinner />
=======
      <div className={`min-h-screen flex items-center justify-center px-4 ${isDark ? 'dark-gradient' : 'glass-gradient'}`}>
        <div className={`${isDark ? 'glass-effect border-white/20' : 'bg-white/80 backdrop-blur-lg border-gray-200/50'} rounded-2xl p-8 shadow-3d border animate-fade-in text-center`}>
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-400 mx-auto mb-4"></div>
          <p className={isDark ? 'text-gray-300' : 'text-gray-600'}>{t('cardDetails.loadingCard')}</p>
        </div>
>>>>>>> 1ca665d3f5f764417ada1cdd89a898f39ac3dccd
      </div>
    );
  }

  if (!card) {
    return (
<<<<<<< HEAD
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Carte non trouvée</h2>
          <button
            onClick={() => navigate('/cards')}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Retour aux cartes
          </button>
=======
      <div className={`min-h-screen flex items-center justify-center px-4 ${isDark ? 'dark-gradient' : 'glass-gradient'}`}>
        <div className={`${isDark ? 'glass-effect border-white/20' : 'bg-white/80 backdrop-blur-lg border-gray-200/50'} rounded-2xl p-8 shadow-3d border w-full max-w-md animate-fade-in text-center`}>
          <div className="w-16 h-16 gradient-danger rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
          </div>
          <h2 className={`text-xl font-bold mb-2 ${isDark ? 'text-white' : 'text-gray-800'}`}>{t('cardDetails.cardNotFound')}</h2>
          <p className={`mb-6 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>{t('cardDetails.cardNotFoundDesc')}</p>
          <Link
            to="/cards"
            className="btn-primary inline-flex items-center"
          >
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            {t('cardDetails.backToCards')}
          </Link>
>>>>>>> 1ca665d3f5f764417ada1cdd89a898f39ac3dccd
        </div>
      </div>
    );
  }

  return (
<<<<<<< HEAD
    <>
      <Helmet>
        <title>{card.fullName} - FuturistCards</title>
        <meta name="description" content={`Carte de visite de ${card.fullName} - ${card.jobTitle} chez ${card.company}`} />
      </Helmet>

      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="container mx-auto px-4 py-8">
          {/* Header avec navigation */}
          <div className="flex items-center justify-between mb-8">
            <motion.button
              onClick={() => navigate('/cards')}
              className="flex items-center text-gray-600 hover:text-gray-800 transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <ArrowLeftIcon className="w-5 h-5 mr-2" />
              Retour aux cartes
            </motion.button>

            <div className="flex items-center space-x-4">
              <motion.button
                onClick={handleToggleFavorite}
                className={`flex items-center px-4 py-2 rounded-lg transition-colors ${
                  isFavorite 
                    ? 'bg-red-100 text-red-600 hover:bg-red-200' 
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {isFavorite ? (
                  <HeartSolidIcon className="w-5 h-5 mr-2" />
                ) : (
                  <HeartIcon className="w-5 h-5 mr-2" />
                )}
                {isFavorite ? 'Favoris' : 'Ajouter aux favoris'}
              </motion.button>

              <motion.button
                onClick={handleShare}
                className="flex items-center px-4 py-2 bg-blue-100 text-blue-600 rounded-lg hover:bg-blue-200 transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <ShareIcon className="w-5 h-5 mr-2" />
                Partager
              </motion.button>
            </div>
          </div>

          {/* Carte principale */}
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-2xl shadow-xl overflow-hidden"
            >
              {/* Header de la carte */}
              <div 
                className="h-48 bg-gradient-to-r from-blue-600 to-purple-700 relative"
                style={{
                  background: card.theme?.gradient || 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
                }}
              >
                <div className="absolute inset-0 bg-black bg-opacity-20"></div>
                <div className="relative h-full flex items-end p-8">
                  <div className="text-white">
                    <h1 className="text-4xl font-bold mb-2">{card.fullName}</h1>
                    <p className="text-xl opacity-90">{card.jobTitle}</p>
                    <p className="text-lg opacity-80">{card.company}</p>
                  </div>
                </div>
              </div>

              {/* Contenu de la carte */}
              <div className="p-8">
                <div className="grid md:grid-cols-2 gap-8">
                  {/* Informations de contact */}
                  <div>
                    <h2 className="text-2xl font-bold text-gray-800 mb-6">Informations de contact</h2>
                    <div className="space-y-4">
                      {card.email && (
                        <div className="flex items-center">
                          <EnvelopeIcon className="w-6 h-6 text-gray-500 mr-4" />
                          <div>
                            <p className="text-sm text-gray-500">Email</p>
                            <a 
                              href={`mailto:${card.email}`}
                              className="text-blue-600 hover:underline font-medium"
                            >
                              {card.email}
                            </a>
                          </div>
                        </div>
                      )}

                      {card.phone && (
                        <div className="flex items-center">
                          <PhoneIcon className="w-6 h-6 text-gray-500 mr-4" />
                          <div>
                            <p className="text-sm text-gray-500">Téléphone</p>
                            <a 
                              href={`tel:${card.phone}`}
                              className="text-blue-600 hover:underline font-medium"
                            >
                              {card.phone}
                            </a>
                          </div>
                        </div>
                      )}

                      {card.website && (
                        <div className="flex items-center">
                          <GlobeAltIcon className="w-6 h-6 text-gray-500 mr-4" />
                          <div>
                            <p className="text-sm text-gray-500">Site web</p>
                            <a 
                              href={card.website}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-blue-600 hover:underline font-medium"
                            >
                              {card.website}
                            </a>
                          </div>
                        </div>
                      )}

                      {card.address && (
                        <div className="flex items-center">
                          <MapPinIcon className="w-6 h-6 text-gray-500 mr-4" />
                          <div>
                            <p className="text-sm text-gray-500">Adresse</p>
                            <p className="text-gray-700">{card.address}</p>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Description */}
                  <div>
                    <h2 className="text-2xl font-bold text-gray-800 mb-6">À propos</h2>
                    {card.description ? (
                      <p className="text-gray-600 leading-relaxed">{card.description}</p>
                    ) : (
                      <p className="text-gray-400 italic">Aucune description disponible</p>
                    )}

                    {/* Réseaux sociaux */}
                    {card.socialLinks && Object.keys(card.socialLinks).length > 0 && (
                      <div className="mt-8">
                        <h3 className="text-lg font-semibold text-gray-800 mb-4">Réseaux sociaux</h3>
                        <div className="flex flex-wrap gap-4">
                          {Object.entries(card.socialLinks).map(([platform, url]) => {
                            if (url) {
                              return (
                                <a
                                  key={platform}
                                  href={url}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="flex items-center px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
                                >
                                  <span className="capitalize font-medium">{platform}</span>
                                </a>
                              );
                            }
                            return null;
                          })}
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Actions */}
                <div className="mt-8 pt-8 border-t border-gray-200">
                  <div className="flex flex-wrap gap-4 justify-center">
                    {card.email && (
                      <motion.a
                        href={`mailto:${card.email}`}
                        className="flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <EnvelopeIcon className="w-5 h-5 mr-2" />
                        Envoyer un email
                      </motion.a>
                    )}

                    {card.phone && (
                      <motion.a
                        href={`tel:${card.phone}`}
                        className="flex items-center px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <PhoneIcon className="w-5 h-5 mr-2" />
                        Appeler
                      </motion.a>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
=======
    <div className={`min-h-screen py-12 px-4 ${isDark ? 'dark-gradient' : 'glass-gradient'}`}>
      <div className="max-w-4xl mx-auto">
        {/* Bouton retour */}
        <button 
          onClick={() => navigate('/cards')}
          className={`mb-8 flex items-center space-x-2 ${isDark ? 'text-gray-300 hover:text-white' : 'text-gray-600 hover:text-gray-800'} transition-colors hover-lift`}
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          <span>{t('cardDetails.backToCards')}</span>
        </button>

        <div className={`${isDark ? 'glass-effect border-white/20' : 'bg-white/80 backdrop-blur-lg border-gray-200/50'} rounded-2xl p-8 shadow-3d border animate-fade-in hover-lift`}>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Image de la carte */}
            <div>
              {card.image?.url && (
                <div className="aspect-video rounded-xl overflow-hidden mb-6">
                  <img
                    src={card.image.url}
                    alt={card.image.alt || card.title}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
              
              {/* Informations de contact */}
              <div className={`${isDark ? 'glass-effect border-white/10' : 'bg-gray-50/80 border-gray-200/50'} rounded-xl p-6 border`}>
                <h3 className={`text-xl font-bold ${isDark ? 'text-white' : 'text-gray-800'} mb-4`}>{t('cardDetails.contactInformation')}</h3>
                <div className="space-y-3">
                  {card.email && (
                    <div className="flex items-center space-x-3">
                      <svg className="w-5 h-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                      <span className={isDark ? 'text-gray-300' : 'text-gray-600'}>
                        {t(`sampleCardContacts.${card.emailKey}`) || card.email}
                      </span>
                    </div>
                  )}
                  
                  {card.phone && (
                    <div className="flex items-center space-x-3">
                      <svg className="w-5 h-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21L6.16 11.37a11.045 11.045 0 005.516 5.516l1.983-4.064a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                      <span className={isDark ? 'text-gray-300' : 'text-gray-600'}>
                        {t(`sampleCardContacts.${card.phoneKey}`) || card.phone}
                      </span>
                    </div>
                  )}
                  
                  {card.address && (
                    <div className="flex items-center space-x-3">
                      <svg className="w-5 h-5 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      <span className={isDark ? 'text-gray-300' : 'text-gray-600'}>
                        {t(`sampleCardAddresses.${card.addressKey}`) || `${card.address.city}, ${card.address.country}`}
                      </span>
                    </div>
                  )}
                  
                  {card.web && (
                    <div className="flex items-center space-x-3">
                      <svg className="w-5 h-5 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                      </svg>
                      <a href={card.web} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300 transition-colors">
                        {t(`sampleCardContacts.${card.webKey}`) || card.web}
                      </a>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Détails de la carte */}
            <div>
              <div className="mb-6">
                <h1 className="text-3xl font-bold gradient-text mb-2">
                  {t(`sampleCardTitles.${card.titleKey}`) || card.title}
                </h1>
                <p className={`text-xl ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                  {t(`sampleCardSubtitles.${card.subtitleKey}`) || card.subtitle}
                </p>
              </div>

              {card.description && (
                <div className="mb-6">
                  <h3 className={`text-xl font-bold ${isDark ? 'text-white' : 'text-gray-800'} mb-3`}>{t('cardDetails.description')}</h3>
                  <p className={`${isDark ? 'text-gray-300' : 'text-gray-600'} leading-relaxed`}>
                    {t(`sampleCardDescriptions.${card.descriptionKey}`) || card.description}
                  </p>
                </div>
              )}

              {/* Stats et Actions */}
              <div className={`${isDark ? 'glass-effect border-white/10' : 'bg-gray-50/80 border-gray-200/50'} rounded-xl p-4 border mb-6`}>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-6">
                    <div className="flex items-center space-x-2">
                      <svg className="w-5 h-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                      <span className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                        {card.views || 0} {t('views')}
                      </span>
                    </div>
                    <LikeButton 
                      cardId={card._id} 
                      size="md" 
                      initialLikesCount={card.likes || 0}
                    />
                  </div>
                  {/* Actions supplémentaires */}
                  <div className="flex items-center space-x-2">
                    {user && card.user_id === user.id && !card.isDemo && (
                      <button 
                        onClick={() => navigate(`/edit-card/${card._id}`)}
                        className={`px-3 py-2 ${isDark ? 'glass-effect border-white/20 text-white hover:bg-white/10' : 'bg-blue-100 border-blue-200 text-blue-700 hover:bg-blue-200'} hover-lift rounded-lg text-sm font-medium border flex items-center space-x-2 transition-all duration-300`}
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                        </svg>
                        <span>{t('cardDetails.edit')}</span>
                      </button>
                    )}
                    {user && card.user_id === user.id && !card.isDemo && (
                      <button 
                        onClick={() => {
                          if (window.confirm(t('cardDetails.deleteCardConfirm'))) {
                            // Logique de suppression ici
                            navigate('/my-cards');
                          }
                        }}
                        className="px-3 py-2 bg-red-100 border-red-200 text-red-700 hover:bg-red-200 hover-lift rounded-lg text-sm font-medium border flex items-center space-x-2 transition-all duration-300"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                        <span>{t('delete')}</span>
                      </button>
                    )}
                  </div>
                </div>
              </div>

              {/* Actions principales */}
              <div className="flex flex-col sm:flex-row gap-4 mb-6">
                <button 
                  onClick={handleToggleFavorite}
                  disabled={favoriteLoading}
                  className={`px-6 py-3 ${
                    isFavorite 
                      ? 'secondary-gradient hover:opacity-90' 
                      : 'btn-primary'
                  } text-white rounded-lg font-semibold shadow-3d flex items-center justify-center space-x-2 transition-all duration-300 disabled:opacity-50`}
                >
                  {favoriteLoading ? (
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                  ) : (
                    <svg className="w-5 h-5" fill={isFavorite ? "currentColor" : "none"} stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                    </svg>
                  )}
                  <span>{isFavorite ? t('removeFromFavorites') : t('addToFavorites')}</span>
                </button>
                
                <button 
                  onClick={handleShare}
                  className={`px-6 py-3 ${isDark ? 'glass-effect border-white/20 text-white' : 'bg-gray-100 border-gray-300 text-gray-700 hover:bg-gray-200'} hover-lift rounded-lg font-semibold border flex items-center justify-center space-x-2 transition-all duration-300`}
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
                  </svg>
                  <span>{t('share')}</span>
                </button>
              </div>

              {/* Informations détaillées */}
              <div className={`${isDark ? 'glass-effect border-white/10' : 'bg-gray-50/80 border-gray-200/50'} rounded-xl p-6 border`}>
                <h3 className={`text-lg font-bold ${isDark ? 'text-white' : 'text-gray-800'} mb-4`}>{t('cardInformation')}</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                  <div className="flex justify-between">
                    <span className={isDark ? 'text-gray-400' : 'text-gray-500'}>{t('createdOn')}:</span>
                    <span className={isDark ? 'text-white' : 'text-gray-800'}>
                      {card.createdAt ? new Date(card.createdAt).toLocaleDateString('fr-FR') : t('notAvailable')}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className={isDark ? 'text-gray-400' : 'text-gray-500'}>{t('lastUpdated')}:</span>
                    <span className={isDark ? 'text-white' : 'text-gray-800'}>
                      {card.updatedAt ? new Date(card.updatedAt).toLocaleDateString('fr-FR') : t('notAvailable')}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className={isDark ? 'text-gray-400' : 'text-gray-500'}>{t('category')}:</span>
                    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                      isDark ? 'bg-blue-900/30 text-blue-300' : 'bg-blue-100 text-blue-700'
                    }`}>
                      {t(`cardCategories.${card.category}`) || card.category || t('other')}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className={isDark ? 'text-gray-400' : 'text-gray-500'}>{t('status')}:</span>
                    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                      card.isActive 
                        ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300'
                        : 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300'
                    }`}>
                      {card.isActive ? t('active') : t('inactive')}
                    </span>
                  </div>
                  {card.bizNumber && (
                    <div className="flex justify-between">
                      <span className={isDark ? 'text-gray-400' : 'text-gray-500'}>{t('businessNumber')}:</span>
                      <span className={`font-mono text-xs ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                        #{card.bizNumber}
                      </span>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span className={isDark ? 'text-gray-400' : 'text-gray-500'}>{t('cardType')}:</span>
                    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                      card.isDemo 
                        ? 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-300'
                        : 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300'
                    }`}>
                      {card.isDemo ? t('demoCard') : t('userCard')}
                    </span>
                  </div>
                </div>
              </div>

              {/* Statistiques détaillées */}
              <div className={`${isDark ? 'glass-effect border-white/10' : 'bg-gray-50/80 border-gray-200/50'} rounded-xl p-6 border mt-4`}>
                <h3 className={`text-lg font-bold ${isDark ? 'text-white' : 'text-gray-800'} mb-4`}>{t('cardStatistics')}</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="text-center">
                    <div className={`text-2xl font-bold ${isDark ? 'text-blue-400' : 'text-blue-600'}`}>
                      {card.views || 0}
                    </div>
                    <div className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                      {t('totalViews')}
                    </div>
                  </div>
                  <div className="text-center">
                    <div className={`text-2xl font-bold ${isDark ? 'text-red-400' : 'text-red-600'}`}>
                      {card.likes || 0}
                    </div>
                    <div className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                      {t('totalLikes')}
                    </div>
                  </div>
                  <div className="text-center">
                    <div className={`text-2xl font-bold ${isDark ? 'text-green-400' : 'text-green-600'}`}>
                      {card.lastViewed ? new Date(card.lastViewed).toLocaleDateString('fr-FR') : '-'}
                    </div>
                    <div className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                      {t('lastViewed')}
                    </div>
                  </div>
                  <div className="text-center">
                    <div className={`text-2xl font-bold ${isDark ? 'text-purple-400' : 'text-purple-600'}`}>
                      {Math.floor((Date.now() - new Date(card.createdAt).getTime()) / (1000 * 60 * 60 * 24)) || 0}
                    </div>
                    <div className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                      {t('daysOnline')}
                    </div>
                  </div>
                </div>
              </div>
            </div>
>>>>>>> 1ca665d3f5f764417ada1cdd89a898f39ac3dccd
          </div>
        </div>
      </div>
    </>
  );
};

export default CardDetailsPage;
