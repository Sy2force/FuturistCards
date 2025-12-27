import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const Dashboard = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState({
    cards: 0,
    views: 0,
    favorites: 0
  });

  useEffect(() => {
    // Simuler des statistiques pour le dashboard
    setStats({
      cards: 3,
      views: 127,
      favorites: 23
    });
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-900 dark:to-gray-800">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
            🎯 Tableau de Bord
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            Bonjour {user?.name || 'Utilisateur'} ! Bienvenue dans votre espace personnel
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg border border-blue-200 dark:border-blue-800 hover:shadow-xl transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold text-blue-900 dark:text-blue-300 mb-2">📋 Mes Cartes</h3>
                <p className="text-3xl font-bold text-blue-600 dark:text-blue-400">{stats.cards}</p>
              </div>
              <div className="text-4xl">📋</div>
            </div>
          </div>
          
          <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg border border-green-200 dark:border-green-800 hover:shadow-xl transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold text-green-900 dark:text-green-300 mb-2">👁️ Vues Totales</h3>
                <p className="text-3xl font-bold text-green-600 dark:text-green-400">{stats.views}</p>
              </div>
              <div className="text-4xl">👁️</div>
            </div>
          </div>
          
          <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg border border-purple-200 dark:border-purple-800 hover:shadow-xl transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold text-purple-900 dark:text-purple-300 mb-2">❤️ Favoris</h3>
                <p className="text-3xl font-bold text-purple-600 dark:text-purple-400">{stats.favorites}</p>
              </div>
              <div className="text-4xl">❤️</div>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-6 text-center">🚀 Actions Rapides</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Link 
              to="/create-card" 
              className="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-6 py-4 rounded-xl hover:from-blue-600 hover:to-blue-700 transition-all hover:scale-105 text-center font-medium shadow-lg"
            >
              <div className="text-2xl mb-2">➕</div>
              Créer une carte
            </Link>
            <Link 
              to="/my-cards" 
              className="bg-gradient-to-r from-purple-500 to-purple-600 text-white px-6 py-4 rounded-xl hover:from-purple-600 hover:to-purple-700 transition-all hover:scale-105 text-center font-medium shadow-lg"
            >
              <div className="text-2xl mb-2">📋</div>
              Mes cartes
            </Link>
            <Link 
              to="/cards" 
              className="bg-gradient-to-r from-green-500 to-green-600 text-white px-6 py-4 rounded-xl hover:from-green-600 hover:to-green-700 transition-all hover:scale-105 text-center font-medium shadow-lg"
            >
              <div className="text-2xl mb-2">🌐</div>
              Parcourir
            </Link>
            <Link 
              to="/profile" 
              className="bg-gradient-to-r from-orange-500 to-orange-600 text-white px-6 py-4 rounded-xl hover:from-orange-600 hover:to-orange-700 transition-all hover:scale-105 text-center font-medium shadow-lg"
            >
              <div className="text-2xl mb-2">👤</div>
              Mon Profil
            </Link>
          </div>
        </div>

        {/* Section récente activité */}
        <div className="mt-8 bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-6">📈 Activité Récente</h2>
          <div className="space-y-4">
            <div className="flex items-center p-4 bg-blue-50 dark:bg-blue-900/20 rounded-xl">
              <div className="text-2xl mr-4">📋</div>
              <div>
                <p className="font-medium text-gray-900 dark:text-gray-100">Nouvelle carte créée</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">Il y a 2 heures</p>
              </div>
            </div>
            <div className="flex items-center p-4 bg-green-50 dark:bg-green-900/20 rounded-xl">
              <div className="text-2xl mr-4">👁️</div>
              <div>
                <p className="font-medium text-gray-900 dark:text-gray-100">Votre carte a été vue 5 fois</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">Aujourd'hui</p>
              </div>
            </div>
            <div className="flex items-center p-4 bg-purple-50 dark:bg-purple-900/20 rounded-xl">
              <div className="text-2xl mr-4">❤️</div>
              <div>
                <p className="font-medium text-gray-900 dark:text-gray-100">2 nouvelles cartes ajoutées aux favoris</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">Hier</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
