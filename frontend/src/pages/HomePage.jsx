import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Helmet } from 'react-helmet-async';
import { 
  RocketLaunchIcon, 
  BoltIcon, 
  ShieldCheckIcon, 
  SparklesIcon, 
  InformationCircleIcon,
  StarIcon,
  HeartIcon,
  CpuChipIcon
} from '@heroicons/react/24/outline';

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
        className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center px-4 relative overflow-hidden"
      >
        {/* Floating elements background */}
        <div className="absolute inset-0 overflow-hidden">
          <motion.div
            animate={{
              y: [-20, 20, -20],
              rotate: [0, 5, -5, 0]
            }}
            transition={{ duration: 6, repeat: Infinity }}
            className="absolute top-20 left-10 w-16 h-16 bg-blue-500/20 rounded-full blur-xl"
          />
          <motion.div
            animate={{
              y: [20, -20, 20],
              rotate: [0, -5, 5, 0]
            }}
            transition={{ duration: 8, repeat: Infinity }}
            className="absolute top-40 right-20 w-20 h-20 bg-purple-500/20 rounded-full blur-xl"
          />
          <motion.div
            animate={{
              y: [-10, 10, -10],
              x: [-10, 10, -10]
            }}
            transition={{ duration: 10, repeat: Infinity }}
            className="absolute bottom-40 left-20 w-12 h-12 bg-pink-500/20 rounded-full blur-xl"
          />
        </div>
        
      <div className="text-center max-w-5xl mx-auto relative z-10">
        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.1, type: "spring", bounce: 0.3 }}
          className="mb-4"
        >
          <SparklesIcon className="w-16 h-16 mx-auto text-yellow-400 mb-4" />
        </motion.div>
        
        <motion.h1 
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-6xl md:text-8xl font-bold mb-6 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent"
        >
          CardPro
        </motion.h1>
        
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.3, type: "spring" }}
          className="flex justify-center items-center gap-2 mb-6"
        >
          <StarIcon className="w-6 h-6 text-yellow-400" />
          <StarIcon className="w-6 h-6 text-yellow-400" />
          <StarIcon className="w-6 h-6 text-yellow-400" />
          <StarIcon className="w-6 h-6 text-yellow-400" />
          <StarIcon className="w-6 h-6 text-yellow-400" />
          <span className="text-gray-300 ml-2 font-medium">5.0 ★ Plateforme Premium</span>
        </motion.div>
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
          className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12"
        >
          <motion.div 
            whileHover={{ scale: 1.08, y: -10, rotateY: 5 }}
            className="bg-gradient-to-br from-white/15 via-white/10 to-white/5 backdrop-blur-lg rounded-2xl p-8 border border-white/20 glass-light transition-all duration-500 shadow-2xl hover:shadow-blue-500/20"
          >
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ delay: 0.8, type: "spring", bounce: 0.5 }}
              className="relative"
            >
              <div className="bg-gradient-to-r from-green-400 to-blue-500 p-3 rounded-full w-16 h-16 mx-auto mb-6 flex items-center justify-center">
                <RocketLaunchIcon className="w-8 h-8 text-white" />
              </div>
              <div className="absolute -top-2 -right-2 w-6 h-6 bg-yellow-400 rounded-full animate-pulse" />
            </motion.div>
            <h2 className="text-2xl font-bold mb-4 text-white">{t('startToday')}</h2>
            <p className="text-gray-300 text-sm leading-relaxed">{t('elegantInterface')}</p>
            <motion.div 
              className="mt-4 flex justify-center"
              whileHover={{ scale: 1.1 }}
            >
              <HeartIcon className="w-5 h-5 text-red-400" />
            </motion.div>
          </motion.div>

          <motion.div 
            whileHover={{ scale: 1.08, y: -10, rotateY: -5 }}
            className="bg-gradient-to-br from-white/15 via-white/10 to-white/5 backdrop-blur-lg rounded-2xl p-8 border border-white/20 glass-light transition-all duration-500 shadow-2xl hover:shadow-purple-500/20"
          >
            <motion.div
              initial={{ scale: 0, rotate: 180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ delay: 1.0, type: "spring", bounce: 0.5 }}
              className="relative"
            >
              <div className="bg-gradient-to-r from-blue-400 to-purple-500 p-3 rounded-full w-16 h-16 mx-auto mb-6 flex items-center justify-center">
                <BoltIcon className="w-8 h-8 text-white" />
              </div>
              <div className="absolute -top-2 -right-2 w-6 h-6 bg-blue-400 rounded-full animate-bounce" />
            </motion.div>
            <h3 className="text-2xl font-bold mb-4 text-white">{t('reactTechnology')}</h3>
            <p className="text-gray-300 text-sm leading-relaxed">{t('modernStack')}</p>
            <motion.div 
              className="mt-4 flex justify-center"
              whileHover={{ rotate: 360 }}
              transition={{ duration: 0.5 }}
            >
              <CpuChipIcon className="w-5 h-5 text-blue-400" />
            </motion.div>
          </motion.div>

          <motion.div 
            whileHover={{ scale: 1.08, y: -10, rotateY: 5 }}
            className="bg-gradient-to-br from-white/15 via-white/10 to-white/5 backdrop-blur-lg rounded-2xl p-8 border border-white/20 glass-light transition-all duration-500 shadow-2xl hover:shadow-green-500/20"
          >
            <motion.div
              initial={{ scale: 0, rotate: -90 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ delay: 1.2, type: "spring", bounce: 0.5 }}
              className="relative"
            >
              <div className="bg-gradient-to-r from-purple-400 to-pink-500 p-3 rounded-full w-16 h-16 mx-auto mb-6 flex items-center justify-center">
                <ShieldCheckIcon className="w-8 h-8 text-white" />
              </div>
              <div className="absolute -top-2 -right-2 w-6 h-6 bg-green-400 rounded-full animate-pulse" />
            </motion.div>
            <h3 className="text-2xl font-bold mb-4 text-white">{t('security')}</h3>
            <p className="text-gray-300 text-sm leading-relaxed">{t('secureAuth')}</p>
            <motion.div 
              className="mt-4 flex justify-center"
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <ShieldCheckIcon className="w-5 h-5 text-green-400" />
            </motion.div>
          </motion.div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.4 }}
          className="flex flex-col sm:flex-row gap-6 justify-center mb-12"
        >
          <motion.div
            whileHover={{ scale: 1.1, y: -5 }}
            whileTap={{ scale: 0.95 }}
            className="relative"
          >
            <Link 
              to="/cards" 
              className="inline-flex items-center bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 hover:from-blue-600 hover:via-purple-600 hover:to-pink-600 text-white px-8 py-4 rounded-2xl font-bold text-lg transition-all shadow-2xl hover:shadow-blue-500/30 border border-white/20"
            >
              <SparklesIcon className="w-6 h-6 mr-3" />
              {t('getStarted')}
            </Link>
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
              className="absolute -top-2 -right-2 w-8 h-8 border-2 border-dashed border-yellow-400 rounded-full"
            />
          </motion.div>
          
          <motion.div
            whileHover={{ scale: 1.1, y: -5 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link 
              to="/about" 
              className="inline-flex items-center bg-gradient-to-r from-gray-600 to-gray-700 hover:from-gray-700 hover:to-gray-800 text-white px-8 py-4 rounded-2xl font-bold text-lg transition-all shadow-2xl hover:shadow-gray-500/20 border border-white/20"
            >
              <InformationCircleIcon className="w-6 h-6 mr-3" />
              {t('modernDesign')}
            </Link>
          </motion.div>
        </motion.div>
        
        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.6 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto"
        >
          <motion.div 
            whileHover={{ scale: 1.05 }}
            className="text-center bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-white/10"
          >
            <h3 className="text-3xl font-bold text-blue-400">10K+</h3>
            <p className="text-gray-300 text-sm">Cartes créées</p>
          </motion.div>
          
          <motion.div 
            whileHover={{ scale: 1.05 }}
            className="text-center bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-white/10"
          >
            <h3 className="text-3xl font-bold text-purple-400">5K+</h3>
            <p className="text-gray-300 text-sm">Professionnels</p>
          </motion.div>
          
          <motion.div 
            whileHover={{ scale: 1.05 }}
            className="text-center bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-white/10"
          >
            <h3 className="text-3xl font-bold text-green-400">99.9%</h3>
            <p className="text-gray-300 text-sm">Uptime</p>
          </motion.div>
          
          <motion.div 
            whileHover={{ scale: 1.05 }}
            className="text-center bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-white/10"
          >
            <h3 className="text-3xl font-bold text-yellow-400">24/7</h3>
            <p className="text-gray-300 text-sm">Support</p>
          </motion.div>
        </motion.div>

      </div>
      </motion.div>
    </>
  );
}

export default HomePage;
