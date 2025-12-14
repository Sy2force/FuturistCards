import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { 
  SparklesIcon, 
  ShieldCheckIcon, 
  GlobeAltIcon,
  UserGroupIcon,
  HeartIcon,
  RocketLaunchIcon
} from '@heroicons/react/24/outline';

const About = () => {
  const fadeInUp = {
    initial: { opacity: 0, y: 60 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  };

  const staggerChildren = {
    animate: {
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const features = [
    {
      icon: SparklesIcon,
      title: "Design Moderne",
      description: "Interface élégante et responsive adaptée à tous les appareils"
    },
    {
      icon: ShieldCheckIcon,
      title: "Sécurité Avancée",
      description: "Authentification JWT et chiffrement des données personnelles"
    },
    {
      icon: GlobeAltIcon,
      title: "Partage Facile",
      description: "Partagez vos cartes via QR code, email ou réseaux sociaux"
    },
    {
      icon: UserGroupIcon,
      title: "Gestion des Rôles",
      description: "Système complet de gestion des permissions utilisateurs"
    },
    {
      icon: HeartIcon,
      title: "Favoris",
      description: "Sauvegardez vos cartes préférées pour un accès rapide"
    },
    {
      icon: RocketLaunchIcon,
      title: "Performance",
      description: "Application rapide et optimisée pour une expérience fluide"
    }
  ];

  const stats = [
    { number: "3", label: "Types de comptes", description: "User, Business, Admin" },
    { number: "100%", label: "Responsive", description: "Tous appareils" },
    { number: "JWT", label: "Sécurité", description: "Authentification robuste" },
    { number: "∞", label: "Cartes", description: "Création illimitée" }
  ];

  return (
    <>
      <Helmet>
        <title>À Propos - FuturistCards</title>
        <meta name="description" content="Découvrez FuturistCards, la plateforme moderne de création et partage de cartes de visite numériques. Sécurisée, responsive et intuitive." />
        <meta name="keywords" content="cartes visite numériques, digital business cards, networking, professionnel" />
      </Helmet>

      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
        {/* Hero Section */}
        <section className="relative py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: -30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6">
                À Propos de{' '}
                <span className="bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 bg-clip-text text-transparent">
                  FuturistCards
                </span>
              </h1>
              <p className="text-xl md:text-2xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
                La plateforme révolutionnaire pour créer, gérer et partager vos cartes de visite numériques 
                de manière moderne, sécurisée et professionnelle.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Mission Section */}
        <section className="py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <motion.div
              {...fadeInUp}
              className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 md:p-12 border border-white/20"
            >
              <div className="grid md:grid-cols-2 gap-12 items-center">
                <div>
                  <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                    Notre Mission
                  </h2>
                  <p className="text-gray-300 text-lg leading-relaxed mb-6">
                    Transformer la manière dont les professionnels se présentent et réseautent 
                    en offrant une solution digitale innovante, écologique et accessible à tous.
                  </p>
                  <p className="text-gray-300 text-lg leading-relaxed">
                    Fini les cartes papier perdues ! Avec FuturistCards, vos informations 
                    professionnelles sont toujours à jour, facilement partageables et respectueuses 
                    de l'environnement.
                  </p>
                </div>
                <div className="relative">
                  <div className="aspect-square bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-2xl flex items-center justify-center">
                    <SparklesIcon className="w-32 h-32 text-purple-400" />
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Features Grid */}
        <section className="py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Fonctionnalités Principales
              </h2>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                Découvrez tout ce que FuturistCards peut faire pour votre networking professionnel
              </p>
            </motion.div>

            <motion.div
              variants={staggerChildren}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
              className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {features.map((feature, index) => {
                const Icon = feature.icon;
                return (
                  <motion.div
                    key={index}
                    variants={fadeInUp}
                    className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20 hover:bg-white/15 transition-all duration-300"
                  >
                    <div className="flex items-center justify-center w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl mb-4">
                      <Icon className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-white mb-3">{feature.title}</h3>
                    <p className="text-gray-300 leading-relaxed">{feature.description}</p>
                  </motion.div>
                );
              })}
            </motion.div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <motion.div
              {...fadeInUp}
              className="bg-gradient-to-r from-purple-600/20 to-pink-600/20 backdrop-blur-lg rounded-3xl p-8 md:p-12 border border-white/20"
            >
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                  FuturistCards en Chiffres
                </h2>
              </div>
              
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
                {stats.map((stat, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.5 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="text-center"
                  >
                    <div className="text-4xl md:text-5xl font-bold bg-gradient-to-br from-purple-400 to-pink-400 bg-clip-text text-transparent mb-2">
                      {stat.number}
                    </div>
                    <div className="text-lg font-semibold text-white mb-1">{stat.label}</div>
                    <div className="text-gray-300 text-sm">{stat.description}</div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* Technology Stack */}
        <section className="py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <motion.div
              {...fadeInUp}
              className="text-center mb-12"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Technologies Utilisées
              </h2>
              <p className="text-xl text-gray-300">
                Stack moderne et performante pour une expérience utilisateur optimale
              </p>
            </motion.div>

            <motion.div
              {...fadeInUp}
              className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20"
            >
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-2xl font-bold text-white mb-4 flex items-center">
                    <span className="w-3 h-3 bg-purple-500 rounded-full mr-3"></span>
                    Frontend
                  </h3>
                  <ul className="space-y-2 text-gray-300">
                    <li>• React 18 + Vite (Build rapide)</li>
                    <li>• Tailwind CSS (Design moderne)</li>
                    <li>• Framer Motion (Animations fluides)</li>
                    <li>• React Router v6 (Navigation)</li>
                    <li>• React Hook Form (Formulaires)</li>
                    <li>• React Hot Toast (Notifications)</li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-white mb-4 flex items-center">
                    <span className="w-3 h-3 bg-pink-500 rounded-full mr-3"></span>
                    Backend
                  </h3>
                  <ul className="space-y-2 text-gray-300">
                    <li>• Node.js + Express (API REST)</li>
                    <li>• MongoDB + Mongoose (Base de données)</li>
                    <li>• JWT (Authentification sécurisée)</li>
                    <li>• Bcrypt (Chiffrement mots de passe)</li>
                    <li>• Helmet + CORS (Sécurité)</li>
                    <li>• Rate Limiting (Protection DDoS)</li>
                  </ul>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Team Section */}
        <section className="py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div {...fadeInUp}>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                Développé avec ❤️
              </h2>
              <p className="text-xl text-gray-300 leading-relaxed mb-8">
                FuturistCards est un projet étudiant développé dans le cadre de la formation 
                HackerU, démontrant la maîtrise des technologies web modernes et des 
                meilleures pratiques de développement.
              </p>
              <div className="bg-gradient-to-r from-purple-600/20 to-pink-600/20 backdrop-blur-lg rounded-2xl p-8 border border-white/20">
                <p className="text-gray-300 italic">
                  "L'innovation naît de la passion de créer des solutions qui simplifient 
                  la vie des utilisateurs tout en respectant les standards de qualité 
                  et de sécurité les plus élevés."
                </p>
              </div>
            </motion.div>
          </div>
        </section>
      </div>
    </>
  );
};

export default About;
