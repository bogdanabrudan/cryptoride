import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function UserTypeSelection() {
  const navigate = useNavigate();

  const selectType = (type) => {
    navigate('/login', { state: { userType: type } });
  };

  const containerStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '100vh',
    backgroundColor: '#eef',
    fontFamily: 'Arial, sans-serif',
    textAlign: 'center',
  };

  const buttonStyle = {
    margin: '10px',
    padding: '10px 20px',
    fontSize: '16px',
    cursor: 'pointer',
  };

  return (
    <div style={containerStyle}>
      <h2>Selectează tipul de utilizator</h2>
      <button style={buttonStyle} onClick={() => selectType('client')}>Client</button>
      <button style={buttonStyle} onClick={() => selectType('investor')}>Investor</button>
      <button style={buttonStyle} onClick={() => selectType('admin')}>Admin</button>
    </div>
  );
}
