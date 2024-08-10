import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './AdminHomePage.css'; // Make sure you have this CSS file for styling

const AdminHomePage = () => {
  const [doctorCount, setDoctorCount] = useState(0);
  const [userCount, setUserCount] = useState(0);

  useEffect(() => {
    const fetchCounts = async () => {
      try {
        // Replace with your actual API endpoints
        const doctorResponse = await axios.get('http://localhost:8080/admin/doctor-count');
        const userResponse = await axios.get('http://localhost:8080/DocNav/user-count');
        
        setDoctorCount(doctorResponse.data.count);
        setUserCount(userResponse.data.count);
      } catch (error) {
        console.error('Error fetching counts:', error);
      }
    };

    fetchCounts();
  }, []);

  return (
    <div className="admin-home-page">
      <h1>Admin Home Page</h1>
      <div className="count-container">
        <div className="count-box">
          <h2>Total Doctors</h2>
          <p>{doctorCount}</p>
        </div>
        <div className="count-box">
          <h2>Total Users</h2>
          <p>{userCount}</p>
        </div>
      </div>
    </div>
  );
};

export default AdminHomePage;
