import React from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import AddCustomerPage from "./pages/AddCustomerPage";
import AddWorkerCredentials from "./pages/AddWorker";
import AdminDashboard from "./pages/AdminDashboard";
import CustomerDetails from "./pages/CustomerDetails";
import DayTracker from "./pages/DayTracker";
import LoginPage from "./pages/LoginPage";
import ProtectedRoute from "./pages/ProtectedRoute";
import TotalCustomers from "./pages/TotalCustomers";
import WorkerDashboard from "./pages/WorkerDashboard";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route 
          path="/admin/dashboard" 
          element={
            <ProtectedRoute role="admin">
              <AdminDashboard />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/admin/add-customer" 
          element={
            <ProtectedRoute role="admin">
              <AddCustomerPage />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/admin/total-customers" 
          element={
            <ProtectedRoute role="admin">
              <TotalCustomers />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/admin/add-worker" 
          element={
            <ProtectedRoute role="admin">
              <AddWorkerCredentials />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/admin/customer/:id" 
          element={
            <ProtectedRoute role="admin">
              <CustomerDetails />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/admin/day-tracker" 
          element={
            <ProtectedRoute role="admin">
              <DayTracker />
            </ProtectedRoute>
          } 
        />

        {/* Worker Routes */}
        <Route 
          path="/worker/dashboard" 
          element={
            <ProtectedRoute role="worker">
              <WorkerDashboard />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/worker/day-tracker" 
          element={
            <ProtectedRoute role="worker">
              <DayTracker />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/worker/customer/:id" 
          element={
            <ProtectedRoute role="worker">
              <CustomerDetails />
            </ProtectedRoute>
          } 
        />
      </Routes>
    </Router>
  );
};

export default App;