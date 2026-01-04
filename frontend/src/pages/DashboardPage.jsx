import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { useAuth } from '../context/AuthContext';
import { useFavorites } from '../context/FavoritesContext';
import { useRoleTheme } from '../context/ThemeProvider';
import { useDocumentTitle } from '../hooks/useDocumentTitle';
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
  const { user } = useAuth();
  const { favorites } = useFavorites();
  const { currentTheme } = useRoleTheme();
  
  // Set document title
  useDocumentTitle('Dashboard | FuturistCards');
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
          "id": 1,
          "title": 'Professional Business Card',
          "description": 'Modern digital business card with contact information',
          "views": 156,
          "createdAt": 'Today',
          "image": null
        },
        {
          "id": 2,
          "title": 'Creative Portfolio Card',
          "description": 'Showcase your creative work and portfolio',
          "views": 89,
          "createdAt": 'Yesterday',
          "image": null
        },
        {
          "id": 3,
          "title": 'Corporate Executive Card',
          "description": 'Executive-level business card with company branding',
          "views": 234,
          "createdAt": '3 days ago',
          "image": null
        }
      ];

      const mockActivity = [
        {
          "id": 1,
          "type": 'card_created',
          "message": 'New card created successfully',
          "time": '2 hours ago',
          "icon": PlusIcon
        },
        {
          "id": 2,
          "type": 'card_viewed',
          "message": 'Your card was viewed by someone',
          "time": 'Today',
          "icon": EyeIcon
        },
        {
          "id": 3,
          "type": 'favorite_added',
          "message": 'Someone added your card to favorites',
          "time": 'Yesterday',
          "icon": HeartIcon
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
      "title": 'Total Cards',
      "value": stats.totalCards,
      "icon": CreditCardIcon,
      "color": 'from-blue-500 to-cyan-500',
      "change": '+12%'
    },
    {
      "title": 'Total Views',
      "value": stats.totalViews,
      "icon": EyeIcon,
      "color": 'from-green-500 to-emerald-500',
      "change": '+8%'
    },
    {
      "title": 'Total Likes',
      "value": stats.totalLikes,
      "icon": HeartIcon,
      "color": 'from-pink-500 to-rose-500',
      "change": '+15%'
    },
    {
      "title": 'Favorites',
      "value": stats.favoriteCards,
      "icon": HeartIcon,
      "color": 'from-purple-500 to-violet-500',
      "change": '+5%'
    }
  ];

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-white"></div>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>Dashboard - FuturistCards</title>
        <meta name="description" content="Your personal dashboard with statistics, recent cards, and quick actions" />
      </Helmet>
      
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 pt-20">
        <div className="container mx-auto px-4 py-8">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <h1 className="text-4xl font-bold text-white mb-2">
              Welcome to your Dashboard, {user?.firstName || user?.name}!
            </h1>
            <p className="text-gray-300">
              Here's an overview of your business cards and recent activity
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
                    <p className="text-xs text-green-400 mt-1">{stat.change} monthly growth</p>
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
                  Recent Cards
                </h2>
                <Link to="/my-cards" className="text-blue-400 hover:text-blue-300 text-sm">
                  View All Cards
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
                              {card.views} views
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
                      No cards yet
                    </p>
                    <Link to="/create-card">
                      <GlassButton className="mt-4">
                        Create Your First Card
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
                Recent Activity
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
              Quick Actions
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Link to="/create-card">
                <GlassCard className="p-6 hover:scale-105 transition-all cursor-pointer group">
                  <PlusIcon className="h-8 w-8 text-blue-400 mb-4 group-hover:scale-110 transition-transform" />
                  <h3 className="text-lg font-semibold text-white mb-2">
                    Create New Card
                  </h3>
                  <p className="text-gray-300 text-sm">
                    Design and create a new digital business card
                  </p>
                </GlassCard>
              </Link>

              <Link to="/cards">
                <GlassCard className="p-6 hover:scale-105 transition-all cursor-pointer group">
                  <EyeIcon className="h-8 w-8 text-green-400 mb-4 group-hover:scale-110 transition-transform" />
                  <h3 className="text-lg font-semibold text-white mb-2">
                    Browse Cards
                  </h3>
                  <p className="text-gray-300 text-sm">
                    Explore and discover amazing business cards
                  </p>
                </GlassCard>
              </Link>

              <Link to="/favorites">
                <GlassCard className="p-6 hover:scale-105 transition-all cursor-pointer group">
                  <HeartIcon className="h-8 w-8 text-red-400 mb-4 group-hover:scale-110 transition-transform" />
                  <h3 className="text-lg font-semibold text-white mb-2">
                    View Favorites
                  </h3>
                  <p className="text-gray-300 text-sm">
                    Access your saved and liked business cards
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
              Performance Analysis
            </h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <GlassCard className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-white">Weekly Views</h3>
                  <ArrowTrendingUpIcon className="h-6 w-6 text-green-400" />
                </div>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-300">Sunday</span>
                    <span className="text-white">45 views</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-300">Monday</span>
                    <span className="text-white">67 views</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-300">Tuesday</span>
                    <span className="text-white">89 views</span>
                  </div>
                </div>
              </GlassCard>

              <GlassCard className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-white">Monthly Goals</h3>
                  <CalendarIcon className="h-6 w-6 text-blue-400" />
                </div>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-gray-300">Views</span>
                      <span className="text-white">1,247 / 2,000</span>
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-2">
                      <div className="bg-blue-400 h-2 rounded-full" style={{width: '62%'}}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-gray-300">Likes</span>
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
