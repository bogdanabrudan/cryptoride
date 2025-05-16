import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function LoginPage() {
  const location = useLocation();
  const navigate = useNavigate();

  const userTypeSelected = location.state?.userType || '';

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async () => {
    try {
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/api/auth/login`, {
        username,
        password,
      });

      const user = response.data;

      if (user.role !== userTypeSelected && user.role !== 'admin') {
        setError(`Acces interzis. Ești ${user.role}, dar ai selectat ${userTypeSelected}.`);
        return;
      }

      if (user.role === 'client') {
        navigate('/client', { state: { user } });
      } else if (user.role === 'investor') {
        navigate('/investor', { state: { user } });
      } else if (user.role === 'admin') {
        navigate('/admin', { state: { user } });
      }

    } catch (err) {
      setError('Eroare la autentificare.');
    }
  };

 const containerStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '100vh',
    fontFamily: 'Arial, sans-serif',
    backgroundColor: '#f4f4f4',
    textAlign: 'center',
  };
  return (
    <div style={containerStyle}>
      <h2>Login - {userTypeSelected}</h2>
      <input placeholder="Username" value={username} onChange={e => setUsername(e.target.value)} />
      <input placeholder="Password" type="password" value={password} onChange={e => setPassword(e.target.value)} />
      <button onClick={handleLogin}>Login</button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
}
