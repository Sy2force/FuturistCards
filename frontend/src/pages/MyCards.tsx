import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import api from '../api/api';

interface Card {
  _id: string;
  title: string;
  subtitle: string;
  description: string;
  phone: string;
  email: string;
  web: string;
  image: {
    url: string;
    alt: string;
  };
  address: {
    state: string;
    country: string;
    city: string;
    street: string;
    houseNumber: number;
    zip: number;
  };
  bizNumber: number;
  likes: string[];
  user_id: string;
  createdAt: string;
}

const MyCards: React.FC = () => {
  const { user } = useAuth();
  const [cards, setCards] = useState<Card[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMyCards = async () => {
      try {
        setLoading(true);
        const response = await api.get('/cards/my-cards');
        setCards(response.data.cards || []);
      } catch (error: any) {
        setError('Erreur lors du chargement de vos cartes');
        console.error('Error fetching my cards:', error);
      } finally {
        setLoading(false);
      }
    };

    if (user) {
      fetchMyCards();
    }
  }, [user]);

  const handleDeleteCard = async (cardId: string) => {
    if (!window.confirm('Êtes-vous sûr de vouloir supprimer cette carte ?')) {
      return;
    }

    try {
      await api.delete(`/cards/${cardId}`);
      setCards(cards.filter(card => card._id !== cardId));
    } catch (error) {
      setError('Erreur lors de la suppression de la carte');
      console.error('Error deleting card:', error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center" data-testid="my-cards-loading">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-8" data-testid="my-cards-page">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4" data-testid="my-cards-title">
            Mes Cartes de Visite
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Gérez vos cartes de visite professionnelles
          </p>
          {user && (
            <div className="mt-4">
              <span 
                className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                  (user as any).role === 'admin' ? 'bg-red-100 text-red-800' :
                  (user as any).role === 'business' ? 'bg-purple-100 text-purple-800' : 
                  'bg-blue-100 text-blue-800'
                }`}
                data-testid="user-badge"
              >
                {(user as any).role === 'admin' ? 'Admin' : 
                 (user as any).role === 'business' ? 'Business' : 'User'}
              </span>
            </div>
          )}
        </div>

        {/* Create Card Button */}
        <div className="text-center mb-8">
          <Link
            to="/cards/create"
            className="inline-flex items-center px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg shadow-md transition-colors duration-200"
            data-testid="create-card-button"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Créer une nouvelle carte
          </Link>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-8 p-4 bg-red-50 border border-red-200 rounded-lg" data-testid="error-message">
            <p className="text-red-600 text-center">{error}</p>
          </div>
        )}

        {/* Cards Grid */}
        {cards.length === 0 ? (
          <div className="text-center py-12" data-testid="no-cards-message">
            <div className="max-w-md mx-auto">
              <svg className="mx-auto h-12 w-12 text-gray-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
              </svg>
              <h3 className="text-lg font-medium text-gray-900 mb-2">Aucune carte trouvée</h3>
              <p className="text-gray-500 mb-4">Vous n'avez pas encore créé de cartes de visite.</p>
              <Link
                to="/cards/create"
                className="inline-flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-md transition-colors duration-200"
              >
                Créer ma première carte
              </Link>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" data-testid="cards-grid">
            {cards.map((card) => (
              <div key={card._id} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300" data-testid={`card-${card._id}`}>
                {/* Card Image */}
                <div className="h-48 bg-gradient-to-r from-blue-500 to-purple-600 relative">
                  {card.image?.url ? (
                    <img
                      src={card.image.url}
                      alt={card.image.alt || card.title}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="flex items-center justify-center h-full">
                      <div className="text-white text-center">
                        <svg className="w-12 h-12 mx-auto mb-2" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
                        </svg>
                        <p className="text-sm">Image par défaut</p>
                      </div>
                    </div>
                  )}
                </div>

                {/* Card Content */}
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{card.title}</h3>
                  <p className="text-gray-600 mb-2">{card.subtitle}</p>
                  <p className="text-gray-500 text-sm mb-4 line-clamp-2">{card.description}</p>
                  
                  {/* Contact Info */}
                  <div className="space-y-2 mb-4">
                    {card.phone && (
                      <div className="flex items-center text-sm text-gray-600">
                        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                        </svg>
                        {card.phone}
                      </div>
                    )}
                    {card.email && (
                      <div className="flex items-center text-sm text-gray-600">
                        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                        {card.email}
                      </div>
                    )}
                  </div>

                  {/* Stats */}
                  <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                    <span className="flex items-center">
                      <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                      </svg>
                      {card.likes?.length || 0} likes
                    </span>
                    <span>#{card.bizNumber}</span>
                  </div>

                  {/* Actions */}
                  <div className="flex space-x-2">
                    <Link
                      to={`/cards/${card._id}`}
                      className="flex-1 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-md text-center transition-colors duration-200"
                      data-testid={`view-card-${card._id}`}
                    >
                      Voir
                    </Link>
                    <Link
                      to={`/cards/${card._id}/edit`}
                      className="flex-1 px-4 py-2 bg-green-600 hover:bg-green-700 text-white text-sm font-medium rounded-md text-center transition-colors duration-200"
                      data-testid={`edit-card-${card._id}`}
                    >
                      Modifier
                    </Link>
                    <button
                      onClick={() => handleDeleteCard(card._id)}
                      className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white text-sm font-medium rounded-md transition-colors duration-200"
                      data-testid={`delete-card-${card._id}`}
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

export default MyCards;
