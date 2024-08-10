import React from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import DoctorProfile from './DoctorProfile';
import { useParams } from 'react-router-dom';

const Profile = ({ onBrowseClick, onLoginClick }) => {
  const { id } = useParams();

  return (
    <>
      <Navbar onBrowseClick={onBrowseClick} onLoginClick={onLoginClick} />
      <DoctorProfile doctorId={id} />
      <Footer />
    </>
  );
};

export default Profile;
