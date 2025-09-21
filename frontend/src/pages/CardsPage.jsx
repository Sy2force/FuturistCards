// CardsPage - Page d'affichage de toutes les cartes avec recherche et filtres
// Version corrigée : résout filterAndSortCards, dark mode, images 404, hot reload
import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { motion } from 'framer-motion';
import { 
  MagnifyingGlassIcon,
  FunnelIcon,
  ViewColumnsIcon,
  Squares2X2Icon
} from '@heroicons/react/24/outline';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import { useLanguage } from '../context/LanguageContext';
import CardGrid from '../components/cards/CardGrid';
import ButtonGlass from '../components/common/ButtonGlass';
import LoadingSpinner from '../components/common/LoadingSpinner';
import toast from 'react-hot-toast';

const CardsPage = () => {
  const { user } = useAuth();
  const { isDark } = useTheme();
  const { t } = useLanguage();
  
  // États
  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [viewMode, setViewMode] = useState('grid');
  const [sortBy, setSortBy] = useState('newest');

  // Catégories disponibles
  const categories = [
    { value: 'all', label: t('allCategories') || 'Toutes les catégories' },
    { value: 'technology', label: 'Technologie' },
    { value: 'business', label: 'Business' },
    { value: 'creative', label: 'Créatif' },
    { value: 'healthcare', label: 'Santé' },
    { value: 'education', label: 'Éducation' },
    { value: 'other', label: 'Autre' }
  ];

  const sortOptions = [
    { value: 'newest', label: t('newest') || 'Plus récent' },
    { value: 'oldest', label: t('oldest') || 'Plus ancien' },
    { value: 'name', label: t('nameAZ') || 'Nom A-Z' },
    { value: 'company', label: t('companyAZ') || 'Entreprise A-Z' }
  ];

  // Image fallback pour éviter les 404 Unsplash
  const getImageWithFallback = (originalUrl, fallbackUrl = '/api/placeholder/150/150') => {
    return originalUrl || fallbackUrl;
  };

  // Fonction de chargement des cartes avec gestion d'erreur
  const loadCards = useCallback(async () => {
    try {
      setLoading(true);
      
      // Mode mock - charger depuis localStorage avec données d'exemple
      const userCards = JSON.parse(localStorage.getItem('userCards') || '[]');
      
      // Cartes d'exemple avec images sécurisées
      const mockCards = [
        {
          _id: 'mock-card-1',
          userId: 'mock-user-1',
          title: 'Jean Dupont',
          subtitle: 'Développeur Full-Stack',
          description: 'Expert en développement web moderne avec React, Node.js et MongoDB.',
          email: 'jean.dupont@example.com',
          phone: '+33 6 12 34 56 78',
          website: 'https://jeandupont.dev',
          category: 'technology',
          skills: ['React', 'Node.js', 'MongoDB'],
          createdAt: new Date().toISOString(),
          views: 45,
          likes: 12,
          image: getImageWithFallback('https://picsum.photos/150/150?random=1')
        },
        {
          _id: 'mock-card-2',
          userId: 'mock-user-2',
          title: 'Marie Martin',
          subtitle: 'Designer UX/UI',
          description: 'Créatrice d\'expériences utilisateur exceptionnelles. Spécialisée en design mobile.',
          email: 'marie.martin@example.com',
          phone: '+33 6 98 76 54 32',
          website: 'https://mariemartin.design',
          category: 'creative',
          skills: ['Figma', 'Adobe XD', 'Sketch'],
          createdAt: new Date(Date.now() - 86400000 * 3).toISOString(),
          views: 32,
          likes: 8,
          image: getImageWithFallback('https://picsum.photos/150/150?random=2')
        }
      ];
      
      // Sauvegarder les cartes d'exemple dans localStorage pour CardDetailsPage
      localStorage.setItem('mockCards', JSON.stringify(mockCards));
      
      // Combiner les cartes utilisateur et les cartes d'exemple
      const allCards = [...userCards, ...mockCards];
      setCards(allCards);
      
    } catch (error) {
      toast.error('Erreur lors du chargement des cartes');
      setCards([]); // Fallback sécurisé
    } finally {
      setLoading(false);
    }
  }, []);

  // CORRECTION CRITIQUE : useMemo pour filtrer et trier (évite l'erreur filterAndSortCards)
  const filteredAndSortedCards = useMemo(() => {
    if (!cards || cards.length === 0) return [];
    
    let filtered = [...cards];

    // Filtrage par recherche
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(card => 
        card.title?.toLowerCase().includes(term) ||
        card.subtitle?.toLowerCase().includes(term) ||
        card.description?.toLowerCase().includes(term) ||
        card.email?.toLowerCase().includes(term) ||
        card.phone?.toLowerCase().includes(term)
      );
    }

    // Filtrage par catégorie
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(card => 
        card.category === selectedCategory
      );
    }

    // Tri sécurisé
    filtered.sort((a, b) => {
      try {
        switch (sortBy) {
          case 'newest':
            return new Date(b.createdAt || 0) - new Date(a.createdAt || 0);
          case 'oldest':
            return new Date(a.createdAt || 0) - new Date(b.createdAt || 0);
          case 'name':
            return (a.title || '').localeCompare(b.title || '');
          case 'company':
            return (a.subtitle || '').localeCompare(b.subtitle || '');
          default:
            return 0;
        }
      } catch (error) {
        return 0;
      }
    });

    return filtered;
  }, [cards, searchTerm, selectedCategory, sortBy]);

  // Chargement initial
  useEffect(() => {
    loadCards();
  }, [loadCards]);

  const handleToggleFavorite = async (cardId) => {
    if (!user) {
      toast.error('Vous devez être connecté pour ajouter aux favoris');
      return;
    }

    try {
      // Mode mock - gestion des favoris avec localStorage
      const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
      const existingFavorite = favorites.find(fav => fav.cardId === cardId && fav.userId === user.id);
      
      if (existingFavorite) {
        // Supprimer des favoris
        const updatedFavorites = favorites.filter(fav => !(fav.cardId === cardId && fav.userId === user.id));
        localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
        toast.success('Retiré des favoris');
      } else {
        // Ajouter aux favoris
        const newFavorite = {
          cardId: cardId,
          userId: user.id,
          addedAt: new Date().toISOString()
        };
        favorites.push(newFavorite);
        localStorage.setItem('favorites', JSON.stringify(favorites));
        toast.success('Ajouté aux favoris');
      }

      // Mise à jour de l'état local
      setCards(prevCards => 
        prevCards.map(card => 
          card._id === cardId 
            ? { ...card, isLiked: !existingFavorite }
            : card
        )
      );
      
    } catch (error) {
      toast.error('Erreur lors de la mise à jour des favoris');
    }
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <div className={`min-h-screen py-8 px-4 transition-colors duration-300 ${
      isDark ? 'bg-[#131B2D] text-[#E5E7EB]' : 'bg-[#f5f5f5] text-gray-900'
    }`}>
      <div className="container mx-auto max-w-7xl">
        {/* En-tête */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mb-4">
            {t('allCards')}
          </h1>
          <p className={`text-xl max-w-2xl mx-auto ${
            isDark ? 'text-[#E5E7EB]' : 'text-gray-600'
          }`}>
            Découvrez les cartes de visite de notre communauté de professionnels
          </p>
        </motion.div>

        {/* Barre de recherche et filtres */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className={`backdrop-blur-sm rounded-2xl p-6 mb-8 ${
            isDark 
              ? 'bg-white/5 border border-white/10' 
              : 'bg-white/10 border border-gray-300'
          }`}
        >
          <div className="flex flex-col lg:flex-row gap-4 items-center">
            {/* Recherche */}
            <div className="flex-1 relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <MagnifyingGlassIcon className={`h-5 w-5 ${
                  isDark ? 'text-gray-400' : 'text-gray-500'
                }`} />
              </div>
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder={t('searchPlaceholder')}
                className={`block w-full pl-10 pr-3 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all ${
                  isDark 
                    ? 'bg-white/5 border border-white/10 text-[#E5E7EB] placeholder-gray-400' 
                    : 'bg-white/10 border border-gray-300 text-gray-900 placeholder-gray-500'
                }`}
              />
            </div>

            {/* Filtres */}
            <div className="flex flex-wrap gap-4 items-center">
              {/* Catégorie */}
              <div className="relative">
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className={`appearance-none rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all pr-10 ${
                    isDark 
                      ? 'bg-white/5 border border-white/10 text-[#E5E7EB]' 
                      : 'bg-white/10 border border-gray-300 text-gray-900'
                  }`}
                >
                  {categories.map(category => (
                    <option key={category.value} value={category.value} className={`${
                      isDark ? 'bg-gray-800 text-[#E5E7EB]' : 'bg-white text-gray-900'
                    }`}>
                      {category.label}
                    </option>
                  ))}
                </select>
                <FunnelIcon className={`absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 pointer-events-none ${
                  isDark ? 'text-gray-400' : 'text-gray-500'
                }`} />
              </div>

              {/* Tri */}
              <div className="relative">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className={`appearance-none rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all pr-10 ${
                    isDark 
                      ? 'bg-white/5 border border-white/10 text-[#E5E7EB]' 
                      : 'bg-white/10 border border-gray-300 text-gray-900'
                  }`}
                >
                  {sortOptions.map(option => (
                    <option key={option.value} value={option.value} className={`${
                      isDark ? 'bg-gray-800 text-[#E5E7EB]' : 'bg-white text-gray-900'
                    }`}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Mode d'affichage */}
              <div className={`flex rounded-lg p-1 ${
                isDark 
                  ? 'bg-white/5 border border-white/10' 
                  : 'bg-white/10 border border-gray-300'
              }`}>
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 rounded transition-all ${
                    viewMode === 'grid' 
                      ? 'bg-blue-500 text-white' 
                      : isDark 
                        ? 'text-gray-400 hover:text-[#E5E7EB]' 
                        : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  <Squares2X2Icon className="h-5 w-5" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 rounded transition-all ${
                    viewMode === 'list' 
                      ? 'bg-blue-500 text-white' 
                      : isDark 
                        ? 'text-gray-400 hover:text-[#E5E7EB]' 
                        : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  <ViewColumnsIcon className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>

          {/* Statistiques */}
          <div className={`mt-4 pt-4 border-t ${
            isDark ? 'border-white/10' : 'border-gray-300'
          }`}>
            <p className={`text-sm ${
              isDark ? 'text-gray-400' : 'text-gray-600'
            }`}>
              {filteredAndSortedCards.length} carte{filteredAndSortedCards.length !== 1 ? 's' : ''} trouvée{filteredAndSortedCards.length !== 1 ? 's' : ''} 
              {searchTerm && ` pour "${searchTerm}"`}
              {selectedCategory !== 'all' && ` dans ${categories.find(c => c.value === selectedCategory)?.label}`}
            </p>
          </div>
        </motion.div>

        {/* Grille des cartes */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {filteredAndSortedCards.length > 0 ? (
            <CardGrid
              cards={filteredAndSortedCards}
              onToggleFavorite={handleToggleFavorite}
              viewMode={viewMode}
              showActions={!!user}
            />
          ) : (
            <div className="text-center py-16">
              <div className={`backdrop-blur-sm rounded-2xl p-12 max-w-md mx-auto ${
                isDark 
                  ? 'bg-white/5 border border-white/10' 
                  : 'bg-white/10 border border-gray-300'
              }`}>
                <MagnifyingGlassIcon className={`h-16 w-16 mx-auto mb-4 ${
                  isDark ? 'text-gray-400' : 'text-gray-500'
                }`} />
                <h3 className={`text-xl font-semibold mb-2 ${
                  isDark ? 'text-[#E5E7EB]' : 'text-gray-900'
                }`}>
                  Aucune carte trouvée
                </h3>
                <p className={`mb-6 ${
                  isDark ? 'text-gray-400' : 'text-gray-600'
                }`}>
                  {searchTerm || selectedCategory !== 'all' 
                    ? 'Essayez de modifier vos critères de recherche'
                    : 'Il n\'y a pas encore de cartes disponibles'
                  }
                </p>
                {(searchTerm || selectedCategory !== 'all') && (
                  <ButtonGlass
                    onClick={() => {
                      setSearchTerm('');
                      setSelectedCategory('all');
                    }}
                  >
                    Réinitialiser les filtres
                  </ButtonGlass>
                )}
              </div>
            </div>
          )}
        </motion.div>

        {/* Call to action pour les utilisateurs non connectés */}
        {!user && filteredAndSortedCards.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-16 text-center"
          >
            <div className={`backdrop-blur-sm rounded-3xl p-8 max-w-2xl mx-auto ${
              isDark 
                ? 'bg-gradient-to-r from-blue-600/20 via-purple-600/20 to-pink-600/20 border border-white/10' 
                : 'bg-gradient-to-r from-blue-600/10 via-purple-600/10 to-pink-600/10 border border-gray-300'
            }`}>
              <h3 className={`text-2xl font-bold mb-4 ${
                isDark ? 'text-[#E5E7EB]' : 'text-gray-900'
              }`}>
                Rejoignez la communauté
              </h3>
              <p className={`mb-6 ${
                isDark ? 'text-gray-300' : 'text-gray-600'
              }`}>
                Créez votre compte pour ajouter des cartes aux favoris et créer vos propres cartes de visite
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <ButtonGlass href="/register" size="lg">
                  Créer un compte
                </ButtonGlass>
                <ButtonGlass href="/login" variant="secondary" size="lg">
                  Se connecter
                </ButtonGlass>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default CardsPage;
