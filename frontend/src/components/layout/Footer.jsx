import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from "../../hooks/useTranslation";
import { useRoleTheme } from '../../context/ThemeProvider';
import { motion } from 'framer-motion';
import { 
  SparklesIcon,
  HeartIcon,
  GlobeAltIcon,
  EnvelopeIcon,
  PhoneIcon
} from '@heroicons/react/24/outline';
import GlassCard from '../ui/GlassCard';

const Footer = () => {
  const { t } = useTranslation();
  const { currentTheme } = useRoleTheme();

  const footerLinks = [
    { to: '/', label: t('navigation.home'), testId: 'footer-home' },
    { to: '/cards', label: t('navigation.cards'), testId: 'footer-cards' },
    { to: '/about', label: t('navigation.about'), testId: 'footer-about' },
    { to: '/services', label: t('footer.services'), testId: 'footer-services' },
    { to: '/contact', label: t('footer.contact'), testId: 'footer-contact' },
    { to: '/privacy', label: t('footer.privacy'), testId: 'footer-privacy' }
  ];

  const socialLinks = [
    { 
      href: 'https://wa.me/1234567890', 
      label: t('footer.social.whatsapp'), 
      icon: 'M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.787',
      color: '#25D366'
    },
    { 
      href: 'https://linkedin.com/company/futuristcards', 
      label: t('footer.social.linkedin'), 
      icon: 'M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z',
      color: '#0077B5'
    },
    { 
      href: 'https://github.com/futuristcards', 
      label: t('footer.social.github'), 
      icon: 'M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z',
      color: '#333'
    },
    { 
      href: 'mailto:contact@futuristcards.com', 
      label: t('footer.social.email'), 
      icon: 'M24 5.457v13.909c0 .904-.732 1.636-1.636 1.636h-3.819V11.73L12 16.64l-6.545-4.91v9.273H1.636A1.636 1.636 0 0 1 0 19.366V5.457c0-.904.732-1.636 1.636-1.636h3.819l6.545 4.91 6.545-4.91h3.819A1.636 1.636 0 0 1 24 5.457z',
      color: '#EA4335'
    }
  ];

  const features = [
    {
      icon: SparklesIcon,
      title: t('footer.features.digital'),
      description: t('footer.features.digitalDesc')
    },
    {
      icon: HeartIcon,
      title: t('footer.features.favorites'),
      description: t('footer.features.favoritesDesc')
    },
    {
      icon: GlobeAltIcon,
      title: t('footer.features.global'),
      description: t('footer.features.globalDesc')
    }
  ];

  return (
    <footer className="relative bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white py-16" data-testid="footer">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-8 mb-12">
          {/* Brand Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-1"
          >
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center">
                <SparklesIcon className="w-5 h-5 text-white" />
              </div>
              <h3 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                {t('common.siteName')}
              </h3>
            </div>
            <p className="text-white/70 text-sm leading-relaxed mb-6">
              {t('footer.description')}
            </p>
            
            {/* Contact Info */}
            <div className="space-y-2">
              <div className="flex items-center space-x-2 text-white/60 text-sm">
                <EnvelopeIcon className="w-4 h-4" />
                <span>contact@futuristcards.com</span>
              </div>
              <div className="flex items-center space-x-2 text-white/60 text-sm">
                <PhoneIcon className="w-4 h-4" />
                <span>+1 (555) 123-4567</span>
              </div>
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="lg:col-span-1"
          >
            <h4 className="text-lg font-semibold mb-6 text-white">{t('footer.quickLinks')}</h4>
            <div className="space-y-3">
              {footerLinks.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  className="block text-white/70 hover:text-white transition-colors duration-200 text-sm hover:translate-x-1 transform"
                  data-testid={link.testId}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </motion.div>

          {/* Features */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-1"
          >
            <h4 className="text-lg font-semibold mb-6 text-white">{t('footer.features.title')}</h4>
            <div className="space-y-4">
              {features.map((feature, index) => (
                <div key={index} className="flex items-start space-x-3">
                  <div className="w-8 h-8 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
                    <feature.icon className="w-4 h-4 text-blue-400" />
                  </div>
                  <div>
                    <h5 className="text-white text-sm font-medium">{feature.title}</h5>
                    <p className="text-white/60 text-xs">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Social & Newsletter */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="lg:col-span-1"
          >
            <h4 className="text-lg font-semibold mb-6 text-white">{t('footer.connect')}</h4>
            
            {/* Social Links */}
            <div className="flex space-x-3 mb-6">
              {socialLinks.map((social) => (
                <motion.a
                  key={social.href}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-white/10 backdrop-blur-md border border-white/20 rounded-lg flex items-center justify-center hover:bg-white/20 transition-all duration-200"
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  aria-label={social.label}
                  data-testid={`footer-social-${social.label.toLowerCase()}`}
                >
                  <svg className="w-5 h-5" fill={social.color} viewBox="0 0 24 24">
                    <path d={social.icon} />
                  </svg>
                </motion.a>
              ))}
            </div>

            {/* Newsletter */}
            <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-blue-600/20 via-purple-600/20 to-pink-600/20 backdrop-blur-md border border-white/10 p-6">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10"></div>
              <div className="relative z-10">
                <div className="flex items-center mb-3">
                  <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center mr-3">
                    <EnvelopeIcon className="w-4 h-4 text-white" />
                  </div>
                  <h5 className="text-white font-semibold text-lg">{t('footer.newsletter')}</h5>
                </div>
                <p className="text-white/70 text-sm mb-4 leading-relaxed">
                  {t('footer.newsletterDesc')}
                </p>
                <div className="space-y-3">
                  <input
                    type="email"
                    placeholder={t('footer.emailPlaceholder')}
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-transparent backdrop-blur-sm transition-all duration-200"
                    data-testid="footer-newsletter-input"
                  />
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full px-6 py-3 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-xl text-white text-sm font-semibold shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center space-x-2"
                    data-testid="footer-newsletter-btn"
                  >
                    <span>{t('footer.newsletter')}</span>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                    </svg>
                  </motion.button>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Bottom Section */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="border-t border-white/20 pt-8"
        >
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0 gap-4">
            <div className="text-white/60 text-sm text-center md:text-left">
              © {new Date().getFullYear()} {t('common.siteName')}. {t('footer.allRightsReserved')}
            </div>
            
            <div className="flex items-center space-x-6 text-white/60 text-sm">
              <Link to="/privacy" className="hover:text-white transition-colors duration-200" data-testid="footer-privacy">
                {t('footer.privacy')}
              </Link>
              <Link to="/terms" className="hover:text-white transition-colors duration-200" data-testid="footer-terms">
                {t('footer.terms')}
              </Link>
              <Link to="/cookies" className="hover:text-white transition-colors duration-200" data-testid="footer-cookies">
                {t('footer.cookies')}
              </Link>
            </div>

            <div className="text-white/60 text-sm">
              {t('footer.madeWith')} <HeartIcon className="w-4 h-4 inline text-red-400" /> {t('footer.inFrance')}
            </div>
          </div>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;
