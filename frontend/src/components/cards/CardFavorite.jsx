import { motion } from 'framer-motion';
import {
  EyeIcon,
  PhoneIcon,
  EnvelopeIcon,
  MapPinIcon,
  GlobeAltIcon,
  StarIcon,
  TrashIcon,
} from '@heroicons/react/24/outline';
import { HeartIcon as HeartSolid } from '@heroicons/react/24/solid';

const CardFavorite = ({ card, onRemoveFavorite, onViewCard, onContact }) => {
  const rating = card.rating || 4.5;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.9 }}
      whileHover={{ y: -5, scale: 1.02 }}
      className="glass rounded-2xl overflow-hidden group hover:shadow-2xl hover:shadow-primary-500/20 transition-all duration-300"
    >
      {/* Image */}
      <div className="relative h-48 overflow-hidden">
        <img
          src={card.image || 'https://picsum.photos/400/300?random=5'}
          alt={card.title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          loading="lazy"
          onError={(e) => {
            e.target.src = 'https://picsum.photos/400/300?random=5';
          }}
        />
        
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        
        {/* Category Badge */}
        <div className="absolute top-3 left-3">
          <span className="px-3 py-1 bg-primary-500/90 backdrop-blur-sm text-white text-xs font-semibold rounded-full border border-primary-400/50 shadow-lg">
            {card.category}
          </span>
        </div>
        
        {/* Remove from Favorites Button */}
        <div className="absolute top-3 right-3">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => onRemoveFavorite(card._id)}
            className="p-2 rounded-full bg-red-500/90 backdrop-blur-sm border border-red-400 text-white hover:bg-red-600/90 transition-all shadow-lg"
          >
            <TrashIcon className="w-4 h-4" />
          </motion.button>
        </div>
        
        {/* Views Counter */}
        <div className="absolute bottom-3 left-3">
          <span className="px-2 py-1 bg-black/50 backdrop-blur-sm text-white text-xs rounded-full flex items-center gap-1">
            <EyeIcon className="w-3 h-3" />
            {card.views || 0}
          </span>
        </div>
      </div>
      
      {/* Content */}
      <div className="p-4">
        {/* Title */}
        <h3 className="font-bold text-lg text-white mb-2 line-clamp-2 group-hover:text-primary-300 transition-colors">
          {card.title}
        </h3>
        
        {/* Company Info */}
        {card.businessInfo && (
          <div className="mb-3">
            <p className="text-primary-300 font-semibold text-sm">
              {card.businessInfo.companyName}
            </p>
            <p className="text-gray-400 text-xs">
              {card.businessInfo.jobTitle}
            </p>
          </div>
        )}
        
        {/* Description */}
        <p className="text-gray-300 text-sm mb-3 line-clamp-2">
          {card.description}
        </p>
        
        {/* Rating */}
        <div className="flex items-center gap-1 mb-3">
          {[...Array(5)].map((_, i) => (
            <StarIcon
              key={i}
              className={`w-4 h-4 ${
                i < Math.floor(rating) 
                  ? 'text-yellow-400 fill-yellow-400' 
                  : 'text-gray-600'
              }`}
            />
          ))}
          <span className="text-gray-400 text-sm ml-1">({rating})</span>
        </div>
        
        {/* Contact Info */}
        {card.contact && (
          <div className="space-y-2 mb-4">
            {card.contact.email && (
              <div className="flex items-center gap-2 text-gray-300 text-sm">
                <EnvelopeIcon className="w-4 h-4 text-primary-400" />
                <span className="truncate">{card.contact.email}</span>
              </div>
            )}
            {card.contact.phone && (
              <div className="flex items-center gap-2 text-gray-300 text-sm">
                <PhoneIcon className="w-4 h-4 text-primary-400" />
                <span>{card.contact.phone}</span>
              </div>
            )}
            {card.contact.website && (
              <div className="flex items-center gap-2 text-gray-300 text-sm">
                <GlobeAltIcon className="w-4 h-4 text-primary-400" />
                <span className="truncate">{card.contact.website}</span>
              </div>
            )}
            {card.contact.address && (
              <div className="flex items-center gap-2 text-gray-300 text-sm">
                <MapPinIcon className="w-4 h-4 text-primary-400" />
                <span className="truncate">{card.contact.address}</span>
              </div>
            )}
          </div>
        )}
        
        {/* Footer */}
        <div className="space-y-3 pt-3 border-t border-white/10">
          {/* Favorite Badge */}
          <div className="flex items-center gap-1.5 px-2.5 py-1 bg-red-500/20 rounded-lg border border-red-400/30 w-fit">
            <HeartSolid className="w-4 h-4 text-red-400" />
            <span className="text-red-300 text-xs font-medium">Favori</span>
          </div>
          
          {/* Action Buttons */}
          <div className="flex gap-2">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => onContact && onContact(card)}
              className="flex-1 px-3 py-2 bg-blue-500/20 hover:bg-blue-500/30 text-blue-300 text-sm font-medium rounded-lg border border-blue-400/30 transition-all flex items-center justify-center gap-1"
            >
              <PhoneIcon className="w-4 h-4" />
              Contact
            </motion.button>
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => onViewCard(card._id)}
              className="flex-1 px-3 py-2 bg-primary-500/20 hover:bg-primary-500/30 text-primary-300 text-sm font-medium rounded-lg border border-primary-400/30 transition-all flex items-center justify-center gap-1"
            >
              <EyeIcon className="w-4 h-4" />
              Détails
            </motion.button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default CardFavorite;
