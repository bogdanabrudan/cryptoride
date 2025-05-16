import React from 'react';
import { useLocation } from 'react-router-dom';
import LogoutButton from '../components/LogoutButton';

export default function InvestorHomePage() {
  const location = useLocation();
  const user = location.state?.user;

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
      <h1>Bine ai venit, {user.username}</h1>
      <p>Rol: {user.role}</p>
      <p>Sold: {new Intl.NumberFormat().format(user.balance)} RON</p>
      <LogoutButton />
    </div>
  );
}
