import React from 'react';
import { Link } from 'react-router-dom';

const UnauthorizedPage = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center" data-testid="unauthorized-page">
      <div className="text-center max-w-md mx-auto p-8">
        <div className="text-6xl mb-4">🔒</div>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Accès non autorisé</h2>
        <p className="text-gray-600 mb-6">
          Vous n&apos;avez pas les permissions nécessaires pour accéder à cette page.
        </p>
        <div className="space-y-3">
          <Link
            to="/cards"
            className="block px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition-colors duration-200"
            data-testid="back-to-cards"
          >
            Retour aux cartes
          </Link>
          <Link
            to="/"
            className="block px-6 py-3 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-lg font-semibold transition-colors duration-200"
            data-testid="back-to-home"
          >
            Accueil
          </Link>
        </div>
      </div>
    </div>
  );
};

export default UnauthorizedPage;
