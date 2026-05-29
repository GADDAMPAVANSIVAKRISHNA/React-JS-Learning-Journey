import React from 'react';
import GlassCard from '../components/GlassCard';
import Badge from '../components/Badge';
import { AlertCircle, ShieldAlert, CheckCircle, HelpCircle } from 'lucide-react';
import './pages.css';

const ChallengesLog = () => {
  const challenges = [
    {
      title: 'Effect Lifecycle & Dependencies',
      category: 'Hooks & Cleanups',
      symptom: 'Infinite fetch loops triggered when updating states inside useEffect, resulting in rate-limiting blocks and browser freezing.',
      cause: 'Leaving out the dependency array in useEffect []. On state update, the component re-rendered, triggering the effect again, updating state, and causing a recursive loop.',
      solution: 'Provided a strict dependency array []. For parameters that trigger re-fetching (like query parameters), include only those variables in the array. Return a cleanup handler to abort fetches during updates.'
    },
    {
      title: 'State Sharing & Prop Drilling',
      category: 'State Management',
      symptom: 'Passing user session variables down 5 levels of components tree. Intermediate wrapper components did not use the state but were cluttered with props.',
      cause: 'Placing state high up (State Hoisting) and manually passing parameters through each child layer, making changes to state models difficult to refactor.',
      solution: 'Created a global context using createContext() and useLearning(). Wrapped the dashboard shell in a provider, allowing down-tree cards to pull states instantly with useContext.'
    },
    {
      title: 'React Router Routing Confusion',
      category: 'Navigation Layouts',
      symptom: 'Navigation links changing the browser URL but displaying blank empty pages instead of target page sub-views.',
      cause: 'Configuring nested routes inside Router layouts without providing an <Outlet /> template tag to display child layouts.',
      solution: 'Refactored layouts wrappers to include <Outlet /> inside the layout container, or structured standalone route panels to prevent mounting empty paths.'
    },
    {
      title: 'API Ticks & Memory Leak Alerts',
      category: 'API & Side Effects',
      symptom: 'React terminal throwing console errors: "Can\'t perform a React state update on an unmounted component. This is a no-op, but it indicates a memory leak..."',
      cause: 'Asynchronous fetch promises resolving after components unmount (e.g. user changes tabs before fetch completes). The component state updates on an unmounted container.',
      solution: 'Used an active flag boolean inside the hook. On cleanup, set active = false, and ignore updates if not active. Better yet, integrated standard AbortController signals.'
    },
    {
      title: 'Folder Structure Organization',
      category: 'Architecture',
      symptom: 'Struggling to find files inside a single workspace folder. Relative import statements look cluttered, e.g. ../../../components/Button.jsx.',
      cause: 'Placing all styles, components, templates, and exercises in a flat list without structured directory systems.',
      solution: 'Adopted standard feature-oriented directory directories (assets, components, context, hooks, pages, practice, projects, styles), and configured clean index exports.'
    },
    {
      title: 'Syntax & Null reference errors',
      category: 'Debugging',
      symptom: 'App crashing with: "Cannot read properties of undefined (reading \'map\')" when rendering list cards.',
      cause: 'Attempting to iterate lists before APIs return values (value starts as undefined or null), or when API endpoints return error maps instead of arrays.',
      solution: 'Used short-circuit evaluation (items && items.map) or modern optional chaining (items?.map). Setup fallback default variables: useState([]) instead of useState(null).'
    }
  ];

  return (
    <div className="container animate-fade-in" style={{ textAlign: 'left' }}>
      <h2 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '0.25rem' }}>Challenges Faced & Resolutions</h2>
      <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '2rem' }}>
        A portfolio summary detailing realistic hurdles faced during React maturation, analyzing root causes and detailing standard developer workarounds.
      </p>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '1.5rem' }}>
        {challenges.map((c, i) => (
          <GlassCard key={i} style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '0.5rem' }}>
              <h3 style={{ fontSize: '1.2rem', fontWeight: 600, color: 'var(--text-primary)' }}>{c.title}</h3>
              <Badge label={c.category} variant="rose" icon={ShieldAlert} />
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginTop: '0.5rem', fontSize: '0.85rem' }}>
              <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'flex-start' }}>
                <AlertCircle size={16} style={{ color: 'var(--color-danger)', marginTop: '2px', flexShrink: 0 }} />
                <div>
                  <span style={{ color: 'var(--text-primary)', fontWeight: 600 }}>Symptom:</span>{' '}
                  <span style={{ color: 'var(--text-secondary)' }}>{c.symptom}</span>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'flex-start' }}>
                <HelpCircle size={16} style={{ color: 'var(--color-accent)', marginTop: '2px', flexShrink: 0 }} />
                <div>
                  <span style={{ color: 'var(--text-primary)', fontWeight: 600 }}>Root Cause:</span>{' '}
                  <span style={{ color: 'var(--text-secondary)' }}>{c.cause}</span>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'flex-start', borderTop: '1px solid var(--glass-border)', paddingTop: '0.75rem' }}>
                <CheckCircle size={16} style={{ color: 'var(--color-secondary)', marginTop: '2px', flexShrink: 0 }} />
                <div>
                  <span style={{ color: 'var(--text-primary)', fontWeight: 600 }}>Resolution:</span>{' '}
                  <span style={{ color: 'var(--text-secondary)' }}>{c.solution}</span>
                </div>
              </div>
            </div>
          </GlassCard>
        ))}
      </div>
    </div>
  );
};

export default ChallengesLog;
