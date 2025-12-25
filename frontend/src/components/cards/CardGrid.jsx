import { useTranslation } from 'react-i18next';
import CardItem from './CardItem';
import LoadingSpinner from '../common/LoadingSpinner';

const CardGrid = ({ 
  cards = [], 
  loading = false, 
  error = null,
  onLike,
  onFavorite,
  onDelete,
  emptyMessage,
  showActions = true,
  className = ""
}) => {
  const { t } = useTranslation();

  if (loading) {
    return (
      <div className="flex justify-center items-center py-12">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <div className="text-red-600 dark:text-red-400 mb-4">
          <svg className="w-12 h-12 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z"/>
          </svg>
          <p className="text-lg font-medium">{t('common.error')}</p>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{error}</p>
        </div>
      </div>
    );
  }

  if (!cards || cards.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-gray-500 dark:text-gray-400">
          <svg className="w-16 h-16 mx-auto mb-4 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"/>
          </svg>
          <p className="text-lg font-medium mb-2">
            {emptyMessage || t('cards.noCards')}
          </p>
          <p className="text-sm">
            {t('cards.noCardsDescription')}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 ${className}`} data-testid="cards-grid">
      {cards.map((card) => (
        <div key={card._id} data-testid="card-item">
          <CardItem
            card={card}
            onLike={onLike}
            onFavorite={onFavorite}
            onDelete={onDelete}
            showActions={showActions}
          />
        </div>
      ))}
    </div>
  );
};

export default CardGrid;
