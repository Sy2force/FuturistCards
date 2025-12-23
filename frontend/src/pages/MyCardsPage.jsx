import React, { useState, useEffect, useCallback } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import api from '../api/api';

const MyCardsPage = () => {
  const { user } = useAuth();
  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchMyCards = useCallback(async () => {
    try {
      setLoading(true);
      const response = await api.get('/cards/my-cards');
      setCards(response.data.cards || []);
    } catch (error) {
      // console.error('Erreur lors du chargement des cartes:', error);
      setError('Impossible de charger vos cartes');
      // Mode mock pour le développement
      setCards([
        {
          _id: '1',
          title: 'Ma Carte Business',
          subtitle: 'Développeur Full-Stack',
          description: 'Spécialisé en React et Node.js',
          phone: '+33 6 12 34 56 78',
          email: user?.email || 'contact@example.com',
          website: 'https://monsite.com',
          address: 'Paris, France',
          image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop&crop=face',
          likes: 15,
          bizNumber: '123456789',
          createdAt: new Date().toISOString()
        },
        {
          _id: '2',
          title: 'Carte Design',
          subtitle: 'Designer UI/UX',
          description: 'Création d\'interfaces modernes',
          phone: '+33 6 98 76 54 32',
          email: user?.email || 'design@example.com',
          website: 'https://portfolio.com',
          address: 'Lyon, France',
          image: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=300&h=300&fit=crop&crop=face',
          likes: 8,
          bizNumber: '987654321',
          createdAt: new Date().toISOString()
        }
      ]);
    } finally {
      setLoading(false);
    }
  }, [user?.email]);

  useEffect(() => {
    fetchMyCards();
  }, [fetchMyCards]);

  // Protection de route
  if (!user) {
    return <Navigate to="/login" />;
  }

  if (user.role !== 'business' && user.role !== 'admin') {
    return <Navigate to="/unauthorized" />;
  }

  const handleDeleteCard = async (cardId) => {
    if (!window.confirm('Êtes-vous sûr de vouloir supprimer cette carte ?')) {
      return;
    }

    try {
      await api.delete(`/cards/${cardId}`);
      setCards(cards.filter(card => card._id !== cardId));
    } catch (error) {
      // console.error('Erreur lors de la suppression:', error);
      alert('Erreur lors de la suppression de la carte');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-[#0f172a] flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-white">Chargement de vos cartes...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-[#0f172a] py-12" data-testid="my-cards-page">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* En-tête */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-white mb-4">
            Mes Cartes de Visite
          </h1>
          <p className="text-xl text-gray-300 mb-8">
            Gérez vos cartes de visite professionnelles
          </p>
          
          {/* Badge de rôle */}
          <div className="flex justify-center mb-6">
            <span className="px-4 py-2 bg-purple-100 text-purple-800 rounded-full text-sm font-semibold">
              Compte {user?.role === 'admin' ? 'Administrateur' : 'Business'}
            </span>
          </div>

          {/* Bouton créer une carte */}
          <Link
            to="/cards/create"
            className="inline-flex items-center px-6 py-3 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg transition-colors duration-200 shadow-lg"
            data-testid="create-card-button"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Créer une nouvelle carte
          </Link>
        </div>

        {/* Message d'erreur */}
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
            {error}
          </div>
        )}

        {/* Liste des cartes */}
        {cards.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">📋</div>
            <h3 className="text-2xl font-semibold text-white mb-4">
              Aucune carte créée
            </h3>
            <p className="text-gray-300 mb-6">
              Vous n&apos;avez pas encore créé de carte de visite. Commencez dès maintenant !
            </p>
            <Link
              to="/cards/create"
              className="inline-flex items-center px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors duration-200"
            >
              Créer ma première carte
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {cards.map((card) => (
              <div
                key={card._id}
                className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20 hover:bg-white/20 transition-all duration-300"
                data-testid={`card-${card._id}`}
              >
                {/* Image de la carte */}
                {card.image?.url && (
                  <div className="mb-4">
                    <img
                      src={card.image.url}
                      alt={card.image.alt || card.title}
                      className="w-16 h-16 rounded-full mx-auto object-cover"
                    />
                  </div>
                )}

                {/* Informations de la carte */}
                <div className="text-center mb-4">
                  <h3 className="text-xl font-semibold text-white mb-2">
                    {card.title}
                  </h3>
                  <p className="text-gray-300 mb-2">{card.subtitle}</p>
                  <p className="text-gray-400 text-sm">{card.description}</p>
                </div>

                {/* Statistiques */}
                <div className="flex justify-center items-center space-x-4 mb-4 text-sm text-gray-300">
                  <span className="flex items-center">
                    <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                    </svg>
                    {card.likes || 0} likes
                  </span>
                  <span>
                    Créée le {new Date(card.createdAt).toLocaleDateString('fr-FR')}
                  </span>
                </div>

                {/* Actions */}
                <div className="flex justify-center space-x-2">
                  <Link
                    to={`/cards/${card._id}`}
                    className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm rounded-lg transition-colors duration-200"
                    data-testid={`view-card-${card._id}`}
                  >
                    Voir
                  </Link>
                  <Link
                    to={`/cards/${card._id}/edit`}
                    className="px-4 py-2 bg-yellow-600 hover:bg-yellow-700 text-white text-sm rounded-lg transition-colors duration-200"
                    data-testid={`edit-card-${card._id}`}
                  >
                    Modifier
                  </Link>
                  <button
                    onClick={() => handleDeleteCard(card._id)}
                    className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white text-sm rounded-lg transition-colors duration-200"
                    data-testid={`delete-card-${card._id}`}
                  >
                    Supprimer
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Statistiques utilisateur */}
        {cards.length > 0 && (
          <div className="mt-12 bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20">
            <h3 className="text-xl font-semibold text-white mb-4 text-center">
              Statistiques de vos cartes
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
              <div>
                <div className="text-2xl font-bold text-blue-400">
                  {cards.length}
                </div>
                <div className="text-gray-300">Cartes créées</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-green-400">
                  {cards.reduce((total, card) => total + (card.likes || 0), 0)}
                </div>
                <div className="text-gray-300">Total des likes</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-purple-400">
                  {Math.round(cards.reduce((total, card) => total + (card.likes || 0), 0) / cards.length) || 0}
                </div>
                <div className="text-gray-300">Moyenne des likes</div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyCardsPage;
