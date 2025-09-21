import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Plus, 
  CreditCard, 
  Heart, 
  User,
  ArrowRight
} from 'lucide-react';

/**
 * QuickActions Component
 * 
 * Dashboard futuriste avec 4 actions rapides sous forme de cartes glassmorphism.
 * Compatible React 18 + Vite + Tailwind + Framer Motion + React Router v7
 * 
 * Features:
 * - Design glassmorphism avec effets de transparence
 * - Animations fluides avec Framer Motion
 * - Responsive design (1-2-4 colonnes)
 * - Support dark mode automatique
 * - Icônes animées Lucide React
 * - Navigation React Router
 * - Style Apple/Tesla moderne
 */
const QuickActions = () => {
  // Configuration des actions rapides
  const quickActions = [
    {
      id: 'create-card',
      title: 'Créer une Carte',
      description: 'Créez une nouvelle carte de visite professionnelle',
      icon: Plus,
      path: '/create-card',
      gradient: 'from-blue-500/20 to-cyan-500/20',
      iconColor: 'text-blue-400',
      hoverColor: 'hover:border-blue-400/50'
    },
    {
      id: 'my-cards',
      title: 'Mes Cartes',
      description: 'Gérez et modifiez vos cartes existantes',
      icon: CreditCard,
      path: '/my-cards',
      gradient: 'from-purple-500/20 to-pink-500/20',
      iconColor: 'text-purple-400',
      hoverColor: 'hover:border-purple-400/50'
    },
    {
      id: 'favorites',
      title: 'Mes Favoris',
      description: 'Accédez à vos cartes favorites sauvegardées',
      icon: Heart,
      path: '/favorites',
      gradient: 'from-red-500/20 to-orange-500/20',
      iconColor: 'text-red-400',
      hoverColor: 'hover:border-red-400/50'
    },
    {
      id: 'profile',
      title: 'Profil',
      description: 'Personnalisez votre profil et paramètres',
      icon: User,
      path: '/profile',
      gradient: 'from-green-500/20 to-emerald-500/20',
      iconColor: 'text-green-400',
      hoverColor: 'hover:border-green-400/50'
    }
  ];

  // Variants d'animation pour le conteneur
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  // Variants d'animation pour chaque carte
  const cardVariants = {
    hidden: { 
      opacity: 0, 
      y: 20,
      scale: 0.95
    },
    visible: { 
      opacity: 1, 
      y: 0,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 24
      }
    }
  };

  // Variants d'animation pour les icônes
  const iconVariants = {
    rest: { 
      scale: 1,
      rotate: 0
    },
    hover: { 
      scale: 1.1,
      rotate: 5,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 10
      }
    },
    tap: { 
      scale: 0.95,
      rotate: -2
    }
  };

  // Variants pour la flèche
  const arrowVariants = {
    rest: { 
      x: 0,
      opacity: 0.6
    },
    hover: { 
      x: 4,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 10
      }
    }
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-8">
      {/* Titre de section */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-12"
      >
        <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-gray-900 via-blue-900 to-purple-900 dark:from-white dark:via-blue-100 dark:to-purple-100 bg-clip-text text-transparent mb-4">
          Actions Rapides
        </h2>
        <p className="text-gray-600 dark:text-gray-400 text-lg max-w-2xl mx-auto">
          Accédez rapidement aux fonctionnalités principales de votre dashboard
        </p>
      </motion.div>

      {/* Grille des actions rapides */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
      >
        {quickActions.map((action) => {
          const IconComponent = action.icon;
          
          return (
            <motion.div
              key={action.id}
              variants={cardVariants}
              whileHover="hover"
              whileTap="tap"
              className="group"
            >
              <Link to={action.path} className="block h-full">
                <motion.div
                  className={`
                    relative h-full p-6 rounded-2xl
                    bg-white/10 dark:bg-white/5
                    backdrop-blur-xl backdrop-saturate-150
                    border border-white/20 dark:border-white/10
                    shadow-xl shadow-black/5 dark:shadow-black/20
                    transition-all duration-300 ease-out
                    ${action.hoverColor}
                    hover:shadow-2xl hover:shadow-black/10 dark:hover:shadow-black/30
                    hover:bg-white/15 dark:hover:bg-white/8
                    hover:-translate-y-1
                    active:translate-y-0 active:scale-[0.98]
                  `}
                  whileHover={{
                    y: -4,
                    transition: { type: "spring", stiffness: 300, damping: 20 }
                  }}
                  whileTap={{
                    y: 0,
                    scale: 0.98
                  }}
                >
                  {/* Gradient overlay subtil */}
                  <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${action.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />
                  
                  {/* Contenu de la carte */}
                  <div className="relative z-10 flex flex-col h-full">
                    {/* Header avec icône */}
                    <div className="flex items-center justify-between mb-4">
                      <motion.div
                        variants={iconVariants}
                        initial="rest"
                        whileHover="hover"
                        whileTap="tap"
                        className={`
                          p-3 rounded-xl
                          bg-white/10 dark:bg-white/5
                          border border-white/20 dark:border-white/10
                          ${action.iconColor}
                          group-hover:bg-white/20 dark:group-hover:bg-white/10
                          transition-colors duration-300
                        `}
                      >
                        <IconComponent size={24} strokeWidth={2} />
                      </motion.div>
                      
                      <motion.div
                        variants={arrowVariants}
                        initial="rest"
                        whileHover="hover"
                        className="text-gray-400 dark:text-gray-500 group-hover:text-gray-600 dark:group-hover:text-gray-300 transition-colors duration-300"
                      >
                        <ArrowRight size={20} strokeWidth={2} />
                      </motion.div>
                    </div>

                    {/* Contenu textuel */}
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2 group-hover:text-gray-800 dark:group-hover:text-gray-100 transition-colors duration-300">
                        {action.title}
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed group-hover:text-gray-700 dark:group-hover:text-gray-300 transition-colors duration-300">
                        {action.description}
                      </p>
                    </div>

                    {/* Indicateur de progression subtil */}
                    <motion.div
                      className="mt-4 h-1 bg-gradient-to-r from-transparent via-white/20 to-transparent rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      initial={{ scaleX: 0 }}
                      whileHover={{ 
                        scaleX: 1,
                        transition: { duration: 0.3, ease: "easeOut" }
                      }}
                    />
                  </div>

                  {/* Effet de brillance au hover */}
                  <motion.div
                    className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    style={{
                      background: 'linear-gradient(135deg, transparent 0%, rgba(255,255,255,0.1) 50%, transparent 100%)'
                    }}
                    initial={{ x: '-100%' }}
                    whileHover={{ 
                      x: '100%',
                      transition: { duration: 0.6, ease: "easeInOut" }
                    }}
                  />
                </motion.div>
              </Link>
            </motion.div>
          );
        })}
      </motion.div>

      {/* Indicateur de statut subtil */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.5 }}
        className="flex justify-center mt-8"
      >
        <div className="flex space-x-2">
          {quickActions.map((_, index) => (
            <motion.div
              key={index}
              className="w-2 h-2 rounded-full bg-gray-300 dark:bg-gray-600"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 1.2 + index * 0.1 }}
            />
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default QuickActions;
