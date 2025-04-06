import React, { useEffect, useState } from 'react';
import Header from './Header';
import './App.css';

// Movies 
const movies = [
  { title: 'Titanic', genre: 'Romance', poster: 'images/pettingCat.png' },
  { title: 'The Godfather', genre: 'Crime', poster: '' },
  { title: 'Pulp Fiction', genre: 'Crime', poster: '' },
  { title: 'Finding Nemo', genre: 'Animation', poster: '' },
  { title: 'Toy Story', genre: 'Animation', poster: '' },
  { title: 'The Notebook', genre: 'Romance', poster: '' },
  { title: 'Pride and Prejudice', genre: 'Romance', poster: '' },
  { title: 'So I Married an Axe Murderer', genre: 'Romance', poster: '' },
  { title: 'Joker', genre: 'Action', poster: '' },
  { title: 'La La Land', genre: 'Romance', poster: '' },
  { title: 'The Fault in Our Stars', genre: 'Romance', poster: '' },
  { title: 'A Walk to Remember', genre: 'Romance', poster: '' },
  { title: 'Crazy, Stupid, Love', genre: 'Romance', poster: '' },
  { title: 'The Vow', genre: 'Romance', poster: '' },
  { title: '500 Days of Summer', genre: 'Romance', poster: '' },
  { title: 'Notting Hill', genre: 'Romance', poster: '' },
  { title: 'Eternal Sunshine of the Spotless Mind', genre: 'Romance', poster: '' },
  { title: 'The Proposal', genre: 'Romance', poster: '' },
  { title: 'Me Before You', genre: 'Romance', poster: '' },
  { title: 'Mad Max: Fury Road', genre: 'Action', poster: '' },
  { title: 'Avengers: Endgame', genre: 'Action', poster: '' },
  { title: 'The Dark Knight', genre: 'Action', poster: '' },
  { title: 'Gladiator', genre: 'Action', poster: '' },
  { title: 'Iron Man', genre: 'Action', poster: '' },
  { title: 'John Wick', genre: 'Action', poster: '' },
  { title: 'Die Hard', genre: 'Action', poster: '' },
  { title: 'The Matrix', genre: 'Action', poster: '' },
  { title: 'Spider-Man: No Way Home', genre: 'Action', poster: '' },
  { title: 'Mission: Impossible – Fallout', genre: 'Action', poster: '' },
  { title: 'The Shawshank Redemption', genre: 'Crime', poster: '' },
  { title: 'Se7en', genre: 'Crime', poster: '' },
  { title: 'Scarface', genre: 'Crime', poster: '' },
  { title: 'Goodfellas', genre: 'Crime', poster: '' },
  { title: 'Heat', genre: 'Crime', poster: '' },
  { title: 'Casino', genre: 'Crime', poster: '' },
  { title: 'The Departed', genre: 'Crime', poster: '' },
  { title: 'Donnie Brasco', genre: 'Crime', poster: '' },
  { title: 'Chinatown', genre: 'Crime', poster: '' },
  { title: 'The Lion King', genre: 'Animation', poster: '' },
  { title: 'Shrek', genre: 'Animation', poster: '' },
  { title: 'Frozen', genre: 'Animation', poster: '' },
  { title: 'Coco', genre: 'Animation', poster: '' },
  { title: 'Toy Story 3', genre: 'Animation', poster: '' },
  { title: 'Finding Dory', genre: 'Animation', poster: '' },
  { title: 'The Incredibles', genre: 'Animation', poster: '' },
  { title: 'Up', genre: 'Animation', poster: '' },
  { title: 'Zootopia', genre: 'Animation', poster: '' },
  { title: 'Big Hero 6', genre: 'Animation', poster: '' },
  { title: 'Avatar', genre: 'Sci-Fi', poster: '' },
  { title: 'Blade Runner 2049', genre: 'Sci-Fi', poster: '' },
  { title: 'Star Wars: A New Hope', genre: 'Sci-Fi', poster: '' },
  { title: 'Star Trek', genre: 'Sci-Fi', poster: '' },
  { title: 'The Martian', genre: 'Sci-Fi', poster: '' },
  { title: 'Interstellar', genre: 'Sci-Fi', poster: 'images/interstellar.jpg' },
  { title: 'Ex Machina', genre: 'Sci-Fi', poster: '' },
  { title: '2001: A Space Odyssey', genre: 'Sci-Fi', poster: '' },
  { title: 'Inception', genre: 'Sci-Fi', poster: '' },
  { title: 'The Fifth Element', genre: 'Sci-Fi', poster: '' },
  { title: 'The Social Network', genre: 'Drama', poster: '' },
  { title: 'Forrest Gump', genre: 'Drama', poster: '' },
  { title: 'The Pursuit of Happyness', genre: 'Drama', poster: '' },
  { title: 'Whiplash', genre: 'Drama', poster: '' },
  { title: 'The Green Mile', genre: 'Drama', poster: '' },
  { title: '12 Years a Slave', genre: 'Drama', poster: '' },
  { title: 'Schindler\'s List', genre: 'Drama', poster: '' },
  { title: 'A Beautiful Mind', genre: 'Drama', poster: '' },
  { title: 'The Revenant', genre: 'Drama', poster: '' },
  { title: 'Fight Club', genre: 'Drama', poster: '' }
];

const App = () => {
  const [genres, setGenres] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const uniqueGenres = Array.from(new Set(movies.map(m => m.genre)));
    setGenres(uniqueGenres);
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
    <div className="app-container">
      <Header onSearchTermChange={handleSearchTermChange} />
      <h1 className="browse">Browse Movies</h1>
      
      {filteredGenres.map(genre => (
        <div key={genre} className="genre-section">
          <h2 className="genre-title">{genre}</h2>
          <div className="movie-row">
            {filteredMovies.filter(movie => movie.genre === genre).map(movie => (
              <div key={movie.title} className="movie-card">
                  <div className="movie-poster" style={{ backgroundImage: `url(${movie.poster})` }} />
                  <div className="movie-content">
                      <h3 className="movie-title">{movie.title}</h3>
                  </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default App