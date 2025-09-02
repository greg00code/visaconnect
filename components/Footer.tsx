
import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-brand-blue text-white">
      <div className="container mx-auto px-6 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="text-center md:text-left mb-4 md:mb-0">
            <a href="#" className="text-2xl font-bold font-display">
              Visa<span className="text-brand-gold">Connect</span>
            </a>
            <p className="text-sm text-gray-400 mt-1">Votre passerelle vers la France.</p>
          </div>
          <div className="flex space-x-6 text-gray-300 mb-4 md:mb-0">
            <a href="#services" className="hover:text-brand-gold transition duration-300">Services</a>
            <a href="#pourquoi-nous" className="hover:text-brand-gold transition duration-300">Pourquoi nous ?</a>
            <a href="#contact" className="hover:text-brand-gold transition duration-300">Contact</a>
          </div>
        </div>
        <div className="mt-8 border-t border-gray-700 pt-6 text-center text-sm text-gray-400">
          <p>&copy; {new Date().getFullYear()} VisaConnect. Tous droits réservés.</p>
          <div className="mt-2">
            <a href="#" className="hover:text-white underline">Mentions Légales</a>
            <span className="mx-2">|</span>
            <a href="#" className="hover:text-white underline">Politique de Confidentialité</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
