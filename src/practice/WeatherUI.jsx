import React, { useState } from 'react';
import { Search, Sun, Cloud, CloudRain, Snowflake } from 'lucide-react';
import './practice.css';

const WeatherUI = () => {
  const [city, setCity] = useState('');
  const [loading, setLoading] = useState(false);
  const [weather, setWeather] = useState({
    name: 'New Delhi',
    temp: 34,
    condition: 'Sunny',
    humidity: 45,
    wind: 12
  });

  const mockWeatherData = {
    delhi: { name: 'New Delhi', temp: 34, condition: 'Sunny', humidity: 45, wind: 12 },
    newyork: { name: 'New York', temp: 18, condition: 'Cloudy', humidity: 60, wind: 15 },
    london: { name: 'London', temp: 14, condition: 'Rainy', humidity: 85, wind: 18 },
    tokyo: { name: 'Tokyo', temp: 22, condition: 'Cloudy', humidity: 55, wind: 8 },
    toronto: { name: 'Toronto', temp: 5, condition: 'Snowy', humidity: 70, wind: 22 }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (!city.trim()) return;

    setLoading(true);
    // Simulate API fetch delay
    setTimeout(() => {
      const query = city.trim().toLowerCase().replace(/\s+/g, '');
      if (mockWeatherData[query]) {
        setWeather(mockWeatherData[query]);
      } else {
        // Generate random realistic weather if not in list
        const conditions = ['Sunny', 'Cloudy', 'Rainy', 'Snowy'];
        const cond = conditions[Math.floor(Math.random() * conditions.length)];
        const temps = { Sunny: 28, Cloudy: 19, Rainy: 16, Snowy: -2 };
        setWeather({
          name: city.trim(),
          temp: temps[cond] + Math.floor(Math.random() * 5),
          condition: cond,
          humidity: Math.floor(Math.random() * 50) + 40,
          wind: Math.floor(Math.random() * 20) + 5
        });
      }
      setLoading(false);
    }, 800);
  };

  const getWeatherIcon = (cond) => {
    switch (cond) {
      case 'Sunny': return <Sun size={48} className="text-warning animate-float" style={{ color: '#f59e0b' }} />;
      case 'Cloudy': return <Cloud size={48} className="text-secondary" style={{ color: '#9ca3af' }} />;
      case 'Rainy': return <CloudRain size={48} className="text-info" style={{ color: '#06b6d4' }} />;
      case 'Snowy': return <Snowflake size={48} className="text-primary" style={{ color: '#93c5fd' }} />;
      default: return <Sun size={48} />;
    }
  };

  return (
    <div className="practice-container animate-fade-in">
      <div className="practice-title">Weather App UI Practice</div>
      <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
        Day 4 Topic: Simulated async calls, mock states, and dynamic status loading.
      </p>

      <form onSubmit={handleSearch} style={{ display: 'flex', gap: '0.5rem' }}>
        <input 
          type="text" 
          className="practice-input" 
          placeholder="Try 'London', 'Tokyo' or any city..." 
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <button type="submit" className="practice-btn" disabled={loading}>
          <Search size={16} />
        </button>
      </form>

      {loading ? (
        <div style={{ textAlign: 'center', padding: '1.5rem', color: 'var(--text-secondary)' }}>
          <div className="animate-spin-loader" style={{ 
            width: '24px', 
            height: '24px', 
            border: '2px solid rgba(255,255,255,0.1)', 
            borderTopColor: 'var(--color-primary)', 
            borderRadius: '50%',
            margin: '0 auto 0.5rem auto'
          }} />
          Fetching data...
        </div>
      ) : (
        weather && (
          <div className="weather-card">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ textAlign: 'left' }}>
                <h4 style={{ margin: 0, fontSize: '1.2rem' }}>{weather.name}</h4>
                <span style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.6)' }}>{weather.condition}</span>
              </div>
              {getWeatherIcon(weather.condition)}
            </div>
            <div className="weather-temp">{weather.temp}°C</div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: 'rgba(255,255,255,0.7)', borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '0.5rem' }}>
              <span>Humidity: {weather.humidity}%</span>
              <span>Wind: {weather.wind} km/h</span>
            </div>
          </div>
        )
      )}
    </div>
  );
};

export default WeatherUI;
