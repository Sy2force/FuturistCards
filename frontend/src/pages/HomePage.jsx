import { Link } from 'react-router-dom';

const HomePage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-gray-900 mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            FuturistCards
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Créez et partagez vos cartes de visite digitales professionnelles. 
            Une solution moderne pour un networking efficace.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              to="/register" 
              className="bg-blue-600 text-white px-8 py-4 rounded-lg hover:bg-blue-700 transition-colors font-semibold"
              data-testid="home-register-btn"
            >
              Commencer gratuitement
            </Link>
            <Link 
              to="/login" 
              className="text-blue-600 border-2 border-blue-600 px-8 py-4 rounded-lg hover:bg-blue-50 transition-colors font-semibold"
              data-testid="home-login-btn"
            >
              Se connecter
            </Link>
          </div>
        </div>

        {/* Features Section */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <div className="text-center p-6 bg-white rounded-xl shadow-lg">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Création Simple</h3>
            <p className="text-gray-600">Créez vos cartes en quelques clics avec notre interface intuitive</p>
          </div>

          <div className="text-center p-6 bg-white rounded-xl shadow-lg">
            <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Partage Facile</h3>
            <p className="text-gray-600">Partagez vos cartes instantanément par QR code ou lien direct</p>
          </div>

          <div className="text-center p-6 bg-white rounded-xl shadow-lg">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">100% Sécurisé</h3>
            <p className="text-gray-600">Vos données sont protégées avec les dernières technologies</p>
          </div>
        </div>

        {/* Sample Cards Preview */}
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Exemples de cartes</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-white p-6 rounded-xl shadow-lg border hover:shadow-xl transition-shadow">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full mx-auto mb-4"></div>
                <h3 className="font-semibold text-gray-900 mb-2">Carte Exemple {i}</h3>
                <p className="text-sm text-gray-600 mb-4">Développeur Full-Stack</p>
                <div className="text-xs text-gray-500">
                  <p>📧 exemple@email.com</p>
                  <p>📱 +33 1 23 45 67 89</p>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-8">
            <Link 
              to="/cards" 
              className="text-blue-600 hover:text-blue-800 font-semibold"
              data-testid="view-all-cards"
            >
              Voir toutes les cartes →
            </Link>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center bg-gradient-to-r from-blue-600 to-purple-600 text-white p-12 rounded-2xl">
          <h2 className="text-3xl font-bold mb-4">Prêt à commencer ?</h2>
          <p className="text-xl mb-8 opacity-90">Rejoignez des milliers de professionnels qui utilisent FuturistCards</p>
          <Link 
            to="/register" 
            className="bg-white text-blue-600 px-8 py-4 rounded-lg hover:bg-gray-100 transition-colors font-semibold"
            data-testid="cta-register"
          >
            Créer mon compte gratuitement
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
