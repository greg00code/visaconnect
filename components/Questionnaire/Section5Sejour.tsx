import React from 'react';
import { FormData } from '../../pages/Questionnaire';

interface Props {
  formData: FormData;
  updateFormData: (section: keyof FormData, data: any) => void;
}

const Section5Sejour: React.FC<Props> = ({ formData, updateFormData }) => {
  const handleChange = (field: string, value: any) => {
    updateFormData('sejour', { [field]: value });
  };

  // Calculer automatiquement le nombre de jours
  const calculateDays = () => {
    if (formData.sejour?.dateDepart && formData.sejour?.dateRetour) {
      const depart = new Date(formData.sejour.dateDepart);
      const retour = new Date(formData.sejour.dateRetour);
      const diffTime = Math.abs(retour.getTime() - depart.getTime());
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1; // +1 pour inclure le jour de départ
      
      if (diffDays > 0 && diffDays <= 90) {
        handleChange('nombreJours', diffDays.toString());
      }
    }
  };

  const handleDateChange = (field: string, value: string) => {
    handleChange(field, value);
    // Recalculer les jours après changement de date
    setTimeout(calculateDays, 0);
  };

  return (
    <div className="space-y-6">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-blue-800 mb-2">✈️ Séjour prévu en France</h2>
        <p className="text-gray-600">Détails sur le voyage et l'hébergement prévu</p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <label className="block text-gray-700 font-medium mb-2">
            Date de départ de Thaïlande <span className="text-red-500">*</span>
          </label>
          <input
            type="date"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            value={formData.sejour?.dateDepart || ''}
            onChange={(e) => handleDateChange('dateDepart', e.target.value)}
            min={new Date().toISOString().split('T')[0]} // Pas de date dans le passé
            required
          />
        </div>

        <div>
          <label className="block text-gray-700 font-medium mb-2">
            Date de retour en Thaïlande <span className="text-red-500">*</span>
          </label>
          <input
            type="date"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            value={formData.sejour?.dateRetour || ''}
            onChange={(e) => handleDateChange('dateRetour', e.target.value)}
            min={formData.sejour?.dateDepart || new Date().toISOString().split('T')[0]}
            required
          />
        </div>

        <div>
          <label className="block text-gray-700 font-medium mb-2">
            Durée du séjour (jours)
          </label>
          <input
            type="text"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-50 cursor-not-allowed"
            value={formData.sejour?.nombreJours || ''}
            readOnly
            placeholder="Calculé automatiquement"
          />
          {formData.sejour?.nombreJours && parseInt(formData.sejour.nombreJours) > 90 && (
            <p className="text-red-600 text-sm mt-1">
              ⚠️ Le séjour ne peut pas dépasser 90 jours pour un visa Schengen court séjour
            </p>
          )}
        </div>

        <div className="md:col-span-2">
          <label className="flex items-center font-medium text-gray-800">
            <input
              type="checkbox"
              checked={formData.sejour?.chezGarant === true}
              onChange={(e) => handleChange('chezGarant', e.target.checked)}
              className="mr-3 w-5 h-5 text-blue-600 rounded focus:ring-blue-500"
            />
            <span>Hébergement chez le garant/hébergeant déclaré</span>
          </label>
          <p className="text-gray-600 text-sm mt-2 ml-8">
            Cochez si la demandeuse sera hébergée à l'adresse déclarée dans la section 1
          </p>
        </div>

        {!formData.sejour?.chezGarant && (
          <div className="md:col-span-2">
            <label className="block text-gray-700 font-medium mb-2">
              Détails de l'hébergement prévu <span className="text-red-500">*</span>
            </label>
            <textarea
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              rows={4}
              value={formData.sejour?.hebergementPrevu || ''}
              onChange={(e) => handleChange('hebergementPrevu', e.target.value)}
              placeholder="Adresse de l'hébergement, type (hôtel, location, famille), réservations effectuées..."
              required
            />
          </div>
        )}
      </div>

      <div className="border-t pt-6">
        <h3 className="text-lg font-bold text-gray-800 mb-4">🗓️ Programme du séjour</h3>
        <p className="text-gray-600 mb-4">
          Un programme détaillé jour par jour sera préparé dans le cadre de notre service
        </p>
        
        <div className="bg-green-50 border-l-4 border-green-400 p-4">
          <p className="text-green-800 font-medium">
            ✅ Nous nous occupons de :
          </p>
          <ul className="text-green-700 text-sm mt-2 list-disc list-inside">
            <li>Créer un itinéraire détaillé et cohérent</li>
            <li>Préparer les justificatifs de visites touristiques</li>
            <li>Établir un budget prévisionnel réaliste</li>
            <li>Rédiger une lettre d'invitation conforme</li>
          </ul>
        </div>
      </div>

      <div className="bg-blue-50 border-l-4 border-blue-400 p-4 mt-6">
        <p className="text-blue-800 font-medium">
          📁 Documents de voyage à prévoir
        </p>
        <ul className="text-blue-700 text-sm mt-2 list-disc list-inside">
          <li>Réservation de vol (nous pouvons vous conseiller)</li>
          <li>Assurance voyage couvrant 30.000€ minimum</li>
          <li>Attestation d'hébergement (nous la préparons)</li>
          <li>Programme de séjour (nous le créons)</li>
        </ul>
      </div>

      <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4">
        <p className="text-yellow-800 font-medium">
          ⚠️ Important pour les dates
        </p>
        <p className="text-yellow-700 text-sm mt-2">
          Prévoyez de déposer le dossier au moins 3-4 semaines avant la date de départ souhaitée. 
          Les délais consulaires sont généralement de 15 jours ouvrés.
        </p>
      </div>
    </div>
  );
};

export default Section5Sejour;