import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Cog6ToothIcon,
  SunIcon,
  MoonIcon,
  LanguageIcon,
  XMarkIcon,
  CheckIcon
} from '@heroicons/react/24/outline';
import { useTheme } from '../context/ThemeContext';
import { useLanguage } from '../context/LanguageContext';
import { useAuth } from '../context/AuthContext';

const SettingsPanel = ({ isOpen, onClose }) => {
  const { theme, toggleTheme } = useTheme();
  const { language, changeLanguage, t, isRTL } = useLanguage();
  const { user, logout } = useAuth();
  
  const [activeTab, setActiveTab] = useState('appearance');

  const languages = [
    { code: 'fr', name: 'Français', flag: '🇫🇷' },
    { code: 'en', name: 'English', flag: '🇺🇸' },
    { code: 'he', name: 'עברית', flag: '🇮🇱' }
  ];

  const tabs = [
    { id: 'appearance', name: t('appearance') || 'Apparence', icon: SunIcon },
    { id: 'language', name: t('language'), icon: LanguageIcon },
    { id: 'account', name: t('account') || 'Compte', icon: Cog6ToothIcon }
  ];

  const handleLogout = async () => {
    try {
      await logout();
      onClose();
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  if (!isOpen) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 20 }}
        onClick={(e) => e.stopPropagation()}
        className={`w-full max-w-2xl glass border border-white/20 rounded-2xl overflow-hidden ${isRTL ? 'rtl' : 'ltr'}`}
      >
        {/* Header */}
        <div className="p-6 border-b border-white/20">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Cog6ToothIcon className="h-6 w-6 text-white" />
              <h2 className="text-xl font-semibold text-white">{t('settings')}</h2>
            </div>
            <button
              onClick={onClose}
              className="text-white/60 hover:text-white transition-colors"
            >
              <XMarkIcon className="h-6 w-6" />
            </button>
          </div>
        </div>

        <div className="flex">
          {/* Sidebar */}
          <div className="w-1/3 p-4 border-r border-white/20">
            <nav className="space-y-2">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`
                      w-full flex items-center space-x-3 p-3 rounded-lg transition-colors text-left
                      ${activeTab === tab.id 
                        ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30' 
                        : 'text-white/70 hover:text-white hover:bg-white/10'
                      }
                    `}
                  >
                    <Icon className="h-5 w-5" />
                    <span>{tab.name}</span>
                  </button>
                );
              })}
            </nav>
          </div>

          {/* Content */}
          <div className="flex-1 p-6">
            <AnimatePresence mode="wait">
              {/* Appearance Tab */}
              {activeTab === 'appearance' && (
                <motion.div
                  key="appearance"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-6"
                >
                  <h3 className="text-lg font-medium text-white mb-4">
                    {t('appearance') || 'Apparence'}
                  </h3>
                  
                  {/* Theme Toggle */}
                  <div className="space-y-3">
                    <label className="text-white/80 text-sm font-medium">
                      {t('theme') || 'Thème'}
                    </label>
                    <div className="flex space-x-3">
                      <button
                        onClick={() => theme === 'dark' && toggleTheme()}
                        className={`
                          flex items-center space-x-2 p-3 rounded-lg border transition-all
                          ${theme === 'light' 
                            ? 'bg-blue-500/20 border-blue-500/30 text-blue-400' 
                            : 'border-white/20 text-white/70 hover:border-white/40'
                          }
                        `}
                      >
                        <SunIcon className="h-5 w-5" />
                        <span>{t('lightTheme')}</span>
                        {theme === 'light' && <CheckIcon className="h-4 w-4" />}
                      </button>
                      
                      <button
                        onClick={() => theme === 'light' && toggleTheme()}
                        className={`
                          flex items-center space-x-2 p-3 rounded-lg border transition-all
                          ${theme === 'dark' 
                            ? 'bg-blue-500/20 border-blue-500/30 text-blue-400' 
                            : 'border-white/20 text-white/70 hover:border-white/40'
                          }
                        `}
                      >
                        <MoonIcon className="h-5 w-5" />
                        <span>{t('darkTheme')}</span>
                        {theme === 'dark' && <CheckIcon className="h-4 w-4" />}
                      </button>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Language Tab */}
              {activeTab === 'language' && (
                <motion.div
                  key="language"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-6"
                >
                  <h3 className="text-lg font-medium text-white mb-4">
                    {t('language')}
                  </h3>
                  
                  <div className="space-y-3">
                    <label className="text-white/80 text-sm font-medium">
                      {t('selectLanguage') || 'Sélectionner la langue'}
                    </label>
                    <div className="space-y-2">
                      {languages.map((lang) => (
                        <button
                          key={lang.code}
                          onClick={() => changeLanguage(lang.code)}
                          className={`
                            w-full flex items-center justify-between p-3 rounded-lg border transition-all text-left
                            ${language === lang.code 
                              ? 'bg-blue-500/20 border-blue-500/30 text-blue-400' 
                              : 'border-white/20 text-white/70 hover:border-white/40 hover:text-white'
                            }
                          `}
                        >
                          <div className="flex items-center space-x-3">
                            <span className="text-xl">{lang.flag}</span>
                            <span>{lang.name}</span>
                          </div>
                          {language === lang.code && <CheckIcon className="h-4 w-4" />}
                        </button>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Account Tab */}
              {activeTab === 'account' && (
                <motion.div
                  key="account"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-6"
                >
                  <h3 className="text-lg font-medium text-white mb-4">
                    {t('account') || 'Compte'}
                  </h3>
                  
                  {user && (
                    <div className="space-y-4">
                      <div className="p-4 bg-white/5 rounded-lg border border-white/10">
                        <div className="flex items-center space-x-4">
                          <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center text-white font-semibold text-lg">
                            {user.firstName?.[0]}{user.lastName?.[0]}
                          </div>
                          <div>
                            <h4 className="text-white font-medium">
                              {user.firstName} {user.lastName}
                            </h4>
                            <p className="text-white/60 text-sm">{user.email}</p>
                            <p className="text-white/40 text-xs capitalize">
                              {user.role || 'user'}
                            </p>
                          </div>
                        </div>
                      </div>

                      <div className="space-y-3">
                        <button className="w-full p-3 text-left bg-white/5 hover:bg-white/10 rounded-lg border border-white/10 text-white/80 hover:text-white transition-colors">
                          {t('editProfile') || 'Modifier le profil'}
                        </button>
                        
                        <button className="w-full p-3 text-left bg-white/5 hover:bg-white/10 rounded-lg border border-white/10 text-white/80 hover:text-white transition-colors">
                          {t('changePassword') || 'Changer le mot de passe'}
                        </button>
                        
                        <button 
                          onClick={handleLogout}
                          className="w-full p-3 text-left bg-red-500/10 hover:bg-red-500/20 rounded-lg border border-red-500/30 text-red-400 hover:text-red-300 transition-colors"
                        >
                          {t('logout')}
                        </button>
                      </div>
                    </div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default SettingsPanel;
