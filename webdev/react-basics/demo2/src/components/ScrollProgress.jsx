import React, { useState, useEffect } from 'react';

const ScrollProgress = () => {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollTop;
      const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scroll = `${(totalScroll / windowHeight) * 100}%`;
      setScrollProgress(scroll);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div 
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        height: '3px',
        width: scrollProgress,
        background: 'var(--gradient-primary)',
        zIndex: 9999,
        transition: 'width 0.1s ease-out',
        boxShadow: '0 0 15px rgba(0, 210, 255, 0.6)'
      }}
    />
  );
};

export default ScrollProgress;
