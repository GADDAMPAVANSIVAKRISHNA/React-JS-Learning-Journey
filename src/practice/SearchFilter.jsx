import React, { useState } from 'react';
import './practice.css';

const SearchFilter = () => {
  const [searchTerm, setSearchTerm] = useState('');
  
  const reactConcepts = [
    { name: 'useState', type: 'Hook', desc: 'Allows functional components to declare and update local state.' },
    { name: 'useEffect', type: 'Hook', desc: 'Handles side effects like data fetching, subscriptions, or manual DOM edits.' },
    { name: 'useContext', type: 'Hook', desc: 'Accepts a context object and returns the current context value.' },
    { name: 'useRef', type: 'Hook', desc: 'Creates a mutable object that persists across component re-renders.' },
    { name: 'useMemo', type: 'Optimization', desc: 'Memoizes expensive computed values to prevent redundant calculations.' },
    { name: 'useCallback', type: 'Optimization', desc: 'Returns a memoized version of a callback function.' },
    { name: 'JSX', type: 'Syntax', desc: 'JavaScript XML, a syntax extension allowing HTML-like templates inside JavaScript.' },
    { name: 'Virtual DOM', type: 'Concept', desc: 'A lightweight copy of the real DOM tree kept in memory for quick reconciliation.' }
  ];

  const filtered = reactConcepts.filter(concept =>
    concept.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    concept.desc.toLowerCase().includes(searchTerm.toLowerCase()) ||
    concept.type.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="practice-container animate-fade-in">
      <div className="practice-title">Sub-second Search Filter</div>
      <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
        Day 3 Topic: Client-side filtering of array lists using input onChange hooks.
      </p>

      <input 
        type="text" 
        className="practice-input" 
        placeholder="Type to filter hooks (e.g. 'memo', 'use')..." 
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginTop: '0.25rem', maxHeight: '200px', overflowY: 'auto' }}>
        {filtered.length === 0 ? (
          <div style={{ textAlign: 'center', color: 'var(--text-muted)', fontSize: '0.85rem', padding: '1rem' }}>
            No matching terms found.
          </div>
        ) : (
          filtered.map(concept => (
            <div key={concept.name} style={{ padding: '0.5rem 0.75rem', background: 'rgba(255,255,255,0.01)', border: '1px solid var(--glass-border)', borderRadius: '6px', textAlign: 'left' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <strong style={{ color: 'var(--color-primary)', fontSize: '0.9rem' }}>{concept.name}</strong>
                <span style={{ fontSize: '0.7rem', background: 'rgba(255,255,255,0.05)', padding: '0.1rem 0.4rem', borderRadius: '4px', color: 'var(--text-secondary)' }}>
                  {concept.type}
                </span>
              </div>
              <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', marginTop: '0.2rem' }}>{concept.desc}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default SearchFilter;
