import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="glass-dark border-t border-white/10 py-12 shadow-3d">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center">
          <p className="text-gray-400 mb-2">
            2024 FuturistCards. Tous droits rservs.
          </p>
          <div className="flex justify-center space-x-6 text-sm text-gray-400">
            <Link to="/about" className="hover:text-white hover-lift transition-colors">
              À propos
            </Link>
            <span>•</span>
            <Link to="/contact" className="hover:text-white hover-lift transition-colors">
              Contact
            </Link>
            <span>•</span>
            <Link to="/privacy" className="hover:text-white hover-lift transition-colors">
              Confidentialité
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
