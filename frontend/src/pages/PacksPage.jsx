import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { useTranslation } from "../hooks/useTranslation";
import {
  CheckIcon,
  XMarkIcon,
  StarIcon,
  RocketLaunchIcon,
  ShieldCheckIcon,
  CogIcon
} from '@heroicons/react/24/outline';

const PacksPage = () => {
  const { t, language } = useTranslation();
  const [billingCycle, setBillingCycle] = useState('monthly');

  const packs = [
    {
      id: 'basic',
      name: t('packs.basic.name'),
      description: t('packs.basic.description'),
      icon: CogIcon,
      color: 'from-gray-500 to-gray-600',
      popular: false,
      prices: {
        monthly: 29,
        yearly: 290
      },
      features: [
        { name: t('packs.basic.features.cards'), included: true, limit: '5' },
        { name: t('packs.basic.features.storage'), included: true, limit: t('packs.storage.oneGB') },
        { name: t('packs.basic.features.analytics'), included: true },
        { name: t('packs.basic.features.support'), included: true, limit: t('packs.supportTypes.email') },
        { name: t('packs.basic.features.customDomain'), included: false },
        { name: t('packs.basic.features.api'), included: false },
        { name: t('packs.basic.features.whiteLabel'), included: false },
        { name: t('packs.basic.features.priority'), included: false }
      ]
    },
    {
      id: 'pro',
      name: t('packs.pro.name'),
      description: t('packs.pro.description'),
      icon: StarIcon,
      color: 'from-cyan-500 to-purple-500',
      popular: true,
      prices: {
        monthly: 79,
        yearly: 790
      },
      features: [
        { name: t('packs.pro.features.cards'), included: true, limit: '50' },
        { name: t('packs.pro.features.storage'), included: true, limit: t('packs.storage.tenGB') },
        { name: t('packs.pro.features.analytics'), included: true },
        { name: t('packs.pro.features.support'), included: true, limit: t('packs.supportTypes.chatEmail') },
        { name: t('packs.pro.features.customDomain'), included: true },
        { name: t('packs.pro.features.api'), included: true },
        { name: t('packs.pro.features.whiteLabel'), included: false },
        { name: t('packs.pro.features.priority'), included: true }
      ]
    },
    {
      id: 'enterprise',
      name: t('packs.enterprise.name'),
      description: t('packs.enterprise.description'),
      icon: RocketLaunchIcon,
      color: 'from-purple-500 to-pink-500',
      popular: false,
      prices: {
        monthly: 199,
        yearly: 1990
      },
      features: [
        { name: t('packs.enterprise.features.cards'), included: true, limit: t('packs.limits.unlimited') },
        { name: t('packs.enterprise.features.storage'), included: true, limit: t('packs.storage.hundredGB') },
        { name: t('packs.enterprise.features.analytics'), included: true },
        { name: t('packs.enterprise.features.support'), included: true, limit: t('packs.supportTypes.phoneSupport') },
        { name: t('packs.enterprise.features.customDomain'), included: true },
        { name: t('packs.enterprise.features.api'), included: true },
        { name: t('packs.enterprise.features.whiteLabel'), included: true },
        { name: t('packs.enterprise.features.priority'), included: true }
      ]
    }
  ];

  const handleSelectPack = (packId) => {
    // Handle pack selection logic here
    // In production, redirect to payment or registration
    window.location.href = `/register?pack=${packId}`;
  };

  const getPrice = (pack) => {
    const price = pack.prices[billingCycle];
    const monthlyPrice = billingCycle === 'yearly' ? Math.round(price / 12) : price;
    return { total: price, monthly: monthlyPrice };
  };

  const getSavings = (pack) => {
    if (billingCycle === 'monthly') return 0;
    const yearlyTotal = pack.prices.yearly;
    const monthlyTotal = pack.prices.monthly * 12;
    return Math.round(((monthlyTotal - yearlyTotal) / monthlyTotal) * 100);
  };

  return (
    <>
      <Helmet>
        <title>{t('packs.pageTitle')} - FuturistCards</title>
        <meta name="description" content={t('packs.pageDescription')} />
      </Helmet>
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 pt-20" dir={language === 'he' ? 'rtl' : 'ltr'}>
      {/* Hero Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              {t('packs.hero.title')}
              <span className="text-gradient bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
                {t('packs.hero.highlight')}
              </span>
            </h1>
            <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
              {t('packs.hero.subtitle')}
            </p>

            {/* Billing Toggle */}
            <div className="flex items-center justify-center mb-12">
              <span className={`mr-3 ${billingCycle === 'monthly' ? 'text-white' : 'text-gray-400'}`}>
                {t('packs.billing.monthly')}
              </span>
              <motion.button
                onClick={() => setBillingCycle(billingCycle === 'monthly' ? 'yearly' : 'monthly')}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  billingCycle === 'yearly' ? 'bg-gradient-to-r from-cyan-500 to-purple-500' : 'bg-gray-600'
                }`}
                whileTap={{ scale: 0.95 }}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    billingCycle === 'yearly' ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </motion.button>
              <span className={`ml-3 ${billingCycle === 'yearly' ? 'text-white' : 'text-gray-400'}`}>
                {t('packs.billing.yearly')}
                <span className="ml-1 text-green-400 text-sm font-medium">
                  ({t('packs.billing.save')} 20%)
                </span>
              </span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {packs.map((pack, index) => {
              const IconComponent = pack.icon;
              const price = getPrice(pack);
              const savings = getSavings(pack);

              return (
                <motion.div
                  key={pack.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className={`relative glass-card p-8 ${
                    pack.popular ? 'ring-2 ring-cyan-400/50 scale-105' : ''
                  }`}
                >
                  {pack.popular && (
                    <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                      <div className="bg-gradient-to-r from-cyan-500 to-purple-500 text-white px-4 py-1 rounded-full text-sm font-semibold">
                        {t('packs.popular')}
                      </div>
                    </div>
                  )}

                  <div className="text-center mb-8">
                    <div className={`inline-flex p-3 rounded-lg bg-gradient-to-r ${pack.color} mb-4`}>
                      <IconComponent className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-2">{pack.name}</h3>
                    <p className="text-gray-300">{pack.description}</p>
                  </div>

                  <div className="text-center mb-8">
                    <div className="flex items-baseline justify-center">
                      <span className="text-4xl font-bold text-white">{price.monthly * 4}₪</span>
                      <span className="text-gray-400 ml-1">{t('packs.perMonth')}</span>
                    </div>
                    {billingCycle === 'yearly' && (
                      <div className="mt-2">
                        <p className="text-sm text-gray-400">
                          {t('packs.billing.billedYearly')}: {price.total * 4}₪
                        </p>
                        {savings > 0 && (
                          <p className="text-sm text-green-400 font-medium">
                            {t('packs.billing.save')} {savings}%
                          </p>
                        )}
                      </div>
                    )}
                  </div>

                  <div className="space-y-4 mb-8">
                    {pack.features.map((feature, idx) => (
                      <div key={idx} className="flex items-center">
                        {feature.included ? (
                          <CheckIcon className="w-5 h-5 text-green-400 mr-3 flex-shrink-0" />
                        ) : (
                          <XMarkIcon className="w-5 h-5 text-gray-500 mr-3 flex-shrink-0" />
                        )}
                        <span className={`text-sm ${feature.included ? 'text-white' : 'text-gray-500'}`}>
                          {feature.name}
                          {feature.limit && feature.included && (
                            <span className="text-cyan-400 ml-1">({feature.limit})</span>
                          )}
                        </span>
                      </div>
                    ))}
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className={`w-full py-3 rounded-lg font-semibold transition-all duration-300 ${
                      pack.popular
                        ? 'bg-gradient-to-r from-cyan-500 to-purple-500 text-white hover:from-cyan-600 hover:to-purple-600'
                        : 'glass-button'
                    }`}
                  >
                    {t('packs.cta.choosePlan')}
                  </motion.button>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Features Comparison */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              {t('packs.comparison.title')}
            </h2>
            <p className="text-xl text-gray-300">
              {t('packs.comparison.subtitle')}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="glass-card overflow-hidden"
          >
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-700">
                    <th className="text-left py-4 px-6 text-white font-semibold">
                      {t('packs.comparison.features')}
                    </th>
                    {packs.map((pack) => (
                      <th key={pack.id} className="text-center py-4 px-6 text-white font-semibold">
                        {pack.name}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {packs[0].features.map((_, featureIndex) => (
                    <tr key={featureIndex} className="border-b border-gray-800">
                      <td className="py-4 px-6 text-gray-300">
                        {packs[0].features[featureIndex].name}
                      </td>
                      {packs.map((pack) => (
                        <td key={pack.id} className="text-center py-4 px-6">
                          {pack.features[featureIndex].included ? (
                            <div className="flex items-center justify-center">
                              <CheckIcon className="w-5 h-5 text-green-400" />
                              {pack.features[featureIndex].limit && (
                                <span className="ml-2 text-cyan-400 text-sm">
                                  {pack.features[featureIndex].limit}
                                </span>
                              )}
                            </div>
                          ) : (
                            <XMarkIcon className="w-5 h-5 text-gray-500 mx-auto" />
                          )}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              {t('packs.faq.title')}
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="glass-card p-8"
          >
            <div className="space-y-6">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="border-b border-gray-700 pb-6 last:border-b-0">
                  <h3 className="text-lg font-semibold text-white mb-2">
                    {t(`packs.faq.questions.q${i}.question`)}
                  </h3>
                  <p className="text-gray-300">
                    {t(`packs.faq.questions.q${i}.answer`)}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="glass-card p-8 md:p-12"
          >
            <ShieldCheckIcon className="w-16 h-16 text-cyan-400 mx-auto mb-6" />
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              {t('packs.cta.title')}
            </h2>
            <p className="text-xl text-gray-300 mb-8">
              {t('packs.cta.subtitle')}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="glass-button px-8 py-3 text-lg font-semibold"
              >
                {t('packs.cta.startTrial')}
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="glass-card px-8 py-3 text-lg font-semibold text-white border-2 border-cyan-400/30 hover:border-cyan-400/60"
              >
                {t('packs.cta.contactSales')}
              </motion.button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
    </>
  );
};

export default PacksPage;
