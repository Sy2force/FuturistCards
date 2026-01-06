import { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useRoleTheme } from '../../context/ThemeProvider';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import {
  CreditCardIcon,
  EyeIcon,
  HeartIcon,
  UserIcon,
  CalendarIcon,
  ChartBarIcon
} from '@heroicons/react/24/outline';

const API_URL = 'https://futuristcards.onrender.com/api';

const StatCard = ({ title, value, icon: Icon, color, theme }) => (
  <motion.div
    className="p-6 rounded-xl backdrop-blur-md border"
    style={{
      backgroundColor: theme?.colors?.surface || '#2d2d44',
      borderColor: theme?.colors?.border || 'rgba(255,255,255,0.1)'
    }}
    whileHover={{ scale: 1.02 }}
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.3 }}
  >
    <div className="flex items-center justify-between">
      <div>
        <p className="text-sm font-medium" style={{ color: theme?.colors?.text?.secondary || '#a0aec0' }}>
          {title}
        </p>
        <p className="text-3xl font-bold mt-2" style={{ color: theme?.colors?.text?.primary || '#ffffff' }}>
          {typeof value === 'number' ? value.toLocaleString() : value}
        </p>
      </div>
      <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${color}`}>
        <Icon className="w-6 h-6 text-white" />
      </div>
    </div>
  </motion.div>
);

const AnalyticsPage = () => {
  const { user } = useAuth();
  const { currentTheme } = useRoleTheme();
  const [loading, setLoading] = useState(true);
  const [cards, setCards] = useState([]);
  const [lastUpdate, setLastUpdate] = useState(new Date());

  const fetchData = async () => {
    try {
      const res = await fetch(`${API_URL}/cards`);
      if (res.ok) {
        const data = await res.json();
        setCards(data.cards || []);
      }
      setLastUpdate(new Date());
    } catch (e) {
      // Silent error
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
    const interval = setInterval(fetchData, 30000);
    return () => clearInterval(interval);
  }, []);

  // Calculate real stats
  const totalCards = cards.length;
  const totalViews = cards.reduce((sum, c) => sum + (c.views || 0), 0);
  const totalLikes = cards.reduce((sum, c) => sum + (c.likes?.length || 0), 0);
  const myCards = cards.filter(c => c.user?._id === user?._id || c.user === user?._id).length;

  // Generate chart data from real cards
  const last7Days = Array.from({ length: 7 }, (_, i) => {
    const date = new Date();
    date.setDate(date.getDate() - (6 - i));
    return date.toISOString().split('T')[0];
  });

  const cardsByDay = last7Days.map(day => 
    cards.filter(c => c.createdAt?.startsWith(day)).length
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
        <title>Analytics | FuturistCards</title>
        <meta name="description" content="Analytics dashboard for FuturistCards" />
      </Helmet>

      <div className="min-h-screen pt-20 pb-10" style={{ backgroundColor: currentTheme?.colors?.background || '#1a1a2e' }}>
        <div className="container mx-auto px-4">
          <div className="mb-8">
            <h1 className="text-4xl font-bold mb-2" style={{ color: currentTheme?.colors?.text?.primary || '#ffffff' }}>
              Analytics Dashboard
            </h1>
            <p style={{ color: currentTheme?.colors?.text?.secondary || '#a0aec0' }}>
              Monitor your cards performance and engagement
            </p>
            <p className="text-xs mt-1" style={{ color: currentTheme?.colors?.text?.secondary || '#a0aec0' }}>
              Last update: {lastUpdate.toLocaleTimeString()} - Auto-refresh: 30s
            </p>
          </div>

          {/* Stats Overview - REAL DATA */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <StatCard
              title="Total Cards"
              value={totalCards}
              icon={CreditCardIcon}
              color="bg-blue-500"
              theme={currentTheme}
            />
            <StatCard
              title="My Cards"
              value={myCards}
              icon={UserIcon}
              color="bg-purple-500"
              theme={currentTheme}
            />
            <StatCard
              title="Total Views"
              value={totalViews}
              icon={EyeIcon}
              color="bg-green-500"
              theme={currentTheme}
            />
            <StatCard
              title="Total Likes"
              value={totalLikes}
              icon={HeartIcon}
              color="bg-red-500"
              theme={currentTheme}
            />
          </div>

          {/* Charts Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            <motion.div
              className="p-6 rounded-xl backdrop-blur-md border"
              style={{
                backgroundColor: currentTheme?.colors?.surface || '#2d2d44',
                borderColor: currentTheme?.colors?.border || 'rgba(255,255,255,0.1)'
              }}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <div className="flex items-center gap-2 mb-4">
                <ChartBarIcon className="w-5 h-5 text-purple-400" />
                <h3 className="text-xl font-semibold" style={{ color: currentTheme?.colors?.text?.primary || '#ffffff' }}>
                  Cards Created (Last 7 Days)
                </h3>
              </div>
              <div className="h-48 flex items-end space-x-2">
                {cardsByDay.map((value, index) => (
                  <motion.div
                    key={index}
                    className="flex-1 rounded-t bg-purple-500/60"
                    style={{ height: `${Math.max((value / Math.max(...cardsByDay, 1)) * 100, 5)}%` }}
                    initial={{ height: 0 }}
                    animate={{ height: `${Math.max((value / Math.max(...cardsByDay, 1)) * 100, 5)}%` }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  />
                ))}
              </div>
              <div className="flex justify-between mt-2 text-xs" style={{ color: currentTheme?.colors?.text?.secondary || '#a0aec0' }}>
                {last7Days.map((day, i) => (
                  <span key={i}>{new Date(day).toLocaleDateString('en', { weekday: 'short' })}</span>
                ))}
              </div>
            </motion.div>

            <motion.div
              className="p-6 rounded-xl backdrop-blur-md border"
              style={{
                backgroundColor: currentTheme?.colors?.surface || '#2d2d44',
                borderColor: currentTheme?.colors?.border || 'rgba(255,255,255,0.1)'
              }}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <div className="flex items-center gap-2 mb-4">
                <CreditCardIcon className="w-5 h-5 text-blue-400" />
                <h3 className="text-xl font-semibold" style={{ color: currentTheme?.colors?.text?.primary || '#ffffff' }}>
                  Recent Cards
                </h3>
              </div>
              <div className="space-y-3">
                {cards.slice(0, 5).map((card, index) => (
                  <div
                    key={card._id || index}
                    className="flex items-center justify-between p-3 rounded-lg"
                    style={{ backgroundColor: 'rgba(0,0,0,0.2)' }}
                  >
                    <div>
                      <p style={{ color: currentTheme?.colors?.text?.primary || '#ffffff' }}>
                        {card.title || card.fullName || 'Untitled'}
                      </p>
                      <p className="text-sm flex items-center gap-1" style={{ color: currentTheme?.colors?.text?.secondary || '#a0aec0' }}>
                        <CalendarIcon className="w-3 h-3" />
                        {card.createdAt ? new Date(card.createdAt).toLocaleDateString() : 'N/A'}
                      </p>
                    </div>
                    <div className="flex gap-3 text-sm" style={{ color: currentTheme?.colors?.text?.secondary || '#a0aec0' }}>
                      <span className="flex items-center gap-1">
                        <EyeIcon className="w-4 h-4" />
                        {card.views || 0}
                      </span>
                      <span className="flex items-center gap-1">
                        <HeartIcon className="w-4 h-4" />
                        {card.likes?.length || 0}
                      </span>
                    </div>
                  </div>
                ))}
                {cards.length === 0 && (
                  <p style={{ color: currentTheme?.colors?.text?.secondary || '#a0aec0' }}>No cards yet</p>
                )}
              </div>
            </motion.div>
          </div>

          {/* Performance Summary */}
          <motion.div
            className="p-6 rounded-xl backdrop-blur-md border"
            style={{
              backgroundColor: currentTheme?.colors?.surface || '#2d2d44',
              borderColor: currentTheme?.colors?.border || 'rgba(255,255,255,0.1)'
            }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h3 className="text-xl font-semibold mb-4" style={{ color: currentTheme?.colors?.text?.primary || '#ffffff' }}>
              Performance Summary
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <p className="text-4xl font-bold text-blue-400">
                  {totalCards > 0 ? (totalViews / totalCards).toFixed(1) : 0}
                </p>
                <p style={{ color: currentTheme?.colors?.text?.secondary || '#a0aec0' }}>Avg. Views per Card</p>
              </div>
              <div className="text-center">
                <p className="text-4xl font-bold text-green-400">
                  {totalCards > 0 ? (totalLikes / totalCards).toFixed(1) : 0}
                </p>
                <p style={{ color: currentTheme?.colors?.text?.secondary || '#a0aec0' }}>Avg. Likes per Card</p>
              </div>
              <div className="text-center">
                <p className="text-4xl font-bold text-purple-400">
                  {totalViews > 0 ? ((totalLikes / totalViews) * 100).toFixed(1) : 0}%
                </p>
                <p style={{ color: currentTheme?.colors?.text?.secondary || '#a0aec0' }}>Engagement Rate</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </>
  );
};

export default AnalyticsPage;
