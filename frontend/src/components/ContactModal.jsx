import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { XMarkIcon, PhoneIcon, EnvelopeIcon, MapPinIcon, GlobeAltIcon } from '@heroicons/react/24/outline';
import { useTheme } from '../context/ThemeContext';
import { useLanguage } from '../context/LanguageContext';

const ContactModal = ({ isOpen, onClose, card }) => {
  const { isDark } = useTheme();
  const { t } = useLanguage();

  if (!card) return null;

  const modalVariants = {
    hidden: {
      opacity: 0,
      scale: 0.8,
      y: 50,
    },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        type: 'spring',
        damping: 25,
        stiffness: 300,
        duration: 0.3,
      },
    },
    exit: {
      opacity: 0,
      scale: 0.8,
      y: 50,
      transition: {
        duration: 0.2,
      },
    },
  };

  const overlayVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
    exit: { opacity: 0 },
  };

  const contactItems = [
    {
      icon: EnvelopeIcon,
      label: t('email'),
      value: card.email,
      href: `mailto:${card.email}`,
      color: 'text-blue-500',
    },
    {
      icon: PhoneIcon,
      label: t('phone'),
      value: card.phone,
      href: `tel:${card.phone}`,
      color: 'text-green-500',
    },
    {
      icon: GlobeAltIcon,
      label: t('website'),
      value: card.website,
      href: card.website,
      color: 'text-purple-500',
    },
    {
      icon: MapPinIcon,
      label: t('address'),
      value: card.address || `${card.address?.street || ''} ${card.address?.city || ''}`.trim(),
      color: 'text-red-500',
    },
  ].filter(item => item.value);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Overlay */}
          <motion.div
            variants={overlayVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className={`
              relative w-full max-w-md mx-auto
              ${isDark 
                ? 'bg-gray-900/90 border-white/10' 
                : 'bg-white/90 border-gray-200/50'
              }
              backdrop-blur-xl border rounded-3xl shadow-2xl
              p-6 space-y-6
            `}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                {card.image && (
                  <img
                    src={card.image}
                    alt={card.title}
                    className="w-12 h-12 rounded-full object-cover border-2 border-white/20"
                  />
                )}
                <div>
                  <h3 className={`text-xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                    {t('contact')} {card.title}
                  </h3>
                  <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                    {card.subtitle || card.company}
                  </p>
                </div>
              </div>
              
              <button
                onClick={onClose}
                className={`
                  p-2 rounded-full transition-all duration-200
                  ${isDark 
                    ? 'hover:bg-white/10 text-gray-400 hover:text-white' 
                    : 'hover:bg-gray-100 text-gray-500 hover:text-gray-700'
                  }
                `}
              >
                <XMarkIcon className="w-6 h-6" />
              </button>
            </div>

            {/* Contact Information */}
            <div className="space-y-4">
              {contactItems.map((item, index) => {
                const Icon = item.icon;
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className={`
                      flex items-center space-x-3 p-3 rounded-xl
                      ${isDark 
                        ? 'bg-white/5 hover:bg-white/10' 
                        : 'bg-gray-50/80 hover:bg-gray-100/80'
                      }
                      transition-all duration-200 cursor-pointer group
                    `}
                    onClick={() => item.href && window.open(item.href, '_blank')}
                  >
                    <div className={`
                      p-2 rounded-lg ${item.color} bg-current/10
                      group-hover:scale-110 transition-transform duration-200
                    `}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className={`text-sm font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                        {item.label}
                      </p>
                      <p className={`text-sm truncate ${isDark ? 'text-white' : 'text-gray-900'}`}>
                        {item.value}
                      </p>
                    </div>
                    {item.href && (
                      <div className={`
                        opacity-0 group-hover:opacity-100 transition-opacity duration-200
                        ${isDark ? 'text-gray-400' : 'text-gray-500'}
                      `}>
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                        </svg>
                      </div>
                    )}
                  </motion.div>
                );
              })}
            </div>

            {/* Description */}
            {card.description && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className={`
                  p-4 rounded-xl
                  ${isDark 
                    ? 'bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-white/10' 
                    : 'bg-gradient-to-r from-blue-50 to-purple-50 border border-gray-200/50'
                  }
                `}
              >
                <h4 className={`text-sm font-semibold mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  {t('description')}
                </h4>
                <p className={`text-sm leading-relaxed ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                  {card.description}
                </p>
              </motion.div>
            )}

            {/* Action Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="flex space-x-3 pt-2"
            >
              <button
                onClick={() => window.open(`mailto:${card.email}`, '_blank')}
                className="flex-1 px-4 py-3 rounded-xl bg-gradient-to-r from-blue-500 to-blue-600 text-white font-medium hover:from-blue-600 hover:to-blue-700 transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl"
              >
                <EnvelopeIcon className="w-4 h-4 inline mr-2" />
                {t('sendEmail')}
              </button>
              
              <button
                onClick={() => window.open(`tel:${card.phone}`, '_blank')}
                className="flex-1 px-4 py-3 rounded-xl bg-gradient-to-r from-green-500 to-green-600 text-white font-medium hover:from-green-600 hover:to-green-700 transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl"
              >
                <PhoneIcon className="w-4 h-4 inline mr-2" />
                {t('call')}
              </button>
            </motion.div>

            {/* Close Button */}
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              onClick={onClose}
              className={`
                w-full px-4 py-3 rounded-xl font-medium transition-all duration-200
                ${isDark 
                  ? 'bg-white/10 text-white hover:bg-white/20' 
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }
              `}
            >
              {t('close')}
            </motion.button>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default ContactModal;
