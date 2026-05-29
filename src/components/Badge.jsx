import React from 'react';
import './components.css';

const Badge = ({ 
  label, 
  variant = 'indigo', 
  icon: Icon = null 
}) => {
  return (
    <span className={`badge-container badge-${variant}`}>
      {Icon && <Icon size={12} />}
      {label}
    </span>
  );
};

export default Badge;
