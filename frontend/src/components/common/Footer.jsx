import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { 
  HeartIcon, 
  CodeBracketIcon, 
  GlobeAltIcon,
  ShieldCheckIcon,
  UserGroupIcon,
  BuildingOfficeIcon
} from '@heroicons/react/24/outline';

const Footer = () => {
  const { user } = useAuth();

  const currentYear = new Date().getFullYear();

  const footerLinks = {
    public: [
      { to: '/', label: 'Accueil' },
      { to: '/about', label: 'À propos' },
      { to: '/cards', label: 'Cartes' }
    ],
    user: [
      { to: '/dashboard', label: 'Tableau de bord' },
      { to: '/favorites', label: 'Favoris' },
      { to: '/profile', label: 'Profil' }
    ],
    business: [
      { to: '/create-card', label: 'Créer une carte' },
      { to: '/my-cards', label: 'Mes cartes' }
    ],
    admin: [
      { to: '/admin', label: 'Administration' }
    ]
  };

  const getFooterLinks = () => {
    let links = [...footerLinks.public];
    
    if (user) {
      links = [...links, ...footerLinks.user];
      
      if (user.role === 'business' || user.role === 'admin') {
        links = [...links, ...footerLinks.business];
      }
      
      if (user.role === 'admin') {
        links = [...links, ...footerLinks.admin];
      }
    }
    
    return links;
  };

  const features = [
    {
      icon: ShieldCheckIcon,
      title: "Sécurisé",
      description: "Authentification JWT"
    },
    {
      icon: UserGroupIcon,
      title: "Multi-rôles",
      description: "User, Business, Admin"
    },
    {
      icon: GlobeAltIcon,
      title: "Responsive",
      description: "Tous appareils"
    },
    {
      icon: BuildingOfficeIcon,
      title: "Professionnel",
      description: "Solution entreprise"
    }
  ];

  return (
    <footer className="bg-slate-900 border-t border-slate-800">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          
          {/* Brand & Description */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <Link to="/" className="flex items-center space-x-2 mb-4">
                <span className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                  FuturistCards
                </span>
              </Link>
              <p className="text-gray-400 text-sm leading-relaxed mb-6">
                La plateforme moderne pour créer, gérer et partager vos cartes de visite numériques. 
                Sécurisée, responsive et professionnelle.
              </p>
              
              {/* User Role Badge */}
              {user && (
                <div className="flex items-center space-x-2">
                  <span className="text-xs text-gray-500">Connecté en tant que:</span>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    user.role === 'admin' 
                      ? 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                      : user.role === 'business'
                      ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                      : 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
                  }`}>
                    {user.role === 'admin' ? 'Admin' : user.role === 'business' ? 'Business' : 'User'}
                  </span>
                </div>
              )}
            </motion.div>
          </div>

          {/* Navigation Links */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
            >
              <h3 className="text-white font-semibold mb-4">Navigation</h3>
              <ul className="space-y-2">
                {getFooterLinks().map((link, index) => (
                  <li key={index}>
                    <Link 
                      to={link.to}
                      className="text-gray-400 hover:text-white text-sm transition-colors duration-200"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>

          {/* Features */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <h3 className="text-white font-semibold mb-4">Fonctionnalités</h3>
              <div className="grid grid-cols-2 gap-4">
                {features.map((feature, index) => {
                  const Icon = feature.icon;
                  return (
                    <div key={index} className="flex items-start space-x-3">
                      <div className="flex-shrink-0">
                        <Icon className="w-5 h-5 text-purple-400" />
                      </div>
                      <div>
                        <h4 className="text-white text-sm font-medium">{feature.title}</h4>
                        <p className="text-gray-400 text-xs">{feature.description}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0"
          >
            <div className="flex items-center space-x-4">
              <p className="text-gray-400 text-sm">
                © {currentYear} FuturistCards. Tous droits réservés.
              </p>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2 text-gray-400 text-sm">
                <span>Développé avec</span>
                <HeartIcon className="w-4 h-4 text-red-400" />
                <span>pour HackerU</span>
              </div>
              
              <div className="flex items-center space-x-2 text-gray-400 text-sm">
                <CodeBracketIcon className="w-4 h-4" />
                <span>React + Node.js</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
