import React from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import AboutUs from './AboutUs';

const About = ({ onBrowseClick, onLoginClick }) => {
  return (
    <>
      <Navbar onBrowseClick={onBrowseClick} onLoginClick={onLoginClick} />
      <AboutUs/>
      <Footer/>
    </>
  );
};

export default About;
