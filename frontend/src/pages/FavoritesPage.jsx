import React from 'react';
import { useAuth } from '../hooks/useAuth';

const FavoritesPage = () => {
  const { user } = useAuth();

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <div className="glass-effect rounded-2xl p-8 shadow-3d border border-white/20 w-full max-w-md animate-fade-in text-center">
          <h2 className="text-2xl font-bold text-white mb-4">Accès restreint</h2>
          <p>Vos cartes favorites - Retrouvez ici toutes les cartes que vous avez ajoutées à vos favoris.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold gradient-text mb-4">Mes Favoris</h1>
          <p className="text-xl text-gray-300">Vos cartes de visite préférées</p>
        </div>

        <div className="glass-effect rounded-2xl p-12 shadow-3d border border-white/20 animate-fade-in hover-lift text-center">
          <div className="max-w-md mx-auto">
            <div className="w-24 h-24 gradient-primary rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
            </div>
            
            <h2 className="text-2xl font-bold text-white mb-4">Aucune carte favorite</h2>
            <p className="text-gray-300 mb-8">
              Vous n&apos;avez pas encore de cartes favorites. Parcourez les cartes disponibles et ajoutez celles qui vous intéressent à vos favoris pour les retrouver facilement ici.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button 
                onClick={() => window.location.href = '/cards'}
                className="px-6 py-3 gradient-primary hover-lift hover-glow text-white rounded-lg font-semibold shadow-3d"
              >
                Explorer les cartes
              </button>
              <button 
                onClick={() => window.location.href = '/'}
                className="px-6 py-3 glass-effect hover-lift text-white rounded-lg font-semibold border border-white/20"
              >
                Retour à l&apos;accueil
              </button>
            </div>
          </div>
        </div>

        {/* Section d'aide */}
        <div className="mt-12">
          <div className="glass-effect rounded-2xl p-8 shadow-3d border border-white/20 animate-fade-in hover-lift" style={{animationDelay: '0.2s'}}>
            <h3 className="text-xl font-bold text-white mb-4">Comment ajouter des favoris ?</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="w-12 h-12 gradient-secondary rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-white font-bold">1</span>
                </div>
                <p className="text-gray-300">Parcourez les cartes disponibles</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 gradient-secondary rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-white font-bold">2</span>
                </div>
                <p className="text-gray-300">Cliquez sur l&apos;icône cœur</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 gradient-secondary rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-white font-bold">3</span>
                </div>
                <p className="text-gray-300">Retrouvez-les ici !</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FavoritesPage;
