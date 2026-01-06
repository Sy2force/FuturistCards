import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { useAuth } from '../context/AuthContext';
import { useRoleTheme } from '../context/ThemeProvider';
import toast from 'react-hot-toast';
import { TrashIcon, ArrowPathIcon } from '@heroicons/react/24/outline';

const API_URL = 'https://futuristcards.onrender.com/api';

const AdminPage = () => {
  const { user } = useAuth();
  const { currentTheme } = useRoleTheme();
  const [activeTab, setActiveTab] = useState('overview');
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [lastUpdate, setLastUpdate] = useState(new Date());

  const [users, setUsers] = useState([]);
  const [cards, setCards] = useState([]);

  // Fetch data on mount and every 30 seconds
  const fetchData = async (showToast = false) => {
    setRefreshing(true);
    try {
      // Fetch cards (public endpoint)
      const cardsRes = await fetch(`${API_URL}/cards`);
      if (cardsRes.ok) {
        const cardsData = await cardsRes.json();
        setCards(cardsData.cards || []);
      }

      // Fetch users (admin endpoint)
      const token = localStorage.getItem('token');
      if (token) {
        const usersRes = await fetch(`${API_URL}/admin/users`, {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        if (usersRes.ok) {
          const usersData = await usersRes.json();
          setUsers(usersData.users || []);
        }
      }

      setLastUpdate(new Date());
      if (showToast) toast.success('Data refreshed!');
    } catch (error) {
      console.error('Fetch error:', error);
      if (showToast) toast.error('Failed to refresh');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchData();
    const interval = setInterval(() => fetchData(), 30000);
    return () => clearInterval(interval);
  }, []);

  // Calculate real stats from data
  const totalUsers = users.length;
  const totalCards = cards.length;
  const totalLikes = cards.reduce((sum, c) => sum + (c.likes?.length || 0), 0);
  const totalViews = cards.reduce((sum, c) => sum + (c.views || 0), 0);
  const businessUsers = users.filter(u => u.role === 'business').length;
  const regularUsers = users.filter(u => u.role === 'user').length;
  const adminUsers = users.filter(u => u.role === 'admin').length;

  // Delete handlers
  const handleDeleteUser = async (userId) => {
    if (!window.confirm('Delete this user?')) return;
    try {
      const token = localStorage.getItem('token');
      const res = await fetch(`${API_URL}/admin/users/${userId}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (res.ok) {
        setUsers(prev => prev.filter(u => u._id !== userId));
        toast.success('User deleted');
      }
    } catch (e) {
      toast.error('Failed to delete user');
    }
  };

  const handleDeleteCard = async (cardId) => {
    if (!window.confirm('Delete this card?')) return;
    try {
      const token = localStorage.getItem('token');
      const res = await fetch(`${API_URL}/cards/${cardId}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (res.ok) {
        setCards(prev => prev.filter(c => c._id !== cardId));
        toast.success('Card deleted');
      }
    } catch (e) {
      toast.error('Failed to delete card');
    }
  };

  const filteredUsers = users.filter(u =>
    (u.name || u.email || '').toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredCards = cards.filter(c =>
    (c.title || c.fullName || '').toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-900">
        <div className="animate-spin rounded-full h-16 w-16 border-4 border-purple-500 border-t-transparent"></div>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>Admin Dashboard - FuturistCards</title>
      </Helmet>

      <div className="min-h-screen pt-20 pb-10 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="flex justify-between items-start mb-8">
            <div>
              <h1 className="text-4xl font-bold text-white mb-2">Admin Dashboard</h1>
              <p className="text-gray-400">Welcome, {user?.name || user?.firstName || 'Admin'}</p>
              <p className="text-xs text-gray-500 mt-1">
                Last update: {lastUpdate.toLocaleTimeString()} • Auto-refresh: 30s
              </p>
            </div>
            <motion.button
              onClick={() => fetchData(true)}
              disabled={refreshing}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-2 px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg font-medium"
            >
              <ArrowPathIcon className={`w-5 h-5 ${refreshing ? 'animate-spin' : ''}`} />
              {refreshing ? 'Refreshing...' : 'Refresh'}
            </motion.button>
          </div>

          {/* Stats Cards - REAL DATA */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="p-6 rounded-xl bg-white/10 backdrop-blur-md border border-white/20">
              <p className="text-gray-400 text-sm">Total Users</p>
              <p className="text-4xl font-bold text-white">{totalUsers}</p>
              <p className="text-blue-400 text-sm mt-1">{totalUsers} registered</p>
            </div>
            <div className="p-6 rounded-xl bg-white/10 backdrop-blur-md border border-white/20">
              <p className="text-gray-400 text-sm">Total Cards</p>
              <p className="text-4xl font-bold text-white">{totalCards}</p>
              <p className="text-green-400 text-sm mt-1">{totalCards} created</p>
            </div>
            <div className="p-6 rounded-xl bg-white/10 backdrop-blur-md border border-white/20">
              <p className="text-gray-400 text-sm">Total Likes</p>
              <p className="text-4xl font-bold text-white">{totalLikes}</p>
              <p className="text-red-400 text-sm mt-1">All time</p>
            </div>
            <div className="p-6 rounded-xl bg-white/10 backdrop-blur-md border border-white/20">
              <p className="text-gray-400 text-sm">Total Views</p>
              <p className="text-4xl font-bold text-white">{totalViews}</p>
              <p className="text-purple-400 text-sm mt-1">All cards</p>
            </div>
          </div>

          {/* Tabs */}
          <div className="flex gap-2 mb-8">
            {['overview', 'users', 'cards'].map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-6 py-3 rounded-lg font-medium capitalize transition-all ${
                  activeTab === tab
                    ? 'bg-purple-600 text-white'
                    : 'bg-white/10 text-gray-400 hover:bg-white/20'
                }`}
              >
                {tab} {tab === 'users' && `(${totalUsers})`} {tab === 'cards' && `(${totalCards})`}
              </button>
            ))}
          </div>

          {/* Search */}
          {(activeTab === 'users' || activeTab === 'cards') && (
            <input
              type="text"
              placeholder={`Search ${activeTab}...`}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full max-w-md px-4 py-3 mb-6 rounded-lg bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          )}

          {/* Overview Tab */}
          {activeTab === 'overview' && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="p-6 rounded-xl bg-white/10 backdrop-blur-md border border-white/20">
                <h3 className="text-xl font-bold text-white mb-4">User Distribution</h3>
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Admin Users</span>
                    <span className="text-red-400 font-bold">{adminUsers}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Business Users</span>
                    <span className="text-purple-400 font-bold">{businessUsers}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Regular Users</span>
                    <span className="text-blue-400 font-bold">{regularUsers}</span>
                  </div>
                  <div className="flex justify-between border-t border-white/20 pt-4">
                    <span className="text-white font-medium">Total</span>
                    <span className="text-white font-bold">{totalUsers}</span>
                  </div>
                </div>
              </div>
              <div className="p-6 rounded-xl bg-white/10 backdrop-blur-md border border-white/20">
                <h3 className="text-xl font-bold text-white mb-4">System Status</h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400">Backend API</span>
                    <span className="flex items-center gap-2 text-green-400">
                      <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
                      Online
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400">Database</span>
                    <span className="flex items-center gap-2 text-green-400">
                      <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
                      Connected
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400">Real-time Sync</span>
                    <span className="flex items-center gap-2 text-green-400">
                      <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
                      Active (30s)
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Users Tab */}
          {activeTab === 'users' && (
            <div className="rounded-xl bg-white/10 backdrop-blur-md border border-white/20 overflow-hidden">
              <table className="w-full">
                <thead className="bg-black/20">
                  <tr>
                    <th className="px-6 py-4 text-left text-white">Name</th>
                    <th className="px-6 py-4 text-left text-white">Email</th>
                    <th className="px-6 py-4 text-left text-white">Role</th>
                    <th className="px-6 py-4 text-left text-white">Created</th>
                    <th className="px-6 py-4 text-left text-white">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredUsers.length === 0 ? (
                    <tr><td colSpan="5" className="px-6 py-8 text-center text-gray-400">No users found</td></tr>
                  ) : (
                    filteredUsers.map(u => (
                      <tr key={u._id} className="border-t border-white/10">
                        <td className="px-6 py-4 text-white">{u.name || `${u.firstName || ''} ${u.lastName || ''}`.trim() || 'N/A'}</td>
                        <td className="px-6 py-4 text-gray-400">{u.email}</td>
                        <td className="px-6 py-4">
                          <span className={`px-3 py-1 rounded-full text-sm ${
                            u.role === 'admin' ? 'bg-red-500/20 text-red-400' :
                            u.role === 'business' ? 'bg-purple-500/20 text-purple-400' :
                            'bg-blue-500/20 text-blue-400'
                          }`}>{u.role}</span>
                        </td>
                        <td className="px-6 py-4 text-gray-400">{u.createdAt ? new Date(u.createdAt).toLocaleDateString() : 'N/A'}</td>
                        <td className="px-6 py-4">
                          <button onClick={() => handleDeleteUser(u._id)} className="p-2 bg-red-500/20 text-red-400 rounded-lg hover:bg-red-500/30">
                            <TrashIcon className="w-4 h-4" />
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          )}

          {/* Cards Tab */}
          {activeTab === 'cards' && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredCards.length === 0 ? (
                <div className="col-span-full text-center py-12 text-gray-400">No cards found</div>
              ) : (
                filteredCards.map(card => (
                  <div key={card._id} className="p-6 rounded-xl bg-white/10 backdrop-blur-md border border-white/20">
                    <div className="flex justify-between items-start mb-4">
                      <h3 className="text-lg font-bold text-white">{card.title || card.fullName || 'Untitled'}</h3>
                      <button onClick={() => handleDeleteCard(card._id)} className="p-2 bg-red-500/20 text-red-400 rounded-lg hover:bg-red-500/30">
                        <TrashIcon className="w-4 h-4" />
                      </button>
                    </div>
                    <p className="text-gray-400 text-sm mb-2">{card.email || card.company || 'No details'}</p>
                    <div className="flex gap-4 text-sm text-gray-400">
                      <span>👁️ {card.views || 0}</span>
                      <span>❤️ {card.likes?.length || 0}</span>
                    </div>
                    <p className="text-xs text-gray-500 mt-2">
                      Created: {card.createdAt ? new Date(card.createdAt).toLocaleDateString() : 'N/A'}
                    </p>
                  </div>
                ))
              )}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default AdminPage;
