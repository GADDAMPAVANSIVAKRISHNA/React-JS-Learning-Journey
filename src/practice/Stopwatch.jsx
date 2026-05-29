import React, { useState, useRef, useEffect } from 'react';
import { Play, Pause, RotateCcw, Flag } from 'lucide-react';
import './practice.css';

const Stopwatch = () => {
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [laps, setLaps] = useState([]);
  
  const timerRef = useRef(null);

  const startStop = () => {
    if (isRunning) {
      clearInterval(timerRef.current);
      setIsRunning(false);
    } else {
      setIsRunning(true);
      const startTime = Date.now() - time;
      timerRef.current = setInterval(() => {
        setTime(Date.now() - startTime);
      }, 10);
    }
  };

  const reset = () => {
    clearInterval(timerRef.current);
    setIsRunning(false);
    setTime(0);
    setLaps([]);
  };

  const addLap = () => {
    if (isRunning) {
      setLaps([formatTime(time), ...laps]);
    }
  };

  const formatTime = (timeMs) => {
    const minutes = Math.floor(timeMs / 60000);
    const seconds = Math.floor((timeMs % 60000) / 1000);
    const centiseconds = Math.floor((timeMs % 1000) / 10);

    const pad = (num) => String(num).padStart(2, '0');
    return `${pad(minutes)}:${pad(seconds)}.${pad(centiseconds)}`;
  };

  useEffect(() => {
    return () => clearInterval(timerRef.current);
  }, []);

  return (
    <div className="practice-container animate-fade-in">
      <div className="practice-title">Precision Stopwatch</div>
      <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
        Day 7 & 10 Topic: Using useRef to store active interval hooks and managing precise state ticking.
      </p>

      <div className="stopwatch-time">{formatTime(time)}</div>

      <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'center' }}>
        <button className="practice-btn" onClick={startStop}>
          {isRunning ? <Pause size={14} /> : <Play size={14} />}
          {isRunning ? 'Pause' : 'Start'}
        </button>
        <button className="practice-btn practice-btn-secondary" onClick={addLap} disabled={!isRunning}>
          <Flag size={14} /> Lap
        </button>
        <button className="practice-btn practice-btn-secondary" onClick={reset}>
          <RotateCcw size={14} /> Reset
        </button>
      </div>

      {laps.length > 0 && (
        <div className="stopwatch-laps">
          {laps.map((lap, index) => (
            <div key={index} className="stopwatch-lap-item">
              <span>Lap {laps.length - index}</span>
              <span>{lap}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Stopwatch;
