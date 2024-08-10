import React from 'react';
import AdminDashboard from './AdminDashboard';
import './AdminHome.css'; // Make sure to import the CSS file
import AdminHomePage from './AdminHomePage';

const AdminHome = () => {
  return (
    <div className="adminHome">
      <AdminDashboard />
      <AdminHomePage />
    </div>
  );
};

export default AdminHome;
