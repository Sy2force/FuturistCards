import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { CheckIcon, CogIcon, ShieldCheckIcon } from '@heroicons/react/24/outline';

function HomePage() {
  const { t } = useLanguage();
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900 flex items-center justify-center px-4">
      <div className="text-center max-w-4xl mx-auto">
        <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
          {t('welcomeTitle')}
        </h1>
        <p className="text-xl md:text-2xl mb-8 text-gray-300">
          {t('welcomeSubtitle')}
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-white/10 backdrop-blur-lg rounded-lg p-6 border border-white/20">
            <div className="text-green-400 text-4xl mb-2">✅</div>
            <h3 className="text-xl font-semibold mb-2 text-white">{t('modernCards')}</h3>
            <p className="text-gray-300 text-sm">{t('modernCardsDesc')}</p>
          </div>

          <div className="bg-white/10 backdrop-blur-lg rounded-lg p-6 border border-white/20">
            <div className="text-blue-400 text-4xl mb-2">⚛️</div>
            <h3 className="text-lg font-semibold mb-2 text-white">{t('reactTech')}</h3>
            <p className="text-gray-300 text-sm">{t('reactTechDesc')}</p>
          </div>

          <div className="bg-white/10 backdrop-blur-lg rounded-lg p-6 border border-white/20">
            <div className="text-purple-400 text-4xl mb-2">🔒</div>
            <h3 className="text-lg font-semibold mb-2 text-white">{t('security')}</h3>
            <p className="text-gray-300 text-sm">{t('securityDesc')}</p>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
          <Link to="/cards" className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg font-medium transition-colors">
            {t('exploreCards')}
          </Link>
          <Link to="/about" className="bg-gray-500 hover:bg-gray-600 text-white px-6 py-3 rounded-lg font-medium transition-colors">
            {t('aboutUs')}
          </Link>
        </div>

      </div>
    </div>
  );
}

export default HomePage;
