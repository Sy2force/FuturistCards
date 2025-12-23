import React from 'react';

const PrivacyPage = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-8" data-testid="privacy-page">
      <div className="container mx-auto max-w-4xl px-4">
        <div className="bg-white rounded-xl shadow-md p-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Politique de Confidentialité</h1>
            <p className="text-gray-600">Dernière mise à jour : Décembre 2024</p>
          </div>

          <div className="prose max-w-none">
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">1. Collecte des données</h2>
              <p className="text-gray-700 mb-4">
                Nous collectons les informations que vous nous fournissez directement lors de la création de votre compte et de vos cartes de visite :
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-2">
                <li>Informations d&apos;identification : nom, prénom, adresse email</li>
                <li>Informations professionnelles : titre, entreprise, téléphone</li>
                <li>Données d&apos;utilisation : pages visitées, fonctionnalités utilisées</li>
                <li>Informations techniques : adresse IP, type de navigateur</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">2. Utilisation des données</h2>
              <p className="text-gray-700 mb-4">
                Vos données personnelles sont utilisées pour :
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-2">
                <li>Créer et gérer votre compte utilisateur</li>
                <li>Générer vos cartes de visite numériques</li>
                <li>Vous contacter concernant votre compte ou nos services</li>
                <li>Améliorer nos services et développer de nouvelles fonctionnalités</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">3. Partage des données</h2>
              <p className="text-gray-600 mb-4">
                Nous nous engageons à protéger votre vie privée et vos données personnelles. Cette politique explique comment nous collectons, utilisons et protégeons vos informations lorsque vous utilisez FuturistCards.
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-2">
                <li>Avec votre consentement explicite</li>
                <li>Pour respecter une obligation légale</li>
                <li>Avec nos prestataires de services techniques (hébergement, analytics)</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">4. Sécurité des données</h2>
              <p className="text-gray-700 mb-4">
                Nous mettons en place des mesures de sécurité appropriées pour protéger vos données :
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-2">
                <li>Chiffrement des données en transit et au repos</li>
                <li>Authentification sécurisée avec JWT</li>
                <li>Accès limité aux données par notre équipe</li>
                <li>Sauvegardes régulières et sécurisées</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">5. Vos droits</h2>
              <p className="text-gray-700 mb-4">
                Conformément au RGPD, vous disposez des droits suivants :
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-2">
                <li>Droit d&apos;accès à vos données personnelles</li>
                <li>Droit de rectification de vos données</li>
                <li>Droit à l&apos;effacement de vos données</li>
                <li>Droit à la portabilité de vos données</li>
                <li>Droit d&apos;opposition au traitement</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">6. Cookies</h2>
              <p className="text-gray-700 mb-4">
                Nous utilisons des cookies et technologies similaires pour améliorer votre expérience d&apos;utilisation :
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-2">
                <li>Cookies de session pour maintenir votre connexion</li>
                <li>Cookies de préférences (thème, langue)</li>
                <li>Cookies d&apos;analytics pour améliorer nos services</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">7. Contact</h2>
              <p className="text-gray-600">
                Pour toute question concernant cette politique de confidentialité, contactez-nous à privacy@futuristcards.com
              </p>
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-gray-700">
                  <strong>Email :</strong> privacy@futuristcards.com<br />
                  <strong>Adresse :</strong> 123 Rue de la Tech, 75001 Paris, France
                </p>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPage;
