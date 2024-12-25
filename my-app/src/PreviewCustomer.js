import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './PreviewCustomer.css';

function PreviewCustomer() {
  const location = useLocation();
  const navigate = useNavigate();
  const customer = location.state.customer;

  const handleConfirm = () => {
    // Implement customer addition to the database here
    alert("Customer details confirmed and added successfully");
    navigate('/dashboard');
  };

  const handleEdit = () => {
    navigate('/add-customer', { state: { customer } });
  };

  return (
    <div className="preview-customer-container">
      <h1>Preview Customer Details</h1>
      <div className="customer-card">
        <img src={customer.photo} alt={customer.name} />
        <div className="customer-info">
          <p><strong>Name:</strong> {customer.name}</p>
          <p><strong>Address:</strong> {customer.address}</p>
          <p><strong>Mobile number:</strong> {customer.phoneNumber}</p>
          <p><strong>Initial Amount:</strong> ₹{customer.initialAmount}</p>
          <p><strong>Interest Rate:</strong> {customer.interestRate}%</p>
          <p><strong>Duration:</strong> {customer.duration} Months</p>
          <p><strong>Due Date:</strong> {customer.dueDate}</p>
          <p><strong>Completed Dues:</strong> {customer.completedDues}</p>
          <p><strong>Pending Dues:</strong> {customer.pendingDues}</p>
          <p><strong>Total Amount After Interest:</strong> ₹{customer.totalAmountWithInterest}</p>
          <p><strong>Completed Payments:</strong> ₹{customer.completedPayments}</p>
          <p><strong>Pending Payments:</strong> ₹{customer.pendingPayments}</p>
          <p><strong>Profile Check:</strong> {customer.profileCheck}</p>
          <h4>Month Chart:</h4>
          <ul>
            {Object.keys(customer.monthChart).map((month) => (
              <li key={month}><strong>{month}:</strong> {customer.monthChart[month]}</li>
            ))}
          </ul>
          <div className="preview-buttons">
            <button onClick={handleConfirm}>Confirm</button>
            <button onClick={handleEdit}>Edit</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PreviewCustomer;
