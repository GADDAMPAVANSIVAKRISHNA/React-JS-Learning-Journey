import React, { useState } from 'react';
import { Plus, Trash } from 'lucide-react';
import './practice.css';

const Todo = () => {
  const [todos, setTodos] = useState([
    { id: 1, text: 'Learn React Props', completed: true },
    { id: 2, text: 'Master useState hook', completed: false },
    { id: 3, text: 'Build simple forms', completed: false }
  ]);
  const [inputValue, setInputValue] = useState('');

  const addTodo = (e) => {
    e.preventDefault();
    if (!inputValue.trim()) return;
    setTodos([
      ...todos,
      { id: Date.now(), text: inputValue.trim(), completed: false }
    ]);
    setInputValue('');
  };

  const toggleTodo = (id) => {
    setTodos(todos.map(todo => 
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  return (
    <div className="practice-container animate-fade-in">
      <div className="practice-title">Basic Todo Exercise</div>
      <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
        Day 3 Topic: Lists, unique keys, and basic form state management.
      </p>

      <form onSubmit={addTodo} style={{ display: 'flex', gap: '0.5rem' }}>
        <input 
          type="text" 
          className="practice-input" 
          placeholder="Add a simple task..." 
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
        <button type="submit" className="practice-btn">
          <Plus size={16} />
        </button>
      </form>

      <div className="todo-list">
        {todos.length === 0 ? (
          <div style={{ textAlign: 'center', color: 'var(--text-muted)', fontSize: '0.85rem', padding: '1rem' }}>
            No tasks. Type above to add one!
          </div>
        ) : (
          todos.map(todo => (
            <div key={todo.id} className="todo-item">
              <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
                <input 
                  type="checkbox" 
                  checked={todo.completed} 
                  onChange={() => toggleTodo(todo.id)}
                  style={{ cursor: 'pointer' }}
                />
                <span className={`todo-text ${todo.completed ? 'todo-text-completed' : ''}`}>
                  {todo.text}
                </span>
              </label>
              <button 
                onClick={() => deleteTodo(todo.id)} 
                className="todo-delete-btn"
                aria-label="Delete todo"
              >
                <Trash size={14} />
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Todo;
