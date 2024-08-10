import React from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import AppointmentPage from './AppointmentPage';

const Book = ({ onBrowseClick, onLoginClick }) => {
  return (
    <>
      <Navbar onBrowseClick={onBrowseClick} onLoginClick={onLoginClick} />
      <AppointmentPage/>
      <Footer/>
    </>
  );
};

export default Book;
