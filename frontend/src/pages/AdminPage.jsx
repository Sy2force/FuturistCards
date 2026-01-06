import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { useAuth } from '../context/AuthContext';
import { useRoleTheme } from '../context/ThemeProvider';

const AdminPage = () => {
  const { user } = useAuth();
  const { currentTheme } = useRoleTheme();
  const [activeTab, setActiveTab] = useState('overview');
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);

  // Mock data for demo
  const [stats] = useState({
    totalUsers: 1247,
    totalCards: 3892,
    totalLikes: 15420,
    activeUsers: 342,
    usersToday: 23,
    cardsToday: 45,
    likesToday: 156
  });

  const [users] = useState([
    { id: '1', name: 'John Doe', email: 'john@example.com', role: 'business', status: 'active', cardsCount: 5 },
    { id: '2', name: 'Sarah Smith', email: 'sarah@example.com', role: 'user', status: 'active', cardsCount: 2 },
    { id: '3', name: 'Michael Johnson', email: 'michael@example.com', role: 'business', status: 'inactive', cardsCount: 8 },
    { id: '4', name: 'Emily Davis', email: 'emily@example.com', role: 'user', status: 'active', cardsCount: 1 },
  ]);

  const [cards] = useState([
    { id: '1', title: 'Tech Solutions', owner: 'John Doe', status: 'active', views: 245, likes: 32 },
    { id: '2', title: 'Creative Design', owner: 'Sarah Smith', status: 'active', views: 189, likes: 28 },
    { id: '3', title: 'Business Consulting', owner: 'Michael Johnson', status: 'reported', views: 156, likes: 15 },
  ]);

  const [recentActivities] = useState([
    { id: 1, type: 'user_registered', message: 'New user registered', user: 'John Doe', timestamp: new Date() },
    { id: 2, type: 'card_created', message: 'New card created', user: 'Sarah Smith', timestamp: new Date(Date.now() - 300000) },
    { id: 3, type: 'card_liked', message: 'Card liked', user: 'Emily Davis', timestamp: new Date(Date.now() - 600000) },
  ]);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 500);
    return () => clearTimeout(timer);
  }, []);

  const filteredUsers = users.filter(u => 
    u.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    u.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredCards = cards.filter(c => 
    c.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div 
        className="min-h-screen flex items-center justify-center"
        style={{ backgroundColor: currentTheme?.colors?.background || '#1a1a2e' }}
      >
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
      
      <div 
        className="min-h-screen pt-20 pb-10"
        style={{ backgroundColor: currentTheme?.colors?.background || '#1a1a2e' }}
      >
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <h1 
              className="text-4xl font-bold mb-2"
              style={{ color: currentTheme?.colors?.text?.primary || '#ffffff' }}
            >
              Admin Dashboard
            </h1>
            <p style={{ color: currentTheme?.colors?.text?.secondary || '#a0aec0' }}>
              Welcome back, {user?.firstName || user?.name || 'Admin'}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
          >
            {[
              { title: 'Total Users', value: stats.totalUsers, trend: '+' + stats.usersToday + ' today', color: '#3b82f6' },
              { title: 'Total Cards', value: stats.totalCards, trend: '+' + stats.cardsToday + ' today', color: '#10b981' },
              { title: 'Total Likes', value: stats.totalLikes, trend: '+' + stats.likesToday + ' today', color: '#ef4444' },
              { title: 'Active Users', value: stats.activeUsers, trend: 'Online now', color: '#8b5cf6' }
            ].map((stat, index) => (
              <motion.div
                key={index}
                className="p-6 rounded-xl backdrop-blur-md border"
                style={{
                  backgroundColor: currentTheme?.colors?.surface || '#2d2d44',
                  borderColor: currentTheme?.colors?.border || 'rgba(255,255,255,0.1)'
                }}
                whileHover={{ scale: 1.02 }}
              >
                <p className="text-sm mb-1" style={{ color: currentTheme?.colors?.text?.secondary || '#a0aec0' }}>
                  {stat.title}
                </p>
                <p className="text-3xl font-bold mb-2" style={{ color: currentTheme?.colors?.text?.primary || '#ffffff' }}>
                  {stat.value.toLocaleString()}
                </p>
                <p className="text-sm" style={{ color: stat.color }}>{stat.trend}</p>
              </motion.div>
            ))}
          </motion.div>

          <div className="flex flex-wrap gap-2 mb-8">
            {['overview', 'users', 'cards', 'activity'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className="px-6 py-3 rounded-lg font-medium transition-all capitalize"
                style={{
                  backgroundColor: activeTab === tab 
                    ? (currentTheme?.colors?.primary || '#6366f1')
                    : (currentTheme?.colors?.surface || '#2d2d44'),
                  color: activeTab === tab ? '#ffffff' : (currentTheme?.colors?.text?.secondary || '#a0aec0')
                }}
              >
                {tab}
              </button>
            ))}
          </div>

          {(activeTab === 'users' || activeTab === 'cards') && (
            <div className="mb-6">
              <input
                type="text"
                placeholder={'Search ' + activeTab + '...'}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full max-w-md px-4 py-3 rounded-lg border focus:outline-none focus:ring-2"
                style={{
                  backgroundColor: currentTheme?.colors?.surface || '#2d2d44',
                  borderColor: currentTheme?.colors?.border || 'rgba(255,255,255,0.1)',
                  color: currentTheme?.colors?.text?.primary || '#ffffff'
                }}
              />
            </div>
          )}

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
                    <span style={{ color: currentTheme?.colors?.text?.secondary || '#a0aec0' }}>Active Cards</span>
                    <span style={{ color: currentTheme?.colors?.text?.primary || '#ffffff' }}>{cards.filter(c => c.status === 'active').length}</span>
                  </div>
                </div>
              </div>
              <div className="p-6 rounded-xl border" style={{ backgroundColor: currentTheme?.colors?.surface || '#2d2d44', borderColor: currentTheme?.colors?.border || 'rgba(255,255,255,0.1)' }}>
                <h3 className="text-xl font-bold mb-4" style={{ color: currentTheme?.colors?.text?.primary || '#ffffff' }}>System Status</h3>
                <div className="space-y-4">
                  {[{ name: 'Server Status', status: 'Online', color: '#10b981' }, { name: 'Database', status: 'Connected', color: '#10b981' }, { name: 'API Response', status: '120ms', color: '#10b981' }].map((item, index) => (
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

          {activeTab === 'users' && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="rounded-xl border overflow-hidden" style={{ backgroundColor: currentTheme?.colors?.surface || '#2d2d44', borderColor: currentTheme?.colors?.border || 'rgba(255,255,255,0.1)' }}>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr style={{ backgroundColor: 'rgba(0,0,0,0.2)' }}>
                      <th className="px-6 py-4 text-left" style={{ color: currentTheme?.colors?.text?.primary || '#ffffff' }}>Name</th>
                      <th className="px-6 py-4 text-left" style={{ color: currentTheme?.colors?.text?.primary || '#ffffff' }}>Email</th>
                      <th className="px-6 py-4 text-left" style={{ color: currentTheme?.colors?.text?.primary || '#ffffff' }}>Role</th>
                      <th className="px-6 py-4 text-left" style={{ color: currentTheme?.colors?.text?.primary || '#ffffff' }}>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredUsers.map((u) => (
                      <tr key={u.id} className="border-t" style={{ borderColor: currentTheme?.colors?.border || 'rgba(255,255,255,0.1)' }}>
                        <td className="px-6 py-4" style={{ color: currentTheme?.colors?.text?.primary || '#ffffff' }}>{u.name}</td>
                        <td className="px-6 py-4" style={{ color: currentTheme?.colors?.text?.secondary || '#a0aec0' }}>{u.email}</td>
                        <td className="px-6 py-4"><span className="px-3 py-1 rounded-full text-sm" style={{ backgroundColor: u.role === 'business' ? 'rgba(139,92,246,0.2)' : 'rgba(59,130,246,0.2)', color: u.role === 'business' ? '#a78bfa' : '#60a5fa' }}>{u.role}</span></td>
                        <td className="px-6 py-4"><span className="px-3 py-1 rounded-full text-sm" style={{ backgroundColor: u.status === 'active' ? 'rgba(16,185,129,0.2)' : 'rgba(239,68,68,0.2)', color: u.status === 'active' ? '#34d399' : '#f87171' }}>{u.status}</span></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </motion.div>
          )}

          {activeTab === 'cards' && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredCards.map((card) => (
                <div key={card.id} className="p-6 rounded-xl border" style={{ backgroundColor: currentTheme?.colors?.surface || '#2d2d44', borderColor: currentTheme?.colors?.border || 'rgba(255,255,255,0.1)' }}>
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-lg font-bold" style={{ color: currentTheme?.colors?.text?.primary || '#ffffff' }}>{card.title}</h3>
                    <span className="px-3 py-1 rounded-full text-sm" style={{ backgroundColor: card.status === 'active' ? 'rgba(16,185,129,0.2)' : 'rgba(245,158,11,0.2)', color: card.status === 'active' ? '#34d399' : '#fbbf24' }}>{card.status}</span>
                  </div>
                  <p style={{ color: currentTheme?.colors?.text?.secondary || '#a0aec0' }}>Owner: {card.owner}</p>
                  <div className="flex gap-4 mt-4 text-sm">
                    <span style={{ color: currentTheme?.colors?.text?.secondary || '#a0aec0' }}>👁️ {card.views} views</span>
                    <span style={{ color: currentTheme?.colors?.text?.secondary || '#a0aec0' }}>❤️ {card.likes} likes</span>
                  </div>
                </div>
              ))}
            </motion.div>
          )}

          {activeTab === 'activity' && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="rounded-xl border p-6" style={{ backgroundColor: currentTheme?.colors?.surface || '#2d2d44', borderColor: currentTheme?.colors?.border || 'rgba(255,255,255,0.1)' }}>
              <h3 className="text-xl font-bold mb-6" style={{ color: currentTheme?.colors?.text?.primary || '#ffffff' }}>Recent Activity</h3>
              <div className="space-y-4">
                {recentActivities.map((activity) => (
                  <div key={activity.id} className="flex items-center gap-4 p-4 rounded-lg" style={{ backgroundColor: 'rgba(0,0,0,0.2)' }}>
                    <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ backgroundColor: activity.type === 'user_registered' ? 'rgba(16,185,129,0.2)' : activity.type === 'card_created' ? 'rgba(59,130,246,0.2)' : 'rgba(239,68,68,0.2)' }}>
                      {activity.type === 'user_registered' ? '👤' : activity.type === 'card_created' ? '💳' : '❤️'}
                    </div>
                    <div className="flex-1">
                      <p style={{ color: currentTheme?.colors?.text?.primary || '#ffffff' }}>{activity.message}</p>
                      <p className="text-sm" style={{ color: currentTheme?.colors?.text?.secondary || '#a0aec0' }}>by {activity.user}</p>
                    </div>
                    <span className="text-sm" style={{ color: currentTheme?.colors?.text?.secondary || '#a0aec0' }}>{Math.floor((Date.now() - activity.timestamp) / 60000)}m ago</span>
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </>
  );
};

export default AdminPage;
// Deployment trigger Tue Jan  6 13:39:38 IST 2026
