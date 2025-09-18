import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  ChartBarIcon,
  UserGroupIcon,
  CreditCardIcon,
  EyeIcon,
  TrendingUpIcon,
  TrendingDownIcon,
  CalendarIcon,
  MapPinIcon
} from '@heroicons/react/24/outline';

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalCards: 0,
    totalViews: 0,
    activeUsers: 0,
    newUsersToday: 0,
    newCardsToday: 0,
    viewsToday: 0,
    topCategories: [],
    recentActivity: [],
    userGrowth: []
  });

  const [timeRange, setTimeRange] = useState('7d');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, [timeRange]);

  const fetchDashboardData = async () => {
    setLoading(true);
    try {
      // Mock data - replace with real API calls
      const mockStats = {
        totalUsers: 1247,
        totalCards: 3892,
        totalViews: 15634,
        activeUsers: 342,
        newUsersToday: 23,
        newCardsToday: 67,
        viewsToday: 892,
        topCategories: [
          { name: 'Technology', count: 45, percentage: 35 },
          { name: 'Healthcare', count: 32, percentage: 25 },
          { name: 'Finance', count: 28, percentage: 22 },
          { name: 'Education', count: 23, percentage: 18 }
        ],
        recentActivity: [
          { id: 1, type: 'user_register', user: 'John Doe', time: '2 min ago' },
          { id: 2, type: 'card_created', user: 'Jane Smith', card: 'Tech Startup', time: '5 min ago' },
          { id: 3, type: 'card_liked', user: 'Mike Johnson', card: 'Medical Center', time: '8 min ago' },
          { id: 4, type: 'user_register', user: 'Sarah Wilson', time: '12 min ago' },
          { id: 5, type: 'card_viewed', user: 'Anonymous', card: 'Law Firm', time: '15 min ago' }
        ],
        userGrowth: [
          { date: '2024-01-01', users: 100 },
          { date: '2024-01-02', users: 120 },
          { date: '2024-01-03', users: 145 },
          { date: '2024-01-04', users: 167 },
          { date: '2024-01-05', users: 189 },
          { date: '2024-01-06', users: 210 },
          { date: '2024-01-07', users: 234 }
        ]
      };
      
      setStats(mockStats);
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  const StatCard = ({ title, value, change, icon: Icon, color = 'blue' }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass border border-white/20 rounded-2xl p-6"
    >
      <div className="flex items-center justify-between">
        <div>
          <p className="text-white/60 text-sm font-medium">{title}</p>
          <p className="text-white text-3xl font-bold mt-2">{value.toLocaleString()}</p>
          {change && (
            <div className="flex items-center mt-2">
              {change > 0 ? (
                <TrendingUpIcon className="h-4 w-4 text-green-400 mr-1" />
              ) : (
                <TrendingDownIcon className="h-4 w-4 text-red-400 mr-1" />
              )}
              <span className={`text-sm ${change > 0 ? 'text-green-400' : 'text-red-400'}`}>
                {Math.abs(change)}%
              </span>
            </div>
          )}
        </div>
        <div className={`p-3 rounded-xl bg-${color}-500/20`}>
          <Icon className={`h-8 w-8 text-${color}-400`} />
        </div>
      </div>
    </motion.div>
  );

  const ActivityItem = ({ activity }) => {
    const getActivityIcon = (type) => {
      switch (type) {
        case 'user_register':
          return <UserGroupIcon className="h-5 w-5 text-green-400" />;
        case 'card_created':
          return <CreditCardIcon className="h-5 w-5 text-blue-400" />;
        case 'card_liked':
          return <EyeIcon className="h-5 w-5 text-purple-400" />;
        case 'card_viewed':
          return <EyeIcon className="h-5 w-5 text-yellow-400" />;
        default:
          return <CalendarIcon className="h-5 w-5 text-gray-400" />;
      }
    };

    const getActivityText = (activity) => {
      switch (activity.type) {
        case 'user_register':
          return `${activity.user} s'est inscrit`;
        case 'card_created':
          return `${activity.user} a créé "${activity.card}"`;
        case 'card_liked':
          return `${activity.user} a aimé "${activity.card}"`;
        case 'card_viewed':
          return `${activity.user} a vu "${activity.card}"`;
        default:
          return 'Activité inconnue';
      }
    };

    return (
      <div className="flex items-center space-x-3 p-3 rounded-lg hover:bg-white/5 transition-colors">
        {getActivityIcon(activity.type)}
        <div className="flex-1">
          <p className="text-white/80 text-sm">{getActivityText(activity)}</p>
          <p className="text-white/40 text-xs">{activity.time}</p>
        </div>
      </div>
    );
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
        <div className="glass border border-white/20 rounded-2xl p-8">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-400 mx-auto mb-4"></div>
          <p className="text-white/80">Chargement du tableau de bord...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-green-400 bg-clip-text text-transparent mb-2">
            Tableau de Bord Admin
          </h1>
          <p className="text-white/70">Vue d'ensemble de la plateforme FuturistCards</p>
          
          {/* Time Range Selector */}
          <div className="flex space-x-2 mt-4">
            {['24h', '7d', '30d', '90d'].map((range) => (
              <button
                key={range}
                onClick={() => setTimeRange(range)}
                className={`px-4 py-2 rounded-lg transition-colors ${
                  timeRange === range
                    ? 'bg-blue-500/30 text-blue-400 border border-blue-500/50'
                    : 'bg-white/10 text-white/60 hover:bg-white/20'
                }`}
              >
                {range}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard
            title="Utilisateurs Total"
            value={stats.totalUsers}
            change={12.5}
            icon={UserGroupIcon}
            color="blue"
          />
          <StatCard
            title="Cartes Total"
            value={stats.totalCards}
            change={8.2}
            icon={CreditCardIcon}
            color="green"
          />
          <StatCard
            title="Vues Total"
            value={stats.totalViews}
            change={15.7}
            icon={EyeIcon}
            color="purple"
          />
          <StatCard
            title="Utilisateurs Actifs"
            value={stats.activeUsers}
            change={-2.1}
            icon={TrendingUpIcon}
            color="yellow"
          />
        </div>

        {/* Today's Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass border border-white/20 rounded-2xl p-6"
          >
            <h3 className="text-white font-semibold mb-4">Aujourd'hui</h3>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-white/60">Nouveaux utilisateurs</span>
                <span className="text-green-400 font-semibold">+{stats.newUsersToday}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-white/60">Nouvelles cartes</span>
                <span className="text-blue-400 font-semibold">+{stats.newCardsToday}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-white/60">Vues</span>
                <span className="text-purple-400 font-semibold">{stats.viewsToday}</span>
              </div>
            </div>
          </motion.div>

          {/* Top Categories */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="glass border border-white/20 rounded-2xl p-6"
          >
            <h3 className="text-white font-semibold mb-4">Top Catégories</h3>
            <div className="space-y-3">
              {stats.topCategories.map((category, index) => (
                <div key={index} className="flex items-center justify-between">
                  <span className="text-white/80 text-sm">{category.name}</span>
                  <div className="flex items-center space-x-2">
                    <div className="w-16 h-2 bg-white/20 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-blue-400 to-purple-400 rounded-full"
                        style={{ width: `${category.percentage}%` }}
                      />
                    </div>
                    <span className="text-white/60 text-xs">{category.count}</span>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Recent Activity */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="glass border border-white/20 rounded-2xl p-6"
          >
            <h3 className="text-white font-semibold mb-4">Activité Récente</h3>
            <div className="space-y-1 max-h-64 overflow-y-auto">
              {stats.recentActivity.map((activity) => (
                <ActivityItem key={activity.id} activity={activity} />
              ))}
            </div>
          </motion.div>
        </div>

        {/* User Growth Chart Placeholder */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="glass border border-white/20 rounded-2xl p-6"
        >
          <h3 className="text-white font-semibold mb-4">Croissance des Utilisateurs</h3>
          <div className="h-64 flex items-center justify-center border-2 border-dashed border-white/20 rounded-lg">
            <div className="text-center">
              <ChartBarIcon className="h-12 w-12 text-white/40 mx-auto mb-2" />
              <p className="text-white/60">Graphique de croissance</p>
              <p className="text-white/40 text-sm">Integration Chart.js à venir</p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default AdminDashboard;
