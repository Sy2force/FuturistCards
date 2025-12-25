// import React from 'react';
import { useTranslation } from 'react-i18next';
import { useTheme } from '../../contexts/ThemeContext';
import LikeButton from '../ui/LikeButton';

const CardModal = ({ card, isOpen, onClose }) => {
  const { isDark } = useTheme();
  const { t } = useTranslation();

  if (!isOpen || !card) return null;

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: card.titleKey ? t(`sampleCardTitles.${card.titleKey}`) : card.title,
          text: card.descriptionKey ? t(`sampleCardDescriptions.${card.descriptionKey}`) : card.description,
          url: window.location.href
        });
      } catch (err) {
        // Error sharing - silent fallback
      }
    } else {
      // Fallback to copying URL
      navigator.clipboard.writeText(window.location.href);
      // Could add a toast notification here
    }
  };

  const handleCopyContact = (contact) => {
    navigator.clipboard.writeText(contact);
    // Could add a toast notification here
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
      onClick={handleBackdropClick}
    >
      <div className={`relative max-w-2xl w-full max-h-[90vh] overflow-y-auto ${
        isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
      } rounded-2xl border shadow-2xl`}>
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className={`absolute top-4 right-4 z-10 p-2 rounded-full ${
            isDark ? 'bg-gray-700 hover:bg-gray-600 text-gray-300' : 'bg-gray-100 hover:bg-gray-200 text-gray-600'
          } transition-colors`}
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
          {/* Card Visual */}
          <div className={`relative h-96 lg:h-full ${
            card.category === 'technology' ? 'primary-gradient' :
            card.category === 'design' ? 'secondary-gradient' :
            card.category === 'marketing' ? 'success-gradient' :
            card.category === 'business' ? 'warning-gradient' :
            card.category === 'finance' ? 'warning-gradient' :
            card.category === 'medical' ? 'danger-gradient' :
            card.category === 'education' ? 'secondary-gradient' :
            card.category === 'legal' ? 'dark-gradient' :
            'primary-gradient'
          } flex items-center justify-center`}>
            
            {/* Card Content */}
            <div className="text-center text-white p-8">
              <div className="w-24 h-24 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-4xl font-bold">
                  {card.title?.charAt(0) || card.titleKey?.charAt(0) || 'C'}
                </span>
              </div>
              
              <h1 className="text-3xl font-bold mb-3">
                {card.titleKey ? t(`sampleCardTitles.${card.titleKey}`) : card.title}
              </h1>
              
              <p className="text-xl text-white/90 mb-4">
                {card.subtitleKey ? t(`sampleCardSubtitles.${card.subtitleKey}`) : card.subtitle}
              </p>
              
              <div className={`inline-flex items-center px-4 py-2 bg-white/20 rounded-full text-sm font-medium`}>
                {card.category ? t(`cardCategories.${card.category}`) : card.category}
              </div>
            </div>
          </div>

          {/* Card Details */}
          <div className="p-8">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-4">
                <div className={`flex items-center text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                  <span className="mr-1">👁</span>
                  {card.views || 0} {t('views')}
                </div>
                <LikeButton 
                  cardId={card._id} 
                  size="md" 
                  initialLikesCount={card.likes || 0}
                />
              </div>
              
              <button
                onClick={handleShare}
                className={`px-4 py-2 rounded-lg transition-colors ${
                  isDark 
                    ? 'bg-gray-700 hover:bg-gray-600 text-gray-300' 
                    : 'bg-gray-100 hover:bg-gray-200 text-gray-600'
                } flex items-center space-x-2`}
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
                </svg>
                <span>{t('cards.shareCard')}</span>
              </button>
            </div>

            <div className="mb-6">
              <h2 className={`text-xl font-semibold ${isDark ? 'text-white' : 'text-gray-900'} mb-3`}>
                {t('cards.cardDetails')}
              </h2>
              <p className={`${isDark ? 'text-gray-300' : 'text-gray-600'} leading-relaxed`}>
                {card.descriptionKey ? t(`sampleCardDescriptions.${card.descriptionKey}`) : card.description}
              </p>
            </div>

            <div className="mb-6">
              <h3 className={`text-lg font-semibold ${isDark ? 'text-white' : 'text-gray-900'} mb-4`}>
                {t('cards.contactInfo')}
              </h3>
              
              <div className="space-y-3">
                {(card.emailKey || card.email) && (
                  <div className="flex items-center justify-between">
                    <div className={`flex items-center ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                      <span className="w-5 h-5 mr-3">📧</span>
                      <span>{card.emailKey ? t(`sampleCardContacts.${card.emailKey}`) : card.email}</span>
                    </div>
                    <button
                      onClick={() => handleCopyContact(card.emailKey ? t(`sampleCardContacts.${card.emailKey}`) : card.email)}
                      className={`p-2 rounded-lg transition-colors ${
                        isDark ? 'hover:bg-gray-700 text-gray-400' : 'hover:bg-gray-100 text-gray-500'
                      }`}
                      title={t('common.copy')}
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                      </svg>
                    </button>
                  </div>
                )}
                
                {(card.phoneKey || card.phone) && (
                  <div className="flex items-center justify-between">
                    <div className={`flex items-center ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                      <span className="w-5 h-5 mr-3">📞</span>
                      <span>{card.phoneKey ? t(`sampleCardContacts.${card.phoneKey}`) : card.phone}</span>
                    </div>
                    <button
                      onClick={() => handleCopyContact(card.phoneKey ? t(`sampleCardContacts.${card.phoneKey}`) : card.phone)}
                      className={`p-2 rounded-lg transition-colors ${
                        isDark ? 'hover:bg-gray-700 text-gray-400' : 'hover:bg-gray-100 text-gray-500'
                      }`}
                      title={t('common.copy')}
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                      </svg>
                    </button>
                  </div>
                )}
                
                {(card.addressKey || card.address) && (
                  <div className="flex items-center justify-between">
                    <div className={`flex items-center ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                      <span className="w-5 h-5 mr-3">📍</span>
                      <span>
                        {card.addressKey ? t(`sampleCardAddresses.${card.addressKey}`) : 
                         (typeof card.address === 'string' ? card.address : `${card.address?.city}, ${card.address?.country}`)}
                      </span>
                    </div>
                    <button
                      onClick={() => handleCopyContact(
                        card.addressKey ? t(`sampleCardAddresses.${card.addressKey}`) : 
                        (typeof card.address === 'string' ? card.address : `${card.address?.city}, ${card.address?.country}`)
                      )}
                      className={`p-2 rounded-lg transition-colors ${
                        isDark ? 'hover:bg-gray-700 text-gray-400' : 'hover:bg-gray-100 text-gray-500'
                      }`}
                      title={t('common.copy')}
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                      </svg>
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3">
              <button className="btn-primary flex-1">
                {t('cards.viewProfile')}
              </button>
              
              <button className={`px-6 py-3 rounded-lg font-medium transition-colors ${
                isDark 
                  ? 'bg-gray-700 hover:bg-gray-600 text-gray-300' 
                  : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
              }`}>
                {t('cards.reportCard')}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardModal;
