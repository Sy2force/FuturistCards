import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Helmet } from 'react-helmet-async';
import { CheckCircleIcon, CogIcon, ShieldCheckIcon, EyeIcon, InformationCircleIcon } from '@heroicons/react/24/outline';

function HomePage() {
  const { t } = useTranslation();
  
  return (
    <>
      <Helmet>
        <title>{t('homePageTitle')}</title>
        <meta name="description" content={t('homePageDescription')} />
      </Helmet>
      
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center px-4"
      >
      <div className="text-center max-w-4xl mx-auto">
        <motion.h1 
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent"
        >
          CardPro
        </motion.h1>
        <motion.p 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-xl md:text-2xl mb-8 text-gray-300"
        >
          {t('homePageSubtitle')}
        </motion.p>

        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12"
        >
          <motion.div 
            whileHover={{ scale: 1.05, y: -5 }}
            className="bg-white/10 backdrop-blur-lg rounded-lg p-6 border border-white/20 glass-light transition-all duration-300"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.8, type: "spring", bounce: 0.5 }}
            >
              <CheckCircleIcon className="w-10 h-10 text-green-400 mb-4 mx-auto" />
            </motion.div>
            <h2 className="text-2xl font-bold mb-6 text-white">{t('startToday')}</h2>
            <p className="text-gray-300 text-sm">{t('elegantInterface')}</p>
          </motion.div>

          <motion.div 
            whileHover={{ scale: 1.05, y: -5 }}
            className="bg-white/10 backdrop-blur-lg rounded-lg p-6 border border-white/20 glass-light transition-all duration-300"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 1.0, type: "spring", bounce: 0.5 }}
            >
              <CogIcon className="w-10 h-10 text-blue-400 mb-4 mx-auto" />
            </motion.div>
            <h3 className="text-lg font-semibold mb-2 text-white">{t('reactTechnology')}</h3>
            <p className="text-gray-300 text-sm">{t('modernStack')}</p>
          </motion.div>

          <motion.div 
            whileHover={{ scale: 1.05, y: -5 }}
            className="bg-white/10 backdrop-blur-lg rounded-lg p-6 border border-white/20 glass-light transition-all duration-300"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 1.2, type: "spring", bounce: 0.5 }}
            >
              <ShieldCheckIcon className="w-10 h-10 text-purple-400 mb-4 mx-auto" />
            </motion.div>
            <h3 className="text-lg font-semibold mb-2 text-white">{t('security')}</h3>
            <p className="text-gray-300 text-sm">{t('secureAuth')}</p>
          </motion.div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.4 }}
          className="flex flex-col sm:flex-row gap-4 justify-center mb-12"
        >
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link 
              to="/cards" 
              className="inline-flex items-center bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg font-medium transition-all shadow-lg"
            >
              <EyeIcon className="w-5 h-5 mr-2" />
              {t('getStarted')}
            </Link>
          </motion.div>
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link 
              to="/about" 
              className="inline-flex items-center bg-gray-500 hover:bg-gray-600 text-white px-6 py-3 rounded-lg font-medium transition-all shadow-lg"
            >
              <InformationCircleIcon className="w-5 h-5 mr-2" />
              {t('modernDesign')}
            </Link>
          </motion.div>
        </motion.div>

      </div>
      </motion.div>
    </>
  );
}

export default HomePage;
