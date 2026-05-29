import React, { useState } from 'react';
import './practice.css';

const Counter = () => {
  const [count, setCount] = useState(0);
  const [step, setStep] = useState(1);

  return (
    <div className="practice-container animate-fade-in">
      <div className="practice-title">Interactive Counter App</div>
      <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
        Day 2 Topic: Managing local component state with the useState Hook and handling click events.
      </p>
      
      <div className="counter-box">
        <button 
          className="practice-btn practice-btn-secondary" 
          onClick={() => setCount(prev => Math.max(-100, prev - step))}
          style={{ minWidth: '44px', fontSize: '1.25rem' }}
        >
          -
        </button>
        <div className="counter-value">{count}</div>
        <button 
          className="practice-btn" 
          onClick={() => setCount(prev => Math.min(100, prev + step))}
          style={{ minWidth: '44px', fontSize: '1.25rem' }}
        >
          +
        </button>
      </div>

      <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', fontSize: '0.85rem' }}>
        <label style={{ color: 'var(--text-secondary)' }}>Increment Step:</label>
        <input 
          type="number" 
          className="practice-input" 
          value={step} 
          onChange={(e) => setStep(Math.max(1, parseInt(e.target.value) || 1))}
          style={{ maxWidth: '80px', padding: '0.3rem 0.5rem' }}
        />
        <button 
          className="practice-btn practice-btn-secondary" 
          onClick={() => { setCount(0); setStep(1); }}
          style={{ padding: '0.3rem 0.75rem', fontSize: '0.85rem' }}
        >
          Reset
        </button>
      </div>
    </div>
  );
};

export default Counter;
