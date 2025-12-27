import { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';
import { api } from '../../services/api';
import toast from 'react-hot-toast';

const AdminPanel = () => {
  const { user, isAdmin } = useAuth();
  const { isDark } = useTheme();
  const [stats, setStats] = useState({
    users: { total: 0, user: 0, business: 0, admin: 0 },
    cards: { total: 0, published: 0, draft: 0 },
    system: { uptime: 0, memory: {}, version: '' }
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await api.get('/admin/stats');
        setStats(response.data.stats);
      } catch (error) {
        toast.error('Erreur lors du chargement des statistiques');
        console.error('Error fetching admin stats:', error);
      } finally {
        setLoading(false);
      }
    };

    if (isAdmin) {
      fetchStats();
    }
  }, [isAdmin]);

  if (!isAdmin) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-red-600 mb-4">
            Accès refusé
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            Vous devez être administrateur pour accéder à cette page.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen pt-24 pb-12 ${isDark ? 'bg-gray-900' : 'bg-gray-50'}`} data-testid="admin-page">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className={`text-4xl font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
            Panneau d'Administration
          </h1>
          <p className={`text-xl ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
            Gérez la plateforme FuturistCards
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className={`${isDark ? 'bg-gray-800' : 'bg-white'} p-6 rounded-xl shadow-lg`}>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-blue-600 font-medium">Utilisateurs</p>
                <p className={`text-3xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  {loading ? '...' : stats.users.total}
                </p>
              </div>
              <div className="p-3 rounded-full bg-blue-100">
                <span className="text-3xl">👥</span>
              </div>
            </div>
          </div>
          
          <div className={`${isDark ? 'bg-gray-800' : 'bg-white'} p-6 rounded-xl shadow-lg`}>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-green-600 font-medium">Cartes</p>
                <p className={`text-3xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  {loading ? '...' : stats.cards.total}
                </p>
              </div>
              <div className="p-3 rounded-full bg-green-100">
                <span className="text-3xl">🎴</span>
              </div>
            </div>
          </div>
          
          <div className={`${isDark ? 'bg-gray-800' : 'bg-white'} p-6 rounded-xl shadow-lg`}>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-purple-600 font-medium">Business</p>
                <p className={`text-3xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  {loading ? '...' : stats.users.business}
                </p>
              </div>
              <div className="p-3 rounded-full bg-purple-100">
                <span className="text-3xl">💼</span>
              </div>
            </div>
          </div>
          
          <div className={`${isDark ? 'bg-gray-800' : 'bg-white'} p-6 rounded-xl shadow-lg`}>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-red-600 font-medium">Admins</p>
                <p className={`text-3xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  {loading ? '...' : stats.users.admin}
                </p>
              </div>
              <div className="p-3 rounded-full bg-red-100">
                <span className="text-3xl">👑</span>
              </div>
            </div>
          </div>
        </div>

        {/* Management Sections */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* User Management */}
          <div className={`${isDark ? 'bg-gray-800' : 'bg-white'} rounded-xl shadow-lg p-6`}>
            <h2 className={`text-2xl font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
              👥 Gestion des Utilisateurs
            </h2>
            <div className="space-y-4">
              <div className={`p-4 rounded-lg ${isDark ? 'bg-gray-700' : 'bg-gray-50'}`}>
                <h3 className={`font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  Répartition des rôles
                </h3>
                <div className="mt-2 space-y-1">
                  <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                    Utilisateurs: {loading ? '...' : stats.users.user}
                  </p>
                  <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                    Business: {loading ? '...' : stats.users.business}
                  </p>
                  <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                    Admins: {loading ? '...' : stats.users.admin}
                  </p>
                </div>
              </div>
              <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg transition-colors">
                Gérer les utilisateurs
              </button>
            </div>
          </div>

          {/* Content Management */}
          <div className={`${isDark ? 'bg-gray-800' : 'bg-white'} rounded-xl shadow-lg p-6`}>
            <h2 className={`text-2xl font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
              📇 Gestion du Contenu
            </h2>
            <div className="space-y-4">
              <div className={`p-4 rounded-lg ${isDark ? 'bg-gray-700' : 'bg-gray-50'}`}>
                <h3 className={`font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  Statistiques des cartes
                </h3>
                <div className="mt-2 space-y-1">
                  <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                    Total: {loading ? '...' : stats.cards.total}
                  </p>
                  <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                    Publiées: {loading ? '...' : stats.cards.published}
                  </p>
                </div>
              </div>
              <button className="w-full bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-lg transition-colors">
                Gérer les cartes
              </button>
            </div>
          </div>

          {/* System Settings */}
          <div className={`${isDark ? 'bg-gray-800' : 'bg-white'} rounded-xl shadow-lg p-6`}>
            <h2 className={`text-2xl font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
              ⚙️ Paramètres Système
            </h2>
            <div className="space-y-4">
              <div className={`p-4 rounded-lg ${isDark ? 'bg-gray-700' : 'bg-gray-50'}`}>
                <h3 className={`font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  Système
                </h3>
                <div className="mt-2 space-y-1">
                  <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                    Version: {loading ? '...' : stats.system.version}
                  </p>
                  <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                    Uptime: {loading ? '...' : Math.floor(stats.system.uptime / 60)} min
                  </p>
                </div>
              </div>
              <button className="w-full bg-purple-600 hover:bg-purple-700 text-white py-2 px-4 rounded-lg transition-colors">
                Paramètres système
              </button>
            </div>
          </div>

          {/* Analytics */}
          <div className={`${isDark ? 'bg-gray-800' : 'bg-white'} rounded-xl shadow-lg p-6`}>
            <h2 className={`text-2xl font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
              📊 Analytiques
            </h2>
            <div className="space-y-4">
              <div className={`p-4 rounded-lg ${isDark ? 'bg-gray-700' : 'bg-gray-50'}`}>
                <h3 className={`font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  Rapports
                </h3>
                <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                  Consulter les statistiques détaillées
                </p>
              </div>
              <button className="w-full bg-orange-600 hover:bg-orange-700 text-white py-2 px-4 rounded-lg transition-colors">
                Voir les rapports
              </button>
            </div>
          </div>
        </div>

        {/* Recent Activity */}
        <div className={`${isDark ? 'bg-gray-800' : 'bg-white'} rounded-xl shadow-lg p-6 mt-8`}>
          <h2 className={`text-2xl font-bold mb-6 ${isDark ? 'text-white' : 'text-gray-900'}`}>
            📈 Activité Récente
          </h2>
          <div className="space-y-4">
            <div className={`flex items-center p-4 rounded-lg ${isDark ? 'bg-gray-700' : 'bg-gray-50'}`}>
              <span className="text-2xl mr-4">👤</span>
              <div>
                <p className={`font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  Nouvel utilisateur inscrit
                </p>
                <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                  Il y a 2 heures
                </p>
              </div>
            </div>
            <div className={`flex items-center p-4 rounded-lg ${isDark ? 'bg-gray-700' : 'bg-gray-50'}`}>
              <span className="text-2xl mr-4">📇</span>
              <div>
                <p className={`font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  Nouvelle carte créée
                </p>
                <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                  Il y a 4 heures
                </p>
              </div>
            </div>
            <div className={`flex items-center p-4 rounded-lg ${isDark ? 'bg-gray-700' : 'bg-gray-50'}`}>
              <span className="text-2xl mr-4">⚠️</span>
              <div>
                <p className={`font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  Contenu signalé
                </p>
                <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                  Il y a 6 heures
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;
