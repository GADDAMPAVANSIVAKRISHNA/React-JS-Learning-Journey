import React, { useState, useEffect } from 'react';
import { RefreshCw, UserCheck } from 'lucide-react';
import './practice.css';

const ApiPractice = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const mockUsers = [
    { id: 1, name: 'Dan Abramov', login: 'gaearon', bio: 'Co-authored Redux and Create React App.' },
    { id: 2, name: 'Sophie Alpert', login: 'sophiebits', bio: 'Former React core team manager, open source developer.' },
    { id: 3, name: 'Sebastian Markbåge', login: 'sebmarkbage', bio: 'React core architect, Tech Lead at Meta.' }
  ];

  const fetchUsers = () => {
    setLoading(true);
    setError(null);
    
    // Simulate delay
    setTimeout(() => {
      // 10% chance of mock error for showing error state
      if (Math.random() < 0.15) {
        setError('Failed to fetch data. Server responded with 500. Try again!');
        setUsers([]);
      } else {
        setUsers(mockUsers);
      }
      setLoading(false);
    }, 1200);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="practice-container animate-fade-in">
      <div className="practice-title">API Fetching Simulator</div>
      <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
        Day 4 Topic: Fetching side-effects inside useEffect, handling loaders, and handling errors.
      </p>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Mock API: /api/react-core-team</span>
        <button 
          className="practice-btn practice-btn-secondary" 
          onClick={fetchUsers} 
          disabled={loading}
          style={{ padding: '0.35rem 0.6rem', fontSize: '0.75rem', gap: '0.25rem' }}
        >
          <RefreshCw size={12} className={loading ? 'animate-spin-loader' : ''} />
          Reload
        </button>
      </div>

      {loading && (
        <div style={{ textAlign: 'center', padding: '2rem', color: 'var(--text-secondary)' }}>
          <div className="animate-spin-loader" style={{ 
            width: '28px', 
            height: '28px', 
            border: '2px solid rgba(255,255,255,0.1)', 
            borderTopColor: 'var(--color-primary)', 
            borderRadius: '50%',
            margin: '0 auto 0.5rem auto'
          }} />
          Loading developers...
        </div>
      )}

      {error && (
        <div style={{ background: 'rgba(239,68,68,0.15)', border: '1px solid var(--color-danger)', padding: '1rem', borderRadius: '6px', color: '#fca5a5', fontSize: '0.85rem' }}>
          ⚠️ {error}
        </div>
      )}

      {!loading && !error && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          {users.map(u => (
            <div key={u.id} style={{ display: 'flex', gap: '0.75rem', alignItems: 'center', padding: '0.65rem', background: 'rgba(255,255,255,0.01)', border: '1px solid var(--glass-border)', borderRadius: '6px' }}>
              <div style={{ background: 'rgba(99,102,241,0.15)', width: '36px', height: '36px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--color-primary)' }}>
                <UserCheck size={18} />
              </div>
              <div style={{ flex: 1, textAlign: 'left' }}>
                <div style={{ fontSize: '0.9rem', fontWeight: '600' }}>{u.name}</div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>@{u.login}</div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.2rem' }}>{u.bio}</div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ApiPractice;
