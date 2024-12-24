import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { jsPDF } from "jspdf"; // Importing jsPDF for PDF generation
import './TotalCustomers.css';

const customers = [
  {
    name: 'Asin',
    address: '123 Main St, City',
    phoneNumber: '123-456-7890',
    photo: '/path-to-photo.jpg',
    initialAmount: '₹50,000',
    dueDate: '2024-12-31',
  },
  {
    name: 'Rishi',
    address: '456 Another St, City',
    phoneNumber: '987-654-3210',
    photo: '/path-to-photo.jpg',
    initialAmount: '₹30,000',
    dueDate: '2025-01-15',
  },
  // Add more customers here...
];

function TotalCustomers() {
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleDownload = () => {
    const doc = new jsPDF();
    doc.text('Customer Details', 10, 10);

    customers.forEach((customer, index) => {
      doc.text(`Name: ${customer.name}`, 10, 20 + (index * 10));
      doc.text(`Address: ${customer.address}`, 10, 30 + (index * 10));
      doc.text(`Phone: ${customer.phoneNumber}`, 10, 40 + (index * 10));
      doc.text(`Initial Amount: ${customer.initialAmount}`, 10, 50 + (index * 10));
      doc.text(`Due Date: ${customer.dueDate}`, 10, 60 + (index * 10));
      doc.addPage(); // Adds a new page for each customer
    });

    doc.save('customer_details.pdf');
  };

  const filteredCustomers = customers.filter((customer) =>
    customer.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const viewCustomerDetails = (customer) => {
    navigate('/customer-details', { state: { customer } }); // Navigate and pass customer data
  };

  return (
    <div className="customers-container">
      <h1>Total Customers</h1>
      <div className="search-download">
        <input
          type="text"
          placeholder="Search customer by name"
          value={searchTerm}
          onChange={handleSearch}
        />
        <button onClick={handleDownload}>Download All Customers</button>
      </div>
      <div className="customer-list">
        {filteredCustomers.map((customer, index) => (
          <div
            key={index}
            className="customer-card"
            onClick={() => viewCustomerDetails(customer)} // Redirect to Customer Details
          >
            <img src={customer.photo} alt={customer.name} />
            <div className="customer-info">
              <h3>{customer.name}</h3>
              <p>{customer.address}</p>
              <p>{customer.phoneNumber}</p>
              <p>Initial Amount: {customer.initialAmount}</p>
              <p>Due Date: {customer.dueDate}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default TotalCustomers;
