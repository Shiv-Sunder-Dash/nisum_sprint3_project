import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../css/logreg.css';

const Register = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setMessage('');
    try {
      const res = await fetch('/api/users/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ firstName, lastName, email, password, phoneNumber })
      });
      const data = await res.json();
      if (res.ok && data === true) {
        setMessage('Registration successful!');
        setTimeout(() => navigate('/login'), 1000);
      } else {
        setError('Registration failed. Email may already be registered.');
      }
    } catch {
      setError('Network error.');
    }
  };

  return (
    <div className="container">
      <header>
        <h1>Register</h1>
        <nav>
          <Link to="/">Home</Link>
          <Link to="/login">Login</Link>
        </nav>
      </header>
      <main>
        <div className="form-container">
          <form onSubmit={handleSubmit}>
            <h2>Create Account</h2>
            {error && <div className="error">{error}</div>}
            {message && <div className="success">{message}</div>}
            <div className="form-group">
              <label>First Name:</label>
              <input type="text" value={firstName} onChange={e => setFirstName(e.target.value)} required />
            </div>
            <div className="form-group">
              <label>Last Name:</label>
              <input type="text" value={lastName} onChange={e => setLastName(e.target.value)} required />
            </div>
            <div className="form-group">
              <label>Email:</label>
              <input type="email" value={email} onChange={e => setEmail(e.target.value)} required />
            </div>
            <div className="form-group">
              <label>Password:</label>
              <input type="password" value={password} onChange={e => setPassword(e.target.value)} required />
            </div>
            <div className="form-group">
              <label>Phone Number:</label>
              <input type="text" value={phoneNumber} onChange={e => setPhoneNumber(e.target.value)} />
            </div>
            <button type="submit">Register</button>
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

export default Register;
