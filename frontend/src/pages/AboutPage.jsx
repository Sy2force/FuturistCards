import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from "../hooks/useTranslation";
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { useAuth } from '../context/AuthContext';
import { useRoleTheme } from '../context/ThemeProvider';
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
  const { t } = useTranslation();
  const { user } = useAuth();
  const { currentTheme } = useRoleTheme();
  
  const features = [
    {
      icon: SparklesIcon,
      title: t('about.quickCreation'),
      description: t('about.quickCreationDesc'),
      color: 'from-blue-500 to-cyan-500'
    },
    {
      icon: ShareIcon,
      title: t('about.easySharing'),
      description: t('about.easySharingDesc'),
      color: 'from-purple-500 to-pink-500'
    },
    {
      icon: ShieldCheckIcon,
      title: t('about.secure'),
      description: t('about.secureDesc'),
      color: 'from-green-500 to-emerald-500'
    }
  ];

  const stats = [
    { number: '10K+', label: t('about.stats.users'), icon: UserGroupIcon },
    { number: '50K+', label: t('about.stats.cards'), icon: HeartIcon },
    { number: '99.9%', label: t('about.stats.satisfaction'), icon: StarIcon },
    { number: '24/7', label: t('about.stats.support'), icon: CheckCircleIcon }
  ];

  return (
    <>
      <Helmet>
        <title>{t('about.title')} - {t('common.siteName')}</title>
        <meta name="description" content={t('about.description')} />
      </Helmet>
      <div className="min-h-screen" style={{ backgroundColor: currentTheme.colors.background }} data-testid="about-page" dir="rtl">
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
              <span className="inline-block px-4 py-2 rounded-full text-sm font-medium mb-4"
                    style={{ 
                      backgroundColor: currentTheme.colors.primary + '20',
                      color: currentTheme.colors.primary 
                    }}>
                <svg className="w-5 h-5 inline mr-2 text-yellow-400" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                </svg>
                {t('about.badge')}
              </span>
            </motion.div>
            
            <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight"
                style={{ color: currentTheme.colors.text.primary }}>
              <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                {t('about.title')}
              </span>
            </h1>
            
            <p className="text-xl mb-12 max-w-3xl mx-auto leading-relaxed"
               style={{ color: currentTheme.colors.text.secondary }}>
              {t('about.description')}
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
            <h2 className="text-4xl font-bold mb-6" style={{ color: currentTheme.colors.text.primary }}>
              {t('about.mission.title')}
            </h2>
            <p className="text-xl max-w-4xl mx-auto" style={{ color: currentTheme.colors.text.secondary }}>
              {t('about.mission.description')}
            </p>
          </motion.div>

          <GlassCard className="p-8 md:p-12 mb-16">
            <div className="prose max-w-none">
              <p className="text-lg mb-8 leading-relaxed" style={{ color: currentTheme.colors.text.secondary }}>
                {t('about.platform')}
              </p>
            </div>
          </GlassCard>

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
                <GlassCard className="p-6 hover:scale-105 transition-transform duration-300">
                  <stat.icon className="w-8 h-8 mx-auto mb-3" style={{ color: currentTheme.colors.primary }} />
                  <div className="text-3xl font-bold mb-2" style={{ color: currentTheme.colors.text.primary }}>
                    {stat.number}
                  </div>
                  <div className="text-sm" style={{ color: currentTheme.colors.text.secondary }}>
                    {stat.label}
                  </div>
                </GlassCard>
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
                <GlassCard className="p-8 text-center h-full hover:shadow-2xl transition-all duration-300">
                  <div className={`w-16 h-16 bg-gradient-to-r ${feature.color} rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg`}>
                    <feature.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold mb-4" style={{ color: currentTheme.colors.text.primary }}>
                    {feature.title}
                  </h3>
                  <p className="leading-relaxed" style={{ color: currentTheme.colors.text.secondary }}>
                    {feature.description}
                  </p>
                </GlassCard>
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
            <GlassCard className="p-8 md:p-12">
              <h3 className="text-3xl font-bold mb-6" style={{ color: currentTheme.colors.text.primary }}>
                {t('about.vision.title')}
              </h3>
              <p className="text-lg leading-relaxed max-w-4xl mx-auto" style={{ color: currentTheme.colors.text.secondary }}>
                {t('about.conclusion')}
              </p>
            </GlassCard>
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
                <h3 className="text-3xl md:text-4xl font-bold mb-6">{t('about.readyToStart')}</h3>
                <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">{t('about.joinThousands')}</p>
                
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
                      <RocketLaunchIcon className="w-6 h-6 mr-2" />
                      {user ? t('about.createMyCard') : t('about.createMyAccount')}
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
                      <HeartIcon className="w-6 h-6 mr-2" />
                      {t('about.exploreCards')}
                    </Link>
                  </motion.div>
                </div>
                
                <div className="flex justify-center items-center gap-8 text-sm opacity-80">
                  <div className="flex items-center gap-2">
                    <CheckCircleIcon className="w-4 h-4" />
                    {t('about.cta.free')}
                  </div>
                  <div className="flex items-center gap-2">
                    <ShieldCheckIcon className="w-4 h-4" />
                    {t('about.cta.secure')}
                  </div>
                  <div className="flex items-center gap-2">
                    <StarIcon className="w-4 h-4" fill="currentColor" />
                    {t('about.cta.rated')}
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
