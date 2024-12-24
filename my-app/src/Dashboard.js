// src/Dashboard.js
import React from 'react';
import './Dashboard.css';

function Dashboard() {
  const totalCustomers = 75;
  const completedPayments = 50;
  const pendingPayments = 25;

  return (
    <div className="dashboard-container">
      <h1>Admin Dashboard</h1>
      <div className="stats-container">
        <div className="stat-box">
          <h2>Total Customers</h2>
          <p>{totalCustomers}</p>
        </div>
        <div className="stat-box">
          <h2>Completed Payments</h2>
          <p>{completedPayments}</p>
        </div>
        <div className="stat-box">
          <h2>Pending Payments</h2>
          <p>{pendingPayments}</p>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
