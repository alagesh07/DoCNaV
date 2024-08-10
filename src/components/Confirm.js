import React from 'react';
import AdminDashboard from './AdminDashboard';
import ConfirmEdit from './EditPopup';
import './Confirm.css'; // Import the dedicated CSS

const Confirm = () => {
  return (
    <div className="confirm-container">
      <div className="admin-dashboard">
        <AdminDashboard />
      </div>
      <div className="confirm-content">
        <ConfirmEdit />
      </div>
    </div>
  );
};

export default Confirm;
