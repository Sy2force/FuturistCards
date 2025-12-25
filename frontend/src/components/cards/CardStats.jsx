import { useState, useEffect, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useTheme } from '../../contexts/ThemeContext';
import { useCardsStats } from '../../contexts/CardsStatsContext';
import { resetAllStats } from '../../utils/resetStats';

const CardStats = ({ cards = [] }) => {
  const { t } = useTranslation();
  const { isDark } = useTheme();
  const { globalStats } = useCardsStats();
  const [animatedStats, setAnimatedStats] = useState({});

  // Calculate comprehensive stats - memoized to prevent unnecessary re-renders
  const stats = useMemo(() => {
    const totalCards = cards.length;
    const categories = [...new Set(cards.map(card => card.category).filter(Boolean))];
    const totalLikes = globalStats.totalLikes || 0;
    const totalViews = globalStats.totalViews || 0;
    const averageLikes = totalCards > 0 ? Math.round(totalLikes / totalCards) : 0;
    const recentCards = cards.filter(card => {
      const cardDate = new Date(card.createdAt);
      const weekAgo = new Date();
      weekAgo.setDate(weekAgo.getDate() - 7);
      return cardDate > weekAgo;
    }).length;

    return {
      totalCards,
      totalCategories: categories.length,
      totalLikes,
      totalViews,
      averageLikes,
      recentCards
    };
  }, [cards, globalStats]);

  // Animation effect for numbers
  useEffect(() => {
    const animateNumber = (target, key) => {
      let current = animatedStats[key] || 0;
      const increment = Math.ceil((target - current) / 20);
      
      if (current < target) {
        const timer = setTimeout(() => {
          setAnimatedStats(prev => ({
            ...prev,
            [key]: Math.min(current + increment, target)
          }));
        }, 50);
        return () => clearTimeout(timer);
      }
    };

    Object.keys(stats).forEach(key => {
      animateNumber(stats[key], key);
    });
  }, [stats, animatedStats]);

  const statItems = [
    {
      label: t('cards.totalCards'),
      value: animatedStats.totalCards || stats.totalCards,
      icon: '📊',
      color: isDark ? 'text-blue-400' : 'text-blue-600',
      bgColor: isDark ? 'bg-blue-900/20' : 'bg-blue-50'
    },
    {
      label: t('cards.allCategories'),
      value: animatedStats.totalCategories || stats.totalCategories,
      icon: '📂',
      color: isDark ? 'text-green-400' : 'text-green-600',
      bgColor: isDark ? 'bg-green-900/20' : 'bg-green-50'
    },
    {
      label: t('cards.totalLikes'),
      value: animatedStats.totalLikes || stats.totalLikes,
      icon: '❤️',
      color: isDark ? 'text-red-400' : 'text-red-600',
      bgColor: isDark ? 'bg-red-900/20' : 'bg-red-50'
    },
    {
      label: t('cards.totalViews'),
      value: animatedStats.totalViews || stats.totalViews,
      icon: '👁️',
      color: isDark ? 'text-purple-400' : 'text-purple-600',
      bgColor: isDark ? 'bg-purple-900/20' : 'bg-purple-50'
    },
    {
      label: t('cards.newThisWeek'),
      value: animatedStats.recentCards || stats.recentCards,
      icon: '🆕',
      color: isDark ? 'text-orange-400' : 'text-orange-600',
      bgColor: isDark ? 'bg-orange-900/20' : 'bg-orange-50'
    },
    {
      label: t('cards.averageLikes'),
      value: animatedStats.averageLikes || stats.averageLikes,
      icon: '📈',
      color: isDark ? 'text-indigo-400' : 'text-indigo-600',
      bgColor: isDark ? 'bg-indigo-900/20' : 'bg-indigo-50'
    }
  ];

  return (
    <div className="mb-8">
      <div className="text-center mb-6">
        <h2 className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'} mb-2`}>
          {t('cards.inspirationTitle')}
        </h2>
        <p className={`${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
          {t('cards.inspirationSubtitle')}
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {statItems.map((stat, index) => (
          <div
            key={index}
            className={`${stat.bgColor} ${isDark ? 'border-gray-700' : 'border-gray-200'} rounded-xl p-4 border backdrop-blur-sm transition-all duration-300 hover:scale-105`}
          >
            <div className="text-center">
              <div className="text-2xl mb-2">{stat.icon}</div>
              <div className={`text-2xl font-bold ${stat.color} mb-1`}>
                {stat.value.toLocaleString()}
              </div>
              <div className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-600'} font-medium`}>
                {stat.label}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Additional Insights */}
      {cards.length > 0 && (
        <div className={`mt-6 p-6 rounded-xl ${isDark ? 'dark-gradient border-gray-600' : 'glass-gradient border-gray-300'} border backdrop-blur-md shadow-lg`}>
          <div className="text-center mb-4">
            <h3 className={`text-lg font-semibold ${isDark ? 'text-white' : 'text-gray-800'}`}>
              {t('cards.detailedStats')}
            </h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
            <div className={`p-4 rounded-lg ${isDark ? 'bg-red-900/20 border border-red-700/30' : 'bg-red-50 border border-red-200'} transition-all hover:scale-105`}>
              <div className="text-2xl mb-2">❤️</div>
              <div className={`text-2xl font-bold ${isDark ? 'text-red-400' : 'text-red-600'}`}>
                {(animatedStats.totalLikes || stats.totalLikes).toLocaleString()}
              </div>
              <div className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'} font-medium`}>
                {t('cards.totalLikes')}
              </div>
            </div>
            <div className={`p-4 rounded-lg ${isDark ? 'bg-purple-900/20 border border-purple-700/30' : 'bg-purple-50 border border-purple-200'} transition-all hover:scale-105`}>
              <div className="text-2xl mb-2">👁️</div>
              <div className={`text-2xl font-bold ${isDark ? 'text-purple-400' : 'text-purple-600'}`}>
                {(animatedStats.totalViews || stats.totalViews).toLocaleString()}
              </div>
              <div className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'} font-medium`}>
                {t('cards.totalViews')}
              </div>
            </div>
            <div className={`p-4 rounded-lg ${isDark ? 'bg-blue-900/20 border border-blue-700/30' : 'bg-blue-50 border border-blue-200'} transition-all hover:scale-105`}>
              <div className="text-2xl mb-2">📊</div>
              <div className={`text-2xl font-bold ${isDark ? 'text-blue-400' : 'text-blue-600'}`}>
                {cards.length > 0 ? Math.round((animatedStats.totalViews || stats.totalViews) / cards.length) : 0}
              </div>
              <div className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'} font-medium`}>
                {t('cards.averageViews')}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Reset Button for Development */}
      {process.env.NODE_ENV === 'development' && (
        <div className="mt-6 text-center">
          <button
            onClick={resetAllStats}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              isDark 
                ? 'bg-red-900/20 hover:bg-red-900/30 text-red-400 border border-red-700/30' 
                : 'bg-red-50 hover:bg-red-100 text-red-600 border border-red-200'
            }`}
          >
            🔄 Reset All Statistics (Dev)
          </button>
        </div>
      )}
    </div>
  );
};

export default CardStats;
