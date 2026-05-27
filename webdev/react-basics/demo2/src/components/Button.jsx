import React from 'react';
import './Button.css';

const Button = ({ 
  children, 
  variant = 'primary', 
  href, 
  onClick, 
  download,
  className = ''
}) => {
  const baseClass = `custom-button btn-${variant} ${className}`;

  if (href) {
    return (
      <a 
        href={href} 
        className={baseClass} 
        download={download}
        target={href.startsWith('http') ? '_blank' : '_self'}
        rel="noopener noreferrer"
      >
        {children}
      </a>
    );
  }

  return (
    <button className={baseClass} onClick={onClick}>
      {children}
    </button>
  );
};

export default Button;
