import React, { useState } from 'react';
import './Header.css';

function Header({ onSearchTermChange }) {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
    onSearchTermChange(event.target.value); 
  };

  const handleSearchSubmit = (event) => {
    event.preventDefault();
    console.log('Searching for:', searchTerm);
  };

  return (
    <div className="Header">
      <header>
        <h1>cosmic</h1>
        <nav>
          <button class="homebtn">Home</button>
          <div className='dropdown'>
            <button class="dropbtn">Settings</button>
            <div className='dropdown-content'>
              <a href="/dashboard">Profile</a>
              <a href="/login">Logout</a>
            </div>
          </div>
        </nav>
        <form className="search-form" onSubmit={handleSearchSubmit}>
          <input
            type="text"
            value={searchTerm}
            onChange={handleSearchChange}
            placeholder="Search..."
            className="search-input"
          />
        </form>
      </header>
    </div>
  );
}

export default Header;
