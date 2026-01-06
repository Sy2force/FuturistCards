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
  ArrowPathIcon,
  ChartBarIcon,
  TrashIcon,
  PencilIcon
} from '@heroicons/react/24/outline';
import GlassCard from '../components/ui/GlassCard';
import GlassButton from '../components/ui/GlassButton';
import toast from 'react-hot-toast';

const API_URL = "https://futuristcards.onrender.com/api";

const DashboardPage = () => {
  const { user } = useAuth();
  const { favorites } = useFavorites();
  const [myCards, setMyCards] = useState([]);
  const [allCards, setAllCards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [lastUpdate, setLastUpdate] = useState(new Date());

  const fetchData = async (showToast = false) => {
    setRefreshing(true);
    try {
      // Fetch all cards from API
      const cardsRes = await fetch(`${API_URL}/cards`);
      if (cardsRes.ok) {
        const data = await cardsRes.json();
        const cards = data.cards || [];
        setAllCards(cards);
        
        // Filter my cards
        const userCards = cards.filter(c => 
          c.user?._id === user?._id || 
          c.user === user?._id ||
          c.email === user?.email
        );
        setMyCards(userCards);
      }

      // Also get local cards
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
    const interval = setInterval(() => fetchData(), 15000); // Refresh every 15s
    return () => clearInterval(interval);
  }, [user]);

  // Calculate REAL stats
  const totalCards = myCards.length;
  const totalViews = myCards.reduce((sum, c) => sum + (c.views || 0), 0);
  const totalLikes = myCards.reduce((sum, c) => sum + (c.likes?.length || c.likesCount || 0), 0);
  const favoriteCards = favorites?.length || 0;

  // Recent cards
  const recentCards = [...myCards]
    .sort((a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0))
    .slice(0, 5);

  // Performance metrics
  const avgViews = totalCards > 0 ? (totalViews / totalCards).toFixed(1) : 0;
  const avgLikes = totalCards > 0 ? (totalLikes / totalCards).toFixed(1) : 0;
  const engagementRate = totalViews > 0 ? ((totalLikes / totalViews) * 100).toFixed(1) : 0;

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
              <p className="text-gray-300">Here is an overview of your business cards</p>
              <div className="flex items-center gap-2 mt-2">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <p className="text-xs text-green-400">
                  Live - Last update: {lastUpdate.toLocaleTimeString()} - Auto-refresh: 15s
                </p>
              </div>
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

          {/* Stats Grid */}
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
                <div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center">
                  <CreditCardIcon className="h-6 w-6 text-white" />
                </div>
              </div>
            </GlassCard>

            <GlassCard className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">Total Views</p>
                  <p className="text-4xl font-bold text-white">{totalViews}</p>
                  <p className="text-xs text-green-400 mt-1">On your cards</p>
                </div>
                <div className="w-12 h-12 bg-green-500 rounded-lg flex items-center justify-center">
                  <EyeIcon className="h-6 w-6 text-white" />
                </div>
              </div>
            </GlassCard>

            <GlassCard className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">Total Likes</p>
                  <p className="text-4xl font-bold text-white">{totalLikes}</p>
                  <p className="text-xs text-red-400 mt-1">On your cards</p>
                </div>
                <div className="w-12 h-12 bg-red-500 rounded-lg flex items-center justify-center">
                  <HeartIcon className="h-6 w-6 text-white" />
                </div>
              </div>
            </GlassCard>

            <GlassCard className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">Favorites</p>
                  <p className="text-4xl font-bold text-white">{favoriteCards}</p>
                  <p className="text-xs text-purple-400 mt-1">Cards you saved</p>
                </div>
                <div className="w-12 h-12 bg-purple-500 rounded-lg flex items-center justify-center">
                  <HeartIcon className="h-6 w-6 text-white" />
                </div>
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
                    <GlassCard key={card._id || card.id} className="p-6 group hover:scale-[1.02] transition-transform">
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
                        <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                          <Link to={`/cards/${card._id}/edit`}>
                            <button className="p-2 bg-blue-600/20 text-blue-400 rounded-lg hover:bg-blue-600/30">
                              <PencilIcon className="w-4 h-4" />
                            </button>
                          </Link>
                          <Link to={`/cards/${card._id}`}>
                            <button className="p-2 bg-purple-600/20 text-purple-400 rounded-lg hover:bg-purple-600/30">
                              <EyeIcon className="w-4 h-4" />
                            </button>
                          </Link>
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
                      <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center">
                        <PlusIcon className="h-6 w-6 text-white" />
                      </div>
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
                      <div className="w-10 h-10 bg-green-500 rounded-lg flex items-center justify-center">
                        <EyeIcon className="h-6 w-6 text-white" />
                      </div>
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
                      <div className="w-10 h-10 bg-red-500 rounded-lg flex items-center justify-center">
                        <HeartIcon className="h-6 w-6 text-white" />
                      </div>
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
                      <div className="w-10 h-10 bg-purple-500 rounded-lg flex items-center justify-center">
                        <ChartBarIcon className="h-6 w-6 text-white" />
                      </div>
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
                <p className="text-4xl font-bold text-blue-400">{avgViews}</p>
                <p className="text-gray-400 mt-2">Avg. Views per Card</p>
              </GlassCard>

              <GlassCard className="p-6 text-center">
                <p className="text-4xl font-bold text-green-400">{avgLikes}</p>
                <p className="text-gray-400 mt-2">Avg. Likes per Card</p>
              </GlassCard>

              <GlassCard className="p-6 text-center">
                <p className="text-4xl font-bold text-purple-400">{engagementRate}%</p>
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
