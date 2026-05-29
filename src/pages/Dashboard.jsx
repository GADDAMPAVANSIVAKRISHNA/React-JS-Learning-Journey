import React from 'react';
import { useLearning } from '../context/LearningContext';
import GlassCard from '../components/GlassCard';
import ProgressBar from '../components/ProgressBar';
import Badge from '../components/Badge';
import { Award, BookOpen, CheckCircle, Code, Calendar, Quote, Sparkles } from 'lucide-react';
import './pages.css';

const Dashboard = () => {
  const { 
    completedPractices, 
    completedProjects, 
    currentQuote, 
    rotateQuote 
  } = useLearning();

  const totalDays = 10;
  const totalPractices = 10;
  const totalProjects = 5;

  const practicesCount = completedPractices.length;
  const projectsCount = completedProjects.length;
  
  // Overall percentage formula
  const overallProgress = Math.round(
    ((10 / totalDays) * 0.2 + (practicesCount / totalPractices) * 0.4 + (projectsCount / totalProjects) * 0.4) * 100
  );

  const skillsList = [
    { name: 'JSX & Basics', value: 95, color: '#6366f1' },
    { name: 'Component Architecture', value: 95, color: '#6366f1' },
    { name: 'Props & Data Flow', value: 90, color: '#10b981' },
    { name: 'State Management (useState)', value: 90, color: '#10b981' },
    { name: 'Event Handling', value: 88, color: '#f59e0b' },
    { name: 'Conditional Rendering', value: 92, color: '#06b6d4' },
    { name: 'Lists & Keys', value: 92, color: '#06b6d4' },
    { name: 'Controlled Forms', value: 85, color: '#f59e0b' },
    { name: 'Side Effects (useEffect)', value: 85, color: '#f43f5e' },
    { name: 'API Fetching & Loaders', value: 80, color: '#f43f5e' },
    { name: 'React Router v6', value: 82, color: '#a855f7' },
    { name: 'Context API', value: 80, color: '#a855f7' },
    { name: 'Performance (useMemo/Callback)', value: 75, color: '#ec4899' }
  ];

  return (
    <div className="container animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      
      {/* Hero Header */}
      <div className="hero-wrapper">
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', background: 'rgba(99, 102, 241, 0.15)', color: '#c7d2fe', padding: '0.4rem 0.8rem', borderRadius: '9999px', fontSize: '0.8rem', fontWeight: 600, marginBottom: '1.25rem' }}>
          <Sparkles size={14} className="animate-float" />
          B.Tech CS Student Portfolio Project
        </div>
        <h1 className="hero-title">
          My <span className="gradient-text-shimmer">React Learning Journey</span>
        </h1>
        <p className="hero-subtitle">
          A comprehensive timeline record mapping my transition from zero React skills to building structured, optimized, stateful web applications.
        </p>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '1.5rem', flexWrap: 'wrap', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
          <span style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
            <Calendar size={15} style={{ color: 'var(--color-primary)' }} />
            May 18, 2026 → May 28, 2026
          </span>
          <span style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
            <Award size={15} style={{ color: 'var(--color-secondary)' }} />
            10-Day Intensive Roadmap
          </span>
        </div>
      </div>

      {/* Progress Cards Section */}
      <div>
        <h2 style={{ fontSize: '1.4rem', fontWeight: 700, textAlign: 'left', marginBottom: '1rem' }}>Learning Analytics</h2>
        <div className="stats-grid">
          <GlassCard className="stat-card" glow>
            <Calendar size={22} style={{ color: 'var(--color-primary)' }} />
            <div className="stat-number">10/10</div>
            <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Days Completed</span>
          </GlassCard>
          
          <GlassCard className="stat-card" glow>
            <Code size={22} style={{ color: 'var(--color-info)' }} />
            <div className="stat-number">{practicesCount}/10</div>
            <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Practice Labs</span>
          </GlassCard>
          
          <GlassCard className="stat-card" glow>
            <BookOpen size={22} style={{ color: 'var(--color-accent)' }} />
            <div className="stat-number">{projectsCount}/5</div>
            <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Capstones Built</span>
          </GlassCard>

          <GlassCard className="stat-card" glow>
            <CheckCircle size={22} style={{ color: 'var(--color-secondary)' }} />
            <div className="stat-number">{overallProgress}%</div>
            <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Overall Progress</span>
          </GlassCard>
        </div>
      </div>

      {/* Quote card */}
      <div className="quote-box">
        <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center', color: 'var(--color-primary)' }}>
          <Quote size={18} />
          <strong style={{ fontSize: '0.85rem', tracking: '0.5px' }}>MOTIVATIONAL LOG</strong>
        </div>
        <p style={{ fontStyle: 'italic', fontSize: '0.95rem', color: 'var(--text-primary)', maxWidth: '800px', lineHeight: 1.4 }}>
          "{currentQuote}"
        </p>
        <button 
          className="practice-btn practice-btn-secondary" 
          onClick={rotateQuote}
          style={{ padding: '0.35rem 0.75rem', fontSize: '0.75rem' }}
        >
          Next Quote
        </button>
      </div>

      {/* Skills Mastery Grid */}
      <div>
        <h2 style={{ fontSize: '1.4rem', fontWeight: 700, textAlign: 'left', marginBottom: '0.25rem' }}>React Concepts Mastered</h2>
        <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', textAlign: 'left', marginBottom: '1.25rem' }}>
          Real-time updates mapping theoretical comprehension and structural proficiency across central React features.
        </p>
        <GlassCard style={{ padding: '1.5rem' }}>
          <div className="skills-grid">
            {skillsList.map(skill => (
              <ProgressBar 
                key={skill.name} 
                label={skill.name} 
                value={skill.value} 
                color={skill.color} 
              />
            ))}
          </div>
        </GlassCard>
      </div>

    </div>
  );
};

export default Dashboard;
