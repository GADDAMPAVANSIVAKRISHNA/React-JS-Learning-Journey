import React from 'react';
import { LearningProvider, useLearning } from './context/LearningContext';

// Import Pages
import Dashboard from './pages/Dashboard';
import TimelineView from './pages/TimelineView';
import PracticeLab from './pages/PracticeLab';
import ProjectHub from './pages/ProjectHub';
import ChallengesLog from './pages/ChallengesLog';
import Conclusion from './pages/Conclusion';

// Import Icons
import { 
  BarChart3, 
  Milestone, 
  Code2, 
  Laptop, 
  AlertTriangle, 
  Send,
  Atom
} from 'lucide-react';
import './pages/pages.css';

const AppContent = () => {
  const { activeTab, setActiveTab } = useLearning();

  const navigationItems = [
    { id: 'dashboard', label: 'Dashboard', icon: BarChart3 },
    { id: 'timeline', label: 'Timeline Roadmap', icon: Milestone },
    { id: 'practice', label: 'Practice Lab', icon: Code2 },
    { id: 'projects', label: 'Capstone Projects', icon: Laptop },
    { id: 'challenges', label: 'Challenges Log', icon: AlertTriangle },
    { id: 'conclusion', label: 'Next Steps', icon: Send }
  ];

  const renderActivePage = () => {
    switch (activeTab) {
      case 'dashboard': return <Dashboard />;
      case 'timeline': return <TimelineView />;
      case 'practice': return <PracticeLab />;
      case 'projects': return <ProjectHub />;
      case 'challenges': return <ChallengesLog />;
      case 'conclusion': return <Conclusion />;
      default: return <Dashboard />;
    }
  };

  return (
    <div className="app-shell">
      {/* Sidebar Navigation */}
      <aside className="app-sidebar">
        <div className="logo-section">
          <Atom size={24} style={{ color: 'var(--color-primary)' }} className="animate-spin-loader" />
          <span className="logo-text">ReactJourney_2026</span>
        </div>
        
        <nav className="nav-links">
          {navigationItems.map(item => {
            const IconComponent = item.icon;
            return (
              <button
                key={item.id}
                className={`nav-btn ${activeTab === item.id ? 'nav-btn-active' : ''}`}
                onClick={() => setActiveTab(item.id)}
              >
                <IconComponent size={18} />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>
        
        <div style={{ marginTop: 'auto', display: 'none', borderTop: '1px solid var(--glass-border)', paddingTop: '1rem', fontSize: '0.75rem', color: 'var(--text-muted)', textAlign: 'left' }}>
          <span>B.Tech CS Learner Project</span>
        </div>
      </aside>

      {/* Main Panel Content Area */}
      <main className="app-main">
        {renderActivePage()}
      </main>
    </div>
  );
};

function App() {
  return (
    <LearningProvider>
      <AppContent />
    </LearningProvider>
  );
}

export default App;
