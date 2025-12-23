import React from 'react';

const TermsPage = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-8" data-testid="terms-page">
      <div className="container mx-auto max-w-4xl px-4">
        <div className="bg-white rounded-xl shadow-md p-8">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Conditions d&apos;utilisation</h1>
            <p className="text-xl text-gray-600">Conditions générales d&apos;utilisation de FuturistCards</p>
            <p className="text-gray-600">Dernière mise à jour : Décembre 2024</p>
          </div>

          <div className="prose max-w-none">
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">1. Acceptation des conditions</h2>
              <p className="text-gray-700 mb-4">
                En accédant et en utilisant FuturistCards, vous acceptez d&apos;être lié par ces conditions d&apos;utilisation. Si vous n&apos;êtes pas d&apos;accord avec ces conditions, veuillez ne pas utiliser notre service.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">2. Description du service</h2>
              <p className="text-gray-700 mb-4">
                FuturistCards est une plateforme de création et de partage de cartes de visite numériques qui permet aux utilisateurs de :
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-2">
                <li>Créer des cartes de visite professionnelles</li>
                <li>Partager leurs informations de contact</li>
                <li>Gérer leur présence professionnelle en ligne</li>
                <li>Analyser les interactions avec leurs cartes</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">3. Compte utilisateur</h2>
              <p className="text-gray-700 mb-4">
                Pour utiliser nos services, vous devez :
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-2">
                <li>Vous devez être âgé d&apos;au moins 16 ans pour utiliser ce service</li>
                <li>Vous devez fournir des informations exactes et à jour lors de l&apos;inscription</li>
                <li>Vous êtes responsable de maintenir la confidentialité de votre mot de passe</li>
                <li>Vous ne devez pas partager votre compte avec d&apos;autres personnes</li>
                <li>Nous notifier immédiatement de tout usage non autorisé</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">4. Utilisation acceptable</h2>
              <p className="text-gray-700 mb-4">
                Vous vous engagez à ne pas :
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-2">
                <li>Utiliser le service à des fins illégales ou non autorisées</li>
                <li>Publier du contenu illégal, offensant ou inapproprié</li>
                <li>Usurper l&apos;identité d&apos;une autre personne ou organisation</li>
                <li>Utiliser le service à des fins commerciales non autorisées</li>
                <li>Perturber ou compromettre la sécurité du service</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">5. Propriété intellectuelle</h2>
              <p className="text-gray-700 mb-4">
                Vous conservez tous les droits sur le contenu que vous créez. En utilisant notre service, vous nous accordez une licence pour :
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-2">
                <li>Héberger et afficher votre contenu</li>
                <li>Permettre le partage selon vos paramètres</li>
                <li>Créer des sauvegardes de sécurité</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">6. Limitation de responsabilité</h2>
              <p className="text-gray-700 mb-4">
                Le service est fourni &quot;en l&apos;état&quot; sans garantie d&apos;aucune sorte. Nous ne garantissons pas que le service sera ininterrompu ou exempt d&apos;erreurs.
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-2">
                <li>La perte de données ou l&apos;interruption de service</li>
                <li>Les dommages directs ou indirects liés à l&apos;utilisation</li>
                <li>Le contenu publié par d&apos;autres utilisateurs</li>
                <li>Les problèmes techniques indépendants de notre volonté</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">7. Résiliation</h2>
              <p className="text-gray-700 mb-4">
                Nous nous réservons le droit de suspendre ou résilier votre compte en cas de violation de ces conditions. 
                Vous pouvez également supprimer votre compte à tout moment depuis vos paramètres.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">8. Modifications</h2>
              <p className="text-gray-700 mb-4">
                Nous nous réservons le droit de modifier ces conditions à tout moment. Les modifications prendront effet immédiatement après leur publication sur cette page.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">9. Contact</h2>
              <p className="text-gray-600">
                Pour toute question concernant ces conditions d&apos;utilisation, contactez-nous à legal@futuristcards.com
              </p>
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-gray-700">
                  <strong>Email :</strong> legal@futuristcards.com<br />
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

export default TermsPage;
