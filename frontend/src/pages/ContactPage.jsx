import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Non fonctionnel - juste pour la démo
    alert('Merci pour votre message ! (Fonctionnalité en développement)');
    setFormData({ name: '', email: '', message: '' });
  };

  return (
    <div className="min-h-screen py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold gradient-text mb-4">Contactez-nous</h1>
          <p className="text-xl text-gray-300">Nous sommes là pour vous aider</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Formulaire de contact */}
          <div className="glass-effect rounded-2xl p-8 shadow-3d border border-white/20 animate-fade-in hover-lift">
            <h2 className="text-2xl font-bold text-white mb-6">Envoyez-nous un message</h2>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
                  Nom complet
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 glass-effect rounded-lg text-white placeholder-gray-400 border border-white/20 focus:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-400/20"
                  placeholder="Votre nom complet"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                  Adresse email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 glass-effect rounded-lg text-white placeholder-gray-400 border border-white/20 focus:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-400/20"
                  placeholder="votre@email.com"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={6}
                  className="w-full px-4 py-3 glass-effect rounded-lg text-white placeholder-gray-400 border border-white/20 focus:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-400/20 resize-none"
                  placeholder="Décrivez votre demande..."
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 px-6 gradient-primary hover-lift hover-glow text-white rounded-lg font-semibold shadow-3d"
              >
                Envoyer le message
              </button>
            </form>
          </div>

          {/* Informations de contact */}
          <div className="space-y-8">
            <div className="glass-effect rounded-2xl p-8 shadow-3d border border-white/20 animate-fade-in hover-lift" style={{animationDelay: '0.1s'}}>
              <h3 className="text-xl font-bold text-white mb-4">Informations de contact</h3>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 gradient-primary rounded-lg flex items-center justify-center">
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-white font-medium">Email</p>
                    <p className="text-gray-300">contact@futuristcards.fr</p>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 gradient-primary rounded-lg flex items-center justify-center">
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-white font-medium">Horaires</p>
                    <p className="text-gray-300">Lun-Ven: 9h-18h</p>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 gradient-primary rounded-lg flex items-center justify-center">
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-white font-medium">Localisation</p>
                    <p className="text-gray-300">Paris, France</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="glass-effect rounded-2xl p-8 shadow-3d border border-white/20 animate-fade-in hover-lift" style={{animationDelay: '0.2s'}}>
              <h3 className="text-xl font-bold text-white mb-4">Support technique</h3>
              <p className="text-gray-300 mb-4">
                Nous sommes là pour vous aider ! N&apos;hésitez pas à nous contacter pour toute question.
              </p>
              <div className="flex space-x-4">
                <Link to="/about" className="px-4 py-2 gradient-secondary hover-lift text-white rounded-lg font-medium inline-block text-center">
                  FAQ
                </Link>
                <Link to="/terms" className="px-4 py-2 glass-effect hover-lift text-white rounded-lg font-medium border border-white/20 inline-block text-center">
                  Documentation
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
