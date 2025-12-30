import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from "../hooks/useTranslation";
import { motion } from 'framer-motion';
import { 
  RocketLaunchIcon, 
  GlobeAltIcon, 
  ShieldCheckIcon,
  ArrowRightIcon 
} from '@heroicons/react/24/outline';

const SimpleHomePage = () => {
  const { t } = useTranslation();

  const features = [
    {
      icon: RocketLaunchIcon,
      title: t('home.features.fast.title'),
      description: t('home.features.fast.description')
    },
    {
      icon: GlobeAltIcon,
      title: t('home.features.global.title'),
      description: t('home.features.global.description')
    },
    {
      icon: ShieldCheckIcon,
      title: t('home.features.secure.title'),
      description: t('home.features.secure.description')
    }
  ];

  return (
    <div data-testid="home-page" className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900" dir="rtl">
      <div className="max-w-6xl mx-auto px-4 py-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
            👋 {t('home.title')}
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto">
            {t('home.subtitle')}
          </p>
        </motion.div>
        
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {features.map((feature, index) => {
            const IconComponent = feature.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className="glass-card p-8 text-center hover:scale-105 transition-transform duration-300"
              >
                <div className="inline-flex p-4 rounded-full bg-gradient-to-r from-cyan-500 to-purple-500 mb-6">
                  <IconComponent className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-4">{feature.title}</h3>
                <p className="text-gray-300">{feature.description}</p>
              </motion.div>
            );
          })}
        </div>
        
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-center space-y-4 sm:space-y-0 sm:space-x-6 sm:flex sm:justify-center"
        >
          <Link
            to="/register"
            className="group inline-flex items-center bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-600 hover:to-purple-600 text-white px-8 py-4 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105"
          >
            {t('home.createCard')}
            <ArrowRightIcon className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
          </Link>
          <Link
            to="/about"
            className="group inline-flex items-center glass-card text-white px-8 py-4 rounded-lg font-semibold transition-all duration-300 hover:bg-white/10"
          >
            {t('home.learnMore')}
            <ArrowRightIcon className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>
      </div>
    </div>
  );
};

export default SimpleHomePage;
