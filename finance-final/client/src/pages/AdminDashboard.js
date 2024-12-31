import React from "react";
import { useNavigate } from "react-router-dom";
import "./AdminDashboard.css";

const AdminDashboard = () => {
  const navigate = useNavigate();

  const cards = [
    { label: "Total Customers", route: "/admin/total-customers", description: "View all registered customers" },
    { label: "Payments", route: "/admin/payments?type=completed", description: "Check transactions" },
    { label: "Day Tracker", route: "/admin/day-tracker", description: "Monitor daily activities" },
    { label: "Add Customers", route: "/admin/add-customer", description: "Add new customer profiles" },
    { label: "Add Workers", route: "/admin/add-worker", description: "Register workers to the system" },
  ];

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h1>Admin Dashboard</h1>
        <p>Manage customers, payments, and workers efficiently.</p>
      </div>
      <div className="card-grid">
        {cards.map((card, index) => (
          <div
            key={index}
            className="card"
            onClick={() => navigate(card.route)}
          >
            <div className="card-content">
              <h3>{card.label}</h3>
              <p>{card.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminDashboard;
