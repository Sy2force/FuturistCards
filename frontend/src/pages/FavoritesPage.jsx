import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { useLanguage } from '../context/LanguageContext';

const FavoritesPageSimple = () => {
  const { user } = useAuth();
  const { t } = useLanguage();

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center px-4">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">
            {t('loginRequired')}
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            {t('mustBeLoggedInFavorites')}
          </p>
          <Link 
            to="/login"
            className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg"
          >
            {t('signIn')}
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-900 dark:to-gray-800 py-8 px-4">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mb-4">
            {t('myFavorites')}
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            {t('cardsAddedToFavorites')}
          </p>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg text-center">
          <div className="text-6xl mb-4">❤️</div>
          <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">
            {t('noFavorites')}
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            {t('exploreCardsAddFavorites')}
          </p>
          <Link 
            to="/cards"
            className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg font-medium"
          >
            {t('exploreCards')}
          </Link>
        </div>
      </div>
    </div>
  );
};

export default FavoritesPageSimple;
