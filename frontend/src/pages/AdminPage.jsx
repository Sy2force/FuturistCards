import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { useAuth } from '../context/AuthContext';
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
  MagnifyingGlassIcon,
  ChartBarIcon,
  CalendarIcon,
  ClockIcon,
  ArrowTrendingUpIcon,
  ArrowTrendingDownIcon
} from '@heroicons/react/24/outline';

const API_URL = 'https://futuristcards.onrender.com/api';

const AdminPage = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('overview');
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [lastUpdate, setLastUpdate] = useState(new Date());

  const [users, setUsers] = useState([]);
  const [cards, setCards] = useState([]);

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
          headers: { 
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });
        if (usersRes.ok) {
          const usersData = await usersRes.json();
          setUsers(usersData.users || []);
        }
      }

      setLastUpdate(new Date());
      if (showToast) toast.success('Data refreshed!');
    } catch (error) {
      if (showToast) toast.error('Failed to refresh');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchData();
    const interval = setInterval(() => fetchData(), 15000); // Refresh every 15 seconds
    return () => clearInterval(interval);
  }, []);

  // Calculate REAL stats from data
  const totalUsers = users.length;
  const totalCards = cards.length;
  const totalLikes = cards.reduce((sum, c) => sum + (c.likes?.length || 0), 0);
  const totalViews = cards.reduce((sum, c) => sum + (c.views || 0), 0);
  const businessUsers = users.filter(u => u.role === 'business').length;
  const regularUsers = users.filter(u => u.role === 'user').length;
  const adminUsers = users.filter(u => u.role === 'admin').length;

  // Calculate engagement rate
  const engagementRate = totalViews > 0 ? ((totalLikes / totalViews) * 100).toFixed(1) : 0;
  const avgViewsPerCard = totalCards > 0 ? (totalViews / totalCards).toFixed(1) : 0;
  const avgLikesPerCard = totalCards > 0 ? (totalLikes / totalCards).toFixed(1) : 0;

  // Get recent activity (last 7 days)
  const now = new Date();
  const last7Days = Array.from({ length: 7 }, (_, i) => {
    const date = new Date(now);
    date.setDate(date.getDate() - (6 - i));
    return date.toISOString().split('T')[0];
  });

  // Count users created per day
  const usersPerDay = last7Days.map(day => 
    users.filter(u => u.createdAt?.startsWith(day)).length
  );

  // Count cards created per day
  const cardsPerDay = last7Days.map(day => 
    cards.filter(c => c.createdAt?.startsWith(day)).length
  );

  // Get today's stats
  const today = new Date().toISOString().split('T')[0];
  const usersToday = users.filter(u => u.createdAt?.startsWith(today)).length;
  const cardsToday = cards.filter(c => c.createdAt?.startsWith(today)).length;

  // Sort users and cards by creation date (most recent first)
  const recentUsers = [...users].sort((a, b) => 
    new Date(b.createdAt || 0) - new Date(a.createdAt || 0)
  );
  const recentCards = [...cards].sort((a, b) => 
    new Date(b.createdAt || 0) - new Date(a.createdAt || 0)
  );

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

  // Format date helper
  const formatDate = (dateStr) => {
    if (!dateStr) return 'N/A';
    const date = new Date(dateStr);
    return date.toLocaleDateString() + ' ' + date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  // Time ago helper
  const timeAgo = (dateStr) => {
    if (!dateStr) return 'N/A';
    const date = new Date(dateStr);
    const seconds = Math.floor((now - date) / 1000);
    if (seconds < 60) return 'Just now';
    if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`;
    if (seconds < 86400) return `${Math.floor(seconds / 3600)}h ago`;
    return `${Math.floor(seconds / 86400)}d ago`;
  };

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
              <p className="text-gray-400">Real-time analytics and management</p>
              <div className="flex items-center gap-2 mt-2">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <p className="text-xs text-green-400">
                  Live - Last update: {lastUpdate.toLocaleTimeString()} - Auto-refresh: 15s
                </p>
              </div>
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

          {/* Main Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">Total Users</p>
                  <p className="text-4xl font-bold text-white">{totalUsers}</p>
                  <p className="text-xs text-green-400 mt-1 flex items-center gap-1">
                    <ArrowTrendingUpIcon className="w-3 h-3" />
                    +{usersToday} today
                  </p>
                </div>
                <div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center">
                  <UserGroupIcon className="w-6 h-6 text-white" />
                </div>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">Total Cards</p>
                  <p className="text-4xl font-bold text-white">{totalCards}</p>
                  <p className="text-xs text-green-400 mt-1 flex items-center gap-1">
                    <ArrowTrendingUpIcon className="w-3 h-3" />
                    +{cardsToday} today
                  </p>
                </div>
                <div className="w-12 h-12 bg-purple-500 rounded-lg flex items-center justify-center">
                  <CreditCardIcon className="w-6 h-6 text-white" />
                </div>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">Total Views</p>
                  <p className="text-4xl font-bold text-white">{totalViews}</p>
                  <p className="text-xs text-gray-400 mt-1">
                    Avg: {avgViewsPerCard}/card
                  </p>
                </div>
                <div className="w-12 h-12 bg-green-500 rounded-lg flex items-center justify-center">
                  <EyeIcon className="w-6 h-6 text-white" />
                </div>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">Total Likes</p>
                  <p className="text-4xl font-bold text-white">{totalLikes}</p>
                  <p className="text-xs text-gray-400 mt-1">
                    Avg: {avgLikesPerCard}/card
                  </p>
                </div>
                <div className="w-12 h-12 bg-red-500 rounded-lg flex items-center justify-center">
                  <HeartIcon className="w-6 h-6 text-white" />
                </div>
              </div>
            </motion.div>
          </div>

          {/* Analytics Section */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            {/* User Roles Distribution */}
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20"
            >
              <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                <UserGroupIcon className="w-5 h-5 text-blue-400" />
                User Roles Distribution
              </h3>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-400 flex items-center gap-2">
                      <ShieldCheckIcon className="w-4 h-4 text-red-400" />
                      Admins
                    </span>
                    <span className="text-white font-bold">{adminUsers}</span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-2">
                    <div className="bg-red-500 h-2 rounded-full" style={{ width: `${totalUsers > 0 ? (adminUsers / totalUsers) * 100 : 0}%` }}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-400 flex items-center gap-2">
                      <BuildingOfficeIcon className="w-4 h-4 text-purple-400" />
                      Business
                    </span>
                    <span className="text-white font-bold">{businessUsers}</span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-2">
                    <div className="bg-purple-500 h-2 rounded-full" style={{ width: `${totalUsers > 0 ? (businessUsers / totalUsers) * 100 : 0}%` }}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-400 flex items-center gap-2">
                      <UserIcon className="w-4 h-4 text-blue-400" />
                      Users
                    </span>
                    <span className="text-white font-bold">{regularUsers}</span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-2">
                    <div className="bg-blue-500 h-2 rounded-full" style={{ width: `${totalUsers > 0 ? (regularUsers / totalUsers) * 100 : 0}%` }}></div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Activity Chart - Users */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20"
            >
              <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                <ChartBarIcon className="w-5 h-5 text-blue-400" />
                New Users (Last 7 Days)
              </h3>
              <div className="h-32 flex items-end justify-between gap-2">
                {usersPerDay.map((count, i) => (
                  <div key={i} className="flex-1 flex flex-col items-center">
                    <motion.div
                      initial={{ height: 0 }}
                      animate={{ height: `${Math.max((count / Math.max(...usersPerDay, 1)) * 100, 5)}%` }}
                      transition={{ duration: 0.5, delay: i * 0.1 }}
                      className="w-full bg-blue-500/60 rounded-t min-h-[4px]"
                    />
                    <span className="text-xs text-gray-500 mt-1">
                      {new Date(last7Days[i]).toLocaleDateString('en', { weekday: 'short' })}
                    </span>
                  </div>
                ))}
              </div>
              <p className="text-center text-sm text-gray-400 mt-2">
                Total: {usersPerDay.reduce((a, b) => a + b, 0)} new users this week
              </p>
            </motion.div>

            {/* Activity Chart - Cards */}
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20"
            >
              <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                <ChartBarIcon className="w-5 h-5 text-purple-400" />
                New Cards (Last 7 Days)
              </h3>
              <div className="h-32 flex items-end justify-between gap-2">
                {cardsPerDay.map((count, i) => (
                  <div key={i} className="flex-1 flex flex-col items-center">
                    <motion.div
                      initial={{ height: 0 }}
                      animate={{ height: `${Math.max((count / Math.max(...cardsPerDay, 1)) * 100, 5)}%` }}
                      transition={{ duration: 0.5, delay: i * 0.1 }}
                      className="w-full bg-purple-500/60 rounded-t min-h-[4px]"
                    />
                    <span className="text-xs text-gray-500 mt-1">
                      {new Date(last7Days[i]).toLocaleDateString('en', { weekday: 'short' })}
                    </span>
                  </div>
                ))}
              </div>
              <p className="text-center text-sm text-gray-400 mt-2">
                Total: {cardsPerDay.reduce((a, b) => a + b, 0)} new cards this week
              </p>
            </motion.div>
          </div>

          {/* Performance Metrics */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20 mb-8"
          >
            <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
              <ArrowTrendingUpIcon className="w-5 h-5 text-green-400" />
              Performance Metrics
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="text-center p-4 bg-white/5 rounded-lg">
                <p className="text-3xl font-bold text-blue-400">{engagementRate}%</p>
                <p className="text-gray-400 text-sm">Engagement Rate</p>
                <p className="text-xs text-gray-500">Likes / Views</p>
              </div>
              <div className="text-center p-4 bg-white/5 rounded-lg">
                <p className="text-3xl font-bold text-green-400">{avgViewsPerCard}</p>
                <p className="text-gray-400 text-sm">Avg Views/Card</p>
                <p className="text-xs text-gray-500">Total views / cards</p>
              </div>
              <div className="text-center p-4 bg-white/5 rounded-lg">
                <p className="text-3xl font-bold text-red-400">{avgLikesPerCard}</p>
                <p className="text-gray-400 text-sm">Avg Likes/Card</p>
                <p className="text-xs text-gray-500">Total likes / cards</p>
              </div>
              <div className="text-center p-4 bg-white/5 rounded-lg">
                <p className="text-3xl font-bold text-purple-400">
                  {totalUsers > 0 ? (totalCards / totalUsers).toFixed(1) : 0}
                </p>
                <p className="text-gray-400 text-sm">Cards/User</p>
                <p className="text-xs text-gray-500">Avg cards per user</p>
              </div>
            </div>
          </motion.div>

          {/* Tabs */}
          <div className="flex gap-4 mb-6 overflow-x-auto">
            {['overview', 'users', 'cards', 'activity'].map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-6 py-2 rounded-lg font-medium transition-all whitespace-nowrap ${
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
          {(activeTab === 'users' || activeTab === 'cards') && (
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
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20"
              >
                <h3 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
                  <UserGroupIcon className="w-5 h-5 text-blue-400" />
                  Recent Users
                  <span className="text-xs bg-blue-500/20 text-blue-400 px-2 py-1 rounded-full ml-auto">
                    {totalUsers} total
                  </span>
                </h3>
                <div className="space-y-3 max-h-96 overflow-y-auto">
                  {recentUsers.slice(0, 10).map(u => (
                    <div key={u._id} className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                          u.role === 'admin' ? 'bg-red-500/20' :
                          u.role === 'business' ? 'bg-purple-500/20' : 'bg-blue-500/20'
                        }`}>
                          <UserIcon className={`w-5 h-5 ${
                            u.role === 'admin' ? 'text-red-400' :
                            u.role === 'business' ? 'text-purple-400' : 'text-blue-400'
                          }`} />
                        </div>
                        <div>
                          <p className="text-white font-medium">{u.name || u.email?.split('@')[0] || 'User'}</p>
                          <p className="text-gray-400 text-xs">{u.email}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          u.role === 'admin' ? 'bg-red-500/20 text-red-400' :
                          u.role === 'business' ? 'bg-purple-500/20 text-purple-400' :
                          'bg-blue-500/20 text-blue-400'
                        }`}>
                          {u.role}
                        </span>
                        <p className="text-gray-500 text-xs mt-1 flex items-center gap-1 justify-end">
                          <ClockIcon className="w-3 h-3" />
                          {timeAgo(u.createdAt)}
                        </p>
                      </div>
                    </div>
                  ))}
                  {users.length === 0 && <p className="text-gray-400 text-center py-4">No users found</p>}
                </div>
              </motion.div>

              {/* Recent Cards */}
              <motion.div 
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20"
              >
                <h3 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
                  <CreditCardIcon className="w-5 h-5 text-purple-400" />
                  Recent Cards
                  <span className="text-xs bg-purple-500/20 text-purple-400 px-2 py-1 rounded-full ml-auto">
                    {totalCards} total
                  </span>
                </h3>
                <div className="space-y-3 max-h-96 overflow-y-auto">
                  {recentCards.slice(0, 10).map(c => (
                    <div key={c._id} className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-purple-500/20 rounded-full flex items-center justify-center">
                          <CreditCardIcon className="w-5 h-5 text-purple-400" />
                        </div>
                        <div>
                          <p className="text-white font-medium">{c.title || c.fullName || 'Untitled'}</p>
                          <p className="text-gray-400 text-xs">{c.email || 'No email'}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="flex gap-3 text-xs text-gray-400">
                          <span className="flex items-center gap-1">
                            <EyeIcon className="w-3 h-3" />
                            {c.views || 0}
                          </span>
                          <span className="flex items-center gap-1">
                            <HeartIcon className="w-3 h-3" />
                            {c.likes?.length || 0}
                          </span>
                        </div>
                        <p className="text-gray-500 text-xs mt-1 flex items-center gap-1 justify-end">
                          <ClockIcon className="w-3 h-3" />
                          {timeAgo(c.createdAt)}
                        </p>
                      </div>
                    </div>
                  ))}
                  {cards.length === 0 && <p className="text-gray-400 text-center py-4">No cards found</p>}
                </div>
              </motion.div>
            </div>
          )}

          {activeTab === 'users' && (
            <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20">
              <div className="space-y-3">
                {filteredUsers.map(u => (
                  <div key={u._id} className="flex items-center justify-between p-4 bg-white/5 rounded-lg">
                    <div className="flex items-center gap-4">
                      <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                        u.role === 'admin' ? 'bg-red-500/20' :
                        u.role === 'business' ? 'bg-purple-500/20' : 'bg-blue-500/20'
                      }`}>
                        <UserIcon className={`w-6 h-6 ${
                          u.role === 'admin' ? 'text-red-400' :
                          u.role === 'business' ? 'text-purple-400' : 'text-blue-400'
                        }`} />
                      </div>
                      <div>
                        <p className="text-white font-medium">{u.name || 'No name'}</p>
                        <p className="text-gray-400 text-sm">{u.email}</p>
                        <p className="text-gray-500 text-xs flex items-center gap-1">
                          <CalendarIcon className="w-3 h-3" />
                          Created: {formatDate(u.createdAt)}
                        </p>
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
                      <div className="w-12 h-12 bg-purple-500/20 rounded-full flex items-center justify-center">
                        <CreditCardIcon className="w-6 h-6 text-purple-400" />
                      </div>
                      <div>
                        <p className="text-white font-medium">{c.title || c.fullName || 'Untitled'}</p>
                        <p className="text-gray-400 text-sm">{c.email || 'No email'}</p>
                        <p className="text-gray-500 text-xs flex items-center gap-1">
                          <CalendarIcon className="w-3 h-3" />
                          Created: {formatDate(c.createdAt)}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        <div className="flex gap-4 text-sm">
                          <span className="text-gray-400 flex items-center gap-1">
                            <EyeIcon className="w-4 h-4" />
                            {c.views || 0} views
                          </span>
                          <span className="text-gray-400 flex items-center gap-1">
                            <HeartIcon className="w-4 h-4" />
                            {c.likes?.length || 0} likes
                          </span>
                        </div>
                      </div>
                      <button
                        onClick={() => handleDeleteCard(c._id)}
                        className="p-2 text-red-400 hover:bg-red-500/20 rounded-lg transition-colors"
                      >
                        <TrashIcon className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                ))}
                {filteredCards.length === 0 && <p className="text-gray-400 text-center py-8">No cards found</p>}
              </div>
            </div>
          )}

          {activeTab === 'activity' && (
            <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20">
              <h3 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
                <ClockIcon className="w-5 h-5 text-green-400" />
                Recent Activity Feed
              </h3>
              <div className="space-y-3 max-h-[600px] overflow-y-auto">
                {/* Combine and sort users and cards by creation date */}
                {[
                  ...recentUsers.map(u => ({ type: 'user', data: u, date: u.createdAt })),
                  ...recentCards.map(c => ({ type: 'card', data: c, date: c.createdAt }))
                ]
                  .sort((a, b) => new Date(b.date || 0) - new Date(a.date || 0))
                  .slice(0, 20)
                  .map((item, i) => (
                    <motion.div
                      key={`${item.type}-${item.data._id}`}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.05 }}
                      className="flex items-center gap-4 p-4 bg-white/5 rounded-lg"
                    >
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                        item.type === 'user' ? 'bg-blue-500/20' : 'bg-purple-500/20'
                      }`}>
                        {item.type === 'user' ? (
                          <UserIcon className="w-5 h-5 text-blue-400" />
                        ) : (
                          <CreditCardIcon className="w-5 h-5 text-purple-400" />
                        )}
                      </div>
                      <div className="flex-1">
                        <p className="text-white">
                          {item.type === 'user' ? (
                            <>
                              <span className="font-medium">{item.data.name || item.data.email?.split('@')[0]}</span>
                              <span className="text-gray-400"> created an account</span>
                              <span className={`ml-2 px-2 py-0.5 rounded-full text-xs ${
                                item.data.role === 'admin' ? 'bg-red-500/20 text-red-400' :
                                item.data.role === 'business' ? 'bg-purple-500/20 text-purple-400' :
                                'bg-blue-500/20 text-blue-400'
                              }`}>
                                {item.data.role}
                              </span>
                            </>
                          ) : (
                            <>
                              <span className="text-gray-400">New card created: </span>
                              <span className="font-medium">{item.data.title || item.data.fullName || 'Untitled'}</span>
                            </>
                          )}
                        </p>
                        <p className="text-gray-500 text-xs flex items-center gap-1">
                          <ClockIcon className="w-3 h-3" />
                          {formatDate(item.date)}
                        </p>
                      </div>
                    </motion.div>
                  ))}
                {users.length === 0 && cards.length === 0 && (
                  <p className="text-gray-400 text-center py-8">No activity yet</p>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default AdminPage;
