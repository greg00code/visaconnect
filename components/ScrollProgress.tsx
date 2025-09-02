import React, { useEffect } from 'react';

const ScrollProgress: React.FC = () => {
  const handleScroll = () => {
    const scrollHeight = Math.max(
      document.body.scrollHeight, document.documentElement.scrollHeight,
      document.body.offsetHeight, document.documentElement.offsetHeight,
      document.body.clientHeight, document.documentElement.clientHeight
    );
    const clientHeight = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    
    const totalScrollableHeight = scrollHeight - clientHeight;
    let scrollPercentage = 0;

    if (totalScrollableHeight > 0) {
      scrollPercentage = (scrollTop / totalScrollableHeight) * 100;
    }

    let backgroundStyle = '';
    const blue = '#0055A4';
    const white = '#FFFFFF';
    const red = '#EF4135';

    if (scrollPercentage <= 33.33) {
      backgroundStyle = blue;
    } else if (scrollPercentage <= 66.66) {
      const blueStop = (33.33 / scrollPercentage) * 100;
      backgroundStyle = `linear-gradient(to right, ${blue} ${blueStop}%, ${white} ${blueStop}%)`;
    } else {
      const blueStop = (33.33 / scrollPercentage) * 100;
      const whiteStop = (66.66 / scrollPercentage) * 100;
      backgroundStyle = `linear-gradient(to right, ${blue} ${blueStop}%, ${white} ${blueStop}%, ${white} ${whiteStop}%, ${red} ${whiteStop}%)`;
    }
    
    // Pour une finition parfaite, on s'assure que le drapeau est exact à 100%
    if (scrollPercentage >= 99.9) {
        backgroundStyle = `linear-gradient(to right, ${blue} 33.33%, ${white} 33.33%, ${white} 66.66%, ${red} 66.66%)`;
    }

    document.documentElement.style.setProperty('--scroll-progress', `${scrollPercentage}%`);
    document.documentElement.style.setProperty('--scroll-bg', backgroundStyle);
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll);
    handleScroll(); 

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
      document.documentElement.style.removeProperty('--scroll-progress');
      document.documentElement.style.removeProperty('--scroll-bg');
    };
  }, []);

  return (
    <div 
      className="fixed top-0 left-0 w-full h-1.5 bg-gray-200/50 z-[60] border-b border-gray-200"
      role="progressbar" 
      aria-label="Progression de la lecture de la page"
      aria-valuemin={0} 
      aria-valuemax={100}
      aria-valuenow={typeof window !== 'undefined' ? parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--scroll-progress')) : 0}
    >
      <div 
        className="h-full"
        style={{ 
          width: 'var(--scroll-progress, 0%)',
          background: 'var(--scroll-bg, #0055A4)',
          transition: 'width 10ms linear' // Utiliser une transition linéaire pour plus de fluidité
        }}
      ></div>
    </div>
  );
};

export default ScrollProgress;