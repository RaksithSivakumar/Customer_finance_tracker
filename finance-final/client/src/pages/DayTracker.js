import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./DayTracker.css"; // New CSS file for styling

const DayTracker = () => {
  const [customers, setCustomers] = useState([]);
  const [successMessage, setSuccessMessage] = useState("");
  const navigate = useNavigate();
  const location = useLocation(); // To get the current URL path

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/customers/trackers")
      .then((response) => {
        setCustomers(response.data);
      })
      .catch((error) => {
        console.error("Error fetching customers with tracker:", error);
      });

    const now = new Date();
    const endOfDay = new Date();
    endOfDay.setHours(23, 59, 59, 999);
    const timeUntilEndOfDay = endOfDay - now;

    const timeoutId = setTimeout(() => {
      resetTrackers();
    }, timeUntilEndOfDay);

    return () => clearTimeout(timeoutId);
  }, []);

  const resetTrackers = () => {
    axios
      .put("http://localhost:5000/api/customers/reset-trackers", { tracker: false })
      .then((response) => {
        setCustomers((prevCustomers) =>
          prevCustomers.map((customer) => ({ ...customer, tracker: false }))
        );
        setSuccessMessage("Trackers reset for all customers!");
        setTimeout(() => setSuccessMessage(""), 3000);
      })
      .catch((error) => {
        console.error("Error resetting trackers:", error);
      });
  };

  const goToCustomerDetails = (customerId) => {
    const basePath = location.pathname.startsWith("/admin") ? "/admin/customer" : "/worker/customer";
    navigate(`${basePath}/${customerId}`);
  };

  const removeTracker = (customerId) => {
    axios
      .put(`http://localhost:5000/api/customers/${customerId}/remove-tracker`, { tracker: false })
      .then(() => {
        setCustomers((prevCustomers) =>
          prevCustomers.map((customer) =>
            customer._id === customerId ? { ...customer, tracker: false } : customer
          )
        );
        setSuccessMessage("Tracker removed successfully!");
        setTimeout(() => setSuccessMessage(""), 3000);
      })
      .catch((error) => {
        console.error("Error removing tracker:", error);
      });
  };

  return (
    <div className="tracker-container">
      <h1 className="tracker-title">Day Tracker</h1>

      {successMessage && <div className="success-message">{successMessage}</div>}

      <ul className="customer-list">
        {customers.map((customer) => (
          <li key={customer._id} className="customer-item">
            <button
              onClick={() => goToCustomerDetails(customer._id)}
              className="customer-button"
            >
              {customer.name}
            </button>
            <button
              onClick={() => removeTracker(customer._id)}
              className="remove-button"
            >
              Remove
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DayTracker;
