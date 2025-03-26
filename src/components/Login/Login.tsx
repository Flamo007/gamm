import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setBalance } from '../../store/slices/playerSlice';
import './Login.css';

const Login: React.FC = () => {
  const dispatch = useDispatch();
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleLogin = () => {
    if (!name.trim()) {
      setError('Name cannot be empty.');
      return;
    }

    fetch('http://localhost:3001/api/login', { // Lägg till fullständig URL
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name }),
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error('Failed to login. Please try again.');
        }
        return res.json();
      })
      .then((data) => {
        console.log('Login successful:', data); // Logga svaret från backend
        setMessage(data.message);
        dispatch(setBalance(data.balance));
        setError(''); // Rensa eventuella tidigare fel
      })
      .catch((err) => {
        console.error('Login error:', err); // Logga eventuella fel
        setError(err.message);
      });
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      <input
        type="text"
        placeholder="Enter your name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="login-input"
      />
      <button onClick={handleLogin} className="login-button">
        Login
      </button>
      {message && <p className="login-message">{message}</p>}
      {error && <p className="login-error">{error}</p>}
    </div>
  );
};

export default Login;