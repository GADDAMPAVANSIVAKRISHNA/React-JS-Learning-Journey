import React, { useState, useEffect } from 'react';
import { Plus, Trash, BookOpen, Edit, Tag } from 'lucide-react';
import './projects.css';

const NotesApplication = () => {
  const [notes, setNotes] = useState(() => {
    const saved = localStorage.getItem('adv_notes');
    return saved ? JSON.parse(saved) : [
      {
        id: 1,
        title: 'React Fiber Architecture',
        content: '### React Fiber\nReact Fiber is the core reconstruction of the rendering algorithm in React 16.\n* **Incremental rendering:** Ability to split work into chunks.\n* **Concurrency:** Pause, resume, or reuse rendering processes.',
        tag: 'Advanced'
      },
      {
        id: 2,
        title: 'Rule of Hooks',
        content: '### React Hook Rules\n1. **Only call hooks at the top level.** Don\'t call them in loops, conditions, or nested functions.\n2. **Only call hooks from React functions.** Call them in functional components or custom hooks.',
        tag: 'Fundamentals'
      }
    ];
  });

  const [activeId, setActiveId] = useState(1);
  const [editMode, setEditMode] = useState(true); // Edit vs Preview
  const [searchTag, setSearchTag] = useState('All');

  useEffect(() => {
    localStorage.setItem('adv_notes', JSON.stringify(notes));
  }, [notes]);

  const activeNote = notes.find(n => n.id === activeId) || notes[0];

  const updateActiveNote = (field, value) => {
    if (!activeNote) return;
    setNotes(notes.map(n => n.id === activeId ? { ...n, [field]: value } : n));
  };

  const createNote = () => {
    const newNote = {
      id: Date.now(),
      title: 'Untitled Note',
      content: '# New Note\nType your notes here...',
      tag: 'General'
    };
    setNotes([...notes, newNote]);
    setActiveId(newNote.id);
    setEditMode(true);
  };

  const deleteNote = (id) => {
    const filtered = notes.filter(n => n.id !== id);
    setNotes(filtered);
    if (activeId === id && filtered.length > 0) {
      setActiveId(filtered[0].id);
    }
  };

  // Safe simplified markdown parser for bold, headers, lists
  const renderMarkdown = (text) => {
    if (!text) return '';
    let html = text
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      // Headers
      .replace(/^### (.*$)/gim, '<h5 style="font-size:1.05rem;font-weight:600;margin:0.75rem 0 0.35rem 0;color:var(--color-primary)">$1</h5>')
      .replace(/^## (.*$)/gim, '<h4 style="font-size:1.2rem;font-weight:600;margin:1rem 0 0.5rem 0;color:var(--color-info)">$1</h4>')
      .replace(/^# (.*$)/gim, '<h3 style="font-size:1.4rem;font-weight:700;margin:1.25rem 0 0.75rem 0;border-bottom:1px solid var(--glass-border);padding-bottom:0.25rem">$1</h3>')
      // Bold
      .replace(/\*\*(.*)\*\*/gim, '<strong>$1</strong>')
      // Bullet points
      .replace(/^\* (.*$)/gim, '<li style="margin-left:1rem;font-size:0.875rem;line-height:1.5;color:var(--text-secondary)">$1</li>')
      .replace(/^\d\. (.*$)/gim, '<li style="margin-left:1rem;list-style-type:decimal;font-size:0.875rem;line-height:1.5;color:var(--text-secondary)">$1</li>')
      // Linebreaks
      .replace(/\n$/gim, '<br />');

    return { __html: html };
  };

  const filteredNotes = notes.filter(n => searchTag === 'All' || n.tag === searchTag);

  return (
    <div className="project-wrapper">
      <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--glass-border)', paddingBottom: '0.75rem' }}>
        <div style={{ display: 'flex', gap: '0.35rem', alignItems: 'center' }}>
          <Tag size={14} style={{ color: 'var(--color-primary)' }} />
          <select 
            className="practice-input" 
            value={searchTag} 
            onChange={(e) => setSearchTag(e.target.value)}
            style={{ width: '110px', padding: '0.2rem 0.5rem', fontSize: '0.75rem' }}
          >
            <option value="All">All Tags</option>
            <option value="Fundamentals">Fundamentals</option>
            <option value="Advanced">Advanced</option>
            <option value="General">General</option>
          </select>
        </div>
        <button className="practice-btn" onClick={createNote} style={{ padding: '0.35rem 0.75rem', fontSize: '0.75rem' }}>
          <Plus size={12} /> New Note
        </button>
      </div>

      <div className="notes-layout">
        <div className="notes-sidebar">
          {filteredNotes.length === 0 ? (
            <div style={{ color: 'var(--text-muted)', fontSize: '0.8rem', padding: '1rem', textAlign: 'center' }}>
              No notes found.
            </div>
          ) : (
            filteredNotes.map(n => (
              <div 
                key={n.id} 
                className={`notes-list-item ${activeId === n.id ? 'notes-list-item-active' : ''}`}
                onClick={() => setActiveId(n.id)}
                style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '0.25rem' }}
              >
                <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', flex: 1 }}>
                  {n.title || 'Untitled Note'}
                </span>
                <button 
                  onClick={(e) => { e.stopPropagation(); deleteNote(n.id); }}
                  style={{ background: 'transparent', border: 'none', color: 'var(--color-danger)', cursor: 'pointer', padding: '0.1rem', display: 'flex' }}
                  aria-label="Delete advanced note"
                >
                  <Trash size={12} />
                </button>
              </div>
            ))
          )}
        </div>

        {activeNote ? (
          <div className="notes-editor-container">
            <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
              <input 
                type="text" 
                className="practice-input"
                value={activeNote.title}
                onChange={(e) => updateActiveNote('title', e.target.value)}
                placeholder="Note Title..."
                style={{ flex: 1, fontWeight: 'bold' }}
              />
              <select 
                className="practice-input" 
                value={activeNote.tag} 
                onChange={(e) => updateActiveNote('tag', e.target.value)}
                style={{ width: '120px' }}
              >
                <option value="General">General</option>
                <option value="Fundamentals">Fundamentals</option>
                <option value="Advanced">Advanced</option>
              </select>
            </div>

            <div style={{ display: 'flex', gap: '0.25rem', background: 'rgba(255,255,255,0.02)', padding: '0.25rem', borderRadius: '6px', border: '1px solid var(--glass-border)', width: 'fit-content' }}>
              <button 
                className={`practice-btn ${editMode ? '' : 'practice-btn-secondary'}`}
                onClick={() => setEditMode(true)}
                style={{ padding: '0.3rem 0.6rem', fontSize: '0.75rem', gap: '0.25rem' }}
              >
                <Edit size={12} /> Edit
              </button>
              <button 
                className={`practice-btn ${!editMode ? '' : 'practice-btn-secondary'}`}
                onClick={() => setEditMode(false)}
                style={{ padding: '0.3rem 0.6rem', fontSize: '0.75rem', gap: '0.25rem' }}
              >
                <BookOpen size={12} /> Preview Markdown
              </button>
            </div>

            {editMode ? (
              <textarea 
                className="practice-input"
                value={activeNote.content}
                onChange={(e) => updateActiveNote('content', e.target.value)}
                placeholder="Markdown text... (use # for h1, ## for h2, * for lists)"
                style={{ flex: 1, minHeight: '220px', fontFamily: 'var(--font-mono)', fontSize: '0.85rem' }}
              />
            ) : (
              <div 
                className="practice-input"
                style={{ flex: 1, minHeight: '220px', overflowY: 'auto', background: '#090c15', textAlign: 'left', padding: '1rem' }}
                dangerouslySetInnerHTML={renderMarkdown(activeNote.content)}
              />
            )}
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', gap: '0.5rem', color: 'var(--text-muted)' }}>
            <BookOpen size={48} style={{ opacity: 0.2 }} />
            <span>Select or create a note to get started!</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default NotesApplication;
