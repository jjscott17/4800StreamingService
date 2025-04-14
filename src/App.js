import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from './Login';
import Register from './Register';
import Dashboard from './Dashboard';
import Home from './Home';
import Watch from './Watch';

function App() {
  const [user, setUser] = useState(null);

  
  const handleLogin = (userData) => {
    setUser(userData);
  }; 
  
  
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={user ? <Dashboard user={user} /> : <Login onLogin={handleLogin}  />}
        />
        <Route path="/login" element={<Login onLogin={handleLogin} />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/dashboard"
          element={user ? <Dashboard user={user} /> : <Navigate to="/login" />}
        />
        <Route path="/home" element={<Home />} />
        <Route path="/watch/:movieTitle" element={<Watch />} />
      </Routes>
    </Router>
  );
}

export default App;
