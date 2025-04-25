import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Header from './Header';
import './App.css';

// App Component
const App = () => {
  const [movies, setMovies] = useState([]);
  const [genres, setGenres] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  // Fetch movie data from the backend
  useEffect(() => {
    fetch('https://4800api.sdvxindex.com/api/movies') // replace with your actual backend URL
      .then(response => response.json())
      .then(data => {
        setMovies(data);

        // Extract unique genres after movies are fetched
        const uniqueGenres = Array.from(new Set(data.map(m => m.genre)));
        setGenres(uniqueGenres);
      })
      .catch(error => console.error('Error fetching movies:', error));
  }, []); 

  // Filter movies based on the search term
  const filteredMovies = movies.filter(movie =>
    movie.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Filter genres based on the filtered movies
  const filteredGenres = genres.filter(genre =>
    filteredMovies.some(movie => movie.genre === genre)
  );

  // Update search term from Header
  const handleSearchTermChange = (term) => {
    setSearchTerm(term);
  };

  return (
    <>
      <div className='head'>
        <Header onSearchTermChange={handleSearchTermChange} />
      </div>
      <div className="app-container">
        
        <h1 className="browse">Browse Movies</h1>
        
        {filteredGenres.map(genre => (
          <div key={genre} className="genre-section">
            <h2 className="genre-title">{genre}</h2>
            <div className="movie-row">
              {filteredMovies.filter(movie => movie.genre === genre).map(movie => (
                <Link 
                  key={movie.title} 
                  to={`/watch/${encodeURIComponent(movie.title)}`} 
                  className="movie-card-link"
                >
                  <div className="movie-card">
                    <div 
                      className="movie-poster" 
                      style={{ backgroundImage: `url(${movie.image_url})` }} 
                    />
                    <div className="movie-content">
                      <h3 className="movie-title">{movie.title}</h3>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default App;
