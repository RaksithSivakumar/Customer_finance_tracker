import React from 'react';
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import LoginPage from './LoginPage';
import Dashboard from './Dashboard';
import TotalCustomers from './TotalCustomers';
import CustomerDetails from './CustomerDetails';
import Menu from './Menu';

function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}

function AppContent() {
  const location = useLocation(); 

  return (
    <div className="App">
      {/* Only show Menu if the current route is not "/". */}
      {location.pathname !== '/' && <Menu />} 

      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/total-customers" element={<TotalCustomers />} />
        <Route path="/customer-details" element={<CustomerDetails />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </div>
  );
}

export default App;
