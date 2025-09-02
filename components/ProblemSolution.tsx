import React from 'react';

const ProblemCard: React.FC<{ icon: string; title: string; text: string }> = ({ icon, title, text }) => (
  <div className="bg-red-50 p-6 rounded-lg text-center h-full flex flex-col">
    <div className="text-4xl mb-4 text-red-500">{icon}</div>
    <h3 className="font-bold text-lg text-brand-blue mb-2">{title}</h3>
    <p className="text-gray-600 flex-grow">{text}</p>
  </div>
);

const SolutionCard: React.FC<{ icon: string; title: string; text: string }> = ({ icon, title, text }) => (
  <div className="bg-green-50 p-6 rounded-lg text-center h-full flex flex-col">
    <div className="text-4xl mb-4 text-green-500">{icon}</div>
    <h3 className="font-bold text-lg text-brand-blue mb-2">{title}</h3>
    <p className="text-gray-600 flex-grow">{text}</p>
  </div>
);

const ProblemSolution: React.FC = () => {
  return (
    <section className="py-20 bg-light-blue">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-brand-blue font-display">Un parcours semé d'embûches ? Pas avec nous.</h2>
          <p className="text-lg text-gray-700 mt-4 max-w-2xl mx-auto">La demande de visa peut être un labyrinthe. Nous sommes votre fil d'Ariane.</p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-8 items-stretch">
          
          {/* Parent Card 1: Problems */}
          <div className="bg-white p-8 rounded-xl shadow-lg flex flex-col">
            <h3 className="text-2xl font-bold text-red-600 font-display mb-6 text-center">Le casse-tête habituel...</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 flex-grow">
              <ProblemCard icon="📄" title="Dossier incomplet" text="Un seul document manquant ou mal rempli et c'est le refus assuré." />
              <ProblemCard icon="⏳" title="Perte de temps" text="Des heures de recherche pour des informations souvent contradictoires." />
              <ProblemCard icon="🌐" title="Barrière de la langue" text="Traduire et comprendre le jargon administratif peut être un défi." />
              <ProblemCard icon="😟" title="Peur du refus" text="Le stress et l'incertitude pèsent lourdement sur votre projet de couple." />
            </div>
          </div>

          {/* Parent Card 2: Solutions */}
          <div className="bg-white p-8 rounded-xl shadow-lg flex flex-col">
            <h3 className="text-2xl font-bold text-green-600 font-display mb-6 text-center">...transformé en une voie royale</h3>
             <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 flex-grow">
              <SolutionCard icon="✅" title="Dossier optimisé" text="Nous vérifions chaque détail pour maximiser vos chances de succès." />
              <SolutionCard icon="💡" title="Expertise dédiée" text="Profitez de notre connaissance pointue des exigences consulaires." />
              <SolutionCard icon="🤝" title="Support bilingue" text="Une communication fluide en français et en thaï pour votre couple." />
              <SolutionCard icon="🧘" title="Sérénité retrouvée" text="Abordez les démarches avec confiance et concentrez-vous sur vos retrouvailles." />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default ProblemSolution;