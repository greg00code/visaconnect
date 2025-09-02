
import React, { useState } from 'react';

const FaqItem: React.FC<{ question: string; answer: string }> = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-gray-200 py-4">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex justify-between items-center text-left"
      >
        <h3 className="text-lg font-semibold text-brand-blue">{question}</h3>
        <span className={`transform transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}>
          <svg className="w-6 h-6 text-brand-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
        </span>
      </button>
      <div className={`overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? 'max-h-screen mt-4' : 'max-h-0'}`}>
        <p className="text-gray-600 pr-6">
          {answer}
        </p>
      </div>
    </div>
  );
};


const Faq: React.FC = () => {
  const faqData = [
    {
      question: "Garantissez-vous l'obtention du visa ?",
      answer: "Non, la décision finale appartient exclusivement aux autorités consulaires. Cependant, notre expertise et notre méthode rigoureuse visent à présenter un dossier optimisé pour maximiser vos chances d'obtenir une réponse favorable.",
    },
    {
      question: "Quels sont les délais de traitement d'un dossier ?",
      answer: "Les délais varient selon la saisonnalité et l'affluence au consulat. En général, il faut compter entre 15 et 45 jours après le dépôt du dossier. Nous vous conseillons de commencer les démarches au moins 2 à 3 mois avant la date de voyage prévue.",
    },
    {
      question: "Quelle formule choisir : 'Autonomie' ou 'Accompagnement Total' ?",
      answer: "La formule 'Autonomie' est idéale si vous êtes à l'aise avec les démarches administratives mais souhaitez un filet de sécurité. Si vous préférez déléguer entièrement la complexité, éviter le stress et bénéficier d'un support bilingue complet, la formule 'Accompagnement Total' est faite pour vous.",
    },
    {
      question: "Comment se déroule le paiement ?",
      answer: "Le paiement s'effectue en ligne de manière sécurisée. Nous demandons un acompte au début de notre collaboration, et le solde une fois que le dossier est complet et prêt à être déposé.",
    },
  ];

  return (
    <section id="faq" className="py-20 bg-light-blue">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-brand-blue font-display">Questions fréquentes</h2>
          <p className="text-lg text-gray-700 mt-4">Nous répondons à vos interrogations.</p>
        </div>
        <div className="max-w-3xl mx-auto">
          {faqData.map((item, index) => (
            <FaqItem key={index} question={item.question} answer={item.answer} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Faq;
