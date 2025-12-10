import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  XMarkIcon,
  EnvelopeIcon,
  PhoneIcon,
  GlobeAltIcon,
  MapPinIcon,
  UserIcon,
  BuildingOfficeIcon,
  HeartIcon,
  ShareIcon
} from '@heroicons/react/24/outline';
import { HeartIcon as HeartSolidIcon } from '@heroicons/react/24/solid';
import { useFavorites } from '../context/FavoritesContext';

const CardPreview = ({ card, isOpen, onClose }) => {
  const { toggleFavorite, isFavorite } = useFavorites();

  if (!card) return null;

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: card.title,
          text: card.description,
          url: window.location.href
        });
      } catch (error) {
        // Fallback pour navigateurs qui ne supportent pas Web Share API
        navigator.clipboard.writeTexwindow.location.href;
      }
    } else {
      navigator.clipboard.writeTexwindow.location.href;
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
          >
            {/* Modal */}
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto"
            >
              {/* Header avec image de fond */}
              <div className="relative">
                <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-6 text-white rounded-t-2xl">
                  {/* Bouton fermer */}
                  <button
                    onClick={onClose}
                    className="absolute top-4 right-4 p-2 hover:bg-white/20 rounded-full transition-colors"
                  >
                    <XMarkIcon className="w-5 h-5" />
                  </button>
                  
                  <div className="text-center">
                    {(card.image?.url || card.image) ? (
                      <img 
                        src={card.image?.url || card.image} 
                        alt={card.image?.alt || card.title}
                        className="w-20 h-20 rounded-full object-cover mx-auto mb-4 border-4 border-white/20"
                      />
                    ) : (
                      <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                        <UserIcon className="w-10 h-10 text-white" />
                      </div>
                    )}
                    <h2 className="text-2xl font-bold mb-1">{card.title}</h2>
                    <p className="text-lg opacity-90">{card.subtitle}</p>
                    <div className="flex items-center justify-center mt-2">
                      <BuildingOfficeIcon className="w-4 h-4 mr-1" />
                      <span className="text-sm">
                        {card.category ? card.category || card.category : 'Catégorie'}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Contenu */}
              <div className="p-6">
                {/* Description */}
                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-3">
                    {'aboutSection'}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 leading-relaxed text-sm">
                    {card.description}
                  </p>
                </div>

                {/* Informations de contact */}
                <div className="space-y-4 mb-6">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                    {'contactDetails'}
                  </h3>
                  
                  <div className="grid gap-3">
                    {card.email && (
                      <div className="flex items-center space-x-3">
                        <EnvelopeIcon className="w-5 h-5 text-blue-500 flex-shrink-0" />
                        <div>
                          <p className="text-xs text-gray-500 dark:text-gray-400">{'emailLabel'}</p>
                          <a 
                            href={`mailto:${card.email}`}
                            className="text-blue-500 hover:text-blue-600 text-sm"
                          >
                            {card.email}
                          </a>
                        </div>
                      </div>
                    )}

                    {card.phone && (
                      <div className="flex items-center space-x-3">
                        <PhoneIcon className="w-5 h-5 text-green-500 flex-shrink-0" />
                        <div>
                          <p className="text-xs text-gray-500 dark:text-gray-400">{'phoneLabel'}</p>
                          <a 
                            href={`tel:${card.phone}`}
                            className="text-green-500 hover:text-green-600 text-sm"
                          >
                            {card.phone}
                          </a>
                        </div>
                      </div>
                    )}

                    {card.website && (
                      <div className="flex items-center space-x-3">
                        <GlobeAltIcon className="w-5 h-5 text-purple-500 flex-shrink-0" />
                        <div>
                          <p className="text-xs text-gray-500 dark:text-gray-400">{'Site web'}</p>
                          <a 
                            href={card.website}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-purple-500 hover:text-purple-600 text-sm truncate max-w-[200px] block"
                          >
                            {card.website}
                          </a>
                        </div>
                      </div>
                    )}

                    {card.address && (
                      <div className="flex items-center space-x-3">
                        <MapPinIcon className="w-5 h-5 text-red-500 flex-shrink-0" />
                        <div>
                          <p className="text-xs text-gray-500 dark:text-gray-400">{'Adresse'}</p>
                          <p className="text-gray-700 dark:text-gray-300 text-sm">{card.address}</p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Actions */}
                <div className="flex space-x-3 pt-4 border-t border-gray-200 dark:border-gray-600">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => toggleFavorite(card.id || card._id)}
                    className={`flex-1 flex items-center justify-center space-x-2 px-4 py-3 rounded-lg font-medium transition-all duration-200 ${
                      isFavorite(card.id || card._id)
                        ? 'bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400'
                        : 'bg-gray-50 dark:bg-gray-700 text-gray-600 dark:text-gray-400 hover:bg-red-50 hover:text-red-600'
                    }`}
                  >
                    {isFavorite(card.id || card._id) ? (
                      <HeartSolidIcon className="w-5 h-5" />
                    ) : (
                      <HeartIcon className="w-5 h-5" />
                    )}
                    <span className="text-sm">{'Favoris'}</span>
                  </motion.button>

                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleShare}
                    className="flex-1 flex items-center justify-center space-x-2 px-4 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-lg font-medium transition-colors"
                  >
                    <ShareIcon className="w-5 h-5" />
                    <span className="text-sm">{'share'}</span>
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default CardPreview;
