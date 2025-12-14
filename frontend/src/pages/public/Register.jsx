import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { useAuth } from '../../context/AuthContext';
import RegisterForm from '../../components/auth/RegisterForm';
import { SparklesIcon } from '@heroicons/react/24/outline';

const Register = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  // Rediriger si déjà connecté
  useEffect(() => {
    if (user) {
      if (user.role === 'admin') {
        navigate('/admin');
      } else if (user.role === 'business') {
        navigate('/dashboard');
      } else {
        navigate('/cards');
      }
    }
  }, [user, navigate]);

  const handleRegisterSuccess = (userData) => {
    // Redirection basée sur le rôle après inscription réussie
    if (userData.role === 'admin') {
      navigate('/admin');
    } else if (userData.role === 'business') {
      navigate('/dashboard');
    } else {
      navigate('/cards');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-900 dark:to-gray-800 py-8 px-4">
      <Helmet>
        <title>S&apos;inscrire - FuturistCards</title>
        <meta name="description" content="Créez votre compte FuturistCards et commencez à créer des cartes professionnelles numériques innovantes." />
      </Helmet>

      <div className="container mx-auto max-w-md">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full mb-6">
            <SparklesIcon className="h-8 w-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
            Créer un compte
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Rejoignez FuturistCards et créez votre première carte professionnelle numérique
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <RegisterForm onSuccess={handleRegisterSuccess} />
        </motion.div>

        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-center mt-6"
        >
          <p className="text-gray-600 dark:text-gray-400">
            Déjà un compte ?{' '}
            <Link 
              to="/login" 
              className="text-blue-500 hover:text-blue-600 font-medium transition-colors"
            >
              Se connecter
            </Link>
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default Register;
