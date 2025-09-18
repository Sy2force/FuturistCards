import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';

const Home = () => {
  const { isAuthenticated } = useAuth();

  const features = [
    {
      title: "Design Futuriste",
      description: "Interface glassmorphisme avec animations fluides",
      icon: "🎨"
    },
    {
      title: "Partage Instantané",
      description: "Partagez vos cartes en un clic via QR code",
      icon: "📱"
    },
    {
      title: "Analytics Avancées",
      description: "Suivez les vues et interactions de vos cartes",
      icon: "📊"
    },
    {
      title: "Multi-Plateforme",
      description: "Accessible sur tous les appareils",
      icon: "🌐"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 pt-16">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative z-10 pb-8 sm:pb-16 md:pb-20 lg:pb-28 xl:pb-32">
            <main className="mt-10 sm:mt-12 md:mt-16 lg:mt-20 xl:mt-28">
              <div className="text-center">
                <motion.h1
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8 }}
                  className="text-4xl tracking-tight font-extrabold text-white sm:text-5xl md:text-6xl"
                >
                  <span className="block" data-testid="home-title">Cartes de visite</span>
                  <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600">
                    du futur
                  </span>
                </motion.h1>
                
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  className="mt-3 max-w-md mx-auto text-base text-gray-300 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl"
                >
                  Créez, partagez et découvrez des cartes de visite numériques interactives. 
                  L'avenir du networking professionnel commence ici.
                </motion.p>
                
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                  className="mt-5 max-w-md mx-auto sm:flex sm:justify-center md:mt-8"
                >
                  {isAuthenticated ? (
                    <div className="space-y-3 sm:space-y-0 sm:space-x-3 sm:flex">
                      <Link
                        to="/create-card"
                        className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 md:py-4 md:text-lg md:px-10 transition-all duration-200"
                      >
                        Créer ma carte
                      </Link>
                      <Link
                        to="/cards"
                        className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-blue-400 bg-white/10 backdrop-blur-sm hover:bg-white/20 md:py-4 md:text-lg md:px-10 transition-all duration-200"
                      >
                        Découvrir
                      </Link>
                    </div>
                  ) : (
                    <div className="space-y-3 sm:space-y-0 sm:space-x-3 sm:flex">
                      <Link
                        to="/register"
                        className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 md:py-4 md:text-lg md:px-10 transition-all duration-200"
                      >
                        Commencer gratuitement
                      </Link>
                      <Link
                        to="/cards"
                        className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-blue-400 bg-white/10 backdrop-blur-sm hover:bg-white/20 md:py-4 md:text-lg md:px-10 transition-all duration-200"
                      >
                        Découvrir les cartes
                      </Link>
                    </div>
                  )}
                </motion.div>
              </div>
            </main>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-12 bg-black/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:text-center">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-base text-blue-400 font-semibold tracking-wide uppercase"
            >
              Fonctionnalités
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-white sm:text-4xl"
            >
              Une expérience révolutionnaire
            </motion.p>
          </div>

          <div className="mt-10">
            <div className="space-y-10 md:space-y-0 md:grid md:grid-cols-2 md:gap-x-8 md:gap-y-10">
              {features.map((feature, index) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="relative"
                >
                  <div className="bg-white/10 backdrop-blur-md rounded-lg p-6 border border-white/20 hover:bg-white/20 transition-all duration-300">
                    <div className="flex items-center">
                      <div className="text-3xl mr-4">{feature.icon}</div>
                      <div>
                        <h3 className="text-lg leading-6 font-medium text-white">
                          {feature.title}
                        </h3>
                        <p className="mt-2 text-base text-gray-300">
                          {feature.description}
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      {!isAuthenticated && (
        <div className="bg-gradient-to-r from-blue-600/20 to-purple-600/20 backdrop-blur-sm">
          <div className="max-w-2xl mx-auto text-center py-16 px-4 sm:py-20 sm:px-6 lg:px-8">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-3xl font-extrabold text-white sm:text-4xl"
            >
              <span className="block">Prêt à révolutionner</span>
              <span className="block">votre networking ?</span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="mt-4 text-lg leading-6 text-gray-300"
            >
              Rejoignez l&apos;ère numérique avec FuturistCards. Découvrez l&apos;avenir des cartes de visite.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <Link
                to="/register"
                className="mt-8 w-full inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 sm:w-auto transition-all duration-200"
              >
                Créer mon compte gratuitement
              </Link>
            </motion.div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
