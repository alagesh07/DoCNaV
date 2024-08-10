import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './AdminDashboard.css';

const AdminDashboard = () => {
  const [activeMenu, setActiveMenu] = useState('');
  const navigate = useNavigate();

  const handleMenuClick = (menu) => {
    setActiveMenu(menu === activeMenu ? '' : menu);
  };

  return (
    <div className="admin-dashboard">
      <div className="sidebar">
        <h2>HealthNav</h2>
        <ul>
          <li onClick={() => navigate('/adminhome')}>Home</li>
          <li onClick={() => navigate('/home')}>Doctor List</li>
          <li>User List</li>
          <li onClick={() => handleMenuClick('modify')}>
            Modify
            {activeMenu === 'modify' && (
              <ul className="dropdown1-menu1">
                <li onClick={() => navigate('/add')}>Add Doctor</li>
                <li onClick={() => navigate('/remove')}>Remove Doctor</li>
                <li onClick={() => navigate('/edit')}>Edit Doctor</li> {/* Update navigation path */}
              </ul>
            )}
          </li>
          <li onClick={() => navigate('/')}>Log Out</li> {/* Update navigation path */}
        </ul>
      </div>
    </div>
  ); 
};

export default AdminDashboard;
