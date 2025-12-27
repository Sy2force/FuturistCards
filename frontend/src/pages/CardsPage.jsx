import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useI18n } from '../hooks/useI18n';
import { useTheme } from '../context/ThemeContext';
import { useFavorites } from '../hooks/useFavorites';

const CardsPage = () => {
  const { t, isRTL } = useI18n();
  const { isDark } = useTheme();
  const { favorites, toggleFavorite, loading: favLoading } = useFavorites();
  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  useEffect(() => {
    loadCards();
  }, []);

  const loadCards = async () => {
    try {
      setLoading(true);
      // Mock data for demo
      const mockCards = [
        {
          _id: '1',
          title: 'Jean Dupont',
          subtitle: 'Développeur Full-Stack',
          company: 'TechCorp',
          description: 'Spécialisé en React, Node.js et MongoDB. Passionné par les nouvelles technologies.',
          category: 'technology',
          views: 245,
          likes: 18
        },
        {
          _id: '2',
          title: 'Marie Martin',
          subtitle: 'Designer UX/UI',
          company: 'CreativeStudio',
          description: 'Design d\'expérience utilisateur moderne et interfaces intuitives.',
          category: 'design',
          views: 189,
          likes: 32
        },
        {
          _id: '3',
          title: 'Pierre Durand',
          subtitle: 'Chef de Projet',
          company: 'BusinessPro',
          description: 'Gestion de projets digitaux et transformation numérique.',
          category: 'business',
          views: 156,
          likes: 12
        }
      ];
      setCards(mockCards);
    } catch (error) {
      // Error handled
    } finally {
      setLoading(false);
    }
  };

  const filteredCards = cards.filter(card => {
    const matchesSearch = card.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         card.subtitle?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         card.company?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || card.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const categories = [
    { value: 'all', label: 'Toutes' },
    { value: 'technology', label: 'Technologie' },
    { value: 'design', label: 'Design' },
    { value: 'marketing', label: 'Marketing' },
    { value: 'business', label: 'Business' },
    { value: 'finance', label: 'Finance' },
    { value: 'medical', label: 'Médical' },
    { value: 'education', label: 'Éducation' },
    { value: 'legal', label: 'Juridique' }
  ];

  const handleFavoriteToggle = async (cardId) => {
    await toggleFavorite(cardId);
  };

  const isFavorite = (cardId) => {
    return favorites.some(fav => fav._id === cardId || fav.cardId === cardId);
  };

  return (
    <div className={`min-h-screen pt-24 pb-12 ${isDark ? 'bg-gray-900' : 'bg-gray-50'}`} data-testid="cards-page" dir={isRTL ? 'rtl' : 'ltr'}>
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className={`text-4xl font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
            Cartes de Visite
          </h1>
          <p className={`text-xl ${isDark ? 'text-gray-300' : 'text-gray-600'} max-w-2xl mx-auto`}>
            Découvrez les cartes de visite numériques de notre communauté
          </p>
        </div>

        {/* Search and Filters */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            {/* Search Bar */}
            <div className="relative flex-1 max-w-md">
              <div className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400">🔍</div>
              <input
                type="text"
                placeholder="Rechercher des cartes..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className={`w-full pl-10 pr-4 py-3 rounded-lg border ${
                  isDark 
                    ? 'bg-gray-800 border-gray-700 text-white placeholder-gray-400' 
                    : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                } focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                data-testid="cards-search"
              />
            </div>

            {/* Category Filter */}
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className={`px-4 py-3 rounded-lg border ${
                isDark 
                  ? 'bg-gray-800 border-gray-700 text-white' 
                  : 'bg-white border-gray-300 text-gray-900'
              } focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
              data-testid="cards-category-filter"
            >
              {categories.map(category => (
                <option key={category.value} value={category.value}>
                  {category.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
          </div>
        )}

        {/* Cards Grid */}
        {!loading && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6" data-testid="cards-grid">
            {filteredCards.map((card) => (
              <div
                key={card._id}
                className={`relative group ${
                  isDark ? 'bg-gray-800' : 'bg-white'
                } rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden`}
                data-testid={`card-${card._id}`}
              >
                {/* Card Content */}
                <Link to={`/cards/${card._id}`} className="block p-6">
                  {/* Avatar */}
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-lg">
                      {card.title?.charAt(0) || 'U'}
                    </div>
                    <div className="ml-3 flex-1">
                      <h3 className={`font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                        {card.title}
                      </h3>
                      <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                        {card.subtitle}
                      </p>
                    </div>
                  </div>

                  {/* Company */}
                  {card.company && (
                    <p className={`text-sm font-medium mb-2 ${isDark ? 'text-blue-400' : 'text-blue-600'}`}>
                      {card.company}
                    </p>
                  )}

                  {/* Description */}
                  {card.description && (
                    <p className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-600'} line-clamp-2 mb-4`}>
                      {card.description}
                    </p>
                  )}

                  {/* Category Badge */}
                  {card.category && (
                    <span className={`inline-block px-2 py-1 text-xs font-medium rounded-full ${
                      isDark ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-700'
                    }`}>
                      {categories.find(cat => cat.value === card.category)?.label || card.category}
                    </span>
                  )}
                </Link>

                {/* Action Buttons */}
                <div className="absolute top-4 right-4 flex space-x-2">
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      handleFavoriteToggle(card._id);
                    }}
                    disabled={favLoading}
                    className={`p-2 rounded-full transition-all duration-200 ${
                      isFavorite(card._id)
                        ? 'bg-red-500 text-white hover:bg-red-600'
                        : `${isDark ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`
                    }`}
                    data-testid={`favorite-btn-${card._id}`}
                  >
                    {isFavorite(card._id) ? '❤️' : '🤍'}
                  </button>
                </div>

                {/* Stats */}
                <div className={`px-6 pb-4 flex items-center justify-between text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                  <div className="flex items-center">
                    <span className="mr-1">👁️</span>
                    <span>{card.views || 0}</span>
                  </div>
                  <div className="flex items-center">
                    <span className="mr-1">❤️</span>
                    <span>{card.likes || 0}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Empty State */}
        {!loading && filteredCards.length === 0 && (
          <div className="text-center py-12">
            <div className={`text-6xl mb-4 ${isDark ? 'text-gray-600' : 'text-gray-400'}`}>
              🔍
            </div>
            <h3 className={`text-xl font-semibold mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
              Aucun résultat
            </h3>
            <p className={`${isDark ? 'text-gray-400' : 'text-gray-600'} mb-6`}>
              {searchTerm ? 'Aucune carte ne correspond à votre recherche' : 'Aucune carte disponible'}
            </p>
            {searchTerm && (
              <button
                onClick={() => {
                  setSearchTerm('');
                  setSelectedCategory('all');
                }}
                className="btn-primary"
              >
                Effacer les filtres
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default CardsPage;
