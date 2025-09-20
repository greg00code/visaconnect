import React, { useState } from 'react';
import { createStripeCheckoutCallable } from '../firebase'; // Importer la fonction

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
  planId: string; // Ajout du planId pour l'identification
}> = ({ title, price, priceSuffix = '€', description, features, isFeatured = false, planId }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [customerEmail, setCustomerEmail] = useState('');
  const [customerName, setCustomerName] = useState('');

  const handlePayment = async () => {
    if (!customerEmail || !customerName) {
      alert('Veuillez remplir tous les champs');
      return;
    }
    
    setIsLoading(true);
    try {
      // Capturer le prospect avant redirection Stripe
      await fetch('https://n8n.galette.ovh/webhook/poststripe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: customerName,
          email: customerEmail,
          planId: planId,
          timestamp: new Date().toISOString(),
          status: 'prospect_initiated_payment'
        })
      });

      const result: any = await createStripeCheckoutCallable({ 
        planId,
        email: customerEmail,
        name: customerName 
      });
      const { checkoutUrl } = result.data;
      if (checkoutUrl) {
        window.location.href = checkoutUrl;
      } else {
        console.error('No checkoutUrl received');
        alert('Une erreur est survenue lors de la création de la session de paiement.');
      }
    } catch (error) {
      console.error('Error creating Stripe session:', error);
      alert('Une erreur est survenue. Veuillez réessayer.');
    }
    setIsLoading(false);
    setShowModal(false);
  };

  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setCustomerEmail('');
    setCustomerName('');
  };

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
      <button onClick={openModal} disabled={isLoading} className={`mt-auto text-center w-full py-3 px-6 rounded-full transition duration-300 ${buttonClasses} disabled:opacity-50`}>
        {isLoading ? 'Chargement...' : 'Choisir cette formule'}
      </button>
      
      {/* Modal pour capturer email et nom */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50" onClick={closeModal}>
          <div className="bg-white rounded-lg p-8 max-w-md w-full mx-4" onClick={(e) => e.stopPropagation()}>
            <h3 className="text-2xl font-bold text-brand-blue mb-4">Informations de contact</h3>
            <p className="text-gray-600 mb-6">Ces informations nous permettront de vous envoyer les accès à votre espace client.</p>
            
            <div className="mb-4">
              <label className="block text-gray-700 font-medium mb-2">
                Nom complet <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-blue focus:border-transparent"
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
                placeholder="Jean Dupont"
                required
              />
            </div>
            
            <div className="mb-6">
              <label className="block text-gray-700 font-medium mb-2">
                Adresse email <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-blue focus:border-transparent"
                value={customerEmail}
                onChange={(e) => setCustomerEmail(e.target.value)}
                placeholder="jean.dupont@example.com"
                required
              />
            </div>
            
            <div className="flex space-x-3">
              <button
                onClick={closeModal}
                className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Annuler
              </button>
              <button
                onClick={handlePayment}
                disabled={isLoading || !customerEmail || !customerName}
                className="flex-1 px-4 py-2 bg-brand-blue text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? 'Redirection...' : 'Continuer vers le paiement'}
              </button>
            </div>
          </div>
        </div>
      )}
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
          <p className="text-base md:text-lg text-gray-700 mt-4 max-w-3xl mx-auto px-4 md:px-0 leading-relaxed">
            Que vous soyez autonome ou que vous souhaitiez un accompagnement de A&nbsp;à&nbsp;Z, nous&nbsp;avons&nbsp;la&nbsp;solution.
          </p>
        </div>
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <ServiceCard
            title="🟦 Pack Autonomie Sécurisée"
            price="149"
            priceSuffix=" € TTC"
            description="Pour les personnes organisées et autonomes qui souhaitent constituer leur dossier en toute confiance, tout en évitant les erreurs."
            features={autonomieFeatures}
            planId="autonomie" // ID pour le backend
          />
          <ServiceCard
            title="🟩 Pack Premium – VisaPack Sérénité"
            price="449"
            priceSuffix=" € TTC (FedEx inclus)"
            description="Pour ceux qui souhaitent une prise en charge complète et sans stress."
            features={premiumFeatures}
            isFeatured={true}
            planId="premium" // ID pour le backend
          />
        </div>

        <div className="max-w-4xl mx-auto mt-12 p-6 bg-yellow-50 border-l-4 border-yellow-400 text-yellow-800 rounded-r-lg" role="alert">
          <h4 className="font-bold text-lg mb-3">⚠️ Frais officiels obligatoires à prévoir (non inclus dans nos formules)</h4>
          <ul className="list-none space-y-2 text-sm">
            <li>• <strong>Attestation d'hébergement en mairie</strong> (timbre fiscal) → 30 €</li>
            <li>• <strong>Frais TLS Contact</strong> (centre de dépôt) → ≈ 30 €</li>
            <li>• <strong>Frais de visa Schengen</strong> → ≈ 90 €</li>
            <li>• <strong>Assurance voyage/médicale Schengen</strong> obligatoire → ≈ 30 à 60 €</li>
          </ul>
        </div>

        <div className="max-w-4xl mx-auto mt-6 p-6 bg-blue-50 border-l-4 border-brand-blue text-gray-800 rounded-r-lg" role="alert">
          <h4 className="font-bold text-lg mb-3 text-brand-blue">📌 Mention importante</h4>
          <p className="text-sm mb-2">
            <strong>VisaConnect n'est pas responsable de la décision finale du consulat ou de l'ambassade.</strong>
          </p>
          <p className="text-sm">
            Notre engagement porte uniquement sur la qualité de l'accompagnement et la préparation optimale de votre dossier. 
            Nous mettons tout en œuvre pour maximiser vos chances de succès, mais la décision d'octroyer ou non le visa 
            reste à la seule discrétion des autorités consulaires françaises.
          </p>
        </div>

      </div>
    </section>
  );
};

export default Services;