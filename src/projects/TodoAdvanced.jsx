import React, { useState, useEffect } from 'react';
import { Plus, Trash2, CheckCircle2, Circle, AlertCircle } from 'lucide-react';
import './projects.css';

const TodoAdvanced = () => {
  const [todos, setTodos] = useState(() => {
    const saved = localStorage.getItem('adv_todos');
    return saved ? JSON.parse(saved) : [
      { id: 1, text: 'Deploy React documentation portal', category: 'Study', priority: 'High', completed: false },
      { id: 2, text: 'Clean up workspace folder systems', category: 'Work', priority: 'Medium', completed: true },
      { id: 3, text: 'Submit React project timeline slides', category: 'Study', priority: 'Low', completed: false }
    ];
  });
  
  const [text, setText] = useState('');
  const [category, setCategory] = useState('Study');
  const [priority, setPriority] = useState('Medium');
  const [filterCategory, setFilterCategory] = useState('All');

  useEffect(() => {
    localStorage.setItem('adv_todos', JSON.stringify(todos));
  }, [todos]);

  const addTodo = (e) => {
    e.preventDefault();
    if (!text.trim()) return;
    setTodos([
      ...todos,
      {
        id: Date.now(),
        text: text.trim(),
        category,
        priority,
        completed: false
      }
    ]);
    setText('');
  };

  const toggleTodo = (id) => {
    setTodos(todos.map(t => t.id === id ? { ...t, completed: !t.completed } : t));
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter(t => t.id !== id));
  };

  // Analytics
  const total = todos.length;
  const completed = todos.filter(t => t.completed).length;
  const pending = total - completed;
  const completionRate = total > 0 ? Math.round((completed / total) * 100) : 0;

  // Filtered
  const filteredTodos = todos.filter(t => filterCategory === 'All' || t.category === filterCategory);

  const getPriorityColor = (prio) => {
    switch (prio) {
      case 'High': return '#f43f5e'; // rose
      case 'Medium': return '#f59e0b'; // amber
      default: return '#10b981'; // emerald
    }
  };

  return (
    <div className="project-wrapper">
      <div className="todo-adv-analytics">
        <div className="expense-sum-card">
          <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Total Tasks</div>
          <div className="expense-sum-num" style={{ color: 'var(--color-primary)' }}>{total}</div>
        </div>
        <div className="expense-sum-card">
          <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Completed</div>
          <div className="expense-sum-num" style={{ color: 'var(--color-secondary)' }}>{completed}</div>
        </div>
        <div className="expense-sum-card">
          <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Rate</div>
          <div className="expense-sum-num" style={{ color: 'var(--color-accent)' }}>{completionRate}%</div>
        </div>
      </div>

      <form onSubmit={addTodo} style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', background: 'rgba(255,255,255,0.02)', padding: '0.75rem', borderRadius: '8px' }}>
        <input 
          type="text" 
          className="practice-input" 
          placeholder="What needs to be done?" 
          value={text}
          onChange={(e) => setText(e.target.value)}
          style={{ flex: '1 1 200px' }}
        />
        
        <select 
          className="practice-input" 
          value={category} 
          onChange={(e) => setCategory(e.target.value)}
          style={{ width: '100px' }}
        >
          <option value="Study">Study</option>
          <option value="Work">Work</option>
          <option value="Personal">Personal</option>
        </select>

        <select 
          className="practice-input" 
          value={priority} 
          onChange={(e) => setPriority(e.target.value)}
          style={{ width: '100px' }}
        >
          <option value="High">High</option>
          <option value="Medium">Medium</option>
          <option value="Low">Low</option>
        </select>

        <button type="submit" className="practice-btn" style={{ flex: '0 0 auto' }}>
          <Plus size={16} /> Add
        </button>
      </form>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '0.5rem' }}>
        <span style={{ fontSize: '0.85rem', fontWeight: 600 }}>Task List</span>
        <div style={{ display: 'flex', gap: '0.25rem', alignItems: 'center' }}>
          <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Filter:</span>
          <select 
            className="practice-input" 
            value={filterCategory} 
            onChange={(e) => setFilterCategory(e.target.value)}
            style={{ width: '100px', padding: '0.2rem 0.5rem', fontSize: '0.75rem' }}
          >
            <option value="All">All Boards</option>
            <option value="Study">Study</option>
            <option value="Work">Work</option>
            <option value="Personal">Personal</option>
          </select>
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', maxHeight: '250px', overflowY: 'auto' }}>
        {filteredTodos.length === 0 ? (
          <div style={{ textAlign: 'center', color: 'var(--text-muted)', padding: '2rem', fontSize: '0.85rem' }}>
            No tasks found in this board.
          </div>
        ) : (
          filteredTodos.map(todo => (
            <div 
              key={todo.id} 
              style={{
                display: 'flex', 
                justifyContent: 'space-between', 
                alignItems: 'center', 
                padding: '0.65rem 0.85rem', 
                background: todo.completed ? 'rgba(255,255,255,0.01)' : 'rgba(255,255,255,0.03)',
                border: '1px solid var(--glass-border)',
                borderLeft: `4px solid ${getPriorityColor(todo.priority)}`,
                borderRadius: '6px',
                opacity: todo.completed ? 0.7 : 1,
                transition: 'opacity 0.2s ease'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flex: 1, textAlign: 'left' }}>
                <button 
                  onClick={() => toggleTodo(todo.id)} 
                  style={{ background: 'transparent', border: 'none', cursor: 'pointer', display: 'flex', color: todo.completed ? 'var(--color-secondary)' : 'var(--text-secondary)' }}
                >
                  {todo.completed ? <CheckCircle2 size={18} /> : <Circle size={18} />}
                </button>
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                  <span style={{ 
                    fontSize: '0.9rem', 
                    fontWeight: 500,
                    textDecoration: todo.completed ? 'line-through' : 'none',
                    color: todo.completed ? 'var(--text-muted)' : 'var(--text-primary)'
                  }}>
                    {todo.text}
                  </span>
                  <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.2rem' }}>
                    <span style={{ fontSize: '0.7rem', color: 'var(--text-secondary)', background: 'rgba(255,255,255,0.05)', padding: '0.05rem 0.35rem', borderRadius: '4px' }}>
                      {todo.category}
                    </span>
                    <span style={{ fontSize: '0.7rem', color: getPriorityColor(todo.priority), fontWeight: '500' }}>
                      {todo.priority} Priority
                    </span>
                  </div>
                </div>
              </div>
              <button 
                onClick={() => deleteTodo(todo.id)} 
                style={{ background: 'transparent', border: 'none', cursor: 'pointer', color: 'var(--color-danger)', padding: '0.25rem' }}
                aria-label="Delete advanced todo"
              >
                <Trash2 size={15} />
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default TodoAdvanced;
