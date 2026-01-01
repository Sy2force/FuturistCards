import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from "../hooks/useTranslation";
import { motion } from 'framer-motion';
import { 
  HomeIcon, 
  CreditCardIcon, 
  InformationCircleIcon,
  UserPlusIcon,
  ArrowRightIcon 
} from '@heroicons/react/24/outline';

const ErrorPage = () => {
  const { t } = useTranslation();
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center px-4" dir="rtl" lang="he">
      <div className="text-center max-w-lg mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-8"
        >
          <div className="text-8xl mb-6">🌌</div>
          <h1 className="text-6xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent mb-4">
            404
          </h1>
          <h2 className="text-3xl font-semibold text-white mb-4">
            {t('error.notFound.title')}
          </h2>
          <p className="text-gray-300 text-lg">
            {t('error.notFound.description')}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="space-y-4 mb-8"
        >
          <Link 
            to="/" 
            className="group flex items-center justify-center bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-600 hover:to-purple-600 text-white px-8 py-4 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105"
          >
            <HomeIcon className="w-5 h-5 mr-2" />
            {t('error.notFound.goHome')}
            <ArrowRightIcon className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
          </Link>
          
          <Link 
            to="/cards" 
            className="group flex items-center justify-center glass-card text-white px-8 py-4 rounded-lg font-semibold transition-all duration-300 hover:bg-white/10"
          >
            <CreditCardIcon className="w-5 h-5 mr-2" />
            {t('error.notFound.viewCards')}
            <ArrowRightIcon className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="glass-card p-6"
        >
          <h3 className="font-semibold text-white mb-4 flex items-center justify-center">
            <InformationCircleIcon className="w-5 h-5 mr-2" />
            {t('error.notFound.suggestions')}
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-sm">
            <Link 
              to="/about" 
              className="text-cyan-400 hover:text-cyan-300 transition-colors p-2 rounded hover:bg-white/5"
            >
              {t('navbar.about')}
            </Link>
            <Link 
              to="/login" 
              className="text-cyan-400 hover:text-cyan-300 transition-colors p-2 rounded hover:bg-white/5"
            >
              {t('navbar.login')}
            </Link>
            <Link 
              to="/register" 
              className="text-cyan-400 hover:text-cyan-300 transition-colors p-2 rounded hover:bg-white/5"
            >
              {t('navbar.register')}
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ErrorPage;
