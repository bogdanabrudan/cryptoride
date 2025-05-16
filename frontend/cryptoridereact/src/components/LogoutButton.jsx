import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function LogoutButton() {
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate('/');
  };

  return (
    <button onClick={handleLogout} style={{ marginTop: '20px' }}>
      Logout
    </button>
  );
}
