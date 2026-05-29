import React, { useState } from 'react';
import './practice.css';

const FormValidation = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const validateField = (name, value) => {
    let tempErrors = { ...errors };
    
    switch (name) {
      case 'username':
        if (!value.trim()) tempErrors.username = 'Username is required';
        else if (value.length < 3) tempErrors.username = 'Must be at least 3 characters';
        else delete tempErrors.username;
        break;
      case 'email':
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!value.trim()) tempErrors.email = 'Email is required';
        else if (!emailRegex.test(value)) tempErrors.email = 'Enter a valid email address';
        else delete tempErrors.email;
        break;
      case 'password':
        if (!value) tempErrors.password = 'Password is required';
        else if (value.length < 6) tempErrors.password = 'Password must be at least 6 characters';
        else delete tempErrors.password;
        
        // Also re-validate matching password
        if (formData.confirmPassword && value !== formData.confirmPassword) {
          tempErrors.confirmPassword = 'Passwords do not match';
        } else if (formData.confirmPassword) {
          delete tempErrors.confirmPassword;
        }
        break;
      case 'confirmPassword':
        if (!value) tempErrors.confirmPassword = 'Confirm your password';
        else if (value !== formData.password) tempErrors.confirmPassword = 'Passwords do not match';
        else delete tempErrors.confirmPassword;
        break;
      default:
        break;
    }
    
    setErrors(tempErrors);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    validateField(name, value);
  };

  const getPasswordStrength = (pass) => {
    if (!pass) return 'None';
    if (pass.length < 6) return 'Weak';
    const hasNumbers = /\d/.test(pass);
    const hasSpecial = /[!@#$%^&*(),.?":{}|<>]/.test(pass);
    if (hasNumbers && hasSpecial) return 'Strong';
    return 'Medium';
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validate all fields
    const newErrors = {};
    if (!formData.username.trim()) newErrors.username = 'Username is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    if (!formData.password) newErrors.password = 'Password is required';
    if (!formData.confirmPassword) newErrors.confirmPassword = 'Confirm your password';
    if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = 'Passwords do not match';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({ username: '', email: '', password: '', confirmPassword: '' });
    }, 3000);
  };

  const strength = getPasswordStrength(formData.password);
  const strengthColors = { None: '#6b7280', Weak: '#ef4444', Medium: '#f59e0b', Strong: '#10b981' };

  return (
    <div className="practice-container animate-fade-in">
      <div className="practice-title">Form Validation Practice</div>
      <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
        Day 3 Topic: Controlled input elements, submit preventions, and validator logic.
      </p>

      {submitted ? (
        <div style={{ background: 'rgba(16,185,129,0.15)', border: '1px solid var(--color-secondary)', padding: '1rem', borderRadius: '6px', textAlign: 'center', color: '#6ee7b7' }}>
          🎉 Registration Successful! State resets shortly.
        </div>
      ) : (
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          <div>
            <input 
              type="text" 
              name="username"
              className="practice-input" 
              placeholder="Username" 
              value={formData.username}
              onChange={handleChange}
            />
            {errors.username && <span style={{ fontSize: '0.75rem', color: 'var(--color-danger)', marginTop: '0.25rem', display: 'block' }}>{errors.username}</span>}
          </div>

          <div>
            <input 
              type="email" 
              name="email"
              className="practice-input" 
              placeholder="Email address" 
              value={formData.email}
              onChange={handleChange}
            />
            {errors.email && <span style={{ fontSize: '0.75rem', color: 'var(--color-danger)', marginTop: '0.25rem', display: 'block' }}>{errors.email}</span>}
          </div>

          <div>
            <input 
              type="password" 
              name="password"
              className="practice-input" 
              placeholder="Password (min 6 chars)" 
              value={formData.password}
              onChange={handleChange}
            />
            {formData.password && (
              <span style={{ fontSize: '0.75rem', color: strengthColors[strength], display: 'block', marginTop: '0.25rem' }}>
                Strength: <strong>{strength}</strong>
              </span>
            )}
            {errors.password && <span style={{ fontSize: '0.75rem', color: 'var(--color-danger)', marginTop: '0.25rem', display: 'block' }}>{errors.password}</span>}
          </div>

          <div>
            <input 
              type="password" 
              name="confirmPassword"
              className="practice-input" 
              placeholder="Confirm Password" 
              value={formData.confirmPassword}
              onChange={handleChange}
            />
            {errors.confirmPassword && <span style={{ fontSize: '0.75rem', color: 'var(--color-danger)', marginTop: '0.25rem', display: 'block' }}>{errors.confirmPassword}</span>}
          </div>

          <button type="submit" className="practice-btn" style={{ marginTop: '0.5rem' }}>
            Register Student
          </button>
        </form>
      )}
    </div>
  );
};

export default FormValidation;
