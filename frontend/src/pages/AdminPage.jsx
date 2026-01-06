import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { useAuth } from '../context/AuthContext';
import { useRoleTheme } from '../context/ThemeProvider';
import toast from 'react-hot-toast';
import { 
  TrashIcon, 
  ArrowPathIcon,
  UserGroupIcon,
  CreditCardIcon,
  EyeIcon,
  HeartIcon,
  UserIcon,
  ShieldCheckIcon,
  BuildingOfficeIcon,
  MagnifyingGlassIcon
} from '@heroicons/react/24/outline';

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

  const fetchData = async (showToast = false) => {
    setRefreshing(true);
    let cardsLoaded = false;
    
    try {
      // Fetch cards (public endpoint)
      try {
        const cardsRes = await fetch(`${API_URL}/cards`);
        if (cardsRes.ok) {
          const cardsData = await cardsRes.json();
          setCards(cardsData.cards || []);
          cardsLoaded = true;
        }
      } catch (e) {}

      // Fetch users (admin endpoint)
      const token = localStorage.getItem('token');
      if (token) {
        try {
          const usersRes = await fetch(`${API_URL}/admin/users`, {
            headers: { 
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json'
            }
          });
          if (usersRes.ok) {
            const usersData = await usersRes.json();
            setUsers(usersData.users || []);
          }
        } catch (e) {}
      }

      setLastUpdate(new Date());
      if (showToast && cardsLoaded) {
        toast.success('Data refreshed!');
      }
    } catch (error) {
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
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
        <div className="animate-spin rounded-full h-16 w-16 border-4 border-purple-500 border-t-transparent"></div>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>Admin Panel | FuturistCards</title>
      </Helmet>

      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 pt-20 pb-10">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="flex justify-between items-start mb-8">
            <div>
              <h1 className="text-4xl font-bold text-white mb-2">Admin Panel</h1>
              <p className="text-gray-400">Manage users and cards</p>
              <p className="text-xs text-gray-500 mt-1">
                Last update: {lastUpdate.toLocaleTimeString()} - Auto-refresh: 30s
              </p>
            </div>
            <motion.button
              onClick={() => fetchData(true)}
              disabled={refreshing}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-2 px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg"
            >
              <ArrowPathIcon className={`w-5 h-5 ${refreshing ? 'animate-spin' : ''}`} />
              Refresh
            </motion.button>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">Total Users</p>
                  <p className="text-4xl font-bold text-white">{totalUsers}</p>
                </div>
                <div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center">
                  <UserGroupIcon className="w-6 h-6 text-white" />
                </div>
              </div>
            </div>

            <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">Total Cards</p>
                  <p className="text-4xl font-bold text-white">{totalCards}</p>
                </div>
                <div className="w-12 h-12 bg-purple-500 rounded-lg flex items-center justify-center">
                  <CreditCardIcon className="w-6 h-6 text-white" />
                </div>
              </div>
            </div>

            <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">Total Views</p>
                  <p className="text-4xl font-bold text-white">{totalViews}</p>
                </div>
                <div className="w-12 h-12 bg-green-500 rounded-lg flex items-center justify-center">
                  <EyeIcon className="w-6 h-6 text-white" />
                </div>
              </div>
            </div>

            <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">Total Likes</p>
                  <p className="text-4xl font-bold text-white">{totalLikes}</p>
                </div>
                <div className="w-12 h-12 bg-red-500 rounded-lg flex items-center justify-center">
                  <HeartIcon className="w-6 h-6 text-white" />
                </div>
              </div>
            </div>
          </div>

          {/* User Roles Distribution */}
          <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20 mb-8">
            <h3 className="text-xl font-semibold text-white mb-4">User Roles Distribution</h3>
            <div className="grid grid-cols-3 gap-4">
              <div className="text-center p-4 bg-white/5 rounded-lg">
                <div className="w-10 h-10 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-2">
                  <ShieldCheckIcon className="w-5 h-5 text-red-400" />
                </div>
                <p className="text-2xl font-bold text-white">{adminUsers}</p>
                <p className="text-gray-400 text-sm">Admins</p>
              </div>
              <div className="text-center p-4 bg-white/5 rounded-lg">
                <div className="w-10 h-10 bg-purple-500/20 rounded-full flex items-center justify-center mx-auto mb-2">
                  <BuildingOfficeIcon className="w-5 h-5 text-purple-400" />
                </div>
                <p className="text-2xl font-bold text-white">{businessUsers}</p>
                <p className="text-gray-400 text-sm">Business</p>
              </div>
              <div className="text-center p-4 bg-white/5 rounded-lg">
                <div className="w-10 h-10 bg-blue-500/20 rounded-full flex items-center justify-center mx-auto mb-2">
                  <UserIcon className="w-5 h-5 text-blue-400" />
                </div>
                <p className="text-2xl font-bold text-white">{regularUsers}</p>
                <p className="text-gray-400 text-sm">Users</p>
              </div>
            </div>
          </div>

          {/* Tabs */}
          <div className="flex gap-4 mb-6">
            {['overview', 'users', 'cards'].map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-6 py-2 rounded-lg font-medium transition-all ${
                  activeTab === tab
                    ? 'bg-purple-600 text-white'
                    : 'bg-white/10 text-gray-300 hover:bg-white/20'
                }`}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </div>

          {/* Search */}
          {activeTab !== 'overview' && (
            <div className="relative mb-6">
              <MagnifyingGlassIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>
          )}

          {/* Content */}
          {activeTab === 'overview' && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Recent Users */}
              <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20">
                <h3 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
                  <UserGroupIcon className="w-5 h-5 text-blue-400" />
                  Recent Users
                </h3>
                <div className="space-y-3">
                  {users.slice(0, 5).map(u => (
                    <div key={u._id} className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                      <div>
                        <p className="text-white font-medium">{u.name || u.email}</p>
                        <p className="text-gray-400 text-sm">{u.role}</p>
                      </div>
                    </div>
                  ))}
                  {users.length === 0 && <p className="text-gray-400">No users found</p>}
                </div>
              </div>

              {/* Recent Cards */}
              <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20">
                <h3 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
                  <CreditCardIcon className="w-5 h-5 text-purple-400" />
                  Recent Cards
                </h3>
                <div className="space-y-3">
                  {cards.slice(0, 5).map(c => (
                    <div key={c._id} className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                      <div>
                        <p className="text-white font-medium">{c.title || c.fullName || 'Untitled'}</p>
                        <div className="flex gap-3 text-gray-400 text-sm">
                          <span className="flex items-center gap-1"><EyeIcon className="w-3 h-3" /> {c.views || 0}</span>
                          <span className="flex items-center gap-1"><HeartIcon className="w-3 h-3" /> {c.likes?.length || 0}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                  {cards.length === 0 && <p className="text-gray-400">No cards found</p>}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'users' && (
            <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20">
              <div className="space-y-3">
                {filteredUsers.map(u => (
                  <div key={u._id} className="flex items-center justify-between p-4 bg-white/5 rounded-lg">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 bg-purple-500/20 rounded-full flex items-center justify-center">
                        <UserIcon className="w-5 h-5 text-purple-400" />
                      </div>
                      <div>
                        <p className="text-white font-medium">{u.name || 'No name'}</p>
                        <p className="text-gray-400 text-sm">{u.email}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                        u.role === 'admin' ? 'bg-red-500/20 text-red-400' :
                        u.role === 'business' ? 'bg-purple-500/20 text-purple-400' :
                        'bg-blue-500/20 text-blue-400'
                      }`}>
                        {u.role}
                      </span>
                      <button
                        onClick={() => handleDeleteUser(u._id)}
                        className="p-2 text-red-400 hover:bg-red-500/20 rounded-lg transition-colors"
                      >
                        <TrashIcon className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                ))}
                {filteredUsers.length === 0 && <p className="text-gray-400 text-center py-8">No users found</p>}
              </div>
            </div>
          )}

          {activeTab === 'cards' && (
            <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20">
              <div className="space-y-3">
                {filteredCards.map(c => (
                  <div key={c._id} className="flex items-center justify-between p-4 bg-white/5 rounded-lg">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 bg-blue-500/20 rounded-full flex items-center justify-center">
                        <CreditCardIcon className="w-5 h-5 text-blue-400" />
                      </div>
                      <div>
                        <p className="text-white font-medium">{c.title || c.fullName || 'Untitled'}</p>
                        <div className="flex gap-3 text-gray-400 text-sm">
                          <span className="flex items-center gap-1"><EyeIcon className="w-3 h-3" /> {c.views || 0} views</span>
                          <span className="flex items-center gap-1"><HeartIcon className="w-3 h-3" /> {c.likes?.length || 0} likes</span>
                        </div>
                      </div>
                    </div>
                    <button
                      onClick={() => handleDeleteCard(c._id)}
                      className="p-2 text-red-400 hover:bg-red-500/20 rounded-lg transition-colors"
                    >
                      <TrashIcon className="w-5 h-5" />
                    </button>
                  </div>
                ))}
                {filteredCards.length === 0 && <p className="text-gray-400 text-center py-8">No cards found</p>}
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default AdminPage;
