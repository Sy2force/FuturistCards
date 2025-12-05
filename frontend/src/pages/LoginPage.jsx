import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import toast from 'react-hot-toast';
import { useAuth } from '../hooks/useAuth';
import { validateEmail, validatePassword, isFormValid } from '../utils/validation';
import { 
  FormContainer, 
  EmailInput, 
  PasswordInput, 
  SubmitButton 
} from '../components/FormComponents';
import { ArrowRightIcon, SparklesIcon } from '@heroicons/react/24/outline';

const LoginPage = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { login, loading } = useAuth();
  
  // State pour les valeurs et erreurs du formulaire
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [errors, setErrors] = useState({});
  const [touchedFields, setTouchedFields] = useState({});

  // Validation en temps réel
  const validateForm = () => {
    const newErrors = {};
    
    const emailValidation = validateEmail(formData.email);
    if (!emailValidation.isValid) {
      newErrors.email = emailValidation.error;
    }
    
    const passwordValidation = validatePassword(formData.password);
    if (!passwordValidation.isValid) {
      newErrors.password = passwordValidation.error;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    setTouchedFields(prev => ({ ...prev, [field]: true }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        await login(formData.email, formData.password);
        navigate('/dashboard');
      } catch (error) {
        // Gestion d'erreur spécifique pour Network Error
        if (error.message?.includes('Network Error') || error.code === 'ERR_NETWORK') {
          toast.error('Erreur de connexion au serveur. Vérifiez votre connexion internet.');
        }
        // Les autres erreurs sont gérées par AuthContext avec toast
      }
    }
  };

  // Fonction pour remplir rapidement avec le compte demo
  const fillDemoAccount = () => {
    setFormData({
      email: 'user@test.com',
      password: 'User123!'
    });
  };

  const requiredFields = ['email', 'password'];
  const formIsValid = isFormValid(errors, formData, requiredFields);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-green-50 dark:from-gray-900 dark:via-blue-900 dark:to-gray-800 flex items-center justify-center px-4 py-8">
      <motion.div 
        className="max-w-md w-full space-y-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        {/* En-tête avec animation */}
        <motion.div 
          className="text-center"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <div className="flex items-center justify-center mb-4">
            <SparklesIcon className="h-8 w-8 text-blue-500 mr-2" />
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-green-500 bg-clip-text text-transparent">
              {t('login')}
            </h1>
          </div>
          <p className="text-gray-600 dark:text-gray-300 text-lg">
            {t('accessYourAccount')}
          </p>
        </motion.div>

        {/* Formulaire principal */}
        <motion.div 
          className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-lg rounded-2xl p-8 shadow-2xl border border-white/20 dark:border-gray-700/30"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4, duration: 0.5 }}
        >
          <FormContainer onSubmit={handleSubmit}>
            {/* Email avec validation HackerU */}
            <EmailInput 
              name="email"
              label={t('email')}
              value={formData.email}
              onChange={(e) => handleInputChange('email', e.target.value)}
              onBlur={() => {}}
              error={errors.email}
              touched={touchedFields.email}
              required
              placeholder="votre@email.com"
            />

            {/* Mot de passe avec validation HackerU */}
            <PasswordInput
              name="password"
              label={t('password')}
              value={formData.password}
              onChange={(e) => handleInputChange('password', e.target.value)}
              onBlur={() => {}}
              error={errors.password}
              touched={touchedFields.password}
              required
              placeholder={t('password')}
            />

            {/* Bouton de connexion avec feedback visuel */}
            <SubmitButton 
              isValid={formIsValid} 
              isLoading={loading}
            >
              <div className="flex items-center justify-center">
                {!loading && <ArrowRightIcon className="w-5 h-5 mr-2" />}
                {t('signIn')}
              </div>
            </SubmitButton>
          </FormContainer>

          {/* Lien vers inscription */}
          <motion.div 
            className="mt-6 text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.3 }}
          >
            <p className="text-gray-600 dark:text-gray-400">
              {t('noAccountYet')}{' '}
              <Link 
                to="/register" 
                data-testid="login-register-link"
                className="text-blue-600 hover:text-blue-700 font-semibold transition-colors"
              >
                {t('createAccount')}
              </Link>
            </p>
          </motion.div>
        </motion.div>

        {/* Compte de démonstration avec bouton de remplissage automatique */}
        <motion.div 
          className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-lg rounded-2xl p-6 shadow-xl border border-white/20 dark:border-gray-700/30"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.5 }}
        >
          <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4 text-center flex items-center justify-center">
            <SparklesIcon className="w-5 h-5 mr-2 text-green-500" />
            {t('demoAccount')}
          </h3>
          <div className="space-y-3 text-sm">
            <div className="flex justify-between items-center">
              <span className="text-gray-600 dark:text-gray-400">{t('email')} :</span>
              <span className="text-blue-600 font-mono text-xs bg-blue-50 dark:bg-blue-900/30 px-2 py-1 rounded">
                user@test.com
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600 dark:text-gray-400">{t('password')} :</span>
              <span className="text-green-600 font-mono text-xs bg-green-50 dark:bg-green-900/30 px-2 py-1 rounded">
                User123!
              </span>
            </div>
            <button
              type="button"
              onClick={fillDemoAccount}
              data-testid="fill-demo-button"
              className="w-full mt-3 py-2 px-4 bg-gradient-to-r from-blue-500 to-green-500 text-white rounded-lg font-medium hover:from-blue-600 hover:to-green-600 transition-all duration-300 transform hover:scale-105"
            >
              {t('autoFill')}
            </button>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default LoginPage;
