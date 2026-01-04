import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from "../hooks/useTranslation";
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { useAuth } from '../context/AuthContext';
import { useFavorites } from '../context/FavoritesContext';
import { useRoleTheme } from '../context/ThemeProvider';
import { 
  CreditCardIcon, 
  HeartIcon, 
  EyeIcon, 
  PlusIcon,
  ChartBarIcon,
  UserIcon,
  ClockIcon,
  ArrowTrendingUpIcon,
  StarIcon,
  CalendarIcon
} from '@heroicons/react/24/outline';
import GlassCard from '../components/ui/GlassCard';
import GlassButton from '../components/ui/GlassButton';

const DashboardPage = () => {
  const { t } = useTranslation();
  const { user } = useAuth();
  const { favorites } = useFavorites();
  const { currentTheme } = useRoleTheme();
  const [stats, setStats] = useState({
    totalCards: 5,
    totalViews: 1247,
    totalLikes: 89,
    favoriteCards: favorites.length || 12
  });
  const [recentCards, setRecentCards] = useState([]);
  const [recentActivity, setRecentActivity] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      
      // Mock data for demonstration
      const mockRecentCards = [
        {
          id: 1,
          title: t('dashboard.mockCards.sarah.title'),
          description: t('dashboard.mockCards.sarah.description'),
          views: 156,
          createdAt: t('dashboard.time.today'),
          image: null
        },
        {
          id: 2,
          title: t('dashboard.mockCards.danny.title'),
          description: t('dashboard.mockCards.danny.description'),
          views: 89,
          createdAt: t('dashboard.time.yesterday'),
          image: null
        },
        {
          id: 3,
          title: t('dashboard.mockCards.michal.title'),
          description: t('dashboard.mockCards.michal.description'),
          views: 234,
          createdAt: t('dashboard.time.threeDaysAgo'),
          image: null
        }
      ];

      const mockActivity = [
        {
          id: 1,
          type: 'card_created',
          message: t('dashboard.activity.cardCreated'),
          time: t('dashboard.time.twoHoursAgo'),
          icon: PlusIcon
        },
        {
          id: 2,
          type: 'card_viewed',
          message: t('dashboard.activity.cardViewed'),
          time: t('dashboard.time.today'),
          icon: EyeIcon
        },
        {
          id: 3,
          type: 'favorite_added',
          message: t('dashboard.activity.favoriteAdded'),
          time: t('dashboard.time.yesterday'),
          icon: HeartIcon
        }
      ];

      setRecentCards(mockRecentCards);
      setRecentActivity(mockActivity);
      
    } catch (error) {
      // Error handled silently in production
    } finally {
      setLoading(false);
    }
  };

  const statCards = [
    {
      title: t('dashboard.stats.totalCards'),
      value: stats.totalCards,
      icon: CreditCardIcon,
      color: 'from-blue-500 to-cyan-500',
      change: '+12%'
    },
    {
      title: t('dashboard.stats.totalViews'),
      value: stats.totalViews,
      icon: EyeIcon,
      color: 'from-green-500 to-emerald-500',
      change: '+8%'
    },
    {
      title: t('dashboard.stats.totalLikes'),
      value: stats.totalLikes,
      icon: HeartIcon,
      color: 'from-pink-500 to-rose-500',
      change: '+15%'
    },
    {
      title: t('dashboard.stats.favorites'),
      value: stats.favoriteCards,
      icon: HeartIcon,
      color: 'from-purple-500 to-violet-500',
      change: '+5%'
    }
  ];

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center" dir="rtl" lang="he">
        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-white"></div>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>{t('dashboard.title')} - FuturistCards</title>
        <meta name="description" content={t('dashboard.description')} />
      </Helmet>
      
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 pt-20" dir="rtl">
        <div className="container mx-auto px-4 py-8">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <h1 className="text-4xl font-bold text-white mb-2">
              {t('dashboard.welcome')}, {user?.firstName || user?.name}!
            </h1>
            <p className="text-gray-300">
              {t('dashboard.subtitle')}
            </p>
          </motion.div>

          {/* Stats Grid */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
          >
            {statCards.map((stat, index) => (
              <GlassCard key={index} className="p-6 hover:scale-105 transition-transform">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-300 text-sm">{stat.title}</p>
                    <p className="text-3xl font-bold text-white">{stat.value}</p>
                    <p className="text-xs text-green-400 mt-1">{t('dashboard.monthlyGrowth')}</p>
                  </div>
                  <stat.icon className={`h-8 w-8 ${stat.color}`} />
                </div>
              </GlassCard>
            ))}
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
            {/* Recent Cards */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="lg:col-span-2"
            >
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-white">
                  {t('dashboard.recentCards')}
                </h2>
                <Link to="/my-cards" className="text-blue-400 hover:text-blue-300 text-sm">
                  {t('dashboard.viewAllCards')}
                </Link>
              </div>
              <div className="space-y-4">
                {recentCards.length > 0 ? (
                  recentCards.map((card) => (
                    <GlassCard key={card.id} className="p-6">
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <h3 className="text-lg font-semibold text-white mb-2">
                            {card.title}
                          </h3>
                          <p className="text-gray-300 text-sm mb-4">
                            {card.description}
                          </p>
                          <div className="flex justify-between items-center text-sm text-gray-400">
                            <span className="flex items-center">
                              <EyeIcon className="h-4 w-4 ml-1" />
                              {card.views} {t('dashboard.views')}
                            </span>
                            <span className="flex items-center">
                              <ClockIcon className="h-4 w-4 ml-1" />
                              {card.createdAt}
                            </span>
                          </div>
                        </div>
                        <div className="flex space-x-2 mr-4">
                          <button className="text-blue-400 hover:text-blue-300">
                            <EyeIcon className="h-5 w-5" />
                          </button>
                          <button className="text-yellow-400 hover:text-yellow-300">
                            <StarIcon className="h-5 w-5" />
                          </button>
                        </div>
                      </div>
                    </GlassCard>
                  ))
                ) : (
                  <div className="text-center py-12">
                    <CreditCardIcon className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-300 text-lg">
                      {t('dashboard.noCards')}
                    </p>
                    <Link to="/create-card">
                      <GlassButton className="mt-4">
                        {t('dashboard.createFirstCard')}
                      </GlassButton>
                    </Link>
                  </div>
                )}
              </div>
            </motion.div>

            {/* Recent Activity */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <h2 className="text-2xl font-bold text-white mb-6">
                {t('dashboard.recentActivity')}
              </h2>
              <div className="space-y-4">
                {recentActivity.map((activity) => (
                  <GlassCard key={activity.id} className="p-4">
                    <div className="flex items-center space-x-3">
                      <activity.icon className="h-6 w-6 text-blue-400 flex-shrink-0" />
                      <div className="flex-1 min-w-0">
                        <p className="text-white text-sm font-medium">
                          {activity.message}
                        </p>
                        <p className="text-gray-400 text-xs">
                          {activity.time}
                        </p>
                      </div>
                    </div>
                  </GlassCard>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Quick Actions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <h2 className="text-2xl font-bold text-white mb-6">
              {t('dashboard.quickActions')}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Link to="/create-card">
                <GlassCard className="p-6 hover:scale-105 transition-all cursor-pointer group">
                  <PlusIcon className="h-8 w-8 text-blue-400 mb-4 group-hover:scale-110 transition-transform" />
                  <h3 className="text-lg font-semibold text-white mb-2">
                    {t('dashboard.createCard')}
                  </h3>
                  <p className="text-gray-300 text-sm">
                    {t('dashboard.createCardDesc')}
                  </p>
                </GlassCard>
              </Link>

              <Link to="/cards">
                <GlassCard className="p-6 hover:scale-105 transition-all cursor-pointer group">
                  <EyeIcon className="h-8 w-8 text-green-400 mb-4 group-hover:scale-110 transition-transform" />
                  <h3 className="text-lg font-semibold text-white mb-2">
                    {t('dashboard.browseCards')}
                  </h3>
                  <p className="text-gray-300 text-sm">
                    {t('dashboard.browseCardsDesc')}
                  </p>
                </GlassCard>
              </Link>

              <Link to="/favorites">
                <GlassCard className="p-6 hover:scale-105 transition-all cursor-pointer group">
                  <HeartIcon className="h-8 w-8 text-red-400 mb-4 group-hover:scale-110 transition-transform" />
                  <h3 className="text-lg font-semibold text-white mb-2">
                    {t('dashboard.viewFavorites')}
                  </h3>
                  <p className="text-gray-300 text-sm">
                    {t('dashboard.viewFavoritesDesc')}
                  </p>
                </GlassCard>
              </Link>
            </div>
          </motion.div>

          {/* Analytics Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="mt-8"
          >
            <h2 className="text-2xl font-bold text-white mb-6">
              {t('dashboard.performanceAnalysis')}
            </h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <GlassCard className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-white">{t('dashboard.weeklyViews')}</h3>
                  <ArrowTrendingUpIcon className="h-6 w-6 text-green-400" />
                </div>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-300">{t('dashboard.days.sunday')}</span>
                    <span className="text-white">45 {t('dashboard.views')}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-300">{t('dashboard.days.monday')}</span>
                    <span className="text-white">67 {t('dashboard.views')}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-300">{t('dashboard.days.tuesday')}</span>
                    <span className="text-white">89 {t('dashboard.views')}</span>
                  </div>
                </div>
              </GlassCard>

              <GlassCard className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-white">{t('dashboard.monthlyGoals')}</h3>
                  <CalendarIcon className="h-6 w-6 text-blue-400" />
                </div>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-gray-300">{t('dashboard.views')}</span>
                      <span className="text-white">1,247 / 2,000</span>
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-2">
                      <div className="bg-blue-400 h-2 rounded-full" style={{width: '62%'}}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-gray-300">{t('dashboard.likes')}</span>
                      <span className="text-white">89 / 150</span>
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-2">
                      <div className="bg-red-400 h-2 rounded-full" style={{width: '59%'}}></div>
                    </div>
                  </div>
                </div>
              </GlassCard>
            </div>
          </motion.div>
        </div>
      </div>
    </>
  );
};

export default DashboardPage;
