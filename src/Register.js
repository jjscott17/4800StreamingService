import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('https://4800api.sdvxindex.com/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          username: name,
          email: email,
          password: password
        })
      });

      const data = await response.json();

      if (response.ok && data.success) {
        alert('Registered successfully. Please log in.');
        navigate('/login');
      } else {
        alert(`Registration failed: ${data.error || 'Unknown error'}`);
      }
    } catch (error) {
      console.error('Error registering:', error);
      alert('Registration failed. Please try again later.');
    }
  };

  return (
    <div className="auth-container">
      <h1>Register for KarinaTV</h1>
      <form onSubmit={handleRegister} className="auth-form">
        <input
          type="text"
          placeholder="Username"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Register</button>
      </form>
      <p>
        Already have an account? <Link to="/login">Login</Link>
      </p>
    </div>
  );
}

export default Register;
