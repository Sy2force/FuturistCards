import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { sampleCards } from '../data/sampleCards';

const CardDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [card, setCard] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simuler un chargement
    setTimeout(() => {
      const foundCard = sampleCards.find(c => c._id === id);
      setCard(foundCard);
      setLoading(false);
    }, 500);
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <div className="glass-effect rounded-2xl p-8 shadow-3d border border-white/20 animate-fade-in text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-400 mx-auto mb-4"></div>
          <p className="text-gray-300">Chargement de la carte...</p>
        </div>
      </div>
    );
  }

  if (!card) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <div className="glass-effect rounded-2xl p-8 shadow-3d border border-white/20 w-full max-w-md animate-fade-in text-center">
          <div className="w-16 h-16 gradient-danger rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-white mb-4">Carte introuvable</h2>
          <p className="text-gray-300 mb-8">
            Détails de la carte sélectionnée - Cette page affichera toutes les informations d&apos;une carte spécifique
          </p>
          <button 
            onClick={() => navigate('/cards')}
            className="px-6 py-3 gradient-primary hover-lift hover-glow text-white rounded-lg font-semibold shadow-3d"
          >
            Retour aux cartes
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Bouton retour */}
        <button 
          onClick={() => navigate('/cards')}
          className="mb-8 flex items-center space-x-2 text-gray-300 hover:text-white transition-colors hover-lift"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          <span>Retour aux cartes</span>
        </button>

        <div className="glass-effect rounded-2xl p-8 shadow-3d border border-white/20 animate-fade-in hover-lift">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Image de la carte */}
            <div>
              {card.image?.url && (
                <div className="aspect-video rounded-xl overflow-hidden mb-6">
                  <img
                    src={card.image.url}
                    alt={card.image.alt || card.title}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
              
              {/* Informations de contact */}
              <div className="glass-effect rounded-xl p-6 border border-white/10">
                <h3 className="text-xl font-bold text-white mb-4">Informations de contact</h3>
                <div className="space-y-3">
                  {card.email && (
                    <div className="flex items-center space-x-3">
                      <svg className="w-5 h-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                      <span className="text-gray-300">{card.email}</span>
                    </div>
                  )}
                  
                  {card.phone && (
                    <div className="flex items-center space-x-3">
                      <svg className="w-5 h-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21L6.16 11.37a11.045 11.045 0 005.516 5.516l1.983-4.064a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                      <span className="text-gray-300">{card.phone}</span>
                    </div>
                  )}
                  
                  {card.address && (
                    <div className="flex items-center space-x-3">
                      <svg className="w-5 h-5 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      <span className="text-gray-300">{card.address}</span>
                    </div>
                  )}
                  
                  {card.web && (
                    <div className="flex items-center space-x-3">
                      <svg className="w-5 h-5 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                      </svg>
                      <a href={card.web} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300 transition-colors">
                        {card.web}
                      </a>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Détails de la carte */}
            <div>
              <div className="mb-6">
                <h1 className="text-3xl font-bold gradient-text mb-2">{card.title}</h1>
                <p className="text-xl text-gray-300">{card.subtitle}</p>
              </div>

              {card.description && (
                <div className="mb-6">
                  <h3 className="text-xl font-bold text-white mb-3">Description</h3>
                  <p className="text-gray-300 leading-relaxed">{card.description}</p>
                </div>
              )}

              {/* Actions */}
              <div className="flex flex-col sm:flex-row gap-4 mb-6">
                <button className="px-6 py-3 gradient-primary hover-lift hover-glow text-white rounded-lg font-semibold shadow-3d flex items-center justify-center space-x-2">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                  <span>Ajouter aux favoris</span>
                </button>
                
                <button className="px-6 py-3 glass-effect hover-lift text-white rounded-lg font-semibold border border-white/20 flex items-center justify-center space-x-2">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
                  </svg>
                  <span>Partager</span>
                </button>
              </div>

              {/* Informations supplémentaires */}
              <div className="glass-effect rounded-xl p-6 border border-white/10">
                <h3 className="text-lg font-bold text-white mb-4">Informations</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Créée le:</span>
                    <span className="text-white">
                      {card.createdAt ? new Date(card.createdAt).toLocaleDateString('fr-FR') : 'Non disponible'}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Catégorie:</span>
                    <span className="text-white">{card.bizNumber || 'Professionnel'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Statut:</span>
                    <span className="px-2 py-1 bg-green-500/20 text-green-300 rounded text-xs">Actif</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardDetailsPage;
