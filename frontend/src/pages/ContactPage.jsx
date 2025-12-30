import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { useTranslation } from "../hooks/useTranslation";
import { useRoleTheme } from '../context/ThemeProvider';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import {
  EnvelopeIcon,
  PhoneIcon,
  MapPinIcon,
  ClockIcon,
  ChatBubbleLeftRightIcon,
  CalendarDaysIcon,
  PaperAirplaneIcon
} from '@heroicons/react/24/outline';

const ContactPage = () => {
  const { t } = useTranslation();
  const { currentTheme } = useRoleTheme();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const schema = yup.object({
    name: yup.string().required(t('contact.form.validation.nameRequired')),
    email: yup.string().email(t('contact.form.validation.emailInvalid')).required(t('contact.form.validation.emailRequired')),
    subject: yup.string().required(t('contact.form.validation.subjectRequired')),
    message: yup.string().min(10, t('contact.form.validation.messageMin')).required(t('contact.form.validation.messageRequired')),
    company: yup.string(),
    phone: yup.string()
  });

  const { register, handleSubmit, formState: { errors }, reset } = useForm({
    resolver: yupResolver(schema)
  });

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      // Form submitted successfully
      setSubmitSuccess(true);
      reset();
      setTimeout(() => setSubmitSuccess(false), 5000);
    } catch (error) {
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactInfo = [
    {
      icon: EnvelopeIcon,
      title: t('contact.info.email.title'),
      value: 'contact@futuristcards.com',
      link: 'mailto:contact@futuristcards.com'
    },
    {
      icon: PhoneIcon,
      title: t('contact.info.phone.title'),
      value: '+33 1 23 45 67 89',
      link: 'tel:+33123456789'
    },
    {
      icon: MapPinIcon,
      title: t('contact.info.address.title'),
      value: t('contact.info.address.value'),
      link: null
    },
    {
      icon: ClockIcon,
      title: t('contact.info.hours.title'),
      value: t('contact.info.hours.value'),
      link: null
    }
  ];

  const quickActions = [
    {
      icon: ChatBubbleLeftRightIcon,
      title: t('contact.quickActions.whatsapp.title'),
      description: t('contact.quickActions.whatsapp.description'),
      action: () => window.open('https://wa.me/33123456789', '_blank'),
      color: 'from-green-500 to-green-600'
    },
    {
      icon: CalendarDaysIcon,
      title: t('contact.quickActions.calendly.title'),
      description: t('contact.quickActions.calendly.description'),
      action: () => window.open('https://calendly.com/futuristcards', '_blank'),
      color: 'from-blue-500 to-blue-600'
    },
    {
      icon: EnvelopeIcon,
      title: t('contact.quickActions.email.title'),
      description: t('contact.quickActions.email.description'),
      action: () => window.location.href = 'mailto:contact@futuristcards.com',
      color: 'from-purple-500 to-purple-600'
    }
  ];

  const isDark = currentTheme.name === 'dark';

  return (
    <>
      <Helmet>
        <title>{t('contact.hero.title')}{t('contact.hero.highlight')} - {t('common.siteName')}</title>
        <meta name="description" content={t('contact.hero.subtitle')} />
      </Helmet>
      
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:to-gray-800 py-12" dir="rtl">
      {/* Hero Section */}
      <section className={`relative py-16 px-4 sm:px-6 lg:px-8 ${isDark ? 'bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900' : 'bg-gradient-to-br from-blue-50 via-white to-purple-50'}`}>
        <div className="max-w-6xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className={`text-3xl md:text-5xl lg:text-6xl font-bold mb-6 ${isDark ? 'text-white' : 'text-gray-900'}`}>
              {t('contact.hero.title')}{' '}
              <span className="bg-gradient-to-r from-cyan-500 to-purple-500 bg-clip-text text-transparent">
                {t('contact.hero.highlight')}
              </span>
            </h1>
            <p className={`text-lg md:text-xl mb-8 max-w-2xl mx-auto leading-relaxed ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
              {t('contact.hero.subtitle')}
            </p>
          </motion.div>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className={`rounded-2xl p-6 lg:p-8 shadow-xl backdrop-blur-sm border transition-all duration-300 ${isDark ? 'bg-gray-800/50 border-gray-700' : 'bg-white border-gray-200'}`}
          >
            <h2 className={`text-2xl font-bold mb-6 ${isDark ? 'text-white' : 'text-gray-900'}`}>
              {t('contact.form.title')}
            </h2>

            {submitSuccess && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-6 p-4 bg-green-500/10 border border-green-500/30 rounded-xl"
              >
                <p className="text-green-600 dark:text-green-400 font-medium text-center">
                  {t('contact.form.successMessage')}
                </p>
              </motion.div>
            )}

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                    {t('contact.form.fields.name')} *
                  </label>
                  <input
                    {...register('name')}
                    type="text"
                    className={`w-full px-4 py-3 rounded-xl border transition-all duration-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent ${isDark ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'}`}
                    placeholder={t('contact.form.placeholders.name')}
                  />
                  {errors.name && (
                    <p className="mt-2 text-sm text-red-500">{errors.name.message}</p>
                  )}
                </div>

                <div>
                  <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                    {t('contact.form.fields.email')} *
                  </label>
                  <input
                    {...register('email')}
                    type="email"
                    className={`w-full px-4 py-3 rounded-xl border transition-all duration-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent ${isDark ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'}`}
                    placeholder={t('contact.form.placeholders.email')}
                  />
                  {errors.email && (
                    <p className="mt-2 text-sm text-red-500">{errors.email.message}</p>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                    {t('contact.form.fields.company')}
                  </label>
                  <input
                    {...register('company')}
                    type="text"
                    className={`w-full px-4 py-3 rounded-xl border transition-all duration-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent ${isDark ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'}`}
                    placeholder={t('contact.form.placeholders.company')}
                  />
                </div>

                <div>
                  <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                    {t('contact.form.fields.phone')}
                  </label>
                  <input
                    {...register('phone')}
                    type="tel"
                    className={`w-full px-4 py-3 rounded-xl border transition-all duration-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent ${isDark ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'}`}
                    placeholder={t('contact.form.placeholders.phone')}
                  />
                </div>
              </div>

              <div>
                <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                  {t('contact.form.fields.subject')} *
                </label>
                <input
                  {...register('subject')}
                  type="text"
                  className={`w-full px-4 py-3 rounded-xl border transition-all duration-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent ${isDark ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'}`}
                  placeholder={t('contact.form.placeholders.subject')}
                />
                {errors.subject && (
                  <p className="mt-2 text-sm text-red-500">{errors.subject.message}</p>
                )}
              </div>

              <div>
                <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                  {t('contact.form.fields.message')} *
                </label>
                <textarea
                  {...register('message')}
                  rows={5}
                  className={`w-full px-4 py-3 rounded-xl border transition-all duration-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none ${isDark ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'}`}
                  placeholder={t('contact.form.placeholders.message')}
                />
                {errors.message && (
                  <p className="mt-2 text-sm text-red-500">{errors.message.message}</p>
                )}
              </div>

              <motion.button
                type="submit"
                disabled={isSubmitting}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <div className="flex items-center justify-center">
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                    {t('contact.form.sending')}
                  </div>
                ) : (
                  <div className="flex items-center justify-center">
                    <PaperAirplaneIcon className="w-5 h-5 mr-2" />
                    {t('contact.form.submit')}
                  </div>
                )}
              </motion.button>
            </form>
          </motion.div>

          {/* Contact Info & Quick Actions */}
          <div className="space-y-6">
            {/* Contact Information */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className={`rounded-2xl p-6 lg:p-8 shadow-xl backdrop-blur-sm border transition-all duration-300 ${isDark ? 'bg-gray-800/50 border-gray-700' : 'bg-white border-gray-200'}`}
            >
              <h2 className={`text-2xl font-bold mb-6 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                {t('contact.info.title')}
              </h2>
              <div className="space-y-4">
                {contactInfo.map((info, index) => {
                  const IconComponent = info.icon;
                  return (
                    <div key={index} className="flex items-center p-4 rounded-xl transition-all duration-200 hover:bg-gray-50 dark:hover:bg-gray-700/50">
                      <div className="p-3 rounded-xl bg-gradient-to-r from-cyan-500 to-purple-500 mr-4 shadow-lg">
                        <IconComponent className="w-5 h-5 text-white" />
                      </div>
                      <div className="flex-1">
                        <p className={`text-sm font-medium mb-1 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>{info.title}</p>
                        {info.link ? (
                          <a
                            href={info.link}
                            className={`font-medium transition-colors hover:text-blue-500 ${isDark ? 'text-white' : 'text-gray-900'}`}
                          >
                            {info.value}
                          </a>
                        ) : (
                          <p className={`font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>{info.value}</p>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </motion.div>

            {/* Quick Actions */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className={`rounded-2xl p-6 lg:p-8 shadow-xl backdrop-blur-sm border transition-all duration-300 ${isDark ? 'bg-gray-800/50 border-gray-700' : 'bg-white border-gray-200'}`}
            >
              <h2 className={`text-2xl font-bold mb-6 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                {t('contact.quickActions.title')}
              </h2>
              <div className="space-y-3">
                {quickActions.map((action, index) => {
                  const IconComponent = action.icon;
                  return (
                    <motion.button
                      key={index}
                      onClick={action.action}
                      whileHover={{ scale: 1.02, y: -2 }}
                      whileTap={{ scale: 0.98 }}
                      className={`w-full p-4 rounded-xl border transition-all duration-300 text-left shadow-md hover:shadow-lg ${isDark ? 'bg-gray-700/50 border-gray-600 hover:bg-gray-700' : 'bg-gray-50 border-gray-200 hover:bg-gray-100'}`}
                    >
                      <div className="flex items-center">
                        <div className={`p-3 rounded-xl bg-gradient-to-r ${action.color} mr-4 shadow-lg`}>
                          <IconComponent className="w-5 h-5 text-white" />
                        </div>
                        <div className="flex-1">
                          <p className={`font-semibold mb-1 ${isDark ? 'text-white' : 'text-gray-900'}`}>{action.title}</p>
                          <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>{action.description}</p>
                        </div>
                      </div>
                    </motion.button>
                  );
                })}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
    </>
  );
};

export default ContactPage;
