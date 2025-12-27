import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';

const AboutPage = () => {
  const { user } = useAuth();
  const { isDark } = useTheme();
  
  return (
    <div className={`min-h-screen ${isDark ? 'bg-gray-900' : 'bg-gray-50'} py-12 px-4`} data-testid="about-page">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className={`text-4xl font-bold ${isDark ? 'text-white' : 'text-gray-900'} mb-4`}>À Propos de FuturistCards</h1>
          <p className={`text-xl ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>La plateforme moderne pour vos cartes de visite numériques</p>
        </div>

        <div className={`${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} rounded-2xl p-8 shadow-md border backdrop-blur-sm`}>
          <div className="prose max-w-none">
            <p className={`${isDark ? 'text-gray-300' : 'text-gray-700'} mb-6`}>
              FuturistCards révolutionne la façon dont vous partagez vos informations professionnelles. 
              Fini les cartes de visite papier qui se perdent ou s'abîment !
            </p>
            <p className={`${isDark ? 'text-gray-300' : 'text-gray-700'} mb-6`}>
              Notre plateforme moderne vous permet de créer, personnaliser et partager vos cartes de visite 
              numériques en quelques clics. Accessible partout, tout le temps.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 my-12" data-testid="about-features">
              <div className="text-center">
                <div className="w-16 h-16 primary-gradient rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className={`text-xl font-bold ${isDark ? 'text-white' : 'text-gray-900'} mb-2`}>Création Rapide</h3>
                <p className={`${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Créez votre carte professionnelle en quelques minutes seulement</p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 secondary-gradient rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                  </svg>
                </div>
                <h3 className={`text-xl font-bold ${isDark ? 'text-white' : 'text-gray-900'} mb-2`}>Partage Facile</h3>
                <p className={`${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Accessible partout, sur tous les appareils</p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 primary-gradient rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <h3 className={`text-xl font-bold ${isDark ? 'text-white' : 'text-gray-900'} mb-2`}>Sécurisé</h3>
                <p className={`${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Vos données sont protégées et sécurisées</p>
              </div>
            </div>

            <p className={`text-lg ${isDark ? 'text-gray-300' : 'text-gray-700'} leading-relaxed`}>
              Que vous soyez entrepreneur, freelance, ou salarié, FuturistCards s'adapte à vos besoins professionnels. 
              Créez une présence digitale moderne et impressionnez vos contacts avec des cartes de visite interactives 
              et toujours à jour.
            </p>
          </div>
        </div>

        <div className="mt-12 text-center">
          <div className="primary-gradient rounded-2xl p-6 shadow-lg">
            <h3 className="text-2xl font-bold text-white mb-4">Prêt à commencer ?</h3>
            <p className="text-blue-100 mb-6">Rejoignez des milliers de professionnels qui utilisent déjà FuturistCards</p>
            <Link 
              to={user ? "/create-card" : "/register"}
              data-testid="about-cta-button"
              className="inline-block px-8 py-3 bg-white text-blue-600 hover:bg-gray-50 rounded-lg font-semibold shadow-lg transition-all duration-200 transform hover:-translate-y-0.5 hover:shadow-xl"
            >
              {user ? 'Créer ma carte' : 'Créer mon compte'}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
