import React, { useState, useEffect } from 'react';
import { useAuth } from '../hooks/useAuth';
import api from '../api/api';

interface User {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: string;
  isAdmin: boolean;
  isBusiness: boolean;
  createdAt: string;
}

interface Card {
  _id: string;
  title: string;
  subtitle: string;
  email: string;
  phone: string;
  user_id: string;
  likes: string[];
  createdAt: string;
}

interface AdminStats {
  totalUsers: number;
  totalCards: number;
  totalBusinessUsers: number;
  totalAdminUsers: number;
}

const Admin: React.FC = () => {
  const { user } = useAuth();
  const [users, setUsers] = useState<User[]>([]);
  const [cards, setCards] = useState<Card[]>([]);
  const [stats, setStats] = useState<AdminStats>({
    totalUsers: 0,
    totalCards: 0,
    totalBusinessUsers: 0,
    totalAdminUsers: 0
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'dashboard' | 'users' | 'cards'>('dashboard');

  useEffect(() => {
    const fetchAdminData = async () => {
      try {
        setLoading(true);
        
        // Fetch users
        const usersResponse = await api.get('/admin/users');
        const usersData = usersResponse.data.users || [];
        setUsers(usersData);

        // Fetch cards
        const cardsResponse = await api.get('/admin/cards');
        const cardsData = cardsResponse.data.cards || [];
        setCards(cardsData);

        // Calculate stats
        const totalUsers = usersData.length;
        const totalCards = cardsData.length;
        const totalBusinessUsers = usersData.filter((u: User) => u.role === 'business').length;
        const totalAdminUsers = usersData.filter((u: User) => u.role === 'admin').length;

        setStats({
          totalUsers,
          totalCards,
          totalBusinessUsers,
          totalAdminUsers
        });

      } catch (error: any) {
        setError('Erreur lors du chargement des données administrateur');
        console.error('Error fetching admin data:', error);
      } finally {
        setLoading(false);
      }
    };

    if ((user as any)?.role === 'admin') {
      fetchAdminData();
    }
  }, [user]);

  const handleDeleteUser = async (userId: string) => {
    if (!window.confirm('Êtes-vous sûr de vouloir supprimer cet utilisateur ?')) {
      return;
    }

    try {
      await api.delete(`/admin/users/${userId}`);
      setUsers(users.filter(u => u._id !== userId));
    } catch (error) {
      setError('Erreur lors de la suppression de l\'utilisateur');
      console.error('Error deleting user:', error);
    }
  };

  const handleDeleteCard = async (cardId: string) => {
    if (!window.confirm('Êtes-vous sûr de vouloir supprimer cette carte ?')) {
      return;
    }

    try {
      await api.delete(`/admin/cards/${cardId}`);
      setCards(cards.filter(c => c._id !== cardId));
    } catch (error) {
      setError('Erreur lors de la suppression de la carte');
      console.error('Error deleting card:', error);
    }
  };

  const handleUpdateUserRole = async (userId: string, newRole: string) => {
    try {
      await api.patch(`/admin/users/${userId}/role`, { role: newRole });
      setUsers(users.map(u => 
        u._id === userId 
          ? { ...u, role: newRole, isAdmin: newRole === 'admin', isBusiness: newRole === 'business' || newRole === 'admin' }
          : u
      ));
    } catch (error) {
      setError('Erreur lors de la mise à jour du rôle');
      console.error('Error updating user role:', error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center" data-testid="admin-loading">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-8" data-testid="admin-page">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4" data-testid="admin-title">
            Panneau d'Administration
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Gérez les utilisateurs et les cartes de la plateforme
          </p>
          {user && (
            <div className="mt-4">
              <span 
                className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-red-100 text-red-800"
                data-testid="user-badge"
              >
                Admin
              </span>
            </div>
          )}
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-8 p-4 bg-red-50 border border-red-200 rounded-lg" data-testid="error-message">
            <p className="text-red-600 text-center">{error}</p>
          </div>
        )}

        {/* Navigation Tabs */}
        <div className="mb-8">
          <nav className="flex space-x-8 justify-center" data-testid="admin-tabs">
            <button
              onClick={() => setActiveTab('dashboard')}
              className={`py-2 px-4 border-b-2 font-medium text-sm ${
                activeTab === 'dashboard'
                  ? 'border-red-500 text-red-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
              data-testid="dashboard-tab"
            >
              Dashboard
            </button>
            <button
              onClick={() => setActiveTab('users')}
              className={`py-2 px-4 border-b-2 font-medium text-sm ${
                activeTab === 'users'
                  ? 'border-red-500 text-red-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
              data-testid="users-tab"
            >
              Utilisateurs ({users.length})
            </button>
            <button
              onClick={() => setActiveTab('cards')}
              className={`py-2 px-4 border-b-2 font-medium text-sm ${
                activeTab === 'cards'
                  ? 'border-red-500 text-red-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
              data-testid="cards-tab"
            >
              Cartes ({cards.length})
            </button>
          </nav>
        </div>

        {/* Dashboard Tab */}
        {activeTab === 'dashboard' && (
          <div data-testid="dashboard-content">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <div className="bg-white rounded-lg shadow p-6" data-testid="stat-total-users">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <svg className="h-8 w-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
                    </svg>
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="text-sm font-medium text-gray-500 truncate">Total Utilisateurs</dt>
                      <dd className="text-lg font-medium text-gray-900">{stats.totalUsers}</dd>
                    </dl>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow p-6" data-testid="stat-total-cards">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <svg className="h-8 w-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                    </svg>
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="text-sm font-medium text-gray-500 truncate">Total Cartes</dt>
                      <dd className="text-lg font-medium text-gray-900">{stats.totalCards}</dd>
                    </dl>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow p-6" data-testid="stat-business-users">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <svg className="h-8 w-8 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2-2v2m8 0V6a2 2 0 012 2v6a2 2 0 01-2 2H6a2 2 0 01-2-2V8a2 2 0 012-2V6" />
                    </svg>
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="text-sm font-medium text-gray-500 truncate">Utilisateurs Business</dt>
                      <dd className="text-lg font-medium text-gray-900">{stats.totalBusinessUsers}</dd>
                    </dl>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow p-6" data-testid="stat-admin-users">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <svg className="h-8 w-8 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="text-sm font-medium text-gray-500 truncate">Administrateurs</dt>
                      <dd className="text-lg font-medium text-gray-900">{stats.totalAdminUsers}</dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Users Tab */}
        {activeTab === 'users' && (
          <div data-testid="users-content">
            <div className="bg-white shadow overflow-hidden sm:rounded-md">
              <ul className="divide-y divide-gray-200">
                {users.map((user) => (
                  <li key={user._id} data-testid={`user-${user._id}`}>
                    <div className="px-4 py-4 sm:px-6">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <div className="flex-shrink-0">
                            <div className="h-10 w-10 rounded-full bg-gray-300 flex items-center justify-center">
                              <span className="text-sm font-medium text-gray-700">
                                {user.firstName.charAt(0)}{user.lastName.charAt(0)}
                              </span>
                            </div>
                          </div>
                          <div className="ml-4">
                            <div className="flex items-center">
                              <p className="text-sm font-medium text-gray-900">
                                {user.firstName} {user.lastName}
                              </p>
                              <span className={`ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                                user.role === 'admin' ? 'bg-red-100 text-red-800' :
                                user.role === 'business' ? 'bg-purple-100 text-purple-800' :
                                'bg-blue-100 text-blue-800'
                              }`}>
                                {user.role}
                              </span>
                            </div>
                            <p className="text-sm text-gray-500">{user.email}</p>
                            <p className="text-xs text-gray-400">
                              Inscrit le {new Date(user.createdAt).toLocaleDateString('fr-FR')}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <select
                            value={user.role}
                            onChange={(e) => handleUpdateUserRole(user._id, e.target.value)}
                            className="text-sm border-gray-300 rounded-md"
                            data-testid={`role-select-${user._id}`}
                          >
                            <option value="user">User</option>
                            <option value="business">Business</option>
                            <option value="admin">Admin</option>
                          </select>
                          <button
                            onClick={() => handleDeleteUser(user._id)}
                            className="text-red-600 hover:text-red-900 text-sm font-medium"
                            data-testid={`delete-user-${user._id}`}
                          >
                            Supprimer
                          </button>
                        </div>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}

        {/* Cards Tab */}
        {activeTab === 'cards' && (
          <div data-testid="cards-content">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {cards.map((card) => (
                <div key={card._id} className="bg-white rounded-lg shadow-md overflow-hidden" data-testid={`admin-card-${card._id}`}>
                  <div className="p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">{card.title}</h3>
                    <p className="text-gray-600 mb-2">{card.subtitle}</p>
                    
                    <div className="space-y-1 mb-4">
                      {card.email && (
                        <p className="text-sm text-gray-500">📧 {card.email}</p>
                      )}
                      {card.phone && (
                        <p className="text-sm text-gray-500">📞 {card.phone}</p>
                      )}
                    </div>

                    <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                      <span className="flex items-center">
                        <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                        </svg>
                        {card.likes?.length || 0} likes
                      </span>
                      <span>{new Date(card.createdAt).toLocaleDateString('fr-FR')}</span>
                    </div>

                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleDeleteCard(card._id)}
                        className="flex-1 px-4 py-2 bg-red-600 hover:bg-red-700 text-white text-sm font-medium rounded-md transition-colors duration-200"
                        data-testid={`admin-delete-card-${card._id}`}
                      >
                        Supprimer
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Admin;
