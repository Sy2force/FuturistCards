// ErrorPage - Page d'erreur 404 avec design attrayant et navigation utile
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  ExclamationTriangleIcon,
  HomeIcon,
  ArrowLeftIcon,
  MagnifyingGlassIcon,
  CreditCardIcon,
  UserIcon
} from '@heroicons/react/24/outline';
import ButtonGlass from '../components/common/ButtonGlass';
import { useAuth } from '../context/AuthContext';

const ErrorPage = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  const quickLinks = [
    {
      icon: HomeIcon,
      label: 'Accueil',
      path: '/',
      description: 'Retourner à la page d&apos;accueil'
    },
    {
      icon: CreditCardIcon,
      label: 'Toutes les cartes',
      path: '/cards',
      description: 'Parcourir les cartes de visite'
    },
    {
      icon: UserIcon,
      label: user ? 'Mon profil' : 'Se connecter',
      path: user ? '/profile' : '/login',
      description: user ? 'Voir mon profil' : 'Accéder à votre compte'
    }
  ];

  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4">
      <div className="max-w-4xl w-full text-center">
        {/* Animation d'erreur */}
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, type: "spring", bounce: 0.4 }}
          className="mb-8"
        >
          <div className="relative">
            {/* Cercles d'arrière-plan animés */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="absolute inset-0 w-64 h-64 mx-auto"
            >
              <div className="w-full h-full border-2 border-blue-500/20 rounded-full"></div>
              <div className="absolute top-4 left-4 w-56 h-56 border-2 border-purple-500/20 rounded-full"></div>
              <div className="absolute top-8 left-8 w-48 h-48 border-2 border-pink-500/20 rounded-full"></div>
            </motion.div>
            
            {/* Icône d'erreur centrale */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="relative z-10 w-64 h-64 mx-auto flex items-center justify-center"
            >
              <div className="w-32 h-32 bg-gradient-to-br from-red-500/20 to-orange-500/20 rounded-full flex items-center justify-center backdrop-blur-sm border border-red-500/30">
                <ExclamationTriangleIcon className="w-16 h-16 text-red-400" />
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* Titre et message d'erreur */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-12"
        >
          <h1 className="text-8xl md:text-9xl font-bold bg-gradient-to-r from-red-400 via-orange-400 to-yellow-400 bg-clip-text text-transparent mb-4">
            404
          </h1>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Page introuvable
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed">
            Nous n&apos;arrivons pas à charger cette page. Il semblerait qu&apos;elle ait disparu dans l&apos;espace numérique. 
            Oops! Cette page n&apos;existe pas, nous allons vous aider à retrouver votre chemin.
          </p>
        </motion.div>

        {/* Boutons d'action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex flex-col sm:flex-row gap-4 justify-center mb-16"
        >
          <ButtonGlass
            onClick={() => navigate(-1)}
            size="lg"
            className="group"
          >
            <ArrowLeftIcon className="w-5 h-5 mr-2 group-hover:-translate-x-1 transition-transform" />
            Retour en arrière
          </ButtonGlass>
          
          <Link to="/">
            <ButtonGlass variant="secondary" size="lg" className="group">
              <HomeIcon className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" />
              Page d&apos;accueil
            </ButtonGlass>
          </Link>
        </motion.div>

        {/* Liens rapides */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mb-12"
        >
          <h3 className="text-2xl font-semibold text-white mb-8">
            Où souhaitez-vous aller ?
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {quickLinks.map((link, index) => (
              <motion.div
                key={link.path}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.1 * index, duration: 0.5 }}
              >
                <Link
                  to={link.path}
                  className="block bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-all duration-300 group"
                >
                  <link.icon className="w-12 h-12 text-blue-400 mx-auto mb-4 group-hover:scale-110 transition-transform" />
                  <h4 className="text-xl font-semibold text-white mb-2">{link.label}</h4>
                  <p className="text-gray-400 text-sm">{link.description}</p>
                </Link>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Barre de recherche */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="max-w-md mx-auto mb-12"
        >
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6">
            <h4 className="text-lg font-semibold text-white mb-4 flex items-center justify-center">
              <MagnifyingGlassIcon className="w-5 h-5 mr-2 text-purple-400" />
              Quelque chose s&apos;est mal passé
            </h4>
            <div className="relative">
              <input
                type="text"
                placeholder="Nous n&apos;avons pas pu trouver la page que vous cherchez..."
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                onKeyPress={(e) => {
                  if (e.key === 'Enter' && e.target.value.trim()) {
                    // Redirection basée sur la recherche
                    const query = e.target.value.toLowerCase().trim();
                    if (query.includes('carte') || query.includes('card')) {
                      navigate('/cards');
                    } else if (query.includes('profil') || query.includes('profile')) {
                      navigate(user ? '/profile' : '/login');
                    } else if (query.includes('accueil') || query.includes('home')) {
                      navigate('/');
                    } else if (query.includes('favori') || query.includes('favorite')) {
                      navigate(user ? '/favorites' : '/login');
                    } else {
                      navigate('/cards');
                    }
                  }
                }}
              />
            </div>
            <p className="text-xs text-gray-500 mt-2 text-center">
              Appuyez sur Entrée pour rechercher
            </p>
          </div>
        </motion.div>

        {/* Message d'encouragement */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1 }}
          className="bg-gradient-to-r from-blue-600/20 via-purple-600/20 to-pink-600/20 backdrop-blur-sm border border-white/10 rounded-2xl p-8 max-w-2xl mx-auto"
        >
          <h4 className="text-xl font-semibold text-white mb-3">
            🚀 Explorez FuturistCards
          </h4>
          <p className="text-gray-300 leading-relaxed">
            Profitez de cette occasion pour découvrir toutes les fonctionnalités incroyables 
            de notre plateforme de cartes de visite numériques. Créez, partagez et connectez-vous 
            avec des professionnels du monde entier !
          </p>
        </motion.div>

        {/* Footer de la page d'erreur */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 1.2 }}
          className="mt-16 text-center"
        >
          <p className="text-gray-500 text-sm">
            Si le problème persiste, n&apos;hésitez pas à nous contacter à{' '}
            <a 
              href="mailto:support@futuristcards.com" 
              className="text-blue-400 hover:text-blue-300 transition-colors"
            >
              support@futuristcards.com
            </a>
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default ErrorPage;
