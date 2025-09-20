import React from 'react';
import { FormData } from '../../pages/Questionnaire';

interface Props {
  formData: FormData;
  updateFormData: (section: keyof FormData, data: any) => void;
}

const Section6Retour: React.FC<Props> = ({ formData, updateFormData }) => {
  const handleChange = (field: string, value: any) => {
    updateFormData('retour', { [field]: value });
  };

  const handleTypeChange = (type: 'travail' | 'etudes' | 'famille') => {
    // Réinitialiser les champs spécifiques lors du changement de type
    updateFormData('retour', { 
      type,
      // Réinitialiser tous les champs
      posteOccupe: '',
      nomEntreprise: '',
      adresseEntreprise: '',
      dateReprise: '',
      niveauEtude: '',
      nomEtablissement: '',
      villeEtablissement: '',
      calendrierExamen: false,
      quiDepend: '',
      natureResponsabilite: ''
    });
  };

  return (
    <div className="space-y-6">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-blue-800 mb-2">🔄 Justificatifs de retour</h2>
        <p className="text-gray-600">Éléments garantissant le retour en Thaïlande après le séjour</p>
      </div>

      <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-6">
        <p className="text-yellow-800 font-medium">
          ⚠️ Section cruciale pour l'obtention du visa
        </p>
        <p className="text-yellow-700 text-sm mt-2">
          Les garanties de retour sont essentielles pour démontrer que la demandeuse reviendra en Thaïlande après son séjour.
        </p>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-gray-700 font-medium mb-3">
            Type de justificatif principal <span className="text-red-500">*</span>
          </label>
          <div className="space-y-3">
            <label className="flex items-start p-4 border rounded-lg hover:bg-gray-50 cursor-pointer">
              <input
                type="radio"
                name="typeRetour"
                value="travail"
                checked={formData.retour?.type === 'travail'}
                onChange={() => handleTypeChange('travail')}
                className="mt-1 mr-3 text-blue-600 focus:ring-blue-500"
              />
              <div>
                <span className="font-medium text-gray-800">💼 Obligations professionnelles</span>
                <p className="text-gray-600 text-sm mt-1">Contrat de travail, entreprise, commerce</p>
              </div>
            </label>

            <label className="flex items-start p-4 border rounded-lg hover:bg-gray-50 cursor-pointer">
              <input
                type="radio"
                name="typeRetour"
                value="etudes"
                checked={formData.retour?.type === 'etudes'}
                onChange={() => handleTypeChange('etudes')}
                className="mt-1 mr-3 text-blue-600 focus:ring-blue-500"
              />
              <div>
                <span className="font-medium text-gray-800">📚 Obligations académiques</span>
                <p className="text-gray-600 text-sm mt-1">Études en cours, examens à passer</p>
              </div>
            </label>

            <label className="flex items-start p-4 border rounded-lg hover:bg-gray-50 cursor-pointer">
              <input
                type="radio"
                name="typeRetour"
                value="famille"
                checked={formData.retour?.type === 'famille'}
                onChange={() => handleTypeChange('famille')}
                className="mt-1 mr-3 text-blue-600 focus:ring-blue-500"
              />
              <div>
                <span className="font-medium text-gray-800">👨‍👩‍👧‍👦 Obligations familiales</span>
                <p className="text-gray-600 text-sm mt-1">Enfants, parents âgés, responsabilités familiales</p>
              </div>
            </label>
          </div>
        </div>

        {/* Section Travail */}
        {formData.retour?.type === 'travail' && (
          <div className="bg-gray-50 p-6 rounded-lg space-y-4">
            <h3 className="text-lg font-bold text-gray-800 mb-4">💼 Détails professionnels</h3>
            
            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Poste occupé <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={formData.retour?.posteOccupe || ''}
                onChange={(e) => handleChange('posteOccupe', e.target.value)}
                placeholder="Ex: Comptable, Vendeuse, Manager..."
                required
              />
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Nom de l'entreprise <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={formData.retour?.nomEntreprise || ''}
                onChange={(e) => handleChange('nomEntreprise', e.target.value)}
                required
              />
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Adresse de l'entreprise <span className="text-red-500">*</span>
              </label>
              <textarea
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                rows={3}
                value={formData.retour?.adresseEntreprise || ''}
                onChange={(e) => handleChange('adresseEntreprise', e.target.value)}
                placeholder="Adresse complète de l'entreprise"
                required
              />
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Date de reprise du travail <span className="text-red-500">*</span>
              </label>
              <input
                type="date"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={formData.retour?.dateReprise || ''}
                onChange={(e) => handleChange('dateReprise', e.target.value)}
                min={formData.sejour?.dateRetour || new Date().toISOString().split('T')[0]}
                required
              />
            </div>

            <div className="bg-blue-50 border-l-4 border-blue-400 p-4">
              <p className="text-blue-800 font-medium">📄 Documents à fournir</p>
              <ul className="text-blue-700 text-sm mt-2 list-disc list-inside">
                <li>Contrat de travail</li>
                <li>Attestation de l'employeur avec dates de congés</li>
                <li>3 dernières fiches de paie</li>
                <li>Certificat d'inscription au registre de commerce (si applicable)</li>
              </ul>
            </div>
          </div>
        )}

        {/* Section Études */}
        {formData.retour?.type === 'etudes' && (
          <div className="bg-gray-50 p-6 rounded-lg space-y-4">
            <h3 className="text-lg font-bold text-gray-800 mb-4">📚 Détails académiques</h3>
            
            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Niveau d'étude actuel <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={formData.retour?.niveauEtude || ''}
                onChange={(e) => handleChange('niveauEtude', e.target.value)}
                placeholder="Ex: Licence 3ème année, Master 1..."
                required
              />
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Nom de l'établissement <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={formData.retour?.nomEtablissement || ''}
                onChange={(e) => handleChange('nomEtablissement', e.target.value)}
                placeholder="Université, école..."
                required
              />
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Ville de l'établissement <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={formData.retour?.villeEtablissement || ''}
                onChange={(e) => handleChange('villeEtablissement', e.target.value)}
                required
              />
            </div>

            <div>
              <label className="flex items-center font-medium text-gray-800">
                <input
                  type="checkbox"
                  checked={formData.retour?.calendrierExamen === true}
                  onChange={(e) => handleChange('calendrierExamen', e.target.checked)}
                  className="mr-3 w-5 h-5 text-blue-600 rounded focus:ring-blue-500"
                />
                <span>J'ai des examens prévus après mon retour</span>
              </label>
            </div>

            <div className="bg-blue-50 border-l-4 border-blue-400 p-4">
              <p className="text-blue-800 font-medium">📄 Documents à fournir</p>
              <ul className="text-blue-700 text-sm mt-2 list-disc list-inside">
                <li>Certificat de scolarité</li>
                <li>Calendrier académique</li>
                <li>Relevés de notes récents</li>
                <li>Attestation d'inscription pour l'année en cours</li>
              </ul>
            </div>
          </div>
        )}

        {/* Section Famille */}
        {formData.retour?.type === 'famille' && (
          <div className="bg-gray-50 p-6 rounded-lg space-y-4">
            <h3 className="text-lg font-bold text-gray-800 mb-4">👨‍👩‍👧‍👦 Responsabilités familiales</h3>
            
            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Qui dépend de vous ? <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={formData.retour?.quiDepend || ''}
                onChange={(e) => handleChange('quiDepend', e.target.value)}
                placeholder="Ex: 2 enfants (5 et 8 ans), Parents âgés..."
                required
              />
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Nature de vos responsabilités <span className="text-red-500">*</span>
              </label>
              <textarea
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                rows={4}
                value={formData.retour?.natureResponsabilite || ''}
                onChange={(e) => handleChange('natureResponsabilite', e.target.value)}
                placeholder="Décrivez vos responsabilités familiales (garde d'enfants, soins aux parents, gestion du foyer...)"
                required
              />
            </div>

            <div className="bg-blue-50 border-l-4 border-blue-400 p-4">
              <p className="text-blue-800 font-medium">📄 Documents à fournir</p>
              <ul className="text-blue-700 text-sm mt-2 list-disc list-inside">
                <li>Actes de naissance des enfants</li>
                <li>Certificats de scolarité des enfants</li>
                <li>Documents médicaux (si soins à prodiguer)</li>
                <li>Attestation de garde ou de responsabilité</li>
              </ul>
            </div>
          </div>
        )}
      </div>

      <div className="bg-green-50 border-l-4 border-green-400 p-4 mt-6">
        <p className="text-green-800 font-medium">
          ✅ Notre expertise pour renforcer votre dossier
        </p>
        <p className="text-green-700 text-sm mt-2">
          Nous savons comment présenter efficacement vos garanties de retour pour maximiser vos chances d'obtention du visa. 
          Chaque situation est unique et nous adaptons notre approche en conséquence.
        </p>
      </div>

      <div className="bg-gray-100 rounded-lg p-6 mt-6">
        <h3 className="text-lg font-bold text-gray-800 mb-3">📝 Notes complémentaires</h3>
        <p className="text-gray-600 text-sm mb-3">
          Ajoutez ici toute information supplémentaire qui pourrait être utile pour votre dossier
        </p>
        <textarea
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          rows={4}
          placeholder="Informations complémentaires, situations particulières, questions..."
          value={formData.retour?.notesComplementaires || ''}
          onChange={(e) => handleChange('notesComplementaires', e.target.value)}
        />
      </div>
    </div>
  );
};

export default Section6Retour;