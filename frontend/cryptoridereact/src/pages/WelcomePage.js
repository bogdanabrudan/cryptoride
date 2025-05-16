import React from 'react';

const WelcomePage = () => {
  const user = JSON.parse(localStorage.getItem('user'));

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
  if (!user) return <p>User not logged in.</p>;

  return (
    <div style={{ textAlign: 'center', marginTop: '100px' }}>
      <h2>Welcome, {user.username}!</h2>
      <p>User Type: {user.role}</p>
      <p>Balance: ${user.balance}</p>
    </div>
  );
};

export default WelcomePage;
