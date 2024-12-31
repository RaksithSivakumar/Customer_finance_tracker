import React from "react";
import { useNavigate } from "react-router-dom";
import "./WorkerDashboard.css";

const WorkerDashboard = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/worker/day-tracker");
  }
  return (
    <div className="dashboard-container">
      <h1>Worker Dashboard</h1>
      <button onClick={handleClick} className="day-tracker-btn">Day Tracker</button>
    </div>
  );
};

export default WorkerDashboard;
