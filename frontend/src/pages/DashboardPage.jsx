import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { useAuth } from '../context/AuthContext';
import { useFavorites } from '../context/FavoritesContext';
import { 
  CreditCardIcon, 
  HeartIcon, 
  EyeIcon, 
  PlusIcon,
  ClockIcon,
  ArrowPathIcon
} from '@heroicons/react/24/outline';
import GlassCard from '../components/ui/GlassCard';
import GlassButton from '../components/ui/GlassButton';
import toast from 'react-hot-toast';

const API_URL = 'https://futuristcards.onrender.com/api';

const DashboardPage = () => {
  const { user } = useAuth();
  const { favorites } = useFavorites();
  const [myCards, setMyCards] = useState([]);
  const [allCards, setAllCards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [lastUpdate, setLastUpdate] = useState(new Date());

  // Fetch real data from API
  const fetchData = async (showToast = false) => {
    setRefreshing(true);
    try {
      // Fetch all cards (public)
      const cardsRes = await fetch(`${API_URL}/cards`);
      if (cardsRes.ok) {
        const data = await cardsRes.json();
        const cards = data.cards || [];
        setAllCards(cards);
        
        // Filter my cards (cards created by current user)
        const userCards = cards.filter(c => 
          c.user?._id === user?._id || 
          c.user === user?._id ||
          c.email === user?.email
        );
        setMyCards(userCards);
      }

      // Also fetch from localStorage for cards created locally
      const localCards = JSON.parse(localStorage.getItem('userCards') || '[]');
      if (localCards.length > 0) {
        setMyCards(prev => {
          const combined = [...prev];
          localCards.forEach(lc => {
            if (!combined.find(c => c._id === lc.id || c.id === lc.id)) {
              combined.push({ ...lc, _id: lc.id });
            }
          });
          return combined;
        });
      }

      setLastUpdate(new Date());
      if (showToast) toast.success('Data refreshed!');
    } catch (error) {
      if (showToast) toast.error('Failed to refresh');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchData();
    const interval = setInterval(() => fetchData(), 30000);
    return () => clearInterval(interval);
  }, [user]);

  // Calculate REAL stats from actual data
  const totalCards = myCards.length;
  const totalViews = myCards.reduce((sum, c) => sum + (c.views || 0), 0);
  const totalLikes = myCards.reduce((sum, c) => sum + (c.likes?.length || c.likesCount || 0), 0);
  const favoriteCards = favorites?.length || 0;

  // Recent cards (last 5)
  const recentCards = [...myCards]
    .sort((a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0))
    .slice(0, 5);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-4 border-purple-500 border-t-transparent"></div>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>Dashboard - FuturistCards</title>
        <meta name="description" content="Your personal dashboard" />
      </Helmet>
      
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 pt-20">
        <div className="container mx-auto px-4 py-8">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8 flex justify-between items-start"
          >
            <div>
              <h1 className="text-4xl font-bold text-white mb-2">
                Welcome, {user?.firstName || user?.name || 'User'}!
              </h1>
              <p className="text-gray-300">
                Here is an overview of your business cards
              </p>
              <p className="text-xs text-gray-500 mt-1">
                Last update: {lastUpdate.toLocaleTimeString()} • Auto-refresh: 30s
              </p>
            </div>
            <motion.button
              onClick={() => fetchData(true)}
              disabled={refreshing}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-2 px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg"
            >
              <ArrowPathIcon className={`w-5 h-5 ${refreshing ? 'animate-spin' : ''}`} />
              Refresh
            </motion.button>
          </motion.div>

          {/* Stats Grid - REAL DATA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
          >
            <GlassCard className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">My Cards</p>
                  <p className="text-4xl font-bold text-white">{totalCards}</p>
                  <p className="text-xs text-blue-400 mt-1">Cards you created</p>
                </div>
                <CreditCardIcon className="h-10 w-10 text-blue-400" />
              </div>
            </GlassCard>

            <GlassCard className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">Total Views</p>
                  <p className="text-4xl font-bold text-white">{totalViews}</p>
                  <p className="text-xs text-green-400 mt-1">On your cards</p>
                </div>
                <EyeIcon className="h-10 w-10 text-green-400" />
              </div>
            </GlassCard>

            <GlassCard className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">Total Likes</p>
                  <p className="text-4xl font-bold text-white">{totalLikes}</p>
                  <p className="text-xs text-red-400 mt-1">On your cards</p>
                </div>
                <HeartIcon className="h-10 w-10 text-red-400" />
              </div>
            </GlassCard>

            <GlassCard className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">Favorites</p>
                  <p className="text-4xl font-bold text-white">{favoriteCards}</p>
                  <p className="text-xs text-purple-400 mt-1">Cards you saved</p>
                </div>
                <HeartIcon className="h-10 w-10 text-purple-400" />
              </div>
            </GlassCard>
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
                <h2 className="text-2xl font-bold text-white">My Recent Cards</h2>
                <Link to="/my-cards" className="text-blue-400 hover:text-blue-300 text-sm">
                  View All →
                </Link>
              </div>
              <div className="space-y-4">
                {recentCards.length > 0 ? (
                  recentCards.map((card) => (
                    <GlassCard key={card._id || card.id} className="p-6">
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <h3 className="text-lg font-semibold text-white mb-2">
                            {card.title || card.fullName || 'Untitled'}
                          </h3>
                          <p className="text-gray-400 text-sm mb-3 line-clamp-2">
                            {card.description || card.email || 'No description'}
                          </p>
                          <div className="flex gap-4 text-sm text-gray-500">
                            <span className="flex items-center gap-1">
                              <EyeIcon className="h-4 w-4" />
                              {card.views || 0} views
                            </span>
                            <span className="flex items-center gap-1">
                              <HeartIcon className="h-4 w-4" />
                              {card.likes?.length || 0} likes
                            </span>
                            <span className="flex items-center gap-1">
                              <ClockIcon className="h-4 w-4" />
                              {card.createdAt ? new Date(card.createdAt).toLocaleDateString() : 'N/A'}
                            </span>
                          </div>
                        </div>
                      </div>
                    </GlassCard>
                  ))
                ) : (
                  <GlassCard className="p-12 text-center">
                    <CreditCardIcon className="h-16 w-16 text-gray-500 mx-auto mb-4" />
                    <p className="text-gray-400 text-lg mb-4">No cards yet</p>
                    <Link to="/create-card">
                      <GlassButton>Create Your First Card</GlassButton>
                    </Link>
                  </GlassCard>
                )}
              </div>
            </motion.div>

            {/* Quick Actions */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <h2 className="text-2xl font-bold text-white mb-6">Quick Actions</h2>
              <div className="space-y-4">
                <Link to="/create-card">
                  <GlassCard className="p-6 hover:scale-105 transition-transform cursor-pointer">
                    <div className="flex items-center gap-4">
                      <PlusIcon className="h-8 w-8 text-blue-400" />
                      <div>
                        <h3 className="text-white font-semibold">Create Card</h3>
                        <p className="text-gray-400 text-sm">Design a new card</p>
                      </div>
                    </div>
                  </GlassCard>
                </Link>

                <Link to="/cards">
                  <GlassCard className="p-6 hover:scale-105 transition-transform cursor-pointer">
                    <div className="flex items-center gap-4">
                      <EyeIcon className="h-8 w-8 text-green-400" />
                      <div>
                        <h3 className="text-white font-semibold">Browse Cards</h3>
                        <p className="text-gray-400 text-sm">{allCards.length} cards available</p>
                      </div>
                    </div>
                  </GlassCard>
                </Link>

                <Link to="/favorites">
                  <GlassCard className="p-6 hover:scale-105 transition-transform cursor-pointer">
                    <div className="flex items-center gap-4">
                      <HeartIcon className="h-8 w-8 text-red-400" />
                      <div>
                        <h3 className="text-white font-semibold">Favorites</h3>
                        <p className="text-gray-400 text-sm">{favoriteCards} saved cards</p>
                      </div>
                    </div>
                  </GlassCard>
                </Link>

                <Link to="/analytics">
                  <GlassCard className="p-6 hover:scale-105 transition-transform cursor-pointer">
                    <div className="flex items-center gap-4">
                      <svg className="h-8 w-8 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                      </svg>
                      <div>
                        <h3 className="text-white font-semibold">Analytics</h3>
                        <p className="text-gray-400 text-sm">View performance</p>
                      </div>
                    </div>
                  </GlassCard>
                </Link>
              </div>
            </motion.div>
          </div>

          {/* Performance Summary */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <h2 className="text-2xl font-bold text-white mb-6">Performance Summary</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <GlassCard className="p-6 text-center">
                <p className="text-4xl font-bold text-blue-400">
                  {totalCards > 0 ? (totalViews / totalCards).toFixed(1) : 0}
                </p>
                <p className="text-gray-400 mt-2">Avg. Views per Card</p>
              </GlassCard>

              <GlassCard className="p-6 text-center">
                <p className="text-4xl font-bold text-green-400">
                  {totalCards > 0 ? (totalLikes / totalCards).toFixed(1) : 0}
                </p>
                <p className="text-gray-400 mt-2">Avg. Likes per Card</p>
              </GlassCard>

              <GlassCard className="p-6 text-center">
                <p className="text-4xl font-bold text-purple-400">
                  {totalViews > 0 ? ((totalLikes / totalViews) * 100).toFixed(1) : 0}%
                </p>
                <p className="text-gray-400 mt-2">Engagement Rate</p>
              </GlassCard>
            </div>
          </motion.div>
        </div>
      </div>
    </>
  );
};

export default DashboardPage;
