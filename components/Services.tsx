
import React from 'react';

const CheckIcon = () => (
  <svg className="w-6 h-6 text-green-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
);

const ServiceCard: React.FC<{
  title: string;
  price: string;
  priceSuffix?: string;
  description: string;
  features: string[];
  isFeatured?: boolean;
}> = ({ title, price, priceSuffix = '€', description, features, isFeatured = false }) => {
  const cardClasses = isFeatured 
    ? "bg-brand-blue text-white border-4 border-brand-gold" 
    : "bg-white text-gray-800 border-2 border-gray-200";
  const buttonClasses = isFeatured
    ? "bg-brand-gold text-brand-blue font-bold hover:bg-yellow-400"
    : "bg-brand-blue text-white font-bold hover:bg-blue-800";
  const titleClasses = isFeatured ? "text-brand-gold" : "text-brand-blue";

  return (
    <div className={`rounded-xl shadow-lg p-8 flex flex-col ${cardClasses} transform transition-transform duration-300 hover:scale-105`}>
      <h3 className={`text-2xl font-bold font-display text-center ${titleClasses}`}>{title}</h3>
      <p className="text-4xl font-bold text-center my-4">{price}<span className="text-lg font-normal">{priceSuffix}</span></p>
      <p className="text-center mb-6 h-16">{description}</p>
      <ul className="space-y-3 mb-8 flex-grow">
        {features.map((feature, index) => {
          if (feature.startsWith("HEADING:")) {
            return (
              <li key={index} className="pt-2">
                <p className={`font-bold text-base ${isFeatured ? 'text-white' : 'text-brand-blue'}`}>
                  {feature.replace("HEADING:", "").trim()}
                </p>
              </li>
            );
          }
          if (feature.startsWith("SUB:")) {
            return (
              <li key={index} className="flex items-start ml-5 text-sm">
                <span className={`mr-3 mt-1 ${isFeatured ? 'text-gray-300' : 'text-gray-500'}`}>•</span>
                <span className={isFeatured ? "text-gray-200" : "text-gray-600"}>{feature.replace("SUB:", "").trim()}</span>
              </li>
            );
          }

          const featureParts = feature.split('|');
          if (featureParts.length > 1) {
            return (
              <li key={index} className="flex items-start">
                <CheckIcon />
                <div className="ml-3">
                  <span>{featureParts[0].trim()}</span>
                  <p className={`text-sm mt-1 ml-1 ${isFeatured ? 'text-gray-300' : 'text-gray-600'}`}>
                    {featureParts[1].trim()}
                  </p>
                </div>
              </li>
            );
          }

          return (
            <li key={index} className="flex items-start">
              <CheckIcon />
              <span className="ml-3">{feature}</span>
            </li>
          );
        })}
      </ul>
      <a href="#contact" className={`mt-auto text-center w-full py-3 px-6 rounded-full transition duration-300 ${buttonClasses}`}>
        Choisir cette formule
      </a>
    </div>
  );
};

const Services: React.FC = () => {
  const autonomieFeatures = [
    "📂 Espace Google Drive partagé pour centraliser vos documents.",
    "📖 Guide détaillé pas-à-pas pour suivre la procédure sans erreur.",
    "📝 Questionnaire personnalisé afin d’adapter la préparation à votre situation.",
    "✅ Checklist complète de tous les documents requis.",
    "🔍 Analyse approfondie de l’ensemble de vos documents.",
    "✍️ Rédaction de tous les courriers nécessaires adaptés à votre dossier.",
    "🔎 Relecture finale du dossier avant son dépôt.",
  ];

  const premiumFeatures = [
    "HEADING:Tout le Pack Autonomie Sécurisée + :",
    "🌐 Assistance guidée pour le formulaire France-Visas (visio/téléphone – accompagnement étape par étape).",
    "HEADING:📦 VisaPack complet et imprimé :",
    "SUB:Nous préparons l’intégralité du dossier (documents triés, classés, reliés).",
    "SUB:L’hébergeant en France n’a qu’une seule démarche : ajouter l’attestation d’hébergement originale, coller l’étiquette FedEx fournie et déposer le VisaPack en point relais FedEx.",
    "SUB:Le demandeur reçoit ensuite son VisaPack complet en Thaïlande, prêt à présenter.",
    "✈️ Expédition FedEx internationale incluse (valeur ~100 €).",
    "🗣️ Assistance en thaï | une collaboratrice thaïlandaise contacte directement le demandeur (téléphone ou visio) pour lui expliquer chaque étape.",
    "📄 Notice explicative en thaï incluse avec le dossier.",
    "🤝 Support continu jusqu’au dépôt du dossier.",
  ];

  return (
    <section id="services" className="py-20 bg-white">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-brand-blue font-display">Des formules adaptées à vos besoins</h2>
          <p className="text-lg text-gray-700 mt-4 max-w-2xl mx-auto">Que vous soyez autonome ou que vous souhaitiez un accompagnement de A à Z, nous avons la solution.</p>
        </div>
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <ServiceCard
            title="🟦 Pack Autonomie Sécurisée"
            price="149"
            priceSuffix=" € TTC"
            description="Pour les personnes organisées et autonomes qui souhaitent constituer leur dossier en toute confiance, tout en évitant les erreurs."
            features={autonomieFeatures}
          />
          <ServiceCard
            title="🟩 Pack Premium – VisaPack Sérénité"
            price="449"
            priceSuffix=" € TTC (FedEx inclus)"
            description="Pour ceux qui souhaitent une prise en charge complète et sans stress."
            features={premiumFeatures}
            isFeatured={true}
          />
        </div>

        <div className="max-w-4xl mx-auto mt-12 p-6 bg-yellow-50 border-l-4 border-yellow-400 text-yellow-800 rounded-r-lg" role="alert">
          <h4 className="font-bold text-lg mb-3">⚠️ Frais officiels obligatoires à prévoir (non inclus dans nos formules)</h4>
          <ul className="list-none space-y-2 text-sm">
            <li>• <strong>Attestation d’hébergement en mairie</strong> (timbre fiscal) → 30 €</li>
            <li>• <strong>Frais TLS Contact</strong> (centre de dépôt) → ≈ 30 €</li>
            <li>• <strong>Frais de visa Schengen</strong> → ≈ 90 €</li>
            <li>• <strong>Assurance voyage/médicale Schengen</strong> obligatoire → ≈ 30 à 60 €</li>
          </ul>
        </div>

      </div>
    </section>
  );
};

export default Services;
