import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Section1Hebergeant from '../components/Questionnaire/Section1Hebergeant';
import Section2Partenaire from '../components/Questionnaire/Section2Partenaire';
import Section3Demandeuse from '../components/Questionnaire/Section3Demandeuse';
import Section4Relation from '../components/Questionnaire/Section4Relation';
import Section5Sejour from '../components/Questionnaire/Section5Sejour';
import Section6Retour from '../components/Questionnaire/Section6Retour';

export interface FormData {
  hebergeant?: {
    nomPrenom?: string;
    dateNaissance?: string;
    nationalite?: string;
    adresse?: string;
    telephone?: string;
    email?: string;
    profession?: string;
    revenuMensuel?: string;
    lienDemandeuse?: string;
    statutLogement?: 'proprietaire' | 'locataire' | 'heberge';
    justificatifLogement?: File;
  };
  isGarant?: boolean;
  partenaire?: {
    nomPrenom?: string;
    dateNaissance?: string;
    nationalite?: string;
    adresse?: string;
    telephone?: string;
    email?: string;
    profession?: string;
    revenuMensuel?: string;
    lienDemandeuse?: string;
  };
  demandeuse?: {
    nomComplet?: string;
    dateNaissance?: string;
    nationalite?: string;
    adresseActuelle?: string;
    telephone?: string;
    email?: string;
    numeroPasseport?: string;
    professionStatut?: string;
    lieuTravailEtude?: string;
    aEnfants?: boolean;
    nombreEnfants?: string;
    agesEnfants?: string;
    aVoyageEurope?: boolean;
    detailsVoyage?: string;
    etatCivil?: 'mariee' | 'celibataire' | 'veuve' | 'divorcee';
    aRefusVisa?: boolean;
    dateRefus?: string;
    motifRefus?: string;
  };
  relation?: {
    duree?: string;
    rencontre?: string;
    voyagesEnsemble?: boolean;
    detailsVoyages?: string;
    preuves?: string;
  };
  sejour?: {
    dateDepart?: string;
    dateRetour?: string;
    nombreJours?: string;
    chezGarant?: boolean;
    hebergementPrevu?: string;
  };
  retour?: {
    type?: 'travail' | 'etudes' | 'famille';
    // Travail
    posteOccupe?: string;
    nomEntreprise?: string;
    adresseEntreprise?: string;
    dateReprise?: string;
    // Études
    niveauEtude?: string;
    nomEtablissement?: string;
    villeEtablissement?: string;
    calendrierExamen?: boolean;
    // Famille
    quiDepend?: string;
    natureResponsabilite?: string;
    // Notes complémentaires
    notesComplementaires?: string;
  };
}

const QuestionnairePage: React.FC = () => {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const token = params.get('token');
  
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<FormData>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionStatus, setSubmissionStatus] = useState<'idle' | 'success' | 'error'>('idle');
  
  const totalSteps = 6;
  
  // Charger les données sauvegardées
  useEffect(() => {
    const savedData = localStorage.getItem(`questionnaire_${token}`);
    if (savedData) {
      setFormData(JSON.parse(savedData));
    }
  }, [token]);
  
  // Sauvegarder automatiquement
  useEffect(() => {
    if (token && Object.keys(formData).length > 0) {
      localStorage.setItem(`questionnaire_${token}`, JSON.stringify(formData));
    }
  }, [formData, token]);
  
  // Vérifier le token
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
  
  const updateFormData = (section: keyof FormData, data: any) => {
    setFormData(prev => {
      // Si c'est une valeur directe comme isGarant (boolean)
      if (section === 'isGarant') {
        return {
          ...prev,
          [section]: data
        };
      }
      // Sinon c'est un objet qu'on doit merger
      return {
        ...prev,
        [section]: {
          ...prev[section] as any,
          ...data
        }
      };
    });
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
    // Skip section 2 if user is garant
    if (currentStep === 1 && formData.isGarant) {
      setCurrentStep(3);
    } else if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    }
    // Scroll to top when changing section
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  
  const prevStep = () => {
    // Handle skip logic for section 2
    if (currentStep === 3 && formData.isGarant) {
      setCurrentStep(1);
    } else if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
    // Scroll to top when changing section
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  
  const renderProgressBar = () => {
    const progress = (currentStep / totalSteps) * 100;
    return (
      <div className="w-full bg-gray-200 rounded-full h-2 mb-6">
        <div
          className="bg-gradient-to-r from-blue-600 to-blue-400 h-2 rounded-full transition-all duration-300"
          style={{ width: `${progress}%` }}
        />
      </div>
    );
  };
  
  const renderSection = () => {
    switch (currentStep) {
      case 1:
        return <Section1Hebergeant formData={formData} updateFormData={updateFormData} />;
      case 2:
        return <Section2Partenaire formData={formData} updateFormData={updateFormData} />;
      case 3:
        return <Section3Demandeuse formData={formData} updateFormData={updateFormData} />;
      case 4:
        return <Section4Relation formData={formData} updateFormData={updateFormData} />;
      case 5:
        return <Section5Sejour formData={formData} updateFormData={updateFormData} />;
      case 6:
        return <Section6Retour formData={formData} updateFormData={updateFormData} />;
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
            Nous allons maintenant préparer votre dossier et vous contacter rapidement.
          </p>
        </div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="bg-white rounded-xl shadow-lg p-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-blue-800 text-center mb-2">
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
                className={`px-6 py-3 rounded-lg font-medium ${
                  currentStep === 1
                    ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                    : 'bg-gray-500 text-white hover:bg-gray-600'
                } transition-colors`}
              >
                ← Précédent
              </button>
              
              {currentStep < totalSteps ? (
                <button
                  type="button"
                  onClick={nextStep}
                  className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
                >
                  Suivant →
                </button>
              ) : (
                <button
                  type="button"
                  onClick={handleSubmit}
                  disabled={isSubmitting}
                  className={`px-8 py-3 rounded-lg font-bold ${
                    isSubmitting
                      ? 'bg-gray-400 text-white cursor-not-allowed'
                      : 'bg-gradient-to-r from-green-500 to-green-600 text-white hover:from-green-600 hover:to-green-700'
                  } transition-all transform hover:scale-105`}
                >
                  {isSubmitting ? 'Envoi en cours...' : 'Soumettre le questionnaire'}
                </button>
              )}
            </div>
            
            {submissionStatus === 'error' && (
              <div className="mt-4 p-3 bg-red-100 text-red-700 rounded-md text-center">
                Une erreur est survenue. Veuillez réessayer.
              </div>
            )}
          </form>
          
          <div className="mt-8 text-center text-sm text-gray-500">
            <span className="inline-flex items-center">
              <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              Vos données sont sauvegardées automatiquement
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuestionnairePage;