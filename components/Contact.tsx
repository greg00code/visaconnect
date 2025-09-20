
import React, { useState } from 'react';

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    service: 'non-specifie',
    message: '',
  });

  const [formStatus, setFormStatus] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setFormStatus('');

    try {
      const response = await fetch('https://n8n.galette.ovh/webhook/formulaire', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          timestamp: new Date().toISOString(),
          source: 'visaconnect-website'
        }),
      });

      if (response.ok) {
        setFormStatus('✅ Votre message a bien été envoyé. Nous vous répondrons sous 48h.');
        setFormData({ name: '', email: '', service: 'non-specifie', message: '' });
      } else {
        setFormStatus('❌ Une erreur est survenue. Veuillez réessayer ou nous contacter directement par email.');
      }
    } catch (error) {
      console.error('Erreur lors de l\'envoi du formulaire:', error);
      setFormStatus('❌ Une erreur est survenue. Veuillez réessayer ou nous contacter directement par email.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-20 bg-white">
      <div className="container mx-auto px-6">
        <div className="lg:grid lg:grid-cols-2 lg:gap-12 items-center">
            <div className="mb-12 lg:mb-0">
                <h2 className="text-3xl md:text-4xl font-bold text-brand-blue font-display">Prêts à commencer ?</h2>
                <p className="text-lg text-gray-700 mt-4">Contactez-nous pour une première évaluation gratuite de votre situation. Remplissez le formulaire ou envoyez-nous un email.</p>
                <div className="mt-8">
                  <p className="flex items-center text-gray-700">
                    <svg className="w-6 h-6 text-brand-gold mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
                    <span>contact@visaconnect.fr</span>
                  </p>
                </div>
            </div>
            <div className="bg-light-blue p-8 rounded-lg shadow-lg">
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label htmlFor="name" className="block text-brand-blue font-semibold mb-2">Nom & Prénom</label>
                        <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-gold" required />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="email" className="block text-brand-blue font-semibold mb-2">Email</label>
                        <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-gold" required />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="service" className="block text-brand-blue font-semibold mb-2">Service souhaité</label>
                        <select id="service" name="service" value={formData.service} onChange={handleChange} className="w-full p-3 border border-gray-300 rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-brand-gold">
                            <option value="non-specifie">Je ne suis pas encore sûr(e)</option>
                            <option value="autonomie">Service Autonomie</option>
                            <option value="total">Accompagnement Total</option>
                        </select>
                    </div>
                    <div className="mb-6">
                        <label htmlFor="message" className="block text-brand-blue font-semibold mb-2">Votre message</label>
                        <textarea id="message" name="message" rows={4} value={formData.message} onChange={handleChange} className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-gold" required></textarea>
                    </div>
                    <button 
                      type="submit" 
                      disabled={isSubmitting}
                      className={`w-full bg-brand-gold text-brand-blue font-bold py-3 px-8 rounded-full text-lg transition duration-300 ${
                        isSubmitting ? 'opacity-50 cursor-not-allowed' : 'hover:bg-yellow-400'
                      }`}
                    >
                      {isSubmitting ? 'Envoi en cours...' : 'Envoyer ma demande'}
                    </button>
                    {formStatus && (
                      <p className={`mt-4 text-center ${formStatus.includes('✅') ? 'text-green-700' : 'text-red-700'}`}>
                        {formStatus}
                      </p>
                    )}
                </form>
            </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
