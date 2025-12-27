import React, { useState, useEffect, useCallback } from 'react';
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

const CardDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [card, setCard] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isFavorite, setIsFavorite] = useState(false);
  // Favorite loading state removed - handled by context

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
    }
  }, [id, navigate]);


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
        await api.post(`/favorites/${id}`);
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
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  }

  if (!card) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Carte non trouvée</h2>
          <button
            onClick={() => navigate('/cards')}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Retour aux cartes
          </button>
        </div>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>{card.title || card.fullName} - FuturistCards</title>
<meta name="description" content={`Carte de visite de ${card.title || card.fullName} - ${card.subtitle || card.jobTitle} chez ${card.company}`} />
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
                    <h1 className="text-4xl font-bold mb-2">{card.title || card.fullName}</h1>
                    <p className="text-xl opacity-90">{card.subtitle || card.jobTitle}</p>
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
          </div>
        </div>
      </div>
    </>
  );
};

export default CardDetailsPage;
