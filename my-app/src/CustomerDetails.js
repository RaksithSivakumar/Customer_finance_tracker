import React from 'react';
import { useLocation } from 'react-router-dom';
import './CustomerDetails.css';

function CustomerDetails() {
  const location = useLocation();
  const { customer } = location.state;  

  return (
    <div className="customer-details-container">
      <h1>Customer Details</h1>
      <div className="customer-card">
        <img src={customer.photo} alt={customer.name} />
        <div className="customer-info">
          <h3>{customer.name}</h3>
          <p><strong>Address:</strong> {customer.address}</p>
          <p><strong>Phone Number:</strong> {customer.phoneNumber}</p>
          <p><strong>Initial Amount:</strong> {customer.initialAmount}</p>
          <p><strong>Due Date:</strong> {customer.dueDate}</p>
        </div>
      </div>
    </div>
  );
}

export default CustomerDetails;
