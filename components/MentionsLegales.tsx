import React from 'react';

const MentionsLegales: React.FC = () => {
  return (
    <div className="prose max-w-none">
      <p className="text-gray-600 mb-6">Dernière mise à jour : 4 septembre 2025</p>

      <section className="mb-8">
        <h3 className="text-xl font-bold text-brand-blue mb-4">Éditeur du site</h3>
        <div className="bg-gray-50 p-4 rounded-lg">
          <p><strong>Site :</strong> <a href="https://visaconnect.fr" className="text-brand-blue hover:underline">visaconnect.fr</a></p>
          <p><strong>Raison sociale :</strong> gregnocode — Entrepreneur individuel (EI)</p>
          <p><strong>Responsable de la publication :</strong> Gregory Marcopoulos</p>
          <p><strong>Contact :</strong> <a href="mailto:contact@visaconnect.fr" className="text-brand-blue hover:underline">contact@visaconnect.fr</a></p>
          <p><strong>Adresse :</strong> 24 rue des Mourgues, 13380 Plan-de-Cuques, France</p>
          <p><strong>SIREN :</strong> 412 113 144 | <strong>SIRET :</strong> 412 113 144 00023</p>
          <p><strong>TVA intracommunautaire :</strong> Non applicable</p>
        </div>
        <p className="text-sm text-gray-600 mt-3 p-3 border-l-4 border-gray-400 bg-gray-50">
          Conformément à la loi (LCEN), l'éditeur et l'hébergeur doivent être identifiables. Les informations ci-dessus répondent à cette obligation.
        </p>
      </section>

      <section className="mb-8">
        <h3 className="text-xl font-bold text-brand-blue mb-4">Hébergement</h3>
        <div className="bg-gray-50 p-4 rounded-lg">
          <p><strong>Prestataire :</strong> Firebase Hosting (Google Ireland Limited)</p>
          <p><strong>Adresse :</strong> Gordon House, Barrow Street, Dublin 4, Ireland</p>
          <p><strong>Site :</strong> <a href="https://firebase.google.com/docs/hosting" className="text-brand-blue hover:underline" rel="noopener">firebase.google.com/docs/hosting</a></p>
          <p className="text-sm text-gray-600 mt-2">Support assuré en ligne via la documentation et le centre d'aide Google.</p>
        </div>
      </section>

      <section className="mb-8">
        <h3 className="text-xl font-bold text-brand-blue mb-4">Propriété intellectuelle</h3>
        <p>L'ensemble des éléments présents sur le site <em>VisaConnect.fr</em> (textes, visuels, logos, vidéos, icônes, mises en page, bases de données, etc.) est protégé par le droit de la propriété intellectuelle. Sauf mention contraire, ces contenus sont la propriété de Gregory Marcopoulos. Toute reproduction, représentation, modification ou adaptation, totale ou partielle, est interdite sans autorisation écrite préalable.</p>
      </section>

      <section className="mb-8">
        <h3 className="text-xl font-bold text-brand-blue mb-4">Données personnelles</h3>
        <p className="mb-3">Les données collectées via les formulaires (contact, demande d'évaluation, etc.) sont utilisées pour instruire et répondre aux demandes. La base légale du traitement est l'exécution de mesures précontractuelles et l'intérêt légitime de gestion des sollicitations.</p>
        <ul className="list-disc pl-6 space-y-2">
          <li><strong>Responsable de traitement :</strong> gregnocode (EI)</li>
          <li><strong>Finalités :</strong> gestion des demandes, suivi commercial, amélioration du service</li>
          <li><strong>Destinataires :</strong> personnel habilité de l'éditeur et prestataires techniques (hébergement/outil de messagerie)</li>
          <li><strong>Durée de conservation :</strong> 3 ans à compter du dernier contact</li>
          <li><strong>Vos droits :</strong> accès, rectification, effacement, opposition, limitation, portabilité</li>
        </ul>
        <p className="mt-3">Pour exercer vos droits, contactez <a href="mailto:contact@visaconnect.fr" className="text-brand-blue hover:underline">contact@visaconnect.fr</a>. Si vous estimez, après nous avoir contactés, que vos droits ne sont pas respectés, vous pouvez saisir la CNIL.</p>
      </section>

      <section className="mb-8">
        <h3 className="text-xl font-bold text-brand-blue mb-4">Cookies</h3>
        <p>Le site peut utiliser des cookies techniques et de mesure d'audience. Vous pouvez les refuser ou les paramétrer via votre navigateur. Si une solution de consentement (bandeau) est déployée, vos choix y sont rappelés.</p>
      </section>

      <section className="mb-8">
        <h3 className="text-xl font-bold text-brand-blue mb-4">Liens hypertextes</h3>
        <p>Des liens vers des sites tiers peuvent être proposés. L'éditeur n'exerce aucun contrôle sur ces ressources et décline toute responsabilité quant à leur contenu.</p>
      </section>

      <section className="mb-8">
        <h3 className="text-xl font-bold text-brand-blue mb-4">Responsabilité</h3>
        <p>L'éditeur met tout en œuvre pour assurer l'exactitude et la mise à jour des informations publiées. Il ne saurait toutefois être tenu responsable d'éventuelles erreurs, omissions ou indisponibilités temporaires du service.</p>
      </section>

      <hr className="my-6 border-gray-300" />

      <p className="text-sm text-gray-600">© {new Date().getFullYear()} VisaConnect – Tous droits réservés.</p>
    </div>
  );
};

export default MentionsLegales;