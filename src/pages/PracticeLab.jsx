import React, { useState } from 'react';
import { useLearning } from '../context/LearningContext';
import GlassCard from '../components/GlassCard';
import Badge from '../components/Badge';
import { Check, CheckCircle2, AlertCircle, PlayCircle, Folder } from 'lucide-react';
import './pages.css';

// Import Practice Components
import Counter from '../practice/Counter';
import Todo from '../practice/Todo';
import WeatherUI from '../practice/WeatherUI';
import Calculator from '../practice/Calculator';
import FormValidation from '../practice/FormValidation';
import ApiPractice from '../practice/ApiPractice';
import ThemeToggle from '../practice/ThemeToggle';
import SearchFilter from '../practice/SearchFilter';
import NotesApp from '../practice/NotesApp';
import Stopwatch from '../practice/Stopwatch';

const PracticeLab = () => {
  const { completedPractices, togglePractice } = useLearning();
  const [selectedPracticeId, setSelectedPracticeId] = useState('counter');

  const practices = [
    {
      id: 'counter',
      title: 'Counter App',
      desc: 'Multi-step counter app featuring custom step increment adjustments and state bounds controls.',
      concepts: ['useState', 'event handling', 'bounds tracking'],
      outcome: 'Learned state hook modifications, event trigger handlers, and styling components based on value bounds.',
      folder: 'src/practice/Counter.jsx',
      component: <Counter />
    },
    {
      id: 'todo-basic',
      title: 'Basic Todo App',
      desc: 'Simple task list renderer displaying task addition, individual checking, and task deletions.',
      concepts: ['lists & keys', 'controlled inputs', 'array filters'],
      outcome: 'Mastered iterating arrays with .map(), assigning key attributes, and updating arrays via state setters.',
      folder: 'src/practice/Todo.jsx',
      component: <Todo />
    },
    {
      id: 'weather-ui',
      title: 'Weather App UI',
      desc: 'A search dashboard simulating network delays, weather condition card displays, and wind/humidity readings.',
      concepts: ['async simulations', 'conditional loaders', 'inline layout coloring'],
      outcome: 'Understood managing loading states, conditionally rendering elements, and formatting weather parameters.',
      folder: 'src/practice/WeatherUI.jsx',
      component: <WeatherUI />
    },
    {
      id: 'calculator',
      title: 'Calculator App',
      desc: 'Grid calculator with numbers, operators, parenthesized groups, clear key, and safe expression evaluations.',
      concepts: ['grid structures', 'synthetics routing', 'math processing'],
      outcome: 'Designed grid layouts, routed button events to state variables, and evaluated simple string expressions.',
      folder: 'src/practice/Calculator.jsx',
      component: <Calculator />
    },
    {
      id: 'form-validation',
      title: 'Form Validation',
      desc: 'Register panel displaying live input warnings, email formatting checks, and password complexity calculations.',
      concepts: ['controlled forms', 'live regex validations', 'passwords matching'],
      outcome: 'Learned to block form submissions, calculate password complexity levels, and display validation status indicators.',
      folder: 'src/practice/FormValidation.jsx',
      component: <FormValidation />
    },
    {
      id: 'api-fetching',
      title: 'API Fetching Practice',
      desc: 'Simulated server requesting logs displaying developer profile summaries and connection error fallbacks.',
      concepts: ['useEffect mount', 'fetch simulated requests', 'error catching states'],
      outcome: 'Implemented network fetching simulation inside mount lifecycle hooks, rendering pending views and alert nodes.',
      folder: 'src/practice/ApiPractice.jsx',
      component: <ApiPractice />
    },
    {
      id: 'theme-toggle',
      title: 'Theme Toggle Box',
      desc: 'Local style color controller adjusting theme variables and border shadows in a preview container.',
      concepts: ['style custom variables', 'interactive state toggles', 'box-shadow glow adjustments'],
      outcome: 'Configured dynamic inline styling maps and modeled global theme provider states inside localized blocks.',
      folder: 'src/practice/ThemeToggle.jsx',
      component: <ThemeToggle />
    },
    {
      id: 'search-filter',
      title: 'Search Filter List',
      desc: 'Sub-millisecond filtering matching concepts, types, and descriptions in a scrollable list.',
      concepts: ['string match comparisons', 'filter array actions', 'scroll containers'],
      outcome: 'Created real-time search mechanisms that compute sub-selections directly during component renders.',
      folder: 'src/practice/SearchFilter.jsx',
      component: <SearchFilter />
    },
    {
      id: 'notes-app',
      title: 'Notes Board App',
      desc: 'Sticky notes wall allowing note additions, custom yellow/green/blue/pink card theme options, and deletions.',
      concepts: ['multi-field forms', 'dynamic backgrounds', 'grid positioning'],
      outcome: 'Managed dynamic background colors on cards, and mapped input texts to customizable post-it notes.',
      folder: 'src/practice/NotesApp.jsx',
      component: <NotesApp />
    },
    {
      id: 'stopwatch',
      title: 'Stopwatch App',
      desc: 'Precision centisecond timer featuring Start/Pause, Lap records lists, and reset operations.',
      concepts: ['useRef timers', 'setInterval intervals', 'milliseconds parsing'],
      outcome: 'Learned to maintain active interval timers in refs across renders, preventing memory leaks during unmounts.',
      folder: 'src/practice/Stopwatch.jsx',
      component: <Stopwatch />
    }
  ];

  const activePractice = practices.find(p => p.id === selectedPracticeId);

  return (
    <div className="container animate-fade-in" style={{ textAlign: 'left' }}>
      <h2 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '0.25rem' }}>Practice & Hands-On Learning</h2>
      <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '2rem' }}>
        Select a practice lab from the list to view its code details, folder locations, and interact with the live widget.
      </p>

      <div className="split-layout">
        {/* Left Side: Exercise List */}
        <div className="list-sidebar">
          {practices.map(p => {
            const isCompleted = completedPractices.includes(p.id);
            return (
              <button
                key={p.id}
                className={`selection-item-btn ${selectedPracticeId === p.id ? 'selection-item-btn-active' : ''}`}
                onClick={() => setSelectedPracticeId(p.id)}
              >
                <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
                  <button 
                    onClick={(e) => { e.stopPropagation(); togglePractice(p.id); }}
                    style={{ background: 'transparent', border: 'none', cursor: 'pointer', display: 'flex', padding: 0, color: isCompleted ? 'var(--color-secondary)' : 'var(--text-muted)' }}
                    aria-label={`Toggle completion for ${p.title}`}
                  >
                    {isCompleted ? <CheckCircle2 size={18} /> : <PlayCircle size={18} />}
                  </button>
                  <div>
                    <div style={{ fontSize: '0.9rem', fontWeight: 600 }}>{p.title}</div>
                    <span style={{ fontSize: '0.7rem', color: 'var(--text-secondary)' }}>{p.concepts[0].toUpperCase()}</span>
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        {/* Right Side: Showcase */}
        <div>
          {activePractice && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              {/* Interactive Widget Box */}
              <GlassCard style={{ padding: '1.5rem', border: '1px solid rgba(99, 102, 241, 0.2)', boxShadow: '0 8px 32px var(--color-primary-glow)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem', borderBottom: '1px solid var(--glass-border)', paddingBottom: '0.5rem' }}>
                  <span style={{ fontSize: '0.75rem', color: 'var(--color-primary)', fontWeight: 'bold' }}>LIVE INTERACTIVE SANDBOX</span>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                    <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Status:</span>
                    <button 
                      className="practice-btn" 
                      onClick={() => togglePractice(activePractice.id)}
                      style={{ 
                        padding: '0.2rem 0.5rem', 
                        fontSize: '0.7rem', 
                        background: completedPractices.includes(activePractice.id) ? 'var(--color-secondary)' : 'var(--bg-tertiary)',
                        border: '1px solid var(--glass-border)'
                      }}
                    >
                      {completedPractices.includes(activePractice.id) ? 'Completed' : 'Mark Completed'}
                    </button>
                  </div>
                </div>
                {activePractice.component}
              </GlassCard>

              {/* Specifications details */}
              <GlassCard style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <div>
                  <h3 style={{ fontSize: '1.25rem', color: 'var(--text-primary)' }}>{activePractice.title} Specs</h3>
                  <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Log ID: {activePractice.id}</span>
                </div>

                <div>
                  <h4 style={{ fontSize: '0.85rem', color: 'var(--text-primary)', marginBottom: '0.25rem' }}>Description</h4>
                  <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: 1.4 }}>{activePractice.desc}</p>
                </div>

                <div>
                  <h4 style={{ fontSize: '0.85rem', color: 'var(--text-primary)', marginBottom: '0.35rem' }}>Concepts Applied</h4>
                  <div style={{ display: 'flex', gap: '0.35rem', flexWrap: 'wrap' }}>
                    {activePractice.concepts.map((c, i) => (
                      <Badge key={i} label={c} variant="indigo" />
                    ))}
                  </div>
                </div>

                <div>
                  <h4 style={{ fontSize: '0.85rem', color: 'var(--text-primary)', marginBottom: '0.25rem' }}>Learning Outcome</h4>
                  <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: 1.4 }}>{activePractice.outcome}</p>
                </div>

                <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center', background: '#090c15', padding: '0.6rem 0.75rem', borderRadius: '6px', border: '1px solid var(--glass-border)', fontSize: '0.8rem' }}>
                  <Folder size={14} style={{ color: 'var(--color-info)' }} />
                  <span style={{ color: 'var(--text-secondary)' }}>File Location:</span>
                  <code style={{ color: 'var(--color-secondary)', fontFamily: 'var(--font-mono)' }}>{activePractice.folder}</code>
                </div>
              </GlassCard>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PracticeLab;
