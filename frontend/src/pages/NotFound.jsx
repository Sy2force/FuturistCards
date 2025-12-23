import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className="min-h-screen bg-[#0f172a] flex items-center justify-center px-4">
      <div className="text-center max-w-md mx-auto">
        <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10">
          <div className="w-24 h-24 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-6">
            <span className="text-3xl font-bold text-white">404</span>
          </div>
          <h2 className="text-2xl font-semibold text-white mb-4">Page introuvable</h2>
          <p className="text-gray-300 mb-8">
            Désolé, la page que vous recherchez n&apos;existe pas ou a été déplacée.
          </p>
          
          <div className="space-y-4">
            <Link
              to="/"
              className="inline-block px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition-colors duration-200"
            >
              Retour à l&apos;accueil
            </Link>
            
            <Link
              to="/cards"
              className="block px-6 py-3 border border-gray-600 hover:border-blue-400 text-white hover:text-blue-400 rounded-lg font-semibold transition-colors duration-200"
            >
              Voir les cartes
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
