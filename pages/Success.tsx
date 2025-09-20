import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SuccessPage: React.FC = () => {
  const navigate = useNavigate();
  const [countdown, setCountdown] = useState(10);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Marquer comme chargé après un court délai
    setTimeout(() => setIsLoading(false), 100);
    
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          navigate('/');
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [navigate]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-green-50 to-white flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-blue"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-2xl p-8 max-w-2xl w-full text-center">
        <div className="mb-6">
          <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-12 h-12 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
            </svg>
          </div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Paiement réussi ! 🎉</h1>
          <p className="text-gray-600">Merci pour votre confiance</p>
        </div>

        <div className="bg-blue-50 rounded-lg p-6 mb-6">
          <h2 className="text-xl font-bold text-brand-blue mb-3">🚀 Prochaines étapes</h2>
          <div className="text-left space-y-3">
            <div className="flex items-start">
              <span className="text-brand-gold font-bold mr-2">1.</span>
              <p className="text-gray-700">
                <strong>Vous allez recevoir un email</strong> dans les prochaines minutes avec :
              </p>
            </div>
            <ul className="ml-6 space-y-2 text-sm text-gray-600">
              <li>• Votre lien personnel pour le questionnaire détaillé</li>
              <li>• L'accès à votre dossier Google Drive partagé</li>
              <li>• Les instructions pour déposer vos documents</li>
              <li>• Votre facture au format PDF</li>
            </ul>
            
            <div className="flex items-start mt-4">
              <span className="text-brand-gold font-bold mr-2">2.</span>
              <p className="text-gray-700">
                <strong>Remplissez le questionnaire</strong> dès que possible pour que nous puissions commencer la préparation de votre dossier
              </p>
            </div>
            
            <div className="flex items-start">
              <span className="text-brand-gold font-bold mr-2">3.</span>
              <p className="text-gray-700">
                <strong>Déposez vos documents</strong> dans le dossier Google Drive selon les instructions
              </p>
            </div>
          </div>
        </div>

        <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-6">
          <p className="text-yellow-800 text-sm">
            <strong>📧 Vérifiez vos spams</strong> si vous ne recevez pas l'email dans les 10 minutes
          </p>
        </div>

        <div className="space-y-4">
          <p className="text-gray-600">
            Redirection vers l'accueil dans <span className="font-bold text-brand-blue">{countdown}</span> secondes...
          </p>
          
          <button
            onClick={() => navigate('/')}
            className="px-6 py-3 bg-brand-blue text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
          >
            Retour à l'accueil
          </button>
        </div>

        <div className="mt-8 pt-6 border-t border-gray-200">
          <p className="text-gray-500 text-sm">
            Des questions ? Contactez-nous à{' '}
            <a href="mailto:contact@visaconnect.fr" className="text-brand-blue hover:underline">
              contact@visaconnect.fr
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SuccessPage;