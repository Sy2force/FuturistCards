import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { useTranslation } from "../hooks/useTranslation";
import { useAuth } from '../context/AuthContext';
import { useRoleTheme } from '../context/ThemeProvider';
import { 
  CodeBracketIcon, 
  DevicePhoneMobileIcon, 
  GlobeAltIcon,
  ChartBarIcon,
  ShieldCheckIcon,
  RocketLaunchIcon,
  CogIcon,
  StarIcon,
  CheckCircleIcon,
  ArrowRightIcon,
  SwatchIcon,
  HeartIcon,
  EyeIcon,
  ClockIcon,
  CurrencyDollarIcon,
  UserGroupIcon,
  ChatBubbleLeftRightIcon,
  PhoneIcon,
  EnvelopeIcon
} from '@heroicons/react/24/outline';
import GlassCard from '../components/ui/GlassCard';
import GlassButton from '../components/ui/GlassButton';

const ServicesPage = () => {
  const { t, i18n } = useTranslation();
  const { language } = i18n;
  const { user } = useAuth();
  const { currentTheme } = useRoleTheme();
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [favorites, setFavorites] = useState([]);
  const [viewCounts, setViewCounts] = useState({});
  const [selectedService, setSelectedService] = useState(null);
  const [showContactModal, setShowContactModal] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // טעינת מועדפי משתמש וספירת צפיות
    const savedFavorites = JSON.parse(localStorage.getItem('serviceFavorites') || '[]');
    const savedViews = JSON.parse(localStorage.getItem('serviceViews') || '{}');
    setFavorites(savedFavorites);
    setViewCounts(savedViews);
  }, []);

  const toggleFavorite = (serviceId) => {
    const newFavorites = favorites.includes(serviceId)
      ? favorites.filter(id => id !== serviceId)
      : [...favorites, serviceId];
    setFavorites(newFavorites);
    localStorage.setItem('serviceFavorites', JSON.stringify(newFavorites));
  };

  const incrementView = (serviceId) => {
    const newViews = { ...viewCounts, [serviceId]: (viewCounts[serviceId] || 0) + 1 };
    setViewCounts(newViews);
    localStorage.setItem('serviceViews', JSON.stringify(newViews));
  };

  const handleServiceClick = (service) => {
    setSelectedService(service);
    setShowContactModal(true);
    incrementView(service.id);
  };

  const services = [
    {
      id: 1,
      category: 'development',
      icon: CodeBracketIcon,
      title: t('services.webDevelopment.title'),
      description: t('services.webDevelopment.description'),
      features: [t('services.webDevelopment.features.react'), t('services.webDevelopment.features.node'), t('services.webDevelopment.features.database'), t('services.webDevelopment.features.api')],
      price: t('services.webDevelopment.price'),
      duration: t('services.webDevelopment.duration'),
      rating: 4.9,
      reviews: 127,
      deliveryTime: t('services.webDevelopment.deliveryTime'),
      startingPrice: t('services.webDevelopment.startingPrice')
    },
    {
      id: 2,
      category: 'mobile',
      icon: DevicePhoneMobileIcon,
      title: t('services.mobileApp.title'),
      description: t('services.mobileApp.description'),
      features: [t('services.mobileApp.features.reactNative'), t('services.mobileApp.features.flutter'), t('services.mobileApp.features.platforms'), t('services.mobileApp.features.deploy')],
      price: t('services.mobileApp.price'),
      duration: t('services.mobileApp.duration'),
      rating: 4.8,
      reviews: 89,
      deliveryTime: t('services.mobileApp.deliveryTime'),
      startingPrice: t('services.mobileApp.startingPrice')
    },
    {
      id: 3,
      category: 'design',
      icon: SwatchIcon,
      title: t('services.uiuxDesign.title'),
      description: t('services.uiuxDesign.description'),
      features: [t('services.uiuxDesign.features.figma'), t('services.uiuxDesign.features.prototyping'), t('services.uiuxDesign.features.designSystem'), t('services.uiuxDesign.features.userTesting')],
      price: t('services.uiuxDesign.price'),
      duration: t('services.uiuxDesign.duration'),
      rating: 4.9,
      reviews: 156,
      deliveryTime: t('services.uiuxDesign.deliveryTime'),
      startingPrice: t('services.uiuxDesign.startingPrice')
    },
    {
      id: 4,
      category: 'ecommerce',
      icon: GlobeAltIcon,
      title: t('services.ecommerce.title'),
      description: t('services.ecommerce.description'),
      features: [t('services.ecommerce.features.shopify'), t('services.ecommerce.features.payment'), t('services.ecommerce.features.stock'), t('services.ecommerce.features.analytics')],
      price: t('services.ecommerce.price'),
      duration: t('services.ecommerce.duration'),
      rating: 4.7,
      reviews: 203,
      deliveryTime: t('services.ecommerce.deliveryTime'),
      startingPrice: t('services.ecommerce.startingPrice')
    },
    {
      id: 5,
      category: 'marketing',
      icon: ChartBarIcon,
      title: t('services.digitalMarketing.title'),
      description: t('services.digitalMarketing.description'),
      features: [t('services.digitalMarketing.features.seo'), t('services.digitalMarketing.features.social'), t('services.digitalMarketing.features.content'), t('services.digitalMarketing.features.analytics')],
      price: t('services.digitalMarketing.price'),
      duration: t('services.digitalMarketing.duration'),
      rating: 4.6,
      reviews: 91,
      deliveryTime: t('services.digitalMarketing.deliveryTime'),
      startingPrice: t('services.digitalMarketing.startingPrice')
    },
    {
      id: 6,
      category: 'security',
      icon: ShieldCheckIcon,
      title: t('services.cybersecurity.title'),
      description: t('services.cybersecurity.description'),
      features: [t('services.cybersecurity.features.audit'), t('services.cybersecurity.features.ssl'), t('services.cybersecurity.features.backup'), t('services.cybersecurity.features.monitoring')],
      price: t('services.cybersecurity.price'),
      duration: t('services.cybersecurity.duration'),
      rating: 4.8,
      reviews: 67,
      deliveryTime: t('services.cybersecurity.deliveryTime'),
      startingPrice: t('services.cybersecurity.startingPrice')
    }
  ];

  const categories = [
    { id: 'all', name: t('services.categories.all'), icon: CogIcon },
    { id: 'development', name: t('services.categories.development'), icon: CodeBracketIcon },
    { id: 'mobile', name: t('services.categories.mobile'), icon: DevicePhoneMobileIcon },
    { id: 'design', name: t('services.categories.design'), icon: SwatchIcon },
    { id: 'ecommerce', name: t('services.categories.ecommerce'), icon: GlobeAltIcon },
    { id: 'marketing', name: t('services.categories.marketing'), icon: ChartBarIcon },
    { id: 'security', name: t('services.categories.security'), icon: ShieldCheckIcon }
  ];

  const filteredServices = selectedCategory === 'all' 
    ? services 
    : services.filter(service => service.category === selectedCategory);

  const benefits = [
    {
      icon: CheckCircleIcon,
      title: t('services.benefits.quality.title'),
      description: t('services.benefits.quality.description')
    },
    {
      icon: RocketLaunchIcon,
      title: t('services.benefits.speed.title'),
      description: t('services.benefits.speed.description')
    },
    {
      icon: ShieldCheckIcon,
      title: t('services.benefits.support.title'),
      description: t('services.benefits.support.description')
    }
  ];

  // רכיב מודל יצירת קשר
  const ContactModal = () => (
    <AnimatePresence>
      {showContactModal && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={() => setShowContactModal(false)}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="bg-gradient-to-br from-slate-900 to-purple-900 rounded-2xl p-8 max-w-md w-full border border-white/20"
            onClick={(e) => e.stopPropagation()}
            dir={language === 'he' ? 'rtl' : 'ltr'}
          >
            <div className="text-center mb-6">
              {selectedService && (
                <>
                  <selectedService.icon className="h-12 w-12 mx-auto mb-4 text-blue-400" />
                  <h3 className="text-2xl font-bold text-white mb-2">{selectedService.title}</h3>
                  <p className="text-gray-300 mb-4">{selectedService.description}</p>
                  <div className={`flex justify-center items-center mb-6 ${language === 'he' ? 'space-x-reverse space-x-4' : 'space-x-4'}`}>
                    <div className="text-center">
                      <p className="text-2xl font-bold text-green-400">{selectedService.startingPrice}</p>
                      <p className="text-sm text-gray-400">{t('services.modal.startingPrice')}</p>
                    </div>
                    <div className="text-center">
                      <p className="text-lg font-semibold text-blue-400">{selectedService.deliveryTime}</p>
                      <p className="text-sm text-gray-400">{t('services.modal.deliveryTime')}</p>
                    </div>
                  </div>
                </>
              )}
            </div>
            
            <div className="space-y-4">
              <GlassButton
                className="w-full flex items-center justify-center"
                onClick={() => {
                  setShowContactModal(false);
                  window.location.href = `/contact?service=${selectedService?.id}`;
                }}
              >
                <ChatBubbleLeftRightIcon className="h-5 w-5 ml-2" />
                {t('services.modal.startProject')}
              </GlassButton>
              
              <div className="grid grid-cols-2 gap-4">
                <button 
                  onClick={() => window.open('tel:+972-50-123-4567', '_self')}
                  className={`flex items-center justify-center p-3 bg-white/10 rounded-lg hover:bg-white/20 transition-colors ${language === 'he' ? 'flex-row-reverse' : ''}`}
                >
                  <PhoneIcon className={`h-5 w-5 text-green-400 ${language === 'he' ? 'mr-2' : 'ml-2'}`} />
                  <span className="text-white">{t('services.modal.call')}</span>
                </button>
                <button 
                  onClick={() => window.open('mailto:services@futuristcards.com', '_self')}
                  className={`flex items-center justify-center p-3 bg-white/10 rounded-lg hover:bg-white/20 transition-colors ${language === 'he' ? 'flex-row-reverse' : ''}`}
                >
                  <EnvelopeIcon className={`h-5 w-5 text-blue-400 ${language === 'he' ? 'mr-2' : 'ml-2'}`} />
                  <span className="text-white">{t('services.modal.email')}</span>
                </button>
              </div>
            </div>
            
            <button
              onClick={() => setShowContactModal(false)}
              className={`absolute top-4 text-gray-400 hover:text-white transition-colors ${language === 'he' ? 'right-4' : 'left-4'}`}
            >
{t('services.closeModal')}
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );

  return (
    <>
      <Helmet>
        <title>{t('services.title')} - FuturistCards</title>
        <meta name="description" content={t('services.hero.subtitle')} />
      </Helmet>
      
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900" dir={language === 'he' ? 'rtl' : 'ltr'}>
      <ContactModal />
      
      {/* Hero Section */}
      <div className="relative min-h-[60vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900"></div>
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiM5QzkyQUMiIGZpbGwtb3BhY2l0eT0iMC4xIj48Y2lyY2xlIGN4PSIzMCIgY3k9IjMwIiByPSI0Ii8+PC9nPjwvZz48L3N2Zz4=')] opacity-20"></div>
        
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            {/* מחוון סטטוס משתמש */}
            {user && (
              <div className="flex justify-center mb-4">
                <div className="flex items-center space-x-2 px-4 py-2 rounded-full bg-green-500/20 border border-green-500/30">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                  <span className="text-sm text-green-400 font-medium">
                    {t('home.status.connectedAs')}{user.role === 'admin' ? t('roles.admin') : user.role === 'business' ? t('roles.business') : t('roles.user')}
                  </span>
                </div>
              </div>
            )}
            
            <span 
              className="inline-block px-4 py-2 rounded-full text-sm font-semibold mb-6"
              style={{
                backgroundColor: currentTheme.colors.primary + '20',
                color: currentTheme.colors.primary
              }}
            >
{t('services.sparkle')} {t('services.badge')}
            </span>
            
            <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight text-white">
              <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                {user ? `${t('services.personalizedTitle')} ${user.name}` : t('services.title')}
              </span>
            </h1>
            
            <p className="text-xl mb-8 max-w-3xl mx-auto leading-relaxed text-gray-300">
              {user ? 
                t('services.loggedInSubtitle') : 
                t('services.subtitle')
              }
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <GlassButton
                  size="lg"
                  onClick={() => setShowContactModal(true)}
                  data-testid="get-quote-button"
                  className={`px-8 py-4 text-lg font-semibold ${language === 'he' ? 'flex-row-reverse' : ''}`}
                >
                  <RocketLaunchIcon className={`w-6 h-6 ${language === 'he' ? 'mr-3' : 'ml-3'}`} />
                  {t('services.cta.getQuote')}
                </GlassButton>
              </motion.div>
              
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <GlassButton
                  variant="secondary"
                  size="lg"
                  as={Link}
                  to="/cards"
                  data-testid="view-portfolio-button"
                  className={`px-8 py-4 text-lg font-semibold ${language === 'he' ? 'flex-row-reverse' : ''}`}
                >
                  <GlobeAltIcon className={`w-6 h-6 ${language === 'he' ? 'ml-3' : 'mr-3'}`} />
                  {t('services.cta.viewPortfolio')}
                </GlassButton>
              </motion.div>
            </div>
            
            {/* תצוגת יתרונות */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 xl:gap-10 max-w-6xl mx-auto"
            >
              {benefits.map((benefit, index) => (
                <motion.div
                  key={benefit.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 * index }}
                  className="text-center p-6 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10"
                >
                  <div 
                    className="w-12 h-12 mx-auto mb-4 rounded-full flex items-center justify-center"
                    style={{ backgroundColor: currentTheme.colors.primary + '20' }}
                  >
                    <benefit.icon 
                      className="w-6 h-6" 
                      style={{ color: currentTheme.colors.primary }}
                    />
                  </div>
                  <h3 className="text-lg font-semibold mb-2 text-white">
                    {benefit.title}
                  </h3>
                  <p className="text-sm text-gray-300">
                    {benefit.description}
                  </p>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Services Categories Filter */}
      <section className="py-12 w-full">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4 text-white">
              {t('services.categories.title')}
            </h2>
            <p className="text-lg mb-8 text-gray-300">
              {t('services.categories.subtitle')}
            </p>
          </div>
          
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {categories.map((category) => {
              const IconComponent = category.icon;
              const isActive = selectedCategory === category.id;
              return (
                <motion.button
                  key={category.id}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`px-6 py-3 rounded-full transition-all duration-300 ${
                    isActive 
                      ? 'bg-blue-500 text-white border-blue-500' 
                      : 'bg-white/10 text-white border-white/20 hover:bg-white/20'
                  } border-2`}
                  data-testid={`category-${category.id}`}
                >
                  <IconComponent className="w-5 h-5 mr-2 inline" />
                  {category.name}
                </motion.button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-12 w-full">
        <div className="container mx-auto px-4">
          <motion.div 
            layout
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {filteredServices.map((service, index) => {
              const IconComponent = service.icon;
              const isFavorite = favorites.includes(service.id);
              const views = viewCounts[service.id] || 0;
              
              return (
                <motion.div
                  key={service.id}
                  layout
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ y: -10, scale: 1.02 }}
                >
                  <GlassCard className="p-6 h-full hover:shadow-2xl transition-all duration-300 relative overflow-hidden">
                    {/* Favorite Button */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleFavorite(service.id);
                      }}
                      className="absolute top-4 left-4 z-10 p-2 rounded-full bg-black/20 hover:bg-black/40 transition-colors"
                    >
                      <HeartIcon 
                        className={`w-5 h-5 ${isFavorite ? 'text-red-500 fill-current' : 'text-white'}`}
                      />
                    </button>
                    
                    {/* View Count */}
                    <div className="absolute top-4 right-4 flex items-center space-x-1 bg-black/20 rounded-full px-2 py-1">
                      <EyeIcon className="w-4 h-4 text-gray-300" />
                      <span className="text-xs text-gray-300">{views}</span>
                    </div>
                    
                    <div className="flex items-start mb-4 mt-8">
                      <div className="p-3 rounded-lg bg-gradient-to-r from-cyan-500 to-purple-500 ml-4 shadow-lg">
                        <IconComponent className="w-6 h-6 text-white" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-xl font-bold text-white mb-2">
                          {service.title}
                        </h3>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center">
                            {[...Array(5)].map((_, i) => (
                              <StarIcon 
                                key={i} 
                                className={`w-4 h-4 ${i < Math.floor(service.rating) ? 'text-yellow-400 fill-current' : 'text-gray-400'}`} 
                              />
                            ))}
                            <span className="mr-2 text-sm text-gray-300">{service.rating}</span>
                            <span className="text-xs text-gray-400">({service.reviews} {t('services.card.reviews')})</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <p className="mb-6 text-gray-300 text-sm leading-relaxed">
                      {service.description}
                    </p>
                    
                    {/* מידע מחיר ומשלוח */}
                    <div className="flex justify-between items-center mb-4 p-3 bg-white/5 rounded-lg">
                      <div className="text-center">
                        <p className="text-lg font-bold text-green-400">{service.startingPrice}</p>
                        <p className="text-xs text-gray-400">{t('services.card.startingPrice')}</p>
                      </div>
                      <div className="text-center">
                        <p className="text-sm font-semibold text-blue-400">{service.deliveryTime}</p>
                        <p className="text-xs text-gray-400">{t('services.card.deliveryTime')}</p>
                      </div>
                    </div>
                  
                    <div className="mb-6">
                      <h4 className="text-sm font-semibold mb-3 text-blue-400">
                        {t('services.features')}:
                      </h4>
                      <ul className="space-y-2">
                        {service.features.slice(0, 3).map((feature, idx) => (
                          <li key={idx} className="text-sm flex items-center text-gray-300">
                            <CheckCircleIcon className="w-4 h-4 ml-2 text-green-400" />
                            {feature}
                          </li>
                        ))}
                        {service.features.length > 3 && (
                          <li className="text-xs text-gray-400">+{service.features.length - 3} {t('services.card.additionalFeatures')}</li>
                        )}
                      </ul>
                    </div>
                  
                    <div className="border-t border-white/10 pt-4 mt-auto">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center space-x-2">
                          <UserGroupIcon className="w-4 h-4 text-gray-400" />
                          <span className="text-xs text-gray-400">{service.reviews} {t('services.card.clients')}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <ClockIcon className="w-4 h-4 text-gray-400" />
                          <span className="text-xs text-gray-400">{service.duration}</span>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-2 mb-4">
                        <motion.button
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={() => handleServiceClick(service)}
                          className="py-2 px-4 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors text-sm font-medium"
                        >
                          {t('services.card.moreDetails')}
                        </motion.button>
                        
                        <motion.button
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={() => {
                            setSelectedService(service);
                            setShowContactModal(true);
                          }}
                          className="py-2 px-4 bg-green-500 hover:bg-green-600 text-white rounded-lg transition-colors text-sm font-medium"
                        >
                          {t('services.card.orderNow')}
                        </motion.button>
                      </div>
                      
                      {service.rating >= 4.8 && (
                        <div className="text-center">
                          <span className="text-xs px-3 py-1 rounded-full bg-yellow-500/20 text-yellow-400 border border-yellow-500/30">
{t('services.star')} {t('services.card.recommended')}
                          </span>
                        </div>
                      )}
                    </div>
                  </GlassCard>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="py-16 w-full">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { number: '500+', label: t('services.stats.projectsCompleted'), icon: CheckCircleIcon },
              { number: '98%', label: t('services.stats.customerSatisfaction'), icon: StarIcon },
              { number: '24/7', label: t('services.stats.technicalSupport'), icon: ShieldCheckIcon },
              { number: '50+', label: t('services.stats.happyClients'), icon: UserGroupIcon }
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <stat.icon className="w-8 h-8 mx-auto mb-3 text-blue-400" />
                <h3 className="text-3xl font-bold text-white mb-2">{stat.number}</h3>
                <p className="text-gray-300">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 w-full">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="relative overflow-hidden rounded-3xl"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600"></div>
            <div className="absolute inset-0 bg-black/20"></div>
            <div className="relative p-8 md:p-12 text-white">
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
              >
                <h2 className="text-3xl md:text-4xl font-bold mb-6">
                  {t('services.cta.title')}
                </h2>
                <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
                  {t('services.cta.subtitle')}
                </p>
                
                <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Link
                      to="/contact"
                      className="inline-flex items-center bg-white text-blue-600 px-8 py-4 rounded-xl hover:bg-gray-100 transition-all duration-300 font-semibold text-lg shadow-lg"
                      data-testid="start-project-cta"
                    >
                      <RocketLaunchIcon className="w-6 h-6 mr-2" />
                      {t('services.cta.startProject')}
                    </Link>
                  </motion.div>
                  
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Link
                      to="/contact"
                      className="inline-flex items-center border-2 border-white text-white px-8 py-4 rounded-xl hover:bg-white hover:text-blue-600 transition-all duration-300 font-semibold text-lg"
                      data-testid="schedule-call-cta"
                    >
                      <CheckCircleIcon className="w-6 h-6 mr-2" />
                      {t('services.cta.scheduleCall')}
                    </Link>
                  </motion.div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm opacity-80">
                  <div className="flex items-center justify-center gap-2">
                    <CheckCircleIcon className="w-4 h-4" />
                    <span>{t('services.cta.fullWarranty')}</span>
                  </div>
                  <div className="flex items-center justify-center gap-2">
                    <ShieldCheckIcon className="w-4 h-4" />
                    <span>{t('services.cta.support247')}</span>
                  </div>
                  <div className="flex items-center justify-center gap-2">
                    <StarIcon className="w-4 h-4" fill="currentColor" />
                    <span>{t('services.cta.fiveStarRating')}</span>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
    </>
  );
};

export default ServicesPage;
