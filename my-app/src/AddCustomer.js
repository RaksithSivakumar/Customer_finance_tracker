import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './AddCustomer.css';

function AddCustomer({ addCustomer }) {
  const [customerDetails, setCustomerDetails] = useState({
    name: '',
    address: '',
    phoneNumber: '',
    photo: '',
    initialAmount: '',
    interestRate: '',
    duration: '',
    dueDate: '',
    completedDues: '',
    pendingDues: '',
    totalAmountWithInterest: '',
    completedPayments: '',
    pendingPayments: '',
    profileCheck: 'Not completed',
    monthChart: {
      Jan: 'Yet to pay',
      Feb: 'Yet to pay',
      Mar: 'Yet to pay',
      Apr: 'Yet to pay',
      May: 'Yet to pay',
      Jun: 'Yet to pay',
      Jul: 'Yet to pay',
      Aug: 'Yet to pay',
      Sep: 'Yet to pay',
      Oct: 'Yet to pay',
      Nov: 'Yet to pay',
      Dec: 'Yet to pay',
    },
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCustomerDetails({ ...customerDetails, [name]: value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setCustomerDetails({ ...customerDetails, photo: reader.result });
    };
    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const savedCustomers = JSON.parse(localStorage.getItem('customers')) || [];
    savedCustomers.push({ ...customerDetails, id: Date.now() }); // Add a unique ID for each customer
    localStorage.setItem('customers', JSON.stringify(savedCustomers)); // Update localStorage
    navigate('/total-customers'); // Redirect to the customers list page
  };

  return (
    <div className="add-customer-container">
      <h1>Add Customer</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input
            type="text"
            name="name"
            value={customerDetails.name}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Address:
          <input
            type="text"
            name="address"
            value={customerDetails.address}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Mobile number:
          <input
            type="text"
            name="phoneNumber"
            value={customerDetails.phoneNumber}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Photo:
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            required
          />
        </label>
        {customerDetails.photo && (
          <img
            src={customerDetails.photo}
            alt="Customer"
            className="preview-image"
          />
        )}
        <label>
          Initial Amount:
          <input
            type="text"
            name="initialAmount"
            value={customerDetails.initialAmount}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Interest Rate:
          <input
            type="number"
            name="interestRate"
            value={customerDetails.interestRate}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Duration (Months):
          <input
            type="number"
            name="duration"
            value={customerDetails.duration}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Due Date:
          <input
            type="date"
            name="dueDate"
            value={customerDetails.dueDate}
            onChange={handleChange}
            required
          />
        </label>
        <button type="submit">Add Customer</button>
      </form>
    </div>
  );
}

export default AddCustomer;
