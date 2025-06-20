import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../css/logreg.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setMessage('');
    try {
      const res = await fetch('/api/users/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });
      const data = await res.json();
      if (res.ok && data && data.userId) {
        setMessage('Login successful!');
        setTimeout(() => navigate('/'), 1000);
      } else {
        setError('Login failed. Invalid credentials.');
      }
    } catch {
      setError('Network error.');
    }
  };

  return (
    <div className="container">
      <header>
        <h1>Login</h1>
        <nav>
          <Link to="/">Home</Link>
          <Link to="/register">Register</Link>
        </nav>
      </header>
      <main>
        <div className="form-container">
          <form onSubmit={handleSubmit}>
            <h2>User Login</h2>
            {error && <div className="error">{error}</div>}
            {message && <div className="success">{message}</div>}
            <div className="form-group">
              <label>Email:</label>
              <input type="email" value={email} onChange={e => setEmail(e.target.value)} required />
            </div>
            <div className="form-group">
              <label>Password:</label>
              <input type="password" value={password} onChange={e => setPassword(e.target.value)} required />
            </div>
            <button type="submit">Login</button>
          </form>
        </div>
      </main>
      <footer>
        <div className="container">
          <p>&copy; 2025 FashionHub. All rights reserved. | Developed for NISUM Technologies Training</p>
        </div>
      </footer>
    </div>
  );
};

export default Login;
