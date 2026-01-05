import { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useRoleTheme } from '../../context/ThemeProvider';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';

const StatCard = ({ title, value, icon, color, change, theme }) => (
  <motion.div
    className="glass-card p-6 rounded-xl"
    style={{
      backgroundColor: theme.colors.surface,
      borderColor: theme.colors.border
    }}
    whileHover={{ scale: 1.02 }}
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.3 }}
  >
    <div className="flex items-center justify-between">
      <div>
        <p className="text-sm font-medium" style={{ color: theme.colors.text.secondary }}>
          {title}
        </p>
        <p className="text-3xl font-bold mt-2" style={{ color: theme.colors.text.primary }}>
          {value.toLocaleString()}
        </p>
        {change && (
          <p className={`text-sm mt-1 ${change >= 0 ? 'text-green-500' : 'text-red-500'}`}>
            {change >= 0 ? '+' : ''}{change}% from last month
          </p>
        )}
      </div>
      <div
        className="w-12 h-12 rounded-lg flex items-center justify-center"
        style={{ backgroundColor: color + '20' }}
      >
        <span className="text-2xl">{icon}</span>
      </div>
    </div>
  </motion.div>
);

const AnalyticsPage = () => {
  const { user } = useAuth();
  const { currentTheme } = useRoleTheme();
  const [analyticsData, setAnalyticsData] = useState({
    totalUsers: 0,
    totalCards: 0,
    totalViews: 0,
    activeUsers: 0,
    recentActivity: [],
    userGrowth: [],
    cardCreation: []
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading analytics data
    const timer = setTimeout(() => {
      setAnalyticsData({
        totalUsers: 1247,
        totalCards: 3892,
        totalViews: 28456,
        activeUsers: 342,
        recentActivity: [
          { id: 1, type: 'card_created', user: 'John Doe', timestamp: '2 minutes ago' },
          { id: 2, type: 'user_registered', user: 'Sarah Smith', timestamp: '5 minutes ago' },
          { id: 3, type: 'card_viewed', user: 'Michael Johnson', timestamp: '8 minutes ago' },
          { id: 4, type: 'card_shared', user: 'Emily Davis', timestamp: '12 minutes ago' }
        ],
        userGrowth: [120, 135, 142, 158, 167, 189, 201],
        cardCreation: [45, 52, 48, 63, 71, 89, 94]
      });
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <motion.div
          className="w-16 h-16 border-4 border-t-transparent rounded-full"
          style={{ borderColor: currentTheme.colors.primary }}
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        />
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>Analytics | FuturistCards</title>
        <meta name="description" content="Analytics dashboard for FuturistCards platform insights" />
      </Helmet>

      <div
        className="min-h-screen p-6"
        style={{ backgroundColor: currentTheme.colors.background }}
      >
        <div className="max-w-7xl mx-auto">
          <div className="mb-8">
            <h1 
              className="text-4xl font-bold mb-2"
              style={{ color: currentTheme.colors.text.primary }}
            >
              Analytics Dashboard
            </h1>
            <p 
              className="text-lg"
              style={{ color: currentTheme.colors.text.secondary }}
            >
              Monitor platform performance and user engagement
            </p>
          </div>

          {/* Stats Overview */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <StatCard
              title="Total Users"
              value={analyticsData.totalUsers}
              icon="👥"
              color={currentTheme.colors.primary}
              change={12.5}
              theme={currentTheme}
            />
            <StatCard
              title="Total Cards"
              value={analyticsData.totalCards}
              icon="💳"
              color={currentTheme.colors.accent}
              change={8.3}
              theme={currentTheme}
            />
            <StatCard
              title="Total Views"
              value={analyticsData.totalViews}
              icon="👁️"
              color="#10B981"
              change={15.7}
              theme={currentTheme}
            />
            <StatCard
              title="Active Users"
              value={analyticsData.activeUsers}
              icon="⚡"
              color="#F59E0B"
              change={-2.1}
              theme={currentTheme}
            />
          </div>

          {/* Charts Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            <motion.div
              className="glass-card p-6 rounded-xl"
              style={{
                backgroundColor: currentTheme.colors.surface,
                borderColor: currentTheme.colors.border
              }}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h3 className="text-xl font-semibold mb-4" style={{ color: currentTheme.colors.text.primary }}>
                User Growth (Last 7 Days)
              </h3>
              <div className="h-48 flex items-end space-x-2">
                {analyticsData.userGrowth.map((value, index) => (
                  <motion.div
                    key={index}
                    className="flex-1 rounded-t"
                    style={{ 
                      backgroundColor: currentTheme.colors.primary + '60',
                      height: `${(value / Math.max(...analyticsData.userGrowth)) * 100}%`
                    }}
                    initial={{ height: 0 }}
                    animate={{ height: `${(value / Math.max(...analyticsData.userGrowth)) * 100}%` }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  />
                ))}
              </div>
            </motion.div>

            <motion.div
              className="glass-card p-6 rounded-xl"
              style={{
                backgroundColor: currentTheme.colors.surface,
                borderColor: currentTheme.colors.border
              }}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h3 className="text-xl font-semibold mb-4" style={{ color: currentTheme.colors.text.primary }}>
                Card Creation (Last 7 Days)
              </h3>
              <div className="h-48 flex items-end space-x-2">
                {analyticsData.cardCreation.map((value, index) => (
                  <motion.div
                    key={index}
                    className="flex-1 rounded-t"
                    style={{ 
                      backgroundColor: currentTheme.colors.accent + '60',
                      height: `${(value / Math.max(...analyticsData.cardCreation)) * 100}%`
                    }}
                    initial={{ height: 0 }}
                    animate={{ height: `${(value / Math.max(...analyticsData.cardCreation)) * 100}%` }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  />
                ))}
              </div>
            </motion.div>
          </div>

          {/* Recent Activity */}
          <motion.div
            className="glass-card p-6 rounded-xl"
            style={{
              backgroundColor: currentTheme.colors.surface,
              borderColor: currentTheme.colors.border
            }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <h3 className="text-xl font-semibold mb-4" style={{ color: currentTheme.colors.text.primary }}>
              Recent Activity
            </h3>
            <div className="space-y-3">
              {analyticsData.recentActivity.map((activity) => (
                <div
                  key={activity.id}
                  className="flex items-center justify-between p-3 rounded-lg"
                  style={{ backgroundColor: currentTheme.colors.background + '50' }}
                >
                  <div className="flex items-center space-x-3">
                    <div
                      className="w-2 h-2 rounded-full"
                      style={{ backgroundColor: currentTheme.colors.primary }}
                    />
                    <div>
                      <p style={{ color: currentTheme.colors.text.primary }}>
                        <span className="font-medium">{activity.user}</span> {activity.type.replace('_', ' ')}
                      </p>
                      <p className="text-sm" style={{ color: currentTheme.colors.text.secondary }}>
                        {activity.timestamp}
                      </p>
                    </div>
                  </div>
                  <div
                    className="text-xs px-2 py-1 rounded-full"
                    style={{
                      backgroundColor: currentTheme.colors.primary + '20',
                      color: currentTheme.colors.primary
                    }}
                  >
                    {activity.type}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </>
  );
};

export default AnalyticsPage;
