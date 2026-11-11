import { useState, useEffect } from 'react';

export function ScrollProgressObserver() {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollTop || document.body.scrollTop;
      const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      if (windowHeight > 0) {
        const progress = Math.min(Math.max((totalScroll / windowHeight) * 100, 0), 100);
        setScrollProgress(progress);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="fixed top-0 left-0 right-0 h-[2.5px] z-50 pointer-events-none bg-emerald-950/40">
      <div
        className="h-full bg-gradient-to-r from-emerald-500 via-teal-400 to-lime-400 transition-all duration-75 ease-out shadow-[0_0_10px_rgba(16,185,129,0.7)]"
        style={{ width: `${scrollProgress}%` }}
      />
    </div>
  );
}
