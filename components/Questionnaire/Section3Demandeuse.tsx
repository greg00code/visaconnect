import React from 'react';
import { FormData } from '../../pages/Questionnaire';

interface Props {
  formData: FormData;
  updateFormData: (section: keyof FormData, data: any) => void;
}

const Section3Demandeuse: React.FC<Props> = ({ formData, updateFormData }) => {
  const handleChange = (field: string, value: any) => {
    updateFormData('demandeuse', { [field]: value });
  };

  return (
    <div className="space-y-6">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-blue-800 mb-2">👩 Demandeuse de visa</h2>
        <p className="text-gray-600">Informations sur la personne qui demande le visa depuis la Thaïlande</p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <label className="block text-gray-700 font-medium mb-2">
            Nom complet <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            value={formData.demandeuse?.nomComplet || ''}
            onChange={(e) => handleChange('nomComplet', e.target.value)}
            placeholder="Tel qu'inscrit sur le passeport"
            required
          />
        </div>

        <div>
          <label className="block text-gray-700 font-medium mb-2">
            Date de naissance <span className="text-red-500">*</span>
          </label>
          <input
            type="date"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            value={formData.demandeuse?.dateNaissance || ''}
            onChange={(e) => handleChange('dateNaissance', e.target.value)}
            required
          />
        </div>

        <div>
          <label className="block text-gray-700 font-medium mb-2">
            Nationalité <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            value={formData.demandeuse?.nationalite || 'Thaïlandaise'}
            onChange={(e) => handleChange('nationalite', e.target.value)}
            required
          />
        </div>

        <div>
          <label className="block text-gray-700 font-medium mb-2">
            Numéro de passeport <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            value={formData.demandeuse?.numeroPasseport || ''}
            onChange={(e) => handleChange('numeroPasseport', e.target.value)}
            placeholder="AA1234567"
            required
          />
        </div>

        <div className="md:col-span-2">
          <label className="block text-gray-700 font-medium mb-2">
            Adresse actuelle en Thaïlande <span className="text-red-500">*</span>
          </label>
          <textarea
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            rows={3}
            value={formData.demandeuse?.adresseActuelle || ''}
            onChange={(e) => handleChange('adresseActuelle', e.target.value)}
            placeholder="Numéro, rue, district, province, code postal"
            required
          />
        </div>

        <div>
          <label className="block text-gray-700 font-medium mb-2">
            Numéro de téléphone <span className="text-red-500">*</span>
          </label>
          <input
            type="tel"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            value={formData.demandeuse?.telephone || ''}
            onChange={(e) => handleChange('telephone', e.target.value)}
            placeholder="+66 XX XXX XXXX"
            required
          />
        </div>

        <div>
          <label className="block text-gray-700 font-medium mb-2">
            Adresse e-mail <span className="text-red-500">*</span>
          </label>
          <input
            type="email"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            value={formData.demandeuse?.email || ''}
            onChange={(e) => handleChange('email', e.target.value)}
            required
          />
        </div>
      </div>

      <div className="border-t pt-6">
        <h3 className="text-lg font-bold text-gray-800 mb-4">💼 Situation professionnelle</h3>
        
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Profession / Statut <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={formData.demandeuse?.professionStatut || ''}
              onChange={(e) => handleChange('professionStatut', e.target.value)}
              placeholder="Employée, Étudiante, Sans emploi, etc."
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Lieu de travail ou d'étude
            </label>
            <input
              type="text"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={formData.demandeuse?.lieuTravailEtude || ''}
              onChange={(e) => handleChange('lieuTravailEtude', e.target.value)}
              placeholder="Nom de l'entreprise ou de l'établissement"
            />
          </div>
        </div>
      </div>

      <div className="border-t pt-6">
        <h3 className="text-lg font-bold text-gray-800 mb-4">👨‍👩‍👧‍👦 Situation familiale</h3>
        
        <div className="space-y-4">
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              État civil <span className="text-red-500">*</span>
            </label>
            <div className="space-y-2">
              {[
                { value: 'mariee', label: 'Mariée' },
                { value: 'celibataire', label: 'Célibataire' },
                { value: 'veuve', label: 'Veuve' },
                { value: 'divorcee', label: 'Divorcée' }
              ].map((status) => (
                <label key={status.value} className="flex items-center">
                  <input
                    type="radio"
                    name="etatCivil"
                    value={status.value}
                    checked={formData.demandeuse?.etatCivil === status.value}
                    onChange={(e) => handleChange('etatCivil', e.target.value)}
                    className="mr-3 text-blue-600 focus:ring-blue-500"
                  />
                  <span className="text-gray-700">{status.label}</span>
                </label>
              ))}
            </div>
          </div>

          <div>
            <label className="flex items-center font-medium text-gray-800">
              <input
                type="checkbox"
                checked={formData.demandeuse?.aEnfants === true}
                onChange={(e) => handleChange('aEnfants', e.target.checked)}
                className="mr-3 w-5 h-5 text-blue-600 rounded focus:ring-blue-500"
              />
              <span>A des enfants</span>
            </label>
          </div>

          {formData.demandeuse?.aEnfants && (
            <div className="ml-8 space-y-4">
              <div>
                <label className="block text-gray-700 font-medium mb-2">
                  Nombre d'enfants <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  value={formData.demandeuse?.nombreEnfants || ''}
                  onChange={(e) => handleChange('nombreEnfants', e.target.value)}
                  min="1"
                  required
                />
              </div>

              <div>
                <label className="block text-gray-700 font-medium mb-2">
                  Âges des enfants <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  value={formData.demandeuse?.agesEnfants || ''}
                  onChange={(e) => handleChange('agesEnfants', e.target.value)}
                  placeholder="Ex: 5 ans, 8 ans"
                  required
                />
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="border-t pt-6">
        <h3 className="text-lg font-bold text-gray-800 mb-4">✈️ Historique de voyage</h3>
        
        <div className="space-y-4">
          <div>
            <label className="flex items-center font-medium text-gray-800">
              <input
                type="checkbox"
                checked={formData.demandeuse?.aVoyageEurope === true}
                onChange={(e) => handleChange('aVoyageEurope', e.target.checked)}
                className="mr-3 w-5 h-5 text-blue-600 rounded focus:ring-blue-500"
              />
              <span>A déjà voyagé en Europe</span>
            </label>
          </div>

          {formData.demandeuse?.aVoyageEurope && (
            <div className="ml-8">
              <label className="block text-gray-700 font-medium mb-2">
                Détails des voyages précédents <span className="text-red-500">*</span>
              </label>
              <textarea
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                rows={3}
                value={formData.demandeuse?.detailsVoyage || ''}
                onChange={(e) => handleChange('detailsVoyage', e.target.value)}
                placeholder="Pays visités, dates, type de visa obtenu..."
                required
              />
            </div>
          )}

          <div className="pt-4">
            <label className="flex items-center font-medium text-gray-800">
              <input
                type="checkbox"
                checked={formData.demandeuse?.aRefusVisa === true}
                onChange={(e) => handleChange('aRefusVisa', e.target.checked)}
                className="mr-3 w-5 h-5 text-red-600 rounded focus:ring-red-500"
              />
              <span className="text-red-800">A déjà eu un refus de visa</span>
            </label>
          </div>

          {formData.demandeuse?.aRefusVisa && (
            <div className="ml-8 space-y-4 p-4 bg-red-50 rounded-lg">
              <div>
                <label className="block text-gray-700 font-medium mb-2">
                  Date du refus <span className="text-red-500">*</span>
                </label>
                <input
                  type="date"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  value={formData.demandeuse?.dateRefus || ''}
                  onChange={(e) => handleChange('dateRefus', e.target.value)}
                  required
                />
              </div>

              <div>
                <label className="block text-gray-700 font-medium mb-2">
                  Motif du refus <span className="text-red-500">*</span>
                </label>
                <textarea
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  rows={3}
                  value={formData.demandeuse?.motifRefus || ''}
                  onChange={(e) => handleChange('motifRefus', e.target.value)}
                  placeholder="Indiquez le motif du refus tel qu'indiqué dans la lettre de refus"
                  required
                />
              </div>

              <div className="bg-yellow-50 border-l-4 border-yellow-400 p-3">
                <p className="text-yellow-800 text-sm">
                  ⚠️ Un refus antérieur ne signifie pas automatiquement un nouveau refus. 
                  Nous saurons préparer votre dossier pour maximiser vos chances.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="bg-blue-50 border-l-4 border-blue-400 p-4 mt-6">
        <p className="text-blue-800 font-medium">
          📁 Documents de la demandeuse à prévoir
        </p>
        <ul className="text-blue-700 text-sm mt-2 list-disc list-inside">
          <li>Passeport valide (minimum 6 mois)</li>
          <li>Photos d'identité aux normes Schengen</li>
          <li>Certificat de travail ou attestation d'études</li>
          <li>Relevés bancaires des 3 derniers mois</li>
        </ul>
      </div>
    </div>
  );
};

export default Section3Demandeuse;