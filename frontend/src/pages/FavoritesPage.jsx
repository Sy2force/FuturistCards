// FavoritesPage - Page des cartes favorites de l'utilisateur
import React, { useState, useEffect, useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  HeartIcon,
  MagnifyingGlassIcon,
  TrashIcon,
  EyeIcon
} from '@heroicons/react/24/outline';
import { HeartIcon as HeartSolidIcon } from '@heroicons/react/24/solid';
import { useAuth } from '../context/AuthContext';
import CardFavorite from '../components/cards/CardFavorite';
import LoadingSpinner from '../components/common/LoadingSpinner';
import ButtonGlass from '../components/common/ButtonGlass';
import ContactModal from '../components/ContactModal';
// import * as cardsAPI from '../services/cards'; // Unused - using localStorage instead
import toast from 'react-hot-toast';

const FavoritesPage = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [favoriteCards, setFavoriteCards] = useState([]);
  const [filteredCards, setFilteredCards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('newest');
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);

  const sortOptions = [
    { value: 'newest', label: 'Ajoutés récemment' },
    { value: 'oldest', label: 'Ajoutés en premier' },
    { value: 'title', label: 'Titre A-Z' },
    { value: 'company', label: 'Entreprise A-Z' }
  ];


  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }
    
    loadFavorites();
  }, [user, navigate]);

  const filterAndSortCards = useCallback(() => {
    let filtered = [...favoriteCards];

    // Filtrage par recherche
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(card => 
        card.title?.toLowerCase().includes(term) ||
        card.subtitle?.toLowerCase().includes(term) ||
        card.description?.toLowerCase().includes(term) ||
        card.email?.toLowerCase().includes(term)
      );
    }

    // Tri
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'newest':
          return new Date(b.createdAt) - new Date(a.createdAt);
        case 'oldest':
          return new Date(a.createdAt) - new Date(b.createdAt);
        case 'title':
          return (a.title || '').localeCompare(b.title || '');
        case 'company':
          return (a.subtitle || '').localeCompare(b.subtitle || '');
        default:
          return 0;
      }
    });

    setFilteredCards(filtered);
  }, [favoriteCards, searchTerm, sortBy]);

  useEffect(() => {
    filterAndSortCards();
  }, [filterAndSortCards]);

  const loadFavorites = async () => {
    try {
      setLoading(true);
      
      // Mode mock - charger depuis localStorage
      const favorites = JSON.parse(localStorage.getItem('userFavorites') || '[]');
      
      // Ajouter des favoris d'exemple si aucun favori
      if (favorites.length === 0) {
        const mockFavorites = [
          {
            _id: 'fav-1',
            title: 'Marketing Digital Expert',
            subtitle: 'Stratégie & Growth Hacking',
            description: 'Expert en marketing digital avec 8 ans d\'expérience dans la croissance d\'entreprises tech.',
            category: 'Marketing',
            skills: ['SEO', 'Google Ads', 'Analytics', 'Growth Hacking'],
            email: 'marketing@example.com',
            phone: '+33 6 11 22 33 44',
            website: 'https://marketing-expert.com',
            linkedin: 'https://linkedin.com/in/marketing-expert',
            views: 89,
            likes: 23,
            createdAt: new Date(Date.now() - 172800000).toISOString(),
            addedToFavoritesAt: new Date().toISOString()
          },
          {
            _id: 'fav-2',
            title: 'Architecte Solutions Cloud',
            subtitle: 'AWS & Azure Specialist',
            description: 'Architecte cloud certifié spécialisé dans la migration et l\'optimisation d\'infrastructures.',
            category: 'Technology',
            skills: ['AWS', 'Azure', 'Kubernetes', 'DevOps', 'Terraform'],
            email: 'cloud@example.com',
            phone: '+33 6 55 66 77 88',
            website: 'https://cloud-architect.com',
            github: 'https://github.com/cloud-architect',
            views: 67,
            likes: 18,
            createdAt: new Date(Date.now() - 259200000).toISOString(),
            addedToFavoritesAt: new Date(Date.now() - 86400000).toISOString()
          }
        ];
        
        localStorage.setItem('userFavorites', JSON.stringify(mockFavorites));
        setFavoriteCards(mockFavorites);
        setFilteredCards(mockFavorites);
      } else {
        setFavoriteCards(favorites);
        setFilteredCards(favorites);
      }
      
    } catch (error) {
      toast.error('Erreur lors du chargement de vos favoris');
    } finally {
      setLoading(false);
    }
  };

  const handleToggleFavorite = async (cardId) => {
    try {
      // Mode mock - gérer les favoris localement
      const favorites = JSON.parse(localStorage.getItem('userFavorites') || '[]');
      const updatedFavorites = favorites.filter(id => id !== cardId);
      localStorage.setItem('userFavorites', JSON.stringify(updatedFavorites));
      
      // Optimistic update - retirer de la liste des favoris
      setFavoriteCards(prevCards => 
        prevCards.filter(card => card._id !== cardId)
      );
      
      toast.success('Carte retirée des favoris');
    } catch (error) {
      toast.error('Erreur lors de la mise à jour des favoris');
      
      // Revert optimistic update
      loadFavorites();
    }
  };

  const handleClearAllFavorites = async () => {
    if (!window.confirm('Êtes-vous sûr de vouloir retirer toutes les cartes de vos favoris ?')) {
      return;
    }

    try {
      // Mode mock - vider localStorage
      localStorage.setItem('userFavorites', JSON.stringify([]));
      setFavoriteCards([]);
      setFilteredCards([]);
      toast.success('Tous les favoris ont été supprimés');
    } catch (error) {
      toast.error('Erreur lors de la suppression des favoris');
    }
  };

  const handleContactClick = (card) => {
    setSelectedCard(card);
    setIsContactModalOpen(true);
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="container mx-auto max-w-7xl">
        {/* En-tête */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-8"
        >
          <div>
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-pink-400 to-red-400 bg-clip-text text-transparent mb-2">
              Mes favoris
            </h1>
            <p className="text-xl text-gray-700 dark:text-gray-200">
              Vos cartes de visite préférées en un seul endroit
            </p>
          </div>
          
          {favoriteCards.length > 0 && (
            <div className="flex gap-3 mt-4 lg:mt-0">
              <Link to="/cards">
                <ButtonGlass variant="secondary">
                  Découvrir plus de cartes
                </ButtonGlass>
              </Link>
              <ButtonGlass
                onClick={handleClearAllFavorites}
                variant="danger"
                className="group"
              >
                <TrashIcon className="w-4 h-4 mr-2" />
                Tout supprimer
              </ButtonGlass>
            </div>
          )}
        </motion.div>

        {/* Statistiques */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 mb-8"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="flex items-center justify-center w-12 h-12 bg-pink-500/20 rounded-full">
                <HeartSolidIcon className="w-6 h-6 text-pink-400" />
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-900 dark:text-white">
                  {favoriteCards.length}
                </div>
                <div className="text-gray-600 dark:text-gray-400">
                  Carte{favoriteCards.length !== 1 ? 's' : ''} favorite{favoriteCards.length !== 1 ? 's' : ''}
                </div>
              </div>
            </div>
            
            {favoriteCards.length > 0 && (
              <div className="text-right">
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  Dernière ajoutée
                </div>
                <div className="text-gray-900 dark:text-white">
                  {new Date(Math.max(...favoriteCards.map(card => new Date(card.createdAt)))).toLocaleDateString('fr-FR')}
                </div>
              </div>
            )}
          </div>
        </motion.div>

        {favoriteCards.length > 0 ? (
          <>
            {/* Barre de recherche et filtres */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-white/10 dark:bg-white/5 backdrop-blur-sm border border-gray-300 dark:border-white/10 rounded-2xl p-6 mb-8"
            >
              <div className="flex flex-col lg:flex-row gap-4 items-center">
                {/* Recherche */}
                <div className="flex-1 relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <MagnifyingGlassIcon className="h-5 w-5 text-gray-500 dark:text-gray-400" />
                  </div>
                  <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Rechercher dans vos favoris..."
                    className="block w-full pl-10 pr-3 py-3 bg-white/10 dark:bg-white/5 border border-gray-300 dark:border-white/10 rounded-lg text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all"
                  />
                </div>

                {/* Tri */}
                <div className="relative">
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="appearance-none bg-white/10 dark:bg-white/5 border border-gray-300 dark:border-white/10 rounded-lg px-4 py-3 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all pr-10"
                  >
                    {sortOptions.map(option => (
                      <option key={option.value} value={option.value} className="bg-white dark:bg-gray-800 text-gray-900 dark:text-white">
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Statistiques de recherche */}
              <div className="mt-4 pt-4 border-t border-gray-300 dark:border-white/10">
                <p className="text-gray-400 text-sm">
                  {filteredCards.length} carte{filteredCards.length !== 1 ? 's' : ''} 
                  {searchTerm && ` trouvée${filteredCards.length !== 1 ? 's' : ''} pour "${searchTerm}"`}
                </p>
              </div>
            </motion.div>

            {/* Grille des cartes */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              {filteredCards.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {filteredCards.map((card) => (
                    <CardFavorite
                      key={card._id}
                      card={card}
                      onRemoveFavorite={handleToggleFavorite}
                      onViewCard={(cardId) => navigate(`/cards/${cardId}`)}
                      onContact={() => handleContactClick(card)}
                    />
                  ))}
                </div>
              ) : (
                <div className="text-center py-16">
                  <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-12 max-w-md mx-auto">
                    <MagnifyingGlassIcon className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-xl font-semibold text-white mb-2">
                      Aucune carte trouvée
                    </h3>
                    <p className="text-gray-400 mb-6">
                      Essayez de modifier votre recherche
                    </p>
                    <ButtonGlass
                      onClick={() => setSearchTerm('')}
                    >
                      Effacer la recherche
                    </ButtonGlass>
                  </div>
                </div>
              )}
            </motion.div>
          </>
        ) : (
          /* État vide */
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-center py-16"
          >
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-12 max-w-md mx-auto">
              <HeartIcon className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-white mb-2">
                Aucun favori pour le moment
              </h3>
              <p className="text-gray-400 mb-6">
                Explorez les cartes et ajoutez celles qui vous intéressent à vos favoris
              </p>
              <Link to="/cards">
                <ButtonGlass>
                  <EyeIcon className="w-4 h-4 mr-2" />
                  Découvrir les cartes
                </ButtonGlass>
              </Link>
            </div>
          </motion.div>
        )}

        {/* Conseils */}
        {favoriteCards.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-16"
          >
            <div className="bg-gradient-to-r from-pink-600/20 via-red-600/20 to-orange-600/20 backdrop-blur-sm border border-white/10 rounded-3xl p-8">
              <h3 className="text-2xl font-bold text-white mb-4 text-center">
                💡 Le saviez-vous ?
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-center">
                <div>
                  <HeartIcon className="w-8 h-8 text-pink-400 mx-auto mb-2" />
                  <h4 className="font-semibold text-white mb-2">Favoris synchronisés</h4>
                  <p className="text-gray-400 text-sm">
                    Vos favoris sont sauvegardés et accessibles depuis tous vos appareils
                  </p>
                </div>
                <div>
                  <EyeIcon className="w-8 h-8 text-red-400 mx-auto mb-2" />
                  <h4 className="font-semibold text-white mb-2">Accès rapide</h4>
                  <p className="text-gray-400 text-sm">
                    Retrouvez facilement les cartes qui vous intéressent le plus
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Contact Modal */}
        <ContactModal
          isOpen={isContactModalOpen}
          onClose={() => setIsContactModalOpen(false)}
          card={selectedCard}
        />
      </div>
    </div>
  );
};

export default FavoritesPage;
