import React from 'react';
import { FormData } from '../../pages/Questionnaire';

interface Props {
  formData: FormData;
  updateFormData: (section: keyof FormData, data: any) => void;
}

const Section2Partenaire: React.FC<Props> = ({ formData, updateFormData }) => {
  const handleChange = (field: string, value: any) => {
    updateFormData('partenaire', { [field]: value });
  };

  // Cette section ne s'affiche que si l'utilisateur n'est pas le garant
  if (formData.isGarant) {
    return null;
  }

  return (
    <div className="space-y-6">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-blue-800 mb-2">👤 Partenaire / Garant financier</h2>
        <p className="text-gray-600">Informations sur le garant financier (si différent de l'hébergeant)</p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <label className="block text-gray-700 font-medium mb-2">
            Nom et prénom <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            value={formData.partenaire?.nomPrenom || ''}
            onChange={(e) => handleChange('nomPrenom', e.target.value)}
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
            value={formData.partenaire?.dateNaissance || ''}
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
            value={formData.partenaire?.nationalite || ''}
            onChange={(e) => handleChange('nationalite', e.target.value)}
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
            value={formData.partenaire?.telephone || ''}
            onChange={(e) => handleChange('telephone', e.target.value)}
            placeholder="+33 6 XX XX XX XX"
            required
          />
        </div>

        <div className="md:col-span-2">
          <label className="block text-gray-700 font-medium mb-2">
            Adresse complète <span className="text-red-500">*</span>
          </label>
          <textarea
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            rows={3}
            value={formData.partenaire?.adresse || ''}
            onChange={(e) => handleChange('adresse', e.target.value)}
            placeholder="Numéro, rue, code postal, ville, pays"
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
            value={formData.partenaire?.email || ''}
            onChange={(e) => handleChange('email', e.target.value)}
            required
          />
        </div>

        <div>
          <label className="block text-gray-700 font-medium mb-2">
            Profession actuelle <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            value={formData.partenaire?.profession || ''}
            onChange={(e) => handleChange('profession', e.target.value)}
            required
          />
        </div>

        <div>
          <label className="block text-gray-700 font-medium mb-2">
            Revenu mensuel net (€) <span className="text-red-500">*</span>
          </label>
          <input
            type="number"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            value={formData.partenaire?.revenuMensuel || ''}
            onChange={(e) => handleChange('revenuMensuel', e.target.value)}
            placeholder="2500"
            required
          />
        </div>

        <div>
          <label className="block text-gray-700 font-medium mb-2">
            Lien avec la demandeuse <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            value={formData.partenaire?.lienDemandeuse || ''}
            onChange={(e) => handleChange('lienDemandeuse', e.target.value)}
            placeholder="Partenaire / Ami / Membre de la famille..."
            required
          />
        </div>
      </div>

      <div className="bg-blue-50 border-l-4 border-blue-400 p-4 mt-6">
        <p className="text-blue-800 font-medium">
          📁 Documents du garant à prévoir
        </p>
        <p className="text-blue-700 text-sm mt-1">
          Les mêmes justificatifs financiers que l'hébergeant seront nécessaires pour le garant
        </p>
      </div>
    </div>
  );
};

export default Section2Partenaire;