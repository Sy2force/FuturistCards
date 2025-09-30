import React from 'react';
import { useParams, Link } from 'react-router-dom';

const CardDetailsPageSimple = () => {
  const { id } = useParams();

  // Données mock pour la démo
  const card = {
    _id: id,
    title: 'Sarah Cohen',
    subtitle: 'Senior Full-Stack Developer',
    description: 'React, Node.js & MongoDB specialist with 7+ years experience. Passionate about modern technologies and innovation.',
    email: 'sarah.cohen@techcorp.com',
    phone: '+972-50-123-4567',
    website: 'https://sarahcohen.dev',
    address: '123 Rue de la Tech, 75001 Paris',
    category: 'technology',
    createdAt: new Date().toISOString()
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-900 dark:to-gray-800 py-8 px-4">
      <div className="container mx-auto max-w-4xl">
        {/* Bouton retour */}
        <div className="mb-6">
          <Link 
            to="/cards" 
            className="inline-flex items-center text-blue-500 hover:text-blue-600 font-medium"
          >
            ← Retour aux cartes
          </Link>
        </div>

        {/* Carte principale */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden">
          {/* En-tête avec gradient */}
          <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-8 text-white">
            <div className="text-center">
              <div className="w-24 h-24 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold">
                  {card.title.split(' ').map(n => n[0]).join('')}
                </span>
              </div>
              <h1 className="text-3xl font-bold mb-2">{card.title}</h1>
              <p className="text-xl opacity-90">{card.subtitle}</p>
            </div>
          </div>

          {/* Contenu */}
          <div className="p-8">
            {/* Description */}
            <div className="mb-8">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-3">
                À propos
              </h2>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                {card.description}
              </p>
            </div>

            {/* Informations de contact */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                  Contact
                </h3>
                
                <div className="flex items-center space-x-3">
                  <div className="text-blue-500">📧</div>
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Email</p>
                    <a 
                      href={`mailto:${card.email}`}
                      className="text-blue-500 hover:text-blue-600"
                    >
                      {card.email}
                    </a>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <div className="text-green-500">📞</div>
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Téléphone</p>
                    <a 
                      href={`tel:${card.phone}`}
                      className="text-green-500 hover:text-green-600"
                    >
                      {card.phone}
                    </a>
                  </div>
                </div>

                {card.website && (
                  <div className="flex items-center space-x-3">
                    <div className="text-purple-500">🌐</div>
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Site web</p>
                      <a 
                        href={card.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-purple-500 hover:text-purple-600"
                      >
                        {card.website}
                      </a>
                    </div>
                  </div>
                )}
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                  Informations
                </h3>
                
                {card.address && (
                  <div className="flex items-center space-x-3">
                    <div className="text-red-500">📍</div>
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Adresse</p>
                      <p className="text-gray-700 dark:text-gray-300">{card.address}</p>
                    </div>
                  </div>
                )}

                <div className="flex items-center space-x-3">
                  <div className="text-orange-500">🏷️</div>
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Catégorie</p>
                    <span className="inline-block px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-sm rounded-full">
                      {card.category}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-4 pt-6 border-t border-gray-200 dark:border-gray-600">
              <button className="flex-1 bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg font-medium transition-colors">
                Ajouter aux favoris
              </button>
              <button className="flex-1 bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-lg font-medium transition-colors">
                Partager
              </button>
              <button className="flex-1 bg-gray-500 hover:bg-gray-600 text-white px-6 py-3 rounded-lg font-medium transition-colors">
                Télécharger vCard
              </button>
            </div>
          </div>
        </div>

        {/* Cartes similaires */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-6">
            Cartes similaires
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[1, 2, 3].map(i => (
              <div key={i} className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
                <h3 className="font-bold text-gray-900 dark:text-gray-100 mb-2">
                  Personne {i}
                </h3>
                <p className="text-blue-600 dark:text-blue-400 text-sm mb-4">
                  Métier similaire
                </p>
                <Link 
                  to={`/cards/${i}`}
                  className="text-blue-500 hover:text-blue-600 text-sm font-medium"
                >
                  Voir détails →
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardDetailsPageSimple;
