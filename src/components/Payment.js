import React from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
// Remove useParams import if not used
// import { useParams } from 'react-router-dom';
import PaymentPage from './PaymentPage';

const Payment = () => {
  return (
    <>
      <Navbar />
      <PaymentPage />
      <Footer />
    </>
  );
};

export default Payment;
