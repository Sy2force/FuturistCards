import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from '../hooks/useTranslation';
import { useRoleTheme } from '../context/ThemeProvider';
import { 
  UserGroupIcon, 
  CreditCardIcon, 
  ShieldCheckIcon,
  ChartBarIcon
} from '@heroicons/react/24/outline';

const AdminPage = () => {
  const { t } = useTranslation();
  const { currentTheme } = useRoleTheme();
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalCards: 0,
    businessUsers: 0,
    regularUsers: 0
  });

  useEffect(() => {
    // Simulate loading stats
    setStats({
      totalUsers: 156,
      totalCards: 432,
      businessUsers: 45,
      regularUsers: 111
    });
  }, []);

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <div 
      data-testid="admin-page" 
      className="min-h-screen py-20"
      style={{ backgroundColor: currentTheme.colors.background }}
    >
      <motion.div
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Header */}
        <motion.div 
          className="text-center mb-12"
          variants={itemVariants}
        >
          <h1 
            className="text-4xl md:text-6xl font-bold mb-6"
            style={{ 
              background: `linear-gradient(135deg, ${currentTheme.colors.primary}, ${currentTheme.colors.secondary})`,
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text'
            }}
          >
            {t('admin.title')}
          </h1>
          <p 
            className="text-xl opacity-80 max-w-3xl mx-auto"
            style={{ color: currentTheme.colors.text.secondary }}
          >
            {t('admin.subtitle')}
          </p>
        </motion.div>

        {/* Stats Grid */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12"
          variants={itemVariants}
        >
          {[
            {
              title: t('admin.stats.totalUsers'),
              value: stats.totalUsers,
              icon: UserGroupIcon,
              color: currentTheme.colors.primary
            },
            {
              title: t('admin.stats.totalCards'),
              value: stats.totalCards,
              icon: CreditCardIcon,
              color: currentTheme.colors.secondary
            },
            {
              title: t('admin.stats.businessUsers'),
              value: stats.businessUsers,
              icon: ShieldCheckIcon,
              color: currentTheme.colors.accent
            },
            {
              title: t('admin.stats.regularUsers'),
              value: stats.regularUsers,
              icon: ChartBarIcon,
              color: currentTheme.colors.success
            }
          ].map((stat, index) => (
            <motion.div
              key={index}
              className="backdrop-blur-md rounded-2xl p-6 border border-white/10"
              style={{ 
                backgroundColor: currentTheme.colors.surface,
                boxShadow: currentTheme.shadows.glass
              }}
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <div className="flex items-center justify-between mb-4">
                <stat.icon 
                  className="w-8 h-8"
                  style={{ color: stat.color }}
                />
                <span 
                  className="text-2xl font-bold"
                  style={{ color: currentTheme.colors.text.primary }}
                >
                  {stat.value}
                </span>
              </div>
              <h3 
                className="text-sm font-medium"
                style={{ color: currentTheme.colors.text.secondary }}
              >
                {stat.title}
              </h3>
            </motion.div>
          ))}
        </motion.div>

        {/* Admin Actions */}
        <motion.div 
          className="backdrop-blur-md rounded-2xl p-8 border border-white/10"
          style={{ 
            backgroundColor: currentTheme.colors.surface,
            boxShadow: currentTheme.shadows.glass
          }}
          variants={itemVariants}
        >
          <h2 
            className="text-2xl font-bold mb-6"
            style={{ color: currentTheme.colors.text.primary }}
          >
            {t('admin.actions.title')}
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              {
                title: t('admin.actions.manageUsers'),
                description: t('admin.actions.manageUsersDesc'),
                action: () => {
                  // Navigate to user management (placeholder for future implementation)
                  console.log('Navigate to user management');
                }
              },
              {
                title: t('admin.actions.moderateCards'),
                description: t('admin.actions.moderateCardsDesc'),
                action: () => {
                  // Navigate to card moderation (placeholder for future implementation)
                  console.log('Navigate to card moderation');
                }
              },
              {
                title: t('admin.actions.systemSettings'),
                description: t('admin.actions.systemSettingsDesc'),
                action: () => {
                  // Navigate to system settings (placeholder for future implementation)
                  console.log('Navigate to system settings');
                }
              }
            ].map((action, index) => (
              <motion.button
                key={index}
                className="text-left p-4 rounded-xl border border-white/10 transition-all"
                style={{ 
                  backgroundColor: currentTheme.colors.background,
                  color: currentTheme.colors.text.primary
                }}
                whileHover={{ 
                  scale: 1.02,
                  backgroundColor: currentTheme.colors.hover
                }}
                onClick={action.action}
              >
                <h3 className="font-semibold mb-2">{action.title}</h3>
                <p 
                  className="text-sm"
                  style={{ color: currentTheme.colors.text.secondary }}
                >
                  {action.description}
                </p>
              </motion.button>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default AdminPage;
