import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./CustomerDetails.css";

const CustomerDetails = () => {
  const { id } = useParams(); // Fetching the dynamic 'id' from the URL
  const [customer, setCustomer] = useState(null);
  const [error, setError] = useState(null);
  const [isEditing, setIsEditing] = useState(false); // State to toggle edit mode

  useEffect(() => {
    const fetchCustomer = async () => {
      try {
        console.log("Fetching customer details...");
        const response = await fetch(`http://localhost:5000/api/customers/${id}`);
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        console.log("Customer data fetched successfully:", data);

        console.log("Customer status data:", data.status);

        setCustomer(data);
      } catch (err) {
        console.error("Error fetching customer details:", err);
        setError(err.message);
      }
    };

    fetchCustomer();
  }, [id]);

  const handleAddTracker = async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/customers/${id}/addTracker`, {
        method: 'POST',
      });
      if (!response.ok) {
        throw new Error("Failed to add tracker.");
      }
      alert("Tracker added successfully!");
      setCustomer({ ...customer, tracker: true }); // Update state to reflect tracker change
    } catch (error) {
      setError(error.message);
    }
  };
  
  

  const handleEditClick = () => {
    console.log("Toggling edit mode:", !isEditing);
    setIsEditing(!isEditing);
  };

  const handleSave = async () => {
    try {
      // Log the customer data before saving
      console.log("Saving customer data:", customer);
  
      // Ensure that numeric fields are converted to numbers, and dueDate is properly formatted
      const updatedCustomer = {
        ...customer,
        initialAmount: parseFloat(customer.initialAmount) || 0,
        interestRate: parseFloat(customer.interestRate) || 0,
        completedDues: parseFloat(customer.completedDues) || 0,
        pendingDues: parseFloat(customer.pendingDues) || 0,
        totalAmountAfterInterest: parseFloat(customer.totalAmountAfterInterest) || 0,
        completedPayments: parseFloat(customer.completedPayments) || 0,
        pendingPayments: parseFloat(customer.pendingPayments) || 0,
        monthlyAmount: parseFloat(customer.monthlyAmount) || 0,
        duration: parseInt(customer.duration, 10) || 0,
        dueDate: customer.dueDate ? new Date(customer.dueDate).toISOString() : null, // Ensure dueDate is ISO format
        status: customer.status, // Ensure status is sent correctly
      };
  
      // Log the updated customer object
      console.log("Updated customer data:", updatedCustomer);
  
      const response = await fetch(`http://localhost:5000/api/customers/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedCustomer), // Send the updated customer data
      });
  
      // Log the response status to see if the request is actually being sent
      console.log("Response status:", response.status);
  
      // Check if the response is okay
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
  
      const finalUpdatedCustomer = await response.json();
  
      // Log the final updated customer data from server response
      console.log("Final updated customer from server:", finalUpdatedCustomer);
  
      setCustomer(finalUpdatedCustomer); // Update the state with the updated customer data
      setIsEditing(false); // Exit edit mode
  
      console.log("Customer details saved successfully.");
    } catch (error) {
      console.error("Error saving customer details:", error);
      setError(error.message);
    }
  };

  const handleStatusChange = (monthIndex, status) => {
    const updatedStatus = customer.status.map((item, index) =>
      index === monthIndex ? { ...item, status } : item
    );
    setCustomer(prevCustomer => ({
      ...prevCustomer,
      status: updatedStatus,
    }));
  };
  

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!customer) {
    return <div>Loading...</div>;
  }

  return (
    <div className="customer-details">
      <h1>Customer Details</h1>

      {/* Edit Button */}
      <button className="edit-btn" onClick={handleEditClick}>
        {isEditing ? "Save" : "Edit"}
      </button>

      <form className="customer-form">
        <div className="photo-container">
          {/* eslint-disable-next-line */}
          <img
            src={`http://localhost:5000/${customer.photo}`} // Modify this if the path is different
            alt={`${customer.name}'s photo`}
            className="customer-photo"
          />
        </div>

        <div className="form-group">
          <label>Name:</label>
          <input 
            type="text" 
            value={customer.name} 
            readOnly={!isEditing} 
            onChange={(e) => setCustomer({ ...customer, name: e.target.value })}
          />
        </div>
        <div className="form-group">
          <label>Address:</label>
          <input 
            type="text" 
            value={customer.address} 
            readOnly={!isEditing} 
            onChange={(e) => setCustomer({ ...customer, address: e.target.value })}
          />
        </div>
        <div className="form-group">
          <label>Phone Number:</label>
          <input 
            type="text" 
            value={customer.phoneNumber} 
            readOnly={!isEditing} 
            onChange={(e) => setCustomer({ ...customer, phoneNumber: e.target.value })}
          />
        </div>
        <div className="form-group">
          <label>Initial Amount:</label>
          <input 
            type="text" 
            value={customer.initialAmount} 
            readOnly={!isEditing} 
            onChange={(e) => setCustomer({ ...customer, initialAmount: e.target.value })}
          />
        </div>
        <div className="form-group">
          <label>Interest Rate:</label>
          <input 
            type="text" 
            value={customer.interestRate} 
            readOnly={!isEditing} 
            onChange={(e) => setCustomer({ ...customer, interestRate: e.target.value })}
          />
        </div>
        <div className="form-group">
          <label>Completed Dues:</label>
          <input 
            type="text" 
            value={customer.completedDues} 
            readOnly={!isEditing} 
            onChange={(e) => setCustomer({ ...customer, completedDues: e.target.value })}
          />
        </div>
        <div className="form-group">
          <label>Pending Dues:</label>
          <input 
            type="text" 
            value={customer.pendingDues} 
            readOnly={!isEditing} 
            onChange={(e) => setCustomer({ ...customer, pendingDues: e.target.value })}
          />
        </div>
        <div className="form-group">
          <label>Total Amount After Interest:</label>
          <input 
            type="text" 
            value={customer.totalAmountAfterInterest} 
            readOnly={!isEditing} 
            onChange={(e) => setCustomer({ ...customer, totalAmountAfterInterest: e.target.value })}
          />
        </div>
        <div className="form-group">
          <label>Completed Payments:</label>
          <input 
            type="text" 
            value={customer.completedPayments} 
            readOnly={!isEditing} 
            onChange={(e) => setCustomer({ ...customer, completedPayments: e.target.value })}
          />
        </div>
        <div className="form-group">
          <label>Pending Payments:</label>
          <input 
            type="text" 
            value={customer.pendingPayments} 
            readOnly={!isEditing} 
            onChange={(e) => setCustomer({ ...customer, pendingPayments: e.target.value })}
          />
        </div>
        <div className="form-group">
          <label>Monthly Amount:</label>
          <input 
            type="text" 
            value={customer.monthlyAmount} 
            readOnly={!isEditing} 
            onChange={(e) => setCustomer({ ...customer, monthlyAmount: e.target.value })}
          />
        </div>
        <div className="form-group">
          <label>Duration:</label>
          <input 
            type="text" 
            value={customer.duration} 
            readOnly={!isEditing} 
            onChange={(e) => setCustomer({ ...customer, duration: e.target.value })}
          />
        </div>
        <div className="form-group">
          <label>Due Date:</label>
          <input 
            type="date"  // Use a 'date' input type instead of 'text'
            value={customer.dueDate ? new Date(customer.dueDate).toISOString().split('T')[0] : ''} // Format to 'YYYY-MM-DD' for the date input
            readOnly={!isEditing} 
            onChange={(e) => setCustomer({ ...customer, dueDate: e.target.value })}
          />
        </div>

        <div className="form-group">
          <label>Due Added:</label>
          <input 
            type="date"  // Use a 'date' input type instead of 'text'
            value={customer.dateAdded ? new Date(customer.dateAdded).toISOString().split('T')[0] : ''} // Format to 'YYYY-MM-DD' for the date input
            readOnly={!isEditing} 
            onChange={(e) => setCustomer({ ...customer, dateAdded: e.target.value })}
          />
        </div>

        {/* Monthly Payment Status Section */}
        <h2>Monthly Payment Status</h2>
        {customer.status.map((item, index) => (
          <div key={index} className="form-group">
            {/* Displaying Month and Year together */}
            <label>{`${item.month.charAt(0).toUpperCase() + item.month.slice(1)} ${item.year}`}: </label> 
            <select
              value={item.status}
              disabled={!isEditing}  // Use isEditing to control the status editability
              onChange={(e) => handleStatusChange(index, e.target.value)}
            >
              <option value="Not Completed">Not Completed</option>
              <option value="Completed">Completed</option>
            </select>
          </div>
        ))}
      </form>

      {/* Only show save button when in editing mode */}
      {isEditing && (
        <button className="save-btn" onClick={handleSave}>Save</button>
      )}
      
      <button onClick={handleAddTracker}>Add Tracker</button>
    </div>
    
  );
};




export default CustomerDetails;