import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { 
  SparklesIcon, 
  ShieldCheckIcon, 
  BoltIcon, 
  DevicePhoneMobileIcon, 
  EnvelopeIcon, 
  GlobeAltIcon,
  UserGroupIcon,
  ArrowRightIcon 
} from '@heroicons/react/24/outline';

const AboutPage = () => {
  
  return (
    <>
      <Helmet>
        <title>{t('aboutPageTitle')}</title>
        <meta name="description" content={t('aboutPageDescription')} />
      </Helmet>
      
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="min-h-screen bg-neutral-50 dark:bg-gray-900 py-12 px-4"
      >
      <div className="container mx-auto max-w-4xl">
        {/* Header */}
        <motion.div 
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="text-center mb-16"
        >
          <motion.h1 
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-primary-500 to-primary-700 bg-clip-text text-transparent mb-6 flex items-center justify-center"
          >
            <SparklesIcon className="w-12 h-12 text-primary-500 mr-4" />
            {t('aboutCardPro')}
          </motion.h1>
          <motion.p 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto"
          >
            {t('aboutSubtitle')}
          </motion.p>
        </motion.div>

        {/* Sections */}
        <div className="space-y-12">
          {/* Mission */}
          <motion.div 
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.6 }}
            whileHover={{ scale: 1.02 }}
            className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-xl border border-gray-200 dark:border-gray-700 glass-light dark:glass-dark"
          >
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center">
              <UserGroupIcon className="w-6 h-6 text-primary-500 mr-3" />
              {t('ourMission')}
            </h2>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
              {t('missionDescription')}
            </p>
          </motion.div>

          {/* Features */}
          <motion.div 
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.8 }}
            whileHover={{ scale: 1.02 }}
            className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-xl border border-gray-200 dark:border-gray-700 glass-light dark:glass-dark"
          >
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
              <SparklesIcon className="w-6 h-6 text-primary-500 mr-3" />
              {t('features')}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <motion.div 
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 1.0 }}
                whileHover={{ scale: 1.05 }}
                className="flex items-start space-x-3 p-4 rounded-xl hover:bg-primary-50 dark:hover:bg-primary-900/20 transition-all"
              >
                <div className="p-2 bg-primary-100 dark:bg-primary-900 rounded-lg">
                  <SparklesIcon className="w-6 h-6 text-primary-500" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white">{t('modernDesign')}</h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">
                    {t('modernDesignDesc')}
                  </p>
                </div>
              </motion.div>
              
              <motion.div 
                initial={{ x: 20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 1.1 }}
                whileHover={{ scale: 1.05 }}
                className="flex items-start space-x-3 p-4 rounded-xl hover:bg-success-50 dark:hover:bg-success-900/20 transition-all"
              >
                <div className="p-2 bg-success-100 dark:bg-success-900 rounded-lg">
                  <ShieldCheckIcon className="w-6 h-6 text-success-500" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white">{t('secure')}</h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">
                    {t('secureDesc')}
                  </p>
                </div>
              </motion.div>
              
              <motion.div 
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 1.2 }}
                whileHover={{ scale: 1.05 }}
                className="flex items-start space-x-3 p-4 rounded-xl hover:bg-accent-50 dark:hover:bg-accent-900/20 transition-all"
              >
                <div className="p-2 bg-accent-100 dark:bg-accent-900 rounded-lg">
                  <BoltIcon className="w-6 h-6 text-accent-500" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white">{t('performant')}</h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">
                    {t('performantDesc')}
                  </p>
                </div>
              </motion.div>
              
              <motion.div 
                initial={{ x: 20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 1.3 }}
                whileHover={{ scale: 1.05 }}
                className="flex items-start space-x-3 p-4 rounded-xl hover:bg-error-50 dark:hover:bg-error-900/20 transition-all"
              >
                <div className="p-2 bg-error-100 dark:bg-error-900 rounded-lg">
                  <DevicePhoneMobileIcon className="w-6 h-6 text-error-500" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white">{t('mobileFirst')}</h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">
                    {t('mobileFirstDesc')}
                  </p>
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* Technologies */}
          <motion.div 
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 1.4 }}
            whileHover={{ scale: 1.02 }}
            className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-xl border border-gray-200 dark:border-gray-700 glass-light dark:glass-dark"
          >
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
              <BoltIcon className="w-6 h-6 text-primary-500 mr-3" />
              {t('technologiesUsed')}
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { name: 'React 18', icon: '⚛️', color: 'primary' },
                { name: 'Node.js', icon: '🟢', color: 'success' },
                { name: 'MongoDB', icon: '🍃', color: 'accent' },
                { name: 'Tailwind', icon: '🎨', color: 'error' }
              ].map((tech, index) => (
                <motion.div
                  key={tech.name}
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 1.5 + index * 0.1 }}
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  className={`text-center p-6 bg-${tech.color}-50 dark:bg-${tech.color}-900/20 rounded-xl shadow-lg border border-${tech.color}-200 dark:border-${tech.color}-800 cursor-pointer`}
                >
                  <div className="text-3xl mb-3">{tech.icon}</div>
                  <p className="font-medium text-gray-900 dark:text-white">{tech.name}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Contact */}
          <motion.div 
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 1.9 }}
            whileHover={{ scale: 1.02 }}
            className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-xl border border-gray-200 dark:border-gray-700 glass-light dark:glass-dark"
          >
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center">
              <EnvelopeIcon className="w-6 h-6 text-primary-500 mr-3" />
              {t('contact')}
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              {t('contactDescription')}
            </p>
            <div className="space-y-4">
              <motion.div 
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 2.0 }}
                className="flex items-center space-x-3 text-gray-600 dark:text-gray-400 hover:text-primary-500 transition-colors"
              >
                <EnvelopeIcon className="w-5 h-5 text-primary-500" />
                <span>{'Email'} : contact@cardpro.com</span>
              </motion.div>
              <motion.div 
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 2.1 }}
                className="flex items-center space-x-3 text-gray-600 dark:text-gray-400 hover:text-primary-500 transition-colors"
              >
                <GlobeAltIcon className="w-5 h-5 text-primary-500" />
                <span>{'Site web'} : www.cardpro.com</span>
              </motion.div>
            </div>
          </motion.div>

          {/* Call to Action */}
          <motion.div 
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 2.2 }}
            whileHover={{ scale: 1.02 }}
            className="bg-gradient-to-r from-primary-500 to-primary-700 rounded-2xl p-8 text-center text-white shadow-2xl"
          >
            <motion.h2 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 2.3 }}
              className="text-2xl font-bold mb-4 flex items-center justify-center"
            >
              <SparklesIcon className="w-6 h-6 mr-3" />
              {t('readyToStart')}
            </motion.h2>
            <motion.p 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 2.4 }}
              className="mb-6 opacity-90"
            >
              {t('joinProfessionals')}
            </motion.p>
            <motion.div 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 2.5 }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link 
                  to="/register" 
                  className="inline-flex items-center bg-white text-primary-600 px-6 py-3 rounded-lg font-medium hover:bg-neutral-100 transition-all shadow-lg"
                >
                  {t('createAccount')}
                  <ArrowRightIcon className="w-4 h-4 ml-2" />
                </Link>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link 
                  to="/cards" 
                  className="inline-flex items-center bg-transparent border-2 border-white text-white px-6 py-3 rounded-lg font-medium hover:bg-white hover:text-primary-600 transition-all"
                >
                  {t('exploreCards')}
                  <ArrowRightIcon className="w-4 h-4 ml-2" />
                </Link>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </div>
      </motion.div>
    </>
  );
};

export default AboutPage;
