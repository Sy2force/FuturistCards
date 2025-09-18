import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const About = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12 pt-8"
        >
          <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-green-400 bg-clip-text text-transparent mb-4">
            À Propos de FuturistCards
          </h1>
          <p className="text-xl text-white/70">
            L'avenir du networking professionnel
          </p>
        </motion.div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* Mission */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-8"
          >
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
              🎯 Notre Mission
            </h2>
            <p className="text-white/80 leading-relaxed">
              <strong className="text-white">FuturistCards</strong> révolutionne le networking professionnel 
              en créant des cartes de visite numériques interactives et futuristes. Notre plateforme 
              combine design moderne et technologie avancée pour offrir une expérience utilisateur 
              exceptionnelle.
            </p>
          </motion.div>

          {/* Vision */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-8"
          >
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
              🔮 Notre Vision
            </h2>
            <p className="text-white/80 leading-relaxed">
              Créer un écosystème numérique où les professionnels peuvent se connecter, 
              partager et collaborer de manière innovante. Nous imaginons un monde où 
              chaque interaction professionnelle est enrichie par la technologie.
            </p>
          </motion.div>
        </div>

        {/* Features Grid */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12"
        >
          {/* Feature 1 */}
          <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6">
            <div className="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center mb-4">
              <span className="text-2xl">🎨</span>
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">Design Futuriste</h3>
            <p className="text-white/70 text-sm">
              Interface glassmorphisme avec animations fluides et expérience utilisateur premium
            </p>
          </div>

          {/* Feature 2 */}
          <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6">
            <div className="w-12 h-12 bg-purple-500/20 rounded-lg flex items-center justify-center mb-4">
              <span className="text-2xl">🔒</span>
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">Sécurité Avancée</h3>
            <p className="text-white/70 text-sm">
              Authentification JWT, chiffrement des données et protection contre les attaques
            </p>
          </div>

          {/* Feature 3 */}
          <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6">
            <div className="w-12 h-12 bg-green-500/20 rounded-lg flex items-center justify-center mb-4">
              <span className="text-2xl">📱</span>
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">Responsive</h3>
            <p className="text-white/70 text-sm">
              Optimisé pour tous les appareils : mobile, tablette et desktop
            </p>
          </div>
        </motion.div>

        {/* Tech Stack */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-8 mb-12"
        >
          <h2 className="text-2xl font-bold text-white mb-6 text-center">🛠️ Stack Technique</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-lg font-semibold text-white mb-4">Frontend</h3>
              <ul className="space-y-2 text-white/70">
                <li>• React 18 avec Hooks</li>
                <li>• Vite pour le build ultra-rapide</li>
                <li>• Tailwind CSS pour le styling</li>
                <li>• Framer Motion pour les animations</li>
                <li>• React Router pour la navigation</li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold text-white mb-4">Backend</h3>
              <ul className="space-y-2 text-white/70">
                <li>• Node.js + Express.js</li>
                <li>• MongoDB avec Mongoose</li>
                <li>• JWT pour l'authentification</li>
                <li>• Helmet + CORS pour la sécurité</li>
                <li>• Rate limiting et validation</li>
              </ul>
            </div>
          </div>
        </motion.div>

        {/* Team */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-8 mb-12"
        >
          <h2 className="text-2xl font-bold text-white mb-6 text-center">👥 Équipe de Développement</h2>
          
          <div className="text-center">
            <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full mx-auto mb-4 flex items-center justify-center">
              <span className="text-2xl text-white font-bold">FC</span>
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">FuturistCards Team</h3>
            <p className="text-white/70 mb-4">
              Développeurs passionnés par l'innovation et l'excellence technique
            </p>
            <p className="text-white/60 text-sm">
              Projet développé dans le cadre de la formation HackerU 2025
            </p>
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="text-center"
        >
          <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-8">
            <h2 className="text-2xl font-bold text-white mb-4">Prêt à découvrir l'avenir ?</h2>
            <p className="text-white/70 mb-6">
              Rejoignez la révolution des cartes de visite numériques
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/register"
                className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-8 py-3 rounded-xl hover:from-blue-600 hover:to-purple-600 transition-all duration-300 font-medium"
              >
                Commencer maintenant
              </Link>
              
              <Link
                to="/cards"
                className="bg-white/10 hover:bg-white/20 border border-white/20 text-white px-8 py-3 rounded-xl transition-all duration-300 font-medium"
              >
                Explorer les cartes
              </Link>
            </div>
          </div>
        </motion.div>

        {/* Back to Home */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="text-center mt-8"
        >
          <Link 
            to="/" 
            className="inline-flex items-center text-white/60 hover:text-white/80 transition-colors"
          >
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Retour à l'accueil
          </Link>
        </motion.div>
      </div>
    </div>
  );
};

export default About;
