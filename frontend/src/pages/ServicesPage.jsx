import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { useTranslation } from "../hooks/useTranslation";
import { useRoleTheme } from '../context/ThemeProvider';
import { 
  CodeBracketIcon, 
  DevicePhoneMobileIcon, 
  GlobeAltIcon,
  PaintBrushIcon,
  ChartBarIcon,
  ShieldCheckIcon,
  RocketLaunchIcon,
  CogIcon,
  StarIcon,
  CheckCircleIcon,
  ArrowRightIcon
} from '@heroicons/react/24/outline';
import GlassCard from '../components/ui/GlassCard';
import GlassButton from '../components/ui/GlassButton';

const ServicesPage = () => {
  const { t } = useTranslation();
  const { currentTheme } = useRoleTheme();
  const [selectedCategory, setSelectedCategory] = useState('all');

  const services = [
    {
      id: 1,
      category: 'development',
      icon: CodeBracketIcon,
      title: t('services.webDevelopment.title'),
      description: t('services.webDevelopment.description'),
      features: [t('services.webDevelopment.features.react'), t('services.webDevelopment.features.node'), t('services.webDevelopment.features.database'), t('services.webDevelopment.features.api')],
      price: t('services.webDevelopment.price'),
      duration: t('services.webDevelopment.duration')
    },
    {
      id: 2,
      category: 'mobile',
      icon: DevicePhoneMobileIcon,
      title: t('services.mobileApp.title'),
      description: t('services.mobileApp.description'),
      features: [t('services.mobileApp.features.reactNative'), t('services.mobileApp.features.flutter'), t('services.mobileApp.features.platforms'), t('services.mobileApp.features.deploy')],
      price: t('services.mobileApp.price'),
      duration: t('services.mobileApp.duration')
    },
    {
      id: 3,
      category: 'design',
      icon: PaintBrushIcon,
      title: t('services.uiuxDesign.title'),
      description: t('services.uiuxDesign.description'),
      features: [t('services.uiuxDesign.features.figma'), t('services.uiuxDesign.features.prototyping'), t('services.uiuxDesign.features.designSystem'), t('services.uiuxDesign.features.userTesting')],
      price: t('services.uiuxDesign.price'),
      duration: t('services.uiuxDesign.duration')
    },
    {
      id: 4,
      category: 'ecommerce',
      icon: GlobeAltIcon,
      title: t('services.ecommerce.title'),
      description: t('services.ecommerce.description'),
      features: [t('services.ecommerce.features.shopify'), t('services.ecommerce.features.payment'), t('services.ecommerce.features.stock'), t('services.ecommerce.features.analytics')],
      price: t('services.ecommerce.price'),
      duration: t('services.ecommerce.duration')
    },
    {
      id: 5,
      category: 'marketing',
      icon: ChartBarIcon,
      title: t('services.digitalMarketing.title'),
      description: t('services.digitalMarketing.description'),
      features: [t('services.digitalMarketing.features.seo'), t('services.digitalMarketing.features.social'), t('services.digitalMarketing.features.content'), t('services.digitalMarketing.features.analytics')],
      price: t('services.digitalMarketing.price'),
      duration: t('services.digitalMarketing.duration')
    },
    {
      id: 6,
      category: 'security',
      icon: ShieldCheckIcon,
      title: t('services.cybersecurity.title'),
      description: t('services.cybersecurity.description'),
      features: [t('services.cybersecurity.features.audit'), t('services.cybersecurity.features.ssl'), t('services.cybersecurity.features.backup'), t('services.cybersecurity.features.monitoring')],
      price: t('services.cybersecurity.price'),
      duration: t('services.cybersecurity.duration')
    }
  ];

  const categories = [
    { id: 'all', name: t('services.categories.all'), icon: CogIcon },
    { id: 'development', name: t('services.categories.development'), icon: CodeBracketIcon },
    { id: 'mobile', name: t('services.categories.mobile'), icon: DevicePhoneMobileIcon },
    { id: 'design', name: t('services.categories.design'), icon: PaintBrushIcon },
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

  return (
    <>
      <Helmet>
        <title>{t('services.hero.title')}{t('services.hero.highlight')} - {t('common.siteName')}</title>
        <meta name="description" content={t('services.hero.subtitle')} />
      </Helmet>
      
    <div className="min-h-screen w-full" style={{ backgroundColor: currentTheme.colors.background }}>
      {/* Hero Section */}
      <section className="relative py-20 w-full">
        <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-12 2xl:px-16 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 1, delay: 0.2 }}
              className="mb-6"
            >
              <span className="inline-block px-4 py-2 rounded-full text-sm font-medium mb-4"
                    style={{ 
                      backgroundColor: currentTheme.colors.primary + '20',
                      color: currentTheme.colors.primary 
                    }}>
                <svg className="w-5 h-5 inline mr-2 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
                {t('services.badge')}
              </span>
            </motion.div>
            
            <h1 className="text-4xl md:text-6xl font-bold mb-6"
                style={{ color: currentTheme.colors.text.primary }}>
              {t('services.hero.title')}
              <span className="bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
                {t('services.hero.highlight')}
              </span>
            </h1>
            
            <p className="text-xl mb-8 max-w-3xl mx-auto"
               style={{ color: currentTheme.colors.text.secondary }}>
              {t('services.hero.subtitle')}
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <GlassButton
                  size="lg"
                  as={Link}
                  to="/contact"
                  data-testid="get-quote-button"
                  className="px-8 py-4 text-lg font-semibold"
                >
                  <RocketLaunchIcon className="w-6 h-6 mr-3" />
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
                  className="px-8 py-4 text-lg font-semibold"
                >
                  <GlobeAltIcon className="w-6 h-6 mr-3" />
                  {t('services.cta.viewPortfolio')}
                </GlassButton>
              </motion.div>
            </div>
            
            {/* Benefits Preview */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 xl:gap-10 max-w-6xl mx-auto"
            >
              {benefits.map((benefit, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 * index }}
                  className="text-center"
                >
                  <benefit.icon className="w-8 h-8 mx-auto mb-3" style={{ color: currentTheme.colors.primary }} />
                  <h3 className="font-semibold mb-2" style={{ color: currentTheme.colors.text.primary }}>
                    {benefit.title}
                  </h3>
                  <p className="text-sm" style={{ color: currentTheme.colors.text.secondary }}>
                    {benefit.description}
                  </p>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Services Categories Filter */}
      <section className="py-12 w-full">
        <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-12 2xl:px-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4" style={{ color: currentTheme.colors.text.primary }}>
              {t('services.categories.title')}
            </h2>
            <p className="text-lg mb-8" style={{ color: currentTheme.colors.text.secondary }}>
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
                  className="px-6 py-3 rounded-full transition-all duration-300"
                  style={{
                    backgroundColor: isActive ? currentTheme.colors.primary : currentTheme.colors.surface,
                    color: isActive ? '#ffffff' : currentTheme.colors.text.primary,
                    border: `2px solid ${isActive ? currentTheme.colors.primary : currentTheme.colors.border}`
                  }}
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
        <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-12 2xl:px-16">
          <motion.div 
            layout
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 lg:gap-8 xl:gap-10"
          >
            {filteredServices.map((service, index) => {
              const IconComponent = service.icon;
              return (
                <motion.div
                  key={service.id}
                  layout
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ y: -10, scale: 1.02 }}
                >
                  <GlassCard className="p-6 h-full hover:shadow-2xl transition-all duration-300">
                    <div className="flex items-center mb-4">
                      <div className="p-3 rounded-lg bg-gradient-to-r from-cyan-500 to-purple-500 mr-4 shadow-lg">
                        <IconComponent className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold" style={{ color: currentTheme.colors.text.primary }}>
                          {service.title}
                        </h3>
                        <div className="flex items-center mt-1">
                          {[...Array(5)].map((_, i) => (
                            <StarIcon key={i} className="w-4 h-4" style={{ color: currentTheme.colors.warning }} fill="currentColor" />
                          ))}
                          <span className="ml-2 text-sm" style={{ color: currentTheme.colors.text.secondary }}>{t('services.rating')}</span>
                        </div>
                      </div>
                    </div>
                    
                    <p className="mb-6" style={{ color: currentTheme.colors.text.secondary }}>
                      {service.description}
                    </p>
                  
                    <div className="mb-6">
                      <h4 className="text-sm font-semibold mb-3" style={{ color: currentTheme.colors.primary }}>
                        {t('services.features')}:
                      </h4>
                      <ul className="space-y-2">
                        {service.features.map((feature, idx) => (
                          <li key={idx} className="text-sm flex items-center" style={{ color: currentTheme.colors.text.secondary }}>
                            <CheckCircleIcon className="w-4 h-4 mr-2" style={{ color: currentTheme.colors.success }} />
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>
                  
                    <div className="border-t pt-4 mt-auto" style={{ borderColor: currentTheme.colors.border }}>
                      <div className="flex justify-between items-center mb-4">
                        <div>
                          <p className="text-lg font-bold" style={{ color: currentTheme.colors.text.primary }}>
                            {service.price}
                          </p>
                          <p className="text-sm" style={{ color: currentTheme.colors.text.secondary }}>
                            {service.duration}
                          </p>
                        </div>
                        <div className="text-right">
                          <div className="flex items-center">
                            <span className="text-xs px-2 py-1 rounded-full" 
                                  style={{ 
                                    backgroundColor: currentTheme.colors.success + '20',
                                    color: currentTheme.colors.success 
                                  }}>
                              {t('services.popular')}
                            </span>
                          </div>
                        </div>
                      </div>
                      
                      <motion.div
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <GlassButton
                          className="w-full py-3 text-center"
                          as={Link}
                          to="/contact"
                          data-testid={`service-${service.id}-cta`}
                        >
                          {t('services.cta.learnMore')}
                          <ArrowRightIcon className="w-4 h-4 ml-2 inline" />
                        </GlassButton>
                      </motion.div>
                    </div>
                  </GlassCard>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 w-full">
        <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-12 2xl:px-16 text-center">
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
                
                <div className="flex justify-center items-center gap-8 text-sm opacity-80">
                  <div className="flex items-center gap-2">
                    <CheckCircleIcon className="w-4 h-4" />
                    {t('services.cta.guarantee')}
                  </div>
                  <div className="flex items-center gap-2">
                    <ShieldCheckIcon className="w-4 h-4" />
                    {t('services.cta.support')}
                  </div>
                  <div className="flex items-center gap-2">
                    <StarIcon className="w-4 h-4" fill="currentColor" />
                    {t('services.cta.rated')}
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
