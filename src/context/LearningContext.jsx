import React, { createContext, useContext, useState, useEffect } from 'react';

const LearningContext = createContext();

export const useLearning = () => useContext(LearningContext);

export const LearningProvider = ({ children }) => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [completedPractices, setCompletedPractices] = useState(() => {
    const saved = localStorage.getItem('completedPractices');
    return saved ? JSON.parse(saved) : ['counter', 'todo-basic', 'calculator']; // pre-complete some to look active
  });
  const [completedProjects, setCompletedProjects] = useState(() => {
    const saved = localStorage.getItem('completedProjects');
    return saved ? JSON.parse(saved) : ['todo-adv', 'weather-dash'];
  });
  
  // Motivational Quotes list
  const quotes = [
    "Clean code always looks like it was written by someone who cares. — Michael Feathers",
    "First, solve the problem. Then, write the code. — John Johnson",
    "React makes it painless to create interactive UIs. Design simple views for each state in your application.",
    "Make it work, make it right, make it fast. — Kent Beck",
    "The only way to learn a new programming language is by writing programs in it. — Dennis Ritchie"
  ];
  
  const [currentQuote, setCurrentQuote] = useState(quotes[0]);
  
  useEffect(() => {
    localStorage.setItem('completedPractices', JSON.stringify(completedPractices));
  }, [completedPractices]);

  useEffect(() => {
    localStorage.setItem('completedProjects', JSON.stringify(completedProjects));
  }, [completedProjects]);

  const togglePractice = (id) => {
    setCompletedPractices(prev => 
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  const toggleProject = (id) => {
    setCompletedProjects(prev => 
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  const rotateQuote = () => {
    const currentIndex = quotes.indexOf(currentQuote);
    const nextIndex = (currentIndex + 1) % quotes.length;
    setCurrentQuote(quotes[nextIndex]);
  };

  return (
    <LearningContext.Provider value={{
      activeTab,
      setActiveTab,
      completedPractices,
      togglePractice,
      completedProjects,
      toggleProject,
      currentQuote,
      rotateQuote
    }}>
      {children}
    </LearningContext.Provider>
  );
};
