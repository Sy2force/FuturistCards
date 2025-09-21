import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  SparklesIcon, 
  ArrowRightIcon,
  CreditCardIcon,
  UserGroupIcon,
  ChartBarIcon
} from '@heroicons/react/24/outline';
import { useAuth } from '../context/AuthContext';
import UserDashboard from '../components/dashboard/UserDashboard';
import api from '../api';

const HomePage = () => {
  const { isAuthenticated } = useAuth();
  const [featuredCards, setFeaturedCards] = useState([]);
  const [stats] = useState({
    totalCards: 150,
    totalUsers: 500,
    totalViews: 12000
  });

  useEffect(() => {
    fetchFeaturedCards();
  }, []);

  const fetchFeaturedCards = async () => {
    try {
      const response = await api.get('/cards?limit=3');
      setFeaturedCards(response.data.data || []);
    } catch (error) {
      // Set mock data if API fails
      setFeaturedCards([
        {
          _id: '1',
          title: 'Tech Innovator',
          subtitle: 'Full-Stack Developer',
          description: 'Creating amazing web applications with React and Node.js',
          category: 'Technology',
          likes: 15,
          views: 120
        },
        {
          _id: '2',
          title: 'Creative Designer',
          subtitle: 'UI/UX Designer',
          description: 'Designing beautiful and intuitive user experiences',
          category: 'Design',
          likes: 28,
          views: 200
        },
        {
          _id: '3',
          title: 'Business Consultant',
          subtitle: 'Strategy Expert',
          description: 'Helping businesses grow and optimize their operations',
          category: 'Business',
          likes: 22,
          views: 180
        }
      ]);
    }
  };

  return (
    <div className="min-h-screen">
      {/* Dashboard pour utilisateurs connectés */}
      {isAuthenticated ? (
        <div className="py-8 px-4">
          <div className="container mx-auto max-w-7xl">
            <UserDashboard />
          </div>
        </div>
      ) : (
        <>
          {/* Hero Section pour visiteurs */}
          <section className="relative py-20 px-4 overflow-hidden">
            <div className="max-w-7xl mx-auto text-center">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
              >
                <h1 className="text-5xl md:text-7xl font-bold text-gray-900 dark:text-white mb-6">
                  Cartes de visite numériques
                  <span className="block text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
                    réinventées
                  </span>
                </h1>
                <p className="text-xl text-gray-700 dark:text-gray-200 mb-8 max-w-3xl mx-auto">
                  Créez, partagez et gérez vos cartes de visite professionnelles avec style
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link
                    to="/register"
                    className="px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-lg font-semibold hover:from-cyan-600 hover:to-blue-700 transition-all duration-200 flex items-center justify-center space-x-2"
                  >
                    <span>Commencer</span>
                    <ArrowRightIcon className="w-5 h-5" />
                  </Link>
                  <Link
                    to="/cards"
                    className="px-8 py-4 bg-white/10 dark:bg-white/10 backdrop-blur-lg text-gray-900 dark:text-white rounded-lg font-semibold border border-gray-300 dark:border-white/20 hover:bg-gray-200 dark:hover:bg-white/20 transition-all duration-200"
                  >
                    Parcourir les cartes
                  </Link>
                </div>
              </motion.div>
            </div>
          </section>

          {/* Stats Section */}
          <section className="py-16 px-4">
            <div className="max-w-7xl mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="text-center"
                >
                  <div className="bg-white/10 dark:bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-gray-300 dark:border-white/20">
                    <CreditCardIcon className="w-12 h-12 text-cyan-400 mx-auto mb-4" />
                    <div className="text-4xl font-bold text-gray-900 dark:text-white mb-2">{stats.totalCards}+</div>
                    <div className="text-gray-700 dark:text-gray-200">Cartes numériques créées</div>
                  </div>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="text-center"
                >
                  <div className="bg-white/10 dark:bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-gray-300 dark:border-white/20">
                    <UserGroupIcon className="w-12 h-12 text-cyan-400 mx-auto mb-4" />
                    <div className="text-4xl font-bold text-gray-900 dark:text-white mb-2">{stats.totalUsers}+</div>
                    <div className="text-gray-700 dark:text-gray-200">Utilisateurs actifs</div>
                  </div>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                  className="text-center"
                >
                  <div className="bg-white/10 dark:bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-gray-300 dark:border-white/20">
                    <ChartBarIcon className="w-12 h-12 text-cyan-400 mx-auto mb-4" />
                    <div className="text-4xl font-bold text-gray-900 dark:text-white mb-2">{stats.totalViews.toLocaleString()}+</div>
                    <div className="text-gray-700 dark:text-gray-200">Vues de cartes</div>
                  </div>
                </motion.div>
              </div>
            </div>
          </section>

          {/* Featured Cards Section */}
          <section className="py-16 px-4">
            <div className="max-w-7xl mx-auto">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
                className="text-center mb-12"
              >
                <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">Cartes en vedette</h2>
                <p className="text-gray-700 dark:text-gray-200 max-w-2xl mx-auto">
                  Découvrez les cartes les plus populaires de notre communauté
                </p>
              </motion.div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {featuredCards.map((card, cardIndex) => (
                  <motion.div
                    key={card._id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1 + cardIndex * 0.1 }}
                    className="bg-white/10 dark:bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-gray-300 dark:border-white/20 hover:bg-gray-200 dark:hover:bg-white/20 transition-all duration-300"
                  >
                    <div className="flex items-center space-x-4 mb-4">
                      <div className="w-12 h-12 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full flex items-center justify-center">
                        <span className="text-white font-bold">
                          {card.title?.charAt(0) || 'C'}
                        </span>
                      </div>
                      <div>
                        <h3 className="text-gray-900 dark:text-white font-semibold">{card.title}</h3>
                        <p className="text-gray-600 dark:text-gray-300 text-sm">{card.subtitle}</p>
                      </div>
                    </div>
                    <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">{card.description}</p>
                    <div className="flex justify-between items-center">
                      <span className="text-cyan-400 text-sm">{card.category}</span>
                      <div className="flex items-center space-x-4 text-gray-500 dark:text-gray-400 text-sm">
                        <span>❤️ {card.likes}</span>
                        <span>👁️ {card.views}</span>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              <div className="text-center mt-12">
                <Link
                  to="/cards"
                  className="inline-flex items-center space-x-2 px-6 py-3 bg-white/10 dark:bg-white/10 backdrop-blur-lg text-gray-900 dark:text-white rounded-lg border border-gray-300 dark:border-white/20 hover:bg-gray-200 dark:hover:bg-white/20 transition-all duration-200"
                >
                  <span>Voir toutes les cartes</span>
                  <ArrowRightIcon className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </section>

          {/* CTA Section */}
          <section className="py-20 px-4">
            <div className="max-w-4xl mx-auto text-center">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.5 }}
                className="bg-gradient-to-r from-cyan-500/20 to-blue-500/20 backdrop-blur-lg rounded-3xl p-12 border border-gray-300 dark:border-white/20"
              >
                <SparklesIcon className="w-16 h-16 text-cyan-400 mx-auto mb-6" />
                <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-6">
                  Prêt à créer ?
                </h2>
                <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
                  Rejoignez des milliers de professionnels qui utilisent FuturistCards
                </p>
                <Link
                  to="/register"
                  className="inline-flex items-center space-x-2 px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-lg font-semibold hover:from-cyan-600 hover:to-blue-700 transition-all duration-200"
                >
                  <span>Commencer à créer</span>
                  <ArrowRightIcon className="w-5 h-5" />
                </Link>
              </motion.div>
            </div>
          </section>
        </>
      )}
    </div>
  );
};

export default HomePage;
