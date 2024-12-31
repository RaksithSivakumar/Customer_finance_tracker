import axios from "axios";
import React, { useEffect, useState } from "react";
import "./Payments.css";

const MonthlyPaymentStatus = () => {
    const [customers, setCustomers] = useState([]);
    const [filteredCustomers, setFilteredCustomers] = useState([]);
    const [currentMonth, setCurrentMonth] = useState("");
    const [filter, setFilter] = useState("all");

    useEffect(() => {
        // Fetch customer data
        axios
        .get("http://localhost:5000/api/customers")
        .then((response) => {
            setCustomers(response.data);
            setFilteredCustomers(response.data);
        })
        .catch((error) => {
            console.error("Error fetching customer data:", error);
        });

        // Get the current month in lowercase (to match the data format)
        const date = new Date();
        const month = date
        .toLocaleString("default", { month: "short" })
        .toLowerCase();
        setCurrentMonth(month);
    }, []);

    const handleFilterChange = (newFilter) => {
        setFilter(newFilter);

        if (newFilter === "all") {
        setFilteredCustomers(customers);
        } else {
        const isCompleted = newFilter === "completed";
        const filtered = customers.filter((customer) =>
            customer.status.some(
            (s) =>
                s.month === currentMonth &&
                s.status.toLowerCase() === (isCompleted ? "completed" : "not completed")
            )
        );
        setFilteredCustomers(filtered);
        }
    };

    return (
        <div className="payment-status-dashboard">
        <h1 className="dashboard-title">Monthly Payment Status</h1>

        {/* Filter Buttons */}
        <div className="filter-buttons">
            <button
            className={`filter-button ${filter === "all" ? "active" : ""}`}
            onClick={() => handleFilterChange("all")}
            >
            All
            </button>
            <button
            className={`filter-button ${filter === "completed" ? "active" : ""}`}
            onClick={() => handleFilterChange("completed")}
            >
            Completed
            </button>
            <button
            className={`filter-button ${filter === "not completed" ? "active" : ""}`}
            onClick={() => handleFilterChange("not completed")}
            >
            Not Completed
            </button>
        </div>

        {/* Customer Table */}
        <div className="table-container">
            <table>
            <thead>
                <tr>
                <th>S.No</th>
                <th>Name</th>
                <th>Address</th>
                <th>Phone</th>
                <th>Payment Status</th>
                </tr>
            </thead>
            <tbody>
                {filteredCustomers.map((customer, index) => (
                <tr key={customer._id}>
                    <td>{index + 1}</td>
                    <td>{customer.name}</td>
                    <td>{customer.address}</td>
                    <td>{customer.phoneNumber}</td>
                    <td>
                    {customer.status.some(
                        (s) =>
                        s.month === currentMonth &&
                        s.status.toLowerCase() === "completed"
                    ) ? (
                        <span className="status-completed">Completed</span>
                    ) : (
                        <span className="status-not-completed">Not Completed</span>
                    )}
                    </td>
                </tr>
                ))}
            </tbody>
            </table>
        </div>
        </div>
    );
};

export default MonthlyPaymentStatus;
