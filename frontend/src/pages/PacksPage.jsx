import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { useRoleTheme } from '../context/ThemeProvider';
import {
  CheckIcon,
  XMarkIcon,
  StarIcon,
  RocketLaunchIcon,
  ShieldCheckIcon,
  CogIcon
} from '@heroicons/react/24/outline';

const PacksPage = () => {
  const { currentTheme } = useRoleTheme();
  const [billingCycle, setBillingCycle] = useState('monthly');

  const packs = [
    {
      id: 'basic',
      name: 'Basic Plan',
      description: 'Perfect for individuals getting started',
      icon: CogIcon,
      color: 'from-gray-500 to-gray-600',
      popular: false,
      prices: {
        monthly: 99,
        yearly: 990
      },
      features: [
        { name: 'Business Cards', included: true, limit: '5' },
        { name: 'Cloud Storage', included: true, limit: '1 GB' },
        { name: 'Basic Analytics', included: true },
        { name: 'Email Support', included: true, limit: 'Standard' },
        { name: 'Custom Domain', included: false },
        { name: 'API Access', included: false },
        { name: 'White Label', included: false },
        { name: 'Priority Support', included: false }
      ]
    },
    {
      id: 'pro',
      name: 'Professional Plan',
      description: 'Ideal for businesses and professionals',
      icon: StarIcon,
      color: 'from-cyan-500 to-purple-500',
      popular: true,
      prices: {
        monthly: 249,
        yearly: 2490
      },
      features: [
        { name: 'Business Cards', included: true, limit: '50' },
        { name: 'Cloud Storage', included: true, limit: '10 GB' },
        { name: 'Advanced Analytics', included: true },
        { name: 'Priority Support', included: true, limit: 'Chat & Email' },
        { name: 'Custom Domain', included: true },
        { name: 'API Access', included: true },
        { name: 'White Label', included: false },
        { name: 'Priority Support', included: true }
      ]
    },
    {
      id: 'enterprise',
      name: 'Enterprise Plan',
      description: 'Complete solution for large organizations',
      icon: RocketLaunchIcon,
      color: 'from-purple-500 to-pink-500',
      popular: false,
      prices: {
        monthly: 599,
        yearly: 5990
      },
      features: [
        { name: 'Business Cards', included: true, limit: 'Unlimited' },
        { name: 'Cloud Storage', included: true, limit: '100 GB' },
        { name: 'Enterprise Analytics', included: true },
        { name: 'Dedicated Support', included: true, limit: 'Phone & Chat' },
        { name: 'Custom Domain', included: true },
        { name: 'Full API Access', included: true },
        { name: 'White Label', included: true },
        { name: 'Priority Support', included: true }
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
        <title>Pricing Plans | FuturistCards</title>
        <meta name="description" content="Choose the perfect plan for your digital business card needs. From individual to enterprise solutions." />
      </Helmet>
    <div 
      className="min-h-screen pt-20" 
      style={{ backgroundColor: currentTheme.colors.background }}
    >
      {/* Hero Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 
              className="text-4xl md:text-6xl font-bold mb-6"
              style={{ color: currentTheme.colors.text.primary }}
            >
              Choose Your Perfect{' '}
              <span className="text-gradient bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
                Plan
              </span>
            </h1>
            <p 
              className="text-xl mb-8 max-w-3xl mx-auto"
              style={{ color: currentTheme.colors.text.secondary }}
            >
              Select the ideal plan for your digital business card needs. From personal use to enterprise solutions.
            </p>

            {/* Billing Toggle */}
            <div className="flex items-center justify-center mb-12">
              <span 
                className="mr-3"
                style={{ 
                  color: billingCycle === 'monthly' 
                    ? currentTheme.colors.text.primary 
                    : currentTheme.colors.text.secondary 
                }}
              >
                Monthly
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
              <span 
                className="ml-3"
                style={{ 
                  color: billingCycle === 'yearly' 
                    ? currentTheme.colors.text.primary 
                    : currentTheme.colors.text.secondary 
                }}
              >
                Yearly
                <span className="ml-1 text-green-400 text-sm font-medium">
                  (Save 20%)
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
                        Most Popular
                      </div>
                    </div>
                  )}

                  <div className="text-center mb-8">
                    <div className={`inline-flex p-3 rounded-lg bg-gradient-to-r ${pack.color} mb-4`}>
                      <IconComponent className="w-8 h-8 text-white" />
                    </div>
                    <h3 
                      className="text-2xl font-bold mb-2"
                      style={{ color: currentTheme.colors.text.primary }}
                    >
                      {pack.name}
                    </h3>
                    <p style={{ color: currentTheme.colors.text.secondary }}>
                      {pack.description}
                    </p>
                  </div>

                  <div className="text-center mb-8">
                    <div className="flex items-baseline justify-center">
                      <span 
                        className="text-4xl font-bold"
                        style={{ color: currentTheme.colors.text.primary }}
                      >
                        ${price.monthly}
                      </span>
                      <span 
                        className="ml-1"
                        style={{ color: currentTheme.colors.text.secondary }}
                      >
                        /month
                      </span>
                    </div>
                    {billingCycle === 'yearly' && (
                      <div className="mt-2">
                        <p 
                          className="text-sm"
                          style={{ color: currentTheme.colors.text.secondary }}
                        >
                          Billed yearly: ${price.total}
                        </p>
                        {savings > 0 && (
                          <p className="text-sm text-green-400 font-medium">
                            Save {savings}%
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
                        <span 
                          className="text-sm"
                          style={{ 
                            color: feature.included 
                              ? currentTheme.colors.text.primary 
                              : currentTheme.colors.text.secondary 
                          }}
                        >
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
                    onClick={() => handleSelectPack(pack.id)}
                  >
                    Choose Plan
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
            <h2 
              className="text-3xl md:text-4xl font-bold mb-4"
              style={{ color: currentTheme.colors.text.primary }}
            >
              Compare Features
            </h2>
            <p 
              className="text-xl"
              style={{ color: currentTheme.colors.text.secondary }}
            >
              Find the perfect plan that matches your business needs
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
                    <th 
                      className="text-left py-4 px-6 font-semibold"
                      style={{ color: currentTheme.colors.text.primary }}
                    >
                      Features
                    </th>
                    {packs.map((pack) => (
                      <th 
                        key={pack.id} 
                        className="text-center py-4 px-6 font-semibold"
                        style={{ color: currentTheme.colors.text.primary }}
                      >
                        {pack.name}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {packs[0].features.map((_, featureIndex) => (
                    <tr key={featureIndex} className="border-b border-gray-800">
                      <td 
                        className="py-4 px-6"
                        style={{ color: currentTheme.colors.text.secondary }}
                      >
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
              Choose Your Plan
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
                  <h3 
                    className="text-lg font-semibold mb-2"
                    style={{ color: currentTheme.colors.text.primary }}
                  >
                    {i === 1 && 'Can I change my plan anytime?'}
                    {i === 2 && 'Do you offer refunds?'}
                    {i === 3 && 'Is my data secure?'}
                    {i === 4 && 'Do you provide customer support?'}
                  </h3>
                  <p style={{ color: currentTheme.colors.text.secondary }}>
                    {i === 1 && 'Yes, you can upgrade or downgrade your plan at any time. Changes take effect immediately.'}
                    {i === 2 && 'We offer a 30-day money-back guarantee for all annual plans.'}
                    {i === 3 && 'Absolutely. We use enterprise-grade security and encryption to protect your data.'}
                    {i === 4 && 'Yes, we provide 24/7 support for all our customers with different tiers based on your plan.'}
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
            <h2 
              className="text-3xl md:text-4xl font-bold mb-6"
              style={{ color: currentTheme.colors.text.primary }}
            >
              Ready to Get Started?
            </h2>
            <p 
              className="text-xl mb-8"
              style={{ color: currentTheme.colors.text.secondary }}
            >
              Join thousands of professionals already using FuturistCards to grow their business.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="glass-button px-8 py-3 text-lg font-semibold"
              >
                Start Free Trial
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="glass-card px-8 py-3 text-lg font-semibold text-white border-2 border-cyan-400/30 hover:border-cyan-400/60"
              >
                Contact Sales
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
