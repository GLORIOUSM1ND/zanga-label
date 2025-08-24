import { useEffect, useState } from 'react';
import './SplashScreen.css';

const SplashScreen = ({ onComplete }: { onComplete: () => void }) => {
  const [stage, setStage] = useState<'idle' | 'active' | 'dissolving'>('idle');

  useEffect(() => {
    setStage('active');

    const dissolveTimer = setTimeout(() => setStage('dissolving'), 2900);
    const completeTimer = setTimeout(onComplete, 3000); // Match dissolve

    return () => {
      clearTimeout(dissolveTimer);
      clearTimeout(completeTimer);
    };
  }, [onComplete]);

  return (
    <div className={`zanga-system ${stage}`}>
      <div className="orbit-ring orbit-1"></div>
      <div className="orbit-ring orbit-2"></div>
      <div className="orbit-ring orbit-3"></div>

      <div className="brand-pyramid">
        <h1 className="zanga-core">ZANGA</h1>
        <h2 className="label-orbit">LABEL</h2>
        <h3 className="wears-moon">WEARS</h3>
      </div>
    </div>
  );
};

export default SplashScreen;