import { Navigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { useI18n } from '../hooks/useI18n';
import { useTheme } from '../contexts/ThemeContext';

const AdminPage = () => {
  const { user, loading } = useAuth();
  const { t } = useI18n();
  const { isDark } = useTheme();

  if (loading) {
    return (
      <div className={`min-h-screen flex items-center justify-center ${isDark ? 'dark-gradient' : 'glass-gradient'}`}>
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" />;
  }

  if (user.role !== 'admin') {
    return <Navigate to="/unauthorized" />;
  }

  return (
    <div className={`min-h-screen py-12 px-4 ${isDark ? 'dark-gradient' : 'glass-gradient'}`} data-testid="admin-page">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold gradient-text mb-4">{t('admin.administration')}</h1>
          <p className={`text-lg ${isDark ? 'text-gray-300' : 'text-gray-600'} mb-8`}>
            {t('admin.adminPanelDescription')}
          </p>
        </div>
        <div className={`${isDark ? 'glass-effect border-white/20' : 'bg-white/80 backdrop-blur-lg border-gray-200/50'} rounded-2xl p-8 shadow-3d border animate-fade-in hover-lift text-center`}>
          <div className="max-w-2xl mx-auto">
            <div className="w-24 h-24 gradient-primary rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
            
            <h2 className={`text-3xl font-bold ${isDark ? 'text-white' : 'text-gray-800'} mb-4`}>{t('admin.adminSpace')}</h2>
            <p className={`${isDark ? 'text-gray-300' : 'text-gray-600'} mb-6`}>
              {t('admin.adminSpaceDescription')}
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div className={`${isDark ? 'glass-effect border-white/10' : 'bg-gray-50/80 border-gray-200/50'} rounded-xl p-6 border`}>
                <h3 className={`text-xl font-semibold ${isDark ? 'text-white' : 'text-gray-800'} mb-2`}>{t('admin.userManagement')}</h3>
                <p className={`${isDark ? 'text-gray-300' : 'text-gray-600'} text-sm`}>{t('admin.userManagementDescription')}</p>
                <div className="mt-4">
                  <span className="px-3 py-1 bg-yellow-500/20 text-yellow-300 rounded-full text-xs">
                    {t('admin.inDevelopment')}
                  </span>
                </div>
              </div>
              
              <div className={`${isDark ? 'glass-effect border-white/10' : 'bg-gray-50/80 border-gray-200/50'} rounded-xl p-6 border`}>
                <h3 className={`text-xl font-semibold ${isDark ? 'text-white' : 'text-gray-800'} mb-2`}>{t('admin.cardModeration')}</h3>
                <p className={`${isDark ? 'text-gray-300' : 'text-gray-600'} text-sm`}>{t('admin.cardModerationDescription')}</p>
                <div className="mt-4">
                  <span className="px-3 py-1 bg-yellow-500/20 text-yellow-300 rounded-full text-xs">
                    {t('admin.inDevelopment')}
                  </span>
                </div>
              </div>
              
              <div className={`${isDark ? 'glass-effect border-white/10' : 'bg-gray-50/80 border-gray-200/50'} rounded-xl p-6 border`}>
                <h3 className={`text-xl font-semibold ${isDark ? 'text-white' : 'text-gray-800'} mb-2`}>{t('admin.statistics')}</h3>
                <p className={`${isDark ? 'text-gray-300' : 'text-gray-600'} text-sm`}>{t('admin.statisticsDescription')}</p>
                <div className="mt-4">
                  <span className="px-3 py-1 bg-yellow-500/20 text-yellow-300 rounded-full text-xs">
                    {t('admin.inDevelopment')}
                  </span>
                </div>
              </div>
              
              <div className={`${isDark ? 'glass-effect border-white/10' : 'bg-gray-50/80 border-gray-200/50'} rounded-xl p-6 border`}>
                <h3 className={`text-xl font-semibold ${isDark ? 'text-white' : 'text-gray-800'} mb-2`}>{t('admin.configuration')}</h3>
                <p className={`${isDark ? 'text-gray-300' : 'text-gray-600'} text-sm`}>{t('admin.configurationDescription')}</p>
                <div className="mt-4">
                  <span className="px-3 py-1 bg-yellow-500/20 text-yellow-300 rounded-full text-xs">
                    {t('admin.inDevelopment')}
                  </span>
                </div>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button 
                onClick={() => alert('Fonctionnalité en développement')}
                className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-lg font-semibold shadow-lg transition-all duration-300 transform hover:scale-105"
              >
                {t('admin.viewSystemLogs')}
              </button>
              <button 
                onClick={() => window.location.href = '/cards'}
                className={`px-6 py-3 ${isDark ? 'bg-gray-700/50 border-gray-600 text-white hover:bg-gray-600/50' : 'bg-white/20 border-white/30 text-white hover:bg-white/30'} border rounded-lg font-semibold transition-all duration-300 backdrop-blur-sm`}
              >
                {t('admin.viewAllCards')}
              </button>
            </div>
          </div>
        </div>

        {/* Informations système */}
        <div className={`mt-8 ${isDark ? 'glass-effect border-white/20' : 'bg-white/80 backdrop-blur-lg border-gray-200/50'} rounded-2xl p-6 shadow-3d border animate-fade-in`} style={{animationDelay: '0.2s'}}>
          <h3 className={`text-lg font-semibold ${isDark ? 'text-white' : 'text-gray-800'} mb-4`}>{t('admin.systemInformation')}</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
            <div>
              <span className={isDark ? 'text-gray-400' : 'text-gray-500'}>{t('admin.version')}:</span>
              <span className={`${isDark ? 'text-white' : 'text-gray-800'} ml-2`}>1.0.0</span>
            </div>
            <div>
              <span className={isDark ? 'text-gray-400' : 'text-gray-500'}>{t('admin.environment')}:</span>
              <span className={`${isDark ? 'text-white' : 'text-gray-800'} ml-2`}>{t('admin.development')}</span>
            </div>
            <div>
              <span className={isDark ? 'text-gray-400' : 'text-gray-500'}>{t('profile.status')}:</span>
              <span className="text-green-400 ml-2">{t('admin.operational')}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminPage;
