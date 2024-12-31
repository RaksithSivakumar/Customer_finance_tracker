import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate for redirection
import './AddCustomerPage.css';

const AddCustomerPage = () => {
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [photo, setPhoto] = useState(null);
  const [initialAmount, setInitialAmount] = useState("");
  const [interestRate, setInterestRate] = useState("");
  const [duration, setDuration] = useState("");
  const [calculatedData, setCalculatedData] = useState({});
  const [dueDate, setDueDate] = useState("");  // State to store the due date
  const [isPreview, setIsPreview] = useState(false); // Flag to control preview
  const [dateAdded, setDateAdded] = useState(""); // State to store the date added

  const navigate = useNavigate(); // Hook for redirection

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", name);
    formData.append("address", address);
    formData.append("phoneNumber", phoneNumber);
    formData.append("photo", photo);
    formData.append("initialAmount", initialAmount);
    formData.append("interestRate", interestRate);
    formData.append("duration", duration);
    formData.append("completedDues", calculatedData.CompletedDues);
    formData.append("pendingDues", calculatedData.PendingDues);
    formData.append("totalAmountAfterInterest", calculatedData.TotalAmountAfterInterest);
    formData.append("completedPayments", calculatedData.CompletedPayments);
    formData.append("pendingPayments", calculatedData.PendingPayments);
    formData.append("monthlyAmount", calculatedData.MonthlyAmount);
    formData.append("dueDate", dueDate);  // Append the due date to form data
    formData.append("dateAdded", dateAdded); // Append the dateAdded to form data

    try {
      await axios.post("http://localhost:5000/api/customers", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      alert("Customer added successfully!");

      // Redirect to /admin/dashboard after successful submission
      navigate("/admin/dashboard"); // Redirect using navigate
    } catch (error) {
      console.error("Error during customer submission:", error);
      alert("Error adding customer. Check console for details.");
    }
  };

  const calculateFinancialData = () => {
    const principal = parseFloat(initialAmount);
    const rate = parseFloat(interestRate) / 100;
    const months = parseInt(duration);

    const monthlyRate = rate / 12;
    const monthlyAmount = (principal * monthlyRate) / (1 - Math.pow(1 + monthlyRate, -months));

    const totalAmountAfterInterest = monthlyAmount * months;

    const completedPayments = 0;
    const completedDues = 0;
    const pendingDues = months - completedDues;

    setCalculatedData({
      CompletedDues: completedDues.toFixed(0),
      PendingDues: pendingDues.toFixed(0),
      TotalAmountAfterInterest: totalAmountAfterInterest.toFixed(2),
      CompletedPayments: completedPayments.toFixed(2),
      PendingPayments: (totalAmountAfterInterest - completedPayments).toFixed(2),
      MonthlyAmount: monthlyAmount.toFixed(2),
    });

    // Calculate due date based on the duration (current date + months)
    const due = new Date();
    due.setMonth(due.getMonth() + months);
    setDateAdded(new Date().toISOString().split("T")[0]); // Set the current date as the dateAdded
    setIsPreview(true); // Show the preview section after calculation
  };

  return (
    <div className="container">
      <h2>Add Customer</h2>
      {!isPreview ? (
        <form onSubmit={(e) => { e.preventDefault(); calculateFinancialData(); }} className="form">
          <div className="form-group">
            <label>Name:</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label>Address:</label>
            <input
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label>Phone Number:</label>
            <input
              type="text"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label>Photo:</label>
            <input
              type="file"
              onChange={(e) => setPhoto(e.target.files[0])}
              required
            />
          </div>

          <div className="form-group">
            <label>Initial Amount:</label>
            <input
              type="number"
              value={initialAmount}
              onChange={(e) => setInitialAmount(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label>Interest Rate (%):</label>
            <input
              type="number"
              value={interestRate}
              onChange={(e) => setInterestRate(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label>Duration (in months):</label>
            <input
              type="number"
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label>Due Date:</label>
            <input
              type="date"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="btn preview-btn">Preview</button>
        </form>
      ) : (
        <div className="preview">
          <h3>Preview and Calculated Details</h3>
          <form>
            {/* Display Photo in Circle */}
            <div className="photo-container">
              {photo && (
                <img
                  src={URL.createObjectURL(photo)}
                  alt="Preview"
                  className="photo-circle"
                />
              )}
            </div>

            {/* Customer details */}
            <div className="form-group">
              <label><strong>Name:</strong></label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label><strong>Address:</strong></label>
              <input
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label><strong>Phone Number:</strong></label>
              <input
                type="text"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label><strong>Initial Amount:</strong></label>
              <input
                type="number"
                value={initialAmount}
                onChange={(e) => setInitialAmount(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label><strong>Interest Rate:</strong></label>
              <input
                type="number"
                value={interestRate}
                onChange={(e) => setInterestRate(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label><strong>Duration (in months):</strong></label>
              <input
                type="number"
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
              />
            </div>

            {/* Calculated financial details */}
            <h4>Calculated Financial Information</h4>
            <div className="form-group">
              <label><strong>Completed Dues:</strong></label>
              <input
                type="number"
                value={calculatedData.CompletedDues}
                onChange={(e) => setCalculatedData({ ...calculatedData, CompletedDues: e.target.value })}
              />
            </div>

            <div className="form-group">
              <label><strong>Pending Dues:</strong></label>
              <input
                type="number"
                value={calculatedData.PendingDues}
                onChange={(e) => setCalculatedData({ ...calculatedData, PendingDues: e.target.value })}
              />
            </div>

            <div className="form-group">
              <label><strong>Total Amount After Interest:</strong></label>
              <input
                type="number"
                value={calculatedData.TotalAmountAfterInterest}
                onChange={(e) => setCalculatedData({ ...calculatedData, TotalAmountAfterInterest: e.target.value })}
              />
            </div>

            <div className="form-group">
              <label><strong>Completed Payments:</strong></label>
              <input
                type="number"
                value={calculatedData.CompletedPayments}
                onChange={(e) => setCalculatedData({ ...calculatedData, CompletedPayments: e.target.value })}
              />
            </div>

            <div className="form-group">
              <label><strong>Pending Payments:</strong></label>
              <input
                type="number"
                value={calculatedData.PendingPayments}
                onChange={(e) => setCalculatedData({ ...calculatedData, PendingPayments: e.target.value })}
              />
            </div>

            <div className="form-group">
              <label><strong>Monthly Amount:</strong></label>
              <input
                type="number"
                value={calculatedData.MonthlyAmount}
                onChange={(e) => setCalculatedData({ ...calculatedData, MonthlyAmount: e.target.value })}
              />
            </div>

            {/* Due Date Field */}
            <div className="form-group">
              <label><strong>Due Date:</strong></label>
              <input
                type="date"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label><strong>Date Added:</strong></label>
              <input
                type="Date"
                value={dateAdded}
                onChange={(e) => setDateAdded(e.target.value)}
              />
            </div>


            <button onClick={handleSubmit} className="btn submit-btn">Confirm and Submit</button>
            <button onClick={() => setIsPreview(false)} className="btn back-btn">Back to Edit</button>
          </form>
        </div>
      )}
    </div>
  );
};

export default AddCustomerPage;