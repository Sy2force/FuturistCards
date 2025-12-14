import { useState } from 'react';
import { motion } from 'framer-motion';
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
import { useFavorites } from '../../context/FavoritesContext';
import CardPreview from './CardPreview';

const Card = ({ 
  card, 
  onDelete, 
  onEdit, 
  showActions = false 
}) => {
  const { toggleFavorite, isFavorite } = useFavorites();
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  
  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      whileHover={{ y: -5, scale: 1.02 }}
      transition={{ duration: 0.2 }}
      className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-all duration-300"
      role="article"
      aria-labelledby={`card-title-${card._id}`}
      aria-describedby={`card-description-${card._id}`}
    >
      <div className="relative overflow-hidden">
        <div className="relative w-full h-48 bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900 dark:to-purple-900">
          {(card.image?.url || card.image) ? (
            <img 
              src={card.image?.url || card.image} 
              alt={card.image?.alt || card.title}
              className="w-full h-48 object-cover transition-transform duration-300 hover:scale-110 cursor-pointer"
              onClick={() => setIsPreviewOpen(true)}
              onError={(e) => {
                e.target.style.display = 'none';
                e.target.nextSibling.style.display = 'flex';
              }}
            />
          ) : null}
          <div 
            className={`absolute inset-0 flex items-center justify-center cursor-pointer ${(card.image?.url || card.image) ? 'hidden' : 'flex'}`}
            onClick={() => setIsPreviewOpen(true)}
          >
            <div className="text-center">
              <div className="w-20 h-20 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center mx-auto mb-3">
                <UserIcon className="w-10 h-10 text-white" />
              </div>
              <p className="text-gray-500 dark:text-gray-400 text-sm font-medium">{card.title}</p>
              <p className="text-gray-400 dark:text-gray-500 text-xs">{card.category ? card.category || card.category : 'Catégorie'}</p>
            </div>
          </div>
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300 pointer-events-none">
          <div className="absolute bottom-4 right-4">
            <motion.div 
              whileHover={{ scale: 1.1 }}
              className="bg-white/90 dark:bg-gray-800/90 p-2 rounded-full shadow-lg"
            >
              <EyeIcon className="w-5 h-5 text-blue-600 dark:text-blue-400" />
            </motion.div>
          </div>
        </div>
      </div>
      
      <div className="p-5">
        <div className="mb-4">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2 line-clamp-1" data-testid="card-title">
            {card.title}
          </h3>
          <div className="flex items-center text-gray-600 dark:text-gray-400 text-sm mb-2">
            <BuildingOfficeIcon className="w-4 h-4 mr-1" />
            <span className="mr-2">{card.subtitle || 'Poste'}</span>
            <span className="text-gray-400">•</span>
            <UserIcon className="w-4 h-4 ml-2 mr-1" />
            <span>{card.category ? card.category || card.category : 'Catégorie'}</span>
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
              <span className="truncate max-w-[60px]">{'Site web'}</span>
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
            <span className="text-sm font-medium">{'Favoris'}</span>
          </motion.button>
          
          {showActions && (onEdit || onDelete) && (
            <div className="flex space-x-2">
              {onEdit && (
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => onEdit(card._id || card.id)}
                  data-testid="edit-card-btn"
                  className="p-2 text-blue-500 hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-all duration-200 shadow-sm"
                  aria-label={'Modifier la carte'}
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
                  aria-label={'deleteCard'}
                >
                  <TrashIcon className="w-4 h-4" />
                </motion.button>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Aperçu de la carte */}
      <CardPreview 
        card={card}
        isOpen={isPreviewOpen}
        onClose={() => setIsPreviewOpen(false)}
      />
    </motion.article>
  );
};

export default Card;
