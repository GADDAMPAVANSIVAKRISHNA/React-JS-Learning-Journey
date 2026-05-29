import React, { useEffect, useState } from 'react';
import './components.css';

const ProgressBar = ({ 
  label, 
  value = 0, // Out of 100
  color = 'var(--color-primary)'
}) => {
  const [width, setWidth] = useState(0);

  useEffect(() => {
    // Delay width transition to allow mounting animation
    const timer = setTimeout(() => {
      setWidth(value);
    }, 100);
    return () => clearTimeout(timer);
  }, [value]);

  return (
    <div className="progress-bar-wrapper">
      <div className="progress-bar-header">
        <span className="progress-bar-label">{label}</span>
        <span className="progress-bar-value">{value}%</span>
      </div>
      <div className="progress-bar-track">
        <div 
          className="progress-bar-fill"
          style={{ 
            width: `${width}%`,
            background: `linear-gradient(90deg, ${color}, #c084fc)`
          }}
        />
      </div>
    </div>
  );
};

export default ProgressBar;
