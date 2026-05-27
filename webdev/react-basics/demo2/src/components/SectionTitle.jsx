import React from 'react';

const SectionTitle = ({ title, subtitle }) => {
  return (
    <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
      <h2 style={{ 
        fontSize: '2.5rem', 
        marginBottom: '1rem',
        display: 'inline-block',
        position: 'relative',
        background: 'var(--gradient-primary)',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        textShadow: '0 0 20px rgba(129, 140, 248, 0.2)'
      }}>
        {title}
        <div style={{
          position: 'absolute',
          bottom: '-10px',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '80%',
          height: '4px',
          background: 'var(--gradient-primary)',
          borderRadius: '4px',
          boxShadow: '0 0 10px rgba(56, 189, 248, 0.5)'
        }}/>
      </h2>
      {subtitle && (
        <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem', marginTop: '1.5rem' }}>
          {subtitle}
        </p>
      )}
    </div>
  );
};

export default SectionTitle;
