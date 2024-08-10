import React from 'react';
import AdminDashboard from './AdminDashboard';
import AddDoctor from './AddDoctor';
import './Add.css'
const Add = () => {
  return (
    <div>
    <div className="add22">
      <AdminDashboard />
    </div>

    <div className='adoc'>
      <AddDoctor />
    </div>
    </div>
  );
};

export default Add;
