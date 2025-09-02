
import React from 'react';

const StarRating: React.FC<{ rating: number }> = ({ rating }) => (
  <div className="flex text-yellow-400">
    {[...Array(5)].map((_, i) => (
      <svg key={i} className={`w-5 h-5 ${i < rating ? 'text-brand-gold' : 'text-gray-300'}`} fill="currentColor" viewBox="0 0 20 20">
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
      </svg>
    ))}
  </div>
);

const TestimonialCard: React.FC<{ name: string; text: string; rating: number }> = ({ name, text, rating }) => {
  return (
    <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-100 h-full flex flex-col">
        <StarRating rating={rating} />
        <blockquote className="text-gray-600 my-4 flex-grow">
          "{text}"
        </blockquote>
        <p className="font-bold text-brand-blue font-display mt-auto">{name}</p>
    </div>
  );
};


const Testimonials: React.FC = () => {
  return (
    <section id="temoignages" className="py-20 bg-white">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-brand-blue font-display">Ils nous ont fait confiance</h2>
          <p className="text-lg text-gray-700 mt-4 max-w-2xl mx-auto">Découvrez l'expérience de couples qui, comme vous, ont choisi la sérénité.</p>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          <TestimonialCard
            name="Lucas & Malee"
            rating={5}
            text="Un service exceptionnel ! Grâce à leur aide, nous avons obtenu le visa en un temps record. La communication en thaï avec ma compagne a été un vrai plus. Mille mercis !"
          />
          <TestimonialCard
            name="Chloé & Anan"
            rating={5}
            text="Nous avons pris la formule 'Accompagnement Total' et nous ne regrettons absolument pas. Zéro stress, un dossier parfait et une équipe toujours à l'écoute. Je recommande les yeux fermés."
          />
          <TestimonialCard
            name="Julien & Aom"
            rating={5}
            text="Le guide de la formule 'Autonomie' est une mine d'or. Très clair, il nous a permis de monter notre dossier avec confiance. L'analyse finale nous a rassurés avant le dépôt. Top !"
          />
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
