
import React, { useState } from 'react';
import LegalModal from './LegalModal';
import MentionsLegales from './MentionsLegales';
import PolitiqueConfidentialite from './PolitiqueConfidentialite';
import CGV from './CGV';

const Footer: React.FC = () => {
  const [showMentionsLegales, setShowMentionsLegales] = useState(false);
  const [showPolitique, setShowPolitique] = useState(false);
  const [showCGV, setShowCGV] = useState(false);

  return (
    <>
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
            <button onClick={() => setShowMentionsLegales(true)} className="hover:text-white underline">Mentions Légales</button>
            <span className="mx-2">|</span>
            <button onClick={() => setShowPolitique(true)} className="hover:text-white underline">Politique de Confidentialité</button>
            <span className="mx-2">|</span>
            <button onClick={() => setShowCGV(true)} className="hover:text-white underline">Conditions Générales de Vente</button>
          </div>
        </div>
      </div>
    </footer>

    {/* Modals */}
    <LegalModal 
      isOpen={showMentionsLegales} 
      onClose={() => setShowMentionsLegales(false)}
      title="Mentions Légales"
    >
      <MentionsLegales />
    </LegalModal>

    <LegalModal 
      isOpen={showPolitique} 
      onClose={() => setShowPolitique(false)}
      title="Politique de Confidentialité"
    >
      <PolitiqueConfidentialite />
    </LegalModal>

    <LegalModal 
      isOpen={showCGV} 
      onClose={() => setShowCGV(false)}
      title="Conditions Générales de Vente"
    >
      <CGV />
    </LegalModal>
    </>
  );
};

export default Footer;
