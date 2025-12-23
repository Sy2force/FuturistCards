import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

const ServicesPage = () => {
  const { user } = useAuth();
  const services = [
    {
      id: 1,
      title: "Carte de visite digitale",
      description: "Créez votre carte de visite numérique professionnelle avec tous vos contacts et informations importantes.",
      icon: "M7 4V2C7 1.45 7.45 1 8 1H16C16.55 1 17 1.45 17 2V4H20C20.55 4 21 4.45 21 5S20.55 6 20 6H19V19C19 20.1 18.1 21 17 21H7C5.9 21 5 20.1 5 19V6H4C3.45 6 3 5.55 3 5S3.45 4 4 4H7ZM9 3V4H15V3H9ZM7 6V19H17V6H7Z",
      features: ["Design personnalisable", "QR Code intégré", "Partage instantané", "Analytics inclus"],
      price: "Gratuit"
    },
    {
      id: 2,
      title: "Carte Premium",
      description: "Version avancée avec fonctionnalités premium pour les professionnels exigeants.",
      icon: "M12 2L13.09 8.26L22 9L13.09 9.74L12 16L10.91 9.74L2 9L10.91 8.26L12 2Z",
      features: ["Templates premium", "Branding personnalisé", "Statistiques avancées", "Support prioritaire"],
      price: "9.99€/mois"
    },
    {
      id: 3,
      title: "Solution Entreprise",
      description: "Solution complète pour les équipes et entreprises avec gestion centralisée.",
      icon: "M16 4C18.2 4 20 5.8 20 8V16C20 18.2 18.2 20 16 20H8C5.8 20 4 18.2 4 16V8C4 5.8 5.8 4 8 4H16ZM16 6H8C6.9 6 6 6.9 6 8V16C6 17.1 6.9 18 8 18H16C17.1 18 18 17.1 18 16V8C18 6.9 17.1 6 16 6Z",
      features: ["Gestion d'équipe", "API personnalisée", "Intégrations CRM", "Formation incluse"],
      price: "Sur devis"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50" data-testid="services-page">
      {/* Hero Section */}
      <section data-testid="services-hero" className="bg-white py-16 px-4">
        <div className="container mx-auto max-w-6xl text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Nos Services
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Découvrez nos solutions de cartes de visite numériques adaptées à tous vos besoins professionnels
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section data-testid="services-grid" className="py-16 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="grid md:grid-cols-3 gap-8">
            {services.map((service) => (
              <div 
                key={service.id}
                data-testid={`service-card-${service.id}`}
                className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow duration-200 p-8 border border-gray-200"
              >
                <div className="w-16 h-16 bg-blue-600 rounded-lg flex items-center justify-center mb-6">
                  <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d={service.icon} />
                  </svg>
                </div>
                
                <h3 className="text-2xl font-bold text-gray-900 mb-4">{service.title}</h3>
                <p className="text-gray-600 mb-6 leading-relaxed">{service.description}</p>
                
                <ul className="space-y-3 mb-8">
                  {service.features.map((feature, index) => (
                    <li key={index} className="flex items-center text-gray-700">
                      <svg className="w-5 h-5 text-green-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      {feature}
                    </li>
                  ))}
                </ul>
                
                <div className="border-t pt-6">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-3xl font-bold text-blue-600">{service.price}</span>
                  </div>
                  <Link
                    to={user ? "/create-card" : "/register"}
                    data-testid={`service-cta-${service.id}`}
                    className="w-full block text-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
                  >
                    {user ? "Créer une carte" : "Commencer"}
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section data-testid="services-faq" className="py-16 px-4 bg-white">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Questions fréquentes</h2>
            <p className="text-gray-600">Trouvez les réponses aux questions les plus courantes</p>
          </div>

          <div className="space-y-6">
            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Comment créer ma première carte ?</h3>
              <p className="text-gray-600">
                Il suffit de vous inscrire gratuitement, puis de remplir vos informations professionnelles. 
                Votre carte sera générée automatiquement avec un QR code unique.
              </p>
            </div>

            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Puis-je personnaliser le design ?</h3>
              <p className="text-gray-600">
                Oui, nous proposons plusieurs templates et options de personnalisation. 
                Les utilisateurs Premium ont accès à des designs exclusifs et au branding personnalisé.
              </p>
            </div>

            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Comment partager ma carte ?</h3>
              <p className="text-gray-600">
                Vous pouvez partager votre carte via QR code, lien direct, email, ou sur les réseaux sociaux. 
                Le partage est instantané et fonctionne sur tous les appareils.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section data-testid="services-cta" className="py-16 px-4 bg-blue-600">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Prêt à commencer ?
          </h2>
          <p className="text-lg text-blue-100 mb-8 max-w-2xl mx-auto">
            Créez votre première carte de visite numérique en quelques minutes
          </p>
          <Link
            to={user ? "/create-card" : "/register"}
            data-testid="services-main-cta"
            className="inline-flex items-center gap-2 px-8 py-4 bg-white text-blue-600 hover:bg-gray-50 rounded-lg font-semibold text-lg transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
          >
            {user ? "Créer ma carte" : "Créer ma carte gratuite"}
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default ServicesPage;
