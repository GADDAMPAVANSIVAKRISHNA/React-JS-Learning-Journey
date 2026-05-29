import React from 'react';
import GlassCard from '../components/GlassCard';
import Badge from '../components/Badge';
import { Database, Server, Compass, Network, Mail } from 'lucide-react';
import './pages.css';

const Github = ({ size = 16, className = '' }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
  </svg>
);

const Linkedin = ({ size = 16, className = '', style = {} }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" className={className} style={style}>
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect x="2" y="9" width="4" height="12" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

const Conclusion = () => {
  const nextSteps = [
    {
      title: 'Backend Integration',
      icon: Server,
      color: 'var(--color-primary)',
      desc: 'Build secure, scalable RESTful APIs. Node.js and Express.js will form the core backend environment to coordinate client-server communication.',
      topics: ['Node.js fundamentals', 'Express routing modules', 'JWT User Authentications', 'REST APIs design']
    },
    {
      title: 'Database Persistence',
      icon: Database,
      color: 'var(--color-info)',
      desc: 'Connect applications to databases. Establish structured schemas and relations using MongoDB for document flexibility or PostgreSQL for transactional consistency.',
      topics: ['MongoDB schemas & Mongoose', 'PostgreSQL relational SQL', 'CRUD state persistence', 'Caching with Redis']
    },
    {
      title: 'Full-Stack Frameworks',
      icon: Compass,
      color: 'var(--color-secondary)',
      desc: 'Transition to production frameworks. Next.js will enable Server Components, API route handlers, static generation (SSG), and server-side rendering (SSR) in a unified codebase.',
      topics: ['Next.js App Router', 'React Server Components', 'Vercel cloud hosting', 'Server actions integrations']
    },
    {
      title: 'Open Source & Tooling',
      icon: Network,
      color: 'var(--color-accent)',
      desc: 'Contribute to developer tools. Master state managers like Zustand or Redux Toolkit, explore Tailwind CSS styles sheets, and collaborate on GitHub open-source repositories.',
      topics: ['Zustand state managers', 'Advanced Tailwind modules', 'TypeScript integrations', 'GitHub open-source contributions']
    }
  ];

  return (
    <div className="container animate-fade-in" style={{ textAlign: 'left' }}>
      <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
        <h2 style={{ fontSize: '2rem', fontWeight: 800, marginBottom: '0.5rem' }}>
          My React Journey <span className="gradient-text-shimmer">Continues...</span>
        </h2>
        <p style={{ color: 'var(--text-secondary)', maxWidth: '600px', margin: '0 auto', fontSize: '0.95rem' }}>
          Completing the 10-day React sprint is just the beginning. I am gearing up to master backend concepts and transition into a full-stack engineer.
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '1.25rem', marginBottom: '3rem' }}>
        {nextSteps.map((step, idx) => {
          const StepIcon = step.icon;
          return (
            <GlassCard key={idx} style={{ padding: '1.5rem', display: 'flex', gap: '1.25rem', alignItems: 'flex-start', flexWrap: 'wrap' }}>
              <div style={{ 
                background: `rgba(255,255,255,0.02)`, 
                border: `1px solid var(--glass-border)`,
                padding: '0.85rem',
                borderRadius: '10px',
                color: step.color,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <StepIcon size={26} />
              </div>
              <div style={{ flex: 1, minWidth: '250px' }}>
                <h3 style={{ fontSize: '1.15rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '0.35rem' }}>{step.title}</h3>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: 1.5, marginBottom: '0.75rem' }}>{step.desc}</p>
                <div style={{ display: 'flex', gap: '0.35rem', flexWrap: 'wrap' }}>
                  {step.topics.map((t, i) => (
                    <Badge key={i} label={t} variant="indigo" />
                  ))}
                </div>
              </div>
            </GlassCard>
          );
        })}
      </div>

      <GlassCard style={{ padding: '2rem', textAlign: 'center', background: 'linear-gradient(135deg, rgba(99,102,241,0.06) 0%, rgba(16,185,129,0.06) 100%)', border: '1px solid rgba(99,102,241,0.2)' }}>
        <h3 style={{ fontSize: '1.3rem', fontWeight: 700, marginBottom: '0.5rem' }}>Let's Build Something Together!</h3>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', maxWidth: '500px', margin: '0 auto 1.5rem auto', lineHeight: 1.4 }}>
          I am actively looking for software engineering internship opportunities, collaboration requests on React projects, and open-source contributions.
        </p>
        
        <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap' }}>
          <a 
            href="https://github.com" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="practice-btn"
            style={{ gap: '0.5rem' }}
          >
            <Github size={16} /> GitHub Profile
          </a>
          <a 
            href="https://linkedin.com" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="practice-btn practice-btn-secondary"
            style={{ gap: '0.5rem' }}
          >
            <Linkedin size={16} style={{ color: '#0077b5' }} /> LinkedIn
          </a>
          <a 
            href="mailto:student@example.com" 
            className="practice-btn practice-btn-secondary"
            style={{ gap: '0.5rem' }}
          >
            <Mail size={16} /> Email Me
          </a>
        </div>
      </GlassCard>
    </div>
  );
};

export default Conclusion;
