import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { useTranslation } from '../hooks/useTranslation';
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
  const { t } = useTranslation();
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
      
      // Récupérer les vraies données du localStorage
      const registeredUsers = JSON.parse(localStorage.getItem('registeredUsers') || '[]');
      const localCards = JSON.parse(localStorage.getItem('userCards') || '[]');
      
      // Transformer les données pour l'affichage admin
      const realUsers = registeredUsers.map(user => ({
        _id: user.id || user.email,
        name: `${user.firstName} ${user.lastName}`,
        email: user.email,
        role: user.role || 'user',
        status: 'active',
        createdAt: new Date(user.createdAt || Date.now())
      }));
      
      const realCards = localCards.map(card => ({
        _id: card.id,
        title: card.name || card.title || t('admin.cardNoName'),
        owner: card.createdBy || t('admin.user'),
        status: 'active',
        views: card.views || Math.floor(Math.random() * 200),
        likes: card.likes || Math.floor(Math.random() * 50),
        createdAt: new Date(card.createdAt || Date.now())
      }));
      
      // Simuler quelques rapports
      const mockReports = [
        { _id: '1', type: 'inappropriate', cardId: realCards[0]?._id, reportedBy: t('admin.anonymousUser'), status: 'pending', createdAt: new Date() },
        { _id: '2', type: 'spam', cardId: realCards[1]?._id, reportedBy: t('admin.registeredUser'), status: 'resolved', createdAt: new Date() }
      ];
      
      setUsers(realUsers);
      setCards(realCards);
      setReports(mockReports);
    } catch (error) {
      // Error handled silently in production
    } finally {
      setLoading(false);
    }
  };

  const handleUserAction = async (userId, action) => {
    try {
      // Mock API call
      setUsers(users.map(user => 
        user.id === userId 
          ? { ...user, status: action === 'suspend' ? 'suspended' : 'active' }
          : user
      ));
    } catch (error) {
      // Error handled silently in production
    }
  };

  const handleCardAction = async (cardId, action) => {
    try {
      // Mock API call
      setCards(cards.map(card => 
        card.id === cardId 
          ? { ...card, status: action === 'approve' ? 'active' : 'suspended' }
          : card
      ));
    } catch (error) {
      // Error handled silently in production
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
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center" dir="rtl">
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
        <title>{t('admin.title')} - FuturistCards</title>
        <meta name="description" content={t('admin.subtitle')} />
      </Helmet>
      
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 pt-20" dir="rtl">
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
                  {t('admin.title')}
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
                {t('admin.refreshData')}
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
              { title: t('admin.stats.totalUsers'), value: realTimeStats.totalUsers, icon: UserGroupIcon, color: 'text-blue-400', trend: '+' + realTimeStats.usersToday },
              { title: t('admin.stats.totalCards'), value: realTimeStats.totalCards, icon: CreditCardIcon, color: 'text-green-400', trend: '+' + realTimeStats.cardsToday },
              { title: t('admin.stats.totalLikes'), value: realTimeStats.totalLikes, icon: HeartIcon, color: 'text-red-400', trend: '+' + realTimeStats.likesToday },
              { title: t('admin.stats.activeUsers'), value: realTimeStats.activeUsers, icon: SignalIcon, color: 'text-emerald-400', trend: isConnected ? t('admin.connected') : t('admin.disconnected') }
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
                  <span className="text-xs text-gray-400">{t('admin.today')}</span>
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
              title={t('admin.charts.usersRealTime')} 
              color="blue" 
            />
            <RealTimeChart 
              data={realTimeStats.totalCards} 
              title={t('admin.charts.cardsRealTime')} 
              color="green" 
            />
            <RealTimeChart 
              data={realTimeStats.totalLikes} 
              title={t('admin.charts.likesRealTime')} 
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
                { id: 'overview', label: t('admin.tabs.overview') },
                { id: 'realtime', label: t('admin.tabs.realtime') },
                { id: 'users', label: t('admin.tabs.users') },
                { id: 'cards', label: t('admin.tabs.cards') },
                { id: 'reports', label: t('admin.tabs.reports') }
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
                <h3 className="text-xl font-bold text-white mb-6">{t('admin.quickActions')}</h3>
                <div className="space-y-4">
                  <GlassButton 
                    onClick={() => simulateActivity('user_registered', { 
                      message: t('admin.simulation.newUserMessage'), 
                      user: t('admin.simulation.newUser'),
                      icon: 'user' 
                    })}
                    className="w-full justify-center"
                  >
                    <UserGroupIcon className="h-5 w-5 ml-2" />
                    {t('admin.simulation.simulateNewUser')}
                  </GlassButton>
                  
                  <GlassButton 
                    onClick={() => simulateActivity('card_created', { 
                      message: t('admin.simulation.newCardMessage'), 
                      user: t('admin.simulation.cardCreator'),
                      icon: 'card' 
                    })}
                    className="w-full justify-center"
                  >
                    <CreditCardIcon className="h-5 w-5 ml-2" />
                    {t('admin.simulation.simulateNewCard')}
                  </GlassButton>
                  
                  <GlassButton 
                    onClick={() => simulateActivity('card_liked', { 
                      message: t('admin.simulation.newLikeMessage'), 
                      user: t('admin.simulation.fan'),
                      icon: 'like' 
                    })}
                    className="w-full justify-center"
                  >
                    <HeartIcon className="h-5 w-5 ml-2" />
                    {t('admin.simulation.simulateNewLike')}
                  </GlassButton>
                  
                  <GlassButton 
                    onClick={refreshStats}
                    className="w-full justify-center bg-green-500/20 border-green-500/30"
                  >
                    <ArrowPathIcon className="h-5 w-5 ml-2" />
                    {t('admin.refreshStats')}
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
                  title={t('admin.charts.viewsRealTime')} 
                  color="purple" 
                />
                <RealTimeChart 
                  data={realTimeStats.activeUsers} 
                  title={t('admin.charts.activeUsers')} 
                  color="orange" 
                />
              </div>
              
              {/* System Health */}
              <GlassCard className="p-6">
                <h3 className="text-xl font-bold text-white mb-6">{t('admin.systemStatus')}</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {[
                    { metric: t('admin.metrics.uptime'), value: '99.9%', status: 'good' },
                    { metric: t('admin.metrics.responseTime'), value: '120ms', status: 'good' },
                    { metric: t('admin.metrics.serverUsage'), value: '45%', status: 'warning' },
                    { metric: t('admin.metrics.databaseUsage'), value: '67%', status: 'good' }
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
                    placeholder={t('admin.searchUsers')}
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
                  <option value="all">{t('admin.filters.allStatuses')}</option>
                  <option value="active">{t('admin.filters.active')}</option>
                  <option value="suspended">{t('admin.filters.suspended')}</option>
                </select>
              </div>

              {/* Users Table */}
              <GlassCard className="overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-black/20">
                      <tr>
                        <th className="px-6 py-4 text-right text-white font-medium">{t('admin.table.name')}</th>
                        <th className="px-6 py-4 text-right text-white font-medium">{t('admin.table.email')}</th>
                        <th className="px-6 py-4 text-right text-white font-medium">{t('admin.table.role')}</th>
                        <th className="px-6 py-4 text-right text-white font-medium">{t('admin.table.status')}</th>
                        <th className="px-6 py-4 text-right text-white font-medium">{t('admin.table.cards')}</th>
                        <th className="px-6 py-4 text-right text-white font-medium">{t('admin.table.actions')}</th>
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
                              {user.role === 'business' ? t('admin.roles.business') : t('admin.roles.user')}
                            </span>
                          </td>
                          <td className="px-6 py-4">
                            <span className={`px-3 py-1 rounded-full text-sm ${
                              user.status === 'active' 
                                ? 'bg-green-500/20 text-green-300' 
                                : 'bg-red-500/20 text-red-300'
                            }`}>
                              {user.status === 'active' ? t('admin.status.active') : t('admin.status.suspended')}
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
                                {user.status === 'active' ? t('admin.actions.suspend') : t('admin.actions.activate')}
                              </button>
                              <button className="bg-blue-500/20 text-blue-300 hover:bg-blue-500/30 px-3 py-1 rounded text-sm">
                                {t('admin.actions.view')}
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
                    placeholder={t('admin.searchCards')}
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
                  <option value="all">{t('admin.filters.allStatuses')}</option>
                  <option value="active">{t('admin.filters.active')}</option>
                  <option value="reported">{t('admin.filters.reported')}</option>
                  <option value="suspended">{t('admin.filters.suspended')}</option>
                </select>
              </div>

              {/* Cards Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredCards.map((card) => (
                  <GlassCard key={card.id} className="p-6">
                    <div className="flex justify-between items-start mb-4">
                      <h3 className="text-lg font-bold text-white">{card.title}</h3>
                      <span className={`px-3 py-1 rounded-full text-sm ${
                        card.status === 'active' ? 'bg-green-500/20 text-green-300' :
                        card.status === 'reported' ? 'bg-yellow-500/20 text-yellow-300' :
                        'bg-red-500/20 text-red-300'
                      }`}>
                        {card.status === 'active' ? t('admin.status.active') : 
                         card.status === 'reported' ? t('admin.status.reported') : t('admin.status.suspended')}
                      </span>
                    </div>
                    
                    <p className="text-gray-300 text-sm">{t('admin.cardOwner')}: {card.owner}</p>
                    
                    <div className="flex justify-between items-center text-sm text-gray-400 mb-4">
                      <span>{card.views} {t('admin.views')}</span>
                      <span>{card.likes} {t('admin.likes')}</span>
                      {card.reports > 0 && (
                        <span className="text-red-400">{card.reports} {t('admin.reports')}</span>
                      )}
                    </div>
                    
                    <div className="flex space-x-2">
                      <button className="flex-1 bg-blue-500/20 text-blue-300 px-4 py-2 rounded hover:bg-blue-500/30 transition-colors flex items-center justify-center">
                        <EyeIcon className="h-4 w-4 ml-2" />
                        {t('admin.actions.view')}
                      </button>
                      <button
                        onClick={() => handleCardAction(card.id, card.status === 'active' ? 'suspend' : 'approve')}
                        className={`flex-1 px-4 py-2 rounded transition-colors flex items-center justify-center ${
                          card.status === 'active'
                            ? 'bg-red-500/20 text-red-300 hover:bg-red-500/30'
                            : 'bg-green-500/20 text-green-300 hover:bg-green-500/30'
                        }`}
                      >
                        {card.status === 'active' ? t('admin.actions.suspend') : t('admin.actions.approve')}
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
                  <h3 className="text-xl font-bold text-white">{t('admin.pendingReports')}</h3>
                </div>
                <div className="divide-y divide-white/10">
                  {reports.map((report) => (
                    <div key={report.id} className="p-6">
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h4 className="text-lg font-semibold text-white mb-2">{report.cardTitle}</h4>
                          <p className="text-gray-300 text-sm">{t('admin.reportedBy')}: {report.reportedBy}</p>
                          <p className="text-gray-300 text-sm">{t('admin.reason')}: {report.reason}</p>
                        </div>
                        <span className={`px-3 py-1 rounded-full text-sm ${
                          report.status === 'pending' ? 'bg-yellow-500/20 text-yellow-300' :
                          report.status === 'resolved' ? 'bg-green-500/20 text-green-300' :
                          'bg-red-500/20 text-red-300'
                        }`}>
                          {report.status === 'pending' ? t('admin.status.pending') : 
                           report.status === 'resolved' ? t('admin.status.resolved') : t('admin.status.rejected')}
                        </span>
                      </div>
                      
                      {report.status === 'pending' && (
                        <div className="flex space-x-2">
                          <button
                            onClick={() => handleReportAction(report.id, 'resolved')}
                            className="bg-green-500/20 text-green-300 px-4 py-2 rounded hover:bg-green-500/30 transition-colors"
                          >
                            {t('admin.actions.approveReport')}
                          </button>
                          <button
                            onClick={() => handleReportAction(report.id, 'rejected')}
                            className="bg-red-500/20 text-red-300 px-4 py-2 rounded hover:bg-red-500/30 transition-colors"
                          >
                            {t('admin.actions.rejectReport')}
                          </button>
                          <button className="bg-blue-500/20 text-blue-300 px-4 py-2 rounded hover:bg-blue-500/30 transition-colors">
                            {t('admin.actions.viewCard')}
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
