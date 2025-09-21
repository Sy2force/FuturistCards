// MyCardsPage - Page de gestion des cartes de l'utilisateur (business/admin)
import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  PlusIcon,
  PencilIcon,
  TrashIcon,
  EyeIcon,
  ChartBarIcon,
  MagnifyingGlassIcon
} from '@heroicons/react/24/outline';
import ButtonGlass from '../components/common/ButtonGlass';
// import { cards as cardsAPI } from '../services/cards'; // Unused - using localStorage instead
import toast from 'react-hot-toast';

const MyCardsPage = () => {
  const [cards, setCards] = useState([]);
  const [filteredCards, setFilteredCards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('newest');
  const [stats, setStats] = useState({
    totalCards: 0,
    totalViews: 0,
    totalLikes: 0,
    thisMonthViews: 0
  });

  const sortOptions = [
    { value: 'newest', label: 'Plus récentes' },
    { value: 'oldest', label: 'Plus anciennes' },
    { value: 'title', label: 'Titre A-Z' },
    { value: 'views', label: 'Plus vues' },
    { value: 'likes', label: 'Plus aimées' }
  ];

  const filterAndSortCards = useCallback(() => {
    let filtered = [...cards];

    // Filtrage par recherche
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(card => 
        card.title?.toLowerCase().includes(term) ||
        card.subtitle?.toLowerCase().includes(term) ||
        card.description?.toLowerCase().includes(term)
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
        case 'views':
          return (b.views || 0) - (a.views || 0);
        case 'likes':
          return (b.likes || 0) - (a.likes || 0);
        default:
          return 0;
      }
    });

    setFilteredCards(filtered);
  }, [cards, searchTerm, sortBy]);

  useEffect(() => {
    loadMyCards();
  }, []);

  useEffect(() => {
    filterAndSortCards();
  }, [filterAndSortCards]);

  const loadMyCards = async () => {
    try {
      setLoading(true);
      
      // Mode mock - charger depuis localStorage
      const userCards = JSON.parse(localStorage.getItem('userCards') || '[]');
      
      // Ajouter des cartes d'exemple si aucune carte
      if (userCards.length === 0) {
        const mockCards = [
          {
            _id: 'mock-1',
            title: 'Développeur Full-Stack',
            subtitle: 'Expert React & Node.js',
            description: 'Spécialisé dans le développement d\'applications web modernes avec React, Node.js et MongoDB.',
            category: 'Technology',
            skills: ['React', 'Node.js', 'MongoDB', 'JavaScript', 'TypeScript'],
            email: 'user@example.com',
            phone: '+33 6 12 34 56 78',
            website: 'https://portfolio.example.com',
            linkedin: 'https://linkedin.com/in/johndoe',
            github: 'https://github.com/johndoe',
            views: 45,
            likes: 12,
            createdAt: new Date().toISOString(),
            userId: 'user-id'
          },
          {
            _id: 'mock-2',
            title: 'Designer UI/UX',
            subtitle: 'Création d\'expériences utilisateur',
            description: 'Designer passionné par la création d\'interfaces modernes et intuitives.',
            category: 'Design',
            skills: ['Figma', 'Adobe XD', 'Photoshop', 'UI Design', 'UX Research'],
            email: 'user@example.com',
            phone: '+33 6 98 76 54 32',
            website: 'https://design-portfolio.example.com',
            behance: 'https://behance.net/designer',
            dribbble: 'https://dribbble.com/designer',
            views: 32,
            likes: 8,
            createdAt: new Date(Date.now() - 86400000).toISOString(),
            userId: 'user-id'
          }
        ];
        
        localStorage.setItem('userCards', JSON.stringify(mockCards));
        setCards(mockCards);
        setFilteredCards(mockCards);
      } else {
        setCards(userCards);
        setFilteredCards(userCards);
      }
      
      // Calculate stats
      const totalViews = userCards.reduce((sum, card) => sum + (card.views || 0), 0);
      const totalLikes = userCards.reduce((sum, card) => sum + (card.likes || 0), 0);
      
      setStats({
        totalCards: userCards.length,
        totalViews,
        totalLikes,
        thisMonthViews: Math.floor(totalViews * 0.3)
      });
      
    } catch (error) {
      toast.error('Erreur lors du chargement de vos cartes');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteCard = async (cardId) => {
    if (!window.confirm('Êtes-vous sûr de vouloir supprimer cette carte ?')) {
      return;
    }

    try {
      // Mode mock - supprimer depuis localStorage
      const userCards = JSON.parse(localStorage.getItem('userCards') || '[]');
      const updatedCards = userCards.filter(card => card._id !== cardId);
      localStorage.setItem('userCards', JSON.stringify(updatedCards));
      
      toast.success('Carte supprimée avec succès');
      loadMyCards();
    } catch (error) {
      toast.error('Erreur lors de la suppression de la carte');
    }
  };

  if (loading) {
    return <div>Loading...</div>;
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
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mb-2">
              Mes cartes
            </h1>
            <p className="text-xl text-gray-700 dark:text-gray-200">
              Gérez vos cartes de visite professionnelles
            </p>
          </div>
          
          <Link to="/create-card">
            <ButtonGlass size="lg" className="group mt-4 lg:mt-0">
              <PlusIcon className="w-5 h-5 mr-2" />
              Créer une carte
            </ButtonGlass>
          </Link>
        </motion.div>

        {/* Statistiques */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
        >
          {[
            {
              label: 'Total cartes',
              value: stats.totalCards,
              icon: PlusIcon,
              color: 'text-blue-400'
            },
            {
              label: 'Vues totales',
              value: stats.totalViews.toLocaleString(),
              icon: EyeIcon,
              color: 'text-green-400'
            },
            {
              label: 'Favoris totaux',
              value: stats.totalLikes.toLocaleString(),
              icon: ChartBarIcon,
              color: 'text-purple-400'
            },
            {
              label: 'Vues ce mois',
              value: stats.thisMonthViews.toLocaleString(),
              icon: ChartBarIcon,
              color: 'text-pink-400'
            }
          ].map((stat) => (
            <div
              key={stat.label}
              className="bg-white/10 dark:bg-white/5 backdrop-blur-sm border border-gray-300 dark:border-white/10 rounded-2xl p-6 hover:bg-gray-200 dark:hover:bg-white/10 transition-all duration-300"
            >
              <div className="flex items-center justify-between mb-2">
                <stat.icon className={`w-8 h-8 ${stat.color}`} />
              </div>
              <div className="text-2xl font-bold text-gray-900 dark:text-white mb-1">{stat.value}</div>
              <div className="text-gray-600 dark:text-gray-400 text-sm">{stat.label}</div>
            </div>
          ))}
        </motion.div>

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
                placeholder="Rechercher dans vos cartes..."
                className="block w-full pl-10 pr-3 py-3 bg-white/10 dark:bg-white/5 border border-gray-300 dark:border-white/10 rounded-lg text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              />
            </div>

            {/* Tri */}
            <div className="relative">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="appearance-none bg-white/10 dark:bg-white/5 border border-gray-300 dark:border-white/10 rounded-lg px-4 py-3 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all pr-10"
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
            <p className="text-gray-600 dark:text-gray-400 text-sm">
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
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredCards.map((card) => (
                <div
                  key={card._id}
                  className="bg-white/10 dark:bg-white/5 backdrop-blur-sm border border-gray-300 dark:border-white/10 rounded-2xl p-6 hover:bg-gray-200 dark:hover:bg-white/10 transition-all duration-300 group"
                >
                  {/* Image de la carte */}
                  {card.image && (
                    <div className="aspect-video bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-lg mb-4 overflow-hidden">
                      <img 
                        src={card.image} 
                        alt={card.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}

                  {/* Contenu de la carte */}
                  <div className="mb-4">
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">{card.title}</h3>
                    <p className="text-blue-600 dark:text-blue-400 mb-2">{card.subtitle}</p>
                    <p className="text-gray-600 dark:text-gray-400 text-sm line-clamp-2">{card.description}</p>
                  </div>

                  {/* Statistiques */}
                  <div className="flex items-center justify-between text-sm text-gray-600 dark:text-gray-400 mb-4">
                    <span className="flex items-center">
                      <EyeIcon className="w-4 h-4 mr-1" />
                      {card.views || 0} vues
                    </span>
                    <span className="flex items-center">
                      <ChartBarIcon className="w-4 h-4 mr-1" />
                      {card.likes || 0} favoris
                    </span>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-2">
                    <Link
                      to={`/cards/${card._id}`}
                      className="flex-1 flex items-center justify-center px-3 py-2 bg-blue-500/20 hover:bg-blue-500/30 text-blue-400 rounded-lg transition-all duration-200"
                    >
                      <EyeIcon className="w-4 h-4 mr-2" />
                      Voir
                    </Link>
                    
                    <Link
                      to={`/edit-card/${card._id}`}
                      className="flex-1 flex items-center justify-center px-3 py-2 bg-purple-500/20 hover:bg-purple-500/30 text-purple-400 rounded-lg transition-all duration-200"
                    >
                      <PencilIcon className="w-4 h-4 mr-2" />
                      Modifier
                    </Link>
                    
                    <button
                      onClick={() => handleDeleteCard(card._id)}
                      className="flex items-center justify-center px-3 py-2 bg-red-500/20 hover:bg-red-500/30 text-red-400 rounded-lg transition-all duration-200"
                    >
                      <TrashIcon className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <div className="bg-white/10 dark:bg-white/5 backdrop-blur-sm border border-gray-300 dark:border-white/10 rounded-2xl p-12 max-w-md mx-auto">
                <PlusIcon className="h-16 w-16 text-gray-500 dark:text-gray-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  {searchTerm ? 'Aucune carte trouvée' : 'Aucune carte créée'}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-6">
                  {searchTerm 
                    ? 'Essayez de modifier votre recherche'
                    : 'Créez votre première carte de visite pour commencer'
                  }
                </p>
                {searchTerm ? (
                  <ButtonGlass
                    onClick={() => setSearchTerm('')}
                  >
                    Effacer la recherche
                  </ButtonGlass>
                ) : (
                  <Link to="/create-card">
                    <ButtonGlass>
                      <PlusIcon className="w-4 h-4 mr-2" />
                      Créer ma première carte
                    </ButtonGlass>
                  </Link>
                )}
              </div>
            </div>
          )}
        </motion.div>

        {/* Conseils pour optimiser les cartes */}
        {cards.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-16"
          >
            <div className="bg-gradient-to-r from-blue-600/20 via-purple-600/20 to-pink-600/20 backdrop-blur-sm border border-gray-300 dark:border-white/10 rounded-3xl p-8">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 text-center">
                Conseils pour optimiser vos cartes
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
                <div>
                  <ChartBarIcon className="w-8 h-8 text-blue-400 mx-auto mb-2" />
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Ajoutez des images</h4>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">Les cartes avec images reçoivent 3x plus de vues</p>
                </div>
                <div>
                  <EyeIcon className="w-8 h-8 text-purple-400 mx-auto mb-2" />
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Descriptions détaillées</h4>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">Décrivez clairement vos services et compétences</p>
                </div>
                <div>
                  <PlusIcon className="w-8 h-8 text-pink-400 mx-auto mb-2" />
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Mettez à jour régulièrement</h4>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">Les cartes récentes apparaissent en premier</p>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default MyCardsPage;
