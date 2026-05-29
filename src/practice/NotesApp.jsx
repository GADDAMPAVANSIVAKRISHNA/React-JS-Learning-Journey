import React, { useState } from 'react';
import { Plus, Trash } from 'lucide-react';
import './practice.css';

const NotesApp = () => {
  const [notes, setNotes] = useState([
    { id: 1, text: 'Prop Drilling is when you pass props down multiple levels unnecessarily.', color: 'yellow' },
    { id: 2, text: 'Remember: useEffect with empty array runs once on mount.', color: 'green' }
  ]);
  const [text, setText] = useState('');
  const [color, setColor] = useState('yellow');

  const addNote = (e) => {
    e.preventDefault();
    if (!text.trim()) return;
    setNotes([
      ...notes,
      { id: Date.now(), text: text.trim(), color }
    ]);
    setText('');
  };

  const deleteNote = (id) => {
    setNotes(notes.filter(note => note.id !== id));
  };

  return (
    <div className="practice-container animate-fade-in">
      <div className="practice-title">Sticky Notes App</div>
      <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
        Day 3 Topic: State management with lists, form control, and key handling.
      </p>

      <form onSubmit={addNote} style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
        <textarea 
          className="practice-input" 
          placeholder="Type note content here..."
          value={text}
          onChange={(e) => setText(e.target.value)}
          style={{ minHeight: '60px', resize: 'vertical' }}
        />
        
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex', gap: '0.35rem' }}>
            {['yellow', 'green', 'blue', 'pink'].map(col => (
              <button
                key={col}
                type="button"
                style={{
                  width: '20px',
                  height: '20px',
                  borderRadius: '50%',
                  border: color === col ? '1.5px solid white' : '1.5px solid transparent',
                  cursor: 'pointer',
                  backgroundColor: col === 'yellow' ? '#fde047' : col === 'green' ? '#86efac' : col === 'blue' ? '#93c5fd' : '#fbcfe8'
                }}
                onClick={() => setColor(col)}
                aria-label={`Select color ${col}`}
              />
            ))}
          </div>
          <button type="submit" className="practice-btn" style={{ padding: '0.4rem 0.8rem', fontSize: '0.8rem' }}>
            <Plus size={14} /> Add Note
          </button>
        </div>
      </form>

      <div className="notes-grid">
        {notes.map(note => (
          <div key={note.id} className={`sticky-note sticky-note-${note.color}`}>
            <span className="sticky-note-text">{note.text}</span>
            <button 
              onClick={() => deleteNote(note.id)} 
              className="sticky-note-delete"
              aria-label="Delete note"
            >
              <Trash size={12} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NotesApp;
