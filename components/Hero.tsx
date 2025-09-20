
import React from 'react';

const Hero: React.FC = () => {
  return (
    <section className="relative bg-brand-blue text-white">
      <div className="absolute inset-0">
        <img
          src="https://picsum.photos/seed/visaconnect-hero/1600/900?grayscale"
          alt="Couple heureux"
          className="w-full h-full object-cover opacity-10"
        />
      </div>
      <div className="container mx-auto px-6 py-24 md:py-32 relative z-10 text-center">
        <h1 className="text-4xl md:text-6xl font-extrabold font-display leading-tight mb-4">
          Visa Schengen pour votre conjoint(e) Thaïlandais(e) ?
        </h1>
        <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto text-gray-300">
          Simplifiez les démarches administratives complexes et retrouvez-vous en France, sans stress.
        </p>
        <a
          href="#services"
          className="bg-brand-gold text-brand-blue font-bold py-3 px-8 rounded-full text-lg hover:bg-yellow-400 transition-transform transform hover:scale-105 duration-300"
        >
          Simplifiez vos démarches
        </a>
      </div>
    </section>
  );
};

export default Hero;
