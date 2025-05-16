import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import UserTypeSelection from './pages/UserTypeSelection';
import LoginPage from './pages/LoginPage';
import ClientHomePage from './pages/ClientHomePage';
import InvestorHomePage from './pages/InvestorHomePage';
import AdminHomePage from './pages/AdminHomePage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<UserTypeSelection />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/client" element={<ClientHomePage />} />
        <Route path="/investor" element={<InvestorHomePage />} />
        <Route path="/admin" element={<AdminHomePage />} />
      </Routes>
    </Router>
  );
}

export default App;
