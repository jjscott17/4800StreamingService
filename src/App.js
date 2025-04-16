import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from './Login';
import Register from './Register';
import Dashboard from './Dashboard';
import Home from './Home';
import Watch from './Watch';

// This ProtectedRoute component performs verification using /api/verify.
function ProtectedRoute({ children }) {
  const [verified, setVerified] = useState(null);

  useEffect(() => {
    async function verifyUser() {
      try {
        // Verify the user using the /api/verify route.
        const response = await fetch('https://4800api.sdvxindex.com/api/verify', {
          method: 'GET',
          credentials: 'include',
        });
        const data = await response.json();
        // Check whether the response contains a valid user.
        if (data.user) {
          setVerified(true);
        } else {
          setVerified(false);
        }
      } catch (error) {
        setVerified(false);
      }
    }
    verifyUser();
  }, []);

  // While verifying, you can show a loading indicator.
  if (verified === null) {
    return <div>Loading...</div>;
  }

  // If verification fails, redirect to login; otherwise render the children.
  return verified ? children : <Navigate to="/login" />;
}

function App() {
  const [user, setUser] = useState(null);

  const handleLogin = (userData) => {
    // You might still want to store user info after a successful login.
    setUser(userData);
  };

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={user ? <Dashboard user={user} /> : <Login onLogin={handleLogin} />}
        />
        <Route path="/login" element={<Login onLogin={handleLogin} />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/dashboard"
          element={
            // Instead of checking for a user here, we use ProtectedRoute.
            <ProtectedRoute>
              {/* Optionally pass down the user if needed by Dashboard */}
              <Dashboard user={user} />
            </ProtectedRoute>
          }
        />
        <Route path="/home" element={<Home />} />
        <Route path="/watch/:movieTitle" element={<Watch />} />
      </Routes>
    </Router>
  );
}

export default App;
