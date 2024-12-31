import axios from "axios";
import React, { useState } from "react";
import './AddWorker.css';
const AddWorkerCredentials = () => {
    const [workerData, setWorkerData] = useState({
        email: "",
        password: "",
    });
    const [message, setMessage] = useState("");

    const handleChange = (e) => {
        const { name, value } = e.target;
        setWorkerData({ ...workerData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
        const response = await axios.post("http://localhost:5000/api/add", workerData);
        setMessage(response.data.message);
        setWorkerData({ email: "", password: "" });
        } catch (error) {
        setMessage(error.response?.data?.message || "An error occurred.");
        }
    };

    return (
        <div className="form-container">
        <h2 className="form-title">Add Worker Credentials</h2>
        <form onSubmit={handleSubmit} className="worker-form">
            <div className="form-group">
            <label className="form-label">Email:</label>
            <input
                type="email"
                name="email"
                value={workerData.email}
                onChange={handleChange}
                required
                className="form-input"
            />
            </div>
            <div className="form-group">
            <label className="form-label">Password:</label>
            <input
                type="password"
                name="password"
                value={workerData.password}
                onChange={handleChange}
                required
                className="form-input"
            />
            </div>
            <button type="submit" className="form-button">Add Worker</button>
        </form>
        {message && <p className="form-message">{message}</p>}
        </div>
    );
};

export default AddWorkerCredentials;