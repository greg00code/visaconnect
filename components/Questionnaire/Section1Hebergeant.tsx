import React from 'react';
import { FormData } from '../../pages/Questionnaire';

interface Props {
  formData: FormData;
  updateFormData: (section: keyof FormData, data: any) => void;
}

const Section1Hebergeant: React.FC<Props> = ({ formData, updateFormData }) => {
  const handleChange = (field: string, value: any) => {
    updateFormData('hebergeant', { [field]: value });
  };

  const handleIsGarantChange = (value: boolean) => {
    updateFormData('isGarant' as keyof FormData, value);
  };

  return (
    <div className="space-y-6">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-blue-800 mb-2">👤 Hébergeant en France</h2>
        <p className="text-gray-600">Informations sur la personne qui héberge en France</p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <label className="block text-gray-700 font-medium mb-2">
            Nom et prénom <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            value={formData.hebergeant?.nomPrenom || ''}
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
            value={formData.hebergeant?.dateNaissance || ''}
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
            value={formData.hebergeant?.nationalite || 'Française'}
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
            value={formData.hebergeant?.telephone || ''}
            onChange={(e) => handleChange('telephone', e.target.value)}
            placeholder="+33 6 XX XX XX XX"
            required
          />
        </div>

        <div className="md:col-span-2">
          <label className="block text-gray-700 font-medium mb-2">
            Adresse complète en France <span className="text-red-500">*</span>
          </label>
          <textarea
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            rows={3}
            value={formData.hebergeant?.adresse || ''}
            onChange={(e) => handleChange('adresse', e.target.value)}
            placeholder="Numéro, rue, code postal, ville"
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
            value={formData.hebergeant?.email || ''}
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
            value={formData.hebergeant?.profession || ''}
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
            value={formData.hebergeant?.revenuMensuel || ''}
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
            value={formData.hebergeant?.lienDemandeuse || ''}
            onChange={(e) => handleChange('lienDemandeuse', e.target.value)}
            placeholder="Compagnon / Époux / Belle-mère..."
            required
          />
        </div>
      </div>

      <div className="border-t pt-6">
        <h3 className="text-lg font-bold text-gray-800 mb-4">🏠 Logement</h3>
        
        <div className="space-y-4">
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Statut de logement <span className="text-red-500">*</span>
            </label>
            <div className="space-y-2">
              {['proprietaire', 'locataire', 'heberge'].map((status) => (
                <label key={status} className="flex items-center">
                  <input
                    type="radio"
                    name="statutLogement"
                    value={status}
                    checked={formData.hebergeant?.statutLogement === status}
                    onChange={(e) => handleChange('statutLogement', e.target.value)}
                    className="mr-3 text-blue-600 focus:ring-blue-500"
                  />
                  <span className="text-gray-700">
                    {status === 'proprietaire' && 'Propriétaire'}
                    {status === 'locataire' && 'Locataire (bail)'}
                    {status === 'heberge' && 'Hébergé'}
                  </span>
                </label>
              ))}
            </div>
          </div>

          <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4">
            <p className="text-yellow-800 font-medium">
              📁 Justificatif de logement à fournir
            </p>
            <p className="text-yellow-700 text-sm mt-1">
              Titre de propriété, bail, quittance de loyer ou attestation d'hébergement selon votre situation
            </p>
          </div>
        </div>
      </div>

      <div className="border-t pt-6">
        <h3 className="text-lg font-bold text-gray-800 mb-4">💼 Pièces financières à prévoir</h3>
        <div className="bg-blue-50 border-l-4 border-blue-400 p-4">
          <p className="text-blue-800 font-medium mb-2">
            Documents à joindre dans le Google Drive partagé :
          </p>
          <ul className="list-disc list-inside text-blue-700 space-y-1">
            <li>3 derniers bulletins de salaire</li>
            <li>Relevés bancaires récents</li>
            <li>Dernier avis d'imposition</li>
            <li>Bail ou avis de taxe foncière</li>
          </ul>
        </div>
      </div>

      <div className="border-t pt-6">
        <div className="bg-gray-50 p-4 rounded-lg">
          <label className="flex items-center font-medium text-gray-800">
            <input
              type="checkbox"
              checked={formData.isGarant === true}
              onChange={(e) => handleIsGarantChange(e.target.checked)}
              className="mr-3 w-5 h-5 text-blue-600 rounded focus:ring-blue-500"
            />
            <span>Je suis le garant financier de la demandeuse</span>
          </label>
          <p className="text-gray-600 text-sm mt-2 ml-8">
            Cochez cette case si vous êtes à la fois l'hébergeant et le garant financier
          </p>
        </div>
      </div>
    </div>
  );
};

export default Section1Hebergeant;