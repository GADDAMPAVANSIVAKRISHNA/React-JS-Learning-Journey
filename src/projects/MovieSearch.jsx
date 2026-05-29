import React, { useState } from 'react';
import { Search, Star, X, Film } from 'lucide-react';
import './projects.css';

const MovieSearch = () => {
  const [query, setQuery] = useState('');
  const [genre, setGenre] = useState('All');
  const [selectedMovie, setSelectedMovie] = useState(null);

  const movies = [
    { id: 1, title: 'Inception', genre: 'Sci-Fi', rating: 8.8, year: 2010, desc: 'A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O.' },
    { id: 2, title: 'The Dark Knight', genre: 'Action', rating: 9.0, year: 2008, desc: 'When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, Batman must accept one of the greatest psychological and physical tests of his ability to fight injustice.' },
    { id: 3, title: 'Interstellar', genre: 'Sci-Fi', rating: 8.6, year: 2014, desc: 'A team of explorers travel through a wormhole in space in an attempt to ensure humanity\'s survival.' },
    { id: 4, title: 'Whiplash', genre: 'Drama', rating: 8.5, year: 2014, desc: 'A promising young drummer enrolls at a cut-throat music conservatory where his dreams of greatness are mentored by an instructor who will stop at nothing to realize a student\'s potential.' },
    { id: 5, title: 'The Matrix', genre: 'Sci-Fi', rating: 8.7, year: 1999, desc: 'When a beautiful stranger leads computer hacker Neo to a forbidding underworld, he discovers the shocking truth--the life he knows is the elaborate deception of an evil cyber-intelligence.' },
    { id: 6, title: 'Parasite', genre: 'Drama', rating: 8.6, year: 2019, desc: 'Greed and class discrimination threaten the newly formed symbiotic relationship between the wealthy Park family and the destitute Kim clan.' }
  ];

  const filteredMovies = movies.filter(movie => {
    const matchesQuery = movie.title.toLowerCase().includes(query.toLowerCase()) || 
                         movie.desc.toLowerCase().includes(query.toLowerCase());
    const matchesGenre = genre === 'All' || movie.genre === genre;
    return matchesQuery && matchesGenre;
  });

  return (
    <div className="project-wrapper">
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
        <div style={{ flex: 1, position: 'relative' }}>
          <input 
            type="text" 
            className="practice-input" 
            placeholder="Search mock blockbuster movies..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            style={{ paddingLeft: '2.2rem' }}
          />
          <Search size={16} style={{ position: 'absolute', left: '10px', top: '12px', color: 'var(--text-muted)' }} />
        </div>
        <select 
          className="practice-input" 
          value={genre} 
          onChange={(e) => setGenre(e.target.value)}
          style={{ width: '120px' }}
        >
          <option value="All">All Genres</option>
          <option value="Sci-Fi">Sci-Fi</option>
          <option value="Action">Action</option>
          <option value="Drama">Drama</option>
        </select>
      </div>

      <div className="movie-grid">
        {filteredMovies.length === 0 ? (
          <div style={{ gridColumn: 'span 4', textAlign: 'center', color: 'var(--text-muted)', padding: '2rem' }}>
            No movies match your filters.
          </div>
        ) : (
          filteredMovies.map(movie => (
            <div key={movie.id} className="movie-card" onClick={() => setSelectedMovie(movie)}>
              <div className="movie-poster-placeholder">
                <Film size={32} style={{ marginBottom: '0.5rem', opacity: 0.5 }} />
                <span style={{ fontWeight: 600 }}>{movie.title}</span>
                <span style={{ fontSize: '0.75rem', marginTop: '0.2rem', opacity: 0.7 }}>({movie.year})</span>
              </div>
              <div className="movie-info">
                <div className="movie-title">{movie.title}</div>
                <div className="movie-meta">
                  <span>{movie.genre}</span>
                  <span className="movie-rating">
                    <Star size={12} fill="var(--color-accent)" style={{ color: 'var(--color-accent)' }} />
                    {movie.rating}
                  </span>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {selectedMovie && (
        <div 
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            background: 'rgba(0,0,0,0.8)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 999,
            padding: '1rem'
          }}
          onClick={() => setSelectedMovie(null)}
        >
          <div 
            className="glass-panel"
            style={{
              width: '100%',
              maxWidth: '500px',
              background: 'var(--bg-secondary)',
              padding: '1.5rem',
              position: 'relative',
              boxShadow: '0 10px 30px rgba(0,0,0,0.5)',
              textAlign: 'left'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <button 
              onClick={() => setSelectedMovie(null)}
              style={{ position: 'absolute', right: '15px', top: '15px', background: 'transparent', border: 'none', cursor: 'pointer', color: 'var(--text-secondary)' }}
              aria-label="Close movie details modal"
            >
              <X size={20} />
            </button>
            <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center', marginBottom: '0.5rem' }}>
              <span style={{ fontSize: '0.75rem', background: 'var(--color-primary-glow)', color: '#c7d2fe', padding: '0.2rem 0.5rem', borderRadius: '4px', fontWeight: 600 }}>
                {selectedMovie.genre}
              </span>
              <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
                {selectedMovie.year}
              </span>
            </div>
            <h3 style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>{selectedMovie.title}</h3>
            
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', color: 'var(--color-accent)', fontWeight: 600, fontSize: '0.95rem', marginBottom: '1rem' }}>
              <Star size={16} fill="var(--color-accent)" style={{ color: 'var(--color-accent)' }} />
              {selectedMovie.rating} / 10 User Rating
            </div>

            <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
              {selectedMovie.desc}
            </p>

            <button 
              className="practice-btn" 
              style={{ marginTop: '1.5rem', width: '100%' }}
              onClick={() => setSelectedMovie(null)}
            >
              Close Details
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default MovieSearch;
