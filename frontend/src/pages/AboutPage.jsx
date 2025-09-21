import { motion } from 'framer-motion';
import { 
  SparklesIcon, 
  ShieldCheckIcon, 
  UserGroupIcon,
  CreditCardIcon,
  GlobeAltIcon,
  LightBulbIcon
} from '@heroicons/react/24/outline';
import { useLanguage } from '../context/LanguageContext';

const AboutPage = () => {
  const { t } = useLanguage();
  
  const features = [
    {
      icon: <CreditCardIcon className="w-8 h-8" />,
      title: t('digitalBusinessCardsFeature'),
      description: t('digitalBusinessCardsDesc')
    },
    {
      icon: <ShieldCheckIcon className="w-8 h-8" />,
      title: t('secureAuth'),
      description: t('secureAuthDesc')
    },
    {
      icon: <UserGroupIcon className="w-8 h-8" />,
      title: t('multipleUserRoles'),
      description: t('multipleUserRolesDesc')
    },
    {
      icon: <SparklesIcon className="w-8 h-8" />,
      title: t('modernDesign'),
      description: t('modernDesignDesc')
    },
    {
      icon: <GlobeAltIcon className="w-8 h-8" />,
      title: t('globalReach'),
      description: t('globalReachDesc')
    },
    {
      icon: <LightBulbIcon className="w-8 h-8" />,
      title: t('smartFeatures'),
      description: t('smartFeaturesDesc')
    }
  ];

  return (
    <div className="min-h-screen py-12 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl font-bold text-gray-900 dark:text-white mb-6">
            {t('aboutFuturistCards')}
          </h1>
          <p className="text-xl text-gray-700 dark:text-gray-200 max-w-3xl mx-auto">
            {t('aboutDescription')}
          </p>
        </motion.div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white/10 dark:bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-gray-300 dark:border-white/20 hover:bg-gray-200 dark:hover:bg-white/20 transition-all duration-300"
            >
              <div className="text-cyan-400 mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                {feature.title}
              </h3>
              <p className="text-gray-700 dark:text-gray-200">{feature.description}</p>
            </motion.div>
          ))}
        </div>

        {/* Mission Section */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="bg-gradient-to-r from-cyan-500/20 to-blue-500/20 backdrop-blur-lg rounded-3xl p-12 border border-gray-300 dark:border-white/20"
        >
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6 text-center">
            {t('ourMission')}
          </h2>
          <p className="text-lg text-gray-700 dark:text-gray-200 text-center max-w-4xl mx-auto mb-8">
            {t('missionDescription')}
          </p>
          <p className="text-lg text-gray-700 dark:text-gray-200 text-center max-w-4xl mx-auto mb-8">
            Nous nous engageons à créer l&apos;avenir du networking
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
            <div className="text-center">
              <div className="text-4xl font-bold text-cyan-400 mb-2">1000+</div>
              <div className="text-gray-700 dark:text-gray-200">{t('activeUsers')}</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-cyan-400 mb-2">5000+</div>
              <div className="text-gray-700 dark:text-gray-200">{t('digitalCardsCreated')}</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-cyan-400 mb-2">99%</div>
              <div className="text-gray-700 dark:text-gray-200">{t('satisfactionRate')}</div>
            </div>
          </div>
        </motion.div>

        {/* Technology Stack */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="mt-16 text-center"
        >
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
            {t('builtWithModernTech')}
          </h2>
          <div className="flex flex-wrap justify-center gap-4">
            {['React 18', 'Node.js', 'MongoDB', 'Express', 'JWT', 'Tailwind CSS', 'Vite', 'Framer Motion'].map((tech) => (
              <span
                key={tech}
                className="px-4 py-2 bg-white/10 backdrop-blur-lg rounded-full text-cyan-400 border border-cyan-400/30"
              >
                {tech}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default AboutPage;
