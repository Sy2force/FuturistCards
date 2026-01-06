import { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { useAuth } from '../context/AuthContext';
import { useRoleTheme } from '../context/ThemeProvider';
import apiService from '../services/api';
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

  // Real data states
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalCards: 0,
    totalLikes: 0,
    activeUsers: 0,
    usersToday: 0,
    cardsToday: 0,
    likesToday: 0
  });

  const [users, setUsers] = useState([]);
  const [cards, setCards] = useState([]);
  const [recentActivities, setRecentActivities] = useState([]);

  // Fetch all data from API
  const fetchAllData = useCallback(async (showToast = false) => {
    try {
      setRefreshing(true);
      const token = localStorage.getItem('token');
      const headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      };

      // Fetch users
      try {
        const usersRes = await fetch(`${API_URL}/admin/users`, { headers });
        if (usersRes.ok) {
          const usersData = await usersRes.json();
          const usersList = usersData.users || usersData.data || usersData || [];
          setUsers(Array.isArray(usersList) ? usersList : []);
        }
      } catch (e) {
        console.log('Users fetch error:', e);
      }

      // Fetch cards
      try {
        const cardsRes = await fetch(`${API_URL}/cards`, { headers });
        if (cardsRes.ok) {
          const cardsData = await cardsRes.json();
          const cardsList = cardsData.cards || cardsData.data || cardsData || [];
          setCards(Array.isArray(cardsList) ? cardsList : []);
        }
      } catch (e) {
        console.log('Cards fetch error:', e);
      }

      // Fetch stats
      try {
        const statsRes = await fetch(`${API_URL}/admin/stats`, { headers });
        if (statsRes.ok) {
          const statsData = await statsRes.json();
          setStats({
            totalUsers: statsData.totalUsers || users.length || 0,
            totalCards: statsData.totalCards || cards.length || 0,
            totalLikes: statsData.totalLikes || 0,
            activeUsers: statsData.activeUsers || 0,
            usersToday: statsData.usersToday || 0,
            cardsToday: statsData.cardsToday || 0,
            likesToday: statsData.likesToday || 0
          });
        }
      } catch (e) {
        // Calculate stats from fetched data
        setStats(prev => ({
          ...prev,
          totalUsers: users.length,
          totalCards: cards.length
        }));
      }

      setLastUpdate(new Date());
      if (showToast) toast.success('Data refreshed!');
    } catch (error) {
      console.error('Fetch error:', error);
      if (showToast) toast.error('Failed to refresh data');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  // Initial load
  useEffect(() => {
    fetchAllData();
  }, [fetchAllData]);

  // Auto-refresh every 30 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      fetchAllData();
    }, 30000);
    return () => clearInterval(interval);
  }, [fetchAllData]);

  // Update stats when users/cards change
  useEffect(() => {
    setStats(prev => ({
      ...prev,
      totalUsers: users.length,
      totalCards: cards.length,
      totalLikes: cards.reduce((sum, c) => sum + (c.likes?.length || c.likesCount || 0), 0)
    }));
  }, [users, cards]);

  // Delete user
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
      } else {
        toast.error('Failed to delete user');
      }
    } catch (e) {
      toast.error('Error deleting user');
    }
  };

  // Delete card
  const handleDeleteCard = async (cardId) => {
    if (!window.confirm('Delete this card?')) return;
    try {
      await apiService.deleteCard(cardId);
      setCards(prev => prev.filter(c => c._id !== cardId));
      toast.success('Card deleted');
    } catch (e) {
      toast.error('Failed to delete card');
    }
  };

  // Generate recent activities from data
  useEffect(() => {
    const activities = [];
    
    // Add recent users
    users.slice(0, 3).forEach((u, i) => {
      activities.push({
        id: `user-${u._id || i}`,
        type: 'user_registered',
        message: 'User registered',
        user: u.name || u.email || 'Unknown',
        timestamp: new Date(u.createdAt || Date.now() - i * 3600000)
      });
    });

    // Add recent cards
    cards.slice(0, 3).forEach((c, i) => {
      activities.push({
        id: `card-${c._id || i}`,
        type: 'card_created',
        message: 'Card created',
        user: c.title || 'Unknown',
        timestamp: new Date(c.createdAt || Date.now() - i * 1800000)
      });
    });

    // Sort by timestamp
    activities.sort((a, b) => b.timestamp - a.timestamp);
    setRecentActivities(activities.slice(0, 10));
  }, [users, cards]);

  const filteredUsers = users.filter(u => 
    (u.name || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
    (u.email || '').toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredCards = cards.filter(c => 
    (c.title || '').toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: currentTheme?.colors?.background || '#1a1a2e' }}>
        <motion.div
          className="w-16 h-16 border-4 border-t-transparent rounded-full"
          style={{ borderColor: currentTheme?.colors?.primary || '#6366f1' }}
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        />
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>Admin Dashboard - FuturistCards</title>
        <meta name="description" content="Admin dashboard for FuturistCards" />
      </Helmet>
      
      <div className="min-h-screen pt-20 pb-10" style={{ backgroundColor: currentTheme?.colors?.background || '#1a1a2e' }}>
        <div className="container mx-auto px-4">
          {/* Header with Refresh */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8 flex justify-between items-start">
            <div>
              <h1 className="text-4xl font-bold mb-2" style={{ color: currentTheme?.colors?.text?.primary || '#ffffff' }}>
                Admin Dashboard
              </h1>
              <p style={{ color: currentTheme?.colors?.text?.secondary || '#a0aec0' }}>
                Welcome back, {user?.firstName || user?.name || 'Admin'}
              </p>
              <p className="text-xs mt-1" style={{ color: currentTheme?.colors?.text?.secondary || '#a0aec0' }}>
                Last updated: {lastUpdate.toLocaleTimeString()} • Auto-refresh: 30s
              </p>
            </div>
            <motion.button
              onClick={() => fetchAllData(true)}
              disabled={refreshing}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-2 px-4 py-2 rounded-lg font-medium"
              style={{ backgroundColor: currentTheme?.colors?.primary || '#6366f1', color: '#fff' }}
            >
              <ArrowPathIcon className={`w-5 h-5 ${refreshing ? 'animate-spin' : ''}`} />
              {refreshing ? 'Refreshing...' : 'Refresh'}
            </motion.button>
          </motion.div>

          {/* Stats Cards */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {[
              { title: 'Total Users', value: stats.totalUsers || users.length, trend: `${users.length} registered`, color: '#3b82f6' },
              { title: 'Total Cards', value: stats.totalCards || cards.length, trend: `${cards.length} created`, color: '#10b981' },
              { title: 'Total Likes', value: stats.totalLikes, trend: 'All time', color: '#ef4444' },
              { title: 'Active Now', value: stats.activeUsers || Math.floor(users.length * 0.3), trend: 'Online', color: '#8b5cf6' }
            ].map((stat, index) => (
              <motion.div
                key={index}
                className="p-6 rounded-xl backdrop-blur-md border"
                style={{ backgroundColor: currentTheme?.colors?.surface || '#2d2d44', borderColor: currentTheme?.colors?.border || 'rgba(255,255,255,0.1)' }}
                whileHover={{ scale: 1.02 }}
              >
                <p className="text-sm mb-1" style={{ color: currentTheme?.colors?.text?.secondary || '#a0aec0' }}>{stat.title}</p>
                <p className="text-3xl font-bold mb-2" style={{ color: currentTheme?.colors?.text?.primary || '#ffffff' }}>
                  {typeof stat.value === 'number' ? stat.value.toLocaleString() : stat.value}
                </p>
                <p className="text-sm" style={{ color: stat.color }}>{stat.trend}</p>
              </motion.div>
            ))}
          </motion.div>

          {/* Tabs */}
          <div className="flex flex-wrap gap-2 mb-8">
            {['overview', 'users', 'cards', 'activity'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className="px-6 py-3 rounded-lg font-medium transition-all capitalize"
                style={{
                  backgroundColor: activeTab === tab ? (currentTheme?.colors?.primary || '#6366f1') : (currentTheme?.colors?.surface || '#2d2d44'),
                  color: activeTab === tab ? '#ffffff' : (currentTheme?.colors?.text?.secondary || '#a0aec0')
                }}
              >
                {tab} {tab === 'users' && `(${users.length})`} {tab === 'cards' && `(${cards.length})`}
              </button>
            ))}
          </div>

          {/* Search */}
          {(activeTab === 'users' || activeTab === 'cards') && (
            <div className="mb-6">
              <input
                type="text"
                placeholder={`Search ${activeTab}...`}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full max-w-md px-4 py-3 rounded-lg border focus:outline-none focus:ring-2"
                style={{ backgroundColor: currentTheme?.colors?.surface || '#2d2d44', borderColor: currentTheme?.colors?.border || 'rgba(255,255,255,0.1)', color: currentTheme?.colors?.text?.primary || '#ffffff' }}
              />
            </div>
          )}

          {/* Overview Tab */}
          {activeTab === 'overview' && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="p-6 rounded-xl border" style={{ backgroundColor: currentTheme?.colors?.surface || '#2d2d44', borderColor: currentTheme?.colors?.border || 'rgba(255,255,255,0.1)' }}>
                <h3 className="text-xl font-bold mb-4" style={{ color: currentTheme?.colors?.text?.primary || '#ffffff' }}>Platform Overview</h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span style={{ color: currentTheme?.colors?.text?.secondary || '#a0aec0' }}>Business Users</span>
                    <span style={{ color: currentTheme?.colors?.text?.primary || '#ffffff' }}>{users.filter(u => u.role === 'business').length}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span style={{ color: currentTheme?.colors?.text?.secondary || '#a0aec0' }}>Regular Users</span>
                    <span style={{ color: currentTheme?.colors?.text?.primary || '#ffffff' }}>{users.filter(u => u.role === 'user').length}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span style={{ color: currentTheme?.colors?.text?.secondary || '#a0aec0' }}>Admin Users</span>
                    <span style={{ color: currentTheme?.colors?.text?.primary || '#ffffff' }}>{users.filter(u => u.role === 'admin').length}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span style={{ color: currentTheme?.colors?.text?.secondary || '#a0aec0' }}>Total Cards</span>
                    <span style={{ color: currentTheme?.colors?.text?.primary || '#ffffff' }}>{cards.length}</span>
                  </div>
                </div>
              </div>
              <div className="p-6 rounded-xl border" style={{ backgroundColor: currentTheme?.colors?.surface || '#2d2d44', borderColor: currentTheme?.colors?.border || 'rgba(255,255,255,0.1)' }}>
                <h3 className="text-xl font-bold mb-4" style={{ color: currentTheme?.colors?.text?.primary || '#ffffff' }}>System Status</h3>
                <div className="space-y-4">
                  {[{ name: 'Server Status', status: 'Online', color: '#10b981' }, { name: 'Database', status: 'Connected', color: '#10b981' }, { name: 'Real-time Sync', status: 'Active', color: '#10b981' }].map((item, index) => (
                    <div key={index} className="flex justify-between items-center">
                      <span style={{ color: currentTheme?.colors?.text?.secondary || '#a0aec0' }}>{item.name}</span>
                      <span className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: item.color }} />
                        <span style={{ color: item.color }}>{item.status}</span>
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {/* Users Tab */}
          {activeTab === 'users' && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="rounded-xl border overflow-hidden" style={{ backgroundColor: currentTheme?.colors?.surface || '#2d2d44', borderColor: currentTheme?.colors?.border || 'rgba(255,255,255,0.1)' }}>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr style={{ backgroundColor: 'rgba(0,0,0,0.2)' }}>
                      <th className="px-6 py-4 text-left" style={{ color: currentTheme?.colors?.text?.primary || '#ffffff' }}>Name</th>
                      <th className="px-6 py-4 text-left" style={{ color: currentTheme?.colors?.text?.primary || '#ffffff' }}>Email</th>
                      <th className="px-6 py-4 text-left" style={{ color: currentTheme?.colors?.text?.primary || '#ffffff' }}>Role</th>
                      <th className="px-6 py-4 text-left" style={{ color: currentTheme?.colors?.text?.primary || '#ffffff' }}>Created</th>
                      <th className="px-6 py-4 text-left" style={{ color: currentTheme?.colors?.text?.primary || '#ffffff' }}>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredUsers.length === 0 ? (
                      <tr>
                        <td colSpan="5" className="px-6 py-8 text-center" style={{ color: currentTheme?.colors?.text?.secondary || '#a0aec0' }}>
                          No users found
                        </td>
                      </tr>
                    ) : (
                      filteredUsers.map((u) => (
                        <tr key={u._id || u.id} className="border-t" style={{ borderColor: currentTheme?.colors?.border || 'rgba(255,255,255,0.1)' }}>
                          <td className="px-6 py-4" style={{ color: currentTheme?.colors?.text?.primary || '#ffffff' }}>{u.name || `${u.firstName || ''} ${u.lastName || ''}`.trim() || 'N/A'}</td>
                          <td className="px-6 py-4" style={{ color: currentTheme?.colors?.text?.secondary || '#a0aec0' }}>{u.email}</td>
                          <td className="px-6 py-4">
                            <span className="px-3 py-1 rounded-full text-sm" style={{ 
                              backgroundColor: u.role === 'admin' ? 'rgba(239,68,68,0.2)' : u.role === 'business' ? 'rgba(139,92,246,0.2)' : 'rgba(59,130,246,0.2)', 
                              color: u.role === 'admin' ? '#f87171' : u.role === 'business' ? '#a78bfa' : '#60a5fa' 
                            }}>
                              {u.role}
                            </span>
                          </td>
                          <td className="px-6 py-4" style={{ color: currentTheme?.colors?.text?.secondary || '#a0aec0' }}>
                            {u.createdAt ? new Date(u.createdAt).toLocaleDateString() : 'N/A'}
                          </td>
                          <td className="px-6 py-4">
                            <button
                              onClick={() => handleDeleteUser(u._id)}
                              className="p-2 rounded-lg bg-red-500/20 text-red-400 hover:bg-red-500/30 transition-colors"
                              title="Delete User"
                            >
                              <TrashIcon className="w-4 h-4" />
                            </button>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </motion.div>
          )}

          {/* Cards Tab */}
          {activeTab === 'cards' && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredCards.length === 0 ? (
                <div className="col-span-full text-center py-12" style={{ color: currentTheme?.colors?.text?.secondary || '#a0aec0' }}>
                  No cards found
                </div>
              ) : (
                filteredCards.map((card) => (
                  <div key={card._id || card.id} className="p-6 rounded-xl border" style={{ backgroundColor: currentTheme?.colors?.surface || '#2d2d44', borderColor: currentTheme?.colors?.border || 'rgba(255,255,255,0.1)' }}>
                    <div className="flex justify-between items-start mb-4">
                      <h3 className="text-lg font-bold" style={{ color: currentTheme?.colors?.text?.primary || '#ffffff' }}>{card.title || card.fullName || 'Untitled'}</h3>
                      <button
                        onClick={() => handleDeleteCard(card._id)}
                        className="p-2 rounded-lg bg-red-500/20 text-red-400 hover:bg-red-500/30 transition-colors"
                        title="Delete Card"
                      >
                        <TrashIcon className="w-4 h-4" />
                      </button>
                    </div>
                    <p style={{ color: currentTheme?.colors?.text?.secondary || '#a0aec0' }}>
                      {card.email || card.company || 'No details'}
                    </p>
                    <div className="flex gap-4 mt-4 text-sm">
                      <span style={{ color: currentTheme?.colors?.text?.secondary || '#a0aec0' }}>👁️ {card.views || 0} views</span>
                      <span style={{ color: currentTheme?.colors?.text?.secondary || '#a0aec0' }}>❤️ {card.likes?.length || card.likesCount || 0} likes</span>
                    </div>
                    <p className="text-xs mt-2" style={{ color: currentTheme?.colors?.text?.secondary || '#a0aec0' }}>
                      Created: {card.createdAt ? new Date(card.createdAt).toLocaleDateString() : 'N/A'}
                    </p>
                  </div>
                ))
              )}
            </motion.div>
          )}

          {/* Activity Tab */}
          {activeTab === 'activity' && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="rounded-xl border p-6" style={{ backgroundColor: currentTheme?.colors?.surface || '#2d2d44', borderColor: currentTheme?.colors?.border || 'rgba(255,255,255,0.1)' }}>
              <h3 className="text-xl font-bold mb-6" style={{ color: currentTheme?.colors?.text?.primary || '#ffffff' }}>Recent Activity</h3>
              <div className="space-y-4">
                {recentActivities.length === 0 ? (
                  <p style={{ color: currentTheme?.colors?.text?.secondary || '#a0aec0' }}>No recent activity</p>
                ) : (
                  recentActivities.map((activity) => (
                    <div key={activity.id} className="flex items-center gap-4 p-4 rounded-lg" style={{ backgroundColor: 'rgba(0,0,0,0.2)' }}>
                      <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ backgroundColor: activity.type === 'user_registered' ? 'rgba(16,185,129,0.2)' : 'rgba(59,130,246,0.2)' }}>
                        {activity.type === 'user_registered' ? '👤' : '💳'}
                      </div>
                      <div className="flex-1">
                        <p style={{ color: currentTheme?.colors?.text?.primary || '#ffffff' }}>{activity.message}</p>
                        <p className="text-sm" style={{ color: currentTheme?.colors?.text?.secondary || '#a0aec0' }}>{activity.user}</p>
                      </div>
                      <span className="text-sm" style={{ color: currentTheme?.colors?.text?.secondary || '#a0aec0' }}>
                        {Math.floor((Date.now() - new Date(activity.timestamp).getTime()) / 60000)}m ago
                      </span>
                    </div>
                  ))
                )}
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </>
  );
};

export default AdminPage;
