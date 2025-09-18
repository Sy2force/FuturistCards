import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowLeftIcon, 
  PlusIcon, 
  TrashIcon,
  MagnifyingGlassIcon,
  Cog6ToothIcon,
  ChatBubbleLeftRightIcon,
  MapPinIcon,
  PhoneIcon,
  EnvelopeIcon,
  GlobeAltIcon,
  EyeIcon
} from '@heroicons/react/24/outline';
import useCards from '../hooks/useCards';
import NotificationSystem from '../components/NotificationSystem';
import SearchSystem from '../components/SearchSystem';
import ChatSystem from '../components/ChatSystem';
import GeolocationSystem from '../components/GeolocationSystem';
import SettingsPanel from '../components/SettingsPanel';
import UltraModernCardCreator from '../components/UltraModernCardCreator';
import LikeSystem from '../components/LikeSystem';
import FavoritesSystem from '../components/FavoritesSystem';
import { LazyCardGrid, LazyImage } from '../components/LazyLoading';
import { AnimatedButton, AnimatedCard } from '../components/EnhancedAnimations';
import { useLanguage } from '../context/LanguageContext';

const Cards = () => {
  const { 
    cards, 
    loading, 
    error, 
    addCard, 
    deleteCard, 
    toggleLike 
  } = useCards();
  const { t } = useLanguage();

  const [showForm, setShowForm] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [showChat, setShowChat] = useState(false);
  const [showGeolocation, setShowGeolocation] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [editingCard, setEditingCard] = useState(null);
  const [filteredCards, setFilteredCards] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [formData, setFormData] = useState({
    title: '',
    subtitle: '',
    description: '',
    phone: '',
    email: '',
    web: '',
    image: {
      url: '',
      alt: ''
    },
    address: {
      country: 'France',
      city: '',
      street: '',
      houseNumber: ''
    },
    category: 'Technologie'
  });

  const categories = [
    'Technologie', 'Design', 'Marketing', 'Finance', 
    'Santé', 'Éducation', 'Immobilier', 'Restauration',
    'Construction', 'Transportation', 'Entertainment', 'Sports & Fitness',
    'Beauty & Wellness', 'Other'
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    
    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      setFormData(prev => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: value
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addCard(formData);
      setFormData({
        title: '',
        subtitle: '',
        description: '',
        phone: '',
        email: '',
        web: '',
        image: { url: '', alt: '' },
        address: { country: 'France', city: '', street: '', houseNumber: '' },
        category: 'Technologie'
      });
      setShowForm(false);
    } catch (error) {
      console.error('Error creating card:', error);
    }
  };

  const handleDelete = async (cardId) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer cette carte ?')) {
      try {
        await deleteCard(cardId);
      } catch (error) {
        console.error('Error deleting card:', error);
      }
    }
  };

  const handleLike = async (cardId) => {
    try {
      await toggleLike(cardId);
    } catch (error) {
      console.error('Error toggling like:', error);
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 p-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-between mb-8"
        >
          <Link
            to="/"
            className="flex items-center space-x-2 text-white/80 hover:text-white transition-colors"
          >
            <ArrowLeftIcon className="h-5 w-5" />
            <span>Retour à l'accueil</span>
          </Link>

          <div className="flex items-center space-x-3">
            <AnimatedButton
              variant="secondary"
              size="sm"
              onClick={() => setShowSearch(!showSearch)}
            >
              <MagnifyingGlassIcon className="h-4 w-4 mr-2" />
              {t('search')}
            </AnimatedButton>
            
            <AnimatedButton
              variant="secondary"
              size="sm"
              onClick={() => setShowChat(true)}
            >
              <ChatBubbleLeftRightIcon className="h-4 w-4 mr-2" />
              {t('messages')}
            </AnimatedButton>
            
            <AnimatedButton
              variant="secondary"
              size="sm"
              onClick={() => setShowGeolocation(!showGeolocation)}
            >
              <MapPinIcon className="h-4 w-4 mr-2" />
              {t('location')}
            </AnimatedButton>

            <AnimatedButton
              variant="secondary"
              size="sm"
              onClick={() => setShowSettings(true)}
            >
              <Cog6ToothIcon className="h-4 w-4 mr-2" />
              {t('settings')}
            </AnimatedButton>

            <AnimatedButton
              variant="primary"
              onClick={() => setShowForm(true)}
            >
              <PlusIcon className="h-5 w-5 mr-2" />
              {t('newCard')}
            </AnimatedButton>
          </div>
        </motion.div>

        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1 className="text-4xl font-bold text-white mb-2">{t('portfolioCards') || 'Portfolio Cards'}</h1>
          <p className="text-white/70 text-lg">{t('manageCards') || 'Gérez vos cartes de visite numériques avec des fonctionnalités avancées'}</p>
        </motion.div>

        {/* Advanced Features Panel */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          {/* Search System */}
          <AnimatePresence>
            {showSearch && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="md:col-span-3"
              >
                <SearchSystem 
                  onSearch={(query, filters) => {
                    setSearchQuery(query);
                    // Filter cards based on search query and filters
                    const filtered = cards.filter(card => {
                      const matchesQuery = !query || 
                        card.title.toLowerCase().includes(query.toLowerCase()) ||
                        card.subtitle.toLowerCase().includes(query.toLowerCase()) ||
                        card.description.toLowerCase().includes(query.toLowerCase()) ||
                        card.category.toLowerCase().includes(query.toLowerCase());
                      
                      const matchesCategory = !filters.category || card.category === filters.category;
                      const matchesLocation = !filters.location || 
                        (card.address && card.address.city.toLowerCase().includes(filters.location.toLowerCase()));
                      
                      return matchesQuery && matchesCategory && matchesLocation;
                    });
                    setFilteredCards(filtered);
                  }}
                />
              </motion.div>
            )}
          </AnimatePresence>

          {/* Geolocation System */}
          <AnimatePresence>
            {showGeolocation && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="md:col-span-3"
              >
                <GeolocationSystem 
                  showMap={true}
                  onLocationUpdate={(location) => {
                    console.log('Location updated:', location);
                    // Handle location update for cards
                  }}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>


        {/* Loading State */}
        {loading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-white"></div>
            <p className="text-white/70 mt-4">Chargement des cartes...</p>
          </motion.div>
        )}

        {/* Error State */}
        {error && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-red-500/20 border border-red-500/30 rounded-xl p-6 mb-8"
          >
            <p className="text-red-200">Erreur: {error}</p>
          </motion.div>
        )}

        {/* Cards Grid with Lazy Loading */}
        {!loading && cards.length > 0 && (
          <LazyCardGrid
            items={searchQuery || filteredCards.length > 0 ? filteredCards : cards}
            itemsPerPage={12}
            className=""
            renderItem={(card, index) => (
              <AnimatedCard
                key={card._id}
                delay={index * 0.1}
                hover={true}
                className="overflow-hidden group"
              >
                {/* Card Image with Lazy Loading */}
                {card.image?.url && (
                  <div className="h-48 overflow-hidden mb-4 -mx-6 -mt-6">
                    <LazyImage
                      src={card.image.url}
                      alt={card.image.alt || card.title}
                      className="w-full h-full"
                      placeholder={
                        <div className="w-full h-full bg-gradient-to-br from-purple-500/20 to-blue-500/20 animate-pulse flex items-center justify-center">
                          <div className="text-white/40">Chargement...</div>
                        </div>
                      }
                    />
                  </div>
                )}

                {/* Card Header */}
                <div className="mb-4">
                  <h3 className="text-xl font-bold text-white mb-1">{card.title}</h3>
                  <p className="text-purple-300 font-medium">{card.subtitle}</p>
                  <span className="inline-block bg-purple-500/20 text-purple-300 px-2 py-1 rounded-full text-xs mt-2">
                    {card.category}
                  </span>
                </div>

                {/* Card Description */}
                <p className="text-white/70 text-sm mb-4 line-clamp-3">
                  {card.description}
                </p>

                {/* Contact Info */}
                <div className="space-y-2 mb-4">
                  {card.phone && (
                    <div className="flex items-center space-x-2 text-white/60 text-sm">
                      <PhoneIcon className="h-4 w-4" />
                      <span>{card.phone}</span>
                    </div>
                  )}
                  {card.email && (
                    <div className="flex items-center space-x-2 text-white/60 text-sm">
                      <EnvelopeIcon className="h-4 w-4" />
                      <span>{card.email}</span>
                    </div>
                  )}
                  {card.web && (
                    <div className="flex items-center space-x-2 text-white/60 text-sm">
                      <GlobeAltIcon className="h-4 w-4" />
                      <a href={card.web} target="_blank" rel="noopener noreferrer" className="hover:text-white">
                        Site Web
                      </a>
                    </div>
                  )}
                  {card.address && (
                    <div className="flex items-center space-x-2 text-white/60 text-sm">
                      <MapPinIcon className="h-4 w-4" />
                      <span>{card.address.city}, {card.address.country}</span>
                    </div>
                  )}
                </div>

                {/* Card Actions */}
                <div className="flex items-center justify-between pt-4 border-t border-white/10">
                  <div className="flex items-center space-x-4">
                    <LikeSystem
                      cardId={card._id}
                      initialLikes={card.likesCount || 0}
                      initialIsLiked={card.isLiked || false}
                      onLikeChange={handleLike}
                    />
                    
                    <FavoritesSystem
                      cardId={card._id}
                      initialIsFavorite={card.isFavorite || false}
                      onFavoriteChange={(cardId, isFavorite) => {
                        console.log('Favorite changed:', cardId, isFavorite);
                      }}
                    />
                    
                    <div className="flex items-center space-x-1 text-white/60">
                      <EyeIcon className="h-5 w-5" />
                      <span className="text-sm">{card.views || 0}</span>
                    </div>

                    <button
                      onClick={() => setShowChat(true)}
                      className="flex items-center space-x-1 text-white/60 hover:text-blue-400 transition-colors"
                    >
                      <ChatBubbleLeftRightIcon className="h-4 w-4" />
                      <span className="text-sm">{t('chat')}</span>
                    </button>

                    <button
                      onClick={() => setEditingCard(card)}
                      className="text-white/60 hover:text-blue-400 transition-colors"
                    >
                      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                      </svg>
                    </button>
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => handleDelete(card._id)}
                    className="text-white/60 hover:text-red-400 transition-colors"
                  >
                    <TrashIcon className="h-5 w-5" />
                  </motion.button>
                </div>
              </AnimatedCard>
            )}
          />
        )}

        {/* Empty State */}
        {!loading && cards.length === 0 && !error && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-12"
          >
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl border border-white/20 p-12">
              <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full mx-auto mb-4 flex items-center justify-center">
                <PlusIcon className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">Aucune carte trouvée</h3>
              <p className="text-white/70 mb-6">
                Commencez par créer votre première carte de visite numérique
              </p>
              <AnimatedButton
                variant="primary"
                size="lg"
                onClick={() => setShowForm(true)}
              >
                Créer ma première carte
              </AnimatedButton>
            </div>
          </motion.div>
        )}
      </div>

      {/* Ultra Modern Card Creator */}
      <UltraModernCardCreator
        isOpen={showForm}
        onClose={() => {
          setShowForm(false);
          setEditingCard(null);
        }}
        onSubmit={editingCard ? 
          (data) => console.log('Update card:', data) : 
          addCard
        }
        initialData={editingCard}
      />

      {/* Chat System */}
      <ChatSystem 
        isOpen={showChat}
        onClose={() => setShowChat(false)}
        selectedUser={null}
      />

      {/* Settings Panel */}
      <SettingsPanel
        isOpen={showSettings}
        onClose={() => setShowSettings(false)}
      />

      {/* Notification System */}
      <NotificationSystem />
    </main>
  );
};

export default Cards;
