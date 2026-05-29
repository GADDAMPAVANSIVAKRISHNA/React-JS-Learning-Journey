import React, { useState } from 'react';
import { useLearning } from '../context/LearningContext';
import GlassCard from '../components/GlassCard';
import Badge from '../components/Badge';
import { CheckCircle2, PlayCircle, FolderKey, FileCode, Check } from 'lucide-react';
import './pages.css';

// Import Project Components
import TodoAdvanced from '../projects/TodoAdvanced';
import MovieSearch from '../projects/MovieSearch';
import WeatherDashboard from '../projects/WeatherDashboard';
import ExpenseTracker from '../projects/ExpenseTracker';
import NotesApplication from '../projects/NotesApplication';

const ProjectHub = () => {
  const { completedProjects, toggleProject } = useLearning();
  const [selectedProjectId, setSelectedProjectId] = useState('todo-adv');

  const projects = [
    {
      id: 'todo-adv',
      title: 'Advanced Todo App',
      overview: 'A complete todo system featuring custom board classifications (Study, Personal, Work), priority parameters (High, Medium, Low), task statistics charts, and client-side caching integrations.',
      features: [
        'Multi-board category sorting.',
        'High, Medium, Low priority selectors.',
        'Total, Completed, Pending, and Completion Rate aggregates charts.',
        'Client-side state caching using local storage.'
      ],
      techs: ['React State', 'localStorage', 'Array Math Aggregates', 'SVG Charts'],
      challenges: 'Managing nested array objects updates during status checking and deletions without losing indices.',
      solution: 'Applied pure functional updates via setter callbacks, creating shallow item copies to guarantee reference integrity.',
      learned: 'Learned deep array state updating, category filters, and building statistical dashboards in React.',
      folder: 'src/projects/TodoAdvanced.jsx',
      component: <TodoAdvanced />
    },
    {
      id: 'movie-search',
      title: 'Movie Search App',
      overview: 'Interactive cinema browser displaying filters by search terms and genre lists, showing rating indicators and triggering dynamic details popup modal cards.',
      features: [
        'Genre selections dropdown filter.',
        'Full-text query filtering on description and names.',
        'Cinema cards containing rating stars and publication years.',
        'Dynamic portal details popup modal cards with closing handlers.'
      ],
      techs: ['Controlled Modals', 'Event Propagations', 'Dynamic Filtering', 'Lucide Icons'],
      challenges: 'Modal window closing triggers when clicking inside card components due to Javascript event bubbling.',
      solution: 'Stopped event propagation on the modal container using e.stopPropagation() to isolate clicks.',
      learned: 'Mastered modular layouts, overlay alignments, and event routing controls.',
      folder: 'src/projects/MovieSearch.jsx',
      component: <MovieSearch />
    },
    {
      id: 'weather-dash',
      title: 'Weather Dashboard',
      overview: 'Multi-city climate center showing current temperatures, humidity levels, wind vectors, pressure grids, severe climate warning alerts, and a 5-day extended weather outlook forecast.',
      features: [
        'Search query supporting Delhi, Bengaluru, Mumbai, or custom searches.',
        'Severe climate indicators checking high heat thresholds.',
        'Current temperature, humidity, pressure, and wind speed details.',
        '5-Day outlook forecast weather card loops.'
      ],
      techs: ['Conditional States', 'Timer Async Simulators', 'Alert Banners', 'Dynamic Glyphs'],
      challenges: 'Handling forecast card layouts on small mobile screen dimensions during layout rendering.',
      solution: 'Designed fluid flex rows and grid boxes that wrap naturally on viewport shifts.',
      learned: 'Learned multi-city weather models and responsive mobile grids.',
      folder: 'src/projects/WeatherDashboard.jsx',
      component: <WeatherDashboard />
    },
    {
      id: 'expense-tracker',
      title: 'Expense Tracker',
      overview: 'Budget manager tracking total income, expenses, and net balance aggregates. Features category tag selections, transaction input forms, and dynamic history tables.',
      features: [
        'aggregate budget cards (Net, Income, Expenses).',
        'Dual-transaction type categories inputs (Income vs Expense).',
        'Transaction table listing descriptions, categories, amounts, and remove buttons.',
        'Colorized income (+) and expense (-) value labels.'
      ],
      techs: ['Form Submissions', 'Budget Aggregate Formulae', 'Transaction History logs', 'Array Reducers'],
      challenges: 'Recalculating sum aggregates across transaction history arrays dynamically on changes.',
      solution: 'Applied Array.prototype.reduce() methods within renders to compute balances instantly.',
      learned: 'Mastered arithmetic state aggregates, list transactions, and financial indicators styling.',
      folder: 'src/projects/ExpenseTracker.jsx',
      component: <ExpenseTracker />
    },
    {
      id: 'notes-app-adv',
      title: 'Notes Application',
      overview: 'Markdown notes notebook supporting side-by-side editing, category tags, sidebar folder lists, and custom markdown HTML template converters.',
      features: [
        'Sidebar list explorer selecting active folders.',
        'Title, tag category dropdowns, and markdown text content editors.',
        'Live Markdown preview converting headers (#), bold (**), and lists (*) to formatted HTML.',
        'Double column responsive desktop workspace layouts.'
      ],
      techs: ['Markdown Converters', 'Sidebar Explorer navigators', 'Tabs Toggle controls', 'HTML injections'],
      challenges: 'Translating plain text markdown strings to HTML structures dynamically and safely in React.',
      solution: 'Designed a lightweight regex parser and used dangerouslySetInnerHTML blocks inside preview panels.',
      learned: 'Learned rich text form designs, Markdown parsing models, and sidebar active lists.',
      folder: 'src/projects/NotesApplication.jsx',
      component: <NotesApplication />
    }
  ];

  const activeProject = projects.find(p => p.id === selectedProjectId);

  return (
    <div className="container animate-fade-in" style={{ textAlign: 'left' }}>
      <h2 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '0.25rem' }}>Capstone Mini Projects</h2>
      <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '2rem' }}>
        Select a capstone project to view its technical structure, files directory, challenges solved, and interact with the live application.
      </p>

      <div className="split-layout">
        {/* Left Side: Projects List */}
        <div className="list-sidebar">
          {projects.map(p => {
            const isCompleted = completedProjects.includes(p.id);
            return (
              <button
                key={p.id}
                className={`selection-item-btn ${selectedProjectId === p.id ? 'selection-item-btn-active' : ''}`}
                onClick={() => setSelectedProjectId(p.id)}
              >
                <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
                  <button 
                    onClick={(e) => { e.stopPropagation(); toggleProject(p.id); }}
                    style={{ background: 'transparent', border: 'none', cursor: 'pointer', display: 'flex', padding: 0, color: isCompleted ? 'var(--color-secondary)' : 'var(--text-muted)' }}
                    aria-label={`Toggle completion for ${p.title}`}
                  >
                    {isCompleted ? <CheckCircle2 size={18} /> : <PlayCircle size={18} />}
                  </button>
                  <div>
                    <div style={{ fontSize: '0.9rem', fontWeight: 600 }}>{p.title}</div>
                    <span style={{ fontSize: '0.7rem', color: 'var(--text-secondary)' }}>CAPSTONE {projects.indexOf(p) + 1}</span>
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        {/* Right Side: Demo & Details */}
        <div>
          {activeProject && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              {/* Interactive Widget Box */}
              <GlassCard style={{ padding: '1.5rem', border: '1px solid rgba(16, 185, 129, 0.2)', boxShadow: '0 8px 32px var(--color-secondary-glow)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem', borderBottom: '1px solid var(--glass-border)', paddingBottom: '0.5rem' }}>
                  <span style={{ fontSize: '0.75rem', color: 'var(--color-secondary)', fontWeight: 'bold' }}>LIVE CAPSTONE DEMO</span>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                    <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Status:</span>
                    <button 
                      className="practice-btn" 
                      onClick={() => toggleProject(activeProject.id)}
                      style={{ 
                        padding: '0.2rem 0.5rem', 
                        fontSize: '0.7rem', 
                        background: completedProjects.includes(activeProject.id) ? 'var(--color-secondary)' : 'var(--bg-tertiary)',
                        border: '1px solid var(--glass-border)'
                      }}
                    >
                      {completedProjects.includes(activeProject.id) ? 'Completed' : 'Mark Completed'}
                    </button>
                  </div>
                </div>
                {activeProject.component}
              </GlassCard>

              {/* Specifications Card */}
              <GlassCard style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                <div>
                  <h3 style={{ fontSize: '1.3rem', color: 'var(--text-primary)' }}>{activeProject.title} Specifications</h3>
                  <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Reference ID: {activeProject.id}</span>
                </div>

                <div>
                  <h4 style={{ fontSize: '0.85rem', color: 'var(--text-primary)', marginBottom: '0.25rem' }}>Project Overview</h4>
                  <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: 1.4 }}>{activeProject.overview}</p>
                </div>

                <div>
                  <h4 style={{ fontSize: '0.85rem', color: 'var(--text-primary)', marginBottom: '0.35rem' }}>Key Features</h4>
                  <ul style={{ paddingLeft: '1.25rem' }}>
                    {activeProject.features.map((f, i) => (
                      <li key={i} style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '0.25rem', lineHeight: 1.4 }}>{f}</li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4 style={{ fontSize: '0.85rem', color: 'var(--text-primary)', marginBottom: '0.35rem' }}>Technologies Applied</h4>
                  <div style={{ display: 'flex', gap: '0.35rem', flexWrap: 'wrap' }}>
                    {activeProject.techs.map((t, i) => (
                      <Badge key={i} label={t} variant="emerald" />
                    ))}
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '1rem', borderTop: '1px solid var(--glass-border)', paddingTop: '1rem' }}>
                  <div>
                    <h4 style={{ fontSize: '0.85rem', color: '#fca5a5', marginBottom: '0.25rem' }}>⚠️ Challenge Faced</h4>
                    <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: 1.4 }}>{activeProject.challenges}</p>
                  </div>
                  <div>
                    <h4 style={{ fontSize: '0.85rem', color: '#6ee7b7', marginBottom: '0.25rem' }}>✅ Resolution</h4>
                    <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: 1.4 }}>{activeProject.solution}</p>
                  </div>
                </div>

                <div style={{ borderTop: '1px solid var(--glass-border)', paddingTop: '1rem' }}>
                  <h4 style={{ fontSize: '0.85rem', color: 'var(--color-accent)', marginBottom: '0.25rem' }}>💡 Learning Outcome</h4>
                  <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: 1.4 }}>{activeProject.learned}</p>
                </div>

                <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center', background: '#090c15', padding: '0.6rem 0.75rem', borderRadius: '6px', border: '1px solid var(--glass-border)', fontSize: '0.8rem' }}>
                  <FileCode size={14} style={{ color: 'var(--color-info)' }} />
                  <span style={{ color: 'var(--text-secondary)' }}>Source Code:</span>
                  <code style={{ color: 'var(--color-secondary)', fontFamily: 'var(--font-mono)' }}>{activeProject.folder}</code>
                </div>
              </GlassCard>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProjectHub;
