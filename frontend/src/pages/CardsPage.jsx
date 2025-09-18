import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  MagnifyingGlassIcon,
  HeartIcon,
  EyeIcon,
  PlusIcon,
  PencilIcon,
  TrashIcon,
  Squares2X2Icon,
  ListBulletIcon
} from '@heroicons/react/24/outline';
import { HeartIcon as HeartSolidIcon } from '@heroicons/react/24/solid';
import { useAuth } from '../context/AuthContext';
import { cardService } from '../api/cardService';
import toast from 'react-hot-toast';

const CardsPage = () => {
  const { user } = useAuth();
  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [viewMode, setViewMode] = useState('grid');
  // const [showFilters, setShowFilters] = useState(false);

  const categories = [
    { value: 'all', label: 'Toutes les catégories' },
    { value: 'technology', label: 'Technologie' },
    { value: 'business', label: 'Business' },
    { value: 'creative', label: 'Créatif' },
    { value: 'healthcare', label: 'Santé' },
    { value: 'education', label: 'Éducation' },
    { value: 'other', label: 'Autre' }
  ];

  useEffect(() => {
    fetchCards();
  }, []);

  const fetchCards = async () => {
    try {
      setLoading(true);
      const response = await cardService.getAllCards();
      setCards(response.data || []);
    } catch (error) {
      console.error('Error fetching cards:', error);
      toast.error('Erreur lors du chargement des cartes');
    } finally {
      setLoading(false);
    }
  };

  const handleLike = async (cardId) => {
    try {
      await cardService.toggleLike(cardId);
      setCards(cards.map(card => 
        card._id === cardId 
          ? { ...card, likes: card.isLiked ? card.likes - 1 : card.likes + 1, isLiked: !card.isLiked }
          : card
      ));
      toast.success('Favori mis à jour');
    } catch (error) {
      console.error('Error toggling like:', error);
      toast.error('Erreur lors de la mise à jour');
    }
  };

  const handleDelete = async (cardId) => {
    if (!window.confirm('Êtes-vous sûr de vouloir supprimer cette carte ?')) return;
    
    try {
      await cardService.deleteCard(cardId);
      setCards(cards.filter(card => card._id !== cardId));
      toast.success('Carte supprimée avec succès');
    } catch (error) {
      console.error('Error deleting card:', error);
      toast.error('Erreur lors de la suppression');
    }
  };

  const filteredCards = cards.filter(card => {
    const matchesSearch = card.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         card.subtitle?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         card.description?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || card.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const CardItem = ({ card }) => (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      whileHover={{ y: -5 }}
      className="card-glass hover-lift group cursor-pointer"
    >
      {/* Card Image */}
      <div className="relative h-48 mb-4 rounded-xl overflow-hidden">
        <img
          src={card.image?.url || 'https://via.placeholder.com/400x300?text=No+Image'}
          alt={card.image?.alt || card.title}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
        
        {/* Action Buttons */}
        <div className="absolute top-3 right-3 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleLike(card._id);
            }}
            className="p-2 bg-white/20 backdrop-blur-sm rounded-full hover:bg-white/30 transition-colors"
          >
            {card.isLiked ? (
              <HeartSolidIcon className="w-5 h-5 text-red-500" />
            ) : (
              <HeartIcon className="w-5 h-5 text-white" />
            )}
          </button>
          
          {user && card.user === user._id && (
            <>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  // Navigate to edit page
                }}
                className="p-2 bg-white/20 backdrop-blur-sm rounded-full hover:bg-white/30 transition-colors"
              >
                <PencilIcon className="h-4 w-4" />
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleDelete(card._id);
                }}
                className="p-2 bg-red-500/20 backdrop-blur-sm rounded-full hover:bg-red-500/30 transition-colors"
              >
                <TrashIcon className="h-4 w-4" />
              </button>
            </>
          )}
        </div>

        {/* Category Badge */}
        <div className="absolute bottom-3 left-3">
          <span className="px-3 py-1 bg-blue-500/30 backdrop-blur-sm rounded-full text-xs text-white font-medium">
            {categories.find(cat => cat.value === card.category)?.label || 'Autre'}
          </span>
        </div>
      </div>

      {/* Card Content */}
      <div className="space-y-3">
        <div>
          <h3 className="text-xl font-bold text-white mb-1 line-clamp-1">
            {card.title}
          </h3>
          <p className="text-blue-300 text-sm font-medium">
            {card.subtitle}
          </p>
        </div>

        <p className="text-white/70 text-sm line-clamp-2">
          {card.description}
        </p>

        {/* Contact Info */}
        <div className="space-y-2">
          {card.email && (
            <p className="text-white/60 text-sm flex items-center gap-2">
              <span>📧</span> {card.email}
            </p>
          )}
          {card.phone && (
            <p className="text-white/60 text-sm flex items-center gap-2">
              <span>📱</span> {card.phone}
            </p>
          )}
          {card.website && (
            <p className="text-white/60 text-sm flex items-center gap-2">
              <span>🌐</span> {card.website}
            </p>
          )}
        </div>

        {/* Stats */}
        <div className="flex items-center justify-between pt-3 border-t border-white/10">
          <div className="flex items-center gap-4 text-sm text-white/60">
            <span className="flex items-center gap-1">
              <HeartIcon className="w-4 h-4" />
              {card.likes || 0}
            </span>
            <span className="flex items-center gap-1">
              <EyeIcon className="w-4 h-4" />
              {card.views || 0}
            </span>
          </div>
          <span className="text-xs text-white/40">
            {new Date(card.createdAt).toLocaleDateString('fr-FR')}
          </span>
        </div>
      </div>
    </motion.div>
  );

  const ListView = ({ cards }) => (
    <div className="space-y-4">
      {cards.map(card => (
        <motion.div
          key={card._id}
          layout
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          className="card-glass p-6 hover-lift group cursor-pointer"
        >
          <div className="flex gap-6">
            {/* Image */}
            <div className="w-32 h-24 rounded-lg overflow-hidden flex-shrink-0">
              <img
                src={card.image?.url || 'https://via.placeholder.com/200x150?text=No+Image'}
                alt={card.image?.alt || card.title}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Content */}
            <div className="flex-1 space-y-2">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-lg font-bold text-white">{card.title}</h3>
                  <p className="text-blue-300 text-sm">{card.subtitle}</p>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleLike(card._id);
                    }}
                    className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                  >
                    {card.isLiked ? (
                      <HeartSolidIcon className="w-5 h-5 text-red-500" />
                    ) : (
                      <HeartIcon className="w-5 h-5 text-white/60" />
                    )}
                  </button>
                </div>
              </div>

              <p className="text-white/70 text-sm line-clamp-2">{card.description}</p>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4 text-sm text-white/60">
                  <span>{card.email}</span>
                  <span>{card.phone}</span>
                </div>
                <div className="flex items-center gap-4 text-sm text-white/60">
                  <span className="flex items-center gap-1">
                    <HeartIcon className="w-4 h-4" />
                    {card.likes || 0}
                  </span>
                  <span className="flex items-center gap-1">
                    <EyeIcon className="w-4 h-4" />
                    {card.views || 0}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="spinner"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-8"
          >
            <h1 className="text-4xl font-bold gradient-text mb-4">
              Cartes de Visite
            </h1>
            <p className="text-white/70 text-lg max-w-2xl mx-auto">
              Découvrez et explorez les cartes de visite numériques de notre communauté
            </p>
          </motion.div>

          {/* Search and Filters */}
          <div className="glass-card p-6 mb-6">
            <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
              {/* Search */}
              <div className="relative flex-1 max-w-md">
                <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-white/40" />
                <input
                  type="text"
                  placeholder="Rechercher des cartes..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="form-input pl-10"
                />
              </div>

              {/* Controls */}
              <div className="flex items-center gap-4">
                {/* Category Filter */}
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="form-input min-w-[200px]"
                >
                  {categories.map(category => (
                    <option key={category.value} value={category.value}>
                      {category.label}
                    </option>
                  ))}
                </select>

                {/* View Mode Toggle */}
                <div className="flex bg-white/5 rounded-lg p-1">
                  <button
                    onClick={() => setViewMode('grid')}
                    className={`p-2 rounded-md transition-colors ${
                      viewMode === 'grid' 
                        ? 'bg-blue-500/30 text-white' 
                        : 'text-white/60 hover:text-white'
                    }`}
                  >
                    <Squares2X2Icon className="h-5 w-5" />
                  </button>
                  <button
                    onClick={() => setViewMode('list')}
                    className={`p-2 rounded-md transition-colors ${
                      viewMode === 'list' 
                        ? 'bg-blue-500/30 text-white' 
                        : 'text-white/60 hover:text-white'
                    }`}
                  >
                    <ListBulletIcon className="h-5 w-5" />
                  </button>
                </div>

                {/* Add Card Button */}
                {user && (
                  <button className="btn-glass btn-primary flex items-center gap-2">
                    <PlusIcon className="w-5 h-5" />
                    Nouvelle Carte
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-6">
          <p className="text-white/60">
            {filteredCards.length} carte{filteredCards.length !== 1 ? 's' : ''} trouvée{filteredCards.length !== 1 ? 's' : ''}
          </p>
        </div>

        {/* Cards Grid/List */}
        <AnimatePresence mode="wait">
          {filteredCards.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-center py-12"
            >
              <div className="glass-card p-12">
                <div className="w-24 h-24 mx-auto mb-6 bg-white/5 rounded-full flex items-center justify-center">
                  <MagnifyingGlassIcon className="w-12 h-12 text-white/40" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">
                  Aucune carte trouvée
                </h3>
                <p className="text-white/60 mb-6">
                  Essayez de modifier vos critères de recherche ou créez votre première carte.
                </p>
                {user && (
                  <button className="btn-glass btn-primary">
                    Créer ma première carte
                  </button>
                )}
              </div>
            </motion.div>
          ) : viewMode === 'grid' ? (
            <motion.div
              key="grid"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
            >
              <AnimatePresence>
                {filteredCards.map(card => (
                  <CardItem key={card._id} card={card} />
                ))}
              </AnimatePresence>
            </motion.div>
          ) : (
            <motion.div
              key="list"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <ListView cards={filteredCards} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default CardsPage;
