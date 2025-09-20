import React from 'react';

const CGV: React.FC = () => {
  return (
    <div className="prose max-w-none">
      <p className="text-gray-600 mb-6">Dernière mise à jour : 4 septembre 2025</p>

      <section className="mb-8">
        <h3 className="text-xl font-bold text-brand-blue mb-4">1. Identification du vendeur</h3>
        <div className="bg-gray-50 p-4 rounded-lg">
          <p>
            <strong>Vendeur :</strong> gregnocode – Entrepreneur individuel<br/>
            24 rue des Mourgues, 13380 Plan-de-Cuques, France<br/>
            SIRET : 412 113 144 00023<br/>
            TVA intracommunautaire : non applicable<br/>
            Contact : <a href="mailto:contact@visaconnect.fr" className="text-brand-blue hover:underline">contact@visaconnect.fr</a>
          </p>
        </div>
      </section>

      <section className="mb-8">
        <h3 className="text-xl font-bold text-brand-blue mb-4">2. Objet</h3>
        <p className="mb-3">Les présentes Conditions Générales de Vente régissent les prestations de services proposées par VisaConnect.fr, consistant en :</p>
        <ul className="list-disc pl-6 space-y-2 mb-4">
          <li>Assistance et accompagnement administratif pour la préparation de dossiers de demande de visa Schengen (séjour court &lt; 90 jours).</li>
          <li>Vérification des pièces justificatives.</li>
          <li>Conseils personnalisés.</li>
          <li>Mise en forme et organisation des documents.</li>
          <li>Transmission du dossier finalisé au client pour dépôt auprès des autorités consulaires.</li>
        </ul>
        <p>VisaConnect.fr n'intervient pas dans la décision finale d'octroi du visa, qui relève exclusivement des autorités consulaires.</p>
      </section>

      <section className="mb-8">
        <h3 className="text-xl font-bold text-brand-blue mb-4">3. Offres et prix</h3>
        <p className="mb-3">Deux formules sont proposées :</p>
        <ul className="list-disc pl-6 space-y-2 mb-4">
          <li><strong>Pack Autonomie :</strong> 149 € TTC</li>
          <li><strong>Pack Sérénité :</strong> 449 € TTC</li>
        </ul>
        <p>Les prix sont exprimés en euros et sont fermes au moment de la commande. TVA non applicable (article 293 B du CGI).</p>
      </section>

      <section className="mb-8">
        <h3 className="text-xl font-bold text-brand-blue mb-4">4. Commande</h3>
        <p>
          La commande s'effectue exclusivement en ligne via le site <a href="https://visaconnect.fr" className="text-brand-blue hover:underline">VisaConnect.fr</a>.<br/>
          Toute commande validée entraîne acceptation pleine et entière des présentes CGV.
        </p>
      </section>

      <section className="mb-8">
        <h3 className="text-xl font-bold text-brand-blue mb-4">5. Paiement</h3>
        <p>Le règlement est effectué par carte bancaire via la plateforme <strong>Stripe</strong>. La commande n'est prise en compte qu'après validation effective du paiement.</p>
      </section>

      <section className="mb-8">
        <h3 className="text-xl font-bold text-brand-blue mb-4">6. Droit de rétractation et remboursement</h3>
        <p>
          Conformément au Code de la consommation, le client dispose d'un délai de rétractation de 14 jours à compter de la commande.<br/>
          Toutefois, dès lors que le <strong>dossier Google Drive est partagé et accessible</strong>, la prestation est réputée commencée et le client <strong>renonce expressément à son droit de rétractation</strong>.<br/>
          Aucun remboursement n'est possible une fois le dossier partagé.
        </p>
      </section>

      <section className="mb-8">
        <h3 className="text-xl font-bold text-brand-blue mb-4">7. Livraison de la prestation</h3>
        <p>
          Le livrable consiste en un dossier visa préparé et accessible dans un <strong>Google Drive partagé</strong>.<br/>
          Aucune livraison physique n'est prévue.<br/>
          Le client est seul responsable du dépôt du dossier auprès des autorités consulaires.
        </p>
      </section>

      <section className="mb-8">
        <h3 className="text-xl font-bold text-brand-blue mb-4">8. Responsabilité</h3>
        <p className="mb-3">
          VisaConnect.fr s'engage à accompagner le client dans la constitution de son dossier.<br/>
          La responsabilité de l'éditeur ne saurait être engagée concernant :
        </p>
        <ul className="list-disc pl-6 space-y-2">
          <li>la décision finale des autorités consulaires,</li>
          <li>le retard ou le refus d'un visa,</li>
          <li>l'exactitude des informations et documents fournis par le client.</li>
        </ul>
      </section>

      <section className="mb-8">
        <h3 className="text-xl font-bold text-brand-blue mb-4">9. Droit applicable et litiges</h3>
        <p>
          Les présentes CGV sont soumises au droit français.<br/>
          Tout litige sera porté devant les tribunaux compétents du ressort de la Cour d'appel de Marseille.<br/>
          Le client peut également recourir à la plateforme européenne de règlement en ligne des litiges :<br/>
          <a href="https://ec.europa.eu/consumers/odr" className="text-brand-blue hover:underline" target="_blank" rel="noopener">https://ec.europa.eu/consumers/odr</a>
        </p>
      </section>

      <hr className="my-6 border-gray-300" />

      <p className="text-sm text-gray-600">© {new Date().getFullYear()} VisaConnect – Tous droits réservés.</p>
    </div>
  );
};

export default CGV;