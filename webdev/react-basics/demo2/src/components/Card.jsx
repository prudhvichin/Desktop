import React from 'react';
import './Card.css';

const Card = ({ children, className = '', hover = true }) => {
  return (
    <div className={`custom-card glass-panel ${hover ? 'card-hover' : ''} ${className}`}>
      {children}
    </div>
  );
};

export default Card;
