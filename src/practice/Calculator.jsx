import React, { useState } from 'react';
import './practice.css';

const Calculator = () => {
  const [display, setDisplay] = useState('');
  
  const handleBtnClick = (val) => {
    if (val === 'C') {
      setDisplay('');
    } else if (val === '=') {
      try {
        // Safe evaluation of basic mathematical expressions using Function
        // Only allow numbers and basic operators + - * / .
        if (/^[0-9+\-*/().\s]+$/.test(display)) {
          const result = new Function(`return ${display}`)();
          setDisplay(String(result));
        } else {
          setDisplay('Error');
        }
      } catch (err) {
        setDisplay('Error');
      }
    } else {
      // Avoid starting with operators
      if (display === '' && ['+', '*', '/'].includes(val)) return;
      setDisplay(prev => prev + val);
    }
  };

  const buttons = [
    'C', '(', ')', '/',
    '7', '8', '9', '*',
    '4', '5', '6', '-',
    '1', '2', '3', '+',
    '0', '.', '='
  ];

  return (
    <div className="practice-container animate-fade-in">
      <div className="practice-title">Calculator Practice</div>
      <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
        Day 2 Topic: Event handling, key triggers, and string expression parsing.
      </p>

      <div className="calc-grid">
        <div className="calc-display">{display || '0'}</div>
        {buttons.map(btn => (
          <button 
            key={btn}
            className={`calc-btn ${['+', '-', '*', '/', 'C', '(', ')'].includes(btn) ? 'calc-btn-operator' : btn === '=' ? 'calc-btn-equals' : ''}`}
            style={btn === '0' ? { gridColumn: 'span 2' } : {}}
            onClick={() => handleBtnClick(btn)}
          >
            {btn}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Calculator;
