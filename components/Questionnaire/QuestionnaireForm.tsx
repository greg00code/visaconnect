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
  
  const nextStep = () => {
    if (currentStep < totalSteps) {
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
                  className="w-full p-2 border rounded-md focus:ring-2 focus:ring-brand-gold"
                  value={formData.personalInfo?.lastName || ''}
                  onChange={(e) => handleInputChange('personalInfo', 'lastName', e.target.value)}
                  required
                />
              </div>
              <div>
                <label className="block text-gray-700 mb-1">Prénom *</label>
                <input
                  type="text"
                  className="w-full p-2 border rounded-md focus:ring-2 focus:ring-brand-gold"
                  value={formData.personalInfo?.firstName || ''}
                  onChange={(e) => handleInputChange('personalInfo', 'firstName', e.target.value)}
                  required
                />
              </div>
              {/* Ajouter plus de champs selon votre PDF */}
            </div>
          </div>
        );
      
      case 2:
        return (
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-brand-blue mb-4">Situation familiale</h3>
            {/* Champs pour la section 2 */}
          </div>
        );
      
      // Ajouter les autres sections (3, 4, 5)
      
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