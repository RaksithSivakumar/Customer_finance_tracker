import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './TotalCustomers.css';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

function CustomersList() {
  const [customers, setCustomers] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    // Check if there's customer data in localStorage
    const savedCustomers = JSON.parse(localStorage.getItem('customers'));
    if (savedCustomers) {
      setCustomers(savedCustomers);
    }
  }, []);

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const filteredCustomers = customers.filter((customer) =>
    customer.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleRowClick = (customer) => {
    navigate('/customer-details', { state: { customer } });
  };

  const formatAmount = (amount) => {
    return `₹ ${Number(amount).toLocaleString()}`;
  };

  const handleDownload = () => {
    const doc = new jsPDF();
    doc.setFontSize(18);
    doc.text('Customer List', 14, 20);
    doc.setFontSize(12);

    const headers = ['Name', 'Address', 'Phone Number', 'Initial Amount', 'Due Date'];

    const rows = filteredCustomers.map((customer) => [
      customer.name,
      customer.address,
      customer.phoneNumber,
      formatAmount(customer.initialAmount),
      customer.dueDate,
    ]);

    doc.autoTable({
      head: [headers],
      body: rows,
      startY: 30,
    });

    doc.save('customer-list.pdf');
  };

  return (
    <div className="customers-list-container">
      <h1>Customers</h1>
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search by name..."
          value={searchQuery}
          onChange={handleSearch}
        />
      </div>
      <table className="customers-table">
        <thead>
          <tr>
            <th>Photo</th>
            <th>Name</th>
            <th>Address</th>
            <th>Phone Number</th>
            <th>Initial Amount</th>
            <th>Due Date</th>
          </tr>
        </thead>
        <tbody>
          {filteredCustomers.map((customer) => (
            <tr key={customer.id} onClick={() => handleRowClick(customer)}>
              <td>
                <img
                  src={customer.photo}
                  alt={customer.name}
                  className="customer-photo"
                />
              </td>
              <td>{customer.name}</td>
              <td>{customer.address}</td>
              <td>{customer.phoneNumber}</td>
              <td>{formatAmount(customer.initialAmount)}</td>
              <td>{customer.dueDate}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <button className="download-button" onClick={handleDownload}>
        Download All as PDF
      </button>
    </div>
  );
}

export default CustomersList;
