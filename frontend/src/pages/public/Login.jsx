import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { useAuth } from '../../context/AuthContext';
import LoginForm from '../../components/auth/LoginForm';
import { SparklesIcon, UserIcon, BuildingOfficeIcon } from '@heroicons/react/24/outline';

const Login = () => {
  const navigate = useNavigate();
  const { user, loginDemo, loading } = useAuth();

  // Rediriger si déjà connecté
  useEffect(() => {
    if (user) {
      if (user.role === 'admin') {
        navigate('/admin');
      } else if (user.role === 'business') {
        navigate('/dashboard');
      } else {
        navigate('/dashboard');
      }
    }
  }, [user, navigate]);

  const handleLoginSuccess = () => {
    // La redirection sera gérée par useEffect
  };

  const handleDemoLogin = async (userType) => {
    try {
      await loginDemo(userType);
      // La redirection sera gérée par useEffect après la connexion
    } catch (error) {
      // Erreur connexion démo - continue
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center px-4 py-8">
      <Helmet>
        <title>Connexion - FuturistCards</title>
        <meta name="description" content="Connectez-vous à votre compte FuturistCards pour gérer vos cartes de visite numériques" />
      </Helmet>
      
      <motion.div 
        className="w-full max-w-md"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="bg-white/10 backdrop-blur-lg rounded-2xl shadow-2xl border border-white/20 p-8">
          <div className="text-center mb-8">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            >
              <SparklesIcon className="h-12 w-12 text-purple-400 mx-auto mb-4" />
            </motion.div>
            <h1 className="text-3xl font-bold text-white mb-2">Connexion</h1>
            <p className="text-purple-200">Accédez à votre compte</p>
          </div>

          <LoginForm onSuccess={handleLoginSuccess} />

          {/* Boutons de connexion démo */}
          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-white/20" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="bg-white/10 px-2 text-purple-200">Ou essayez en mode démo</span>
              </div>
            </div>
          </div>

          <div className="mt-4 space-y-3">
            <motion.button
              onClick={() => handleDemoLogin('business')}
              disabled={loading}
              className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 disabled:from-gray-600 disabled:to-gray-700 text-white font-semibold py-3 px-4 rounded-lg transition-all duration-300 transform hover:scale-105 disabled:scale-100 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
              whileHover={{ scale: loading ? 1 : 1.02 }}
              whileTap={{ scale: loading ? 1 : 0.98 }}
            >
              <BuildingOfficeIcon className="h-5 w-5" />
              <span>Démo Compte Pro</span>
            </motion.button>
            
            <motion.button
              onClick={() => handleDemoLogin('user')}
              disabled={loading}
              className="w-full bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 disabled:from-gray-600 disabled:to-gray-700 text-white font-semibold py-3 px-4 rounded-lg transition-all duration-300 transform hover:scale-105 disabled:scale-100 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
              whileHover={{ scale: loading ? 1 : 1.02 }}
              whileTap={{ scale: loading ? 1 : 0.98 }}
            >
              <UserIcon className="h-5 w-5" />
              <span>Démo Utilisateur</span>
            </motion.button>
          </div>

          <div className="mt-8 text-center">
            <p className="text-purple-200 text-sm">
              Pas encore de compte ?{' '}
              <Link 
                to="/register" 
                className="text-purple-400 hover:text-purple-300 font-medium transition-colors"
              >
                S&apos;inscrire
              </Link>
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Login;
