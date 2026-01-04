import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { useRoleTheme } from '../context/ThemeProvider';
import { useAuth } from '../context/AuthContext';
import { useDocumentTitle } from '../hooks/useDocumentTitle';
import { 
  SparklesIcon, 
  CreditCardIcon, 
  HeartIcon, 
  GlobeAltIcon,
  BoltIcon,
  StarIcon,
  ShieldCheckIcon,
  ChartBarIcon,
  UserGroupIcon,
  DevicePhoneMobileIcon
} from '@heroicons/react/24/outline';
import GlassCard from '../components/ui/GlassCard';
import GlassButton from '../components/ui/GlassButton';
import MiniCardForm from '../components/forms/MiniCardForm';

const HomePage = () => {
  const { isDark, currentTheme } = useRoleTheme();
  const { user } = useAuth();
  
  // Set document title
  useDocumentTitle('Home | FuturistCards');
  const [showMiniCardForm, setShowMiniCardForm] = useState(false);

  const features = [
    {
      icon: SparklesIcon,
      title: 'Fast and Easy',
      description: 'Create a professional business card in minutes',
      color: 'from-blue-500 to-cyan-500'
    },
    {
      icon: CreditCardIcon,
      title: 'Beautiful Design',
      description: 'Stunning templates and customization options',
      color: 'from-purple-500 to-pink-500'
    },
    {
      icon: HeartIcon,
      title: 'Safe and Secure',
      description: 'Your data is protected with the highest security level',
      color: 'from-green-500 to-emerald-500'
    },
    {
      icon: GlobeAltIcon,
      title: 'Global Reach',
      description: 'Share your card with anyone, anywhere in the world',
      color: 'from-orange-500 to-red-500'
    }
  ];

  const stats = [
    { number: '10K+', label: 'Users', icon: UserGroupIcon },
    { number: '50K+', label: 'Cards', icon: CreditCardIcon },
    { number: '99.9%', label: 'Uptime', icon: BoltIcon },
    { number: '4.9/5', label: 'Rating', icon: StarIcon }
  ];

  const testimonials = [
    {
      name: 'John Cohen',
      role: 'Marketing Manager',
      content: 'This platform completely changed the way I network. The digital business cards are professional and impressive!',
      avatar: 'JD'
    },
    {
      name: 'Sarah Levy',
      role: 'Entrepreneur',
      content: 'Easy to use with amazing results. My clients are impressed with my innovative digital card.',
      avatar: 'SC'
    },
    {
      name: 'Michael David',
      role: 'Software Developer',
      content: 'The advanced technology and modern design make this the perfect solution for tech professionals.',
      avatar: 'MT'
    }
  ];

  return (
    <>
      <Helmet>
        <title>Advanced Digital Business Cards - FuturistCards</title>
        <meta name="description" content="Create professional digital business cards easily and quickly" />
      </Helmet>
      
    <div className="min-h-screen w-full bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Hero Section */}
      <div className="relative overflow-hidden w-full pt-20">
        <div className="container mx-auto px-4 py-20">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 1, delay: 0.2 }}
              className="mb-6"
            >
              <span className="inline-block px-4 py-2 rounded-full text-sm font-medium mb-4"
                    style={{ 
                      backgroundColor: currentTheme.colors.primary + '20',
                      color: currentTheme.colors.primary 
                    }}>
                <svg className="w-5 h-5 inline mr-2 text-yellow-400" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                </svg>
                Leading Platform
              </span>
            </motion.div>
            
            <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight text-white">
              <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                {user ? `Welcome Back, ${user.name}!` : 'Advanced Digital Business Cards'}
              </span>
            </h1>
            
            <p className="text-xl mb-12 max-w-4xl mx-auto leading-relaxed text-gray-300">
              {user ? 
                'Ready to create a new business card or manage your existing cards?' : 
                'Create professional digital business cards easily and quickly'
              }
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center mb-12">
              {user ? (
                // Boutons pour utilisateurs connectés
                <>
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <GlassButton
                      size="lg"
                      as={Link}
                      to="/create-card"
                      data-testid="create-advanced-card-button"
                      className="px-8 py-4 text-lg font-semibold"
                    >
                      <SparklesIcon className="w-6 h-6 ml-3" />
                      Create Advanced Card
                    </GlassButton>
                  </motion.div>
                  
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <GlassButton
                      variant="secondary"
                      size="lg"
                      as={Link}
                      to="/dashboard"
                      data-testid="dashboard-button"
                      className="px-8 py-4 text-lg font-semibold"
                    >
                      <ChartBarIcon className="w-6 h-6 ml-3" />
                      Dashboard
                    </GlassButton>
                  </motion.div>
                </>
              ) : (
                // Boutons pour visiteurs non connectés
                <>
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <GlassButton
                      size="lg"
                      onClick={() => setShowMiniCardForm(true)}
                      data-testid="create-card-button"
                      className="px-8 py-4 text-lg font-semibold"
                    >
                      <SparklesIcon className="w-6 h-6 ml-3" />
                      Create Your Card
                    </GlassButton>
                  </motion.div>
                  
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <GlassButton
                      variant="secondary"
                      size="lg"
                      as={Link}
                      to="/register"
                      data-testid="register-button"
                      className="px-8 py-4 text-lg font-semibold"
                    >
                      <UserGroupIcon className="w-6 h-6 ml-3" />
                      Register Now
                    </GlassButton>
                  </motion.div>
                </>
              )}
              
              {/* Bouton commun pour tous */}
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <GlassButton
                  variant="outline"
                  size="lg"
                  as={Link}
                  to="/cards"
                  data-testid="browse-cards-button"
                  className="px-8 py-4 text-lg font-semibold"
                >
                  <CreditCardIcon className="w-6 h-6 ml-3" />
                  Browse Cards
                </GlassButton>
              </motion.div>
            </div>
            
            {/* Trust Indicators / User Status */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="flex flex-wrap justify-center items-center gap-8 text-sm text-gray-300"
            >
              {user ? (
                // Indicateurs pour utilisateurs connectés
                <>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                    <span className="text-green-400 font-medium">Connected as {user.role === 'admin' ? 'Admin' : user.role === 'business' ? 'Business' : 'User'}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CreditCardIcon className="w-5 h-5 text-blue-400" />
                    Advanced Tools
                  </div>
                  <div className="flex items-center gap-2">
                    <ChartBarIcon className="w-5 h-5 text-purple-400" />
                    Full Analytics
                  </div>
                </>
              ) : (
                // Indicateurs pour visiteurs
                <>
                  <div className="flex items-center gap-2">
                    <ShieldCheckIcon className="w-5 h-5 text-green-400" />
                    Secure
                  </div>
                  <div className="flex items-center gap-2">
                    <BoltIcon className="w-5 h-5 text-yellow-400" />
                    Fast
                  </div>
                  <div className="flex items-center gap-2">
                    <StarIcon className="w-5 h-5 text-blue-400" />
                    5.0 Rating
                  </div>
                </>
              )}
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-24 w-full">
        <div className="container mx-auto px-4">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl font-bold mb-4 text-white">
              Why Choose Us?
            </h2>
            <p className="text-lg text-gray-300">
              Discover the advantages of our digital business cards
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 lg:gap-8 xl:gap-10">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 * index }}
                whileHover={{ y: -10 }}
              >
                <GlassCard className="p-6 text-center h-full hover:shadow-2xl transition-all duration-300">
                  <div className={`w-16 h-16 bg-gradient-to-r ${feature.color} rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg`}>
                    <feature.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3 text-white">
                    {feature.title}
                  </h3>
                  <p className="leading-relaxed text-gray-300">
                    {feature.description}
                  </p>
                </GlassCard>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="py-20 bg-gradient-to-r from-blue-600 to-purple-600 w-full">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 lg:gap-8 xl:gap-12 text-center text-white">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.1 * index }}
                className="text-center"
              >
                <stat.icon className="w-12 h-12 mx-auto mb-4 opacity-80" />
                <div className="text-4xl font-bold mb-2">{stat.number}</div>
                <div className="text-lg opacity-90">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Testimonials Section */}
      <div className="py-24 bg-black/20 w-full">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="mb-20"
          >
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold mb-4 text-white">
                What Our Customers Say
              </h2>
              <p className="text-xl text-gray-300">
                Thousands of satisfied customers worldwide
              </p>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8 xl:gap-10">
              {testimonials.map((testimonial, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.1 * index }}
                  whileHover={{ scale: 1.02 }}
                >
                  <GlassCard className="p-6 h-full">
                    <div className="flex items-center mb-4">
                      <div className="text-3xl mr-3">{testimonial.avatar}</div>
                      <div>
                        <div className="font-semibold text-white">
                          {testimonial.name}
                        </div>
                        <div className="text-sm text-gray-300">
                          {testimonial.role}
                        </div>
                      </div>
                    </div>
                    <p className="italic text-gray-300">
                      "{testimonial.content}"
                    </p>
                    <div className="flex mt-4">
                      {[...Array(5)].map((_, i) => (
                        <StarIcon key={i} className="w-4 h-4 text-yellow-400" fill="currentColor" />
                      ))}
                    </div>
                  </GlassCard>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-20 bg-gradient-to-r from-purple-600 to-blue-600 w-full">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1 }}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.6, delay: 1.2 }}
              className="text-white"
            >
              <h2 className="text-4xl md:text-5xl font-bold mb-6">Ready to Get Started?</h2>
              <p className="text-xl md:text-2xl mb-10 opacity-90 max-w-2xl mx-auto">
                Join thousands of professionals who have already upgraded their networking
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Link 
                    to="/register" 
                    className="inline-flex items-center bg-white text-blue-600 px-8 py-4 rounded-xl hover:bg-gray-100 transition-all duration-300 font-semibold text-lg shadow-lg"
                    data-testid="cta-register"
                  >
                    <UserGroupIcon className="w-6 h-6 ml-2" />
                    Create Free Account
                  </Link>
                </motion.div>
                
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Link 
                    to="/cards" 
                    className="inline-flex items-center border-2 border-white text-white px-8 py-4 rounded-xl hover:bg-white hover:text-blue-600 transition-all duration-300 font-semibold text-lg"
                    data-testid="cta-browse"
                  >
                    <CreditCardIcon className="w-6 h-6 ml-2" />
                    Browse Cards
                  </Link>
                </motion.div>
              </div>
              
              <div className="mt-8 flex flex-wrap justify-center items-center gap-6 text-sm opacity-80">
                <div className="flex items-center gap-2">
                  <ShieldCheckIcon className="w-4 h-4" />
                  100% Secure
                </div>
                <div className="flex items-center gap-2">
                  <DevicePhoneMobileIcon className="w-4 h-4" />
                  Mobile Compatible
                </div>
                <div className="flex items-center gap-2">
                  <BoltIcon className="w-4 h-4" />
                  Lightning Fast
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Mini Card Form Modal */}
      <MiniCardForm
        isOpen={showMiniCardForm}
        onClose={() => setShowMiniCardForm(false)}
      />
    </div>
    </>
  );
};

export default HomePage;
