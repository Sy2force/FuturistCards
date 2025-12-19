import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import SearchBar from '../../components/common/SearchBar';
import { api } from '../../services/api';
import { toast } from 'react-hot-toast';
import Card from '../../components/cards/Card';

const Cards = () => {
  const { user } = useAuth();
  const [cards, setCards] = useState([]);
  const [filteredCards, setFilteredCards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchCards = async () => {
      try {
        setLoading(true);
        const response = await api.getCards();
        
        if (response.success) {
          // Handle nested data structure from API
          const cardsData = response.data?.cards || response.data || [];
          setCards(cardsData);
          setFilteredCards(cardsData);
        } else {
          throw new Error(response.message || 'Erreur lors du chargement des cartes');
        }
      } catch (error) {
        toast.error('Erreur lors du chargement des cartes');
        setCards([]);
      } finally {
        setLoading(false);
      }
    };
    
    fetchCards();
  }, []);

  // Handle search
  const handleSearch = (term) => {
    setSearchTerm(term);
    if (!term) {
      setFilteredCards(cards);
    } else {
      const filtered = cards.filter(card => 
        card.title?.toLowerCase().includes(term.toLowerCase()) ||
        card.description?.toLowerCase().includes(term.toLowerCase()) ||
        card.business?.toLowerCase().includes(term.toLowerCase())
      );
      setFilteredCards(filtered);
    }
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-900 dark:to-gray-800 py-8 px-4">
      <div className="container mx-auto max-w-7xl">
        {/* En-tête */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mb-4">
            Toutes les Cartes
          </h1>
          <p className="text-xl max-w-2xl mx-auto text-gray-600 dark:text-gray-400">
            Découvrez les cartes de visite de notre communauté professionnelle
          </p>
        </div>

        {/* Barre de recherche */}
        <div className="mb-8">
          <SearchBar 
            onSearch={handleSearch}
            placeholder="Rechercher par nom, description ou entreprise..."
            className="max-w-2xl mx-auto"
          />
        </div>

        {/* Statistiques */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 mb-8 shadow-lg">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            {searchTerm ? 
              `${filteredCards.length} cartes trouvées sur ${cards.length} au total` :
              `${cards.length} cartes disponibles`
            }
          </p>
        </div>

        {/* Grille des cartes */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" data-testid="cards-grid">
          {filteredCards.map(card => (
            <Card 
              key={card._id} 
              card={card} 
              showActions={false}
            />
          ))}
        </div>

        {/* Call to action pour les utilisateurs non connectés */}
        {!user && (
          <div className="mt-16 text-center">
            <div className="bg-white dark:bg-gray-800 rounded-3xl p-8 max-w-2xl mx-auto shadow-lg">
              <h3 className="text-2xl font-bold mb-4 text-gray-800 dark:text-gray-200">
                Rejoignez FuturistCards
              </h3>
              <p className="mb-6 text-gray-600 dark:text-gray-400">
                Créez votre compte pour accéder à toutes les fonctionnalités et créer vos propres cartes professionnelles.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/register" className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg transition-colors">
                  S&apos;inscrire
                </Link>
                <Link to="/login" className="bg-gray-500 hover:bg-gray-600 text-white px-6 py-3 rounded-lg transition-colors">
                  Se connecter
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cards;
