import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useRoleTheme } from '../context/ThemeProvider';
import { useAuth } from '../context/AuthContext';
import { Helmet } from 'react-helmet-async';
import {
  SparklesIcon,
  ShareIcon,
  ShieldCheckIcon,
  RocketLaunchIcon,
  UserGroupIcon,
  HeartIcon,
  StarIcon,
  CheckCircleIcon
} from '@heroicons/react/24/outline';
import GlassCard from '../components/ui/GlassCard';
import GlassButton from '../components/ui/GlassButton';

const AboutPage = () => {
  const { isDark } = useRoleTheme();
  const { user } = useAuth();
  
  // Set document title
  
  const features = [
    {
      icon: SparklesIcon,
      title: 'Fast and Easy',
      description: 'Create a professional business card in minutes',
      color: 'from-blue-500 to-cyan-500'
    },
    {
      icon: ShareIcon,
      title: 'Easy Sharing',
      description: 'Share your card across all digital platforms',
      color: 'from-purple-500 to-pink-500'
    },
    {
      icon: ShieldCheckIcon,
      title: 'Safe and Secure',
      description: 'Your data is protected with the highest security level',
      color: 'from-green-500 to-emerald-500'
    }
  ];

  const stats = [
    { number: '10K+', label: 'Users', icon: UserGroupIcon },
    { number: '50K+', label: 'Cards', icon: HeartIcon },
    { number: '99.9%', label: 'Satisfaction', icon: StarIcon },
    { number: '24/7', label: 'Support', icon: CheckCircleIcon }
  ];

  return (
    <>
      <Helmet>
        <title>About FuturistCards - Digital Business Cards</title>
        <meta name="description" content="The leading platform for creating advanced digital business cards" />
      </Helmet>
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 pt-20" data-testid="about-page">
      {/* Hero Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <motion.div
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
              <span className="inline-block px-4 py-2 rounded-full text-sm font-medium mb-4 bg-blue-500/20 text-blue-400">
                <svg className="w-5 h-5 inline ml-2 text-yellow-400" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                </svg>
                Leading Platform
              </span>
            </motion.div>
            
            <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight text-white">
              <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                About FuturistCards
              </span>
            </h1>
            
            <p className="text-xl mb-12 max-w-3xl mx-auto leading-relaxed text-gray-300">
              The leading platform for creating advanced digital business cards
            </p>
          </motion.div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold mb-6 text-white">
              Our Mission
            </h2>
            <p className="text-xl max-w-4xl mx-auto text-gray-300">
              We are committed to providing advanced digital solutions for creating professional business cards
            </p>
          </motion.div>

          <div className="p-8 md:p-12 mb-16 rounded-2xl bg-black/20 border border-white/20 backdrop-blur-sm">
            <div className="prose max-w-none">
              <p className="text-lg mb-8 leading-relaxed text-gray-300">
                FuturistCards is an innovative platform that allows you to create professional digital business cards easily and quickly
              </p>
            </div>
          </div>

          {/* Stats Section */}
          <motion.div 
            className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-20"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.1 * index }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="p-6 hover:scale-105 transition-transform duration-300 rounded-2xl bg-black/20 border border-white/20 backdrop-blur-sm">
                  <stat.icon className="w-8 h-8 mx-auto mb-3 text-blue-400" />
                  <div className="text-3xl font-bold mb-2 text-white">
                    {stat.number}
                  </div>
                  <div className="text-sm text-gray-400">
                    {stat.label}
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Features Grid */}
          <motion.div 
            className="grid md:grid-cols-3 gap-8 mb-20"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
            data-testid="about-features"
          >
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 * index }}
                viewport={{ once: true }}
                whileHover={{ y: -10 }}
              >
                <div className="p-8 text-center h-full hover:shadow-2xl transition-all duration-300 rounded-2xl bg-black/20 border border-white/20 backdrop-blur-sm">
                  <div className={`w-16 h-16 bg-gradient-to-r ${feature.color} rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg`}>
                    <feature.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold mb-4 text-white">
                    {feature.title}
                  </h3>
                  <p className="leading-relaxed text-gray-300">
                    {feature.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Vision Section */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <div className="p-8 md:p-12 rounded-2xl bg-black/20 border border-white/20 backdrop-blur-sm">
              <h3 className="text-3xl font-bold mb-6 text-white">
                Our Vision
              </h3>
              <p className="text-lg leading-relaxed max-w-4xl mx-auto text-gray-300">
                To make digital business cards the standard in the modern business world
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="relative overflow-hidden rounded-3xl"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600"></div>
            <div className="absolute inset-0 bg-black/20"></div>
            <div className="relative p-8 md:p-12 text-white">
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
              >
                <h3 className="text-3xl md:text-4xl font-bold mb-6">Ready to Start?</h3>
                <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">Join thousands of users using our platform</p>
                
                <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Link 
                      to={user ? "/dashboard" : "/register"}
                      data-testid="about-cta-button"
                      className="inline-flex items-center bg-white text-blue-600 px-8 py-4 rounded-xl hover:bg-gray-100 transition-all duration-300 font-semibold text-lg shadow-lg"
                    >
                      <RocketLaunchIcon className="w-6 h-6 ml-2" />
                      {user ? 'Create My Card' : 'Create Account'}
                    </Link>
                  </motion.div>
                  
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Link 
                      to="/cards" 
                      className="inline-flex items-center border-2 border-white text-white px-8 py-4 rounded-xl hover:bg-white hover:text-blue-600 transition-all duration-300 font-semibold text-lg"
                      data-testid="about-explore-button"
                    >
                      <HeartIcon className="w-6 h-6 ml-2" />
                      Discover Cards
                    </Link>
                  </motion.div>
                </div>
                
                <div className="flex justify-center items-center gap-8 text-sm opacity-80">
                  <div className="flex items-center gap-2">
                    <CheckCircleIcon className="w-4 h-4" />
                    Completely Free
                  </div>
                  <div className="flex items-center gap-2">
                    <ShieldCheckIcon className="w-4 h-4" />
                    Safe and Secure
                  </div>
                  <div className="flex items-center gap-2">
                    <StarIcon className="w-4 h-4" fill="currentColor" />
                    5 Star Rating
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
    </>
  );
};

export default AboutPage;
