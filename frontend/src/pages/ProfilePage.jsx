import { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { useI18n } from '../hooks/useI18n';
import { useTheme } from '../contexts/ThemeContext';
import { useLikes } from '../hooks/useLikes';
import EditProfileModal from '../components/profile/EditProfileModal';
import ChangePasswordModal from '../components/profile/ChangePasswordModal';
import api from '../api/api';

const ProfilePage = () => {
  const { user, loading, updateProfile } = useAuth();
  const { t } = useI18n();
  const { isDark } = useTheme();
  const { getUserLikedCards } = useLikes();
  
  const [showEditModal, setShowEditModal] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [userStats, setUserStats] = useState({
    totalCards: 0,
    totalLikes: 0,
    totalViews: 0,
    favoriteCards: 0,
    likedCards: []
  });
  const [loadingStats, setLoadingStats] = useState(true);

  useEffect(() => {
    const fetchUserStats = async () => {
      if (!user) return;
      
      try {
        setLoadingStats(true);
        
        // Fetch user cards
        const cardsResponse = await api.get('/cards/my-cards');
        const userCards = cardsResponse.data.cards || [];
        
        // Fetch user favorites
        const favoritesResponse = await api.get('/favorites');
        const favorites = favoritesResponse.data.favorites || [];

        // Get liked cards
        const likedCards = getUserLikedCards();
        
        setUserStats({
          totalCards: userCards.length,
          totalLikes: userCards.reduce((sum, card) => sum + (card.likes || 0), 0),
          totalViews: userCards.reduce((sum, card) => sum + (card.views || 0), 0),
          favoriteCards: favorites.length,
          likedCards: likedCards
        });
      } catch (error) {
        setUserStats({
          totalCards: 0,
          totalLikes: 0,
          totalViews: 0,
          favoriteCards: 0,
          likedCards: []
        });
      } finally {
        setLoadingStats(false);
      }
    };

    fetchUserStats();
  }, [user, getUserLikedCards]);

  if (loading) {
    return (
      <div className={`min-h-screen ${isDark ? 'bg-gray-900' : 'bg-gray-50'} flex items-center justify-center`}>
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" />;
  }

  const handleSaveProfile = async (profileData) => {
    await updateProfile(profileData);
  };

  const getRoleBadgeColor = (role) => {
    switch (role) {
      case 'admin':
        return 'primary-gradient';
      case 'business':
        return 'primary-gradient';
      default:
        return 'secondary-gradient';
    }
  };

  const getRoleIcon = (role) => {
    switch (role) {
      case 'admin':
        return (
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
          </svg>
        );
      case 'business':
        return (
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M4 4a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2H4zm3 2h6v2H7V6zm6 4H7v2h6v-2z" clipRule="evenodd" />
          </svg>
        );
      default:
        return (
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
          </svg>
        );
    }
  };

  return (
    <div className={`min-h-screen ${isDark ? 'bg-gray-900' : 'bg-gray-50'} py-12 px-4`} data-testid="profile-page">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className={`text-4xl font-bold ${isDark ? 'text-white' : 'text-gray-900'} mb-4`}>{t('profile.myProfile')}</h1>
          <p className={`text-xl ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>{t('profile.managePersonalInfo')}</p>
        </div>

        {/* User Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="card-container">
            <div className="flex items-center justify-between">
              <div>
                <p className={`text-sm ${isDark ? 'text-blue-300' : 'text-blue-600'} font-medium`}>{t('myCards.title')}</p>
                <p className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  {loadingStats ? '...' : userStats.totalCards}
                </p>
              </div>
              <div className={`p-3 rounded-full ${isDark ? 'bg-blue-800/50' : 'bg-blue-200'}`}>
                <svg className={`w-6 h-6 ${isDark ? 'text-blue-300' : 'text-blue-600'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
              </div>
            </div>
          </div>
          
          <div className="card-container">
            <div className="flex items-center justify-between">
              <div>
                <p className={`text-sm ${isDark ? 'text-red-300' : 'text-red-600'} font-medium`}>{t('profile.totalLikes')}</p>
                <p className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  {loadingStats ? '...' : userStats.totalLikes}
                </p>
              </div>
              <div className={`p-3 rounded-full ${isDark ? 'bg-red-800/50' : 'bg-red-200'}`}>
                <svg className={`w-6 h-6 ${isDark ? 'text-red-300' : 'text-red-600'}`} fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                </svg>
              </div>
            </div>
          </div>
          
          <div className="card-container">
            <div className="flex items-center justify-between">
              <div>
                <p className={`text-sm ${isDark ? 'text-green-300' : 'text-green-600'} font-medium`}>{t('profile.totalViews')}</p>
                <p className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  {loadingStats ? '...' : userStats.totalViews}
                </p>
              </div>
              <div className={`p-3 rounded-full ${isDark ? 'bg-green-800/50' : 'bg-green-200'}`}>
                <svg className={`w-6 h-6 ${isDark ? 'text-green-300' : 'text-green-600'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
              </div>
            </div>
          </div>
          
          <div className="card-container">
            <div className="flex items-center justify-between">
              <div>
                <p className={`text-sm ${isDark ? 'text-purple-300' : 'text-purple-600'} font-medium`}>{t('profile.favoriteCards')}</p>
                <p className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  {loadingStats ? '...' : userStats.favoriteCards}
                </p>
              </div>
              <div className={`p-3 rounded-full ${isDark ? 'bg-purple-800/50' : 'bg-purple-200'}`}>
                <svg className={`w-6 h-6 ${isDark ? 'text-purple-300' : 'text-purple-600'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Profile Information Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Personal Information */}
          <div className={`${isDark ? 'bg-gray-800/50 border-gray-700' : 'bg-white/80 border-gray-200'} backdrop-blur-sm rounded-2xl p-8 shadow-lg border`}>
            <div className="flex items-center justify-between mb-6">
              <h3 className={`text-xl font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>{t('profile.personalInformation')}</h3>
              <div className={`px-3 py-1 rounded-full text-xs font-medium flex items-center gap-2 ${getRoleBadgeColor(user.role)} text-white`}>
                {getRoleIcon(user.role)}
                {user.role === 'admin' ? t('auth.adminAccount') : user.role === 'business' ? t('auth.businessAccount') : t('auth.userAccount')}
              </div>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className={`block text-sm font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'} mb-2`}>{t('profile.firstName')}</label>
                <div className={`${isDark ? 'bg-gray-700/50 text-white' : 'bg-gray-50 text-gray-900'} rounded-lg p-3 border ${isDark ? 'border-gray-600' : 'border-gray-200'}`}>
                  {user.firstName || t('profile.notProvided')}
                </div>
              </div>
              <div>
                <label className={`block text-sm font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'} mb-2`}>{t('profile.lastName')}</label>
                <div className={`${isDark ? 'bg-gray-700/50 text-white' : 'bg-gray-50 text-gray-900'} rounded-lg p-3 border ${isDark ? 'border-gray-600' : 'border-gray-200'}`}>
                  {user.lastName || t('profile.notProvided')}
                </div>
              </div>
              <div>
                <label className={`block text-sm font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'} mb-2`}>{t('profile.email')}</label>
                <div className={`${isDark ? 'bg-gray-700/50 text-white' : 'bg-gray-50 text-gray-900'} rounded-lg p-3 border ${isDark ? 'border-gray-600' : 'border-gray-200'}`}>
                  {user.email}
                </div>
              </div>
              <div>
                <label className={`block text-sm font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'} mb-2`}>{t('profile.memberSince')}</label>
                <div className={`${isDark ? 'bg-gray-700/50 text-white' : 'bg-gray-50 text-gray-900'} rounded-lg p-3 border ${isDark ? 'border-gray-600' : 'border-gray-200'}`}>
                  {user.createdAt ? new Date(user.createdAt).toLocaleDateString('fr-FR') : t('profile.notAvailable')}
                </div>
              </div>
            </div>
            
            {/* Action Buttons */}
            <div className="mt-8 space-y-4">
              <button
                onClick={() => setShowEditModal(true)}
                className={`w-full ${isDark ? 'bg-blue-600 hover:bg-blue-700' : 'bg-blue-500 hover:bg-blue-600'} text-white py-3 px-4 rounded-lg font-medium transition-colors duration-200 flex items-center justify-center`}
                data-testid="edit-profile-button"
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
                {t('profile.editProfile')}
              </button>
              <button
                onClick={() => setShowPasswordModal(true)}
                className={`w-full ${isDark ? 'bg-gray-600 hover:bg-gray-700' : 'bg-gray-500 hover:bg-gray-600'} text-white py-3 px-4 rounded-lg font-medium transition-colors duration-200 flex items-center justify-center`}
                data-testid="change-password-button"
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
                {t('profile.changePassword')}
              </button>
            </div>
          </div>
          
          {/* Account Activity */}
          <div className={`${isDark ? 'bg-gray-800/50 border-gray-700' : 'bg-white/80 border-gray-200'} backdrop-blur-sm rounded-2xl p-8 shadow-lg border`}>
            <h3 className={`text-xl font-semibold ${isDark ? 'text-white' : 'text-gray-900'} mb-6`}>{t('profile.accountActivity')}</h3>
            
            <div className="space-y-6">
              {/* Quick Actions */}
              <div>
                <h4 className={`text-sm font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'} mb-3`}>{t('profile.quickActions')}</h4>
                <div className="grid grid-cols-2 gap-3">
                  <a href="/my-cards" className={`${isDark ? 'bg-blue-900/30 border-blue-700/30 text-blue-300 hover:bg-blue-800/40' : 'bg-blue-50 border-blue-200 text-blue-700 hover:bg-blue-100'} border rounded-lg p-3 text-center text-sm font-medium transition-colors duration-200`}>
                    {t('myCards.title')}
                  </a>
                  <a href="/favorites" className={`${isDark ? 'bg-red-900/30 border-red-700/30 text-red-300 hover:bg-red-800/40' : 'bg-red-50 border-red-200 text-red-700 hover:bg-red-100'} border rounded-lg p-3 text-center text-sm font-medium transition-colors duration-200`}>
                    {t('favorites.title')}
                  </a>
                  {user.role === 'business' && (
                    <a href="/create-card" className={`${isDark ? 'bg-green-900/30 border-green-700/30 text-green-300 hover:bg-green-800/40' : 'bg-green-50 border-green-200 text-green-700 hover:bg-green-100'} border rounded-lg p-3 text-center text-sm font-medium transition-colors duration-200`}>
                      {t('profile.createCard')}
                    </a>
                  )}
                  {user.role === 'admin' && (
                    <a href="/admin" className={`${isDark ? 'bg-purple-900/30 border-purple-700/30 text-purple-300 hover:bg-purple-800/40' : 'bg-purple-50 border-purple-200 text-purple-700 hover:bg-purple-100'} border rounded-lg p-3 text-center text-sm font-medium transition-colors duration-200`}>
                      {t('profile.admin')}
                    </a>
                  )}
                </div>
              </div>
              
              {/* Account Status */}
              <div>
                <h4 className={`text-sm font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'} mb-3`}>{t('profile.accountStatus')}</h4>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>{t('profile.status')}</span>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${isDark ? 'bg-green-900/30 text-green-300' : 'bg-green-100 text-green-800'}`}>
                      {t('profile.active')}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>{t('profile.accountType')}</span>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getRoleBadgeColor(user.role)} text-white`}>
                      {user.role === 'admin' ? t('profile.administrator') : user.role === 'business' ? t('profile.business') : t('profile.user')}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>{t('profile.lastLogin')}</span>
                    <span className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                      {user.lastLogin ? new Date(user.lastLogin).toLocaleDateString('fr-FR') : t('profile.today')}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modals */}
      <EditProfileModal
        isOpen={showEditModal}
        onClose={() => setShowEditModal(false)}
        user={user}
        onSave={handleSaveProfile}
      />
      
      <ChangePasswordModal
        isOpen={showPasswordModal}
        onClose={() => setShowPasswordModal(false)}
        onSave={() => setShowPasswordModal(false)}
      />
    </div>
  );
};

export default ProfilePage;
