import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import LoginPage from './LoginPage';
import Dashboard from './Dashboard';
import TotalCustomers from './TotalCustomers';
import CustomerDetails from './CustomerDetails';
import AddCustomer from './AddCustomer';
import PreviewCustomer from './PreviewCustomer';
import Menu from './Menu';

function App() {
  const [customers, setCustomers] = useState([]);

  const addCustomer = (customer) => {
    setCustomers((prevCustomers) => [...prevCustomers, customer]);
  };

  return (
    <BrowserRouter>
      <AppContent addCustomer={addCustomer} customers={customers} />
    </BrowserRouter>
  );
}

function AppContent({ addCustomer, customers }) {
  const location = useLocation();

  return (
    <div className="App">
      {location.pathname !== '/' && <Menu />}
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/total-customers" element={<TotalCustomers customers={customers} />} />
        <Route path="/customer-details" element={<CustomerDetails />} />
        <Route path="/add-customer" element={<AddCustomer addCustomer={addCustomer} />} />
        <Route path="/preview-customer" element={<PreviewCustomer />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </div>
  );
}

export default App;
