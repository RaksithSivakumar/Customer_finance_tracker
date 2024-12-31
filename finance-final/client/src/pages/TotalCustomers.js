import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { parseISO, isValid } from "date-fns";  // Import the required methods
import "./TotalCustomers.css";

const TotalCustomers = () => {
  const [customers, setCustomers] = useState([]);
  const [filteredCustomers, setFilteredCustomers] = useState([]);
  const [error, setError] = useState(null);
  const [startDate, setStartDate] = useState("");  // Track start date
  const [endDate, setEndDate] = useState("");      // Track end date

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/customers");
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        setCustomers(data);
        setFilteredCustomers(data); // Initially show all customers
      } catch (err) {
        console.error("Error fetching customers:", err);
        setError(err.message);
      }
    };

    fetchCustomers();
  }, []);

  // Handle filtering based on start date and end date
  const handleFilter = () => {
    let filtered = customers;

    if (startDate) {
      filtered = filtered.filter((customer) => {
        console.log('customer.dateAdded:', customer.dateAdded);  // Log the date value

        // Check if dateAdded exists and is valid
        const customerDateAdded = customer.dateAdded ? parseISO(customer.dateAdded) : null;
        const start = parseISO(startDate);

        // If dateAdded is valid, compare it with startDate
        return customerDateAdded && isValid(customerDateAdded) && customerDateAdded >= start;
      });
    }

    if (endDate) {
      filtered = filtered.filter((customer) => {
        console.log('customer.dateAdded:', customer.dateAdded);  // Log the date value

        // Check if dateAdded exists and is valid
        const customerDateAdded = customer.dateAdded ? parseISO(customer.dateAdded) : null;
        const end = parseISO(endDate);

        // If dateAdded is valid, compare it with endDate
        return customerDateAdded && isValid(customerDateAdded) && customerDateAdded <= end;
      });
    }

    setFilteredCustomers(filtered);
  };

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="total-customers">
      <h1 className="title">Total Customers</h1>
      
      {/* Date range filter */}
      <div className="date-filter">
        <label>Start Date: </label>
        <input
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
        />
        <label>End Date: </label>
        <input
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
        />
        <button onClick={handleFilter}>Filter</button>
      </div>

      <div className="customers-container">
        {filteredCustomers.map((customer) => (
          <div key={customer._id} className="customer-card">
            <div className="photo-container">
              {/* eslint-disable-next-line */}
              <img
                src={customer.photo}
                alt={`${customer.name}'s photo`}
                className="customer-photo"
              />
            </div>
            <div className="customer-info">
              <h3 className="customer-name">{customer.name}</h3>
              <p className="customer-address">
                <strong>Address:</strong> {customer.address}
              </p>
              <p className="customer-phone">
                <strong>Phone Number:</strong> {customer.phoneNumber}
              </p>
              <p className="customer-due">
                <strong>Date Added:</strong> {customer.dateAdded ? new Date(customer.dateAdded).toLocaleDateString() : 'N/A'}
              </p>
              <Link to={`/admin/customer/${customer._id}`} className="view-details-link">
                View Details
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TotalCustomers;
