import React from 'react';
import { FormData } from '../../pages/Questionnaire';

interface Props {
  formData: FormData;
  updateFormData: (section: keyof FormData, data: any) => void;
}

const Section4Relation: React.FC<Props> = ({ formData, updateFormData }) => {
  const handleChange = (field: string, value: any) => {
    updateFormData('relation', { [field]: value });
  };

  return (
    <div className="space-y-6">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-blue-800 mb-2">💑 Relation et historique</h2>
        <p className="text-gray-600">Détails sur votre relation et vos moments partagés</p>
      </div>

      <div className="space-y-6">
        <div>
          <label className="block text-gray-700 font-medium mb-2">
            Depuis combien de temps êtes-vous ensemble ? <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            value={formData.relation?.duree || ''}
            onChange={(e) => handleChange('duree', e.target.value)}
            placeholder="Ex: 2 ans et 6 mois"
            required
          />
        </div>

        <div>
          <label className="block text-gray-700 font-medium mb-2">
            Comment vous êtes-vous rencontrés ? <span className="text-red-500">*</span>
          </label>
          <textarea
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            rows={4}
            value={formData.relation?.rencontre || ''}
            onChange={(e) => handleChange('rencontre', e.target.value)}
            placeholder="Décrivez les circonstances de votre rencontre (lieu, date, contexte...)"
            required
          />
        </div>

        <div>
          <label className="flex items-center font-medium text-gray-800">
            <input
              type="checkbox"
              checked={formData.relation?.voyagesEnsemble === true}
              onChange={(e) => handleChange('voyagesEnsemble', e.target.checked)}
              className="mr-3 w-5 h-5 text-blue-600 rounded focus:ring-blue-500"
            />
            <span>Avez-vous déjà voyagé ensemble ?</span>
          </label>
        </div>

        {formData.relation?.voyagesEnsemble && (
          <div className="ml-8">
            <label className="block text-gray-700 font-medium mb-2">
              Détails des voyages effectués ensemble <span className="text-red-500">*</span>
            </label>
            <textarea
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              rows={4}
              value={formData.relation?.detailsVoyages || ''}
              onChange={(e) => handleChange('detailsVoyages', e.target.value)}
              placeholder="Listez les pays visités, les dates et la durée de chaque voyage"
              required
            />
          </div>
        )}

        <div>
          <label className="block text-gray-700 font-medium mb-2">
            Preuves de votre relation <span className="text-red-500">*</span>
          </label>
          <textarea
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            rows={4}
            value={formData.relation?.preuves || ''}
            onChange={(e) => handleChange('preuves', e.target.value)}
            placeholder="Décrivez les preuves que vous pouvez fournir (photos ensemble, conversations, billets d'avion, réservations d'hôtel, envois d'argent, etc.)"
            required
          />
          <p className="text-gray-600 text-sm mt-2">
            Ces éléments seront à joindre dans le dossier Google Drive partagé
          </p>
        </div>
      </div>

      <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mt-6">
        <p className="text-yellow-800 font-medium">
          💡 Conseils pour les preuves de relation
        </p>
        <ul className="text-yellow-700 text-sm mt-2 list-disc list-inside">
          <li>Photos ensemble à différentes périodes et lieux</li>
          <li>Captures d'écran de conversations régulières</li>
          <li>Billets d'avion et tampons de passeport</li>
          <li>Réservations d'hôtel communes</li>
          <li>Preuves de soutien financier (Western Union, virements)</li>
          <li>Cartes postales ou lettres échangées</li>
        </ul>
      </div>

      <div className="bg-blue-50 border-l-4 border-blue-400 p-4">
        <p className="text-blue-800 font-medium">
          📸 Préparation des photos
        </p>
        <p className="text-blue-700 text-sm mt-2">
          Sélectionnez 10-15 photos représentatives de votre relation, montrant différents moments et lieux. 
          Privilégiez la qualité et la diversité plutôt que la quantité.
        </p>
      </div>
    </div>
  );
};

export default Section4Relation;