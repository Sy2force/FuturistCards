import { useState, useEffect, useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { api } from '../../services/api';

const MyCardsPage = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchMyCards = useCallback(async () => {
    try {
      setLoading(true);
      const response = await api.get('/cards/my-cards');
      setCards(response.data.cards || []);
    } catch (error) {
      setError('Erreur lors du chargement des cartes');
      // Mock data for development
      const mockCards = [
        {
          _id: '1',
          title: 'Ma Carte',
          subtitle: 'Développeur',
          description: 'Description de ma carte',
          email: user?.email || 'test@example.com'
        }
      ];
      setCards(mockCards);
    } finally {
      setLoading(false);
    }
  }, [user?.email]);

  const handleDeleteCard = async (cardId) => {
    try {
      await api.delete(`/cards/${cardId}`);
      setCards(cards.filter(card => card._id !== cardId));
      alert('Carte supprimée avec succès');
    } catch (error) {
      alert('Erreur lors de la suppression');
    }
  };

  useEffect(() => {
    fetchMyCards();
  }, [fetchMyCards]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-gray-700 dark:text-gray-300">Chargement de vos cartes...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Mes Cartes
            </h1>
            <p className="text-gray-600 dark:text-gray-300 mb-8">
              Gérez vos cartes de visite professionnelles
            </p>
            
            <Link
              to="/cards/create"
              className="inline-flex items-center bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
            >
              <span className="mr-2">➕</span>
              Créer une nouvelle carte
            </Link>
          </div>

          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
              {error}
            </div>
          )}

          {cards.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">📋</div>
              <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                Aucune carte créée
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                Créez votre première carte de visite
              </p>
              <Link
                to="/cards/create"
                className="inline-flex items-center bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
              >
                <span className="mr-2">➕</span>
                Créer ma première carte
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {cards.map((card) => (
                <div
                  key={card._id}
                  className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg"
                >
                  <div className="text-center">
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                      {card.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 mb-3">
                      {card.subtitle}
                    </p>
                    <p className="text-gray-500 dark:text-gray-400 mb-4">
                      {card.description}
                    </p>
                    <div className="flex justify-center space-x-2">
                      <button
                        onClick={() => navigate(`/cards/edit/${card._id}`)}
                        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors"
                      >
                        Modifier
                      </button>
                      <button
                        onClick={() => handleDeleteCard(card._id)}
                        className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition-colors"
                      >
                        Supprimer
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
  );
};

export default MyCardsPage;
