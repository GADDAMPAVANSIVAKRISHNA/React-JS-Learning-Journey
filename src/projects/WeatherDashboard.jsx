import React, { useState } from 'react';
import { Search, Sun, Cloud, CloudRain, Snowflake, Wind, Droplets, AlertTriangle } from 'lucide-react';
import './projects.css';

const WeatherDashboard = () => {
  const [city, setCity] = useState('');
  const [loading, setLoading] = useState(false);
  const [weather, setWeather] = useState({
    name: 'Mumbai',
    temp: 31,
    condition: 'Rainy',
    humidity: 82,
    wind: 24,
    pressure: 1008,
    forecast: [
      { day: 'Mon', temp: 30, cond: 'Rainy' },
      { day: 'Tue', temp: 31, cond: 'Rainy' },
      { day: 'Wed', temp: 32, cond: 'Cloudy' },
      { day: 'Thu', temp: 33, cond: 'Sunny' },
      { day: 'Fri', temp: 29, cond: 'Rainy' }
    ]
  });

  const cityDB = {
    mumbai: {
      name: 'Mumbai', temp: 31, condition: 'Rainy', humidity: 82, wind: 24, pressure: 1008,
      forecast: [
        { day: 'Mon', temp: 30, cond: 'Rainy' },
        { day: 'Tue', temp: 31, cond: 'Rainy' },
        { day: 'Wed', temp: 32, cond: 'Cloudy' },
        { day: 'Thu', temp: 33, cond: 'Sunny' },
        { day: 'Fri', temp: 29, cond: 'Rainy' }
      ]
    },
    bengaluru: {
      name: 'Bengaluru', temp: 24, condition: 'Cloudy', humidity: 65, wind: 15, pressure: 1012,
      forecast: [
        { day: 'Mon', temp: 23, cond: 'Cloudy' },
        { day: 'Tue', temp: 24, cond: 'Rainy' },
        { day: 'Wed', temp: 25, cond: 'Cloudy' },
        { day: 'Thu', temp: 26, cond: 'Sunny' },
        { day: 'Fri', temp: 24, cond: 'Cloudy' }
      ]
    },
    delhi: {
      name: 'New Delhi', temp: 42, condition: 'Sunny', humidity: 25, wind: 10, pressure: 1002,
      forecast: [
        { day: 'Mon', temp: 41, cond: 'Sunny' },
        { day: 'Tue', temp: 42, cond: 'Sunny' },
        { day: 'Wed', temp: 43, cond: 'Sunny' },
        { day: 'Thu', temp: 40, cond: 'Cloudy' },
        { day: 'Fri', temp: 39, cond: 'Rainy' }
      ]
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (!city.trim()) return;

    setLoading(true);
    setTimeout(() => {
      const q = city.trim().toLowerCase();
      if (cityDB[q]) {
        setWeather(cityDB[q]);
      } else {
        const conditions = ['Sunny', 'Cloudy', 'Rainy', 'Snowy'];
        const cond = conditions[Math.floor(Math.random() * conditions.length)];
        const baseTemp = cond === 'Sunny' ? 35 : cond === 'Cloudy' ? 22 : cond === 'Rainy' ? 19 : 2;
        setWeather({
          name: city.trim(),
          temp: baseTemp + Math.floor(Math.random() * 5),
          condition: cond,
          humidity: Math.floor(Math.random() * 40) + 40,
          wind: Math.floor(Math.random() * 18) + 6,
          pressure: 1010 + Math.floor(Math.random() * 10),
          forecast: [
            { day: 'Day 1', temp: baseTemp + Math.floor(Math.random() * 4), cond },
            { day: 'Day 2', temp: baseTemp + Math.floor(Math.random() * 4), cond: 'Cloudy' },
            { day: 'Day 3', temp: baseTemp + Math.floor(Math.random() * 4), cond: 'Sunny' },
            { day: 'Day 4', temp: baseTemp + Math.floor(Math.random() * 4), cond: 'Rainy' },
            { day: 'Day 5', temp: baseTemp + Math.floor(Math.random() * 4), cond: 'Cloudy' }
          ]
        });
      }
      setLoading(false);
    }, 800);
  };

  const getWeatherIcon = (cond, size = 32) => {
    switch (cond) {
      case 'Sunny': return <Sun size={size} style={{ color: '#f59e0b' }} className="animate-float" />;
      case 'Cloudy': return <Cloud size={size} style={{ color: '#9ca3af' }} />;
      case 'Rainy': return <CloudRain size={size} style={{ color: '#38bdf8' }} />;
      case 'Snowy': return <Snowflake size={size} style={{ color: '#93c5fd' }} />;
      default: return <Sun size={size} />;
    }
  };

  return (
    <div className="project-wrapper">
      <form onSubmit={handleSearch} style={{ display: 'flex', gap: '0.5rem' }}>
        <input 
          type="text" 
          className="practice-input" 
          placeholder="Search major cities (try 'Delhi', 'Bengaluru')..." 
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <button type="submit" className="practice-btn" disabled={loading}>
          <Search size={16} /> Search
        </button>
      </form>

      {loading ? (
        <div style={{ textAlign: 'center', padding: '3rem' }}>
          <div className="animate-spin-loader" style={{ width: '32px', height: '32px', border: '3px solid rgba(255,255,255,0.1)', borderTopColor: 'var(--color-primary)', borderRadius: '50%', margin: '0 auto 1rem auto' }} />
          Updating weather matrices...
        </div>
      ) : (
        weather && (
          <div className="animate-fade-in" style={{ textAlign: 'left' }}>
            {weather.temp > 40 && (
              <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center', background: 'rgba(239, 68, 68, 0.1)', border: '1px solid #f87171', padding: '0.75rem', borderRadius: '8px', marginBottom: '1rem', color: '#fca5a5', fontSize: '0.85rem' }}>
                <AlertTriangle size={18} style={{ color: '#f87171' }} />
                <span><strong>Severe Heat Warning:</strong> Limit outdoor exposure and stay hydrated in {weather.name}!</span>
              </div>
            )}
            
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'rgba(255,255,255,0.02)', padding: '1.25rem', borderRadius: '10px', border: '1px solid var(--glass-border)' }}>
              <div>
                <h3 style={{ fontSize: '1.5rem', margin: 0 }}>{weather.name}</h3>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', marginTop: '0.2rem' }}>Climate State: {weather.condition}</p>
                <div style={{ fontSize: '2.5rem', fontWeight: 'bold', marginTop: '0.5rem', color: 'var(--text-primary)' }}>{weather.temp}°C</div>
              </div>
              <div>{getWeatherIcon(weather.condition, 64)}</div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.5rem', margin: '1rem 0' }}>
              <div style={{ background: 'rgba(255,255,255,0.01)', padding: '0.75rem', borderRadius: '8px', border: '1px solid var(--glass-border)', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <Wind size={18} style={{ color: 'var(--color-primary)', marginBottom: '0.25rem' }} />
                <span style={{ fontSize: '0.7rem', color: 'var(--text-secondary)' }}>Wind Speed</span>
                <strong style={{ fontSize: '0.9rem', marginTop: '0.1rem' }}>{weather.wind} km/h</strong>
              </div>
              <div style={{ background: 'rgba(255,255,255,0.01)', padding: '0.75rem', borderRadius: '8px', border: '1px solid var(--glass-border)', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <Droplets size={18} style={{ color: 'var(--color-info)', marginBottom: '0.25rem' }} />
                <span style={{ fontSize: '0.7rem', color: 'var(--text-secondary)' }}>Humidity</span>
                <strong style={{ fontSize: '0.9rem', marginTop: '0.1rem' }}>{weather.humidity}%</strong>
              </div>
              <div style={{ background: 'rgba(255,255,255,0.01)', padding: '0.75rem', borderRadius: '8px', border: '1px solid var(--glass-border)', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <Wind size={18} style={{ color: 'var(--color-secondary)', marginBottom: '0.25rem' }} />
                <span style={{ fontSize: '0.7rem', color: 'var(--text-secondary)' }}>Pressure</span>
                <strong style={{ fontSize: '0.9rem', marginTop: '0.1rem' }}>{weather.pressure} hPa</strong>
              </div>
            </div>

            <h4 style={{ fontSize: '0.95rem', fontWeight: 600, marginBottom: '0.5rem' }}>5-Day Extended Outlook</h4>
            <div className="weather-dash-grid">
              {weather.forecast.map((f, i) => (
                <div key={i} className="weather-forecast-day">
                  <div style={{ color: 'var(--text-secondary)', marginBottom: '0.25rem' }}>{f.day}</div>
                  <div style={{ margin: '0.25rem 0' }}>{getWeatherIcon(f.cond, 20)}</div>
                  <div style={{ fontWeight: 600 }}>{f.temp}°C</div>
                </div>
              ))}
            </div>
          </div>
        )
      )}
    </div>
  );
};

export default WeatherDashboard;
