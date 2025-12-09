import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { useAuth } from '../hooks/useAuth';
import { validateEmail, validatePassword, validateRequired, validateLength, isFormValid } from '../utils/validation';
import { 
  FormContainer, 
  EmailInput, 
  PasswordInput,
  TextInput,
  SelectInput,
  SubmitButton 
} from '../components/FormComponents';
import { UserPlusIcon, SparklesIcon } from '@heroicons/react/24/outline';

const RegisterPage = () => {
  const navigate = useNavigate();
  const { register, login, loading } = useAuth();
  
  // State pour les valeurs et erreurs du formulaire
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'user'
  });
  const [errors, setErrors] = useState({});
  const [touchedFields, setTouchedFields] = useState({});

  // Validation en temps réel
  const validateForm = () => {
    const newErrors = {};
    
    const firstNameValidation = validateRequired(formData.firstName, 'Le prénom');
    if (!firstNameValidation.isValid) {
      newErrors.firstName = firstNameValidation.error;
    } else {
      const lengthValidation = validateLength(formData.firstName, 2, 50, 'Le prénom');
      if (!lengthValidation.isValid) {
        newErrors.firstName = lengthValidation.error;
      }
    }
    
    const lastNameValidation = validateRequired(formData.lastName, 'Le nom');
    if (!lastNameValidation.isValid) {
      newErrors.lastName = lastNameValidation.error;
    } else {
      const lengthValidation = validateLength(formData.lastName, 2, 50, 'Le nom');
      if (!lengthValidation.isValid) {
        newErrors.lastName = lengthValidation.error;
      }
    }
    
    const emailValidation = validateEmail(formData.email);
    if (!emailValidation.isValid) {
      newErrors.email = emailValidation.error;
    }
    
    const passwordValidation = validatePassword(formData.password);
    if (!passwordValidation.isValid) {
      newErrors.password = passwordValidation.error;
    }
    
    // Valider la confirmation du mot de passe seulement si les deux champs sont remplis
    if (formData.confirmPassword && formData.password) {
      if (formData.password !== formData.confirmPassword) {
        newErrors.confirmPassword = 'Les mots de passe ne correspondent pas';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };


  const handleInputChange = (field, value) => {
    const updatedFormData = { ...formData, [field]: value };
    setFormData(updatedFormData);
    setTouchedFields(prev => ({ ...prev, [field]: true }));
    
    // Valider immédiatement si c'est pour les mots de passe
    if (field === 'confirmPassword' || field === 'password') {
      const newErrors = { ...errors };
      
      if (updatedFormData.confirmPassword && updatedFormData.password) {
        if (updatedFormData.password === updatedFormData.confirmPassword) {
          // Les mots de passe correspondent, enlever l'erreur
          delete newErrors.confirmPassword;
        } else {
          // Les mots de passe ne correspondent pas
          newErrors.confirmPassword = 'Les mots de passe ne correspondent pas';
        }
        setErrors(newErrors);
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        // Retirer confirmPassword avant d'envoyer au backend (role est envoyé)
        const { confirmPassword, ...dataToSend } = formData;
        const result = await register(dataToSend);
        if (result?.success) {
          // Connexion automatique après inscription réussie
          try {
            const loginResult = await login(formData.email, formData.password);
            if (loginResult?.success) {
              // Rediriger selon le rôle de l'utilisateur
              const user = loginResult.user;
              if (user?.role === 'admin') {
                navigate('/admin', { replace: true });
              } else if (user?.role === 'business') {
                navigate('/my-cards', { replace: true });
              } else {
                navigate('/cards', { replace: true });
              }
            }
          } catch (loginError) {
            // Si la connexion automatique échoue, rediriger vers login
            navigate('/login');
          }
        }
      } catch (error) {
        // Les erreurs sont gérées par AuthContext avec toast
      }
    }
  };

  const requiredFields = ['firstName', 'lastName', 'email', 'password', 'confirmPassword'];
  const formIsValid = isFormValid(errors, formData, requiredFields);

  return (
    <>
      <Helmet>
        <title>{'Inscription'}</title>
        <meta name="description" content={t('joinCardPro')} />
      </Helmet>

      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-green-50 dark:from-gray-900 dark:via-blue-900 dark:to-gray-800 flex items-center justify-center px-4 py-8">
        <motion.div 
          className="max-w-lg w-full space-y-8"
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
              <UserPlusIcon className="h-8 w-8 text-blue-500 mr-2" />
              <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-green-500 bg-clip-text text-transparent">
                {'Inscription'}
              </h1>
            </div>
            <p className="text-gray-600 dark:text-gray-300 text-lg">
              {t('joinCardPro')}
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

              {/* Prénom avec validation HackerU */}
              <TextInput 
                name="firstName"
                label={t('firstName')}
                value={formData.firstName}
                onChange={(e) => handleInputChange('firstName', e.target.value)}
                onBlur={() => {}}
                error={errors.firstName}
                touched={touchedFields.firstName}
                required
                placeholder={t('firstName')}
              />

              {/* Nom avec validation HackerU */}
              <TextInput 
                name="lastName"
                label={t('lastName')}
                value={formData.lastName}
                onChange={(e) => handleInputChange('lastName', e.target.value)}
                onBlur={() => {}}
                error={errors.lastName}
                touched={touchedFields.lastName}
                required
                placeholder={t('lastName')}
              />

              {/* Email avec validation HackerU */}
              <EmailInput 
                name="email"
                label={'Email'}
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                onBlur={() => {}}
                error={errors.email}
                touched={touchedFields.email}
                required
                placeholder="votre@email.com"
              />

              {/* Rôle avec validation HackerU */}
              <SelectInput
                name="role"
                label={t('accountType')}
                value={formData.role}
                onChange={(e) => handleInputChange('role', e.target.value)}
                onBlur={() => {}}
                error={errors.role}
                touched={touchedFields.role}
                required
                options={[
                  { value: 'user', label: t('userAccount') },
                  { value: 'business', label: t('businessAccount') }
                ]}
              />

              {/* Mot de passe avec validation HackerU */}
              <PasswordInput
                name="password"
                label={'Mot de passe'}
                value={formData.password}
                onChange={(e) => handleInputChange('password', e.target.value)}
                onBlur={() => {}}
                error={errors.password}
                touched={touchedFields.password}
                required
                placeholder={'Mot de passe'}
                showStrength
              />

              {/* Confirmation mot de passe avec validation HackerU */}
              <PasswordInput
                name="confirmPassword"
                label={'Confirmer le mot de passe'}
                value={formData.confirmPassword}
                onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                onBlur={() => {}}
                error={errors.confirmPassword}
                touched={touchedFields.confirmPassword}
                required
                placeholder={'Confirmer le mot de passe'}
                showStrength={false}
              />

              {/* Bouton d'inscription avec feedback visuel */}
              <SubmitButton 
                isValid={formIsValid} 
                isLoading={loading}
              >
                <div className="flex items-center justify-center">
                  {!loading && <UserPlusIcon className="w-5 h-5 mr-2" />}
                  {loading ? t('registering') : 'Inscription'}
                </div>
              </SubmitButton>
            </FormContainer>

            {/* Lien vers connexion */}
            <motion.div 
              className="mt-6 text-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8, duration: 0.3 }}
            >
              <p className="text-gray-600 dark:text-gray-400">
                {t('alreadyHaveAccount')}{' '}
                <Link 
                  to="/login" 
                  className="text-blue-600 hover:text-blue-700 font-semibold transition-colors"
                >
                  {'Connexion'}
                </Link>
              </p>
            </motion.div>
          </motion.div>

          {/* Section informative sur les types de comptes */}
          <motion.div 
            className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-lg rounded-2xl p-6 shadow-xl border border-white/20 dark:border-gray-700/30"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.5 }}
          >
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4 text-center flex items-center justify-center">
              <SparklesIcon className="w-5 h-5 mr-2 text-green-500" />
              {t('accountTypes')}
            </h3>
            <div className="space-y-3 text-sm">
              <div className="flex items-start">
                <div className="w-3 h-3 bg-blue-500 rounded-full mt-1.5 mr-3 flex-shrink-0"></div>
                <div>
                  <span className="font-medium text-gray-900 dark:text-gray-100">{t('userAccount')} :</span>
                  <span className="text-gray-600 dark:text-gray-400 ml-1">
                    {t('userAccountDescription')}
                  </span>
                </div>
              </div>
              <div className="flex items-start">
                <div className="w-3 h-3 bg-green-500 rounded-full mt-1.5 mr-3 flex-shrink-0"></div>
                <div>
                  <span className="font-medium text-gray-900 dark:text-gray-100">{t('businessAccount')} :</span>
                  <span className="text-gray-600 dark:text-gray-400 ml-1">
                    {t('businessAccountDescription')}
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </>
  );
};

export default RegisterPage;
