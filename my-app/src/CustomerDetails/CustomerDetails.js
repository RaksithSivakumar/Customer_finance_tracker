import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { jsPDF } from 'jspdf'; // Import jsPDF
import './CustomerDetails.css';

function CustomerDetails() {
  const location = useLocation();
  const customer = location.state.customer;
  const [isEditing, setIsEditing] = useState(false);
  const [updatedCustomer, setUpdatedCustomer] = useState(customer);
  const [monthStatus, setMonthStatus] = useState({
    Jan: customer.monthStatus?.Jan || 'Yet to pay',
    Feb: customer.monthStatus?.Feb || 'Yet to pay',
    Mar: customer.monthStatus?.Mar || 'Yet to pay',
    Apr: customer.monthStatus?.Apr || 'Yet to pay',
    May: customer.monthStatus?.May || 'Yet to pay',
    Jun: customer.monthStatus?.Jun || 'Yet to pay',
    Jul: customer.monthStatus?.Jul || 'Yet to pay',
    Aug: customer.monthStatus?.Aug || 'Yet to pay',
    Sep: customer.monthStatus?.Sep || 'Yet to pay',
    Oct: customer.monthStatus?.Oct || 'Yet to pay',
    Nov: customer.monthStatus?.Nov || 'Yet to pay',
    Dec: customer.monthStatus?.Dec || 'Yet to pay',
  });

  const handleDownload = () => {
    const doc = new jsPDF();

    doc.setFontSize(18);
    doc.text('Customer Details', 14, 20);

    doc.setFontSize(12);
    doc.text(`Name: ${customer.name}`, 14, 30);
    doc.text(`Mobile no: ${customer.phoneNumber}`, 14, 40);
    doc.text(`Address: ${customer.address}`, 14, 50);
    doc.text(`Initial Amount: ₹${customer.initialAmount}`, 14, 60);
    doc.text(`Interest rate: ${customer.interestRate}%`, 14, 70);
    doc.text(`Total Amount with Interest: ₹${customer.totalAmountWithInterest}`, 14, 80);
    doc.text(`Monthly Amount: ₹${customer.monthlyAmount}`, 14, 90);
    doc.text(`Duration: ${customer.duration} Months`, 14, 100);
    doc.text(`Completed Dues: ₹${customer.completedDues}`, 14, 110);
    doc.text(`Pending Dues: ₹${customer.pendingDues}`, 14, 120);
    doc.text(`Total Dues: ₹${customer.totalDues}`, 14, 130);
    doc.text(`Completed Payments: ₹${customer.completedPayments}`, 14, 140);
    doc.text(`Pending Payments: ₹${customer.pendingPayments}`, 14, 150);
    doc.text(`Due Date: ${customer.dueDate}`, 14, 160);

    // Month status details
    doc.text('Month Chart:', 14, 170);
    let yOffset = 180;
    Object.keys(monthStatus).forEach((month) => {
      doc.text(`${month}: ${monthStatus[month]}`, 14, yOffset);
      yOffset += 10;
    });

    // Save the PDF
    doc.save('customer-details.pdf');
  };

  const toggleEdit = () => {
    setIsEditing(!isEditing);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdatedCustomer({
      ...updatedCustomer,
      [name]: value,
    });
  };

  const handleMonthChange = (month, status) => {
    setMonthStatus({
      ...monthStatus,
      [month]: status,
    });
    setUpdatedCustomer({
      ...updatedCustomer,
      monthStatus: {
        ...updatedCustomer.monthStatus,
        [month]: status,
      },
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedCustomerData = { ...updatedCustomer, monthStatus };
    console.log('Updated customer details:', updatedCustomerData);
    setUpdatedCustomer(updatedCustomerData); // Update the local state with the new data
    setIsEditing(false);
    alert('Customer details updated successfully');
  };

  return (
    <div className="customer-details-container">
      <h1>Customer Details</h1>
      <div className="customer-card">
        <img src={customer.photo} alt={customer.name} />
        <div className="customer-info">
          {isEditing ? (
            <form onSubmit={handleSubmit}>
              <label>
                Name:
                <input
                  type="text"
                  name="name"
                  value={updatedCustomer.name}
                  onChange={handleChange}
                />
              </label>
              <label>
                Mobile no:
                <input
                  type="text"
                  name="phoneNumber"
                  value={updatedCustomer.phoneNumber}
                  onChange={handleChange}
                />
              </label>
              <label>
                Address:
                <input
                  type="text"
                  name="address"
                  value={updatedCustomer.address}
                  onChange={handleChange}
                />
              </label>
              <label>
                Initial Amount:
                <input
                  type="text"
                  name="initialAmount"
                  value={updatedCustomer.initialAmount}
                  onChange={handleChange}
                />
              </label>
              <label>
                Interest Rate:
                <input
                  type="number"
                  name="interestRate"
                  value={updatedCustomer.interestRate}
                  onChange={handleChange}
                />
              </label>
              <label>
                Total Amount with Interest:
                <input
                  type="text"
                  name="totalAmountWithInterest"
                  value={updatedCustomer.totalAmountWithInterest}
                  onChange={handleChange}
                />
              </label>
              <label>
                Monthly Amount:
                <input
                  type="text"
                  name="monthlyAmount"
                  value={updatedCustomer.monthlyAmount}
                  onChange={handleChange}
                />
              </label>
              <label>
                Duration:
                <input
                  type="number"
                  name="duration"
                  value={updatedCustomer.duration}
                  onChange={handleChange}
                />
              </label>
              <label>
                Completed Dues:
                <input
                  type="number"
                  name="completedDues"
                  value={updatedCustomer.completedDues}
                  onChange={handleChange}
                />
              </label>
              <label>
                Pending Dues:
                <input
                  type="number"
                  name="pendingDues"
                  value={updatedCustomer.pendingDues}
                  onChange={handleChange}
                />
              </label>
              <label>
                Total Dues:
                <input
                  type="number"
                  name="totalDues"
                  value={updatedCustomer.totalDues}
                  onChange={handleChange}
                />
              </label>
              <label>
                Completed Payments:
                <input
                  type="text"
                  name="completedPayments"
                  value={updatedCustomer.completedPayments}
                  onChange={handleChange}
                />
              </label>
              <label>
                Pending Payments:
                <input
                  type="text"
                  name="pendingPayments"
                  value={updatedCustomer.pendingPayments}
                  onChange={handleChange}
                />
              </label>
              <label>
                Due Date:
                <input
                  type="date"
                  name="dueDate"
                  value={updatedCustomer.dueDate}
                  onChange={handleChange}
                />
              </label>
              <h4>Month Chart:</h4>
              {Object.keys(monthStatus).map((month) => (
                <label key={month}>
                  <strong>{month}:</strong>
                  <select
                    name={month}
                    value={monthStatus[month]}
                    onChange={(e) => handleMonthChange(month, e.target.value)}
                  >
                    <option value="✔ Payment Done">✔ Payment Done</option>
                    <option value="❌ Late payment">❌ Late payment</option>
                    <option value="⚪ Yet to pay">⚪ Yet to pay</option>
                  </select>
                </label>
              ))}
              <div className="customer-details-buttons">
                <button type="submit">Save</button>
                <button type="button" onClick={toggleEdit}>Cancel</button>
              </div>
            </form>
          ) : (
            <>
              <h3>{customer.name}</h3>
              <p><strong>Mobile no:</strong> {customer.phoneNumber}</p>
              <p><strong>Address:</strong> {customer.address}</p>
              <h4>Financial Details:</h4>
              <p><strong>Initial Amount:</strong> ₹{customer.initialAmount}</p>
              <p><strong>Interest rate:</strong> {customer.interestRate}%</p>
              <p><strong>Total Amount with Interest:</strong> ₹{customer.totalAmountWithInterest}</p>
              <p><strong>Monthly Amount:</strong> ₹{customer.monthlyAmount}</p>
              <p><strong>Duration:</strong> {customer.duration} Months</p>
              <p><strong>Completed Dues:</strong> ₹{customer.completedDues}</p>
              <p><strong>Pending Dues:</strong> ₹{customer.pendingDues}</p>
              <p><strong>Total Dues:</strong> ₹{customer.totalDues}</p>
              <p><strong>Completed Payments:</strong> ₹{customer.completedPayments}</p>
              <p><strong>Pending Payments:</strong> ₹{customer.pendingPayments}</p>
              <p><strong>Due Date:</strong> {customer.dueDate}</p>
              <h4>Month Chart:</h4>
              {Object.keys(monthStatus).map((month) => (
                <p key={month}><strong>{month}:</strong> {monthStatus[month]}</p>
              ))}
              <div className="customer-details-buttons">
                <button onClick={toggleEdit}>Edit</button>
                <button onClick={handleDownload}>Download PDF</button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default CustomerDetails;
