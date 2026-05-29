import React, { useState } from 'react';
import GlassCard from '../components/GlassCard';
import CodeBlock from '../components/CodeBlock';
import { Calendar, ChevronRight, Folder, FileText, Code } from 'lucide-react';
import './pages.css';

const TimelineView = () => {
  const [selectedDay, setSelectedDay] = useState(1);

  const timelineData = [
    {
      day: 1,
      date: 'May 18, 2026',
      title: 'Introduction to React',
      topics: ['Virtual DOM & Reconciliation', 'JSX Syntax vs React.createElement', 'Functional Components', 'Configuring Props & Data-flow'],
      notes: 'React is a component-based UI library. The Virtual DOM creates a lightweight tree of elements in memory, updating only changed DOM nodes through a process called Reconciliation. JSX allows writing HTML-like tags inside JavaScript. Props are immutable parameters passed down from parents to children to declare component parameters.',
      folder: `src/\n├── components/\n│   └── GreetingCard.jsx\n├── App.jsx\n└── main.jsx`,
      code: `// GreetingCard.jsx - Custom Props practice\nimport React from 'react';\n\nfunction GreetingCard({ studentName, semester }) {\n  return (\n    <div className="profile-card">\n      <h3>Welcome back, {studentName}!</h3>\n      <p>B.Tech CS - Semester {semester}</p>\n    </div>\n  );\n}\n\nexport default GreetingCard;`
    },
    {
      day: 2,
      date: 'May 19, 2026',
      title: 'State & Event Handling',
      topics: ['Local Component State', 'useState Hook Syntax', 'Event Binding & Synthetics', 'Conditional Rendering Operators'],
      notes: 'State represents mutable data managed inside a component. The useState hook returns a state value and a function to update it. React uses SyntheticEvents to ensure consistent event behavior across multiple browsers. Conditional rendering is implemented using ternary operators or logical AND (&&) blocks.',
      folder: `src/\n├── practice/\n│   └── CounterApp.jsx\n├── App.jsx\n└── main.jsx`,
      code: `// CounterApp.jsx - State hook exercise\nimport React, { useState } from 'react';\n\nexport default function CounterApp() {\n  const [count, setCount] = useState(0);\n\n  return (\n    <div className="box">\n      <p>Current Ticks: {count}</p>\n      <button onClick={() => setCount(count + 1)}>Increment</button>\n      {count >= 10 && <p className="success">🔥 Milestone reached!</p>}\n    </div>\n  );\n}`
    },
    {
      day: 3,
      date: 'May 20, 2026',
      title: 'Lists, Keys, & Controlled Forms',
      topics: ['Rendering Arrays with .map()', 'Reconciliation Keys importance', 'Controlled Form Elements', 'Form Submission Event Hooks'],
      notes: 'React uses mapping functions to iterate and output elements from arrays. Keys must be unique strings/numbers that help React identify which items have changed, been added, or been removed. Form elements are controlled when their state values are linked directly to React state values and updated via onChange handlers.',
      folder: `src/\n├── practice/\n│   └── SearchFilter.jsx\n│   └── FormValidation.jsx\n├── App.jsx\n└── main.jsx`,
      code: `// FormValidation.jsx - Controlled form fields\nimport React, { useState } from 'react';\n\nexport default function SignupForm() {\n  const [email, setEmail] = useState('');\n  const [error, setError] = useState(null);\n\n  const handleSubmit = (e) => {\n    e.preventDefault();\n    if (!email.includes('@')) {\n      setError('Invalid email address!');\n    } else {\n      setError(null);\n      alert('Successfully registered: ' + email);\n    }\n  };\n\n  return (\n    <form onSubmit={handleSubmit}>\n      <input value={email} onChange={e => setEmail(e.target.value)} />\n      {error && <small className="error">{error}</small>}\n      <button type="submit">Join</button>\n    </form>\n  );\n}`
    },
    {
      day: 4,
      date: 'May 21, 2026',
      title: 'Side Effects & API Fetching',
      topics: ['useEffect Dependency Matrix', 'Data Fetching with Fetch API', 'Managing Loading & Error States', 'Cleanups & Memory leaks'],
      notes: 'The useEffect hook runs side effects in functional components. If dependencies are empty [], it runs only once on mount. If dependencies are variables [var], it triggers whenever the variables change. Cleanups are performed by returning a callback function inside the useEffect block to avoid memory leaks.',
      folder: `src/\n├── practice/\n│   └── ApiPractice.jsx\n├── App.jsx\n└── main.jsx`,
      code: `// Fetching data inside useEffect\nimport React, { useState, useEffect } from 'react';\n\nexport default function UserList() {\n  const [users, setUsers] = useState([]);\n  const [loading, setLoading] = useState(true);\n\n  useEffect(() => {\n    fetch('https://api.github.com/users')\n      .then(res => res.json())\n      .then(data => {\n        setUsers(data.slice(0, 5));\n        setLoading(false);\n      });\n  }, []);\n\n  if (loading) return <div>Loading records...</div>;\n  return (\n    <ul>\n      {users.map(u => <li key={u.id}>{u.login}</li>)}\n    </ul>\n  );\n}`
    },
    {
      day: 5,
      date: 'May 22, 2026',
      title: 'Routing with React Router v6',
      topics: ['Client-Side Routing principles', 'BrowserRouter & Route Setup', 'Dynamic Routing using useParams', 'Nested routes & Navigation Links'],
      notes: 'React Router makes standard single-page app navigation possible without hard reloading. Routes match the browser pathname to render components. Nested routes enable layouts structure, rendering nested paths inside an <Outlet /> element. Dynamic parameters allow referencing specific records like /student/:id.',
      folder: `src/\n├── pages/\n│   └── Timeline.jsx\n│   └── Dashboard.jsx\n├── App.jsx\n└── main.jsx`,
      code: `// App.jsx - React Router v6 setup\nimport React from 'react';\n\n// We will simulate route layouts inside our single dashboard page tabber \n// to avoid excessive build sizes during learning runs.\nexport default function CustomRouteSimulation() {\n  return (\n    <nav className="tab-menu">\n      <span>Use tabs to simulate client route states!</span>\n    </nav>\n  );\n}`
    },
    {
      day: 6,
      date: 'May 23, 2026',
      title: 'Global State & Context API',
      topics: ['Prop Drilling issues', 'Context Providers & consumers', 'Creating Custom Context Contexts', 'Provider Value mappings'],
      notes: 'Prop drilling occurs when passing props down multiple parent-child tree elements. The Context API solves this by distributing values globally. A Context.Provider wraps component trees to make state objects available in any child component using the useContext Hook.',
      folder: `src/\n├── context/\n│   └── ThemeContext.jsx\n├── App.jsx\n└── main.jsx`,
      code: `// ThemeContext.jsx - Context API structure\nimport React, { createContext, useState, useContext } from 'react';\n\nconst ThemeContext = createContext();\nexport const useTheme = () => useContext(ThemeContext);\n\nexport const ThemeProvider = ({ children }) => {\n  const [dark, setDark] = useState(true);\n  return (\n    <ThemeContext.Provider value={{ dark, toggle: () => setDark(!dark) }}>\n      {children}\n    </ThemeContext.Provider>\n  );\n};`
    },
    {
      day: 7,
      date: 'May 24, 2026',
      title: 'Custom Hooks & Reusability',
      topics: ['Extracting Stateful Logic', 'Custom Hook Signature guidelines', 'Building useLocalStorage', 'Component refactor optimizations'],
      notes: 'Custom hooks are Javascript functions whose names start with "use" and that can call other Hooks. They allow sharing stateful logic (like form validators, timer, persistent storage) without recreating components or altering elements hierarchy.',
      folder: `src/\n├── hooks/\n│   └── useLocalStorage.jsx\n├── App.jsx\n└── main.jsx`,
      code: `// useLocalStorage.jsx - Custom React Hook\nimport { useState, useEffect } from 'react';\n\nexport default function useLocalStorage(key, initialValue) {\n  const [value, setValue] = useState(() => {\n    const saved = localStorage.getItem(key);\n    return saved ? JSON.parse(saved) : initialValue;\n  });\n\n  useEffect(() => {\n    localStorage.setItem(key, JSON.stringify(value));\n  }, [key, value]);\n\n  return [value, setValue];\n}`
    },
    {
      day: 8,
      date: 'May 25, 2026',
      title: 'Performance Optimization',
      topics: ['Component Re-rendering flows', 'useMemo for calculated data', 'useCallback for event listeners', 'Lazy Loading & Suspense wrappers'],
      notes: 'Optimizing React prevents redundant renders. useMemo caches calculated parameters so they are only recalculated if variables change. useCallback caches function references, preventing down-tree components from re-rendering if they receive event functions. Code splitting is achieved using React.lazy and Suspense.',
      folder: `src/\n├── components/\n│   └── ExpensiveList.jsx\n├── App.jsx\n└── main.jsx`,
      code: `// useMemo & React.lazy snippet\nimport React, { useMemo, lazy, Suspense } from 'react';\nconst HeavyChart = lazy(() => import('./HeavyChart'));\n\nexport default function Stats({ numbers }) {\n  const sum = useMemo(() => {\n    return numbers.reduce((a, b) => a + b, 0);\n  }, [numbers]);\n\n  return (\n    <Suspense fallback={<div>Loading stats chart...</div>}>\n      <h3>Aggregate Sum: {sum}</h3>\n      <HeavyChart />\n    </Suspense>\n  );\n}`
    },
    {
      day: 9,
      date: 'May 26, 2026',
      title: 'Clean Folder Setup & Builds',
      topics: ['Scalable Folder Systems', 'Modular Component Indexes', 'CSS Module configuration rules', 'Vite Bundle and build systems'],
      notes: 'Structuring larger folders avoids clutter. Components are organized inside individual folders or categorized folders. Production bundles are generated by running npm run build, compilation output is stored in the "dist" directory for static hosting.',
      folder: `src/\n├── components/   # Card, Button, Navbar\n├── pages/        # Dashboard, Settings\n├── hooks/        # custom state logics\n├── context/      # Theme state wrappers\n├── styles/       # variables, resetting\n└── main.jsx`,
      code: `// index.js (in components folder) - Re-exporting modules\nexport { default as Button } from './Button';\nexport { default as Card } from './Card';\nexport { default as GlassCard } from './GlassCard';`
    },
    {
      day: 10,
      date: 'May 27 & 28, 2026',
      title: 'Capstone Projects & Polish',
      topics: ['Mini Projects assembly', 'Local State caching syncs', 'Layout design implementations', 'Portfolio Preparation and GitHub setup'],
      notes: 'Final capstones integrate list manipulations, API connections, theme selections, calculation blocks, and custom hooks. The portfolio is finalized by drafting clean README.md portfolios ready for showcase on LinkedIn and Resumes.',
      folder: `src/\n├── practice/     # 10 Exercises\n├── projects/     # 5 Capstones\n├── App.jsx\n└── README.md`,
      code: `// Final portfolio verification checklist\n// 1. All inputs are controlled\n// 2. Clear cleanups in side effects\n// 3. Modals and transitions are fully responsive\n// 4. Custom hooks persist states\nconsole.log("React Journey Capstone - Completed! Ready to deploy.");`
    }
  ];

  const activeDayData = timelineData.find(d => d.day === selectedDay);

  return (
    <div className="container animate-fade-in" style={{ textAlign: 'left' }}>
      <h2 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '0.25rem' }}>Learning Timeline Roadmap</h2>
      <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '2rem' }}>
        Click on any calendar day node to explore specific learned topics, folder setups, notes, and study codes.
      </p>

      <div className="split-layout">
        {/* Left Side: Timeline vertical node lists */}
        <div className="list-sidebar">
          <div className="timeline-container">
            {timelineData.map(node => (
              <div 
                key={node.day}
                className={`timeline-node ${selectedDay === node.day ? 'timeline-node-active' : ''}`}
              >
                <div className="timeline-dot" />
                <button
                  className={`selection-item-btn ${selectedDay === node.day ? 'selection-item-btn-active' : ''}`}
                  onClick={() => setSelectedDay(node.day)}
                  style={{ width: '100%', padding: '0.85rem 1rem' }}
                >
                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center', fontSize: '0.75rem', color: 'var(--text-secondary)', marginBottom: '0.15rem' }}>
                      <Calendar size={12} />
                      <span className="timeline-day">DAY {node.day}</span>
                      <span>•</span>
                      <span>{node.date}</span>
                    </div>
                    <div className="timeline-title">{node.title}</div>
                  </div>
                  <ChevronRight size={16} style={{ color: 'var(--text-muted)' }} />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Right Side: Day Details */}
        <div>
          {activeDayData && (
            <GlassCard style={{ padding: '1.5rem', minHeight: '500px', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              <div>
                <span className="timeline-day" style={{ fontSize: '0.85rem', fontWeight: 'bold', tracking: '0.5px' }}>DAY {activeDayData.day} MATRICULATION</span>
                <h3 style={{ fontSize: '1.5rem', marginTop: '0.25rem', color: 'var(--text-primary)' }}>{activeDayData.title}</h3>
                <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Log Date: {activeDayData.date}</span>
              </div>

              {/* Topics Bullets */}
              <div>
                <h4 style={{ fontSize: '0.9rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '0.5rem' }}>Core Subtopics Mastered</h4>
                <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap' }}>
                  {activeDayData.topics.map((t, idx) => (
                    <span 
                      key={idx} 
                      style={{
                        fontSize: '0.75rem', 
                        background: 'rgba(255,255,255,0.03)', 
                        border: '1px solid var(--glass-border)',
                        padding: '0.25rem 0.6rem',
                        borderRadius: '6px',
                        color: 'var(--text-secondary)'
                      }}
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              {/* Study notes */}
              <div>
                <h4 style={{ fontSize: '0.9rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '0.35rem', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                  <FileText size={14} style={{ color: 'var(--color-primary)' }} /> Study Notes
                </h4>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                  {activeDayData.notes}
                </p>
              </div>

              {/* Folder Architecture */}
              <div>
                <h4 style={{ fontSize: '0.9rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '0.35rem', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                  <Folder size={14} style={{ color: 'var(--color-info)' }} /> Directory Layout
                </h4>
                <pre style={{ 
                  background: '#090c15', 
                  border: '1px solid var(--glass-border)', 
                  padding: '0.75rem', 
                  borderRadius: '6px', 
                  fontSize: '0.8rem', 
                  fontFamily: 'var(--font-mono)', 
                  color: 'var(--text-secondary)',
                  overflowX: 'auto'
                }}>
                  {activeDayData.folder}
                </pre>
              </div>

              {/* Code Snippet */}
              <div>
                <h4 style={{ fontSize: '0.9rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '0.35rem', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                  <Code size={14} style={{ color: 'var(--color-accent)' }} /> Code Sandbox Code
                </h4>
                <CodeBlock code={activeDayData.code} language="jsx" />
              </div>
            </GlassCard>
          )}
        </div>
      </div>
    </div>
  );
};

export default TimelineView;
