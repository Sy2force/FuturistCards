import React, { useState, useEffect } from 'react';
import { useTranslation } from "../hooks/useTranslation";
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { useFavorites } from '../context/FavoritesContext';
import { 
  CreditCardIcon, 
  HeartIcon, 
  EyeIcon, 
  PlusIcon,
  ChartBarIcon,
  UserIcon
} from '@heroicons/react/24/outline';
import GlassCard from '../components/ui/GlassCard';
import GlassButton from '../components/ui/GlassButton';

const DashboardPage = () => {
  const { t } = useTranslation();
  const { user } = useAuth();
  const { favorites } = useFavorites();
  const [stats, setStats] = useState({
    totalCards: 0,
    totalViews: 0,
    totalLikes: 0,
    favoriteCards: 0
  });
  const [recentCards, setRecentCards] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      // Fetch user stats
      const statsResponse = await fetch('/api/dashboard/stats', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      
      if (statsResponse.ok) {
        const statsData = await statsResponse.json();
        setStats({
          ...statsData,
          favoriteCards: favorites.length
        });
      }

      // Fetch recent cards
      const cardsResponse = await fetch('/api/cards/my-recent', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      
      if (cardsResponse.ok) {
        const cardsData = await cardsResponse.json();
        setRecentCards(cardsData);
      }
    } catch (error) {
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
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900" dir="rtl" lang="he" data-testid="dashboard-page">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <motion.div
          className="mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold text-white mb-2">
                {t('dashboard.welcome', { name: user?.name || user?.email })}
              </h1>
              <p className="text-white/70 text-lg">
                {t('dashboard.subtitle')}
              </p>
            </div>
            <GlassButton size="lg" onClick={() => window.location.href = '/create-card'}>
              <PlusIcon className="w-5 h-5 mr-2" />
              {t('dashboard.createCard')}
            </GlassButton>
          </div>
        </motion.div>

        {/* Stats Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          {statCards.map((stat, index) => (
            <GlassCard key={index} className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-white/70 text-sm font-medium">{stat.title}</p>
                  <p className="text-3xl font-bold text-white mt-1">{stat.value}</p>
                  <p className="text-green-400 text-sm mt-1">{stat.change}</p>
                </div>
                <div className={`w-12 h-12 bg-gradient-to-r ${stat.color} rounded-lg flex items-center justify-center`}>
                  <stat.icon className="w-6 h-6 text-white" />
                </div>
              </div>
            </GlassCard>
          ))}
        </motion.div>

        {/* Recent Activity */}
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Recent Cards */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <GlassCard className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-white">{t('dashboard.recentCards')}</h2>
                <GlassButton variant="ghost" size="sm" onClick={() => window.location.href = '/my-cards'}>
                  {t('dashboard.viewAll')}
                </GlassButton>
              </div>
              
              <div className="space-y-4">
                {recentCards.length > 0 ? (
                  recentCards.map((card, index) => (
                    <div key={index} className="flex items-center p-3 bg-white/5 rounded-lg">
                      <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center mr-4">
                        <CreditCardIcon className="w-6 h-6 text-white" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-white font-medium">{card.title}</h3>
                        <p className="text-white/60 text-sm">{card.description}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-white/70 text-sm">{card.views} {t('dashboard.views')}</p>
                        <p className="text-white/50 text-xs">{card.createdAt}</p>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-8">
                    <CreditCardIcon className="w-12 h-12 text-white/30 mx-auto mb-4" />
                    <p className="text-white/60">{t('dashboard.noCards')}</p>
                    <GlassButton className="mt-4" onClick={() => window.location.href = '/create-card'}>
                      {t('dashboard.createFirstCard')}
                    </GlassButton>
                  </div>
                )}
              </div>
            </GlassCard>
          </motion.div>

          {/* Quick Actions */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <GlassCard className="p-6">
              <h2 className="text-xl font-bold text-white mb-6">{t('dashboard.quickActions')}</h2>
              
              <div className="space-y-4">
                <GlassButton 
                  variant="secondary" 
                  className="w-full justify-start"
                  onClick={() => window.location.href = '/create-card'}
                >
                  <PlusIcon className="w-5 h-5 mr-3" />
                  {t('dashboard.actions.createCard')}
                </GlassButton>
                
                <GlassButton 
                  variant="secondary" 
                  className="w-full justify-start"
                  onClick={() => window.location.href = '/my-cards'}
                >
                  <CreditCardIcon className="w-5 h-5 mr-3" />
                  {t('dashboard.actions.manageCards')}
                </GlassButton>
                
                <GlassButton 
                  variant="secondary" 
                  className="w-full justify-start"
                  onClick={() => window.location.href = '/favorites'}
                >
                  <HeartIcon className="w-5 h-5 mr-3" />
                  {t('dashboard.actions.viewFavorites')}
                </GlassButton>
                
                <GlassButton 
                  variant="secondary" 
                  className="w-full justify-start"
                  onClick={() => window.location.href = '/profile'}
                >
                  <UserIcon className="w-5 h-5 mr-3" />
                  {t('dashboard.actions.editProfile')}
                </GlassButton>
                
                <GlassButton 
                  variant="secondary" 
                  className="w-full justify-start"
                  onClick={() => window.location.href = '/analytics'}
                >
                  <ChartBarIcon className="w-5 h-5 mr-3" />
                  {t('dashboard.actions.viewAnalytics')}
                </GlassButton>
              </div>
            </GlassCard>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
