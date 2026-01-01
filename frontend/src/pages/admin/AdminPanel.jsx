import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useRoleTheme } from '../../context/ThemeProvider';
import { useTranslation } from "../../hooks/useTranslation";
import { toast } from 'react-hot-toast';
import { api } from '../../services/api';

const AdminPanel = () => {
  const { isAdmin } = useAuth();
  const { isDark } = useRoleTheme();
  const { t } = useTranslation();
  const [stats, setStats] = useState({
    users: { total: 0, user: 0, business: 0, admin: 0 },
    cards: { total: 0, published: 0, draft: 0 },
    system: { uptime: 0, memory: {}, version: '' }
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await api.get('/admin/stats');
        setStats(response.data.stats);
      } catch (error) {
        toast.error(t('admin.errors.loadingStats'));
        // Error fetching admin stats - handled by toast
      } finally {
        setLoading(false);
      }
    };

    if (isAdmin) {
      fetchStats();
    }
  }, [isAdmin]);

  if (!isAdmin) {
    return (
      <div className="min-h-screen flex items-center justify-center" dir="rtl" lang="he">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-red-600 mb-4">
            {t('admin.accessDenied.title')}
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            {t('admin.accessDenied.message')}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen pt-24 pb-12 ${isDark ? 'bg-gray-900' : 'bg-gray-50'}`} data-testid="admin-page" dir="rtl" lang="he">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className={`text-4xl font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
            {t('admin.title')}
          </h1>
          <p className={`text-xl ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
            {t('admin.subtitle')}
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className={`${isDark ? 'bg-gray-800' : 'bg-white'} p-6 rounded-xl shadow-lg`}>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-blue-600 font-medium">{t('admin.stats.users')}</p>
                <p className={`text-3xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  {loading ? '...' : stats.users.total}
                </p>
              </div>
              <div className="p-3 rounded-full bg-blue-100">
                <span className="text-3xl">👥</span>
              </div>
            </div>
          </div>
          
          <div className={`${isDark ? 'bg-gray-800' : 'bg-white'} p-6 rounded-xl shadow-lg`}>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-green-600 font-medium">{t('admin.stats.cards')}</p>
                <p className={`text-3xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  {loading ? '...' : stats.cards.total}
                </p>
              </div>
              <div className="p-3 rounded-full bg-green-100">
                <span className="text-3xl">🎴</span>
              </div>
            </div>
          </div>
          
          <div className={`${isDark ? 'bg-gray-800' : 'bg-white'} p-6 rounded-xl shadow-lg`}>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-purple-600 font-medium">{t('admin.stats.business')}</p>
                <p className={`text-3xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  {loading ? '...' : stats.users.business}
                </p>
              </div>
              <div className="p-3 rounded-full bg-purple-100">
                <svg className="w-8 h-8 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2-2v2m8 0H8m8 0v2a2 2 0 01-2 2H10a2 2 0 01-2-2V6m8 0H8" />
                </svg>
              </div>
            </div>
          </div>
          
          <div className={`${isDark ? 'bg-gray-800' : 'bg-white'} p-6 rounded-xl shadow-lg`}>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-red-600 font-medium">{t('admin.stats.admins')}</p>
                <p className={`text-3xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  {loading ? '...' : stats.users.admin}
                </p>
              </div>
              <div className="p-3 rounded-full bg-red-100">
                <span className="text-3xl">👑</span>
              </div>
            </div>
          </div>
        </div>

        {/* Management Sections */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* User Management */}
          <div className={`${isDark ? 'bg-gray-800' : 'bg-white'} rounded-xl shadow-lg p-6`}>
            <h2 className={`text-2xl font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
              👥 {t('admin.userManagement.title')}
            </h2>
            <div className="space-y-4">
              <div className={`p-4 rounded-lg ${isDark ? 'bg-gray-700' : 'bg-gray-50'}`}>
                <h3 className={`font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  {t('admin.userManagement.roleDistribution')}
                </h3>
                <div className="mt-2 space-y-1">
                  <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                    {t('admin.userManagement.users')}: {loading ? '...' : stats.users.user}
                  </p>
                  <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                    {t('admin.userManagement.business')}: {loading ? '...' : stats.users.business}
                  </p>
                  <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                    {t('admin.userManagement.admins')}: {loading ? '...' : stats.users.admin}
                  </p>
                </div>
              </div>
              <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg transition-colors">
                {t('admin.userManagement.manageUsers')}
              </button>
            </div>
          </div>

          {/* Content Management */}
          <div className={`${isDark ? 'bg-gray-800' : 'bg-white'} rounded-xl shadow-lg p-6`}>
            <h2 className={`text-2xl font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
              📇 {t('admin.contentManagement.title')}
            </h2>
            <div className="space-y-4">
              <div className={`p-4 rounded-lg ${isDark ? 'bg-gray-700' : 'bg-gray-50'}`}>
                <h3 className={`font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  {t('admin.contentManagement.cardStats')}
                </h3>
                <div className="mt-2 space-y-1">
                  <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                    {t('admin.contentManagement.total')}: {loading ? '...' : stats.cards.total}
                  </p>
                  <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                    {t('admin.contentManagement.published')}: {loading ? '...' : stats.cards.published}
                  </p>
                </div>
              </div>
              <button className="w-full bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-lg transition-colors">
                {t('admin.contentManagement.manageCards')}
              </button>
            </div>
          </div>

          {/* System Settings */}
          <div className={`${isDark ? 'bg-gray-800' : 'bg-white'} rounded-xl shadow-lg p-6`}>
            <h2 className={`text-2xl font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
              ⚙️ {t('admin.systemSettings.title')}
            </h2>
            <div className="space-y-4">
              <div className={`p-4 rounded-lg ${isDark ? 'bg-gray-700' : 'bg-gray-50'}`}>
                <h3 className={`font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  {t('admin.systemSettings.system')}
                </h3>
                <div className="mt-2 space-y-1">
                  <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                    {t('admin.systemSettings.version')}: {loading ? '...' : stats.system.version}
                  </p>
                  <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                    {t('admin.systemSettings.uptime')}: {loading ? '...' : Math.floor(stats.system.uptime / 60)} min
                  </p>
                </div>
              </div>
              <button className="w-full bg-purple-600 hover:bg-purple-700 text-white py-2 px-4 rounded-lg transition-colors">
                {t('admin.systemSettings.settings')}
              </button>
            </div>
          </div>

          {/* Analytics */}
          <div className={`${isDark ? 'bg-gray-800' : 'bg-white'} rounded-xl shadow-lg p-6`}>
            <h2 className={`text-2xl font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
              📊 {t('admin.analytics.title')}
            </h2>
            <div className="space-y-4">
              <div className={`p-4 rounded-lg ${isDark ? 'bg-gray-700' : 'bg-gray-50'}`}>
                <h3 className={`font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  {t('admin.analytics.reports')}
                </h3>
                <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                  {t('admin.analytics.description')}
                </p>
              </div>
              <button className="w-full bg-orange-600 hover:bg-orange-700 text-white py-2 px-4 rounded-lg transition-colors">
                {t('admin.analytics.viewReports')}
              </button>
            </div>
          </div>
        </div>

        {/* Recent Activity */}
        <div className={`${isDark ? 'bg-gray-800' : 'bg-white'} rounded-xl shadow-lg p-6 mt-8`}>
          <h2 className={`text-2xl font-bold mb-6 ${isDark ? 'text-white' : 'text-gray-900'}`}>
            <svg className="w-8 h-8 inline mr-3 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
            {t('admin.recentActivity.title')}
          </h2>
          <div className="space-y-4">
            <div className={`flex items-center p-4 rounded-lg ${isDark ? 'bg-gray-700' : 'bg-gray-50'}`}>
              <div className="p-2 rounded-full bg-blue-100 dark:bg-blue-900/20 mr-4">
                <svg className="w-6 h-6 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              <div>
                <p className={`font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  {t('admin.recentActivity.newUser')}
                </p>
                <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                  {t('admin.recentActivity.twoHoursAgo')}
                </p>
              </div>
            </div>
            <div className={`flex items-center p-4 rounded-lg ${isDark ? 'bg-gray-700' : 'bg-gray-50'}`}>
              <span className="text-2xl mr-4">📇</span>
              <div>
                <p className={`font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  {t('admin.recentActivity.newCard')}
                </p>
                <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                  {t('admin.recentActivity.fourHoursAgo')}
                </p>
              </div>
            </div>
            <div className={`flex items-center p-4 rounded-lg ${isDark ? 'bg-gray-700' : 'bg-gray-50'}`}>
              <span className="text-2xl mr-4">⚠️</span>
              <div>
                <p className={`font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  {t('admin.recentActivity.reportedContent')}
                </p>
                <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                  {t('admin.recentActivity.sixHoursAgo')}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;
