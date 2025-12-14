import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { 
  RocketLaunchIcon, 
  BoltIcon, 
  ShieldCheckIcon, 
  SparklesIcon
} from '@heroicons/react/24/outline';

const Landing = () => {
  return (
    <>
      <Helmet>
        <title>FuturistCards - Cartes de Visite Digitales</title>
        <meta name="description" content="Créez et partagez vos cartes de visite professionnelles avec FuturistCards. Plateforme moderne et intuitive." />
      </Helmet>
      
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-900 dark:to-gray-800 px-4 py-8">
        <div className="max-w-4xl mx-auto text-center pt-12">
          
          {/* Hero Section */}
          <div className="mb-16">
            <SparklesIcon className="w-16 h-16 mx-auto text-blue-500 mb-6" />
            <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              FuturistCards
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-gray-600 dark:text-gray-300">
              Créez et partagez vos cartes de visite digitales avec une plateforme moderne et intuitive.
            </p>
            
            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Link 
                to="/register" 
                className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-lg transition-colors"
              >
                Commencer Gratuitement
              </Link>
              <Link 
                to="/cards" 
                className="bg-white dark:bg-gray-800 text-blue-600 dark:text-blue-400 font-semibold py-3 px-8 rounded-lg border-2 border-blue-600 hover:bg-blue-50 dark:hover:bg-gray-700 transition-colors"
              >
                Explorer les Cartes
              </Link>
            </div>
          </div>
          
          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg">
              <RocketLaunchIcon className="w-12 h-12 mx-auto text-blue-500 mb-4" />
              <h3 className="text-xl font-semibold mb-2 text-gray-800 dark:text-gray-200">Rapide</h3>
              <p className="text-gray-600 dark:text-gray-400">Créez votre carte en quelques minutes</p>
            </div>
            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg">
              <BoltIcon className="w-12 h-12 mx-auto text-purple-500 mb-4" />
              <h3 className="text-xl font-semibold mb-2 text-gray-800 dark:text-gray-200">Moderne</h3>
              <p className="text-gray-600 dark:text-gray-400">Design responsive et élégant</p>
            </div>
            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg">
              <ShieldCheckIcon className="w-12 h-12 mx-auto text-green-500 mb-4" />
              <h3 className="text-xl font-semibold mb-2 text-gray-800 dark:text-gray-200">Sécurisé</h3>
              <p className="text-gray-600 dark:text-gray-400">Vos données sont protégées</p>
            </div>
          </div>
          
        </div>
      </div>
    </>
  );
}

export default Landing;
