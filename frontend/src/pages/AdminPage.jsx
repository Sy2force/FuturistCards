import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

const AdminPage = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" />;
  }

  if (user.role !== 'admin') {
    return <Navigate to="/unauthorized" />;
  }

  return (
    <div className="min-h-screen py-12 px-4" data-testid="admin-page">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold gradient-text mb-4">Administration</h1>
          <p className="text-lg text-gray-300 mb-8">
            Panneau d&apos;administration pour gérer les utilisateurs et les cartes
          </p>
        </div>
        <div className="glass-effect rounded-2xl p-8 shadow-3d border border-white/20 animate-fade-in hover-lift text-center">
          <div className="max-w-2xl mx-auto">
            <div className="w-24 h-24 gradient-primary rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
            
            <h2 className="text-3xl font-bold text-white mb-4">Espace Administrateur</h2>
            <p className="text-gray-300 mb-6">
              Gérez les utilisateurs, modérez le contenu et surveillez l&apos;activité de la plateforme.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div className="glass-effect rounded-xl p-6 border border-white/10">
                <h3 className="text-xl font-semibold text-white mb-2">Gestion des utilisateurs</h3>
                <p className="text-gray-300 text-sm">Voir et gérer tous les comptes utilisateurs</p>
                <div className="mt-4">
                  <span className="px-3 py-1 bg-yellow-500/20 text-yellow-300 rounded-full text-xs">
                    En développement
                  </span>
                </div>
              </div>
              
              <div className="glass-effect rounded-xl p-6 border border-white/10">
                <h3 className="text-xl font-semibold text-white mb-2">Modération des cartes</h3>
                <p className="text-gray-300 text-sm">Approuver et modérer les cartes publiées</p>
                <div className="mt-4">
                  <span className="px-3 py-1 bg-yellow-500/20 text-yellow-300 rounded-full text-xs">
                    En développement
                  </span>
                </div>
              </div>
              
              <div className="glass-effect rounded-xl p-6 border border-white/10">
                <h3 className="text-xl font-semibold text-white mb-2">Statistiques</h3>
                <p className="text-gray-300 text-sm">Analytics et métriques de la plateforme</p>
                <div className="mt-4">
                  <span className="px-3 py-1 bg-yellow-500/20 text-yellow-300 rounded-full text-xs">
                    En développement
                  </span>
                </div>
              </div>
              
              <div className="glass-effect rounded-xl p-6 border border-white/10">
                <h3 className="text-xl font-semibold text-white mb-2">Configuration</h3>
                <p className="text-gray-300 text-sm">Paramètres globaux de l&apos;application</p>
                <div className="mt-4">
                  <span className="px-3 py-1 bg-yellow-500/20 text-yellow-300 rounded-full text-xs">
                    En développement
                  </span>
                </div>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="px-6 py-3 gradient-secondary hover-lift hover-glow text-white rounded-lg font-semibold shadow-3d">
                Voir les logs système
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

        {/* Informations système */}
        <div className="mt-8 glass-effect rounded-2xl p-6 shadow-3d border border-white/20 animate-fade-in" style={{animationDelay: '0.2s'}}>
          <h3 className="text-lg font-semibold text-white mb-4">Informations système</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
            <div>
              <span className="text-gray-400">Version:</span>
              <span className="text-white ml-2">1.0.0</span>
            </div>
            <div>
              <span className="text-gray-400">Environnement:</span>
              <span className="text-white ml-2">Développement</span>
            </div>
            <div>
              <span className="text-gray-400">Statut:</span>
              <span className="text-green-400 ml-2">Opérationnel</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminPage;
