import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Login.css'

function Login({ onLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
			const response = await fetch('https://4800api.sdvxindex.com/api/login' , {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				credentials: 'include', // important for receiving cookies
				body: JSON.stringify({ email, password })
			});		

      const data =  await response.json(); 

      if (response.ok && data.success) {
        // Save the user_id along with email and token.
        onLogin({ user_id: data.user_id, email, token: data.token });
				  alert('Login successful!');
				  console.log(data.user_id);
          navigate('/dashboard');
      } else {
        alert(`Login failed: ${data.error || 'Unknown error'}`);
      }
    } catch (error) {
      console.error('Error during login:', error);
      alert('Error during login. Please try again later.');
    }
  };

  return (
      <>
      <div className = "loginHeader">
          <h1>cosmic</h1>
      </div>
      <div className = 'loginPage'>
        <div className="auth-container">
          <h1>Login</h1>
          <form onSubmit={handleSubmit} className="auth-form">
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
            <div className="auth-options">
              <label>
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                />
                Remember me
              </label>
              <p>
                <a href="/forgot-password">Forgot password?</a>
              </p>
            </div>
            <button type="submit">Login</button>
          </form>
          <p>
            Don't have an account? <Link to="/register">Create an Account</Link>
          </p>
        </div>
      </div>
    </>
  );
}

export default Login;

