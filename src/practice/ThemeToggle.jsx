import React, { useState } from 'react';
import './practice.css';

const ThemeToggle = () => {
  const [localTheme, setLocalTheme] = useState('indigo');
  
  const themes = {
    indigo: { color: '#6366f1', glow: 'rgba(99, 102, 241, 0.15)', name: 'Indigo Dream' },
    emerald: { color: '#10b981', glow: 'rgba(16, 185, 129, 0.15)', name: 'Emerald Forest' },
    amber: { color: '#f59e0b', glow: 'rgba(245, 158, 11, 0.15)', name: 'Amber Glow' },
    rose: { color: '#f43f5e', glow: 'rgba(244, 63, 94, 0.15)', name: 'Rose Petals' }
  };

  const current = themes[localTheme];

  return (
    <div className="practice-container animate-fade-in">
      <div className="practice-title">Theme Customizer Preview</div>
      <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
        Day 6 Topic: Local state toggles simulating global Context-based theme distributions.
      </p>

      <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'center' }}>
        {Object.keys(themes).map(themeName => (
          <button
            key={themeName}
            className="practice-btn"
            style={{
              background: themes[themeName].color,
              padding: '0.4rem 0.8rem',
              fontSize: '0.75rem',
              border: localTheme === themeName ? '2px solid white' : '2px solid transparent',
              boxShadow: localTheme === themeName ? `0 0 8px ${themes[themeName].color}` : 'none'
            }}
            onClick={() => setLocalTheme(themeName)}
          >
            {themeName.toUpperCase()}
          </button>
        ))}
      </div>

      <div 
        style={{
          border: `1px solid ${current.color}`,
          background: `rgba(255,255,255,0.01)`,
          padding: '1rem',
          borderRadius: '8px',
          boxShadow: `0 0 15px ${current.glow}`,
          transition: 'all 0.3s ease',
          textAlign: 'center'
        }}
      >
        <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Theme Context Mode</span>
        <h4 style={{ color: current.color, margin: '0.25rem 0', fontSize: '1.1rem' }}>{current.name}</h4>
        <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
          This sub-card adapts its colors dynamically using properties linked to the active theme state.
        </p>
      </div>
    </div>
  );
};

export default ThemeToggle;
