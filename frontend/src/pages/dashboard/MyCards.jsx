import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { useAuth } from '../../context/AuthContext';
import { toast } from 'react-hot-toast';
import { PlusIcon, ClipboardDocumentListIcon, BriefcaseIcon, UserIcon, XMarkIcon } from '@heroicons/react/24/outline';
import Card from '../../components/cards/Card';
import { api } from '../../services/api';

const MyCardsPage = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showQuickForm, setShowQuickForm] = useState(false);
  const [quickCardData, setQuickCardData] = useState({
    title: '',
    subtitle: '',
    email: user?.email || '',
    phone: '',
    company: '',
    position: ''
  });

  // Retrieve user cards from API
  useEffect(() => {
    const fetchUserCards = async () => {
      if (!user) return;
      
      try {
        setLoading(true);
        setError(null);
        
        const response = await api.getUserCards();
        
        if (response.success) {
          setCards(response.data || []);
        } else {
          setError(response.message || 'Erreur lors du chargement des cartes');
        }
      } catch (error) {
        setError('Erreur lors du chargement des cartes');
        toast.error('Erreur lors du chargement des cartes');
      } finally {
        setLoading(false);
      }
    };

    fetchUserCards();
  }, [user]);

  // Delete a card
  const handleDeleteCard = async (cardId) => {
    try {
      // Tenter d'abord de supprimer via l'API backend
      try {
        await api.delete(`/cards/${cardId}`);
      } catch (backendError) {
        toast.error('Erreur lors de la suppression');
        
        setCards(cards.filter(card => (card._id || card.id) !== cardId));
        toast.success('Carte supprimée avec succès');
      }
    } catch (err) {
      toast.error('Erreur lors de la suppression');
    }
  };

  // Quick card creation for all users
  const handleQuickCardSubmit = async (e) => {
    e.preventDefault();
    
    // Validation des champs requis
    if (!quickCardData.title || !quickCardData.email) {
      toast.error('Le nom et l\'email sont requis');
      return;
    }
    
    try {
      const cardData = {
        title: quickCardData.title,
        subtitle: quickCardData.subtitle || quickCardData.position || '',
        description: quickCardData.subtitle ? 
          `${quickCardData.subtitle} ${quickCardData.company ? 'chez ' + quickCardData.company : ''}`.trim() :
          `Carte professionnelle de ${quickCardData.title}`,
        email: quickCardData.email,
        phone: quickCardData.phone || '',
        website: '',
        company: quickCardData.company || '',
        position: quickCardData.position || quickCardData.subtitle || '',
        address: '',
        isPublic: true
      };
      
      const response = await api.createCard(cardData);
      
      if (response.success) {
        toast.success('Carte créée avec succès !');
        // Recharger les cartes
        const updatedCards = await api.getUserCards();
        if (updatedCards.success) {
          setCards(updatedCards.data || []);
        }
        setShowQuickForm(false);
        setQuickCardData({
          title: '',
          subtitle: '',
          email: user?.email || '',
          phone: '',
          company: '',
          position: ''
        });
      } else {
        throw new Error(response.message || 'Erreur lors de la création');
      }
    } catch (error) {
      const errorMessage = error.response?.data?.message || error.message || 'Erreur lors de la création de la carte';
      toast.error(errorMessage);
    }
  };

  const handleQuickFormChange = (field, value) => {
    setQuickCardData(prev => ({ ...prev, [field]: value }));
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center px-4">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-center mb-2">Mes Cartes</h1>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">
            Connexion requise
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            Vous devez être connecté pour voir vos cartes
          </p>
          <Link 
            to="/login"
            className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg"
          >
            Se connecter
          </Link>
        </div>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>Mes Cartes - CardPro</title>
        <meta name="description" content="Gérez vos cartes de visite professionnelles" />
      </Helmet>
      
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="min-h-screen bg-neutral-50 dark:bg-gray-900 py-8 px-4"
      >
      <div className="container mx-auto max-w-6xl">
        <motion.div 
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="text-center mb-8"
        >
          <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-500 to-blue-700 bg-clip-text text-transparent mb-4" data-testid="my-cards-heading">
            Mes Cartes
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Gérez et organisez vos cartes de visite professionnelles
          </p>
        </motion.div>

        <motion.div 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="mb-6"
        >
          {/* Interface différente selon le type d'utilisateur */}
          <motion.div 
            className="mb-8 bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-blue-200 dark:border-blue-700"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className={`p-2 rounded-lg ${user?.isBusiness ? 'bg-blue-100 dark:bg-blue-900' : 'bg-green-100 dark:bg-green-900'}`}>
                  {user?.isBusiness ? (
                    <BriefcaseIcon className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                  ) : (
                    <UserIcon className="w-6 h-6 text-green-600 dark:text-green-400" />
                  )}
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    Création rapide de carte
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {user?.isBusiness ? 'Créez rapidement une nouvelle carte professionnelle' : 'Créez votre carte de visite personnelle'}
                  </p>
                </div>
              </div>
              <button
                onClick={() => setShowQuickForm(!showQuickForm)}
                className={`p-2 hover:bg-opacity-10 rounded-lg transition-colors ${
                  user?.isBusiness 
                    ? 'text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900' 
                    : 'text-green-600 dark:text-green-400 hover:bg-green-50 dark:hover:bg-green-900'
                }`}
              >
                {showQuickForm ? (
                  <XMarkIcon className="w-5 h-5" />
                ) : (
                  <PlusIcon className="w-5 h-5" />
                )}
              </button>
            </div>
            {showQuickForm && (
              <motion.form
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                onSubmit={handleQuickCardSubmit}
                className="mt-6 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg"
              >
                <h3 className="text-lg font-medium mb-4 text-gray-900 dark:text-white">
                  Création Rapide de Carte
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input
                    type="text"
                    placeholder="Nom complet *"
                    value={quickCardData.title}
                    onChange={(e) => handleQuickFormChange('title', e.target.value)}
                    className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                    required
                  />
                  
                  <input
                    type="email"
                    placeholder="Email *"
                    value={quickCardData.email}
                    onChange={(e) => handleQuickFormChange('email', e.target.value)}
                    className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                    required
                  />
                  
                  <input
                    type="text"
                    placeholder="Titre/Poste"
                    value={quickCardData.subtitle}
                    onChange={(e) => handleQuickFormChange('subtitle', e.target.value)}
                    className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                  />
                  
                  <input
                    type="tel"
                    placeholder="Téléphone"
                    value={quickCardData.phone}
                    onChange={(e) => handleQuickFormChange('phone', e.target.value)}
                    className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                  />
                  
                  <input
                    type="text"
                    placeholder="Entreprise"
                    value={quickCardData.company}
                    onChange={(e) => handleQuickFormChange('company', e.target.value)}
                    className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                  />
                  
                  <input
                    type="text"
                    placeholder="Poste spécifique"
                    value={quickCardData.position}
                    onChange={(e) => handleQuickFormChange('position', e.target.value)}
                    className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                  />
                </div>
                
                <div className="flex gap-3 mt-6">
                  <motion.button
                    type="submit"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className={`px-6 py-2 rounded-lg font-medium transition-colors text-white ${
                      user?.isBusiness 
                        ? 'bg-blue-500 hover:bg-blue-600' 
                        : 'bg-green-500 hover:bg-green-600'
                    }`}
                  >
                    <PlusIcon className="w-4 h-4 mr-2 inline" />
                    Créer la carte
                  </motion.button>
                  <motion.button
                    type="button"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setShowQuickForm(false)}
                    className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-lg font-medium transition-colors"
                  >
                    <XMarkIcon className="w-4 h-4 mr-2 inline" />
                    Annuler
                  </motion.button>
                </div>
              </motion.form>
            )}
          </motion.div>
          
          {/* Interface pour création avancée */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-xl mb-6">
            <div className="flex items-center mb-4">
              {user?.isBusiness ? (
                <BriefcaseIcon className="w-6 h-6 text-blue-500 mr-2" />
              ) : (
                <UserIcon className="w-6 h-6 text-green-500 mr-2" />
              )}
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                {user?.isBusiness ? 'Espace Professionnel' : 'Espace Personnel'}
              </h2>
            </div>
            
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link 
                to="/create-card"
                className="inline-flex items-center bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg font-medium shadow-lg transition-all"
              >
                <PlusIcon className="w-5 h-5 mr-2" />
                Créer une nouvelle carte
              </Link>
            </motion.div>
          </div>
        </motion.div>

        {loading ? (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-xl text-center glass-light dark:glass-dark"
          >
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
            <p className="text-gray-600 dark:text-gray-400">Chargement...</p>
          </motion.div>
        ) : error ? (
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-error-50 dark:bg-error-900/20 rounded-2xl p-8 shadow-xl text-center glass-light dark:glass-dark"
          >
            <div className="text-4xl mb-4">⚠️</div>
            <h2 className="text-xl font-semibold text-error-800 dark:text-error-200 mb-2">
              Erreur de chargement
            </h2>
            <p className="text-error-600 dark:text-error-400">{error}</p>
          </motion.div>
        ) : cards.length === 0 ? (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-xl text-center glass-light dark:glass-dark"
          >
            <ClipboardDocumentListIcon className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              Aucune carte pour le moment
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Créez votre première carte de visite professionnelle
            </p>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link 
                to="/create-card"
                className="inline-flex items-center bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg font-medium shadow-lg transition-all"
              >
                <PlusIcon className="w-5 h-5 mr-2" />
                Créer une nouvelle carte
              </Link>
            </motion.div>
          </motion.div>
        ) : (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            data-testid="cards-grid"
          >
            {cards.map((card, index) => (
              <motion.div
                key={card._id || card.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * index }}
              >
                <Card
                  card={card}
                  showActions={true}
                  onEdit={() => navigate(`/edit-card/${card._id}`)}
                  onDelete={() => handleDeleteCard(card._id)}
                />
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
      </motion.div>
    </>
  );
};

export default MyCardsPage;
