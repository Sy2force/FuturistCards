import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useRoleTheme } from '../context/ThemeProvider';
import { useTranslation } from 'react-i18next';
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
    name: yup.string().required('Name is required'),
    email: yup.string().email('Invalid email format').required('Email is required'),
    subject: yup.string().required('Subject is required'),
    message: yup.string().min(10, 'Message must be at least 10 characters').required('Message is required'),
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
      
      // Form data would be sent to backend in production
      
      // Form submitted successfully
      setSubmitSuccess(true);
      reset();
      setTimeout(() => setSubmitSuccess(false), 5000);
    } catch (error) {
      // Error handled silently in production
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactInfo = [
    {
      icon: EnvelopeIcon,
      title: 'Email',
      value: 'contact@futuristcards.com',
      link: 'mailto:contact@futuristcards.com'
    },
    {
      icon: PhoneIcon,
      title: 'Phone',
      value: '+972-50-123-4567',
      link: 'tel:+972501234567'
    },
    {
      icon: MapPinIcon,
      title: 'Address',
      value: 'Tel Aviv, Israel',
      link: null
    },
    {
      icon: ClockIcon,
      title: 'Business Hours',
      value: 'Sun-Thu: 9:00-18:00',
      link: null
    }
  ];

  const quickActions = [
    {
      icon: ChatBubbleLeftRightIcon,
      title: 'WhatsApp Chat',
      description: 'Get instant support via WhatsApp',
      action: () => window.open('https://wa.me/972501234567', '_blank'),
      color: 'from-green-500 to-green-600'
    },
    {
      icon: CalendarDaysIcon,
      title: 'Schedule Meeting',
      description: 'Book a consultation call',
      action: () => window.open('https://calendly.com/futuristcards', '_blank'),
      color: 'from-blue-500 to-blue-600'
    },
    {
      icon: EnvelopeIcon,
      title: 'Send Email',
      description: 'Reach us directly via email',
      action: () => window.location.href = 'mailto:contact@futuristcards.com',
      color: 'from-purple-500 to-purple-600'
    }
  ];

  return (
    <>
      <Helmet>
        <title>Contact Us - FuturistCards</title>
        <meta name="description" content="Get in touch with FuturistCards team for support, inquiries, and business partnerships" />
      </Helmet>
      
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 pt-20">
      {/* Hero Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8 mb-12">
        <div className="max-w-6xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-white">
              Get in Touch{' '}
              <span className="bg-gradient-to-r from-cyan-500 to-purple-500 bg-clip-text text-transparent block mt-2">
                With Our Team
              </span>
            </h1>
            <p className="text-xl md:text-2xl max-w-3xl mx-auto leading-relaxed text-gray-300">
              Ready to revolutionize your business cards? Let's discuss your project and bring your vision to life.
            </p>
          </motion.div>
        </div>
      </section>

      <div className="container mx-auto px-4 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="rounded-2xl p-6 lg:p-8 shadow-xl backdrop-blur-sm border transition-all duration-300 bg-black/20 border-white/20"
          >
            <h2 className="text-2xl font-bold mb-6 text-white">
              Send us a Message
            </h2>

            {submitSuccess && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-6 p-4 bg-green-500/10 border border-green-500/30 rounded-xl"
              >
                <p className="text-green-400 font-medium text-center">
                  Thank you! Your message has been sent successfully. We'll get back to you soon.
                </p>
              </motion.div>
            )}

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-300">
                    Full Name *
                  </label>
                  <input
                    {...register('name')}
                    type="text"
                    className="w-full px-4 py-3 rounded-xl border transition-all duration-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-black/20 border-white/20 text-white placeholder-gray-400"
                    placeholder="Enter your full name"
                  />
                  {errors.name && (
                    <p className="mt-2 text-sm text-red-500">{errors.name.message}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-300">
                    Email Address *
                  </label>
                  <input
                    {...register('email')}
                    type="email"
                    className="w-full px-4 py-3 rounded-xl border transition-all duration-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-black/20 border-white/20 text-white placeholder-gray-400"
                    placeholder="Enter your email address"
                  />
                  {errors.email && (
                    <p className="mt-2 text-sm text-red-500">{errors.email.message}</p>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-300">
                    Company (Optional)
                  </label>
                  <input
                    {...register('company')}
                    type="text"
                    className="w-full px-4 py-3 rounded-xl border transition-all duration-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-black/20 border-white/20 text-white placeholder-gray-400"
                    placeholder="Enter your company name"
                  />
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-300">
                    Phone (Optional)
                  </label>
                  <input
                    {...register('phone')}
                    type="tel"
                    className="w-full px-4 py-3 rounded-xl border transition-all duration-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-black/20 border-white/20 text-white placeholder-gray-400"
                    placeholder="Enter your phone number"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-300">
                  Subject *
                </label>
                <input
                  {...register('subject')}
                  type="text"
                  className="w-full px-4 py-3 rounded-xl border transition-all duration-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-black/20 border-white/20 text-white placeholder-gray-400"
                  placeholder="What can we help you with?"
                />
                {errors.subject && (
                  <p className="mt-2 text-sm text-red-500">{errors.subject.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-300">
                  Message *
                </label>
                <textarea
                  {...register('message')}
                  rows={6}
                  className="w-full px-4 py-3 rounded-xl border transition-all duration-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none bg-black/20 border-white/20 text-white placeholder-gray-400"
                  placeholder="Tell us about your project or inquiry..."
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
                    Sending...
                  </div>
                ) : (
                  <div className="flex items-center justify-center">
                    <PaperAirplaneIcon className="w-5 h-5 ml-2" />
                    Send Message
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
              className="rounded-2xl p-6 lg:p-8 shadow-xl backdrop-blur-sm border transition-all duration-300 bg-black/20 border-white/20"
            >
              <h2 className="text-2xl font-bold mb-6 text-white">
                Contact Information
              </h2>
              <div className="space-y-4">
                {contactInfo.map((info, index) => {
                  const IconComponent = info.icon;
                  return (
                    <div key={index} className="flex items-center p-4 rounded-xl transition-all duration-200 hover:bg-white/5">
                      <div className="p-3 rounded-xl bg-gradient-to-r from-cyan-500 to-purple-500 ml-4 shadow-lg">
                        <IconComponent className="w-5 h-5 text-white" />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium mb-1 text-gray-400">{info.title}</p>
                        {info.link ? (
                          <a
                            href={info.link}
                            className="font-medium transition-colors hover:text-blue-400 text-white"
                          >
                            {info.value}
                          </a>
                        ) : (
                          <p className="font-medium text-white">{info.value}</p>
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
              className="rounded-2xl p-6 lg:p-8 shadow-xl backdrop-blur-sm border transition-all duration-300 bg-black/20 border-white/20"
            >
              <h2 className="text-2xl font-bold mb-6 text-white">
                Quick Actions
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
                      className="w-full p-4 rounded-xl border transition-all duration-300 text-right shadow-md hover:shadow-lg bg-white/5 border-white/10 hover:bg-white/10"
                    >
                      <div className="flex items-center">
                        <div className={`p-3 rounded-xl bg-gradient-to-r ${action.color} ml-4 shadow-lg`}>
                          <IconComponent className="w-5 h-5 text-white" />
                        </div>
                        <div className="flex-1">
                          <p className="font-semibold mb-1 text-white">{action.title}</p>
                          <p className="text-sm text-gray-400">{action.description}</p>
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
