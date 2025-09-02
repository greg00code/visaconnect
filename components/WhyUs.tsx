
import React from 'react';

const Feature: React.FC<{ icon: string; title: string; description: string }> = ({ icon, title, description }) => (
  <div className="text-center md:text-left">
    <div className="flex justify-center md:justify-start items-center mb-4">
      <div className="bg-brand-gold text-brand-blue rounded-full p-3 text-2xl">
        {icon}
      </div>
      <h3 className="text-xl font-bold text-brand-blue font-display ml-4">{title}</h3>
    </div>
    <p className="text-gray-600">{description}</p>
  </div>
);

const WhyUs: React.FC = () => {
  return (
    <section id="pourquoi-nous" className="py-20 bg-light-blue">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-brand-blue font-display">Pourquoi nous faire confiance ?</h2>
          <p className="text-lg text-gray-700 mt-4 max-w-2xl mx-auto">Notre approche unique est spécifiquement conçue pour les couples franco-thaïlandais.</p>
        </div>
        <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="grid grid-cols-1 gap-8">
              <Feature
                icon="🇹🇭🇫🇷"
                title="Double Expertise Culturelle"
                description="Nous comprenons parfaitement les subtilités administratives et culturelles des deux pays. Fini les malentendus !"
              />
              <Feature
                icon="💬"
                title="Support Bilingue Intégré"
                description="Nous communiquons fluidement en français avec vous, et en thaï avec votre conjoint(e) pour une clarté totale."
              />
              <Feature
                icon="🎯"
                title="Approche Personnalisée"
                description="Chaque couple est unique. Nous adaptons nos conseils à votre situation spécifique pour un dossier sur-mesure."
              />
               <Feature
                icon="📈"
                title="Taux de Succès Élevé"
                description="Notre méthode rigoureuse et notre veille constante des procédures consulaires maximisent vos chances de succès."
              />
            </div>
            <div className="hidden md:block">
              <img 
                src="https://picsum.photos/600/700" 
                alt="Image illustrant la confiance" 
                className="rounded-xl shadow-2xl object-cover w-full h-full" 
              />
            </div>
        </div>
      </div>
    </section>
  );
};

export default WhyUs;
