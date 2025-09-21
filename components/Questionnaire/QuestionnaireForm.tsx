import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';

interface FormData {
  // Section 1: Informations personnelles
  personalInfo?: {
    lastName?: string;
    firstName?: string;
    dateOfBirth?: string;
    placeOfBirth?: string;
    nationality?: string;
    passportNumber?: string;
    passportIssueDate?: string;
    passportExpiryDate?: string;
    email?: string;
    phone?: string;
  };
  // Section 2: Situation familiale
  familyInfo?: {
    maritalStatus?: string;
    spouseName?: string;
    spouseNationality?: string;
    children?: string;
  };
  // Section 3: Voyage
  travelInfo?: {
    purposeOfVisit?: string;
    durationOfStay?: string;
    dateOfArrival?: string;
    dateOfDeparture?: string;
    previousVisas?: string;
  };
  // Section 4: Hébergement
  accommodationInfo?: {
    hostName?: string;
    hostAddress?: string;
    hostPhone?: string;
    relationship?: string;
  };
  // Section 5: Situation financière
  financialInfo?: {
    occupation?: string;
    employer?: string;
    monthlyIncome?: string;
    bankBalance?: string;
  };
  [key: string]: any;
}

const QuestionnaireForm: React.FC = () => {
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token');
  
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<FormData>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionStatus, setSubmissionStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [validationErrors, setValidationErrors] = useState<Record<string, string>>({});
  
  const totalSteps = 5; // Nombre de sections
  
  // Charger les données sauvegardées localement
  useEffect(() => {
    const savedData = localStorage.getItem(`questionnaire_${token}`);
    if (savedData) {
      setFormData(JSON.parse(savedData));
    }
  }, [token]);
  
  // Sauvegarder automatiquement les données
  useEffect(() => {
    if (token && Object.keys(formData).length > 0) {
      localStorage.setItem(`questionnaire_${token}`, JSON.stringify(formData));
    }
  }, [formData, token]);
  
  // Vérifier si le token est valide
  if (!token) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full">
          <h2 className="text-2xl font-bold text-red-600 mb-4">Accès non autorisé</h2>
          <p className="text-gray-700">
            Ce questionnaire nécessite un lien d'accès valide. 
            Veuillez utiliser le lien qui vous a été envoyé par email.
          </p>
        </div>
      </div>
    );
  }
  
  const handleInputChange = (section: string, field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value
      }
    }));
  };
  
  const handleSubmit = async () => {
    setIsSubmitting(true);
    setSubmissionStatus('idle');
    
    try {
      const response = await fetch('https://n8n.galette.ovh/webhook/questionnaire-visa', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          token,
          data: formData,
          submittedAt: new Date().toISOString(),
        }),
      });
      
      if (response.ok) {
        setSubmissionStatus('success');
        // Nettoyer le localStorage après succès
        localStorage.removeItem(`questionnaire_${token}`);
      } else {
        setSubmissionStatus('error');
      }
    } catch (error) {
      console.error('Erreur lors de la soumission:', error);
      setSubmissionStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };
  
  const validateCurrentStep = (): boolean => {
    setValidationErrors({});
    const errors: Record<string, string> = {};

    switch (currentStep) {
      case 1:
        if (!formData.personalInfo?.lastName) {
          errors.lastName = 'Le nom est obligatoire';
        }
        if (!formData.personalInfo?.firstName) {
          errors.firstName = 'Le prénom est obligatoire';
        }
        if (!formData.personalInfo?.dateOfBirth) {
          errors.dateOfBirth = 'La date de naissance est obligatoire';
        }
        if (!formData.personalInfo?.placeOfBirth) {
          errors.placeOfBirth = 'Le lieu de naissance est obligatoire';
        }
        if (!formData.personalInfo?.nationality) {
          errors.nationality = 'La nationalité est obligatoire';
        }
        if (!formData.personalInfo?.passportNumber) {
          errors.passportNumber = 'Le numéro de passeport est obligatoire';
        }
        if (!formData.personalInfo?.email) {
          errors.email = 'L\'email est obligatoire';
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.personalInfo.email)) {
          errors.email = 'L\'email n\'est pas valide';
        }
        if (!formData.personalInfo?.phone) {
          errors.phone = 'Le téléphone est obligatoire';
        }
        break;

      case 2:
        if (!formData.familyInfo?.maritalStatus) {
          errors.maritalStatus = 'Le statut marital est obligatoire';
        }
        break;

      case 3:
        if (!formData.travelInfo?.purposeOfVisit) {
          errors.purposeOfVisit = 'Le motif de visite est obligatoire';
        }
        if (!formData.travelInfo?.durationOfStay) {
          errors.durationOfStay = 'La durée de séjour est obligatoire';
        }
        if (!formData.travelInfo?.dateOfArrival) {
          errors.dateOfArrival = 'La date d\'arrivée est obligatoire';
        }
        if (!formData.travelInfo?.dateOfDeparture) {
          errors.dateOfDeparture = 'La date de départ est obligatoire';
        }
        break;

      case 4:
        if (!formData.accommodationInfo?.hostName) {
          errors.hostName = 'Le nom de l\'hébergeur est obligatoire';
        }
        if (!formData.accommodationInfo?.hostAddress) {
          errors.hostAddress = 'L\'adresse d\'hébergement est obligatoire';
        }
        if (!formData.accommodationInfo?.hostPhone) {
          errors.hostPhone = 'Le téléphone de l\'hébergeur est obligatoire';
        }
        if (!formData.accommodationInfo?.relationship) {
          errors.relationship = 'La relation avec l\'hébergeur est obligatoire';
        }
        break;

      case 5:
        if (!formData.financialInfo?.occupation) {
          errors.occupation = 'La profession est obligatoire';
        }
        if (!formData.financialInfo?.monthlyIncome) {
          errors.monthlyIncome = 'Le revenu mensuel est obligatoire';
        }
        break;
    }

    if (Object.keys(errors).length > 0) {
      setValidationErrors(errors);
      return false;
    }
    return true;
  };

  const nextStep = () => {
    if (validateCurrentStep() && currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    }
  };
  
  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };
  
  const renderProgressBar = () => {
    const progress = (currentStep / totalSteps) * 100;
    return (
      <div className="w-full bg-gray-200 rounded-full h-2 mb-6">
        <div
          className="bg-brand-blue h-2 rounded-full transition-all duration-300"
          style={{ width: `${progress}%` }}
        />
      </div>
    );
  };
  
  const renderSection = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-brand-blue mb-4">Informations personnelles</h3>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-700 mb-1">Nom *</label>
                <input
                  type="text"
                  className={`w-full p-2 border rounded-md focus:ring-2 focus:ring-brand-gold ${
                    validationErrors.lastName ? 'border-red-500' : 'border-gray-300'
                  }`}
                  value={formData.personalInfo?.lastName || ''}
                  onChange={(e) => handleInputChange('personalInfo', 'lastName', e.target.value)}
                  required
                />
                {validationErrors.lastName && (
                  <p className="text-red-500 text-sm mt-1">{validationErrors.lastName}</p>
                )}
              </div>
              <div>
                <label className="block text-gray-700 mb-1">Prénom *</label>
                <input
                  type="text"
                  className={`w-full p-2 border rounded-md focus:ring-2 focus:ring-brand-gold ${
                    validationErrors.firstName ? 'border-red-500' : 'border-gray-300'
                  }`}
                  value={formData.personalInfo?.firstName || ''}
                  onChange={(e) => handleInputChange('personalInfo', 'firstName', e.target.value)}
                  required
                />
                {validationErrors.firstName && (
                  <p className="text-red-500 text-sm mt-1">{validationErrors.firstName}</p>
                )}
              </div>
              <div>
                <label className="block text-gray-700 mb-1">Date de naissance *</label>
                <input
                  type="date"
                  className={`w-full p-2 border rounded-md focus:ring-2 focus:ring-brand-gold ${
                    validationErrors.dateOfBirth ? 'border-red-500' : 'border-gray-300'
                  }`}
                  value={formData.personalInfo?.dateOfBirth || ''}
                  onChange={(e) => handleInputChange('personalInfo', 'dateOfBirth', e.target.value)}
                  required
                />
                {validationErrors.dateOfBirth && (
                  <p className="text-red-500 text-sm mt-1">{validationErrors.dateOfBirth}</p>
                )}
              </div>
              <div>
                <label className="block text-gray-700 mb-1">Lieu de naissance *</label>
                <input
                  type="text"
                  className={`w-full p-2 border rounded-md focus:ring-2 focus:ring-brand-gold ${
                    validationErrors.placeOfBirth ? 'border-red-500' : 'border-gray-300'
                  }`}
                  value={formData.personalInfo?.placeOfBirth || ''}
                  onChange={(e) => handleInputChange('personalInfo', 'placeOfBirth', e.target.value)}
                  required
                />
                {validationErrors.placeOfBirth && (
                  <p className="text-red-500 text-sm mt-1">{validationErrors.placeOfBirth}</p>
                )}
              </div>
              <div>
                <label className="block text-gray-700 mb-1">Nationalité *</label>
                <input
                  type="text"
                  className={`w-full p-2 border rounded-md focus:ring-2 focus:ring-brand-gold ${
                    validationErrors.nationality ? 'border-red-500' : 'border-gray-300'
                  }`}
                  value={formData.personalInfo?.nationality || ''}
                  onChange={(e) => handleInputChange('personalInfo', 'nationality', e.target.value)}
                  required
                />
                {validationErrors.nationality && (
                  <p className="text-red-500 text-sm mt-1">{validationErrors.nationality}</p>
                )}
              </div>
              <div>
                <label className="block text-gray-700 mb-1">Numéro de passeport *</label>
                <input
                  type="text"
                  className={`w-full p-2 border rounded-md focus:ring-2 focus:ring-brand-gold ${
                    validationErrors.passportNumber ? 'border-red-500' : 'border-gray-300'
                  }`}
                  value={formData.personalInfo?.passportNumber || ''}
                  onChange={(e) => handleInputChange('personalInfo', 'passportNumber', e.target.value)}
                  required
                />
                {validationErrors.passportNumber && (
                  <p className="text-red-500 text-sm mt-1">{validationErrors.passportNumber}</p>
                )}
              </div>
              <div>
                <label className="block text-gray-700 mb-1">Date d'émission du passeport</label>
                <input
                  type="date"
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-brand-gold"
                  value={formData.personalInfo?.passportIssueDate || ''}
                  onChange={(e) => handleInputChange('personalInfo', 'passportIssueDate', e.target.value)}
                />
              </div>
              <div>
                <label className="block text-gray-700 mb-1">Date d'expiration du passeport</label>
                <input
                  type="date"
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-brand-gold"
                  value={formData.personalInfo?.passportExpiryDate || ''}
                  onChange={(e) => handleInputChange('personalInfo', 'passportExpiryDate', e.target.value)}
                />
              </div>
              <div>
                <label className="block text-gray-700 mb-1">Email *</label>
                <input
                  type="email"
                  className={`w-full p-2 border rounded-md focus:ring-2 focus:ring-brand-gold ${
                    validationErrors.email ? 'border-red-500' : 'border-gray-300'
                  }`}
                  value={formData.personalInfo?.email || ''}
                  onChange={(e) => handleInputChange('personalInfo', 'email', e.target.value)}
                  required
                />
                {validationErrors.email && (
                  <p className="text-red-500 text-sm mt-1">{validationErrors.email}</p>
                )}
              </div>
              <div>
                <label className="block text-gray-700 mb-1">Téléphone *</label>
                <input
                  type="tel"
                  className={`w-full p-2 border rounded-md focus:ring-2 focus:ring-brand-gold ${
                    validationErrors.phone ? 'border-red-500' : 'border-gray-300'
                  }`}
                  value={formData.personalInfo?.phone || ''}
                  onChange={(e) => handleInputChange('personalInfo', 'phone', e.target.value)}
                  required
                />
                {validationErrors.phone && (
                  <p className="text-red-500 text-sm mt-1">{validationErrors.phone}</p>
                )}
              </div>
            </div>
          </div>
        );
      
      case 2:
        return (
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-brand-blue mb-4">Situation familiale</h3>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-700 mb-1">Statut marital *</label>
                <select
                  className={`w-full p-2 border rounded-md focus:ring-2 focus:ring-brand-gold ${
                    validationErrors.maritalStatus ? 'border-red-500' : 'border-gray-300'
                  }`}
                  value={formData.familyInfo?.maritalStatus || ''}
                  onChange={(e) => handleInputChange('familyInfo', 'maritalStatus', e.target.value)}
                  required
                >
                  <option value="">Sélectionnez</option>
                  <option value="single">Célibataire</option>
                  <option value="married">Marié(e)</option>
                  <option value="divorced">Divorcé(e)</option>
                  <option value="widowed">Veuf/Veuve</option>
                </select>
                {validationErrors.maritalStatus && (
                  <p className="text-red-500 text-sm mt-1">{validationErrors.maritalStatus}</p>
                )}
              </div>
              <div>
                <label className="block text-gray-700 mb-1">Nom du conjoint (si applicable)</label>
                <input
                  type="text"
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-brand-gold"
                  value={formData.familyInfo?.spouseName || ''}
                  onChange={(e) => handleInputChange('familyInfo', 'spouseName', e.target.value)}
                />
              </div>
              <div>
                <label className="block text-gray-700 mb-1">Nationalité du conjoint (si applicable)</label>
                <input
                  type="text"
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-brand-gold"
                  value={formData.familyInfo?.spouseNationality || ''}
                  onChange={(e) => handleInputChange('familyInfo', 'spouseNationality', e.target.value)}
                />
              </div>
              <div>
                <label className="block text-gray-700 mb-1">Avez-vous des enfants ?</label>
                <select
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-brand-gold"
                  value={formData.familyInfo?.children || ''}
                  onChange={(e) => handleInputChange('familyInfo', 'children', e.target.value)}
                >
                  <option value="">Sélectionnez</option>
                  <option value="yes">Oui</option>
                  <option value="no">Non</option>
                </select>
              </div>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-brand-blue mb-4">Informations de voyage</h3>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-700 mb-1">Motif de la visite *</label>
                <select
                  className={`w-full p-2 border rounded-md focus:ring-2 focus:ring-brand-gold ${
                    validationErrors.purposeOfVisit ? 'border-red-500' : 'border-gray-300'
                  }`}
                  value={formData.travelInfo?.purposeOfVisit || ''}
                  onChange={(e) => handleInputChange('travelInfo', 'purposeOfVisit', e.target.value)}
                  required
                >
                  <option value="">Sélectionnez</option>
                  <option value="tourism">Tourisme</option>
                  <option value="business">Affaires</option>
                  <option value="family">Visite familiale</option>
                  <option value="medical">Médical</option>
                  <option value="study">Études</option>
                  <option value="other">Autre</option>
                </select>
                {validationErrors.purposeOfVisit && (
                  <p className="text-red-500 text-sm mt-1">{validationErrors.purposeOfVisit}</p>
                )}
              </div>
              <div>
                <label className="block text-gray-700 mb-1">Durée prévue du séjour *</label>
                <input
                  type="text"
                  placeholder="Ex: 15 jours"
                  className={`w-full p-2 border rounded-md focus:ring-2 focus:ring-brand-gold ${
                    validationErrors.durationOfStay ? 'border-red-500' : 'border-gray-300'
                  }`}
                  value={formData.travelInfo?.durationOfStay || ''}
                  onChange={(e) => handleInputChange('travelInfo', 'durationOfStay', e.target.value)}
                  required
                />
                {validationErrors.durationOfStay && (
                  <p className="text-red-500 text-sm mt-1">{validationErrors.durationOfStay}</p>
                )}
              </div>
              <div>
                <label className="block text-gray-700 mb-1">Date d'arrivée prévue *</label>
                <input
                  type="date"
                  className={`w-full p-2 border rounded-md focus:ring-2 focus:ring-brand-gold ${
                    validationErrors.dateOfArrival ? 'border-red-500' : 'border-gray-300'
                  }`}
                  value={formData.travelInfo?.dateOfArrival || ''}
                  onChange={(e) => handleInputChange('travelInfo', 'dateOfArrival', e.target.value)}
                  required
                />
                {validationErrors.dateOfArrival && (
                  <p className="text-red-500 text-sm mt-1">{validationErrors.dateOfArrival}</p>
                )}
              </div>
              <div>
                <label className="block text-gray-700 mb-1">Date de départ prévue *</label>
                <input
                  type="date"
                  className={`w-full p-2 border rounded-md focus:ring-2 focus:ring-brand-gold ${
                    validationErrors.dateOfDeparture ? 'border-red-500' : 'border-gray-300'
                  }`}
                  value={formData.travelInfo?.dateOfDeparture || ''}
                  onChange={(e) => handleInputChange('travelInfo', 'dateOfDeparture', e.target.value)}
                  required
                />
                {validationErrors.dateOfDeparture && (
                  <p className="text-red-500 text-sm mt-1">{validationErrors.dateOfDeparture}</p>
                )}
              </div>
              <div className="md:col-span-2">
                <label className="block text-gray-700 mb-1">Avez-vous déjà obtenu des visas Schengen ?</label>
                <select
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-brand-gold"
                  value={formData.travelInfo?.previousVisas || ''}
                  onChange={(e) => handleInputChange('travelInfo', 'previousVisas', e.target.value)}
                >
                  <option value="">Sélectionnez</option>
                  <option value="yes">Oui</option>
                  <option value="no">Non</option>
                </select>
              </div>
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-brand-blue mb-4">Hébergement</h3>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-700 mb-1">Nom de l'hébergeur *</label>
                <input
                  type="text"
                  className={`w-full p-2 border rounded-md focus:ring-2 focus:ring-brand-gold ${
                    validationErrors.hostName ? 'border-red-500' : 'border-gray-300'
                  }`}
                  value={formData.accommodationInfo?.hostName || ''}
                  onChange={(e) => handleInputChange('accommodationInfo', 'hostName', e.target.value)}
                  required
                />
                {validationErrors.hostName && (
                  <p className="text-red-500 text-sm mt-1">{validationErrors.hostName}</p>
                )}
              </div>
              <div>
                <label className="block text-gray-700 mb-1">Téléphone de l'hébergeur *</label>
                <input
                  type="tel"
                  className={`w-full p-2 border rounded-md focus:ring-2 focus:ring-brand-gold ${
                    validationErrors.hostPhone ? 'border-red-500' : 'border-gray-300'
                  }`}
                  value={formData.accommodationInfo?.hostPhone || ''}
                  onChange={(e) => handleInputChange('accommodationInfo', 'hostPhone', e.target.value)}
                  required
                />
                {validationErrors.hostPhone && (
                  <p className="text-red-500 text-sm mt-1">{validationErrors.hostPhone}</p>
                )}
              </div>
              <div className="md:col-span-2">
                <label className="block text-gray-700 mb-1">Adresse complète d'hébergement *</label>
                <textarea
                  rows={3}
                  className={`w-full p-2 border rounded-md focus:ring-2 focus:ring-brand-gold ${
                    validationErrors.hostAddress ? 'border-red-500' : 'border-gray-300'
                  }`}
                  value={formData.accommodationInfo?.hostAddress || ''}
                  onChange={(e) => handleInputChange('accommodationInfo', 'hostAddress', e.target.value)}
                  required
                />
                {validationErrors.hostAddress && (
                  <p className="text-red-500 text-sm mt-1">{validationErrors.hostAddress}</p>
                )}
              </div>
              <div>
                <label className="block text-gray-700 mb-1">Relation avec l'hébergeur *</label>
                <select
                  className={`w-full p-2 border rounded-md focus:ring-2 focus:ring-brand-gold ${
                    validationErrors.relationship ? 'border-red-500' : 'border-gray-300'
                  }`}
                  value={formData.accommodationInfo?.relationship || ''}
                  onChange={(e) => handleInputChange('accommodationInfo', 'relationship', e.target.value)}
                  required
                >
                  <option value="">Sélectionnez</option>
                  <option value="family">Famille</option>
                  <option value="friend">Ami</option>
                  <option value="spouse">Conjoint</option>
                  <option value="business">Professionnel</option>
                  <option value="hotel">Hôtel</option>
                  <option value="other">Autre</option>
                </select>
                {validationErrors.relationship && (
                  <p className="text-red-500 text-sm mt-1">{validationErrors.relationship}</p>
                )}
              </div>
            </div>
          </div>
        );

      case 5:
        return (
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-brand-blue mb-4">Situation financière</h3>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-700 mb-1">Profession *</label>
                <input
                  type="text"
                  className={`w-full p-2 border rounded-md focus:ring-2 focus:ring-brand-gold ${
                    validationErrors.occupation ? 'border-red-500' : 'border-gray-300'
                  }`}
                  value={formData.financialInfo?.occupation || ''}
                  onChange={(e) => handleInputChange('financialInfo', 'occupation', e.target.value)}
                  required
                />
                {validationErrors.occupation && (
                  <p className="text-red-500 text-sm mt-1">{validationErrors.occupation}</p>
                )}
              </div>
              <div>
                <label className="block text-gray-700 mb-1">Employeur</label>
                <input
                  type="text"
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-brand-gold"
                  value={formData.financialInfo?.employer || ''}
                  onChange={(e) => handleInputChange('financialInfo', 'employer', e.target.value)}
                />
              </div>
              <div>
                <label className="block text-gray-700 mb-1">Revenu mensuel *</label>
                <input
                  type="text"
                  placeholder="Ex: 3000€"
                  className={`w-full p-2 border rounded-md focus:ring-2 focus:ring-brand-gold ${
                    validationErrors.monthlyIncome ? 'border-red-500' : 'border-gray-300'
                  }`}
                  value={formData.financialInfo?.monthlyIncome || ''}
                  onChange={(e) => handleInputChange('financialInfo', 'monthlyIncome', e.target.value)}
                  required
                />
                {validationErrors.monthlyIncome && (
                  <p className="text-red-500 text-sm mt-1">{validationErrors.monthlyIncome}</p>
                )}
              </div>
              <div>
                <label className="block text-gray-700 mb-1">Solde bancaire disponible</label>
                <input
                  type="text"
                  placeholder="Ex: 5000€"
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-brand-gold"
                  value={formData.financialInfo?.bankBalance || ''}
                  onChange={(e) => handleInputChange('financialInfo', 'bankBalance', e.target.value)}
                />
              </div>
            </div>
          </div>
        );
      
      default:
        return null;
    }
  };
  
  if (submissionStatus === 'success') {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full text-center">
          <div className="text-green-500 text-6xl mb-4">✅</div>
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Questionnaire envoyé avec succès !</h2>
          <p className="text-gray-700">
            Nous avons bien reçu vos informations. 
            Nous allons les traiter et revenir vers vous rapidement.
          </p>
        </div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-brand-blue text-center mb-2">
              Questionnaire Visa Schengen
            </h1>
            <p className="text-gray-600 text-center">
              Étape {currentStep} sur {totalSteps}
            </p>
          </div>
          
          {renderProgressBar()}
          
          <form onSubmit={(e) => e.preventDefault()}>
            {renderSection()}
            
            <div className="flex justify-between mt-8">
              <button
                type="button"
                onClick={prevStep}
                disabled={currentStep === 1}
                className={`px-6 py-2 rounded-full ${
                  currentStep === 1
                    ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    : 'bg-gray-500 text-white hover:bg-gray-600'
                } transition-colors`}
              >
                Précédent
              </button>
              
              {currentStep < totalSteps ? (
                <button
                  type="button"
                  onClick={nextStep}
                  className="px-6 py-2 bg-brand-blue text-white rounded-full hover:bg-blue-700 transition-colors"
                >
                  Suivant
                </button>
              ) : (
                <button
                  type="button"
                  onClick={handleSubmit}
                  disabled={isSubmitting}
                  className={`px-6 py-2 rounded-full ${
                    isSubmitting
                      ? 'bg-gray-400 text-white cursor-not-allowed'
                      : 'bg-brand-gold text-brand-blue hover:bg-yellow-400'
                  } transition-colors font-bold`}
                >
                  {isSubmitting ? 'Envoi en cours...' : 'Soumettre'}
                </button>
              )}
            </div>
            
            {submissionStatus === 'error' && (
              <div className="mt-4 p-3 bg-red-100 text-red-700 rounded-md">
                Une erreur est survenue. Veuillez réessayer.
              </div>
            )}
          </form>
          
          <div className="mt-8 text-center text-sm text-gray-500">
            Vos données sont sauvegardées automatiquement
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuestionnaireForm;