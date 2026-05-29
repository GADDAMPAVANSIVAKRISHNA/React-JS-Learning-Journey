import React, { useState, useEffect } from 'react';
import { Plus, Trash2, TrendingUp, TrendingDown, DollarSign } from 'lucide-react';
import './projects.css';

const ExpenseTracker = () => {
  const [transactions, setTransactions] = useState(() => {
    const saved = localStorage.getItem('expenses');
    return saved ? JSON.parse(saved) : [
      { id: 1, text: 'YouTube Premium Sync', amount: 199, category: 'Utilities', type: 'Expense' },
      { id: 2, text: 'Freelance UI Work', amount: 5000, category: 'Work', type: 'Income' },
      { id: 3, text: 'React Reference Book', amount: 850, category: 'Books', type: 'Expense' }
    ];
  });
  
  const [text, setText] = useState('');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('Utilities');
  const [type, setType] = useState('Expense');

  useEffect(() => {
    localStorage.setItem('expenses', JSON.stringify(transactions));
  }, [transactions]);

  const addTransaction = (e) => {
    e.preventDefault();
    if (!text.trim() || !amount) return;
    
    setTransactions([
      ...transactions,
      {
        id: Date.now(),
        text: text.trim(),
        amount: Math.abs(parseFloat(amount)),
        category,
        type
      }
    ]);
    setText('');
    setAmount('');
  };

  const deleteTransaction = (id) => {
    setTransactions(transactions.filter(t => t.id !== id));
  };

  // Calculations
  const income = transactions
    .filter(t => t.type === 'Income')
    .reduce((sum, t) => sum + t.amount, 0);

  const expense = transactions
    .filter(t => t.type === 'Expense')
    .reduce((sum, t) => sum + t.amount, 0);

  const balance = income - expense;

  return (
    <div className="project-wrapper">
      <div className="expense-summary-cards">
        <div className="expense-sum-card">
          <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Net Balance</span>
          <div className="expense-sum-num" style={{ color: balance >= 0 ? 'var(--color-secondary)' : 'var(--color-danger)' }}>
            ₹{balance}
          </div>
        </div>
        <div className="expense-sum-card">
          <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Income</span>
          <div className="expense-sum-num" style={{ color: 'var(--color-secondary)' }}>
            ₹{income}
          </div>
        </div>
        <div className="expense-sum-card">
          <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Expenses</span>
          <div className="expense-sum-num" style={{ color: 'var(--color-danger)' }}>
            ₹{expense}
          </div>
        </div>
      </div>

      <div className="expense-layout">
        <form onSubmit={addTransaction} style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem', background: 'rgba(255,255,255,0.02)', padding: '1rem', borderRadius: '10px', border: '1px solid var(--glass-border)', textAlign: 'left' }}>
          <h4 style={{ fontSize: '0.9rem', fontWeight: 600, borderBottom: '1px solid var(--glass-border)', paddingBottom: '0.4rem' }}>Add Transaction</h4>
          
          <div>
            <label style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', display: 'block', marginBottom: '0.2rem' }}>Description</label>
            <input 
              type="text" 
              className="practice-input" 
              placeholder="e.g. Hostinger Server..." 
              value={text}
              onChange={(e) => setText(e.target.value)}
            />
          </div>

          <div>
            <label style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', display: 'block', marginBottom: '0.2rem' }}>Amount (INR)</label>
            <input 
              type="number" 
              className="practice-input" 
              placeholder="Amount..." 
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem' }}>
            <div>
              <label style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', display: 'block', marginBottom: '0.2rem' }}>Category</label>
              <select className="practice-input" value={category} onChange={(e) => setCategory(e.target.value)}>
                <option value="Utilities">Utilities</option>
                <option value="Work">Work</option>
                <option value="Books">Books</option>
                <option value="Food">Food</option>
                <option value="Leisure">Leisure</option>
              </select>
            </div>
            <div>
              <label style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', display: 'block', marginBottom: '0.2rem' }}>Type</label>
              <select className="practice-input" value={type} onChange={(e) => setType(e.target.value)}>
                <option value="Expense">Expense</option>
                <option value="Income">Income</option>
              </select>
            </div>
          </div>

          <button type="submit" className="practice-btn" style={{ marginTop: '0.5rem' }}>
            <Plus size={16} /> Record Transaction
          </button>
        </form>

        <div style={{ background: 'rgba(255,255,255,0.01)', border: '1px solid var(--glass-border)', padding: '1rem', borderRadius: '10px', display: 'flex', flexDirection: 'column', gap: '0.5rem', textAlign: 'left' }}>
          <h4 style={{ fontSize: '0.9rem', fontWeight: 600, borderBottom: '1px solid var(--glass-border)', paddingBottom: '0.4rem' }}>Transaction History</h4>
          
          <div style={{ overflowX: 'auto', maxHeight: '230px' }}>
            <table className="expense-table">
              <thead>
                <tr>
                  <th>Items</th>
                  <th>Group</th>
                  <th>Value</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {transactions.length === 0 ? (
                  <tr>
                    <td colSpan="4" style={{ textAlign: 'center', color: 'var(--text-muted)', padding: '1rem' }}>No records logged yet.</td>
                  </tr>
                ) : (
                  transactions.map(t => (
                    <tr key={t.id}>
                      <td style={{ fontWeight: 500 }}>{t.text}</td>
                      <td>
                        <span style={{ fontSize: '0.7rem', background: 'rgba(255,255,255,0.05)', padding: '0.1rem 0.35rem', borderRadius: '4px', color: 'var(--text-secondary)' }}>
                          {t.category}
                        </span>
                      </td>
                      <td style={{ fontWeight: 600, color: t.type === 'Income' ? 'var(--color-secondary)' : 'var(--color-danger)' }}>
                        {t.type === 'Income' ? '+' : '-'}₹{t.amount}
                      </td>
                      <td>
                        <button 
                          onClick={() => deleteTransaction(t.id)} 
                          style={{ background: 'transparent', border: 'none', cursor: 'pointer', color: 'var(--color-danger)', padding: '0.2rem' }}
                          aria-label="Delete transaction"
                        >
                          <Trash2 size={13} />
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExpenseTracker;
