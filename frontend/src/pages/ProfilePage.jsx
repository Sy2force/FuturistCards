import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

const ProfilePage = () => {
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

  return (
    <div className="min-h-screen py-12 px-4" data-testid="profile-page">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold gradient-text mb-4">Mon Profil</h1>
          <p className="text-xl text-gray-300">Gérez vos informations personnelles</p>
        </div>

        <div className="glass-effect rounded-2xl p-8 shadow-3d border border-white/20 animate-fade-in hover-lift">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-semibold text-white mb-6">Informations personnelles</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Prénom</label>
                  <div className="glass-effect rounded-lg p-3 text-white">
                    {user.firstName || 'Non renseigné'}
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Nom</label>
                  <div className="glass-effect rounded-lg p-3 text-white">
                    {user.lastName || 'Non renseigné'}
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Email</label>
                  <div className="glass-effect rounded-lg p-3 text-white">
                    {user.email}
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-white mb-6">Informations du compte</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Rôle</label>
                  <div className="glass-effect rounded-lg p-3">
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                      user.role === 'admin' ? 'bg-red-500/20 text-red-300' :
                      user.role === 'business' ? 'bg-blue-500/20 text-blue-300' :
                      'bg-green-500/20 text-green-300'
                    }`}>
                      {user.role === 'admin' ? 'Administrateur' :
                       user.role === 'business' ? 'Entreprise' : 'Utilisateur'}
                    </span>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Membre depuis</label>
                  <div className="glass-effect rounded-lg p-3 text-white">
                    {user.createdAt ? new Date(user.createdAt).toLocaleDateString('fr-FR') : 'Non disponible'}
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Statut</label>
                  <div className="glass-effect rounded-lg p-3">
                    <span className="px-3 py-1 rounded-full text-sm font-medium bg-green-500/20 text-green-300">
                      Actif
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8 pt-8 border-t border-white/10">
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="px-6 py-3 gradient-primary hover-lift hover-glow text-white rounded-lg font-semibold shadow-3d">
                Modifier le profil
              </button>
              <button className="px-6 py-3 glass-effect hover-lift text-white rounded-lg font-semibold border border-white/20">
                Changer le mot de passe
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
