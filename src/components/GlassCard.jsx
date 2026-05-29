import React from 'react';
import './components.css';

const GlassCard = ({ 
  children, 
  className = '', 
  glow = false, 
  onClick,
  style = {} 
}) => {
  return (
    <div 
      className={`glass-panel ${glow ? 'glass-panel-glow' : ''} ${onClick ? 'clickable-card' : ''} ${className}`}
      onClick={onClick}
      style={style}
    >
      {children}
    </div>
  );
};

export default GlassCard;
