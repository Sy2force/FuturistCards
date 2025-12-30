import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from "../hooks/useTranslation";
import { motion } from 'framer-motion';
import { useRoleTheme } from '../context/ThemeProvider';
import { 
  SparklesIcon, 
  CreditCardIcon, 
  HeartIcon, 
  GlobeAltIcon,
  StarIcon,
  ShieldCheckIcon,
  BoltIcon,
  UserGroupIcon,
  ChartBarIcon,
  DevicePhoneMobileIcon
} from '@heroicons/react/24/outline';
import GlassCard from '../components/ui/GlassCard';
import GlassButton from '../components/ui/GlassButton';
import MiniCardForm from '../components/forms/MiniCardForm';

const HomePage = () => {
  const { t } = useTranslation();
  const { currentTheme } = useRoleTheme();
  const [showMiniCardForm, setShowMiniCardForm] = useState(false);

  const features = [
    {
      icon: SparklesIcon,
      title: t('home.features.fast.title'),
      description: t('home.features.fast.description'),
      color: 'from-blue-500 to-cyan-500'
    },
    {
      icon: CreditCardIcon,
      title: t('home.features.beautiful.title'),
      description: t('home.features.beautiful.description'),
      color: 'from-purple-500 to-pink-500'
    },
    {
      icon: HeartIcon,
      title: t('home.features.secure.title'),
      description: t('home.features.secure.description'),
      color: 'from-green-500 to-emerald-500'
    },
    {
      icon: GlobeAltIcon,
      title: t('home.features.global.title'),
      description: t('home.features.global.description'),
      color: 'from-orange-500 to-red-500'
    }
  ];

  const stats = [
    { number: '10K+', label: t('home.stats.users'), icon: UserGroupIcon },
    { number: '50K+', label: t('home.stats.cards'), icon: CreditCardIcon },
    { number: '99.9%', label: t('home.stats.uptime'), icon: BoltIcon },
    { number: '4.9/5', label: t('home.stats.rating'), icon: StarIcon }
  ];

  const testimonials = [
    {
      name: t('home.testimonials.john.name'),
      role: t('home.testimonials.john.role'),
      content: t('home.testimonials.john.content'),
      avatar: 'JD'
    },
    {
      name: t('home.testimonials.sarah.name'),
      role: t('home.testimonials.sarah.role'),
      content: t('home.testimonials.sarah.content'),
      avatar: 'SC'
    },
    {
      name: t('home.testimonials.mike.name'),
      role: t('home.testimonials.mike.role'),
      content: t('home.testimonials.mike.content'),
      avatar: 'MT'
    }
  ];

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-blue-900" dir="rtl">
      {/* Hero Section */}
      <div className="relative overflow-hidden w-full">
        <div className="relative w-full px-4 sm:px-6 lg:px-8 xl:px-12 2xl:px-16 py-20">
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
                {t('home.badge')}
              </span>
            </motion.div>
            
            <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight"
                style={{ color: currentTheme.colors.text.primary }}>
              <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                {t('home.title')}
              </span>
            </h1>
            
            <p className="text-xl mb-12 max-w-4xl mx-auto leading-relaxed"
               style={{ color: currentTheme.colors.text.secondary }}>
              {t('home.subtitle')}
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center mb-12">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <GlassButton
                  size="lg"
                  onClick={() => setShowMiniCardForm(true)}
                  data-testid="mini-card-cta"
                  className="px-8 py-4 text-lg font-semibold"
                >
                  <SparklesIcon className="w-6 h-6 mr-3" />
                  {t('home.createCard')}
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
                  to="/cards"
                  data-testid="browse-cards-button"
                  className="px-8 py-4 text-lg font-semibold"
                >
                  <CreditCardIcon className="w-6 h-6 mr-3" />
                  {t('home.browseCards')}
                </GlassButton>
              </motion.div>
            </div>
            
            {/* Trust Indicators */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="flex flex-wrap justify-center items-center gap-8 text-sm"
              style={{ color: currentTheme.colors.text.secondary }}
            >
              <div className="flex items-center gap-2">
                <ShieldCheckIcon className="w-5 h-5" style={{ color: currentTheme.colors.success }} />
                {t('home.trust.secure')}
              </div>
              <div className="flex items-center gap-2">
                <BoltIcon className="w-5 h-5" style={{ color: currentTheme.colors.warning }} />
                {t('home.trust.fast')}
              </div>
              <div className="flex items-center gap-2">
                <StarIcon className="w-5 h-5" style={{ color: currentTheme.colors.primary }} />
                {t('home.trust.rated')}
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-24 bg-gradient-to-b from-transparent to-blue-50/50 dark:to-gray-800/50 w-full">
        <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-12 2xl:px-16">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl font-bold mb-4" style={{ color: currentTheme.colors.text.primary }}>
              {t('home.features.title')}
            </h2>
            <p className="text-lg" style={{ color: currentTheme.colors.text.secondary }}>
              {t('home.features.subtitle')}
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
                  <h3 className="text-xl font-semibold mb-3" style={{ color: currentTheme.colors.text.primary }}>
                    {feature.title}
                  </h3>
                  <p className="leading-relaxed" style={{ color: currentTheme.colors.text.secondary }}>
                    {feature.description}
                  </p>
                </GlassCard>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="py-20 bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-700 dark:to-purple-700 w-full">
        <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-12 2xl:px-16">
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
      <div className="py-24 bg-gray-50 dark:bg-gray-800/50 w-full">
        <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-12 2xl:px-16">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="mb-20"
          >
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold mb-4" style={{ color: currentTheme.colors.text.primary }}>
                {t('home.testimonials.title')}
              </h2>
              <p className="text-xl" style={{ color: currentTheme.colors.text.secondary }}>
                {t('home.testimonials.subtitle')}
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
                        <div className="font-semibold" style={{ color: currentTheme.colors.text.primary }}>
                          {testimonial.name}
                        </div>
                        <div className="text-sm" style={{ color: currentTheme.colors.text.secondary }}>
                          {testimonial.role}
                        </div>
                      </div>
                    </div>
                    <p className="italic" style={{ color: currentTheme.colors.text.secondary }}>
                      "{testimonial.content}"
                    </p>
                    <div className="flex mt-4">
                      {[...Array(5)].map((_, i) => (
                        <StarIcon key={i} className="w-4 h-4" style={{ color: currentTheme.colors.warning }} fill="currentColor" />
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
      <div className="py-20 bg-gradient-to-r from-purple-600 to-blue-600 dark:from-purple-700 dark:to-blue-700 w-full">
        <div className="w-full text-center px-4 sm:px-6 lg:px-8 xl:px-12 2xl:px-16">
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
              <h2 className="text-4xl md:text-5xl font-bold mb-6">{t('home.readyToStart')}</h2>
              <p className="text-xl md:text-2xl mb-10 opacity-90 max-w-2xl mx-auto">
                {t('home.joinProfessionals')}
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
                    <UserGroupIcon className="w-6 h-6 mr-2" />
                    {t('home.createAccount')}
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
                    <CreditCardIcon className="w-6 h-6 mr-2" />
                    {t('home.browseCards')}
                  </Link>
                </motion.div>
              </div>
              
              <div className="mt-8 flex flex-wrap justify-center items-center gap-6 text-sm opacity-80">
                <div className="flex items-center gap-2">
                  <ShieldCheckIcon className="w-4 h-4" />
                  {t('home.cta.secure')}
                </div>
                <div className="flex items-center gap-2">
                  <DevicePhoneMobileIcon className="w-4 h-4" />
                  {t('home.cta.mobile')}
                </div>
                <div className="flex items-center gap-2">
                  <BoltIcon className="w-4 h-4" />
                  {t('home.cta.instant')}
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
  );
};

export default HomePage;
