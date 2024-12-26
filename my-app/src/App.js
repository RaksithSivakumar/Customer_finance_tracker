import React from 'react';
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import LoginPage from './LoginPage/LoginPage';  // Ensure the correct path
import Dashboard from './Dashboard/Dashboard';
import TotalCustomers from './TotalCustomers/TotalCustomers';
import CustomerDetails from './CustomerDetails/CustomerDetails';
import AddCustomer from './AddCustomer/AddCustomer';
import PreviewCustomer from './PreviewCustomer/PreviewCustomer';
import Menu from './Menu/Menu';


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
      {/* Only show Menu if the current route is not "/" */}
      {location.pathname !== '/' && <Menu />}

      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/total-customers" element={<TotalCustomers />} />
        <Route path="/customer-details" element={<CustomerDetails />} />
        <Route path="/add-customer" element={<AddCustomer />} />
        <Route path="/preview-customer" element={<PreviewCustomer />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </div>
  );
}

export default App;
