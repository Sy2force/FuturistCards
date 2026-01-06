import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { useAuth } from '../context/AuthContext';
import useRealTimeStats from '../hooks/useRealTimeStats';
import { 
  UserGroupIcon, 
  CreditCardIcon, 
  ShieldCheckIcon,
  ChartBarIcon,
  ExclamationTriangleIcon,
  CheckCircleIcon,
  XCircleIcon,
  EyeIcon,
  PencilIcon,
  TrashIcon,
  MagnifyingGlassIcon,
  FunnelIcon,
  ArrowPathIcon,
  HeartIcon,
  SignalIcon
} from '@heroicons/react/24/outline';
import GlassCard from '../components/ui/GlassCard';
import GlassButton from '../components/ui/GlassButton';
import RealTimeChart from '../components/admin/RealTimeChart';
import ActivityFeed from '../components/admin/ActivityFeed';

const AdminPage = () => {
  const { user } = useAuth();
  const { stats: realTimeStats, recentActivities, isConnected, simulateActivity, refreshStats } = useRealTimeStats();
  const [users, setUsers] = useState([]);
  const [cards, setCards] = useState([]);
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');

  useEffect(() => {
    fetchAdminData();
  }, []);

  const fetchAdminData = async () => {
    try {
      setLoading(true);
      
      // Fetch users and cards from API
      const [usersResponse, cardsResponse] = await Promise.all([
        apiService.getUsers().catch(() => ({ users: [] })),
        apiService.getAdminCards().catch(() => ({ cards: [] }))
      ]);
      
      const realUsers = (usersResponse.users || usersResponse.data || []).map(user => ({
        _id: user._id || user.id,
        name: user.name || `${user.firstName} ${user.lastName}`,
        email: user.email,
        role: user.role || 'user',
        status: user.status || 'active',
        createdAt: new Date(user.createdAt || Date.now()),
        cardsCount: user.cardsCount || 0
      }));
      
      const realCards = (cardsResponse.cards || cardsResponse.data || []).map(card => ({
        _id: card._id || card.id,
        title: card.title || 'Untitled',
        owner: card.user?.name || card.user?.email || 'Unknown',
        status: card.status || 'active',
        views: card.views || 0,
        likes: card.likes || 0,
        createdAt: new Date(card.createdAt || Date.now()),
        reports: card.reports || 0
      }));
      
      setUsers(realUsers);
      setCards(realCards);
      // setReports(fetchedReports); // Implement reports if API available
      
    } catch (error) {
      console.error('Admin data fetch error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleUserAction = async (userId, action) => {
    try {
      if (action === 'suspend' || action === 'activate') {
        // Implement status update API call if available
        // await apiService.updateUserStatus(userId, action);
        
        // Optimistic update
        setUsers(users.map(user => 
          (user._id === userId || user.id === userId)
            ? { ...user, status: action === 'suspend' ? 'suspended' : 'active' }
            : user
        ));
      }
    } catch (error) {
      console.error('User action error:', error);
    }
  };

  const handleCardAction = async (cardId, action) => {
    try {
      if (action === 'suspend' || action === 'approve') {
        // Implement status update API call if available
        // await apiService.updateCardStatus(cardId, action);
        
        setCards(cards.map(card => 
          (card._id === cardId || card.id === cardId)
            ? { ...card, status: action === 'approve' ? 'active' : 'suspended' }
            : card
        ));
      }
    } catch (error) {
      console.error('Card action error:', error);
    }
  };

  const handleReportAction = async (reportId, action) => {
    try {
      // Mock API call
      setReports(reports.map(report => 
        report.id === reportId 
          ? { ...report, status: action }
          : report
      ));
    } catch (error) {
      // Error handled silently in production
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-white"></div>
      </div>
    );
  }

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === 'all' || user.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const filteredCards = cards.filter(card => {
    const matchesSearch = card.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === 'all' || card.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  return (
    <>
      <Helmet>
        <title>{'Admin Dashboard'} - FuturistCards</title>
        <meta name="description" content={'subtitle'} />
      </Helmet>
      
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 pt-20">
        <div className="container mx-auto px-4 py-8">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <div className="flex justify-between items-center mb-6">
              <div>
                <h1 className="text-4xl font-bold text-white mb-2">
                  {'Admin Dashboard'}
                </h1>
                <p className="text-gray-300">
                  {t('admin.welcome', { name: user?.name })}
                </p>
              </div>
              <GlassButton 
                onClick={fetchAdminData}
                className="flex items-center"
              >
                <ArrowPathIcon className="h-5 w-5 ml-2" />
                {'refresh Data'}
              </GlassButton>
            </div>
          </motion.div>

          {/* Real-Time Stats Grid */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
          >
            {[
              { title: 'total Users', value: realTimeStats.totalUsers, icon: UserGroupIcon, color: 'text-blue-400', trend: '+' + realTimeStats.usersToday },
              { title: 'total Cards', value: realTimeStats.totalCards, icon: CreditCardIcon, color: 'text-green-400', trend: '+' + realTimeStats.cardsToday },
              { title: 'total Likes', value: realTimeStats.totalLikes, icon: HeartIcon, color: 'text-red-400', trend: '+' + realTimeStats.likesToday },
              { title: 'active Users', value: realTimeStats.activeUsers, icon: SignalIcon, color: 'text-emerald-400', trend: isConnected ? 'connected' : 'disconnected' }
            ].map((stat, index) => (
              <GlassCard key={index} className="p-6 hover:scale-105 transition-transform">
                <div className="flex items-center justify-between mb-2">
                  <div>
                    <p className="text-gray-300 text-sm">{stat.title}</p>
                    <p className="text-2xl font-bold text-white">{stat.value}</p>
                  </div>
                  <stat.icon className={`h-8 w-8 ${stat.color}`} />
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-400">{'today'}</span>
                  <span className={`text-xs ${stat.color} font-medium`}>{stat.trend}</span>
                </div>
              </GlassCard>
            ))}
          </motion.div>

          {/* Real-Time Charts */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8"
          >
            <RealTimeChart 
              data={realTimeStats.totalUsers} 
              title={'users Real Time'} 
              color="blue" 
            />
            <RealTimeChart 
              data={realTimeStats.totalCards} 
              title={'cards Real Time'} 
              color="green" 
            />
            <RealTimeChart 
              data={realTimeStats.totalLikes} 
              title={'likes Real Time'} 
              color="red" 
            />
          </motion.div>

          {/* Navigation Tabs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mb-8"
          >
            <div className="flex space-x-4 bg-black/20 rounded-lg p-2">
              {[
                { id: 'overview', label: 'overview' },
                { id: 'realtime', label: 'realtime' },
                { id: 'users', label: 'users' },
                { id: 'cards', label: 'cards' },
                { id: 'reports', label: 'reports' }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-6 py-3 rounded-lg transition-all ${
                    activeTab === tab.id
                      ? 'bg-blue-500/30 text-blue-300 border border-blue-500/50'
                      : 'text-gray-300 hover:text-white hover:bg-white/10'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </motion.div>

          {/* Content based on active tab */}
          {activeTab === 'overview' && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="grid grid-cols-1 lg:grid-cols-2 gap-8"
            >
              {/* Real-Time Activity Feed */}
              <ActivityFeed activities={recentActivities} isConnected={isConnected} />
              
              {/* Quick Actions */}
              <GlassCard className="p-6">
                <h3 className="text-xl font-bold text-white mb-6">{'quick Actions'}</h3>
                <div className="space-y-4">
                  <GlassButton 
                    onClick={() => simulateActivity('user_registered', { 
                      message: 'new User Message', 
                      user: 'new User',
                      icon: 'user' 
                    })}
                    className="w-full justify-center"
                  >
                    <UserGroupIcon className="h-5 w-5 ml-2" />
                    {'simulate New User'}
                  </GlassButton>
                  
                  <GlassButton 
                    onClick={() => simulateActivity('card_created', { 
                      message: 'new Card Message', 
                      user: 'card Creator',
                      icon: 'card' 
                    })}
                    className="w-full justify-center"
                  >
                    <CreditCardIcon className="h-5 w-5 ml-2" />
                    {'simulate New Card'}
                  </GlassButton>
                  
                  <GlassButton 
                    onClick={() => simulateActivity('card_liked', { 
                      message: 'new Like Message', 
                      user: 'fan',
                      icon: 'like' 
                    })}
                    className="w-full justify-center"
                  >
                    <HeartIcon className="h-5 w-5 ml-2" />
                    {'simulate New Like'}
                  </GlassButton>
                  
                  <GlassButton 
                    onClick={refreshStats}
                    className="w-full justify-center bg-green-500/20 border-green-500/30"
                  >
                    <ArrowPathIcon className="h-5 w-5 ml-2" />
                    {'refresh Stats'}
                  </GlassButton>
                </div>
              </GlassCard>
            </motion.div>
          )}

          {activeTab === 'realtime' && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="space-y-8"
            >
              {/* Extended Real-Time Charts */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <RealTimeChart 
                  data={realTimeStats.totalViews} 
                  title={'views Real Time'} 
                  color="purple" 
                />
                <RealTimeChart 
                  data={realTimeStats.activeUsers} 
                  title={'active Users'} 
                  color="orange" 
                />
              </div>
              
              {/* System Health */}
              <GlassCard className="p-6">
                <h3 className="text-xl font-bold text-white mb-6">{'system Status'}</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {[
                    { metric: 'uptime', value: '99.9%', status: 'good' },
                    { metric: 'response Time', value: '120ms', status: 'good' },
                    { metric: 'server Usage', value: '45%', status: 'warning' },
                    { metric: 'database Usage', value: '67%', status: 'good' }
                  ].map((metric, index) => (
                    <div key={index} className="p-4 bg-white/5 rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-gray-300 text-sm">{metric.metric}</span>
                        <div className={`w-3 h-3 rounded-full ${
                          metric.status === 'good' ? 'bg-green-400' : 
                          metric.status === 'warning' ? 'bg-yellow-400' : 'bg-red-400'
                        } animate-pulse`}></div>
                      </div>
                      <span className="text-white font-bold text-lg">{metric.value}</span>
                    </div>
                  ))}
                </div>
              </GlassCard>
            </motion.div>
          )}

          {activeTab === 'users' && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              {/* Search and Filter */}
              <div className="flex flex-col md:flex-row gap-4 mb-6">
                <div className="flex-1 relative">
                  <MagnifyingGlassIcon className="h-5 w-5 absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    placeholder={'search Users'}
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full bg-black/20 border border-white/20 rounded-lg px-10 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-blue-400"
                  />
                </div>
                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className="bg-black/20 border border-white/20 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-blue-400"
                >
                  <option value="all">{'all Statuses'}</option>
                  <option value="active">{'active'}</option>
                  <option value="suspended">{'suspended'}</option>
                </select>
              </div>

              {/* Users Table */}
              <GlassCard className="overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-black/20">
                      <tr>
                        <th className="px-6 py-4 text-right text-white font-medium">{'name'}</th>
                        <th className="px-6 py-4 text-right text-white font-medium">{'email'}</th>
                        <th className="px-6 py-4 text-right text-white font-medium">{'role'}</th>
                        <th className="px-6 py-4 text-right text-white font-medium">{'status'}</th>
                        <th className="px-6 py-4 text-right text-white font-medium">{'cards'}</th>
                        <th className="px-6 py-4 text-right text-white font-medium">{'actions'}</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredUsers.map((user) => (
                        <tr key={user.id} className="border-t border-white/10">
                          <td className="px-6 py-4 text-white">{user.name}</td>
                          <td className="px-6 py-4 text-gray-300">{user.email}</td>
                          <td className="px-6 py-4">
                            <span className={`px-3 py-1 rounded-full text-sm ${
                              user.role === 'business' 
                                ? 'bg-purple-500/20 text-purple-300' 
                                : 'bg-blue-500/20 text-blue-300'
                            }`}>
                              {user.role === 'business' ? 'business' : 'user'}
                            </span>
                          </td>
                          <td className="px-6 py-4">
                            <span className={`px-3 py-1 rounded-full text-sm ${
                              user.status === 'active' 
                                ? 'bg-green-500/20 text-green-300' 
                                : 'bg-red-500/20 text-red-300'
                            }`}>
                              {user.status === 'active' ? 'active' : 'suspended'}
                            </span>
                          </td>
                          <td className="px-6 py-4 text-white">{user.cardsCount}</td>
                          <td className="px-6 py-4">
                            <div className="flex space-x-2">
                              <button
                                onClick={() => handleUserAction(user.id, user.status === 'active' ? 'suspend' : 'activate')}
                                className={`px-3 py-1 rounded text-sm ${
                                  user.status === 'active'
                                    ? 'bg-red-500/20 text-red-300 hover:bg-red-500/30'
                                    : 'bg-green-500/20 text-green-300 hover:bg-green-500/30'
                                }`}
                              >
                                {user.status === 'active' ? 'suspend' : 'activate'}
                              </button>
                              <button className="bg-blue-500/20 text-blue-300 hover:bg-blue-500/30 px-3 py-1 rounded text-sm">
                                {'view'}
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </GlassCard>
            </motion.div>
          )}

          {activeTab === 'cards' && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              {/* Search and Filter */}
              <div className="flex flex-col md:flex-row gap-4 mb-6">
                <div className="flex-1 relative">
                  <MagnifyingGlassIcon className="h-5 w-5 absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    placeholder={'search Cards'}
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full bg-black/20 border border-white/20 rounded-lg px-10 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-blue-400"
                  />
                </div>
                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className="bg-black/20 border border-white/20 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-blue-400"
                >
                  <option value="all">{'all Statuses'}</option>
                  <option value="active">{'active'}</option>
                  <option value="reported">{'reported'}</option>
                  <option value="suspended">{'suspended'}</option>
                </select>
              </div>

              {/* Cards Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredCards.map((card) => (
                  <GlassCard key={card._id || card.id} className="p-6">
                    <div className="flex justify-between items-start mb-4">
                      <h3 className="text-lg font-bold text-white">{card.title}</h3>
                      <span className={`px-3 py-1 rounded-full text-sm ${
                        card.status === 'active' ? 'bg-green-500/20 text-green-300' :
                        card.status === 'reported' ? 'bg-yellow-500/20 text-yellow-300' :
                        'bg-red-500/20 text-red-300'
                      }`}>
                        {card.status === 'active' ? 'active' : 
                         card.status === 'reported' ? 'reported' : 'suspended'}
                      </span>
                    </div>
                    
                    <p className="text-gray-300 text-sm">{'card Owner'}: {card.owner}</p>
                    
                    <div className="flex justify-between items-center text-sm text-gray-400 mb-4">
                      <span>{card.views} {'views'}</span>
                      <span>{card.likes} {'likes'}</span>
                      {card.reports > 0 && (
                        <span className="text-red-400">{card.reports} {'Reports'}</span>
                      )}
                    </div>
                    
                    <div className="flex space-x-2">
                      <button className="flex-1 bg-blue-500/20 text-blue-300 px-4 py-2 rounded hover:bg-blue-500/30 transition-colors flex items-center justify-center">
                        <EyeIcon className="h-4 w-4 ml-2" />
                        {'view'}
                      </button>
                      <button
                        onClick={() => handleCardAction(card._id || card.id, card.status === 'active' ? 'suspend' : 'approve')}
                        className={`flex-1 px-4 py-2 rounded transition-colors flex items-center justify-center ${
                          card.status === 'active'
                            ? 'bg-red-500/20 text-red-300 hover:bg-red-500/30'
                            : 'bg-green-500/20 text-green-300 hover:bg-green-500/30'
                        }`}
                      >
                        {card.status === 'active' ? 'suspend' : 'approve'}
                      </button>
                    </div>
                  </GlassCard>
                ))}
              </div>
            </motion.div>
          )}

          {activeTab === 'reports' && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <GlassCard className="overflow-hidden">
                <div className="p-6 border-b border-white/10">
                  <h3 className="text-xl font-bold text-white">{'pending Reports'}</h3>
                </div>
                <div className="divide-y divide-white/10">
                  {reports.map((report) => (
                    <div key={report.id} className="p-6">
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h4 className="text-lg font-semibold text-white mb-2">{report.cardTitle}</h4>
                          <p className="text-gray-300 text-sm">{'reported By'}: {report.reportedBy}</p>
                          <p className="text-gray-300 text-sm">{'reason'}: {report.reason}</p>
                        </div>
                        <span className={`px-3 py-1 rounded-full text-sm ${
                          report.status === 'pending' ? 'bg-yellow-500/20 text-yellow-300' :
                          report.status === 'resolved' ? 'bg-green-500/20 text-green-300' :
                          'bg-red-500/20 text-red-300'
                        }`}>
                          {report.status === 'pending' ? 'pending' : 
                           report.status === 'resolved' ? 'resolved' : 'rejected'}
                        </span>
                      </div>
                      
                      {report.status === 'pending' && (
                        <div className="flex space-x-2">
                          <button
                            onClick={() => handleReportAction(report.id, 'resolved')}
                            className="bg-green-500/20 text-green-300 px-4 py-2 rounded hover:bg-green-500/30 transition-colors"
                          >
                            {'approve Report'}
                          </button>
                          <button
                            onClick={() => handleReportAction(report.id, 'rejected')}
                            className="bg-red-500/20 text-red-300 px-4 py-2 rounded hover:bg-red-500/30 transition-colors"
                          >
                            {'reject Report'}
                          </button>
                          <button className="bg-blue-500/20 text-blue-300 px-4 py-2 rounded hover:bg-blue-500/30 transition-colors">
                            {'view Card'}
                          </button>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </GlassCard>
            </motion.div>
          )}
        </div>
      </div>
    </>
  );
};

export default AdminPage;
