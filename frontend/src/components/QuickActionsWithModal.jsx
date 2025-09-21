import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { 
  Plus, 
  CreditCard, 
  Heart, 
  User, 
  X,
  Sparkles,
  ArrowRight
} from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { useLanguage } from '../context/LanguageContext';
import QuickActionModal from './QuickActionModal';

const QuickActionsWithModal = () => {
  const [activeModal, setActiveModal] = useState(null);
  const { isDark } = useTheme();
  const { t } = useLanguage();
  const navigate = useNavigate();

  // Configuration des actions rapides avec leurs données
  const quickActions = [
    {
      id: 'create',
      title: t('createCard'),
      description: 'Créez une nouvelle carte de visite professionnelle avec notre éditeur avancé',
      icon: Plus,
      color: 'from-blue-500 to-cyan-500',
      hoverColor: 'from-blue-600 to-cyan-600',
      route: '/create-card',
      modalContent: {
        title: 'Créer une Nouvelle Carte',
        description: 'Transformez votre identité professionnelle avec une carte de visite numérique époustouflante. Notre éditeur intuitif vous permet de créer des designs uniques qui reflètent parfaitement votre personnalité et votre marque.',
        features: [
          'Design glassmorphisme moderne',
          'Personnalisation complète',
          'Intégration réseaux sociaux',
          'QR Code automatique'
        ]
      }
    },
    {
      id: 'cards',
      title: t('myCards'),
      description: 'Gérez et modifiez toutes vos cartes de visite existantes',
      icon: CreditCard,
      color: 'from-purple-500 to-pink-500',
      hoverColor: 'from-purple-600 to-pink-600',
      route: '/my-cards',
      modalContent: {
        title: 'Mes Cartes de Visite',
        description: 'Accédez à votre collection personnelle de cartes de visite numériques. Modifiez, dupliquez ou supprimez vos créations en quelques clics.',
        features: [
          'Vue d\'ensemble de toutes vos cartes',
          'Statistiques de vues et interactions',
          'Édition rapide et intuitive',
          'Gestion des paramètres de visibilité'
        ]
      }
    },
    {
      id: 'favorites',
      title: t('favorites'),
      description: 'Découvrez vos cartes de visite préférées sauvegardées',
      icon: Heart,
      color: 'from-red-500 to-rose-500',
      hoverColor: 'from-red-600 to-rose-600',
      route: '/favorites',
      modalContent: {
        title: 'Mes Favoris',
        description: 'Retrouvez facilement les cartes de visite qui vous ont marqué. Organisez votre réseau professionnel et gardez un accès rapide aux contacts importants.',
        features: [
          'Collection de cartes favorites',
          'Tri par catégories et tags',
          'Accès rapide aux informations de contact',
          'Synchronisation en temps réel'
        ]
      }
    },
    {
      id: 'profile',
      title: t('profile'),
      description: 'Personnalisez votre profil et vos préférences',
      icon: User,
      color: 'from-green-500 to-emerald-500',
      hoverColor: 'from-green-600 to-emerald-600',
      route: '/profile',
      modalContent: {
        title: 'Mon Profil',
        description: 'Personnalisez votre expérience FuturistCards. Gérez vos informations personnelles, préférences de confidentialité et paramètres de notification.',
        features: [
          'Informations personnelles',
          'Préférences de confidentialité',
          'Paramètres de notification',
          'Historique d\'activité'
        ]
      }
    }
  ];

  // Gestion de l'ouverture des modales
  const openModal = (actionId) => {
    setActiveModal(actionId);
  };

  // Gestion de la fermeture des modales
  const closeModal = () => {
    setActiveModal(null);
  };

  // Navigation vers la page correspondante
  const handleNavigate = (route) => {
    closeModal();
    navigate(route);
  };

  // Animations pour les cartes d'action
  const cardVariants = {
    hidden: { opacity: 0, y: 20, scale: 0.95 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        delay: i * 0.1,
        duration: 0.5,
        type: 'spring',
        stiffness: 100
      }
    }),
    hover: {
      scale: 1.05,
      y: -5,
      transition: {
        duration: 0.2,
        type: 'spring',
        stiffness: 300
      }
    }
  };

  // Animations pour la modale
  const modalVariants = {
    hidden: { 
      opacity: 0, 
      scale: 0.8,
      y: 50
    },
    visible: { 
      opacity: 1, 
      scale: 1,
      y: 0,
      transition: {
        type: 'spring',
        damping: 25,
        stiffness: 300
      }
    },
    exit: { 
      opacity: 0, 
      scale: 0.8,
      y: 50,
      transition: {
        duration: 0.2
      }
    }
  };

  // Animation pour l'overlay
  const overlayVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
    exit: { opacity: 0 }
  };

  return (
    <div className="w-full">
      {/* Grille des actions rapides */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {quickActions.map((action, index) => {
          const IconComponent = action.icon;
          
          return (
            <motion.div
              key={action.id}
              custom={index}
              variants={cardVariants}
              initial="hidden"
              animate="visible"
              whileHover="hover"
              className="relative group cursor-pointer"
              onClick={() => openModal(action.id)}
            >
              {/* Carte glassmorphisme */}
              <div className={`
                relative overflow-hidden rounded-2xl p-6
                backdrop-blur-xl border border-white/20
                ${isDark 
                  ? 'bg-white/10 hover:bg-white/15' 
                  : 'bg-white/30 hover:bg-white/40'
                }
                transition-all duration-300 ease-out
                shadow-lg hover:shadow-2xl
                group-hover:border-white/30
              `}>
                {/* Gradient de fond animé */}
                <div className={`
                  absolute inset-0 opacity-0 group-hover:opacity-20
                  bg-gradient-to-br ${action.hoverColor}
                  transition-opacity duration-300
                `} />
                
                {/* Effet de brillance au survol */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className={`
                    absolute inset-0 bg-gradient-to-br ${action.color}
                    opacity-10 blur-xl
                  `} />
                </div>

                {/* Contenu de la carte */}
                <div className="relative z-10">
                  {/* Icône avec gradient */}
                  <div className={`
                    inline-flex items-center justify-center w-12 h-12 rounded-xl mb-4
                    bg-gradient-to-br ${action.color}
                    shadow-lg group-hover:shadow-xl
                    transition-all duration-300
                    group-hover:scale-110
                  `}>
                    <IconComponent className="w-6 h-6 text-white" />
                  </div>

                  {/* Titre */}
                  <h3 className={`
                    text-lg font-semibold mb-2
                    ${isDark ? 'text-white' : 'text-gray-900'}
                    group-hover:text-transparent group-hover:bg-clip-text
                    group-hover:bg-gradient-to-r group-hover:${action.color}
                    transition-all duration-300
                  `}>
                    {action.title}
                  </h3>

                  {/* Description */}
                  <p className={`
                    text-sm leading-relaxed
                    ${isDark ? 'text-gray-300' : 'text-gray-600'}
                    group-hover:text-opacity-80
                    transition-colors duration-300
                  `}>
                    {action.description}
                  </p>

                  {/* Indicateur d'action */}
                  <div className="flex items-center mt-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <span className={`
                      text-xs font-medium
                      ${isDark ? 'text-gray-400' : 'text-gray-500'}
                    `}>
                      Cliquer pour ouvrir
                    </span>
                    <ArrowRight className="w-3 h-3 ml-2 text-current" />
                  </div>
                </div>

                {/* Particules décoratives */}
                <div className="absolute top-4 right-4 opacity-20 group-hover:opacity-40 transition-opacity duration-300">
                  <Sparkles className="w-4 h-4 text-white" />
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Système de modales avec QuickActionModal */}
      {activeModal && (() => {
        const currentAction = quickActions.find(a => a.id === activeModal);
        if (!currentAction) return null;
        
        return (
          <QuickActionModal
            isOpen={true}
            onClose={closeModal}
            title={currentAction.modalContent.title}
            description={currentAction.modalContent.description}
            route={currentAction.route}
            icon={currentAction.icon}
          />
        );
      })()}
    </div>
  );
};

export default QuickActionsWithModal;
