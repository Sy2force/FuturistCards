import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { 
  HeartIcon, 
  PencilIcon, 
  TrashIcon, 
  EyeIcon,
  BuildingOfficeIcon,
  UserIcon,
  PhoneIcon,
  EnvelopeIcon,
  GlobeAltIcon
} from '@heroicons/react/24/outline';
import { HeartIcon as HeartSolidIcon } from '@heroicons/react/24/solid';
import { useFavorites } from '../context/FavoritesContext';

const Card = ({ 
  card, 
  onDelete, 
  onEdit, 
  showActions = false 
}) => {
  const { toggleFavorite, isFavorite } = useFavorites();
  const { t } = useTranslation();
  
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -5, transition: { duration: 0.2 } }}
      data-testid="card-item"
      className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 border border-gray-200 dark:border-gray-700"
    >
      <Link to={`/cards/${card._id}`}>
        <div className="relative overflow-hidden">
          <img 
            src={card.image?.url || card.image || 'https://via.placeholder.com/300x200'} 
            alt={card.image?.alt || card.title}
            className="w-full h-48 object-cover transition-transform duration-300 hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300">
            <div className="absolute bottom-4 right-4">
              <motion.div 
                whileHover={{ scale: 1.1 }}
                className="bg-white/90 dark:bg-gray-800/90 p-2 rounded-full shadow-lg"
              >
                <EyeIcon className="w-5 h-5 text-primary-600 dark:text-primary-400" />
              </motion.div>
            </div>
          </div>
        </div>
      </Link>
      
      <div className="p-5">
        <div className="mb-4">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2 line-clamp-1" data-testid="card-title">
            {card.title}
          </h3>
          <div className="flex items-center text-gray-600 dark:text-gray-400 text-sm mb-2">
            <BuildingOfficeIcon className="w-4 h-4 mr-1" />
            <span className="mr-2">{card.subtitle || t('position')}</span>
            <span className="text-gray-400">•</span>
            <UserIcon className="w-4 h-4 ml-2 mr-1" />
            <span>{card.category || t('category')}</span>
          </div>
          <p className="text-gray-600 dark:text-gray-400 text-sm line-clamp-2 leading-relaxed">
            {card.description}
          </p>
        </div>
        
        {/* Contact Info Icons */}
        <div className="flex items-center space-x-4 mb-4 text-xs text-gray-500 dark:text-gray-400">
          {card.email && (
            <div className="flex items-center">
              <EnvelopeIcon className="w-3 h-3 mr-1" />
              <span className="truncate max-w-[80px]">{card.email}</span>
            </div>
          )}
          {card.phone && (
            <div className="flex items-center">
              <PhoneIcon className="w-3 h-3 mr-1" />
              <span>{card.phone}</span>
            </div>
          )}
          {card.website && (
            <div className="flex items-center">
              <GlobeAltIcon className="w-3 h-3 mr-1" />
              <span className="truncate max-w-[60px]">{t('website')}</span>
            </div>
          )}
        </div>
        
        <div className="flex items-center justify-between pt-3 border-t border-gray-200 dark:border-gray-700">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => toggleFavorite(card.id || card._id)}
            data-testid={isFavorite(card.id || card._id) ? "remove-favorite-btn" : "add-favorite-btn"}
            className="flex items-center space-x-2 px-3 py-2 rounded-lg text-gray-500 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 transition-all duration-200"
          >
            {isFavorite(card.id || card._id) ? (
              <HeartSolidIcon className="w-5 h-5 text-red-500" />
            ) : (
              <HeartIcon className="w-5 h-5" />
            )}
            <span className="text-sm font-medium">{t('favorites')}</span>
          </motion.button>
          
          {showActions && (onEdit || onDelete) && (
            <div className="flex space-x-2">
              {onEdit && (
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => onEdit(card._id || card.id)}
                  data-testid="edit-card-btn"
                  className="p-2 text-primary-500 hover:text-primary-600 hover:bg-primary-50 dark:hover:bg-primary-900/20 rounded-lg transition-all duration-200 shadow-sm"
                  aria-label="Edit card"
                >
                  <PencilIcon className="w-4 h-4" />
                </motion.button>
              )}
              {onDelete && (
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => onDelete(card._id || card.id)}
                  data-testid="delete-card-btn"
                  className="p-2 text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-all duration-200 shadow-sm"
                  aria-label="Delete card"
                >
                  <TrashIcon className="w-4 h-4" />
                </motion.button>
              )}
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default Card;
