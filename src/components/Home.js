import React from 'react';
import AdminDashboard from './AdminDashboard';
import AdminDoctorList from './AdminDoctorList'
import './Home.css'; // Make sure to import the CSS file

const Home = () => {
  return (
    <div className="home">
      <AdminDashboard />
      <AdminDoctorList/>
    </div>
  );
};

export default Home;
