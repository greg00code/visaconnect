import React from 'react';

const PolitiqueConfidentialite: React.FC = () => {
  return (
    <div className="prose max-w-none">
      <p className="text-gray-600 mb-6">Dernière mise à jour : 4 septembre 2025</p>

      <section className="mb-8">
        <h3 className="text-xl font-bold text-brand-blue mb-4">1. Responsable du traitement</h3>
        <p className="mb-4">Le traitement des données personnelles est effectué par :</p>
        <div className="bg-gray-50 p-4 rounded-lg">
          <p>
            <strong>gregnocode – Entrepreneur individuel</strong><br/>
            24 rue des Mourgues, 13380 Plan-de-Cuques, France<br/>
            Responsable de publication : Gregory Marcopoulos<br/>
            Contact : <a href="mailto:contact@visaconnect.fr" className="text-brand-blue hover:underline">contact@visaconnect.fr</a>
          </p>
        </div>
      </section>

      <section className="mb-8">
        <h3 className="text-xl font-bold text-brand-blue mb-4">2. Données collectées</h3>
        <p className="mb-3">Dans le cadre de la constitution et du suivi des dossiers de demande de visa Schengen, VisaConnect peut collecter les catégories de données suivantes :</p>
        <ul className="list-disc pl-6 space-y-2">
          <li>Données d'identification (nom, prénom, date de naissance, nationalité)</li>
          <li>Données de contact (adresse postale, email, téléphone)</li>
          <li>Données administratives et justificatifs (passeport, justificatifs de domicile, attestations, relevés bancaires, contrats de travail, assurances…)</li>
          <li>Données relatives à la situation familiale et professionnelle nécessaires au traitement du dossier</li>
          <li>Données de facturation et de paiement</li>
        </ul>
      </section>

      <section className="mb-8">
        <h3 className="text-xl font-bold text-brand-blue mb-4">3. Finalités et base légale</h3>
        <p className="mb-3">Les données sont collectées pour :</p>
        <ul className="list-disc pl-6 space-y-2 mb-4">
          <li>Constituer, gérer et suivre les dossiers de demande de visa</li>
          <li>Communiquer avec le client et les autorités compétentes si nécessaire</li>
          <li>Assurer la facturation et la comptabilité</li>
          <li>Améliorer les services proposés</li>
        </ul>
        <p>Base légale du traitement : exécution du contrat, respect des obligations légales et intérêt légitime (gestion de la relation client).</p>
      </section>

      <section className="mb-8">
        <h3 className="text-xl font-bold text-brand-blue mb-4">4. Stockage et destinataires des données</h3>
        <p>
          Les données personnelles et documents transmis par les clients ne sont <strong>pas stockés sur le site VisaConnect.fr</strong>.<br/>
          Ils sont déposés dans un <strong>dossier Google Drive partagé avec le client</strong>, dont l'accès est limité au client et à l'éditeur (gregnocode).<br/>
          Les données ne sont jamais transmises à des tiers, sauf aux autorités consulaires concernées, uniquement dans le cadre de la constitution du dossier.
        </p>
      </section>

      <section className="mb-8">
        <h3 className="text-xl font-bold text-brand-blue mb-4">5. Transferts hors Union européenne</h3>
        <p>
          Les fichiers sont stockés sur Google Drive, un service fourni par Google Ireland Limited.<br/>
          Des transferts hors UE (vers les États-Unis) peuvent avoir lieu. Ils sont encadrés par les <strong>clauses contractuelles types de la Commission européenne</strong> mises en place par Google afin d'assurer la protection des données.
        </p>
      </section>

      <section className="mb-8">
        <h3 className="text-xl font-bold text-brand-blue mb-4">6. Sécurité des données</h3>
        <p>
          Les dossiers sont accessibles uniquement par lien privé et gestion des droits de partage. L'éditeur met en œuvre toutes les mesures techniques raisonnables (gestion d'accès restreint, authentification Google, chiffrement Google Drive) pour protéger les données contre la perte ou l'accès non autorisé.
        </p>
      </section>

      <section className="mb-8">
        <h3 className="text-xl font-bold text-brand-blue mb-4">7. Durée de conservation et contrôle du client</h3>
        <p className="mb-3">
          Les données sont conservées uniquement le temps nécessaire à l'accompagnement et à la finalisation du dossier.<br/>
          À l'issue de la prestation :
        </p>
        <ul className="list-disc pl-6 space-y-2 mb-4">
          <li>le client garde la maîtrise totale du dossier Google Drive partagé,</li>
          <li>il peut supprimer les fichiers à tout moment,</li>
          <li>aucune copie des documents n'est conservée par l'éditeur sans l'accord explicite du client.</li>
        </ul>
        <p>Certaines données administratives et pièces comptables peuvent être archivées séparément pour une durée légale maximale de 10 ans.</p>
      </section>

      <section className="mb-8">
        <h3 className="text-xl font-bold text-brand-blue mb-4">8. Droits des personnes</h3>
        <p className="mb-3">Conformément au RGPD et à la loi Informatique et Libertés, vous disposez des droits suivants :</p>
        <ul className="list-disc pl-6 space-y-2 mb-4">
          <li>Droit d'accès et d'information</li>
          <li>Droit de rectification</li>
          <li>Droit à l'effacement (droit à l'oubli)</li>
          <li>Droit à la limitation du traitement</li>
          <li>Droit d'opposition</li>
          <li>Droit à la portabilité des données</li>
        </ul>
        <p>
          Pour exercer vos droits, contactez : <a href="mailto:contact@visaconnect.fr" className="text-brand-blue hover:underline">contact@visaconnect.fr</a>.<br/>
          En cas de difficulté, vous pouvez saisir la <a href="https://www.cnil.fr" className="text-brand-blue hover:underline" rel="noopener">CNIL</a>.
        </p>
      </section>

      <section className="mb-8">
        <h3 className="text-xl font-bold text-brand-blue mb-4">9. Cookies</h3>
        <p>
          Le site ne stocke aucune donnée personnelle et n'héberge pas de documents.<br/>
          Seuls des cookies techniques ou statistiques anonymisés peuvent être utilisés. Vous pouvez configurer votre navigateur pour les accepter ou les refuser.
        </p>
      </section>

      <section className="mb-8">
        <h3 className="text-xl font-bold text-brand-blue mb-4">10. Mise à jour</h3>
        <p>
          La présente politique pourra être mise à jour en fonction de l'évolution des services, des obligations légales ou des recommandations de la CNIL. La date de la dernière mise à jour figure en haut de cette page.
        </p>
      </section>

      <hr className="my-6 border-gray-300" />

      <p className="text-sm text-gray-600">© {new Date().getFullYear()} VisaConnect – Tous droits réservés.</p>
    </div>
  );
};

export default PolitiqueConfidentialite;