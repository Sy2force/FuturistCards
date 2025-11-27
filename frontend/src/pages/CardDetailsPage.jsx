import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import api from '../services/api';
import toast from 'react-hot-toast';

const CardDetailsPageSimple = () => {
  const { t } = useTranslation();
  const { id } = useParams();
  const navigate = useNavigate();
  const [card, setCard] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCard = async () => {
      try {
        const response = await api.get(`/cards/${id}`);
        if (response.data.success) {
          setCard(response.data.data);
        }
      } catch (error) {
        // Error handling for card fetch
        toast.error(t('errorOccurred'));
        navigate('/cards');
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchCard();
    }
  }, [id, navigate, t]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (!card) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-4">{t('cardNotFound')}</h2>
          <Link to="/cards" className="text-blue-500 hover:text-blue-600">{t('backToCards')}</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-900 dark:to-gray-800 py-8 px-4">
      <div className="container mx-auto max-w-4xl">
        {/* Bouton retour */}
        <div className="mb-6">
          <Link 
            to="/cards" 
            className="inline-flex items-center text-blue-500 hover:text-blue-600 font-medium"
          >
            ← {t('backToCards')}
          </Link>
        </div>

        {/* Carte principale */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden">
          {/* En-tête avec gradient */}
          <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-8 text-white">
            <div className="text-center">
              {card.image?.url ? (
                <img 
                  src={card.image.url} 
                  alt={card.image.alt || card.title}
                  className="w-24 h-24 rounded-full object-cover mx-auto mb-4 border-4 border-white/20"
                />
              ) : (
                <div className="w-24 h-24 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold">
                    {card.title.split(' ').map(n => n[0]).join('')}
                  </span>
                </div>
              )}
              <h1 className="text-3xl font-bold mb-2">{card.title}</h1>
              <p className="text-xl opacity-90">{card.subtitle}</p>
            </div>
          </div>

          {/* Contenu */}
          <div className="p-8">
            {/* Description */}
            <div className="mb-8">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-3">
                {t('about')}
              </h2>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                {card.description}
              </p>
            </div>

            {/* Informations de contact */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                  {t('contact')}
                </h3>
                
                <div className="flex items-center space-x-3">
                  <div className="text-blue-500">📧</div>
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{t('email')}</p>
                    <a 
                      href={`mailto:${card.email}`}
                      className="text-blue-500 hover:text-blue-600"
                    >
                      {card.email}
                    </a>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <div className="text-green-500">📞</div>
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{t('phone')}</p>
                    <a 
                      href={`tel:${card.phone}`}
                      className="text-green-500 hover:text-green-600"
                    >
                      {card.phone}
                    </a>
                  </div>
                </div>

                {card.website && (
                  <div className="flex items-center space-x-3">
                    <div className="text-purple-500">🌐</div>
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">{t('website')}</p>
                      <a 
                        href={card.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-purple-500 hover:text-purple-600"
                      >
                        {card.website}
                      </a>
                    </div>
                  </div>
                )}
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                  {t('information')}
                </h3>
                
                {card.address && (
                  <div className="flex items-center space-x-3">
                    <div className="text-red-500">📍</div>
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">{t('address')}</p>
                      <p className="text-gray-700 dark:text-gray-300">{card.address}</p>
                    </div>
                  </div>
                )}

                <div className="flex items-center space-x-3">
                  <div className="text-orange-500">🏷️</div>
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{t('category')}</p>
                    <span className="inline-block px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-sm rounded-full">
                      {t(`createCard.${card.category}`) || card.category}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-4 pt-6 border-t border-gray-200 dark:border-gray-600">
              <button className="flex-1 bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg font-medium transition-colors">
                {t('addToFavorites')}
              </button>
              <button className="flex-1 bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-lg font-medium transition-colors">
                {t('share')}
              </button>
              <button className="flex-1 bg-gray-500 hover:bg-gray-600 text-white px-6 py-3 rounded-lg font-medium transition-colors">
                {t('downloadVCard')}
              </button>
            </div>
          </div>
        </div>

        {/* Cartes similaires */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-6">
            {t('similarCards')}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[1, 2, 3].map(i => (
              <div key={i} className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
                <h3 className="font-bold text-gray-900 dark:text-gray-100 mb-2">
                  {t('person')} {i}
                </h3>
                <p className="text-blue-600 dark:text-blue-400 text-sm mb-4">
                  {t('similarProfession')}
                </p>
                <Link 
                  to={`/cards/${i}`}
                  className="text-blue-500 hover:text-blue-600 text-sm font-medium"
                >
                  {t('viewDetails')} →
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardDetailsPageSimple;
