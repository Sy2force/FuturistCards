import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { sampleCards } from '../data/sampleCards';

const CardsPage = () => {
  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCards = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5001/api';
        const response = await axios.get(`${API_URL}/cards`);
        
        if (response.data.success) {
          setCards(response.data.cards || []);
        } else {
          throw new Error(response.data.message || 'Erreur lors du chargement des cartes');
        }
      } catch (err) {
        setError(err.message || 'Erreur de connexion');
        // Fallback vers les données mock
        setCards(sampleCards);
      } finally {
        setLoading(false);
      }
    };

    fetchCards();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Chargement des cartes...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Découvrez les cartes
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Explorez notre collection de cartes de visite professionnelles créées par notre communauté
          </p>
          {error && (
            <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg text-yellow-700">
              Mode hors ligne - Affichage des cartes de démonstration
            </div>
          )}
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {cards.map((card) => (
            <div
              key={card._id}
              className="bg-white rounded-xl border border-gray-200 shadow-md overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
              data-testid="card-item"
            >
              <div className="h-48 bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center">
                <div className="text-center">
                  <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-3">
                    <span className="text-2xl font-bold text-white">
                      {card.title?.charAt(0) || 'C'}
                    </span>
                  </div>
                  <h3 className="text-xl font-semibold text-white">{card.title}</h3>
                  <p className="text-blue-100 text-sm">{card.subtitle}</p>
                </div>
              </div>
              
              <div className="p-6">
                <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                  {card.description}
                </p>
                
                <div className="space-y-2 mb-4">
                  {card.email && (
                    <div className="flex items-center text-sm text-gray-500">
                      <span className="w-4 h-4 mr-2">📧</span>
                      {card.email}
                    </div>
                  )}
                  {card.phone && (
                    <div className="flex items-center text-sm text-gray-500">
                      <span className="w-4 h-4 mr-2">📞</span>
                      {card.phone}
                    </div>
                  )}
                  {card.address && (
                    <div className="flex items-center text-sm text-gray-500">
                      <span className="w-4 h-4 mr-2">📍</span>
                      {card.address.city}, {card.address.country}
                    </div>
                  )}
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-medium">
                    {card.category}
                  </span>
                  <div className="flex items-center space-x-4 text-sm text-gray-500">
                    <span>👁 {card.views || 0}</span>
                    <span>❤️ {card.likes || 0}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {cards.length === 0 && !loading && (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">📋</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Aucune carte disponible</h3>
            <p className="text-gray-600">Les cartes apparaîtront ici une fois créées.</p>
            <Link 
              to="/create-card" 
              className="inline-block mt-4 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg shadow-md transition-all duration-200"
              data-testid="create-card-link"
            >
              Créer ma première carte
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default CardsPage;
